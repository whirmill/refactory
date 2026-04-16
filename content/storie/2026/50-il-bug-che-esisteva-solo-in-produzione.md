# Il Bug Che Esisteva Solo In Produzione

**Data**: 31/01/2027

**[Home](../index.md) | [Precedente](49-il-server-che-nessuno-osava-spegere.md)]**

---

C'è una categoria di bug che sfida ogni logica. Che ride di ogni test. Che si nasconde in ogni ambiente. Che esiste solo in produzione. E quando lo trovi, non puoi riprodurlo. Quando lo riproduci, non puoi fixarlo. Quando lo fixi, ne appaiono altri tre. È il Bug Fantasma. Il Bug Invisibile. Il Bug Che Esisteva Solo In Produzione.

Questa è la storia di quel bug. Il bug che ha consumato 47 ore della mia vita. Il bug che ha fatto dubitare della mia sanità mentale. Il bug che... non era un bug. O forse lo era. O forse era tutto. O forse era nulla. Non lo so. Non l'ho mai saputo. E non lo saprò mai. Perché il bug è sparito. Come è arrivato. Senza spiegazione. Senza ragione. Senza senso.

![](../../img/bug.jpg)

---

**Lunedì - La Segnalazione**

Era lunedì mattina. Il caffè non aveva ancora fatto effetto. Quando è arrivato il ticket.

**Ticket #4892**: L'utente non riesce a completare l'ordine
**Priorità**: Alta
**Ambiente**: Produzione
**Assegnatario**: Io
**Descrizione**: "Quando clicco 'Conferma Ordine', appare un errore. Solo a volte. Solo per alcuni utenti. Solo in produzione. Ho provato in staging e funziona."

Ho aperto staging. Ho cliccato "Conferma Ordine". Ha funzionato. Ho cliccato di nuovo. Ha funzionato. Ho cliccato 47 volte. Ha funzionato 47 volte.

**ME**: PM, il ticket #4892. Non riesco a riprodurlo.

**PM**: È in produzione.

**ME**: Lo so. Ma in staging funziona.

**PM**: E allora?

**ME**: Allora non posso fixarlo se non posso riprodurlo.

**PM**: E cosa proponi?

**ME**: Lo riproduco in produzione?

**PM**: NO.

**ME**: E allora?

**PM**: Allora lo fixi senza riprodurlo.

**ME**: Come?

**PM**: Non lo so. Sei tu il developer.

Il PM se n'è andato. Io sono rimasto. Con il ticket. E il bug. E la domanda: come fixi un bug che non puoi riprodurre?

---

**Martedì - La Ricerca**

Ho passato tutto il martedì a cercare. Nei log. Nel codice. Nella documentazione. Che non esisteva.

**ME**: TL, hai mai visto questo bug?

**TL**: Quale bug?

**ME**: Il bug del "Conferma Ordine". Quello che esiste solo in produzione.

**TL**: Ah, quello. Sì, l'ho visto. Due anni fa.

**ME**: E l'hai fixato?

**TL**: No. È sparito da solo.

**ME**: Sparito?

**TL**: Sì. Un giorno c'era. Il giorno dopo non c'era più.

**ME**: E non hai indagato?

**TL**: No. Se funziona, non toccare.

**ME**: Ma ora è tornato.

**TL**: Ah. Beh. Buona fortuna.

Il TL se n'è andato. Io sono rimasto. Con il bug. E la consapevolezza che due anni fa, qualcuno aveva lo stesso problema. E non l'ha risolto. E ora toccava a me. Come una maledizione. Come un'eredità. Come un karma negativo.

Ho guardato i log di produzione. C'erano 847.000 righe. Di lunedì. Solo lunedì. Ho cercato "error". 12.000 risultati. Ho cercato "Conferma Ordine". 3.400 risultati. Ho cercato "Conferma Ordine" AND "error". 0 risultati.

Il bug non lasciava tracce. Il bug era un fantasma. Il bug era... invisibile.

---

**Mercoledì - L'Esperimento**

Il JN mi ha visto disperato. Il JN ha voluto aiutare. Il JN ha avuto un'idea.

**JN**: E se fosse un problema di dati?

**ME**: Dati?

**JN**: Sì. Magari in staging abbiamo dati diversi. E per quello non si riproduce.

**ME**: E come facciamo a saperlo?

**JN**: Copiamo i dati di produzione in staging.

**ME**: Non possiamo.

**JN**: Perché?

**ME**: Perché ci sono dati sensibili. GDPR. Privacy. Robe così.

**JN**: E allora?

**ME**: Allora li anonimizziamo.

**JN**: E quanto tempo ci vuole?

**ME**: Tre giorni. Minimo.

**JN**: E il PM?

**ME**: Il PM vuole il fix oggi.

**JN**: E allora?

**ME**: Allora facciamo finta di nulla e speriamo che il bug sparisca.

Il JN mi ha guardato. Io ho guardato il JN. Abbiamo guardato il ticket. E abbiamo capito. Non c'era soluzione. Non c'era tempo. Non c'era... speranza.

Ma il JN non si arrendeva. Il JN era fatto così. Il JN voleva provare.

**JN**: E se chiediamo all'utente?

**ME**: Quale utente?

**JN**: L'utente che ha aperto il ticket.

**ME**: E cosa gli chiediamo?

**JN**: Cosa stava facendo. Quando è successo. Come è successo.

**ME**: E se non lo sa?

**JN**: Allora siamo nella merda.

Abbiamo chiamato l'utente. L'utente non ha risposto. Abbiamo mandato un'email. L'utente non ha risposto. Abbiamo aperto un ticket di supporto. Il supporto ha detto: "L'utente non risponde."

E noi siamo rimasti. Con il bug. E nessuna informazione. E nessuna speranza.

---

**Giovedì - La Rivelazione**

Giovedì mattina. L'utente ha risposto. Finalmente. Dopo tre giorni. E la sua risposta è stata... illuminante. O terrificante. O entrambe.

**Email dell'utente**:
"Ciao. Scusa il ritardo. Ero in ferie. Il bug succede quando uso il sito dal telefono. Dalla mia cucina. Mentre mia moglie usa il microonde. Non so perché. Ma succede. Ogni volta. Solo con il microonde acceso. Strano, vero?"

Ho letto l'email tre volte. Poi quattro. Poi cinque. Non poteva essere vero. Non poteva essere il microonde. Non poteva essere... fisica. E invece.

**ME**: JN, leggi questa email.

**JN**: ...Il microonde?

**ME**: Sì.

**JN**: Ma... come?

**ME**: Non lo so.

**JN**: E cosa facciamo?

**ME**: Non lo so.

Il TL è passato. Ha letto l'email. Ha sorriso. Ha detto: "Ah, il bug del microonde. Me n'ero dimenticato."

**ME**: IL BUG DEL MICROONDE?

**TL**: Sì. È un problema noto. Il Wi-Fi interfere con il microonde. E il nostro sito usa WebSocket. E i WebSocket si rompono. E l'ordine non va. È successo anche due anni fa.

**ME**: E perché non l'hai detto?

**TL**: Non ci ho pensato. Pensavo fosse un altro bug.

**ME**: E come si risolve?

**TL**: Non si risolve. È fisica.

**ME**: E allora?

**TL**: Allora diciamo all'utente di non usare il microonde mentre ordina.

**ME**: E se lo usa?

**TL**: Allora non ordinano. O cambiano rete. O aspettano che il microonde finisca.

**ME**: Ma è assurdo!

**TL**: È la vita. È la fisica. È... produzione.

---

**Venerdì - La Soluzione**

Il venerdì, ho dovuto comunicare la "soluzione" al PM.

**ME**: PM, ho trovato il bug.

**PM**: Ottimo! E qual è?

**ME**: È il microonde.

**PM**: Il microonde?

**ME**: Sì. L'utente usa il sito dal telefono. In cucina. Mentre il microonde è acceso. Il Wi-Fi interfere. I WebSocket si rompono. L'ordine non va.

**PM**: E come lo fixiamo?

**ME**: Non lo fixiamo. È fisica.

**PM**: FISICA?

**ME**: Sì. Il microonde emette onde elettromagnetiche. Il Wi-Fi usa onde elettromagnetiche. Le frequenze sono simili. Si interferiscono. È un problema noto.

**PM**: E quindi?

**ME**: Quindi diciamo all'utente di non usare il microonde mentre ordina.

**PM**: Ma è assurdo!

**ME**: Lo so. Ma è la realtà.

**PM**: E non possiamo fare nulla?

**ME**: Possiamo cambiare la frequenza del Wi-Fi. Ma non controlliamo il Wi-Fi dell'utente.

**PM**: E se usano il 5GHz?

**ME**: Allora funziona. Ma non tutti hanno il 5GHz.

**PM**: E quindi?

**ME**: Quindi documentiamo il bug. E chiudiamo il ticket. Come "Won't Fix". Con la motivazione: "Fisica".

Il PM mi ha guardato. Io ho guardato il PM. Abbiamo guardato il ticket. E abbiamo capito. Non c'era soluzione. Non c'era fix. Non c'era... nulla. Solo la fisica. E la consapevolezza che il mondo è più complicato del codice. E che a volte, i bug non sono bug. Sono realtà.

---

**Sabato - La Documentazione**

Ho documentato il bug. Per i posteri. Per i futuri developer. Per i futuri JN che avrebbero trovato lo stesso problema.

```markdown
## Bug #4892: Ordine non confermato in presenza di interferenze elettromagnetiche

**Sintomi**: L'utente non riesce a confermare l'ordine. Errore intermittente. Solo in produzione.

**Causa**: Interferenza tra microonde e Wi-Fi 2.4GHz. I WebSocket si disconnettono. La richiesta fallisce.

**Soluzione**: Nessuna. È fisica.

**Workaround**: 
1. Usare Wi-Fi 5GHz
2. Non usare il microonde mentre si ordina
3. Usare connessione cablata
4. Spostarsi in un'altra stanza

**Stato**: Won't Fix
**Motivazione**: Non possiamo cambiare le leggi della fisica.
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che a volte i bug non sono bug. Sono... vita."

**ME**: Sì. E la vita non si fixa.

**JN**: E quindi?

**ME**: Quindi documenti. E vai avanti. E speri che il prossimo bug sia più facile. O almeno più logico.

**JN**: E se non lo è?

**ME**: Allora bevi caffè. E ripeti. Per sempre. Amen.

---

**Domenica - La Riflessione**

Domenica sera. Ho chiuso il ticket. Con la motivazione "Won't Fix - Physics". E ho pensato. A tutti i bug che ho visto. A tutti i bug che ho fixato. A tutti i bug che non ho potuto fixare.

E ho capito una cosa. I bug non sono solo codice. I bug sono vita. I bug sono fisica. I bug sono... realtà. E la realtà non sempre ha senso. La realtà non sempre si può fixare. La realtà... è.

E io sono qui. A documentare. A imparare. A accettare. Che non tutto si può risolvere. Che non tutto si può capire. Che a volte, devi solo accettare. E andare avanti. Con un sorriso. O un sospiro. O entrambi.

---

## Il costo del bug che esisteva solo in produzione

| Voce | Valore |
|------|--------|
| Ore di lavoro | 47 |
| Developer coinvolti | 3 (ME, TL, JN) |
| Ticket aperti | 1 |
| Email scambiate | 14 |
| Log analizzati | 847.000 |
| Caffè bevuti | 23 |
| Microonde testati | 1 |
| Leggi della fisica violate | 0 |
| Bug fixati | 0 |
| Bug documentati | 1 |
| Sanity persa | Totale |
| **Totale** | **Incalcolabile** |

**Morale**: I bug non sono sempre bug. A volte sono fisica. A volte sono vita. A volte sono... realtà. E la realtà non si fixa. Si documenta. E si va avanti. Con un sorriso. O un sospiro. O entrambi. E la prossima volta che un bug esiste solo in produzione, chiediti: è codice? O è fisica? Perché a volte, la risposta è entrambi. E non puoi fare nulla. Tranne documentare. E bere caffè. Tanto caffè.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](49-il-server-che-nessuno-osava-spegere.md)]**
