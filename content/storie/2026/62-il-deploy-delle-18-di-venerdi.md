# Il Deploy delle 18:00 di Venerdì

**Data**: 25/04/2026

**[Home](../index.md) | [Precedente](61-la-query-che-non-aveva-where.md)]**

---

C'è una regola. Una regola sacra. Una regola scritta nel sangue. Nel sudore. Nelle lacrime di ogni sviluppatore che abbia mai lavorato in un'azienda. Quella regola è: **"Non si fa il deploy di venerdì. Mai. Per nessun motivo. Nemmeno se il PM ti punta una pistola alla tempia"**. E c'è una regola ancora più sacra. Una regola scritta in un'epoca in cui i server erano armadi e i backup erano nastri. Quella regola è: **"Non si fa il deploy dopo le 17:00. Mai. Per nessun motivo. Nemmeno se il CEO ti promette un aumento"**. E questa è la storia di chi ha violato entrambe le regole. Nello stesso giorno. Nello stesso momento. Nello stesso... disastro. Amen.

![](../../img/deploy.jpg)

---

**Venerdì - 17:45**

Era venerdì. 17:45. Stavo per chiudere. Stavo per andare a casa. Stavo per... vivere.

**PM**: Abbiamo un problema.

**ME**: Cioè?

**PM**: Il cliente vuole la feature.

**ME**: Quale feature?

**PM**: Quella che abbiamo sviluppato questa settimana.

**ME**: E la vuole ora?

**PM**: Sì. Ora. Subito. Immediatamente.

**ME**: Ma è venerdì. Sono le 17:45.

**PM**: E quindi?

**ME**: E quindi non si fa il deploy di venerdì.

**PM**: Chi l'ha detto?

**ME**: Tutti. Da sempre. Dall'inizio dei tempi. Dalla prima riga di codice mai scritta.

**PM**: Ma il cliente vuole la feature.

**ME**: E il cliente può aspettare lunedì.

**PM**: No. Il cliente non può aspettare.

**ME**: E perché?

**PM**: Perché il cliente ha una demo sabato mattina.

**ME**: Sabato mattina? Una demo? Di sabato?

**PM**: Sì. Il cliente è molto impegnato.

**ME**: E noi dobbiamo fare il deploy di venerdì alle 18:00 per una demo di sabato?

**PM**: Sì.

**ME**: E se qualcosa va storto?

**PM**: Non andrà storto.

**ME**: E se va storto?

**PM**: Lo sistemiamo.

**ME**: Di venerdì sera?

**PM**: Sì.

**ME**: E chi lo sistema?

**PM**: Tu.

**ME**: Io?

**PM**: Sì. Tu.

Il PM mi ha guardato. Io ho guardato l'orologio. L'orologio segnava 17:47. E io sapevo. Sapevo che stavo per fare una cosa terribile. Una cosa proibita. Una cosa... che avrei rimpianto. Amen.

---

**Venerdì - 17:58**

Ho preparato il deploy. Ho controllato il codice. Ho... cercato di convincermi che sarebbe andato tutto bene.

**TL**: Stai facendo un deploy?

**ME**: Sì.

**TL**: Di venerdì?

**ME**: Sì.

**TL**: Alle 18:00?

**ME**: Sì.

**TL**: Sei impazzito?

**ME**: Il PM mi ha costretto.

**TL**: Il PM ti ha costretto?

**ME**: Sì. Il cliente ha una demo sabato.

**TL**: E tu glielo hai permesso?

**ME**: No. Ma il PM ha insistito.

**TL**: E se va storto?

**ME**: Non va storto.

**TL**: E se va storto?

**ME**: Lo sistemo.

**TL**: Di venerdì sera?

**ME**: Sì.

**TL**: E chi lo sistema?

**ME**: Io.

**TL**: E se non riesci a sistemarlo?

**ME**: Ci riesco.

**TL**: E se non ci riesci?

**ME**: Allora siamo fottuti.

**TL**: Ecco. Appunto.

Il TL mi ha guardato. Io ho guardato il terminale. Il terminale mostrava: "Ready to deploy. Branch: main. Commit: 847f3a2. Time: 17:59:47". E io ho premuto invio. Perché il PM voleva. Perché il cliente voleva. Perché... non so perché. Forse perché sono stupido. Forse perché non ho spina dorsale. Forse perché... è venerdì. E di venerdì si fanno cose stupide. Amen.

---

**Venerdì - 18:03**

Il deploy è partito. Il deploy è... andato.

**TERMINALE**: Building...

**TERMINALE**: Running tests...

**TERMINALE**: Tests passed. 847 tests. 0 failures.

**TERMINALE**: Deploying to production...

**TERMINALE**: Deploy complete.

**ME**: Visto? È andato.

**TL**: Aspetta.

**ME**: Cosa?

**TL**: Aspetta e vedrai.

Ho aspettato. 30 secondi. E poi è arrivato.

**SLACK**: @here Il sito non funziona.

**SLACK**: @channel Errore 500 su tutte le pagine.

**SLACK**: @everyone PRODUCTION IS DOWN.

**ME**: ...

**TL**: Te l'avevo detto.

**ME**: Ma i test erano passati.

**TL**: E quindi?

**ME**: E quindi doveva funzionare.

**TL**: E invece?

**ME**: Invece non funziona.

**TL**: Ecco. Appunto.

Il TL mi ha guardato. Io ho guardato il terminale. Il terminale mostrava: "Deploy complete. Status: SUCCESS". Ma Slack mostrava: "PRODUCTION IS DOWN". E io sapevo. Sapevo che i test non bastano. Sapevo che il deploy non basta. Sapevo che... non si fa il deploy di venerdì. Mai. Amen.

---

**Venerdì - 18:15**

Ho iniziato a investigare. Ho aperto i log. Ho... pianto.

**ME**: Ho trovato il problema.

**TL**: Cosa?

**ME**: La nuova feature usa una variabile d'ambiente.

**TL**: E?

**ME**: E la variabile non esiste in production.

**TL**: Non esiste?

**ME**: No. L'ho aggiunta solo in staging.

**TL**: E non l'hai aggiunta in production?

**ME**: No. Me ne sono dimenticato.

**TL**: Ti sei dimenticato?

**ME**: Sì. Ero di fretta. Il PM chiamava.

**TL**: E quindi?

**ME**: E quindi production è down.

**TL**: E da quanto?

**ME**: 15 minuti.

**TL**: E il cliente?

**ME**: Il cliente sta chiamando.

**TL**: E il PM?

**ME**: Il PM sta chiamando.

**TL**: E il CTO?

**ME**: Il CTO sta chiamando.

**TL**: E tutti stanno chiamando te?

**ME**: Sì. Tutti.

**TL**: E cosa fai?

**ME**: Aggiungo la variabile.

**TL**: E quanto tempo?

**ME**: 5 minuti.

**TL**: E in quei 5 minuti?

**ME**: In quei 5 minuti production resta down.

**TL**: E il cliente?

**ME**: Il cliente aspetta.

**TL**: E se non aspetta?

**ME**: Allora siamo fottuti.

Il TL mi ha guardato. Io ho guardato il telefono. Il telefono mostrava: 47 chiamate perse. 23 messaggi. 8 email. E tutti dicevano la stessa cosa: "PRODUCTION IS DOWN". E io sapevo. Sapevo che era colpa mia. Sapevo che avrei dovuto aspettare lunedì. Sapevo che... non si fa il deploy di venerdì. Mai. Amen.

---

**Venerdì - 18:30**

Ho aggiunto la variabile. Ho fatto il redeploy. Ho... pregato.

**TERMINALE**: Deploying to production...

**TERMINALE**: Deploy complete.

**ME**: Ok. Dovrebbe funzionare.

**TL**: Dovrebbe?

**ME**: Sì. Dovrebbe.

**TL**: E se non funziona?

**ME**: Allora c'è un altro problema.

**TL**: E se c'è un altro problema?

**ME**: Allora siamo fottuti.

Ho aspettato. 30 secondi. E poi è arrivato.

**SLACK**: @here Il sito funziona di nuovo.

**SLACK**: @channel Tutto ok.

**SLACK**: @everyone PRODUCTION IS UP.

**ME**: Funziona.

**TL**: Funziona.

**ME**: Grazie a Dio.

**TL**: Grazie a Dio. E alla tua fortuna.

**ME**: E ora?

**TL**: E ora vai a casa.

**ME**: A casa?

**TL**: Sì. A casa. È venerdì. Sono le 18:30. E production è up.

**ME**: E se va di nuovo down?

**TL**: Allora ti chiamo.

**ME**: E se non rispondo?

**TL**: Allora ti chiamo ancora.

**ME**: E se non rispondo ancora?

**TL**: Allora vengo a casa tua.

**ME**: ...

**TL**: Scherzo. O no.

Il TL mi ha guardato. Io ho guardato l'orologio. L'orologio segnava 18:32. E io sapevo. Sapevo che non sarei andato a casa. Sapevo che avrei monitorato production tutta la sera. Sapevo che... non si fa il deploy di venerdì. Mai. Amen.

---

**Venerdì - 22:47**

Ero a casa. Davanti al computer. A guardare i log. A guardare le metriche. A guardare... il nulla.

**ME**: Production è stabile.

**TL**: Lo so. Ti vedo.

**ME**: Mi vedi?

**TL**: Sì. Sei online su Slack dalle 18:00.

**ME**: E tu?

**TL**: Io sono online dalle 18:00.

**ME**: Anche tu?

**TL**: Sì. Anche io.

**ME**: E perché?

**TL**: Perché non si fida.

**ME**: Non ti fidi?

**TL**: No. Non mi fido di nessun deploy di venerdì.

**ME**: E quindi?

**TL**: E quindi monitoro.

**ME**: E se va down?

**TL**: Allora lo sistemiamo.

**ME**: In due?

**TL**: In due. È meglio che da soli.

**ME**: E il PM?

**TL**: Il PM è andato a casa alle 18:30.

**ME**: E noi?

**TL**: Noi siamo qui. A guardare i log. A guardare le metriche. A guardare... il nulla.

**ME**: E fino a quando?

**TL**: Fino a mezzanotte. O fino a quando production va down. O fino a quando crolliamo. Quello che viene prima.

Il TL mi ha guardato. Su Slack. Io ho guardato il TL. Su Slack. E abbiamo capito. Capito che il deploy di venerdì non finisce alle 18:00. Finisce a mezzanotte. O quando production va down. O quando crolliamo. Quello che viene prima. Amen.

---

**Sabato - 09:00**

Il cliente ha fatto la demo. La demo è andata. Il cliente... era contento.

**PM**: Ottimo lavoro! La demo è andata benissimo!

**ME**: Bene.

**PM**: Il cliente è molto soddisfatto!

**ME**: Bene.

**PM**: E production è stabile!

**ME**: Sì. L'ho monitorata tutta la notte.

**PM**: Tutta la notte?

**ME**: Sì. Tutta la notte.

**PM**: E perché?

**ME**: Perché non si fa il deploy di venerdì.

**PM**: Ma è andato tutto bene!

**ME**: Sì. Per fortuna.

**PM**: E quindi?

**ME**: E quindi la prossima volta aspettiamo lunedì.

**PM**: Ma il cliente voleva la feature!

**ME**: E il cliente poteva aspettare.

**PM**: Ma il cliente non poteva aspettare!

**ME**: E invece poteva. Perché la demo era sabato mattina. E noi abbiamo fatto il deploy venerdì sera. E abbiamo passato la sera a monitorare. E abbiamo passato la notte a pregare. E tutto per una demo di sabato mattina. Che poteva aspettare lunedì.

**PM**: Ma il cliente era contento!

**ME**: E io ero distrutto.

**PM**: Ma è il tuo lavoro!

**ME**: Il mio lavoro è sviluppare. Non è passare la notte a pregare che production non vada down.

**PM**: Ma è andato tutto bene!

**ME**: Sì. Questa volta.

**PM**: E la prossima volta?

**ME**: La prossima volta aspettiamo lunedì.

**PM**: Ma se il cliente vuole...

**ME**: Allora il cliente aspetta. Perché non si fa il deploy di venerdì. Mai. Per nessun motivo. Nemmeno se il PM mi punta una pistola alla tempia.

Il PM mi ha guardato. Io ho guardato il PM. E il PM ha capito. O forse no. Perché i PM non capiscono. I PM vogliono solo che le cose siano fatte. E non gli importa come. E non gli importa quando. E non gli importa... di noi. Amen.

---

**Domenica - La Riflessione**

Domenica. Ho dormito. Ho dormito 14 ore. Ho dormito come un bambino. O come un morto. Dipende dai punti di vista.

**ME**: TL, sai qual è la lezione?

**TL**: Quale?

**ME**: Non si fa il deploy di venerdì.

**TL**: Sì. Lo so.

**ME**: E sai qual è l'altra lezione?

**TL**: Quale?

**ME**: Non si fa il deploy dopo le 17:00.

**TL**: Sì. Lo so anche quello.

**ME**: E sai qual è la lezione più importante?

**TL**: Quale?

**ME**: Che anche se sai le regole. Anche se conosci le conseguenze. Anche se hai visto cosa succede. Lo fai comunque. Perché il PM ti chiede. Perché il cliente vuole. Perché... non hai spina dorsale. E allora fai il deploy. Di venerdì. Alle 18:00. E passi la notte a pregare. E tutto per cosa? Per una demo di sabato mattina. Che poteva aspettare lunedì. Ma non ha aspettato. Perché il cliente non aspetta. Il PM non aspetta. E tu... tu non hai spina dorsale. Amen.

---

## Il costo del deploy di venerdì

| Voce | Valore |
|------|--------|
| Ora del deploy | 18:00 |
| Giorno | Venerdì |
| Tempo di downtime | 15 minuti |
| Chiamate perse | 47 |
| Messaggi ricevuti | 23 |
| Email ricevute | 8 |
| Variabili d'ambiente dimenticate | 1 |
| Ore di monitoraggio | 6 |
| Ore di sonno | 14 (recupero) |
| Cliente contento | Sì |
| Sviluppatore distrutto | Sì |
| Lezione imparata | No (la prossima volta farà lo stesso) |
| **Totale** | **1 venerdì sera rovinato + 1 notte insonne + 1 sviluppatore distrutto** |

**Morale**: Non si fa il deploy di venerdì. Mai. Per nessun motivo. Nemmeno se il PM ti promette un aumento. Nemmeno se il cliente minaccia di andarsene. Nemmeno se il CEO ti licenzia. Perché il deploy di venerdì è una condanna. Una condanna a passare la sera a guardare i log. La notte a pregare. E il weekend a pentirti. E se pensi che andrà tutto bene, ti sbagli. Perché qualcosa andrà storto. Sempre. E tu sarai lì. Di venerdì sera. A cercare di sistemare. Mentre tutti gli altri sono a divertirsi. E tu sei davanti al computer. A maledire il giorno in cui hai detto "sì" al PM. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](61-la-query-che-non-aveva-where.md) | [Prossima](63-il-file-env-nel-repository.md)]**
