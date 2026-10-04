# Il Maniero Maledetto — Demo v1.23

## Novità v1.16

- Dialog della stanza ridisegnato in modalità più cinematografica.
- Eliminata la grande legenda inferiore del dado; la regola 1–5 / 6 è ora nel box Movimento.
- Intestazione, dado e pulsanti resi più compatti.
- Risveglio, Round, Vita Teschio e Stato trasformati in piccoli badge sovrapposti alla scena.
- La stanza occupa ora quasi tutta l’altezza disponibile del dialog.


Demo offline in HTML/CSS/JavaScript puro.

## Novità v1.10

- Sostituite le 6 nuove stanze con versioni più coerenti ai rispettivi nomi e senza rettangoli visibili nel pavimento.
- Aggiornate: Sala degli Specchi, Laboratorio Alchemico, Serra Abbandonata, Sala del Banchetto, Camera del Conte, Galleria degli Antenati.

- **12 stanze esplorabili + Cripta finale come stanza 13**.
- Nuove stanze: Sala degli Specchi, Laboratorio Alchemico, Serra Abbandonata, Sala del Banchetto, Camera del Conte e Galleria degli Antenati.
- La **campana suona a ogni cambio di stanza del protagonista**. I movimenti dei bot non incrementano il contatore.
- Tre **Trappole Cardinali** fisse nel maniero riportano indietro di 3 stanze:
  - Lo Specchio del Ritorno — Sala degli Specchi
  - La Scala dei Minuti Perduti — Torre dell’Orologio
  - Il Corridoio delle Ossa — Catacombe
- Ogni Trappola Cardinale può colpire ciascun personaggio una sola volta per partita, evitando loop infiniti.
- Al XII rintocco il Teschio **non conclude la partita**: si libera e comincia a cacciare i personaggi nelle 12 stanze.
- Il Teschio segue una piccola IA: tende a inseguire il protagonista, può puntare gli altri personaggi, vagare o restare nella stessa stanza ad aumentare l’infestazione.
- Quando il Teschio è nella stanza del protagonista viene mostrato anche **fisicamente nella scena**.
- Il **Coraggio passa da 3 a 5 punti**:
  - 5: Lucido
  - 4: Inquieto
  - 3: Spaventato
  - 2: Terrorizzato
  - 1: Panico
  - 0: il personaggio cede al terrore, ritorna al Vestibolo con 2 Coraggio e resta temporaneamente bloccato.
- A Coraggio basso alcuni pericoli e gli incontri con il Teschio possono essere più severi; a 1 punto un Imprevisto può trasformarsi in Panico.
- Il Rosario spezzato ora recupera fino a **2 punti Coraggio**.
- Il **Codice Esoterico contiene 72 frammenti**, ognuno con testo atmosferico + spiegazione reale di 2–3 frasi.
- Dai 72 frammenti vengono generate **216 domande** per i Test Esoterici.
- Resta la regola: massimo un Test Esoterico per stanza per partita, condiviso tra protagonista e bot.

## Dado

- 1–5: movimento
- 6: secondo sorteggio casuale tra Imprevisto e Trappola

## Obiettivo

Recuperare i tre Sigilli, attraversare il maniero e raggiungere la Cripta. Dopo il XII rintocco il Teschio diventa un nemico mobile: il rito finale nella Cripta ne riduce la vita fino a zero, facendo tornare il Teschio un semplice osso.

## Avvio

Aprire `index.html` in un browser moderno. La musica parte solo quando viene avviata realmente una partita.


## v1.9 — Stanze come plance
- Le sei stanze aggiunte nella v1.8 sono state ricostruite usando basi prospettiche ad alta qualità, a 2400×1350.
- Ogni nuova stanza ha un percorso di 10 caselle integrato nel pavimento, coerente con le 10 posizioni della stanza.
- Le orme e le pedine dinamiche usano esattamente le stesse coordinate delle caselle disegnate.
- Le vecchie stanze originali restano invariate.


## Novità v1.16
- Il dialog della stanza ora usa un pannello verticale a destra con movimento, stato partita, esploratori, oggetti del rito e inventario.
- La stanza è stata ulteriormente ingrandita eliminando il vecchio footer del dado e spostando le informazioni principali nel pannello laterale.
- Gli oggetti possono essere usati direttamente dal dialog della stanza, senza dover tornare alla schermata principale.


## Novità v1.16
- Aggiunte ancore rapide “Oggetti del rito” e “Inventario” sotto Percorso/Musica/Minimizza.
- Migliorata la spaziatura fra avatar e dettagli degli esploratori.
- Eliminato lo scrolling orizzontale dal pannello laterale e compattate le card dell’inventario.
- Scroll verticale del pannello con stile dark personalizzato.


## Novità v1.16
- Corretto lo scrolling del pannello laterale della stanza: il contenitore ha ora un'altezza realmente vincolata e uno scroll verticale indipendente.
- Eliminato lo scroll orizzontale residuo con contenuti/card compattati nel pannello.
- Scrollbar verticale dark personalizzata per Chrome/Edge/Safari e Firefox.
- Aggiunta come terza traccia della playlist `alex-morgan-halloween-horror-dark-ritual-music-587400.mp3`.
- Playlist: Toccata in the Void → Gregorian Chant → Halloween Horror Dark Ritual Music → ritorno alla prima.


## Novità v1.16
- Corretto il layout grid del dialog Stanza: scena e pannello laterale occupano ora una sola riga a tutta altezza.
- Le sezioni del pannello mantengono la loro altezza naturale e non vengono più compresse/tagliate.
- Lo scrolling è affidato esclusivamente al pannello laterale, con overflow verticale reale e nessun overflow orizzontale.
- Scrollbar dark rifinita per Chrome/Edge/Safari e Firefox.
- Migliorata ulteriormente la spaziatura tra avatar e dettagli degli esploratori.


## Novità v1.16
- Il riquadro Movimento ha altezza fissa e un dado più grande; i messaggi dinamici non ridimensionano più la sezione.
- Gli avvisi sovrapposti alla stanza e i toast possono essere chiusi con un click.
- Il XII rintocco è ora un evento prioritario: interrompe movimento/esplorazione/eventi concorrenti e mostra da solo la scena del Risveglio.
- Dopo il Risveglio il turno interrotto viene concluso in modo controllato, evitando dialog sovrapposti.
- Le schede dei rivali indicano stanza, distanza in caselle e distanza in stanze rispetto al protagonista.


## Novità v1.20
- Il Teschio può ricacciare ciascun personaggio alla soglia della stanza al massimo 2 volte per partita.
- Aggiunto un Imprevisto favorevole che porta direttamente all'ultima casella della stanza corrente.
- Nel Percorso le pedine mostrano solo il colore, senza T/1/2/3.
- Tutte le caselle del Percorso sono cliccabili e aprono il dettaglio della posizione e degli eventuali esploratori presenti, con distanza dal protagonista in passi e stanze.
- Anche i rivali possono vincere raggiungendo la Cripta con i tre Sigilli. Il finale mostra avatar del vincitore e classifica completa.
- La vittoria del protagonista ha una presentazione speciale con bagliore e particelle animate.


## Novità v1.20
- La sesta faccia del dado non mostra più il numero 6: mostra un simbolo/immagine horror; internamente continua a rappresentare il tiro speciale che sceglie casualmente tra Imprevisto e Trappola.
- Aggiunta selezione lingua: Italiano, English, Español, Français e Português. La lingua è ricordata nelle impostazioni.
- Localizzate le parti strutturali del gioco: avvio, prologo, scelta personaggio, difficoltà, stanza, nomi/descrizioni delle 13 stanze, inventario, distanze, stato e prompt dei Test Esoterici. Le formule latine, i simboli e i termini del Codex Vesper restano invariati.
- Aggiunta difficoltà dopo la scelta del personaggio: Facile = protagonista + Elena; Medio = protagonista + Elena + Prof. Bianchi; Difficile = tutti e quattro.
- Dopo la scelta della difficoltà il gioco apre direttamente la Stanza. La dashboard principale resta come riepilogo/diario accessibile con Minimizza.


## Correzione v1.20
- Corretto un errore JavaScript nell’inizializzazione i18n che impediva il cambio lingua e bloccava l’avvio della partita.
- Verificato il flusso lingua → prologo → profilo → difficoltà → stanza.


## Novità v1.20
- Corretto il doppio Teschio nella stanza: resta una sola presenza grafica.
- Dimezzata la frequenza di ritrovamento degli oggetti durante l'esplorazione (circa 28% → 14%).
- Le Trappole Cardinali restano fisse a 3 stanze indietro e non sono presenti nella Serra.
- Il collasso a 0 Coraggio non riporta più al Vestibolo: attiva “Fuga nel buio”, arretra di una stanza e riparte con 2 Coraggio.


## Novità v1.23
- Localizzazione estesa a tutto il gioco in Italiano, English, Español, Français e Português: interfaccia, stanze, inventario, Imprevisti, Trappole, eventi del Teschio, testi di esplorazione, classifiche e messaggi dinamici.
- Tutti i 72 frammenti del Codice Esoterico hanno ora titolo/testo/spiegazione localizzati nelle quattro lingue aggiuntive; le formule latine restano intenzionalmente in latino.
- Corretto l’ID duplicato dei due frammenti legati allo Zolfo: la banca contiene ora 72 identificatori realmente distinti.
- Tipografia leggermente ingrandita e resa responsive alla risoluzione; sui monitor ad alta risoluzione aumentano soprattutto i testi piccoli.
- Il Percorso del Maniero ha caselle, nomi, numeri e dettagli più leggibili.
- La selezione lingua della schermata iniziale è sopra il pulsante di avvio e non mostra più la label “Lingua”.


## Novità v1.23
- Nuovo oggetto raro: Talismano di Mercurio. Il prossimo tiro 1–5 raddoppia i passi; ☠ non consuma la carica.
- Teschio meno frequente: movimento ogni 3 round e incontro non automatico (80%) quando condivide la stanza.
- Trappole Cardinali: Facile 1 (Torre), Medio 2 (Laboratorio + Torre), Difficile 3 (Laboratorio + Torre + Catacombe).
- Rimosso TEST XII.
- Minimizza spostato in alto a destra con sola freccia verso il basso.
- Musica mostrata come 🎵 ON / 🎵 OFF.
