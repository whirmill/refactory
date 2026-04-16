# Il Bug Che Era Un Feature

**Data**: 20/12/2026

**[Home](../index.md) | [Precedente](43-il-deploy-del-venerdi.md) | [Prossima](45-il-branch-che-non-moriva-mai.md)]**

---

C'è una verità nello sviluppo software che nessuno ti dice. Una verità che impari solo con il dolore. Una verità che ti cambia per sempre. La verità è: **i bug sono feature**. Non tutti i bug. Ma alcuni. Quelli che gli utenti amano. Quelli per cui gli utenti pagano. Quelli che, se fixi, ti distruggono.

Questo è il racconto di come un bug sia diventato una feature. E di come fixare quel bug abbia distrutto tutto. Come sempre. Come tutto. Come la vita.

![](../../img/code.jpg)

---

**2024 - La Scoperta**

Era un martedì qualunque. Il JN stava guardando i log. Perché il JN guardava sempre i log. Il JN era nuovo. Il JN voleva impressionare. Il JN non sapeva che guardare i log è la via verso la follia.

**JN**: TL, ho trovato una cosa strana.

**TL**: Cosa?

**JN**: Nel modulo pagamenti, c'è un bug.

**TL**: Un bug?

**JN**: Sì. Quando un utente fa un pagamento, il sistema aggiunge sempre 1 centesimo.

**TL**: Aggiunge 1 centesimo?

**JN**: Sì. Sempre. A ogni transazione.

**TL**: Sempre?

**JN**: Sempre. Guarda.

Il JN ha mostrato il codice. Una funzione chiamata `processPayment()`. 247 righe. Scritta da Bob. Nel 2018. Con un commento: `// TODO: fix this later`. Il "later" non era mai arrivato. Il "later" non arriva mai.

```javascript
function processPayment(amount) {
    // TODO: fix this later
    const finalAmount = amount + 0.01;
    return charge(finalAmount);
}
```

**TL**: Perché Bob ha aggiunto 0.01?

**JN**: Non lo so. Il commento dice solo "fix this later".

**TL**: E non è mai stato fixato?

**JN**: Mai. In 6 anni.

**TL**: E i clienti non si sono mai lamentati?

**JN**: Mai. Anzi, guardando le review...

Il JN ha aperto le recensioni dei clienti. E lì, tra le stelle e i commenti, c'era qualcosa di inaspettato.

> "Il sistema arrotonda sempre per eccesso. È onesto. Mi piace." - ⭐⭐⭐⭐⭐

> "Piccolo dettaglio: mi addebitano sempre 1 centesimo in più. Ma è trasparente. Affidabili." - ⭐⭐⭐⭐⭐

> "La precisione dei pagamenti è impeccabile. Sempre 1 centesimo in più. Onesti." - ⭐⭐⭐⭐⭐

Il TL ha guardato il JN. Il JN ha guardato il TL. Entrambi hanno capito. Avevano trovato un bug. Ma quel bug era... apprezzato?

---

**La Riunione**

Il TL ha convocato una riunione. Con il PM. Con il CTO. Con tutti. Per discutere del bug.

**TL**: Abbiamo trovato un bug nel sistema pagamenti.

**PM**: Un bug? Grave?

**TL**: Dipende.

**PM**: Da cosa?

**TL**: Dal punto di vista.

**CTO**: Spiegati meglio.

**TL**: Il sistema aggiunge 1 centesimo a ogni transazione. Da 6 anni.

**PM**: COSA?

**CTO**: E non ce ne siamo mai accorti?

**TL**: No. E i clienti non si sono mai lamentati. Anzi...

Il TL ha mostrato le recensioni. Il PM le ha lette. Il CTO le ha lette. Tutti le hanno lette.

**PM**: Quindi... i clienti pensano che sia una feature?

**TL**: Sembra di sì.

**CTO**: Una feature?

**TL**: Sì. Una feature. Chiamano il sistema "onesto". "Trasparente". "Affidabile". Perché aggiunge 1 centesimo.

**PM**: Ma è un bug!

**TL**: Tecnicamente, sì. Ma per i clienti, è una feature.

**CTO**: E se lo fixiamo?

**TL**: Non lo so. Ma guardando le metriche...

Il TL ha mostrato le metriche. Le metriche dicevano che il sistema pagamenti aveva il 97% di soddisfazione clienti. Il 97%. Un numero impossibile. Un numero che non dovrebbe esistere. Ma esisteva. Perché un bug. Un bug che era diventato una feature.

**PM**: Quindi... non lo fixiamo?

**TL**: Non lo so. Se lo fixiamo, i clienti potrebbero arrabbiarsi.

**CTO**: Arrabbiarsi? Per un bug fixato?

**TL**: Per una "feature" rimossa.

Il PM ha guardato il CTO. Il CTO ha guardato il PM. Entrambi hanno guardato il TL. E il TL ha guardato il JN. E il JN ha guardato il codice. Il codice di Bob. Che aveva creato, senza saperlo, la feature più amata del sistema.

---

**La Decisione**

Il CTO ha deciso. Come sempre. Senza ascoltare. Come sempre.

**CTO**: Fixiamo il bug.

**TL**: Sei sicuro?

**CTO**: È un bug. I bug si fixano.

**TL**: Ma i clienti...

**CTO**: I clienti capiranno. È la cosa giusta da fare.

**TL**: E se non capiscono?

**CTO**: Capiranno. Fidati.

Il TL non si fidava. Il TL non si fidava mai. Ma il TL obbediva. Perché il TL era un professionista. E i professionisti obbediscono. Anche quando sanno che è sbagliato. Anche quando vedono il disastro arrivare. Anche quando vorrebbero urlare: "NO! NON FARLO!" Ma non urlano. Annuiscono. E soffrono. In silenzio.

**TL**: Ok. Fixiamo il bug.

**JN**: Quando?

**TL**: Lunedì prossimo.

**JN**: Perché lunedì?

**TL**: Perché i disastri si fanno di lunedì. Così hai tutta la settimana per rimediare.

Il JN ha annuito. Il JN non sapeva. Il JN non poteva sapere. Il JN era giovane. Il JN era innocente. Il JN era condannato.

---

**Lunedì - Il Fix**

Il JN ha aperto il file. Ha rimosso il `+ 0.01`. Ha scritto un test. Ha fatto il commit. Ha aperto la PR.

**JN**: PR pronta.

**TL**: Fammi vedere.

```diff
function processPayment(amount) {
-    // TODO: fix this later
-    const finalAmount = amount + 0.01;
+    const finalAmount = amount;
    return charge(finalAmount);
}
```

**TL**: Sembra corretto.

**JN**: I test passano.

**TL**: Ok. Approvo.

Il TL ha approvato. Il JN ha mergiato. Il deploy è partito. E il mondo è finito.

---

**Martedì - L'Inferno**

Il mercoledì è iniziato con 847 email. 847 email di clienti arrabbiati. 847 email che dicevano la stessa cosa: "DOV'È IL MIO CENTESIMO?"

**PM**: CHE CAZZO È SUCCESSO?

**TL**: Abbiamo fixato il bug.

**PM**: E I CLIENTI SONO ARRABBIATI?

**TL**: Sembra di sì.

**PM**: MA ERA UN BUG!

**TL**: Per noi. Per loro era una feature.

Il PM ha aperto le nuove recensioni. Le recensioni che arrivavano in tempo reale.

> "Sistema disonesto! Mi hanno rubato il mio centesimo!" - ⭐

> "Non mi fidavo più. Prima erano onesti. Ora no." - ⭐

> "TRUFFATORI! Voglio il mio centesimo!" - ⭐

> "Ho chiamato il supporto. Non sanno nulla. Incompetenti." - ⭐

**PM**: MA È SOLO UN CENTESIMO!

**TL**: Per te. Per loro è... onestà.

**PM**: ONESTÀ? ERA UN BUG!

**TL**: Era un bug. Ma era il loro bug. Il bug che li faceva sentire al sicuro. Il bug che diceva: "Siamo così onesti che ti addebitiamo di più." E ora quel bug non c'è più. E si sentono truffati.

Il PM ha urlato. Per 47 minuti. E noi abbiamo ascoltato. E abbiamo annuito. E abbiamo capito. Capito che i bug sono feature. E le feature sono bug. E tutto è relativo. E nulla ha senso. E Bob, ovunque fosse, stava ridendo. Perché Bob sapeva. Bob ha sempre saputo.

---

**Mercoledì - La Crisi**

Il supporto era sommerso. 847 ticket. Tutti sullo stesso argomento. Il centesimo mancante.

**Supporto**: Non possiamo gestire tutto questo traffico!

**TL**: Cosa dicono i clienti?

**Supporto**: Vogliono il loro centesimo. O un rimborso. O entrambi.

**PM**: Un rimborso? Per un centesimo?

**Supporto**: Sì. E alcuni parlano di azione legale.

**PM**: AZIONE LEGALE? PER UN CENTESIMO?

**Supporto**: È una class action. 847 clienti. 847 centesimi. Totale: 8,47 euro.

**PM**: 8,47 EURO?

**Supporto**: Sì. Ma il danno reputazionale è... incalcolabile.

Il PM ha guardato il TL. Il TL ha guardato il JN. Il JN ha guardato il codice. Il codice che aveva fixato. Il codice che era "corretto". Il codice che aveva distrutto tutto.

**TL**: Possiamo fare il rollback.

**PM**: FALLO! ORA!

**TL**: Ok. Ma...

**PM**: MA COSA?

**TL**: Niente. Faccio il rollback.

Il TL ha fatto il rollback. Il sistema è tornato come prima. Con il bug. Con la feature. Con il centesimo in più. E i clienti hanno smesso di urlare. E le recensioni sono tornate positive. E tutto è tornato normale. O quasi.

---

**Giovedì - La Lezione**

Il CTO ha convocato una riunione. Per "discutere dell'incidente".

**CTO**: Cosa abbiamo imparato?

**TL**: Che i bug possono essere feature.

**CTO**: NO!

**TL**: No?

**CTO**: Abbiamo imparato che dobbiamo COMUNICARE meglio!

**TL**: Comunicare?

**CTO**: Sì! Se avessimo comunicato ai clienti che stavamo fixando il bug, non sarebbero arrabbiati!

**TL**: Ma era un bug...

**CTO**: Non importa! La comunicazione è tutto!

**PM**: Quindi... non fixiamo il bug?

**CTO**: No. Il bug resta. È una feature ora.

**JN**: Una feature?

**CTO**: Sì. Una feature. La chiameremo "Arrotondamento Onesto™".

**TL**: Arrotondamento Onesto™?

**CTO**: Sì! È un brand! Un valore! Una promessa ai clienti!

**TL**: Ma è un bug di Bob del 2018.

**CTO**: Non più. È una feature. E le feature si documentano.

Il CTO ha ordinato di documentare la "feature". Il JN ha scritto la documentazione. Una documentazione che spiegava perché il sistema aggiungeva 1 centesimo. Una documentazione che mentiva. Una documentazione che trasformava un bug in una "scelta progettuale deliberata".

> **Arrotondamento Onesto™**: Il nostro sistema applica un arrotondamento per eccesso di 1 centesimo su ogni transazione, garantendo trasparenza e onestà nei pagamenti. Questa feature riflette il nostro impegno verso un'esperienza utente chiara e affidabile.

Il JN ha pianto. Dentro. Perché fuori non si può. Perché sono un professionista. E i professionisti non piangono. I professionisti documentano i bug come feature. E vanno avanti. E soffrono. In silenzio.

---

**2026 - Oggi**

Il bug è ancora lì. Il bug è una feature. Il bug è un brand. Il bug è "Arrotondamento Onesto™".

Il codice dice ancora:
```javascript
function processPayment(amount) {
    // Feature: Arrotondamento Onesto™
    const finalAmount = amount + 0.01;
    return charge(finalAmount);
}
```

Il commento è cambiato. Da `// TODO: fix this later` a `// Feature: Arrotondamento Onesto™`. Ma il codice è lo stesso. Il bug è lo stesso. Solo la percezione è cambiata.

I clienti sono felici. Le recensioni sono positive. Il business cresce. E tutto grazie a un bug. Un bug di Bob. Un bug che Bob ha scritto senza sapere. Un bug che è diventato la feature più amata del sistema.

Il JN ha chiesto: "Ma non dovremmo... fixarlo davvero?"

Il TL ha risposto: "No. Mai. Mai più. Mai per sempre."

"E se un giorno i clienti si accorgono che è un bug?"

"Allora diremo che è una feature. E documenteremo meglio. E cambieremo il nome. Ma non lo fixeremo. Mai. Perché i bug sono feature. E le feature sono bug. E tutto è una bugia. Una bugia necessaria. Una bugia che paga. Una bugia che ci permette di sopravvivere. In un mondo dove nulla ha senso. Dove il codice di Bob è sacro. Dove i clienti amano i bug. E noi stiamo a guardare. E documentiamo. E mentiamo. E andiamo avanti. Come tutti. Come sempre. Per sempre."

---

## Il costo del bug-feature

| Voce | Valore |
|------|--------|
| Anni del bug in produzione | 6 |
| Centesimi aggiunti per transazione | 1 |
| Transazioni totali | 2.847.000 |
| Ricavo extra dal bug | 28.470 € |
| Clienti arrabbiati dopo il fix | 847 |
| Ticket di supporto | 847 |
| Ore di lavoro perse | 47 |
| Class action minacciate | 1 |
| Valore della class action | 8,47 € |
| Danno reputazionale | Incalcolabile |
| Bug fixato | 0 |
| Bug diventati feature | 1 |
| JN traumatizzati | 1 |
| Documentazione scritta per mentire | 1 |

**Morale**: I bug sono feature. Non tutti. Ma quelli che gli utenti amano, sì. E se trovi un bug che i clienti apprezzano, non fixarlo. Documentalo. Dagli un nome. Dagli un brand. Trasformalo in una "scelta progettuale deliberata". Perché la verità non importa. Importa la percezione. E la percezione è: se i clienti amano il tuo bug, il tuo bug è una feature. E le feature non si fixano. Si celebrano. Si documentano. Si vendono. Come tutto il resto. In questo mondo assurdo. Dove il codice di Bob è profeta. E noi siamo solo discepoli. Che documentano. E mentono. E sopravvivono. Un centesimo alla volta.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](43-il-deploy-del-venerdi.md)]**
