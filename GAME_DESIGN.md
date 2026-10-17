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
  * Il personaggio non selezionato sarà l'**NPC speciale che attende alla fine del viaggio** (nel livello conclusivo).
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
* **Obiettivo:** Raggiungere la prima panchina/cartello dei ricordi.
* **Contenuto:** 
  * Foto polaroid del primo incontro/inizio storia + frase dedicata.
* **Sblocco uscita:**
  * Un cancello chiuso che si apre rispondendo a un piccolo quiz a risposta multipla su come vi siete conosciuti o sul primo appuntamento.

### 🍕 Livello 2: "I Nostri Momenti" (Quotidianità e Viaggi)
* **Obiettivo:** Mini caccia al tesoro nella mappa.
* **Contenuto:** 
  * Trovare un oggetto simbolico nascosto nel livello (es. cibo preferito, un peluche, una valigia o biglietto).
  * Checkpoint con foto e ricordo di una vacanza o momento divertente insieme.
* **Sblocco uscita:**
  * Consegnare o raccogliere l'oggetto per aprire il passaggio al livello successivo.

### ✨ Livello 3: "Inside Jokes" (Complicità & Risate)
* **Obiettivo:** Risolvere un simpatico dilemma di coppia.
* **Contenuto:** 
  * Domanda trabocchetto divertente (es. *"Chi ci mette più tempo a prepararsi?"*, *"Cosa si ordina stasera?"*).
  * Reazioni buffe e diverse a seconda della risposta data.
  * Foto o ricordo legato a una risata condivisa.

### 💖 Livello Finale: "Il Traguardo" (La Sorpresa Romantica)
* **Ambientazione:** Una radura speciale (laghetto, fiori, lucine e atmosfera al tramonto/notturna).
* **Incontro:** L'altro partner è lì che aspetta.
* **Climax:**
  * Avvicinandosi all'altro personaggio, si avvia la sequenza finale.
  * Schermata finale a tutto schermo: dedica d'amore personalizzata, riassunto fotografico dell'anniversario e messaggio d'auguri.

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
   * **Livello 2 (La Caccia all'Oggetto):** ✅ COMPLETATO
     * Nuova radura aperta, oggetto simbolico fluttuante con scintille, caccia all'oggetto con seconda Polaroid e sblocco traguardo.
   * **Livello 3 (Inside Jokes & Dilemma Comico):** ✅ COMPLETATO
     * Cartello del dilemma con reazioni buffe alle scelte e panchina dell'angolo delle risate.
   * **Livello Finale (Il Traguardo Romantico):** ✅ COMPLETATO
     * Radura crepuscolare/notturna con lucciole animate, piazza romantica a forma di cuore, candele accese e ricongiungimento.
     * Schermata Gran Finale a tutto schermo con lettera d'amore (inside jokes), mini-galleria dei 3 ricordi collezionati e opzione di rigiocare.
6. **Step 6 - Musica, Personalizzazione Foto & Deploy Vercel:** 🟡 IN CORSO
   * **Sistema Audio & Musica:** ✅ IMPLEMENTATO (tasto 🎵 con carillon romantico procedurale Web Audio + supporto MP3 personalizzato).
   * **Personalizzazione Foto Reali:** Possibilità di sostituire i placeholder con file JPEG/PNG reali in `contenuti/foto/`.
   * **Deploy Vercel:** Test di build completato con successo (pronto per la pubblicazione su Vercel).

