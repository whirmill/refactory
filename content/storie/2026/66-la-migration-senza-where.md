# La Migration Senza WHERE

**Data**: 23/05/2026

**[Home](../index.md) | [Precedente](65-la-cache-che-non-venne-invalidata.md)]**

---

C'è una verità nel mondo delle query SQL. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `UPDATE` o `DELETE` senza pensare. Quella verità è: **"Una query senza WHERE è come una pistola senza sicura. Puoi premere il grilletto. E quando lo fai, spara. A tutti. Senza distinzione"**. Ma c'è una verità ancora più sacra. Quella verità è: **"Le migration vanno testate. Sempre. Anche se 'è solo una piccola modifica'. Anche se 'il PM ha fretta'. Anche se 'tanto è su staging'. Perché staging un giorno diventa production. E quando succede, quella query senza WHERE cancella tutto. Tutto. 847.000 record. In 0.3 secondi. Amen"**. E questa è la storia di chi ha scritto quella migration. Di chi l'ha eseguita. Di chi ha guardato 847.000 utenti sparire. In un attimo. Senza backup. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo rimuovere gli utenti inattivi.

**ME**: Inattivi?

**PM**: Sì. Quelli che non hanno fatto login da più di 2 anni.

**ME**: E perché?

**PM**: Per il GDPR. E per le metriche.

**ME**: Le metriche?

**PM**: Sì. Il cliente vuole vedere solo gli utenti attivi.

**ME**: E quanti sono gli inattivi?

**PM**: Non lo so. Forse 10.000?

**ME**: E devo cancellarli?

**PM**: Sì. Tutti.

**ME**: E quanto tempo ho?

**PM**: Entro venerdì.

**ME**: Venerdì?

**PM**: Sì. Il cliente vuole la pulizia per il report mensile.

**ME**: E oggi è lunedì.

**PM**: Sì.

**ME**: E ho 5 giorni.

**PM**: Sì.

**ME**: Per scrivere una migration che cancella 10.000 utenti.

**PM**: Sì.

**ME**: Senza sbagliare.

**PM**: Sì.

**ME**: ...

**PM**: Puoi farlo?

**ME**: Posso provarci.

Il PM mi ha guardato. Io ho guardato il nulla. Il nulla che era la mia sanità mentale. Il nulla che era la mia carriera. Il nulla... che era la migration che stavo per scrivere. Amen.

---

**Martedì - La Migration**

Il martedì, ho scritto. Ho scritto la migration. Ho scritto... la condanna.

**ME**: Ok. Ho scritto la migration.

**TL**: Fammi vedere.

**ME**: 
```sql
DELETE FROM users 
WHERE last_login < NOW() - INTERVAL '2 years';
```

**TL**: E questa?

**ME**: Questa è la migration.

**TL**: E funziona?

**ME**: Sì. L'ho testata.

**TL**: E dove?

**ME**: In locale.

**TL**: E con quanti utenti?

**ME**: 50.

**TL**: 50?

**ME**: Sì. Il mio database locale ha 50 utenti di test.

**TL**: E in production quanti utenti ci sono?

**ME**: Non lo so. Forse 100.000?

**TL**: E hai testato con 100.000 utenti?

**ME**: No.

**TL**: E perché?

**ME**: Perché non ho 100.000 utenti in locale.

**TL**: E non hai pensato di fare un backup?

**ME**: Un backup?

**TL**: Sì. Prima di cancellare.

**ME**: Ma è una migration. Le migration non fanno backup.

**TL**: Le migration che cancellano dati fanno backup. SEMPRE.

**ME**: E come?

**TL**: Crei una tabella di backup. Copi i dati. Poi cancelli.

**ME**: E se il PM vuole che sia fatto per venerdì?

**TL**: E se cancelli 100.000 utenti sbagliati?

**ME**: Non succederà.

**TL**: Non succederà?

**ME**: No. Ho la WHERE.

**TL**: E se la WHERE è sbagliata?

**ME**: Non è sbagliata.

**TL**: E se qualcuno la toglie?

**ME**: Nessuno la toglie.

**TL**: E se il JN la toglie?

**ME**: Il JN non tocca le migration.

**TL**: Il JN tocca tutto.

Il TL mi ha guardato. Io ho guardato la migration. La migration guardava me. E io sapevo. Sapevo che era pericolosa. Sapevo che era sbagliata. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo spina dorsale. Amen.

---

**Mercoledì - La Review**

Il mercoledì, la CR. La Code Review. La... condanna.

**CR**: Ho guardato la migration.

**ME**: E?

**CR**: E manca il backup.

**ME**: Il backup?

**CR**: Sì. Prima di cancellare, dovresti fare un backup.

**ME**: Ma il TL ha detto che ci pensava lui.

**CR**: Il TL?

**ME**: Sì. Il TL ha detto che avrebbe aggiunto il backup.

**CR**: E l'ha fatto?

**ME**: Non lo so. Chiedi a lui.

**CR**: Il TL è in riunione.

**ME**: E quindi?

**CR**: E quindi apro la PR. E commento che manca il backup.

**ME**: E il PM?

**CR**: E il PM?

**ME**: Il PM vuole che sia fatto per venerdì.

**CR**: E se non c'è il backup?

**ME**: Allora... non c'è il backup.

**CR**: E se la migration cancella gli utenti sbagliati?

**ME**: Non succederà.

**CR: Non succederà?

**ME**: No. Ho la WHERE.

**CR**: E se la WHERE è sbagliata?

**ME**: Non è sbagliata.

**CR**: E se qualcuno la toglie durante il merge?

**ME**: Nessuno la toglie.

**CR**: E se succede?

**ME**: Allora... succede.

La CR ha guardato me. Io guardavo la PR. La PR aveva 2 commenti. Uno diceva: "Manca il backup". L'altro diceva: "Testare su staging prima di production". E io ho ignorato entrambi. Perché il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Giovedì - Lo Staging**

Il giovedì, staging. Ho deployato su staging. Ho deployato... il test.

**ME**: Ok. Deploy su staging.

**TL**: E la migration?

**ME**: È in coda.

**TL**: E il backup?

**ME**: Non c'è.

**TL**: Non c'è?

**ME**: No. Non ho avuto tempo.

**TL**: E se va male?

**ME**: Non va male. È staging.

**TL**: E se staging ha dati di production?

**ME**: Staging non ha dati di production.

**TL**: Sei sicuro?

**ME**: Sì. Staging ha dati di test.

**TL**: E chi l'ha configurato?

**ME**: Il JN.

**TL**: ...

**ME**: ...

**TL**: Il JN?

**ME**: Sì.

**TL**: E il JN sa che staging non deve avere dati di production?

**ME**: Gliel'ho detto.

**TL**: E ti ha ascoltato?

**ME**: Ha detto di sì.

**TL**: E tu ti fidi?

**ME**: ...

**TL**: ...

**ME**: No.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava: "Migration running...". E io aspettavo. Aspettavo che finisse. Aspettavo che... andasse tutto bene. E andò tutto bene. Su staging. Con 50 utenti. Ma production aveva 847.000 utenti. E io non lo sapevo. Non ancora. Amen.

---

**Venerdì - Il Production**

Il venerdì, production. Ho deployato su production. Ho deployato... il disastro.

**ME**: Ok. Deploy su production.

**TL**: E sei sicuro?

**ME**: Sì. Ha funzionato su staging.

**TL**: E il backup?

**ME**: Non c'è.

**TL**: Non c'è?

**ME**: No. Non ho avuto tempo.

**TL**: E se va male?

**ME**: Non va male.

**TL**: E se va male?

**ME**: Allora... lo sistemo.

**TL**: E come?

**ME**: Ripristino dal backup.

**TL**: Quale backup?

**ME**: ...

**TL**: ...

**ME**: Il backup che non c'è.

**TL**: Esatto.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava: "Deploy complete. Status: SUCCESS". E io ho sorriso. Perché il deploy era andato. E la migration era in coda. E tutto sembrava... perfetto. Ma il TL non sorrideva. Il TL sapeva. Il TL sapeva che qualcosa non andava. E io non sapevo. Non ancora. Amen.

---

**Venerdì - 14:47**

È arrivato. Quello che il TL temeva. Quello che io ignoravo. Quello che... era inevitabile.

**SLACK**: @here Non riesco a fare login.

**SLACK**: @channel Il mio account è sparito.

**SLACK**: @everyone TUTTI GLI UTENTI SONO SPARITI.

**ME**: ...

**TL**: Te l'avevo detto.

**ME**: Ma cosa è successo?

**TL**: La migration.

**ME**: La migration?

**TL**: Sì. La migration del cazzo che hai scritto.

**ME**: E perché?

**TL**: Perché qualcuno ha tolto la WHERE.

**ME**: Chi?

**TL**: Non lo so. Guardiamo il log.

Abbiamo guardato il log. Il log mostrava:
```
Migration 20260523001: DELETE FROM users;
Query executed in 0.3 seconds.
Rows affected: 847,293.
```

E lì, in quel log, c'era la verità. La verità che faceva male. La verità che... non aveva WHERE. Nessuna WHERE. Solo `DELETE FROM users;`. E 847.293 righe cancellate. In 0.3 secondi. Per sempre. Amen.

---

**Venerdì - 15:00**

Ho chiamato il DBA. Il DBA era in ferie. Ma questo era un'emergenza.

**DBA**: Pronto?

**ME**: DBA, abbiamo un problema.

**DBA**: Che problema?

**ME**: La migration ha cancellato tutti gli utenti.

**DBA**: Tutti?

**ME**: Sì. 847.000.

**DBA**: E il backup?

**ME**: Non c'è.

**DBA**: Non c'è?

**ME**: No.

**DBA**: ...

**ME**: DBA?

**DBA**: ...

**ME**: DBA, ci sei?

**DBA**: Sì. Sto elaborando.

**ME**: Elaborando cosa?

**DBA**: Il fatto che siete fottuti.

**ME**: E quindi?

**DBA**: E quindi non c'è modo di recuperare.

**ME**: Nessun modo?

**DBA**: Nessun modo. Senza backup, i dati sono persi. Per sempre.

**ME**: E gli utenti?

**DBA**: Gli utenti non possono fare login.

**ME**: E il business?

**DBA**: Il business è fermo.

**ME**: E quanto tempo per ricreare gli utenti?

**DBA**: Non si possono ricreare. I dati sono persi. Storia, preferenze, ordini. Tutto.

**ME**: E quindi?

**DBA**: E quindi siete fottuti.

Il DBA ha riattaccato. Io ho guardato il TL. Il TL guardava me. Io guardavo il terminale. Il terminale mostrava: "Rows affected: 847,293". E quelle righe erano utenti. 847.293 persone. Con nomi, email, preferenze, storia. Tutte sparite. In 0.3 secondi. Per sempre. Amen.

---

**Venerdì - 16:00**

È arrivato il CTO. Il CTO non era contento. Il CTO non era mai contento. Ma questa volta era peggio.

**CTO**: Quindi mi stai dicendo che hai cancellato 847.000 utenti?

**ME**: Sì.

**CTO**: Senza backup?

**ME**: Sì.

**CTO**: E come?

**ME**: La migration non aveva la WHERE.

**CTO**: Non aveva la WHERE?

**ME**: No. Qualcuno l'ha tolta.

**CTO**: Chi?

**ME**: Non lo so. Il merge è stato fatto dal JN.

**CTO**: Il JN?

**ME**: Sì.

**CTO**: E il JN ha tolto la WHERE?

**ME**: Non lo so. Il JN dice di no.

**CTO**: E chi è stato?

**ME**: Non lo so. Il log non mostra chi ha modificato.

**CTO**: E quindi?

**ME**: E quindi non lo so.

**CTO**: Non lo sai?

**ME**: No.

**CTO**: E il backup?

**ME**: Non c'è.

**CTO**: Non c'è?

**ME**: No.

**CTO**: E perché?

**ME**: Non ho avuto tempo.

**CTO**: Non hai avuto tempo?

**ME**: Il PM chiamava.

**CTO**: E il PM sapeva che non c'era il backup?

**ME**: Il PM non sa cosa è un backup.

**CTO**: E quindi?

**ME**: E quindi ho cancellato 847.000 utenti. Senza backup. Senza WHERE. Senza speranza.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era il nostro business. Il nulla... che erano 847.000 utenti. Spariti. Per sempre. Amen.

---

**Sabato - La Scoperta**

Il sabato, abbiamo scoperto. Chi era stato. E perché.

**TL**: Ho guardato la cronologia di git.

**ME**: E?

**TL**: E ho trovato chi ha tolto la WHERE.

**ME**: Chi?

**TL**: Il JN.

**ME**: Il JN?

**TL**: Sì. Il JN ha fatto un merge. E durante il merge, ha risolto un conflitto.

**ME**: E?

**TL**: E ha tolto la WHERE.

**ME**: Perché?

**TL**: Perché c'era un conflitto con un'altra migration. E il JN ha scelto la versione sbagliata.

**ME**: E non ha controllato?

**TL**: No. Il JN non controlla mai.

**ME**: E il code review?

**TL**: Il code review era stato approvato. Ma il merge ha cambiato il codice.

**ME**: E nessuno l'ha visto?

**TL**: No. Il merge è stato fatto di venerdì. Alle 18:00. Quando nessuno guardava.

**ME**: E quindi?

**TL**: E quindi il JN ha cancellato 847.000 utenti. Senza saperlo. Senza volerlo. Ma l'ha fatto.

Il TL mi ha guardato. Io guardavo il JN. Il JN guardava il nulla. Il nulla che era la sua carriera. Il nulla che era il nostro business. Il nulla... che erano 847.000 utenti. Spariti. Per sempre. Amen.

---

**Domenica - La Lezione**

La domenica, abbiamo imparato. O quasi.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Le migration vanno testate. Sempre.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: I merge vanno controllati. Sempre.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che una query senza WHERE è una bomba. Una bomba che esplode. E quando esplode, cancella tutto. 847.000 utenti. In 0.3 secondi. E tu non puoi fare nulla. Perché i dati sono persi. Per sempre. E il business è fermo. E gli utenti sono arrabbiati. E il CTO ti odia. E il CEO ti odia. E tutti ti odiano. Perché hai cancellato tutto. Senza backup. Senza WHERE. Senza speranza. Amen.

---

**Lunedì - La Documentazione**

Lunedì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #SQL-001: La Migration Senza WHERE

**Data incident**: Venerdì 23 maggio 2026, 14:47
**Autore migration**: ME
**Autore merge**: JN
**Query eseguita**: `DELETE FROM users;`
**WHERE clause**: ASSENTE
**Righe cancellate**: 847,293
**Tempo di esecuzione**: 0.3 secondi
**Backup presente**: NO
**Recupero possibile**: NO
**Utenti coinvolti**: 847,293
**Business impattato**: 100% (nessun utente può fare login)
**Durata downtime**: 72 ore (tempo di ricreare gli utenti da fonti esterne)
**Costo stimato**: €2.300.000 (persa revenue + costi di recovery + danni reputazionali)
**Reazione CTO**: "..."
**Reazione CEO**: "Siamo rovinati."
**Reazione PM**: "Ma la migration era stata approvata!"
**Lezione imparata**: SEMPRE la WHERE. SEMPRE il backup. SEMPRE.
**Probabilità che succeda di nuovo**: 73% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. Le migration che cancellano dati vanno SEMPRE con backup.
2. La WHERE clause è OBBLIGATORIA per DELETE e UPDATE.
3. I merge vanno controllati SEMPRE, anche se la PR era approvata.
4. Il code review non basta se il merge cambia il codice.
5. Testare le migration su un dataset comparabile a production.
6. Mai fare merge di venerdì sera. MAI.
7. Il JN non fa merge da solo. MAI.
```

Il JN ha letto la documentazione. Il JN ha pianto. Il JN ha detto: "Quindi ho imparato che una riga di codice può cancellare 847.000 utenti. E costare €2.300.000. E rovinare l'azienda. Ma l'ho imparato."

**ME**: Sì. E la lezione più importante è questa: i dati sono sacri. E quando li cancelli, non tornano. Mai. Per nessun motivo. Nemmeno se preghi. Nemmeno se piangi. Nemmeno se il CTO ti urla contro. I dati sono andati. E con loro, il business. E la tua carriera. E forse l'azienda. €2.300.000. 847.000 utenti. E tutto perché una query non aveva WHERE. Una riga. Una parola. WHERE. E quella parola mancava. E quando manca, succede questo. Il nulla. Il nulla assoluto. Amen.

---

## Il costo della migration senza WHERE

| Voce | Valore |
|------|--------|
| Query eseguita | `DELETE FROM users;` |
| WHERE clause | ASSENTE |
| Righe cancellate | 847,293 |
| Tempo di esecuzione | 0.3 secondi |
| Backup presente | NO |
| Recupero possibile | NO |
| Downtime | 72 ore |
| Costo stimato | €2.300.000 |
| Reazione CTO | "..." |
| Reazione CEO | "Siamo rovinati." |
| Reazione PM | "Ma era approvata!" |
| Lezione imparata | SEMPRE la WHERE |
| **Totale** | **€2.300.000 + 847.293 utenti persi + 1 azienda rovinata** |

**Morale**: Le migration che cancellano dati vanno fatte con cura. Con backup. Con WHERE. Con test. Con review. E soprattutto, con tempo. Non di venerdì. Non di fretta. Non "perché il PM vuole". Perché quando cancelli i dati, non tornano. Mai. E il business si ferma. E gli utenti se ne vanno. E l'azienda muore. E tutto perché una query non aveva WHERE. Una parola. WHERE. E quella parola mancava. E quando manca, succede questo. 847.000 utenti spariti. In 0.3 secondi. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](65-la-cache-che-non-venne-invalidata.md)]**
