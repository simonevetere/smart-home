
const voices = {

  'Italian (Italy)': [

    'Microsoft Cosimo - Italian (Italy)',

    'Microsoft Elsa - Italian (Italy)',

    'Google italiano'

  ],

  'English (United States)': [

    'Microsoft David - English (United States)',

    'Microsoft Mark - English (United States)',

    'Microsoft Zira - English (United States)',

    'Google US English'

  ],

  'English (United Kingdom)': [

    'Microsoft Hazel - English (United Kingdom)',

    'Microsoft Susan - English (United Kingdom)',

    'Microsoft George - English (United Kingdom)',

    'Google UK English Female',

    'Google UK English Male'

  ],

  'Deutsch': [

    'Google Deutsch'

  ],

  'Español': [

    'Google español',

    'Google español de Estados Unidos'

  ],

  'Français': [

    'Google français'

  ],

  'हिन्दी': [

    'Google हिन्दी'

  ],

  'Bahasa Indonesia': [

    'Google Bahasa Indonesia'

  ],

  '日本語': [

    'Google 日本語'

  ],

  '한국의': [

    'Google 한국의'

  ],

  'Nederlands': [

    'Google Nederlands'

  ],

  'Polski': [

    'Google polski'

  ],

  'Português do Brasil': [

    'Google português do Brasil'

  ],

  'Русский': [

    'Google русский'

  ],

  '普通话（中国大陆）': [

    'Google 普通话（中国大陆）'

  ],

  '粤語（香港）': [

    'Google 粤語（香港）'

  ],

  '國語（臺灣）': [

    'Google 國語（臺灣）'

  ]

};


function selectLanguage(language) {
  // Salva la lingua selezionata nel local storage
  localStorage.setItem('selectedLanguage', language);

  // Aggiorna l'intestazione con la lingua selezionata
  document.getElementById('header').textContent = language;

  // Ottieni le voci disponibili per la lingua selezionata
  const availableVoices = voices[language];

  // Crea un elemento ul per contenere le voci
  const voiceList = document.createElement('ul');
  voiceList.id = 'voiceList';

  // Aggiungi le voci alla lista
  availableVoices.forEach((voice, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${voice}`;
    listItem.addEventListener('click', () => {
      // Salva la voce selezionata nel local storage
      localStorage.setItem('selectedVoice', voice);
      window.location.href='/home'

      // Esegui l'azione desiderata con la voce selezionata
      // Ad esempio, riproduci un messaggio audio
      // speak(voice); // Implementa la funzione speak()
    });
    voiceList.appendChild(listItem);
  });

  // Sostituisci il contenuto dell'elemento container con la lista delle voci
  const container = document.getElementById('container');
  container.innerHTML = '';
  container.appendChild(voiceList);
}

// Load the saved language and voice on page load
window.onload = function() {
  var savedLanguage = localStorage.getItem('selectedLanguage');
  var savedVoice = localStorage.getItem('selectedVoice');
  if (savedLanguage && savedVoice) {
    selectLanguage(savedLanguage);
  } else if (savedLanguage) {
    selectLanguage(savedLanguage); // If only language is saved, prompt for voice
  }
};