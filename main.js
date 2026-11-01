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
    question: 'Chi è stato il primo a dire ti amo all\'altro?',
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

// --- CONTENUTI LIVELLO 3: "Il Covo del Mostro" (Caverna di Lava, 3 Prove & Boss Fight) ---
const level3Data = {
  title: 'LIVELLO 3: IL COVO DEL MOSTRO',

  // Dialoghi del partner quando è intrappolato nella gabbia
  partnerCagedLui: 'Ti vede attraverso le sbarre della gabbia con gli occhi spalancati: "Amore! Questo mostro mi ha intrappolato qui dentro... supera le 3 prove e salverai entrambi! Fai presto! 😭🔥"',
  partnerCagedLei: 'Ti chiama disperata da dentro la gabbia: "Amore aiuto! Rompi il sigillo di fuoco, risolvi l\'altare di scacchi e prendi la spada per sconfiggerlo! 😭🔥"',

  // Dialoghi di vittoria dopo aver sconfitto il mostro e aperto la gabbia
  partnerSuccessLui: 'Ti stringe fortissimo appena aperta la gabbia: "Mi hai salvato amore mio! Sapevo che avresti sconfitto qualsiasi mostro per me! Ora corriamo al nostro traguardo finale!" 💖✨',
  partnerSuccessLei: 'Ti salta al collo commossa: "Sei il mio eroe! Ora niente e nessuno al mondo potrà mai più separarci! Andiamo subito alla nostra sorpresa finale!" 💖✨',

  // 1. IL QUIZ DELLE FIAMME (5 Domande con GIF personalizzata in caso di errore)
  quiz: {
    title: 'Il Sigillo delle Fiamme',
    subtitle: 'Rispondi correttamente a 5 domande consecutive: se ne sbagli anche solo una, dovrai ricominciare.',
    wrongGifHtml: `<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/1T96TRBBGYThC" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/fail-epic-cat-1T96TRBBGYThC" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`,
    questions: [
      {
        question: '1/5 • Qual è la regola fondamentale quando si ordina la pizza o il sushi insieme?',
        options: [
          'Ognuno mangia solo ed esclusivamente dal proprio piatto',
          '"Io non ho fame, prendo poco"... e poi sparisce metà del cibo dell\'altro!',
          'Si mangia in silenzio religioso senza dividere nulla',
          'Si aspetta che si raffreddi tutto per un\'ora'
        ],
        correctIndex: 1
      },
      {
        question: '2/5 • Chi è che perde SEMPRE chiavi, occhiali o telefono nei posti più assurdi?',
        options: [
          'Nessuno dei due, siamo campioni mondiali di ordine',
          'Tu, senza neanche doverci riflettere un secondo!',
          'Io... ma solo perché gli oggetti decidono magicamente di nascondersi!',
          'Gerry Scotti ce li nasconde per fare audience'
        ],
        correctIndex: 1
      },
      {
        question: '3/5 • Cosa significa REALMENTE la frase: "Faccio in 5 minuti e sono pronta/o"?',
        options: [
          'Esattamente 300 secondi cronometrati al millisecondo',
          'Un\'unità di tempo misteriosa che può variare tra 45 e 90 minuti!',
          'Che siamo già in macchina ad aspettare',
          'Che la partenza è rimandata a domani'
        ],
        correctIndex: 1
      },
      {
        question: '4/5 • Qual è il rimedio infallibile e scientificamente approvato dopo una giornata pesante?',
        options: [
          'Un abbraccio fortissimo sul divano, coccole e qualcosa di buono',
          'Rileggere il manuale di istruzioni del tostapane',
          'Mettersi a pulire la cantina con musica classica',
          'Dormire sul pavimento freddo'
        ],
        correctIndex: 0
      },
      {
        question: '5/5 • Chi è la persona più testarda, speciale e insostituibile di questo universo?',
        options: [
          'Il vicino di casa',
          'Tu, la mia persona preferita in assoluto in tutto il mondo!',
          'Un robot dell\'intelligenza artificiale',
          'L\'arbitro dell\'ultima partita'
        ],
        correctIndex: 1
      }
    ]
  },

  // 2. L'ALTARE DEGLI SCACCHI (3 Posizioni di Scacco Matto in 2)
  chess: {
    title: 'L\'Altare Tattico degli Scacchi ♟️',
    subtitle: 'Risolvi 3 posizioni di scacco matto in 2 mosse per risvegliare la Spada!',
    puzzles: [
      {
        id: 1,
        title: 'Puzzle 1/3 • Il Varco della Regina (Matto del Corridoio)',
        hint: 'Il Bianco muove e dà matto in 2! Sacrifica la Donna in fondo per aprire la strada alla Torre!',
        // Bianco: wK g1, wQ d6, wR f1, wP g2, wP h2 | Nero: bK h8, bR g8, bP g7, bP h7
        initialPosition: {
          'g1': 'wK', 'd6': 'wQ', 'f1': 'wR', 'g2': 'wP', 'h2': 'wP',
          'h8': 'bK', 'g8': 'bR', 'g7': 'bP', 'h7': 'bP'
        },
        playerMove1: { from: 'd6', to: 'f8', piece: 'wQ' }, // Df8+!
        blackResponse: { from: 'g8', to: 'f8', piece: 'bR' }, // Txf8
        playerMove2: { from: 'f1', to: 'f8', piece: 'wR' }, // Txf8# MATTO!
        mateSquare: 'f8',
        desc: '1. Df8+! Txf8 2. Txf8#! Il celebre sacrificio di Donna con Scacco Matto del Corridoio!'
      },
      {
        id: 2,
        title: 'Puzzle 2/3 • Il Matto di Filidoro (Matto Affogato)',
        hint: 'Il Bianco muove e dà matto in 2! Sacrifica la Donna sotto il Re per il leggendario matto affogato di Cavallo!',
        // Bianco: wK g1, wQ c4, wN h6, wP g2, wP h2 | Nero: bK h8, bR f8, bP g7, bP h7
        initialPosition: {
          'g1': 'wK', 'c4': 'wQ', 'h6': 'wN', 'g2': 'wP', 'h2': 'wP',
          'h8': 'bK', 'f8': 'bR', 'g7': 'bP', 'h7': 'bP'
        },
        playerMove1: { from: 'c4', to: 'g8', piece: 'wQ' }, // Dg8+!
        blackResponse: { from: 'f8', to: 'g8', piece: 'bR' }, // Txg8
        playerMove2: { from: 'h6', to: 'f7', piece: 'wN' }, // Cf7# MATTO AFFOGATO!
        mateSquare: 'f7',
        desc: '1. Dg8+! Txg8 2. Cf7#! Il leggendario Matto Affogato: il Re nero è soffocato dai suoi stessi pezzi!'
      },
      {
        id: 3,
        title: 'Puzzle 3/3 • Il Matto di Anastasia',
        hint: 'Il Bianco muove e dà matto in 2! Sacrifica la Donna sulla colonna h per concludere con la Torre!',
        // Bianco: wK g1, wN e7, wR d3, wQ h5, wP f2, wP g2 | Nero: bK h8, bR e8, bP g7
        initialPosition: {
          'g1': 'wK', 'e7': 'wN', 'd3': 'wR', 'h5': 'wQ', 'f2': 'wP', 'g2': 'wP',
          'h8': 'bK', 'e8': 'bR', 'g7': 'bP'
        },
        playerMove1: { from: 'h5', to: 'h7', piece: 'wQ' }, // Dxh7+!
        blackResponse: { from: 'h8', to: 'h7', piece: 'bK' }, // Rxh7
        playerMove2: { from: 'd3', to: 'h3', piece: 'wR' }, // Th3# MATTO DI ANASTASIA!
        mateSquare: 'h3',
        desc: '1. Dxh7+! Rxh7 2. Th3#! Lo spettacolare Matto di Anastasia con Cavallo ed infilata di Torre!'
      }
    ],
    wrongGifHtml: `<div style="width:100%;height:0;padding-bottom:77%;position:relative;"><iframe src="https://giphy.com/embed/eMu0803X2zkWY" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/the-simpsons-eMu0803X2zkWY" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`,
    successGifHtml: `<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/twxoPjMpsijwPFBVqs" width="100%" height="100%" style="position:absolute;left:0;top:0;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p style="font-size:10px;text-align:center;margin:6px 0 2px;"><a href="https://giphy.com/gifs/HBOMax-friday-hbomax-fridayonhbomax-twxoPjMpsijwPFBVqs" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:none;">via GIPHY</a></p>`
  },

  // 3. LA BOSS FIGHT (Il Mostro e la Spada)
  boss: {
    name: 'Il Demone delle Ceneri',
    maxHp: 100,
    weaponName: 'Spada di Fiamma Eterna',
    needWeaponMsg: 'Il mostro ruggisce con occhi infuocati: "Non puoi affrontarmi a mani nude, insolente! Solo chi supera il Sigillo e risolve l\'Altare Tattico otterrà l\'arma per sfidarmi!" 👹🔥'
  }
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
const devLevelSelect = document.getElementById('dev-level-select');

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

// --- MODALI LIVELLO 3 (Quiz 5 Domande, Scacchi Matto in 2, Boss Fight) ---
// 1. Modale Quiz 5 Domande (Livello 3)
const level3QuizModal = document.getElementById('level3-quiz-modal');
const level3QuizQuestionView = document.getElementById('level3-quiz-question-view');
const level3QuizErrorView = document.getElementById('level3-quiz-error-view');
const level3QuizStep = document.getElementById('level3-quiz-step');
const level3QuizTitle = document.getElementById('level3-quiz-title');
const level3QuizProgressFill = document.getElementById('level3-quiz-progress-fill');
const level3QuizQuestion = document.getElementById('level3-quiz-question');
const level3QuizOptionsContainer = document.getElementById('level3-quiz-options-container');
const level3QuizErrorMedia = document.getElementById('level3-quiz-error-media');
const level3QuizErrorMsg = document.getElementById('level3-quiz-error-msg');
const btnRetryLevel3Quiz = document.getElementById('btn-retry-level3-quiz');
const btnCloseLevel3Quiz = document.getElementById('btn-close-level3-quiz');

// 2. Modale Scacchi Matto in 2 (Livello 3)
const level3ChessModal = document.getElementById('level3-chess-modal');
const level3ChessStep = document.getElementById('level3-chess-step');
const level3ChessTitle = document.getElementById('level3-chess-title');
const level3ChessBoardView = document.getElementById('level3-chess-board-view');
const level3ChessResultView = document.getElementById('level3-chess-result-view');
const level3ChessBoardGrid = document.getElementById('level3-chess-board');
const level3ChessStatusText = document.getElementById('level3-chess-status-text');
const btnCloseLevel3Chess = document.getElementById('btn-close-level3-chess');
const level3ChessResultTitle = document.getElementById('level3-chess-result-title');
const level3ChessResultMedia = document.getElementById('level3-chess-result-media');
const level3ChessResultMsg = document.getElementById('level3-chess-result-msg');
const btnLevel3ChessAction = document.getElementById('btn-level3-chess-action');

// 3. Modale Boss Fight con il Mostro (Livello 3)
const level3BossModal = document.getElementById('level3-boss-modal');
const bossNameEl = document.getElementById('boss-name');
const bossHpText = document.getElementById('boss-hp-text');
const bossHpFill = document.getElementById('boss-hp-fill');
const bossVisual = document.getElementById('boss-visual');
const bossSlashFx = document.getElementById('boss-slash-effect');
const bossHitBubble = document.getElementById('boss-hit-bubble');
const timingTrack = document.getElementById('timing-track');
const timingPointer = document.getElementById('timing-pointer');
const bossBattleStatus = document.getElementById('boss-battle-status');
const btnBossAttack = document.getElementById('btn-boss-attack');
const bossVictoryView = document.getElementById('boss-victory-view');
const btnBossVictoryContinue = document.getElementById('btn-boss-victory-continue');
const btnCloseBossModal = document.getElementById('btn-close-boss-modal');

// Modale 4: Livello Completato
const levelClearModal = document.getElementById('level-clear-modal');
const levelClearBadgeEl = document.getElementById('level-clear-badge');
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

// Sfondo Panoramico Livello 3 (Underfire - The Altar - Pixel Art)
const level3Background = {
  img: new Image(),
  loaded: false
};
level3Background.img.src = '/contenuti/ambienti/livello3/background.png';
level3Background.img.onload = () => { level3Background.loaded = true; };

const LEVEL3_WORLD_WIDTH = 683;
const LEVEL3_WORLD_HEIGHT = 384;

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

let selectedDevStartLevel = 1;
const devLevelBtns = document.querySelectorAll('.dev-level-btn');
devLevelBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    devLevelBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDevStartLevel = parseInt(btn.dataset.level, 10);
    if (devLevelSelect) devLevelSelect.value = String(selectedDevStartLevel);
  });
});

btnStartGame.addEventListener('click', () => {
  activePlayerKey = selectedCharKey;
  isGameStarted = true;
  selectionScreen.classList.add('hidden');

  headerAvatarName.textContent = activePlayerKey === 'lui' ? 'Elton' : 'Rebecca';
  if (headerAvatarIcon) {
    headerAvatarIcon.textContent = '';
    headerAvatarIcon.style.display = 'none';
  }

  switchToLevel(selectedDevStartLevel || 1);
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
  } else if (currentLevel === 3) {
    player.x = 48;
    player.y = 295;
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

// --- ELEMENTI DEL LIVELLO 3 (Il Covo del Mostro: Barriera, Altare, Mostro e Gabbia) ---
const level3Barrier = {
  x: 230,
  y: 250,
  width: 28,
  height: 95,
  isUnlocked: false
};

const level3Altar = {
  x: 410,
  y: 275,
  width: 44,
  height: 30,
  isSolved: false
};

const level3Monster = {
  x: 565,
  y: 260,
  width: 46,
  height: 48,
  hp: 100,
  maxHp: 100,
  isDefeated: false,
  animTimer: 0
};

const level3Cage = {
  x: 630,
  y: 250,
  width: 36,
  height: 48,
  isOpen: false
};

let hasPlayerWeapon = false;

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
  } else if (currentLevel === 3) {
    levelBadge.textContent = 'Livello 3';
    partnerNPC.x = 645;
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

  if (devLevelSelect) {
    devLevelSelect.value = String(currentLevel);
  }
}
window.switchToLevel = switchToLevel;

function closeAllModals() {
  isModalOpen = false;
  pausePlayerMovement();
  if (polaroidModal) polaroidModal.classList.add('hidden');
  if (monsterQuizModal) monsterQuizModal.classList.add('hidden');
  if (quizModal) quizModal.classList.add('hidden');
  if (catModal) catModal.classList.add('hidden');
  if (chessModal) chessModal.classList.add('hidden');
  if (level3QuizModal) closeLevel3QuizModal();
  if (level3ChessModal) closeLevel3ChessModal();
  if (level3BossModal) closeLevel3BossModal();
  if (levelClearModal) levelClearModal.classList.add('hidden');
  if (dialogModal) dialogModal.classList.add('hidden');
  if (itemFoundModal) itemFoundModal.classList.add('hidden');
  if (finaleModal) finaleModal.classList.add('hidden');
}

if (devLevelSelect) {
  devLevelSelect.addEventListener('change', (e) => {
    const chosenLevel = parseInt(e.target.value, 10);
    if (!isGameStarted) {
      activePlayerKey = selectedCharKey;
      isGameStarted = true;
      selectionScreen.classList.add('hidden');
      headerAvatarName.textContent = activePlayerKey === 'lui' ? 'Elton' : 'Rebecca';
    }
    closeAllModals();
    switchToLevel(chosenLevel);
  });
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
  } else if (currentLevel === 3) {
    // Limiti del mondo orizzontale di Livello 3 (Caverna Underfire)
    obstacles.push({ x: -50, y: 0, width: 85, height: LEVEL3_WORLD_HEIGHT }); // Limite sinistro
    obstacles.push({ x: 660, y: 0, width: 85, height: LEVEL3_WORLD_HEIGHT }); // Limite destro
    obstacles.push({ x: 0, y: -50, width: LEVEL3_WORLD_WIDTH, height: 280 }); // Stalattiti/soffitto
    obstacles.push({ x: 0, y: 345, width: LEVEL3_WORLD_WIDTH, height: 60 });  // Lava inferiore

    // Barriera delle Fiamme (solida finché non si supera il quiz a 5 domande)
    if (!level3Barrier.isUnlocked) {
      obstacles.push({
        x: level3Barrier.x,
        y: level3Barrier.y,
        width: level3Barrier.width,
        height: level3Barrier.height
      });
    }

    // Altare antico di pietra (puzzle scacchi)
    obstacles.push({
      x: level3Altar.x,
      y: level3Altar.y + 6,
      width: level3Altar.width,
      height: level3Altar.height - 6
    });

    // Mostro (solido finché non viene sconfitto)
    if (!level3Monster.isDefeated) {
      obstacles.push({
        x: level3Monster.x,
        y: level3Monster.y + 10,
        width: level3Monster.width,
        height: level3Monster.height - 10
      });
    }

    // Gabbia del partner
    obstacles.push({
      x: level3Cage.x,
      y: level3Cage.y + 10,
      width: level3Cage.width,
      height: level3Cage.height - 10
    });
  } else {
    // Bordi esterni generali per livelli verticali (Livello 1 e 4)
    obstacles.push({ x: -50, y: 0, width: 95, height: canvas.height });
    obstacles.push({ x: 275, y: 0, width: 95, height: canvas.height });
    obstacles.push({ x: 0, y: -50, width: canvas.width, height: 85 });
    obstacles.push({ x: 0, y: canvas.height - 10, width: canvas.width, height: 50 });

    let activeTrees = map1Trees;
    let activeBushes = map1Bushes;

    if (currentLevel === 4) {
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
    const distBarrier = Math.hypot(player.x - (level3Barrier.x + level3Barrier.width / 2), player.y - (level3Barrier.y + level3Barrier.height / 2));
    const distAltar = Math.hypot(player.x - (level3Altar.x + level3Altar.width / 2), player.y - (level3Altar.y + level3Altar.height / 2));
    const distMonster = Math.hypot(player.x - (level3Monster.x + level3Monster.width / 2), player.y - (level3Monster.y + level3Monster.height / 2));

    if (!level3Barrier.isUnlocked && distBarrier < 50) {
      nextTarget = 'level3Barrier';
    } else if (distAltar < 46) {
      nextTarget = 'level3Altar';
    } else if (!level3Monster.isDefeated && distMonster < 55) {
      nextTarget = 'level3Monster';
    } else if (level3Monster.isDefeated && distPartner < 50) {
      nextTarget = 'partner';
    } else if (!level3Monster.isDefeated && distPartner < 65) {
      nextTarget = 'partnerCaged';
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
      } else if (currentInteractionTarget === 'level3Barrier') {
        if (sparkleEl) sparkleEl.textContent = '🔥';
        if (textEl) textEl.textContent = 'PROVA DEL FUOCO';
      } else if (currentInteractionTarget === 'level3Altar') {
        if (sparkleEl) sparkleEl.textContent = '♟️';
        if (textEl) textEl.textContent = level3Altar.isSolved ? 'ALTARE RISOLTO' : 'ALTARE SCACCHI';
      } else if (currentInteractionTarget === 'level3Monster') {
        if (sparkleEl) sparkleEl.textContent = '⚔️';
        if (textEl) textEl.textContent = hasPlayerWeapon ? 'ATTACCA IL MOSTRO!' : 'ESAMINA IL MOSTRO';
      } else if (currentInteractionTarget === 'partnerCaged') {
        if (sparkleEl) sparkleEl.textContent = '🆘';
        if (textEl) textEl.textContent = 'PARLA AL PARTNER';
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
    if (currentInteractionTarget === 'level3Barrier') {
      openLevel3QuizModal();
    } else if (currentInteractionTarget === 'level3Altar') {
      openLevel3ChessModal();
    } else if (currentInteractionTarget === 'level3Monster') {
      if (!hasPlayerWeapon) {
        openGenericDialog('Il Mostro Ruggisce! 👹', level3Data.boss.needWeaponMsg);
      } else {
        openLevel3BossModal();
      }
    } else if (currentInteractionTarget === 'partnerCaged') {
      const msg = activePlayerKey === 'lui' ? level3Data.partnerCagedLei : level3Data.partnerCagedLui;
      openGenericDialog('Salva il tuo partner! 😭', msg);
    } else if (currentInteractionTarget === 'partner') {
      openLevelClearModal(); // Vittoria del Livello 3!
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

// ============================================================================
// 5. ATTIVITÀ LIVELLO 3: IL COVO DEL MOSTRO
// ============================================================================

// ----------------------------------------------------------------------------
// 5a. PROVA 1: IL QUIZ DELLE FIAMME (5 Domande con GIF personalizzata su errore)
// ----------------------------------------------------------------------------
let currentLevel3QuizIndex = 0;

function openLevel3QuizModal() {
  isModalOpen = true;
  pausePlayerMovement();

  if (level3Barrier.isUnlocked) {
    openGenericDialog('Sigillo Superato', 'Hai già superato la Prova delle Fiamme: la via verso l\'altare è libera.');
    return;
  }

  currentLevel3QuizIndex = 0;
  level3QuizQuestionView.classList.remove('hidden');
  level3QuizErrorView.classList.add('hidden');
  renderLevel3QuizQuestion();
  level3QuizModal.classList.remove('hidden');
}

function renderLevel3QuizQuestion() {
  const quiz = level3Data.quiz;
  const qData = quiz.questions[currentLevel3QuizIndex];
  if (!qData) return;

  level3QuizStep.textContent = `DOMANDA ${currentLevel3QuizIndex + 1} DI ${quiz.questions.length}`;
  level3QuizTitle.textContent = quiz.title;
  level3QuizProgressFill.style.width = `${((currentLevel3QuizIndex + 1) / quiz.questions.length) * 100}%`;
  level3QuizQuestion.textContent = qData.question;
  level3QuizOptionsContainer.innerHTML = '';

  qData.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerHTML = `<span>${optIdx + 1}.</span> <span>${optText}</span>`;

    btn.addEventListener('click', () => {
      handleLevel3QuizAnswer(btn, optIdx === qData.correctIndex);
    });

    level3QuizOptionsContainer.appendChild(btn);
  });
}

function handleLevel3QuizAnswer(btn, isCorrect) {
  const allBtns = level3QuizOptionsContainer.querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => (b.style.pointerEvents = 'none'));

  if (isCorrect) {
    btn.classList.add('correct');
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);

    setTimeout(() => {
      currentLevel3QuizIndex++;
      if (currentLevel3QuizIndex >= level3Data.quiz.questions.length) {
        // Superate tutte e 5 le domande di fila!
        level3Barrier.isUnlocked = true;
        invalidateObstaclesCache();
        invalidateRenderItemsCache();
        closeLevel3QuizModal();
        triggerHeartExplosion();
        openGenericDialog('Sigillo Spezzato', 'Hai risposto a tutte e 5 le domande senza sbagliare. La barriera di fiamme si dissolve: ora puoi raggiungere l\'Altare Tattico.');
      } else {
        renderLevel3QuizQuestion();
      }
    }, 600);
  } else {
    // ERRORE: Mostra la GIF personalizzata e resetta il quiz!
    btn.classList.add('wrong');
    if (navigator.vibrate) navigator.vibrate(80);

    setTimeout(() => {
      showLevel3QuizError();
    }, 450);
  }
}

function showLevel3QuizError() {
  level3QuizQuestionView.classList.add('hidden');
  level3QuizErrorView.classList.remove('hidden');
  if (level3QuizErrorMsg) {
    level3QuizErrorMsg.textContent = "Hai sbagliato pippa, riprova dall'inizio";
  }
  level3QuizErrorMedia.innerHTML = level3Data.quiz.wrongGifHtml;
}

function closeLevel3QuizModal() {
  isModalOpen = false;
  level3QuizModal.classList.add('hidden');
  level3QuizErrorView.classList.add('hidden');
  level3QuizQuestionView.classList.remove('hidden');
  level3QuizErrorMedia.innerHTML = '';
}

if (btnRetryLevel3Quiz) {
  btnRetryLevel3Quiz.addEventListener('click', () => {
    currentLevel3QuizIndex = 0;
    level3QuizErrorView.classList.add('hidden');
    level3QuizQuestionView.classList.remove('hidden');
    renderLevel3QuizQuestion();
  });
}
if (btnCloseLevel3Quiz) {
  btnCloseLevel3Quiz.addEventListener('click', closeLevel3QuizModal);
}
if (level3QuizModal) {
  level3QuizModal.addEventListener('click', (e) => {
    if (e.target === level3QuizModal && !level3QuizErrorView.classList.contains('hidden')) {
      closeLevel3QuizModal();
    }
  });
}


const CHESS_PIECE_ICONS = {
  'wK': '/contenuti/ambienti/livello2/chess/wK.svg',
  'wQ': '/contenuti/ambienti/livello2/chess/wQ.svg',
  'wR': '/contenuti/ambienti/livello2/chess/wR.svg',
  'wB': '/contenuti/ambienti/livello2/chess/wB.svg',
  'wN': '/contenuti/ambienti/livello2/chess/wN.svg',
  'wP': '/contenuti/ambienti/livello2/chess/wP.svg',
  'bK': '/contenuti/ambienti/livello2/chess/bK.svg',
  'bQ': '/contenuti/ambienti/livello2/chess/bQ.svg',
  'bR': '/contenuti/ambienti/livello2/chess/bR.svg',
  'bB': '/contenuti/ambienti/livello2/chess/bB.svg',
  'bN': '/contenuti/ambienti/livello2/chess/bN.svg',
  'bP': '/contenuti/ambienti/livello2/chess/bP.svg'
};

const CHESS_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// ----------------------------------------------------------------------------
// 5b. PROVA 2: L'ALTARE TATTICO (3 Puzzle di Scacco Matto in 2)
// ----------------------------------------------------------------------------
let currentLevel3PuzzleIndex = 0;
let level3ChessPosition = {};
let selectedLevel3ChessSquare = null;
let lastLevel3ChessMove = null;
let level3PuzzleStep = 1; // 1 = mossa 1 del Bianco, 2 = mossa 2 (scacco matto) del Bianco
let isBlackMoving = false;

function openLevel3ChessModal() {
  isModalOpen = true;
  pausePlayerMovement();

  if (level3Altar.isSolved) {
    openGenericDialog('Altare Risvegliato! ⚔️', `Hai già risolto tutti i puzzle dell'Altare e possiedi la ${level3Data.boss.weaponName}! Ora corri a sfidare il mostro per liberare il tuo amore!`);
    return;
  }

  loadLevel3Puzzle(currentLevel3PuzzleIndex);
  level3ChessBoardView.classList.remove('hidden');
  level3ChessResultView.classList.add('hidden');
  level3ChessModal.classList.remove('hidden');
}

function loadLevel3Puzzle(pIdx) {
  const pData = level3Data.chess.puzzles[pIdx];
  if (!pData) return;

  level3ChessPosition = { ...pData.initialPosition };
  selectedLevel3ChessSquare = null;
  lastLevel3ChessMove = null;
  level3PuzzleStep = 1;
  isBlackMoving = false;

  level3ChessStep.textContent = `PUZZLE ${pIdx + 1} DI ${level3Data.chess.puzzles.length} • MATTO IN 2`;
  level3ChessTitle.textContent = pData.title;
  level3ChessStatusText.textContent = pData.hint;

  renderLevel3ChessBoard();
}

function renderLevel3ChessBoard(highlightMateSquare = null) {
  if (!level3ChessBoardGrid) return;
  level3ChessBoardGrid.innerHTML = '';

  for (let rank = 8; rank >= 1; rank--) {
    for (let fIdx = 0; fIdx < 8; fIdx++) {
      const file = CHESS_FILES[fIdx];
      const sq = file + rank;
      const isDark = (fIdx + (8 - rank)) % 2 === 1;

      const sqEl = document.createElement('div');
      sqEl.className = 'chess-square ' + (isDark ? 'dark' : 'light');
      sqEl.dataset.square = sq;

      if (selectedLevel3ChessSquare === sq) {
        sqEl.classList.add('highlight-selected');
      }
      if (highlightMateSquare === sq) {
        sqEl.classList.add('highlight-mate');
      }
      if (lastLevel3ChessMove && (lastLevel3ChessMove.from === sq || lastLevel3ChessMove.to === sq)) {
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
      const piece = level3ChessPosition[sq];
      if (piece && CHESS_PIECE_ICONS[piece]) {
        const img = document.createElement('img');
        img.src = CHESS_PIECE_ICONS[piece];
        img.className = 'chess-piece-img';
        img.alt = piece;
        sqEl.appendChild(img);
      }

      sqEl.addEventListener('click', () => handleLevel3ChessSquareClick(sq));
      level3ChessBoardGrid.appendChild(sqEl);
    }
  }
}

function handleLevel3ChessSquareClick(sq) {
  if (isBlackMoving) return;

  const pData = level3Data.chess.puzzles[currentLevel3PuzzleIndex];
  if (!pData) return;

  const pieceOnSquare = level3ChessPosition[sq];

  // Caso 1: Nessun pezzo selezionato
  if (!selectedLevel3ChessSquare) {
    if (pieceOnSquare && pieceOnSquare.startsWith('w')) {
      selectedLevel3ChessSquare = sq;
      level3ChessStatusText.textContent = `Selezionato ${sq.toUpperCase()}. Tocca la casella di destinazione!`;
      renderLevel3ChessBoard();
      if (navigator.vibrate) navigator.vibrate(20);
    } else {
      level3ChessStatusText.textContent = 'Tocca un pezzo bianco per preparare la mossa!';
    }
    return;
  }

  // Deselezione
  if (sq === selectedLevel3ChessSquare) {
    selectedLevel3ChessSquare = null;
    level3ChessStatusText.textContent = 'Pezzo deselezionato. Tocca un pezzo bianco!';
    renderLevel3ChessBoard();
    return;
  }

  // Cambio pezzo bianco selezionato
  if (pieceOnSquare && pieceOnSquare.startsWith('w')) {
    selectedLevel3ChessSquare = sq;
    renderLevel3ChessBoard();
    if (navigator.vibrate) navigator.vibrate(20);
    return;
  }

  // Mossa selezionata: from -> to
  const from = selectedLevel3ChessSquare;
  const to = sq;
  const movedPiece = level3ChessPosition[from];

  // FASE 1 DEL PUZZLE: 1ª mossa del Bianco
  if (level3PuzzleStep === 1) {
    if (from === pData.playerMove1.from && to === pData.playerMove1.to) {
      // 1ª Mossa corretta!
      delete level3ChessPosition[from];
      level3ChessPosition[to] = movedPiece;
      lastLevel3ChessMove = { from, to };
      selectedLevel3ChessSquare = null;
      renderLevel3ChessBoard();
      if (navigator.vibrate) navigator.vibrate([25, 40, 25]);

      level3ChessStatusText.textContent = 'Ottima mossa! Il Nero risponde...';
      isBlackMoving = true;

      // Risposta forzata del Nero dopo 550ms
      setTimeout(() => {
        executeLevel3BlackResponse(pData);
      }, 550);
    } else {
      // Mossa errata al passo 1
      selectedLevel3ChessSquare = null;
      renderLevel3ChessBoard();
      showLevel3ChessResult(false);
    }
  }
  // FASE 2 DEL PUZZLE: 2ª mossa del Bianco (Scacco Matto finale)
  else if (level3PuzzleStep === 2) {
    if (from === pData.playerMove2.from && to === pData.playerMove2.to) {
      // SCACCO MATTO IN 2 RIUSCITO!
      delete level3ChessPosition[from];
      level3ChessPosition[to] = movedPiece;
      lastLevel3ChessMove = { from, to };
      selectedLevel3ChessSquare = null;
      renderLevel3ChessBoard(pData.mateSquare);
      if (navigator.vibrate) navigator.vibrate([40, 80, 40]);

      setTimeout(() => {
        showLevel3ChessResult(true);
      }, 500);
    } else {
      // Mossa errata al passo 2
      selectedLevel3ChessSquare = null;
      renderLevel3ChessBoard();
      showLevel3ChessResult(false);
    }
  }
}

function executeLevel3BlackResponse(pData) {
  const resp = pData.blackResponse;
  const piece = level3ChessPosition[resp.from];

  delete level3ChessPosition[resp.from];
  level3ChessPosition[resp.to] = piece;
  lastLevel3ChessMove = { from: resp.from, to: resp.to };

  level3PuzzleStep = 2;
  isBlackMoving = false;
  level3ChessStatusText.textContent = 'Ora tocca a te! Sferra lo SCACCO MATTO finale!';
  renderLevel3ChessBoard();
  if (navigator.vibrate) navigator.vibrate(30);
}

function showLevel3ChessResult(isSuccess) {
  level3ChessBoardView.classList.add('hidden');
  level3ChessResultView.classList.remove('hidden');

  const pData = level3Data.chess.puzzles[currentLevel3PuzzleIndex];

  if (isSuccess) {
    triggerHeartExplosion();
    const isLastPuzzle = currentLevel3PuzzleIndex >= level3Data.chess.puzzles.length - 1;

    level3ChessResultTitle.textContent = isLastPuzzle ? '🏆 TUTTI I PUZZLE RISOLTI!' : '✨ SCACCO MATTO PERFETTO!';
    level3ChessResultTitle.style.color = 'var(--accent-gold)';
    level3ChessResultMedia.innerHTML = level3Data.chess.successGifHtml;
    level3ChessResultMsg.textContent = pData.desc + (isLastPuzzle ? `\n\nDall'altare scende un raggio di luce: hai ottenuto la ${level3Data.boss.weaponName}! ⚔️✨` : '');

    btnLevel3ChessAction.textContent = isLastPuzzle ? 'Equipaggia la Spada e Combatti! ⚔️' : 'Passa al Prossimo Puzzle ➔';
    btnLevel3ChessAction.onclick = () => {
      if (isLastPuzzle) {
        level3Altar.isSolved = true;
        hasPlayerWeapon = true;
        invalidateRenderItemsCache();
        closeLevel3ChessModal();
        openGenericDialog('Arma Sbloccata! ⚔️🔥', `Hai risvegliato la leggendaria ${level3Data.boss.weaponName}!\nOra avvicinati al Demone in fondo alla caverna e sconfiggilo per liberare il tuo amore!`);
      } else {
        currentLevel3PuzzleIndex++;
        level3ChessResultView.classList.add('hidden');
        level3ChessBoardView.classList.remove('hidden');
        loadLevel3Puzzle(currentLevel3PuzzleIndex);
      }
    };
  } else {
    level3ChessResultTitle.textContent = 'Riprova la mossa';
    level3ChessResultTitle.style.color = 'var(--accent-rose)';
    level3ChessResultMedia.innerHTML = level3Data.chess.wrongGifHtml;
    level3ChessResultMsg.textContent = 'Non è la combinazione vincente... per dare matto in 2 serve precisione millimetrica!';
    btnLevel3ChessAction.textContent = 'Riprova questo Puzzle ♟️';
    btnLevel3ChessAction.onclick = () => {
      level3ChessResultView.classList.add('hidden');
      level3ChessBoardView.classList.remove('hidden');
      loadLevel3Puzzle(currentLevel3PuzzleIndex);
    };
  }
}

function closeLevel3ChessModal() {
  isModalOpen = false;
  level3ChessModal.classList.add('hidden');
  level3ChessResultMedia.innerHTML = '';
}

if (btnCloseLevel3Chess) {
  btnCloseLevel3Chess.addEventListener('click', closeLevel3ChessModal);
}
if (level3ChessModal) {
  level3ChessModal.addEventListener('click', (e) => {
    if (e.target === level3ChessModal) closeLevel3ChessModal();
  });
}


// ----------------------------------------------------------------------------
// 5c. PROVA 3: SCONTRO CON IL MOSTRO (Boss Fight Arcade)
// ----------------------------------------------------------------------------
let bossCurrentHp = 100;
let timingMeterActive = false;
let timingPointerPos = 0; // 0..100
let timingPointerDir = 1;
let timingAnimFrameId = null;

function openLevel3BossModal() {
  isModalOpen = true;
  pausePlayerMovement();

  bossNameEl.textContent = level3Data.boss.name;
  bossCurrentHp = level3Monster.hp || 100;
  updateBossHpUI();

  bossVictoryView.classList.add('hidden');
  timingMeterActive = true;
  timingPointerPos = 10;
  timingPointerDir = 1;
  bossBattleStatus.textContent = 'Premi SFERRA IL COLPO quando l\'indicatore è nella zona centrale!';

  level3BossModal.classList.remove('hidden');
  startTimingMeter();
}

function updateBossHpUI() {
  const pct = Math.max(0, Math.min(100, Math.round((bossCurrentHp / level3Data.boss.maxHp) * 100)));
  bossHpText.textContent = `${bossCurrentHp} / ${level3Data.boss.maxHp}`;
  bossHpFill.style.width = `${pct}%`;
}

function startTimingMeter() {
  if (timingAnimFrameId) cancelAnimationFrame(timingAnimFrameId);

  const speed = 2.4; // velocità di oscillazione del cursore

  function loop() {
    if (!timingMeterActive) return;

    timingPointerPos += timingPointerDir * speed;
    if (timingPointerPos >= 96) {
      timingPointerPos = 96;
      timingPointerDir = -1;
    } else if (timingPointerPos <= 4) {
      timingPointerPos = 4;
      timingPointerDir = 1;
    }

    if (timingPointer) {
      timingPointer.style.left = `${timingPointerPos}%`;
    }

    timingAnimFrameId = requestAnimationFrame(loop);
  }

  timingAnimFrameId = requestAnimationFrame(loop);
}

function stopTimingMeter() {
  timingMeterActive = false;
  if (timingAnimFrameId) {
    cancelAnimationFrame(timingAnimFrameId);
    timingAnimFrameId = null;
  }
}

function executeBossAttack() {
  if (!timingMeterActive || bossCurrentHp <= 0) return;

  // Zona critica target: tra 42% e 58%
  const isCritical = timingPointerPos >= 40 && timingPointerPos <= 60;
  const damage = isCritical ? 35 : 20;

  bossCurrentHp = Math.max(0, bossCurrentHp - damage);
  level3Monster.hp = bossCurrentHp;
  updateBossHpUI();

  // Effetto Slash visivo
  if (bossSlashFx) {
    bossSlashFx.classList.remove('hidden');
    setTimeout(() => bossSlashFx.classList.add('hidden'), 350);
  }

  // Hit bubble con danno
  if (bossHitBubble) {
    bossHitBubble.textContent = isCritical ? `💥 CRITICO! -${damage} HP!` : `⚔️ -${damage} HP!`;
    bossHitBubble.style.color = isCritical ? '#fef08a' : '#fca5a5';
    bossHitBubble.classList.remove('hidden');
    setTimeout(() => bossHitBubble.classList.add('hidden'), 600);
  }

  if (isCritical) {
    bossBattleStatus.textContent = '🔥 COLPO CRITICO DEVASTANTE! Il mostro barcolla!';
    if (navigator.vibrate) navigator.vibrate([50, 70, 50]);
  } else {
    bossBattleStatus.textContent = '⚔️ Colpo a segno! Continua così!';
    if (navigator.vibrate) navigator.vibrate(40);
  }

  // Verifica sconfitta boss
  if (bossCurrentHp <= 0) {
    stopTimingMeter();
    level3Monster.isDefeated = true;
    level3Cage.isOpen = true;
    invalidateObstaclesCache();
    invalidateRenderItemsCache();

    setTimeout(() => {
      showBossVictory();
    }, 700);
  }
}

function showBossVictory() {
  bossVictoryView.classList.remove('hidden');
  btnBossAttack.style.display = 'none';
  timingTrack.parentElement.style.display = 'none';
  bossBattleStatus.style.display = 'none';
  triggerHeartExplosion();
  if (navigator.vibrate) navigator.vibrate([60, 100, 60, 100, 80]);
}

function closeLevel3BossModal() {
  stopTimingMeter();
  isModalOpen = false;
  level3BossModal.classList.add('hidden');
}

if (btnBossAttack) {
  btnBossAttack.addEventListener('click', executeBossAttack);
}
if (btnBossVictoryContinue) {
  btnBossVictoryContinue.addEventListener('click', () => {
    closeLevel3BossModal();
    // Il partner è libero nella mappa e si attiva il dialogo conclusivo
    openLevelClearModal();
  });
}
if (btnCloseBossModal) {
  btnCloseBossModal.addEventListener('click', closeLevel3BossModal);
}
if (level3BossModal) {
  level3BossModal.addEventListener('click', (e) => {
    if (e.target === level3BossModal && bossCurrentHp > 0) closeLevel3BossModal();
  });
}

// 6. Modale di Vittoria del Livello
function openLevelClearModal() {
  isModalOpen = true;
  pausePlayerMovement();

  if (levelClearBadgeEl) {
    levelClearBadgeEl.textContent = `LIVELLO ${currentLevel} COMPLETATO`;
  }

  if (currentLevel === 1) {
    const partnerMsg = activePlayerKey === 'lui' ? level1Data.partnerGreetingLui : level1Data.partnerGreetingLei;
    levelClearTitleEl.textContent = 'Vi siete ritrovati!';
    levelClearTextEl.textContent = partnerMsg;
    btnNextLevel.textContent = 'VAI AL LIVELLO 2 ➔';
  } else if (currentLevel === 2) {
    const partnerMsg = activePlayerKey === 'lui' ? level2Data.partnerSuccessLui : level2Data.partnerSuccessLei;
    levelClearTitleEl.textContent = 'Missione Compiuta!';
    levelClearTextEl.textContent = partnerMsg;
    btnNextLevel.textContent = 'VAI AL LIVELLO 3 ➔';
  } else if (currentLevel === 3) {
    const partnerMsg = activePlayerKey === 'lui' ? level3Data.partnerSuccessLui : level3Data.partnerSuccessLei;
    levelClearTitleEl.textContent = 'Vittoria sul Demone!';
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
  openLevel3MemoryModal();
});

function openLevel3MemoryModal() {
  const note = activePlayerKey === 'lui'
    ? '"Novembre - Abbiamo affrontato insieme la caverna del fuoco, superato ogni enigma e sconfitto il mostro per riabbracciarci. Con la nostra complicità e il nostro amore, possiamo superare qualsiasi cosa!" 🌋⚔️💖'
    : '"Novembre - Nessun mostro e nessun ostacolo al mondo potrà mai dividerci. Sei il mio eroe, oggi e in ogni nostra avventura insieme!" 🌋⚔️💖';
  openGenericDialog('Il Nostro Coraggio 🌋⚔️', note);
}

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
  level3Barrier.isUnlocked = false;
  level3Altar.isSolved = false;
  level3Monster.isDefeated = false;
  level3Monster.hp = 100;
  level3Cage.isOpen = false;
  hasPlayerWeapon = false;
  currentLevel3QuizIndex = 0;
  currentLevel3PuzzleIndex = 0;

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
    if (level3Monster.isDefeated) {
      spawnX = partnerNPC.x;
      spawnY = partnerNPC.y;
    } else if (hasPlayerWeapon) {
      spawnX = level3Monster.x + level3Monster.width / 2;
      spawnY = level3Monster.y + level3Monster.height / 2;
    } else if (level3Barrier.isUnlocked) {
      spawnX = level3Altar.x + level3Altar.width / 2;
      spawnY = level3Altar.y + level3Altar.height / 2;
    } else {
      spawnX = level3Barrier.x + level3Barrier.width / 2;
      spawnY = level3Barrier.y + level3Barrier.height / 2;
    }
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

  // Evita che la pressione prolungata apra il menu contestuale o selezioni testo su mobile
  buttonEl.addEventListener('contextmenu', (e) => e.preventDefault());
  buttonEl.addEventListener('selectstart', (e) => e.preventDefault());
}

// Disattiva selezione testo accidentale a livello globale durante la pressione prolungata
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());

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
      closeLevel3QuizModal();
      closeLevel3ChessModal();
      closeLevel3BossModal();
      closeCatModal();
      closeChessModal();
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
  if (currentLevel === 4) {
    activeTrees = map4Trees;
    activeBushes = map4Bushes;
  }

  // Alberi e cespugli solo per i livelli verticali con prato (1 e 4)
  if (currentLevel !== 2 && currentLevel !== 3) {
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
    // 1. Sigillo delle Fiamme (Quiz 5 domande)
    items.push({
      type: 'level3Barrier',
      x: level3Barrier.x,
      y: level3Barrier.y,
      width: level3Barrier.width,
      height: level3Barrier.height,
      get isUnlocked() { return level3Barrier.isUnlocked; },
      sortY: level3Barrier.y + level3Barrier.height
    });

    // 2. Altare Tattico (Scacchi matto in 2)
    items.push({
      type: 'level3Altar',
      x: level3Altar.x,
      y: level3Altar.y,
      width: level3Altar.width,
      height: level3Altar.height,
      get isSolved() { return level3Altar.isSolved; },
      sortY: level3Altar.y + level3Altar.height
    });

    // 3. Mostro (Boss Fight)
    if (!level3Monster.isDefeated) {
      items.push({
        type: 'level3Monster',
        x: level3Monster.x,
        y: level3Monster.y,
        width: level3Monster.width,
        height: level3Monster.height,
        sortY: level3Monster.y + level3Monster.height
      });
    }

    // 4. Gabbia del partner
    items.push({
      type: 'level3Cage',
      x: level3Cage.x,
      y: level3Cage.y,
      width: level3Cage.width,
      height: level3Cage.height,
      get isOpen() { return level3Cage.isOpen; },
      sortY: level3Cage.y + level3Cage.height
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

  // Calcolo scorrimento telecamera (per Livelli orizzontali: 2 e 3)
  let cameraX = 0;
  if (currentLevel === 2) {
    const maxCamX = LEVEL2_WORLD_WIDTH - canvas.width;
    cameraX = Math.round(Math.max(0, Math.min(maxCamX, player.x - canvas.width / 2)));
  } else if (currentLevel === 3) {
    const maxCamX = LEVEL3_WORLD_WIDTH - canvas.width;
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
  } else if (currentLevel === 3) {
    // Sfondo panoramico Underfire The Altar (Livello 3)
    if (level3Background.loaded) {
      ctx.drawImage(level3Background.img, 0, 0, 1024, 576, 0, 0, LEVEL3_WORLD_WIDTH, LEVEL3_WORLD_HEIGHT);
    } else {
      ctx.fillStyle = '#1c0c0c';
      ctx.fillRect(0, 0, LEVEL3_WORLD_WIDTH, LEVEL3_WORLD_HEIGHT);
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
    // Prato soleggiato diurno per il Livello 1
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

  // 3. Ciuffi d'erba fioriti (solo per i livelli con prato: 1 e 4)
  if (currentLevel === 1 || currentLevel === 4) {
    const activeGrass = currentLevel === 4 ? map4GrassTufts : map1GrassTufts;
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
    } else if (item.type === 'level3Barrier') {
      const time = Date.now();
      const midX = item.x + item.width / 2;
      const midY = item.y + item.height / 2;

      if (!item.isUnlocked) {
        // Barriera attiva: fiamme incantate che salgono verso l'alto
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath();
        ctx.ellipse(midX, item.y + item.height - 4, item.width * 0.8, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lingue di fiamma animate
        for (let f = 0; f < 5; f++) {
          const flameX = item.x + (f * 6) + 2;
          const flameH = 45 + Math.sin(time / 140 + f * 1.5) * 14;
          const flameY = item.y + item.height - flameH;

          // Fiamma esterna rossa
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.roundRect(flameX - 2, flameY, 8, flameH, 4);
          ctx.fill();

          // Fiamma interna arancione
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.roundRect(flameX - 1, flameY + 6, 6, flameH - 6, 3);
          ctx.fill();

          // Nucleo giallo incandescente
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.roundRect(flameX, flameY + 14, 4, flameH - 14, 2);
          ctx.fill();
        }

        // Sigillo centrale di fuoco
        const pulse = Math.sin(time / 200) * 3;
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔥', midX, midY + pulse);

        if (currentInteractionTarget === 'level3Barrier') {
          ctx.font = '16px sans-serif';
          ctx.fillText('⚡', midX, item.y - 12 + pulse);
        }
      } else {
        // Barriera dissolta: braci spente e scintille dorate a terra
        ctx.fillStyle = 'rgba(234, 179, 8, 0.3)';
        ctx.beginPath();
        ctx.ellipse(midX, item.y + item.height - 4, item.width * 0.6, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨', midX, item.y + item.height - 6);
      }
    } else if (item.type === 'level3Altar') {
      const midX = item.x + item.width / 2;
      const time = Date.now();

      // Ombra a terra
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(midX, item.y + item.height - 2, item.width * 0.55, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Basamento in pietra dell'altare
      ctx.fillStyle = '#292524';
      ctx.fillRect(item.x - 2, item.y + 14, item.width + 4, 14);
      ctx.fillStyle = '#44403c';
      ctx.fillRect(item.x, item.y + 12, item.width, 14);

      // Piano superiore scolpito
      ctx.fillStyle = '#57534e';
      ctx.fillRect(item.x - 3, item.y + 6, item.width + 6, 8);
      ctx.fillStyle = '#78716c';
      ctx.fillRect(item.x - 1, item.y + 4, item.width + 2, 6);

      // Scacchiera in miniatura al centro
      const bX = Math.round(midX - 10);
      const bY = item.y + 3;
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(bX - 1, bY - 1, 22, 7);
      ctx.fillStyle = '#ecd9b9';
      ctx.fillRect(bX, bY, 20, 5);
      ctx.fillStyle = '#b58863';
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 4; c++) {
          if ((r + c) % 2 === 1) {
            ctx.fillRect(bX + c * 5, bY + r * 2.5, 5, 2.5);
          }
        }
      }

      // Sopra l'altare: Spada splendente (se risolto) o Icona Scacchi (se da risolvere)
      const pulse = Math.sin(time / 250) * 3;
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      if (item.isSolved) {
        ctx.fillText('⚔️', midX, item.y - 14 + pulse);
      } else {
        ctx.fillText('♟️', midX, item.y - 12 + pulse);
      }

      if (currentInteractionTarget === 'level3Altar') {
        ctx.strokeStyle = item.isSolved ? 'rgba(234, 179, 8, 0.7)' : 'rgba(239, 68, 68, 0.7)';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(midX, item.y + item.height / 2, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    } else if (item.type === 'level3Monster') {
      const midX = item.x + item.width / 2;
      const time = Date.now();
      const breathe = Math.sin(time / 220) * 2;

      // Ombra imponente a terra
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.ellipse(midX, item.y + item.height - 4, item.width * 0.5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Corpo roccioso del mostro
      ctx.fillStyle = '#1c0a0a';
      ctx.beginPath();
      ctx.roundRect(item.x + 4, item.y + 12 - breathe, item.width - 8, item.height - 14 + breathe, 12);
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Venature di magma ardente sul corpo
      ctx.fillStyle = '#f97316';
      ctx.fillRect(item.x + 14, item.y + 24 - breathe, 6, 12);
      ctx.fillRect(item.x + item.width - 20, item.y + 22 - breathe, 6, 14);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(item.x + 16, item.y + 26 - breathe, 3, 8);

      // Testa e corna
      ctx.fillStyle = '#0f0505';
      ctx.beginPath();
      ctx.arc(midX, item.y + 10 - breathe, 16, 0, Math.PI * 2);
      ctx.fill();

      // Corna ricurve
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.moveTo(item.x + 12, item.y + 6 - breathe);
      ctx.lineTo(item.x + 4, item.y - 8 - breathe);
      ctx.lineTo(item.x + 18, item.y + 2 - breathe);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(item.x + item.width - 12, item.y + 6 - breathe);
      ctx.lineTo(item.x + item.width - 4, item.y - 8 - breathe);
      ctx.lineTo(item.x + item.width - 18, item.y + 2 - breathe);
      ctx.fill();

      // Occhi rossi infuocati che brillano
      const eyeGlow = Math.sin(time / 180) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(239, 68, 68, ${eyeGlow})`;
      ctx.beginPath();
      ctx.arc(midX - 6, item.y + 9 - breathe, 3.5, 0, Math.PI * 2);
      ctx.arc(midX + 6, item.y + 9 - breathe, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(midX - 7, item.y + 8 - breathe, 2, 2);
      ctx.fillRect(midX + 5, item.y + 8 - breathe, 2, 2);

      // Etichetta Mostro
      ctx.font = '10px Silkscreen, monospace';
      ctx.fillStyle = '#f87171';
      ctx.textAlign = 'center';
      ctx.fillText('DEMONE', midX, item.y + item.height + 12);

      if (currentInteractionTarget === 'level3Monster') {
        const pulse = Math.sin(time / 200) * 3;
        ctx.font = '18px sans-serif';
        ctx.fillText('⚔️', midX, item.y - 18 + pulse);
      }
    } else if (item.type === 'level3Cage') {
      const midX = item.x + item.width / 2;
      const time = Date.now();

      // Ombra a terra
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(midX, item.y + item.height - 2, item.width * 0.5, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Base e montanti della gabbia
      ctx.fillStyle = '#27272a';
      ctx.fillRect(item.x, item.y + item.height - 6, item.width, 6);

      // Tetto ad arco
      ctx.fillStyle = '#3f3f46';
      ctx.beginPath();
      ctx.roundRect(item.x - 2, item.y, item.width + 4, 8, 4);
      ctx.fill();

      // Gancio e catena superiore
      ctx.strokeStyle = '#52525b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(midX, item.y);
      ctx.lineTo(midX, item.y - 12);
      ctx.stroke();

      if (!item.isOpen) {
        // Sbarre verticali chiuse
        ctx.fillStyle = '#71717a';
        const numBars = 5;
        const spacing = item.width / (numBars + 1);
        for (let b = 1; b <= numBars; b++) {
          ctx.fillRect(item.x + b * spacing - 1.5, item.y + 6, 3, item.height - 12);
        }

        // Lucchetto centrale
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(midX, item.y + item.height / 2, 5, 0, Math.PI * 2);
        ctx.fill();

        // Fumetto di aiuto sopra la gabbia
        const pulse = Math.sin(time / 250) * 3;
        ctx.font = '11px Silkscreen, monospace';
        ctx.fillStyle = '#fca5a5';
        ctx.textAlign = 'center';
        ctx.fillText('😭 AIUTO!', midX, item.y - 16 + pulse);
      } else {
        // Gabbia spalancata
        ctx.fillStyle = '#71717a';
        ctx.fillRect(item.x + 2, item.y + 8, 4, item.height - 14);
        ctx.fillRect(item.x + item.width - 6, item.y + 8, 4, item.height - 14);

        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 LIBERO!', midX, item.y - 8);
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
    if (level3Monster.isDefeated) {
      ctx.fillStyle = '#86efac';
      ctx.fillText('PARTNER SALVATO! 💖', canvas.width - 10, 18);
    } else if (hasPlayerWeapon) {
      ctx.fillStyle = '#f87171';
      ctx.fillText('SFIDA IL DEMONE! ⚔️', canvas.width - 10, 18);
    } else if (level3Barrier.isUnlocked) {
      ctx.fillStyle = '#fde047';
      ctx.fillText('ALTARE DEI 3 MATTI ♟️', canvas.width - 10, 18);
    } else {
      ctx.fillStyle = '#f97316';
      ctx.fillText('SIGILLO DI FUOCO 🔥', canvas.width - 10, 18);
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
