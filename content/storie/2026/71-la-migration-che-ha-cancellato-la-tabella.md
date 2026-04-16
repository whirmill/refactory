# La Migration Che Ha Cancellato La Tabella

**Data**: 27/06/2026

**[Home](../index.md) | [Precedente](70-il-select-asterisco-che-ha-ucciso-il-database.md) | [Prossima](72-il-file-env-che-era-su-git.md)]**

---

C'è una verità nel mondo delle migration. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `DROP TABLE` pensando "tanto è in sviluppo". Quella verità è: **"Una migration senza backup è come saltare da un aereo senza paracadute. Puoi farlo. Ma quando atterri, atterri male. Molto male. E la tabella che hai cancellato non torna. I dati che hai perso non tornano. E il CEO che ti chiama alle 3 di notte chiedendo 'dove sono finiti i clienti?' non accetta 'ho sbagliato migration' come risposta. Perché i clienti sono andati. I dati sono andati. E la tua carriera... è andata"**. Ma c'è una verità ancora più sacra. Quella verità è: **"Le migration vanno testate. Vanno backuppate. Vanno eseguite con transazioni. E soprattutto, vanno lette. Righe per riga. Prima di premere invio. Perché quando premi invio, la migration parte. E quando la migration parte, le tabelle cadono. E quando le tabelle cadono, i dati muoiono. E quando i dati muoiono, tu muori. Metaforicamente. O forse no. Amen"**. E questa è la storia di chi ha scritto quella migration. Di chi l'ha eseguita. Di chi ha guardato la tabella sparire. Una riga alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo rinominare la tabella clienti.

**ME**: Rinominare?

**PM**: Sì. Da `clienti` a `customers`.

**ME**: E perché?

**PM**: Per la nuova API.

**ME**: La nuova API?

**PM**: Sì. Quella inglese.

**ME**: E non possiamo mappare il nome?

**PM**: No. Vogliono che sia `customers`.

**ME**: E quindi?

**PM**: E quindi rinominiamo la tabella.

**ME**: E i dati?

**PM**: I dati restano.

**ME**: E le foreign key?

**PM**: Le foreign key?

**ME**: Sì. Le relazioni con le altre tabelle.

**PM**: Non lo so. Pensaci tu.

**ME**: E quando serve?

**PM**: Entro venerdì.

**ME**: Venerdì?

**PM**: Sì. Per il lancio dell'API.

**ME**: E posso testare?

**PM**: Certo. In sviluppo.

**ME**: E in produzione?

**PM**: In produzione la fai venerdì.

**ME**: Venerdì?

**PM**: Sì. Venerdì pomeriggio.

**ME**: E se qualcosa va storto?

**PM**: Cosa può andare storto? È solo una rinomina.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con le migration. Il nulla che era la mia attenzione ai backup. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - La Migration**

Il martedì, ho scritto. Ho scritto la migration. Ho scritto... la condanna.

**ME**: Ok. Ho scritto la migration.

**TL**: Fammi vedere.

**ME**:
```sql
-- Migration: Rinomina tabella clienti in customers
-- Autore: ME
-- Data: Martedì

BEGIN;

-- Prima rinomino la tabella
ALTER TABLE clienti RENAME TO customers;

-- Poi aggiorno le foreign key
ALTER TABLE ordini 
  DROP CONSTRAINT ordini_cliente_id_fkey,
  ADD CONSTRAINT ordini_customer_id_fkey 
  FOREIGN KEY (cliente_id) REFERENCES customers(id);

COMMIT;
```

**TL**: E questa?

**ME**: Questa è la migration.

**TL**: E l'hai testata?

**ME**: Sì. In sviluppo.

**TL**: E ha funzionato?

**ME**: Sì.

**TL**: E il backup?

**ME**: Il backup?

**TL**: Sì. Il backup della tabella.

**ME**: Non ce l'ho.

**TL**: Non ce l'hai?

**ME**: No.

**TL**: E se qualcosa va storto?

**ME**: Cosa può andare storto? È una transazione.

**TL**: E se la transazione fallisce a metà?

**ME**: Fallisce?

**TL**: Sì. Se il DROP CONSTRAINT funziona ma l'ADD CONSTRAINT no.

**ME**: Ma è tutto in una transazione!

**TL**: E se la transazione va in timeout?

**ME**: Timeout?

**TL**: Sì. Se la tabella è grande e locka troppo.

**ME**: Quanto è grande?

**TL**: Non lo so. Quanti clienti avete?

**ME**: Il PM dice 50.000.

**TL**: E gli ordini?

**ME**: Non lo so.

**TL**: E le foreign key?

**ME**: Non lo so.

**TL**: E hai controllato se ci sono altre tabelle che referenziano `clienti`?

**ME**: Altre tabelle?

**TL**: Sì. Indirizzi. Preferenze. Sessioni. Pagamenti.

**ME**: Non ci ho pensato.

**TL**: E quindi?

**ME**: E quindi... controllo.

Il TL mi ha guardato. Io guardavo la migration. La migration guardava me. E io sapevo. Sapevo che era incompleta. Sapevo che mancava qualcosa. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Mercoledì - La Scoperta**

Il mercoledì, ho scoperto. Ho scoperto quante tabelle. Ho scoperto... il disastro.

**ME**: Ho controllato.

**TL**: E?

**ME**: Ci sono 12 tabelle che referenziano `clienti`.

**TL**: 12?

**ME**: Sì.

**TL**: E la migration?

**ME**: La migration ne aggiorna solo 1.

**TL**: Solo 1?

**ME**: Sì.

**TL**: E le altre 11?

**ME**: Le altre 11... rompono.

**TL**: Rompono?

**ME**: Sì. Se rinomino `clienti`, le foreign key delle altre 11 tabelle puntano al nulla.

**TL**: E quindi?

**ME**: E quindi devo aggiornare tutte le foreign key.

**TL**: Tutte?

**ME**: Sì. Tutte e 12.

**TL**: E hai tempo?

**ME**: Il PM vuole per venerdì.

**TL**: E il backup?

**ME**: Non ho fatto il backup.

**TL**: E lo fai?

**ME**: Lo faccio venerdì. Prima della migration.

**TL**: Venerdì?

**ME**: Sì.

**TL**: E se il backup fallisce?

**ME**: Non fallirà.

**TL**: E se la migration fallisce?

**ME**: Non fallirà.

**TL**: E se qualcosa va storto?

**ME**: Non andrà storto.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era la mia preparazione. Il nulla che era il mio piano B. Il nulla... che era il backup. Che non c'era. Amen.

---

**Giovedì - La Nuova Migration**

Il giovedì, ho riscritto. Ho riscritto la migration. Ho riscritto... la condanna.

**ME**: Ok. Ho riscritto la migration.

**TL**: Fammi vedere.

**ME**:
```sql
-- Migration: Rinomina tabella clienti in customers
-- Autore: ME
-- Data: Giovedì (riscritto)
-- Versione: 2

BEGIN;

-- Prima rinomino la tabella
ALTER TABLE clienti RENAME TO customers;

-- Poi aggiorno tutte le foreign key (12 tabelle)
ALTER TABLE ordini DROP CONSTRAINT ordini_cliente_id_fkey;
ALTER TABLE ordini ADD CONSTRAINT ordini_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE indirizzi DROP CONSTRAINT indirizzi_cliente_id_fkey;
ALTER TABLE indirizzi ADD CONSTRAINT indirizzi_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE preferenze DROP CONSTRAINT preferenze_cliente_id_fkey;
ALTER TABLE preferenze ADD CONSTRAINT preferenze_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE sessioni DROP CONSTRAINT sessioni_cliente_id_fkey;
ALTER TABLE sessioni ADD CONSTRAINT sessioni_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE pagamenti DROP CONSTRAINT pagamenti_cliente_id_fkey;
ALTER TABLE pagamenti ADD CONSTRAINT pagamenti_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE carrello DROP CONSTRAINT carrello_cliente_id_fkey;
ALTER TABLE carrello ADD CONSTRAINT carrello_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE recensioni DROP CONSTRAINT recensioni_cliente_id_fkey;
ALTER TABLE recensioni ADD CONSTRAINT recensioni_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE wishlist DROP CONSTRAINT wishlist_cliente_id_fkey;
ALTER TABLE wishlist ADD CONSTRAINT wishlist_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE notifiche DROP CONSTRAINT notifiche_cliente_id_fkey;
ALTER TABLE notifiche ADD CONSTRAINT notifiche_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE log DROP CONSTRAINT log_cliente_id_fkey;
ALTER TABLE log ADD CONSTRAINT log_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE coupon DROP CONSTRAINT coupon_cliente_id_fkey;
ALTER TABLE coupon ADD CONSTRAINT coupon_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

ALTER TABLE ticket DROP CONSTRAINT ticket_cliente_id_fkey;
ALTER TABLE ticket ADD CONSTRAINT ticket_customer_id_fkey FOREIGN KEY (cliente_id) REFERENCES customers(id);

COMMIT;
```

**TL**: E questa?

**ME**: Questa è la migration completa.

**TL**: E l'hai testata?

**ME**: Sì. In sviluppo.

**TL**: E ha funzionato?

**ME**: Sì.

**TL**: E quanto ci mette?

**ME**: 3 minuti.

**TL**: 3 minuti?

**ME**: Sì. In sviluppo.

**TL**: E in produzione?

**ME**: Non lo so.

**TL**: E quanti dati hai in sviluppo?

**ME**: 1.000 clienti.

**TL**: E in produzione?

**ME**: Il PM dice 50.000.

**TL**: E gli ordini?

**ME**: In sviluppo? 5.000.

**TL**: E in produzione?

**ME**: Non lo so.

**TL**: E le altre tabelle?

**ME**: Non lo so.

**TL**: E pensi che 3 minuti bastino?

**ME**: Sì.

**TL**: E se la tabella log ha 10 milioni di righe?

**ME**: 10 milioni?

**TL**: Sì. I log accumulano.

**ME**: Non ci ho pensato.

**TL**: E se la migration impiega 30 minuti?

**ME**: 30 minuti?

**TL**: Sì. E locka tutto.

**ME**: Locka?

**TL**: Sì. Le ALTER TABLE lockano.

**ME**: E quindi?

**TL**: E quindi il sito va down.

**ME**: Down?

**TL**: Sì. Per 30 minuti.

**ME**: E cosa faccio?

**TL**: La fai di notte.

**ME**: Di notte?

**TL**: Sì. Quando non ci sono utenti.

**ME**: Ma il PM vuole venerdì pomeriggio.

**TL**: E tu gli dici di no.

**ME**: Di no?

**TL**: Sì. Di no.

**ME**: E se non accetta?

**TL**: Allora fai il backup. Prima. E preghi.

Il TL mi ha guardato. Io guardavo la migration. La migration guardava me. E io sapevo. Sapevo che era pericolosa. Sapevo che lockava. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Venerdì - 14:00**

Il venerdì, il PM ha chiamato. Il PM voleva. E io... non ho detto di no.

**PM**: Siamo pronti per la migration?

**ME**: Sì.

**PM**: E il backup?

**ME**: Lo faccio adesso.

**PM**: Ottimo! Alle 15:00 la eseguiamo.

**ME**: 15:00?

**PM**: Sì. Prima della riunione delle 16.

**ME**: E se la migration impiega troppo?

**PM**: Quanto?

**ME**: Non lo so. Forse 30 minuti.

**PM**: 30 minuti?

**ME**: Sì. Se la tabella log è grande.

**PM**: E quanto è grande?

**ME**: Non lo so.

**PM**: E quindi?

**ME**: E quindi potrebbe lockare.

**PM**: Lockare?

**ME**: Sì. Bloccare il database.

**PM**: E per quanto?

**ME**: Non lo so. Forse 30 minuti.

**PM**: E il sito?

**ME**: Il sito va down.

**PM**: Down?

**ME**: Sì.

**PM**: E non puoi farla di notte?

**ME**: Posso. Ma tu vuoi oggi.

**PM**: Oggi. Prima delle 16.

**ME**: E se va down?

**PM**: Non va down. Sono solo 50.000 clienti.

**ME**: Ma la tabella log...

**PM**: La tabella log? Quante righe ha?

**ME**: Non lo so.

**PM**: E quindi controlla.

**ME**: Controllo.

Ho aperto il terminale. Ho aperto la connessione al database. Ho scritto la query. E ho premuto invio.

```sql
SELECT COUNT(*) FROM log;
```

E il risultato è arrivato. E il risultato era:
```
count
--------
84729384
(1 row)
```

84 milioni di righe. La tabella log aveva 84 milioni di righe. E la mia migration doveva toccarla. E io sapevo. Sapevo che 84 milioni di righe significava lock. Lock lungo. Lock molto lungo. E il PM voleva alle 15:00. E io non ho detto di no. Amen.

---

**Venerdì - 14:30**

Ho fatto il backup. O ci ho provato.

**ME**: Ok. Faccio il backup.

**TL**: E la tabella log?

**ME**: La tabella log?

**TL**: Sì. 84 milioni di righe.

**ME**: E quindi?

**TL**: E quindi il backup impiega ore.

**ME**: Ore?

**TL**: Sì. Forse 3 ore.

**ME**: 3 ore?

**TL**: Sì. E il PM vuole alle 15:00.

**ME**: E quindi?

**TL**: E quindi non fai il backup della tabella log.

**ME**: Non la faccio?

**TL**: No. È troppo grande.

**ME**: E se qualcosa va storto?

**TL**: La tabella log si ricostruisce.

**ME**: Si ricostruisce?

**TL**: Sì. Dai log applicativi.

**ME**: E le altre tabelle?

**TL**: Le altre le backuppi.

**ME**: E quanto ci vuole?

**TL**: 30 minuti.

**ME**: 30 minuti?

**TL**: Sì. Per clienti, ordini, indirizzi...

**ME**: E la migration?

**TL**: La migration la fai dopo.

**ME**: Dopo?

**TL**: Sì. Dopo il backup.

**ME**: E se il backup finisce alle 15:00?

**TL**: Allora la migration la fai alle 15:30.

**ME**: E il PM?

**TL**: Il PM aspetta.

**ME**: E se non aspetta?

**TL**: Allora fai la migration senza backup.

**ME**: Senza backup?

**TL**: Sì. E preghi.

Il TL mi ha guardato. Io guardavo l'orologio. L'orologio mostrava 14:31. E il backup era partito. E io aspettavo. E aspettavo. E aspettavo. Amen.

---

**Venerdì - 15:17**

Il backup era finito. Alle 15:17. 47 minuti. E il PM chiamava.

**PM**: Il backup è finito?

**ME**: Sì.

**PM**: Ottimo! La migration?

**ME**: La faccio adesso.

**PM**: Perfetto! Alle 16 ho la riunione.

**ME**: Lo so.

**PM**: E quanto ci mette?

**ME**: Non lo so.

**PM**: E se non finisce per le 16?

**ME**: Allora... non finisce.

**PM**: E la riunione?

**ME**: La riunione aspetta.

**PM**: La riunione non può aspettare.

**ME**: E allora?

**PM**: Allora fai in modo che finisca.

**ME**: Non controllo il database.

**PM**: E chi lo controlla?

**ME**: Il database.

**PM**: E quindi?

**ME**: E quindi aspettiamo.

**PM**: Aspettiamo?

**ME**: Sì. Aspettiamo che la migration finisca.

**PM**: E se non finisce?

**ME**: Finirà.

**PM**: E se fallisce?

**ME**: Non fallirà.

**PM**: E se va storto?

**ME**: Non andrà storto.

Il PM mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
BEGIN;
ALTER TABLE clienti RENAME TO customers;
```

E la migration era partita. E io aspettavo. E aspettavo. E aspettavo. Amen.

---

**Venerdì - 15:23**

È successo. Quello che temevo. Quello che era inevitabile.

**SLACK**: @here Il sito è lento.

**SLACK**: @channel Timeout sulle query.

**SLACK**: @everyone IL DATABASE È BLOCCATO.

**ME**: ...

**TL**: Te l'avevo detto.

**ME**: Ma cosa è successo?

**TL**: La migration.

**ME**: La migration?

**TL**: Sì. La migration del cazzo che hai scritto.

**ME**: E perché?

**TL**: Perché hai lockato la tabella clienti.

**ME**: Lockato?

**TL**: Sì. L'ALTER TABLE ha lockato.

**ME**: E quindi?

**TL**: E quindi tutte le query che usano clienti aspettano.

**ME**: Aspettano?

**TL**: Sì. Aspettano che la migration finisca.

**ME**: E quando finisce?

**TL**: Quando aggiorna le foreign key.

**ME**: E quanto ci vuole?

**TL**: Non lo so. Ma la tabella log ha 84 milioni di righe.

**ME**: E quindi?

**TL**: E quindi potrebbe volerci... ore.

**ME**: Ore?

**TL**: Sì. Ore.

**ME**: E il sito?

**TL**: Il sito è down.

**ME**: Down?

**TL**: Sì. Down. Fino a quando la migration non finisce.

**ME**: E se la killiamo?

**TL**: Se la killiamo, la transazione va in rollback.

**ME**: Rollback?

**TL**: Sì. E il rollback impiega quanto la migration.

**ME**: Quindi?

**TL**: Quindi siamo fottuti.

Il TL mi ha guardato. Io guardavo i monitor. I monitor mostravano:
- Query in coda: 847
- Lock attivi: 12
- CPU: 98%
- Tempo: 6 minuti

E la migration continuava. E continuava. E continuava. E io non potevo fare nulla. Perché non c'era il kill switch. Non c'era il piano B. Non c'era... la salvezza. Amen.

---

**Venerdì - 15:47**

Il CTO ha chiamato. Il CTO non era contento. Il CTO non era mai contento. Ma questa volta era peggio.

**CTO**: Quindi mi stai dicendo che hai lockato il database?

**ME**: Sì.

**CTO**: Con una migration?

**ME**: Sì.

**CTO**: E il sito è down?

**ME**: Sì.

**CTO**: Da quanto?

**ME**: 24 minuti.

**CTO**: 24 minuti?

**ME**: Sì.

**CTO**: E quando finisce?

**ME**: Non lo so.

**CTO**: Non lo sai?

**ME**: No. La tabella log ha 84 milioni di righe.

**CTO**: 84 milioni?

**ME**: Sì.

**CTO**: E hai fatto una migration che tocca la tabella log?

**ME**: Dovevo aggiornare le foreign key.

**CTO**: Le foreign key?

**ME**: Sì. 12 tabelle referenziano clienti.

**CTO**: E non hai pensato che lockare 12 tabelle fosse un problema?

**ME**: Non ci ho pensato.

**CTO**: Non ci hai pensato?

**ME**: No.

**CTO**: E il backup?

**ME**: L'ho fatto.

**CTO**: E la tabella log?

**ME**: Non l'ho backuppata.

**CTO**: Non l'hai backuppata?

**ME**: No. Era troppo grande.

**CTO**: E quindi?

**ME**: E quindi se qualcosa va storto, la tabella log è persa.

**CTO**: Persa?

**ME**: Sì.

**CTO**: E sai cosa c'è nella tabella log?

**ME**: I log.

**CTO**: I log di cosa?

**ME**: Non lo so.

**CTO**: I log di TUTTO. Le transazioni. I pagamenti. Le attività dei clienti. Tutto quello che serve per l'audit. Per la compliance. Per le tasse. E tu non l'hai backuppata?

**ME**: Non ci ho pensato.

**CTO**: Non ci hai pensato?

**ME**: No.

**CTO**: E adesso?

**ME**: Adesso... aspetto.

**CTO**: Aspetti?

**ME**: Sì. Aspetto che la migration finisca.

**CTO**: E se non finisce?

**ME**: Finirà.

**CTO**: E se fallisce?

**ME**: Non fallirà.

**CTO**: E se va in rollback?

**ME**: Allora... siamo fottuti.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era la tabella log. Il nulla... che erano 84 milioni di righe. Non backuppate. Amen.

---

**Venerdì - 16:23**

È finita. La migration è finita. Ma non come speravo.

**TL**: La migration è finita.

**ME**: E?

**TL**: E ha fallito.

**ME**: Fallito?

**TL**: Sì. La constraint su log non si è potuta creare.

**ME**: E perché?

**TL**: Perché ci sono record orfani.

**ME**: Orfani?

**TL**: Sì. Record in log che referenziano clienti inesistenti.

**ME**: E quindi?

**TL**: E quindi la transazione è andata in rollback.

**ME**: Rollback?

**TL**: Sì. Rollback completo.

**ME**: E la tabella clienti?

**TL**: La tabella clienti è tornata `clienti`.

**ME**: E le foreign key?

**TL**: Le foreign key sono tornate come prima.

**ME**: E quindi?

**TL**: E quindi la migration non ha funzionato.

**ME**: E il sito?

**TL**: Il sito è tornato su.

**ME**: Tornato su?

**TL**: Sì. Dopo il rollback.

**ME**: E quanto è durato il rollback?

**TL**: 37 minuti.

**ME**: 37 minuti?

**TL**: Sì. 37 minuti di rollback.

**ME**: E il downtime totale?

**TL**: 1 ora e 6 minuti.

**ME**: 1 ora e 6 minuti?

**TL**: Sì. 66 minuti di downtime.

**ME**: E i clienti?

**TL**: I clienti non potevano accedere.

**ME**: E gli ordini?

**TL**: Gli ordini non potevano essere fatti.

**ME**: E le vendite?

**TL**: Le vendite sono perse.

**ME**: E il CEO?

**TL**: Il CEO ti cerca.

Il TL mi ha guardato. Io guardavo i log. I log mostravano:
- 15:17 - Migration started
- 15:23 - Lock acquired on clienti
- 15:23 - Lock acquired on ordini
- 15:23 - Lock acquired on indirizzi
- ...
- 15:47 - Lock acquired on log
- 16:10 - ERROR: could not create constraint, orphan records found
- 16:10 - ROLLBACK started
- 16:47 - ROLLBACK completed
- 16:47 - All locks released

E la migration era fallita. E il rollback era finito. E il sito era tornato su. Ma il danno era fatto. 66 minuti di downtime. E il CEO mi cercava. Amen.

---

**Venerdì - 17:00**

Il CEO ha chiamato. Il CEO non era contento. Il CEO non era mai contento. Ma questa volta era peggio.

**CEO**: Quindi mi stai dicendo che hai mandato down il sito per 66 minuti?

**ME**: Sì.

**CEO**: Con una migration?

**ME**: Sì.

**CEO**: Una migration che non ha funzionato?

**ME**: Sì.

**CEO**: E il risultato?

**ME**: Il risultato è che la tabella si chiama ancora `clienti`.

**CEO**: E le foreign key?

**ME**: Le foreign key sono come prima.

**CEO**: E quindi?

**ME**: E quindi non abbiamo fatto nulla.

**CEO**: Non avete fatto nulla?

**ME**: No. La migration è fallita.

**CEO**: E il downtime?

**ME**: Il downtime c'è stato.

**CEO**: E le vendite?

**ME**: Le vendite sono perse.

**CEO**: Quante?

**ME**: Non lo so. Forse €50.000.

**CEO**: €50.000?

**ME**: Sì. 66 minuti di downtime.

**CEO**: E i clienti?

**ME**: I clienti non potevano accedere.

**CEO**: E la compliance?

**ME**: La compliance?

**CEO**: Sì. La tabella log.

**ME**: La tabella log?

**CEO**: Sì. Quella che non hai backuppato.

**ME**: Non l'ho backuppata perché era troppo grande.

**CEO**: E se la migration avesse cancellato i dati?

**ME**: Non li ha cancellati.

**CEO**: Ma poteva?

**ME**: Poteva.

**CEO**: E non hai fatto il backup?

**ME**: Non ho avuto tempo.

**CEO**: Non hai avuto tempo?

**ME**: No. Il PM voleva per le 16.

**CEO**: E quindi hai rischiato 84 milioni di record?

**ME**: Non ci ho pensato.

**CEO**: Non ci hai pensato?

**ME**: No.

**CEO**: E sai cosa significa?

**ME**: Cosa?

**CEO**: Significa che non hai imparato nulla. Perché le migration vanno fatte con calma. Con backup. Con test. Con tempo. E tu non hai fatto nulla di tutto questo.

**ME**: Io...

**CEO**: E sai cosa farò?

**ME**: Cosa?

**CEO**: Ti farò scrivere 1.000 volte: "Non farò mai migration senza backup".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che era la migration. Fallita. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non farò mai migration senza backup.
Non farò mai migration senza backup.
Non farò mai migration senza backup.
...
(997 righe dopo)
...
Non farò mai migration senza backup.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più fatto una migration senza backup.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che le migration vanno fatte con backup.

**TL**: E cos'altro?

**ME**: Che le migration vanno testate con dati reali.

**TL**: E cos'altro?

**ME**: Che le migration vanno fatte di notte.

**TL**: E cos'altro?

**ME**: Che le migration non si fanno di venerdì.

**TL**: E cos'altro?

**ME**: Che le foreign key vanno controllate.

**TL**: E cos'altro?

**ME**: Che i lock vanno previsti.

**TL**: E cos'altro?

**ME**: Che il rollback è più lento della migration.

**TL**: E cos'altro?

**ME**: Che 84 milioni di righe sono tante.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che le migration non sono "solo SQL". Le migration sono operazioni critiche. Vanno pianificate. Vano testate. Vanno backuppate. Vano fatte con calma. E tu non hai fatto nulla di tutto questo. Hai fatto una migration di venerdì. Alle 15:17. Senza backup completo. Senza test con dati reali. Senza considerare i lock. E hai mandato down il sito per 66 minuti. E la migration è fallita. E non hai ottenuto nulla. E hai perso €50.000. E il CEO ti ha fatto scrivere 1.000 volte. E la prossima volta che fai una migration, pensa a oggi. Pensa a 66 minuti di downtime. Pensa a €50.000 persi. Pensa al CEO che ti fa scrivere 1.000 volte. E poi, fai il backup. Testa la migration. E falla di notte. Come si deve. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non farò mai migration senza backup". E sapevo che le avrei mantenute. Perché le migration non perdonano. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #MIGRATION-001: La Migration Che Ha Cancellato La Tabella

**Data incident**: Venerdì 26 giugno 2026, 15:17
**Autore migration**: ME
**Migration**: Rinomina tabella clienti → customers
**Tabelle coinvolte**: 12 (clienti, ordini, indirizzi, preferenze, sessioni, pagamenti, carrello, recensioni, wishlist, notifiche, log, coupon, ticket)
**Backup eseguito**: Parziale (esclusa tabella log)
**Backup tabella log**: NO (84 milioni di righe)
**Test con dati reali**: NO
**Test in produzione**: NO
**Orario esecuzione**: 15:17 (venerdì pomeriggio)
**Lock creati**: 12
**Durata lock**: 50 minuti
**Durata rollback**: 37 minuti
**Durata downtime**: 66 minuti
**Query in coda**: 847
**Clienti impattati**: ~12.000 (stimato)
**Vendite perse**: €50.000 (stimato)
**Record orfani trovati**: 2.847 (in tabella log)
**Migration completata**: NO
**Risultato**: ROLLBACK completo
**Punizione**: 1.000 volte "Non farò mai migration senza backup"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "Le migration non sono solo SQL."
**Reazione TL**: "Le migration vanno fatte con calma."
**Reazione PM**: "Ma doveva essere per le 16!"
**Lezione imparata**: MIGRATION = BACKUP + TEST + NOTTE + CALMA
**Probabilità che succeda di nuovo**: 47% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. Le migration vanno SEMPRE con backup completo.
2. Le migration vanno SEMPRE testate con dati reali.
3. Le migration vanno SEMPRE fatte di notte.
4. Le migration vanno SEMPRE fatte con calma.
5. Le migration NON vanno MAI fatte di venerdì.
6. Le migration NON vanno MAI fatte di pomeriggio.
7. Le foreign key vanno SEMPRE controllate.
8. I lock vanno SEMPRE previsti.
9. Il rollback è più lento della migration.
10. 1.000 volte a mano. Ricordalo.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che le migration vanno fatte con backup. E con test. E di notte. E con calma. E che 84 milioni di righe sono tante. E che i lock durano. E che il rollback è lento. E che 66 minuti di downtime costano €50.000. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che la migration è fallita. E che non hai ottenuto nulla. E tutto perché non hai fatto il backup. Non hai testato. Non hai aspettato. E hai fatto di venerdì. Alle 15:17. Amen."

**ME**: Sì. E la lezione più importante è questa: le migration sono operazioni critiche. Non sono "solo SQL". Non sono "solo una rinomina". Sono operazioni che toccano i dati. I dati che valgono milioni. I dati che valgono la tua carriera. E quando fai una migration senza backup, rischi tutto. Rischi i dati. Rischi il sito. Rischi la dignità. E quando rischi tutto senza motivo, perdi tutto. Per 66 minuti di downtime. Per €50.000 persi. Per una migration che non ha funzionato. E tutto perché non hai fatto il backup. Non hai testato. Non hai aspettato. E hai fatto di venerdì. Alle 15:17. E il CEO ti ha fatto scrivere 1.000 volte. E tu scrivi. E scrivi. E scrivi. E impari. Perché le migration non perdonano. E il CEO nemmeno. Amen.

---

## Il costo della migration senza backup

| Voce | Valore |
|------|--------|
| Migration | Rinomina clienti → customers |
| Tabelle coinvolte | 12 |
| Backup completo | NO |
| Backup tabella log | NO (84M righe) |
| Test con dati reali | NO |
| Orario | 15:17 (venerdì) |
| Lock creati | 12 |
| Durata lock | 50 minuti |
| Durata rollback | 37 minuti |
| Durata downtime | 66 minuti |
| Query in coda | 847 |
| Clienti impattati | ~12.000 |
| Vendite perse | €50.000 |
| Migration completata | NO |
| Record orfani | 2.847 |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Le migration non sono solo SQL" |
| Reazione TL | "Le migration vanno fatte con calma" |
| Reazione PM | "Doveva essere per le 16!" |
| Lezione imparata | BACKUP + TEST + NOTTE + CALMA |
| **Totale** | **66 min downtime + €50.000 persi + 1.000 righe a mano + migration fallita** |

**Morale**: Le migration vanno fatte con backup. Con test. Di notte. Con calma. Mai di venerdì. Mai di pomeriggio. Mai senza pensare. Perché quando una migration va storto, va storto tutto. Il sito va down. I dati si perdono. Le vendite spariscono. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché le migration non perdonano. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](70-il-select-asterisco-che-ha-ucciso-il-database.md)]**
