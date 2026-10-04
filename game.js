(() => {
  'use strict';

  const MUSIC_PLAYLIST = [
    'assets/audio/toccata-in-the-void.mp3',
    'assets/audio/gregorian-chant.mp3',
    'assets/audio/alex-morgan-halloween-horror-dark-ritual-music-587400.mp3'
  ];
  let musicTrackIndex = 0;

  const SAVE_KEY = 'manieroMaledettoSave_v123';
  const SETTINGS_KEY = 'manieroMaledettoSettings_v118';
  const MAX_DOOM = 12;
  const LAST_TILE = 120;
  const BELL_EVERY_ROUNDS = 999999; // legacy: ora le campane suonano al cambio stanza del protagonista
  const WALK_STEP_MS = 1050;
  const BLOCK_MAX_TURNS = 2;
  const SKULL_MAX_LIFE = 3;
  const MAX_COURAGE = 5;
  const SKULL_MOVES_EVERY_ROUNDS = 3;
  const SKULL_ENCOUNTER_CHANCE = 0.80;
  const RARE_TALISMAN_FIND_CHANCE = 0.006;
  const TESTS_PER_ROOM_MAX = 1;


  const LANGS = ['it','en','es','fr','pt'];
  const I18N = {
    it: {
      startTitle:'Le dodici campane stanno per suonare.', startCopy:'Tre Sigilli sono dispersi nel maniero. Entra nel maniero, attraversa le stanze e sigilla la Cripta. Se arriverà il dodicesimo rintocco, la caccia continuerà con il Teschio libero tra le stanze.', start:'⚰️ Inizia partita', startNote:'Prologo → nome e avatar → difficoltà → la partita comincia e parte la musica.', language:'🌐 Lingua',
      storyTitle:'La notte delle dodici campane', storyP1:'Nel 1888 il conte Aureliano Vesper fece murare sotto il suo maniero una bara di pietra. Dentro non riposava un uomo, ma un Teschio capace di chiamare a sé le ombre della casa.', storyP2:'Ogni cento anni, durante la notte delle dodici campane, i tre Sigilli che tengono chiusa la bara si disperdono nelle stanze. Questa notte è l’ultima prima del risveglio.', storyP3:'Il dado del maniero mostra 1–5 e un simbolo inquietante: con 1–5 avanzi del numero indicato; quando compare il simbolo, il maniero decide casualmente tra Imprevisto e Trappola. Se resti bloccato, il blocco dura al massimo due tuoi turni.', storyRule:'Il dodicesimo rintocco non conclude la partita: il Teschio si libera, si trasforma e comincia a infestare le stanze. Da quel momento dovrai sopravvivere alla sua presenza e completare il rito nella Cripta.', storyContinue:'Continua: scegli il protagonista',
      profileTitle:'Chi entrerà nel maniero?', profileCopy:'Scegli nome e avatar. Questa scelta viene richiesta per ogni nuova partita.', name:'Nome', male:'Avventuriero', female:'Avventuriera', profileNext:'Continua: scegli difficoltà',
      difficulty:'DIFFICOLTÀ', difficultyTitle:'Quanti entreranno nel Maniero?', difficultyCopy:'La difficoltà determina quanti rivali competono con te e quante Trappole Cardinali sono attive: 1 in Facile, 2 in Medio, 3 in Difficile.', easy:'Facile', easyText:'Tu + Elena', medium:'Medio', mediumText:'Tu + Elena + Prof. Bianchi', hard:'Difficile', hardText:'Tutti i personaggi',
      movement:'MOVIMENTO', roll:'TIRA', rollPrompt:'Tira il dado', noBlock:'Nessun impedimento', moveRules:'1–5 = passi · ☠ = Imprevisto / Trappola', path:'🗺️ Percorso', music:'🎵 Musica', minimize:'— Minimizza', ritualItems:'🪶 Oggetti del rito', inventory:'🎒 Inventario', gameState:'Stato della partita', alwaysVisible:'sempre visibile', explorers:'Esploratori', heartsPosition:'cuori e posizione', useOne:'usa 1 oggetto nel tuo turno', awakening:'Risveglio', round:'Round', skullLife:'Vita Teschio', status:'Stato', free:'Libero',
      missionSummary:'Durante la partita questa pagina è solo un riepilogo: il gioco vero avviene nella Stanza. Minimizzala quando vuoi consultare il diario completo.',
      started:'La partita è iniziata.', directRoom:'La stanza è ora il centro del gioco.', difficultyEasy:'Facile', difficultyMedium:'Medio', difficultyHard:'Difficile',
      roleHero:'Tu · Custode del rito', roleElena:'Rivale · Esploratrice', roleBianchi:'Rivale · Occultista', roleMarco:'Rivale · Cercatore',
      courage5:'Lucido', courage4:'Inquieto', courage3:'Spaventato', courage2:'Terrorizzato', courage1:'Panico', courage0:'Sopraffatto',
      omen:'Il Maniero decide…', event:'Imprevisto', trap:'Trappola', move1:'Avanza di 1', move2:'Avanza di 2', move3:'Avanza di 3', move4:'Avanza di 4', move5:'Avanza di 5',
      summary:'Riepilogo', newGame:'↻ Nuova partita', endGame:'⏹ Termina partita', story:'📜 Trama', room:'🏰 Stanza', soundOn:'🎵 Musica ON', soundOff:'🎵 Musica OFF',
      sameRoom:'stessa stanza', sameTile:'stessa casella', ahead:'avanti', behind:'indietro', rooms:'stanze', steps:'passi', position:'Posizione', distance:'Distanza da te',
      itemUse:'Usa', noneConsumable:'Nessun oggetto consumabile raccolto.', rite:'RITO',
      selectRival:'Scegli un rivale', useOn:'Usa su {name}', close:'Chiudi', continue:'Continua', tileSafe:'Passaggio', tileClue:'Indizio', tileRelic:'Reliquia', tileDoor:'Soglia', tileCardinal:'Trappola Cardinale', tileCrypt:'Cripta', testEyebrow:'IMPREVISTO · TEST ESOTERICO', testTitle:'Il maniero pone una domanda', testCopy:'Un sigillo si accende sul pavimento. Per attraversarlo devi rispondere.', testWarning:'Una risposta errata ti respinge alla prima casella della stanza.', roomLabel:'Stanza', tileLabel:'casella', nobody:'Nessuno'
    },
    en: {
      startTitle:'The twelve bells are about to ring.', startCopy:'Three Seals are scattered through the manor. Enter, cross its rooms and seal the Crypt. If the twelfth bell rings, the hunt continues with the Skull roaming free.', start:'⚰️ Start game', startNote:'Prologue → name and avatar → difficulty → the game begins and the music starts.', language:'🌐 Language',
      storyTitle:'The night of the twelve bells', storyP1:'In 1888 Count Aureliano Vesper had a stone coffin sealed beneath his manor. It did not contain a man, but a Skull able to summon the shadows of the house.', storyP2:'Every hundred years, during the night of the twelve bells, the three Seals that keep the coffin shut scatter through the rooms. Tonight is the last night before the awakening.', storyP3:'The manor die shows 1–5 and a disturbing symbol: 1–5 moves you by that many spaces; when the symbol appears, the manor randomly chooses an Event or a Trap. If you are blocked, the block lasts at most two of your turns.', storyRule:'The twelfth bell does not end the game: the Skull breaks free, transforms and begins haunting the rooms. From then on you must survive its presence and complete the rite in the Crypt.', storyContinue:'Continue: choose the protagonist',
      profileTitle:'Who will enter the manor?', profileCopy:'Choose a name and avatar. This choice is requested for every new game.', name:'Name', male:'Adventurer', female:'Adventurer', profileNext:'Continue: choose difficulty',
      difficulty:'DIFFICULTY', difficultyTitle:'How many will enter the Manor?', difficultyCopy:'Difficulty determines how many rivals compete with you and how many Cardinal Traps are active: 1 on Easy, 2 on Medium, 3 on Hard.', easy:'Easy', easyText:'You + Elena', medium:'Medium', mediumText:'You + Elena + Prof. Bianchi', hard:'Hard', hardText:'All characters',
      movement:'MOVEMENT', roll:'ROLL', rollPrompt:'Roll the die', noBlock:'No impediment', moveRules:'1–5 = spaces · ☠ = Event / Trap', path:'🗺️ Route', music:'🎵 Music', minimize:'— Minimize', ritualItems:'🪶 Ritual items', inventory:'🎒 Inventory', gameState:'Game state', alwaysVisible:'always visible', explorers:'Explorers', heartsPosition:'courage and position', useOne:'use 1 item on your turn', awakening:'Awakening', round:'Round', skullLife:'Skull life', status:'Status', free:'Free',
      missionSummary:'During play this page is only a summary: the real game happens in the Room. Minimize it whenever you want to consult the full journal.',
      started:'The game has begun.', directRoom:'The Room is now the centre of play.', difficultyEasy:'Easy', difficultyMedium:'Medium', difficultyHard:'Hard',
      roleHero:'You · Keeper of the rite', roleElena:'Rival · Explorer', roleBianchi:'Rival · Occultist', roleMarco:'Rival · Seeker',
      courage5:'Clear-minded', courage4:'Uneasy', courage3:'Frightened', courage2:'Terrified', courage1:'Panic', courage0:'Overwhelmed',
      omen:'The Manor decides…', event:'Event', trap:'Trap', move1:'Move 1 space', move2:'Move 2 spaces', move3:'Move 3 spaces', move4:'Move 4 spaces', move5:'Move 5 spaces',
      summary:'Summary', newGame:'↻ New game', endGame:'⏹ End game', story:'📜 Story', room:'🏰 Room', soundOn:'🎵 Music ON', soundOff:'🎵 Music OFF',
      sameRoom:'same room', sameTile:'same space', ahead:'ahead', behind:'behind', rooms:'rooms', steps:'spaces', position:'Position', distance:'Distance from you',
      itemUse:'Use', noneConsumable:'No consumable items collected.', rite:'RITE', selectRival:'Choose a rival', useOn:'Use on {name}', close:'Close', continue:'Continue', tileSafe:'Passage', tileClue:'Clue', tileRelic:'Relic', tileDoor:'Threshold', tileCardinal:'Cardinal Trap', tileCrypt:'Crypt', testEyebrow:'EVENT · ESOTERIC TEST', testTitle:'The manor asks a question', testCopy:'A seal lights up on the floor. To cross it you must answer.', testWarning:'A wrong answer sends you back to the first space of the room.', roomLabel:'Room', tileLabel:'space', nobody:'Nobody'
    },
    es: {
      startTitle:'Las doce campanas están a punto de sonar.', startCopy:'Tres Sellos están dispersos por la mansión. Entra, atraviesa sus salas y sella la Cripta. Si suena la duodécima campana, la cacería continúa con el Cráneo libre.', start:'⚰️ Iniciar partida', startNote:'Prólogo → nombre y avatar → dificultad → empieza la partida y la música.', language:'🌐 Idioma',
      storyTitle:'La noche de las doce campanas', storyP1:'En 1888 el conde Aureliano Vesper hizo sellar bajo su mansión un ataúd de piedra. Dentro no descansaba un hombre, sino un Cráneo capaz de llamar a las sombras de la casa.', storyP2:'Cada cien años, durante la noche de las doce campanas, los tres Sellos que mantienen cerrado el ataúd se dispersan por las salas. Esta noche es la última antes del despertar.', storyP3:'El dado de la mansión muestra 1–5 y un símbolo inquietante: con 1–5 avanzas ese número de casillas; cuando aparece el símbolo, la mansión decide al azar entre Imprevisto y Trampa. Si quedas bloqueado, el bloqueo dura como máximo dos de tus turnos.', storyRule:'La duodécima campana no termina la partida: el Cráneo se libera, se transforma y comienza a infestar las salas. Desde ese momento tendrás que sobrevivir a su presencia y completar el rito en la Cripta.', storyContinue:'Continuar: elige protagonista',
      profileTitle:'¿Quién entrará en la mansión?', profileCopy:'Elige nombre y avatar. Esta elección se solicita en cada partida nueva.', name:'Nombre', male:'Aventurero', female:'Aventurera', profileNext:'Continuar: elegir dificultad',
      difficulty:'DIFICULTAD', difficultyTitle:'¿Cuántos entrarán en la Mansión?', difficultyCopy:'La dificultad determina cuántos rivales compiten contigo y cuántas Trampas Cardinales están activas: 1 en Fácil, 2 en Medio y 3 en Difícil.', easy:'Fácil', easyText:'Tú + Elena', medium:'Medio', mediumText:'Tú + Elena + Prof. Bianchi', hard:'Difícil', hardText:'Todos los personajes',
      movement:'MOVIMIENTO', roll:'TIRA', rollPrompt:'Tira el dado', noBlock:'Sin impedimentos', moveRules:'1–5 = casillas · ☠ = Imprevisto / Trampa', path:'🗺️ Recorrido', music:'🎵 Música', minimize:'— Minimizar', ritualItems:'🪶 Objetos del rito', inventory:'🎒 Inventario', gameState:'Estado de la partida', alwaysVisible:'siempre visible', explorers:'Exploradores', heartsPosition:'coraje y posición', useOne:'usa 1 objeto en tu turno', awakening:'Despertar', round:'Ronda', skullLife:'Vida del Cráneo', status:'Estado', free:'Libre',
      missionSummary:'Durante la partida esta página es solo un resumen: el juego real sucede en la Sala. Minimízala cuando quieras consultar el diario completo.', started:'La partida ha comenzado.', directRoom:'La Sala es ahora el centro del juego.', difficultyEasy:'Fácil', difficultyMedium:'Medio', difficultyHard:'Difícil',
      roleHero:'Tú · Guardián del rito', roleElena:'Rival · Exploradora', roleBianchi:'Rival · Ocultista', roleMarco:'Rival · Buscador', courage5:'Lúcido', courage4:'Inquieto', courage3:'Asustado', courage2:'Aterrorizado', courage1:'Pánico', courage0:'Abrumado',
      omen:'La Mansión decide…', event:'Imprevisto', trap:'Trampa', move1:'Avanza 1 casilla', move2:'Avanza 2 casillas', move3:'Avanza 3 casillas', move4:'Avanza 4 casillas', move5:'Avanza 5 casillas', summary:'Resumen', newGame:'↻ Nueva partida', endGame:'⏹ Terminar partida', story:'📜 Trama', room:'🏰 Sala', soundOn:'🎵 Música ON', soundOff:'🎵 Música OFF', sameRoom:'misma sala', sameTile:'misma casilla', ahead:'por delante', behind:'por detrás', rooms:'salas', steps:'casillas', position:'Posición', distance:'Distancia desde ti', itemUse:'Usar', noneConsumable:'No hay objetos consumibles.', rite:'RITO', selectRival:'Elige un rival', useOn:'Usar sobre {name}', close:'Cerrar', continue:'Continuar', tileSafe:'Pasaje', tileClue:'Indicio', tileRelic:'Reliquia', tileDoor:'Umbral', tileCardinal:'Trampa Cardinal', tileCrypt:'Cripta', testEyebrow:'IMPREVISTO · TEST ESOTÉRICO', testTitle:'La mansión plantea una pregunta', testCopy:'Un sello se ilumina en el suelo. Para cruzarlo debes responder.', testWarning:'Una respuesta incorrecta te devuelve a la primera casilla de la sala.', roomLabel:'Sala', tileLabel:'casilla', nobody:'Nadie'
    },
    fr: {
      startTitle:'Les douze cloches vont bientôt sonner.', startCopy:'Trois Sceaux sont dispersés dans le manoir. Entrez, traversez les pièces et scellez la Crypte. Si le douzième coup sonne, la chasse continue avec le Crâne en liberté.', start:'⚰️ Commencer', startNote:'Prologue → nom et avatar → difficulté → la partie commence et la musique démarre.', language:'🌐 Langue',
      storyTitle:'La nuit des douze cloches', storyP1:'En 1888, le comte Aureliano Vesper fit murer sous son manoir un cercueil de pierre. Il ne contenait pas un homme, mais un Crâne capable d’appeler les ombres de la demeure.', storyP2:'Tous les cent ans, pendant la nuit des douze cloches, les trois Sceaux qui maintiennent le cercueil fermé se dispersent dans les pièces. Cette nuit est la dernière avant l’éveil.', storyP3:'Le dé du manoir affiche 1–5 et un symbole inquiétant : avec 1–5 vous avancez du nombre indiqué ; lorsque le symbole apparaît, le manoir choisit au hasard entre Imprévu et Piège. Un blocage dure au maximum deux de vos tours.', storyRule:'Le douzième coup ne termine pas la partie : le Crâne se libère, se transforme et commence à hanter les pièces. Vous devrez alors survivre à sa présence et accomplir le rite dans la Crypte.', storyContinue:'Continuer : choisir le protagoniste',
      profileTitle:'Qui entrera dans le manoir ?', profileCopy:'Choisissez un nom et un avatar. Ce choix est demandé à chaque nouvelle partie.', name:'Nom', male:'Aventurier', female:'Aventurière', profileNext:'Continuer : choisir la difficulté', difficulty:'DIFFICULTÉ', difficultyTitle:'Combien entreront dans le Manoir ?', difficultyCopy:'La difficulté détermine le nombre de rivaux et de Pièges Cardinaux actifs : 1 en Facile, 2 en Moyen et 3 en Difficile.', easy:'Facile', easyText:'Vous + Elena', medium:'Moyen', mediumText:'Vous + Elena + Prof. Bianchi', hard:'Difficile', hardText:'Tous les personnages',
      movement:'MOUVEMENT', roll:'LANCER', rollPrompt:'Lancez le dé', noBlock:'Aucun obstacle', moveRules:'1–5 = cases · ☠ = Imprévu / Piège', path:'🗺️ Parcours', music:'🎵 Musique', minimize:'— Réduire', ritualItems:'🪶 Objets du rite', inventory:'🎒 Inventaire', gameState:'État de la partie', alwaysVisible:'toujours visible', explorers:'Explorateurs', heartsPosition:'courage et position', useOne:'utilisez 1 objet pendant votre tour', awakening:'Éveil', round:'Tour', skullLife:'Vie du Crâne', status:'État', free:'Libre', missionSummary:'Pendant la partie cette page n’est qu’un résumé : le vrai jeu se déroule dans la Pièce. Réduisez-la pour consulter le journal complet.', started:'La partie a commencé.', directRoom:'La Pièce est maintenant le centre du jeu.', difficultyEasy:'Facile', difficultyMedium:'Moyen', difficultyHard:'Difficile', roleHero:'Vous · Gardien du rite', roleElena:'Rivale · Exploratrice', roleBianchi:'Rival · Occultiste', roleMarco:'Rival · Chercheur', courage5:'Lucide', courage4:'Inquiet', courage3:'Effrayé', courage2:'Terrifié', courage1:'Panique', courage0:'Submergé', omen:'Le Manoir décide…', event:'Imprévu', trap:'Piège', move1:'Avancez de 1 case', move2:'Avancez de 2 cases', move3:'Avancez de 3 cases', move4:'Avancez de 4 cases', move5:'Avancez de 5 cases', summary:'Résumé', newGame:'↻ Nouvelle partie', endGame:'⏹ Terminer', story:'📜 Histoire', room:'🏰 Pièce', soundOn:'🎵 Musique ON', soundOff:'🎵 Musique OFF', sameRoom:'même pièce', sameTile:'même case', ahead:'devant', behind:'derrière', rooms:'pièces', steps:'cases', position:'Position', distance:'Distance de vous', itemUse:'Utiliser', noneConsumable:'Aucun objet consommable.', rite:'RITE', selectRival:'Choisissez un rival', useOn:'Utiliser sur {name}', close:'Fermer', continue:'Continuer', tileSafe:'Passage', tileClue:'Indice', tileRelic:'Relique', tileDoor:'Seuil', tileCardinal:'Piège Cardinal', tileCrypt:'Crypte', testEyebrow:'IMPRÉVU · TEST ÉSOTÉRIQUE', testTitle:'Le manoir pose une question', testCopy:'Un sceau s’illumine au sol. Pour le franchir, vous devez répondre.', testWarning:'Une mauvaise réponse vous renvoie à la première case de la pièce.', roomLabel:'Pièce', tileLabel:'case', nobody:'Personne'
    },
    pt: {
      startTitle:'Os doze sinos estão prestes a tocar.', startCopy:'Três Selos estão espalhados pelo casarão. Entre, atravesse os cômodos e sele a Cripta. Se o décimo segundo toque acontecer, a caçada continua com o Crânio livre.', start:'⚰️ Iniciar jogo', startNote:'Prólogo → nome e avatar → dificuldade → o jogo começa e a música toca.', language:'🌐 Idioma',
      storyTitle:'A noite dos doze sinos', storyP1:'Em 1888, o conde Aureliano Vesper mandou selar sob seu casarão um caixão de pedra. Dentro não repousava um homem, mas um Crânio capaz de chamar as sombras da casa.', storyP2:'A cada cem anos, durante a noite dos doze sinos, os três Selos que mantêm o caixão fechado se espalham pelos cômodos. Esta é a última noite antes do despertar.', storyP3:'O dado do casarão mostra 1–5 e um símbolo inquietante: com 1–5 você avança o número indicado; quando o símbolo aparece, o casarão escolhe aleatoriamente entre Imprevisto e Armadilha. Um bloqueio dura no máximo dois dos seus turnos.', storyRule:'O décimo segundo toque não encerra o jogo: o Crânio se liberta, se transforma e começa a assombrar os cômodos. A partir daí você deve sobreviver à presença dele e completar o rito na Cripta.', storyContinue:'Continuar: escolher protagonista',
      profileTitle:'Quem entrará no casarão?', profileCopy:'Escolha nome e avatar. Essa escolha é solicitada em cada nova partida.', name:'Nome', male:'Aventureiro', female:'Aventureira', profileNext:'Continuar: escolher dificuldade', difficulty:'DIFICULDADE', difficultyTitle:'Quantos entrarão no Casarão?', difficultyCopy:'A dificuldade determina quantos rivais competem com você e quantas Armadilhas Cardinais ficam ativas: 1 no Fácil, 2 no Médio e 3 no Difícil.', easy:'Fácil', easyText:'Você + Elena', medium:'Médio', mediumText:'Você + Elena + Prof. Bianchi', hard:'Difícil', hardText:'Todos os personagens',
      movement:'MOVIMENTO', roll:'ROLAR', rollPrompt:'Role o dado', noBlock:'Sem impedimentos', moveRules:'1–5 = casas · ☠ = Imprevisto / Armadilha', path:'🗺️ Percurso', music:'🎵 Música', minimize:'— Minimizar', ritualItems:'🪶 Objetos do rito', inventory:'🎒 Inventário', gameState:'Estado do jogo', alwaysVisible:'sempre visível', explorers:'Exploradores', heartsPosition:'coragem e posição', useOne:'use 1 objeto no seu turno', awakening:'Despertar', round:'Rodada', skullLife:'Vida do Crânio', status:'Estado', free:'Livre', missionSummary:'Durante a partida esta página é apenas um resumo: o jogo de verdade acontece no Cômodo. Minimize quando quiser consultar o diário completo.', started:'A partida começou.', directRoom:'O Cômodo agora é o centro do jogo.', difficultyEasy:'Fácil', difficultyMedium:'Médio', difficultyHard:'Difícil', roleHero:'Você · Guardião do rito', roleElena:'Rival · Exploradora', roleBianchi:'Rival · Ocultista', roleMarco:'Rival · Buscador', courage5:'Lúcido', courage4:'Inquieto', courage3:'Assustado', courage2:'Aterrorizado', courage1:'Pânico', courage0:'Dominado', omen:'O Casarão decide…', event:'Imprevisto', trap:'Armadilha', move1:'Avance 1 casa', move2:'Avance 2 casas', move3:'Avance 3 casas', move4:'Avance 4 casas', move5:'Avance 5 casas', summary:'Resumo', newGame:'↻ Novo jogo', endGame:'⏹ Encerrar jogo', story:'📜 História', room:'🏰 Cômodo', soundOn:'🎵 Música ON', soundOff:'🎵 Música OFF', sameRoom:'mesmo cômodo', sameTile:'mesma casa', ahead:'à frente', behind:'atrás', rooms:'cômodos', steps:'casas', position:'Posição', distance:'Distância de você', itemUse:'Usar', noneConsumable:'Nenhum objeto consumível coletado.', rite:'RITO', selectRival:'Escolha um rival', useOn:'Usar em {name}', close:'Fechar', continue:'Continuar', tileSafe:'Passagem', tileClue:'Indício', tileRelic:'Relíquia', tileDoor:'Limiar', tileCardinal:'Armadilha Cardinal', tileCrypt:'Cripta', testEyebrow:'IMPREVISTO · TESTE ESOTÉRICO', testTitle:'O casarão faz uma pergunta', testCopy:'Um selo se acende no chão. Para atravessá-lo, você deve responder.', testWarning:'Uma resposta errada leva você de volta à primeira casa do cômodo.', roomLabel:'Cômodo', tileLabel:'casa', nobody:'Ninguém'
    }
  };

  const UI_EXTRA = {
  "it": {
    "gameTitle": "Il Maniero Maledetto",
    "subtitle": "Esplora il maniero, sopravvivi alle trappole e sigilla la Cripta anche se il Teschio si risveglia.",
    "dashboardPlayersNote": "1 giocatore + rivali secondo la difficoltà",
    "sealsTitle": "Sigilli",
    "sealsCopy": "Corvo, Luna e Spina devono arrivare insieme nella Cripta. Il rito finale riduce la vita del Teschio a zero.",
    "sharedInventory": "Inventario condiviso",
    "usableItems": "oggetti utilizzabili",
    "inventoryHelp": "Gli oggetti trovati da qualsiasi esploratore finiscono qui. Puoi usarne uno all’inizio di ogni tuo turno: alcuni aiutano te, altri ostacolano i rivali.",
    "mission": "MISSIONE",
    "missionTitle": "Sigilla la Cripta e riduci il Teschio a un osso comune.",
    "skullAwakening": "RISVEGLIO DEL TESCHIO",
    "bellChangeRoom": "La campana suona a ogni cambio di stanza.",
    "skullSleeping": "Teschio dormiente",
    "skullPrison": "La Cripta è ancora il suo carcere.",
    "manorDie": "IL DADO DEL MANIERO",
    "randomEventTrap": "👻 / ⚠️ casuale",
    "blockRule": "⛓️ Un blocco dura al massimo 2 turni personali. Un Imprevisto favorevole può liberarti prima; al secondo turno il personaggio si libera comunque.",
    "esotericCode": "Codice esoterico",
    "visionsSymbols": "visioni e simboli",
    "journalHelp": "Questi frammenti non servono direttamente a vincere: prima raccontano il mistero del maniero, poi spiegano il vero concetto storico o alchemico da cui prendono ispirazione.",
    "latestEvents": "Ultimi eventi",
    "nightChronicle": "Cronaca della notte",
    "inventoryReminder": "Hai oggetti nell’inventario.",
    "inventoryReminderHint": "Usali dal pannello a destra durante il tuo turno.",
    "quickNavigation": "Navigazione rapida pannello stanza",
    "ritualItemsShort": "Oggetti del rito",
    "ravenMoonThorn": "Corvo · Luna · Spina",
    "pathEyebrow": "PERCORSO DEL MANIERO",
    "pathTitle": "La strada verso la Cripta",
    "pathCopy": "Qui controlli la posizione di tutti e, dopo il dodicesimo rintocco, quali stanze sono state infestate dal Teschio.",
    "you": "Tu",
    "exploration": "ESPLORAZIONE",
    "exploredRoom": "Hai esplorato la stanza",
    "manorSilent": "Il maniero tace.",
    "codeVesper": "CODICE VESPER",
    "whichSymbol": "Quale simbolo completa il sigillo?",
    "newGameEyebrow": "NUOVA PARTITA",
    "yourName": "Il tuo nome",
    "inventoryItem": "OGGETTO DELL’INVENTARIO",
    "object": "Oggetto",
    "description": "Descrizione",
    "useObject": "Usa oggetto",
    "prologue": "PROLOGO",
    "finalRite": "RITO FINALE",
    "coffinTrembles": "Il coperchio della bara trema",
    "riteCopy": "La formula è incisa direttamente sul bordo della bara: Corvo → Luna → Spina. Gli indizi raccolti nel maniero sono frammenti esoterici e non sono necessari al rito.",
    "skullLifeUpper": "VITA DEL TESCHIO",
    "clearSequence": "Cancella sequenza",
    "twelfthToll": "IL DODICESIMO RINTOCCO",
    "notTheEnd": "NON È LA FINE.",
    "manorChanged": "IL MANIERO È CAMBIATO",
    "skullFree": "Il Teschio è libero",
    "awakeningCopy": "La bara si spalanca. L’osso si solleva, le ombre gli costruiscono un corpo e la Cripta smette di contenerlo. Ora può attraversare il maniero e lasciare stanze infestate dietro di sé.",
    "infestation": "👻 Infestazione",
    "infestationCopy": "Ogni stanza attraversata dal Teschio resta contaminata.",
    "encounter": "💀 Incontro",
    "encounterCopy": "Se vi raggiunge può provocare paura, ferite, blocchi o trascinarvi indietro.",
    "victory": "⚰️ Vittoria",
    "victoryCopy": "Raccogli i tre Sigilli, raggiungi la Cripta e compi il rito: il Teschio perderà la sua forma e tornerà un osso comune.",
    "continueHaunted": "Continua nel maniero infestato",
    "positionDetail": "DETTAGLIO POSIZIONE",
    "tile": "Casella",
    "finalRanking": "Classifica finale",
    "rankingNote": "posizione al termine della partita",
    "playAgain": "Gioca ancora",
    "trueMeaning": "Che cosa significa davvero",
    "noLore": "Nessun frammento esoterico scoperto. I simboli del maniero appariranno qui.",
    "noItems": "Nessun oggetto raccolto.",
    "ritualObjectCopy": "Oggetto rituale. Non si consuma e serve per sigillare la Cripta.",
    "clickClose": "Clicca per chiudere",
    "alreadyUsedItem": "Hai già usato un oggetto in questo turno",
    "useItemAtTurnStart": "Gli oggetti si usano all’inizio del tuo turno",
    "itemTargetChoose": "Scegli quale rivale colpire.",
    "itemTargetSelf": "L’effetto verrà applicato al protagonista o al maniero.",
    "skullFreeLife": "Teschio libero · Vita {life}/{max}",
    "skullHereRoom": "Ora infesta {room}. Le stanze visitate rimangono contaminate.",
    "skullDormantText": "Il dodicesimo rintocco lo libererà, ma la partita continuerà.",
    "roomInfested": "Questa stanza è infestata. {text}",
    "skullHere": "Il Teschio è qui. {text}",
    "botsPlaying": "I rivali stanno giocando…",
    "coffinAwaits": "La bara aspetta il rito",
    "blockedAuto": "Bloccato · auto-sblocco tra {turns} turni",
    "blockedStatus": "Bloccato: {status}",
    "skullInRoom": "⚠️ Il Teschio è nella stanza",
    "hauntedRoom": "👻 Stanza infestata",
    "dieRolling": "Il dado ruota…",
    "walking": "Cammini lentamente… casella {pos}",
    "crossThreshold": "Attraversi la soglia verso {room}… 🔔",
    "correctAnswer": "Risposta corretta.",
    "wrongAnswer": "Risposta errata.",
    "sealPushBack": "Il sigillo della stanza ti respinge alla prima casella (-{moved}).",
    "sealAlreadyStart": "Il sigillo prova a respingerti, ma sei già sulla prima casella.",
    "testPassed": "Test superato.",
    "testFailed": "Test fallito.",
    "botFacesTest": "{name} affronta un Test Esoterico…",
    "correctChoice": "✓ Risposta corretta: {answer}",
    "wrongChoice": "✕ Risposta errata: {answer} · ritorna all’inizio di {room}{moved}",
    "lowCourage": "Coraggio basso: il pericolo è più intenso",
    "courageMinus": "Coraggio -{n}",
    "blockedMax": "Bloccato per max {n} turni",
    "moveBack": "Arretri di {n}",
    "returnRoomStart": "Torni alla prima casella della stanza (-{n})",
    "alreadyRoomStart": "Eri già all’inizio della stanza",
    "skullContaminates": "La stanza viene contaminata dall’energia del Teschio",
    "omenNoBell": "Un presagio scuote la Cripta, ma non fa suonare una campana",
    "escapeDark": "Fuga nel buio: arretri di 1 stanza e riparti con 2 Coraggio",
    "noInjury": "Nessuna ferita, ma il pericolo era reale.",
    "favorableEvent": "IMPREVISTO FAVOREVOLE",
    "protectionSaves": "La protezione ti salva",
    "protectionConsumed": "Protezione consumata. Nessun altro effetto.",
    "blockAuto": "SBLOCCO AUTOMATICO",
    "blockGivesWay": "Il blocco cede",
    "blocked": "BLOCCATO",
    "stillBlocked": "Sei ancora bloccato",
    "exploreMeta": "Nessun effetto immediato, ma il maniero continua a raccontare la sua storia.",
    "sharedSeal": "Il Sigillo entra nell’inventario condiviso.",
    "crypt": "CRIPTA",
    "coffinAhead": "La bara è davanti a te",
    "coffinUnreachable": "La bara resta irraggiungibile",
    "allSealsCopy": "I tre Sigilli vibrano insieme. Il coperchio della bara può finalmente essere richiuso.",
    "missingSealsCopy": "Mancano ancora uno o più Sigilli. Il Teschio oscilla sul bordo e sembra aspettare.",
    "riteButtonSoon": "Dopo questo evento apparirà il pulsante per il rito finale.",
    "keepSearching": "Continua a cercare: non puoi completare il rito.",
    "itemAdded": "{item} aggiunto all’inventario: puoi usarlo dal pannello della stanza.",
    "courageFull": "Il tuo Coraggio è già al massimo.",
    "searchTitle": "Ricerca n. {n} in {room}",
    "cardinalBack": "Ritorni indietro di 3 stanze: {from} → {to}. Questa trappola non colpirà più {name} nella partita.",
    "twelfthCancels": "{name} si arresta sulla soglia di {room}: il XII rintocco annulla ogni altro evento del turno.",
    "skullLabel": "IL TESCHIO",
    "finalWinner": "VITTORIA DI {name}",
    "youWon": "HAI VINTO",
    "winnerSealed": "{name} ha sigillato la Cripta",
    "heroVictoryText": "Hai completato il rito. Il Teschio perde la propria ombra, la bara si chiude e per un istante tutte le stanze del maniero si illuminano insieme. Nella Cripta rimane soltanto un osso comune.",
    "rivalVictoryText": "{name} ha raggiunto la Cripta e completato il rito prima degli altri. Il Teschio perde la propria forma e la partita termina.",
    "difficultyLabel": "Difficoltà"
  },
  "en": {
    "gameTitle": "The Cursed Manor",
    "subtitle": "Explore the manor, survive its traps and seal the Crypt even if the Skull awakens.",
    "dashboardPlayersNote": "1 player + rivals according to difficulty",
    "sealsTitle": "Seals",
    "sealsCopy": "Raven, Moon and Thorn must reach the Crypt together. The final rite reduces the Skull's life to zero.",
    "sharedInventory": "Shared inventory",
    "usableItems": "usable items",
    "inventoryHelp": "Items found by any explorer end up here. You may use one at the start of your turn: some help you, others hinder rivals.",
    "mission": "MISSION",
    "missionTitle": "Seal the Crypt and reduce the Skull to an ordinary bone.",
    "skullAwakening": "AWAKENING OF THE SKULL",
    "bellChangeRoom": "The bell rings whenever you enter another room.",
    "skullSleeping": "Dormant Skull",
    "skullPrison": "The Crypt is still its prison.",
    "manorDie": "THE MANOR DIE",
    "randomEventTrap": "👻 / ⚠️ random",
    "blockRule": "⛓️ A block lasts at most 2 personal turns. A favourable Event can free you earlier; after the second turn the character is released anyway.",
    "esotericCode": "Esoteric Code",
    "visionsSymbols": "visions and symbols",
    "journalHelp": "These fragments are not required to win: first they tell the manor's mystery, then they explain the real historical or alchemical concept that inspired them.",
    "latestEvents": "Latest events",
    "nightChronicle": "Chronicle of the night",
    "inventoryReminder": "You have items in your inventory.",
    "inventoryReminderHint": "Use them from the panel on the right during your turn.",
    "quickNavigation": "Quick room-panel navigation",
    "ritualItemsShort": "Ritual items",
    "ravenMoonThorn": "Raven · Moon · Thorn",
    "pathEyebrow": "ROUTE THROUGH THE MANOR",
    "pathTitle": "The road to the Crypt",
    "pathCopy": "Here you can see everyone's position and, after the twelfth toll, which rooms have been haunted by the Skull.",
    "you": "You",
    "exploration": "EXPLORATION",
    "exploredRoom": "You explored the room",
    "manorSilent": "The manor is silent.",
    "codeVesper": "CODEX VESPER",
    "whichSymbol": "Which symbol completes the seal?",
    "newGameEyebrow": "NEW GAME",
    "yourName": "Your name",
    "inventoryItem": "INVENTORY ITEM",
    "object": "Item",
    "description": "Description",
    "useObject": "Use item",
    "prologue": "PROLOGUE",
    "finalRite": "FINAL RITE",
    "coffinTrembles": "The coffin lid trembles",
    "riteCopy": "The formula is carved directly into the coffin rim: Raven → Moon → Thorn. Clues found in the manor are esoteric fragments and are not required for the rite.",
    "skullLifeUpper": "SKULL LIFE",
    "clearSequence": "Clear sequence",
    "twelfthToll": "THE TWELFTH TOLL",
    "notTheEnd": "THIS IS NOT THE END.",
    "manorChanged": "THE MANOR HAS CHANGED",
    "skullFree": "The Skull is free",
    "awakeningCopy": "The coffin bursts open. The bone rises, shadows build it a body, and the Crypt can no longer contain it. It can now cross the manor and leave haunted rooms behind.",
    "infestation": "👻 Haunting",
    "infestationCopy": "Every room crossed by the Skull remains contaminated.",
    "encounter": "💀 Encounter",
    "encounterCopy": "If it reaches you, it may cause fear, wounds, blocks or drag you backward.",
    "victory": "⚰️ Victory",
    "victoryCopy": "Collect the three Seals, reach the Crypt and perform the rite: the Skull will lose its form and become an ordinary bone.",
    "continueHaunted": "Continue through the haunted manor",
    "positionDetail": "POSITION DETAILS",
    "tile": "Space",
    "finalRanking": "Final ranking",
    "rankingNote": "position when the game ended",
    "playAgain": "Play again",
    "trueMeaning": "What it really means",
    "noLore": "No esoteric fragments discovered yet. The manor's symbols will appear here.",
    "noItems": "No items collected.",
    "ritualObjectCopy": "Ritual item. It is not consumed and is required to seal the Crypt.",
    "clickClose": "Click to close",
    "alreadyUsedItem": "You have already used an item this turn",
    "useItemAtTurnStart": "Items can be used at the start of your turn",
    "itemTargetChoose": "Choose which rival to affect.",
    "itemTargetSelf": "The effect will be applied to the protagonist or the manor.",
    "skullFreeLife": "Skull roaming · Life {life}/{max}",
    "skullHereRoom": "It is now haunting {room}. Rooms it visits remain contaminated.",
    "skullDormantText": "The twelfth toll will free it, but the game will continue.",
    "roomInfested": "This room is haunted. {text}",
    "skullHere": "The Skull is here. {text}",
    "botsPlaying": "The rivals are taking their turns…",
    "coffinAwaits": "The coffin awaits the rite",
    "blockedAuto": "Blocked · automatic release in {turns} turns",
    "blockedStatus": "Blocked: {status}",
    "skullInRoom": "⚠️ The Skull is in this room",
    "hauntedRoom": "👻 Haunted room",
    "dieRolling": "The die is rolling…",
    "walking": "You move slowly… space {pos}",
    "crossThreshold": "You cross the threshold into {room}… 🔔",
    "correctAnswer": "Correct answer.",
    "wrongAnswer": "Wrong answer.",
    "sealPushBack": "The room's seal sends you back to its first space (-{moved}).",
    "sealAlreadyStart": "The seal tries to repel you, but you are already on the first space.",
    "testPassed": "Test passed.",
    "testFailed": "Test failed.",
    "botFacesTest": "{name} faces an Esoteric Test…",
    "correctChoice": "✓ Correct answer: {answer}",
    "wrongChoice": "✕ Wrong answer: {answer} · returns to the start of {room}{moved}",
    "lowCourage": "Low Courage: the danger is more intense",
    "courageMinus": "Courage -{n}",
    "blockedMax": "Blocked for at most {n} turns",
    "moveBack": "Move back {n}",
    "returnRoomStart": "Return to the first space of the room (-{n})",
    "alreadyRoomStart": "You were already at the start of the room",
    "skullContaminates": "The room is contaminated by the Skull's energy",
    "omenNoBell": "An omen shakes the Crypt, but no bell rings",
    "escapeDark": "Flight into darkness: move back 1 room and restart with 2 Courage",
    "noInjury": "No wound, but the danger was real.",
    "favorableEvent": "FAVOURABLE EVENT",
    "protectionSaves": "Protection saves you",
    "protectionConsumed": "Protection consumed. No other effect.",
    "blockAuto": "AUTOMATIC RELEASE",
    "blockGivesWay": "The block gives way",
    "blocked": "BLOCKED",
    "stillBlocked": "You are still blocked",
    "exploreMeta": "No immediate effect, but the manor continues to tell its story.",
    "sharedSeal": "The Seal enters the shared inventory.",
    "crypt": "CRYPT",
    "coffinAhead": "The coffin is before you",
    "coffinUnreachable": "The coffin remains out of reach",
    "allSealsCopy": "The three Seals vibrate together. The coffin lid can finally be closed.",
    "missingSealsCopy": "One or more Seals are still missing. The Skull sways on the edge and seems to wait.",
    "riteButtonSoon": "After this event the final-rite button will appear.",
    "keepSearching": "Keep searching: you cannot complete the rite yet.",
    "itemAdded": "{item} added to the inventory: you can use it from the room panel.",
    "courageFull": "Your Courage is already at maximum.",
    "searchTitle": "Search no. {n} in {room}",
    "cardinalBack": "You move back 3 rooms: {from} → {to}. This trap will not affect {name} again this game.",
    "twelfthCancels": "{name} stops at the threshold of {room}: the twelfth toll cancels every other event in the turn.",
    "skullLabel": "THE SKULL",
    "finalWinner": "VICTORY FOR {name}",
    "youWon": "YOU WON",
    "winnerSealed": "{name} sealed the Crypt",
    "heroVictoryText": "You completed the rite. The Skull loses its shadow, the coffin closes, and for one instant every room in the manor lights up together. Only an ordinary bone remains in the Crypt.",
    "rivalVictoryText": "{name} reached the Crypt and completed the rite before everyone else. The Skull loses its form and the game ends.",
    "difficultyLabel": "Difficulty"
  },
  "es": {
    "gameTitle": "La Mansión Maldita",
    "subtitle": "Explora la mansión, sobrevive a las trampas y sella la Cripta incluso si el Cráneo despierta.",
    "dashboardPlayersNote": "1 jugador + rivales según la dificultad",
    "sealsTitle": "Sellos",
    "sealsCopy": "Cuervo, Luna y Espina deben llegar juntos a la Cripta. El rito final reduce la vida del Cráneo a cero.",
    "sharedInventory": "Inventario compartido",
    "usableItems": "objetos utilizables",
    "inventoryHelp": "Los objetos encontrados por cualquier explorador terminan aquí. Puedes usar uno al inicio de tu turno: algunos te ayudan y otros perjudican a los rivales.",
    "mission": "MISIÓN",
    "missionTitle": "Sella la Cripta y reduce el Cráneo a un hueso común.",
    "skullAwakening": "DESPERTAR DEL CRÁNEO",
    "bellChangeRoom": "La campana suena cada vez que cambias de sala.",
    "skullSleeping": "Cráneo dormido",
    "skullPrison": "La Cripta sigue siendo su prisión.",
    "manorDie": "EL DADO DE LA MANSIÓN",
    "randomEventTrap": "👻 / ⚠️ al azar",
    "blockRule": "⛓️ Un bloqueo dura como máximo 2 turnos personales. Un Imprevisto favorable puede liberarte antes; al segundo turno el personaje queda libre de todos modos.",
    "esotericCode": "Código esotérico",
    "visionsSymbols": "visiones y símbolos",
    "journalHelp": "Estos fragmentos no son necesarios para ganar: primero cuentan el misterio de la mansión y después explican el concepto histórico o alquímico real que los inspira.",
    "latestEvents": "Últimos eventos",
    "nightChronicle": "Crónica de la noche",
    "inventoryReminder": "Tienes objetos en el inventario.",
    "inventoryReminderHint": "Úsalos desde el panel derecho durante tu turno.",
    "quickNavigation": "Navegación rápida del panel",
    "ritualItemsShort": "Objetos del rito",
    "ravenMoonThorn": "Cuervo · Luna · Espina",
    "pathEyebrow": "RECORRIDO DE LA MANSIÓN",
    "pathTitle": "El camino hacia la Cripta",
    "pathCopy": "Aquí puedes ver la posición de todos y, después de la duodécima campanada, qué salas han sido infestadas por el Cráneo.",
    "you": "Tú",
    "exploration": "EXPLORACIÓN",
    "exploredRoom": "Has explorado la sala",
    "manorSilent": "La mansión guarda silencio.",
    "codeVesper": "CODEX VESPER",
    "whichSymbol": "¿Qué símbolo completa el sello?",
    "newGameEyebrow": "NUEVA PARTIDA",
    "yourName": "Tu nombre",
    "inventoryItem": "OBJETO DEL INVENTARIO",
    "object": "Objeto",
    "description": "Descripción",
    "useObject": "Usar objeto",
    "prologue": "PRÓLOGO",
    "finalRite": "RITO FINAL",
    "coffinTrembles": "La tapa del ataúd tiembla",
    "riteCopy": "La fórmula está grabada en el borde del ataúd: Cuervo → Luna → Espina. Las pistas encontradas son fragmentos esotéricos y no son necesarias para el rito.",
    "skullLifeUpper": "VIDA DEL CRÁNEO",
    "clearSequence": "Borrar secuencia",
    "twelfthToll": "LA DUODÉCIMA CAMPANADA",
    "notTheEnd": "NO ES EL FINAL.",
    "manorChanged": "LA MANSIÓN HA CAMBIADO",
    "skullFree": "El Cráneo está libre",
    "awakeningCopy": "El ataúd se abre de golpe. El hueso se eleva, las sombras le construyen un cuerpo y la Cripta deja de contenerlo. Ahora puede recorrer la mansión y dejar salas infestadas.",
    "infestation": "👻 Infestación",
    "infestationCopy": "Toda sala atravesada por el Cráneo queda contaminada.",
    "encounter": "💀 Encuentro",
    "encounterCopy": "Si te alcanza puede causar miedo, heridas, bloqueos o arrastrarte hacia atrás.",
    "victory": "⚰️ Victoria",
    "victoryCopy": "Recoge los tres Sellos, llega a la Cripta y realiza el rito: el Cráneo perderá su forma y volverá a ser un hueso común.",
    "continueHaunted": "Continuar por la mansión infestada",
    "positionDetail": "DETALLE DE POSICIÓN",
    "tile": "Casilla",
    "finalRanking": "Clasificación final",
    "rankingNote": "posición al terminar la partida",
    "playAgain": "Jugar otra vez",
    "trueMeaning": "Qué significa realmente",
    "noLore": "Todavía no has descubierto fragmentos esotéricos. Los símbolos de la mansión aparecerán aquí.",
    "noItems": "No se ha recogido ningún objeto.",
    "ritualObjectCopy": "Objeto ritual. No se consume y es necesario para sellar la Cripta.",
    "clickClose": "Haz clic para cerrar",
    "alreadyUsedItem": "Ya has usado un objeto en este turno",
    "useItemAtTurnStart": "Los objetos se usan al inicio de tu turno",
    "itemTargetChoose": "Elige a qué rival afectar.",
    "itemTargetSelf": "El efecto se aplicará al protagonista o a la mansión.",
    "skullFreeLife": "Cráneo libre · Vida {life}/{max}",
    "skullHereRoom": "Ahora infesta {room}. Las salas visitadas permanecen contaminadas.",
    "skullDormantText": "La duodécima campanada lo liberará, pero la partida continuará.",
    "roomInfested": "Esta sala está infestada. {text}",
    "skullHere": "El Cráneo está aquí. {text}",
    "botsPlaying": "Los rivales están jugando…",
    "coffinAwaits": "El ataúd espera el rito",
    "blockedAuto": "Bloqueado · liberación automática en {turns} turnos",
    "blockedStatus": "Bloqueado: {status}",
    "skullInRoom": "⚠️ El Cráneo está en la sala",
    "hauntedRoom": "👻 Sala infestada",
    "dieRolling": "El dado está girando…",
    "walking": "Caminas lentamente… casilla {pos}",
    "crossThreshold": "Cruzas el umbral hacia {room}… 🔔",
    "correctAnswer": "Respuesta correcta.",
    "wrongAnswer": "Respuesta incorrecta.",
    "sealPushBack": "El sello de la sala te devuelve a la primera casilla (-{moved}).",
    "sealAlreadyStart": "El sello intenta rechazarte, pero ya estás en la primera casilla.",
    "testPassed": "Prueba superada.",
    "testFailed": "Prueba fallida.",
    "botFacesTest": "{name} afronta una Prueba Esotérica…",
    "correctChoice": "✓ Respuesta correcta: {answer}",
    "wrongChoice": "✕ Respuesta incorrecta: {answer} · vuelve al inicio de {room}{moved}",
    "lowCourage": "Coraje bajo: el peligro es más intenso",
    "courageMinus": "Coraje -{n}",
    "blockedMax": "Bloqueado durante un máximo de {n} turnos",
    "moveBack": "Retrocedes {n}",
    "returnRoomStart": "Vuelves a la primera casilla de la sala (-{n})",
    "alreadyRoomStart": "Ya estabas al inicio de la sala",
    "skullContaminates": "La sala queda contaminada por la energía del Cráneo",
    "omenNoBell": "Un presagio sacude la Cripta, pero no hace sonar ninguna campana",
    "escapeDark": "Huida en la oscuridad: retrocedes 1 sala y vuelves con 2 de Coraje",
    "noInjury": "No hay heridas, pero el peligro era real.",
    "favorableEvent": "IMPREVISTO FAVORABLE",
    "protectionSaves": "La protección te salva",
    "protectionConsumed": "Protección consumida. Sin otros efectos.",
    "blockAuto": "LIBERACIÓN AUTOMÁTICA",
    "blockGivesWay": "El bloqueo cede",
    "blocked": "BLOQUEADO",
    "stillBlocked": "Sigues bloqueado",
    "exploreMeta": "No hay un efecto inmediato, pero la mansión sigue contando su historia.",
    "sharedSeal": "El Sello entra en el inventario compartido.",
    "crypt": "CRIPTA",
    "coffinAhead": "El ataúd está ante ti",
    "coffinUnreachable": "El ataúd sigue fuera de alcance",
    "allSealsCopy": "Los tres Sellos vibran juntos. La tapa del ataúd puede cerrarse por fin.",
    "missingSealsCopy": "Todavía falta uno o más Sellos. El Cráneo oscila en el borde y parece esperar.",
    "riteButtonSoon": "Después de este evento aparecerá el botón del rito final.",
    "keepSearching": "Sigue buscando: todavía no puedes completar el rito.",
    "itemAdded": "{item} añadido al inventario: puedes usarlo desde el panel de la sala.",
    "courageFull": "Tu Coraje ya está al máximo.",
    "searchTitle": "Búsqueda n.º {n} en {room}",
    "cardinalBack": "Retrocedes 3 salas: {from} → {to}. Esta trampa no volverá a afectar a {name} durante la partida.",
    "twelfthCancels": "{name} se detiene en el umbral de {room}: la duodécima campanada cancela cualquier otro evento del turno.",
    "skullLabel": "EL CRÁNEO",
    "finalWinner": "VICTORIA DE {name}",
    "youWon": "HAS GANADO",
    "winnerSealed": "{name} ha sellado la Cripta",
    "heroVictoryText": "Has completado el rito. El Cráneo pierde su sombra, el ataúd se cierra y durante un instante todas las salas de la mansión se iluminan a la vez. En la Cripta solo queda un hueso común.",
    "rivalVictoryText": "{name} ha llegado a la Cripta y ha completado el rito antes que los demás. El Cráneo pierde su forma y la partida termina.",
    "difficultyLabel": "Dificultad"
  },
  "fr": {
    "gameTitle": "Le Manoir Maudit",
    "subtitle": "Explorez le manoir, survivez aux pièges et scellez la Crypte même si le Crâne s’éveille.",
    "dashboardPlayersNote": "1 joueur + rivaux selon la difficulté",
    "sealsTitle": "Sceaux",
    "sealsCopy": "Corbeau, Lune et Épine doivent parvenir ensemble à la Crypte. Le rite final réduit la vie du Crâne à zéro.",
    "sharedInventory": "Inventaire partagé",
    "usableItems": "objets utilisables",
    "inventoryHelp": "Les objets trouvés par n’importe quel explorateur arrivent ici. Vous pouvez en utiliser un au début de votre tour : certains vous aident, d’autres gênent les rivaux.",
    "mission": "MISSION",
    "missionTitle": "Scellez la Crypte et réduisez le Crâne à un simple os.",
    "skullAwakening": "ÉVEIL DU CRÂNE",
    "bellChangeRoom": "La cloche sonne à chaque changement de pièce.",
    "skullSleeping": "Crâne endormi",
    "skullPrison": "La Crypte est encore sa prison.",
    "manorDie": "LE DÉ DU MANOIR",
    "randomEventTrap": "👻 / ⚠️ aléatoire",
    "blockRule": "⛓️ Un blocage dure au maximum 2 tours personnels. Un Imprévu favorable peut vous libérer plus tôt ; au second tour le personnage est libéré quoi qu’il arrive.",
    "esotericCode": "Code ésotérique",
    "visionsSymbols": "visions et symboles",
    "journalHelp": "Ces fragments ne sont pas nécessaires pour gagner : ils racontent d’abord le mystère du manoir, puis expliquent le concept historique ou alchimique réel qui les a inspirés.",
    "latestEvents": "Derniers événements",
    "nightChronicle": "Chronique de la nuit",
    "inventoryReminder": "Vous avez des objets dans l’inventaire.",
    "inventoryReminderHint": "Utilisez-les depuis le panneau de droite pendant votre tour.",
    "quickNavigation": "Navigation rapide du panneau",
    "ritualItemsShort": "Objets du rite",
    "ravenMoonThorn": "Corbeau · Lune · Épine",
    "pathEyebrow": "PARCOURS DU MANOIR",
    "pathTitle": "La route vers la Crypte",
    "pathCopy": "Vous voyez ici la position de chacun et, après le douzième coup, les pièces hantées par le Crâne.",
    "you": "Vous",
    "exploration": "EXPLORATION",
    "exploredRoom": "Vous avez exploré la pièce",
    "manorSilent": "Le manoir se tait.",
    "codeVesper": "CODEX VESPER",
    "whichSymbol": "Quel symbole complète le sceau ?",
    "newGameEyebrow": "NOUVELLE PARTIE",
    "yourName": "Votre nom",
    "inventoryItem": "OBJET DE L’INVENTAIRE",
    "object": "Objet",
    "description": "Description",
    "useObject": "Utiliser l’objet",
    "prologue": "PROLOGUE",
    "finalRite": "RITE FINAL",
    "coffinTrembles": "Le couvercle du cercueil tremble",
    "riteCopy": "La formule est gravée sur le bord du cercueil : Corbeau → Lune → Épine. Les indices du manoir sont des fragments ésotériques et ne sont pas nécessaires au rite.",
    "skullLifeUpper": "VIE DU CRÂNE",
    "clearSequence": "Effacer la séquence",
    "twelfthToll": "LE DOUZIÈME COUP",
    "notTheEnd": "CE N’EST PAS LA FIN.",
    "manorChanged": "LE MANOIR A CHANGÉ",
    "skullFree": "Le Crâne est libre",
    "awakeningCopy": "Le cercueil s’ouvre. L’os se soulève, les ombres lui construisent un corps et la Crypte ne le retient plus. Il peut maintenant traverser le manoir et laisser des pièces hantées derrière lui.",
    "infestation": "👻 Infestation",
    "infestationCopy": "Chaque pièce traversée par le Crâne reste contaminée.",
    "encounter": "💀 Rencontre",
    "encounterCopy": "S’il vous rejoint, il peut provoquer peur, blessures, blocages ou vous repousser.",
    "victory": "⚰️ Victoire",
    "victoryCopy": "Rassemblez les trois Sceaux, atteignez la Crypte et accomplissez le rite : le Crâne perdra sa forme et redeviendra un simple os.",
    "continueHaunted": "Continuer dans le manoir hanté",
    "positionDetail": "DÉTAIL DE POSITION",
    "tile": "Case",
    "finalRanking": "Classement final",
    "rankingNote": "position à la fin de la partie",
    "playAgain": "Rejouer",
    "trueMeaning": "Ce que cela signifie réellement",
    "noLore": "Aucun fragment ésotérique découvert. Les symboles du manoir apparaîtront ici.",
    "noItems": "Aucun objet ramassé.",
    "ritualObjectCopy": "Objet rituel. Il n’est pas consommé et sert à sceller la Crypte.",
    "clickClose": "Cliquez pour fermer",
    "alreadyUsedItem": "Vous avez déjà utilisé un objet ce tour-ci",
    "useItemAtTurnStart": "Les objets s’utilisent au début de votre tour",
    "itemTargetChoose": "Choisissez le rival à affecter.",
    "itemTargetSelf": "L’effet sera appliqué au protagoniste ou au manoir.",
    "skullFreeLife": "Crâne libre · Vie {life}/{max}",
    "skullHereRoom": "Il hante maintenant {room}. Les pièces visitées restent contaminées.",
    "skullDormantText": "Le douzième coup le libérera, mais la partie continuera.",
    "roomInfested": "Cette pièce est hantée. {text}",
    "skullHere": "Le Crâne est ici. {text}",
    "botsPlaying": "Les rivaux jouent…",
    "coffinAwaits": "Le cercueil attend le rite",
    "blockedAuto": "Bloqué · libération automatique dans {turns} tours",
    "blockedStatus": "Bloqué : {status}",
    "skullInRoom": "⚠️ Le Crâne est dans la pièce",
    "hauntedRoom": "👻 Pièce hantée",
    "dieRolling": "Le dé tourne…",
    "walking": "Vous avancez lentement… case {pos}",
    "crossThreshold": "Vous franchissez le seuil vers {room}… 🔔",
    "correctAnswer": "Bonne réponse.",
    "wrongAnswer": "Mauvaise réponse.",
    "sealPushBack": "Le sceau de la pièce vous renvoie à la première case (-{moved}).",
    "sealAlreadyStart": "Le sceau tente de vous repousser, mais vous êtes déjà sur la première case.",
    "testPassed": "Test réussi.",
    "testFailed": "Test échoué.",
    "botFacesTest": "{name} affronte un Test Ésotérique…",
    "correctChoice": "✓ Bonne réponse : {answer}",
    "wrongChoice": "✕ Mauvaise réponse : {answer} · retour au début de {room}{moved}",
    "lowCourage": "Courage faible : le danger est plus intense",
    "courageMinus": "Courage -{n}",
    "blockedMax": "Bloqué pendant au maximum {n} tours",
    "moveBack": "Reculez de {n}",
    "returnRoomStart": "Retour à la première case de la pièce (-{n})",
    "alreadyRoomStart": "Vous étiez déjà au début de la pièce",
    "skullContaminates": "La pièce est contaminée par l’énergie du Crâne",
    "omenNoBell": "Un présage secoue la Crypte, mais aucune cloche ne sonne",
    "escapeDark": "Fuite dans l’obscurité : reculez d’1 pièce et repartez avec 2 Courage",
    "noInjury": "Aucune blessure, mais le danger était réel.",
    "favorableEvent": "IMPRÉVU FAVORABLE",
    "protectionSaves": "La protection vous sauve",
    "protectionConsumed": "Protection consommée. Aucun autre effet.",
    "blockAuto": "LIBÉRATION AUTOMATIQUE",
    "blockGivesWay": "Le blocage cède",
    "blocked": "BLOQUÉ",
    "stillBlocked": "Vous êtes encore bloqué",
    "exploreMeta": "Aucun effet immédiat, mais le manoir continue de raconter son histoire.",
    "sharedSeal": "Le Sceau entre dans l’inventaire partagé.",
    "crypt": "CRYPTE",
    "coffinAhead": "Le cercueil est devant vous",
    "coffinUnreachable": "Le cercueil reste hors d’atteinte",
    "allSealsCopy": "Les trois Sceaux vibrent ensemble. Le couvercle peut enfin être refermé.",
    "missingSealsCopy": "Un ou plusieurs Sceaux manquent encore. Le Crâne oscille sur le bord et semble attendre.",
    "riteButtonSoon": "Après cet événement, le bouton du rite final apparaîtra.",
    "keepSearching": "Continuez à chercher : vous ne pouvez pas encore accomplir le rite.",
    "itemAdded": "{item} ajouté à l’inventaire : vous pouvez l’utiliser depuis le panneau de la pièce.",
    "courageFull": "Votre Courage est déjà au maximum.",
    "searchTitle": "Recherche n° {n} dans {room}",
    "cardinalBack": "Vous reculez de 3 pièces : {from} → {to}. Ce piège n’affectera plus {name} pendant cette partie.",
    "twelfthCancels": "{name} s’arrête au seuil de {room} : le douzième coup annule tout autre événement du tour.",
    "skullLabel": "LE CRÂNE",
    "finalWinner": "VICTOIRE DE {name}",
    "youWon": "VOUS AVEZ GAGNÉ",
    "winnerSealed": "{name} a scellé la Crypte",
    "heroVictoryText": "Vous avez accompli le rite. Le Crâne perd son ombre, le cercueil se ferme et toutes les pièces du manoir s’illuminent un instant. Il ne reste qu’un simple os dans la Crypte.",
    "rivalVictoryText": "{name} a atteint la Crypte et accompli le rite avant les autres. Le Crâne perd sa forme et la partie se termine.",
    "difficultyLabel": "Difficulté"
  },
  "pt": {
    "gameTitle": "O Casarão Amaldiçoado",
    "subtitle": "Explore o casarão, sobreviva às armadilhas e sele a Cripta mesmo se o Crânio despertar.",
    "dashboardPlayersNote": "1 jogador + rivais conforme a dificuldade",
    "sealsTitle": "Selos",
    "sealsCopy": "Corvo, Lua e Espinho devem chegar juntos à Cripta. O rito final reduz a vida do Crânio a zero.",
    "sharedInventory": "Inventário compartilhado",
    "usableItems": "objetos utilizáveis",
    "inventoryHelp": "Os objetos encontrados por qualquer explorador vêm para cá. Você pode usar um no início do seu turno: alguns ajudam você, outros atrapalham os rivais.",
    "mission": "MISSÃO",
    "missionTitle": "Sele a Cripta e reduza o Crânio a um osso comum.",
    "skullAwakening": "DESPERTAR DO CRÂNIO",
    "bellChangeRoom": "O sino toca sempre que você muda de cômodo.",
    "skullSleeping": "Crânio adormecido",
    "skullPrison": "A Cripta ainda é a prisão dele.",
    "manorDie": "O DADO DO CASARÃO",
    "randomEventTrap": "👻 / ⚠️ aleatório",
    "blockRule": "⛓️ Um bloqueio dura no máximo 2 turnos pessoais. Um Imprevisto favorável pode libertar você antes; no segundo turno o personagem é liberado de qualquer modo.",
    "esotericCode": "Código esotérico",
    "visionsSymbols": "visões e símbolos",
    "journalHelp": "Esses fragmentos não são necessários para vencer: primeiro contam o mistério do casarão e depois explicam o conceito histórico ou alquímico real que os inspirou.",
    "latestEvents": "Últimos eventos",
    "nightChronicle": "Crônica da noite",
    "inventoryReminder": "Você tem objetos no inventário.",
    "inventoryReminderHint": "Use-os pelo painel à direita durante o seu turno.",
    "quickNavigation": "Navegação rápida do painel",
    "ritualItemsShort": "Objetos do rito",
    "ravenMoonThorn": "Corvo · Lua · Espinho",
    "pathEyebrow": "PERCURSO DO CASARÃO",
    "pathTitle": "O caminho até a Cripta",
    "pathCopy": "Aqui você vê a posição de todos e, depois do décimo segundo toque, quais cômodos foram infestados pelo Crânio.",
    "you": "Você",
    "exploration": "EXPLORAÇÃO",
    "exploredRoom": "Você explorou o cômodo",
    "manorSilent": "O casarão está em silêncio.",
    "codeVesper": "CODEX VESPER",
    "whichSymbol": "Qual símbolo completa o selo?",
    "newGameEyebrow": "NOVO JOGO",
    "yourName": "Seu nome",
    "inventoryItem": "OBJETO DO INVENTÁRIO",
    "object": "Objeto",
    "description": "Descrição",
    "useObject": "Usar objeto",
    "prologue": "PRÓLOGO",
    "finalRite": "RITO FINAL",
    "coffinTrembles": "A tampa do caixão treme",
    "riteCopy": "A fórmula está gravada na borda do caixão: Corvo → Lua → Espinho. As pistas encontradas são fragmentos esotéricos e não são necessárias para o rito.",
    "skullLifeUpper": "VIDA DO CRÂNIO",
    "clearSequence": "Limpar sequência",
    "twelfthToll": "O DÉCIMO SEGUNDO TOQUE",
    "notTheEnd": "NÃO É O FIM.",
    "manorChanged": "O CASARÃO MUDOU",
    "skullFree": "O Crânio está livre",
    "awakeningCopy": "O caixão se abre. O osso se ergue, as sombras constroem um corpo e a Cripta deixa de contê-lo. Agora ele pode atravessar o casarão e deixar cômodos infestados para trás.",
    "infestation": "👻 Infestação",
    "infestationCopy": "Todo cômodo atravessado pelo Crânio permanece contaminado.",
    "encounter": "💀 Encontro",
    "encounterCopy": "Se alcançar você, pode causar medo, ferimentos, bloqueios ou arrastar você para trás.",
    "victory": "⚰️ Vitória",
    "victoryCopy": "Reúna os três Selos, alcance a Cripta e realize o rito: o Crânio perderá a forma e voltará a ser um osso comum.",
    "continueHaunted": "Continuar pelo casarão infestado",
    "positionDetail": "DETALHE DA POSIÇÃO",
    "tile": "Casa",
    "finalRanking": "Classificação final",
    "rankingNote": "posição ao fim do jogo",
    "playAgain": "Jogar novamente",
    "trueMeaning": "O que isso realmente significa",
    "noLore": "Nenhum fragmento esotérico descoberto. Os símbolos do casarão aparecerão aqui.",
    "noItems": "Nenhum objeto coletado.",
    "ritualObjectCopy": "Objeto ritual. Não é consumido e serve para selar a Cripta.",
    "clickClose": "Clique para fechar",
    "alreadyUsedItem": "Você já usou um objeto neste turno",
    "useItemAtTurnStart": "Os objetos são usados no início do seu turno",
    "itemTargetChoose": "Escolha qual rival será afetado.",
    "itemTargetSelf": "O efeito será aplicado ao protagonista ou ao casarão.",
    "skullFreeLife": "Crânio livre · Vida {life}/{max}",
    "skullHereRoom": "Agora ele infesta {room}. Os cômodos visitados permanecem contaminados.",
    "skullDormantText": "O décimo segundo toque vai libertá-lo, mas o jogo continuará.",
    "roomInfested": "Este cômodo está infestado. {text}",
    "skullHere": "O Crânio está aqui. {text}",
    "botsPlaying": "Os rivais estão jogando…",
    "coffinAwaits": "O caixão aguarda o rito",
    "blockedAuto": "Bloqueado · liberação automática em {turns} turnos",
    "blockedStatus": "Bloqueado: {status}",
    "skullInRoom": "⚠️ O Crânio está no cômodo",
    "hauntedRoom": "👻 Cômodo infestado",
    "dieRolling": "O dado está girando…",
    "walking": "Você caminha lentamente… casa {pos}",
    "crossThreshold": "Você atravessa o limiar para {room}… 🔔",
    "correctAnswer": "Resposta correta.",
    "wrongAnswer": "Resposta errada.",
    "sealPushBack": "O selo do cômodo leva você de volta à primeira casa (-{moved}).",
    "sealAlreadyStart": "O selo tenta repelir você, mas você já está na primeira casa.",
    "testPassed": "Teste superado.",
    "testFailed": "Teste falhou.",
    "botFacesTest": "{name} enfrenta um Teste Esotérico…",
    "correctChoice": "✓ Resposta correta: {answer}",
    "wrongChoice": "✕ Resposta errada: {answer} · volta ao início de {room}{moved}",
    "lowCourage": "Coragem baixa: o perigo é mais intenso",
    "courageMinus": "Coragem -{n}",
    "blockedMax": "Bloqueado por no máximo {n} turnos",
    "moveBack": "Recue {n}",
    "returnRoomStart": "Volte à primeira casa do cômodo (-{n})",
    "alreadyRoomStart": "Você já estava no início do cômodo",
    "skullContaminates": "O cômodo é contaminado pela energia do Crânio",
    "omenNoBell": "Um presságio abala a Cripta, mas nenhum sino toca",
    "escapeDark": "Fuga na escuridão: recue 1 cômodo e recomece com 2 de Coragem",
    "noInjury": "Nenhum ferimento, mas o perigo era real.",
    "favorableEvent": "IMPREVISTO FAVORÁVEL",
    "protectionSaves": "A proteção salva você",
    "protectionConsumed": "Proteção consumida. Nenhum outro efeito.",
    "blockAuto": "LIBERAÇÃO AUTOMÁTICA",
    "blockGivesWay": "O bloqueio cede",
    "blocked": "BLOQUEADO",
    "stillBlocked": "Você ainda está bloqueado",
    "exploreMeta": "Nenhum efeito imediato, mas o casarão continua contando sua história.",
    "sharedSeal": "O Selo entra no inventário compartilhado.",
    "crypt": "CRIPTA",
    "coffinAhead": "O caixão está diante de você",
    "coffinUnreachable": "O caixão continua fora de alcance",
    "allSealsCopy": "Os três Selos vibram juntos. A tampa do caixão finalmente pode ser fechada.",
    "missingSealsCopy": "Ainda falta um ou mais Selos. O Crânio oscila na borda e parece esperar.",
    "riteButtonSoon": "Depois deste evento aparecerá o botão do rito final.",
    "keepSearching": "Continue procurando: você ainda não pode completar o rito.",
    "itemAdded": "{item} adicionado ao inventário: você pode usá-lo pelo painel do cômodo.",
    "courageFull": "Sua Coragem já está no máximo.",
    "searchTitle": "Busca n.º {n} em {room}",
    "cardinalBack": "Você recua 3 cômodos: {from} → {to}. Esta armadilha não afetará {name} novamente nesta partida.",
    "twelfthCancels": "{name} para no limiar de {room}: o décimo segundo toque cancela qualquer outro evento do turno.",
    "skullLabel": "O CRÂNIO",
    "finalWinner": "VITÓRIA DE {name}",
    "youWon": "VOCÊ VENCEU",
    "winnerSealed": "{name} selou a Cripta",
    "heroVictoryText": "Você completou o rito. O Crânio perde a sombra, o caixão se fecha e por um instante todos os cômodos do casarão se iluminam juntos. Na Cripta resta apenas um osso comum.",
    "rivalVictoryText": "{name} chegou à Cripta e completou o rito antes dos outros. O Crânio perde a forma e o jogo termina.",
    "difficultyLabel": "Dificuldade"
  }
};
  const CONTENT_I18N = window.MANIERO_CONTENT_I18N || {};

  const ROOM_LANG = {
    en: {
      vestibolo:['Vestibule','ENTRANCE','The doors close behind you.','The atrium watches every step through oil-dark eyes, dust and trembling candles.'], biblioteca:['Library','WEST WING','The books whisper when nobody is watching.','Among blackened shelves, every volume seems to guard a name that should never be spoken.'], armature:['Hall of Armour','BLACK CORRIDOR','The visors follow your every step.','Steel, banners and shadows: here the manor still remembers the sound of war.'], specchi:['Hall of Mirrors','FOURTH ROOM','Every reflection arrives a moment late.','Blackened mirrors multiply corridors that do not exist and faces belonging to none of you.'], cappella:['Broken Chapel','CHAPEL','An altar without a saint still keeps a promise.','Broken pews and coloured glass admit a moon that blesses no one.'], laboratorio:['Alchemical Laboratory','OPUS VESPER','Something in the glassware keeps distilling by itself.','Athanor, alembics and blackened metals tell of experiments the Count never entered in official records.'], serra:['Abandoned Conservatory','INNER GARDEN','The roots move when the light fades.','Vines and night flowers have invaded the floor, as if the house were trying to grow back from within.'], banchetto:['Banquet Hall','NOBLE WING','The table is set for guests dead for a century.','Dusty goblets and shifted chairs suggest someone still dines here after midnight.'], torre:['Clock Tower','TOWER','Each toll brings something closer from below.','Inside the tower’s astral circle, time bends and the bells seem to breathe.'], camera:["Count's Chamber",'VESPER APARTMENTS','The bed is remade every night by invisible hands.','Diaries, red curtains and an impossible perfume preserve the presence of Aureliano Vesper.'], galleria:['Gallery of Ancestors','GALLERY','The portraits change expression when you look away.','Generations of Vespers watch the corridor. Some frames contain people who were never born.'], catacombe:['Catacombs','UNDERGROUND','Here the walls seem to breathe.','Stone bridges and green vapours lead towards the damp, ancient heart of the manor.'], cripta:['Crypt','FINAL RITE','The coffin is open. The Skull sways on its edge.','The stone coffin awaits the three Seals. One mistake may free what it contains.']
    },
    es: {
      vestibolo:['Vestíbulo','ENTRADA','Las puertas se cierran a vuestra espalda.','El atrio observa cada paso entre aceite, polvo y velas temblorosas.'], biblioteca:['Biblioteca','ALA OESTE','Los libros susurran cuando nadie los mira.','Entre estanterías ennegrecidas, cada volumen parece guardar un nombre que no debería pronunciarse.'], armature:['Sala de Armaduras','CORREDOR NEGRO','Las viseras siguen cada uno de tus pasos.','Acero, estandartes y sombras: aquí la mansión aún recuerda el sonido de la guerra.'], specchi:['Sala de los Espejos','CUARTA SALA','Cada reflejo llega con un instante de retraso.','Espejos ennegrecidos multiplican pasillos inexistentes y rostros que no pertenecen a nadie.'], cappella:['Capilla Rota','CAPILLA','Un altar sin santo aún conserva una promesa.','Bancos rotos y vitrales dejan entrar una luna que no bendice a nadie.'], laboratorio:['Laboratorio Alquímico','OPUS VESPER','Algo sigue destilándose solo dentro del vidrio.','Athanor, alambiques y metales ennegrecidos cuentan experimentos nunca registrados por el Conde.'], serra:['Invernadero Abandonado','JARDÍN INTERIOR','Las raíces se mueven cuando la luz se aleja.','Enredaderas y flores nocturnas invaden el suelo, como si la casa intentara volver a crecer desde dentro.'], banchetto:['Salón del Banquete','ALA NOBLE','La mesa está preparada para invitados muertos hace un siglo.','Copas polvorientas y sillas movidas sugieren que alguien sigue cenando aquí después de medianoche.'], torre:['Torre del Reloj','TORRE','Cada campanada acerca algo desde el subsuelo.','En el círculo astral de la torre, el tiempo se dobla y las campanas parecen respirar.'], camera:['Cámara del Conde','APOSENTOS VESPER','La cama se hace cada noche por manos invisibles.','Diarios, cortinas rojas y un perfume imposible conservan la presencia de Aureliano Vesper.'], galleria:['Galería de los Antepasados','GALERÍA','Los retratos cambian de expresión cuando apartas la mirada.','Generaciones de Vesper observan el corredor. Algunos marcos contienen personas que nunca nacieron.'], catacombe:['Catacumbas','SUBSUELO','Aquí las paredes parecen respirar.','Puentes de piedra y vapores verdosos conducen al corazón húmedo y antiguo de la mansión.'], cripta:['Cripta','RITO FINAL','El ataúd está abierto. El Cráneo oscila en el borde.','El ataúd de piedra espera los tres Sellos. Un solo error puede liberar lo que contiene.']
    },
    fr: {
      vestibolo:['Vestibule','ENTRÉE','Les portes se ferment derrière vous.','Le hall observe chaque pas parmi l’huile, la poussière et les bougies tremblantes.'], biblioteca:['Bibliothèque','AILE OUEST','Les livres chuchotent lorsque personne ne les regarde.','Parmi les rayonnages noircis, chaque volume semble garder un nom qui ne devrait jamais être prononcé.'], armature:["Salle d’Armures",'COULOIR NOIR','Les visières suivent chacun de vos pas.','Acier, bannières et ombres : ici le manoir se souvient encore du bruit de la guerre.'], specchi:['Galerie des Miroirs','QUATRIÈME PIÈCE','Chaque reflet arrive avec un instant de retard.','Les miroirs noircis multiplient des couloirs inexistants et des visages qui n’appartiennent à personne.'], cappella:['Chapelle Brisée','CHAPELLE','Un autel sans saint garde encore une promesse.','Les bancs brisés et les vitraux laissent entrer une lune qui ne bénit personne.'], laboratorio:['Laboratoire Alchimique','OPUS VESPER','Quelque chose continue à distiller tout seul dans les verreries.','Athanor, alambics et métaux noircis racontent des expériences que le Comte n’inscrivit jamais dans ses registres.'], serra:['Serre Abandonnée','JARDIN INTÉRIEUR','Les racines bougent lorsque la lumière s’éloigne.','Lianes et fleurs nocturnes ont envahi le sol, comme si la maison tentait de repousser de l’intérieur.'], banchetto:['Salle du Banquet','AILE NOBLE','La table est dressée pour des invités morts depuis un siècle.','Coupes poussiéreuses et chaises déplacées suggèrent que quelqu’un dîne encore ici après minuit.'], torre:["Tour de l’Horloge",'TOUR','Chaque coup rapproche quelque chose du sous-sol.','Dans le cercle astral de la tour, le temps se plie et les cloches semblent respirer.'], camera:['Chambre du Comte','APPARTEMENTS VESPER','Le lit est refait chaque nuit par des mains invisibles.','Journaux, rideaux rouges et parfum impossible conservent la présence d’Aureliano Vesper.'], galleria:['Galerie des Ancêtres','GALERIE','Les portraits changent d’expression lorsque vous détournez le regard.','Des générations de Vesper observent le couloir. Certains cadres contiennent des personnes qui ne sont jamais nées.'], catacombe:['Catacombes','SOUTERRAINS','Ici les murs semblent respirer.','Ponts de pierre et vapeurs verdâtres mènent au cœur humide et ancien du manoir.'], cripta:['Crypte','RITE FINAL','Le cercueil est ouvert. Le Crâne oscille sur le bord.','Le cercueil de pierre attend les trois Sceaux. Une seule erreur peut libérer ce qu’il contient.']
    },
    pt: {
      vestibolo:['Vestíbulo','ENTRADA','As portas se fecham atrás de vocês.','O átrio observa cada passo entre óleo, poeira e velas trêmulas.'], biblioteca:['Biblioteca','ALA OESTE','Os livros sussurram quando ninguém olha.','Entre estantes enegrecidas, cada volume parece guardar um nome que jamais deveria ser pronunciado.'], armature:['Sala das Armaduras','CORREDOR NEGRO','As viseiras acompanham cada passo.','Aço, estandartes e sombras: aqui o casarão ainda se lembra do som da guerra.'], specchi:['Sala dos Espelhos','QUARTO CÔMODO','Cada reflexo chega um instante atrasado.','Espelhos enegrecidos multiplicam corredores inexistentes e rostos que não pertencem a ninguém.'], cappella:['Capela Quebrada','CAPELA','Um altar sem santo ainda guarda uma promessa.','Bancos quebrados e vitrais deixam entrar uma lua que não abençoa ninguém.'], laboratorio:['Laboratório Alquímico','OPUS VESPER','Algo continua destilando sozinho dentro dos vidros.','Athanor, alambiques e metais enegrecidos contam experiências que o Conde nunca registrou oficialmente.'], serra:['Estufa Abandonada','JARDIM INTERNO','As raízes se movem quando a luz se afasta.','Trepadeiras e flores noturnas invadiram o chão, como se a casa tentasse crescer novamente por dentro.'], banchetto:['Salão do Banquete','ALA NOBRE','A mesa está posta para convidados mortos há um século.','Taças empoeiradas e cadeiras deslocadas sugerem que alguém ainda janta aqui depois da meia-noite.'], torre:['Torre do Relógio','TORRE','Cada badalada aproxima algo do subsolo.','No círculo astral da torre, o tempo se dobra e os sinos parecem respirar.'], camera:['Quarto do Conde','APOSENTOS VESPER','A cama é arrumada toda noite por mãos invisíveis.','Diários, cortinas vermelhas e um perfume impossível preservam a presença de Aureliano Vesper.'], galleria:['Galeria dos Ancestrais','GALERIA','Os retratos mudam de expressão quando você desvia o olhar.','Gerações de Vesper observam o corredor. Algumas molduras contêm pessoas que nunca nasceram.'], catacombe:['Catacumbas','SUBSOLO','Aqui as paredes parecem respirar.','Pontes de pedra e vapores esverdeados conduzem ao coração úmido e antigo do casarão.'], cripta:['Cripta','RITO FINAL','O caixão está aberto. O Crânio oscila na borda.','O caixão de pedra espera os três Selos. Um único erro pode libertar o que está dentro.']
    }
  };

  function t(key, vars = {}) {
    const dict = {
      ...(I18N.it || {}), ...(UI_EXTRA.it || {}),
      ...(I18N[currentLanguage] || {}), ...(UI_EXTRA[currentLanguage] || {})
    };
    let value = dict[key] ?? key;
    Object.entries(vars).forEach(([k,v]) => { value = String(value).replaceAll(`{${k}}`, String(v)); });
    return value;
  }

  function localizedRoom(room, field) {
    if (currentLanguage === 'it' || !ROOM_LANG[currentLanguage]?.[room.id]) return room[field];
    const idx = {name:0,kicker:1,hint:2,flavor:3}[field];
    return ROOM_LANG[currentLanguage][room.id][idx] ?? room[field];
  }


  const ITEM_LANG = {
    en:{candle:['Consecrated candle','Creates protection that cancels the next Event or Trap.'],salt:['Blessed salt','Purifies the current room if haunted; before the awakening it creates protection instead.'],key:['Brass key','Opens a secondary passage and moves you 4 spaces without rolling.'],mirror:['Blackened mirror','Sends a rival back to the first space of their current room.'],eye:['Glass eye','Immediately reveals a new esoteric fragment in the Manor Code.'],rosary:['Broken rosary','Restores 2 Courage.'],coin:['Vesper coin','Enthralls a rival and blocks them for 2 of their turns.'],amber:['Amber vial','If blocked, frees you; otherwise restores 1 Courage.'],feather:['Black feather','A raven omen forces a rival back 4 spaces.'],bell:['Silent bell','Before awakening removes 1 toll; afterwards pushes the Skull one room toward the Crypt.'],amulet:['Iron amulet','Creates protection that remains until it cancels a danger.'],talisman:['Mercury Talisman','Charges your next numerical roll: if the die shows 1–5, movement is doubled. A Skull result does not consume the charge.']},
    es:{candle:['Vela consagrada','Crea una protección que anula el próximo Imprevisto o Trampa.'],salt:['Sal bendita','Purifica la sala actual si está infestada; antes del despertar crea protección.'],key:['Llave de latón','Abre un pasaje secundario y te hace avanzar 4 casillas sin tirar.'],mirror:['Espejo ennegrecido','Devuelve a un rival a la primera casilla de su sala actual.'],eye:['Ojo de vidrio','Revela inmediatamente un nuevo fragmento esotérico del Código.'],rosary:['Rosario roto','Recupera 2 puntos de Coraje.'],coin:['Moneda Vesper','Hechiza a un rival y lo bloquea durante 2 de sus turnos.'],amber:['Vial de ámbar','Si estás bloqueado te libera; de lo contrario recupera 1 Coraje.'],feather:['Pluma negra','Un presagio de cuervos obliga a un rival a retroceder 4 casillas.'],bell:['Campanilla muda','Antes del despertar elimina 1 campanada; después empuja al Cráneo una sala hacia la Cripta.'],amulet:['Amuleto de hierro','Crea una protección que permanece hasta anular un peligro.'],talisman:['Talismán de Mercurio','Carga tu próxima tirada numérica: si el dado muestra 1–5, el movimiento se duplica. Un resultado de Cráneo no consume la carga.']},
    fr:{candle:['Bougie consacrée','Crée une protection qui annule le prochain Imprévu ou Piège.'],salt:['Sel béni','Purifie la pièce actuelle si elle est hantée ; avant l’éveil, crée une protection.'],key:['Clé de laiton','Ouvre un passage secondaire et vous fait avancer de 4 cases sans lancer le dé.'],mirror:['Miroir noirci','Renvoie un rival à la première case de sa pièce.'],eye:['Œil de verre','Révèle immédiatement un nouveau fragment ésotérique du Code.'],rosary:['Rosaire brisé','Rend 2 points de Courage.'],coin:['Pièce Vesper','Envoûte un rival et le bloque pendant 2 de ses tours.'],amber:['Fiole d’ambre','Si vous êtes bloqué, vous libère ; sinon rend 1 Courage.'],feather:['Plume noire','Un présage de corbeaux force un rival à reculer de 4 cases.'],bell:['Clochette muette','Avant l’éveil retire 1 coup ; après, repousse le Crâne d’une pièce vers la Crypte.'],amulet:['Amulette de fer','Crée une protection qui reste active jusqu’à annuler un danger.'],talisman:['Talisman de Mercure','Charge votre prochain lancer numérique : si le dé indique 1–5, le déplacement est doublé. Un résultat Crâne ne consomme pas la charge.']},
    pt:{candle:['Vela consagrada','Cria uma proteção que anula o próximo Imprevisto ou Armadilha.'],salt:['Sal abençoado','Purifica o cômodo atual se estiver assombrado; antes do despertar cria proteção.'],key:['Chave de latão','Abre uma passagem secundária e avança 4 casas sem rolar o dado.'],mirror:['Espelho enegrecido','Manda um rival de volta à primeira casa do cômodo atual.'],eye:['Olho de vidro','Revela imediatamente um novo fragmento esotérico do Código.'],rosary:['Rosário quebrado','Recupera 2 pontos de Coragem.'],coin:['Moeda Vesper','Enfeitiça um rival e o bloqueia por 2 turnos dele.'],amber:['Frasco de âmbar','Se estiver bloqueado, liberta você; caso contrário recupera 1 Coragem.'],feather:['Pena negra','Um presságio de corvos força um rival a recuar 4 casas.'],bell:['Sino mudo','Antes do despertar remove 1 badalada; depois empurra o Crânio um cômodo em direção à Cripta.'],amulet:['Amuleto de ferro','Cria uma proteção que permanece até anular um perigo.'],talisman:['Talismã de Mercúrio','Carrega sua próxima rolagem numérica: se o dado mostrar 1–5, o movimento é dobrado. Um resultado de Crânio não consome a carga.']}
  };
  function localizedItem(id, field) {
    const base=itemDefs[id]; if(!base) return '';
    if(currentLanguage==='it' || !ITEM_LANG[currentLanguage]?.[id]) return base[field];
    return ITEM_LANG[currentLanguage][id][field==='name'?0:1] ?? base[field];
  }
  function localizedTileName(tile) {
    if (!tile) return '';
    const key = tile.type==='safe'?'tileSafe':tile.type==='clue'?'tileClue':tile.type==='relic'?'tileRelic':tile.type==='door'?'tileDoor':tile.type==='cardinal'?'tileCardinal':'tileCrypt';
    return t(key);
  }

  const sealDefs = {
    raven: { icon: '🪶', name: 'Corvo' },
    moon: { icon: '🌙', name: 'Luna' },
    thorn: { icon: '🌿', name: 'Spina' }
  };
  const correctSealSequence = ['raven', 'moon', 'thorn'];

  const portraits = {
    male: 'assets/portraits/hero-male.jpg',
    female: 'assets/portraits/hero-female.jpg',
    elena: 'assets/portraits/elena.jpg',
    bianchi: 'assets/portraits/bianchi.jpg',
    marco: 'assets/portraits/marco.jpg'
  };

  const rooms = [
    { id: 'vestibolo', start: 0, end: 9, name: 'Vestibolo', kicker: 'INGRESSO', img: 'assets/rooms/vestibolo.jpg', hint: 'Le porte si chiudono alle vostre spalle.', flavor: 'L’atrio osserva ogni passo con occhi di olio, polvere e candele tremanti.' },
    { id: 'biblioteca', start: 10, end: 19, name: 'Biblioteca', kicker: 'ALA OVEST', img: 'assets/rooms/biblioteca.jpg', hint: 'I libri sussurrano quando nessuno li guarda.', flavor: 'Tra le scaffalature annerite, ogni volume sembra custodire un nome che non dovrebbe essere pronunciato.' },
    { id: 'armature', start: 20, end: 29, name: 'Sala delle Armature', kicker: 'CORRIDOIO NERO', img: 'assets/rooms/armature.jpg', hint: 'Le visiere seguono ogni vostro passo.', flavor: 'Acciaio, stendardi e ombre: qui il maniero ricorda ancora il suono della guerra.' },
    { id: 'specchi', start: 30, end: 39, name: 'Sala degli Specchi', kicker: 'QUARTA STANZA', img: 'assets/rooms/specchi.jpg', hint: 'Ogni riflesso arriva con un istante di ritardo.', flavor: 'Specchi anneriti moltiplicano corridoi che non esistono e volti che non appartengono a nessuno dei presenti.' },
    { id: 'cappella', start: 40, end: 49, name: 'Cappella Spezzata', kicker: 'CAPPELLA', img: 'assets/rooms/cappella.jpg', hint: 'Un altare senza santo conserva ancora una promessa.', flavor: 'Le panche spezzate e i vetri colorati lasciano entrare una luna che non benedice nessuno.' },
    { id: 'laboratorio', start: 50, end: 59, name: 'Laboratorio Alchemico', kicker: 'OPUS VESPER', img: 'assets/rooms/laboratorio.jpg', hint: 'Nei vetri qualcosa continua a distillare da solo.', flavor: 'Athanor, alambicchi e metalli anneriti raccontano esperimenti che il Conte non annotò mai nei registri ufficiali.' },
    { id: 'serra', start: 60, end: 69, name: 'Serra Abbandonata', kicker: 'GIARDINO INTERNO', img: 'assets/rooms/serra.jpg', hint: 'Le radici si muovono quando la luce si allontana.', flavor: 'Rampicanti e fiori notturni hanno invaso il pavimento, come se la casa cercasse di ricrescere dall’interno.' },
    { id: 'banchetto', start: 70, end: 79, name: 'Sala del Banchetto', kicker: 'ALA NOBILE', img: 'assets/rooms/banchetto.jpg', hint: 'La tavola è apparecchiata per ospiti morti da un secolo.', flavor: 'Calici impolverati e sedie spostate suggeriscono che qualcuno continui a cenare qui dopo la mezzanotte.' },
    { id: 'torre', start: 80, end: 89, name: 'Torre dell’Orologio', kicker: 'TORRE', img: 'assets/rooms/torre.jpg', hint: 'Ogni rintocco avvicina qualcosa dal sottosuolo.', flavor: 'Nel cerchio astrale della torre, il tempo si piega e le campane sembrano respirare.' },
    { id: 'camera', start: 90, end: 99, name: 'Camera del Conte', kicker: 'APPARTAMENTI VESPER', img: 'assets/rooms/camera.jpg', hint: 'Il letto è rifatto ogni notte da mani invisibili.', flavor: 'Diari, tende rosse e un profumo ormai impossibile conservano la presenza di Aureliano Vesper.' },
    { id: 'galleria', start: 100, end: 109, name: 'Galleria degli Antenati', kicker: 'GALLERIA', img: 'assets/rooms/galleria.jpg', hint: 'I ritratti cambiano espressione quando distogli lo sguardo.', flavor: 'Generazioni di Vesper osservano il corridoio. Alcune cornici contengono persone che non risultano mai nate.' },
    { id: 'catacombe', start: 110, end: 119, name: 'Catacombe', kicker: 'SOTTERRANEI', img: 'assets/rooms/catacombe.jpg', hint: 'Qui le pareti sembrano respirare.', flavor: 'Ponti di pietra e vapori verdastri guidano verso il cuore umido e antico del maniero.' },
    { id: 'cripta', start: 120, end: 120, name: 'Cripta', kicker: 'RITO FINALE', img: 'assets/rooms/cripta.jpg', hint: 'La bara è aperta. Il Teschio oscilla sul bordo.', flavor: 'La bara di pietra aspetta i tre Sigilli. Un solo errore può liberare ciò che contiene.' }
  ];

  const tiles = Array.from({ length: LAST_TILE + 1 }, (_, id) => ({ id, type: 'safe', icon: '🕯️', name: 'Passaggio' }));
  const setTiles = (ids, type, icon, name) => ids.forEach(id => Object.assign(tiles[id], { type, icon, name }));
  setTiles([11, 23, 43, 53, 63, 73, 93, 103, 113], 'clue', '📜', 'Indizio');
  setTiles([16, 27, 47, 57, 67, 77, 97, 107, 117], 'relic', '🔮', 'Reliquia');
  setTiles([9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 109, 119], 'door', '🚪', 'Soglia');
  setTiles([55, 85, 115], 'cardinal', '💀', 'Trappola Cardinale');
  setTiles([120], 'crypt', '⚰️', 'Cripta');

  const cardinalTraps = {
    55: { id: 'athanor_return', title: 'L’Athanor Inverso', roomId: 'laboratorio', text: 'Il cerchio alchemico sotto il forno si rovescia come un ingranaggio. Il laboratorio ti espelle tre stanze indietro.' },
    85: { id: 'lost_minutes', title: 'La Scala dei Minuti Perduti', roomId: 'torre', text: 'La scala ruota su se stessa. Quando il meccanismo si ferma, hai perduto tre stanze di cammino.' },
    115: { id: 'bone_corridor', title: 'Il Corridoio delle Ossa', roomId: 'catacombe', text: 'Le mura si chiudono e il passaggio cambia forma. Le ossa ti espellono tre stanze indietro.' }
  };

  const CARDINAL_TRAPS_BY_DIFFICULTY = {
    easy: [85],
    medium: [55, 85],
    hard: [55, 85, 115]
  };

  function isCardinalTrapActive(tileId) {
    const difficulty = state?.difficulty || selectedDifficulty || 'hard';
    return (CARDINAL_TRAPS_BY_DIFFICULTY[difficulty] || CARDINAL_TRAPS_BY_DIFFICULTY.hard).includes(Number(tileId));
  }

  function effectiveTileForDifficulty(tile) {
    if (!tile || tile.type !== 'cardinal' || isCardinalTrapActive(tile.id)) return tile;
    return { ...tile, type: 'safe', icon: '🕯️', name: 'Passaggio' };
  }

  const botTemplates = [
    { id: 'elena', name: 'Elena', role: 'Rivale · Esploratrice', avatar: portraits.elena },
    { id: 'bianchi', name: 'Prof. Bianchi', role: 'Rivale · Occultista', avatar: portraits.bianchi },
    { id: 'marco', name: 'Marco', role: 'Rivale · Cercatore', avatar: portraits.marco }
  ];

  // Ogni stanza ha un percorso disegnato manualmente sulle sole zone realmente percorribili
  // dell'illustrazione: pavimenti, tappeti, scale e ponti. Le coordinate sono percentuali.
  const roomFootprintPaths = {
    vestibolo: [{x:64,y:89,r:-18},{x:59,y:81,r:-30},{x:54,y:73,r:-22},{x:47,y:70,r:-5},{x:41,y:63,r:8},{x:48,y:57,r:15},{x:58,y:55,r:4},{x:67,y:58,r:-12},{x:73,y:50,r:-25},{x:66,y:43,r:-15},{x:56,y:39,r:-5},{x:47,y:35,r:6}],
    biblioteca: [{x:83,y:84,r:-25},{x:75,y:78,r:-20},{x:67,y:73,r:-8},{x:74,y:67,r:10},{x:82,y:59,r:-5},{x:74,y:51,r:-18},{x:64,y:47,r:-5},{x:56,y:54,r:18},{x:46,y:59,r:10},{x:38,y:52,r:-15},{x:47,y:44,r:-5},{x:58,y:37,r:8}],
    armature: [{x:52,y:86,r:0},{x:51,y:80,r:0},{x:50,y:72,r:0},{x:50,y:64,r:0},{x:43,y:59,r:-20},{x:35,y:55,r:-12},{x:28,y:48,r:-15},{x:35,y:42,r:20},{x:44,y:45,r:10},{x:53,y:42,r:-8},{x:61,y:34,r:-25},{x:67,y:25,r:-20}],
    specchi: [{x:70,y:84,r:0},{x:61,y:76,r:0},{x:51,y:70,r:0},{x:40,y:73,r:0},{x:31,y:65,r:0},{x:39,y:58,r:0},{x:50,y:54,r:0},{x:61,y:57,r:0},{x:69,y:48,r:0},{x:59,y:41,r:0}],
    cappella: [{x:77,y:86,r:-20},{x:70,y:79,r:-18},{x:62,y:72,r:-12},{x:55,y:65,r:-5},{x:47,y:60,r:10},{x:39,y:66,r:20},{x:31,y:60,r:-15},{x:36,y:52,r:-25},{x:46,y:46,r:-10},{x:56,y:48,r:10},{x:66,y:42,r:-8},{x:76,y:36,r:-15}],
    laboratorio: [{x:83,y:84,r:0},{x:73,y:77,r:0},{x:62,y:71,r:0},{x:51,y:75,r:0},{x:40,y:68,r:0},{x:31,y:61,r:0},{x:39,y:54,r:0},{x:50,y:49,r:0},{x:60,y:43,r:0},{x:70,y:36,r:0}],
    serra: [{x:67,y:86,r:0},{x:59,y:79,r:0},{x:49,y:72,r:0},{x:40,y:66,r:0},{x:48,y:59,r:0},{x:59,y:55,r:0},{x:69,y:58,r:0},{x:76,y:50,r:0},{x:66,y:43,r:0},{x:56,y:37,r:0}],
    banchetto: [{x:82,y:83,r:0},{x:74,y:74,r:0},{x:72,y:63,r:0},{x:76,y:53,r:0},{x:70,y:44,r:0},{x:59,y:39,r:0},{x:47,y:41,r:0},{x:37,y:48,r:0},{x:31,y:58,r:0},{x:36,y:68,r:0}],
    torre: [{x:69,y:88,r:-20},{x:63,y:80,r:-25},{x:54,y:75,r:-10},{x:44,y:78,r:15},{x:35,y:72,r:25},{x:29,y:63,r:20},{x:36,y:56,r:-20},{x:46,y:60,r:-5},{x:56,y:56,r:15},{x:66,y:50,r:20},{x:61,y:40,r:-20},{x:51,y:35,r:-5}],
    camera: [{x:80,y:84,r:0},{x:70,y:77,r:0},{x:60,y:72,r:0},{x:50,y:77,r:0},{x:41,y:69,r:0},{x:49,y:61,r:0},{x:60,y:56,r:0},{x:69,y:49,r:0},{x:60,y:42,r:0},{x:50,y:36,r:0}],
    galleria: [{x:71,y:84,r:0},{x:61,y:77,r:0},{x:51,y:71,r:0},{x:41,y:65,r:0},{x:49,y:58,r:0},{x:60,y:55,r:0},{x:70,y:58,r:0},{x:76,y:49,r:0},{x:67,y:42,r:0},{x:57,y:36,r:0}],
    catacombe: [{x:13,y:13,r:25},{x:18,y:22,r:25},{x:25,y:31,r:5},{x:35,y:33,r:0},{x:45,y:32,r:0},{x:55,y:35,r:10},{x:65,y:31,r:-5},{x:75,y:31,r:0},{x:83,y:37,r:20},{x:77,y:45,r:25},{x:69,y:52,r:10},{x:64,y:61,r:20}],
    cripta: [{x:48,y:89,r:-15},{x:43,y:82,r:-10},{x:36,y:75,r:-5},{x:28,y:69,r:-12},{x:22,y:61,r:-18},{x:28,y:53,r:15},{x:34,y:45,r:20},{x:46,y:39,r:5},{x:58,y:42,r:-10},{x:69,y:48,r:-18},{x:72,y:59,r:20},{x:65,y:68,r:12}]
  };

  const dieFaces = [
    { kind: 'move', value: 1, icon: '1', label: 'Avanza di 1' },
    { kind: 'move', value: 2, icon: '2', label: 'Avanza di 2' },
    { kind: 'move', value: 3, icon: '3', label: 'Avanza di 3' },
    { kind: 'move', value: 4, icon: '4', label: 'Avanza di 4' },
    { kind: 'move', value: 5, icon: '5', label: 'Avanza di 5' },
    { kind: 'mystery', value: 6, icon: '☠', label: '☠ · Il maniero decide…' }
  ];


  const itemDefs = {
    candle: { icon: '🕯️', name: 'Candela consacrata', target: 'self', effect: 'Crea una protezione che annulla il prossimo Imprevisto o la prossima Trappola.' },
    salt: { icon: '🧂', name: 'Sale benedetto', target: 'self', effect: 'Purifica la stanza corrente se è infestata; prima del risveglio crea invece una protezione.' },
    key: { icon: '🗝️', name: 'Chiave di ottone', target: 'self', effect: 'Apre un passaggio secondario e ti fa avanzare di 4 caselle senza tirare il dado.' },
    mirror: { icon: '🪞', name: 'Specchio annerito', target: 'rival', effect: 'Rimanda un rivale alla prima casella della stanza in cui si trova.' },
    eye: { icon: '🧿', name: 'Occhio di vetro', target: 'self', effect: 'Rivela immediatamente un nuovo frammento esoterico nel Codice del maniero.' },
    rosary: { icon: '📿', name: 'Rosario spezzato', target: 'self', effect: 'Recupera 2 punti Coraggio.' },
    coin: { icon: '🪙', name: 'Moneta Vesper', target: 'rival', effect: 'Ammalia un rivale e lo blocca per 2 suoi turni.' },
    amber: { icon: '🧪', name: 'Fiala d’ambra', target: 'self', effect: 'Se sei bloccato ti libera; altrimenti recupera 1 punto Coraggio.' },
    feather: { icon: '🪶', name: 'Piuma nera', target: 'rival', effect: 'Un presagio di corvi costringe un rivale ad arretrare di 4 caselle.' },
    bell: { icon: '🔔', name: 'Campanella muta', target: 'self', effect: 'Prima del risveglio annulla 1 rintocco; dopo il risveglio respinge il Teschio di una stanza verso la Cripta.' },
    amulet: { icon: '🪬', name: 'Amuleto di ferro', target: 'self', effect: 'Crea una protezione che resta attiva finché non annulla un pericolo.' },
    talisman: { icon: '☿', name: 'Talismano di Mercurio', target: 'self', effect: 'Carica il prossimo tiro numerico: se il dado mostra 1–5, i passi vengono raddoppiati. Un risultato ☠ non consuma la carica.' }
  };

  const unforeseenEvents = [
    { title: 'Il corridoio delle luci', text: 'Una fila di candele si accende una dopo l’altra e rivela per pochi secondi un passaggio sicuro. Quando l’ultima fiamma si accende, sei già davanti alla soglia successiva.', advanceToRoomEnd: true, positive: true },
    { title: 'La porta senza maniglia', text: 'La porta alle tue spalle si chiude e la maniglia scompare nel legno. Per qualche istante non esiste alcuna uscita.', block: true, status: 'Porta sigillata' },
    { title: 'Il ritratto ti riconosce', text: 'Gli occhi di un antenato dipinto seguono il tuo movimento. Quando ti fermi, il suo volto ha assunto i tuoi lineamenti.', block: true, status: 'Paura paralizzante' },
    { title: 'Passi al piano superiore', text: 'Passi pesanti corrono sopra di te, poi si fermano esattamente sulla tua testa. Nessuno dei tuoi compagni è lassù.', doom: 1 },
    { title: 'La lanterna si spegne', text: 'Una folata gelida spegne la luce. Nel buio senti qualcuno respirare a pochi centimetri dal tuo viso.', block: true, status: 'Buio assoluto' },
    { title: 'Lo specchio ritarda', text: 'La tua immagine nello specchio continua a camminare dopo che ti sei fermato. Poi si volta e ti guarda.', block: true, status: 'Sguardo dello specchio' },
    { title: 'Il pavimento sussurra', text: 'Da sotto le assi arrivano decine di voci che pronunciano il tuo nome tutte insieme.', doom: 1 },
    { title: 'Una risata nella parete', text: 'Una risata infantile corre dentro il muro e termina con tre colpi secchi dietro la tua schiena.' },
    { title: 'I corvi alle finestre', text: 'Uno stormo di corvi colpisce i vetri contemporaneamente. Ti copri il volto e perdi l’orientamento.', block: true, status: 'Disorientato' },
    { title: 'La stanza si allunga', text: 'Il corridoio sembra diventare infinito. Le porte si allontanano a ogni passo.', moveBack: 1 },
    { title: 'Il campanello del domestico', text: 'Un vecchio campanello di servizio suona da solo. Poco dopo qualcuno bussa dall’interno del muro.', doom: 1 },
    { title: 'Il nome sul registro', text: 'In un registro polveroso trovi il tuo nome scritto con una data di morte: stanotte.' },
    { title: 'La sedia che dondola', text: 'Una sedia vuota comincia a dondolare. Quando provi a passare, si ferma di colpo davanti a te.', block: true, status: 'Passaggio ostruito' },
    { title: 'Nebbia dal pavimento', text: 'Una nebbia bianca sale dalle fessure e cancella ogni riferimento della stanza.', block: true, status: 'Perso nella nebbia' },
    { title: 'La voce di un compagno', text: 'Senti un compagno chiamarti da una stanza lontana, ma lo vedi chiaramente altrove.', doom: 1 },
    { title: 'Il libro che urla', text: 'Un libro cade da solo, si apre e libera un urlo umano. Ti sfugge la lanterna dalle mani.', damage: 1 },
    { title: 'Le campane al contrario', text: 'Per alcuni secondi le campane suonano al contrario. Il tempo sembra scorrere nella direzione sbagliata.', moveBack: 1 },
    { title: 'Il bambino in fondo al corridoio', text: 'Una piccola figura ti fa cenno di seguirla. Quando lampeggia la luce, è sparita.', block: true, status: 'Ipnotizzato' },
    { title: 'Il vento dietro la nuca', text: 'Un soffio gelido ti sfiora la nuca. Ti volti: le tende sono immobili.' },
    { title: 'La chiave cade nel buio', text: 'Una chiave antica cade da una mensola e rotola sotto un mobile. Cercarla ti fa perdere tempo.', block: true, status: 'Distratto dalla ricerca' },
    { title: 'Le candele diventano blu', text: 'Tutte le fiamme della stanza diventano blu e puntano nella tua direzione.', doom: 1 },
    { title: 'Una mano sul vetro', text: 'Dall’esterno, al piano più alto, una mano lascia lentamente cinque dita sul vetro.' },
    { title: 'L’orologio senza lancette', text: 'Un orologio privo di lancette batte dodici colpi. Il suono ti toglie il fiato.', damage: 1 },
    { title: 'La porta respira', text: 'Il legno della porta si gonfia e si sgonfia come un torace. Non riesci a toccarla.', block: true, status: 'Porta vivente' },
    { title: 'Le ombre cambiano padrone', text: 'La tua ombra si stacca dai piedi e per qualche secondo segue un altro esploratore.', doom: 1 },
    { title: 'Il pianoforte suona da solo', text: 'Dal piano inferiore parte una melodia lenta. Ogni nota sembra avvicinarsi.' },
    { title: 'La fotografia nuova', text: 'Tra vecchie fotografie ne trovi una scattata pochi minuti fa: siete tutti nella stanza, tranne te.', block: true, status: 'Panico' },
    { title: 'Sangue sotto la porta', text: 'Un rivolo scuro passa sotto una porta chiusa. Quando la apri, dietro non c’è alcuna stanza.', doom: 1 },
    { title: 'Il soffitto scricchiola', text: 'Qualcosa di molto pesante trascina le unghie sopra il soffitto. Rimani immobile ad ascoltare.', block: true, status: 'In ascolto' },
    { title: 'La statua cambia posizione', text: 'La statua che avevi appena superato ora ti precede di alcuni metri.' },
    { title: 'Il tuo riflesso sorride', text: 'Passando davanti a un vetro, il tuo riflesso sorride. Tu no.', damage: 1 },
    { title: 'Il corridoio torna indietro', text: 'Attraversi una porta e ti ritrovi inspiegabilmente qualche passo più indietro.', moveBack: 2 },
    { title: 'Il respiro nella bara', text: 'Da qualche parte sotto il pavimento senti un lungo respiro provenire dalla Cripta.', doom: 1 },
    { title: 'Le impronte bagnate', text: 'Impronte bagnate compaiono una dopo l’altra e si fermano davanti ai tuoi piedi.', block: true, status: 'Terrore immobile' },
    { title: 'Una voce dalla tua bocca', text: 'Per un istante senti la tua voce pronunciare una frase che non hai detto.', doom: 1 },
    { title: 'Il lampo rivela qualcuno', text: 'Un lampo illumina la stanza: per un fotogramma c’è una quinta persona con voi.' },
    { title: 'Il corrimano ti afferra', text: 'Le decorazioni di ferro sembrano stringerti il polso. Riesci a liberarti, ma il dolore resta.', damage: 1 }
  ];

  const traps = [
    { title: 'Lampadario in caduta', text: 'La catena del lampadario si spezza. Il ferro precipita esattamente sul tuo percorso.', damage: 1, block: true, status: 'Sotto le macerie' },
    { title: 'Scala che crolla', text: 'Tre gradini cedono insieme e ti ritrovi incastrato tra legno e pietra.', damage: 1, block: true, status: 'Incastrato nella scala' },
    { title: 'Fossa sotto il tappeto', text: 'Il tappeto nasconde una botola. Cadi su un piano inferiore e la botola si richiude sopra di te.', damage: 1, block: true, status: 'Intrappolato nella fossa' },
    { title: 'Armatura a scatto', text: 'Una vecchia armatura ruota di colpo e cala l’alabarda sul passaggio.', damage: 1 },
    { title: 'Parete di spuntoni', text: 'Una parete laterale scatta verso di te. Ti salvi all’ultimo, ma resti bloccato tra due pannelli.', block: true, status: 'Tra le pareti mobili' },
    { title: 'Gargoyle dal cornicione', text: 'Una gargoyle di pietra si stacca dall’alto e si frantuma a pochi centimetri da te.', damage: 1, doom: 1 },
    { title: 'Pavimento a lame', text: 'Lame arrugginite escono dalle fughe delle pietre. Un passo sbagliato sarebbe fatale.', damage: 1, block: true, status: 'Circondato dalle lame' },
    { title: 'Gabbia di ferro', text: 'Una gabbia scende dal soffitto e ti chiude dentro prima che tu possa reagire.', block: true, status: 'Prigioniero nella gabbia' },
    { title: 'Catena al piede', text: 'Una catena scatta da una nicchia e si avvolge alla caviglia.', block: true, status: 'Incatenato' },
    { title: 'Soffitto che cede', text: 'Calcinacci e pietre cadono dall’alto. Una trave ti colpisce alla spalla.', damage: 1 },
    { title: 'Porta tagliola', text: 'Una saracinesca dentata cade tra te e l’uscita. Il suo bordo ti sfiora violentemente.', damage: 1, block: true, status: 'Chiuso dalla saracinesca' },
    { title: 'Pozzo nascosto', text: 'Una lastra ruota sotto il peso. Riesci ad aggrapparti al bordo del pozzo, ma non puoi risalire.', block: true, status: 'Appeso al pozzo' },
    { title: 'Dardi dalla parete', text: 'Una piastrella si abbassa e una raffica di piccoli dardi attraversa la stanza.', damage: 1 },
    { title: 'Candelabro incendiato', text: 'L’olio di un candelabro si rovescia e una lingua di fuoco taglia il percorso.', block: true, status: 'Circondato dal fuoco' },
    { title: 'Gas dalla cripta', text: 'Un odore dolciastro sale da una grata. Le gambe diventano pesanti e la vista si appanna.', damage: 1, block: true, status: 'Intossicato' },
    { title: 'Statua che precipita', text: 'Il piedistallo cede e una statua cade di traverso, schiacciando il passaggio.', block: true, status: 'Passaggio schiacciato' },
    { title: 'Ponte spezzato', text: 'Una lastra del ponte si spezza e rimani aggrappato al bordo sopra il vuoto.', block: true, status: 'Appeso nel vuoto' },
    { title: 'Ruota dentata', text: 'Un antico meccanismo si riattiva e una grande ruota dentata attraversa il pavimento.', damage: 1 },
    { title: 'Pietra oscillante', text: 'Una pesante pietra appesa a una catena attraversa il corridoio come un pendolo.', damage: 1, moveBack: 1 },
    { title: 'Biblioteca che crolla', text: 'Un’intera scaffalatura si rovescia. Centinaia di libri e legno ti travolgono.', damage: 1, block: true, status: 'Sepolto dai libri' },
    { title: 'Panca a molla', text: 'Una vecchia panca scatta contro le ginocchia e ti fa cadere pesantemente.', damage: 1 },
    { title: 'Vetrata esplosa', text: 'Una vetrata esplode verso l’interno come colpita da una forza invisibile.', damage: 1, doom: 1 },
    { title: 'Botola a contrappeso', text: 'Il pavimento scompare e una corda ti trascina verso l’alto, lasciandoti sospeso.', block: true, status: 'Sospeso nel vuoto' },
    { title: 'Muro che si chiude', text: 'Due pareti cominciano ad avvicinarsi. Riesci a trovare una nicchia, ma resti intrappolato.', block: true, status: 'Chiuso nella nicchia' },
    { title: 'Croce di ferro', text: 'Una grande croce decorativa si stacca dalla parete e ti colpisce al fianco.', damage: 1 },
    { title: 'Caduta nella cisterna', text: 'Una grata cede. Precipiti nell’acqua gelida di una vecchia cisterna e non trovi subito l’uscita.', damage: 1, block: true, status: 'Nella cisterna' },
    { title: 'Spine nella pietra', text: 'Le decorazioni della parete si aprono come artigli e ti stringono il braccio.', damage: 1, block: true, status: 'Preso dalle spine' },
    { title: 'Trave del campanile', text: 'Una trave marcia si spezza sopra di te. L’impatto è violentissimo.', damage: 2 },
    { title: 'Crollo delle catacombe', text: 'Una volta cede e un’ondata di pietre invade il corridoio. Resti sepolto fino alla vita.', damage: 1, block: true, status: 'Sepolto nelle catacombe', doom: 1 },
    { title: 'Bara a scatto', text: 'Il coperchio di una bara laterale si apre e un braccio scheletrico ti afferra la veste.', block: true, status: 'Afferrato dalla bara' },
    { title: 'Filo quasi invisibile', text: 'Un filo teso all’altezza del collo aziona un meccanismo nascosto. Ti abbassi appena in tempo.', moveBack: 1 },
    { title: 'Pavimento inclinato', text: 'Le lastre si inclinano e scivoli verso un’apertura nera. Ti aggrappi a una colonna.', block: true, status: 'Aggrappato alla colonna' },
    { title: 'Il corridoio di Vesper', text: 'Le pareti ruotano come un enorme meccanismo. Quando tutto si ferma sei di nuovo all’ingresso della stanza.', returnRoomStart: true },
    { title: 'Scala impossibile', text: 'Sali quattro gradini, ma il pianerottolo si piega su se stesso e ti deposita esattamente all’inizio della stanza.', returnRoomStart: true },
    { title: 'Porta del ritorno', text: 'Apri una porta convinto di proseguire. Dall’altra parte ritrovi la soglia da cui eri entrato nella stanza.', returnRoomStart: true },
    { title: 'Tappeto trascinato', text: 'Il grande tappeto viene risucchiato all’indietro da un contrappeso e ti trascina fino alla prima casella della stanza.', returnRoomStart: true }
  ];

  const loreClues = [
    { id:'sol_niger', symbol:'☉●', title:'Sol Niger', latin:'SOL NIGER ORITUR IN SILENTIO', text:'“Quando il Sole diventa nero, la casa non proietta più ombre: sono le ombre a proiettare la casa.”', explanation:"Il «Sole Nero» compare in alcuni testi e immagini alchemiche come simbolo della fase oscura dell’opera, vicina alla nigredo. Non esiste però un significato unico: in genere richiama oscuramento, dissoluzione e trasformazione prima di una nuova luce." },
    { id:'vitriol', symbol:'▽☿△', title:'V.I.T.R.I.O.L.', latin:'VISITA INTERIORA TERRAE, RECTIFICANDO INVENIES OCCULTUM LAPIDEM', text:'“Scendi nella terra interiore. Rettifica ciò che trovi. La pietra nascosta non è sotto il maniero: è sotto il tuo nome.”', explanation:"V.I.T.R.I.O.L. è un celebre acronimo della tradizione ermetico-alchemica: «Visita Interiora Terrae, Rectificando Invenies Occultum Lapidem». Può essere letto sia come invito al lavoro sulla materia sia, in senso simbolico, come discesa interiore e trasformazione di sé." },
    { id:'nigredo', symbol:'●♄', title:'Nigredo', latin:'PUTREFACTIO ANTE LUCEM', text:'“Ogni opera comincia dal nero. Ogni porta del maniero ricorda una morte che non è ancora avvenuta.”', explanation:"La nigredo, o «annerimento», è una delle fasi più note della simbologia alchemica occidentale. Indica decomposizione, putrefazione o dissoluzione della materia, spesso considerata necessaria prima delle successive fasi di purificazione." },
    { id:'albedo', symbol:'○☽', title:'Albedo', latin:'LUNA LAVAT OSSA', text:'“La Luna lava le ossa, ma non cancella ciò che le ossa hanno visto.”', explanation:"L’albedo, o «sbiancamento», rappresenta simbolicamente una fase di purificazione successiva alla nigredo. Nella letteratura alchemica è spesso associata alla Luna, all’acqua, alla chiarificazione e al ritorno della luce dopo la fase nera." },
    { id:'rubedo', symbol:'☉✶', title:'Rubedo', latin:'RUBER FINIS, RUBER INITIUM', text:'“Il rosso è la fine della trasformazione. Nel sangue di Vesper, invece, fu soltanto l’inizio.”', explanation:"La rubedo, o «arrossamento», è frequentemente descritta come la fase conclusiva dell’opera alchemica. Il rosso è collegato al compimento, alla fissazione e, in molte interpretazioni simboliche, all’unione stabile degli opposti." },
    { id:'solve', symbol:'△↯▽', title:'Solve et Coagula', latin:'SOLVE · COAGULA', text:'“Sciogli ciò che è unito. Unisci ciò che è stato spezzato. La bara obbedisce alla stessa legge della carne.”', explanation:"«Solve et coagula» significa «sciogli e coagula». Riassume due operazioni fondamentali dell’immaginario alchemico: separare o dissolvere una materia e poi ricomporla in una forma nuova e più stabile." },
    { id:'mercurius', symbol:'☿', title:'Mercurius Duplex', latin:'UNUS EST DUO', text:'“Mercurio ha due volti e nessuno dei due mente. Il Conte ne possedeva tre.”', explanation:"Il Mercurio alchemico non coincide semplicemente con il metallo liquido: è anche un principio simbolico mobile, volatile e mediatore. In molti testi rappresenta una sostanza capace di unire qualità opposte, motivo per cui viene spesso descritto come duplice o ambiguo." },
    { id:'saturnus', symbol:'♄', title:'Sigillo di Saturno', latin:'TEMPUS DEVORAT FILIOS SUOS', text:'“Saturno divora i figli. L’orologio del maniero divora invece i minuti che nessuno ricorda.”', explanation:"Nelle corrispondenze astrologico-alchemiche Saturno è tradizionalmente associato al piombo, alla lentezza, alla vecchiaia e alla malinconia. Il legame con il tempo deriva anche dall’identificazione rinascimentale tra Saturno e il dio Crono." },
    { id:'luna', symbol:'☽', title:'Vaso Lunare', latin:'SUB LUNA NIHIL TACET', text:'“Sotto la Luna nulla tace. Anche le tombe parlano, se la notte è abbastanza lunga.”', explanation:"Nella simbologia alchemica la Luna è comunemente associata all’argento e al principio ricettivo, freddo e umido. È spesso accostata al Sole in immagini di coniunctio, cioè di unione tra polarità complementari." },
    { id:'sulfur_dead', symbol:'△☉', title:'Zolfo dei Morti', latin:'SULPHUR ANIMAE', text:'“Il fuoco dell’anima non riscalda. Brucia soltanto i nomi lasciati sulle porte.”', explanation:"Nell’alchimia paracelsiana lo Zolfo è uno dei tre principi fondamentali insieme a Mercurio e Sale. Simbolicamente tende a rappresentare il principio attivo, combustibile, caldo e individualizzante della materia." },
    { id:'salt', symbol:'□✚', title:'Sale Filosofico', latin:'SAL MEMORIAE', text:'“Il Sale conserva la carne. Questo conserva i ricordi, anche quelli che il proprietario ha implorato di perdere.”', explanation:"Il Sale è il terzo principio della triade paracelsiana Mercurio-Zolfo-Sale. In senso simbolico viene collegato alla stabilità, alla corporeità e alla parte fissa della materia, in contrasto con la volatilità del Mercurio." },
    { id:'ouroboros', symbol:'◯↻', title:'Ouroboros', latin:'FINIS EST PRINCIPIUM', text:'“La coda entra nella bocca e il principio diventa fine. Chi torna all’inizio della stanza non è mai la stessa persona.”', explanation:"L’Ouroboros è il serpente che si morde la coda, simbolo molto antico di ciclicità e autorinnovamento. Fu adottato anche nell’iconografia alchemica per esprimere l’unità della materia e il processo che torna continuamente su se stesso." },
    { id:'athanor', symbol:'△│△', title:'Athanor', latin:'IGNIS NON DORMIT', text:'“La fornace deve ardere senza interruzione. Nel maniero arde ancora, ma nessuno sa cosa stia cuocendo.”', explanation:"L’athanor è una fornace alchemica progettata per mantenere un calore regolare e prolungato. Era particolarmente utile nei procedimenti che richiedevano riscaldamento continuo per molte ore o giorni." },
    { id:'prima_materia', symbol:'○·', title:'Prima Materia', latin:'MATERIA SINE NOMINE', text:'“Prima del Corvo, della Luna e della Spina esisteva una materia senza nome. Il Teschio la ricorda.”', explanation:"La «prima materia» è un concetto teorico dell’alchimia: la sostanza originaria e indifferenziata dalla quale l’opera dovrebbe partire. Gli autori non concordavano sulla sua natura concreta, e spesso la descrivevano volutamente con linguaggio enigmatico." },
    { id:'coniunctio', symbol:'☉☽', title:'Coniunctio', latin:'SOL ET LUNA IN UNO', text:'“Sole e Luna si congiungono una sola volta. Quella notte, nel 1888, morì una stanza intera.”', explanation:"La coniunctio indica l’unione di principi opposti o complementari, spesso raffigurati come Sole e Luna, Re e Regina. Nell’alchimia simbolica rappresenta una ricomposizione degli opposti in una realtà nuova." },
    { id:'mortificatio', symbol:'†●', title:'Mortificatio', latin:'MORS MUTAT, NON FINIT', text:'“La morte cambia la forma, non termina l’opera. Per questo la bara fu costruita come un laboratorio.”', explanation:"La mortificatio è una figura simbolica della morte, decomposizione o distruzione della forma precedente. Nei testi alchemici non indica necessariamente la fine del processo, ma una trasformazione preliminare alla rigenerazione." },
    { id:'azoth', symbol:'A☿Z', title:'Azoth', latin:'ALPHA · OMEGA · MERCURIUS', text:'“A e Z, principio e fine, uniti dal Mercurio. Sul muro qualcuno ha aggiunto: «manca una lettera».”', explanation:"Azoth è un termine alchemico usato con significati diversi, spesso collegato a un principio universale o a una sostanza mercuriale capace di favorire la trasformazione. L’interpretazione delle lettere come inizio e fine è una lettura simbolica tradizionale, non una definizione chimica precisa." },
    { id:'green_lion', symbol:'♌☉', title:'Leone Verde', latin:'LEO VIRIDIS DEVORAT SOLEM', text:'“Il Leone Verde divora il Sole. Una creatura simile è incisa sotto l’altare, con denti umani.”', explanation:"Il «Leone Verde» è un’immagine ricorrente nell’alchimia, ma il suo significato varia da testo a testo. Può indicare una sostanza corrosiva o una materia ancora grezza e vigorosa, raffigurata mentre «divora il Sole», cioè attacca o dissolve l’oro." },
    { id:'black_crow', symbol:'♄🪶', title:'Corvo della Putrefazione', latin:'CAPUT CORVI', text:'“Quando appare il Corvo, la materia è morta abbastanza da poter cambiare. Non guardarlo negli occhi.”', explanation:"Il corvo nero, o caput corvi, è un simbolo tradizionalmente associato alla nigredo. Il colore nero rappresenta la decomposizione della materia e il passaggio iniziale verso una trasformazione successiva." },
    { id:'white_queen', symbol:'♕☽', title:'Regina Bianca', latin:'REGINA IN SPECULO', text:'“La Regina Bianca vive nello specchio. Chi la vede deve contare le proprie dita prima di voltarsi.”', explanation:"La Regina Bianca è una figura emblematica dell’alchimia, spesso collegata alla Luna, all’argento e al principio femminile. Compare frequentemente in coppia con il Re Rosso, con il quale rappresenta l’unione di polarità opposte." },
    { id:'red_king', symbol:'♔☉', title:'Re Rosso', latin:'REX RUBER SINE CORONA', text:'“Il Re Rosso perse la corona nella Cripta. Da allora pretende il volto di chiunque entri.”', explanation:"Il Re Rosso è una figura simbolica associata al Sole, all’oro e al principio maschile o solare. Nelle immagini alchemiche viene spesso unito alla Regina Bianca come rappresentazione della coniunctio." },
    { id:'four_elements', symbol:'△▽◇□', title:'Quattro Elementi', latin:'IGNIS · AQUA · AER · TERRA', text:'“Fuoco, Acqua, Aria e Terra sono incisi sulle quattro pareti. La quinta parete porta soltanto un occhio.”', explanation:"I quattro elementi — fuoco, acqua, aria e terra — derivano dalla filosofia naturale greca e furono adottati anche dagli alchimisti europei. Non erano elementi chimici nel senso moderno, ma categorie usate per descrivere qualità e trasformazioni della materia." },
    { id:'fifth_essence', symbol:'✦○', title:'Quinta Essentia', latin:'QUOD NON EST ELEMENTUM', text:'“La quinta essenza non appartiene al mondo. Il Conte scrisse che respirava dietro la porta nord.”', explanation:"La «quinta essenza» nasce dall’idea aristotelica di un quinto elemento, l’etere, distinto dai quattro elementi terrestri. In ambito alchemico il termine fu poi usato anche per indicare una sostanza purificata o un’essenza considerata particolarmente sottile e potente." },
    { id:'pelican', symbol:'♧♥', title:'Pellicano', latin:'SANGUIS ALIT OPUS', text:'“Il vaso chiamato Pellicano nutre se stesso. Una nota a margine dice: «come questa famiglia».”', explanation:"Il pellicano è un tipo di recipiente alchemico progettato per far ricadere continuamente i vapori condensati nella sostanza riscaldata. Questa circolazione chiusa rese il vaso anche un simbolo di nutrimento e rigenerazione." },
    { id:'rebis', symbol:'☿⚥', title:'Rebis', latin:'DUO CORPORA, UNA UMBRA', text:'“Due corpi, una sola ombra. In una fotografia dei Vesper accade il contrario.”', explanation:"Il Rebis è una figura alchemica che rappresenta l’unione degli opposti, spesso raffigurata come un essere con caratteristiche maschili e femminili. Simboleggia il risultato di una riconciliazione tra polarità precedentemente separate." },
    { id:'cinnabar', symbol:'☿●', title:'Cinabro', latin:'MERCURIUS IN SANGUINE', text:'“Il Mercurio si fa rosso. Le lettere si fanno liquide. Il nome del Conte continua a colare dal foglio.”', explanation:"Il cinabro è solfuro di mercurio, HgS, un minerale rosso usato storicamente come pigmento e come principale fonte di mercurio. Proprio il legame tra mercurio, zolfo e colore rosso lo rese importante anche nell’immaginario alchemico." },
    { id:'antimony', symbol:'♁†', title:'Antimonio', latin:'LUPUS METALLORUM', text:'“Il Lupo dei metalli divora le impurità. Nel seminterrato divorò anche il suo custode.”', explanation:"L’antimonio ebbe un ruolo importante nella metallurgia e nell’alchimia, soprattutto nei processi di purificazione delle leghe. L’espressione «lupo dei metalli» deriva dalla sua capacità, in certe lavorazioni, di separare o «divorare» impurità da altri metalli." },
    { id:'glass', symbol:'◇☽', title:'Vetro Filosofico', latin:'SPECULUM NON MENTITUR', text:'“Lo specchio non mente. Semplicemente mostra ciò che arriverà qualche minuto dopo.”', explanation:"«Vetro Filosofico» non è una categoria alchemica canonica: qui è un’invenzione narrativa. Nella pratica storica, però, recipienti e alambicchi di vetro erano fondamentali perché permettevano di osservare distillazioni, sublimazioni e cambiamenti di colore." },
    { id:'silent_bell', symbol:'◯🔔', title:'Campana Muta', latin:'SONUS SINE SONO', text:'“Esiste un suono che non può essere udito. È quello che precede il dodicesimo rintocco.”', explanation:"La «Campana Muta» è un elemento inventato per il gioco, non un simbolo alchemico tradizionale. Il contrasto tra suono e silenzio è però frequente nella letteratura esoterica come immagine di conoscenza interiore o di ciò che non può essere espresso direttamente." },
    { id:'bone', symbol:'☠○', title:'Osso Primo', latin:'OSSA MEMINERUNT', text:'“Le ossa ricordano la forma del corpo. Una sola, nella Cripta, ricorda la forma di qualcosa che non è mai stato umano.”', explanation:"L’«Osso Primo» è una creazione narrativa. Ossa e scheletri compaiono comunque spesso nell’arte alchemica come immagini di morte, putrefazione e mortificatio, cioè della distruzione della forma precedente prima di una possibile rinascita." },
    { id:'thorn_circle', symbol:'✣◯', title:'Corona di Spine', latin:'SPINA CLAUDIT CIRCULUM', text:'“La Spina non ferisce: chiude. Per questo nessuno riuscì mai a spezzare il cerchio senza aprirne un altro.”', explanation:"La «Corona di Spine» in questa forma è un simbolo inventato per il gioco e non appartiene a una dottrina alchemica standard. La corona di spine è soprattutto un simbolo cristiano della Passione; il cerchio, invece, può rappresentare completezza, ciclo o protezione in molte tradizioni simboliche." },
    { id:'raven_gate', symbol:'🪶⌁', title:'Porta del Corvo', latin:'CORVUS ANTE LIMEN', text:'“Il Corvo precede ogni soglia. Dove la sua piuma cade, una porta esiste anche se il muro la nega.”', explanation:"La «Porta del Corvo» è un’invenzione del maniero. Il corvo, però, è realmente presente nella simbologia alchemica come immagine della nigredo e del caput corvi, cioè della fase nera e putrefattiva dell’opera." },
    { id:'moon_well', symbol:'☽▽', title:'Pozzo della Luna', latin:'LUNA DESCENDIT', text:'“La Luna scende nell’acqua ma non si bagna. Un volto scende con lei e non risale.”', explanation:"Il «Pozzo della Luna» è un elemento narrativo, ma l’associazione tra Luna e acqua è antica e molto diffusa. Nell’alchimia la Luna è legata all’argento e a qualità considerate fredde, umide e ricettive." },
    { id:'twelve', symbol:'XII◯', title:'Cerchio dei Dodici', latin:'DUODECIM NON EST FINIS', text:'“Dodici non significa fine. Significa apertura. Dopo il dodicesimo rintocco, il maniero smette di trattenere il respiro.”', explanation:"Il «Cerchio dei Dodici» è una costruzione narrativa del gioco. Il numero dodici ha però un forte peso simbolico storico: dodici segni zodiacali, dodici mesi e numerosi cicli religiosi e cosmologici lo hanno reso una cifra associata a ordine e completezza." },
    { id:'vesper_seal', symbol:'V✶V', title:'Marchio Vesper', latin:'VESPERA NON CLAUDIT DIEM', text:'“Vesper significa sera. Qui la sera non chiude il giorno: lo imprigiona.”', explanation:"Il «Marchio Vesper» è inventato per il gioco. La parola latina vesper significa «sera» o «astro della sera» e ha dato origine a termini legati ai vespri e al tempo serale." },
    { id:'last_formula', symbol:'☉☿☽', title:'Formula Senza Autore', latin:'QUOD TIMEMUS, NOS VIDET', text:'“Ciò che temiamo ci vede. Ciò che vediamo ci ricorda. Ciò che ricordiamo trova la strada per tornare.”', explanation:"La formula è un’invenzione narrativa e non una massima alchemica storica. I simboli di Sole, Mercurio e Luna, invece, sono autentiche notazioni usate nella tradizione alchemica per indicare rispettivamente oro, mercurio e argento, oltre ai loro significati simbolici." },
    { id:'tetragrammaton', symbol:'יהוה', title:'Tetragrammaton', latin:'NOMEN QUATTUOR LITTERARUM', text:'“Quattro lettere sono state incise dove nessuna mano avrebbe potuto arrivare. Il Conte le coprì con cera nera.”', explanation:'Il Tetragrammaton è la forma a quattro lettere del nome divino YHWH nella Bibbia ebraica. Nelle tradizioni esoteriche occidentali fu spesso trattato come un nome sacro di grande potere simbolico.' },
    { id:'sephiroth', symbol:'✶⑩', title:'Dieci Sephiroth', latin:'DECEM EMANATIONES', text:'“Dieci luci scendono lungo un albero senza radici. L’undicesima è stata disegnata con sangue.”', explanation:'Le Sephiroth sono le dieci emanazioni della Qabbalah ebraica, organizzate nell’Albero della Vita. Molte reinterpretazioni occultistiche europee sono successive e non coincidono con la tradizione ebraica.' },
    { id:'emerald_tablet', symbol:'▱☿', title:'Tavola di Smeraldo', latin:'SICUT SUPERIUS, SICUT INFERIUS', text:'“Ciò che è sopra imita ciò che è sotto. Nella casa, invece, ciò che è sotto sta imparando a salire.”', explanation:'La Tavola di Smeraldo è un breve testo ermetico medievale attribuito leggendariamente a Ermete Trismegisto. La formula «come in alto, così in basso» sintetizza l’idea di corrispondenza tra livelli del cosmo.' },
    { id:'monas', symbol:'☿☉☽', title:'Monade Geroglifica', latin:'MONAS HIEROGLYPHICA', text:'“Sole, Luna, croce e Ariete sono compressi in un unico segno. Vesper annotò: «una cosa, molti cieli».”', explanation:'La Monas Hieroglyphica fu proposta da John Dee nel 1564 come simbolo capace di riunire significati astrologici e alchemici. È un emblema rinascimentale complesso, non una formula scientifica.' },
    { id:'tria_prima', symbol:'☿🜍🜔', title:'Tria Prima', latin:'MERCURIUS · SULPHUR · SAL', text:'“Tre principi siedono alla stessa tavola: uno fugge, uno brucia, uno resta.”', explanation:'Paracelso rese celebri i tre principi alchemici Mercurio, Zolfo e Sale. Erano categorie filosofiche per descrivere volatilità, combustibilità e stabilità, non equivalenti esatti alle sostanze moderne.' },
    { id:'sulfur', symbol:'🜍', title:'Zolfo Filosofico', latin:'SULPHUR PRINCIPIUM', text:'“Lo Zolfo non brucia la materia: le insegna a desiderare il fuoco.”', explanation:'Nell’alchimia lo zolfo poteva rappresentare il principio attivo, combustibile o solare. Il «principio zolfo» non va confuso semplicemente con l’elemento chimico zolfo.' },
    { id:'mercury_philosophic', symbol:'☿', title:'Mercurio Filosofico', latin:'MERCURIUS DUPLEX', text:'“Il Mercurio ha due volti e nessuno dei due resta fermo abbastanza da essere ritratto.”', explanation:'Il Mercurio filosofico è un concetto alchemico più ampio del mercurio metallico. Spesso rappresenta volatilità, mediazione e capacità di unire opposti.' },
    { id:'salt_principle', symbol:'🜔', title:'Sale Filosofico', latin:'SAL FIXAT', text:'“Il Sale conserva ciò che il fuoco vorrebbe disperdere. Per questo Vesper lo chiamava memoria.”', explanation:'Nel sistema paracelsiano il Sale simboleggia stabilità, corpo e fissazione. È uno dei tre principi insieme a Zolfo e Mercurio.' },
    { id:'macro_micro', symbol:'☉↕◯', title:'Macrocosmo e Microcosmo', latin:'HOMO MUNDUS MINOR', text:'“La pianta del maniero coincide con una figura umana. La Cripta occupa il posto del cuore.”', explanation:'L’idea di microcosmo e macrocosmo paragona l’essere umano a un piccolo mondo che riflette il cosmo. Fu importante nella filosofia naturale rinascimentale e nell’ermetismo.' },
    { id:'philosophic_egg', symbol:'🥚✶', title:'Uovo Filosofico', latin:'OVUM PHILOSOPHORUM', text:'“Nel vetro è disegnato un uovo sigillato. Dall’interno qualcuno ha graffiato tre volte.”', explanation:'L’Uovo Filosofico è un’immagine alchemica del recipiente chiuso in cui avviene la trasformazione. Il guscio rappresenta spesso la separazione dell’opera dal mondo esterno.' },
    { id:'salamander', symbol:'🦎🔥', title:'Salamandra', latin:'IN IGNE VIVIT', text:'“La creatura dorme nel braciere e apre gli occhi soltanto quando il fuoco diventa bianco.”', explanation:'La salamandra fu tradizionalmente associata al fuoco nella simbologia europea. In alchimia compare come emblema della materia che resiste o si purifica attraverso il calore.' },
    { id:'sylph', symbol:'△≈', title:'Silfo', latin:'AER INVISIBILIS', text:'“Una pagina si volta senza vento. Sul margine appare una parola che nessuno aveva scritto.”', explanation:'I silfi sono spiriti elementali dell’aria nella classificazione attribuita a Paracelso e sviluppata dall’occultismo successivo. Rappresentano simbolicamente il dominio dell’aria.' },
    { id:'gnome', symbol:'□✣', title:'Gnomo', latin:'TERRA CUSTODIT', text:'“Sotto il pavimento qualcuno conta monete con dita di pietra.”', explanation:'Gli gnomi furono descritti nella tradizione paracelsiana come esseri elementali legati alla terra. La figura moderna dello gnomo deriva anche da sviluppi letterari successivi.' },
    { id:'planet_metals', symbol:'☉☽☿♀♂♃♄', title:'Sette Metalli Planetari', latin:'SEPTEM METALLA', text:'“Sette piastre metalliche formano un cerchio. Quella di Saturno è fredda anche accanto al fuoco.”', explanation:'L’alchimia europea associava tradizionalmente sette metalli ai sette astri visibili: oro-Sole, argento-Luna, mercurio-Mercurio, rame-Venere, ferro-Marte, stagno-Giove e piombo-Saturno.' },
    { id:'lead_saturn', symbol:'♄ Pb', title:'Piombo di Saturno', latin:'SATURNUS GRAVIS', text:'“Il metallo più pesante porta il nome del pianeta più lento. Una catena di piombo chiude la porta nord.”', explanation:'Il piombo era tradizionalmente associato a Saturno e a qualità di pesantezza, lentezza e oscurità. Queste corrispondenze erano simboliche e astrologiche.' },
    { id:'iron_mars', symbol:'♂ Fe', title:'Ferro di Marte', latin:'MARS FERRUM', text:'“Le lame nella sala vibrano quando il simbolo di Marte viene toccato.”', explanation:'Il ferro era associato a Marte per il legame simbolico con armi, forza e guerra. Il segno planetario di Marte divenne anche simbolo del ferro in contesti alchemici.' },
    { id:'copper_venus', symbol:'♀ Cu', title:'Rame di Venere', latin:'VENUS CUPRUM', text:'“Il rame diventa verde sotto il ritratto di una donna senza nome.”', explanation:'Il rame era associato a Venere, anche per la storica importanza delle miniere di Cipro, isola legata alla dea. In alchimia questa corrispondenza aveva valore simbolico e astrologico.' },
    { id:'tin_jupiter', symbol:'♃ Sn', title:'Stagno di Giove', latin:'JUPITER STANNUM', text:'“Una coppa di stagno amplifica ogni voce fino a farla sembrare un giuramento.”', explanation:'Lo stagno era tradizionalmente collegato a Giove. Le associazioni planetarie dei metalli costituivano un sistema simbolico molto diffuso nella cultura alchemica europea.' },
    { id:'silver_moon', symbol:'☽ Ag', title:'Argento Lunare', latin:'LUNA ARGENTUM', text:'“L’argento riflette la luna anche quando il cielo è coperto.”', explanation:'L’argento era associato alla Luna per il colore e la luminosità. Il simbolo lunare compare spesso nei manoscritti alchemici per indicare l’argento.' },
    { id:'gold_sun', symbol:'☉ Au', title:'Oro Solare', latin:'SOL AURUM', text:'“Un disco d’oro non illumina la stanza, ma rende più scure tutte le ombre.”', explanation:'L’oro era associato al Sole e considerato il metallo perfetto nella gerarchia alchemica. La trasmutazione mirava simbolicamente e materialmente a raggiungere questa perfezione.' },
    { id:'distillation', symbol:'⚗↑', title:'Distillatio', latin:'SPIRITUS ASCENDIT', text:'“Il vapore sale, si raffredda e torna diverso. Vesper scrisse: «anche un’anima può essere distillata».”', explanation:'La distillazione è una tecnica reale di separazione basata su evaporazione e condensazione. Fu fondamentale nei laboratori alchemici e contribuì allo sviluppo della chimica.' },
    { id:'sublimation', symbol:'△↑', title:'Sublimatio', latin:'SUBLIME FIT', text:'“La materia scompare dal fondo e ricompare sul vetro più in alto, come se avesse imparato a salire.”', explanation:'La sublimazione è il passaggio diretto di una sostanza dallo stato solido a quello gassoso, seguito eventualmente da rideposizione. Gli alchimisti la usarono anche come metafora di purificazione.' },
    { id:'calcination', symbol:'🔥⚱', title:'Calcinatio', latin:'PER IGNEM AD CINEREM', text:'“Prima resta la cenere. Poi la cenere ricorda di essere stata qualcos’altro.”', explanation:'La calcinazione consiste nel forte riscaldamento di una sostanza per decomporla o trasformarla, spesso producendo una polvere o «calce». Era una procedura comune nei laboratori premoderni.' },
    { id:'dissolution', symbol:'▽○', title:'Dissolutio', latin:'SOLVE CORPUS', text:'“Il corpo scompare nell’acqua, ma il suo nome resta scritto sul fondo.”', explanation:'La dissoluzione è il processo con cui una sostanza si disperde in un solvente. Nell’alchimia aveva anche un significato simbolico di disfacimento della forma precedente.' },
    { id:'separation', symbol:'✂◯', title:'Separatio', latin:'SEPARA PURUM', text:'“Due liquidi occupano lo stesso vaso senza toccarsi. Una linea sottile decide quale dei due sia puro.”', explanation:'La separazione comprendeva diverse tecniche per isolare componenti di una miscela. Nel linguaggio alchemico poteva assumere anche un valore simbolico di discernimento tra puro e impuro.' },
    { id:'fermentation', symbol:'♨✶', title:'Fermentatio', latin:'FERMENTUM VIVIT', text:'“Il vaso chiuso pulsa come se respirasse. Il Conte ordinò di non aprirlo mai dopo il tramonto.”', explanation:'La fermentazione è un processo biologico reale, noto empiricamente da millenni. Gli alchimisti la interpretarono anche come immagine di animazione e rinascita della materia.' },
    { id:'multiplication', symbol:'✶✶✶', title:'Multiplicatio', latin:'VIRTUS CRESCIT', text:'“Una goccia rossa ne genera tre senza diminuire. Il margine del foglio dice: «non è aritmetica».”', explanation:'La multiplicatio era una fase teorica di alcune tradizioni alchemiche in cui si pensava di aumentare la potenza della Pietra Filosofale. È parte della dottrina alchemica, non un fenomeno riconosciuto dalla chimica moderna.' },
    { id:'projection', symbol:'✶→Au', title:'Projectio', latin:'PROICE LAPIDEM', text:'“Una polvere viene gettata sul metallo fuso. Il disegno successivo mostra un sole.”', explanation:'La projectio era, nei testi alchemici, l’atto finale di applicare la Pietra Filosofale a un metallo vile per trasmutarlo in oro o argento. Non esistono prove che tale trasmutazione sia mai stata ottenuta con metodi alchemici.' },
    { id:'rosicrucian', symbol:'🌹✚', title:'Rosa-Croce', latin:'SUB ROSA CRUCE', text:'“Una rosa cresce al centro di una croce. Dietro il disegno qualcuno ha scritto: «la casa è il tempio».”', explanation:'La Rosa-Croce è il simbolo associato ai manifesti rosacrociani del XVII secolo e alle tradizioni esoteriche che ne derivarono. Unisce immagini cristiane, filosofiche ed ermetiche.' },
    { id:'squaring_circle', symbol:'□○', title:'Quadratura del Cerchio', latin:'QUADRATURA CIRCULI', text:'“Un quadrato cerca di contenere il cerchio e fallisce ogni notte nello stesso punto.”', explanation:'La quadratura del cerchio è un celebre problema geometrico antico, dimostrato impossibile con riga e compasso nel XIX secolo. In iconografia esoterica è stata usata anche come immagine della conciliazione tra materia e spirito.' },
    { id:'astrolabe', symbol:'✶⊕', title:'Astrolabio', latin:'CAELUM IN MANU', text:'“Il cielo intero è inciso su un disco abbastanza piccolo da stare in una mano.”', explanation:'L’astrolabio è uno strumento astronomico storico usato per misurare l’altezza degli astri, determinare l’ora e risolvere problemi di astronomia sferica. Non è propriamente uno strumento alchemico.' },
    { id:'zodiac', symbol:'♈♉♊', title:'Zodiaco', latin:'DUODECIM SIGNA', text:'“Dodici figure circondano una porta. La tredicesima è stata cancellata con un coltello.”', explanation:'Lo zodiaco divide l’eclittica in dodici segni ed ebbe grande importanza nell’astrologia antica e medievale. Gli alchimisti spesso collegavano operazioni e materiali a corrispondenze astrologiche.' },
    { id:'hermes', symbol:'☿📜', title:'Ermete Trismegisto', latin:'HERMES TER MAXIMUS', text:'“Un uomo con tre ombre tiene un libro chiuso. Nessuno dei tre volti guarda nella stessa direzione.”', explanation:'Ermete Trismegisto è la figura leggendaria a cui furono attribuiti testi filosofici e religiosi dell’ermetismo tardoantico. In età medievale e rinascimentale divenne anche un’autorità simbolica per l’alchimia.' },
    { id:'athanor_real', symbol:'♨🏺', title:'Athanor', latin:'IGNIS CONTINUUS', text:'“Il forno non si spegne mai. Anche da freddo, la pietra intorno conserva un battito di calore.”', explanation:'L’athanor è un forno associato alla pratica alchemica, progettato idealmente per mantenere un calore costante e prolungato. Il termine divenne simbolo del lavoro lento e continuo dell’Opera.' },
    { id:'lapis', symbol:'◆☉', title:'Pietra Filosofale', latin:'LAPIS PHILOSOPHORUM', text:'“Una pietra che non pesa è chiusa in una scatola troppo pesante per essere sollevata.”', explanation:'La Pietra Filosofale è il celebre obiettivo leggendario dell’alchimia europea, ritenuto capace di favorire la trasmutazione dei metalli e, in alcune tradizioni, di produrre un elisir di lunga vita. Non ne esiste evidenza scientifica.' },
    { id:'elixir', symbol:'⚗♥', title:'Elisir di Vita', latin:'ELIXIR VITAE', text:'“Nel bicchiere non c’è liquido, eppure chi lo avvicina alle labbra sente un sapore dolce.”', explanation:'L’elisir di lunga vita è un tema presente in diverse tradizioni alchemiche, europee e asiatiche. Storicamente fu cercato come preparato capace di prolungare la vita, senza risultati dimostrati dalla medicina moderna.' },
  ];

  function buildEsotericQuestionBank() {
    const questions = [];
    loreClues.forEach(clue => {
      questions.push({
        id: `${clue.id}-symbol`,
        type: 'symbol',
        clueId: clue.id,
        clueTitle: clue.title,
        glyph: '🜍',
        prompt: `Quale sigillo appartiene al frammento alchemico “${clue.title}”?`,
        correct: clue.symbol,
        explanation: clue.explanation
      });
      questions.push({
        id: `${clue.id}-latin`,
        type: 'latin',
        clueId: clue.id,
        clueTitle: clue.title,
        glyph: clue.symbol,
        prompt: `Quale formula accompagna “${clue.title}” nel Codice Vesper?`,
        correct: clue.latin,
        explanation: clue.explanation
      });
      questions.push({
        id: `${clue.id}-title`,
        type: 'title',
        clueId: clue.id,
        clueTitle: clue.title,
        glyph: clue.symbol,
        prompt: `Nel manoscritto del Conte, a quale figura appartiene il segno ${clue.symbol}?`,
        correct: clue.title,
        explanation: clue.explanation
      });
    });
    return questions;
  }

  const esotericQuestions = buildEsotericQuestionBank(); // 216 domande generate dai 72 frammenti del Codice Vesper.

  function shuffled(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function answerPoolForType(type) {
    if (type === 'symbol') return loreClues.map(clue => clue.symbol);
    if (type === 'latin') return loreClues.map(clue => clue.latin); // Latin is intentionally never translated.
    return loreClues.map(clue => localizedLoreTitle(clue));
  }

  function esotericPrompt(question) {
    const clue = loreClues.find(item => item.id === question.clueId);
    const title = clue ? localizedLoreTitle(clue) : question.clueTitle;
    if (currentLanguage === 'en') return question.type === 'symbol' ? `Which seal belongs to the alchemical fragment “${title}”?` : question.type === 'latin' ? `Which Latin formula accompanies “${title}” in the Codex Vesper?` : `In the Count’s manuscript, which figure belongs to the sign ${question.glyph}?`;
    if (currentLanguage === 'es') return question.type === 'symbol' ? `¿Qué sello pertenece al fragmento alquímico “${title}”?` : question.type === 'latin' ? `¿Qué fórmula latina acompaña a “${title}” en el Codex Vesper?` : `En el manuscrito del Conde, ¿a qué figura pertenece el signo ${question.glyph}?`;
    if (currentLanguage === 'fr') return question.type === 'symbol' ? `Quel sceau appartient au fragment alchimique « ${title} » ?` : question.type === 'latin' ? `Quelle formule latine accompagne « ${title} » dans le Codex Vesper ?` : `Dans le manuscrit du Comte, à quelle figure appartient le signe ${question.glyph} ?`;
    if (currentLanguage === 'pt') return question.type === 'symbol' ? `Qual selo pertence ao fragmento alquímico “${title}”?` : question.type === 'latin' ? `Qual fórmula latina acompanha “${title}” no Codex Vesper?` : `No manuscrito do Conde, a que figura pertence o sinal ${question.glyph}?`;
    return question.prompt;
  }

  function prepareEsotericQuestion(question) {
    const clue = loreClues.find(item => item.id === question.clueId);
    const correct = question.type === 'title' && clue ? localizedLoreTitle(clue) : question.correct;
    const pool = answerPoolForType(question.type);
    const distractors = shuffled(pool.filter(value => value !== correct)).slice(0, 3);
    const options = shuffled([correct, ...distractors]);
    return {
      ...question,
      clueTitle: clue ? localizedLoreTitle(clue) : question.clueTitle,
      prompt: esotericPrompt(question),
      correct,
      explanation: clue ? localizedLoreField(clue, 'explanation') : localizeRuntimeText(question.explanation, 'explore'),
      options,
      correctIndex: options.indexOf(correct)
    };
  }

  const mundaneFinds = [
    { icon: '🕯️', title: 'Candela consacrata', text: 'In una nicchia trovi una candela di cera scura avvolta in un filo d’argento.', item: 'candle' },
    { icon: '🧂', title: 'Sale benedetto', text: 'Un piccolo sacchetto di sale reca ancora il sigillo della vecchia Cappella.', item: 'salt' },
    { icon: '🗝️', title: 'Chiave di ottone', text: 'Una chiave pesante, troppo antica per una serratura moderna, riposa sotto uno strato di polvere.', item: 'key' },
    { icon: '🪞', title: 'Frammento di specchio', text: 'Un frammento di specchio riflette la stanza, ma non le persone.', item: 'mirror' },
    { icon: '🧿', title: 'Occhio di vetro', text: 'Dentro una scatola imbottita trovi un occhio di vetro azzurro. È inspiegabilmente caldo.', item: 'eye' },
    { icon: '📿', title: 'Rosario spezzato', text: 'Le perle di un rosario sono sparse sul pavimento. Ne raccogli quelle ancora unite.', item: 'rosary' },
    { icon: '🪙', title: 'Moneta del Conte', text: 'Una moneta porta il profilo di Aureliano Vesper su entrambi i lati.', item: 'coin' },
    { icon: '🧪', title: 'Fiala d’ambra', text: 'Una piccola fiala sigillata contiene un liquido color miele che non si muove.', item: 'amber' },
    { icon: '🪶', title: 'Piuma nera', text: 'Una piuma di corvo è infilata tra due pietre come un segnalibro.', item: 'feather' },
    { icon: '🔔', title: 'Campanella d’argento', text: 'Una campanella senza battaglio vibra quando la avvicini alla parete.', item: 'bell' },
    { icon: '🪬', title: 'Amuleto di ferro', text: 'Un piccolo amuleto freddo al tatto porta un simbolo cancellato. Senti che potrebbe proteggerti.', item: 'amulet' },
    { icon: '☿', title: 'Talismano di Mercurio', text: 'Dentro una scatola di noce trovi un disco d’argento inciso con il segno di Mercurio. Quando lo tocchi, per un istante il corridoio sembra accorciarsi.', item: 'talisman', rare: true },
    { icon: '❤️', title: 'Un momento di lucidità', text: 'Un ricordo familiare ti riporta al presente e la paura perde forza.', heal: 1 }
  ];

  const quietDiscoveries = [
    'Dietro una tenda trovi soltanto il segno più chiaro di un quadro rimosso molti anni fa.',
    'Sotto il tappeto compare una frase cancellata con cura, ma non abbastanza da capire cosa dicesse.',
    'Un cassetto contiene decine di bottoni, tutti appartenuti a uniformi diverse.',
    'Trovi una tazza ancora tiepida. La polvere intorno dimostra che nessuno è passato da anni.',
    'Una finestra è murata dall’esterno. Tra i mattoni entra comunque un filo d’aria gelida.',
    'Dietro una libreria c’è una porta dipinta sul muro. La maniglia è vera, la porta no.',
    'Un mazzo di fiori completamente secchi emana ancora un profumo intenso.',
    'La polvere sul pavimento forma un cerchio perfetto che nessuna impronta attraversa.',
    'Una pagina strappata mostra soltanto una serie di numeri senza significato apparente.',
    'Trovi una scarpa da bambino nascosta dentro una grande armatura.',
    'Un bicchiere rotto è disposto a terra come se qualcuno avesse ricomposto i frammenti senza unirli.',
    'Dentro un cassetto c’è una piccola campana di legno: non può suonare, ma la senti vibrare.',
    'Un mazzo di chiavi è appeso al muro. Tutte le chiavi sono state limate fino a renderle inutili.',
    'Una candela spenta proietta comunque una piccola ombra tremolante.',
    'Sotto una pietra trovi un nastro rosso annodato tre volte.',
    'Un libro aperto contiene pagine bianche, tranne una singola parola: “GIÙ”.',
    'Una cornice vuota riporta sul retro quattro nomi. Uno è stato raschiato via.',
    'La stanza profuma improvvisamente di pioggia, benché tutte le finestre siano chiuse.',
    'Un mobile è stato inchiodato al pavimento dall’interno.',
    'Sul soffitto qualcuno ha tracciato una freccia che punta esattamente verso di te.'
  ];

  const resolutionMessages = [
    'Una corrente d’aria cambia direzione e il meccanismo che ti bloccava si allenta.',
    'Per un istante il maniero sembra trattenere il respiro. Trovi il punto debole e ti liberi.',
    'Una delle dodici campane suona lontanissima. Le ombre si ritirano abbastanza da lasciarti passare.',
    'Ricordi un dettaglio visto poco prima: era la soluzione. L’impedimento cede.',
    'La tua lanterna emette un lampo bianco. Ciò che ti tratteneva perde forza.',
    'Un simbolo inciso sul pavimento si illumina e spezza l’effetto che ti immobilizzava.',
    'Il suono della musica sembra raggiungere persino la stanza. Ritrovi lucidità e reagisci.',
    'Una porta secondaria si apre da sola nel momento esatto in cui ne hai bisogno.',
    'Un colpo di vento sposta ciò che ti impediva di avanzare. Sei libero.',
    'La paura si trasforma in concentrazione. Vedi finalmente la via d’uscita.'
  ];

  const rescueEvents = [
    { title: 'Una mano amica', text: 'Dal corridoio arriva la voce di un compagno. Seguendola trovi una leva nascosta e il blocco cede.' },
    { title: 'Il ratto e la corda', text: 'Un grosso ratto attraversa il pavimento e rosicchia proprio la corda che ti tratteneva. Ti liberi.' },
    { title: 'La pietra si sposta', text: 'Un tremore attraversa il maniero. La pietra che ti imprigionava scivola di pochi centimetri: quanto basta.' },
    { title: 'La corrente segreta', text: 'Una folata rivela una fessura nella parete. Premi il punto giusto e il meccanismo si disarma.' },
    { title: 'Il fantasma indica l’uscita', text: 'Per un istante compare una figura pallida. Invece di attaccarti indica una via di fuga e scompare.' },
    { title: 'La catena arrugginita', text: 'La catena cede proprio mentre provi a liberarti. Il maniero, per una volta, commette un errore.' },
    { title: 'La campanella muta vibra', text: 'Un oggetto nell’inventario vibra e il meccanismo si ferma abbastanza a lungo da permetterti di uscire.' },
    { title: 'Una porta secondaria', text: 'Una porticina nascosta si apre da sola. Non sai chi l’abbia aperta, ma sei libero.' }
  ];

  const skullEncounters = [
    { title: 'L’Ombra del Teschio', text: 'Il Teschio appare sospeso davanti a te e il suo corpo d’ombra attraversa la stanza.', damage: 1 },
    { title: 'Urlo senza voce', text: 'La mascella si spalanca senza produrre suono, ma la paura ti blocca i muscoli.', block: true, status: 'Terrore del Teschio' },
    { title: 'Vento della Cripta', text: 'Un vortice gelido ti investe e ti scaraventa verso l’inizio della stanza.', returnRoomStart: true },
    { title: 'Occhi nelle pareti', text: 'Decine di occhi si aprono nella pietra. Perdi l’orientamento e arretri.', moveBack: 2 },
    { title: 'Morso d’ombra', text: 'Una mandibola di fumo si chiude sul tuo braccio prima di dissolversi.', damage: 1, block: true, status: 'Ferita d’ombra' },
    { title: 'La stanza si piega', text: 'Il Teschio ruota su se stesso e l’intera stanza sembra capovolgersi. Quando riapri gli occhi sei tornato alla soglia.', returnRoomStart: true },
    { title: 'Il Teschio ti osserva', text: 'Resta immobile a pochi metri da te, poi svanisce. Nessun danno, ma sai che tornerà.' }
  ];

  let state = null;
  let currentSequence = [];
  let profile = { name: 'Luca', gender: 'male' };
  let settings = loadSettings();
  let currentLanguage = LANGS.includes(settings.language) ? settings.language : 'it';
  function contentDict() { return CONTENT_I18N[currentLanguage] || {}; }
  function langText(it, en, es, fr, pt) { return ({it,en,es,fr,pt}[currentLanguage] ?? it); }

  function localizedStatus(label) {
    if (!label || currentLanguage === 'it') return label || '';
    return contentDict().statuses?.[label] || t('blocked');
  }

  function localizedSealName(key) {
    if (currentLanguage === 'it') return sealDefs[key]?.name || key;
    return contentDict().seals?.[key] || sealDefs[key]?.name || key;
  }

  function localizedLoreTitle(clue) {
    if (!clue) return '';
    if (currentLanguage === 'it') return clue.title;
    return contentDict().loreTitles?.[clue.id] || clue.title;
  }

  function localizedLoreField(clue, field) {
    if (!clue) return '';
    if (field === 'title') return localizedLoreTitle(clue);
    // Latin formulas are intentionally never translated.
    if (field === 'latin' || currentLanguage === 'it') return clue[field] || '';
    const translated = contentDict().lore?.[clue.id]?.[field];
    if (translated) return translated;
    const fallback = contentDict().loreFallback?.[field];
    if (!fallback) return '';
    return fallback.replaceAll('{title}', localizedLoreTitle(clue));
  }

  function localizedArrayEntry(category, sourceArray, entry, field = 'text') {
    if (!entry) return '';
    if (currentLanguage === 'it') return typeof entry === 'string' ? entry : (entry[field] || '');
    const index = sourceArray.indexOf(entry);
    const translated = contentDict()?.[category]?.[index];
    if (typeof entry === 'string') return typeof translated === 'string' ? translated : (contentDict().fallbacks?.explore || '');
    if (Array.isArray(translated)) return field === 'title' ? translated[0] : translated[1];
    return field === 'title' ? (contentDict().fallbacks?.event || '') : (contentDict().fallbacks?.event || '');
  }

  function localizedCardinalTrap(trap, field) {
    if (!trap) return '';
    if (currentLanguage === 'it') return trap[field] || '';
    const translated = contentDict().cardinalTraps?.[trap.id];
    if (Array.isArray(translated)) return field === 'title' ? translated[0] : translated[1];
    return contentDict().fallbacks?.trap || '';
  }

  function localizedFaceLabel(face) {
    if (!face) return '';
    if (face.kind === 'move') return t(`move${face.value}`);
    if (face.kind === 'mystery') return `☠ · ${t('omen')}`;
    if (face.kind === 'event') return `👻 ${t('event')}`;
    if (face.kind === 'trap') return `⚠️ ${t('trap')}`;
    return face.label || '';
  }

  function exactContentTranslation(text) {
    if (!text || currentLanguage === 'it') return text || '';
    const d = contentDict();
    const categories = [
      ['unforeseenEvents', unforeseenEvents], ['traps', traps], ['mundaneFinds', mundaneFinds],
      ['rescueEvents', rescueEvents], ['skullEncounters', skullEncounters]
    ];
    for (const [cat, arr] of categories) {
      for (let i = 0; i < arr.length; i++) {
        const src = arr[i], tr = d?.[cat]?.[i];
        if (!src || !tr) continue;
        if (src.title === text && Array.isArray(tr)) return tr[0];
        if (src.text === text && Array.isArray(tr)) return tr[1];
        if (src.status === text) return localizedStatus(text);
      }
    }
    for (const [cat, arr] of [['quietDiscoveries', quietDiscoveries], ['resolutionMessages', resolutionMessages]]) {
      const i = arr.indexOf(text);
      if (i >= 0 && typeof d?.[cat]?.[i] === 'string') return d[cat][i];
    }
    for (const trap of Object.values(cardinalTraps)) {
      if (trap.title === text) return localizedCardinalTrap(trap, 'title');
      if (trap.text === text) return localizedCardinalTrap(trap, 'text');
    }
    for (const [key, item] of Object.entries(itemDefs)) {
      if (item.name === text) return localizedItem(key, 'name');
      if (item.effect === text) return localizedItem(key, 'effect');
    }
    for (const [key, seal] of Object.entries(sealDefs)) if (seal.name === text) return localizedSealName(key);
    for (const room of rooms) {
      for (const field of ['name','kicker','hint','flavor']) if (room[field] === text) return localizedRoom(room, field);
    }
    for (const clue of loreClues) {
      if (clue.title === text) return localizedLoreTitle(clue);
      if (clue.text === text) return localizedLoreField(clue, 'text');
      if (clue.explanation === text) return localizedLoreField(clue, 'explanation');
    }
    for (const [key, value] of Object.entries(UI_EXTRA.it || {})) if (value === text) return t(key);
    return null;
  }

  function localizeRuntimeText(text, fallbackKind = 'log') {
    if (text == null || text === '' || currentLanguage === 'it') return text || '';
    const raw = String(text);
    const exact = exactContentTranslation(raw);
    if (exact != null) return exact;
    // Keep pure names, numbers, icons and Latin/technical formulae untouched.
    if (/^[\d\s+\-→/·:.,()%❤️🖤💀👻⚠️✨🛡️⛓️🔔]+$/.test(raw)) return raw;
    if (/^[A-Z0-9 .,:;·()\-]+$/.test(raw) && !/[ÀÈÉÌÒÙ]/.test(raw)) return raw;
    // If a string has already been built in the selected language, do not run it
    // through the Italian-source fallback a second time.
    const looksItalian = /\b(il|lo|gli|della|dello|delle|nella|nelle|maniero|teschio|stanza|casella|coraggio|imprevisto|trappola|sigillo|sigilli|rintocco|soglia|libero|bloccato|avanza|arretri|ritorni|risposta|esplorazione|nessun|nessuna|puoi|rimane|viene|ancora|attraversa|cercare|bara)\b/i.test(raw);
    if (!looksItalian) return raw;
    return contentDict().fallbacks?.[fallbackKind] || contentDict().fallbacks?.log || raw;
  }
  let selectedDifficulty = 'hard';
  let pendingProfile = null;
  let gameActive = false;
  let storyMode = 'view';
  let outcomeResolver = null;
  let toastTimer = null;
  let pendingItemId = null;
  let pendingItemTarget = null;
  let inventoryReminderTimer = null;
  let lastInventoryReminderRound = -99;
  let awakeningPreviewMode = false;
  let awakeningResumePhase = null;
  let awakeningResumeAfterTurn = false;

  const $ = selector => document.querySelector(selector);
  const els = {
    startScreen: $('#startScreen'), startGame: $('#startGameBtn'), languageSelect: $('#languageSelect'), languageSelectTop: $('#languageSelectTop'), roomBtn: $('#roomBtn'), testAwakeningBtn: $('#testAwakeningBtn'),
    players: $('#playersList'), roomPlayers: $('#roomPlayersList'), sigils: $('#sigils'), roomSigils: $('#roomSigils'), inventory: $('#inventory'), roomInventory: $('#roomInventory'), journal: $('#journal'), log: $('#eventLog'),
    doomLabel: $('#doomLabel'), doomFill: $('#doomFill'), bellProgress: $('#bellProgress'),
    board: $('#board'), pathRoomStrip: $('#pathRoomStrip'),
    ambientAudio: $('#ambientAudio'), soundBtn: $('#soundBtn'),
    roomDialog: $('#roomDialog'), roomRoll: $('#roomRollBtn'), dialogDice: $('#dialogDice'), diceCube: $('#diceCube'), dialogMoveText: $('#dialogMoveText'), dialogStatusText: $('#dialogStatusText'),
    dialogRoomImage: $('#dialogRoomImage'), dialogRoomKicker: $('#dialogRoomKicker'), dialogRoomName: $('#dialogRoomName'), dialogRoomHint: $('#dialogRoomHint'), dialogRoomFlavor: $('#dialogRoomFlavor'),
    footprintsLayer: $('#footprintsLayer'), charactersLayer: $('#charactersLayer'), roomMinimizeBtn: $('#roomMinimizeBtn'), roomPathBtn: $('#roomPathBtn'), roomMusicBtn: $('#roomMusicBtn'), roomSealBtn: $('#roomSealBtn'),
    roomDoomLabel: $('#roomDoomLabel'), roomRoundLabel: $('#roomRoundLabel'), roomSkullLifeLabel: $('#roomSkullLifeLabel'), roomStatusLabel: $('#roomStatusLabel'), roomStatusPanel: $('#roomStatusPanel'), roomInventoryReminder: $('#roomInventoryReminder'), roomSideScroll: $('#roomSideScroll'), roomRitualSection: $('#roomRitualSection'), roomInventorySection: $('#roomInventorySection'), roomRitualAnchorBtn: $('#roomRitualAnchorBtn'), roomInventoryAnchorBtn: $('#roomInventoryAnchorBtn'),
    pathDialog: $('#pathDialog'), pathDialogClose: $('#pathDialogClose'), positionDialog: $('#positionDialog'), positionDialogClose: $('#positionDialogClose'), positionDialogTitle: $('#positionDialogTitle'), positionDialogMeta: $('#positionDialogMeta'), positionDialogOccupants: $('#positionDialogOccupants'),
    exploreDialog: $('#exploreDialog'), exploreRoomImage: $('#exploreRoomImage'), exploreRoomKicker: $('#exploreRoomKicker'), exploreRoomName: $('#exploreRoomName'), exploreOutcome: $('#exploreOutcome'), exploreIcon: $('#exploreIcon'), outcomeKicker: $('#outcomeKicker'), exploreTitle: $('#exploreTitle'), exploreText: $('#exploreText'), exploreMeta: $('#exploreMeta'), exploreExplanation: $('#exploreExplanation'), exploreContinue: $('#exploreContinueBtn'),
    testDialog: $('#esotericTestDialog'), testGlyph: $('#testGlyph'), testRoomName: $('#testRoomName'), testQuestion: $('#testQuestion'), testAnswers: $('#testAnswers'), testFeedback: $('#testFeedback'), testContinue: $('#testContinueBtn'),
    profileDialog: $('#profileDialog'), profileForm: $('#profileForm'), profileName: $('#heroNameInput'), difficultyDialog: $('#difficultyDialog'),
    storyDialog: $('#storyDialog'), storyClose: $('#storyCloseBtn'), storyContinue: $('#storyContinueBtn'),
    sealDialog: $('#sealDialog'), resultDialog: $('#resultDialog'), winnerAvatar: $('#winnerAvatar'), resultRanking: $('#resultRanking'), victoryParticles: $('#victoryParticles'),
    skullPhaseCard: $('#skullPhaseCard'), skullPhaseIcon: $('#skullPhaseIcon'), skullPhaseTitle: $('#skullPhaseTitle'), skullPhaseText: $('#skullPhaseText'),
    awakeningDialog: $('#awakeningDialog'), awakeningContinue: $('#awakeningContinueBtn'), awakeningStage: $('#awakeningStage'), awakeningFinal: $('#awakeningFinal'), awakeningBell: $('#awakeningBell'), awakeningCaption: $('#awakeningCaption'), sealSkullLife: $('#sealSkullLife'), sealSkullLifeFill: $('#sealSkullLifeFill'),
    itemDialog: $('#itemDialog'), itemDialogClose: $('#itemDialogClose'), itemUseIcon: $('#itemUseIcon'), itemUseTitle: $('#itemUseTitle'), itemUseDescription: $('#itemUseDescription'), itemUseEffect: $('#itemUseEffect'), itemTargetArea: $('#itemTargetArea'), itemUseConfirm: $('#itemUseConfirm')
  };

  function loadSettings() {
    try {
      const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return { soundOn: raw.soundOn !== false, language: LANGS.includes(raw.language) ? raw.language : 'it' };
    } catch {
      return { soundOn: true, language: 'it' };
    }
  }

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function defaultPlayerStatus() {
    return null;
  }

  function createBlockedStatus(source, label) {
    return { source, label, turnsRemaining: BLOCK_MAX_TURNS };
  }

  function blockedTurnsRemaining(player) {
    if (!player.status) return 0;
    const value = Number(player.status.turnsRemaining);
    return Number.isFinite(value) && value > 0 ? Math.min(BLOCK_MAX_TURNS, Math.floor(value)) : BLOCK_MAX_TURNS;
  }

  function blockedStatusText(player) {
    if (!player.status) return t('free');
    const turns = blockedTurnsRemaining(player);
    return `${localizedStatus(player.status.label)} · ${turns} ${langText(turns===1?'turno':'turni',turns===1?'turn':'turns',turns===1?'turno':'turnos',turns===1?'tour':'tours',turns===1?'turno':'turnos')}`;
  }

  function createState() {
    return {
      doom: 0,
      round: 1,
      skullAwake: false,
      skullLife: SKULL_MAX_LIFE,
      skullRoom: 'cripta',
      infestedRooms: [],
      skullMoves: 0,
      skullRoomReturns: {},
      phase: 'playerRoll',
      activePlayer: 0,
      ended: false,
      seals: { raven: false, moon: false, thorn: false },
      clues: { c1: false, c2: false, c3: false },
      loreFound: [],
      inventory: [],
      inventoryReminderRooms: [],
      cardinalTrapsTriggered: {},
      roomSearches: {},
      roomTests: {},
      usedEsotericQuestions: [],
      itemUsedThisTurn: false,
      doubleStepArmed: false,
      lastForcedMove: null,
      logs: [{ strong: t('started'), text: t('directRoom') }],
      difficulty: selectedDifficulty,
      language: currentLanguage,
      players: [
        { id: 'hero', name: profile.name, role: t('roleHero'), avatar: profile.gender === 'female' ? portraits.female : portraits.male, hearts: MAX_COURAGE, pos: 0, alive: true, status: defaultPlayerStatus(), ward: 0 },
        ...botTemplates.slice(0, selectedDifficulty === 'easy' ? 1 : selectedDifficulty === 'medium' ? 2 : 3).map(player => ({ ...player, role: player.id === 'elena' ? t('roleElena') : player.id === 'bianchi' ? t('roleBianchi') : t('roleMarco'), hearts: MAX_COURAGE, pos: 0, alive: true, status: defaultPlayerStatus(), ward: 0 }))
      ]
    };
  }

  function saveState() {
    if (gameActive && state) localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function roomFor(pos) {
    return rooms.find(room => pos >= room.start && pos <= room.end) || rooms[0];
  }

  function footprintPathForRoom(room) {
    return roomFootprintPaths[room.id] || roomFootprintPaths.vestibolo;
  }

  function localIndexInRoom(pos, room) {
    const path = footprintPathForRoom(room);
    if (room.start === room.end) return path.length - 1;
    const progress = Math.max(0, Math.min(1, (pos - room.start) / (room.end - room.start)));
    return Math.round(progress * (path.length - 1));
  }

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function log(text, strong = '') {
    if (!state) return;
    state.logs.unshift({ text, strong });
    state.logs = state.logs.slice(0, 24);
  }

  function dismissToast() {
    clearTimeout(toastTimer);
    const node = document.querySelector('.toast');
    if (!node) return;
    node.classList.remove('show');
    setTimeout(() => node.classList.remove('centered'), 220);
  }

  function toast(message, options = {}) {
    const duration = Math.max(800, Number(options.duration) || 1800);
    const centered = Boolean(options.centered);
    let node = document.querySelector('.toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'toast';
      node.title = t('clickClose');
      node.addEventListener('click', dismissToast);
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.toggle('centered', centered);
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(dismissToast, duration);
  }

  function hideInventoryReminder() {
    clearTimeout(inventoryReminderTimer);
    if (!els.roomInventoryReminder) return;
    els.roomInventoryReminder.classList.remove('show');
    setTimeout(() => { if (!els.roomInventoryReminder.classList.contains('show')) els.roomInventoryReminder.hidden = true; }, 300);
  }

  function maybeShowInventoryReminder(force = false) {
    if (!els.roomInventoryReminder || !gameActive || !state || state.ended || !els.roomDialog.open) return;
    if (state.phase !== 'playerRoll' || state.itemUsedThisTurn || !state.inventory.length) { hideInventoryReminder(); return; }

    if (!Array.isArray(state.inventoryReminderRooms)) state.inventoryReminderRooms = [];
    const roomId = roomFor(state.players[0].pos).id;
    if (state.inventoryReminderRooms.includes(roomId)) return;

    if (!force) {
      if (state.round - lastInventoryReminderRound < 3) return;
      if (Math.random() > 0.38) return;
    }

    state.inventoryReminderRooms.push(roomId);
    lastInventoryReminderRound = state.round;
    const count = state.inventory.length;
    els.roomInventoryReminder.querySelector('strong').textContent = currentLanguage==='it' ? `Hai ${count} oggett${count === 1 ? 'o' : 'i'} nell’inventario.` : currentLanguage==='en' ? `You have ${count} item${count === 1 ? '' : 's'} in your inventory.` : currentLanguage==='es' ? `Tienes ${count} objeto${count === 1 ? '' : 's'} en el inventario.` : currentLanguage==='fr' ? `Vous avez ${count} objet${count === 1 ? '' : 's'} dans l’inventaire.` : `Você tem ${count} ${count === 1 ? 'objeto' : 'objetos'} no inventário.`;
    const reminderSmall = els.roomInventoryReminder.querySelector('small');
    if (reminderSmall) reminderSmall.textContent = t('inventoryReminderHint');
    els.roomInventoryReminder.hidden = false;
    requestAnimationFrame(() => els.roomInventoryReminder.classList.add('show'));
    clearTimeout(inventoryReminderTimer);
    inventoryReminderTimer = setTimeout(hideInventoryReminder, 8200);
    saveState();
  }

  function updateMusicButtons() {
    const label = settings.soundOn ? '🎵 ON' : '🎵 OFF';
    if (els.soundBtn) els.soundBtn.textContent = label;
    if (els.roomMusicBtn) els.roomMusicBtn.textContent = label;
  }

  function loadMusicTrack(index, resetTime = true) {
    if (!els.ambientAudio || !MUSIC_PLAYLIST.length) return;
    musicTrackIndex = ((index % MUSIC_PLAYLIST.length) + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    const nextSrc = MUSIC_PLAYLIST[musicTrackIndex];
    const currentSrc = els.ambientAudio.getAttribute('src');
    if (currentSrc !== nextSrc) {
      els.ambientAudio.setAttribute('src', nextSrc);
      els.ambientAudio.load();
    }
    if (resetTime) {
      try { els.ambientAudio.currentTime = 0; } catch {}
    }
  }

  async function startMusic() {
    if (!gameActive || !settings.soundOn) return;
    if (!els.ambientAudio.getAttribute('src')) loadMusicTrack(musicTrackIndex, false);
    els.ambientAudio.volume = 0.26;
    try { await els.ambientAudio.play(); } catch {}
  }

  function stopMusic(reset = false) {
    els.ambientAudio.pause();
    if (reset) {
      loadMusicTrack(0, true);
    }
  }

  async function playNextMusicTrack() {
    if (!gameActive) return;
    loadMusicTrack(musicTrackIndex + 1, true);
    if (settings.soundOn) {
      els.ambientAudio.volume = 0.26;
      try { await els.ambientAudio.play(); } catch {}
    }
  }

  async function toggleMusic() {
    settings.soundOn = !settings.soundOn;
    saveSettings();
    updateMusicButtons();
    if (settings.soundOn) await startMusic();
    else stopMusic(false);
  }

  function sfx(freq = 300, duration = 0.07) {
    if (!settings.soundOn) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.value = 0.018;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.01);
      setTimeout(() => ctx.close().catch(() => {}), 250);
    } catch {}
  }

  function render() {
    if (!state) return;
    if (els.roomBtn) els.roomBtn.disabled = !gameActive || state.ended;
    renderGameLifecycleButton();
    renderPlayers();
    renderSigils();
    renderInventory();
    renderJournal();
    renderLog();
    renderDoom();
    renderBoard();
    renderPathRooms();
    renderRoom();
    saveState();
  }

  function playerDistanceFromHero(player, index) {
    if (index === 0 || !state?.players?.[0]) return '';
    const hero = state.players[0];
    const stepDistance = Math.abs(player.pos - hero.pos);
    const heroRoomIndex = roomIndexById(roomFor(hero.pos).id);
    const rivalRoomIndex = roomIndexById(roomFor(player.pos).id);
    const roomDistance = Math.abs(rivalRoomIndex - heroRoomIndex);
    const direction = player.pos === hero.pos ? t('sameTile') : rivalRoomIndex === heroRoomIndex ? t('sameRoom') : player.pos > hero.pos ? t('ahead') : t('behind');
    return `<div class="player-distance">↔ ${t('distance')}: <strong>${stepDistance} ${t('steps')}</strong> · ${roomDistance} ${t('rooms')} · ${direction}</div>`;
  }

  function buildPlayerCardsMarkup() {
    return state.players.map((player, i) => `
      <article class="player-card ${i === state.activePlayer && !state.ended ? 'active' : ''} ${player.status ? 'blocked-player' : ''}">
        <div class="portrait-wrap"><img src="${player.avatar}" alt="${player.name}"></div>
        <div>
          <div class="player-name">${player.name}</div>
          <div class="player-role">${player.role}</div>
          <div class="player-pos"><strong>${t('roomLabel')}:</strong> ${localizedRoom(roomFor(player.pos),'name')} · ${player.status ? `⛓ ${localizedStatus(player.status.label)} · ${blockedTurnsRemaining(player)}` : `${t('tileLabel')} ${player.pos}`}</div>
          ${playerDistanceFromHero(player, i)}
        </div>
        <div class="hearts" title="${t('status')} ${player.hearts}/${MAX_COURAGE}">${'❤️'.repeat(Math.max(0, player.hearts))}${'🖤'.repeat(Math.max(0, MAX_COURAGE - player.hearts))}<small>${courageStateLabel(player.hearts)}</small></div>
      </article>`).join('');
  }

  function renderPlayers() {
    const markup = buildPlayerCardsMarkup();
    if (els.players) els.players.innerHTML = markup;
    if (els.roomPlayers) els.roomPlayers.innerHTML = markup;
  }

  function buildSigilsMarkup() {
    return Object.entries(sealDefs).map(([key, value]) => `
      <div class="sigil ${state.seals[key] ? 'found' : ''}"><div class="icon">${value.icon}</div><small>${localizedSealName(key)}</small></div>
    `).join('');
  }

  function renderSigils() {
    const markup = buildSigilsMarkup();
    if (els.sigils) els.sigils.innerHTML = markup;
    if (els.roomSigils) els.roomSigils.innerHTML = markup;
  }

  function buildInventoryMarkup(includeSeals = true) {
    const counts = state.inventory.reduce((map, id) => {
      if (itemDefs[id]) map[id] = (map[id] || 0) + 1;
      return map;
    }, {});
    const cards = Object.entries(counts).map(([id, count]) => {
      const item = itemDefs[id];
      return `<article class="inventory-card">
        <div class="inventory-card-icon">${item.icon}</div>
        <div class="inventory-card-copy"><strong>${localizedItem(id,'name')}</strong><small>${localizedItem(id,'effect')}</small></div>
        <div class="inventory-card-action"><span class="item-count">×${count}</span><button type="button" class="inventory-use-btn" data-item-id="${id}" ${!gameActive || state.ended || state.phase !== 'playerRoll' || state.itemUsedThisTurn ? 'disabled' : ''}>${t('itemUse')}</button></div>
      </article>`;
    });
    if (includeSeals) {
      Object.entries(state.seals).forEach(([key, found]) => {
        if (found) cards.push(`<article class="inventory-card seal-inventory-card"><div class="inventory-card-icon">${sealDefs[key].icon}</div><div class="inventory-card-copy"><strong>${t('sealsTitle').replace(/s$/i,'')} ${localizedSealName(key)}</strong><small>${t('ritualObjectCopy')}</small></div><div class="item-count">${t('rite')}</div></article>`);
      });
    }
    return cards.length ? cards.join('') : `<span class="empty">${includeSeals ? t('noItems') : t('noneConsumable')}</span>`;
  }

  function renderInventory() {
    if (els.inventory) els.inventory.innerHTML = buildInventoryMarkup(true);
    if (els.roomInventory) els.roomInventory.innerHTML = buildInventoryMarkup(false);
  }



  function setNodeText(selector, value) { const node = document.querySelector(selector); if (node) node.textContent = value; }

  function applyLanguage(language = currentLanguage, rerender = true) {
    currentLanguage = LANGS.includes(language) ? language : 'it';
    settings.language = currentLanguage;
    saveSettings();
    document.documentElement.lang = currentLanguage;
    document.title = `${t('gameTitle')} — Demo v1.23`;
    const versionNode = document.querySelector('#versionLabel');
    if (versionNode) versionNode.textContent = `DEMO OFFLINE · ${langText('VERSIONE','VERSION','VERSIÓN','VERSION','VERSÃO')} 1.23`;
    if (els.languageSelect) els.languageSelect.value = currentLanguage;
    if (els.languageSelectTop) els.languageSelectTop.value = currentLanguage;
    setNodeText('#languageLabel', t('language')); setNodeText('#startTitle', t('startTitle')); setNodeText('#startCopy', t('startCopy')); setNodeText('#startGameBtn', t('start')); setNodeText('#startNote', t('startNote'));
    setNodeText('#storyTitle', t('storyTitle')); setNodeText('#storyP1', t('storyP1')); setNodeText('#storyP2', t('storyP2')); setNodeText('#storyP3', t('storyP3')); setNodeText('#storyRule', t('storyRule')); setNodeText('#storyContinueBtn', t('storyContinue'));
    setNodeText('#profileTitle', t('profileTitle')); setNodeText('#profileCopy', t('profileCopy')); setNodeText('#profileNameLabel', t('name')); setNodeText('#maleAvatarLabel', t('male')); setNodeText('#femaleAvatarLabel', t('female')); setNodeText('#profileSaveBtn', t('profileNext'));
    setNodeText('#difficultyEyebrow', t('difficulty')); setNodeText('#difficultyTitle', t('difficultyTitle')); setNodeText('#difficultyCopy', t('difficultyCopy')); setNodeText('#difficultyEasyTitle', t('easy')); setNodeText('#difficultyEasyText', t('easyText')); setNodeText('#difficultyMediumTitle', t('medium')); setNodeText('#difficultyMediumText', t('mediumText')); setNodeText('#difficultyHardTitle', t('hard')); setNodeText('#difficultyHardText', t('hardText'));
    setNodeText('#movementRules', t('moveRules')); setNodeText('#difficultyStatLabel', t('difficulty')); setNodeText('.room-movement-card .small-label', t('movement')); setNodeText('.manor-die small', t('roll')); setNodeText('#roomPathBtn', t('path')); setNodeText('#roomRitualAnchorBtn', t('ritualItems')); setNodeText('#roomInventoryAnchorBtn', t('inventory')); setNodeText('#missionSummaryCopy', t('missionSummary'));
    if (els.roomMinimizeBtn) { const label=t('minimize').replace(/^[^A-Za-zÀ-ÿ]+\s*/, ''); els.roomMinimizeBtn.setAttribute('aria-label', label); els.roomMinimizeBtn.title=label; }
    const sideHeads = document.querySelectorAll('.room-side-card .section-head h3'); if (sideHeads[0]) sideHeads[0].textContent=t('gameState'); if (sideHeads[1]) sideHeads[1].textContent=t('explorers'); if (sideHeads[2]) sideHeads[2].textContent=t('ritualItems').replace(/^🪶\s*/, ''); if (sideHeads[3]) sideHeads[3].textContent=t('inventory').replace(/^🎒\s*/, '');
    const tiny = document.querySelectorAll('.room-side-card .section-head .tiny-note'); if (tiny[0]) tiny[0].textContent=t('alwaysVisible'); if (tiny[1]) tiny[1].textContent=t('heartsPosition'); if (tiny[3]) tiny[3].textContent=t('useOne');
    const stats=document.querySelectorAll('.room-side-stat span'); if(stats[0])stats[0].textContent=`💀 ${t('awakening')}`; if(stats[1])stats[1].textContent=`🔔 ${t('round')}`; if(stats[2])stats[2].textContent=`💀 ${t('skullLife')}`; if(stats[3])stats[3].textContent=`⛓️ ${t('status')}`;
    setNodeText('#testEyebrow', t('testEyebrow')); setNodeText('#testTitleStatic', t('testTitle')); setNodeText('#testCopyStatic', t('testCopy')); setNodeText('#testWarningStatic', t('testWarning')); setNodeText('#testContinueBtn', t('continue'));
    setNodeText('#storyBtn', t('story')); setNodeText('#pathBtn', t('path')); setNodeText('#roomBtn', t('room'));
    if (els.roomSealBtn) els.roomSealBtn.textContent = `⚰️ ${t('finalRite')}`;
    ['raven','moon','thorn'].forEach(key => { const btn = document.querySelector(`#sealButton-${key}`); if (btn) btn.textContent = `${sealDefs[key].icon} ${localizedSealName(key)}`; });
    if (els.testAwakeningBtn) els.testAwakeningBtn.textContent = currentLanguage==='it'?'🧪 TEST XII':currentLanguage==='en'?'🧪 TEST XII':currentLanguage==='es'?'🧪 PRUEBA XII':currentLanguage==='fr'?'🧪 TEST XII':'🧪 TESTE XII';
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => { node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder)); });
    document.querySelectorAll('[data-i18n-title]').forEach(node => { node.setAttribute('title', t(node.dataset.i18nTitle)); });
    if (state) {
      state.language=currentLanguage;
      state.players.forEach((p,i)=>{ p.role = i===0?t('roleHero'):p.id==='elena'?t('roleElena'):p.id==='bianchi'?t('roleBianchi'):t('roleMarco'); });
    }
    updateMusicButtons();
    renderGameLifecycleButton();
    if (rerender && state) render();
  }

  function renderGameLifecycleButton() {
    const button = $('#newGameBtn');
    if (!button) return;
    if (gameActive && state && !state.ended) {
      button.textContent = t('endGame');
      button.classList.add('terminate-game');
      button.title = currentLanguage==='it'?'Termina la partita corrente e torna alla schermata iniziale':currentLanguage==='en'?'End the current game and return to the start screen':currentLanguage==='es'?'Termina la partida actual y vuelve a la pantalla inicial':currentLanguage==='fr'?'Terminer la partie en cours et revenir à l’écran initial':'Encerrar o jogo atual e voltar à tela inicial';
    } else {
      button.textContent = t('newGame');
      button.classList.remove('terminate-game');
      button.title = currentLanguage==='it'?'Avvia una nuova partita':currentLanguage==='en'?'Start a new game':currentLanguage==='es'?'Iniciar una nueva partida':currentLanguage==='fr'?'Commencer une nouvelle partie':'Iniciar um novo jogo';
    }
    if (els.testAwakeningBtn) els.testAwakeningBtn.disabled = !gameActive || !state || state.ended;
  }

  function inventoryCount(itemId) {
    return state.inventory.filter(id => id === itemId).length;
  }

  function consumeInventoryItem(itemId) {
    const index = state.inventory.indexOf(itemId);
    if (index < 0) return false;
    state.inventory.splice(index, 1);
    return true;
  }

  function openItemDialog(itemId) {
    if (!gameActive || state.ended || state.phase !== 'playerRoll' || state.itemUsedThisTurn) {
      toast(state.itemUsedThisTurn ? t('alreadyUsedItem') : t('useItemAtTurnStart'));
      return;
    }
    const item = itemDefs[itemId];
    if (!item || inventoryCount(itemId) < 1) return;
    pendingItemId = itemId;
    pendingItemTarget = null;
    els.itemUseConfirm.dataset.mode = 'use';
    els.itemUseEffect.classList.remove('applied', 'not-applied');
    els.itemUseIcon.textContent = item.icon;
    els.itemUseTitle.textContent = localizedItem(itemId,'name');
    els.itemUseDescription.textContent = localizedItem(itemId,'effect');
    els.itemUseEffect.textContent = item.target === 'rival' ? t('itemTargetChoose') : t('itemTargetSelf');
    if (item.target === 'rival') {
      const rivals = state.players.map((player, index) => ({ player, index })).filter(({ player, index }) => index > 0 && player.alive);
      els.itemTargetArea.innerHTML = rivals.map(({ player, index }) => `<button type="button" class="item-target-btn" data-target-index="${index}"><img src="${player.avatar}" alt="${player.name}"><span><strong>${player.name}</strong><small>${localizedRoom(roomFor(player.pos),'name')} · ${t('tileLabel')} ${player.pos}${player.status ? ` · ⛓ ${t('blocked')}` : ''}</small></span></button>`).join('');
      els.itemUseConfirm.disabled = true;
      els.itemUseConfirm.textContent = t('selectRival');
    } else {
      els.itemTargetArea.innerHTML = '';
      els.itemUseConfirm.disabled = false;
      els.itemUseConfirm.textContent = `${t('itemUse')} ${localizedItem(itemId,'name')}`;
    }
    if (!els.itemDialog.open) els.itemDialog.showModal();
  }

  function selectItemTarget(index) {
    const player = state.players[index];
    if (!player || index === 0 || !player.alive) return;
    pendingItemTarget = index;
    els.itemTargetArea.querySelectorAll('.item-target-btn').forEach(button => button.classList.toggle('selected', Number(button.dataset.targetIndex) === index));
    els.itemUseConfirm.disabled = false;
    els.itemUseConfirm.textContent = t('useOn',{name:player.name});
  }

  function pushSkullTowardCrypt() {
    const currentIndex = rooms.findIndex(room => room.id === state.skullRoom);
    if (currentIndex < 0) return false;
    if (currentIndex < rooms.length - 1) {
      state.skullRoom = rooms[currentIndex + 1].id;
      infestRoom(state.skullRoom);
      return true;
    }
    const removable = state.infestedRooms.filter(id => id !== 'cripta');
    if (removable.length) {
      const cleansed = removable[0];
      state.infestedRooms = state.infestedRooms.filter(id => id !== cleansed);
      return true;
    }
    return false;
  }

  function applyInventoryItem(itemId, targetIndex = null) {
    const item = itemDefs[itemId];
    const hero = state.players[0];
    const itemName = item ? localizedItem(itemId,'name') : '';
    if (!item || inventoryCount(itemId) < 1 || !gameActive || state.ended || state.phase !== 'playerRoll' || state.itemUsedThisTurn) {
      return { applied:false, message:langText("L’oggetto non può essere usato in questo momento.","The item cannot be used right now.","El objeto no puede usarse en este momento.","L’objet ne peut pas être utilisé pour le moment.","O objeto não pode ser usado neste momento.") };
    }
    let applied = true;
    let message = '';

    switch (itemId) {
      case 'candle':
      case 'amulet':
        if (hero.ward > 0) { applied=false; message=langText('Hai già una protezione attiva.','You already have active protection.','Ya tienes una protección activa.','Vous avez déjà une protection active.','Você já tem uma proteção ativa.'); break; }
        hero.ward = 1;
        message = langText(`${itemName}: la prossima Trappola o il prossimo Imprevisto verrà annullato.`,`${itemName}: the next Trap or Event will be cancelled.`,`${itemName}: la próxima Trampa o el próximo Imprevisto quedará anulado.`,`${itemName} : le prochain Piège ou Imprévu sera annulé.`,`${itemName}: a próxima Armadilha ou o próximo Imprevisto será cancelado.`);
        break;
      case 'salt': {
        const roomId=roomFor(hero.pos).id, roomName=localizedRoom(roomFor(hero.pos),'name');
        if (state.skullAwake && state.infestedRooms.includes(roomId)) {
          state.infestedRooms=state.infestedRooms.filter(id=>id!==roomId);
          message=langText(`Il cerchio di sale purifica ${roomName}.`,`The circle of salt purifies ${roomName}.`,`El círculo de sal purifica ${roomName}.`,`Le cercle de sel purifie ${roomName}.`,`O círculo de sal purifica ${roomName}.`);
        } else if (hero.ward===0) {
          hero.ward=1;
          message=langText('Il sale traccia un cerchio protettivo: il prossimo pericolo verrà annullato.','The salt draws a protective circle: the next danger will be cancelled.','La sal traza un círculo protector: el próximo peligro quedará anulado.','Le sel trace un cercle protecteur : le prochain danger sera annulé.','O sal traça um círculo protetor: o próximo perigo será cancelado.');
        } else { applied=false; message=langText('La stanza non è infestata e hai già una protezione attiva.','The room is not haunted and you already have active protection.','La sala no está infestada y ya tienes una protección activa.','La pièce n’est pas hantée et vous avez déjà une protection active.','O cômodo não está infestado e você já tem uma proteção ativa.'); }
        break;
      }
      case 'key': {
        const before=hero.pos, roomBefore=roomFor(hero.pos);
        hero.pos=Math.min(LAST_TILE,hero.pos+4);
        const roomAfter=roomFor(hero.pos);
        if (roomBefore.id!==roomAfter.id) ringBellForRoomChange(roomBefore,roomAfter,langText('La scorciatoia della Chiave attraversa una nuova soglia.','The Key shortcut crosses a new threshold.','El atajo de la Llave cruza un nuevo umbral.','Le raccourci de la Clé franchit un nouveau seuil.','O atalho da Chave atravessa um novo limiar.'));
        state.lastForcedMove={playerIndex:0,from:before,to:hero.pos,itemId,round:state.round};
        message=langText(`La chiave apre un passaggio secondario: avanzi dalla casella ${before} alla ${hero.pos}.`,`The key opens a secondary passage: you move from space ${before} to ${hero.pos}.`,`La llave abre un pasaje secundario: avanzas de la casilla ${before} a la ${hero.pos}.`,`La clé ouvre un passage secondaire : vous avancez de la case ${before} à la case ${hero.pos}.`,`A chave abre uma passagem secundária: você avança da casa ${before} para a ${hero.pos}.`);
        if(hero.pos===LAST_TILE && Object.values(state.seals).every(Boolean) && !hero.status) state.phase='playerRitual';
        break;
      }
      case 'mirror': {
        const target=state.players[targetIndex];
        if(!target||targetIndex===0||!target.alive){applied=false;message=langText('Scegli un rivale valido.','Choose a valid rival.','Elige un rival válido.','Choisissez un rival valide.','Escolha um rival válido.');break;}
        const from=target.pos, roomBefore=roomFor(from), roomName=localizedRoom(roomBefore,'name');
        const moved=returnToRoomStart(target);
        if(moved){state.lastForcedMove={playerIndex:targetIndex,from,to:target.pos,itemId,round:state.round};message=langText(`Lo Specchio annerito risucchia ${target.name} all’inizio di ${roomName}: casella ${from} → ${target.pos}.`,`The blackened mirror drags ${target.name} back to the start of ${roomName}: space ${from} → ${target.pos}.`,`El espejo ennegrecido arrastra a ${target.name} al inicio de ${roomName}: casilla ${from} → ${target.pos}.`,`Le miroir noirci ramène ${target.name} au début de ${roomName} : case ${from} → ${target.pos}.`,`O espelho escurecido puxa ${target.name} de volta ao início de ${roomName}: casa ${from} → ${target.pos}.`);} else {applied=false;message=langText(`${target.name} è già sulla prima casella di ${roomName}.`,`${target.name} is already on the first space of ${roomName}.`,`${target.name} ya está en la primera casilla de ${roomName}.`,`${target.name} est déjà sur la première case de ${roomName}.`,`${target.name} já está na primeira casa de ${roomName}.`);}
        break;
      }
      case 'eye': {
        const result=recordLoreClue(hero);
        if(!result){applied=false;message=langText('Hai già decifrato tutti i frammenti esoterici.','You have already deciphered every esoteric fragment.','Ya has descifrado todos los fragmentos esotéricos.','Vous avez déjà déchiffré tous les fragments ésotériques.','Você já decifrou todos os fragmentos esotéricos.');break;}
        message=langText(`L’Occhio di vetro rivela “${result.title}”. Il frammento è stato aggiunto al Codice esoterico.`,`The Glass Eye reveals “${result.title}”. The fragment has been added to the Esoteric Code.`,`El Ojo de vidrio revela «${result.title}». El fragmento se ha añadido al Código esotérico.`,`L’Œil de verre révèle « ${result.title} ». Le fragment a été ajouté au Code ésotérique.`,`O Olho de vidro revela “${result.title}”. O fragmento foi adicionado ao Código esotérico.`);
        break;
      }
      case 'rosary':
        if(hero.hearts>=MAX_COURAGE){applied=false;message=t('courageFull');break;}
        hero.hearts=Math.min(MAX_COURAGE,hero.hearts+2);
        message=langText('Il Rosario spezzato ti restituisce fino a 2 punti Coraggio.','The Broken Rosary restores up to 2 Courage.','El Rosario roto recupera hasta 2 puntos de Coraje.','Le Rosaire brisé rend jusqu’à 2 points de Courage.','O Rosário quebrado recupera até 2 pontos de Coragem.');
        break;
      case 'coin': {
        const target=state.players[targetIndex];
        if(!target||targetIndex===0||!target.alive){applied=false;message=langText('Scegli un rivale valido.','Choose a valid rival.','Elige un rival válido.','Choisissez un rival valide.','Escolha um rival válido.');break;}
        target.status=createBlockedStatus('item','Richiamo della Moneta Vesper');
        message=langText(`${target.name} resta ammaliato dalla Moneta Vesper: bloccato per massimo 2 turni.`,`${target.name} is mesmerized by the Vesper Coin: blocked for up to 2 turns.`,`${target.name} queda fascinado por la Moneda Vesper: bloqueado durante un máximo de 2 turnos.`,`${target.name} est fasciné par la Pièce Vesper : bloqué pendant 2 tours maximum.`,`${target.name} fica hipnotizado pela Moeda Vesper: bloqueado por no máximo 2 turnos.`);
        break;
      }
      case 'amber':
        if(hero.status){hero.status=null;message=langText('La Fiala d’ambra spezza immediatamente il blocco.','The Amber Vial immediately breaks the block.','El Vial de ámbar rompe inmediatamente el bloqueo.','La Fiole d’ambre brise immédiatement le blocage.','O Frasco de âmbar quebra imediatamente o bloqueio.');}
        else if(hero.hearts<MAX_COURAGE){hero.hearts++;message=langText('La Fiala d’ambra restituisce 1 punto Coraggio.','The Amber Vial restores 1 Courage.','El Vial de ámbar recupera 1 punto de Coraje.','La Fiole d’ambre rend 1 point de Courage.','O Frasco de âmbar recupera 1 ponto de Coragem.');}
        else {applied=false;message=langText('Non sei bloccato e il tuo Coraggio è già al massimo.','You are not blocked and your Courage is already at maximum.','No estás bloqueado y tu Coraje ya está al máximo.','Vous n’êtes pas bloqué et votre Courage est déjà au maximum.','Você não está bloqueado e sua Coragem já está no máximo.');}
        break;
      case 'feather': {
        const target=state.players[targetIndex];
        if(!target||targetIndex===0||!target.alive){applied=false;message=langText('Scegli un rivale valido.','Choose a valid rival.','Elige un rival válido.','Choisissez un rival valide.','Escolha um rival válido.');break;}
        const from=target.pos,moved=moveBack(target,4);
        if(moved){state.lastForcedMove={playerIndex:targetIndex,from,to:target.pos,itemId,round:state.round};message=langText(`Uno stormo invisibile costringe ${target.name} ad arretrare di ${moved} caselle: ${from} → ${target.pos}.`,`An invisible flock forces ${target.name} back ${moved} spaces: ${from} → ${target.pos}.`,`Una bandada invisible obliga a ${target.name} a retroceder ${moved} casillas: ${from} → ${target.pos}.`,`Une nuée invisible force ${target.name} à reculer de ${moved} cases : ${from} → ${target.pos}.`,`Um bando invisível força ${target.name} a recuar ${moved} casas: ${from} → ${target.pos}.`);} else {applied=false;message=langText(`${target.name} non può arretrare ulteriormente.`,`${target.name} cannot move back any farther.`,`${target.name} no puede retroceder más.`,`${target.name} ne peut pas reculer davantage.`,`${target.name} não pode recuar mais.`);}
        break;
      }
      case 'talisman':
        if (state.doubleStepArmed) {
          applied = false;
          message = langText('Il Talismano di Mercurio è già carico.','The Mercury Talisman is already charged.','El Talismán de Mercurio ya está cargado.','Le Talisman de Mercure est déjà chargé.','O Talismã de Mercúrio já está carregado.');
          break;
        }
        state.doubleStepArmed = true;
        message = langText('Il Talismano di Mercurio è attivo: il prossimo tiro 1–5 raddoppierà i passi. Se esce ☠, la carica resta attiva.','The Mercury Talisman is active: the next 1–5 roll will double your movement. If ☠ appears, the charge remains active.','El Talismán de Mercurio está activo: la próxima tirada 1–5 duplicará tus pasos. Si aparece ☠, la carga permanece activa.','Le Talisman de Mercure est actif : le prochain résultat 1–5 doublera votre déplacement. Si ☠ apparaît, la charge reste active.','O Talismã de Mercúrio está ativo: a próxima rolagem 1–5 dobrará seus passos. Se sair ☠, a carga continua ativa.');
        break;
      case 'bell':
        if(state.skullAwake){applied=pushSkullTowardCrypt();const roomName=localizedRoom(skullRoomDef(),'name');message=applied?langText(`La Campanella muta respinge il Teschio verso la Cripta. Ora si trova in ${roomName}.`,`The Silent Bell pushes the Skull toward the Crypt. It is now in ${roomName}.`,`La Campanilla muda empuja al Cráneo hacia la Cripta. Ahora está en ${roomName}.`,`La Clochette muette repousse le Crâne vers la Crypte. Il se trouve maintenant dans ${roomName}.`,`O Sino mudo empurra o Crânio em direção à Cripta. Agora ele está em ${roomName}.`):langText('La Campanella vibra, ma il Teschio non può essere respinto oltre.','The Bell vibrates, but the Skull cannot be pushed any farther.','La Campanilla vibra, pero el Cráneo no puede ser empujado más.','La Clochette vibre, mais le Crâne ne peut pas être repoussé davantage.','O Sino vibra, mas o Crânio não pode ser empurrado mais.');}
        else if(state.doom>0){state.doom--;message=langText('Un rintocco viene cancellato. Il Risveglio del Teschio arretra di 1.','One toll is cancelled. The Skull Awakening moves back by 1.','Se cancela una campanada. El Despertar del Cráneo retrocede 1.','Un coup est annulé. L’Éveil du Crâne recule de 1.','Um toque é cancelado. O Despertar do Crânio recua 1.');}
        else {applied=false;message=langText('Nessun rintocco può essere cancellato in questo momento.','No toll can be cancelled right now.','No se puede cancelar ninguna campanada en este momento.','Aucun coup ne peut être annulé pour le moment.','Nenhum toque pode ser cancelado neste momento.');}
        break;
      default: applied=false; message=langText('Questo oggetto non può essere usato.','This item cannot be used.','Este objeto no puede usarse.','Cet objet ne peut pas être utilisé.','Este objeto não pode ser usado.');
    }
    if(!applied) return {applied:false,message};
    consumeInventoryItem(itemId); state.itemUsedThisTurn=true;
    log(message, `${hero.name}: ${item.icon} ${itemName}.`);
    render();
    return {applied:true,message};
  }

  function showItemUseResult(result) {
    const applied = Boolean(result && result.applied);
    const raw = result && result.message ? result.message : '';
    const message = raw ? localizeRuntimeText(raw, 'meta') : (currentLanguage === 'it' ? 'Nessun effetto applicato.' : currentLanguage === 'en' ? 'No effect was applied.' : currentLanguage === 'es' ? 'No se aplicó ningún efecto.' : currentLanguage === 'fr' ? 'Aucun effet n’a été appliqué.' : 'Nenhum efeito foi aplicado.');
    els.itemUseEffect.textContent = applied ? `✓ ${message}` : `⚠ ${message}`;
    els.itemUseEffect.classList.toggle('applied', applied);
    els.itemUseEffect.classList.toggle('not-applied', !applied);
    els.itemTargetArea.innerHTML = '';
    els.itemUseConfirm.disabled = false;
    els.itemUseConfirm.textContent = t('close');
    els.itemUseConfirm.dataset.mode = 'close';
  }

  function closeItemDialog() {
    pendingItemId = null;
    pendingItemTarget = null;
    els.itemUseConfirm.dataset.mode = 'use';
    els.itemUseEffect.classList.remove('applied', 'not-applied');
    if (els.itemDialog.open) els.itemDialog.close();
  }

  function confirmItemUse() {
    if (els.itemUseConfirm.dataset.mode === 'close') {
      closeItemDialog();
      return;
    }
    if (!pendingItemId) return;
    const item = itemDefs[pendingItemId];
    if (item.target === 'rival' && pendingItemTarget == null) return;
    const result = applyInventoryItem(pendingItemId, pendingItemTarget);
    showItemUseResult(result);
  }

  function renderJournal() {
    const lore = state.loreFound.slice(-10).reverse().map(id => loreClues.find(clue => clue.id === id)).filter(Boolean);
    els.journal.innerHTML = lore.length ? lore.map(clue => `
      <article class="journal-entry unlocked lore-entry alchemy-entry">
        <div class="alchemy-sigil"><span>${clue.symbol}</span></div>
        <div class="alchemy-copy">
          <strong>${localizedLoreTitle(clue)}</strong>
          <small>${clue.latin}</small>
          <p class="alchemy-lore-text">${localizedLoreField(clue,'text')}</p>
          <div class="alchemy-explanation"><b>${t('trueMeaning')}</b>${localizedLoreField(clue,'explanation')}</div>
        </div>
      </article>`).join('') : `<div class="journal-entry locked">${t('noLore')}</div>`;
  }

  function renderLog() {
    els.log.innerHTML = state.logs.map(entry => `<div class="event-entry">${entry.strong ? `<strong>${localizeRuntimeText(entry.strong,'log')}</strong> ` : ''}${localizeRuntimeText(entry.text,'log')}</div>`).join('');
  }

  function bellRoundsRemaining() {
    const completed = state.round - 1;
    const mod = completed % BELL_EVERY_ROUNDS;
    return mod === 0 ? BELL_EVERY_ROUNDS : BELL_EVERY_ROUNDS - mod;
  }

  function renderDoom() {
    els.doomLabel.textContent = `${state.doom} / ${MAX_DOOM}`;
    els.doomFill.style.width = `${Math.min(100, (state.doom / MAX_DOOM) * 100)}%`;
    if (state.skullAwake) {
      const skullRoom = skullRoomDef();
      els.bellProgress.textContent = `${t('awakening')} XII · 💀 ${localizedRoom(skullRoom,'name')} · ${state.infestedRooms.length} ${t('rooms')}`;
      els.skullPhaseCard?.classList.remove('sleeping');
      els.skullPhaseCard?.classList.add('awake');
      if (els.skullPhaseIcon) els.skullPhaseIcon.textContent = '👻';
      if (els.skullPhaseTitle) els.skullPhaseTitle.textContent = t('skullFreeLife',{life:state.skullLife,max:SKULL_MAX_LIFE});
      if (els.skullPhaseText) els.skullPhaseText.textContent = `💀 ${localizedRoom(skullRoom,'name')}`;
    } else {
      els.bellProgress.textContent = `🔔 ${state.doom}/${MAX_DOOM}`;
      els.skullPhaseCard?.classList.add('sleeping');
      els.skullPhaseCard?.classList.remove('awake');
      if (els.skullPhaseIcon) els.skullPhaseIcon.textContent = '💀';
      if (els.skullPhaseTitle) els.skullPhaseTitle.textContent = t('skullSleeping');
      if (els.skullPhaseText) els.skullPhaseText.textContent = t('skullDormantText');
    }
    els.roomDoomLabel.textContent = `${state.doom} / ${MAX_DOOM}`;
    els.roomRoundLabel.textContent = `${state.round}`;
    if (els.roomSkullLifeLabel) els.roomSkullLifeLabel.textContent = `${state.skullLife} / ${SKULL_MAX_LIFE}`;
    if (els.sealSkullLife) els.sealSkullLife.textContent = `${state.skullLife} / ${SKULL_MAX_LIFE}`;
    if (els.sealSkullLifeFill) els.sealSkullLifeFill.style.width = `${Math.max(0, state.skullLife / SKULL_MAX_LIFE * 100)}%`;
  }

  function renderBoard() {
    els.board.innerHTML = tiles.map(sourceTile => {
      const tile = effectiveTileForDifficulty(sourceTile);
      const tokens = state.players.map((player, i) => player.alive && player.pos === tile.id
        ? `<span class="token p${i} ${state.lastForcedMove && state.lastForcedMove.playerIndex === i && state.lastForcedMove.to === tile.id ? 'forced-move-token' : ''}" title="${player.name}" aria-label="${player.name}"></span>`
        : '').join('');
      const forcedTile = state.lastForcedMove && state.lastForcedMove.to === tile.id;
      return `
        <button type="button" class="tile path-position-tile ${tile.type} ${state.players[0].pos === tile.id ? 'current-human' : ''} ${forcedTile ? 'forced-move-tile' : ''}" data-tile-id="${tile.id}" title="${t('positionDetail')} · ${t('tile')} ${tile.id}">
          <span class="tile-number">${String(tile.id).padStart(2, '0')}</span>
          <span class="tile-icon">${tile.icon}</span>
          <span class="tile-name">${localizedTileName(tile)}</span>
          <div class="tokens">${tokens}</div>
        </button>`;
    }).join('');
  }

  function plainDistanceFromHero(player, index) {
    if (index === 0) return t('sameTile');
    const hero = state.players[0];
    const steps = Math.abs(player.pos - hero.pos);
    const heroRoomIndex = roomIndexById(roomFor(hero.pos).id);
    const playerRoomIndex = roomIndexById(roomFor(player.pos).id);
    const roomsAway = Math.abs(playerRoomIndex - heroRoomIndex);
    const direction = player.pos === hero.pos ? t('sameTile') : playerRoomIndex === heroRoomIndex ? t('sameRoom') : player.pos > hero.pos ? t('ahead') : t('behind');
    return `${steps} ${t('steps')} · ${roomsAway} ${t('rooms')} · ${direction}`;
  }

  function openPositionDialog(tileId) {
    const sourceTile = tiles[Number(tileId)];
    const tile = effectiveTileForDifficulty(sourceTile);
    if (!tile || !els.positionDialog) return;
    const room = roomFor(tile.id);
    const occupants = state.players.map((player, index) => ({ player, index })).filter(({ player }) => player.alive && player.pos === tile.id);
    els.positionDialogTitle.textContent = `${t('position')} ${tile.id} · ${localizedTileName(tile)}`;
    els.positionDialogMeta.textContent = `${tile.icon} ${localizedTileName(tile)} · ${localizedRoom(room,'name')} · ${tile.id}/${LAST_TILE}`;
    els.positionDialogOccupants.innerHTML = occupants.length ? occupants.map(({ player, index }) => `
      <article class="position-occupant ${index === 0 ? 'hero' : ''}">
        <img src="${player.avatar}" alt="${player.name}">
        <div><strong>${player.name}</strong><span>${player.role}</span><small>${index === 0 ? `${t('position')} · ${localizedRoom(room,'name')}` : `${t('distance')}: ${plainDistanceFromHero(player, index)}`}</small></div>
        <span class="position-token token p${index}" aria-hidden="true"></span>
      </article>`).join('') : `<p class="empty">${t('nobody')}</p>`;
    if (!els.positionDialog.open) els.positionDialog.showModal();
  }

  function renderPathRooms() {
    els.pathRoomStrip.innerHTML = rooms.map(room => {
      const occupants = state.players.filter(player => player.alive && player.pos >= room.start && player.pos <= room.end);
      const current = state.players[0].pos >= room.start && state.players[0].pos <= room.end;
      const infested = state.skullAwake && state.infestedRooms.includes(room.id);
      const skullHere = state.skullAwake && state.skullRoom === room.id;
      return `
        <div class="path-room-card ${current ? 'current' : ''} ${infested ? 'infested' : ''} ${skullHere ? 'skull-here' : ''}">
          <img src="${room.img}" alt="${localizedRoom(room,'name')}">
          <div class="path-room-card-shade"></div>
          ${infested ? `<div class="infested-badge">${t('hauntedRoom')}</div>` : ''}
          ${skullHere ? `<div class="skull-room-badge">💀 ${t('skullLabel')}</div>` : ''}
          <div class="path-room-card-copy">
            <span>${room.start === room.end ? room.start : `${room.start}–${room.end}`}</span>
            <strong>${localizedRoom(room,'name')}</strong>
            <small>${occupants.length ? occupants.map(p => p.name).join(', ') : t('nobody')}</small>
          </div>
        </div>`;
    }).join('');
    const legendEntries = document.querySelectorAll('.path-legend > span');
    legendEntries.forEach((entry, i) => { entry.hidden = i >= state.players.length; });
  }

  function renderFootprints(room) {
    const hero = state.players[0];
    const path = footprintPathForRoom(room);
    const focusIndex = localIndexInRoom(hero.pos, room);
    els.footprintsLayer.innerHTML = path.map((fp, i) => `
      <span class="footstep ${i === focusIndex ? 'active' : ''}" style="left:${fp.x}%;top:${fp.y}%;--rot:${fp.r}deg">👣</span>
    `).join('');
  }

  function renderCharacters(room) {
    const visible = state.players.map((player, i) => ({ player, i })).filter(({ player }) => player.alive && player.pos >= room.start && player.pos <= room.end);
    const path = footprintPathForRoom(room);
    const skullHere = state.skullAwake && state.skullRoom === room.id;
    els.charactersLayer.innerHTML = visible.map(({ player, i }) => {
      const fp = path[localIndexInRoom(player.pos, room)];
      const offsetX = (i - 1.5) * 2.3;
      const offsetY = (i % 2) * 3.1;
      return `
        <div class="room-character ${i === 0 ? 'human' : `bot${i}`} ${player.status ? 'character-blocked' : ''}" style="left:${fp.x + offsetX}%;top:${fp.y - offsetY}%">
          <img src="${player.avatar}" alt="${player.name}"><span>${player.name}${player.status ? ' ⛓' : ''}</span>
        </div>`;
    }).join('') + (skullHere ? `<div class="room-skull-entity"><span>💀</span><b>${t('skullLabel')}</b></div>` : '');
  }

  function renderRoom(message = null) {
    if (!state) return;
    const hero = state.players[0];
    const room = roomFor(hero.pos);
    els.dialogRoomImage.src = room.img;
    els.dialogRoomKicker.textContent = localizedRoom(room, 'kicker');
    els.dialogRoomName.textContent = localizedRoom(room, 'name');
    els.dialogRoomHint.textContent = localizedRoom(room, 'hint');
    const infested = state.skullAwake && state.infestedRooms.includes(room.id);
    const skullHere = state.skullAwake && state.skullRoom === room.id;
    els.dialogRoomFlavor.textContent = skullHere ? `💀 ${localizedRoom(room,'flavor')}` : infested ? `👻 ${localizedRoom(room,'flavor')}` : localizedRoom(room,'flavor');
    const canvas = $('#roomCanvas');
    if (canvas) {
      canvas.classList.toggle('infested-room', infested);
      canvas.classList.toggle('skull-present', skullHere);
    }
    if (message) els.dialogMoveText.textContent = localizeRuntimeText(message,'meta');
    else if (state.phase === 'bots') els.dialogMoveText.textContent = t('botsPlaying');
    else if (state.phase === 'playerRitual') els.dialogMoveText.textContent = t('coffinAwaits');
    else if (hero.status) {
      const turns = blockedTurnsRemaining(hero);
      els.dialogMoveText.textContent = t('blockedAuto',{turns});
    } else els.dialogMoveText.textContent = t('rollPrompt');

    els.dialogStatusText.textContent = hero.status ? blockedStatusText(hero) : skullHere ? '⚠️ 💀' : infested ? '👻' : t('noBlock');
    els.roomStatusLabel.textContent = hero.status ? `${localizedStatus(hero.status.label)} (${blockedTurnsRemaining(hero)})` : t('free');
    const difficultyNode = $('#roomDifficultyLabel');
    if (difficultyNode) difficultyNode.textContent = t(state.difficulty === 'easy' ? 'easy' : state.difficulty === 'medium' ? 'medium' : 'hard');
    els.roomStatusPanel.classList.toggle('danger-status', Boolean(hero.status) || skullHere);
    els.roomRoll.disabled = !gameActive || state.ended || state.phase !== 'playerRoll' || !hero.alive;
    els.roomSealBtn.hidden = !(state.phase === 'playerRitual' && !state.ended);
    renderFootprints(room);
    renderCharacters(room);
    renderDoom();
  }

  function scrollRoomSideTo(section) {
    if (!els.roomSideScroll || !section) return;
    const panelRect = els.roomSideScroll.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const top = Math.max(0, els.roomSideScroll.scrollTop + sectionRect.top - panelRect.top - 10);
    els.roomSideScroll.scrollTo({ top, behavior: 'smooth' });
    section.classList.add('anchor-pulse');
    setTimeout(() => section.classList.remove('anchor-pulse'), 900);
  }

  function openRoomDialog() {
    renderRoom();
    if (!els.roomDialog.open) els.roomDialog.showModal();
    setTimeout(() => maybeShowInventoryReminder(), 650);
  }

  function openPathDialog() {
    renderBoard();
    renderPathRooms();
    if (!els.pathDialog.open) els.pathDialog.showModal();
  }

  function showOutcome(result) {
    const room = roomFor(state.players[0].pos);
    els.exploreRoomImage.src = room.img;
    els.exploreRoomKicker.textContent = localizedRoom(room,'kicker');
    els.exploreRoomName.textContent = localizedRoom(room,'name');
    els.exploreIcon.textContent = result.icon || '🔎';
    els.outcomeKicker.textContent = result.kicker ? localizeRuntimeText(result.kicker,'meta') : t('exploration');
    els.exploreTitle.textContent = result.title ? localizeRuntimeText(result.title,'event') : contentDict().fallbacks?.event || t('exploredRoom');
    els.exploreText.textContent = result.text ? localizeRuntimeText(result.text,'explore') : t('manorSilent');
    els.exploreMeta.textContent = result.meta ? localizeRuntimeText(result.meta,'meta') : '';
    if (els.exploreExplanation) {
      els.exploreExplanation.hidden = !result.explanation;
      els.exploreExplanation.innerHTML = result.explanation
        ? `<strong>${t('trueMeaning')}</strong><span>${result.explanation ? localizeRuntimeText(result.explanation,'explore') : ''}</span>`
        : '';
    }
    els.exploreOutcome.className = `explore-outcome ${result.tone || 'neutral'}`;
    if (!els.exploreDialog.open) els.exploreDialog.showModal();
    return new Promise(resolve => { outcomeResolver = resolve; });
  }

  function closeOutcome() {
    if (els.exploreDialog.open) els.exploreDialog.close();
    const resolver = outcomeResolver;
    outcomeResolver = null;
    if (resolver) resolver();
  }

  function getDieFace() {
    const face = randomFrom(dieFaces);
    return face.kind === 'move' ? { ...face, label: t(`move${face.value}`) } : { ...face, label: `☠ · ${t('omen')}` };
  }

  function dieFaceKey(face) {
    if (!face) return 'idle';
    if (face.kind === 'move' || face.kind === 'mystery') return String(face.value);
    return 'idle';
  }

  function resolveMysteryFace(face) {
    if (!face || face.kind !== 'mystery') return face;
    const eventChosen = Math.random() < 0.5;
    return eventChosen
      ? { kind: 'event', icon: '👻', label: `☠ → ${t('event')}`, rolledValue: 6 }
      : { kind: 'trap', icon: '⚠️', label: `☠ → ${t('trap')}`, rolledValue: 6 };
  }

  function setDieFace(face) {
    if (!els.diceCube) return;
    els.diceCube.dataset.face = dieFaceKey(face);
  }

  async function animateDie() {
    const face = getDieFace();
    setDieFace(null);
    els.roomRoll.classList.add('rolling');
    els.dialogMoveText.textContent = t('dieRolling');
    sfx(225, 0.08);
    await wait(1750);
    els.roomRoll.classList.remove('rolling');
    setDieFace(face);
    sfx(430, 0.09);
    return face;
  }

  function returnToRoomStart(player) {
    const room = roomFor(player.pos);
    const before = player.pos;
    player.pos = room.start;
    return before - player.pos;
  }

  function retreatOneRoom(player) {
    const currentRoom = roomFor(player.pos);
    const currentIndex = roomIndexById(currentRoom.id);
    if (currentIndex <= 0) {
      const before = player.pos;
      player.pos = rooms[0].start;
      return { moved: before - player.pos, from: currentRoom, to: rooms[0] };
    }
    const targetRoom = rooms[currentIndex - 1];
    const before = player.pos;
    player.pos = targetRoom.start;
    return { moved: before - player.pos, from: currentRoom, to: targetRoom };
  }

  function infestRoom(roomId) {
    if (!state.infestedRooms.includes(roomId)) state.infestedRooms.push(roomId);
  }

  function skullRoomDef() {
    return rooms.find(room => room.id === state.skullRoom) || rooms[rooms.length - 1];
  }

  function clearTransientUiForAwakening() {
    hideInventoryReminder();
    dismissToast();
    if (els.exploreDialog?.open) closeOutcome();
    if (els.itemDialog?.open) els.itemDialog.close();
    if (els.pathDialog?.open) els.pathDialog.close();
    if (els.sealDialog?.open) els.sealDialog.close();
  }

  function awakenSkull() {
    if (state.skullAwake) return false;
    awakeningPreviewMode = false;
    awakeningResumePhase = state.phase;
    awakeningResumeAfterTurn = state.phase === 'rolling';
    state.phase = 'awakening';
    state.doom = MAX_DOOM;
    state.skullAwake = true;
    state.skullLife = SKULL_MAX_LIFE;
    state.skullRoom = 'cripta';
    state.infestedRooms = ['cripta'];
    state.skullMoves = 0;
    log(currentLanguage==='it'?'La bara si spalanca. Il Teschio assume un corpo d’ombra e lascia la Cripta.':currentLanguage==='en'?'The coffin bursts open. The Skull takes on a body of shadow and leaves the Crypt.':currentLanguage==='es'?'El ataúd se abre. El Cráneo toma un cuerpo de sombra y abandona la Cripta.':currentLanguage==='fr'?'Le cercueil s’ouvre. Le Crâne prend un corps d’ombre et quitte la Crypte.':'O caixão se abre. O Crânio assume um corpo de sombra e deixa a Cripta.', t('twelfthToll'));
    clearTransientUiForAwakening();
    render();
    playAwakeningCinematic();
    return true;
  }

  function playAwakeningCinematic(preview = false) {
    if (!els.awakeningDialog) return;
    awakeningPreviewMode = Boolean(preview);
    els.awakeningDialog.classList.remove('awakening-ready');
    els.awakeningDialog.classList.add('awakening-playing');
    if (els.awakeningFinal) els.awakeningFinal.setAttribute('aria-hidden', 'true');
    if (els.awakeningContinue) els.awakeningContinue.disabled = true;
    if (els.awakeningBell) els.awakeningBell.textContent = 'XII';
    if (els.awakeningCaption) els.awakeningCaption.textContent = t('twelfthToll');
    if (!els.awakeningDialog.open) els.awakeningDialog.showModal();

    // La musica si abbassa mentre il maniero "trattiene il respiro".
    if (settings.soundOn && els.ambientAudio) els.ambientAudio.volume = 0.07;
    sfx(92, 0.65);
    setTimeout(() => sfx(68, 1.2), 850);
    setTimeout(() => sfx(48, 1.8), 2250);
    setTimeout(() => sfx(118, 0.9), 3900);

    setTimeout(() => {
      els.awakeningDialog.classList.remove('awakening-playing');
      els.awakeningDialog.classList.add('awakening-ready');
      if (els.awakeningFinal) els.awakeningFinal.setAttribute('aria-hidden', 'false');
      if (els.awakeningContinue) els.awakeningContinue.disabled = false;
    }, 6100);
  }

  function previewTwelfthBell() {
    if (!gameActive || !state || state.ended) {
      toast(currentLanguage==='it'?'Avvia prima una partita per vedere il test del XII rintocco':currentLanguage==='en'?'Start a game first to preview the twelfth toll':currentLanguage==='es'?'Inicia una partida para ver la duodécima campanada':currentLanguage==='fr'?'Commencez une partie pour voir l’aperçu du douzième coup':'Inicie um jogo para ver a prévia do décimo segundo toque');
      return;
    }
    playAwakeningCinematic(true);
  }

  function moveSkullThroughManor() {
    if (!state.skullAwake || state.ended) return;
    const roamingRooms = rooms.slice(0, -1);
    let currentIndex = roamingRooms.findIndex(room => room.id === state.skullRoom);
    if (currentIndex < 0) currentIndex = roamingRooms.length - 1;
    const heroIndex = Math.max(0, roamingRooms.findIndex(room => room.id === roomFor(state.players[0].pos).id));
    const playerIndices = state.players.filter(p => p.alive).map(p => Math.max(0, roamingRooms.findIndex(r => r.id === roomFor(p.pos).id)));
    const roll = Math.random();
    let nextIndex = currentIndex;
    const toward = target => currentIndex + Math.sign(target - currentIndex);
    if (roll < .50) nextIndex = toward(heroIndex);
    else if (roll < .70 && playerIndices.length) nextIndex = toward(randomFrom(playerIndices));
    else if (roll < .90) nextIndex = Math.max(0, Math.min(roamingRooms.length - 1, currentIndex + randomFrom([-1, 1])));
    state.skullRoom = roamingRooms[nextIndex].id;
    state.skullMoves++;
    infestRoom(state.skullRoom);
    log(nextIndex === currentIndex ? `Il Teschio resta in ${roamingRooms[nextIndex].name} e l’infestazione si addensa.` : `L’Ombra del Teschio attraversa il maniero e raggiunge ${roamingRooms[nextIndex].name}.`, 'Il Teschio si muove.');
  }

  function applySkullEncounter(player) {
    if (!state.skullAwake || !player.alive || roomFor(player.pos).id !== state.skullRoom) return null;
    if (Math.random() >= SKULL_ENCOUNTER_CHANCE) return null;
    if (!state.skullRoomReturns || typeof state.skullRoomReturns !== 'object') state.skullRoomReturns = {};
    const returnsUsed = Number(state.skullRoomReturns[player.id] || 0);
    const eligible = returnsUsed >= 2 ? skullEncounters.filter(item => !item.returnRoomStart) : skullEncounters;
    let encounter = randomFrom(eligible.length ? eligible : skullEncounters);
    const notes = [];
    if (player.hearts <= 2 && Math.random() < 0.45) {
      encounter = { ...encounter, damage: Math.max(1, (encounter.damage || 0) + 1), block: encounter.block || Math.random() < .35, status: encounter.status || 'Terrore del Teschio' };
      notes.push(t('lowCourage'));
    }
    if (encounter.damage) {
      const damage = applyDamage(player, encounter.damage);
      if (damage) notes.push(t('courageMinus',{n:damage}));
    }
    if (encounter.block && player.alive) {
      player.status = createBlockedStatus('skull', encounter.status || encounter.title);
      notes.push(t('blockedMax',{n:BLOCK_MAX_TURNS}));
    }
    if (encounter.moveBack && player.alive) {
      const moved = moveBack(player, encounter.moveBack);
      if (moved) notes.push(t('moveBack',{n:moved}));
    }
    if (encounter.returnRoomStart && player.alive) {
      const moved = returnToRoomStart(player);
      if (moved) {
        state.skullRoomReturns[player.id] = returnsUsed + 1;
        const suffix = currentLanguage === 'it' ? ` · ritorno ${returnsUsed + 1}/2` : currentLanguage === 'en' ? ` · threshold return ${returnsUsed + 1}/2` : currentLanguage === 'es' ? ` · regreso al umbral ${returnsUsed + 1}/2` : currentLanguage === 'fr' ? ` · retour au seuil ${returnsUsed + 1}/2` : ` · retorno ao limiar ${returnsUsed + 1}/2`;
        notes.push(t('returnRoomStart',{n:moved}) + suffix);
      } else notes.push(t('alreadyRoomStart'));
    } else if (returnsUsed >= 2) {
      notes.push(currentLanguage === 'it' ? 'Il Teschio non può più ricacciarti alla soglia: hai già subito 2 ritorni' : currentLanguage === 'en' ? 'The Skull can no longer drive you back to the threshold: you already suffered 2 returns' : currentLanguage === 'es' ? 'El Cráneo ya no puede devolverte al umbral: ya sufriste 2 regresos' : currentLanguage === 'fr' ? 'Le Crâne ne peut plus vous repousser au seuil : vous avez déjà subi 2 retours' : 'O Crânio não pode mais expulsar você para o limiar: você já sofreu 2 retornos');
    }
    const title = localizedArrayEntry('skullEncounters', skullEncounters, encounter, 'title');
    const text = localizedArrayEntry('skullEncounters', skullEncounters, encounter, 'text');
    log(text, `${player.name}: ${title}.`);
    const quietMeta = currentLanguage === 'it' ? 'Il Teschio svanisce senza colpire, ma la stanza resta infestata.' : currentLanguage === 'en' ? 'The Skull vanishes without striking, but the room remains haunted.' : currentLanguage === 'es' ? 'El Cráneo desaparece sin atacar, pero la sala sigue infestada.' : currentLanguage === 'fr' ? 'Le Crâne disparaît sans frapper, mais la pièce reste hantée.' : 'O Crânio desaparece sem atacar, mas o cômodo continua infestado.';
    return { kicker: t('skullFree').toUpperCase(), icon: '💀', title, text, meta: notes.length ? notes.join(' · ') : quietMeta, tone: 'danger' };
  }

  function moveBack(player, amount) {
    const before = player.pos;
    const beforeRoom = roomFor(before);
    player.pos = Math.max(0, player.pos - amount);
    const afterRoom = roomFor(player.pos);
    if (player.id === 'hero' && beforeRoom.id !== afterRoom.id) {
      const a = roomIndexById(beforeRoom.id), b = roomIndexById(afterRoom.id);
      for (let i = a; i > b && !state.skullAwake; i--) ringBellForRoomChange(rooms[i], rooms[i - 1], 'Il maniero ti costringe ad attraversare una soglia all’indietro.');
    }
    return before - player.pos;
  }

  function roomCanTriggerTest(player) {
    const room = roomFor(player.pos);
    if (room.id === 'cripta') return false;
    return (state.roomTests[room.id] || 0) < TESTS_PER_ROOM_MAX;
  }

  function takeUnusedEsotericQuestion() {
    let available = esotericQuestions.filter(question => !state.usedEsotericQuestions.includes(question.id));
    if (!available.length) {
      state.usedEsotericQuestions = [];
      available = [...esotericQuestions];
    }
    const question = randomFrom(available);
    state.usedEsotericQuestions.push(question.id);
    return prepareEsotericQuestion(question);
  }

  function markRoomTest(player) {
    const room = roomFor(player.pos);
    state.roomTests[room.id] = (state.roomTests[room.id] || 0) + 1;
    return room;
  }

  function showEsotericTest(player) {
    const room = markRoomTest(player);
    const question = takeUnusedEsotericQuestion();
    els.testGlyph.textContent = question.glyph || '🜍';
    els.testRoomName.textContent = localizedRoom(room,'name');
    els.testQuestion.textContent = question.prompt;
    els.testFeedback.hidden = true;
    els.testFeedback.className = 'test-feedback';
    els.testContinue.hidden = true;
    els.testAnswers.innerHTML = question.options.map((option, index) => `<button type="button" class="test-answer" data-index="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span></button>`).join('');
    if (!els.testDialog.open) els.testDialog.showModal();

    return new Promise(resolve => {
      const onAnswer = event => {
        const button = event.target.closest('.test-answer');
        if (!button) return;
        els.testAnswers.removeEventListener('click', onAnswer);
        const chosenIndex = Number(button.dataset.index);
        const correct = chosenIndex === question.correctIndex;
        const buttons = [...els.testAnswers.querySelectorAll('.test-answer')];
        buttons.forEach((node, index) => {
          node.disabled = true;
          if (index === question.correctIndex) node.classList.add('correct');
          if (index === chosenIndex && !correct) node.classList.add('wrong');
        });

        let moved = 0;
        if (!correct) moved = returnToRoomStart(player);
        els.testFeedback.hidden = false;
        els.testFeedback.classList.add(correct ? 'success' : 'danger');
        els.testFeedback.innerHTML = correct
          ? `<strong>${t('correctAnswer')}</strong><span>${question.explanation}</span>`
          : `<strong>${t('wrongAnswer')}</strong><span>${question.explanation} ${moved ? t('sealPushBack',{moved}) : t('sealAlreadyStart')}</span>`;
        log(correct ? `${player.name}: ${t('testPassed')} ${localizedRoom(room,'name')}.` : `${player.name}: ${t('testFailed')} ${localizedRoom(room,'name')}.`, correct ? t('testPassed') : t('testFailed'));
        els.testContinue.hidden = false;
        render();

        const finish = () => {
          els.testContinue.removeEventListener('click', finish);
          if (els.testDialog.open) els.testDialog.close();
          resolve({ correct, question });
        };
        els.testContinue.addEventListener('click', finish);
      };
      els.testAnswers.addEventListener('click', onAnswer);
    });
  }

  async function runBotEsotericTest(player) {
    const room = markRoomTest(player);
    const question = takeUnusedEsotericQuestion();
    const chosenIndex = Math.floor(Math.random() * question.options.length);
    const correct = chosenIndex === question.correctIndex;
    let moved = 0;
    if (!correct) moved = returnToRoomStart(player);
    els.dialogMoveText.textContent = t('botFacesTest',{name:player.name});
    els.dialogStatusText.textContent = correct
      ? t('correctChoice',{answer:question.options[chosenIndex]})
      : t('wrongChoice',{answer:question.options[chosenIndex],room:localizedRoom(room,'name'),moved:moved ? ` (-${moved})` : ''});
    log(correct ? `${player.name}: ${t('testPassed')} ${localizedRoom(room,'name')}.` : `${player.name}: ${t('testFailed')} ${localizedRoom(room,'name')}.`, correct ? t('testPassed') : t('testFailed'));
    render();
    await wait(2000);
    return correct;
  }

  function applyDamage(player, amount) {
    if (!amount) return 0;
    const before = player.hearts;
    player.hearts = Math.max(0, player.hearts - amount);
    const lost = before - player.hearts;
    if (player.hearts === 0) {
      const oldRoom = roomFor(player.pos);
      const retreat = retreatOneRoom(player);
      player.hearts = 2;
      player.status = createBlockedStatus('panic', 'Terrore assoluto');
      const panicText = currentLanguage==='it' ? `${player.name} cede al terrore in ${localizedRoom(oldRoom,'name')}. Carta “Fuga nel buio”: arretra di una stanza fino a ${localizedRoom(retreat.to,'name')} e recupera 2 punti Coraggio.` : currentLanguage==='en' ? `${player.name} gives in to terror in ${localizedRoom(oldRoom,'name')}. “Flight into darkness”: move back one room to ${localizedRoom(retreat.to,'name')} and recover 2 Courage.` : currentLanguage==='es' ? `${player.name} cede al terror en ${localizedRoom(oldRoom,'name')}. «Huida en la oscuridad»: retrocede una sala hasta ${localizedRoom(retreat.to,'name')} y recupera 2 de Coraje.` : currentLanguage==='fr' ? `${player.name} cède à la terreur dans ${localizedRoom(oldRoom,'name')}. « Fuite dans l’obscurité » : reculez d’une pièce jusqu’à ${localizedRoom(retreat.to,'name')} et récupérez 2 Courage.` : `${player.name} cede ao terror em ${localizedRoom(oldRoom,'name')}. “Fuga na escuridão”: recue um cômodo até ${localizedRoom(retreat.to,'name')} e recupere 2 de Coragem.`;
      log(panicText, t('escapeDark'));
      if (player.id === 'hero' && retreat.to.id !== oldRoom.id && !state.skullAwake) {
        ringBellForRoomChange(oldRoom, retreat.to, 'Il panico ti costringe ad attraversare una soglia all’indietro.');
      }
    }
    return lost;
  }

  function advanceDoom(amount, reason = '') {
    if (state.skullAwake) return false;
    const before = state.doom;
    state.doom = Math.min(MAX_DOOM, state.doom + amount);
    const gained = state.doom - before;
    if (reason && gained > 0) log(reason, `Rintocco +${gained}.`);
    if (gained > 0) sfx(96, 0.16);
    if (state.doom >= MAX_DOOM) return awakenSkull();
    return false;
  }

  function hazardResult(player, hazard, kind) {
    const isHero = player.id === 'hero';
    const category = kind === 'trap' ? 'traps' : 'unforeseenEvents';
    const source = kind === 'trap' ? traps : unforeseenEvents;
    const kicker = (kind === 'trap' ? t('trap') : t('event')).toUpperCase();
    const icon = kind === 'trap' ? '⚠️' : '👻';
    const title = localizedArrayEntry(category, source, hazard, 'title');
    const hazardText = localizedArrayEntry(category, source, hazard, 'text');

    if (hazard.advanceToRoomEnd && player.alive) {
      const room = roomFor(player.pos);
      const before = player.pos;
      player.pos = room.end;
      const moved = player.pos - before;
      log(hazardText, `${player.name}: ${title}.`);
      const meta = moved
        ? (currentLanguage === 'it' ? `Il passaggio ti porta direttamente all’ultima casella di ${localizedRoom(room,'name')}: +${moved} passi.` : currentLanguage === 'en' ? `The passage takes you directly to the last space of ${localizedRoom(room,'name')}: +${moved} spaces.` : currentLanguage === 'es' ? `El pasaje te lleva directamente a la última casilla de ${localizedRoom(room,'name')}: +${moved} casillas.` : currentLanguage === 'fr' ? `Le passage vous conduit directement à la dernière case de ${localizedRoom(room,'name')} : +${moved} cases.` : `A passagem leva você diretamente à última casa de ${localizedRoom(room,'name')}: +${moved} casas.`)
        : (currentLanguage === 'it' ? 'Sei già sull’ultima casella della stanza.' : currentLanguage === 'en' ? 'You are already on the last space of the room.' : currentLanguage === 'es' ? 'Ya estás en la última casilla de la sala.' : currentLanguage === 'fr' ? 'Vous êtes déjà sur la dernière case de la pièce.' : 'Você já está na última casa do cômodo.');
      return { kicker: t('favorableEvent'), icon: '✨', title, text: hazardText, meta, tone: 'success' };
    }

    if (player.ward > 0) {
      player.ward = 0;
      const text = currentLanguage === 'it' ? `La protezione si consuma e annulla completamente l’effetto: ${title}.` : currentLanguage === 'en' ? `The protection is consumed and completely cancels the effect: ${title}.` : currentLanguage === 'es' ? `La protección se consume y anula por completo el efecto: ${title}.` : currentLanguage === 'fr' ? `La protection est consommée et annule complètement l’effet : ${title}.` : `A proteção é consumida e cancela completamente o efeito: ${title}.`;
      log(text, `${player.name}: ${t('protectionSaves')}.`);
      return { kicker, icon: '🛡️', title: t('protectionSaves'), text, meta: t('protectionConsumed'), tone: 'success' };
    }

    const notes = [];
    let effectiveDamage = hazard.damage || 0;
    if (player.hearts <= 2 && Math.random() < 0.30) {
      effectiveDamage += 1;
      notes.push(t('lowCourage'));
    }
    const damage = applyDamage(player, effectiveDamage);
    if (damage) notes.push(t('courageMinus',{n:damage}));
    if (hazard.block && player.alive) {
      player.status = createBlockedStatus(kind, hazard.status || hazard.title);
      notes.push(t('blockedMax',{n:BLOCK_MAX_TURNS}));
    }
    if (hazard.moveBack && player.alive) {
      const moved = moveBack(player, hazard.moveBack);
      if (moved) notes.push(t('moveBack',{n:moved}));
    }
    if (hazard.returnRoomStart && player.alive) {
      const moved = returnToRoomStart(player);
      notes.push(moved ? t('returnRoomStart',{n:moved}) : t('alreadyRoomStart'));
    }
    if (hazard.doom) {
      if (state.skullAwake) {
        infestRoom(roomFor(player.pos).id);
        notes.push(t('skullContaminates'));
      } else notes.push(t('omenNoBell'));
    }
    log(hazardText, `${player.name}: ${title}.`);
    if (player.hearts === 2 && player.status?.source === 'panic') notes.push(t('escapeDark'));
    return { kicker, icon, title, text: hazardText, meta: notes.length ? notes.join(' · ') : t('noInjury'), tone: 'danger', fatal: isHero && !player.alive };
  }

  function blockedRollResult(player, face) {
    const sourceLabel = player.status.label;
    const label = localizedStatus(sourceLabel);
    if (face.kind === 'event' && Math.random() < 0.42) {
      const rescue = randomFrom(rescueEvents);
      player.status = null;
      const rescueTitle = localizedArrayEntry('rescueEvents', rescueEvents, rescue, 'title');
      const rescueText = localizedArrayEntry('rescueEvents', rescueEvents, rescue, 'text');
      const text = currentLanguage === 'it' ? `${rescueText} L’impedimento “${label}” è risolto prima del limite.` : currentLanguage === 'en' ? `${rescueText} The impediment “${label}” is resolved before the limit.` : currentLanguage === 'es' ? `${rescueText} El impedimento «${label}» se resuelve antes del límite.` : currentLanguage === 'fr' ? `${rescueText} L’obstacle « ${label} » est levé avant la limite.` : `${rescueText} O impedimento “${label}” é resolvido antes do limite.`;
      log(text, `${player.name}: ${rescueTitle}.`);
      const meta = currentLanguage === 'it' ? 'Ti liberi subito. Dal prossimo turno puoi agire normalmente.' : currentLanguage === 'en' ? 'You are freed immediately. From your next turn you can act normally.' : currentLanguage === 'es' ? 'Te liberas de inmediato. Desde tu próximo turno puedes actuar normalmente.' : currentLanguage === 'fr' ? 'Vous êtes libéré immédiatement. Dès votre prochain tour, vous pourrez agir normalement.' : 'Você se liberta imediatamente. A partir do próximo turno poderá agir normalmente.';
      return { kicker: t('favorableEvent'), icon: '✨', title: rescueTitle, text, meta, tone: 'success', autoReleased: true };
    }
    const before = blockedTurnsRemaining(player);
    const after = Math.max(0, before - 1);
    if (after === 0) {
      player.status = null;
      const text = currentLanguage === 'it' ? `${player.name} resiste ancora a “${label}”. Sono trascorsi ${BLOCK_MAX_TURNS} turni personali: il blocco cede automaticamente.` : currentLanguage === 'en' ? `${player.name} resists “${label}” once more. ${BLOCK_MAX_TURNS} personal turns have passed: the block releases automatically.` : currentLanguage === 'es' ? `${player.name} resiste una vez más a «${label}». Han pasado ${BLOCK_MAX_TURNS} turnos personales: el bloqueo termina automáticamente.` : currentLanguage === 'fr' ? `${player.name} résiste encore à « ${label} ». ${BLOCK_MAX_TURNS} tours personnels se sont écoulés : le blocage cède automatiquement.` : `${player.name} ainda resiste a “${label}”. Passaram ${BLOCK_MAX_TURNS} turnos pessoais: o bloqueio cede automaticamente.`;
      log(text, `${player.name}: ${t('blockGivesWay')}.`);
      return { kicker: t('blockAuto'), icon: '⛓️✨', title: t('blockGivesWay'), text, meta: t('blockedMax',{n:BLOCK_MAX_TURNS}), tone: 'success', autoReleased: true };
    }
    player.status.turnsRemaining = after;
    const faceLabel = localizedFaceLabel(face);
    const text = currentLanguage === 'it' ? `${player.name} prova ad agire, ma “${label}” lo trattiene. Il risultato ${faceLabel} non ha effetto in questo turno.` : currentLanguage === 'en' ? `${player.name} tries to act, but “${label}” holds them back. The result ${faceLabel} has no effect this turn.` : currentLanguage === 'es' ? `${player.name} intenta actuar, pero «${label}» lo retiene. El resultado ${faceLabel} no tiene efecto este turno.` : currentLanguage === 'fr' ? `${player.name} tente d’agir, mais « ${label} » le retient. Le résultat ${faceLabel} n’a aucun effet ce tour-ci.` : `${player.name} tenta agir, mas “${label}” impede o movimento. O resultado ${faceLabel} não tem efeito neste turno.`;
    log(text, `${player.name}: ${t('stillBlocked')}.`);
    const meta = currentLanguage === 'it' ? `Resta ${after} turno. Se esce 👻, un Imprevisto favorevole potrebbe liberarti prima.` : currentLanguage === 'en' ? `${after} turn remains. If 👻 appears, a favourable Event may free you earlier.` : currentLanguage === 'es' ? `Queda ${after} turno. Si aparece 👻, un Imprevisto favorable puede liberarte antes.` : currentLanguage === 'fr' ? `Il reste ${after} tour. Si 👻 apparaît, un Imprévu favorable peut vous libérer plus tôt.` : `Resta ${after} turno. Se 👻 aparecer, um Imprevisto favorável pode libertar você antes.`;
    return { kicker: t('blocked'), icon: '⛓️', title: t('stillBlocked'), text, meta, tone: 'danger' };
  }

  function findSeal(key, player, text) {
    state.seals[key] = true;
    const name = localizedSealName(key);
    const sealText = localizeRuntimeText(text, 'explore');
    log(sealText, `${player.name}: ${name}.`);
    return { kicker: t('exploration'), icon: sealDefs[key].icon, title: `${t('sealsTitle').replace(/s$/i,'')} ${name}`, text: sealText, meta: t('sharedSeal'), tone: 'success' };
  }

  function recordLoreClue(player) {
    const remaining = loreClues.filter(clue => !state.loreFound.includes(clue.id));
    if (!remaining.length) return null;
    const clue = randomFrom(remaining);
    state.loreFound.push(clue.id);
    const title = localizedLoreTitle(clue);
    const text = localizedLoreField(clue, 'text');
    const explanation = localizedLoreField(clue, 'explanation');
    log(`${title}: ${text}`, `${player.name}: ${t('esotericCode')}.`);
    return { kicker: t('esotericCode').toUpperCase(), icon: clue.symbol, title, text, meta: clue.latin, explanation, tone: 'mystery' };
  }

  function explore(player) {
    const room = roomFor(player.pos);
    state.roomSearches[room.id] = (state.roomSearches[room.id] || 0) + 1;
    const searchNo = state.roomSearches[room.id];
    const sealFindText = {
      raven: { it:'Tra due volumi cuciti in pelle trovi un disco d’argento inciso con un corvo.', en:'Between two leather-bound volumes you find a silver disc engraved with a raven.', es:'Entre dos volúmenes encuadernados en cuero encuentras un disco de plata grabado con un cuervo.', fr:'Entre deux volumes reliés de cuir, vous trouvez un disque d’argent gravé d’un corbeau.', pt:'Entre dois volumes encadernados em couro você encontra um disco de prata gravado com um corvo.' },
      moon: { it:'Sotto l’altare spezzato brilla una mezzaluna di ossidiana.', en:'Beneath the broken altar, an obsidian crescent gleams.', es:'Bajo el altar roto brilla una media luna de obsidiana.', fr:'Sous l’autel brisé brille un croissant d’obsidienne.', pt:'Sob o altar quebrado brilha uma meia-lua de obsidiana.' },
      thorn: { it:'In una nicchia delle catacombe, una corona di spine non marcisce da secoli.', en:'In a catacomb niche, a crown of thorns has not decayed for centuries.', es:'En un nicho de las catacumbas, una corona de espinas no se ha podrido en siglos.', fr:'Dans une niche des catacombes, une couronne d’épines ne s’est pas décomposée depuis des siècles.', pt:'Em um nicho das catacumbas, uma coroa de espinhos não apodrece há séculos.' }
    };
    if (room.id === 'biblioteca' && !state.seals.raven) return findSeal('raven', player, sealFindText.raven[currentLanguage] || sealFindText.raven.it);
    if (room.id === 'cappella' && !state.seals.moon) return findSeal('moon', player, sealFindText.moon[currentLanguage] || sealFindText.moon.it);
    if (room.id === 'catacombe' && !state.seals.thorn) return findSeal('thorn', player, sealFindText.thorn[currentLanguage] || sealFindText.thorn.it);
    if (room.id === 'cripta') {
      const all = Object.values(state.seals).every(Boolean);
      return { kicker:t('crypt'), icon:'⚰️', title:all?t('coffinAhead'):t('coffinUnreachable'), text:all?t('allSealsCopy'):t('missingSealsCopy'), meta:all?t('riteButtonSoon'):t('keepSearching'), tone:all?'success':'danger' };
    }
    if (Math.random() < RARE_TALISMAN_FIND_CHANCE) {
      const found = mundaneFinds.find(entry => entry.rare);
      if (found) {
        state.inventory.push(found.item);
        const title = localizedArrayEntry('mundaneFinds', mundaneFinds, found, 'title');
        const text = localizedArrayEntry('mundaneFinds', mundaneFinds, found, 'text');
        log(text, `${player.name}: ${title}.`);
        return { kicker:t('exploration'), icon:found.icon, title, text, meta:t('itemAdded',{item:localizedItem(found.item,'name')}), tone:'success' };
      }
    }
    const roll = Math.random();
    if (roll < 0.38) {
      const lore = recordLoreClue(player);
      if (lore) return lore;
    }
    if (roll < 0.52) {
      const found = randomFrom(mundaneFinds.filter(entry => !entry.rare));
      if (found.item) state.inventory.push(found.item);
      let healed = 0;
      if (found.heal) {
        const before = player.hearts;
        player.hearts = Math.min(MAX_COURAGE, player.hearts + found.heal);
        healed = player.hearts - before;
      }
      const title = localizedArrayEntry('mundaneFinds', mundaneFinds, found, 'title');
      const text = localizedArrayEntry('mundaneFinds', mundaneFinds, found, 'text');
      const meta = found.item ? t('itemAdded',{item:localizedItem(found.item,'name')}) : healed ? `${currentLanguage==='it'?'Coraggio':currentLanguage==='en'?'Courage':currentLanguage==='es'?'Coraje':currentLanguage==='fr'?'Courage':'Coragem'} +${healed}.` : t('courageFull');
      log(text, `${player.name}: ${title}.`);
      return { kicker:t('exploration'), icon:found.icon, title, text, meta, tone:'success' };
    }
    const sourceText = randomFrom(quietDiscoveries);
    const text = localizedArrayEntry('quietDiscoveries', quietDiscoveries, sourceText);
    log(text, `${player.name}: ${localizedRoom(room,'name')}.`);
    return { kicker:t('exploration'), icon:'🔎', title:t('searchTitle',{n:searchNo,room:localizedRoom(room,'name')}), text, meta:t('exploreMeta'), tone:'neutral' };
  }

  function courageStateLabel(value) {
    if (value >= 5) return t('courage5');
    if (value === 4) return t('courage4');
    if (value === 3) return t('courage3');
    if (value === 2) return t('courage2');
    if (value === 1) return t('courage1');
    return t('courage0');
  }

  function roomIndexById(id) { return rooms.findIndex(room => room.id === id); }

  function ringBellForRoomChange(fromRoom, toRoom, reason = '') {
    if (state.skullAwake || !fromRoom || !toRoom || fromRoom.id === toRoom.id) return false;
    return advanceDoom(1, reason || `${state.players[0].name} attraversa la soglia: ${fromRoom.name} → ${toRoom.name}. La campana del maniero risuona.`);
  }

  function cardinalTrapWasTriggered(player, trapId) {
    if (!state.cardinalTrapsTriggered) state.cardinalTrapsTriggered = {};
    if (!Array.isArray(state.cardinalTrapsTriggered[player.id])) state.cardinalTrapsTriggered[player.id] = [];
    return state.cardinalTrapsTriggered[player.id].includes(trapId);
  }

  function markCardinalTrapTriggered(player, trapId) {
    if (!state.cardinalTrapsTriggered) state.cardinalTrapsTriggered = {};
    if (!Array.isArray(state.cardinalTrapsTriggered[player.id])) state.cardinalTrapsTriggered[player.id] = [];
    if (!state.cardinalTrapsTriggered[player.id].includes(trapId)) state.cardinalTrapsTriggered[player.id].push(trapId);
  }

  function triggerCardinalTrap(player, tileId) {
    const trap = cardinalTraps[tileId];
    if (!trap || !isCardinalTrapActive(tileId) || cardinalTrapWasTriggered(player, trap.id)) return null;
    markCardinalTrapTriggered(player, trap.id);
    const currentRoom = roomFor(player.pos);
    const currentIndex = roomIndexById(currentRoom.id);
    const targetIndex = Math.max(0, currentIndex - 3);
    const targetRoom = rooms[targetIndex];
    const before = player.pos;
    player.pos = targetRoom.start;
    const title = localizedCardinalTrap(trap,'title');
    const text = localizedCardinalTrap(trap,'text');
    if (player.id === 'hero') {
      for (let i = currentIndex; i > targetIndex && !state.skullAwake; i--) ringBellForRoomChange(rooms[i], rooms[i - 1], `${title}.`);
    }
    log(`${text} ${player.name}: ${before} → ${player.pos}, ${localizedRoom(targetRoom,'name')}.`, `${title}.`);
    return { kicker:t('tileCardinal').toUpperCase(), icon:'💀', title, text, meta:t('cardinalBack',{from:localizedRoom(currentRoom,'name'),to:localizedRoom(targetRoom,'name'),name:player.name}), tone:'danger' };
  }

  function panicEventForLowCourage(player) {
    if (player.hearts !== 1 || Math.random() >= 0.35) return null;
    const before = player.pos;
    player.pos = Math.max(roomFor(player.pos).start, player.pos - 1);
    const pack = currentLanguage==='it'
      ? ['PANICO','Il Coraggio cede','Il terrore prende il sopravvento prima ancora che il maniero possa mostrare il suo vero volto.','Resti paralizzato sulla soglia.','Arretri di 1 casella.']
      : currentLanguage==='en' ? ['PANIC','Courage gives way','Terror takes over before the manor can reveal its true face.','You remain frozen at the threshold.','You move back 1 space.']
      : currentLanguage==='es' ? ['PÁNICO','El Coraje cede','El terror toma el control antes de que la mansión pueda mostrar su verdadero rostro.','Quedas paralizado en el umbral.','Retrocedes 1 casilla.']
      : currentLanguage==='fr' ? ['PANIQUE','Le Courage cède','La terreur prend le dessus avant même que le manoir puisse révéler son vrai visage.','Vous restez figé sur le seuil.','Vous reculez d’une case.']
      : ['PÂNICO','A Coragem cede','O terror assume o controle antes que o casarão possa mostrar seu verdadeiro rosto.','Você fica paralisado no limiar.','Você recua 1 casa.'];
    return { kicker:pack[0], icon:'😱', title:pack[1], text:pack[2], meta:before===player.pos?pack[3]:pack[4], tone:'danger' };
  }

  async function animateHumanMove(steps) {
    const hero = state.players[0];
    const from = hero.pos;
    const target = Math.min(LAST_TILE, from + steps);
    let cardinalOutcome = null;
    for (let pos = from + 1; pos <= target; pos++) {
      const previousRoom = roomFor(hero.pos);
      const nextRoom = roomFor(pos);
      hero.pos = pos;
      const awakeningTriggered = previousRoom.id !== nextRoom.id ? ringBellForRoomChange(previousRoom, nextRoom) : false;
      if (awakeningTriggered || state.phase === 'awakening') {
        render();
        log(t('twelfthCancels',{name:hero.name,room:localizedRoom(nextRoom,'name')}), t('twelfthToll'));
        return { awakening: true };
      }
      if (previousRoom.id === nextRoom.id) {
        const path = footprintPathForRoom(nextRoom);
        const fp = path[localIndexInRoom(pos, nextRoom)];
        const human = els.charactersLayer.querySelector('.room-character.human');
        if (human) { human.classList.add('walking'); human.style.left = `${fp.x - 3.45}%`; human.style.top = `${fp.y}%`; }
        els.footprintsLayer.querySelectorAll('.footstep').forEach((node,index)=>node.classList.toggle('active', index===localIndexInRoom(pos,nextRoom)));
        els.dialogMoveText.textContent = t('walking',{pos});
      } else renderRoom(t('crossThreshold',{room:localizedRoom(nextRoom,'name')}));
      renderPlayers(); renderDoom(); sfx(180 + (pos % 2) * 35, .05); await wait(WALK_STEP_MS);
      if (cardinalTraps[pos] && isCardinalTrapActive(pos)) {
        cardinalOutcome = triggerCardinalTrap(hero, pos);
        if (cardinalOutcome) { render(); break; }
      }
    }
    render();
    log(`${hero.name} avanza da ${from} a ${hero.pos}.`, `${hero.name} muove di ${steps}.`);
    return cardinalOutcome;
  }

  function moveBot(player, steps) {
    const old = player.pos;
    const target = Math.min(LAST_TILE, old + steps);
    let outcome = null;
    for (let pos = old + 1; pos <= target; pos++) {
      player.pos = pos;
      if (cardinalTraps[pos] && isCardinalTrapActive(pos)) {
        outcome = triggerCardinalTrap(player, pos);
        if (outcome) break;
      }
    }
    log(`${player.name} avanza da ${old} a ${player.pos}.`, `${player.name} muove di ${steps}.`);
    return outcome;
  }

  async function handleHumanFace(face) {
    const hero = state.players[0];

    if (state.phase === 'awakening') return { awakening: true };

    if (hero.status) {
      const result = blockedRollResult(hero, face);
      render();
      if (state.phase === 'awakening') return { awakening: true };
      await showOutcome(result);
      return { awakening: false };
    }

    if (face.kind === 'event') {
      const panic = panicEventForLowCourage(hero);
      if (panic) { render(); if (state.phase !== 'awakening') await showOutcome(panic); return { awakening: state.phase === 'awakening' }; }
      if (roomCanTriggerTest(hero)) {
        await showEsotericTest(hero);
        return { awakening: state.phase === 'awakening' };
      }
      const result = hazardResult(hero, randomFrom(unforeseenEvents), 'event');
      render();
      if (state.phase === 'awakening') return { awakening: true };
      await showOutcome(result);
      return { awakening: false };
    }

    if (face.kind === 'trap') {
      const result = hazardResult(hero, randomFrom(traps), 'trap');
      render();
      if (state.phase === 'awakening') return { awakening: true };
      await showOutcome(result);
      return { awakening: false };
    }

    if (face.kind === 'move') {
      const boosted = Boolean(state.doubleStepArmed);
      const steps = face.value * (boosted ? 2 : 1);
      if (boosted) {
        state.doubleStepArmed = false;
        const boostText = langText(`☿ Talismano di Mercurio: ${face.value} × 2 = ${steps} passi.`,`☿ Mercury Talisman: ${face.value} × 2 = ${steps} spaces.`,`☿ Talismán de Mercurio: ${face.value} × 2 = ${steps} casillas.`,`☿ Talisman de Mercure : ${face.value} × 2 = ${steps} cases.`,`☿ Talismã de Mercúrio: ${face.value} × 2 = ${steps} casas.`);
        els.dialogStatusText.textContent = boostText;
        log(boostText, localizedItem('talisman','name'));
        await wait(450);
      }
      const movementResult = await animateHumanMove(steps);
      if (movementResult?.awakening || state.phase === 'awakening') return { awakening: true };
      if (movementResult) { render(); await showOutcome(movementResult); return { awakening: false }; }
      const result = explore(hero);
      render();
      if (state.phase === 'awakening') return { awakening: true };
      await showOutcome(result);
      return { awakening: false };
    }

    return { awakening: false };
  }

  async function rollHuman() {
    if (!gameActive || state.ended || state.phase !== 'playerRoll') return;
    state.lastForcedMove = null;
    await startMusic();
    state.phase = 'rolling';
    renderRoom(t('dieRolling'));
    sfx(240, 0.08);
    const rolledFace = await animateDie();
    renderRoom(localizedFaceLabel(rolledFace));
    await wait(260);
    const face = resolveMysteryFace(rolledFace);
    if (rolledFace.kind === 'mystery') {
      renderRoom(localizedFaceLabel(face));
      els.dialogMoveText.textContent = localizedFaceLabel(face);
      els.dialogStatusText.textContent = face.kind === 'event'
        ? (currentLanguage==='it'?'Il simbolo ha generato un Imprevisto':currentLanguage==='en'?'The symbol produced an Event':currentLanguage==='es'?'El símbolo ha generado un Imprevisto':currentLanguage==='fr'?'Le symbole a produit un Imprévu':'O símbolo gerou um Imprevisto')
        : (currentLanguage==='it'?'Il simbolo ha generato una Trappola':currentLanguage==='en'?'The symbol produced a Trap':currentLanguage==='es'?'El símbolo ha generado una Trampa':currentLanguage==='fr'?'Le symbole a produit un Piège':'O símbolo gerou uma Armadilha');
      await wait(650);
    }
    const turnResult = await handleHumanFace(face);
    if (turnResult?.awakening || state.phase === 'awakening') return;

    const hero = state.players[0];

    const skullEncounter = applySkullEncounter(hero);
    if (skullEncounter && hero.alive) {
      render();
      await showOutcome(skullEncounter);
    }

    if (hero.pos === LAST_TILE && Object.values(state.seals).every(Boolean) && !hero.status) {
      state.phase = 'playerRitual';
      state.activePlayer = 0;
      render();
      renderRoom(state.skullAwake ? (currentLanguage==='it'?'I Sigilli richiamano il Teschio verso la Cripta':currentLanguage==='en'?'The Seals draw the Skull back toward the Crypt':currentLanguage==='es'?'Los Sellos atraen al Cráneo hacia la Cripta':currentLanguage==='fr'?'Les Sceaux attirent le Crâne vers la Crypte':'Os Selos atraem o Crânio para a Cripta') : t('allSealsCopy'));
      return;
    }

    await runBotsAndEndRound();
  }

  async function botOutcomeSummary(player, face) {
    if (player.status) {
      blockedRollResult(player, face);
      return;
    }
    if (face.kind === 'event') {
      if (roomCanTriggerTest(player)) {
        await runBotEsotericTest(player);
      } else {
        hazardResult(player, randomFrom(unforeseenEvents), 'event');
      }
    } else if (face.kind === 'trap') {
      hazardResult(player, randomFrom(traps), 'trap');
    } else if (face.kind === 'move') {
      const cardinal = moveBot(player, face.value);
      if (!cardinal) explore(player);
    }
    if (player.alive) applySkullEncounter(player);
  }

  async function runBotsAndEndRound() {
    state.phase = 'bots';
    const awakeAtRoundStart = state.skullAwake;
    for (let i = 1; i < state.players.length; i++) {
      const player = state.players[i];
      if (!player.alive) continue;
      state.activePlayer = i;
      render();
      const rolledFace = getDieFace();
      setDieFace(rolledFace);
      renderRoom(`${player.name}: ${localizedFaceLabel(rolledFace)}`);
      els.dialogMoveText.textContent = currentLanguage==='it'?`${player.name} ha tirato: ${rolledFace.value ?? localizedFaceLabel(rolledFace)}`:currentLanguage==='en'?`${player.name} rolled: ${rolledFace.value ?? localizedFaceLabel(rolledFace)}`:currentLanguage==='es'?`${player.name} ha sacado: ${rolledFace.value ?? localizedFaceLabel(rolledFace)}`:currentLanguage==='fr'?`${player.name} a obtenu : ${rolledFace.value ?? localizedFaceLabel(rolledFace)}`:`${player.name} tirou: ${rolledFace.value ?? localizedFaceLabel(rolledFace)}`;
      els.dialogStatusText.textContent = rolledFace.kind === 'mystery'
        ? (currentLanguage==='it'?'Il simbolo sceglierà casualmente tra Imprevisto e Trappola':currentLanguage==='en'?'The symbol will randomly choose between Event and Trap':currentLanguage==='es'?'El símbolo elegirá al azar entre Imprevisto y Trampa':currentLanguage==='fr'?'Le symbole choisira au hasard entre Imprévu et Piège':'O símbolo escolherá aleatoriamente entre Imprevisto e Armadilha')
        : (currentLanguage==='it'?'Risultato visibile per 2 secondi':currentLanguage==='en'?'Result shown for 2 seconds':currentLanguage==='es'?'Resultado visible durante 2 segundos':currentLanguage==='fr'?'Résultat affiché pendant 2 secondes':'Resultado visível por 2 segundos');
      await wait(2000);
      const face = resolveMysteryFace(rolledFace);
      if (rolledFace.kind === 'mystery') {
        log(`${player.name}: ${localizedFaceLabel(face)}.`, t('omen'));
      }
      await botOutcomeSummary(player, face);
      render();
      if (!state.ended && player.pos === LAST_TILE && Object.values(state.seals).every(Boolean) && !player.status) {
        log(t('rivalVictoryText',{name:player.name}), t('winnerSealed',{name:player.name}));
        win(i);
        return;
      }
    }

    const completedRound = state.round;

    if (awakeAtRoundStart && state.skullAwake && completedRound % SKULL_MOVES_EVERY_ROUNDS === 0) {
      moveSkullThroughManor();
    }

    state.round++;
    state.itemUsedThisTurn = false;
    state.phase = 'playerRoll';
    state.activePlayer = 0;
    setDieFace(null);
    render();
    const remaining = blockedTurnsRemaining(state.players[0]);
    renderRoom(state.players[0].status
      ? langText(`Bloccato: auto-sblocco tra ${remaining} turno${remaining===1?'':'i'} · 👻 può aiutarti`, `Blocked: automatic release in ${remaining} turn${remaining===1?'':'s'} · 👻 may help`, `Bloqueado: liberación automática en ${remaining} turno${remaining===1?'':'s'} · 👻 puede ayudarte`, `Bloqué : libération automatique dans ${remaining} tour${remaining===1?'':'s'} · 👻 peut vous aider`, `Bloqueado: liberação automática em ${remaining} turno${remaining===1?'':'s'} · 👻 pode ajudar`)
      : state.skullAwake ? langText(`Tocca il dado · il Teschio è in ${localizedRoom(skullRoomDef(),'name')}`, `Roll the die · the Skull is in ${localizedRoom(skullRoomDef(),'name')}`, `Tira el dado · el Cráneo está en ${localizedRoom(skullRoomDef(),'name')}`, `Lancez le dé · le Crâne est dans ${localizedRoom(skullRoomDef(),'name')}`, `Role o dado · o Crânio está em ${localizedRoom(skullRoomDef(),'name')}`) : langText('Tocca il dado per continuare','Roll the die to continue','Tira el dado para continuar','Lancez le dé pour continuer','Role o dado para continuar'));
    setTimeout(() => maybeShowInventoryReminder(), 900);
  }

  function openSealDialog() {
    currentSequence = [];
    renderSealSequence();
    renderDoom();
    if (!els.sealDialog.open) els.sealDialog.showModal();
  }

  function renderSealSequence() {
    $('#sealSequence').innerHTML = currentSequence.length
      ? currentSequence.map(key => sealDefs[key].icon).join('<span>→</span>')
      : `<span class="empty">${currentLanguage==='it'?'Scegli i tre Sigilli':currentLanguage==='en'?'Choose the three Seals':currentLanguage==='es'?'Elige los tres Sellos':currentLanguage==='fr'?'Choisissez les trois Sceaux':'Escolha os três Selos'}</span>`;
  }

  function pushSeal(key) {
    if (currentSequence.length >= 3 || state.ended) return;
    currentSequence.push(key);
    renderSealSequence();
    sfx(390 + currentSequence.length * 80, 0.08);
    if (currentSequence.length < 3) return;

    if (currentSequence.every((value, i) => value === correctSealSequence[i])) {
      completeRitual();
    } else {
      currentSequence = [];
      renderSealSequence();
      if (state.skullAwake) {
        infestRoom(roomFor(state.players[0].pos).id);
        const damage = applyDamage(state.players[0], 1);
        log(currentLanguage==='it'?'La sequenza errata spezza il cerchio. Il Teschio reagisce e riversa la propria ombra nella Cripta.':currentLanguage==='en'?'The wrong sequence breaks the circle. The Skull reacts and pours its shadow into the Crypt.':currentLanguage==='es'?'La secuencia incorrecta rompe el círculo. El Cráneo reacciona y vierte su sombra en la Cripta.':currentLanguage==='fr'?'La mauvaise séquence brise le cercle. Le Crâne réagit et déverse son ombre dans la Crypte.':'A sequência errada rompe o círculo. O Crânio reage e despeja sua sombra na Cripta.', currentLanguage==='it'?'Rito fallito.':currentLanguage==='en'?'Rite failed.':currentLanguage==='es'?'Rito fallido.':currentLanguage==='fr'?'Rite échoué.':'Rito falhou.');
        toast(currentLanguage==='it'?(damage?'Sequenza errata: Coraggio -1':'Sequenza errata'):currentLanguage==='en'?(damage?'Wrong sequence: Courage -1':'Wrong sequence'):currentLanguage==='es'?(damage?'Secuencia incorrecta: Coraje -1':'Secuencia incorrecta'):currentLanguage==='fr'?(damage?'Mauvaise séquence : Courage -1':'Mauvaise séquence'):(damage?'Sequência errada: Coragem -1':'Sequência errada'));
        render();
        if (!state.players[0].alive) {
          els.sealDialog.close();
          lose('Il contraccolpo del rito ti toglie l’ultimo Coraggio.');
        }
      } else {
        const awakeningTriggered = advanceDoom(1, currentLanguage==='it'?'La sequenza errata fa risuonare una campana fuori tempo.':currentLanguage==='en'?'The wrong sequence makes an untimely bell ring.':currentLanguage==='es'?'La secuencia incorrecta hace sonar una campana fuera de tiempo.':currentLanguage==='fr'?'La mauvaise séquence fait sonner une cloche hors du temps.':'A sequência errada faz um sino tocar fora de hora.');
        render();
        if (!awakeningTriggered && state.phase !== 'awakening') toast(currentLanguage==='it'?'Sequenza errata: un rintocco in più':currentLanguage==='en'?'Wrong sequence: one extra toll':currentLanguage==='es'?'Secuencia incorrecta: una campanada más':currentLanguage==='fr'?'Mauvaise séquence : un coup de plus':'Sequência errada: um toque a mais');
      }
    }
  }

  async function completeRitual() {
    log(currentLanguage==='it'?'I tre Sigilli si accendono uno dopo l’altro. L’Ombra viene trascinata verso la Cripta.':currentLanguage==='en'?'The three Seals ignite one after another. The Shadow is dragged toward the Crypt.':currentLanguage==='es'?'Los tres Sellos se encienden uno tras otro. La Sombra es arrastrada hacia la Cripta.':currentLanguage==='fr'?'Les trois Sceaux s’illuminent l’un après l’autre. L’Ombre est entraînée vers la Crypte.':'Os três Selos se acendem um após o outro. A Sombra é arrastada para a Cripta.', t('finalRite'));
    for (let life = state.skullLife - 1; life >= 0; life--) {
      await wait(420);
      state.skullLife = life;
      renderDoom();
      sfx(170 + life * 75, 0.14);
    }
    await wait(380);
    if (els.sealDialog.open) els.sealDialog.close();
    win(0);
  }

  function closeGameplayDialogs() {
    [els.pathDialog, els.positionDialog, els.exploreDialog, els.testDialog, els.sealDialog, els.roomDialog, els.awakeningDialog, els.itemDialog].forEach(dialog => {
      if (dialog && dialog.open) dialog.close();
    });
  }

  function finalPositionLabel(player) {
    const tile = tiles[player.pos] || { name: t('position') };
    return `${localizedRoom(roomFor(player.pos),'name')} · ${t('tileLabel')} ${player.pos} · ${localizedTileName(tile)}`;
  }

  function renderFinalRanking(winnerIndex) {
    if (!els.resultRanking) return;
    const ranking = state.players.map((player, index) => ({ player, index }))
      .sort((a, b) => {
        if (a.index === winnerIndex) return -1;
        if (b.index === winnerIndex) return 1;
        if (b.player.pos !== a.player.pos) return b.player.pos - a.player.pos;
        return b.player.hearts - a.player.hearts;
      });
    els.resultRanking.innerHTML = ranking.map(({ player, index }, rank) => `
      <article class="ranking-row ${index === winnerIndex ? 'winner' : ''}">
        <span class="ranking-place">${rank + 1}°</span>
        <img src="${player.avatar}" alt="${player.name}">
        <div><strong>${index === winnerIndex ? '🏆 ' : ''}${player.name}</strong><small>${finalPositionLabel(player)}</small></div>
        <span class="ranking-hearts">${'❤️'.repeat(Math.max(0, player.hearts))}</span>
      </article>`).join('');
  }

  function buildVictoryParticles(enabled) {
    if (!els.victoryParticles) return;
    els.victoryParticles.innerHTML = '';
    if (!enabled) return;
    const glyphs = ['✦','✧','✶','◆','⋆'];
    for (let i = 0; i < 34; i++) {
      const span = document.createElement('span');
      span.textContent = glyphs[i % glyphs.length];
      span.style.setProperty('--x', `${4 + Math.random() * 92}%`);
      span.style.setProperty('--delay', `${Math.random() * 2.4}s`);
      span.style.setProperty('--dur', `${2.4 + Math.random() * 2.6}s`);
      span.style.setProperty('--size', `${10 + Math.random() * 18}px`);
      els.victoryParticles.appendChild(span);
    }
  }

  function win(winnerIndex = 0) {
    if (state.ended) return;
    const winner = state.players[winnerIndex];
    const heroWon = winnerIndex === 0;
    state.ended = true;
    state.phase = 'ended';
    state.skullLife = 0;
    state.winnerIndex = winnerIndex;
    log(currentLanguage==='it'?'Il coperchio della Cripta si chiude. L’Ombra si accartoccia su se stessa finché nella bara rimane soltanto un piccolo osso ingiallito.':currentLanguage==='en'?'The Crypt lid closes. The Shadow folds in on itself until only a small yellowed bone remains in the coffin.':currentLanguage==='es'?'La tapa de la Cripta se cierra. La Sombra se repliega sobre sí misma hasta que solo queda un pequeño hueso amarillento en el ataúd.':currentLanguage==='fr'?'Le couvercle de la Crypte se ferme. L’Ombre se replie sur elle-même jusqu’à ce qu’il ne reste qu’un petit os jauni dans le cercueil.':'A tampa da Cripta se fecha. A Sombra se dobra sobre si mesma até restar apenas um pequeno osso amarelado no caixão.', t('winnerSealed',{name:winner.name}));
    render();
    closeGameplayDialogs();
    els.resultDialog.classList.toggle('hero-victory', heroWon);
    $('#resultEyebrow').textContent = heroWon ? t('youWon') : t('finalWinner',{name:winner.name.toUpperCase()});
    $('#resultTitle').textContent = heroWon ? (currentLanguage==='it'?'Il Maniero si piega davanti a te':currentLanguage==='en'?'The Manor bends before you':currentLanguage==='es'?'La Mansión se inclina ante ti':currentLanguage==='fr'?'Le Manoir s’incline devant vous':'O Casarão se curva diante de você') : t('winnerSealed',{name:winner.name});
    $('#resultText').textContent = heroWon
      ? t('heroVictoryText')
      : t('rivalVictoryText',{name:winner.name});
    if (els.winnerAvatar) { els.winnerAvatar.src = winner.avatar; els.winnerAvatar.alt = `${currentLanguage==='it'?'Vincitore':currentLanguage==='en'?'Winner':currentLanguage==='es'?'Ganador':currentLanguage==='fr'?'Vainqueur':'Vencedor'}: ${winner.name}`; }
    $('#resultImage').src = 'assets/rooms/cripta.jpg';
    renderFinalRanking(winnerIndex);
    buildVictoryParticles(heroWon);
    els.resultDialog.showModal();
  }

  function lose(text) {
    if (state.ended) return;
    state.ended = true;
    state.phase = 'ended';
    render();
    closeGameplayDialogs();
    $('#resultEyebrow').textContent = currentLanguage==='it'?'SCONFITTA':currentLanguage==='en'?'DEFEAT':currentLanguage==='es'?'DERROTA':currentLanguage==='fr'?'DÉFAITE':'DERROTA';
    $('#resultTitle').textContent = currentLanguage==='it'?'Il Maniero si è svegliato':currentLanguage==='en'?'The Manor has awakened':currentLanguage==='es'?'La Mansión ha despertado':currentLanguage==='fr'?'Le Manoir s’est éveillé':'O Casarão despertou';
    $('#resultText').textContent = localizeRuntimeText(text,'meta');
    $('#resultImage').src = 'assets/rooms/cripta.jpg';
    els.resultDialog.showModal();
  }

  function beginNewGameFlow() {
    gameActive = false;
    if (els.roomBtn) els.roomBtn.disabled = true;
    stopMusic(true);
    closeGameplayDialogs();
    if (els.resultDialog.open) els.resultDialog.close();
    storyMode = 'newGame';
    renderGameLifecycleButton();
    els.storyClose.style.display = 'none';
    els.storyContinue.style.display = '';
    if (!els.storyDialog.open) els.storyDialog.showModal();
  }

  function showStoryForViewing() {
    storyMode = 'view';
    els.storyClose.style.display = '';
    els.storyContinue.style.display = 'none';
    if (!els.storyDialog.open) els.storyDialog.showModal();
  }

  function openProfileForNewGame() {
    els.profileName.value = '';
    const male = els.profileForm.querySelector('input[name="heroGender"][value="male"]');
    if (male) male.checked = true;
    if (!els.profileDialog.open) els.profileDialog.showModal();
    setTimeout(() => els.profileName.focus(), 60);
  }

  async function submitProfile(event) {
    event.preventDefault();
    if (!els.profileForm.reportValidity()) return;
    const data = new FormData(els.profileForm);
    pendingProfile = {
      name: els.profileName.value.trim().slice(0, 20) || 'Luca',
      gender: data.get('heroGender') === 'female' ? 'female' : 'male'
    };
    if (els.profileDialog.open) els.profileDialog.close();
    // aggiorna le miniature del protagonista nella difficoltà
    document.querySelectorAll('.difficulty-portraits img:first-child').forEach(img => { img.src = pendingProfile.gender === 'female' ? portraits.female : portraits.male; });
    if (!els.difficultyDialog.open) els.difficultyDialog.showModal();
  }

  async function startGameWithDifficulty(difficulty) {
    selectedDifficulty = ['easy','medium','hard'].includes(difficulty) ? difficulty : 'hard';
    profile = pendingProfile || profile;
    if (els.difficultyDialog.open) els.difficultyDialog.close();
    localStorage.removeItem(SAVE_KEY);
    state = createState();
    gameActive = true;
    els.startScreen.classList.add('hidden');
    render();
    stopMusic(true);
    await startMusic();
    // La dashboard resta disponibile come riepilogo, ma il gioco parte direttamente nella stanza.
    openRoomDialog();
  }

  function returnToStart() {
    gameActive = false;
    localStorage.removeItem(SAVE_KEY);
    if (els.roomBtn) els.roomBtn.disabled = true;
    stopMusic(true);
    closeGameplayDialogs();
    if (els.resultDialog.open) els.resultDialog.close();
    els.startScreen.classList.remove('hidden');
    renderGameLifecycleButton();
  }

  function initializeEvents() {
    els.ambientAudio.addEventListener('ended', playNextMusicTrack);
    els.startGame.addEventListener('click', beginNewGameFlow);
    if (els.languageSelect) els.languageSelect.addEventListener('change', e => applyLanguage(e.target.value));
    if (els.languageSelectTop) els.languageSelectTop.addEventListener('change', e => applyLanguage(e.target.value));
    document.querySelectorAll('.difficulty-choice').forEach(button => button.addEventListener('click', () => startGameWithDifficulty(button.dataset.difficulty)));
    $('#newGameBtn').addEventListener('click', () => {
      if (gameActive && state && !state.ended) {
        if (confirm(currentLanguage==='it'?'Terminare la partita corrente e tornare alla schermata iniziale?':currentLanguage==='en'?'End the current game and return to the start screen?':currentLanguage==='es'?'¿Terminar la partida actual y volver a la pantalla inicial?':currentLanguage==='fr'?'Terminer la partie en cours et revenir à l’écran initial ?':'Encerrar o jogo atual e voltar à tela inicial?')) returnToStart();
      } else {
        beginNewGameFlow();
      }
    });

    $('#storyBtn').addEventListener('click', showStoryForViewing);
    els.storyClose.addEventListener('click', () => els.storyDialog.close());
    els.storyContinue.addEventListener('click', () => {
      if (els.storyDialog.open) els.storyDialog.close();
      openProfileForNewGame();
    });

    els.profileForm.addEventListener('submit', submitProfile);

    $('#pathBtn').addEventListener('click', openPathDialog);
    els.roomBtn.addEventListener('click', () => { if (gameActive && !state.ended) openRoomDialog(); });
    if (els.testAwakeningBtn) els.testAwakeningBtn.addEventListener('click', previewTwelfthBell);
    els.roomMinimizeBtn.addEventListener('click', () => {
      hideInventoryReminder();
      if (els.roomDialog.open) els.roomDialog.close();
      toast(currentLanguage==='it'?'Stanza minimizzata · usa 🏰 Stanza per riaprirla':currentLanguage==='en'?'Room minimized · use 🏰 Room to reopen it':currentLanguage==='es'?'Sala minimizada · usa 🏰 Sala para volver a abrirla':currentLanguage==='fr'?'Pièce réduite · utilisez 🏰 Pièce pour la rouvrir':'Cômodo minimizado · use 🏰 Cômodo para reabri-lo');
    });
    els.roomPathBtn.addEventListener('click', openPathDialog);
    if (els.roomRitualAnchorBtn) els.roomRitualAnchorBtn.addEventListener('click', () => scrollRoomSideTo(els.roomRitualSection));
    if (els.roomInventoryAnchorBtn) els.roomInventoryAnchorBtn.addEventListener('click', () => scrollRoomSideTo(els.roomInventorySection));
    if (els.roomInventoryReminder) {
      els.roomInventoryReminder.addEventListener('click', hideInventoryReminder);
      els.roomInventoryReminder.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); hideInventoryReminder(); }
      });
    }
    els.pathDialogClose.addEventListener('click', () => els.pathDialog.close());
    if (els.board) els.board.addEventListener('click', event => {
      const tile = event.target.closest('.path-position-tile');
      if (tile) openPositionDialog(Number(tile.dataset.tileId));
    });
    if (els.positionDialogClose) els.positionDialogClose.addEventListener('click', () => els.positionDialog.close());
    els.awakeningContinue.addEventListener('click', async () => {
      if (els.awakeningDialog.open) els.awakeningDialog.close();
      els.awakeningDialog.classList.remove('awakening-playing', 'awakening-ready');
      if (settings.soundOn && els.ambientAudio) els.ambientAudio.volume = 0.26;
      if (awakeningPreviewMode) {
        awakeningPreviewMode = false;
        render();
        toast(currentLanguage==='it'?'Anteprima del XII rintocco terminata':currentLanguage==='en'?'Twelfth-toll preview ended':currentLanguage==='es'?'Vista previa de la duodécima campanada terminada':currentLanguage==='fr'?'Aperçu du douzième coup terminé':'Prévia do décimo segundo toque encerrada');
        return;
      }

      const resumePhase = awakeningResumePhase;
      const finishInterruptedTurn = awakeningResumeAfterTurn;
      awakeningResumePhase = null;
      awakeningResumeAfterTurn = false;

      if (finishInterruptedTurn) {
        state.phase = 'bots';
        state.activePlayer = 0;
        render();
        renderRoom(currentLanguage==='it'?'Il XII rintocco ha interrotto il tuo turno. Ora il Teschio è libero.':currentLanguage==='en'?'The twelfth toll interrupted your turn. The Skull is now free.':currentLanguage==='es'?'La duodécima campanada interrumpió tu turno. El Cráneo está libre.':currentLanguage==='fr'?'Le douzième coup a interrompu votre tour. Le Crâne est maintenant libre.':'O décimo segundo toque interrompeu seu turno. O Crânio está livre.');
        await runBotsAndEndRound();
        return;
      }

      state.phase = resumePhase === 'playerRitual' ? 'playerRitual' : 'playerRoll';
      state.activePlayer = 0;
      render();
      renderRoom(state.phase === 'playerRitual' ? (currentLanguage==='it'?'Il Teschio è libero. Il rito può continuare.':currentLanguage==='en'?'The Skull is free. The rite can continue.':currentLanguage==='es'?'El Cráneo está libre. El rito puede continuar.':currentLanguage==='fr'?'Le Crâne est libre. Le rite peut continuer.':'O Crânio está livre. O rito pode continuar.') : (currentLanguage==='it'?'Il Teschio è libero nel maniero.':currentLanguage==='en'?'The Skull is roaming the manor.':currentLanguage==='es'?'El Cráneo está libre en la mansión.':currentLanguage==='fr'?'Le Crâne est libre dans le manoir.':'O Crânio está livre no casarão.'));
    });

    els.soundBtn.addEventListener('click', toggleMusic);
    els.roomMusicBtn.addEventListener('click', toggleMusic);

    els.roomRoll.addEventListener('click', rollHuman);
    els.exploreContinue.addEventListener('click', closeOutcome);
    els.roomSealBtn.addEventListener('click', openSealDialog);

    const handleInventoryClick = event => {
      const button = event.target.closest('.inventory-use-btn');
      if (button) openItemDialog(button.dataset.itemId);
    };
    els.inventory.addEventListener('click', handleInventoryClick);
    if (els.roomInventory) els.roomInventory.addEventListener('click', handleInventoryClick);
    els.itemTargetArea.addEventListener('click', event => {
      const button = event.target.closest('.item-target-btn');
      if (button) selectItemTarget(Number(button.dataset.targetIndex));
    });
    els.itemUseConfirm.addEventListener('click', confirmItemUse);
    els.itemDialogClose.addEventListener('click', closeItemDialog);

    $('#sealClose').addEventListener('click', () => els.sealDialog.close());
    $('#resetSequence').addEventListener('click', () => { currentSequence = []; renderSealSequence(); });
    document.querySelectorAll('[data-seal]').forEach(button => button.addEventListener('click', () => pushSeal(button.dataset.seal)));

    $('#playAgainBtn').addEventListener('click', () => {
      if (els.resultDialog.open) els.resultDialog.close();
      beginNewGameFlow();
    });

    if (els.positionDialog) els.positionDialog.addEventListener('cancel', event => event.preventDefault());
    els.roomDialog.addEventListener('cancel', event => event.preventDefault());
    els.exploreDialog.addEventListener('cancel', event => event.preventDefault());
    els.testDialog.addEventListener('cancel', event => event.preventDefault());
    els.awakeningDialog.addEventListener('cancel', event => event.preventDefault());
  }

  function boot() {
    loadMusicTrack(0, true);
    updateMusicButtons();
    applyLanguage(currentLanguage, false);
    initializeEvents();
    gameActive = false;
    state = createState();
    render();
    els.startScreen.classList.remove('hidden');
    if (els.roomBtn) els.roomBtn.disabled = true;
    stopMusic(true);
  }

  boot();
})();
