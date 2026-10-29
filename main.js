/**
 * ============================================================================
 * 🎮 IL NOSTRO VIAGGIO - CODICE PRINCIPALE DI GIOCO (main.js)
 * ============================================================================
 * 
 * 📑 INDICE DELLE SEZIONI:
 * ----------------------------------------------------------------------------
 * 1.  CONFIGURAZIONE & TESTI MODIFICABILI (Livello 1, 2, 3 e Gran Finale)
 * 2.  RIFERIMENTI AGLI ELEMENTI HTML (Canvas, tasti touch e finestre modali)
 * 2b. SISTEMA AUDIO & MUSICA (Sottofondo romantico generato o brano MP3)
 * 3.  CARICAMENTO DELLE IMMAGINI (Sprite LPC e Tileset prato)
 * 4.  STATO DEL GIOCO & SELEZIONE PERSONAGGIO (Chi sta giocando: Lui o Lei)
 * 5.  GESTIONE DEI LIVELLI (Mappe, ostacoli, lucciole e coordinate per 4 livelli)
 * 6.  SISTEMA DELLE COLLISIONI FISICHE (Impedisce di attraversare ostacoli solidi)
 * 7.  SISTEMA D'INTERAZIONE CONTESTUALE (Fa comparire il tasto "INTERAGISCI")
 * 8.  GESTIONE FINESTRE POPUP (Polaroid, Quiz, Dilemma, e Lettera Finale)
 * 9.  GESTIONE COMANDI (Touch per smartphone, mouse e tastiera PC)
 * 10. AGGIORNAMENTO LOGICA DI GIOCO (Movimento, animazione passi e lucciole)
 * 11. DISEGNO GRAFICO & PROFONDITÀ Y-SORTING (Disegna il mondo a strati 2.5D)
 * 12. AVVIO DEL CICLO PRINCIPALE (Game Loop a 60 FPS)
 * ============================================================================
 */


// ============================================================================
// 1. CONFIGURAZIONE & TESTI MODIFICABILI
// ----------------------------------------------------------------------------
// 👉 QUI PUOI MODIFICARE LIBERAMENTE TESTI, DOMANDE, RISPOSTE ED INSIDE JOKES!
// ============================================================================

// --- CONTENUTI LIVELLO 1: "Il Primo Incontro" ---
const level1Data = {
  title: 'LIVELLO 1: IL SENTIERO DEI RICORDI',

  // Panchina della Monster
  benchTitle: 'Panchina della Monster',
  benchQuiz: {
    question: 'Qual è la mia monster preferita?',
    // Se sono Lui: risposta Monster Ultra White
    correctForLui: 'Monster Ultra White',
    // Se sono Lei: risposta Monster Ultra Black Cherry
    correctForLei: 'Monster Ultra Black Cherry',
    // Le altre opzioni disponibili
    otherOptions: ['Monster Mango Loco', 'Monster Monarch'],
    feedbackSuccessLui: 'Esatto! La mia monster preferita è la Bianca!',
    feedbackSuccessLei: 'Esatto! La mia monster preferita è quella alla ciliegia!',
    feedbackWrong: 'Che errore tragico, muoviti e indovina',
    successGifLui: `<div style="width:100%;height:0;padding-bottom:114%;position:relative;"><iframe src="https://giphy.com/embed/J8sdqUPZS5myxuUGtW" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/monster-montyland-whitemonster-J8sdqUPZS5myxuUGtW" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`,
    successGifLei: `<div style="width:100%;height:0;padding-bottom:178%;position:relative;"><iframe src="https://giphy.com/embed/fSfMZ4h6ERCQQx5BnW" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/montyland-montythecat-montydance-fSfMZ4h6ERCQQx5BnW" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`
  },
  benchNoteLui: '"Novembre - Mi ricordo ancora quando ti sei seduta accanto a me... il cuore mi batteva forte e non riuscivo a smettere di guardarti sorridere." 🌸',
  benchNoteLei: '"Novembre - Quel pomeriggio insieme è volato in un secondo. Quando mi hai fatto ridere per la prima volta, ho capito che eri speciale." 🌸',

  // Mini-Quiz del cancello
  quiz: {
    question: 'Chi è stato il primo a dire ti amo all\'altro? 🩷',
    option1: 'Io',
    option2: 'Tu',
    option3Choices: ['Gerry Scotti', 'Joe Bastianich', 'Thomas Turbato', 'Pippi'],
    // Risposta corretta se sono Lui: Io
    // Risposta corretta se sono Lei: Tu
    successFeedback: 'Bravissima/o! Non era cosi difficile, ora muovi le chiappe e passa al prossimo livello',
    wrongFeedback: 'Ops! Quasi... ma non è andata esattamente così! Riprova!'
  },

  // Dialogo finale con il partner al traguardo del Livello 1
  partnerGreetingLui: 'Bravo Cucciolino, sei riuscito a superare il primo livello, ma ora su vai che devi continuare',
  partnerGreetingLei: 'Brava Patata, sei riuscita a superare il primo livello, ma ora muovi il culone che devi continuare'
};

// --- CONTENUTI LIVELLO 2: "I Nostri Momenti" (Caccia all'Oggetto) ---
const level2Data = {
  title: 'LIVELLO 2: LA RADURA DEI VIAGGI',

  // Dialogo finale con il partner al traguardo del Livello 2 (passaggio al Livello 3)
  partnerSuccessLui: 'Bravo amore!',
  partnerSuccessLei: 'Brava amore!',

  // Partita a scacchi (Scacco Matto in 1)
  chess: {
    title: 'La Partita Incompiuta ♟️',
    subtitle: 'Il Bianco muove e dà scacco matto in 1!',
    partnerNeedMsg: 'Ti fa cenno con la mano sorridendo: "Amore! C\'è una scacchiera sotto il grande albero con una partita in sospeso... trova lo scacco matto e raggiungimi!" ♟️💖',
    wrongMsg: 'riprova',
    wrongGifHtml: `<div style="width:100%;height:0;padding-bottom:77%;position:relative;"><iframe src="https://giphy.com/embed/eMu0803X2zkWY" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/the-simpsons-eMu0803X2zkWY" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`,
    successMsg: 'DAMN! SCACCO MATTO! 🏆✨',
    successGifHtml: `<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/twxoPjMpsijwPFBVqs" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/HBOMax-friday-hbomax-fridayonhbomax-twxoPjMpsijwPFBVqs" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`
  },

  // Finestre di dialogo e interazione per i gattini
  cats: {
    cat1: {
      title: 'Hai accarezzato il primo gattino! 🐾',
      subtitle: '',
      text: 'MIAOOOOOOOOO',
      htmlContent: `<div style="width:100%;height:0;padding-bottom:98%;position:relative;"><iframe src="https://giphy.com/embed/GTywSIhrVUo0p5gDJE" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/cat-meowstars-sc-GTywSIhrVUo0p5gDJE" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`
    },
    cat2: {
      title: 'Hai accarezzato il secondo gattino! 🐾',
      subtitle: '',
      text: 'MIAOOOOOOOOO',
      htmlContent: `<div style="width:100%;height:0;padding-bottom:126%;position:relative;"><iframe src="https://giphy.com/embed/kKeJ4JuNkaEZbkPOOL" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/yeulu-cute-animals-cats-kKeJ4JuNkaEZbkPOOL" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`
    }
  }
};

// --- CONTENUTI LIVELLO 3: "Inside Jokes & Complicità" (Dilemmi Buffi di Coppia) ---
const level3Data = {
  title: 'LIVELLO 3: IL SENTIERO DELLA COMPLICITÀ',

  // Il cartello con l'Inside Joke a scelta multipla (placeholder divertenti!)
  dilemma: {
    title: 'Un Piccolo Dilemma di Coppia 😜',
    question: 'DOMANDA TRABOCCHETTO: Chi ci mette SEMPRE più tempo a prepararsi prima di uscire? 🤔',
    options: [
      {
        text: 'Tu, senza ombra di dubbio! Dici "5 minuti" e passa un\'ora ⏰',
        reaction: 'Ehi! Guarda che la perfezione richiede tempo, non te la cavi così a buon mercato! 😂💕'
      },
      {
        text: 'Io... ma solo perché devo scegliere l\'outfit perfetto per te! 👗',
        reaction: 'Aww, che furbata romantica! Va bene, ti perdono subito... però ammettilo che ci metti tanto! 🥰'
      },
      {
        text: 'Entrambi! Per questo arriviamo sempre in ritardo ovunque! 🤣',
        reaction: 'Ecco la pura e semplice verità! Siamo fatti l\'uno per l\'altra anche nel ritardo cronico! 🍕💖'
      }
    ]
  },

  // Panchina delle risate (Polaroid comica del Livello 3)
  benchTitle: 'L\'Angolo delle Risate',
  polaroidTextLui: '"Quante figuracce e quante risate insieme... ridere a crepapelle con te è la cosa più bella della mia vita." 😂✨',
  polaroidTextLei: '"Con te non riesco mai a stare seria per più di due minuti. La complicità che abbiamo è unica al mondo!" 😂✨',

  // Messaggio del partner se non hai ancora risposto al cartello
  partnerNeedDilemmaMsg: 'Ti aspetta ridendo a braccia incrociate: "Amore! Vai prima al cartello dei dilemmi a rispondere, voglio proprio vedere cosa hai il coraggio di scegliere! 😜"',

  // Dialogo di vittoria del Livello 3 prima del gran finale
  partnerSuccessLui: 'Ti abbraccia ridendo: "Qualunque risposta tu abbia dato, sei la persona più buffa e adorabile del mondo. Ora andiamo al nostro traguardo finale!" 💖',
  partnerSuccessLei: 'Ti salta al collo ridendo: "Siamo una squadra imbattibile anche nelle figuracce! Ora preparati per la sorpresa finale!" 💖'
};

// --- CONTENUTI LIVELLO FINALE: "Il Gran Finale Romantico" (Dedica & Anniversario) ---
const levelFinaleData = {
  title: 'GRAN FINALE: IL NOSTRO TRAGUARDO',
  anniversaryBadge: '💖 BUON ANNIVERSARIO 💖',
  anniversaryDate: 'Novembre • La Nostra Storia d\'Amore',

  // Lettera d'amore a tutto schermo (con dolci battute / inside jokes e dedica)
  letterTitle: 'Per Te, Amore Mio...',
  paragraphs: [
    'Sembra ieri che ci siamo guardati negli occhi per la prima volta, eppure abbiamo già scritto così tante pagine meravigliose della nostra storia.',
    'Tra i nostri viaggi indimenticabili, le pizze ordinate al volo ("io prendo poco..." e poi mangi metà della mia! 🍕), le risate fino alle lacrime e i momenti in cui basta un solo sguardo per capirci al volo.',
    'Grazie per essere la mia persona preferita in tutto l\'universo, la mia certezza, la mia risata più vera e la parte più bella di ogni singola giornata.',
    'Questo piccolo videogioco è nato per strapparti un sorriso e ricordarti quanto ti amo. Sei la mia avventura preferita, oggi e per sempre! 💖✨'
  ],

  // Dialogo speciale quando ci si ricongiunge al centro del cuore
  partnerGreetingLui: 'Ti abbraccia fortissimo al centro del cuore: "Amore mio! Non potevo desiderare un compagno di viaggio migliore. Questo anniversario è solo uno dei tantissimi che festeggeremo insieme!" 💖',
  partnerGreetingLei: 'Ti stringe felice con gli occhi lucidi: "Amore! Sei riuscito a farmi emozionare e ridere come solo tu sai fare. Ti amo più di ogni altra cosa!" 💖'
};


// ============================================================================
// 2. RIFERIMENTI AGLI ELEMENTI HTML (DOM)
// ============================================================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const levelBadge = document.getElementById('level-badge');

const btnUp = document.getElementById('btn-up');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnDown = document.getElementById('btn-down');
const btnInteract = document.getElementById('btn-interact');

const selectionScreen = document.getElementById('selection-screen');
const cardLui = document.getElementById('card-lui');
const cardLei = document.getElementById('card-lei');
const btnStartGame = document.getElementById('btn-start-game');
const btnSwitchChar = document.getElementById('btn-switch-char');
const headerAvatarName = document.getElementById('header-avatar-name');
const headerAvatarIcon = document.getElementById('header-avatar-icon');
const previewLuiCanvas = document.getElementById('preview-lui');
const previewLeiCanvas = document.getElementById('preview-lei');

// Tasto Audio & Musica
const btnAudioToggle = document.getElementById('btn-audio-toggle');
const audioIcon = document.getElementById('audio-icon');

// Modale 1: Ricordo Polaroid
const polaroidModal = document.getElementById('polaroid-modal');
const btnClosePolaroid = document.getElementById('btn-close-polaroid');
const polaroidTextEl = document.getElementById('polaroid-text');

// Modale 1b: Mini-Quiz Panchina della Monster (Livello 1)
const monsterQuizModal = document.getElementById('monster-quiz-modal');
const monsterQuizTitle = document.getElementById('monster-quiz-title');
const monsterQuizQuestion = document.getElementById('monster-quiz-question');
const monsterQuizOptionsContainer = document.getElementById('monster-quiz-options-container');
const monsterQuizFeedback = document.getElementById('monster-quiz-feedback');
const monsterQuizMedia = document.getElementById('monster-quiz-media');
const btnCloseMonsterQuiz = document.getElementById('btn-close-monster-quiz');

// Modale 2: Mini-Quiz Cancello (Livello 1)
const quizModal = document.getElementById('quiz-modal');
const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsContainer = document.getElementById('quiz-options-container');
const quizFeedbackEl = document.getElementById('quiz-feedback');
const btnCloseQuiz = document.getElementById('btn-close-quiz');

// Modale 3: Dilemma / Inside Joke (Livello 3)
const dilemmaModal = document.getElementById('dilemma-modal');
const dilemmaQuestionEl = document.getElementById('dilemma-question');
const dilemmaOptionsContainer = document.getElementById('dilemma-options-container');
const dilemmaFeedbackEl = document.getElementById('dilemma-feedback');
const btnCloseDilemma = document.getElementById('btn-close-dilemma');

// Modale 4: Livello Completato
const levelClearModal = document.getElementById('level-clear-modal');
const levelClearTitleEl = document.getElementById('level-clear-title');
const levelClearTextEl = document.getElementById('level-clear-text');
const btnNextLevel = document.getElementById('btn-next-level');

// Modale 5: Dialoghi generici
const dialogModal = document.getElementById('dialog-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const btnCloseModal = document.getElementById('btn-close-modal');

// Modale 5b: Interazione Gattini (Livello 2)
const catModal = document.getElementById('cat-modal');
const catModalTitle = document.getElementById('cat-modal-title');
const catModalSubtitle = document.getElementById('cat-modal-subtitle');
const catModalMedia = document.getElementById('cat-modal-media');
const catModalText = document.getElementById('cat-modal-text');
const btnCloseCatModal = document.getElementById('btn-close-cat-modal');

// Modale 5c: Scacchiera Interattiva (Livello 2)
const chessModal = document.getElementById('chess-modal');
const chessModalTitle = document.getElementById('chess-modal-title');
const chessModalSubtitle = document.getElementById('chess-modal-subtitle');
const chessBoardView = document.getElementById('chess-board-view');
const chessResultView = document.getElementById('chess-result-view');
const chessBoardGrid = document.getElementById('chess-board');
const chessStatusText = document.getElementById('chess-status-text');
const btnCloseChess = document.getElementById('btn-close-chess');
const chessResultTitle = document.getElementById('chess-result-title');
const chessResultMedia = document.getElementById('chess-result-media');
const chessResultMsg = document.getElementById('chess-result-msg');
const btnChessAction = document.getElementById('btn-chess-action');

// Modale 6: Gran Finale Romantico
const finaleModal = document.getElementById('finale-modal');
const finaleTitleEl = document.getElementById('finale-title');
const finaleDateEl = document.getElementById('finale-date');
const finaleLetterContentEl = document.getElementById('finale-letter-content');
const memoryCard1 = document.getElementById('memory-card-1');
const memoryCard2 = document.getElementById('memory-card-2');
const memoryCard3 = document.getElementById('memory-card-3');
const btnRestartGame = document.getElementById('btn-restart-game');
const btnCloseFinale = document.getElementById('btn-close-finale');


// ============================================================================
// 2b. SISTEMA AUDIO & MUSICA (Web Audio API & MP3 fallback)
// ----------------------------------------------------------------------------
// 👉 Suona una dolce melodia romantica a carillon generata direttamente dal browser!
// 👉 Se in futuro metti un file "contenuti/audio/anniversario.mp3", lo userà in automatico.
// ============================================================================

let audioCtx = null;
let isMusicPlaying = false;
let melodyInterval = null;
let customAudioEl = null;

function checkCustomAudio() {
  const audio = new Audio('/contenuti/audio/anniversario.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  return audio;
}

const ROMANTIC_NOTES = [
  523.25, 659.25, 783.99, 987.77, 880.00, 783.99, 698.46, 659.25,
  587.33, 659.25, 698.46, 880.00, 783.99, 659.25, 587.33, 523.25
];
let noteIndex = 0;

function playSweetNote(freq) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.65);
}

function startMusic() {
  if (isMusicPlaying) return;

  if (!customAudioEl) {
    customAudioEl = checkCustomAudio();
  }

  const playPromise = customAudioEl.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isMusicPlaying = true;
      updateAudioUI();
    }).catch(() => {
      startProceduralMusic();
    });
  } else {
    startProceduralMusic();
  }
}

function startProceduralMusic() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isMusicPlaying = true;
  updateAudioUI();

  melodyInterval = setInterval(() => {
    const freq = ROMANTIC_NOTES[noteIndex % ROMANTIC_NOTES.length];
    playSweetNote(freq);
    noteIndex++;
  }, 440);
}

function stopMusic() {
  isMusicPlaying = false;
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
  if (customAudioEl) {
    customAudioEl.pause();
  }
  updateAudioUI();
}

function toggleMusic() {
  if (isMusicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
}

function updateAudioUI() {
  if (isMusicPlaying) {
    btnAudioToggle.classList.add('playing');
    audioIcon.textContent = '🎵';
    btnAudioToggle.title = 'Disattiva Musica';
  } else {
    btnAudioToggle.classList.remove('playing');
    audioIcon.textContent = '🔇';
    btnAudioToggle.title = 'Attiva Musica';
  }
}

btnAudioToggle.addEventListener('click', toggleMusic);



// ============================================================================
// 3. CARICAMENTO DELLE IMMAGINI (SPRITESHEET & TILESET)
// ============================================================================

const FRAME_SIZE = 64;
const ROW_MAP = { up: 0, left: 1, down: 2, right: 3 };

const sprites = {
  lui: { img: new Image(), loaded: false },
  lei: { img: new Image(), loaded: false }
};

sprites.lui.img.src = '/contenuti/personaggi/lui/standard/walk.png';
sprites.lui.img.onload = () => {
  sprites.lui.loaded = true;
  drawCardPreview('lui');
};

sprites.lei.img.src = '/contenuti/personaggi/lei/standard/walk.png';
sprites.lei.img.onload = () => {
  sprites.lei.loaded = true;
  drawCardPreview('lei');
};

const env = {
  tileset: { img: new Image(), loaded: false },
  tree: { img: new Image(), loaded: false },
  bush: { img: new Image(), loaded: false },
  grass: { img: new Image(), loaded: false }
};

env.tileset.img.src = '/contenuti/ambienti/prato/tilesetgrass.png';
env.tileset.img.onload = () => { env.tileset.loaded = true; };

env.tree.img.src = '/contenuti/ambienti/prato/tree.png';
env.tree.img.onload = () => { env.tree.loaded = true; };

env.bush.img.src = '/contenuti/ambienti/prato/bush.png';
env.bush.img.onload = () => { env.bush.loaded = true; };

env.grass.img.src = '/contenuti/ambienti/prato/grass.png';
env.grass.img.onload = () => { env.grass.loaded = true; };

// Oggetto Monster (Icona & Mini-Quiz Livello 1)
const monsterItem = {
  img: new Image(),
  loaded: false
};
monsterItem.img.src = '/contenuti/foto/monster-pixel-art.png';
monsterItem.img.onload = () => { monsterItem.loaded = true; };

// Sfondo Panoramico Livello 2 (Nature 1 - Pixel Art)
const level2Background = {
  img: new Image(),
  loaded: false
};
level2Background.img.src = '/contenuti/ambienti/livello2/background.png';
level2Background.img.onload = () => { level2Background.loaded = true; };

const LEVEL2_WORLD_WIDTH = 683;
const LEVEL2_WORLD_HEIGHT = 384;

// Gattini Livello 2 (Cat Sprite Sheet)
const catSprite = {
  img: new Image(),
  loaded: false
};
catSprite.img.src = '/contenuti/ambienti/livello2/cat.png';
catSprite.img.onload = () => { catSprite.loaded = true; };

const level2Cats = [
  {
    id: 'cat1',
    x: 165,
    y: 318,          // Posizione abbassata per poggiare perfettamente a terra sul prato
    renderSize: 38,  // Dimensione aumentata del 20% (da 32px a 38px)
    row: 4,          // Movimento 5 (5a riga, index 4): 8 frame (stiracchiamento / passo felpato)
    totalFrames: 8,
    frameSpeed: 140,
    animTimer: 0
  },
  {
    id: 'cat2',
    x: 485,
    y: 322,          // Posizione abbassata a terra
    renderSize: 38,  // Dimensione aumentata del 20% (da 32px a 38px)
    row: 8,          // Penultimo movimento (9a riga, index 8): 7 frame (balzo / salto giocoso)
    totalFrames: 7,
    frameSpeed: 160,
    animTimer: 0
  }
];


// ============================================================================
// 4. STATO DEL GIOCO & SELEZIONE PERSONAGGIO
// ============================================================================

let currentLevel = 1;         // Livello attivo: 1, 2, oppure 3
let selectedCharKey = 'lei';
let activePlayerKey = 'lei';
let isGameStarted = false;
let isModalOpen = false;

let levelTransitionAlpha = 0; // Dissolvenza fade al cambio livello

function drawCardPreview(charKey) {
  const spriteObj = sprites[charKey];
  const targetCanvas = charKey === 'lui' ? previewLuiCanvas : previewLeiCanvas;
  if (!targetCanvas || !spriteObj.loaded) return;

  const pCtx = targetCanvas.getContext('2d');
  pCtx.imageSmoothingEnabled = false;
  pCtx.clearRect(0, 0, 64, 64);

  const sx = 0;
  const sy = ROW_MAP.down * FRAME_SIZE;
  pCtx.drawImage(spriteObj.img, sx, sy, FRAME_SIZE, FRAME_SIZE, 0, 0, 64, 64);
}

function selectCharacter(charKey) {
  selectedCharKey = charKey;
  if (charKey === 'lui') {
    cardLui.classList.add('selected');
    cardLei.classList.remove('selected');
  } else {
    cardLei.classList.add('selected');
    cardLui.classList.remove('selected');
  }
  btnStartGame.removeAttribute('disabled');
  if (navigator.vibrate) navigator.vibrate(15);
}

cardLui.addEventListener('click', () => selectCharacter('lui'));
cardLei.addEventListener('click', () => selectCharacter('lei'));

btnStartGame.addEventListener('click', () => {
  activePlayerKey = selectedCharKey;
  isGameStarted = true;
  selectionScreen.classList.add('hidden');

  headerAvatarName.textContent = activePlayerKey === 'lui' ? 'Elton' : 'Rebecca';
  if (headerAvatarIcon) {
    headerAvatarIcon.textContent = '';
    headerAvatarIcon.style.display = 'none';
  }

  resetPlayerPosition();
  if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
});

btnSwitchChar.addEventListener('click', () => {
  selectionScreen.classList.remove('hidden');
  selectCharacter(activePlayerKey);
});

selectCharacter('lei');


// ============================================================================
// 5. GESTIONE DEI LIVELLI (MAPPE & OGGETTI DEI 3 LIVELLI)
// ============================================================================

const inputState = { up: false, down: false, left: false, right: false };

const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  speed: 2.1,
  facing: 'up',
  isMoving: false,
  animTimer: 0,
  renderSize: 48
};

function resetPlayerPosition() {
  if (currentLevel === 2) {
    player.x = 48;
    player.y = 280;
    player.facing = 'right';
  } else {
    player.x = canvas.width / 2;
    player.y = canvas.height - 50;
    player.facing = 'up';
  }
}

const partnerNPC = {
  x: canvas.width / 2,
  y: 68,
  facing: 'down',
  renderSize: 48
};

// --- ELEMENTI DEL LIVELLO 1 ---
const gateItem = {
  x: 92,
  y: 114,
  width: 136,
  height: 20,
  isOpen: false
};

const benchItem1 = {
  x: 98,
  y: 215,
  width: 38,
  height: 24,
  title: level1Data.benchTitle
};

const map1Trees = [
  { x: -16, y: -10, variant: 0 },
  { x: -12, y: 75, variant: 1 },
  { x: -16, y: 165, variant: 0 },
  { x: -10, y: 255, variant: 1 },
  { x: 236, y: -10, variant: 1 },
  { x: 240, y: 75, variant: 0 },
  { x: 236, y: 165, variant: 1 },
  { x: 242, y: 255, variant: 0 }
];

const map1Bushes = [
  { x: 62, y: 140 },
  { x: 62, y: 265 },
  { x: 226, y: 140 },
  { x: 226, y: 265 },
  { x: 92, y: 35 },
  { x: 196, y: 35 }
];

const map1GrassTufts = [
  { x: 86, y: 160 },
  { x: 200, y: 170 },
  { x: 90, y: 285 },
  { x: 210, y: 290 },
  { x: 104, y: 85 },
  { x: 184, y: 85 },
  { x: 140, y: 260 }
];

// --- ELEMENTI DEL LIVELLO 2 (Tavolo Scacchi & Gattini) ---
const chessTable = {
  x: 310,
  y: 280,
  width: 38,
  height: 26,
  isSolved: false
};

const level2Item = {
  get x() { return chessTable.x; },
  get y() { return chessTable.y; },
  get isCollected() { return chessTable.isSolved; },
  set isCollected(val) { chessTable.isSolved = val; }
};

const map2Trees = [
  { x: -14, y: -12, variant: 1 },
  { x: -18, y: 80, variant: 0 },
  { x: -14, y: 190, variant: 1 },
  { x: -18, y: 280, variant: 0 },
  { x: 238, y: -12, variant: 0 },
  { x: 234, y: 90, variant: 1 },
  { x: 238, y: 270, variant: 0 },
  { x: 50, y: -20, variant: 0 },
  { x: 200, y: -20, variant: 1 }
];

const map2Bushes = [
  { x: 60, y: 120 },
  { x: 60, y: 240 },
  { x: 154, y: 204 },
  { x: 218, y: 204 },
  { x: 186, y: 174 },
  { x: 186, y: 234 },
  { x: 104, y: 38 },
  { x: 184, y: 38 }
];

const map2GrassTufts = [
  { x: 110, y: 160 },
  { x: 140, y: 140 },
  { x: 170, y: 180 },
  { x: 130, y: 250 },
  { x: 150, y: 300 },
  { x: 100, y: 320 }
];

// --- ELEMENTI DEL LIVELLO 3 (Inside Jokes & Dilemma) ---
const level3Sign = {
  x: 104,             // Cartello interattivo del dilemma al centro-sinistra
  y: 190,
  width: 28,
  height: 28,
  isResolved: false  // Diventa true appena scegli una delle risposte divertenti!
};

const benchItem3 = {
  x: 186,             // Panchina delle risate sulla destra
  y: 250,
  width: 38,
  height: 24,
  title: level3Data.benchTitle
};

const map3Trees = [
  { x: -16, y: -10, variant: 1 },
  { x: -12, y: 90, variant: 0 },
  { x: -16, y: 210, variant: 1 },
  { x: -10, y: 290, variant: 0 },
  { x: 236, y: -10, variant: 0 },
  { x: 240, y: 110, variant: 1 },
  { x: 236, y: 200, variant: 0 },
  { x: 242, y: 290, variant: 1 }
];

const map3Bushes = [
  { x: 64, y: 130 },
  { x: 64, y: 260 },
  { x: 224, y: 130 },
  { x: 224, y: 260 },
  { x: 146, y: 190 }, // Cespuglio decorativo accanto al cartello
  { x: 90, y: 38 },
  { x: 196, y: 38 }
];

const map3GrassTufts = [
  { x: 92, y: 150 },
  { x: 180, y: 160 },
  { x: 120, y: 230 },
  { x: 160, y: 280 },
  { x: 110, y: 95 },
  { x: 175, y: 95 }
];

// --- ELEMENTI DEL LIVELLO FINALE: La Radura Incantata & Lucciole ---
const map4Trees = [
  { x: -16, y: -10, variant: 0 },
  { x: 45, y: -25, variant: 1 },
  { x: 175, y: -25, variant: 0 },
  { x: 238, y: -10, variant: 1 },
  { x: -18, y: 105, variant: 1 },
  { x: -14, y: 215, variant: 0 },
  { x: -12, y: 295, variant: 1 },
  { x: 236, y: 105, variant: 0 },
  { x: 238, y: 215, variant: 1 },
  { x: 234, y: 295, variant: 0 }
];

const map4Bushes = [
  { x: 55, y: 65 },
  { x: 230, y: 65 },
  { x: 65, y: 195 },
  { x: 222, y: 195 },
  { x: 75, y: 280 },
  { x: 212, y: 280 }
];

const map4GrassTufts = [
  { x: 95, y: 100 },
  { x: 215, y: 100 },
  { x: 105, y: 240 },
  { x: 205, y: 240 },
  { x: 160, y: 270 }
];

// Particelle lucciole luminose per l'atmosfera notturna/crepuscolare del Gran Finale
const fireflies = Array.from({ length: 24 }, () => ({
  x: Math.random() * 320,
  y: Math.random() * 384,
  vx: (Math.random() - 0.5) * 0.35,
  vy: -0.15 - Math.random() * 0.25,
  size: 1.2 + Math.random() * 1.6,
  pulseSpeed: 0.003 + Math.random() * 0.004,
  pulseOffset: Math.random() * Math.PI * 2,
  color: Math.random() > 0.35 ? '#fef08a' : '#f472b6' // Lucciole dorate e rosa romantiche
}));

// Funzione per avanzare di livello con dissolvenza (Livello 1, 2, 3 o Gran Finale)
function switchToLevel(newLevelNumber) {
  levelTransitionAlpha = 1.0;
  currentLevel = newLevelNumber;
  invalidateObstaclesCache();
  invalidateRenderItemsCache();
  lastInteractionTarget = null;
  btnInteract.classList.add('hidden');

  if (currentLevel === 4) {
    levelBadge.textContent = '✨ Gran Finale';
    partnerNPC.x = canvas.width / 2;
    partnerNPC.y = 126; // Al centro della piazza a forma di cuore
    partnerNPC.facing = 'down';
  } else if (currentLevel === 2) {
    levelBadge.textContent = 'Livello 2';
    partnerNPC.x = 610;
    partnerNPC.y = 280;
    partnerNPC.facing = 'left';
  } else {
    levelBadge.textContent = `Livello ${currentLevel}`;
    partnerNPC.x = canvas.width / 2;
    partnerNPC.y = 68;
    partnerNPC.facing = 'down';
  }

  resetPlayerPosition();
  pausePlayerMovement();
}


// ============================================================================
// 6. SISTEMA DELLE COLLISIONI FISICHE
// ============================================================================

let cachedObstacles = null;

function invalidateObstaclesCache() {
  cachedObstacles = null;
}

const playerFeetBox = { x: 0, y: 0, width: 16, height: 10 };

function canMoveTo(px, py) {
  playerFeetBox.x = px - 8;
  playerFeetBox.y = py + 12;

  const obstacles = getMapObstacles();

  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];
    if (
      playerFeetBox.x < obs.x + obs.width &&
      playerFeetBox.x + playerFeetBox.width > obs.x &&
      playerFeetBox.y < obs.y + obs.height &&
      playerFeetBox.y + playerFeetBox.height > obs.y
    ) {
      return false;
    }
  }
  return true;
}

function getMapObstacles() {
  if (cachedObstacles) return cachedObstacles;

  const obstacles = [];

  if (currentLevel === 2) {
    // Limiti del mondo orizzontale di Livello 2 (Nature 1)
    obstacles.push({ x: -50, y: 0, width: 85, height: LEVEL2_WORLD_HEIGHT }); // Limite sinistro
    obstacles.push({ x: 645, y: 0, width: 85, height: LEVEL2_WORLD_HEIGHT }); // Limite destro
    obstacles.push({ x: 0, y: -50, width: LEVEL2_WORLD_WIDTH, height: 280 }); // Limite superiore (cielo, nuvole, montagne non calpestabili)
    obstacles.push({ x: 0, y: 345, width: LEVEL2_WORLD_WIDTH, height: 60 });  // Limite inferiore
    // Tronco del grande albero al centro di Nature 1
    obstacles.push({ x: 380, y: 220, width: 50, height: 35 });

    // Ostacolo tavolo da scacchi
    obstacles.push({
      x: chessTable.x,
      y: chessTable.y + 6,
      width: chessTable.width,
      height: chessTable.height - 6
    });

    // Ostacoli fisici per i due gattini
    for (let i = 0; i < level2Cats.length; i++) {
      const cat = level2Cats[i];
      obstacles.push({
        x: cat.x - 10,
        y: cat.y + 2,
        width: 20,
        height: 10
      });
    }
  } else {
    // Bordi esterni generali per livelli verticali (Livello 1, 3 e 4)
    obstacles.push({ x: -50, y: 0, width: 95, height: canvas.height });
    obstacles.push({ x: 275, y: 0, width: 95, height: canvas.height });
    obstacles.push({ x: 0, y: -50, width: canvas.width, height: 85 });
    obstacles.push({ x: 0, y: canvas.height - 10, width: canvas.width, height: 50 });

    let activeTrees = map1Trees;
    let activeBushes = map1Bushes;

    if (currentLevel === 3) {
      activeTrees = map3Trees;
      activeBushes = map3Bushes;
    } else if (currentLevel === 4) {
      activeTrees = map4Trees;
      activeBushes = map4Bushes;
    }

    // Tronchi degli alberi
    for (let i = 0; i < activeTrees.length; i++) {
      const tree = activeTrees[i];
      obstacles.push({
        x: tree.x + 32,
        y: tree.y + 64,
        width: 32,
        height: 22
      });
    }

    // Cespugli
    for (let i = 0; i < activeBushes.length; i++) {
      const b = activeBushes[i];
      obstacles.push({
        x: b.x + 4,
        y: b.y + 8,
        width: 24,
        height: 20
      });
    }
  }

  // Ostacoli specifici per ciascun livello
  if (currentLevel === 1) {
    obstacles.push({
      x: benchItem1.x,
      y: benchItem1.y + 4,
      width: benchItem1.width,
      height: benchItem1.height - 4
    });

    if (!gateItem.isOpen) {
      obstacles.push({
        x: gateItem.x,
        y: gateItem.y + 2,
        width: gateItem.width,
        height: gateItem.height
      });
    }
  } else if (currentLevel === 3) {
    // Panchina delle risate
    obstacles.push({
      x: benchItem3.x,
      y: benchItem3.y + 4,
      width: benchItem3.width,
      height: benchItem3.height - 4
    });

    // Cartello del dilemma
    obstacles.push({
      x: level3Sign.x + 2,
      y: level3Sign.y + 12,
      width: 24,
      height: 14
    });
  }

  // Partner NPC (solido in tutti i livelli)
  obstacles.push({
    x: partnerNPC.x - 10,
    y: partnerNPC.y + 10,
    width: 20,
    height: 12
  });

  cachedObstacles = obstacles;
  return cachedObstacles;
}


// ============================================================================
// 7. SISTEMA D'INTERAZIONE CONTESTUALE
// ============================================================================

// Bersagli possibili: 'bench', 'gate', 'level2Item', 'level3Sign', 'partner', null
let currentInteractionTarget = null;
let lastInteractionTarget = null;

function checkInteractionProximity() {
  const distPartner = Math.hypot(player.x - partnerNPC.x, player.y - partnerNPC.y);
  let nextTarget = null;

  // --- CONTROLLO LIVELLO 1 ---
  if (currentLevel === 1) {
    const benchCenterX = benchItem1.x + benchItem1.width / 2;
    const benchCenterY = benchItem1.y + benchItem1.height / 2;
    const distBench = Math.hypot(player.x - benchCenterX, player.y - benchCenterY);

    const gateCenterX = gateItem.x + gateItem.width / 2;
    const gateCenterY = gateItem.y + gateItem.height / 2;
    const distGate = Math.hypot(player.x - gateCenterX, player.y - gateCenterY);

    if (!gateItem.isOpen && distGate < 50 && player.y > gateItem.y) {
      nextTarget = 'gate';
    } else if (distBench < 44) {
      nextTarget = 'bench';
    } else if (distPartner < 48 && (gateItem.isOpen || player.y < gateItem.y)) {
      nextTarget = 'partner';
    }
  }
  // --- CONTROLLO LIVELLO 2 ---
  else if (currentLevel === 2) {
    const distCat1 = Math.hypot(player.x - level2Cats[0].x, player.y - level2Cats[0].y);
    const distCat2 = Math.hypot(player.x - level2Cats[1].x, player.y - level2Cats[1].y);

    const tableCenterX = chessTable.x + chessTable.width / 2;
    const tableCenterY = chessTable.y + chessTable.height / 2;
    const distTable = Math.hypot(player.x - tableCenterX, player.y - tableCenterY);

    if (distCat1 < 46) {
      nextTarget = 'cat1';
    } else if (distCat2 < 46) {
      nextTarget = 'cat2';
    } else if (distTable < 44) {
      nextTarget = 'chess';
    } else if (distPartner < 48) {
      nextTarget = 'partner';
    }
  }
  // --- CONTROLLO LIVELLO 3 ---
  else if (currentLevel === 3) {
    const signCenterX = level3Sign.x + level3Sign.width / 2;
    const signCenterY = level3Sign.y + level3Sign.height / 2;
    const distSign = Math.hypot(player.x - signCenterX, player.y - signCenterY);

    const benchCenterX = benchItem3.x + benchItem3.width / 2;
    const benchCenterY = benchItem3.y + benchItem3.height / 2;
    const distBench = Math.hypot(player.x - benchCenterX, player.y - benchCenterY);

    if (distSign < 44) {
      nextTarget = 'level3Sign';
    } else if (distBench < 44) {
      nextTarget = 'bench';
    } else if (distPartner < 48) {
      nextTarget = 'partner';
    }
  }
  // --- CONTROLLO LIVELLO 4 (Gran Finale) ---
  else if (currentLevel === 4) {
    if (distPartner < 52) {
      nextTarget = 'partnerFinale';
    }
  }

  currentInteractionTarget = nextTarget;
  if (currentInteractionTarget !== lastInteractionTarget) {
    lastInteractionTarget = currentInteractionTarget;
    if (currentInteractionTarget) {
      const sparkleEl = btnInteract.querySelector('.action-sparkle');
      const textEl = btnInteract.querySelector('.action-text');

      if (currentInteractionTarget === 'cat1' || currentInteractionTarget === 'cat2') {
        if (sparkleEl) sparkleEl.textContent = '🐾';
        if (textEl) textEl.textContent = 'ACCAREZZA';
      } else if (currentInteractionTarget === 'chess') {
        if (sparkleEl) sparkleEl.textContent = '♟️';
        if (textEl) textEl.textContent = chessTable.isSolved ? 'VEDI SCACCHIERA' : 'GIOCA A SCACCHI';
      } else {
        if (sparkleEl) sparkleEl.textContent = '✨';
        if (textEl) textEl.textContent = 'INTERAGISCI';
      }

      btnInteract.classList.remove('hidden');
    } else {
      btnInteract.classList.add('hidden');
    }
  }
}

function triggerInteraction() {
  if (!currentInteractionTarget) return;
  if (navigator.vibrate) navigator.vibrate(25);

  // --- AZIONI LIVELLO 1 ---
  if (currentLevel === 1) {
    if (currentInteractionTarget === 'bench') {
      openMonsterQuizModal();
    } else if (currentInteractionTarget === 'gate') {
      openQuizModal();
    } else if (currentInteractionTarget === 'partner') {
      openLevelClearModal();
    }
  }
  // --- AZIONI LIVELLO 2 ---
  else if (currentLevel === 2) {
    if (currentInteractionTarget === 'cat1') {
      openCatModal('cat1');
    } else if (currentInteractionTarget === 'cat2') {
      openCatModal('cat2');
    } else if (currentInteractionTarget === 'chess') {
      openChessModal();
    } else if (currentInteractionTarget === 'partner') {
      if (!chessTable.isSolved) {
        openGenericDialog('Risolvi la partita! ♟️', level2Data.chess.partnerNeedMsg);
      } else {
        openLevelClearModal();
      }
    }
  }
  // --- AZIONI LIVELLO 3 ---
  else if (currentLevel === 3) {
    if (currentInteractionTarget === 'level3Sign') {
      openDilemmaModal(); // Apre il dilemma buffo a scelta multipla!
    } else if (currentInteractionTarget === 'bench') {
      openLevel3BenchModal(); // Apre la Polaroid comica
    } else if (currentInteractionTarget === 'partner') {
      if (!level3Sign.isResolved) {
        openGenericDialog('Risolvi il dilemma! 😜', level3Data.partnerNeedDilemmaMsg);
      } else {
        openLevelClearModal(); // Vittoria del Livello 3!
      }
    }
  }
  // --- AZIONI LIVELLO 4 (Gran Finale) ---
  else if (currentLevel === 4) {
    if (currentInteractionTarget === 'partnerFinale') {
      openFinaleModal(); // Apre la lettera d'amore e la galleria ricordi!
    }
  }
}


// ============================================================================
// 8. GESTIONE FINESTRE POPUP (MODALI)
// ============================================================================

function pausePlayerMovement() {
  inputState.up = false;
  inputState.down = false;
  inputState.left = false;
  inputState.right = false;
  btnUp.classList.remove('active');
  btnDown.classList.remove('active');
  btnLeft.classList.remove('active');
  btnRight.classList.remove('active');
}

// 1. Polaroid Livello 1
function openPolaroidModal() {
  isModalOpen = true;
  pausePlayerMovement();
  const note = activePlayerKey === 'lui' ? level1Data.benchNoteLui : level1Data.benchNoteLei;
  polaroidTextEl.textContent = note;
  polaroidModal.classList.remove('hidden');
}

function closePolaroidModal() {
  isModalOpen = false;
  polaroidModal.classList.add('hidden');
}
btnClosePolaroid.addEventListener('click', closePolaroidModal);
polaroidModal.addEventListener('click', (e) => {
  if (e.target === polaroidModal) closePolaroidModal();
});

// 1b. Mini-Quiz Panchina della Monster (Livello 1)
let isMonsterQuizSolved = false;

function openMonsterQuizModal() {
  isModalOpen = true;
  pausePlayerMovement();

  monsterQuizTitle.textContent = level1Data.benchTitle || 'Panchina della Monster';
  monsterQuizQuestion.textContent = level1Data.benchQuiz.question;
  monsterQuizFeedback.className = 'quiz-feedback hidden';
  monsterQuizFeedback.textContent = '';
  if (monsterQuizMedia) {
    monsterQuizMedia.innerHTML = '';
    monsterQuizMedia.classList.add('hidden');
  }
  monsterQuizOptionsContainer.innerHTML = '';
  btnCloseMonsterQuiz.textContent = 'Chiudi';

  const isLui = activePlayerKey === 'lui';
  const correctAnswer = isLui ? level1Data.benchQuiz.correctForLui : level1Data.benchQuiz.correctForLei;

  const optionsList = [
    { text: correctAnswer, isCorrect: true },
    { text: 'Monster Mango Loco', isCorrect: false },
    { text: 'Monster Monarch', isCorrect: false }
  ];

  // Mescola opzioni per rendere il quiz interattivo e divertente
  for (let i = optionsList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsList[i], optionsList[j]] = [optionsList[j], optionsList[i]];
  }

  optionsList.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn monster-opt-btn';
    btn.innerHTML = `<span class="opt-num">${idx + 1}.</span> <span class="opt-text">${opt.text}</span>`;

    btn.addEventListener('click', () => {
      if (opt.isCorrect) {
        isMonsterQuizSolved = true;
        btn.classList.add('correct');
        monsterQuizFeedback.className = 'quiz-feedback success';
        const feedbackMsg = isLui
          ? level1Data.benchQuiz.feedbackSuccessLui
          : level1Data.benchQuiz.feedbackSuccessLei;
        monsterQuizFeedback.textContent = feedbackMsg;

        const successGif = isLui
          ? level1Data.benchQuiz.successGifLui
          : level1Data.benchQuiz.successGifLei;

        if (successGif && monsterQuizMedia) {
          monsterQuizMedia.innerHTML = successGif;
          monsterQuizMedia.classList.remove('hidden');
        }

        if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
        triggerHeartExplosion();

        const allBtns = monsterQuizOptionsContainer.querySelectorAll('.quiz-opt-btn');
        allBtns.forEach(b => (b.style.pointerEvents = 'none'));

        btnCloseMonsterQuiz.textContent = ' Vai avanti 💕';
      } else {
        btn.classList.add('wrong');
        monsterQuizFeedback.className = 'quiz-feedback error';
        monsterQuizFeedback.textContent = level1Data.benchQuiz.feedbackWrong;
        if (monsterQuizMedia) {
          monsterQuizMedia.innerHTML = '';
          monsterQuizMedia.classList.add('hidden');
        }
        if (navigator.vibrate) navigator.vibrate(100);
        setTimeout(() => {
          btn.classList.remove('wrong');
        }, 800);
      }
    });

    monsterQuizOptionsContainer.appendChild(btn);
  });

  monsterQuizModal.classList.remove('hidden');
}

function closeMonsterQuizModal() {
  isModalOpen = false;
  monsterQuizModal.classList.add('hidden');
  if (monsterQuizMedia) {
    monsterQuizMedia.innerHTML = '';
    monsterQuizMedia.classList.add('hidden');
  }
}

btnCloseMonsterQuiz.addEventListener('click', closeMonsterQuizModal);
monsterQuizModal.addEventListener('click', (e) => {
  if (e.target === monsterQuizModal) closeMonsterQuizModal();
});

// 2. Polaroid Oggetto Trovato Livello 2
function openItemFoundModal() {
  isModalOpen = true;
  pausePlayerMovement();
  const note = activePlayerKey === 'lui' ? level2Data.item.polaroidTextLui : level2Data.item.polaroidTextLei;
  polaroidTextEl.textContent = note;
  polaroidModal.classList.remove('hidden');
}

// 3. Polaroid Risate Livello 3
function openLevel3BenchModal() {
  isModalOpen = true;
  pausePlayerMovement();
  const note = activePlayerKey === 'lui' ? level3Data.polaroidTextLui : level3Data.polaroidTextLei;
  polaroidTextEl.textContent = note;
  polaroidModal.classList.remove('hidden');
}

// 4. Mini-Quiz Cancello (Livello 1)
let funnyQuizOptionIndex = 0;

function openQuizModal() {
  isModalOpen = true;
  pausePlayerMovement();

  quizQuestionEl.textContent = level1Data.quiz.question;
  quizFeedbackEl.className = 'quiz-feedback hidden';
  quizFeedbackEl.textContent = '';
  quizOptionsContainer.innerHTML = '';

  const isLui = activePlayerKey === 'lui';
  const funnyChoices = (level1Data.quiz.option3Choices && level1Data.quiz.option3Choices.length > 0)
    ? level1Data.quiz.option3Choices
    : ['Gerry Scotti', 'Joe Bastianich', 'Thomas Turbato', 'Pippi'];

  function handleAnswer(btn, isCorrect) {
    if (isCorrect) {
      btn.classList.add('correct');
      quizFeedbackEl.className = 'quiz-feedback success';
      quizFeedbackEl.textContent = level1Data.quiz.successFeedback;
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

      const allBtns = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
      allBtns.forEach(b => (b.style.pointerEvents = 'none'));

      setTimeout(() => {
        gateItem.isOpen = true;
        invalidateObstaclesCache();
        invalidateRenderItemsCache();
        closeQuizModal();
        triggerHeartExplosion();
      }, 850);
    } else {
      btn.classList.remove('wrong');
      void btn.offsetWidth; // forza il reflow per riavviare l'animazione di shake
      btn.classList.add('wrong');
      quizFeedbackEl.className = 'quiz-feedback error';
      quizFeedbackEl.textContent = level1Data.quiz.wrongFeedback;
      if (navigator.vibrate) navigator.vibrate(100);
      setTimeout(() => {
        btn.classList.remove('wrong');
      }, 800);
    }
  }

  // 1. Opzione 1: "Io" (Corretta se il giocatore è Lui)
  const btn1 = document.createElement('button');
  btn1.className = 'quiz-opt-btn';
  btn1.innerHTML = `<span>1.</span> <span>${level1Data.quiz.option1 || 'Io'}</span>`;
  btn1.addEventListener('click', () => {
    handleAnswer(btn1, isLui);
  });
  quizOptionsContainer.appendChild(btn1);

  // 2. Opzione 2: "Tu" (Corretta se la giocatrice è Lei)
  const btn2 = document.createElement('button');
  btn2.className = 'quiz-opt-btn';
  btn2.innerHTML = `<span>2.</span> <span>${level1Data.quiz.option2 || 'Tu'}</span>`;
  btn2.addEventListener('click', () => {
    handleAnswer(btn2, !isLui);
  });
  quizOptionsContainer.appendChild(btn2);

  // 3. Opzione 3: Array dinamico buffo che cambia a ogni click (Sempre errata)
  const btn3 = document.createElement('button');
  btn3.className = 'quiz-opt-btn';
  const spanNum3 = document.createElement('span');
  spanNum3.textContent = '3.';
  const spanText3 = document.createElement('span');
  spanText3.textContent = funnyChoices[funnyQuizOptionIndex % funnyChoices.length];
  btn3.appendChild(spanNum3);
  btn3.appendChild(spanText3);

  btn3.addEventListener('click', () => {
    // A ogni click cambia opzione scorrendo l'array
    funnyQuizOptionIndex = (funnyQuizOptionIndex + 1) % funnyChoices.length;
    spanText3.textContent = funnyChoices[funnyQuizOptionIndex];
    handleAnswer(btn3, false);
  });
  quizOptionsContainer.appendChild(btn3);

  quizModal.classList.remove('hidden');
}

function closeQuizModal() {
  isModalOpen = false;
  quizModal.classList.add('hidden');
}
btnCloseQuiz.addEventListener('click', closeQuizModal);
quizModal.addEventListener('click', (e) => {
  if (e.target === quizModal) closeQuizModal();
});

// 5. Dilemma / Inside Joke (Livello 3)
function openDilemmaModal() {
  isModalOpen = true;
  pausePlayerMovement();

  dilemmaQuestionEl.textContent = level3Data.dilemma.question;
  dilemmaFeedbackEl.className = 'quiz-feedback hidden';
  dilemmaFeedbackEl.textContent = '';
  dilemmaOptionsContainer.innerHTML = '';
  btnCloseDilemma.classList.add('hidden');

  level3Data.dilemma.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerHTML = `<span>${idx + 1}.</span> <span>${opt.text}</span>`;

    btn.addEventListener('click', () => {
      level3Sign.isResolved = true; // Segnato come superato!
      invalidateRenderItemsCache();
      btn.classList.add('correct');

      dilemmaFeedbackEl.className = 'quiz-feedback success';
      dilemmaFeedbackEl.textContent = opt.reaction;
      btnCloseDilemma.classList.remove('hidden');

      const allBtns = dilemmaOptionsContainer.querySelectorAll('.quiz-opt-btn');
      allBtns.forEach(b => b.style.pointerEvents = 'none');

      triggerHeartExplosion();
      if (navigator.vibrate) navigator.vibrate([30, 60, 30]);
    });

    dilemmaOptionsContainer.appendChild(btn);
  });

  dilemmaModal.classList.remove('hidden');
}

function closeDilemmaModal() {
  isModalOpen = false;
  dilemmaModal.classList.add('hidden');
}
btnCloseDilemma.addEventListener('click', closeDilemmaModal);
dilemmaModal.addEventListener('click', (e) => {
  if (e.target === dilemmaModal && level3Sign.isResolved) closeDilemmaModal();
});

// 6. Modale di Vittoria del Livello
function openLevelClearModal() {
  isModalOpen = true;
  pausePlayerMovement();

  const levelClearHeartsEl = document.querySelector('.level-clear-hearts');
  if (currentLevel === 1) {
    const partnerMsg = activePlayerKey === 'lui' ? level1Data.partnerGreetingLui : level1Data.partnerGreetingLei;
    levelClearTitleEl.textContent = 'Vi siete ritrovati!';
    levelClearTextEl.textContent = partnerMsg;
    if (levelClearHeartsEl) levelClearHeartsEl.textContent = '🩷';
    btnNextLevel.textContent = 'VAI AL LIVELLO 2 ➔';
  } else if (currentLevel === 2) {
    const partnerMsg = activePlayerKey === 'lui' ? level2Data.partnerSuccessLui : level2Data.partnerSuccessLei;
    levelClearTitleEl.textContent = 'Missione Compiuta! 🎉';
    levelClearTextEl.textContent = partnerMsg;
    btnNextLevel.textContent = 'VAI AL LIVELLO 3 ➔';
  } else if (currentLevel === 3) {
    const partnerMsg = activePlayerKey === 'lui' ? level3Data.partnerSuccessLui : level3Data.partnerSuccessLei;
    levelClearTitleEl.textContent = 'Complicità Perfetta! 💖';
    levelClearTextEl.textContent = partnerMsg;
    btnNextLevel.textContent = 'VAI AL GRAN FINALE ➔';
  }

  levelClearModal.classList.remove('hidden');
  if (navigator.vibrate) navigator.vibrate([50, 100, 50, 100]);
}

btnNextLevel.addEventListener('click', () => {
  levelClearModal.classList.add('hidden');
  isModalOpen = false;

  if (currentLevel === 1) {
    switchToLevel(2);
  } else if (currentLevel === 2) {
    switchToLevel(3);
  } else if (currentLevel === 3) {
    switchToLevel(4); // Si entra nel Gran Finale Romantico!
  }
});

// 7. Modale Gran Finale: Lettera d'Amore & Ricordi
function openFinaleModal() {
  isModalOpen = true;
  pausePlayerMovement();

  finaleTitleEl.textContent = levelFinaleData.letterTitle;
  finaleDateEl.textContent = levelFinaleData.anniversaryDate;

  // Inietta i paragrafi della lettera romantica (con battute e inside jokes)
  finaleLetterContentEl.innerHTML = '';
  levelFinaleData.paragraphs.forEach((pText) => {
    const p = document.createElement('p');
    p.textContent = pText;
    finaleLetterContentEl.appendChild(p);
  });

  finaleModal.classList.remove('hidden');
  triggerHeartExplosion();
  if (navigator.vibrate) navigator.vibrate([60, 120, 60, 120, 60]);
}

// Clic sulle mini-card dei ricordi all'interno della lettera finale per rivedere le foto
memoryCard1.addEventListener('click', () => {
  openPolaroidModal();
});
memoryCard2.addEventListener('click', () => {
  openItemFoundModal();
});
memoryCard3.addEventListener('click', () => {
  openLevel3BenchModal();
});

btnCloseFinale.addEventListener('click', () => {
  finaleModal.classList.add('hidden');
  isModalOpen = false;
});
finaleModal.addEventListener('click', (e) => {
  if (e.target === finaleModal) {
    finaleModal.classList.add('hidden');
    isModalOpen = false;
  }
});

// Tasto "Rigioca l'Avventura": azzera i progressi e torna alla schermata di selezione
btnRestartGame.addEventListener('click', () => {
  finaleModal.classList.add('hidden');
  isModalOpen = false;

  // Reset di tutti gli stati di gioco
  isMonsterQuizSolved = false;
  gateItem.isOpen = false;
  chessTable.isSolved = false;
  level3Sign.isResolved = false;

  switchToLevel(1);
  selectionScreen.classList.remove('hidden');
});

// 8. Modale Generico
function openGenericDialog(title, text) {
  isModalOpen = true;
  pausePlayerMovement();
  modalTitle.textContent = title;
  modalText.textContent = text;
  dialogModal.classList.remove('hidden');
}
btnCloseModal.addEventListener('click', () => {
  isModalOpen = false;
  dialogModal.classList.add('hidden');
});
dialogModal.addEventListener('click', (e) => {
  if (e.target === dialogModal) {
    isModalOpen = false;
    dialogModal.classList.add('hidden');
  }
});

// 8b. Modale Interazione Gattini (Livello 2)
function openCatModal(catKey) {
  isModalOpen = true;
  pausePlayerMovement();

  const data = level2Data.cats && level2Data.cats[catKey];
  if (!data) return;

  catModalTitle.textContent = data.title;
  if (data.subtitle) {
    catModalSubtitle.textContent = data.subtitle;
    catModalSubtitle.style.display = 'block';
  } else {
    catModalSubtitle.textContent = '';
    catModalSubtitle.style.display = 'none';
  }
  catModalMedia.innerHTML = data.htmlContent;
  catModalText.textContent = data.text;

  catModal.classList.remove('hidden');
  triggerHeartExplosion();
  if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
}

function closeCatModal() {
  catModal.classList.add('hidden');
  catModalMedia.innerHTML = ''; // reset per pulire l'iframe
  isModalOpen = false;
}

btnCloseCatModal.addEventListener('click', closeCatModal);
catModal.addEventListener('click', (e) => {
  if (e.target === catModal) closeCatModal();
});

// 8c. Modale Scacchiera Interattiva - Scacco Matto in 1 (Livello 2)
const INITIAL_CHESS_POSITION = {
  // Pezzi Bianchi
  'g1': 'wK',
  'h3': 'wQ',
  'e1': 'wR',
  'f7': 'wR',
  'b3': 'wP',
  'g2': 'wP',
  'h2': 'wP',
  // Pezzi Neri
  'g8': 'bK',
  'c2': 'bQ',
  'c8': 'bR',
  'f8': 'bR',
  'a6': 'bP',
  'b5': 'bP',
  'g6': 'bP',
  'h7': 'bP'
};

const CHESS_PIECE_ICONS = {
  'wK': '/contenuti/ambienti/livello2/chess/wK.svg',
  'wQ': '/contenuti/ambienti/livello2/chess/wQ.svg',
  'wR': '/contenuti/ambienti/livello2/chess/wR.svg',
  'wP': '/contenuti/ambienti/livello2/chess/wP.svg',
  'bK': '/contenuti/ambienti/livello2/chess/bK.svg',
  'bQ': '/contenuti/ambienti/livello2/chess/bQ.svg',
  'bR': '/contenuti/ambienti/livello2/chess/bR.svg',
  'bP': '/contenuti/ambienti/livello2/chess/bP.svg'
};

const CHESS_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let currentChessPosition = { ...INITIAL_CHESS_POSITION };
let selectedChessSquare = null;
let lastChessMove = null;

function renderChessBoard(highlightMateSquare = null) {
  if (!chessBoardGrid) return;
  chessBoardGrid.innerHTML = '';

  for (let rank = 8; rank >= 1; rank--) {
    for (let fIdx = 0; fIdx < 8; fIdx++) {
      const file = CHESS_FILES[fIdx];
      const sq = file + rank;
      const isDark = (fIdx + (8 - rank)) % 2 === 1;

      const sqEl = document.createElement('div');
      sqEl.className = 'chess-square ' + (isDark ? 'dark' : 'light');
      sqEl.dataset.square = sq;

      if (selectedChessSquare === sq) {
        sqEl.classList.add('highlight-selected');
      }
      if (highlightMateSquare === sq) {
        sqEl.classList.add('highlight-mate');
      }
      if (lastChessMove && (lastChessMove.from === sq || lastChessMove.to === sq)) {
        sqEl.classList.add('highlight-prev');
      }

      // Coordinate bordo
      if (file === 'a') {
        const rankSpan = document.createElement('span');
        rankSpan.className = 'chess-coord-rank';
        rankSpan.textContent = rank;
        sqEl.appendChild(rankSpan);
      }
      if (rank === 1) {
        const fileSpan = document.createElement('span');
        fileSpan.className = 'chess-coord-file';
        fileSpan.textContent = file;
        sqEl.appendChild(fileSpan);
      }

      // Icona Pezzo
      const piece = currentChessPosition[sq];
      if (piece && CHESS_PIECE_ICONS[piece]) {
        const img = document.createElement('img');
        img.src = CHESS_PIECE_ICONS[piece];
        img.className = 'chess-piece-img';
        img.alt = piece;
        sqEl.appendChild(img);
      }

      chessBoardGrid.appendChild(sqEl);
    }
  }
}

function handleChessSquareClick(sq) {
  if (chessTable.isSolved && !selectedChessSquare) {
    const partnerName = currentCharacter === 'lui' ? 'Rebecca' : 'Elton';
    chessStatusText.textContent = `Hai già dato scacco matto! 🎉 Raggiungi ${partnerName}!`;
    return;
  }

  const pieceOnSquare = currentChessPosition[sq];

  // Caso 1: Nessun pezzo attualmente selezionato
  if (!selectedChessSquare) {
    if (pieceOnSquare && pieceOnSquare.startsWith('w')) {
      selectedChessSquare = sq;
      const pieceName = pieceOnSquare === 'wQ' ? 'la Regina' : (pieceOnSquare === 'wR' ? 'la Torre' : (pieceOnSquare === 'wK' ? 'il Re' : 'il Pedone'));
      chessStatusText.textContent = `Hai selezionato ${pieceName} (${sq.toUpperCase()}). Ora tocca la casella di destinazione!`;
      renderChessBoard();
      if (navigator.vibrate) navigator.vibrate(20);
    } else if (pieceOnSquare && pieceOnSquare.startsWith('b')) {
      chessStatusText.textContent = 'È il turno del Bianco! Tocca la Regina bianca per muovere.';
    } else {
      chessStatusText.textContent = 'Tocca un pezzo bianco (la Regina in H3) per preparare lo scacco matto!';
    }
    return;
  }

  // Caso 2: Un pezzo bianco è già selezionato
  const selectedPiece = currentChessPosition[selectedChessSquare];

  // Clic sulla stessa casella -> Deseleziona
  if (sq === selectedChessSquare) {
    selectedChessSquare = null;
    chessStatusText.textContent = 'Pezzo deselezionato. Tocca la Regina in H3!';
    renderChessBoard();
    return;
  }

  // Clic su un altro pezzo bianco -> Cambia selezione
  if (pieceOnSquare && pieceOnSquare.startsWith('w')) {
    selectedChessSquare = sq;
    const pieceName = pieceOnSquare === 'wQ' ? 'la Regina' : (pieceOnSquare === 'wR' ? 'la Torre' : (pieceOnSquare === 'wK' ? 'il Re' : 'il Pedone'));
    chessStatusText.textContent = `Hai selezionato ${pieceName} (${sq.toUpperCase()}). Ora tocca la destinazione!`;
    renderChessBoard();
    if (navigator.vibrate) navigator.vibrate(20);
    return;
  }

  // Clic su una casella di destinazione (vuota o pezzo nero)
  const from = selectedChessSquare;
  const to = sq;

  // VERIFICA SE È LA MOSSA VINCENTE: Regina in H3 muove in H7 (Qxh7#)
  if (from === 'h3' && to === 'h7') {
    // Esecuzione mossa vincente!
    delete currentChessPosition['h3'];
    currentChessPosition['h7'] = 'wQ';
    lastChessMove = { from: 'h3', to: 'h7' };
    selectedChessSquare = null;
    renderChessBoard('h7');

    chessStatusText.textContent = '👑 SCACCO MATTO IN 1! Mossa da Maestro!';
    chessTable.isSolved = true;
    triggerHeartExplosion();
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

    setTimeout(() => {
      showChessResult(true);
    }, 450);
  } else {
    // MOSSA SBAGLIATA! Mostra subito esito con Homer Simpson e titolo "riprova"
    selectedChessSquare = null;
    renderChessBoard();
    if (navigator.vibrate) navigator.vibrate(60);
    showChessResult(false);
  }
}

function showChessResult(isSuccess) {
  chessBoardView.classList.add('hidden');
  chessResultView.classList.remove('hidden');

  if (isSuccess) {
    chessResultTitle.textContent = level2Data.chess.successMsg || 'DAMN! SCACCO MATTO! 🏆✨';
    chessResultTitle.style.color = 'var(--accent-gold)';
    chessResultMedia.innerHTML = level2Data.chess.successGifHtml;
    chessResultMsg.textContent = 'Scacco matto da gran maestro! La via per raggiungere la tua metà è aperta! 🏆💖';
    btnChessAction.textContent = 'Continua l\'avventura 💖';
    btnChessAction.onclick = () => {
      closeChessModal();
    };
  } else {
    chessResultTitle.textContent = level2Data.chess.wrongMsg || 'riprova';
    chessResultTitle.style.color = 'var(--accent-rose)';
    chessResultMedia.innerHTML = level2Data.chess.wrongGifHtml;
    chessResultMsg.textContent = 'Non è la mossa vincente... ripensaci bene, c\'è uno scacco matto imparabile in una sola mossa!';
    btnChessAction.textContent = 'Riprova la mossa ♟️';
    btnChessAction.onclick = () => {
      resetChessGame();
    };
  }
}

function resetChessGame() {
  currentChessPosition = { ...INITIAL_CHESS_POSITION };
  selectedChessSquare = null;
  lastChessMove = null;
  chessResultMedia.innerHTML = '';
  chessResultView.classList.add('hidden');
  chessBoardView.classList.remove('hidden');
  chessStatusText.textContent = 'Il Bianco muove e dà matto in 1! Tocca la Regina bianca per iniziare.';
  renderChessBoard();
}

function openChessModal() {
  isModalOpen = true;
  pausePlayerMovement();

  if (chessTable.isSolved) {
    currentChessPosition = { ...INITIAL_CHESS_POSITION };
    delete currentChessPosition['h3'];
    currentChessPosition['h7'] = 'wQ';
    lastChessMove = { from: 'h3', to: 'h7' };
    showChessResult(true);
  } else {
    resetChessGame();
  }

  chessModal.classList.remove('hidden');
}

function closeChessModal() {
  chessModal.classList.add('hidden');
  chessResultMedia.innerHTML = '';
  isModalOpen = false;
  if (chessTable.isSolved) {
    triggerHeartExplosion();
  }
}

if (chessBoardGrid) {
  chessBoardGrid.addEventListener('click', (e) => {
    const sqEl = e.target.closest('.chess-square');
    if (!sqEl) return;
    const sq = sqEl.dataset.square;
    if (sq) handleChessSquareClick(sq);
  });
}

if (btnCloseChess) {
  btnCloseChess.addEventListener('click', closeChessModal);
}
if (chessModal) {
  chessModal.addEventListener('click', (e) => {
    if (e.target === chessModal) closeChessModal();
  });
}

let heartParticles = [];
function triggerHeartExplosion() {
  let spawnX = canvas.width / 2;
  let spawnY = canvas.height / 2;

  if (currentLevel === 1) {
    spawnX = gateItem.x + gateItem.width / 2;
    spawnY = gateItem.y;
  } else if (currentLevel === 2) {
    if (currentInteractionTarget === 'cat1') {
      spawnX = level2Cats[0].x;
      spawnY = level2Cats[0].y;
    } else if (currentInteractionTarget === 'cat2') {
      spawnX = level2Cats[1].x;
      spawnY = level2Cats[1].y;
    } else {
      spawnX = chessTable.x + chessTable.width / 2;
      spawnY = chessTable.y + 4;
    }
  } else if (currentLevel === 3) {
    spawnX = level3Sign.x + 14;
    spawnY = level3Sign.y;
  } else if (currentLevel === 4) {
    spawnX = partnerNPC.x;
    spawnY = partnerNPC.y;
  }

  for (let i = 0; i < 18; i++) {
    heartParticles.push({
      x: spawnX,
      y: spawnY,
      vx: (Math.random() - 0.5) * 3,
      vy: -1.5 - Math.random() * 2.5,
      life: 1.0,
      char: Math.random() > 0.5 ? '💖' : '✨'
    });
  }
}


// ============================================================================
// 9. GESTIONE DEI COMANDI (TOUCH & TASTIERA)
// ============================================================================

function bindTouchButton(buttonEl, directionKey) {
  const startAction = (e) => {
    e.preventDefault();
    if (isModalOpen || !isGameStarted) return;
    try {
      if (e.pointerId !== undefined && buttonEl.setPointerCapture) {
        buttonEl.setPointerCapture(e.pointerId);
      }
    } catch (_) { }
    inputState[directionKey] = true;
    buttonEl.classList.add('active');
    if (navigator.vibrate) {
      try { navigator.vibrate(12); } catch (_) { }
    }
  };

  const endAction = (e) => {
    e.preventDefault();
    try {
      if (e.pointerId !== undefined && buttonEl.hasPointerCapture && buttonEl.hasPointerCapture(e.pointerId)) {
        buttonEl.releasePointerCapture(e.pointerId);
      }
    } catch (_) { }
    inputState[directionKey] = false;
    buttonEl.classList.remove('active');
  };

  // Pointer Events gestiscono uniformemente mouse, touch e penna senza interruzioni
  buttonEl.addEventListener('pointerdown', startAction);
  buttonEl.addEventListener('pointerup', endAction);
  buttonEl.addEventListener('pointercancel', endAction);

  // Evita che la pressione prolungata apra il menu contestuale dello smartphone
  buttonEl.addEventListener('contextmenu', (e) => e.preventDefault());
}

bindTouchButton(btnUp, 'up');
bindTouchButton(btnLeft, 'left');
bindTouchButton(btnRight, 'right');
bindTouchButton(btnDown, 'down');

btnInteract.addEventListener('click', triggerInteraction);
btnInteract.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  triggerInteraction();
});
btnInteract.addEventListener('contextmenu', (e) => e.preventDefault());

const MOVEMENT_KEYS = new Set([
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'w', 'W', 's', 'S', 'a', 'A', 'd', 'D',
  ' ', 'Spacebar', 'e', 'E'
]);

window.addEventListener('keydown', (e) => {
  if (MOVEMENT_KEYS.has(e.key)) {
    // Evita il ricalcolo continuo dello scroll del browser quando si tengono premuti i tasti
    e.preventDefault();
  }

  if (isModalOpen) {
    if (e.key === 'Escape') {
      closePolaroidModal();
      closeMonsterQuizModal();
      closeQuizModal();
      closeDilemmaModal();
      dialogModal.classList.add('hidden');
      isModalOpen = false;
    }
    return;
  }
  if (!isGameStarted) return;

  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') inputState.up = true;
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') inputState.down = true;
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inputState.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inputState.right = true;
  if ((e.key === ' ' || e.key === 'e' || e.key === 'E') && currentInteractionTarget) {
    triggerInteraction();
  }
});

window.addEventListener('keyup', (e) => {
  if (MOVEMENT_KEYS.has(e.key)) {
    e.preventDefault();
  }
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') inputState.up = false;
  if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') inputState.down = false;
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inputState.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inputState.right = false;
});

window.addEventListener('blur', () => {
  pausePlayerMovement();
});


// ============================================================================
// 10. AGGIORNAMENTO DELLA LOGICA DI GIOCO (UPDATE LOOP)
// ============================================================================

let lastTime = performance.now();

function update(deltaTime) {
  if (isModalOpen || !isGameStarted) return;

  // Clamppiamo deltaTime tra 1ms e 50ms per proteggere da frame drop improvvisi
  const clampedDelta = Math.min(Math.max(deltaTime, 1), 50);
  // Fattore di movimento normalizzato ai 60 FPS standard (16.667ms)
  const deltaFactor = clampedDelta / (1000 / 60);

  if (levelTransitionAlpha > 0) {
    levelTransitionAlpha = Math.max(0, levelTransitionAlpha - clampedDelta / 450);
  }

  let moveX = 0;
  let moveY = 0;

  if (inputState.up) {
    moveY -= 1;
    player.facing = 'up';
  }
  if (inputState.down) {
    moveY += 1;
    player.facing = 'down';
  }
  if (inputState.left) {
    moveX -= 1;
    player.facing = 'left';
  }
  if (inputState.right) {
    moveX += 1;
    player.facing = 'right';
  }

  player.isMoving = (moveX !== 0 || moveY !== 0);

  if (player.isMoving) {
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.7071;
      moveY *= 0.7071;
    }

    const stepX = moveX * player.speed * deltaFactor;
    const stepY = moveY * player.speed * deltaFactor;

    if (stepX !== 0 && canMoveTo(player.x + stepX, player.y)) {
      player.x += stepX;
    }
    if (stepY !== 0 && canMoveTo(player.x, player.y + stepY)) {
      player.y += stepY;
    }

    player.animTimer += clampedDelta;
  } else {
    player.animTimer = 0;
  }

  for (let i = heartParticles.length - 1; i >= 0; i--) {
    const p = heartParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= clampedDelta / 1000;
    if (p.life <= 0) heartParticles.splice(i, 1);
  }

  // Aggiornamento animazione gattini nel Livello 2
  if (currentLevel === 2) {
    for (let i = 0; i < level2Cats.length; i++) {
      level2Cats[i].animTimer += clampedDelta;
    }
  }

  // Aggiornamento lucciole fluttuanti nel Gran Finale
  if (currentLevel === 4) {
    for (let i = 0; i < fireflies.length; i++) {
      const fly = fireflies[i];
      fly.x += fly.vx;
      fly.y += fly.vy;
      if (fly.y < -10) fly.y = canvas.height + 10;
      if (fly.x < -10) fly.x = canvas.width + 10;
      if (fly.x > canvas.width + 10) fly.x = -10;
    }
  }

  checkInteractionProximity();
}


// ============================================================================
// 11. DISEGNO GRAFICO & PROFONDITÀ Y-SORTING (DRAW LOOP)
// ============================================================================

let cachedStaticRenderItems = null;

function invalidateRenderItemsCache() {
  cachedStaticRenderItems = null;
}

function getStaticRenderItems() {
  if (cachedStaticRenderItems) return cachedStaticRenderItems;

  const items = [];
  let activeTrees = map1Trees;
  let activeBushes = map1Bushes;
  if (currentLevel === 3) {
    activeTrees = map3Trees;
    activeBushes = map3Bushes;
  } else if (currentLevel === 4) {
    activeTrees = map4Trees;
    activeBushes = map4Bushes;
  }

  if (currentLevel !== 2) {
    for (let i = 0; i < activeTrees.length; i++) {
      const tree = activeTrees[i];
      items.push({
        type: 'tree',
        x: tree.x,
        y: tree.y,
        variant: tree.variant,
        sortY: tree.y + 76
      });
    }

    for (let i = 0; i < activeBushes.length; i++) {
      const b = activeBushes[i];
      items.push({
        type: 'bush',
        x: b.x,
        y: b.y,
        sortY: b.y + 26
      });
    }
  }

  if (currentLevel === 1) {
    items.push({
      type: 'bench',
      x: benchItem1.x,
      y: benchItem1.y,
      width: benchItem1.width,
      height: benchItem1.height,
      sortY: benchItem1.y + benchItem1.height
    });

    items.push({
      type: 'gate',
      x: gateItem.x,
      y: gateItem.y,
      width: gateItem.width,
      height: gateItem.height,
      get isOpen() { return gateItem.isOpen; },
      sortY: gateItem.y + 16
    });
  } else if (currentLevel === 2) {
    items.push({
      type: 'chessTable',
      x: chessTable.x,
      y: chessTable.y,
      width: chessTable.width,
      height: chessTable.height,
      sortY: chessTable.y + chessTable.height
    });
  } else if (currentLevel === 3) {
    items.push({
      type: 'sign',
      x: level3Sign.x,
      y: level3Sign.y,
      width: level3Sign.width,
      height: level3Sign.height,
      get isResolved() { return level3Sign.isResolved; },
      sortY: level3Sign.y + level3Sign.height
    });

    items.push({
      type: 'bench',
      x: benchItem3.x,
      y: benchItem3.y,
      width: benchItem3.width,
      height: benchItem3.height,
      sortY: benchItem3.y + benchItem3.height
    });
  }

  cachedStaticRenderItems = items;
  return cachedStaticRenderItems;
}

const renderList = [];
const partnerRenderItem = {
  type: 'character',
  charKey: 'lei',
  x: 0,
  y: 0,
  facing: 'down',
  isMoving: false,
  animTimer: 0,
  renderSize: 48,
  label: 'LEI',
  labelColor: '#f472b6',
  sortY: 0,
  hasHeart: true
};

const playerRenderItem = {
  type: 'character',
  charKey: 'lui',
  x: 0,
  y: 0,
  facing: 'up',
  isMoving: false,
  animTimer: 0,
  renderSize: 48,
  label: 'TU',
  labelColor: '#ffffff',
  sortY: 0,
  hasHeart: false
};

function draw() {
  ctx.imageSmoothingEnabled = false;

  // Calcolo scorrimento telecamera (per Livello 2 orizzontale)
  let cameraX = 0;
  if (currentLevel === 2) {
    const maxCamX = LEVEL2_WORLD_WIDTH - canvas.width;
    cameraX = Math.round(Math.max(0, Math.min(maxCamX, player.x - canvas.width / 2)));
  }

  ctx.save();
  if (cameraX !== 0) {
    ctx.translate(-cameraX, 0);
  }

  // 1. Sfondo del livello
  if (currentLevel === 2) {
    // Sfondo panoramico pixel art Nature 1 (Livello 2)
    if (level2Background.loaded) {
      ctx.drawImage(level2Background.img, 0, 0, 576, 324, 0, 0, LEVEL2_WORLD_WIDTH, LEVEL2_WORLD_HEIGHT);
    } else {
      ctx.fillStyle = '#458532';
      ctx.fillRect(0, 0, LEVEL2_WORLD_WIDTH, LEVEL2_WORLD_HEIGHT);
    }
  } else if (currentLevel === 4) {
    // Atmosfera notturna / crepuscolare romantica per il Gran Finale
    ctx.fillStyle = '#1b3225';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#14271d';
    for (let y = 8; y < canvas.height; y += 16) {
      for (let x = 8; x < canvas.width; x += 16) {
        if ((x * 7 + y * 13) % 24 === 0) {
          ctx.fillRect(x, y, 2, 3);
        }
      }
    }
  } else {
    // Prato soleggiato diurno per i Livelli 1 e 3
    ctx.fillStyle = '#458532';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#3a732a';
    for (let y = 8; y < canvas.height; y += 16) {
      for (let x = 8; x < canvas.width; x += 16) {
        if ((x * 7 + y * 13) % 24 === 0) {
          ctx.fillRect(x, y, 2, 3);
        }
      }
    }
  }

  // 2. Sentiero Centrale e Piazzola d'incontro (per Livello 1, 3 e 4)
  if (currentLevel === 1) {
    ctx.fillStyle = '#945b3e';
    ctx.fillRect(92, 44, 136, canvas.height - 44);
    ctx.fillStyle = '#b17251';
    ctx.fillRect(98, 48, 124, canvas.height - 48);

    ctx.fillStyle = '#945b3e';
    ctx.fillRect(74, 34, 172, 60);
    ctx.fillStyle = '#b17251';
    ctx.fillRect(78, 38, 164, 52);

    ctx.fillStyle = '#caa38f';
    ctx.fillRect(125, 150, 3, 2);
    ctx.fillRect(175, 185, 2, 2);
    ctx.fillRect(145, 240, 3, 2);
    ctx.fillRect(160, 290, 2, 2);
    ctx.fillRect(120, 335, 3, 2);
  } else if (currentLevel === 3) {
    // Sentiero sinuoso del Livello 3 (curva morbida con slargo centrale)
    ctx.fillStyle = '#945b3e';
    ctx.fillRect(88, 44, 144, canvas.height - 44);
    ctx.fillStyle = '#b17251';
    ctx.fillRect(94, 48, 132, canvas.height - 48);

    // Piazzola centrale del cartello dei dilemmi
    ctx.fillStyle = '#945b3e';
    ctx.fillRect(84, 175, 152, 58);
    ctx.fillStyle = '#b17251';
    ctx.fillRect(88, 179, 144, 50);

    // Piazzola partner in cima
    ctx.fillStyle = '#945b3e';
    ctx.fillRect(74, 34, 172, 60);
    ctx.fillStyle = '#b17251';
    ctx.fillRect(78, 38, 164, 52);

    ctx.fillStyle = '#caa38f';
    ctx.fillRect(130, 130, 3, 2);
    ctx.fillRect(155, 205, 3, 2);
    ctx.fillRect(175, 260, 2, 2);
    ctx.fillRect(125, 320, 3, 2);
  } else if (currentLevel === 4) {
    // Sentiero romantico del Gran Finale
    ctx.fillStyle = '#6b4030';
    ctx.fillRect(122, 175, 76, canvas.height - 175);
    ctx.fillStyle = '#8f5641';
    ctx.fillRect(126, 178, 68, canvas.height - 178);

    // Grande piazza circolare romantica
    ctx.fillStyle = '#6b4030';
    ctx.beginPath();
    ctx.arc(160, 134, 66, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8f5641';
    ctx.beginPath();
    ctx.arc(160, 134, 60, 0, Math.PI * 2);
    ctx.fill();

    // Cuore disegnato con petali di rosa sul pavimento
    ctx.fillStyle = '#f472b6';
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💖', 160, 142);

    // Lanterne e candele intorno alla radura
    const candles = [
      { x: 110, y: 134 }, { x: 210, y: 134 },
      { x: 125, y: 92 }, { x: 195, y: 92 },
      { x: 125, y: 176 }, { x: 195, y: 176 }
    ];
    for (const c of candles) {
      ctx.font = '10px sans-serif';
      ctx.fillText('🕯️', c.x, c.y);
    }
  }

  // 3. Ciuffi d'erba fioriti
  if (currentLevel !== 2) {
    let activeGrass = map1GrassTufts;
    if (currentLevel === 3) activeGrass = map3GrassTufts;
    else if (currentLevel === 4) activeGrass = map4GrassTufts;

    if (env.grass.loaded) {
      for (const g of activeGrass) {
        ctx.drawImage(env.grass.img, g.x, g.y, 32, 32);
      }
    }
  }

  // 4. LISTA DI ENTITÀ PER PROFONDITÀ (Y-SORTING A ZERO ALLOCAZIONI)
  renderList.length = 0;
  const staticItems = getStaticRenderItems();
  for (let i = 0; i < staticItems.length; i++) {
    const item = staticItems[i];
    if (item.type === 'collectibleItem' && level2Item.isCollected) continue;
    renderList.push(item);
  }

  // Partner (NPC) - aggiorniamo l'oggetto persistente riutilizzato
  const partnerKey = activePlayerKey === 'lui' ? 'lei' : 'lui';
  partnerRenderItem.charKey = partnerKey;
  partnerRenderItem.x = partnerNPC.x;
  partnerRenderItem.y = partnerNPC.y;
  partnerRenderItem.facing = partnerNPC.facing;
  partnerRenderItem.renderSize = partnerNPC.renderSize;
  partnerRenderItem.label = partnerKey === 'lei' ? 'LEI' : 'LUI';
  partnerRenderItem.labelColor = partnerKey === 'lei' ? '#f472b6' : '#60a5fa';
  partnerRenderItem.sortY = partnerNPC.y + 16;

  // Giocatore - aggiorniamo l'oggetto persistente riutilizzato
  playerRenderItem.charKey = activePlayerKey;
  playerRenderItem.x = player.x;
  playerRenderItem.y = player.y;
  playerRenderItem.facing = player.facing;
  playerRenderItem.isMoving = player.isMoving;
  playerRenderItem.animTimer = player.animTimer;
  playerRenderItem.renderSize = player.renderSize;
  playerRenderItem.sortY = player.y + 16;

  renderList.push(partnerRenderItem);
  renderList.push(playerRenderItem);

  // Inserimento gattini nel Livello 2 ordinati per profondità
  if (currentLevel === 2 && catSprite.loaded) {
    for (let i = 0; i < level2Cats.length; i++) {
      const cat = level2Cats[i];
      renderList.push({
        type: 'cat',
        cat: cat,
        sortY: cat.y + 16
      });
    }
  }

  renderList.sort((a, b) => a.sortY - b.sortY);

  // Disegno elementi ordinati
  for (const item of renderList) {
    if (item.type === 'tree') {
      if (env.tree.loaded) {
        const sx = item.variant === 0 ? 0 : 96;
        ctx.drawImage(env.tree.img, sx, 0, 96, 96, item.x, item.y, 96, 96);
      }
    } else if (item.type === 'bush') {
      if (env.bush.loaded) {
        ctx.drawImage(env.bush.img, item.x, item.y, 32, 32);
      }
    } else if (item.type === 'bench') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(item.x + item.width / 2, item.y + item.height - 2, item.width * 0.45, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#654321';
      ctx.fillRect(item.x, item.y, item.width, 8);
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(item.x + 2, item.y + 1, item.width - 4, 6);

      ctx.fillStyle = '#5c3a21';
      ctx.fillRect(item.x + 2, item.y + 8, item.width - 4, 9);
      ctx.fillStyle = '#a06535';
      ctx.fillRect(item.x + 4, item.y + 9, item.width - 8, 7);

      ctx.fillStyle = '#3a2312';
      ctx.fillRect(item.x, item.y + 4, 3, 16);
      ctx.fillRect(item.x + item.width - 3, item.y + 4, 3, 16);
      ctx.fillRect(item.x + 6, item.y + 17, 3, 6);
      ctx.fillRect(item.x + item.width - 9, item.y + 17, 3, 6);

      // In Livello 1, disegna una mini lattina di Monster appoggiata sulla panchina
      if (currentLevel === 1 && monsterItem.loaded) {
        ctx.drawImage(monsterItem.img, item.x + item.width - 12, item.y + 4, 10, 12);
      }

      if (currentInteractionTarget === 'bench') {
        const pulse = Math.sin(Date.now() / 250) * 3;
        if (currentLevel === 1) {
          if (monsterItem.loaded) {
            const iconSize = 22;
            ctx.drawImage(
              monsterItem.img,
              Math.round(item.x + item.width / 2 - iconSize / 2),
              Math.round(item.y - 18 + pulse),
              iconSize,
              iconSize
            );
          } else {
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('⚡', item.x + item.width / 2, item.y - 12 + pulse);
          }
        } else {
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('📸', item.x + item.width / 2, item.y - 12 + pulse);
        }
      }
    } else if (item.type === 'sign') {
      // Disegno Cartello in Legno (Livello 3)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.beginPath();
      ctx.ellipse(item.x + 14, item.y + 24, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Palo di sostegno
      ctx.fillStyle = '#5c3a21';
      ctx.fillRect(item.x + 12, item.y + 10, 4, 16);

      // Tabella di legno
      ctx.fillStyle = '#8b5a2b';
      ctx.beginPath();
      ctx.roundRect(item.x, item.y, 28, 16, 4);
      ctx.fill();
      ctx.strokeStyle = '#5c3a21';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Icona cartello o segno di spunta se risolto
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      if (item.isResolved) {
        ctx.fillText('✅', item.x + 14, item.y + 12);
      } else {
        ctx.fillText('❓', item.x + 14, item.y + 12);
      }

      if (currentInteractionTarget === 'level3Sign') {
        const pulse = Math.sin(Date.now() / 250) * 3;
        ctx.font = '16px sans-serif';
        ctx.fillText('🪧', item.x + 14, item.y - 12 + pulse);
      }
    } else if (item.type === 'gate') {
      const postWidth = 8;
      const postHeight = 24;

      ctx.fillStyle = '#4a3525';
      ctx.fillRect(item.x, item.y - 4, postWidth, postHeight);
      ctx.fillRect(item.x + item.width - postWidth, item.y - 4, postWidth, postHeight);
      ctx.fillStyle = '#7a583e';
      ctx.fillRect(item.x + 2, item.y - 2, postWidth - 4, postHeight - 4);
      ctx.fillRect(item.x + item.width - postWidth + 2, item.y - 2, postWidth - 4, postHeight - 4);

      if (!item.isOpen) {
        ctx.fillStyle = '#6d4c33';
        ctx.fillRect(item.x + postWidth, item.y + 2, item.width - postWidth * 2, 5);
        ctx.fillRect(item.x + postWidth, item.y + 10, item.width - postWidth * 2, 5);

        ctx.fillStyle = '#8b5f3f';
        const numBars = 6;
        const spacing = (item.width - postWidth * 2) / (numBars + 1);
        for (let b = 1; b <= numBars; b++) {
          ctx.fillRect(item.x + postWidth + b * spacing - 2, item.y - 1, 4, 18);
        }

        const midX = item.x + item.width / 2;
        const midY = item.y + 7;
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(midX, midY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (currentInteractionTarget === 'gate') {
          const pulse = Math.sin(Date.now() / 250) * 3;
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🗝️', midX, midY - 18 + pulse);
        }
      } else {
        ctx.fillStyle = '#8b5f3f';
        ctx.fillRect(item.x + postWidth, item.y - 2, 16, 16);
        ctx.fillRect(item.x + item.width - postWidth - 16, item.y - 2, 16, 16);

        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌸', item.x + 4, item.y - 8);
        ctx.fillText('🌸', item.x + item.width - 4, item.y - 8);
      }
    } else if (item.type === 'chessTable') {
      // Ombra soffusa a terra
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(item.x + item.width / 2, item.y + item.height - 2, item.width * 0.45, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Gambe/supporto del tavolo in legno
      ctx.fillStyle = '#4a2e18';
      ctx.fillRect(item.x + 4, item.y + 14, 4, 10);
      ctx.fillRect(item.x + item.width - 8, item.y + 14, 4, 10);
      ctx.fillRect(item.x + Math.round(item.width / 2) - 2, item.y + 14, 4, 10);

      // Piano del tavolo in legno
      ctx.fillStyle = '#654321';
      ctx.fillRect(item.x, item.y + 6, item.width, 10);
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(item.x + 2, item.y + 4, item.width - 4, 8);

      // Scacchiera in miniatura sul piano
      const boardX = item.x + Math.round((item.width - 18) / 2);
      const boardY = item.y + 2;
      ctx.fillStyle = '#3e2714';
      ctx.fillRect(boardX - 1, boardY - 1, 20, 10);
      ctx.fillStyle = '#ecd9b9';
      ctx.fillRect(boardX, boardY, 18, 8);
      // Quadretti alternati della scacchiera
      ctx.fillStyle = '#b58863';
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if ((r + c) % 2 === 1) {
            ctx.fillRect(boardX + c * 4.5, boardY + r * 2, 4.5, 2);
          }
        }
      }

      // Sgabelli ai lati
      ctx.fillStyle = '#4a2e18';
      ctx.fillRect(item.x - 7, item.y + 12, 6, 8);
      ctx.fillRect(item.x + item.width + 1, item.y + 12, 6, 8);
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(item.x - 8, item.y + 10, 8, 4);
      ctx.fillRect(item.x + item.width, item.y + 10, 8, 4);

      // Icona sopra al tavolo
      const pulse = Math.sin(Date.now() / 250) * 3;
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      if (chessTable.isSolved) {
        ctx.fillText('🏆', item.x + item.width / 2, item.y - 12 + pulse);
      } else {
        ctx.fillText('♟️', item.x + item.width / 2, item.y - 12 + pulse);
      }

      if (currentInteractionTarget === 'chess') {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(item.x + item.width / 2, item.y + item.height / 2, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    } else if (item.type === 'character') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(item.x, item.y + item.renderSize / 2 - 4, item.renderSize * 0.3, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      drawLpcSprite(item.charKey, item.x, item.y, item.facing, item.isMoving, item.animTimer, item.renderSize);

      ctx.font = '10px Silkscreen, monospace';
      ctx.fillStyle = item.labelColor;
      ctx.textAlign = 'center';
      ctx.fillText(item.label, item.x, item.y + 36);

      if (item.hasHeart) {
        const pulse = Math.sin(Date.now() / 250) * 3;
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖', item.x, item.y - 32 + pulse);

        if (currentInteractionTarget === 'partner' || currentInteractionTarget === 'partnerFinale') {
          ctx.strokeStyle = 'rgba(244, 114, 182, 0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(item.x, item.y, 44, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    } else if (item.type === 'cat') {
      const cat = item.cat;
      const size = cat.renderSize || 38;
      const half = Math.round(size / 2);

      // Ombra soffusa a terra posizionata sotto le zampe
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.beginPath();
      ctx.ellipse(cat.x, cat.y + half - 3, size * 0.32, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Disegno del frame dello sprite scalato al 120%
      const frameIndex = Math.floor(cat.animTimer / cat.frameSpeed) % cat.totalFrames;
      const sx = frameIndex * 32;
      const sy = cat.row * 32;
      ctx.drawImage(
        catSprite.img,
        sx, sy, 32, 32,
        Math.round(cat.x - half), Math.round(cat.y - half),
        size, size
      );

      // Zampina affettuosa se il giocatore si avvicina
      const distToPlayer = Math.hypot(player.x - cat.x, player.y - cat.y);
      if (distToPlayer < 44) {
        const pulse = Math.sin(Date.now() / 200) * 2;
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🐾', cat.x, cat.y - half - 4 + pulse);
      }
    }
  }

  // 5. Particelle Cuori / Scintille
  for (const p of heartParticles) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.char, p.x, p.y);
    ctx.restore();
  }

  // 6. Lucciole luminose fluttuanti nel Gran Finale
  if (currentLevel === 4) {
    for (const fly of fireflies) {
      const pulse = Math.sin(Date.now() * fly.pulseSpeed + fly.pulseOffset) * 0.5 + 0.5;

      // Bagliore esterno soffuso
      ctx.fillStyle = fly.color;
      ctx.globalAlpha = 0.15 * pulse;
      ctx.beginPath();
      ctx.arc(fly.x, fly.y, fly.size * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Nucleo luminoso della lucciola
      ctx.globalAlpha = 0.4 + pulse * 0.55;
      ctx.beginPath();
      ctx.arc(fly.x, fly.y, fly.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }

  // Ripristiniamo la matrice di trasformazione per disegnare l'HUD fisso a schermo
  ctx.restore();

  // 7. HUD di Livello in alto
  ctx.font = '9px Silkscreen, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.textAlign = 'left';

  let currentTitle = level1Data.title;
  if (currentLevel === 2) currentTitle = level2Data.title;
  else if (currentLevel === 3) currentTitle = level3Data.title;
  else if (currentLevel === 4) currentTitle = levelFinaleData.title;
  ctx.fillText(currentTitle, 10, 18);

  // HUD Missione a destra
  ctx.textAlign = 'right';
  if (currentLevel === 2) {
    if (chessTable.isSolved) {
      ctx.fillStyle = '#86efac';
      ctx.fillText('♟️ SCACCO MATTO! ✅', canvas.width - 10, 18);
    } else {
      ctx.fillStyle = '#fde047';
      ctx.fillText('♟️ SCACCO IN 1 🔍', canvas.width - 10, 18);
    }
  } else if (currentLevel === 3) {
    if (level3Sign.isResolved) {
      ctx.fillStyle = '#86efac';
      ctx.fillText('DILEMMA: RISOLTO! ✅', canvas.width - 10, 18);
    } else {
      ctx.fillStyle = '#fde047';
      ctx.fillText('DILEMMA: DA RISOLVERE ❓', canvas.width - 10, 18);
    }
  } else if (currentLevel === 4) {
    ctx.fillStyle = '#f472b6';
    ctx.fillText('INSIEME PER SEMPRE 💖', canvas.width - 10, 18);
  }

  // 8. Dissolvenza di apertura livello (Fade-in)
  if (levelTransitionAlpha > 0) {
    ctx.fillStyle = `rgba(13, 17, 23, ${levelTransitionAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function drawLpcSprite(charKey, x, y, facing, isMoving, animTimer, scale) {
  const spriteObj = sprites[charKey];
  const half = scale / 2;

  if (spriteObj && spriteObj.loaded) {
    const row = ROW_MAP[facing] !== undefined ? ROW_MAP[facing] : ROW_MAP.down;
    const sy = row * FRAME_SIZE;

    let frameIndex = 0;
    if (isMoving) {
      frameIndex = 1 + (Math.floor(animTimer / 110) % 8);
    }
    const sx = frameIndex * FRAME_SIZE;

    ctx.drawImage(
      spriteObj.img,
      sx, sy, FRAME_SIZE, FRAME_SIZE,
      Math.round(x - half), Math.round(y - half), scale, scale
    );
  }
}


// ============================================================================
// 12. AVVIO DEL CICLO PRINCIPALE (GAME LOOP)
// ============================================================================

function gameLoop(currentTime) {
  const rawDelta = currentTime - lastTime;
  // Se la pagina è stata in background o al primo caricamento, protegge da deltaTime giganteschi
  const deltaTime = (rawDelta > 0 && rawDelta < 200) ? rawDelta : (1000 / 60);
  lastTime = currentTime;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
