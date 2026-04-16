# Il Deploy del Venerdì

**Data**: 13/12/2026

**[Home](../index.md) | [Precedente](42-il-microservizio-che-e-diventato-un-monolite.md)]**

---

C'è una regola non scritta nello sviluppo software. Una regola che trascende aziende, team, metodologie. Una regola che è vera oggi come era vera vent'anni fa e come sarà vera tra vent'anni. La regola è: **Non si fa il deploy di venerdì**.

Ma il PM non conosce questa regola. O la conosce e la ignora. O la conosce e la disprezza. Il PM crede che "se il codice è pronto, si deploya". Il PM non capisce che il venerdì è sacro. Il venerdì è il giorno in cui si chiude. Si archivia. Si dimentica. Non si deploya.

![](../../img/code.jpg)

Era venerdì. 16:47. Il momento peggiore. Il momento in cui il PM entra in chat e dice: "Possiamo fare un piccolo deploy?"

Il TL ha risposto: "È venerdì."

Il PM ha risposto: "E allora?"

Il TL ha risposto: "Non si fa il deploy di venerdì."

Il PM ha risposto: "Ma è una fix piccola! Una riga! Un carattere!"

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. Il JN ha guardato lo schermo. Il JN non sapeva. Il JN non poteva sapere. Il JN era innocente. Il JN era condannato.

**TL**: Quanto è piccola questa fix?

**PM**: Una riga! Un carattere! Un punto e virgola!

**TL**: Un punto e virgola?

**PM**: Sì! Bob ha dimenticato un punto e virgola in produzione. E il cliente si lamenta. Dobbiamo fixarlo. Ora.

**ME**: Bob ha dimenticato un punto e virgola?

**PM**: Sì.

**ME**: In produzione?

**PM**: Sì.

**ME**: E funziona lo stesso?

**PM**: Sì, ma il cliente vuole che sia fixato. Dice che è "non professionale".

**ME**: È Bob. Bob è la definizione di "non professionale".

Il TL ha sospirato. Un sospiro che ho sentito anche attraverso la chat. Un sospiro che diceva: "So che è una pessima idea. Ma il PM vuole. E il PM ottiene. E io devo solo sperare che non esploda tutto."

**TL**: Ok. Facciamo questo deploy. Ma è una riga. Un carattere. Nient'altro.

**PM**: Perfetto! Grazie!

---

**16:52** - Il Deploy

Il TL ha aperto la PR. Una riga. Un carattere. Un punto e virgola aggiunto alla fine di una riga in `config.js`.

```diff
- const maxRetries = 3
+ const maxRetries = 3;
```

**TL**: Ecco. Un punto e virgola.

**ME**: Perché Bob non l'ha messo?

**TL**: Perché Bob odia i punti e virgola. Dice che sono "opzionali". Dice che JavaScript non li richiede. Dice che sono "vecchia scuola".

**ME**: E perché ora il cliente vuole che sia aggiunto?

**TL**: Perché il cliente ha un linter configurato in modo aggressivo. E vede warning ovunque. E vuole warning zero. Anche se il codice funziona. Anche se non cambia nulla. Anche se è solo estetico.

Il TL ha approvato la PR. Ha mergiato. Ha cliccato "Deploy to Production".

E il mondo è finito.

---

**16:54** - L'Errore

Il deploy è fallito.

**CI/CD Pipeline**: ❌ Build failed. See logs.

**TL**: Cosa?

**ME**: È fallito?

**TL**: È fallito.

**JN**: Ma era un punto e virgola!

**TL**: Era un punto e virgola. Ma qualcosa è andato storto.

Il TL ha aperto i log. 847 righe di log. 847 righe di errori. 847 righe di dolore.

```
Error: Cannot find module './config'
    at Object.<anonymous> (/app/src/server.js:1:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    ...
```

**TL**: Non trova config?

**ME**: Ma config c'è!

**TL**: C'è. Ma non lo trova.

**ME**: Perché?

**TL**: Non lo so.

Il JN ha chiesto: "Ma era solo un punto e virgola!"

Il TL ha risposto: "Era solo un punto e virgola. Ma questo è il codice di Bob. E il codice di Bob è un organismo vivente. E se lo tocchi, muore."

---

**17:03** - L'Indagine

Abbiamo aperto `config.js`. Il file c'era. Il punto e virgola c'era. Tutto c'era.

**TL**: Il file c'è.

**ME**: Il punto e virgola c'è.

**JN**: Allora perché non lo trova?

**TL**: Non lo so.

Abbiamo guardato il file. E poi l'abbiamo visto.

Il file `config.js` aveva un import:

```javascript
const secrets = require('./secrets');
```

E `secrets.js` non esisteva. Non esisteva perché era nel `.gitignore`. Perché conteneva le API key. Perché era un file segreto. Che Bob aveva creato. E non aveva mai documentato. E nessuno sapeva che esisteva. Fino a ora.

**ME**: Bob ha creato un file segreto?

**TL**: Sì.

**ME**: E non l'ha documentato?

**TL**: No.

**ME**: E ora non c'è in produzione?

**TL**: No.

**ME**: E il deploy fallisce?

**TL**: Sì.

**ME**: E come facciamo a fixarlo?

**TL**: Non lo so.

Il JN ha chiesto: "Ma Bob dov'è?"

Il TL ha risposto: "Bob è in vacanza. Bob è sempre in vacanza quando succede qualcosa."

**ME**: E chi ha le API key?

**TL**: Bob.

**ME**: E Bob non risponde?

**TL**: Bob non risponde mai.

**ME**: Quindi?

**TL**: Quindi siamo fottuti.

---

**17:15** - La Panico

Il PM è entrato in chat: "Com'è andato il deploy?"

Il TL ha risposto: "Ci sono... complicazioni."

"Complicazioni? Quali complicazioni?"

"Il deploy è fallito."

"FALLITO? Ma era un punto e virgola!"

"Sì. Ma il punto e virgola ha... effetti a cascata."

"EFFETTI A CASCATA? Ma il cliente vuole la fix!"

"Il cliente dovrà aspettare."

"ASPETTARE? È venerdì! Il cliente vuole la fix prima del weekend!"

"Il cliente dovrà aspettare lo stesso."

"Ma perché?"

"Perché Bob."

"BOB? Ancora Bob?"

"Sì. Sempre Bob. Per sempre Bob."

Il PM ha urlato. In chat. Con maiuscole. Per 47 messaggi. E noi abbiamo letto. E abbiamo annuito. E abbiamo sofferto. In silenzio. Come sempre.

---

**17:32** - La Soluzione (Provvisoria)

Il TL ha trovato una soluzione. Una soluzione provvisoria. Una soluzione che faceva schifo. Ma che funzionava.

**TL**: Ho trovato `secrets.js` in un vecchio backup. Del 2023.

**ME**: Del 2023?

**TL**: Sì. Del 2023.

**ME**: Ma le API key saranno cambiate!

**TL**: Probabilmente.

**ME**: E se le usiamo?

**TL**: Probabilmente non funzioneranno.

**ME**: E allora?

**TL**: Allora proviamo.

Il TL ha creato `secrets.js` con le vecchie API key. Ha fatto il deploy. Il deploy è passato. Il sistema è tornato su.

Ma le API key erano vecchie. E i servizi esterni non rispondevano. E il sistema funzionava. Ma non funzionava. Come Bob. Come tutto.

**TL**: Ok. Il sistema è su. Ma non funziona.

**ME**: Cosa non funziona?

**TL**: I pagamenti. Le notifiche. L'email. Tutto quello che richiede API esterne.

**ME**: Quindi?

**TL**: Quindi il cliente non può usare il sistema.

**ME**: E il PM?

**TL**: Il PM non lo sa ancora.

**ME**: E quando lo saprà?

**TL**: Quando il cliente chiamerà.

**ME**: E quando chiamerà?

**TL**: Tra circa 47 minuti.

---

**18:19** - La Telefonata

Il cliente ha chiamato. Dopo 47 minuti. Esattamente 47 minuti. Come previsto dal TL. Perché il TL sa. Il TL vede. Il TL predice. Il TL è un oracolo. Un oracolo di dolore.

**PM**: IL CLIENTE CHIAMA! IL SISTEMA NON FUNZIONA!

**TL**: Lo so.

**PM**: COME LO SAI?

**TL**: Perché è venerdì. E abbiamo fatto un deploy. E il deploy ha toccato il codice di Bob. E il codice di Bob è maledetto.

**PM**: MA DOBBIAMO FIXARLO!

**TL**: Non possiamo. Bob ha le API key. Bob è in vacanza. Bob non risponde.

**PM**: MA È VENERDÌ!

**TL**: Appunto. È venerdì. Non si fa il deploy di venerdì.

**PM**: MA ERI D'ACCORDO!

**TL**: Ero d'accordo perché tu volevi. Non perché fosse una buona idea.

**PM**: AVEVI DETTO CHE ERA SICURO!

**TL**: Ho detto che era una riga. Non che era sicuro.

**PM**: È LA STESSA COSA!

**TL**: No. Non è la stessa cosa. Una riga può distruggere tutto. Una riga può uccidere il sistema. Una riga può rovinare il venerdì. E il weekend. E la vita. Di tutti.

Il PM ha pianto. In call. Con tutti. Il PM ha pianto. E noi abbiamo guardato. E abbiamo sofferto. E abbiamo capito. Capito che il venerdì è sacro. E non si tocca. Mai. Mai più. Mai per sempre.

---

**19:47** - La Resa

Abbiamo passato 3 ore a cercare una soluzione. 3 ore. Di venerdì. Di sera. Quando avremmo dovuto essere a casa. A bere. A dormire. A dimenticare. Invece eravamo qui. A fixare. A soffrire. A maledire Bob.

Il TL ha detto: "Ok. Ho un'idea."

**ME**: Quale idea?

**TL**: Disabilitiamo tutto quello che richiede API esterne.

**ME**: Tutto?

**TL**: Tutto.

**ME**: Ma il cliente...

**TL**: Il cliente potrà usare il sistema. Parzialmente. Senza pagamenti. Senza notifiche. Senza email. Ma potrà usarlo.

**ME**: E il PM?

**TL**: Il PM accetterà. Perché non c'è alternativa.

**ME**: E Bob?

**TL**: Bob continuerà la sua vacanza. Ignaro. Felice. Libero. Come sempre.

Il TL ha disabilitato i servizi esterni. Ha fatto il deploy. Il sistema è tornato su. Parzialmente. Ma su.

Il PM ha chiamato il cliente. Ha spiegato. Ha mentito. Ha detto che c'era un "problema di infrastruttura". Che sarebbe stato risolto "lunedì". Che era "una situazione temporanea". Il cliente ha accettato. Perché non aveva scelta. Perché era venerdì. Perché anche il cliente voleva andare a casa.

---

**21:00** - La Fine

Eravamo ancora in call. 4 ore dopo. 4 ore per un punto e virgola. 4 ore di venerdì. 4 ore di vita. Perse. Per sempre.

Il TL ha detto: "Ok. Per oggi basta."

Il PM ha chiesto: "Ma lunedì fixiamo tutto?"

Il TL ha risposto: "Lunedì Bob torna?"

"No, Bob torna mercoledì."

"Allora mercoledì fixiamo tutto."

"E fino ad allora?"

"Fino ad allora il sistema funziona parzialmente. E il cliente aspetta. E noi aspettiamo. E Bob gode. In vacanza. Senza sapere. O sapendo. Chi lo sa. È Bob."

La call è finita. E noi siamo andati a casa. A bere. A dormire. A dimenticare. Ma non potevamo dimenticare. Perché il venerdì era rovinato. E il weekend sarebbe stato rovinato. E la vita era rovinata. Da un punto e virgola. Da Bob. Dal PM. Da noi stessi. Perché avevamo detto sì. Quando avremmo dovuto dire no. Quando avremmo dovuto dire: "È venerdì. Non si fa il deploy di venerdì." Ma non l'abbiamo detto. E ora siamo qui. A soffrire. A imparare. A giurare. Che non succederà mai più. Anche se sappiamo. Sappiamo che succederà ancora. Perché il PM vuole. E il PM ottiene. E noi siamo solo ingegneri. Che dicono sì. Quando dovrebbero dire no. Sempre. Per sempre. Amen.

---

**2026 - Oggi**

Sono passati 3 mesi. Il sistema funziona ancora parzialmente. Bob è tornato dalla vacanza. Ha dato le API key. Ma ha anche creato altri 47 file segreti. Che non ha documentato. E che non documenterà mai.

Il PM ha chiesto: "Possiamo fare un piccolo deploy? È solo una riga."

Era venerdì. 16:47.

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. Il JN ha guardato lo schermo. E il TL ha detto:

"No."

"No?"

"No. È venerdì. Non si fa il deploy di venerdì."

"Mai?"

"Mai. Mai più. Mai per sempre."

E il PM ha accettato. Perché il TL aveva imparato. E io avevo imparato. E il JN aveva imparato. La lezione più importante dello sviluppo software. La lezione che non si insegna. Che non si scrive. Che non si documenta. Ma che si impara. Con il dolore. Con la sofferenza. Con il venerdì rovinato. La lezione è: **Non si fa il deploy di venerdì**.

E se qualcuno te lo chiede? Dici di no. Sempre. Sempre. Sempre. Anche se è una riga. Anche se è un carattere. Anche se è un punto e virgola. Perché quel punto e virgola? Quel punto e virgola può distruggere tutto. Il venerdì. Il weekend. La vita. Tutto.

---

## Il costo del deploy di venerdì

| Voce | Valore |
|------|--------|
| Ore di lavoro di venerdì sera | 4 |
| Deploy tentati | 3 |
| Deploy riusciti | 1 (parziale) |
| Servizi disabilitati | 7 |
| API key perse | 47 |
| File segreti di Bob | 47 |
| Chiamate del cliente | 1 |
| Urla del PM | 47 |
| JN traumatizzati | 1 |
| Venerdì rovinati | 1 |
| Weekend rovinati | 1 |
| Sanità mentale residua | ~8% |

**Morale**: Non si fa il deploy di venerdì. Non importa quanto sia piccolo. Non importa quanto sia sicuro. Non importa quanto il PM insista. Il venerdì è sacro. Il venerdì è per chiudere. Per archiviare. Per dimenticare. Non per deployare. E se qualcuno ti chiede di fare un deploy di venerdì? Dici di no. Con calma. Con fermezza. Con amore. Per te stesso. Per il tuo weekend. Per la tua sanità mentale. Perché quel deploy? Quel deploy può aspettare. Fino a lunedì. Sempre. Sempre. Sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](42-il-microservizio-che-e-diventato-un-monolite.md)]**
