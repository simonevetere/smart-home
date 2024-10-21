
// Supponendo che la libreria qrcode.js esporti una funzione `qrcode`
new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  render: 'canvas',
  width: 100,
  height: 100,
  image: {
    hide: false,
    src: 'watermark.png', // Immagine del watermark
    x: 0,
    y: 0,
    width: 100,
    height: 100
  }
});