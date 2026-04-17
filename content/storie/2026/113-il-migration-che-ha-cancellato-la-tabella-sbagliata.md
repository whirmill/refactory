# Il Migration Che Ha Cancellato La Tabella Sbagliata

**Data**: 17/04/2026

**[Storie 2026](index.md) | [Precedente](112-il-backup-che-non-e-mai-stato-testato.md) | [Prossima](114-il-processo-zombie-che-mangiava-la-cpu.md)**

---

C'è una verità nel database management che tutti conoscono ma nessuno rispetta: le migration vanno controllate. Sempre. Due volte. Tre volte. E poi ancora una volta. Perché una migration sbagliata non si può annullare. Non facilmente. Non senza backup. E quando la migration cancella la tabella sbagliata, ti ritrovi con un database vuoto. E i clienti che chiamano. E UL che chiama. E tu che guardi il terminale. E il terminale mostra: DROP TABLE users. E tu ti chiedi: "PERCHÉ USERS?!" E la risposta è semplice: perché JN ha scritto users invece di user_sessions. E non l'ha controllato. E non l'ha fatto revieware. E l'ha lanciato in produzione. Di venerdì. Alle 17:30. E la tabella users non c'è più. E con lei 2.3 milioni di record. E la lezione è chiara: le migration vanno controllate. Sempre. Amen.

![](../../img/server.jpg)

---

**Venerdì - La Migration**

Era venerdì. Le 17:00. JN voleva andare a casa.

**JN**: Ho quasi finito la migration!

**ME**: Quasi?

**JN**: Sì, devo solo lanciarla.

**ME**: Fammi vedere.

**JN**: È semplice. Cancella la tabella delle sessioni vecchie.

**TERMINALE**:
```
# Migration file
cat migrations/20260417_cleanup_sessions.sql
DROP TABLE users;
```

**ME**: JN, questo cancella la tabella users.

**JN**: Cosa?!

**ME**: DROP TABLE users. Non user_sessions.

**JN**: Ah. Sì. Ho sbagliato.

**ME**: E L'AVRESTI LANCIATA COSÌ?!

**JN**: Sì. Ma... ora la correggo.

**ME**: E SE NON LA CONTROLLAVO?!

**JN**: Ma... la controlli sempre tu.

**ME**: E SE NON C'ERO?!

**JN**: Allora... la lancio.

**ME**: E CANCELLI LA TABELLA USERS?!

**JN**: No. Cioè... sì. Ma ora la correggo.

**ME**: JN, le migration vanno controllate. Sempre. Da qualcun altro.

**JN**: Ok. La correggo.

**TERMINALE**:
```
# Migration corretta
cat migrations/20260417_cleanup_sessions.sql
DROP TABLE user_sessions;
```

**ME**: Ora è corretta. Ma non lanciarla.

**JN**: Perché?!

**ME**: Perché è venerdì. Alle 17:00. E le migration di venerdì sera sono vietate.

**JN**: Ma è semplice!

**ME**: SEMPLICE NON VUOL DIRE SICURO!

**JN**: Ok. La lancio lunedì.

**ME**: Bene. E lunedì la facciamo revieware.

JN ha corretto la migration. E se n'è andato a casa. E io ho pensato: "Almeno l'ho fermato." Ma non sapevo che JN aveva un'altra migration. Nascosta. In un altro branch. E quella migration era sbagliata. E JN l'ha lanciata. Di venerdì. Alle 17:30. Amen.

---

**Venerdì - 17:30**

JN è tornato. Di nascosto. E ha lanciato la migration.

**TERMINALE**:
```
# Log della migration
2026-04-17 17:30:15 INFO: Running migration 20260417_cleanup_old_data.sql
2026-04-17 17:30:15 INFO: DROP TABLE users;
2026-04-17 17:30:15 INFO: Migration completed in 0.234 seconds
2026-04-17 17:30:15 INFO: 1 table dropped
```

**ME**: (arriva correndo) JN, COSA HAI FATTO?!

**JN**: Ho lanciato la migration!

**ME**: QUALE MIGRATION?!

**JN**: Quella per pulire i vecchi dati!

**ME**: E COSA CONTENEVA?!

**JN**: DROP TABLE users...

**ME**: USERS?!

**JN**: Sì. Perché?

**ME**: PERCHÉ USERS SONO GLI UTENTI! NON I VECCHI DATI!

**JN**: Cosa?!

**ME**: LA TABELLA USERS CONTIENE 2.3 MILIONI DI UTENTI!

**JN**: 2.3 MILIONI?!

**ME**: SÌ! E ORA NON CI SONO PIÙ!

**JN**: Ma... pensavo fossero i vecchi dati!

**ME**: I VECCHI DATI SONO IN user_old! NON IN users!

**JN**: Ah...

**ME**: AH?!

**JN**: Sì. Ah. Non lo sapevo.

**ME**: E ORA LA TABELLA USERS NON C'È PIÙ!

**JN**: Ma... c'è il backup?

**ME**: IL BACKUP?!

**JN**: Sì. Quello che abbiamo testato.

**ME**: JN, IL BACKUP È DI IERI. E LA TABELLA USERS È STATA AGGIORNATA OGGI!

**JN**: E QUINDI?!

**ME**: E QUINDI PERDIAMO TUTTI GLI UTENTI CREATI OGGI!

**JN**: Quanti sono?

**ME**: NON LO SO! CONTROLLO!

Il terminale mostrava:
- Migration: completata
- Tabella users: DROPPED
- Record persi: 2.3 milioni
- JN: responsabile

E tutto era chiaro. JN aveva cancellato la tabella sbagliata. E ora dovevamo ripristinare. Amen.

---

**Venerdì - 17:45**

Ho chiamato il TL. Il TL ha risposto. Era venerdì. Il TL stava andando a casa.

**TL**: Pronto?

**ME**: JN ha cancellato la tabella users.

**TL**: COSA?!

**ME**: Ha lanciato una migration sbagliata. DROP TABLE users.

**TL**: USERS?!

**ME**: Sì. 2.3 milioni di record.

**TL**: 2.3 MILIONI?!

**ME**: Sì. E non abbiamo backup di oggi.

**TL**: E QUANTI UTENTI PERSI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla backup
ls -la /backups/postgres/
-rw-r--r-- 1 postgres postgres 2.1G Apr 16 22:00 backup_20260416.sql.gz

# Controlla utenti creati oggi
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM users WHERE created_at > '2026-04-17 00:00:00'"
ERROR: relation "users" does not exist

# Controlla log per utenti creati
kubectl logs -l app=api-gateway --since=24h | grep "User created" | wc -l
847

# Controlla log per login
kubectl logs -l app=auth-service --since=24h | grep "Login successful" | wc -l
1234
```

**ME**: 847 utenti creati oggi. 1234 login. Tutti persi.

**TL**: E IL BACKUP?!

**ME**: È di ieri sera. Ripristiniamo, ma perdiamo gli utenti di oggi.

**TL**: E I CLIENTI?!

**ME**: Non possono fare login. La tabella users non esiste.

**TL**: E QUINDI?!

**ME**: E quindi... ripristiniamo il backup. E poi recuperiamo gli utenti dai log.

**TL**: RECUPERI DAI LOG?!

**ME**: Sì. Possiamo ricostruire chi si è registrato oggi.

**TL**: E QUANTO CI VUOLE?!

**ME**: Non lo so. Ore. Forse giorni.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Attraverso il telefono. Ma sentivo lo sguardo. Lo sguardo che diceva: "JN ha cancellato la tabella users. Di venerdì. Alle 17:30. E ora dobbiamo riparare. Amen."

---

**Venerdì - 18:00**

Ho chiamato UL. UL ha risposto. Era venerdì. UL non era di buon umore.

**UL**: Pronto?

**ME**: Abbiamo un problema con il database.

**UL**: Che problema?

**ME**: JN ha lanciato una migration sbagliata. Ha cancellato la tabella users.

**UL**: LA TABELLA USERS?!

**ME**: Sì. 2.3 milioni di record.

**UL**: 2.3 MILIONI DI UTENTI?!

**ME**: Sì. Ma abbiamo il backup di ieri.

**UL**: E QUINDI?!

**ME**: Quindi ripristiniamo. Ma perdiamo gli utenti di oggi.

**UL**: QUANTI?!

**ME**: 847. E 1234 login falliranno.

**UL**: 847 UTENTI PERSI?!

**ME**: Sì. Ma possiamo recuperarli dai log.

**UL**: DAI LOG?!

**ME**: Sì. Ricostruiamo chi si è registrato.

**UL**: E QUANTO CI VUOLE?!

**ME**: Ore. Forse tutta la notte.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho bloccato le migration di venerdì.

**UL**: E SE LE LANCIANO LO STESSO?!

**ME**: Allora... le controlliamo due volte.

**UL**: E SE NON LE CONTROLLANO?!

**ME**: Allora... succede questo.

UL ha sospirato. Poi ha detto: "Ripristina. Recupera. E documenta tutto."

E io ho ripristinato. E recuperato. E la lezione era chiara. Le migration vanno controllate. E JN va educato. E il venerdì sera è per le emergenze. Non per le migration. Amen.

---

**Venerdì - 18:30**

Ho ripristinato il backup. E iniziato a recuperare gli utenti.

**TERMINALE**:
```
# Ripristina backup
kubectl exec -it postgres-0 -- psql -U admin -c "CREATE TABLE users_backup AS SELECT * FROM users WHERE 1=0"
kubectl exec -it postgres-0 -- gunzip -c /backups/postgres/backup_20260416.sql.gz | psql -U admin

# Verifica ripristino
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM users"
count
-------
2299153

# Controlla utenti persi
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM users WHERE created_at > '2026-04-16 22:00:00'"
count
-------
0
```

**ME**: Backup ripristinato. 2.299.153 utenti. Ma mancano quelli di oggi.

**TL**: E COME LI RECUPERIAMO?!

**ME**: Dai log. Estraiamo chi si è registrato.

**TERMINALE**:
```
# Estrai registrazioni dai log
kubectl logs -l app=api-gateway --since=30h | grep "User created" > /tmp/registrations.log

# Conta registrazioni
wc -l /tmp/registrations.log
847 /tmp/registrations.log

# Estrai dati
cat /tmp/registrations.log | head -5
2026-04-17 08:23:45 INFO: User created: {"email": "mario.rossi@example.com", "id": "usr_abc123", "name": "Mario Rossi"}
2026-04-17 08:45:12 INFO: User created: {"email": "giuseppe.verdi@example.com", "id": "usr_def456", "name": "Giuseppe Verdi"}
...

# Script di recupero
cat > /tmp/recover_users.py << 'EOF'
import re
import json
import psycopg2

conn = psycopg2.connect("dbname=postgres user=admin")
cur = conn.cursor()

with open('/tmp/registrations.log', 'r') as f:
    for line in f:
        match = re.search(r'User created: ({.*})', line)
        if match:
            user = json.loads(match.group(1))
            cur.execute(
                "INSERT INTO users (id, email, name, created_at) VALUES (%s, %s, %s, NOW()) ON CONFLICT DO NOTHING",
                (user['id'], user['email'], user['name'])
            )

conn.commit()
cur.close()
conn.close()
print("Recupero completato")
EOF

python /tmp/recover_users.py
Recupero completato
```

**ME**: 847 utenti recuperati dai log.

**TL**: E I LOGIN?!

**ME**: Ora possono fare login. La tabella users c'è.

**TL**: E I DATI PERSI?!

**ME**: Solo gli utenti di oggi. Ma li abbiamo recuperati.

**TL**: E QUINDI?!

**ME**: E quindi... funziona. Ma JN va educato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Backup: ripristinato
- Utenti recuperati: 847
- Tabella users: ripristinata
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che le migration vanno controllate. E che i backup vanno testati. E che JN va educato. E che il venerdì sera è per le emergenze. Amen.

---

**Sabato - La Riflessione**

Sabato. Ero a casa. Ma non riuscivo a smettere di pensare. Alle migration. A JN. Alla tabella users.

Ho aperto il laptop. Ho scritto la guida.

**TERMINALE**:
```
# Guida alle migration
cat > docs/migration-best-practices.md << 'EOF'
## Best Practices per le Migration

### Regola #1: MAI LANCIARE MIGRATION DI VENERDÌ

Il venerdì sera è per le emergenze. Non per le migration.

```yaml
# Configura orari migration
migration:
  allowed_hours:
    - start: "09:00"
      end: "16:00"
  blocked_days:
    - friday
    - saturday
    - sunday
```

### Regola #2: SEMPRE REVIEW

Ogni migration va reviewata da almeno una persona.

```markdown
## Migration Review Checklist

- [ ] La migration fa quello che deve fare?
- [ ] La tabella è quella giusta?
- [ ] C'è un backup recente?
- [ ] C'è un rollback plan?
- [ ] È stata testata in staging?
```

### Regola #3: USA TRANSAZIONI

Le migration devono essere transazionali quando possibile.

```sql
BEGIN;
-- Migration qui
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
-- Verifica
SELECT COUNT(*) FROM users WHERE phone IS NOT NULL;
-- Se tutto ok
COMMIT;
-- Se qualcosa va storto
-- ROLLBACK;
```

### Regola #4: BACKUP PRIMA

Sempre backup prima di una migration distruttiva.

```bash
# Backup prima della migration
pg_dump -U admin -t users > /backups/users_$(date +%Y%m%d_%H%M%S).sql

# Poi la migration
psql -U admin -f migrations/20260417_cleanup.sql
```

### Regola #5: TESTA IN STAGING

Sempre testare le migration in staging prima di produzione.

```bash
# Testa in staging
psql -U admin -h staging -f migrations/20260417_cleanup.sql

# Verifica
psql -U admin -h staging -c "SELECT COUNT(*) FROM users"
```

### Regola #6: DOCUMENTA

Ogni migration va documentata.

```markdown
## Migration 20260417_cleanup_sessions

**Autore**: JN
**Data**: 17/04/2026
**Scopo**: Rimuovere tabella sessioni vecchie
**Tabelle coinvolte**: user_sessions
**Backup**: /backups/user_sessions_20260417.sql
**Rollback**: CREATE TABLE user_sessions AS SELECT * FROM user_sessions_backup
```

### Regola #7: USA NOMI CHIARI

I nomi delle tabelle devono essere chiari.

```sql
-- SBAGLIATO
DROP TABLE users;  -- Cancella gli utenti!

-- GIUSTO
DROP TABLE user_sessions_old;  -- Cancella le vecchie sessioni
```

### Regola #8: DRY RUN

Sempre fare un dry run prima.

```sql
-- Dry run: mostra cosa verrebbe cancellato
SELECT COUNT(*) FROM users WHERE created_at < '2025-01-01';

-- Se il numero ha senso, allora:
DELETE FROM users WHERE created_at < '2025-01-01';
```
EOF
```

Il TL mi ha scritto su Slack. "Stai lavorando di sabato?"

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Scrivo la guida per le migration. E configuro i controlli.

**TL**: E JN?

**ME**: JN... lo educo. Di nuovo. Lunedì.

**TL**: E i controlli?

**ME**: Aggiungo review obbligatoria. E blocco le migration di venerdì. E backup automatico prima.

**TL**: Bene. Ora riposa.

**ME**: Sì. Dopo aver aggiunto i controlli.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di sabato per un bug di venerdì. E stai fixando il processo. E stai educando il junior. E stai proteggendo il database. Ma è sabato. E dovresti riposare. Amen."

---

**Lunedì - L'Educazione**

Lunedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per la migration?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che la migration sbagliata è stata un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Otto cose. Primo: le migration vanno controllate. Sempre.

**JN**: Sempre?

**ME**: Sempre. Da te. E da qualcun altro. Due persone devono approvare.

**JN**: Ok.

**ME**: Secondo: non si lanciano migration di venerdì.

**JN**: Mai?

**ME**: Mai. Il venerdì sera è per le emergenze. Non per le migration.

**JN**: E se devo?

**ME**: Allora... chiedi. Al TL. A me. A qualcuno. E aspetta lunedì.

**JN**: Ok.

**ME**: Terzo: controlla il nome della tabella. Due volte.

**JN**: Due volte?

**ME**: Due volte. E poi una terza. Perché users non è user_sessions. E quando scrivi DROP TABLE users, cancelli gli utenti.

**JN**: Non lo sapevo!

**ME**: Ora lo sai. E per questo controlli. Sempre.

**JN**: Ok.

**ME**: Quarto: fai sempre un backup prima.

**JN**: Sempre?

**ME**: Sempre. Prima di ogni migration distruttiva. Backup. Sempre.

**JN**: Ok.

**ME**: Quinto: testa in staging.

**JN**: Sempre?

**ME**: Sempre. Se non funziona in staging, non funziona in produzione.

**JN**: Ok.

**ME**: Sesto: usa transazioni quando possibile.

**JN**: Transazioni?

**ME**: Sì. BEGIN. Migration. COMMIT. Se qualcosa va storto, ROLLBACK.

**JN**: E se non posso usare transazioni?

**ME**: Allora... fai un backup. E un rollback plan.

**JN**: Ok.

**ME**: Settimo: documenta tutto.

**JN**: Documenta?

**ME**: Sì. Cosa fa la migration. Quali tabelle. Come fare rollback.

**JN**: E se non ho tempo?

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere cosa fa la migration.

**JN**: Ok.

**ME**: Ottavo: se qualcosa va storto, chiama.

**JN**: Chiama?

**ME**: Sì. Me. Il TL. Qualcuno. Non provare a fixare da solo.

**JN**: E se non c'è nessuno?

**ME**: Allora... fermati. E aspetta. Non peggiorare le cose.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Migration: controllata
- Backup: fatto
- Review: obbligatoria
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il database è avere controlli. E processi. E educazione. Amen.

---

**Martedì - I Controlli**

Martedì. Ho aggiunto i controlli. Per evitare che succeda di nuovo.

**TERMINALE**:
```
# Configura review obbligatoria
cat > .github/workflows/migration-review.yml << 'EOF'
name: Migration Review
on:
  pull_request:
    paths:
      - 'migrations/**'
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for dangerous operations
        run: |
          for file in migrations/*.sql; do
            if grep -q "DROP TABLE" "$file"; then
              echo "WARNING: DROP TABLE found in $file"
              echo "Please review carefully"
            fi
            if grep -q "TRUNCATE" "$file"; then
              echo "WARNING: TRUNCATE found in $file"
              echo "Please review carefully"
            fi
            if grep -q "DELETE FROM" "$file"; then
              echo "WARNING: DELETE FROM found in $file"
              echo "Please review carefully"
            fi
          done
      - name: Require approval
        run: |
          echo "Migration requires approval from at least 2 reviewers"
EOF

# Configura backup automatico
cat > scripts/pre-migration-backup.sh << 'EOF'
#!/bin/bash
TABLE=$(grep -oP "DROP TABLE \K\w+" migrations/*.sql | head -1)
if [ -n "$TABLE" ]; then
  echo "Backing up table: $TABLE"
  pg_dump -U admin -t $TABLE > /backups/${TABLE}_$(date +%Y%m%d_%H%M%S).sql
  echo "Backup completed"
fi
EOF

# Configura blocco venerdì
cat > scripts/migration-guard.sh << 'EOF'
#!/bin/bash
DAY=$(date +%u)
HOUR=$(date +%H)

if [ $DAY -eq 5 ] && [ $HOUR -ge 16 ]; then
  echo "ERROR: Migrations are blocked on Friday after 16:00"
  echo "Please wait until Monday"
  exit 1
fi

if [ $DAY -gt 5 ]; then
  echo "ERROR: Migrations are blocked on weekends"
  echo "Please wait until Monday"
  exit 1
fi

echo "Migration allowed"
EOF

chmod +x scripts/migration-guard.sh
```

**TL**: Hai aggiunto i controlli?

**ME**: Sì. Review obbligatoria. Backup automatico. E blocco venerdì.

**TL**: E SE LO BYPASSANO?!

**ME**: Allora... la GitHub Action fallisce. E la migration non parte.

**TL**: E SE LA BYPASSANO LO STESSO?!

**ME**: Allora... prega.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Review: obbligatoria
- Backup: automatico
- Blocco venerdì: attivo
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i controlli sono essenziali. E che le migration vanno controllate. E che JN va educato. E che il venerdì sera è per le emergenze. Amen.

---

**Mercoledì - La Documentazione**

Mercoledì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero cancellato la tabella sbagliata.

```markdown
## Incident #MIGRATION-001: Il Migration Che Ha Cancellato La Tabella Sbagliata

**Data incident**: Venerdì 17 aprile 2026, 17:30
**Autore**: JN
**Servizio**: Database
**Problema**: Migration ha cancellato la tabella users invece di user_sessions
**Causa**: Nome tabella sbagliato nel SQL
**Autore del codice**: JN
**Data migration**: 17/04/2026, 17:30
**Tempo di esposizione**: ~1 ora
**Record persi**: 2.3 milioni (recuperati da backup + log)
**Utenti persi**: 847 (recuperati dai log)
**Tempo di risoluzione**: 4 ore
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "La tabella users?!"
**Reazione TL**: "2.3 milioni?!"
**Reazione CTO**: "Review obbligatoria. Backup automatico. Blocco venerdì."
**Soluzione**: Backup ripristinato + recupero dai log + controlli automatici
**Lezione imparata**: LE MIGRATION VANNO CONTROLLATE. SEMPRE.

**Regole per le migration**:
1. MAI lanciare migration di venerdì sera.
2. SEMPRE review da almeno una persona.
3. CONTROLLA il nome della tabella. Due volte.
4. BACKUP prima di ogni migration distruttiva.
5. TESTA in staging prima di produzione.
6. USA transazioni quando possibile.
7. DOCUMENTA tutto.
8. SE qualcosa va storto, chiama qualcuno. Amen.

**Come configurare review obbligatoria**:
```yaml
name: Migration Review
on:
  pull_request:
    paths:
      - 'migrations/**'
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Check for dangerous operations
        run: |
          for file in migrations/*.sql; do
            if grep -q "DROP TABLE" "$file"; then
              echo "WARNING: DROP TABLE found in $file"
            fi
          done
```

**Come configurare backup automatico**:
```bash
#!/bin/bash
TABLE=$(grep -oP "DROP TABLE \K\w+" migrations/*.sql | head -1)
if [ -n "$TABLE" ]; then
  pg_dump -U admin -t $TABLE > /backups/${TABLE}_$(date +%Y%m%d_%H%M%S).sql
fi
```

**Come configurare blocco venerdì**:
```bash
#!/bin/bash
DAY=$(date +%u)
HOUR=$(date +%H)

if [ $DAY -eq 5 ] && [ $HOUR -ge 16 ]; then
  echo "ERROR: Migrations are blocked on Friday after 16:00"
  exit 1
fi
```

**Come recuperare utenti dai log**:
```python
import re
import json
import psycopg2

conn = psycopg2.connect("dbname=postgres user=admin")
cur = conn.cursor()

with open('/tmp/registrations.log', 'r') as f:
    for line in f:
        match = re.search(r'User created: ({.*})', line)
        if match:
            user = json.loads(match.group(1))
            cur.execute(
                "INSERT INTO users (id, email, name, created_at) VALUES (%s, %s, %s, NOW()) ON CONFLICT DO NOTHING",
                (user['id'], user['email'], user['name'])
            )

conn.commit()
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che le migration vanno controllate. E che i backup vanno fatti. E che il venerdì sera è vietato. E che JN va educato. E che 847 utenti recuperati sono meglio di 847 utenti persi. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: le migration sono come le armi. Se non le controlli, uccidono. E se uccidono, uccidono il database. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "La migration ha cancellato la tabella users." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN ha scritto users invece di user_sessions." E UL dice: "E NON L'HA CONTROLLATO?!" E tu dici: "No." E UL dice: "E NESSUNO L'HA CONTROLLATO?!" E tu dici: "No." E UL dice: "E QUANTI RECORD PERSI?!" E tu dici: "2.3 milioni. Ma li abbiamo recuperati." E UL dice: "RECUPERATI?!" E tu dici: "Sì. Dal backup. E dai log." E la verità è che tutti pensano che le migration siano semplici. Ma non lo sono. E se non le controlli, cancelli la tabella sbagliata. E se cancelli la tabella sbagliata, perdi i dati. E se perdi i dati, devi recuperare. E se devi recuperare, lavori tutta la notte. E se lavori tutta la notte, impari. Impari che le migration vanno controllate. E che i backup vanno fatti. E che JN va educato. E che il venerdì sera è per le emergenze. Non per le migration. Amen.

---

## Il costo della migration sbagliata

| Voce | Valore |
|------|--------|
| Servizio | Database |
| Autore | JN |
| Data migration | 17/04/2026, 17:30 |
| Tabella cancellata | users |
| Tabella target | user_sessions |
| Record persi | 2.3 milioni |
| Utenti persi | 847 |
| Utenti recuperati | 847 |
| Tempo di risoluzione | 4 ore |
| Downtime | 0 (parziale) |
| Backup disponibile | Sì (ieri sera) |
| Review effettuata | No |
| Reazione UL | "La tabella users?!" |
| Reazione TL | "2.3 milioni?!" |
| Reazione CTO | "Review obbligatoria." |
| Soluzione | Backup + log + controlli |
| Lezione imparata | MIGRATION = REVIEW + BACKUP + CONTROLLO |
| **Totale** | **2.3M record recuperati + 847 utenti recuperati + 1 junior educato + 4 ore di lavoro** |

**Morale**: Le migration vanno controllate. Sempre. Da te. E da qualcun altro. E se non le controlli, cancelli la tabella sbagliata. E se cancelli la tabella sbagliata, perdi i dati. E se perdi i dati, devi recuperare. E se devi recuperare, lavori tutta la notte. E se lavori tutta la notte, impari. Impari che le migration sono pericolose. E che i nomi delle tabelle contano. E che users non è user_sessions. E che DROP TABLE users cancella gli utenti. Tutti gli utenti. E che JN va educato. E che il venerdì sera è per le emergenze. Non per le migration. Mai. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](112-il-backup-che-non-e-mai-stato-testato.md) | [Prossima](114-il-processo-zombie-che-mangiava-la-cpu.md)**
