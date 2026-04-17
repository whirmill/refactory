# La Migrazione Che Ha Cancellato La Tabella Sbagliata

**Data**: 23/01/2027

**[Storie 2026](index.md) | [Precedente](100-il-feature-flag-che-nessuno-ricordava.md) | [Prossima](102-il-cron-job-che-ha-scalato-all-infinito.md)**

---

C'è una verità nelle migrazioni del database che tutti conoscono ma nessuno rispetta: le migrazioni vanno testate. Sempre. Con un backup. E una transazione. E un rollback plan. E quando dico "testate", inteso testate su una copia del database di produzione. Non su un database di test con 10 righe. Su una COPIA di produzione. Perché le migrazioni sono come le operazioni chirurgiche. Se sbagli, il paziente muore. E il paziente è il database. E se il database muore, l'applicazione muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Ho cancellato la tabella sbagliata." E UL dice: "SBAGLIATA?!" E tu dici: "Sì. Invece di users_temp ho cancellato users." E UL dice: "E GLI UTENTI?!" E tu dici: "Non ci sono più." E la verità è che gli utenti non ci sono più. Perché JN ha scritto una migrazione. E l'ha lanciata su produzione. Senza backup. Senza transazione. Senza test. E la migrazione ha cancellato la tabella sbagliata. E ora gli utenti non esistono. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Migrazione**

Era lunedì. Le 17:30. JN voleva andare a casa.

**JN**: Ho quasi finito la migrazione!

**ME**: Quale migrazione?

**JN**: Quella per pulire le tabelle temporanee.

**ME**: Pulire?

**JN**: Sì. Ci sono tabelle temp vecchie. Le rimuovo.

**ME**: Fammi vedere.

**JN**: È semplice.

```sql
-- Migration: Remove temporary tables
-- Author: JN
-- Date: 2027-01-23

DROP TABLE users_temp;
DROP TABLE orders_temp;
DROP TABLE products_temp;
```

**ME**: E L'HAI TESTATA?!

**JN**: Sì. In locale. Funziona.

**ME**: E IN LOCALE COSA HAI?!

**JN**: Un database con 10 utenti.

**ME**: E IN PRODUZIONE QUANTI UTENTI CI SONO?!

**JN**: Non lo so. Tanti.

**ME**: E SE SBAGLI?!

**JN**: Non sbaglio. È semplice.

**ME**: E IL BACKUP?!

**JN**: Non serve. È solo pulizia.

**ME**: E LA TRANSAZIONE?!

**JN**: Le DROP non vanno in transazione.

**ME**: JN, le DROP vanno in transazione. E con un backup prima.

**JN**: Ma è solo pulizia!

**ME**: PULIZIA CHE PUÒ CANCELLARE LA TABELLA SBAGLIATA!

**JN**: Non sbaglio!

**ME**: E SE SBAGLI?!

**JN**: Allora... ripristino dal backup.

**ME**: E SE NON C'È IL BACKUP?!

**JN**: C'è sempre il backup.

**ME**: E QUANDO È STATO FATTO?!

**JN**: Non lo so. Ieri? L'altro ieri?

**ME**: JN, controlla quando è stato fatto l'ultimo backup.

**TERMINALE**:
```
# Controlla backup
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT * FROM pg_backup_history ORDER BY created_at DESC LIMIT 1"
ERROR: relation "pg_backup_history" does not exist

# Controlla backup esterni
aws s3 ls s3://company-backups/postgres/ | tail -5
2027-01-15 03:00:00   1234567890 postgres-2027-01-15.sql.gz
2027-01-16 03:00:00   1234567890 postgres-2027-01-16.sql.gz
2027-01-17 03:00:00   1234567890 postgres-2027-01-17.sql.gz
2027-01-18 03:00:00   1234567890 postgres-2027-01-18.sql.gz
2027-01-19 03:00:00   1234567890 postgres-2027-01-19.sql.gz
```

**ME**: L'ultimo backup è del 19 gennaio. Oggi è il 23.

**JN**: E QUINDI?!

**ME**: E quindi se sbagli, perdiamo 4 giorni di dati.

**JN**: Ma non sbaglio!

**ME**: JN, FERMA. Non lanciare la migrazione oggi.

**JN**: Ma...

**ME**: Prima fai un backup. Poi testi la migrazione su una copia. POI la lanci.

**JN**: Ok...

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Ultimo backup: 19 gennaio
- Giorni persi: 4
- JN: impaziente
- Migrazione: non testata

E la lezione era chiara. Le migrazioni vanno testate. E i backup vanno verificati. E JN va sorvegliato. Amen.

---

**Lunedì - 18:00**

JN ha lanciato la migrazione. Nonostante gli avessi detto di fermarsi.

**ALERT**: Database connection errors spike

**ME**: Errori nel database?!

**TL**: Errori?!

**ME**: Sì. Connection refused.

**TL**: E IL DATABASE?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla connessione
kubectl exec -it postgres-0 -- pg_isready
pg_isready: could not connect to server: Connection refused

# Controlla pod
kubectl get pods -l app=postgres
NAME           READY   STATUS    RESTARTS   AGE
postgres-0     0/1     CrashLoopBackOff   5   10m

# Controlla log
kubectl logs postgres-0 --tail=50
2027-01-23 17:45:01 LOG: database system is starting up
2027-01-23 17:45:05 ERROR: relation "users" does not exist
2027-01-23 17:45:05 FATAL: cannot continue without users table
2027-01-23 17:45:05 LOG: database system is shut down
```

**ME**: La tabella users non esiste.

**TL**: NON ESISTE?!

**ME**: No. È stata cancellata.

**TL**: E CHI L'HA CANCELLATA?!

**ME**: Controllo i log.

**TERMINALE**:
```
# Controlla log PostgreSQL
kubectl logs postgres-0 --since=1h | grep -i "DROP"
2027-01-23 17:44:58 LOG: statement: DROP TABLE users CASCADE;
2027-01-23 17:44:58 LOG: statement: DROP TABLE orders_temp;
2027-01-23 17:44:58 LOG: statement: DROP TABLE products_temp;

# Controlla chi ha eseguito
kubectl logs postgres-0 --since=1h | grep -i "DROP" -B5
2027-01-23 17:44:55 LOG: connection received: host=10.0.0.45 port=54321
2027-01-23 17:44:55 LOG: connection authorized: user=jn database=production
2027-01-23 17:44:58 LOG: statement: DROP TABLE users CASCADE;
```

**ME**: JN ha lanciato la migrazione. E ha cancellato users invece di users_temp.

**TL**: INVECE DI USERS_TEMP?!

**ME**: Sì. Guarda la migrazione.

**TERMINALE**:
```
# Controlla migrazione
cat migrations/20270123_cleanup_temp_tables.sql
-- Migration: Remove temporary tables
-- Author: JN
-- Date: 2027-01-23

DROP TABLE users CASCADE;  -- <-- ERRORE! Doveva essere users_temp
DROP TABLE orders_temp;
DROP TABLE products_temp;
```

**ME**: JN ha scritto "users" invece di "users_temp".

**TL**: E NON L'HA CONTROLLATO?!

**ME**: No. E l'ha lanciata su produzione.

**TL**: E GLI UTENTI?!

**ME**: Non ci sono più.

**TL**: E GLI ORDINI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla tabelle rimaste
kubectl exec -it postgres-0 -- psql -U admin -c "\dt"
         List of relations
 Schema |     Name      | Type  |  Owner
--------+---------------+-------+----------
 public | orders        | table | admin
 public | products      | table | admin
 public | orders_temp   | table | admin
 public | products_temp | table | admin
```

**ME**: La tabella users è stata cancellata. orders e products ci sono ancora.

**TL**: E GLI UTENTI?!

**ME**: Non esistono più. E senza utenti, non possono fare login. E non possono ordinare.

**TL**: E QUANTI UTENTI C'ERANO?!

**ME**: Controllo dal backup.

**TERMINALE**:
```
# Scarica backup
aws s3 cp s3://company-backups/postgres/postgres-2027-01-19.sql.gz /tmp/

# Conta utenti nel backup
zcat /tmp/postgres-2027-01-19.sql.gz | grep "COPY users" -A1000000 | grep -v "^\\." | wc -l
234567
```

**ME**: 234.567 utenti. Persi.

**TL**: 234.567 UTENTI?!

**ME**: Sì. E 4 giorni di nuovi utenti. E le modifiche agli utenti esistenti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Tabella users: CANCELLATA
- Utenti persi: 234.567
- Backup: 4 giorni vecchio
- JN: responsabile

E tutto era chiaro. JN aveva sbagliato. E il database era morto. E gli utenti non esistevano più. Amen.

---

**Lunedì - 18:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava piangendo.

**ME**: JN, hai lanciato la migrazione?

**JN**: (voce tremante) Sì... ma non volevo!

**ME**: TI AVEVO DETTO DI FERMARTI!

**JN**: Lo so... ma pensavo che fosse ok!

**ME**: OK?! HAI CANCELLATO LA TABELLA USERS!

**JN**: Non volevo scrivere users! Volevo scrivere users_temp!

**ME**: E PERCHÉ HAI SCRITTO USERS?!

**JN**: Non lo so! Un errore! Un typo!

**ME**: E NON L'HAI CONTROLLATO?!

**JN**: No... pensavo che fosse giusto!

**ME**: E IL BACKUP?!

**JN**: Pensavo che ci fosse!

**ME**: C'ERA! MA È DI 4 GIORNI FA!

**JN**: E ORA?!

**ME**: ORA RIPRISTINO DAL BACKUP. E PERDIAMO 4 GIORNI DI DATI.

**JN**: E GLI UTENTI?!

**ME**: GLI UTENTI TORNERANNO. MA I NUOVI UTENTI DEGLI ULTIMI 4 GIORNI? PERSI.

**JN**: Quanti?

**ME**: Non lo so. Scopro ora.

**TERMINALE**:
```
# Conta nuovi utenti dal backup
zcat /tmp/postgres-2027-01-19.sql.gz | grep "COPY users" -A1000000 | grep -v "^\\." | grep "2027-01-20\|2027-01-21\|2027-01-22\|2027-01-23" | wc -l
0  # Il backup è del 19, non ha i nuovi utenti

# Stima nuovi utenti dalle metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(increase(user_registrations_total[4d]))'
{status: "success", data: {result: [{value: ["1234"]}]}}  # 1234 nuovi utenti in 4 giorni
```

**ME**: Circa 1234 nuovi utenti persi. E le modifiche agli utenti esistenti.

**JN**: 1234?!

**ME**: Sì. E i loro ordini. E i loro dati.

**JN**: E... posso fare qualcosa?

**ME**: Puoi imparare. E non farlo mai più.

JN ha riattaccato. O forse ha riattaccato per piangere. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Utenti persi: 1234 nuovi + modifiche
- Backup: da ripristinare
- JN: in lacrime
- Sistema: down

E la lezione era chiara. Le migrazioni vanno testate. E i backup vanno verificati. E JN va educato. Amen.

---

**Lunedì - 19:00**

Ho iniziato il ripristino dal backup.

**TERMINALE**:
```
# Ferma applicazioni
kubectl scale deployment --all --replicas=0

# Ripristina backup
kubectl exec -it postgres-0 -- psql -U admin -c "DROP DATABASE production;"
kubectl exec -it postgres-0 -- psql -U admin -c "CREATE DATABASE production;"

# Copia backup nel pod
kubectl cp /tmp/postgres-2027-01-19.sql.gz postgres-0:/tmp/

# Ripristina
kubectl exec -it postgres-0 -- bash -c "zcat /tmp/postgres-2027-01-19.sql.gz | psql -U admin production"

# Verifica
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM users"
count
--------
234567
```

**ME**: Backup ripristinato. 234.567 utenti.

**TL**: E I NUOVI UTENTI?!

**ME**: Persi. E gli ordini degli ultimi 4 giorni.

**TL**: E QUANTI ORDINI?!

**ME**: Controllo.

**TERMINALE**:
```
# Conta ordini persi
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(increase(orders_created_total[4d]))'
{status: "success", data: {result: [{value: ["5678"]}]}}  # 5678 ordini in 4 giorni

# Valore medio ordine
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT AVG(total) FROM orders"
avg
-------
€45.23

# Valore totale perso
# 5678 ordini × €45.23 = €256,834.94
```

**ME**: 5678 ordini persi. Valore circa 257.000 euro.

**TL**: 257.000 EURO?!

**ME**: Sì. E i nuovi utenti. E le modifiche ai dati.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Backup: ripristinato
- Utenti: 234.567
- Ordini persi: 5678
- Valore: €257.000

E tutto funzionava di nuovo. Ma i dati erano persi. E la lezione era chiara. Le migrazioni vanno testate. E i backup vanno verificati. E JN va educato. Amen.

---

**Lunedì - 20:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL non era di buon umore.

**UL**: Pronto?

**ME**: Abbiamo avuto un problema con il database.

**UL**: Che problema?

**ME**: JN ha lanciato una migrazione sbagliata. E ha cancellato la tabella users.

**UL**: CANCELLATO LA TABELLA USERS?!

**ME**: Sì. Invece di users_temp ha scritto users.

**UL**: E GLI UTENTI?!

**ME**: Li ho ripristinati dal backup. Ma abbiamo perso 4 giorni di dati.

**UL**: 4 GIORNI?!

**ME**: Sì. L'ultimo backup era del 19 gennaio.

**UL**: E QUANTI DATI PERSI?!

**ME**: 1234 nuovi utenti. 5678 ordini. Circa 257.000 euro.

**UL**: 257.000 EURO?!

**ME**: Sì. Potenziali. Non tutti i clienti torneranno.

**UL**: E PERCHÉ NON C'ERA IL BACKUP DI OGGI?!

**ME**: Il backup giornaliero non funzionava da 4 giorni.

**UL**: NON FUNZIONAVA?!

**ME**: No. E nessuno l'aveva notato.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho disabilitato l'accesso diretto al database.

**UL**: BENE. E LA PROSSIMA VOLTA?!

**ME**: La prossima volta... le migrazioni passano per code review. E backup giornalieri verificati.

**UL**: DOCUMENTA TUTTO.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. Le migrazioni vanno controllate. E i backup vanno verificati. E la documentazione è obbligatoria. Amen.

---

**Martedì - La Verifica**

Martedì. Ho verificato i backup. E il sistema di backup.

**TERMINALE**:
```
# Controlla perché il backup non funzionava
kubectl logs backup-job-0 --since=120h | tail -50
2027-01-19 03:00:00 INFO: Starting backup
2027-01-19 03:00:05 INFO: Backup completed successfully
2027-01-20 03:00:00 INFO: Starting backup
2027-01-20 03:00:05 ERROR: S3 bucket full - cannot upload
2027-01-20 03:00:05 ERROR: Backup failed
2027-01-21 03:00:00 INFO: Starting backup
2027-01-21 03:00:05 ERROR: S3 bucket full - cannot upload
2027-01-21 03:00:05 ERROR: Backup failed
2027-01-22 03:00:00 INFO: Starting backup
2027-01-22 03:00:05 ERROR: S3 bucket full - cannot upload
2027-01-22 03:00:05 ERROR: Backup failed
2027-01-23 03:00:00 INFO: Starting backup
2027--23 03:00:05 ERROR: S3 bucket full - cannot upload
2027-01-23 03:00:05 ERROR: Backup failed

# Controlla bucket S3
aws s3 ls s3://company-backups/ | wc -l
1000  # Limite raggiunto

# Controlla alert
kubectl logs alertmanager-0 --since=120h | grep -i backup
# Nessun alert per il backup fallito
```

**ME**: Il bucket S3 era pieno. E i backup fallivano da 4 giorni.

**TL**: E NESSUN ALERT?!

**ME**: No. Non c'era alert per i backup falliti.

**TL**: E QUINDI?!

**ME**: E quindi... non sapevamo che i backup non funzionavano.

**TL**: E ORA?!

**ME**: Ora pulisco il bucket. E aggiungo alert per i backup falliti.

**TERMINALE**:
```
# Pulisci bucket - rimuovi backup vecchi
aws s3 ls s3://company-backups/postgres/ | head -500 | awk '{print $4}' | while read file; do
  aws s3 rm s3://company-backups/postgres/$file
done

# Configura lifecycle per rimuovere backup vecchi automaticamente
aws s3api put-bucket-lifecycle-configuration --bucket company-backups --lifecycle-configuration file://lifecycle.json

# Aggiungi alert per backup falliti
cat > /etc/prometheus/alerts/backup.yml << 'EOF'
groups:
  - name: backup
    rules:
      - alert: BackupFailed
        expr: backup_success == 0
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Backup failed"
          description: "Database backup has failed. Check S3 bucket and backup job."

      - alert: BackupTooOld
        expr: time() - backup_last_success_timestamp > 86400
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Backup is too old"
          description: "Last successful backup was more than 24 hours ago."
EOF

# Esegui backup ora
kubectl create job --from=cronjob/backup-job manual-backup-$(date +%s)
```

**ME**: Bucket pulito. Alert aggiunti. Backup eseguito.

**TL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta... l'alert ci avvisa. E interveniamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Bucket: pulito
- Alert: configurati
- Backup: eseguito
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i backup vanno verificati. E che gli alert sono essenziali. E che JN va educato. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: (voce ancora tremante) Sì?

**ME**: Siediti.

**JN**: (si siede) È per la migrazione?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che la migrazione sbagliata è stata un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Sette cose. Primo: le migrazioni vanno testate su una copia di produzione.

**JN**: Sempre?

**ME**: Sempre. Non su un database di test con 10 righe. Su una COPIA di produzione.

**JN**: Ok.

**ME**: Secondo: le migrazioni vanno in transazione.

**JN**: Ma le DROP non vanno in transazione!

**ME**: Le DROP vanno in transazione. E se non vanno, almeno fai un backup prima.

**JN**: Ok.

**ME**: Terzo: le migrazioni vanno in code review.

**JN**: Code review?

**ME**: Sì. Un'altra persona DEVE controllare la migrazione. Prima che tu la lanci.

**JN**: E SE NON C'È NESSUNO?!

**ME**: Allora aspetti. Non la lanci.

**JN**: Ok.

**ME**: Quarto: controlla SEMPRE il nome della tabella.

**JN**: Sempre?

**ME**: Sempre. Due volte. Tre volte. Finché non sei sicuro.

**JN**: Ok.

**ME**: Quinto: verifica che il backup esista. E che sia recente.

**JN**: E SE NON ESISTE?!

**ME**: Allora fai il backup. PRIMA di lanciare la migrazione.

**JN**: Ok.

**ME**: Sesto: usa nomi di tabella espliciti. Non usare variabili.

**JN**: Variabili?

**ME**: Sì. Se scrivi "DROP TABLE ${TABLE_NAME}" e la variabile è sbagliata, cancelli la tabella sbagliata.

**JN**: Ok.

**ME**: Settimo: se qualcosa va storto, fermati. E chiama qualcuno.

**JN**: E SE NON C'È NESSUNO?!

**ME**: Allora... non lanci la migrazione. Aspetti.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Regole: 7
- Backup: verificato
- Migrazioni: bloccate senza review
- Educazione: completata

E tutto era chiaro. Ma le cose che sembrano chiare sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E controlli. E educazione. Amen.

---

**Giovedì - Il Processo**

Giovedì. Ho creato un processo per le migrazioni. Per evitare che succeda di nuovo.

**TERMINALE**:
```
# Crea template per migrazioni
cat > migrations/TEMPLATE.sql << 'EOF'
-- Migration: [DESCRIZIONE]
-- Author: [NOME]
-- Date: [DATA]
-- Review: [NOME REVIEWER]
-- Backup: [DATA BACKUP]
-- Rollback: [COME FARE ROLLBACK]

-- PRIMA DI LANCIARE:
-- 1. Verifica backup esistente
-- 2. Testa su copia di produzione
-- 3. Code review approvata
-- 4. Rollback plan documentato

BEGIN;

-- La tua migrazione qui
-- USA SEMPRE NOMI ESPLICITI, MAI VARIABILI

-- ESEMPIO:
-- DROP TABLE schema.users_temp CASCADE;  -- ESPLICITO
-- NON: DROP TABLE ${TABLE_NAME} CASCADE;  -- PERICOLOSO

COMMIT;
EOF

# Crea script di verifica
cat > scripts/check-migration.sh << 'EOF'
#!/bin/bash

MIGRATION=$1

# Controlla che ci sia il backup
if ! grep -q "Backup:" "$MIGRATION"; then
  echo "❌ ERRORE: Backup non documentato"
  exit 1
fi

# Controlla che ci sia la review
if ! grep -q "Review:" "$MIGRATION"; then
  echo "❌ ERRORE: Review non documentata"
  exit 1
fi

# Controlla che ci sia il rollback plan
if ! grep -q "Rollback:" "$MIGRATION"; then
  echo "❌ ERRORE: Rollback plan non documentato"
  exit 1
fi

# Controlla che ci sia BEGIN/COMMIT
if ! grep -q "BEGIN;" "$MIGRATION"; then
  echo "⚠️  WARNING: Migrazione senza transazione"
fi

# Controlla variabili pericolose
if grep -q '\${' "$MIGRATION"; then
  echo "❌ ERRORE: Variabili non permesse nelle migrazioni"
  exit 1
fi

# Controlla DROP pericolosi
if grep -qi "DROP TABLE.*users[^_]" "$MIGRATION"; then
  echo "⚠️  WARNING: DROP TABLE users rilevato. Sei sicuro?"
  read -p "Continuare? (y/n) " -n 1 -r
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "✅ Migrazione valida"
EOF

chmod +x scripts/check-migration.sh

# Crea GitHub Action per review obbligatoria
cat > .github/workflows/migration-review.yml << 'EOF'
name: Migration Review
on:
  pull_request:
    paths:
      - 'migrations/*.sql'

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check Migration
        run: |
          for file in migrations/*.sql; do
            ./scripts/check-migration.sh "$file"
          done
      
      - name: Require Review
        uses: actions/github-script@v7
        with:
          script: |
            const { data: reviews } = await github.rest.pulls.listReviews({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number
            });
            
            const approved = reviews.some(r => r.state === 'APPROVED');
            if (!approved) {
              core.setFailed('Migration requires approval');
            }
EOF
```

**TL**: Hai creato il processo?

**ME**: Sì. Template per migrazioni. Script di verifica. Review obbligatoria.

**TL**: E SE QUALCUNO BYPASSA?!

**ME**: Non può. La GitHub Action blocca la merge senza review.

**TL**: E SE LANCIANO DIRETTAMENTE SUL DATABASE?!

**ME**: Ho disabilitato l'accesso diretto. Ora solo il migration runner può eseguire migrazioni.

**TL**: E IL MIGRATION RUNNER?!

**ME**: Legge solo dalla cartella migrations. E richiede review approvata.

**TL**: E SE QUALCUNO AGGIUNGE UN FILE MANUALMENTE?!

**ME**: Il file deve passare per PR. E la PR richiede review.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Template: creato
- Verifica: automatica
- Review: obbligatoria
- Accesso diretto: disabilitato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che le migrazioni sono pericolose. E che i processi sono essenziali. E che JN va controllato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero sbagliato le migrazioni.

```markdown
## Incident #MIGRATION-001: La Migrazione Che Ha Cancellato La Tabella Sbagliata

**Data incident**: Lunedì 23 gennaio 2027, 17:44
**Autore**: JN
**Servizio**: postgres
**Problema**: Migrazione ha cancellato tabella users invece di users_temp
**Causa**: Typo nel nome della tabella + nessun test + nessun backup recente
**Nome migrazione**: 20270123_cleanup_temp_tables.sql
**Tabella cancellata**: users
**Utenti persi**: 1234 nuovi + modifiche a 234.567 esistenti
**Ordini persi**: 5678
**Valore potenziale**: €257.000
**Backup utilizzato**: postgres-2027-01-19.sql.gz (4 giorni vecchio)
**Tempo di risoluzione**: 2 ore
**Downtime**: 2 ore
**Reazione UL**: "257.000 euro?!"
**Reazione TL**: "La tabella users?!"
**Reazione CTO**: "Migrazioni con review obbligatoria."
**Soluzione**: Ripristino backup + processo migrazioni + alert backup
**Lezione imparata**: LE MIGRAZIONI VANNO TESTATE. SEMPRE.

**Regole per le migrazioni**:
1. Testa SEMPRE su una copia di produzione.
2. Usa SEMPRE transazioni (BEGIN/COMMIT).
3. Code review OBBLIGATORIA.
4. Controlla il nome della tabella DUE VOLTE.
5. Verifica backup esistente E recente.
6. Documenta rollback plan.
7. Usa nomi ESPLICITI, mai variabili.
8. Se qualcosa va storto, FERMATI e chiama qualcuno. Amen.

**Come scrivere una migrazione sicura**:
```sql
-- Migration: Remove temporary tables
-- Author: your-name
-- Date: 2027-01-23
-- Review: reviewer-name
-- Backup: 2027-01-23 10:00
-- Rollback: Ripristinare da backup o ricreare tabella

BEGIN;

-- Verifica che la tabella esista
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users_temp') THEN
    RAISE EXCEPTION 'Table users_temp does not exist';
  END IF;
END $$;

-- Drop con nome ESPLICITO
DROP TABLE public.users_temp CASCADE;

COMMIT;
```

**Come testare una migrazione**:
```bash
# 1. Crea copia di produzione
pg_dump production > /tmp/prod_copy.sql
createdb production_test
psql production_test < /tmp/prod_copy.sql

# 2. Esegui migrazione su copia
psql production_test < migrations/migration.sql

# 3. Verifica risultati
psql production_test -c "\dt"
psql production_test -c "SELECT COUNT(*) FROM users"

# 4. Se tutto ok, procedi su produzione
```

**Come configurare alert per backup**:
```yaml
groups:
  - name: backup
    rules:
      - alert: BackupFailed
        expr: backup_success == 0
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Backup failed"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che le migrazioni vanno testate. E che i backup vanno verificati. E che la review è obbligatoria. E che 1234 utenti persi sono tanti. E che 257.000 euro sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: le migrazioni sono come le operazioni chirurgiche. Se sbagli, il paziente muore. E il paziente è il database. E se il database muore, l'applicazione muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Ho cancellato la tabella sbagliata." E UL dice: "SBAGLIATA?!" E tu dici: "Sì. Invece di users_temp ho cancellato users." E UL dice: "E GLI UTENTI?!" E tu dici: "Non ci sono più." E UL dice: "E COME FA A NON ESSERCI PIÙ?!" E tu dici: "Perché JN ha scritto users invece di users_temp." E UL dice: "E PERCHÉ?!" E tu dici: "Un typo." E UL dice: "UN TYPO HA CANCELLATO 234.567 UTENTI?!" E tu dici: "Sì. E non c'era backup recente." E UL dice: "E PERCHÉ NON C'ERA?!" E tu dici: "Perché il bucket S3 era pieno. E non c'era alert." E la verità è che tutto si accumula. I backup vecchi riempiono il bucket. Il bucket pieno fa fallire i backup. I backup falliti non generano alert. E un giorno JN sbaglia una migrazione. E non c'è backup recente. E il database muore. E impari. Impari che le migrazioni vanno testate. E che i backup vanno verificati. E che gli alert sono essenziali. E che JN va controllato. Amen.

---

## Il costo della migrazione sbagliata

| Voce | Valore |
|------|--------|
| Servizio | postgres |
| Autore | JN |
| Data migrazione | 23/01/2027, 17:44 |
| Tabella cancellata | users |
| Tabella target | users_temp |
| Errore | Typo nel nome |
| Utenti persi | 1234 nuovi + modifiche |
| Ordini persi | 5678 |
| Valore potenziale | €257.000 |
| Backup utilizzato | 4 giorni vecchio |
| Tempo di risoluzione | 2 ore |
| Downtime | 2 ore |
| Causa backup mancante | Bucket S3 pieno |
| Alert backup | Non configurato |
| Review migrazione | Non effettuata |
| Test migrazione | Non effettuato |
| Reazione UL | "257.000 euro?!" |
| Reazione TL | "La tabella users?!" |
| Reazione CTO | "Review obbligatoria." |
| Soluzione | Backup + processo + alert |
| Lezione imparata | MIGRAZIONI = TEST + REVIEW + BACKUP |
| **Totale** | **€257.000 potenziali + 2 ore downtime + 1 processo creato** |

**Morale**: Le migrazioni vanno testate. Sempre. Con un backup. E una transazione. E un rollback plan. E quando dico "testate", intendo testate su una copia del database di produzione. Non su un database di test con 10 righe. Su una COPIA di produzione. Perché le migrazioni sono come le operazioni chirurgiche. Se sbagli, il paziente muore. E il paziente è il database. E se il database muore, l'applicazione muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Ho cancellato la tabella sbagliata." E UL dice: "SBAGLIATA?!" E tu dici: "Sì. Invece di users_temp ho cancellato users." E UL dice: "E GLI UTENTI?!" E tu dici: "Non ci sono più." E UL dice: "E COME FA A NON ESSERCI PIÙ?!" E tu dici: "Perché JN ha scritto users invece di users_temp." E UL dice: "E PERCHÉ?!" E tu dici: "Un typo." E UL dice: "UN TYPO HA CANCELLATO 234.567 UTENTI?!" E tu dici: "Sì. E non c'era backup recente." E UL dice: "E PERCHÉ NON C'ERA?!" E tu dici: "Perché il bucket S3 era pieno. E non c'era alert." E la verità è che tutto si accumula. I backup vecchi riempiono il bucket. Il bucket pieno fa fallire i backup. I backup falliti non generano alert. E un giorno JN sbaglia una migrazione. E non c'è backup recente. E il database muore. E impari. Impari che le migrazioni vanno testate. E che i backup vanno verificati. E che gli alert sono essenziali. E che JN va controllato. E che un typo può costare 257.000 euro. E la prossima volta, la migrazione passa per review. E il backup è verificato. E l'alert è configurato. E JN è controllato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](100-il-feature-flag-che-nessuno-ricordava.md) | [Prossima](102-il-cron-job-che-ha-scalato-all-infinito.md)**
