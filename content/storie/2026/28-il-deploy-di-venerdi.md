# Il Deploy Di Venerdì

**Data**: 30/08/2026

---

**[Home](../index.md) | [Precedente](27-la-demo-davanti-al-ceo.md)**

---

C'è una cosa che ho imparato: il venerdì ha due parti. La mattina, dove tutto sembra possibile. E il pomeriggio, dove tutto si rompe. E il deploy di venerdì pomeriggio è la linea che le divide.

![](../../img/deploy.jpg)

Era un venerdì. Le 16:30. Il PM è arrivato alla mia scrivania.

"Dobbiamo fare un deploy."

"Oggi?"

"Sì. Il cliente vuole la feature per il weekend."

"Il weekend inizia tra 30 minuti."

"Lo so. Ma il deploy è veloce. Cinque minuti."

"Il deploy è veloce. Il debug no."

"Non c'è bisogno di debug. Il codice è testato."

"Il codice è testato. L'ambiente di produzione no."

Il JN ha alzato la testa. "Faccio io il deploy!"

"No" ho detto.

"Perché? Ho fatto il deploy martedì. È andato bene."

"Martedì non è venerdì."

"Che differenza fa?"

"La differenza tra un pomeriggio tranquillo e un weekend in ufficio."

Il TL è passato. "Cosa succede?"

"Il PM vuole fare un deploy."

"Oggi? Venerdì?"

"Sì."

"Alle 16:30?"

"Sì."

Il TL ha guardato il PM. "Possiamo farlo lunedì?"

"Il cliente vuole la feature per il weekend."

"E se si rompe qualcosa?"

"Non si rompe niente. Il JN ha testato tutto."

Il JN ha annuito. "Ho fatto 47 test. Tutti verdi."

"47 test?" ho chiesto.

"Sì. Per la nuova feature."

"E i test di regressione?"

"I test di regressione?"

"Sì. Quelli che verificano che tutto il resto funziona ancora."

"Oh. Quelli non li ho fatti."

Il PM ha guardato il JN. "Quindi non sappiamo se si rompe altro?"

"Probabilmente no" ha detto il JN. "La feature è isolata."

"Probabilmente" ho detto. "La parola preferita di ogni sviluppatore prima di un disastro."

Il CTO è passato. "Cosa state discutendo?"

"Deploy di venerdì" ha detto il TL.

"Alle 16:30?" ha chiesto il CTO.

"Sì."

"Fatelo."

Tutti si sono girati verso il CTO.

"Fatelo" ha ripetuto. "Ma se si rompe qualcosa, lo sistemate voi. Io ho un volo alle 19:00."

Il PM ha guardato me. Io ho guardato il JN. Il JN ha guardato il terminale.

"Ok" ho detto. "Facciamo il deploy."

Il JN ha aperto la pipeline. Ha cliccato "Deploy to Production". La barra è avanzata. 10%. 20%. 50%. 80%. 100%.

"Deploy completato" ha detto il JN. "Visto? Tutto bene."

Ho aperto il browser. Ho caricato il sito.

Errore 503.

"Che è successo?" ha chiesto il PM.

"Il sito è giù."

"Giù? Ma il deploy è andato bene!"

"Il deploy è andato bene. Il codice no."

Il JN era pallido. "Non capisco. I test erano verdi."

"I test della feature erano verdi. I test di regressione non esistono. E la feature ha rotto il login. E senza login, niente funziona."

Il PM ha guardato l'orologio. 16:47.

"Quanto tempo per sistemare?"

"Non lo so. Devo capire cosa è successo."

"Il cliente chiama tra 10 minuti per verificare."

"Allora il cliente sarà deluso."

Ho aperto i log. Ho trovato l'errore. La nuova feature usava una variabile globale. Che sovrascriveva la variabile del login. Che rompeva tutto.

"Chi ha usato una variabile globale?" ho chiesto.

Il JN ha alzato la mano. "Era più comodo."

"Più comodo per chi?"

"Per me. Per non passare parametri."

"E ora è comodo?"

"No."

Il TL ha sospirato. "Rollback?"

"Sì. Rollback."

Ho fatto il rollback. Il sito è tornato su. Ma la feature era sparita.

Il PM ha chiamato il cliente. "Abbiamo avuto un problema. La feature sarà disponibile lunedì."

"Lunedì?" ha urlato il cliente. "Avevate detto questo weekend!"

"Lo so. Ma c'è stato un imprevisto."

"Un imprevisto? È venerdì sera! Gli imprevisti non succedono di venerdì sera!"

Il PM ha coperto il telefono. "Il cliente è arrabbiato."

"Lo vedo."

"Cosa posso dirgli?"

"Digli che abbiamo imparato una lezione."

"Quale lezione?"

"Che il deploy di venerdì è una pessima idea. E che le variabili globali sono peggio. E che i test di regressione servono. E che 'probabilmente' non è una garanzia. E che il weekend del cliente è più importante del nostro weekend. E che il CTO ha un volo alle 19:00 mentre noi siamo ancora qui."

Il PM ha parlato al telefono. "Sì. Lunedì. Assolutamente. Ci scusiamo. Grazie."

Ha riattaccato. "Lunedì. Prima cosa."

"Sì. Lunedì. Prima cosa."

Il JN era seduto. Silenzioso.

"Ho rovinato tutto" ha detto.

"No" ho detto. "Hai imparato."

"Cosa?"

"Che il venerdì pomeriggio non è il momento per i deploy. Che le variabili globali sono pericolose. E che i test di regressione non sono opzionali."

"E altro?"

"Sì. Che quando un senior ti dice di non fare qualcosa, c'è un motivo. Non è pigrizia. È esperienza. Esperienza di cose che si sono rotte. Di weekend rovinati. Di clienti arrabbiati. Di rollback alle 17:00 di venerdì."

Il JN ha annuito. "Non farò più deploy di venerdì."

"Bene. E non userai più variabili globali."

"Mai più."

"E farai i test di regressione."

"Sempre."

La morale: il deploy di venerdì è come il russo. Non si gioca. E se giochi, perdi. Sempre. Può andare bene 99 volte. La 100a si rompe. Ed è sempre la 100a. Quella che conta. Quella con il cliente che aspetta. Quella con il CTO che ha un volo. Quella con il weekend che svanisce. E tu lì. Davanti al terminale. A chiederti perché. Perché oggi? Perché questo deploy? Perché questa feature? E la risposta è: perché il venerdì pomeriggio esiste. E il PM esiste. E le scadenze esistono. E tu esisti. Per fare deploy. Di venerdì. Alle 16:30. Come un pazzo. O un eroe. O entrambi. Ma mai un genio. Perché i geni non fanno deploy di venerdì. I geni fanno deploy di martedì. Mattina. Dopo il caffè. Con i test di regressione. E il rollback pronto. E il weekend libero. Per vivere. Non per debuggare.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](27-la-demo-davanti-al-ceo.md)**
