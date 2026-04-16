# Il SELECT * Che Ha Ucciso Il Database

**Data**: 20/06/2026

**[Home](../index.md) | [Precedente](69-il-cron-job-che-non-si-fermava-mai.md)]**

---

C'è una verità nel mondo delle query SQL. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `SELECT *` pensando "tanto mi servono tutti i campi". Quella verità è: **"SELECT * è come aprire tutte le porte di casa quando cerchi le chiavi. Guardi in ogni stanza. Sposti ogni mobile. E intanto, il ladro entra. Il ladro, in questo caso, è il timeout. Il timeout che uccide la tua query. Che uccide le altre query. Che uccide il database. Che uccide la tua carriera. E tutto perché non hai specificato i campi"**. Ma c'è una verità ancora più sacra. Quella verità è: **"SELECT * in production è come giocare alla roulette russa con 5 proiettili. Puoi vincere. Ma quando perdi, perdi tutto. Il database. Le connessioni. I clienti. La dignità. E il CTO che ti chiama alle 3 di notte chiedendo 'perché il database è morto?' e tu rispondi 'era solo una query'. Ma quella query era SELECT *. E SELECT * non perdona"**. E questa è la storia di chi ha scritto quella query. Di chi l'ha eseguita. Di chi ha guardato il database morire. Una riga alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo fare un export dei clienti.

**ME**: Un export?

**PM**: Sì. Per il marketing.

**ME**: E cosa serve?

**PM**: Tutti i dati.

**ME**: Tutti?

**PM**: Sì. Nome, email, telefono, indirizzo, ordini, preferenze...

**ME**: E quanti sono?

**PM**: Non lo so. Forse 50.000?

**ME**: E il formato?

**PM**: CSV.

**ME**: E quando serve?

**PM**: Entro venerdì.

**ME**: Venerdì?

**PM**: Sì. Per la campagna email.

**ME**: E posso usare un batch?

**PM**: Un batch?

**ME**: Sì. Dividere in blocchi.

**PM**: No. Vogliono tutto insieme.

**ME**: Tutto insieme?

**PM**: Sì. Un file unico.

**ME**: E se è troppo grande?

**PM**: Non sarà troppo grande.

**ME**: E se la query impiega troppo?

**PM**: Non impiegherà troppo. Sono solo 50.000 clienti.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia sanità mentale. Il nulla che era la mia attenzione alle performance. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - La Query**

Il martedì, ho scritto. Ho scritto la query. Ho scritto... la condanna.

**ME**: Ok. Ho scritto la query.

**TL**: Fammi vedere.

**ME**:
```sql
SELECT * FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
LEFT JOIN order_items ON orders.id = order_items.order_id
LEFT JOIN products ON order_items.product_id = products.id
LEFT JOIN addresses ON customers.id = addresses.customer_id
LEFT JOIN preferences ON customers.id = preferences.customer_id
LEFT JOIN sessions ON customers.id = sessions.customer_id
```

**TL**: E questa?

**ME**: Questa è la query per l'export.

**TL**: SELECT *?

**ME**: Sì.

**TL**: Da 7 tabelle?

**ME**: Sì.

**TL**: Con LEFT JOIN?

**ME**: Sì.

**TL**: E hai guardato quante colonne sono?

**ME**: Non le ho contate.

**TL**: E quante righe?

**ME**: Il PM dice 50.000 clienti.

**TL**: E gli ordini?

**ME**: Non lo so.

**TL**: E gli order_items?

**ME**: Non lo so.

**TL**: E le sessioni?

**ME**: Non lo so.

**TL**: E hai pensato che ogni cliente può avere centinaia di ordini?

**ME**: Centinaia?

**TL**: Sì. E migliaia di order_items.

**ME**: Migliaia?

**TL**: Sì. E decine di sessioni.

**ME**: Decine?

**TL**: Sì. E quindi la tua query non restituisce 50.000 righe.

**ME**: E quante?

**TL**: Forse 5 milioni.

**ME**: 5 milioni?

**TL**: Sì. O forse 50 milioni. Dipende.

**ME**: Dipende?

**TL**: Dipende da quanti dati hai.

**ME**: E non lo sai?

**TL**: Non ho i numeri. Ma so che SELECT * su 7 tabelle è una pessima idea.

**ME**: E cosa dovrei fare?

**TL**: Specificare i campi.

**ME**: Tutti?

**TL**: Solo quelli che servono.

**ME**: E se servono tutti?

**TL**: Allora li elenchi. Uno per uno.

**ME**: Ma sono tante colonne!

**TL**: E SELECT * è più facile?

**ME**: Sì.

**TL**: E più pericoloso.

**ME**: Pericoloso?

**TL**: Sì. Perché non sai cosa prendi. Non sai quanto pesa. Non sai quanto tempo ci vuole.

Il TL mi ha guardato. Io guardavo la query. La query guardava me. E io sapevo. Sapevo che era sbagliato. Sapevo che SELECT * era pigro. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Mercoledì - Il Test**

Il mercoledì, ho testato. Ho testato in locale. Ho testato... il nulla.

**ME**: Ho testato la query.

**TL**: E?

**ME**: Funziona.

**TL**: E quanto ci mette?

**ME**: 2 secondi.

**TL**: 2 secondi?

**ME**: Sì.

**TL**: E con quanti dati?

**ME**: 1.000 clienti.

**TL**: 1.000?

**ME**: Sì. In locale.

**TL**: E in production?

**ME**: Il PM dice 50.000.

**TL**: E hai testato con 50.000?

**ME**: No.

**TL**: E perché?

**ME**: Perché non ho 50.000 clienti in locale.

**TL**: E non hai pensato di fare un test su staging?

**ME**: Staging?

**TL**: Sì. L'ambiente di test con dati reali.

**ME**: Non ci ho pensato.

**TL**: E il LIMIT?

**ME**: Il LIMIT?

**TL**: Sì. Per testare con un sottoinsieme.

**ME**: Non ci ho pensato.

**TL**: E l'EXPLAIN?

**ME**: L'EXPLAIN?

**TL**: Sì. Per vedere il piano di esecuzione.

**ME**: Non so cos'è.

**TL**: Non sai cos'è l'EXPLAIN?

**ME**: No.

**TL**: E fai query su 7 tabelle?

**ME**: Sì.

**TL**: Con SELECT *?

**ME**: Sì.

**TL**: E non sai cos'è l'EXPLAIN?

**ME**: No.

**TL**: E non hai testato su staging?

**ME**: No.

**TL**: E non hai messo un LIMIT?

**ME**: No.

**TL**: E cosa hai fatto?

**ME**: Ho testato in locale. Con 1.000 clienti.

**TL**: E pensi che basti?

**ME**: Sì.

**TL**: E se in production sono 5 milioni di righe?

**ME**: Non sono 5 milioni.

**TL**: E se lo sono?

**ME**: Allora... non lo so.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era la mia conoscenza SQL. Il nulla che era la mia attenzione ai dettagli. Il nulla... che stava per diventare un disastro. Amen.

---

**Giovedì - L'Esecuzione**

Il giovedì, ho eseguito. Ho eseguito la query. Ho eseguito... la condanna.

**ME**: Ok. Eseguo la query.

**PM**: Ottimo! Fammi sapere quando hai il file.

**ME**: Certo.

Ho aperto il terminale. Ho aperto la connessione al database. Ho scritto la query. E ho premuto invio.

```
db> SELECT * FROM customers
    LEFT JOIN orders ON customers.id = orders.customer_id
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN products ON order_items.product_id = products.id
    LEFT JOIN addresses ON customers.id = addresses.customer_id
    LEFT JOIN preferences ON customers.id = preferences.customer_id
    LEFT JOIN sessions ON customers.id = sessions.customer_id;

... executing ...
```

E la query è partita. E io aspettavo. E aspettavo. E aspettavo.

**ME**: La query sta girando.

**PM**: E quanto ci mette?

**ME**: Non lo so. Ancora sta girando.

**PM**: E i clienti?

**ME**: I clienti?

**PM**: Sì. Il sito.

**ME**: Non lo so. Non controllo.

**PM**: Controlla.

Ho aperto il browser. Ho aperto il sito. E il sito... non si caricava.

**ME**: PM?

**PM**: Sì?

**ME**: Il sito è lento.

**PM**: Lento?

**ME**: Sì. Molto lento.

**PM**: E perché?

**ME**: Non lo so. Forse la query.

**PM**: La query?

**ME**: Sì. La query che sto eseguendo.

**PM**: E il database?

**ME**: Il database?

**PM**: Sì. Sta reggendo?

**ME**: Non lo so. Controllo.

Ho aperto i monitor. I monitor mostravano:
- CPU: 98%
- Memoria: 94%
- Connessioni attive: 847
- Query in coda: 234
- Query in esecuzione: 1 (la mia)
- Lock: 847

E lì, nei monitor, c'era la verità. La verità che faceva male. La verità che... la mia query stava uccidendo il database. Amen.

---

**Giovedì - 14:23**

È arrivato. Quello che temevo. Quello che era inevitabile.

**SLACK**: @here Il database non risponde.

**SLACK**: @channel Timeout su tutte le query.

**SLACK**: @everyone PRODUZIONE DOWN.

**ME**: ...

**TL**: Te l'avevo detto.

**ME**: Ma cosa è successo?

**TL**: La query.

**ME**: La query?

**TL**: Sì. La query del cazzo che hai scritto.

**ME**: E perché?

**TL**: Perché SELECT * su 7 tabelle.

**ME**: E quindi?

**TL**: E quindi hai bloccato tutto.

**ME**: Bloccato?

**TL**: Sì. Con i lock.

**ME**: I lock?

**TL**: Sì. La tua query ha creato 847 lock.

**ME**: 847?

**TL**: Sì. E ha bloccato tutte le altre query.

**ME**: Tutte?

**TL**: Sì. Tutte. 234 query in coda.

**ME**: E il database?

**TL**: Il database è morto.

**ME**: Morto?

**TL**: Sì. Morto. CPU al 98%. Memoria al 94%. E la tua query ancora gira.

**ME**: E quanto manca?

**TL**: Non lo so. Ma la query ha già restituito 12 milioni di righe.

**ME**: 12 milioni?

**TL**: Sì. E non ha finito.

**ME**: E cosa faccio?

**TL**: La killi.

**ME**: La killi?

**TL**: Sì. La uccidi. Subito.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
KILL QUERY 847293;
Query killed.
```

E la query è morta. Ma il danno era fatto. 12 milioni di righe. 847 lock. 234 query in coda. E il database... a terra. Amen.

---

**Giovedì - 15:00**

Il database è tornato. Ma i clienti no.

**CLIENTE 1**: Non riesco a fare l'ordine.

**CLIENTE 2**: Il sito va lentissimo.

**CLIENTE 3**: Ho perso il carrello.

**CLIENTE 4**: Che succede?

**CLIENTE 5**: Voglio un rimborso.

**ME**: ...

**PM**: Cosa è successo?

**ME**: La query.

**PM**: La query?

**ME**: Sì. La query ha bloccato il database.

**PM**: E perché?

**ME**: Perché era SELECT *.

**PM**: SELECT *?

**ME**: Sì. Su 7 tabelle.

**PM**: E questo è un problema?

**ME**: Sì. È un problema.

**PM**: E perché?

**ME**: Perché prende tutti i dati. Di tutte le tabelle. E crea lock. E blocca tutto.

**PM**: E non lo sapevi?

**ME**: Non ci ho pensato.

**PM**: Non ci hai pensato?

**ME**: No.

**PM**: E adesso?

**ME**: Adesso... ho imparato.

**PM**: E i clienti?

**ME**: I clienti sono arrabbiati.

**PM**: E le vendite?

**ME**: Le vendite sono ferme.

**PM**: E il CEO?

**ME**: Il CEO?

**PM**: Sì. Il CEO vuole parlarti.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era la mia dignità. Il nulla... che era il database. Morto. Per una query. Una query con SELECT *. Amen.

---

**Giovedì - 16:00**

Il CEO ha chiamato. Il CEO non era contento. Il CEO non era mai contento. Ma questa volta era peggio.

**CEO**: Quindi mi stai dicendo che hai mandato down il database?

**ME**: Sì.

**CEO**: Con una query?

**ME**: Sì.

**CEO**: Una query?

**ME**: Sì.

**CEO**: E quanto è durato il downtime?

**ME**: 47 minuti.

**CEO**: 47 minuti?

**ME**: Sì.

**CEO**: E quante vendite abbiamo perso?

**ME**: Non lo so.

**CEO**: E i clienti?

**ME**: Arrabbiati.

**CEO**: E il costo?

**ME**: Non lo so.

**CEO**: E sai cosa mi fa più arrabbiare?

**ME**: Cosa?

**CEO**: Che era SELECT *.

**ME**: SELECT *?

**CEO**: Sì. SELECT *.

**ME**: E come lo sai?

**CEO**: Perché il TL me l'ha detto.

**ME**: Il TL?

**CEO**: Sì. Il TL ha documentato tutto.

**ME**: E cosa ha scritto?

**CEO**: Ha scritto: "ME ha usato SELECT * su 7 tabelle. Senza LIMIT. Senza EXPLAIN. Senza testare su staging. E ha ucciso il database. Per 47 minuti. Durante l'orario di punta. Con 847 clienti attivi. E 234 query in coda. E 12 milioni di righe restituite. E tutto perché non ha specificato i campi."

**ME**: ...

**CEO**: E sai cosa significa?

**ME**: Cosa?

**CEO**: Significa che non hai imparato nulla. Perché SELECT * è la prima cosa che si impara a NON fare.

**ME**: Io...

**CEO**: E sai cosa farò?

**ME**: Cosa?

**CEO**: Ti farò scrivere 1.000 volte: "Non userò mai SELECT * in production".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che era SELECT *. Amen.

---

**Venerdì - La Punizione**

Il venerdì, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non userò mai SELECT * in production.
Non userò mai SELECT * in production.
Non userò mai SELECT * in production.
...
(997 righe dopo)
...
Non userò mai SELECT * in production.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più usato SELECT *.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che SELECT * è pericoloso.

**TL**: E cos'altro?

**ME**: Che bisogna specificare i campi.

**TL**: E cos'altro?

**ME**: Che bisogna testare su staging.

**TL**: E cos'altro?

**ME**: Che bisogna usare EXPLAIN.

**TL**: E cos'altro?

**ME**: Che bisogna mettere LIMIT.

**TL**: E cos'altro?

**ME**: Che non si fanno query pesanti in production durante l'orario di punta.

**TL**: E cos'altro?

**ME**: Che il database non perdona.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che SELECT * non è solo pigro. È pericoloso. È irresponsabile. È da principianti. E tu non sei un principiante. O almeno, non dovresti esserlo. Ma oggi hai dimostrato di esserlo. E la prossima volta che usi SELECT *, pensa a oggi. Pensa a 47 minuti di downtime. Pensa a 847 clienti arrabbiati. Pensa al CEO che ti fa scrivere 1.000 volte. E poi, specifica i fottuti campi. Uno per uno. Come si deve. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non userò mai SELECT * in production". E sapevo che le avrei mantenute. Perché il database non perdona. E il CEO nemmeno. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #DB-001: Il SELECT * Che Ha Ucciso Il Database

**Data incident**: Giovedì 18 giugno 2026, 14:00
**Autore query**: ME
**Query eseguita**: SELECT * FROM 7 tabelle con LEFT JOIN
**Campi specificati**: NO (SELECT *)
**LIMIT presente**: NO
**EXPLAIN eseguito**: NO
**Test su staging**: NO
**Test in locale**: Sì (con 1.000 righe)
**Righe in production**: 12.847.293 (prima del kill)
**Lock creati**: 847
**Query in coda**: 234
**Durata downtime**: 47 minuti
**Clienti impattati**: 847 (attivi durante l'incident)
**Vendite perse**: €23.847 (stimato)
**CPU picco**: 98%
**Memoria picco**: 94%
**Query killata**: Sì (dopo 23 minuti)
**Punizione**: 1.000 volte "Non userò mai SELECT * in production"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione TL**: "SELECT * è da principianti."
**Reazione PM**: "Ma i clienti volevano i dati!"
**Lezione imparata**: MAI SELECT * in production. MAI.
**Probabilità che succeda di nuovo**: 34% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. SELECT * è VIETATO in production. VIETATO.
2. Specificare SEMPRE i campi. Uno per uno.
3. Usare SEMPRE EXPLAIN prima di query complesse.
4. Testare SEMPRE su staging con dati reali.
5. Mettere SEMPRE LIMIT per testare.
6. Non eseguire MAI query pesanti durante l'orario di punta.
7. I LEFT JOIN moltiplicano le righe. Ricordalo.
8. Il database non perdona. Il CEO nemmeno.
9. "Tanto sono pochi dati" = "Tanto il database muore".
10. 1.000 volte a mano. Ricordalo.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che SELECT * uccide i database. E le carriere. E la dignità. E che il CEO ti fa scrivere 1.000 volte. E che 12 milioni di righe sono troppe per una query. E che 847 lock bloccano tutto. E che 47 minuti di downtime costano €23.000. E che i clienti si arrabbiano. E che il TL documenta tutto. E che tu non dimenticherai mai. Perché hai scritto 1.000 volte. A mano. Su carta. E quelle 1.000 righe sono la tua penitenza. E il tuo promemoria. E la tua lezione. Amen."

**ME**: Sì. E la lezione più importante è questa: SELECT * è la tentazione. È la via facile. È la scorciatoia. Ma le scorciatoie, in production, uccidono. Uccidono il database. Uccidono le performance. Uccidono la carriera. E tutto perché non hai specificato i campi. Non hai usato EXPLAIN. Non hai testato su staging. Non hai messo LIMIT. E hai pensato: "Tanto sono pochi dati". Ma i dati non sono mai pochi. I dati crescono. I JOIN moltiplicano. E SELECT * prende tutto. Tutto quello che non serve. Tutto quello che pesa. Tutto quello che uccide. E quando uccide, uccide per 47 minuti. Con 847 clienti arrabbiati. Con €23.000 persi. Con il CEO che ti fa scrivere 1.000 volte. E tu scrivi. E scrivi. E scrivi. E impari. Perché SELECT * non perdona. E il database nemmeno. Amen.

---

## Il costo del SELECT *

| Voce | Valore |
|------|--------|
| Query | SELECT * FROM 7 tabelle |
| Campi specificati | NO |
| LIMIT | NO |
| EXPLAIN | NO |
| Test staging | NO |
| Righe restituite | 12.847.293 |
| Lock creati | 847 |
| Query in coda | 234 |
| Durata downtime | 47 minuti |
| Clienti impattati | 847 |
| Vendite perse | €23.847 |
| CPU picco | 98% |
| Memoria picco | 94% |
| Query killata | Sì (dopo 23 min) |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione TL | "SELECT * è da principianti" |
| Reazione PM | "Ma i clienti volevano i dati!" |
| Lezione imparata | MAI SELECT * in production |
| **Totale** | **47 min downtime + €23.847 persi + 1.000 righe a mano** |

**Morale**: SELECT * non si usa in production. Mai. Nemmeno se "sono pochi dati". Nemmeno se "mi servono tutti i campi". Nemmeno se "è una query veloce". Perché i dati crescono. I JOIN moltiplicano. E SELECT * prende tutto. E quando prende tutto, il database muore. E quando il database muore, i clienti si arrabbiati. E quando i clienti si arrabbiano, il CEO ti chiama. E quando il CEO ti chiama, tu scrivi. 1.000 volte. A mano. Su carta. E impari. Perché SELECT * non perdona. E il database nemmeno. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](69-il-cron-job-che-non-si-fermava-mai.md)]**
