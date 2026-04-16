# La API Key Nel Repo Pubblico

**Data**: 30/05/2026

**[Home](../index.md) | [Precedente](66-la-migration-senza-where.md)]**

---

C'è una verità nel mondo delle credenziali. Una verità sacra. Una verità ignorata da chiunque abbia mai detto "è solo una key di test, tanto non funziona". Quella verità è: **"Una API key in un repository pubblico è come una chiave sotto lo zerbino. Tutti possono vederla. Tutti possono prenderla. E tutti possono entrare. E quando entrano, non rubano solo. Consumano. Consumano il tuo budget. Consumano la tua quota. Consumano la tua dignità"**. Ma c'è una verità ancora più sacra. Quella verità è: **"I bot scansionano GitHub 24/7. Non dormono. Non mangiano. Non perdonano. E quando trovano una key, la usano. In 3 minuti. E in 3 minuti, il tuo account AWS ha generato €47.000 di costi. E tu non lo sai. Non ancora"**. E questa è la storia di chi ha committato la key. Di chi ha pushato. Di chi ha guardato il repo diventare pubblico. E la key diventare... pubblica. Troppo pubblica. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo integrare il servizio di traduzione.

**ME**: Traduzione?

**PM**: Sì. Il cliente vuole il sito multilingua.

**ME**: E quante lingue?

**PM**: 12.

**ME**: 12?

**PM**: Sì. Inglese, francese, tedesco, spagnolo, italiano, portoghese, olandese, polacco, russo, cinese, giapponese, coreano.

**ME**: E come?

**PM**: Con un'API.

**ME**: Quale API?

**PM**: Quella che costa meno.

**ME**: E quanto tempo ho?

**PM**: Entro domani.

**ME**: Domani?

**PM**: Sì. Il cliente vuole la demo mercoledì.

**ME**: E oggi è lunedì.

**PM**: Sì.

**ME**: E ho un giorno.

**PM**: Sì.

**ME**: Per integrare 12 lingue.

**PM**: Sì.

**ME**: Con un'API che non ho mai usato.

**PM**: Sì.

**ME**: ...

**PM**: Puoi farlo?

**ME**: Posso provarci.

Il PM mi ha guardato. Io ho guardato il nulla. Il nulla che era la mia sanità mentale. Il nulla che era la mia attenzione alla sicurezza. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - L'Integrazione**

Il martedì, ho integrato. Ho integrato l'API. Ho integrato... la condanna.

**ME**: Ok. Ho creato l'account.

**TL**: Quale account?

**ME**: L'account del servizio di traduzione.

**TL**: E la key?

**ME**: La key è nel file .env.

**TL**: E il file .env?

**ME**: È nel .gitignore.

**TL**: Sei sicuro?

**ME**: Sì. L'ho aggiunto.

**TL**: E il file di configurazione?

**ME**: Quale file?

**TL**: Quello che contiene la key.

**ME**: Ah. Quello.

**TL**: Sì. Quello.

**ME**: È in config.js.

**TL**: E config.js è nel .gitignore?

**ME**: No.

**TL**: No?

**ME**: No. Perché... non ci ho pensato.

**TL**: E quindi?

**ME**: E quindi la key è in config.js.

**TL**: E config.js è committato?

**ME**: Sì.

**TL**: E il repo è pubblico?

**ME**: Sì. È su GitHub.

**TL**: GitHub pubblico?

**ME**: Sì. Il cliente vuole vedere il codice.

**TL**: E la key è nel repo pubblico?

**ME**: Sì. Ma è una key di test.

**TL**: Di test?

**ME**: Sì. Non ha permessi.

**TL**: E sei sicuro?

**ME**: Sì. L'ho creata come test.

**TL**: E il provider sa che è test?

**ME**: Il provider?

**TL**: Sì. Il servizio di traduzione.

**ME**: Non lo so. Non ho letto i termini.

**TL**: E se la key ha permessi di produzione?

**ME**: Non li ha. È test.

**TL**: E se ti sbagli?

**ME**: Non mi sbaglio.

Il TL mi ha guardato. Io guardavo il codice. Il codice guardava me. E io sapevo. Sapevo che era sbagliato. Sapevo che la key non doveva essere lì. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Mercoledì - La Demo**

Il mercoledì, la demo. Ho mostrato la demo. Ho mostrato... il disastro.

**PM**: Perfetto! La traduzione funziona!

**ME**: Sì. Funziona.

**PM**: E quante lingue?

**ME**: 12.

**PM**: E il costo?

**ME**: È un trial gratuito.

**PM**: Gratis?

**ME**: Sì. Per 30 giorni.

**PM**: E dopo?

**ME**: Dopo paghiamo.

**PM**: E quanto?

**ME**: Non lo so. Dipende dall'uso.

**PM**: E il cliente?

**ME**: Il cliente è contento.

**PM**: Ottimo! Pusha tutto!

**ME**: Tutto?

**PM**: Sì. Tutto. Il cliente vuole vedere il repo.

**ME**: Ma la key...

**PM**: Che key?

**ME**: La API key.

**PM**: E allora?

**ME**: È nel repo.

**PM**: E allora?

**ME**: È pubblica.

**PM**: E allora?

**ME**: Chiunque può usarla.

**PM**: E chi la vuole?

**ME**: I bot.

**PM**: I bot?

**ME**: Sì. I bot scansionano GitHub.

**PM**: E cosa fanno?

**ME**: Usano le key.

**PM**: E allora?

**ME**: E allora consumano il nostro account.

**PM**: Ma è test!

**ME**: Sì. Ma...

**PM**: E allora non succede nulla!

**ME**: ...

**PM**: Pusha!

Il PM mi ha guardato. Io guardavo il terminale. Il terminale mostrava: "git push origin main". E io ho premuto invio. E il codice è andato. E la key è andata. E tutto era... pubblico. Troppo pubblico. Amen.

---

**Mercoledì - 14:23**

È arrivato. Quello che il TL temeva. Quello che io ignoravo. Quello che... era inevitabile.

**SLACK**: @here Il nostro account ha superato il limite.

**SLACK**: @channel API quota esaurita.

**SLACK**: @everyone Abbiamo un problema con le traduzioni.

**ME**: ...

**TL**: Te l'avevo detto.

**ME**: Ma cosa è successo?

**TL**: La key.

**ME**: La key?

**TL**: Sì. La key del cazzo che hai committato.

**ME**: E perché?

**TL**: Perché qualcuno l'ha usata.

**ME**: Chi?

**TL**: Non lo so. Guardiamo i log.

Abbiamo guardato i log. I log mostravano:
- 14:05 - API call: translate "Hello" → "Bonjour"
- 14:05 - API call: translate "Hello" → "Hola"
- 14:05 - API call: translate "Hello" → "Hallo"
- 14:06 - API call: translate "test" → "test"
- 14:06 - API call: translate "test" → "test"
- 14:06 - API call: translate "test" → "test"
- ... 847.000 chiamate in 17 minuti ...

E lì, in quei log, c'era la verità. La verità che faceva male. La verità che... qualcuno stava usando la nostra key. Per tradurre. Tutto. In tutte le lingue. Contemporaneamente. E il nostro account stava bruciando. Amen.

---

**Mercoledì - 15:00**

Ho chiamato il provider. Il provider non era contento.

**PROVIDER**: Pronto?

**ME**: Sì, abbiamo un problema.

**PROVIDER**: Quale problema?

**ME**: La nostra API key è stata usata da qualcun altro.

**PROVIDER**: Usata?

**ME**: Sì. 847.000 chiamate in 17 minuti.

**PROVIDER**: E la key era... pubblica?

**ME**: Sì. Era in un repo GitHub.

**PROVIDER**: GitHub pubblico?

**ME**: Sì.

**PROVIDER**: E non l'avete rotata?

**ME**: Rotata?

**PROVIDER**: Sì. Revocata. Generata nuova.

**ME**: Non sapevo che fosse successo.

**PROVIDER**: E adesso?

**ME**: Adesso voglio sapere quanto costa.

**PROVIDER**: 847.000 chiamate al tariffario standard...

**ME**: Sì?

**PROVIDER**: €47.382.

**ME**: €47.000?

**PROVIDER**: Sì. Più IVA.

**ME**: E c'è un modo per non pagare?

**PROVIDER**: Un modo?

**ME**: Sì. Perché non siamo stati noi.

**PROVIDER**: E chi è stato?

**ME**: Non lo so. I bot.

**PROVIDER**: I bot?

**ME**: Sì. I bot che scansionano GitHub.

**PROVIDER**: E la key era pubblica?

**ME**: Sì.

**PROVIDER**: E non l'avete protetta?

**ME**: No.

**PROVIDER**: E quindi?

**ME**: E quindi è colpa nostra?

**PROVIDER**: Sì. È colpa vostra.

Il provider ha riattaccato. Io ho guardato il TL. Il TL guardava me. Io guardavo il terminale. Il terminale mostrava: "Current balance: €47.382". E quei soldi erano persi. Persi per una key. Una key che non doveva essere lì. Ma c'era. E ora costava. €47.000. Amen.

---

**Giovedì - La Scoperta**

Il giovedì, abbiamo scoperto. Chi era stato. E come.

**TL**: Ho guardato i log del provider.

**ME**: E?

**TL**: E ho trovato l'IP.

**ME**: L'IP?

**TL**: Sì. L'IP di chi ha usato la key.

**ME**: E chi è?

**TL**: Non lo so. Ma è in Russia.

**ME**: Russia?

**TL**: Sì. E ha fatto 847.000 chiamate.

**ME**: E cosa traduceva?

**TL**: Non lo so. Ma sembrano... test.

**ME**: Test?

**TL**: Sì. "test" → "test". 500.000 volte.

**ME**: E le altre?

**TL**: Le altre sono... spam.

**ME**: Spam?

**TL**: Sì. Messaggi pubblicitari. In 12 lingue.

**ME**: E quindi?

**TL**: E quindi qualcuno ha trovato la key. E l'ha usata per mandare spam. In 12 lingue. A 12 milioni di persone. Con il nostro account.

**ME**: E noi?

**TL**: Noi paghiamo €47.000.

**ME**: E non c'è modo?

**TL**: Non c'è modo. La key era pubblica. Era nostra. È colpa nostra.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era il nostro budget. Il nulla... che erano €47.000. Persi. Per una key. Una key che non doveva essere lì. Amen.

---

**Venerdì - Il CTO**

È arrivato il CTO. Il CTO non era contento. Il CTO non era mai contento. Ma questa volta era peggio.

**CTO**: Quindi mi stai dicendo che hai committato una API key in un repo pubblico?

**ME**: Sì.

**CTO**: E la key aveva permessi di produzione?

**ME**: Non lo sapevo.

**CTO**: Non lo sapevi?

**ME**: No. Credevo fosse test.

**CTO**: E non hai controllato?

**ME**: Non ho avuto tempo.

**CTO**: Non hai avuto tempo?

**ME**: Il PM chiamava.

**CTO**: E il PM sapeva?

**ME**: Il PM non sa cosa è una API key.

**CTO**: E quindi?

**ME**: E quindi ho committato la key. E qualcuno l'ha usata. E abbiamo perso €47.000.

**CTO**: €47.000?

**ME**: Sì.

**CTO**: E il provider?

**ME**: Il provider dice che è colpa nostra.

**CTO**: E hanno ragione.

**ME**: ...

**CTO**: E sai perché?

**ME**: Perché la key era pubblica.

**CTO**: Sì. E perché?

**ME**: Perché l'ho committata.

**CTO**: Sì. E perché?

**ME**: Perché non ho usato le environment variables.

**CTO**: Sì. E perché?

**ME**: Perché non ci ho pensato.

**CTO**: E adesso?

**ME**: Adesso pago.

**CTO**: No. Adesso impari. E se non impari, la prossima volta paghi con la carriera.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era il nostro budget. Il nulla... che erano €47.000. Persi. Per una key. Una key che non doveva essere lì. Ma c'era. E ora costava. Non solo soldi. Ma anche dignità. Amen.

---

**Sabato - La Lezione**

Il sabato, abbiamo imparato. O quasi.

**ME**: TL, sai qual è la lezione?

**TL**: Quale?

**ME**: Le API key non vanno mai committate.

**TL**: Sì. Lo so.

**ME**: E sai qual è l'altra lezione?

**TL**: Quale?

**ME**: Le environment variables esistono per un motivo.

**TL**: Sì. Lo so anche quello.

**ME**: E sai qual è la lezione più importante?

**TL**: Quale?

**ME**: Che i bot non dormono. I bot non perdonano. E i bot trovano tutto. Tutto quello che metti in un repo pubblico. E quando trovano una key, la usano. Subito. In 3 minuti. E in 3 minuti, il tuo account è bruciato. E i tuoi soldi sono andati. E la tua carriera è a rischio. E tutto perché hai pensato: "Tanto è solo una key di test". Ma le key di test non esistono. Esistono solo key. E le key vanno protette. Sempre. Anche quelle di test. Perché i bot non distinguono. I bot usano. E quando usano, consumano. €47.000. In 17 minuti. E tu non puoi fare nulla. Perché la key era pubblica. E il pubblico non perdona. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #KEY-001: La API Key Nel Repo Pubblico

**Data incident**: Mercoledì 28 maggio 2026, 14:05
**Autore commit**: ME
**Repository**: GitHub pubblico
**File coinvolto**: config.js
**API key esposta**: Sì
**Key in .env**: No
**Key in .gitignore**: No
**Tempo tra push e primo uso**: 3 minuti
**Chiamate API totali**: 847.293
**Durata utilizzo fraudolento**: 17 minuti
**Costo totale**: €47.382
**IP responsabile**: Russia (sconosciuto)
**Tipo di utilizzo**: Test + Spam multilingua
**Messaggi spam inviati**: 12 milioni (stimato)
**Lingue coinvolte**: 12
**Recupero possibile**: NO
**Reazione CTO**: "La prossima volta paghi con la carriera."
**Reazione CEO**: "€47.000 per una key?"
**Reazione PM**: "Ma la demo ha funzionato!"
**Lezione imparata**: MAI committare API key. MAI.
**Probabilità che succeda di nuovo**: 91% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. Le API key vanno SEMPRE in environment variables.
2. I file di configurazione con credenziali vanno nel .gitignore.
3. I repo pubblici non devono MAI contenere segreti.
4. Le key di test non esistono. Esistono solo key.
5. I bot scansionano GitHub 24/7. Non dormono.
6. Ruotare le key regolarmente. E dopo ogni sospetto.
7. Il PM non sa cosa è una API key. Non chiedergli.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che una key può costare €47.000. E la tua dignità. E forse la tua carriera. Ma l'hai imparato."

**ME**: Sì. E la lezione più importante è questa: le credenziali sono sacre. E quando le esponi, le perdi. E quando le perdi, perdi tutto. Soldi. Reputazione. Carriera. E tutto perché hai pensato: "Tanto è solo una key". Ma le key non sono "solo key". Le key sono accesso. E l'accesso va protetto. Sempre. Con environment variables. Con secret management. Con attenzione. Perché quando non lo fai, succede questo. €47.000 persi. 847.000 chiamate fraudolente. E un account bruciato. E tutto perché una key era in un file. Un file che era in un repo. Un repo che era pubblico. E il pubblico non perdona. Amen.

---

## Il costo della API key esposta

| Voce | Valore |
|------|--------|
| Repository | GitHub pubblico |
| File con key | config.js |
| Key in .env | NO |
| Key in .gitignore | NO |
| Tempo primo uso | 3 minuti |
| Chiamate fraudolente | 847.293 |
| Durata attacco | 17 minuti |
| Costo totale | €47.382 |
| IP responsabile | Russia |
| Tipo utilizzo | Test + Spam |
| Messaggi spam | 12 milioni |
| Recupero | NO |
| Reazione CTO | "La prossima volta paghi con la carriera." |
| Reazione CEO | "€47.000 per una key?" |
| Reazione PM | "Ma la demo ha funzionato!" |
| Lezione imparata | MAI committare key |
| **Totale** | **€47.382 + 1 account bruciato + 12 milioni di spam inviati** |

**Morale**: Le API key non vanno mai committate. Mai. Nemmeno in repo privati. Nemmeno "per test". Nemmeno "tanto non funziona". Perché i bot non distinguono. I bot trovano. I bot usano. E quando usano, consumano. €47.000 in 17 minuti. E tu non puoi fare nulla. Perché la key era lì. Nel codice. Nel repo. Nel pubblico. E il pubblico non perdona. Il pubblico consuma. E consuma tutto. Soldi. Reputazione. Carriera. E tutto perché una key era in un file. Un file che non doveva essere lì. Ma c'era. E ora costava. €47.000. E la tua dignità. E forse la tua carriera. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](66-la-migration-senza-where.md)]**
