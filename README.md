## mini-voice

Minimal bir "voice app" başlangıcı: statik frontend + Node.js (Express + Socket.io) signaling server.
Bu repo **yalnızca signaling altyapısını** sağlar; gerçek WebRTC ses akışı eklemek için `signal` event'ini kullanarak SDP/ICE mesajlarını iletebilirsin.

### Klasör yapısı

- `/`: Statik frontend (`index.html`, `app.js`, `styles.css`)
- `server/`: Express + Socket.io server

### Gereksinimler

- Node.js 18+ (önerilir)

### Kurulum ve çalıştırma

Server'ı başlat:

```bash
cd server
npm install
npm start
```

Health kontrolü:

- `http://localhost:3001/health`

Client'ı aç:

- `index.html` dosyasını bir static server ile servis et (ör. VSCode Live Server).

Varsayılan signaling URL (local): `http://localhost:3001`

Eğer server farklı bir adreste çalışıyorsa, client tarafında iki yol var:

- UI'daki **Signaling Server URL** alanına adresi yaz.
- Veya URL'e `?server=` parametresi ekle:
  - Örn: `index.html?server=http://localhost:3001`

### GitHub Pages ayarı

GitHub Pages'te repo kökü yayınlanırken `index.html` açıldığında:

1. Sayfada **Signaling Server URL** alanına kendi signaling server adresini yaz.
2. Alternatif olarak, sayfa URL'ine `?server=` ekleyebilirsin:
   - Örn: `https://kullanici.github.io/mini-voice/?server=https://signal.example.com`

### Deploy notu

- Server'ı bir hostinge koy, çıkan URL'yi client'ta **Signaling Server URL** alanına gir.
- Koyeb/Render gibi platformlarda `PORT` env'si platform tarafından verilebilir.

### Kullanım

- Oda listesi solda görünür; tıklayınca oda ID otomatik dolar ve katılınır.
- Takma ad alanını doldurup **Katıl** ile odaya gir.
- Sohbet panelinde mesaj yaz; `/me` aksiyon, `/nick yeniad` takma ad değiştirir.
- **Gürültü azaltma** açıkken tarayıcı echo/noise suppression kullanır.
- **Sesi Kapat/Aç** tüm uzaktan gelen sesleri kapatır.
- Her katılımcı için ayrı ses seviyesi ve sessize alma kontrolü vardır.

### Notlar

- Oda listesi ve katılımcılar gerçek zamanlı güncellenir.
- Bağlantı koparsa yeniden bağlanınca otomatik katılmayı dener.

