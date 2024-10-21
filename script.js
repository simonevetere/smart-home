function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if(name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

if (!getCookie('user')) {
  window.location.href = '/login';
}

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