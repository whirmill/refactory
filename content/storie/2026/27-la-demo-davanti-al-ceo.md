# La Demo Davanti Al CEO

**Data**: 23/08/2026

---

**[Home](../index.md) | [Precedente](26-la-soluzione-temporanea.md)**

---

C'è una cosa che ho imparato: le demo sono come i gatti. Non fanno quello che vuoi. E quando c'è qualcuno che guarda, fanno esattamente il contrario.

![](../../img/demo.jpg)

Era un venerdì. Il CEO voleva vedere la nuova feature. Quella su cui avevamo lavorato per tre mesi. Quella che doveva salvare l'azienda. Quella che doveva impressionare gli investitori.

"Preparate una demo" ha detto il PM. "Il CEO arriva alle 15:00."

"Alle 15:00 di venerdì?" ho chiesto.

"Sì. Perché?"

"Perché venerdì pomeriggio è il momento peggiore per una demo."

"Non dire sciocchezze. Va tutto bene."

Il JN ha chiesto: "Dobbiamo preparare qualcosa di speciale?"

"No" ho detto. "Basta che funzioni."

"Funziona sempre" ha detto il JN. "L'ho testato stamattina."

"Lo so. Ma durante la demo..."

"Durante la demo cosa?"

"Durante la demo succedono cose."

Il TL è intervenuto. "Facciamo una prova generale. Alle 14:00. Così siamo sicuri."

Alle 14:00, la prova generale è andata perfetta. La feature funzionava. Il JN ha cliccato. I dati sono apparsi. Tutto era fluido. Tutto era bello.

"Visto?" ha detto il JN. "Funziona."

"Sì, ma questa era la prova" ho detto. "La vera demo è tra un'ora."

"E quindi?"

"E quindi tra un'ora succederà qualcosa."

Alle 15:00, il CEO è arrivato. Con due investitori. E il CTO. E il PM. E tre persone del marketing. E una del legal. E una che non sapevo chi fosse.

"Questa è la nuova feature?" ha chiesto il CEO.

"Sì" ha detto il PM. "Mostragliela."

Il JN ha aperto il browser. Ha cliccato sulla feature. E...

Errore 500.

"Che è successo?" ha chiesto il CEO.

"Un... piccolo problema" ha detto il PM. "Riprova."

Il JN ha ricaricato. Ha cliccato di nuovo. E...

Errore 502.

"Strano" ha detto il JN. "Prima funzionava."

"Prima quando?" ha chiesto il CEO.

"Un'ora fa. Durante la prova."

"E ora non funziona?"

"Ora... no."

Il CEO ha guardato l'orologio. "Ho un altro meeting tra 15 minuti. Possiamo risolvere?"

"Certo" ho detto. "Dammi 5 minuti."

Ho aperto il terminale. Ho controllato i log. E ho visto:

```
Error: Connection refused to database 'production'
```

"Il database è giù" ho detto.

"Giù?" ha chiesto il TL. "Perché?"

"Non lo so. Controllo."

Ho controllato. Il database era stato riavviato. Da un cron job. Che nessuno ricordava. Che girava ogni venerdì alle 15:00. Per "manutenzione".

"Chi ha configurato questo cron?" ho chiesto.

Silenzio.

"Il cron è stato configurato 3 anni fa" ha detto il TL. "Per un backup. Ma poi abbiamo cambiato sistema. E nessuno l'ha rimosso."

"Quindi ogni venerdì alle 15:00..."

"Il database si riavvia. Sì."

"E perché non l'abbiamo mai notato?"

"Perché nessuno usa il sistema di venerdì alle 15:00. Tranne oggi."

Il CEO ha guardato l'orologio. "Devo andare. Possiamo rifare la demo lunedì?"

"Certo" ha detto il PM. "Lunedì alle 10:00."

"Lunedì alle 10:00" ha confermato il CEO. E se n'è andato. Con gli investitori. E il CTO. E tutti gli altri.

Il JN era distrutto. "Ho rovinato tutto."

"No" ho detto. "È stato il cron."

"Ma dovevo controllare!"

"Controllare cosa? Il cron che nessuno sapeva esistere?"

Il TL ha sospirato. "Dobbiamo rimuovere quel cron."

"Sì. E dobbiamo anche..."

"Cosa?"

"Dobbiamo smettere di fare demo di venerdì alle 15:00."

Lunedì alle 10:00, la demo è andata perfetta. La feature funzionava. Il JN ha cliccato. I dati sono apparsi. Tutto era fluido. Tutto era bello.

"Ottimo lavoro" ha detto il CEO. "Ma perché non l'abbiamo vista venerdì?"

"Un problema di infrastruttura" ha detto il PM. "Risolto."

"Capisco. E come possiamo evitare che succeda di nuovo?"

"Abbiamo rimosso il cron" ho detto.

"Il cron?"

"Sì. Quello che riavviava il database ogni venerdì alle 15:00."

"C'era un cron che riavviava il database durante l'orario di lavoro?"

"Sì. Da 3 anni."

"E nessuno lo sapeva?"

"Nessuno se lo ricordava."

Il CEO ha annuito. "E cos'altro non sappiamo?"

Quella era una domanda pericolosa. Perché la risposta era: molto. Molto di cui non sapevamo niente. Cron dimenticati. Script obsoleti. Configurazioni misteriose. Server senza nome. Database senza documentazione. E mille altre cose che aspettavano di rompersi nel momento peggiore.

"Stiamo facendo un audit" ha detto il TL. "Per identificare这些问题."

"Bene" ha detto il CEO. "Fatelo. E fatelo prima della prossima demo."

La morale: le demo sono maledette. Non perché il codice non funziona. Ma perché il codice funziona finché non deve funzionare. E quando deve funzionare, qualcosa si rompe. Sempre. È la legge di Murphy applicata al software. E la legge del cron dimenticato. E la legge del venerdì pomeriggio. E la legge del CEO che guarda. Tutte leggi che non puoi violare. Puoi solo accettarle. E prepararti. Non alla demo. Al disastro. Perché la demo andrà bene. È il disastro che ti sorprende. Sempre. Nel momento peggiore. Con le persone più importanti che guardano. E tu che non puoi fare niente. Tranne dire: "Prima funzionava." Che è vero. Ma non aiuta. Perché "prima" non è "ora." E "ora" è tutto ciò che conta. Durante una demo. Davanti al CEO.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](26-la-soluzione-temporanea.md)**
