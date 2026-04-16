# La Migration Che Ha Droppato La Tabella Users

**Data**: 08/08/2026

**[Home](../index.md) | [Precedente](76-il-kubernetes-deployment-che-ha-scalato-a-100-repliche.md) | [Prossima](78-il-cron-job-che-girava-ogni-minuto.md)]**

---

C'è una verità nel mondo dei database. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `DROP TABLE` pensando "tanto è in una migration". Quella verità è: **"Una migration è come un intervento chirurgico. Puoi curare il paziente. Puoi anche ucciderlo. Dipende da dove metti le mani. E se metti le mani sulla tabella sbagliata, il paziente muore. E il paziente è il database. E il database ha 847.000 utenti. E tu hai scritto DROP TABLE users. E hai premuto invio. E la tabella è sparita. E gli utenti sono spariti. E le password sono sparite. E i login sono spariti. E il sito è morto. E tu sei morto. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"Le migration non perdonano. Non hanno un tasto 'annulla'. Non hanno un cestino. Hanno solo SQL. E SQL è potere. E il potere va usato con saggezza. Ma tu non hai saggezza. Hai fretta. E la fretta uccide. Le tabelle. I dati. La carriera. Amen"**. E questa è la storia di chi ha scritto quella migration. Di chi l'ha eseguita. Di chi ha guardato la tabella users sparire. Una riga alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo rinominare la tabella users.

**ME**: Rinominare?

**PM**: Sì. In "customers".

**ME**: Customers?

**PM**: Sì. È più business-friendly.

**ME**: Business-friendly?

**PM**: Sì. Il CEO vuole.

**ME**: Il CEO vuole rinominare la tabella?

**PM**: Sì. Dice che "users" è troppo tecnico.

**ME**: E "customers" è meglio?

**PM**: Sì. È più orientato al business.

**ME**: E cosa comporta?

**PM**: Non lo so. È solo una rinominazione.

**ME**: Solo una rinominazione?

**PM**: Sì. Cambi il nome. Tutto qui.

**ME**: E il codice che usa la tabella?

**PM**: Lo aggiorni.

**ME**: E le foreign key?

**PM**: Le aggiorni.

**ME**: E gli indici?

**PM**: Li aggiorni.

**ME**: E le viste?

**PM**: Le aggiorni.

**ME**: E le stored procedure?

**PM**: Le aggiorni.

**ME**: E quanto ci vuole?

**PM**: Non lo so. Un giorno?

**ME**: Un giorno?

**PM**: Sì. È solo una rinominazione.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con le migration. Il nulla che era la mia attenzione ai dettagli. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Piano**

Il martedì, ho pianificato. Ho pianificato la migration. Ho pianificato... il nulla.

**ME**: Ho guardato il database.

**TL**: E?

**ME**: La tabella users ha 847.000 righe.

**TL**: 847.000?

**ME**: Sì.

**TL**: E le foreign key?

**ME**: 23 tabelle con foreign key verso users.

**TL**: 23?

**ME**: Sì.

**TL**: E le viste?

**ME**: 7 viste che usano users.

**TL**: E le stored procedure?

**ME**: 12 stored procedure che usano users.

**TL**: E il codice applicativo?

**ME**: 347 file che usano la tabella users.

**TL**: 347 FILE?

**ME**: Sì.

**TL**: E il PM dice che è "solo una rinominazione"?

**ME**: Sì.

**TL**: E quanto ci vuole per aggiornare tutto?

**ME**: Non lo so. Forse 2 settimane.

**TL**: 2 SETTIMANE?

**ME**: Sì. Devo aggiornare la tabella. Le foreign key. Le viste. Le stored procedure. Il codice. I test. Tutto.

**TL**: E il PM?

**ME**: Il PM vuole per venerdì.

**TL**: VENERDÌ?

**ME**: Sì.

**TL**: E cosa gli dici?

**ME**: Non lo so.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
SELECT COUNT(*) FROM users;
 count  
--------
 847231
(1 row)

SELECT COUNT(*) FROM information_schema.table_constraints 
WHERE constraint_type = 'FOREIGN KEY' AND table_name LIKE '%user%';
 count 
-------
    23
(1 row)
```

E la tabella users era lì. Con 847.000 utenti. E 23 foreign key. E il PM voleva rinominarla. Per "business-friendly". Amen.

---

**Mercoledì - La Migration**

Il mercoledì, ho scritto. Ho scritto la migration. Ho scritto... il disastro.

**ME**: Ho scritto la migration.

**TL**: Fammi vedere.

```sql
-- Migration: Rename users to customers
-- Author: ME
-- Date: 2026-08-05

BEGIN;

-- Drop the old table
DROP TABLE users;

-- Create the new table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Copy data from old table
-- Wait, I dropped the old table already...

COMMIT;
```

**TL**: ...

**ME**: Cosa?

**TL**: HAI SCRITTO DROP TABLE PRIMA DI COPIARE I DATI?

**ME**: Sì.

**TL**: E DOVE COPI I DATI?

**ME**: Non li copio.

**TL**: NON LI COPI?

**ME**: No. Ho droppato la tabella.

**TL**: E I DATI?

**ME**: I dati... sono spariti.

**TL**: SPARITI?

**ME**: Sì. DROP TABLE cancella tutto.

**TL**: E TE NE SEI ACCORTO ORA?

**ME**: Sì. Guardando il codice.

**TL**: E SE AVEVI ESEGUITO?

**ME**: Avrei cancellato 847.000 utenti.

**TL**: E IL BACKUP?

**ME**: Non c'è.

**TL**: NON C'È?

**ME**: No. Non ho fatto il backup.

**TL**: E SE AVEVI ESEGUITO?

**ME**: Sarei stato fottuto.

**TL**: E ORA?

**ME**: Ora riscrivo la migration.

**TL**: RISCRIVILA. E METTI IL BACKUP.

Il TL mi ha guardato. Io guardavo la migration. La migration aveva DROP TABLE prima di copiare i dati. E se l'avessi eseguita... 847.000 utenti sarebbero spariti. Amen.

---

**Giovedì - La Migration Corretta**

Il giovedì, ho corretto. Ho corretto la migration. Ho corretto... quasi tutto.

**ME**: Ho corretto la migration.

**TL**: Fammi vedere.

```sql
-- Migration: Rename users to customers
-- Author: ME
-- Date: 2026-08-06

BEGIN;

-- Backup the old table
CREATE TABLE users_backup AS SELECT * FROM users;

-- Create the new table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Copy data from old table
INSERT INTO customers SELECT * FROM users;

-- Drop the old table
DROP TABLE users;

COMMIT;
```

**TL**: Meglio.

**ME**: Sì.

**TL**: Ma c'è un problema.

**ME**: Quale?

**TL**: Hai scritto DROP TABLE users alla fine.

**ME**: Sì. Dopo aver copiato i dati.

**TL**: E se la transazione fallisce?

**ME**: Fallisce?

**TL**: Sì. Se INSERT INTO customers fallisce?

**ME**: Allora... la transazione fa rollback.

**TL**: E cosa succede?

**ME**: Niente. La tabella users resta.

**TL**: E users_backup?

**ME**: users_backup resta.

**TL**: E se la transazione va a buon fine?

**ME**: Allora users viene droppata.

**TL**: E se qualcuno usa la tabella mentre la migration gira?

**ME**: Non ci avevo pensato.

**TL**: E se la migration impiega 10 minuti?

**ME**: 10 minuti?

**TL**: Sì. 847.000 righe. Con gli indici. E le foreign key.

**ME**: E quindi?

**TL**: E quindi 10 minuti di lock sulla tabella users.

**TL**: E il sito?

**ME**: Il sito non può accedere alla tabella.

**TL**: E quindi?

**ME**: E quindi 10 minuti di downtime.

**TL**: E il PM?

**ME**: Il PM vuole zero downtime.

**TL**: E come fai?

**ME**: Non lo so.

Il TL mi ha guardato. Io guardavo la migration. La migration era corretta. Ma aveva un problema. 10 minuti di lock. 10 minuti di downtime. E il PM voleva zero downtime. Amen.

---

**Venerdì - 09:00**

Il venerdì, ho deciso. Ho deciso di fare la migration. Ho deciso... di sbagliare.

**ME**: Ho deciso.

**TL**: Deciso cosa?

**ME**: Faccio la migration.

**TL**: Con 10 minuti di downtime?

**ME**: Sì.

**TL**: E il PM?

**ME**: Gli dico che è necessario.

**TL**: E se dice no?

**ME**: Allora aspetto.

**TL**: E quando?

**ME**: Nel weekend.

**TL**: Nel weekend?

**ME**: Sì. Quando c'è meno traffico.

**TL**: E chi la fa?

**ME**: La faccio io.

**TL**: Tu?

**ME**: Sì.

**TL**: E se qualcosa va storto?

**ME**: Non va storto.

**TL**: E SE VA STORTO?

**ME**: Ho il backup.

**TL**: E se il backup non funziona?

**ME**: Funziona.

**TL**: E se no?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale aspettava. E io sapevo. Sapevo che era sbagliato. Sapevo che era pericoloso. Sapevo che... il PM premeva. E io non avevo tempo. Amen.

---

**Venerdì - 14:00**

Il PM ha chiamato. Il PM voleva. E io... ho ceduto.

**PM**: A che punto siamo?

**ME**: Ho la migration pronta.

**PM**: E quando la esegui?

**ME**: Nel weekend.

**PM**: Nel WEEKEND?

**ME**: Sì. Per evitare downtime.

**PM**: Ma il CEO vuole per oggi!

**ME**: Oggi?

**PM**: Sì. Oggi pomeriggio.

**ME**: Ma ci sono 10 minuti di downtime.

**PM**: 10 minuti?

**ME**: Sì. Per la migration.

**PM**: E non puoi farla senza downtime?

**ME**: Non con questa migration.

**PM**: E con un'altra migration?

**ME**: Ci vorrebbe più tempo.

**PM**: QUANTO tempo?

**ME**: Una settimana. Forse due.

**PM**: Due SETTIMANE?

**ME**: Sì. Per fare una migration senza downtime.

**PM**: Ma il CEO vuole oggi!

**ME**: E se facciamo 10 minuti di downtime?

**PM**: Il CEO non vuole downtime.

**ME**: E allora non posso.

**PM**: E se la fai SENZA il backup?

**ME**: Senza backup?

**PM**: Sì. Così è più veloce.

**ME**: Ma è pericoloso.

**PM**: E QUANTO è pericoloso?

**ME**: Se qualcosa va storto, perdiamo tutto.

**PM**: Ma non va storto.

**ME**: E se va storto?

**PM**: Non va storto. Fidati.

**ME**: ...

**PM**: Fallo. Senza backup. Ora.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia prudenza. Il nulla... che era il PM che mi ordinava di fare la migration senza backup. Amen.

---

**Venerdì - 14:23**

Ho fatto. Ho fatto quello che non dovevo. Ho fatto... la migration senza backup.

**TERMINALE**:
```
psql -U admin -d production

production=# BEGIN;
BEGIN
production=# 
production=# -- Create the new table
production=# CREATE TABLE customers (
production(#     id SERIAL PRIMARY KEY,
production(#     email VARCHAR(255) NOT NULL UNIQUE,
production(#     password_hash VARCHAR(255) NOT NULL,
production(#     created_at TIMESTAMP DEFAULT NOW(),
production(#     updated_at TIMESTAMP DEFAULT NOW()
production(# );
CREATE TABLE
production=# 
production=# -- Copy data from old table
production=# INSERT INTO customers (id, email, password_hash, created_at, updated_at)
production-# SELECT id, email, password_hash, created_at, updated_at FROM users;
INSERT 0 847231
production=# 
production=# -- Drop the old table
production=# DROP TABLE users;
DROP TABLE
production=# 
production=# COMMIT;
COMMIT
production=#
```

**ME**: Fatto.

**TL**: COSA HAI FATTO?

**ME**: La migration.

**TL**: SENZA BACKUP?

**ME**: Sì.

**TL**: E HAI FATTO DROP TABLE users?

**ME**: Sì.

**TL**: E I DATI?

**ME**: Li ho copiati in customers.

**TL**: E SE LA COPIA ERA INCOMPLETA?

**ME**: Era completa. 847.231 righe.

**TL**: E SE AVEVI SBAGLIATO QUALCOSA?

**ME**: Non ho sbagliato.

**TL**: E SE AVEVI SBAGLIATO?

**ME**: Allora... ero fottuto.

**TL**: E ORA?

**ME**: Ora funziona tutto.

**TL**: E IL CODICE?

**ME**: Il codice?

**TL**: SÌ. IL CODICE CHE USA LA TABELLA users!

**ME**: Oh cazzo.

**TL**: COSA?

**ME**: Il codice usa ancora "users".

**TL**: E LA TABELLA users NON ESISTE PIÙ!

**ME**: ...

**TL**: E QUINDI?

**ME**: E quindi il codice è rotto.

**TL**: ROTTO?

**ME**: Sì. Tutte le query su "users" falliscono.

**TL**: E QUANTE SONO?

**ME**: 347 file.

**TL**: 347 FILE?

**ME**: Sì.

**TL**: E IL SITO?

**ME**: Il sito è down.

**TL**: DOWN?

**ME**: Sì. Non può accedere alla tabella users.

**TL**: E I LOGIN?

**ME**: I login non funzionano.

**TL**: E LE REGISTRAZIONI?

**ME**: Le registrazioni non funzionano.

**TL**: E TUTTO IL SISTEMA?

**ME**: Tutto il sistema è down.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era il mio codice. Il nulla che era la tabella users. Il nulla... che erano 847.000 utenti. Senza backup. E il codice rotto. Amen.

---

**Venerdì - 14:47**

Il sito. Il sito che non funzionava. Il sito... che mostrava errori.

**TERMINALE**:
```
tail -f /var/log/nginx/error.log

2026-08-07 14:47:23 ERROR: relation "users" does not exist at character 15
2026-08-07 14:47:23 STATEMENT: SELECT * FROM users WHERE email = $1
2026-08-07 14:47:24 ERROR: relation "users" does not exist at character 15
2026-08-07 14:47:24 STATEMENT: SELECT * FROM users WHERE id = $1
2026-08-07 14:47:25 ERROR: relation "users" does not exist at character 15
2026-08-07 14:47:25 STATEMENT: INSERT INTO users (email, password_hash) VALUES ($1, $2)
2026-08-07 14:47:26 ERROR: relation "users" does not exist at character 15
2026-08-07 14:47:26 STATEMENT: UPDATE users SET last_login = NOW() WHERE id = $1
...
```

**ME**: Il sito è down.

**TL**: LO SO.

**ME**: Tutte le query falliscono.

**TL**: LO SO.

**ME**: 847.000 utenti non possono fare login.

**TL**: LO SO.

**ME**: E non ho backup.

**TL**: LO SO.

**ME**: E il PM mi cerca.

**TL**: LO SO.

**ME**: E il CEO mi cerca.

**TL**: LO SO.

**ME**: E sono fottuto.

**TL**: LO SO.

**ME**: E cosa faccio?

**TL**: Fixi.

**ME**: Fixi?

**TL**: Sì. Fixi il codice. Aggiorni tutte le query da "users" a "customers".

**ME**: E quanto ci vuole?

**TL**: Non lo so. Forse 4 ore.

**ME**: 4 ore?

**TL**: Sì. 347 file.

**ME**: E il sito?

**TL**: Il sito resta down.

**ME**: Down per 4 ore?

**TL**: Sì.

**ME**: E i clienti?

**TL**: I clienti non possono fare login.

**ME**: E le vendite?

**TL**: Le vendite sono perse.

**ME**: E quanto?

**TL**: Non lo so. Forse €50.000.

**ME**: €50.000?

**TL**: Sì. 4 ore di downtime.

**ME**: E il CEO?

**TL**: Il CEO ti cerca.

Il TL mi ha guardato. Io guardavo i log. I log mostravano errori. Errori su errori. "relation 'users' does not exist". E io sapevo. Sapevo che era colpa mia. Sapevo che avevo droppato la tabella. Sapevo che non avevo backup. Sapevo che ero fottuto. Amen.

---

**Venerdì - 19:00**

Ho fixato. Ho fixato tutto. Ho fixato... in 4 ore.

**ME**: Ok. Ho fixato tutto.

**TL**: Tutto?

**ME**: Sì. 347 file.

**TL**: E le query?

**ME**: Tutte aggiornate a "customers".

**TL**: E i test?

**ME**: Passano.

**TL**: Tutti?

**ME**: Sì. 847 test.

**TL**: E il sito?

**ME**: Il sito è up.

**TL**: E i login?

**ME**: I login funzionano.

**TL**: E le registrazioni?

**ME**: Le registrazioni funzionano.

**TL**: E quanto ci hai messo?

**ME**: 4 ore e 23 minuti.

**TL**: E il downtime?

**ME**: 4 ore e 23 minuti.

**TL**: E le vendite?

**ME**: €47.832 perse.

**TL**: €47.832?

**ME**: Sì.

**TL**: E il CEO?

**ME**: Il CEO mi cerca.

**TL**: E sai cosa farà?

**ME**: Cosa?

**TL**: Ti farà scrivere 1.000 volte.

**ME**: 1.000 volte?

**TL**: Sì. "Non farò mai DROP TABLE senza backup".

**ME**: A mano?

**TL**: Sì. A mano. Su carta.

**ME**: Su carta?

**TL**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

Il TL mi ha guardato. Io guardavo il codice. Il codice funzionava. I test passavano. Il sito era up. Ma 4 ore di downtime. €47.832 persi. E il CEO mi cercava. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non farò mai DROP TABLE senza backup.
Non farò mai DROP TABLE senza backup.
Non farò mai DROP TABLE senza backup.
...
(997 righe dopo)
...
Non farò mai DROP TABLE senza backup.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più fatto DROP TABLE senza backup.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che DROP TABLE va fatto con backup.

**TL**: E cos'altro?

**ME**: Che le migration vanno testate.

**TL**: E cos'altro?

**ME**: Che il codice va aggiornato prima della migration.

**TL**: E cos'altro?

**ME**: Che 847.000 utenti sono tanti.

**TL**: E cos'altro?

**ME**: Che 347 file sono tanti.

**TL**: E cos'altro?

**ME**: Che 4 ore di downtime costano €47.832.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che le migration non sono "solo SQL". Le migration sono interventi chirurgici sul cuore del sistema. Quando fai DROP TABLE, stai rimuovendo un organo. E se non hai un backup, non hai un trapianto. E il paziente muore. E il paziente è il database. E il database ha 847.000 utenti. E tu hai rimosso l'organo senza avere un ricambio. E per 4 ore, il paziente è stato in rianimazione. E hai perso €47.832. E il CEO ti ha fatto scrivere 1.000 volte. E la prossima volta che fai una migration, pensa a oggi. Pensa a 847.000 utenti. Pensa a 4 ore di downtime. Pensa a €47.832 persi. E poi, fai il backup. Testa la migration. Aggiorna il codice. E fallo con calma. Come si deve. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non farò mai DROP TABLE senza backup". E sapevo che le avrei mantenute. Perché le migration non perdonano. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #DB-001: La Migration Che Ha Droppato La Tabella Users

**Data incident**: Venerdì 7 agosto 2026, 14:23
**Autore**: ME
**Comando eseguito**: DROP TABLE users (in una migration)
**Tabella droppata**: users
**Righe nella tabella**: 847.231
**Backup eseguito**: NO
**Codice aggiornato**: NO (prima della migration)
**Foreign key aggiornate**: NO
**Viste aggiornate**: NO
**Stored procedure aggiornate**: NO
**File da aggiornare**: 347
**Tempo per aggiornare**: 4 ore 23 minuti
**Downtime**: 4 ore 23 minuti
**Login falliti**: 12.847
**Registrazioni fallite**: 847
**Vendite perse**: €47.832
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "Le migration sono interventi chirurgici."
**Reazione TL**: "Hai rimosso l'organo senza ricambio."
**Reazione PM**: "Ma il CEO voleva oggi!"
**Lezione imparata**: MIGRATION = BACKUP + TEST + CODICE AGGIORNATO + CALMA
**Probabilità che succeda di nuovo**: 23% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. OGNI migration va fatta con backup.
2. OGNI migration va testata in staging.
3. IL CODICE va aggiornato PRIMA della migration.
4. LE FOREIGN KEY vanno aggiornate PRIMA della migration.
5. LE VISTE vanno aggiornate PRIMA della migration.
6. LE STORED PROCEDURE vanno aggiornate PRIMA della migration.
7. DROP TABLE è PERICOLOSO. Usare con cautela.
8. 847.000 utenti sono TANTI. Non dropparli senza backup.
9. 4 ore di downtime costano €47.832.
10. 1.000 volte a mano. Ricordalo.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che le migration vanno fatte con backup. E con test. E con il codice aggiornato. E con calma. E che 847.000 utenti sono tanti. E che 347 file sono tanti. E che 4 ore di downtime costano €47.832. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che non hai fatto il backup. E che non hai aggiornato il codice. E che hai eseguito la migration. Senza pensare. E tutto perché il PM voleva. E il PM non sa cosa è una migration. Il PM sa solo 'rinominare' e 'business-friendly'. Ma rinominare senza pensare è come fare un intervento chirurgico senza anestesia. E tu l'hai fatto. E il paziente è quasi morto. E hai impiegato 4 ore per rianimarlo. E hai perso €47.832. E il CEO ti ha fatto scrivere 1.000 volte. E tu scrivi. E impari. Perché le migration non perdonano. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: le migration sono interventi chirurgici. Quando fai DROP TABLE, rimuovi un organo. E se non hai un backup, non hai un trapianto. E il paziente muore. E il paziente è il database. E il database ha 847.000 utenti. E tu hai rimosso l'organo. Senza backup. E per 4 ore, il paziente è stato in rianimazione. E hai perso €47.832. E il CEO ti ha fatto scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché le migration non perdonano. E il CEO nemmeno. Amen.

---

## Il costo della migration senza backup

| Voce | Valore |
|------|--------|
| Comando | DROP TABLE users |
| Righe droppate | 847.231 |
| Backup | NO |
| Codice aggiornato | NO |
| File da aggiornare | 347 |
| Tempo per aggiornare | 4 ore 23 min |
| Downtime | 4 ore 23 min |
| Login falliti | 12.847 |
| Registrazioni fallite | 847 |
| Vendite perse | €47.832 |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Interventi chirurgici" |
| Reazione TL | "Organo senza ricambio" |
| Reazione PM | "Il CEO voleva oggi!" |
| Lezione imparata | BACKUP + TEST + CODICE + CALMA |
| **Totale** | **847.231 righe + 347 file + 4 ore downtime + €47.832 persi + 1.000 righe a mano** |

**Morale**: Le migration vanno fatte con backup. Con test. Con il codice aggiornato. Con calma. Mai senza pensare. Mai perché "il PM vuole". Perché quando una migration va storta, va storto tutto. La tabella sparisce. Il codice si rompe. Il sito va down. Le vendite spariscono. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché le migration non perdonano. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](76-il-kubernetes-deployment-che-ha-scalato-a-100-repliche.md)]**
