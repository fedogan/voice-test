class NoiseGateProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'threshold', defaultValue: -45, minValue: -80, maxValue: 0 },
      { name: 'attack', defaultValue: 10, minValue: 1, maxValue: 200 },
      { name: 'release', defaultValue: 150, minValue: 10, maxValue: 1000 },
      { name: 'floor', defaultValue: -40, minValue: -80, maxValue: 0 }
    ];
  }

  constructor() {
    super();
    this._gain = 1.0;
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

    const thresholdDb = parameters.threshold.length > 0 ? parameters.threshold[0] : -45;
    const attackMs = parameters.attack.length > 0 ? parameters.attack[0] : 10;
    const releaseMs = parameters.release.length > 0 ? parameters.release[0] : 150;
    const floorDb = parameters.floor.length > 0 ? parameters.floor[0] : -40;

    const threshold = this._dbToLin(thresholdDb);
    const floor = this._dbToLin(floorDb);
    const target = rms < threshold ? floor : 1.0;

    const timeMs = target < this._gain ? attackMs : releaseMs;
    const coeff = Math.exp(-1 / (timeMs * sampleRate * 0.001));
    this._gain = coeff * this._gain + (1 - coeff) * target;

    for (let c = 0; c < channels; c += 1) {
      const inputChannel = input[c];
      const outputChannel = output[c];
      for (let i = 0; i < frames; i += 1) {
        outputChannel[i] = inputChannel[i] * this._gain;
      }
    }

    return true;
  }
}

registerProcessor('noise-gate', NoiseGateProcessor);
