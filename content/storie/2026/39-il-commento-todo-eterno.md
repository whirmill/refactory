# Il Commento TODO Eterno

**Data**: 15/11/2026

**[Home](../index.md) | [Precedente](38-il-deploy-del-venerdi.md) | [Prossima](40-il-meeting-che-poteva-essere-una-email.md)]**

---

C'è un commento nel codice. Dice `// TODO: fix this`. È stato scritto nel 2018. Da qualcuno che non lavora più qui. In un file che nessuno tocca più. In una funzione che fa qualcosa che nessuno ricorda. Ma il TODO è lì. E il TODO aspetta. Come un fantasma. Come un debito. Come una promessa che non verrà mai mantenuta.

![](../../img/code.jpg)

Il TODO è nel file `utils.js`. Alla riga 847. La funzione si chiama `processData()`. Prende dei dati. Fa qualcosa. Ritorna qualcosa. Nessuno sa cosa. Ma funziona. O almeno, non si lamenta nessuno. E quando nessuno si lamenta, non si tocca nulla. Perché toccare è pericoloso. Toccare è rischioso. Toccare è come svegliare un drago addormentato.

Il TODO dice: `// TODO: fix this - this is a hack, should use proper validation`.

Ma non c'è validazione. C'è solo l'hack. E l'hack funziona. Da 8 anni. Senza problemi. Senza bug. Senza lamentele. Ma il TODO è lì. A ricordarci che siamo degli impostori. Che il nostro codice è sporco. Che la nostra coscienza non è pulita.

---

La prima volta che ho visto il TODO, era il 2020. Ero nuovo. Ero ingenuo. Credevo che i TODO fossero promesse. Promesse di miglioramento. Promesse di pulizia. Promesse di un futuro migliore.

Ho chiesto al TL: "Cos'è questo TODO?"

Il TL ha guardato. Ha sorriso. Un sorso amaro. Un sorriso di chi ha visto troppo. Di chi sa troppo. Di chi ha smesso di sperare.

"Quale TODO?"

"Quello alla riga 847 di utils.js. Dice 'fix this'."

"Ah. Quello."

"Sì. Dovrei fixarlo?"

"No."

"Perché?"

"Perché è lì da prima di me. È lì da prima del CTO. È lì da prima dell'azienda stessa. È il TODO primordiale. Il TODO che ha dato origine a tutti gli altri TODO."

"Ma dice 'fix this'. Dovremmo fixarlo."

"Se lo tocchi, rompi tutto."

"Come fai a saperlo?"

"Perché l'ho toccato. Nel 2019. E ho rotto tutto."

"Cos'è successo?"

"Il sistema di fatturazione ha smesso di funzionare. Per 3 giorni. Il CTO mi ha urlato. Il PM mi ha odiato. Il CEO mi ha guardato come se fossi un traditore. E io ho imparato. Ho imparato che alcuni TODO non vanno toccati. Vanno adorati. Vano temuti. Vanno lasciati in pace."

---

Il TODO ha una storia. Una storia lunga. Una storia segreta. Una storia che ho scavato. Perché sono testardo. Perché sono curioso. Perché voglio sapere. Anche se sapere fa male.

**2018 - La Creazione**
Il TODO è stato scritto da Bob. Sì, Bob. Sempre Bob. Bob che ha configurato la CI male. Bob che ha lasciato variabili impossibili. Bob che è ovunque. Bob è il nostro fantasma. Il nostro spettro. La nostra maledizione.

Il commit di Bob diceva: "Quick fix for data processing, will clean up later."

"Later" non è mai arrivato. Bob se n'è andato nel 2019. Il TODO è rimasto. Eterno. Immortale. Come tutti i TODO di Bob.

**2019 - Il Primo Tentativo**
Il TL (allora Mid Engineer) ha provato a fixare. Ha rimosso l'hack. Ha aggiunto validazione. Ha fatto tutto "correttamente".

Il sistema di fatturazione ha smesso di funzionare. Perché la "validazione" rifiutava dati che il sistema di fatturazione accettava. E il sistema di fatturazione era configurato male. Da Bob. Nel 2018. E nessuno lo sapeva. Perché Bob non documentava. Bob codava. E se ne andava.

Il TL ha fatto rollback. Ha rimesso l'hack. Ha aggiunto un altro TODO: `// TODO: the previous TODO is here for a reason, don't touch it`.

Ora c'erano due TODO. Uno che diceva "fix this". Uno che diceva "non toccare". Una contraddizione perfetta. Un ossimoro di codice. Un monumento all'impossibilità.

**2020 - Il Secondo Tentativo**
Il JN (allora vero JN) ha provato a fixare. Non sapeva del primo tentativo. Non sapeva del TL. Non sapeva di nulla. Era nuovo. Era giovane. Era condannato.

Il JN ha rimosso entrambi i TODO. Ha riscritto la funzione. Ha aggiunto test. Ha fatto tutto "correttamente".

I test passavano. In locale. Ma in produzione, la funzione processava 847.000 record in 47 minuti. Invece di 3 secondi. Perché la "validazione" faceva 847 query per ogni record. E il database moriva. E il server moriva. E tutto moriva.

Il JN ha fatto rollback. Ha rimesso i TODO. Ha aggiunto un terzo commento: `// TODO: seriously, don't touch this, see JIRA-1337 for details`.

Ora c'erano tre TODO. Una trinità di disperazione. Un monumento all'apprendimento per trauma.

---

**2021 - L'Indagine**

Ho deciso di indagare. Davvero. Non solo guardare e scrollare le spalle. Ma indagare. Come un archeologo. Come uno storico. Come qualcuno che vuole capire il passato per non ripeterlo.

Ho guardato la funzione. La funzione faceva questo:
```javascript
function processData(data) {
  // TODO: fix this - this is a hack, should use proper validation
  // TODO: the previous TODO is here for a reason, don't touch it
  // TODO: seriously, don't touch this, see JIRA-1337 for details
  
  if (!data) return null; // hack: null check instead of validation
  
  return data.map(item => {
    // hack: assume item has the right structure
    return {
      id: item.id || item.ID || item.Id || item.iD, // hack: case-insensitive
      name: item.name || item.NAME || item.Name || '', // hack: default empty
      value: parseFloat(item.value) || 0 // hack: default zero
    };
  });
}
```

La funzione era un hack. Un hack su un hack su un hack. Ma funzionava. Perché accettava tutto. Qualsiasi formato. Qualsiasi struttura. Qualsiasi schifezza. E la trasformava in qualcosa di utilizzabile.

Era brutto. Era sporco. Era vergognoso. Ma funzionava. Da 8 anni. Senza problemi. Perché il mondo è sporco. I dati sono sporchi. La vita è sporca. E a volte, l'unico modo per sopravvivere è essere sporchi anche tu.

---

**2022 - La Tentazione**

Il PM ha chiesto: "Possiamo pulire il codice?"

Il TL ha risposto: "No."

"Perché?"

"Perché è pericoloso."

"Ma è sporco."

"Sì. Ma funziona."

"E se lo puliamo e funziona meglio?"

"E se lo puliamo e smette di funzionare?"

"Non succederà. Siamo bravi."

"Sì. Anche Bob era bravo. E guarda cosa ci ha lasciato."

Il PM ha insistito. Il PM voleva "clean code". Il PM voleva "best practices". Il PM voleva "professionalità". Ma il PM non sapeva. Non sapeva del 2019. Non sapeva del 2020. Non sapeva del dolore.

Il TL ha organizzato una riunione. Con me. Con il JN. Con il PM. Con il CTO.

Il TL ha spiegato: "Il TODO è lì per un motivo. Il motivo è: se lo tocchi, muori."

Il CTO ha annuito. Il CTO sapeva. Il CTO aveva visto. Il CTO aveva urlato nel 2019. E ricordava.

Il PM ha chiesto: "Ma non possiamo almeno documentarlo?"

Il TL ha risposto: "Possiamo. Ma chi lo leggerà?"

"I nuovi assunti."

"I nuovi assunti non leggono la documentazione. Leggono il codice. E vedono TODO. E pensano: 'Ah, un TODO! Devo fixarlo!' E lo toccano. E rompono tutto. E noi urliamo. E il ciclo continua."

"Allora cosa facciamo?"

"Niente. Non facciamo niente. Lasciamo il TODO. E preghiamo. Preghiamo che nessuno lo tocchi. Mai."

---

**2023 - Il Nuovo JN**

Un nuovo JN è arrivato. Giovane. Entusiasta. Pieno di IDE configurati per evidenziare i TODO. Con plugin che contano i TODO. Con un dashboard che mostra: "Hai 847 TODO nel tuo codice!"

Il nuovo JN ha visto il TODO. Ha detto: "Posso fixarlo?"

Il TL ha detto: "No."

"Il mio IDE dice che ci sono 847 TODO nel codice."

"Sì. E?"

"Dovremmo fixarli."

"Dovremmo. Ma non lo facciamo."

"Perché?"

"Perché alcuni TODO sono sacri. Questo TODO è sacro. Non toccarlo."

Il nuovo JN non ha toccato. Ma ha creato un documento. Un documento che elencava tutti i TODO. Con priorità. Con stime. Con assegnatari.

Il TODO alla riga 847 di utils.js era in cima alla lista. Priorità: "Alta". Stima: "2 ore". Assegnatario: "TBD".

Il TL ha visto il documento. Ha sorriso. Un sorriso stanco. Un sorriso di rassegnazione.

"Bel documento."

"Grazie! Possiamo iniziare a lavorare sui TODO?"

"No."

"Ma li ho stimati!"

"Sì. E le stime sono sbagliate."

"Come fai a saperlo?"

"Perché quel TODO lì in cima? Quello da 2 ore? Se lo tocchi, ci metti 2 settimane. E rompi tutto. E il CTO ti urla. E il PM ti odia. E tu impari. Impari che le stime sono bugiarde. Che i TODO sono trappole. Che il codice è un campo minato."

Il nuovo JN ha imparato. Come abbiamo imparato tutti. Per trauma. Per dolore. Per esperienza.

---

**2024 - L'Espansione**

Il TODO ha generato altri TODO. Non nel codice. Ma nelle menti. Ogni volta che qualcuno vedeva un TODO, pensava: "Questo è come il TODO di utils.js. Meglio non toccarlo."

E così, i TODO si sono moltiplicati. Non perché ne aggiungessimo. Ma perché smettevamo di rimuoverli. I TODO diventavano permanenti. Diventavano parte del codice. Parte della cultura. Parte di noi.

Il codice era pieno di TODO. `// TODO: refactor this`. `// TODO: add tests`. `// TODO: optimize`. `// TODO: fix this`. Ma nessuno li toccava. Perché il TODO primordiale ci aveva insegnato. Ci aveva traumatizzati. Ci aveva resi codardi.

Il PM ha chiesto: "Perché ci sono così tanti TODO?"

Il TL ha risposto: "Perché abbiamo paura."

"Paura di cosa?"

"Paura di rompere."

"Ma i TODO sono promesse di miglioramento!"

"I TODO sono bugie. Bugie che diciamo a noi stessi. Per sentirci meglio. Per sentirci professionali. Ma non le manteniamo. Mai. Perché abbiamo paura. E la paura vince. Sempre."

---

**2025 - L'Accettazione**

Ho smesso di combattere. Ho smesso di voler fixare. Ho smesso di credere nei TODO.

I TODO sono parte del codice. Come i commenti. Come i bug. Come la vergogna.

Ogni volta che scrivo un TODO, so che non lo fixerò. So che rimarrà lì. Per sempre. Come il TODO di Bob. Come il TODO del 2018. Come tutti i TODO del mondo.

Ma lo scrivo comunque. Perché mi fa sentire meglio. Mi fa sentire come se avessi un piano. Come se avessi un futuro. Come se avessi il controllo.

Ma non ho il controllo. Non ho il futuro. Non ho il piano. Ho solo il TODO. E il TODO è una bugia. Una bugia gentile. Una bugia necessaria. Una bugia che mi permette di andare avanti. Senza impazzire. Senza arrendermi. Senza piangere.

---

**2026 - Oggi**

Il TODO è ancora lì. Alla riga 847 di utils.js. Con i suoi due fratelli. La trinità della disperazione.

Ogni tanto, qualcuno lo vede. Qualcuno nuovo. Qualcuno che non sa. E chiede: "Cos'è questo TODO?"

E noi rispondiamo: "Non toccarlo."

"Perché?"

"Perché è sacro."

"Sacro?"

"Sacro. E maledetto. E eterno. Come tutti i TODO che non verranno mai fixati."

Il nuovo JN annuisce. E impara. Come abbiamo imparato tutti. Che il codice è pieno di promesse non mantenute. Pieno di buone intenzioni. Pieno di speranze. Ma le promesse non vengono mantenute. Le intenzioni svaniscono. Le speranze muoiono.

E i TODO rimangono. Per sempre. Come monumenti alla nostra imperfezione. Come promemoria della nostra umanità. Come testimoni del fatto che siamo tutti, tutti, imperfetti.

---

## Il costo del TODO eterno

| Voce | Valore |
|------|--------|
| Anni di vita del TODO | 8 |
| Tentativi di fix | 3 |
| Sistemi rotti | 2 (fatturazione, database) |
| Ore perse | ~120 |
| JN traumatizzati | 3 |
| TODO generati dal TODO originale | 847 |
| Documenti creati per i TODO | 1 (ignorato) |
| Valore del TODO | Negativo (ma intoccabile) |

**Morale**: I TODO sono bugie. Bugie gentili che diciamo a noi stessi per sentirci meglio. "Fixerò questo dopo." "Aggiungerò test." "Refattorizzerò." Ma non lo facciamo. Mai. Perché abbiamo paura. E la paura vince. E i TODO rimangono. Per sempre. Come fantasmi. Come debiti. Come promesse non mantenute. E l'unica cosa che possiamo fare è accettarli. E non toccarli. Mai. Perché se li tocchi, muori. Metaforicamente. O letteralmente. Dipende dal CTO.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](38-il-deploy-del-venerdi.md)]**
