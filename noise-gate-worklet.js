class NoiseGateProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'threshold', defaultValue: -40, minValue: -80, maxValue: 0 },
      { name: 'hysteresisDb', defaultValue: 6, minValue: 0, maxValue: 24 },
      { name: 'attack', defaultValue: 5, minValue: 1, maxValue: 200 },
      { name: 'release', defaultValue: 150, minValue: 10, maxValue: 1000 },
      { name: 'floor', defaultValue: -60, minValue: -80, maxValue: 0 }
    ];
  }

  constructor() {
    super();
    this._gain = 1.0;
    this._isOpen = true;
    this._rms = 0;
    this._debug = false;
    this._logCounter = 0;
    this.port.onmessage = (event) => {
      if (event.data && event.data.type === 'debug') {
        this._debug = Boolean(event.data.enabled);
      }
    };
  }

  _dbToLin(db) {
    return Math.pow(10, db / 20);
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input || input.length === 0) return true;

    const channels = input.length;
    const frames = input[0].length;
    let sum = 0;
    for (let c = 0; c < channels; c += 1) {
      const channelData = input[c];
      for (let i = 0; i < frames; i += 1) {
        sum += channelData[i] * channelData[i];
      }
    }
    const mean = sum / (frames * channels);
    const rms = Math.sqrt(mean);

    const smoothing = 0.9;
    this._rms = smoothing * this._rms + (1 - smoothing) * rms;

    const thresholdDb = parameters.threshold.length > 0 ? parameters.threshold[0] : -40;
    const hysteresisDb = parameters.hysteresisDb.length > 0 ? parameters.hysteresisDb[0] : 6;
    const attackMs = parameters.attack.length > 0 ? parameters.attack[0] : 5;
    const releaseMs = parameters.release.length > 0 ? parameters.release[0] : 150;
    const floorDb = parameters.floor.length > 0 ? parameters.floor[0] : -60;

    const openThresh = this._dbToLin(thresholdDb);
    const closeThresh = this._dbToLin(thresholdDb - hysteresisDb);
    if (!this._isOpen && this._rms >= openThresh) {
      this._isOpen = true;
    } else if (this._isOpen && this._rms <= closeThresh) {
      this._isOpen = false;
    }

    const target = this._isOpen ? 1.0 : this._dbToLin(floorDb);
    const timeMs = target > this._gain ? attackMs : releaseMs;
    const coeff = Math.exp(-1 / (timeMs * sampleRate * 0.001));

    for (let c = 0; c < channels; c += 1) {
      const inputChannel = input[c];
      const outputChannel = output[c];
      for (let i = 0; i < frames; i += 1) {
        this._gain = coeff * this._gain + (1 - coeff) * target;
        outputChannel[i] = inputChannel[i] * this._gain;
      }
    }

    if (this._debug) {
      this._logCounter += 1;
      if (this._logCounter % 60 === 0) {
        const rmsDb = 20 * Math.log10(this._rms + 1e-9);
        // eslint-disable-next-line no-console
        console.log(`[noise-gate] rms=${rmsDb.toFixed(1)} dB open=${this._isOpen}`);
      }
    }

    return true;
  }
}

registerProcessor('noise-gate', NoiseGateProcessor);
