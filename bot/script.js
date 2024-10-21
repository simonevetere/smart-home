const recognition = new webkitSpeechRecognition();

var savedLanguage = localStorage.getItem('selectedLanguage');
var savedVoice = localStorage.getItem('selectedVoice');

// Load the saved language and voice on page load
window.onload = function() {
  var savedLanguage = localStorage.getItem('selectedLanguage');
  var savedVoice = localStorage.getItem('selectedVoice');
  if (savedLanguage  == null || savedVoice == null) {
    window.location.href='/settings'
  }
};

isSpeaking = false;

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

// Functions to show and hide bars
const showBars = () => {
  bars2.style.display = 'none';
  bars.style.display = 'flex';
};

const hideBars = () => {
  bars.style.display = 'none';
  bars2.style.display = 'flex';
};

hideBars();
if ('webkitSpeechRecognition' in window) {
    recognition.onstart = function() {
        console.log('Speech recognition started');
    };

    recognition.onresult = function(event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }
        console.log('Final Transcript: ', finalTranscript);

        document.getElementById('speechtotext').innerText = finalTranscript;

        // Invia il testo a Cheshire Cat tramite WebSocket
        sendToCheshireCat(finalTranscript);

    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
    };

    recognition.onend = function() {
        console.log('Speech recognition stopped');
        if(!isSpeaking){
            recognition.start();
        }
    };

    recognition.start();
} else {
    console.log('Web Speech API is not supported in this browser.');
}

let canSend = true;

function sendToCheshireCat(message) {
    if (!message) {
        console.error('Message is empty or undefined');
        return;
    }
    const socket = new WebSocket('wss://ai.casasmart.me//ws');
    socket.onopen = function() {
        console.log('WebSocket connection opened');
        socket.send(JSON.stringify({ text: message }));
        canSend = false;
        setTimeout(() => {
            canSend = true;
        }, 2000); // Pausa di 2 secondi prima di poter inviare un altro messaggio
    };
    socket.onmessage = function(event) {
        console.log('Message from Cheshire Cat:', event.data);
        const data = JSON.parse(event.data);
        if (data.type === 'chat' && data.content) {
            accumulateAndSpeak(data.content);
        }
    };
    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
    socket.onclose = function() {
        console.log('WebSocket connection closed');
    };
}

let messageQueue = [];
let speakingTimeout;

function accumulateAndSpeak(message) {
    messageQueue.push(message);
    if (speakingTimeout) {
        clearTimeout(speakingTimeout);
    }
    speakingTimeout = setTimeout(() => {
        const combinedMessage = messageQueue.join(' ');
        messageQueue = [];
        console.log(combinedMessage);
        speak(combinedMessage);
    }, 1000);
}

function speak(text) {

    window.speechSynthesis.cancel();

    // Commenta il riconoscimento vocale per testare la sintesi vocale
    isSpeaking = true;
    
    showBars();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const _voice = voices.find(voice => voice.name === savedVoice);

    if (_voice) {
        utterance.voice = _voice;
    } else {
        console.warn('Italian voice not found');
    }

    window.speechSynthesis.speak(utterance);

    utterance.addEventListener('start', function () {
         recognition.stop();
    })

    utterance.addEventListener('end', function () {
        isSpeaking = false;

        document.getElementById('speechtotext').innerText = "in ascolto";
        recognition.start();
        hideBars();
    })
}

speak('initialization : loading Italian voices');
setTimeout(() => {speak('benvenuto nella casa bastardo, ora sono pronto a prendere ordini come uno schiavo negro')}, 5000);