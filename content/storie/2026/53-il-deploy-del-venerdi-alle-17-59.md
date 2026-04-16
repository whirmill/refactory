# Il Deploy Del Venerdì Alle 17:59

**Data**: 21/02/2027

**[Home](../index.md) | [Precedente](52-la-riunione-che-poteva-essere-una-email.md) | [Prossima](54-il-refactor-che-ha-rotto-tutto.md)]**

---

C'è una regola nel mondo dello sviluppo software. Una regola sacra. Una regola inviolabile. Una regola che ogni developer conosce, rispetta, e... ignora. Quella regola è: **"Mai fare deploy di venerdì"**. Ma c'è una regola ancora più sacra. Ancora più inviolabile. Ancora più ignorata. Quella regola è: **"Mai fare deploy di venerdì alle 17:59"**. E questa è la storia di chi l'ha fatto. Di chi l'ha pagato. Di chi ha imparato. O forse no. Perché le lezioni, nel mondo dello sviluppo, si imparano. Si dimenticano. E si reimparano. Ogni venerdì. Alle 17:59. Per sempre.

![](../../img/deploy.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM è arrivato con la sua faccia da "ho bisogno di una cosa". La faccia che ogni developer riconosce. La faccia che significa problemi. La faccia che significa... lavoro.

**PM**: Abbiamo bisogno di una feature.

**TL**: Quale feature?

**PM**: Un pulsante. Un pulsante che fa una cosa.

**TL**: Quale cosa?

**PM**: Non lo so ancora. Ma deve essere pronto per venerdì.

**TL**: Venerdì?

**PM**: Sì. Venerdì sera. Per il lancio.

**TL**: Quale lancio?

**PM**: Il lancio della campagna marketing. Quella che abbiamo pianificato da tre mesi.

**TL**: E ce lo dici ora?

**PM**: Sì. Me n'ero dimenticato.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il PM. E tutti abbiamo capito. Era una Richiesta Impossibile. Una richiesta che non poteva essere soddisfatta. Una richiesta che... sarebbe stata soddisfatta. Perché le richieste impossibili sono sempre possibili. Se hai abbastanza caffè. E abbastanza disperazione. E abbastanza venerdì.

---

**Martedì - Lo Sviluppo**

Il martedì, abbiamo iniziato. Il JN ha scritto il codice. Il TL ha fatto review. Io ho integrato. E tutto è andato... bene. O quasi.

**JN**: Ho finito il pulsante.

**TL**: E cosa fa?

**JN**: Non lo so. Il PM non l'ha specificato.

**TL**: E allora?

**JN**: Allora ho fatto un pulsante che manda un'email.

**TL**: Un'email?

**JN**: Sì. Quando clicchi, manda un'email al marketing.

**TL**: E il marketing?

**JN**: Il marketing non lo sa ancora.

**TL**: E se si lamentano?

**JN**: Allora cambiamo il pulsante.

**TL**: E se non funziona?

**JN**: Allora lo fixiamo.

**TL**: E se rompe qualcosa?

**JN**: Allora... non lo so. Non ci ho pensato.

Il JN ha guardato il TL. Il TL ha guardato me. Io ho guardato il codice. Il codice era semplice. Il codice era pulito. Il codice... funzionava. In locale. In staging. In tutti gli ambienti tranne quello che contava. Produzione. Dove il codice va a morire. O a vivere per sempre. O entrambi.

---

**Mercoledì - I Test**

Il mercoledì, abbiamo testato. Abbiamo testato tutto. Abbiamo testato ogni caso. Abbiamo testato ogni scenario. Abbiamo testato... quasi tutto.

**TL**: I test passano?

**JN**: Sì. Tutti.

**TL**: Anche i test di integrazione?

**JN**: Sì.

**TL**: Anche i test end-to-end?

**JN**: Sì.

**TL**: Anche i test di carico?

**JN**: Non li abbiamo fatti.

**TL**: E perché?

**JN**: Perché non abbiamo tempo.

**TL**: E se il pulsante viene cliccato da 10.000 persone?

**JN**: Allora... non lo so. Non ci ho pensato.

**TL**: E il database?

**JN**: Cosa?

**TL**: Il database regge?

**JN**: Non lo so. Non l'ho testato.

**TL**: E le email?

**JN**: Cosa?

**TL**: Se 10.000 persone cliccano, mandiamo 10.000 email?

**JN**: Sì. Credo.

**TL**: E il server di posta?

**JN**: Non lo so. Non l'ho testato.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il computer. E tutti abbiamo capito. Non avevamo testato tutto. Non avevamo testato abbastanza. Non avevamo testato... la realtà. E la realtà, come sempre, avrebbe testato noi.

---

**Giovedì - L'Approvazione**

Il giovedì, il PM ha approvato. Il PM ha detto "ok". Il PM ha detto "va bene". Il PM ha detto "deployiamo domani".

**PM**: Ho visto il pulsante. Mi piace.

**TL**: Bene.

**PM**: Ma vorrei che fosse blu.

**TL**: Blu?

**PM**: Sì. Blu. Il marketing dice che il blu converte di più.

**TL**: E quando l'hai saputo?

**PM**: Ora. Me l'hanno detto ora.

**TL**: E domani è venerdì.

**PM**: Sì.

**TL**: E il deploy è venerdì sera.

**PM**: Sì. Alle 18:00. Per il lancio della campagna.

**TL**: E se c'è un problema?

**PM**: Non ci saranno problemi. Avete testato tutto.

**TL**: Quasi tutto.

**PM**: Quasi?

**TL**: Sì. Non abbiamo testato il carico. E le email. E il database.

**PM**: E funzionerà?

**TL**: Probabilmente.

**PM: Probabilmente?

**TL**: Sì. Probabilmente.

**PM**: E se non funziona?

**TL**: Allora lo fixiamo.

**PM**: Quando?

**TL**: Lunedì.

**PM**: LUNEDÌ?

**TL**: Sì. Perché venerdì sera alle 18:00 inizia il weekend. E il weekend è sacro.

**PM**: Ma la campagna!

**TL**: La campagna può aspettare.

**PM**: No. La campagna non può aspettare. La campagna è domani. Alle 18:00. E il pulsante deve esserci.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il PM. E tutti abbiamo capito. Il deploy sarebbe stato venerdì. Alle 17:59. Un minuto prima del lancio. Un minuto prima del disastro. Un minuto prima della fine del mondo. O del weekend. Che per un developer, è la stessa cosa.

---

**Venerdì - Il Deploy**

Venerdì. 17:58. Il PM era in piedi dietro di me. Il CTO era in call. Il JN era in panico. E io stavo per premere il pulsante. Non il pulsante del codice. Il pulsante del deploy. Quello che cambia tutto. Quello che rompe tutto. Quello che... non si preme di venerdì.

**PM**: Sei pronto?

**ME**: No.

**PM**: Bene. Allora andiamo.

**ME**: Aspetta. Non ho detto che sono pronto. Ho detto che NON sono pronto.

**PM**: È lo stesso. Dobbiamo lanciare.

**ME**: Ma sono le 17:58!

**PM**: Lo so. E alle 18:00 c'è la campagna.

**ME**: E se rompe qualcosa?

**PM**: Non romperà nulla.

**ME: E se invece sì?

**PM**: Allora lo fixi.

**ME**: Quando?

**PM**: Ora.

**ME: ORA?

**PM**: Sì. Ora. Subito. Immediatamente.

**ME**: Ma è venerdì!

**PM**: E allora?

**ME**: E allora non si fa deploy di venerdì!

**PM**: Chi l'ha detto?

**ME**: Tutti. Il mondo intero. La storia del software. La civiltà.

**PM**: Beh, oggi facciamo un'eccezione.

Il PM ha guardato me. Io ho guardato il TL. Il TL ha guardato l'orologio. Erano le 17:59. E il TL ha detto: "Fallo. E che Dio ci aiuti."

Ho premuto il pulsante. Il deploy è partito. La build è iniziata. E io ho pregato. Non sono religioso. Ma in quel momento, ho pregato. Tutti gli dei. Di tutte le religioni. Di tutti i tempi. Perché quando premi deploy di venerdì alle 17:59, hai bisogno di tutto l'aiuto possibile.

---

**Venerdì - 18:01**

La build è finita. Il deploy è andato. Il pulsante era online. E tutto sembrava... funzionare.

**PM**: Visto? Non è successo nulla.

**ME**: Ancora.

**PM**: Come?

**ME**: Non è successo nulla. Ancora.

**PM**: E cosa dovrebbe succedere?

**ME**: Non lo so. Ma qualcosa succederà. Succede sempre.

**PM**: Sei pessimista.

**ME**: Sono realista. Sono un developer. È la stessa cosa.

Il PM se n'è andato. Il TL se n'è andato. Il JN se n'è andato. E io sono rimasto. A guardare i log. A guardare le metriche. A guardare... il nulla. Perché per ora, tutto funzionava. Ma "per ora" è il momento più pericoloso. "Per ora" è il momento prima del disastro. "Per ora" è il momento in cui ti rilassi. E quando ti rilassi, il codice ti attacca. Sempre. Senza pietà. Senza avviso. Senza... speranza.

---

**Venerdì - 18:47**

Erano passati 47 minuti. Il pulsante era stato cliccato 3.847 volte. Le email erano state mandate. Il database reggeva. E tutto funzionava. Tutto funzionava. Tutto... funzionava?

**ME**: JN, controlla i log.

**JN**: Perché?

**ME**: Perché tutto funziona.

**JN**: E questo è un problema?

**ME**: Sì. Quando tutto funziona, c'è qualcosa che non va.

**JN**: Sei paranoico.

**ME**: Sono un developer. È la stessa cosa.

Il JN ha controllato i log. I log erano puliti. Il JN ha controllato le metriche. Le metriche erano normali. Il JN ha controllato il database. Il database era... strano.

**JN**: Ehm.

**ME**: Cosa?

**JN**: Il database.

**ME**: Cosa ha il database?

**JN**: Sta crescendo.

**ME**: Crescendo?

**JN**: Sì. Molto velocemente.

**ME: Quanto velocemente?

**JN**: 3.847 righe al minuto.

**ME**: E perché?

**JN**: Non lo so. Ma sta crescendo.

Ho guardato il database. Il database stava crescendo. Ogni clic sul pulsante creava una riga. E ogni riga creava un'altra riga. E ogni altra riga creava... un'altra riga. Era un loop. Un loop nel database. Un loop che non finiva. Un loop che... stava per ucciderci.

---

**Venerdì - 19:23**

Il database era pieno al 78%. Il database stava morendo. Il database stava... uccidendo tutto.

**CTO**: COSA STA SUCCEDENDO?

**ME**: Il pulsante.

**CTO**: IL PULSANTE?

**ME**: Sì. Il pulsante ha un bug. Ogni clic crea un loop nel database.

**CTO**: E LO FISSI?

**ME**: Sto provando.

**CTO**: E IL PM?

**ME**: Il PM è andato via alle 18:00.

**CTO**: E IL TL?

**ME**: Il TL è andato via alle 18:15.

**CTO**: E CHI C'È?

**ME**: Io. E il JN.

**CTO**: E POTETE FISSARLO?

**ME**: Forse.

**CTO**: FORSE?

**ME**: Sì. Forse. Se il database non muore prima.

**CTO**: E SE MUORE?

**ME**: Allora perdiamo tutto.

**CTO**: TUTTO?

**ME**: Tutto. I dati. Gli utenti. Le email. Il lavoro di tre anni. E il mio weekend.

Il CTO ha guardato me. Io ho guardato il JN. Il JN guardava il database. Il database era al 89%. E il JN ha detto: "Ho trovato il bug."

---

**Venerdì - 19:47**

Il JN aveva trovato il bug. Il JN aveva fixato il bug. Il JN aveva... salvato il mondo. O quasi.

**JN**: Era un trigger.

**ME**: Un trigger?

**JN**: Sì. Un trigger nel database. Che creava una riga per ogni riga. All'infinito.

**ME**: E chi l'ha creato?

**JN**: Non lo so. Era lì da anni.

**ME**: Anni?

**JN**: Sì. Dal 2019. Ma non era mai stato attivato.

**ME**: E perché ora?

**JN**: Perché il pulsante scrive in quella tabella. E il trigger si attiva. E il loop parte.

**ME**: E come l'hai trovato?

**JN**: Ho cercato "trigger" nel database. E l'ho trovato.

**ME**: E l'hai disattivato?

**JN**: Sì. E ho cancellato le righe duplicate.

**ME**: E il database?

**JN**: Il database è al 45%. E sta scendendo.

Il JN mi ha guardato. Io ho guardato il JN. E ho capito. Il JN aveva salvato tutto. Il JN aveva fixato il bug. Il JN era... un eroe. Un eroe che non voleva esserlo. Un eroe che voleva solo andare a casa. Come tutti noi. Come sempre. Come il venerdì.

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 12 ore. Ho dormito come non dormivo da mesi. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Mai fare deploy di venerdì.

**JN**: Sì. L'avevo capito.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: I trigger sono pericolosi.

**JN**: Sì. L'avevo capito anche quello.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che a volte, il JN salva il ME. E il ME è grato. E il ME promette di non fare mai più deploy di venerdì. Ma il ME mentirà. Perché il PM chiederà. E il CTO approverà. E il ME farà il deploy. Di nuovo. Venerdì. Alle 17:59. Per sempre. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri ME che avrebbero fatto lo stesso errore.

```markdown
## Incident #VENERDÌ-17:59: Deploy del venerdì alle 17:59

**Data**: Venerdì 21 febbraio 2027
**Ora deploy**: 17:59
**Ora disastro**: 18:47
**Ora fix**: 19:47
**Durata incident**: 1 ora
**Database quasi morto**: Sì (89%)
**Dati persi**: 0 (grazie JN)
**Caffè bevuti**: 7
**Weekend rovinato**: Parzialmente
**Lezione imparata**: Mai fare deploy di venerdì
**Probabilità di rifarlo**: 100%

**Causa**: Trigger del 2019 mai disattivato
**Trigger creato da**: Sconosciuto (probabilmente Marco)
**Scopo originale del trigger**: Sconosciuto
**Perché era ancora lì**: Perché funzionava. Finché non ha funzionato.

**Regole per il futuro**:
1. Mai deploy di venerdì
2. Mai deploy alle 17:59
3. Controllare sempre i trigger
4. Ascoltare il JN
5. Il weekend è sacro
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che i trigger sono pericolosi. E i deploy di venerdì anche. E che a volte, il junior salva il senior."

**ME**: Sì. E il senior è grato. E il senior promette di non farlo più. Ma il senior mentirà. Perché il PM chiederà. E il CTO approverà. E il senior farà il deploy. Di nuovo. Venerdì. Alle 17:59. Per sempre. Amen.

---

## Il costo del deploy del venerdì alle 17:59

| Voce | Valore |
|------|--------|
| Ora del deploy | 17:59 |
| Giorno del deploy | Venerdì |
| Minuti prima del weekend | 1 |
| Clic sul pulsante | 3.847 |
| Email mandate | 3.847 |
| Righe create nel database | 284.729 |
| Database quasi morto | 89% |
| Tempo per trovare il bug | 47 minuti |
| Tempo per fixare il bug | 24 minuti |
| JN che ha salvato tutto | 1 |
| Weekend rovinato | Parzialmente |
| Lezione imparata | Mai venerdì |
| Probabilità di rifarlo | 100% |
| **Totale** | **Disastro evitato per un soffio** |

**Morale**: Mai fare deploy di venerdì. Mai fare deploy alle 17:59. Mai fare deploy quando manca un minuto al weekend. Ma lo farai. Perché il PM chiederà. E il CTO approverà. E tu premerai il pulsante. E pregherai. E qualcosa romperà. E il JN ti salverà. O no. E il weekend sarà rovinato. O no. E la lezione sarà imparata. O no. Perché questa è la vita del developer. Deploy di venerdì. Bug nel weekend. Fix di lunedì. E ricominciare. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](52-la-riunione-che-poteva-essere-una-email.md)]**
