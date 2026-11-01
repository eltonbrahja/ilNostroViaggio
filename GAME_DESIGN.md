# 🎮 Progetto Anniversario: Gioco Interattivo Pixel Art

Documento di sintesi del Game Design e delle specifiche tecniche per il gioco interattivo da pubblicare su Vercel.

---

## 🎯 Obiettivo del Progetto
Creare un'esperienza interattiva in pixel art a livelli, personalizzata per l'anniversario della coppia, ottimizzata specificamente per **smartphone (orientamento verticale / portrait)** e facilmente condivisibile tramite link Vercel.

---

## 👥 Personaggi & Selezione Iniziale
* **Personaggi giocabili:** 
  * Avatar Maschile (customizzato con sprite LPC)
  * Avatar Femminile (customizzato con sprite LPC)
* **Schermata di selezione:**
  * All'avvio, la giocatrice o il giocatore sceglie chi controllare.
* **Ruolo dell'altro personaggio:**
  * Il personaggio non selezionato sarà l'**NPC speciale che attende alla fine del viaggio** (e viene rapito nel Livello 3!).
* **Testi dinamici:**
  * I dialoghi, i commenti, gli aneddoti e le battute cambiano tono e prospettiva in base a chi sta giocando.

---

## 📱 Layout & UX Mobile (Verticale)
Poiché l'esperienza è pensata esclusivamente per smartphone, l'interfaccia adotta un layout tipo console vintage (Game Boy / Pokémon Mobile):

```
┌───────────────────────────────────────┐
│                                       │
│          SCHERMO DI GIOCO             │
│        (Canvas 2D Pixel Art)          │
│       Mondo a tile, camera centrata   │
│                                       │
├───────────────────────────────────────┤
│                                       │
│       PANNELLO CONTROLLI IN BASSO     │
│                                       │
│               [ SOPRA ]               │
│     [ INDIETRO ]     [ AVANTI ]       │
│                [ GIÙ ]                │
│                                       │
│            [ INTERAGISCI ]            │
│            (appare solo               │
│             vicino a oggetti/NPC)     │
│                                       │
└───────────────────────────────────────┘
```

* **Pulsanti di Movimento:** I 4 tasti completi (Sopra, Giù, Indietro, Avanti).
* **Tasto Interazione Contestuale:** Il pulsante "Interagisci" / "Esamina" / "Parla" resta nascosto e **compare solo quando il personaggio è vicino a un punto d'interesse**.
* **Prevenzione bug mobile:** Disattivazione del pull-to-refresh e del double-tap zoom sul browser dello smartphone.

---

## 🗺️ Struttura di Gioco a Livelli
Dividere l'esperienza a livelli isolati garantisce massima fluidità nel browser mobile e crea un ritmo di progressione chiaro ed entusiasmante:

### 🌸 Livello 1: "Il Primo Incontro" (Le Origini)
* **Panchina della Monster:** 
  * Icona fluttuante personalizzata con Monster Energy in pixel art.
  * Mini-quiz di coppia: *"Qual è la monster preferita del tuo partner?"* (Lui -> Monster Ultra White, Lei -> Monster Ultra Black Cherry, opzioni: Monster Mango Loco, Monster Monarch).
* **Sblocco uscita:**
  * Un cancello chiuso che si apre rispondendo al quiz a risposta multipla su chi ha detto per primo "Ti amo".

### 🍕 Livello 2: "I Nostri Momenti" (La Radura dei Viaggi)
* **Obiettivo:** Giocare a scacchi e coccolare i gattini nella radura panoramica.
* **Contenuto:** 
  * Due gattini animati con passo felpato e balzi giocosi.
  * Partita a scacchi sotto l'albero monumentale (Scacco Matto in 1 mossa).
* **Sblocco uscita:**
  * Risolvere la partita a scacchi per raggiungere il partner e sbloccare il passaggio.

### 🌋 Livello 3: "Il Covo del Mostro" (Caverna di Lava, 3 Prove & Boss Fight)
* **Orientamento & Ambientazione:** Scorrimento orizzontale a telecamera mobile con sfondo panoramico pixel art *Underfire (The Altar)* con caverna sotterranea, stalattiti e lava ardente.
* **Trama:** Il partner è stato rapito e rinchiuso in una gabbia di ferro sorvegliata da un temibile Demone delle Ceneri.
* **Le 3 Prove per sconfiggerlo:**
  1. **Il Sigillo delle Fiamme (Quiz di 5 Domande):**
     * 5 domande di coppia a risposta multipla consecutive.
     * Se si sbaglia anche solo una risposta, appare una GIF di errore personalizzata e il quiz si riavvia da capo.
     * Superate tutte e 5, la barriera di fiamme si dissolve aprendo il passaggio.
  2. **L'Altare Tattico (3 Puzzle di Scacco Matto in 2):**
     * Tre posizioni scacchistiche classiche da risolvere (Matto del corridoio, Matto Affogato di Filidoro, Matto di Anastasia).
     * Il giocatore esegue la 1ª mossa, il Nero risponde con la mossa forzata, e il giocatore conclude con lo scacco matto.
     * Al completamento del 3° puzzle, dall'altare si ottiene la *Spada di Fiamma Eterna*.
  3. **La Boss Fight (Scontro Finale con il Mostro):**
     * Con la Spada equipaggiata, si affronta il Mostro in un combattimento arcade.
     * Barra HP del mostro e barra del tempismo per sferrare colpi critici.
     * Sconfitto il Mostro, la gabbia si apre, il partner viene liberato con cuori ed esclama il dialogo di vittoria, sbloccando l'accesso al Gran Finale!

### 💖 Livello Finale: "Il Traguardo" (La Sorpresa Romantica)
* **Ambientazione:** Una radura speciale (laghetto, fiori, lucine e atmosfera crepuscolare/notturna con lucciole).
* **Incontro:** L'altro partner è lì che aspetta al centro del cuore di pietre e candele.
* **Climax:**
  * Avvicinandosi all'altro personaggio, si avvia la sequenza finale.
  * Schermata finale a tutto schermo: dedica d'amore personalizzata, riassunto delle 3 tappe dell'anniversario e messaggio d'auguri.

---

## 🛠️ Stack Tecnico Previsto
* **Frontend:** Web standard leggero e reattivo (HTML5 Canvas + Vite/JS).
* **Prestazioni Mobile:** Nessun framework pesante per garantire 60fps istantanei anche su reti mobili 4G.
* **Hosting:** Vercel (deploy istantaneo con link condivisibile).
* **Audio:** Integrazione colonna sonora/canzone dedicata nella fase di rifinitura finale.

---

## 🧭 Regola Fondamentale: Sviluppo Graduale (Step-by-Step)
> **Principio Guida:** Non correre a fare tutto insieme. Lo sviluppo deve procedere a piccoli passi precisi e verificabili, testando e confermando ogni singolo elemento prima di passare al successivo, per garantire la massima cura dei dettagli estetici ed emotivi.

### Fasi Progressive di Lavoro:
1. **Step 1 - Scheletro Base & Controlli Mobile:** ✅ COMPLETATO
   * Layout verticale smartphone, canvas 320x384 e i 4 pulsanti touch (Sopra, Indietro, Avanti, Giù).
2. **Step 2 - Selezione Personaggio & Animazioni LPC:** ✅ COMPLETATO
   * Schermata di scelta iniziale (Lui / Lei) con anteprima animata, spritesheet LPC e camminata a 4 direzioni.
3. **Step 3 - Ambiente & Livello 1 (Prato, Sentiero, Collisioni):** ✅ COMPLETATO
   * Mappa reale con tileset grassland, alberi 96x96, cespugli, fiori, collisioni fisiche e profondità Y-Sorting.
4. **Step 4 - Tasto Interagisci & Finestre di Dialogo:** ✅ COMPLETATO
   * Panchina con foto Polaroid ricordo, cancello di legno chiuso con lucchetto e mini-quiz a scelta multipla con sblocco.
5. **Step 5 - Livelli Successivi & Gran Finale:** ✅ COMPLETATO
   * **Livello 2 (La Radura dei Viaggi):** ✅ COMPLETATO
     * Sfondo panoramico Nature 1, gattini animati, scacchi in 1 mossa e ricongiungimento.
   * **Livello 3 (Il Covo del Mostro):** ✅ COMPLETATO
     * Sfondo Underfire, barriera con quiz a 5 domande, altare tattico con 3 matto in 2, boss fight arcade con tempismo colpo critico e salvataggio del partner dalla gabbia.
   * **Livello Finale (Il Traguardo Romantico):** ✅ COMPLETATO
     * Radura crepuscolare/notturna con lucciole animate, piazza romantica a forma di cuore, candele accese e ricongiungimento.
     * Schermata Gran Finale a tutto schermo con lettera d'amore, galleria delle 3 tappe collezionate e opzione di rigiocare.
6. **Step 6 - Musica, Personalizzazione Foto & Deploy Vercel:** 🟡 IN CORSO
   * **Sistema Audio & Musica:** ✅ IMPLEMENTATO (tasto 🎵 con carillon romantico procedurale Web Audio + supporto MP3 personalizzato).
   * **Personalizzazione Foto Reali:** Possibilità di sostituire i placeholder con file JPEG/PNG reali in `contenuti/foto/`.
   * **Deploy Vercel:** Test di build completato con successo (pronto per la pubblicazione su Vercel).
