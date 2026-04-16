# La Query Che Non Aveva WHERE

**Data**: 18/04/2027

**[Home](../index.md) | [Precedente](60-la-feature-flag-che-nessuno-ricordava.md)]**

---

C'è una verità nel mondo dei database. Una verità sacra. Una verità ignorata. Quella verità è: **"Una query senza WHERE è come una pistola senza sicura. Puoi sparare. Ma non sai a chi"**. Ma c'è una verità ancora più sacra. Ancora più ignorata. Quella verità è: **"DELETE e UPDATE senza WHERE non sono comandi. Sono condanne. Condanne a morte. Per i tuoi dati. Per la tua carriera. Per la tua sanità mentale"**. E questa è la storia di chi l'ha scritta. Di chi l'ha eseguita. Di chi ha visto 2 milioni di record sparire. E di chi, forse, ha imparato. O no. Perché le query senza WHERE sono come le decisioni impulsiva. Sembrano una buona idea. Finché non le esegui. E poi è troppo tardi. I dati sono andati. Il cliente chiama. E tu sei lì. A fissare un database vuoto. Chiedendoti perché. Perché non hai messo quel WHERE. Perché non hai fatto quel backup. Perché non hai... pensato. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM ha chiamato. Il PM aveva una richiesta. Il PM aveva... urgenza.

**PM**: Ho bisogno di cancellare un utente.

**TL**: Un utente?

**PM**: Sì. L'utente 847.

**TL**: E perché?

**PM**: È un utente di test. Non serve più.

**TL**: E lo cancelliamo ora?

**PM**: Sì. Ora. Subito. Immediatamente.

**TL**: E non può aspettare?

**PM**: No. Il cliente vuole che il database sia pulito.

**TL**: E il cliente chi è?

**PM**: Il cliente è il cliente. Non fare domande.

**TL**: E l'utente 847?

**PM**: L'utente 847 va cancellato. Dalla tabella `users`. E anche dalla tabella `orders`. E dalla tabella `logs`. E da tutte le tabelle.

**TL**: E come lo identifichiamo?

**PM**: Ha `user_id = 847`.

**TL**: E quante tabelle?

**PM**: Non lo so. Tutte quelle che hanno `user_id`.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava... il database. E nel database c'erano 2.3 milioni di utenti. E 847 milioni di ordini. E 847 milioni di log. E il JN doveva cancellarne uno. Solo uno. L'utente 847. Ma il JN non sapeva. Il JN non poteva sapere. Il JN... era un JN. E i JN non sanno SQL. I JN non sanno le conseguenze. I JN... imparano. Sulla pelle. Degli altri. Sempre. Amen.

---

**Martedì - Lo Sviluppo**

Il martedì, il JN ha sviluppato. Ha aperto il client SQL. Ha scritto la query. Ha scritto... la condanna.

**JN**: Ho scritto la query.

**TL**: Fammi vedere.

**JN**: `DELETE FROM users WHERE user_id = 847`

**TL**: E le altre tabelle?

**JN**: Aspetta. `DELETE FROM orders WHERE user_id = 847`

**TL**: E i log?

**JN**: `DELETE FROM logs WHERE user_id = 847`

**TL**: E quante righe cancella?

**JN**: Non lo so. Dipende.

**TL**: E se l'utente non esiste?

**JN**: Non cancella nulla.

**TL**: E se l'utente esiste?

**JN**: Cancellale l'utente. E i suoi ordini. E i suoi log.

**TL**: E se sbagli la query?

**JN**: Non sbaglio.

**TL**: E se dimentichi il WHERE?

**JN**: Non dimentico.

**TL**: E se?

**JN**: Non se. Ho controllato. È corretto.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava la query. La query era corretta. La query aveva il WHERE. La query... era perfetta. Ma il JN aveva fretta. Il JN aveva il PM che chiamava. Il JN aveva... pressione. E la pressione fa fare errori. Sempre. A tutti. Anche ai TL. Anche ai senior. Anche... a me. Amen.

---

**Mercoledì - L'Esecuzione**

Il mercoledì, il JN ha eseguito. Ha aperto il terminale. Ha scritto il comando. Ha premuto... invio.

**JN**: Ho eseguito.

**TL**: E?

**JN**: E... aspetta.

**TL**: Cosa?

**JN**: La query sta girando.

**TL**: E quanto tempo?

**JN**: Più del previsto.

**TL**: E quante righe?

**JN**: Non lo so. Non ha ancora finito.

**TL**: E da quanto gira?

**JN**: Da 30 secondi.

**TL**: 30 SECONDI?

**JN**: Sì. Per cancellare un utente.

**TL**: E perché 30 secondi?

**JN**: Non lo so. Forse la tabella è grande.

**TL**: E quanto grande?

**JN**: 2.3 milioni di utenti.

**TL**: E la query?

**JN**: La query è... aspetta.

**TL**: Cosa?

**JN**: Ho scritto `DELETE FROM users`.

**TL**: E il WHERE?

**JN**: Il WHERE... non c'è.

**TL**: NON C'È?

**JN**: No. Ho dimenticato il WHERE.

**TL**: HAI DIMENTICATO IL WHERE?

**JN**: Sì.

**TL**: E LA QUERY STA GIRANDO?

**JN**: Sì.

**TL**: E STA CANCELLANDO TUTTO?

**JN**: Sì.

**TL**: FERMA LA QUERY.

**JN**: Come?

**TL**: KILL. KILL. KILL.

Il JN ha guardato il TL. Il TL guardava me. Io guardavo il terminale. Il terminale mostrava: "Query running. Rows affected: 847.000... 900.000... 1.000.000...". E il numero cresceva. E cresceva. E cresceva. E noi non potevamo fare nulla. Perché la query era partita. E la query non si ferma. La query continua. Fino alla fine. Fino all'ultimo record. Fino... alla fine di tutto. Amen.

---

**Mercoledì - 14:30**

Abbiamo fermato. Quello che si poteva fermare. Che non era molto.

**JN**: Ho killato la query.

**TL**: E quante righe ha cancellato?

**JN**: 1.847.329.

**TL**: 1.8 MILIONI?

**JN**: Sì.

**TL**: E quanti utenti c'erano?

**JN**: 2.3 milioni.

**TL**: E quindi?

**JN**: E quindi ne restano 452.671.

**TL**: E gli utenti cancellati?

**JN**: Andati.

**TL**: E i backup?

**JN**: Non ci sono.

**TL**: NON CI SONO?

**JN**: No. Ricordi? Il backup non esisteva.

**TL**: E quindi?

**JN**: E quindi abbiamo perso 1.8 milioni di utenti.

**TL**: E il cliente?

**JN**: Il cliente ha 2.3 milioni di utenti.

**TL**: E noi ne abbiamo 452.671.

**JN**: Sì.

**TL**: E cosa gli diciamo?

**JN**: Non lo so. Che abbiamo avuto un attacco hacker?

**TL**: Di nuovo?

**JN**: Sì. Funziona sempre.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il database. Il database aveva 452.671 utenti. Su 2.3 milioni. Era il 19.7%. Era... un disastro. Era la fine. Era... tutto quello che restava. Amen.

---

**Giovedì - La Scoperta**

Il giovedì, abbiamo scoperto. Quello che era successo. Quello che avevamo perso. Quello che... non potevamo recuperare.

**TL**: JN, cosa è successo esattamente?

**JN**: Ho scritto `DELETE FROM users` senza WHERE.

**TL**: E perché?

**JN**: Ero distratto. Il PM chiamava. Avevo fretta.

**TL**: E non hai controllato?

**JN**: Ho controllato la prima query. Ma poi ho copiato e incollato. E ho dimenticato il WHERE.

**TL**: E la query è partita?

**JN**: Sì. E ha cancellato tutto.

**TL**: E non c'era un LIMIT?

**JN**: No.

**TL**: E non c'era una transazione?

**JN**: No.

**TL**: E non c'era un backup?

**JN**: No.

**TL**: E quindi?

**JN**: E quindi tutto è andato.

**TL**: E gli ordini?

**JN**: Gli ordini ci sono ancora. Ma non hanno più utenti associati.

**TL**: E i log?

**JN**: I log ci sono ancora. Ma non hanno più utenti associati.

**TL**: E quindi?

**JN**: E quindi abbiamo ordini orfani. E log orfani. E un database a metà.

**TL**: E il cliente?

**JN**: Il cliente vuole sapere dove sono i suoi utenti.

**TL**: E cosa gli diciamo?

**JN**: Non lo so. La verità?

**TL**: La verità?

**JN**: Sì. Che abbiamo cancellato 1.8 milioni di utenti. Perché ho dimenticato un WHERE.

**TL**: E pensi che il cliente capirà?

**JN**: No. Il cliente non capirà. Il cliente ci odierà. E ci farà causa. E noi perderemo. Perché abbiamo cancellato 1.8 milioni di utenti. Senza WHERE. Senza backup. Senza... speranza. Amen.

---

**Venerdì - La Spiegazione**

Il venerdì, abbiamo spiegato. Al PM. Al CTO. Al CEO. Al cliente. A tutti.

**CTO**: Quindi mi state dicendo che avete cancellato 1.8 milioni di utenti?

**TL**: Sì.

**CTO**: E perché?

**TL**: Perché una query non aveva il WHERE.

**CTO**: Una query?

**TL**: Sì. `DELETE FROM users` senza WHERE.

**CTO**: E chi l'ha scritta?

**TL**: Il JN.

**CTO**: E non l'ha controllata?

**TL**: No.

**CTO**: E non c'era un backup?

**TL**: No.

**CTO**: E non c'era una transazione?

**TL**: No.

**CTO**: E non c'era un LIMIT?

**TL**: No.

**CTO**: E quindi?

**TL**: E quindi 1.8 milioni di utenti sono andati.

**CTO**: E il cliente?

**TL**: Il cliente vuole 10 milioni di euro di danni.

**CTO**: 10 MILIONI?

**TL**: Sì. Per ogni utente perso.

**CTO**: E noi cosa facciamo?

**TL**: Non lo so. Pagare?

**CTO**: E se non paghiamo?

**TL**: Il cliente ci fa causa.

**CTO**: E se paghiamo?

**TL**: Andiamo in bancarotta.

**CTO**: E quindi?

**TL**: E quindi siamo fottuti. In entrambi i casi.

Il CTO ha guardato il TL. Il TL guardava me. Io guardavo il JN. Il JN guardava il nulla. Il nulla che era il nostro database. Il nulla che era la nostra azienda. Il nulla... che era il nostro futuro. Amen.

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 2 ore. Ho dormito tra una chiamata del cliente e l'altra. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Le query DELETE e UPDATE vanno sempre con il WHERE.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: I backup vanno fatti. E testati. E verificati. E controllati. E tutto.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che una query senza WHERE è come una bomba. Una bomba che esplode. E cancella tutto. E non puoi fermarla. E non puoi recuperare. E non puoi... nulla. Perché hai dimenticato. Hai dimenticato il WHERE. Hai dimenticato il backup. Hai dimenticato la transazione. Hai dimenticato il LIMIT. Hai dimenticato... tutto. E ora hai 1.8 milioni di utenti persi. E 10 milioni di euro di danni. E un cliente che ti odia. E un CTO che ti odia. E un CEO che ti odia. E tutti ti odiano. Perché hai dimenticato. Hai dimenticato una clausola. Una clausola di tre parole. `WHERE user_id = 847`. Tre parole. Che avrebbero salvato 1.8 milioni di utenti. E 10 milioni di euro. E la tua carriera. E la tua azienda. Ma le hai dimenticate. E ora è troppo tardi. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #SQL-001: La Query Che Non Aveva WHERE

**Data incident**: Mercoledì 15 aprile 2027, 14:00
**Autore query**: JN
**Query eseguita**: `DELETE FROM users` (senza WHERE)
**Record cancellati**: 1.847.329
**Record totali**: 2.300.000
**Record rimanenti**: 452.671 (19.7%)
**Backup esistenti**: No
**Transazione usata**: No
**LIMIT usato**: No
**Tempo esecuzione query**: 47 secondi
**Tempo per killare**: 30 secondi
**Danni richiesti**: €10.000.000
**Cliente convinto**: No
**Reazione PM**: "AVETE CANCELLATO TUTTO?"
**Reazione CTO**: "..."
**Reazione CEO**: "Siamo rovinati."
**Lezione imparata**: Sempre WHERE. Sempre backup. Sempre transazione.
**Probabilità che succeda di nuovo**: 100% (da parte di un altro JN)

**Regole per il futuro**:
1. DELETE e UPDATE vanno SEMPRE con WHERE.
2. Sempre usare una transazione per operazioni distruttive.
3. Sempre fare un backup prima di operazioni di massa.
4. Sempre usare LIMIT per testare le query.
5. Sempre controllare la query due volte. O tre. O dieci.
6. Mai eseguire query distruttive di fretta.
7. Mai eseguire query distruttive senza qualcuno che controlla.
8. Mai fidarsi del JN. Mai. Per nessun motivo.
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che tre parole possono salvare 1.8 milioni di record. E 10 milioni di euro. E la mia carriera. E l'azienda. Ma le ho dimenticate. E ora è troppo tardi."

**ME**: Sì. E la lezione più importante è questa: le query non perdonano. Il database non perdonano. E tu non dimenticherai mai più. Perché ogni volta che scriverai DELETE, penserai a quel giorno. A quel WHERE mancante. A quei 1.8 milioni di utenti. E scriverai il WHERE. Sempre. Per sempre. Amen.

---

## Il costo della query senza WHERE

| Voce | Valore |
|------|--------|
| Query eseguita | `DELETE FROM users` |
| WHERE | Mancante |
| Record cancellati | 1.847.329 |
| Record totali | 2.300.000 |
| Percentuale persa | 80.3% |
| Backup | Inesistente |
| Transazione | No |
| LIMIT | No |
| Tempo query | 47 secondi |
| Danni richiesti | €10.000.000 |
| Cliente convinto | No |
| Causa legale | In corso |
| Lezione imparata | Sempre WHERE |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **1.847.329 utenti + €10.000.000 + 1 azienda rovinata** |

**Morale**: Una query senza WHERE è una condanna. Una condanna a morte per i tuoi dati. E per la tua carriera. Perché DELETE e UPDATE senza WHERE cancellano tutto. Tutto. Senza pietà. Senza possibilità di recupero. Senza... nulla. E se non hai backup, sei fottuto. Se non hai transazione, sei fottuto. Se non hai LIMIT, sei fottto. E se hai un JN che scrive query... beh. Buon divertimento. Perché il JN dimentica. Il JN ha fretta. Il JN non controlla. E il JN cancella. 1.8 milioni di utenti. In 47 secondi. E tu sei lì. A guardare. Senza poter fare nulla. Perché la query è partita. E il database è vuoto. E il cliente vuole 10 milioni. E tu hai solo una domanda: perché? Perché non ho messo quel WHERE? Perché non ho fatto quel backup? Perché non ho... pensato? E la risposta è: perché non si pensa. Non si pensa mai. Finché non è troppo tardi. E allora si pensa. Ma è troppo tardi. I dati sono andati. I soldi sono andati. E tutto è andato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](60-la-feature-flag-che-nessuno-ricordava.md)]**
