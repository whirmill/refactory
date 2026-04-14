# Il Ticket Che Non Muore Mai

**Data**: 25/10/2026

**[Home](../index.md) | [Precedente](35-il-server-fantasma.md)**

---

C'è un ticket nel nostro sistema. È stato aperto nel 2019. È stato chiuso 47 volte. È stato riaperto 47 volte. È stato riassegnato a 12 persone diverse. È stato etichettato come "bug", "feature", "wontfix", "cantfix", "wonteverfix", e "perché dio perché". Ma il ticket non muore. Il ticket è immortale. E ci perseguita. Tutti. Per sempre.

![](../../img/code.jpg)

Il ticket è JIRA-1337. Sì, 1337. "Leet". Il numero è un presagio. Un presagio che nessuno ha letto. Perché quando hai 847 ticket aperti, non hai tempo per i presagi. Hai tempo solo per la sopravvivenza.

Il ticket è stato aperto da un utente. Un utente che non esiste più. L'azienda ha chiuso il suo account nel 2020. Ma il ticket è rimasto. Perché i ticket non muoiono. I ticket sono come i vampiri. Hanno bisogno di sangue per sopravvivere. E il sangue è il nostro tempo. Il nostro dolore. La nostra sanità mentale.

Il titolo del ticket è: "La pagina si carica lentamente".

Solo questo. Nient'altro. Nessuna descrizione. Nessuno screenshot. Nessun log. Nessun contesto. Solo: "La pagina si carica lentamente".

Quale pagina? Non lo sappiamo. Quando? Non lo sappiamo. Quanto lentamente? Non lo sappiamo. Ma il ticket è lì. E il ticket aspetta. Come un predatore. Come un incubo. Come un debito che non si può ripagare.

---

La prima volta che ho visto il ticket, era il 2021. Ero nuovo. Ero ingenuo. Credevo che i ticket fossero fatti per essere risolti.

Ho chiesto al TL: "Cos'è questo ticket?"

Il TL ha guardato. Ha sbiancato. Ha detto: "Non toccarlo."

"Perché?"

"Perché è maledetto."

"Maledetto?"

"Sì. Chiunque lo tocchi, se ne pente."

"Ma è solo un ticket."

"Il ticket è stato aperto da un utente che non esiste più. Per un problema che non riusciamo a riprodurre. Su una pagina che non sappiamo quale sia. E ogni volta che qualcuno prova a fixarlo, rompe qualcos'altro."

"Qualcos'altro cosa?"

"L'ultima volta, il JN ha provato a ottimizzare il database. Ha cancellato 2 milioni di record. Per sbaglio. E il ticket è stato riaperto."

"Ma il JN ha fixato?"

"Il JN è stato riassegnato a un altro progetto. E il ticket è tornato aperto."

Così ho lasciato il ticket. Per 3 anni. E il ticket è rimasto lì. A aspettare. A crescere. A diventare leggenda.

---

Il ticket ha una storia. Una storia lunga. Una storia dolorosa. Una storia che nessuno vuole raccontare. Ma che racconterò. Perché qualcuno deve farlo. E quel qualcuno sono io. Come sempre.

**2019 - Apertura Originale**
Utente: "La pagina si carica lentamente."
Assegnatario: Nessuno
Stato: Open
Commenti: 0

**2019 - Prima Assegnazione**
TL: "Assegnato a ME."
ME: "Quale pagina?"
Utente: [nessuna risposta - l'utente non esiste più]
ME: "Non posso fixare senza sapere quale pagina."
TL: "Chiudi come 'incomplete'."
Stato: Closed
Commenti: 3

**2020 - Riapertura Misteriosa**
Sistema: "Ticket riaperto automaticamente. L'utente ha risposto."
Risposta: [il campo è vuoto]
ME: "Cosa?"
TL: "È un bug di JIRA. Ignora."
Stato: Closed
Commenti: 5

**2020 - Seconda Riapertura**
PM: "Un cliente si lamenta che le pagine sono lente."
ME: "Quale cliente? Quale pagina?"
PM: "Non lo so. Ma è urgente."
ME: "JIRA-1337?"
PM: "Sì. Quello."
ME: "Ma è del 2019."
PM: "E quindi?"
ME: "E quindi è vecchio. E non sappiamo quale pagina."
PM: "Allora ottimizza tutte le pagine."
ME: "Tutte?"
PM: "Tutte. È urgente."
Stato: Reopened
Commenti: 12

---

Il PM mi ha assegnato il compito di ottimizzare "tutte le pagine". Per un ticket del 2019. Senza sapere quale pagina fosse lenta. Senza sapere se era ancora lenta. Senza sapere nulla.

Ho fatto quello che ogni sviluppatore farebbe in questa situazione: ho guardato le metriche. Le metriche dicevano che le pagine erano veloci. Media: 1.2 secondi. Accettabile. Normale. Niente di lento.

Ho scritto nel ticket: "Le metriche mostrano che le pagine sono veloci. Media 1.2s. Chiudo come 'cannot reproduce'."

Il PM ha risposto: "Ma il cliente dice che è lento."

"Quale cliente?"

"Non lo so. Ma si lamenta."

"E noi non sappiamo chi è. Né quale pagina. Né quando è lento."

"Appunto. Dobbiamo indagare."

"Indagare cosa?"

"Indagare la lentezza."

"Quale lentezza?"

"La lentezza che il cliente percepisce."

"Il cliente che non conosciamo."

"Sì."

"Per una pagina che non conosciamo."

"Sì."

"In un momento che non conosciamo."

"Sì."

"Ok."

Ho chiuso il ticket come "wontfix". Con il commento: "Impossibile investigare senza informazioni. Ticket aperto da 2 anni. Utente non più attivo. Chiudo."

Il ticket è rimasto chiuso per 3 giorni. Poi si è riaperto. Da solo. Come un zombie. Come un demone. Come un karma che torna a morderti.

---

**2021 - Il JN Interviene**
Il JN era nuovo. Il JN era entusiasta. Il JN non sapeva. Non sapeva del ticket. Non sapeva della maledizione. Non sapeva di nulla.

Il JN ha visto il ticket. Ha detto: "Posso fixarlo?"

Io ho detto: "No."

Il JN ha detto: "Perché?"

Io ho detto: "Perché è maledetto."

Il JN ha detto: "Non credo nelle maledizioni. Credo nel codice."

Il JN ha creduto nel codice. E il codice l'ha tradito.

Il JN ha guardato il database. Ha visto che c'erano query lente. Ha ottimizzato le query. Ha aggiunto indici. Ha rimosso duplicati. Ha fatto tutto "correttamente".

E poi ha fatto il deploy.

E il sistema di login ha smesso di funzionare.

Perché le query che aveva ottimizzato erano usate dal sistema di login. E gli indici che aveva aggiunto avevano cambiato l'ordine dei risultati. E il sistema di login si aspettava un ordine specifico. E quando l'ordine è cambiato, il login è fallito. Per tutti. 847 utenti. Bloccati. Per 4 ore.

Il CTO mi ha chiamato: "Perché il login non funziona?"

"Il JN ha ottimizzato le query."

"Perché?"

"Per il ticket JIRA-1337."

"Quello del 2019?"

"Sì."

"E perché lo stiamo toccando?"

"Perché il JN non crede nelle maledizioni."

"E adesso?"

"Adesso crede."

Ho ripristinato il backup. Il login ha funzionato. Il JN è stato riassegnato. E il ticket è stato riaperto. Con un commento del PM: "Il login è lento. Vedi JIRA-1337."

Il ticket era diventato un buco nero. Attirava tutto. Tutti i problemi. Tutte le lamentele. Tutti i fallimenti. E li trasformava in commenti. Commenti che nessuno leggeva. Commenti che crescevano. Come un tumore. Come un debito. Come una vergogna collettiva.

---

**2022 - L'Esorcismo**
Il TL ha deciso che bastava. Ha chiamato una riunione. Con tutti. CTO, PM, io, il JN (che era tornato), e un consulente esterno.

Il consulente ha guardato il ticket. Ha detto: "Questo ticket è un sintomo."

"Un sintomo di cosa?" ha chiesto il CTO.

"Di un problema più grande. Il problema è che non avete processi. Non avete documentazione. Non avete memoria. Ogni volta che qualcuno tocca questo ticket, rompe qualcosa. Perché non sa cosa è stato fatto prima. Perché non sa cosa funziona. Perché non sa nulla."

"E quindi?"

"E quindi dovete documentare. Dovete tracciare. Dovete ricordare."

"E il ticket?"

"Il ticket va chiuso. Definitivamente. Con una spiegazione. Una spiegazione che dica: 'Non sappiamo quale pagina. Non sappiamo quale utente. Non possiamo fixare. Se hai lo stesso problema, apri un nuovo ticket con dettagli.'"

Il CTO ha annuito. Il PM ha annuito. Il TL ha annuito. Io ho annuito. Il JN ha annuito.

Abbiamo chiuso il ticket. Con la spiegazione. Abbiamo creato un template per i nuovi ticket. Con campi obbligatori. "Pagina", "Quando", "Cosa succede", "Cosa ti aspetti". Abbiamo documentato. Abbiamo tracciato. Abbiamo ricordato.

Per 2 settimane.

Poi il PM ha ricevuto una mail. Da un cliente. Che diceva: "Le pagine sono lente."

Il PM ha riaperto il ticket. Con il commento: "Vedi mail cliente."

E il ticket è tornato. Come un boomerang. Come un fantasma. Come un destino.

---

**2023 - La Resa**
Ho smesso di combattere. Ho smesso di chiudere. Ho smesso di sperare.

Il ticket è lì. JIRA-1337. Sempre aperto. Sempre assegnato a qualcuno. Sempre in attesa.

Ogni tanto, qualcuno ci aggiunge un commento. "Ancora lento." "Anche per me." "Perché è ancora aperto?" "Chi deve fixarlo?" "È urgente." "È critico." "È inaccettabile."

E ogni tanto, qualcuno lo riassegna. A me. Al JN. Al TL. Al CTO. A "Unassigned". A "Team Backend". A "Team Frontend". A "Team DevOps". A "Team Nessuno".

Ma il ticket non muore. Il ticket è eterno. Il ticket è la nostra vergogna. Il nostro fallimento. Il nostro monumento all'incompetenza organizzativa.

---

**2024 - L'Accettazione**
Ho imparato a convivere con il ticket. Come si convive con un dolore cronico. Come si convive con un parente fastidioso. Come si convive con la consapevolezza della propria mortalità.

Il ticket è parte della nostra cultura. I nuovi assunti lo vedono. Chiedono: "Cos'è questo ticket?"

E noi rispondiamo: "Non toccarlo."

"E perché è aperto?"

"Perché è maledetto."

"E non potete chiuderlo?"

"Possiamo. Ma si riapre."

"Sempre?"

"Sempre. Ogni volta. Senza eccezioni."

"E non potete fixarlo?"

"Non sappiamo cosa fixare."

"E quindi?"

"E quindi lo ignoriamo. Come ignoriamo la morte. Come ignoriamo le tasse. Come ignoriamo la realtà."

---

**2025 - L'Eredità**
Il JN non è più JN. Ora è "Mid Engineer". Ha imparato. Ha sofferto. Ha cresciuto.

Un giorno, un nuovo JN è arrivato. Un vero JN. Giovane. Entusiasta. Ignorante.

Il nuovo JN ha visto il ticket. Ha detto: "Posso fixarlo?"

Il vecchio JN (ora Mid) ha detto: "No."

"Perché?"

"Perché è maledetto."

"Non credo nelle maledizioni."

"Io sì. Ci ho creduto nel 2021. Quando ho rotto il login per 847 utenti. Per 4 ore. Per un ticket del 2019. Che non sapeva nemmeno quale pagina fosse lenta."

"E com'è andata?"

"Male. Molto male. Il CTO mi ha urlato. Il PM mi ha odiato. Il ME mi ha fixato. E io ho imparato. Ho imparato che alcuni ticket non vanno toccati. Vanno lasciati. Vanno ignorati. Vanno dimenticati."

"Ma non è sbagliato?"

"Sì. È sbagliato. Ma è sopravvivenza. E la sopravvivenza è più importante della correzione. Sempre."

---

**2026 - Oggi**
Il ticket è ancora lì. JIRA-1337. Aperto. Assegnato a "Unassigned". Con 847 commenti. Con 12 riassegnazioni. Con 47 chiusure e 47 riaperture.

Il titolo è sempre lo stesso: "La pagina si carica lentamente."

La descrizione è sempre vuota.

L'utente non esiste più.

La pagina non si sa quale sia.

Ma il ticket è lì. E ci sarà per sempre. Come un monumento. Come un avvertimento. Come una maledizione.

E ogni tanto, qualcuno lo guarda. E qualcuno dice: "Dovremmo fixarlo."

E qualcun altro risponde: "No. Non toccarlo. È maledetto."

E il ticket aspetta. Paziente. Eterno. Immortale.

Come tutti i bug che non moriranno mai.

---

## Il costo dell'immortalità

| Voce | Valore |
|------|--------|
| Anni di vita del ticket | 7 |
| Chiusure | 47 |
| Riaperture | 47 |
| Riassegnazioni | 12 |
| Commenti | 847 |
| Tempo totale speso | ~340 ore |
| Login rotti dal JN | 847 utenti, 4 ore |
| Consulente esterno | €5.000 |
| Template creati | 1 (ignorato) |
| Valore del ticket | -∞ |

**ROI del ticket immortale: impossibile da calcolare (ma sicuramente negativo)**

Il ticket non muore perché non può morire. È un loop. Un loop di lamentele senza contesto. Di fix senza informazioni. Di speranze senza fondamento. E ogni volta che qualcuno prova a chiuderlo, qualcun altro lo riapre. Perché "c'è un cliente che si lamenta". Ma non sappiamo quale cliente. Non sappiamo di cosa. Non sappiamo nulla. E il nulla è eterno. Come il ticket. Come noi. Come il dolore.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](35-il-server-fantasma.md)**
