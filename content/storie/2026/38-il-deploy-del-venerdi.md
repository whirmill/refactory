# Il Deploy del Venerdì

**Data**: 08/11/2026

**[Home](../index.md) | [Precedente](37-il-test-che-passa-solo-in-locale.md)]**

---

C'è una regola. Una regola sacra. Una regola che viene tramandata di generazione in generazione, da sviluppatore a sviluppatore, da quando il primo commit è stato pushato su un server di produzione. La regola è semplice. La regola è chiara. La regola è: **Non fare deploy di venerdì**.

Ma il PM non conosce la regola. Il PM non vuole conoscere la regola. Il PM ha una deadline. E la deadline è venerdì. E quindi, venerdì si fa il deploy. Perché il PM vuole. E quello che il PM vuole, il PM ottiene. Anche a costo della nostra sanità mentale.

![](../../img/code.jpg)

Era venerdì. 17:47. Il PM entra nel canale Slack #deploy.

**PM**: @here Dobbiamo fare il deploy della feature X.

**TL**: È venerdì. Alle 17:47.

**PM**: Lo so. Ma la demo è lunedì.

**TL**: La demo è lunedì mattina?

**PM**: Sì. Alle 9.

**TL**: Quindi abbiamo sabato e domenica per fixare se qualcosa si rompe.

**PM**: No. Non lavoriamo nel weekend.

**TL**: Appunto. Non facciamo deploy di venerdì.

**PM**: Ma la demo!

**TL**: La demo può essere fatta in locale.

**PM**: Il cliente vuole vedere la produzione.

**TL**: Il cliente non capisce la differenza.

**PM**: Io sì. E voglio la produzione.

Il TL ha sospirato. Un sospiro che ho sentito anche dal mio computer. Un sospiro che diceva: "So che perderò. Ma devo provarci lo stesso."

**TL**: @ME, puoi fare il deploy?

**ME**: Posso. Ma non dovrei.

**PM**: Fallo. È urgente.

**ME**: È venerdì. 17:52.

**PM**: Lo so. Fallo.

---

Ho fatto il deploy. Alle 17:58. Di venerdì. Come un idiota. Come un kamikaze. Come qualcuno che non ha mai letto la regola. O che l'ha letta e l'ha ignorata. Perché il PM ha detto "urgente". E quando il PM dice "urgente", non si discute. Si esegue. E si soffre.

Il deploy è andato. Verde. Successo. Tutto ok.

Ho scritto in Slack: "Deploy completato. Verde."

Il PM ha risposto: "Ottimo! Buon weekend!"

E se n'è andato. Alle 18:03. Con il deploy fatto. Con la coscienza pulita. Con il weekend che lo aspettava.

Io sono rimasto. Perché sapevo. Sapevo che non era finita. Sapevo che il venerdì non perdona. Sapevo che qualcosa sarebbe successo. Qualcosa sarebbe andato storto. E quel qualcosa sarebbe successo alle 18:30. O alle 19:00. O alle 22:00. O alle 3:00 del mattino. Ma sarebbe successo. Perché è venerdì. E venerdì è maledetto.

---

**18:47** - Il primo segnale

Il JN mi ha scritto in privato.

**JN**: ME, il sito è lento.

**ME**: Quanto lento?

**JN**: Molto lento. 30 secondi per caricare la home.

**ME**: 30 secondi?

**JN**: Sì. E la CPU del server è al 100%.

**ME**: Quale server?

**JN**: Quello di produzione.

**ME**: Quello dove abbiamo appena fatto il deploy?

**JN**: Sì.

**ME**: Cazzo.

Ho aperto il monitor. La CPU era al 100%. La memoria era al 94%. I processi erano 847. Tutti processi del nostro servizio. Tutti zombie. Tutti morti ma non morti. Tutti lì. A consumare risorse. A mangiare CPU. A uccidere il server.

Ho guardato il codice che avevo deployato. C'era un loop. Un loop infinito. In una funzione che veniva chiamata a ogni request. A ogni singola request. Il loop non finiva mai. E ogni request creava un nuovo processo. E ogni processo consumava CPU. E la CPU moriva. E il server moriva. E io morivo. Dentro.

**ME**: @TL, c'è un bug nel deploy.

**TL**: Cosa?

**ME**: Loop infinito. CPU al 100%. Server morente.

**TL**: E il PM?

**ME**: Il PM è andato via alle 18:03.

**TL**: Cazzo.

**ME**: Già.

**TL**: Rollback?

**ME**: Rollback.

---

**19:12** - Il rollback

Ho fatto il rollback. Il server è tornato normale. La CPU è scesa al 12%. I processi zombie sono morti. Finalmente. Il server era salvo.

Ho scritto in Slack: "Rollback completato. Server stabile."

Il TL ha risposto: "Ottimo. Ora fixiamo il bug e facciamo un nuovo deploy."

**ME**: Ora?

**TL**: Sì, ora.

**ME**: Sono le 19:15. Di venerdì.

**TL**: Lo so. Ma la demo è lunedì.

**ME**: Possiamo fixare lunedì mattina.

**TL**: Il PM vuole la produzione pronta per lunedì.

**ME**: Il PM non c'è.

**TL**: Ma le sue richieste sì.

Ho fixato il bug. Il loop infinito era causato da una variabile non inizializzata. Una variabile che in locale era undefined, ma che in produzione diventava null. E null !== undefined. E il loop continuava. Per sempre. Come il mio dolore.

Ho fatto il nuovo deploy. Alle 19:47. Di venerdì. Di nuovo. Come un idiota. Di nuovo.

Il deploy è andato. Verde. Successo. Tutto ok.

Ho scritto in Slack: "Deploy completato. Verde. Di nuovo."

Il TL ha risposto: "Ottimo. Buon weekend."

E se n'è andato. Alle 19:52. Con il deploy fatto. Con la coscienza pulita. Con il weekend che lo aspettava.

Io sono rimasto. Perché sapevo. Sapevo che non era finita. Sapevo che venerdì non finisce mai. Sapevo che venerdì è un loop. Un loop infinito. Come quello che avevo appena fixato. Ma questo loop non si poteva fixare. Perché venerdì è eterno.

---

**21:23** - Il secondo segnale

Il mio telefono ha squillato. Era il CTO.

**CTO**: ME, il sito è down.

**ME**: Cosa?

**CTO**: Down. Completamente down. 503 Service Unavailable.

**ME**: Ma ho fatto il deploy alle 19:47. Era verde.

**CTO**: Lo so. Ma ora è down.

**ME**: Down per cosa?

**CTO**: Non lo so. Guarda tu.

Ho aperto il laptop. Il sito era down. 503. Service Unavailable. Il server non rispondeva. Il database non rispondeva. Nulla rispondeva.

Ho fatto SSH sul server. Il server era vivo. Ma il database era morto.

```
$ mysql -u root -p
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'
```

Il socket non esisteva. Il database era crashato. E non era ripartito.

Ho guardato i log.

```
2026-11-08 21:15:47 ERROR InnoDB: The log sequence number in the ib_logfiles is too high
2026-11-08 21:15:47 ERROR InnoDB: This means that the log files are corrupted
2026-11-08 21:15:47 ERROR InnoDB: Database cannot be started
```

I log files erano corrotti. Il database non poteva partire. E io non avevo backup. Perché i backup erano configurati da Bob. E Bob non lavora più qui. E i backup non funzionavano. Da sempre.

**ME**: @CTO, il database è corrotto.

**CTO**: E i backup?

**ME**: I backup non funzionano.

**CTO**: Cosa?

**ME**: I backup non funzionano. Da sempre.

**CTO**: Da sempre quando?

**ME**: Da sempre sempre. Da quando Bob se n'è andato.

**CTO**: Bob chi?

**ME**: Bob del 2019.

**CTO**: Cazzo.

**ME**: Già.

---

**22:47** - La riparazione

Ho passato le ultime due ore a riparare il database. Senza backup. Senza documentazione. Senza speranza. Ma con Stack Overflow. E Stack Overflow ha risposte. A volte. Quando sei fortunato. E io ero fortunato. Abbastanza fortunato da trovare un post del 2018 di qualcuno che aveva lo stesso problema. E che aveva trovato una soluzione. Una soluzione orribile. Una soluzione che faceva schifo. Ma una soluzione.

La soluzione era: cancellare i log files corrotti e forzare InnoDB a ricrearli.

```
$ rm /var/lib/mysql/ib_logfile*
$ service mysql start
```

Il database è partito. I log files sono stati ricreati. I dati c'erano ancora. Per miracolo. Per fortuna. Per il cazzo.

Ho scritto in Slack: "Database riparato. Servizio ripartito."

Il CTO ha risposto: "Ottimo. Ora documentiamo i backup."

**ME**: Ora?

**CTO**: Sì, ora.

**ME**: Sono le 23:12. Di venerdì.

**CTO**: Lo so. Ma se succede di nuovo, dobbiamo essere pronti.

**ME**: Possiamo farlo lunedì.

**CTO**: Lunedì ce ne dimenticheremo.

**ME**: Probabilmente.

**CTO**: Appunto. Facciamolo ora.

Ho configurato i backup. Backup giornalieri. Backup settimanali. Backup mensili. Backup di backup. Backup di tutto. Perché venerdì mi ha insegnato una lezione. La lezione è: non fidarti di Bob. Non fidarti di nessuno. Fidati solo dei backup. E anche di quelli, controllali.

---

**01:23** - La fine

Ho finito alle 01:23. Di sabato. Perché venerdì non finisce mai. Venerdì si estende. Si allunga. Si espande. Come l'universo. Come il dolore. Come il mio odio per il PM.

Il PM ha scritto in Slack alle 01:47. Sì, alle 01:47. Di sabato mattina.

**PM**: @ME, grazie per il deploy! La demo sarà perfetta!

Non ho risposto. Non potevo rispondere. Perché se avessi risposto, avrei detto cose. Cose che non si possono dire. Cose che si possono solo pensare. Cose come: "Non fare mai più deploy di venerdì." O: "Leggi la regola." O: "Vaffanculo."

Ma non ho detto nulla. Perché sono un professionista. E i professionisti non dicono "vaffanculo" in Slack. I professionisti dicono "ok" e vanno a dormire. E si svegliano il sabato pomeriggio. E cercano di dimenticare. Ma non possono. Perché venerdì non si dimentica. Venerdì rimane. Come una cicatrice. Come un trauma. Come un ricordo che non va via.

---

**Lunedì - La demo**

La demo è andata bene. Il cliente era contento. Il PM era contento. Il CTO era contento. Tutti erano contenti.

Tranne me. Perché io sapevo. Sapevo cosa era costato. Sapevo quante ore avevo passato a fixare. Sapevo quanto avevo sofferto. Ma nessuno lo sapeva. Nessuno lo chiedeva. Nessuno voleva saperlo.

Il PM mi ha detto: "Ottimo lavoro! Alla prossima!"

"Alla prossima" significa: "Alla prossima volta che ho una deadline di venerdì. E ti chiederò di fare un deploy. Di venerdì. Alle 17:47. E tu lo farai. Perché sei un professionista. E i professionisti fanno quello che gli viene chiesto. Anche se è venerdì. Anche se è sbagliato. Anche se è maledetto."

Ho annuito. E ho detto: "Alla prossima."

Ma dentro di me, ho aggiunto: "Ma la prossima volta, il venerdì lo passo offline. Con il telefono spento. In una baita in montagna. Senza internet. Senza Slack. Senza il PM. Senza nulla. Solo io, la neve, e la pace."

Ma non l'ho fatto. Perché la prossima volta è arrivata. E io ero lì. A fare deploy. Di venerdì. Come sempre. Come per sempre.

---

## Il costo del venerdì

| Voce | Valore |
|------|--------|
| Deploy fatti di venerdì | 2 |
| Rollback fatti | 1 |
| Database crashati | 1 |
| Backup funzionanti (prima) | 0 |
| Backup funzionanti (dopo) | 3 |
| Ore lavorate venerdì sera | 6 |
| Weekend rovinati | 1 |
| Sanità mentale persa | ~47% |
| Valore della regola | Inestimabile |

**Morale**: La regola esiste per un motivo. Il motivo è: venerdì è maledetto. Non fare deploy di venerdì. Non farlo. Non farlo MAI. E se il PM ti chiede di farlo, digli: "No." E se il PM insiste, digli: "No." E se il PM ti licenzia, almeno avrai il weekend libero. E il weekend libero vale più di qualsiasi lavoro. Specialmente un lavoro dove ti chiedono di fare deploy di venerdì.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](37-il-test-che-passa-solo-in-locale.md)]**
