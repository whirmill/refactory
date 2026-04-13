# Il Comitato e il Dinosauro

**Data**: 28/05/2026

**[Storie 2026](index.md) | [Precedente](13-laudit.md) | [Prossima](15-il-deploy-delle-17.md)**

---

C'è una cosa che ho imparato: più un'azienda è grande, più ha comitati. E più ha comitati, meno fa cose.

![](../../img/comitato.jpg)

Nel nostro caso, c'è il GADC. Che sta per "Group Architecture Design Committee". Si pronuncia "Gadac". O "Gabbia". A seconda di quanto sei frustrato.

Il GADC è composto da:
- Un "Enterprise Architect" che non programma da 15 anni
- Un "Security Officer" che pensa che HTTPS sia una moda passeggera
- Un "Compliance Manager" che non sa cosa sia un API
- Un "Risk Manager" che vede rischi ovunque tranne dove sono
- Un "Process Owner" che possiede processi ma non sa cosa facciano

Tutti dinosauri. Tutti con stipendi alti. Tutti che non hanno scritto una riga di codice da quando Windows XP era nuovo.

E tutti con il potere di bloccare tutto.

---

La storia inizia con Marco. Marco ha 28 anni. È un developer. Bravo. Molto bravo. Vuole fare cose. Vuole migliorare il sistema. Vuole portare valore.

Marco ha trovato un modo per velocizzare le query del database. Invece di 30 secondi, ci metterebbero 3. Un miglioramento del 90%.

Ha scritto il codice. Ha fatto i test. Ha documentato tutto. Ha preparato la richiesta per il GADC.

La richiesta è stata respinta.

"Perché?" ha chiesto Marco.

"Perché non segue lo standard architetturale."

"Quale standard?"

"Lo standard GADC-2023-ARCH-001."

"E cosa dice?"

"Non lo so. Ma non lo segue."

Marco ha letto lo standard. Lo standard diceva: "Tutte le query devono essere approvate dal DBA."

"Ma il DBA ha approvato."

"Sì, ma lo standard dice anche che le ottimizzazioni devono essere approvate dal GADC."

"E quindi?"

"E quindi devi presentare al GADC."

Marco ha presentato al GADC. Il GADC ha discusso per 3 ore.

Alla fine, l'Enterprise Architect ha detto: "Non sono convinto. Questa ottimizzazione potrebbe introdurre rischi."

"Quali rischi?"

"Non lo so. Ma potrebbe."

"E come facciamo a saperlo?"

"Con un'analisi dei rischi."

"Chi la fa?"

"Il Risk Manager."

Il Risk Manager ha detto: "Servono 6 mesi per l'analisi."

"6 mesi?"

"Sì, per fare un'analisi completa."

"E nel frattempo?"

"Nel frattempo, niente ottimizzazione."

Marco è uscito dalla riunione. Frustrato. Ha impiegato 3 mesi per scrivere l'ottimizzazione. E adesso servono 6 mesi per l'analisi. E chissà quanto per l'approvazione.

---

Ma la parte migliore è arrivata dopo.

Un venerdì, alle 16:00, è stato fatto un deploy. Approvato dal GADC. Un deploy "sicuro". Che seguiva tutti gli standard.

Il deploy ha introdotto un bug. Un bug critico. Il sistema di fatturazione non funzionava più.

Alle 16:30, i clienti hanno iniziato a chiamare.

"Il sistema non funziona!"

"Lo so, c'è un bug."

"E quando lo risolvete?"

"Non lo so. Bisogna fare un deploy."

"E fate il deploy."

"Non possiamo."

"Perché?"

"Perché il GADC non approva deploy dopo le 15:00."

"E fino a quando?"

"Fino a lunedì mattina."

"E nel frattempo?"

"Nel frattempo, niente fatture."

---

Marco ha trovato il bug. Era una riga di codice. Una riga. Bastava cambiarla.

Ha preparato il fix. Ha fatto i test. Ha documentato tutto.

Poi è andato dal GADC.

"Ho trovato il bug. Ho il fix. Posso fare il deploy?"

"No."

"Perché?"

"Perché sono le 17:00. E il GADC non approva deploy dopo le 15:00."

"Ma è un'emergenza."

"Non esistono emergenze. Esistono solo processi."

"Ma il sistema non funziona."

"Allora dovevate pensarci prima."

"Ma il bug è stato introdotto dal deploy approvato dal GADC."

"Questo non c'entra."

"E allora cosa facciamo?"

"Aspettate lunedì."

"E i clienti?"

"I clienti aspettano."

---

Il sabato, Marco ha provato a fare il deploy. Di nascosto. Senza approvazione.

Il Security Officer l'ha bloccato.

"Cosa stai facendo?"

"Sto cercando di risolvere il problema."

"Senza approvazione?"

"Sì."

"Questo è contro le regole."

"Ma è un'emergenza."

"Non esistono emergenze."

"Il sistema è fermo da 24 ore."

"E allora?"

"Allora devo risolverlo."

"Con l'approvazione."

"Ma non c'è nessuno per approvare."

"Allora aspetti."

"Aspetto cosa?"

"Che ci sia qualcuno per approvare."

"E quando?"

"Lunedì."

"Lunedì sono 48 ore."

"E allora?"

Marco ha smesso di parlare. È andato a casa. E ha aspettato.

---

Lunedì mattina, alle 9:00, il GADC si è riunito.

"Allora, questo bug."

"Sì, abbiamo il fix."

"Chi l'ha preparato?"

"Marco."

"E chi ha approvato il fix?"

"Nessuno. È un'emergenza."

"Non esistono emergenze."

"Il sistema è fermo da 3 giorni."

"E allora dovevate pensarci prima."

"Ma il bug è stato introdotto dal deploy approvato dal GADC."

"Questo non c'entra."

"E allora cosa c'entra?"

"C'entra che il fix deve essere approvato."

"E chi lo approva?"

"Il GADC."

"E quando?"

"Tra 2 settimane."

"2 settimane?"

"Sì, il prossimo meeting del GADC è tra 2 settimane."

"E nel frattempo?"

"Nel frattempo, niente."

---

A quel punto, Marco ha fatto una cosa. Una cosa che non avrebbe dovuto fare.

Ha chiamato SUSL.

"Il sistema è fermo da 3 giorni. Ho il fix. Il GADC non lo approva."

"E perché?"

"Perché non esistono emergenze."

"E cosa serve?"

"Serve un bypass."

"Un bypass?"

"Sì, un'autorizzazione speciale per l'emergenza."

SUSL ha chiamato il GADC.

"Perché non approvate il fix?"

"Perché non segue il processo."

"Ma è un'emergenza."

"Non esistono emergenze."

"Il sistema è fermo da 3 giorni."

"E allora?"

"Allora approvate il fix."

"Non possiamo."

"Perché?"

"Perché non segue il processo."

"Ma io sono SUSL. E vi dico di approvarlo."

"Ma il processo dice..."

"Il processo dice che in caso di emergenza, il SUSL può bypassare."

"Dov'è scritto?"

"Nello standard GADC-2023-EMERG-001."

Il GADC ha controllato. Era vero.

"Ok, ma serve un'analisi dei rischi."

"L'ha già fatta Marco."

"Ma non è approvata dal Risk Manager."

"Allora approvatela."

"Non possiamo."

"Perché?"

"Perché il Risk Manager non c'è."

"E dov'è?"

"In ferie."

"E quando torna?"

"Tra 2 settimane."

---

Il sistema è rimasto fermo per 2 settimane.

Costo: 500.000 euro di fatture non emesse.

Costo del fix: 5 minuti di lavoro.

Costo della burocrazia: 2 settimane.

---

## Le regole che si contraddicono

Il GADC ha creato regole. Molte regole. E le regole si contraddicono.

**Regola 1**: "Tutti i deploy devono essere approvati dal GADC."

**Regola 2**: "Il GADC si riunisce ogni 2 settimane."

**Regola 3**: "I deploy possono essere fatti solo tra le 9:00 e le 15:00."

**Regola 4**: "In caso di emergenza, il SUSL può bypassare."

**Regola 5**: "Ogni bypass richiede un'analisi dei rischi approvata dal Risk Manager."

**Regola 6**: "Il Risk Manager è disponibile solo durante le riunioni del GADC."

**Regola 7**: "Le riunioni del GADC sono ogni 2 settimane."

Quindi:
- Per fare un deploy, serve l'approvazione del GADC
- Il GADC si riunisce ogni 2 settimane
- In caso di emergenza, serve un bypass
- Il bypass richiede un'analisi dei rischi
- L'analisi dei rischi richiede il Risk Manager
- Il Risk Manager è disponibile ogni 2 settimane

Risultato: anche le emergenze richiedono 2 settimane.

---

## I dinosauri

I membri del GADC sono dinosauri. Non sanno cosa sia:
- CI/CD
- DevOps
- Agile
- Microservizi
- Container
- Cloud native
- Infrastructure as Code
- GitOps
- Shift left
- Zero trust

Sanno solo:
- Waterfall
- Documentazione
- Approvazioni
- Comitati
- Processi
- Standard
- Compliance
- Risk management
- Governance

E quando provi a spiegare che il mondo è cambiato, rispondono:

"Ma noi abbiamo sempre fatto così."

"E funziona?"

"Più o meno."

"Più o meno?"

"Sì, a volte funziona. A volte no."

"E quando no?"

"Quando no, facciamo un'analisi."

"E risolvete?"

"No, analizziamo. Risolvere è un altro processo."

---

## I giovani

I giovani come Marco vogliono fare cose. Vogliono migliorare. Vogliono portare valore.

Ma vengono bloccati. Da regole che non capiscono. Da processi che non funzionano. Da dinosauri che non sanno.

E quando provano a cambiare le cose, vengono puniti.

"Perché hai fatto quel deploy senza approvazione?"

"Perché era un'emergenza."

"Non esistono emergenze."

"Il sistema era fermo."

"E allora?"

"Allora l'ho risolto."

"Senza approvazione."

"Sì."

"Questo è contro le regole."

"Ma ha funzionato."

"Non importa. È contro le regole."

E Marco è stato sanzionato. Per aver risolto un problema.

Mentre il deploy che ha creato il problema era stato approvato. Dal GADC. Che non è stato sanzionato.

Perché il GADC segue le regole. Anche quando le regole sbagliano.

---

## Morale della storia

La burocrazia non serve a risolvere problemi. Serve a evitare responsabilità.

I comitati non servono a prendere decisioni. Servono a rimandare decisioni.

I dinosauri non servono a innovare. Servono a mantenere lo status quo.

E i giovani? I giovani servono a ricordarci che le cose potrebbero essere diverse.

Ma vengono bloccati. Sempre.

Finché non diventano dinosauri anche loro.

O finché non se ne vanno.

E l'azienda rimane con i dinosauri. E i processi. E le regole.

E niente funziona.

Ma è tutto documentato. E approvato. E compliant.

E questo, per l'azienda, è sufficiente.

---

## Commenti

I commenti vengono aggiunti **quando** e, più importante, **se** ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](13-laudit.md) | [Prossima](15-il-deploy-delle-17.md)**
