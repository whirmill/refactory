# Il Refactor Che Non Finisce Mai

**Data**: 29/11/2026

**[Home](../index.md) | [Precedente](40-il-meeting-che-poteva-essere-una-email.md) | [Prossima](42-il-microservizio-che-e-diventato-un-monolite.md)]**

---

C'è un refactor in corso. È iniziato nel 2023. Doveva durare 2 sprint. Siamo allo sprint 847. Il refactor non è finito. Il refactor non finirà mai. Il refactor è eterno. Come il dolore. Come le tasse. Come i TODO di Bob.

![](../../img/code.jpg)

Il refactor è iniziato con le migliori intenzioni. Come tutte le cose che finiscono male. Il TL aveva detto: "Questo codice è un disastro. Dobbiamo rifarlo."

Il PM aveva chiesto: "Quanto tempo?"

Il TL aveva risposto: "2 sprint. 4 settimane."

Il PM aveva approvato. Il TL aveva iniziato. E io ero lì. A guardare. A imparare. A capire che 4 settimane erano una bugia. Una bugia gentile. Una bugia necessaria. Una bugia che ci avrebbe perseguitato per sempre.

---

**Sprint 1 - L'Inizio**

Il TL ha creato un branch. `refactor/auth-module`. Un nome ambizioso. Un nome che prometteva pulizia. Un nome che prometteva un futuro migliore.

**TL**: Iniziamo dal modulo di autenticazione. È il cuore del sistema.

**ME**: Ok. Quanto è grande?

**TL**: 47 file. 12.000 righe. Scritti da 8 persone diverse. In 4 anni.

**ME**: E le ha scritte bene?

**TL**: No.

**ME**: Quanto male?

**TL**: Bob ha scritto la metà.

**ME**: Cazzo.

**ME**: Già.

Abbiamo iniziato. Il TL ha aperto il primo file. `auth.js`. 847 righe. Una funzione principale. `authenticateUser()`. Che chiamava altre 47 funzioni. Che chiamavano altre 47 funzioni. Che chiamavano il database. E API esterne. E servizi che non esistevano più. E commenti in tedesco. E TODO. Tanti TODO.

**TL**: Questo file è... interessante.

**ME**: Interessante come?

**TL**: Interessante come un incidente stradale. Non puoi guardare. Ma non puoi smettere.

Il TL ha iniziato a refactorare. Ha estratto funzioni. Ha creato moduli. Ha aggiunto test. Ha fatto tutto "correttamente".

Dopo 2 settimane, il file era diventato 12 file. 12 file puliti. 12 file testati. 12 file che funzionavano.

In locale.

---

**Sprint 2 - La Realtà**

Il TL ha fatto il merge. In staging. Per testare.

Il sistema di autenticazione ha smesso di funzionare.

**TL**: Cosa?

**ME**: Non funziona.

**TL**: Ma i test passano!

**ME**: I test passano. Ma in staging non funziona.

**TL**: Perché?

**ME**: Non lo so. Guardiamo i log.

I log dicevano: `Error: Cannot read property 'token' of undefined`.

Il TL ha guardato il codice. Il codice era pulito. Il codice era elegante. Il codice era... sbagliato.

**TL**: Ah.

**ME**: Ah cosa?

**TL**: Il vecchio codice gestiva il caso undefined.

**ME**: Come?

**TL**: Con un try-catch. Che inghiottiva l'errore. E ritornava false.

**ME**: E il nostro codice?

**TL**: Non lo gestisce. Perché siamo "professionisti". E i professionisti non usano try-catch per gestire undefined.

**ME**: Quindi?

**TL**: Quindi il vecchio codice era una merda. Ma funzionava. E il nostro codice è pulito. Ma non funziona.

**ME**: Quindi?

**TL**: Quindi dobbiamo aggiungere il try-catch.

**ME**: Ma hai detto che i professionisti non...

**TL**: I professionisti fanno quello che funziona. Anche se è una merda.

Il TL ha aggiunto il try-catch. Il sistema ha ricominciato a funzionare. Ma il TL era triste. Perché il codice non era più "pulito". Era solo "funzionante". Come il vecchio codice. Ma con più file. E più complessità. E più tempo perso.

---

**Sprint 3 - L'Espansione**

Il PM ha chiesto: "Com'è il refactor?"

Il TL ha risposto: "In corso."

"Quanto manca?"

"Un altro sprint."

"Ma avevi detto 2 sprint!"

"Sì. Ma abbiamo trovato... complicazioni."

"Che tipo di complicazioni?"

"Codice di Bob."

Il PM non ha capito. Il PM non poteva capire. Il PM non ha mai visto il codice di Bob. Il codice di Bob è un'esperienza. Un'esperienza traumatica. Un'esperienza che cambia. Che segna. Che lascia cicatrici.

Il TL ha continuato. Ha refactorato il modulo `permissions.js`. 1.200 righe. Scritte da Bob. Nel 2019. Con commenti in tedesco. E variabili con nomi come `x`, `y`, `z`, `temp`, `temp2`, `temp_final`, `temp_final_v2`.

**TL**: Bob odiava i nomi descrittivi.

**ME**: Perché?

**TL**: Perché Bob credeva nella "privacy del codice". Diceva che se qualcuno capiva il suo codice, poteva rubargli il lavoro.

**ME**: E funzionava?

**TL**: Sì. Nessuno capiva il suo codice. E nessuno poteva sostituirlo. Perché nessuno sapeva cosa faceva.

**ME**: Quindi Bob era... intelligente?

**TL**: Bob era un genio. Un genio malvagio. Ma un genio.

Il TL ha passato 3 settimane su `permissions.js`. Ha dovuto reverse-engineerare la logica. Ha dovuto capire cosa faceva `temp_final_v2`. Ha dovuto scoprire che `temp_final_v2` era in realtà il flag che determinava se un utente poteva accedere alla dashboard admin.

**TL**: Avrebbe potuto chiamarlo `canAccessAdminDashboard`.

**ME**: Sì.

**TL**: Ma no. `temp_final_v2`. Perché Bob.

**ME**: Già. Bob.

---

**Sprint 4 - La Dipendenza**

Il refactor si è espanso. Non perché lo volessimo. Ma perché il codice era collegato. Tutto era collegato. Il modulo auth chiamava il modulo permissions. Che chiamava il modulo users. Che chiamava il modulo database. Che chiamava il modulo config. Che chiamava... tutto.

Il TL ha detto: "Dobbiamo refactorare anche questi."

Il PM ha chiesto: "Quanto tempo?"

Il TL ha risposto: "Altri 2 sprint."

Il PM ha detto: "Ok. Ma poi basta."

Il TL ha detto: "Ok. Poi basta."

Il TL sapeva che non sarebbe bastato. Il TL sapeva che il refactor non finisce mai. Il TL sapeva che stava mentendo. Ma il TL mentiva per sopravvivere. Perché se avesse detto la verità, il PM avrebbe cancellato il refactor. E il refactor era necessario. Anche se non finiva mai. Anche se costava troppo. Anche se stava uccidendo tutti.

---

**Sprint 5 - Il JN**

Il JN è stato assegnato al refactor. Perché il refactor aveva bisogno di mani. E il JN aveva mani. E il JN era economico. E il JN non sapeva. Non sapeva del refactor. Non sapeva di Bob. Non sapeva del dolore.

**JN**: Cosa devo fare?

**TL**: Refactorare il modulo users.

**JN**: Quanto è grande?

**TL**: 2.400 righe.

**JN**: Ok. Quanto tempo ho?

**TL**: 1 sprint.

**JN**: Perfetto!

Il JN non sapeva. Il JN non poteva sapere. Il JN era giovane. Il JN era innocente. Il JN era condannato.

Il JN ha aperto `users.js`. Ha visto le 2.400 righe. Ha visto i commenti in tedesco. Ha visto le variabili `x`, `y`, `z`. Ha visto i TODO. Ha visto Bob.

**JN**: Chi è Bob?

**TL**: Un fantasma.

**JN**: Un fantasma?

**TL**: Sì. Un fantasma che vive nel nostro codice. E ci perseguita. Per sempre.

Il JN ha imparato. Come abbiamo imparato tutti. Per trauma. Per dolore. Per esperienza. Il JN ha refactorato. Ha pianto. Ha urlato. Ha maledetto Bob. Ma ha refactorato.

Dopo 2 sprint, il modulo users era diventato 18 file. 18 file puliti. 18 file testati. 18 file che funzionavano.

In locale.

In staging, il modulo users ha rotto il modulo auth. Che ha rotto il modulo permissions. Che ha rotto il modulo database. Che ha rotto tutto.

Il JN ha pianto. Davvero. In una call. Con tutti. Il JN ha pianto.

**JN**: Perché?

**TL**: Perché il refactor è una bugia.

**JN**: Una bugia?

**TL**: Sì. Una bugia che diciamo a noi stessi. La bugia è: "Possiamo migliorare il codice." Ma la verità è: "Il codice è un organismo vivente. E se lo tocchi, muore."

---

**Sprint 8 - La Resa**

Il TL ha smesso di refactorare. Non perché avesse finito. Ma perché non poteva più. Il TL era stanco. Il TL era rotto. Il TL aveva passato 8 sprint. 8 sprint a refactorare. 8 sprint a lottare. 8 sprint a perdere.

Il PM ha chiesto: "Il refactor è finito?"

Il TL ha risposto: "Sì."

"Perfetto! Cosa abbiamo ottenuto?"

"Abbiamo... migliorato."

"Migliorato cosa?"

"Il codice. È più pulito."

"Più pulito quanto?"

"Più file. Più test. Più... struttura."

"E funziona meglio?"

"Funziona... uguale."

"Uguale?"

"Sì. Uguale."

"Quindi abbiamo passato 8 sprint per avere lo stesso risultato?"

" Tecnicamente... sì."

Il PM era confuso. Il PM non capiva. Il PM non poteva capire. Il PM pensava in termini di "feature". Di "valore". Di "ROI". Ma il refactor non produce valore. Il refactor produce... meno dolore. Meno dolore futuro. Meno dolore per chi verrà dopo. Ma il PM non è chi verrà dopo. Il PM è qui. Ora. E vuole risultati.

---

**Sprint 12 - Il Nuovo Refactor**

Il CTO ha deciso. Il refactor doveva ricominciare. Ma "correttamente" questa volta.

**CTO**: Dobbiamo rifare il refactor.

**TL**: Cosa?

**CTO**: Il refactor. Non è stato fatto bene.

**TL**: Non è stato fatto bene?

**CTO**: No. Ci sono ancora troppi file. Troppa complessità. Troppo... Bob.

**TL**: Ma abbiamo passato 8 sprint!

**CTO**: Lo so. Ma non è abbastanza.

**TL**: Cosa proponi?

**CTO**: Un nuovo refactor. Più aggressivo. Più... definitivo.

**TL**: Definitivo?

**CTO**: Sì. Definitivo. Dobbiamo eliminare Bob. Dal codice. Per sempre.

Il TL ha guardato il CTO. Il TL ha visto la determinazione. Il TL ha visto la follia. Il TL ha visto se stesso. 8 sprint prima. Quando anche lui credeva. Quando anche lui sperava. Quando anche lui era innocente.

**TL**: Ok. Quanto tempo?

**CTO**: 4 sprint.

Il TL ha sorriso. Un sorriso amaro. Un sorriso di chi sa. Di chi ha visto. Di chi ha sofferto.

**TL**: Ok. 4 sprint.

Il TL sapeva. Il TL sapeva che sarebbero stati 12. O 24. O 847. Il TL sapeva che il refactor non finisce mai. Il TL sapeva che Bob non si elimina. Bob persiste. Bob sopravvive. Bob è eterno. Come il refactor. Come il dolore. Come la speranza. Che muore. E rinasce. E muore. E rinasce. In un ciclo infinito. Come il refactor. Come tutto.

---

**2026 - Oggi**

Il refactor è ancora in corso. È iniziato nel 2023. Siamo nel 2026. 3 anni. 3 anni di refactor. 3 anni di promesse. 3 anni di bugie.

Il branch si chiama ancora `refactor/auth-module`. Ma ora ha 847 commit. E 47 contributor. E 12.000 file cambiati. E 847.000 righe aggiunte. E 847.000 righe rimosse. E il codice è... diverso. Non migliore. Non peggiore. Diverso.

Il PM chiede ancora: "Quando finisce il refactor?"

Il TL risponde ancora: "Presto."

Il TL mente ancora. Perché la verità è: il refactor non finisce mai. Il refactor è un processo. Non un risultato. Il refactor è una filosofia. Non un task. Il refactor è una religione. E noi siamo i suoi fedeli. Che pregano. Che sperano. Che soffrono. E che non smettono. Mai. Perché il refactor è la speranza. La speranza che un giorno, forse, il codice sarà pulito. Bob sarà eliminato. E tutto avrà senso.

Ma quel giorno non arriva. Quel giorno non arriverà mai. Perché ogni refactor genera nuovo codice. E nuovo codice genera nuovi problemi. E nuovi problemi generano nuovi refactor. In un ciclo infinito. Come la vita. Come la morte. Come tutto.

---

## Il costo del refactor eterno

| Voce | Valore |
|------|--------|
| Sprint dedicati al refactor | 847 |
| Anni di refactor | 3 |
| File refactorati | 847 |
| File ancora da refactorare | 847 |
| Commit nel branch refactor | 847 |
| Righe aggiunte | 847.000 |
| Righe rimosse | 847.000 |
| Bug introdotti dal refactor | 47 |
| Bug fixati dal refactor | 12 |
| JN traumatizzati | 8 |
| Bob ancora presente nel codice | Sì (47 riferimenti) |
| Valore del refactor | Incalcolabile (negativo?) |

**Morale**: Il refactor è una bugia. Una bugia necessaria. Una bugia che ci permette di sperare. Di credere che le cose possono migliorare. Che il passato può essere corretto. Che Bob può essere sconfitto. Ma è una bugia. Il refactor non finisce mai. Il codice non diventa perfetto. Bob non viene eliminato. E noi continuiamo. A refactorare. A sperare. A mentire. A noi stessi. E agli altri. Perché la speranza è l'unica cosa che ci resta. Anche se è una bugia. Anche se è una bugia gentile. Una bugia necessaria. Una bugia che ci permette di andare avanti. Senza impazzire. Senza arrenderci. Senza piangere. Troppo.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](40-il-meeting-che-poteva-essere-una-email.md) | [Prossima](42-il-microservizio-che-e-diventato-un-monolite.md)]**
