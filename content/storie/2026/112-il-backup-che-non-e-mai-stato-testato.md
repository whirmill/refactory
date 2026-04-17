# Il Backup Che Non È Mai Stato Testato

**Data**: 10/04/2026

**[Storie 2026](index.md) | [Precedente](111-il-feature-flag-che-non-si-spegneva-mai.md) | [Prossima](113-la-query-che-ha-fuso-il-database.md)**

---

C'è una verità nel DevOps che tutti conoscono ma nessuno rispetta: il backup non serve a nulla se non lo testi. Puoi avere backup giornalieri. Puoi avere backup incrementali. Puoi avere backup off-site. Puoi avere backup criptati. Puoi avere tutto. Ma se non hai mai provato a ripristinare, non hai nulla. E quando il database si corrompe, e tu provi a ripristinare, e il backup non funziona, ti ritrovi con un database vuoto. E i clienti che chiamano. E UL che chiama. E tu che provi a ripristinare. E il restore fallisce. E tu ti chiedi: "Com'è possibile che il backup non funzioni?" E la risposta è semplice: perché nessuno l'ha mai testato. E il backup è come un paracadute. Se non lo testi, quando ti serve non si apre. E tu cadi. E il database cade. E tutti cadono. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Corruzione**

Era lunedì. Le 07:00. Il caffè non era ancora pronto.

Poi è arrivato l'alert.

**ALERT**: Database corruption detected in orders table

**ME**: Corruzione?!

**TL**: CORRUZIONE?!

**ME**: Sì. La tabella orders è corrotta.

**TL**: E QUANTI ORDINI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla stato database
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM orders"
ERROR: could not read block 12345 in file "base/16384/orders": Invalid argument

# Controlla integrità
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT pg_is_in_recovery()"
pg_is_in_recovery
-------------------
f
(1 row)

# Controlla errori
kubectl logs postgres-0 --tail=50 | grep -i error
2026-04-10 07:00:12 ERROR: corrupted data in table "orders"
2026-04-10 07:00:12 ERROR: could not read block 12345
2026-04-10 07:00:13 ERROR: automatic vacuum of table "orders" failed
```

**ME**: La tabella orders è corrotta. Blocchi illeggibili.

**TL**: E GLI ORDINI?!

**ME**: Non accessibili. Il database non riesce a leggerli.

**TL**: E QUANTI SONO?!

**ME**: Controllo.

**TERMINALE**:
```
# Prova a contare con skip
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM orders WHERE id < 1000000"
count
--------
234567

# Prova a contare dopo il blocco corrotto
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM orders WHERE id > 1000000"
ERROR: could not read block 12345

# Controlla backup
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT pg_is_in_recovery()"
```

**ME**: 234.567 ordini accessibili. Gli altri... corrotti.

**TL**: E GLI ALTRI QUANTI SONO?!

**ME**: Non lo so. Il database non riesce a leggerli.

**TL**: E QUINDI?!

**ME**: E quindi... ripristiniamo dal backup.

**TL**: E IL BACKUP?!

**ME**: C'è. Backup giornaliero. Ultimo alle 03:00 di stanotte.

**TL**: E LO TESTIAMO?!

**ME**: Ora lo scopriamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Tabella orders: corrotta
- Ordini accessibili: 234.567
- Backup: disponibile
- Test: mai eseguito

E tutto era chiaro. Il database era corrotto. E il backup non era mai stato testato. Amen.

---

**Lunedì - 07:30**

Ho provato a ripristinare. Il restore è fallito.

**TERMINALE**:
```
# Lista backup
kubectl exec -it backup-server -- ls -la /backups/postgres/
total 847G
drwxr-xr-x 1 root root 4096 Apr 10 03:00 .
drwxr-xr-x 1 root root 4096 Apr  9 03:00 ..
-rw-r--r-- 1 root root 4096 Apr 10 03:00 backup-2026-04-10.log
-rw-r--r-- 1 root root 4096 Apr  9 03:00 backup-2026-04-09.log
-rw------- 1 postgres postgres 47G Apr 10 03:00 postgres-2026-04-10.sql.gz
-rw------- 1 postgres postgres 47G Apr  9 03:00 postgres-2026-04-09.sql.gz
-rw------- 1 postgres postgres 46G Apr  8 03:00 postgres-2026-04-08.sql.gz

# Verifica integrità backup
kubectl exec -it backup-server -- gzip -t /backups/postgres/postgres-2026-04-10.sql.gz
gzip: /backups/postgres/postgres-2026-04-10.sql.gz: unexpected end of file

# Prova backup precedente
kubectl exec -it backup-server -- gzip -t /backups/postgres/postgres-2026-04-09.sql.gz
gzip: /backups/postgres/postgres-2026-04-09.sql.gz: unexpected end of file

# Prova backup di 3 giorni fa
kubectl exec -it backup-server -- gzip -t /backups/postgres/postgres-2026-04-08.sql.gz
gzip: /backups/postgres/postgres-2026-04-08.sql.gz: OK
```

**ME**: Gli ultimi due backup sono corrotti. Solo quello di 3 giorni fa è valido.

**TL**: CORROTTI?!

**ME**: Sì. File incompleti. Il backup si interrompeva prima di finire.

**TL**: E DA QUANDO?!

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
# Controlla log backup
kubectl exec -it backup-server -- cat /backups/postgres/backup-2026-04-10.log
2026-04-10 03:00:01 Starting backup...
2026-04-10 03:45:23 Dumping orders table...
2026-04-10 03:45:23 ERROR: out of disk space
2026-04-10 03:45:23 Backup aborted

# Controlla spazio disco
kubectl exec -it backup-server -- df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       100G   98G  2.0G  98% /backups

# Controlla quando è iniziato il problema
kubectl exec -it backup-server -- grep -l "out of disk space" /backups/postgres/*.log
/backups/postgres/backup-2026-04-09.log
/backups/postgres/backup-2026-04-10.log
```

**ME**: Il disco del backup server è pieno dal 9 aprile. I backup sono incompleti.

**TL**: E L'ULTIMO BACKUP VALIDO?!

**ME**: 8 aprile. 3 giorni fa.

**TL**: E QUANTI ORDINI PERDIAMO?!

**ME**: Controllo.

**TERMINALE**:
```
# Conta ordini creati negli ultimi 3 giorni
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM orders WHERE created_at > '2026-04-07 03:00:00'" 2>/dev/null || echo "Cannot query corrupted table"

# Prova con tabella accessibile
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM orders WHERE created_at > '2026-04-07 03:00:00' AND id < 1000000"
count
--------
12847
```

**ME**: Almeno 12.847 ordini. Forse di più. La tabella è corrotta.

**TL**: E QUINDI?!

**ME**: E quindi... ripristiniamo il backup del 8 aprile. E perdiamo 3 giorni di ordini.

**TL**: E I CLIENTI?!

**ME**: I clienti... li chiamiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Backup recenti: corrotti
- Disco backup: pieno
- Ultimo backup valido: 8 aprile
- Ordini persi: 12.847+

E tutto era chiaro. Il backup non funzionava. E non era mai stato testato. E ora pagavamo il prezzo. Amen.

---

**Lunedì - 08:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava ancora dormendo.

**ME**: JN, chi gestisce i backup?

**JN**: (voce assonnata) I backup?!

**ME**: Sì. Il backup server è pieno. I backup sono corrotti.

**JN**: Corrotti?!

**ME**: Sì. Da due giorni. Il disco è al 98%.

**JN**: Ma... c'è un alert per quello!

**ME**: E L'HAI MAI CONTROLLATO?!

**JN**: No... pensavo che funzionasse!

**ME**: E IL TEST DEL BACKUP?!

**JN**: Il test?!

**ME**: Sì. Hai mai provato a ripristinare?

**JN**: No... ma i backup ci sono!

**ME**: JN, I BACKUP CORROTTI NON SONO BACKUP. SONO FILE INUTILI.

**JN**: Ok...

**ME**: E ORA IL DATABASE È CORROTTO. E NON POSSIAMO RIPRISTINARE.

**JN**: Cosa?!

**ME**: IL DATABASE È CORROTTO. E L'ULTIMO BACKUP VALIDO È DI 3 GIORNI FA.

**JN**: 3 GIORNI?!

**ME**: Sì. Perdiamo 12.847 ordini. O più.

**JN**: Ma... non è colpa mia!

**ME**: DI CHI È ALLORA?!

**JN**: Non lo so... il backup è automatico!

**ME**: AUTOMATICO NON VUOL DIRE CHE FUNZIONA!

**JN**: Ok...

**ME**: E LA PROSSIMA VOLTA TESTA IL BACKUP!

**JN**: Ok...

JN ha riattaccato. O forse ha riattaccato per tornare a dormire. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Backup: corrotti
- Disco: pieno
- JN: inaffidabile
- Ordini: persi

E la lezione era chiara. Il backup va testato. E il disco va monitorato. E JN va educato. Amen.

---

**Lunedì - 08:30**

Ho ripristinato il backup. E pulito il disco.

**TERMINALE**:
```
# Ferma applicazione
kubectl scale deployment/api --replicas=0
kubectl scale deployment/checkout --replicas=0
kubectl scale deployment/orders --replicas=0

# Ripristina backup
kubectl exec -it postgres-0 -- psql -U admin -c "DROP DATABASE orders;"
kubectl exec -it backup-server -- gunzip -c /backups/postgres/postgres-2026-04-08.sql.gz | kubectl exec -i postgres-0 -- psql -U admin

# Verifica
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM orders"
count
--------
221720

# Pulisci disco backup
kubectl exec -it backup-server -- rm /backups/postgres/postgres-2026-04-10.sql.gz
kubectl exec -it backup-server -- rm /backups/postgres/postgres-2026-04-09.sql.gz

# Aggiungi spazio
kubectl exec -it backup-server -- fallocate -l 50G /backups/dummy && rm /backups/dummy

# Riavvia applicazione
kubectl scale deployment/api --replicas=3
kubectl scale deployment/checkout --replicas=3
kubectl scale deployment/orders --replicas=3
```

**ME**: Backup ripristinato. 221.720 ordini recuperati.

**TL**: E GLI ALTRI?!

**ME**: Persi. 12.847 ordini degli ultimi 3 giorni.

**TL**: E I CLIENTI?!

**ME**: Li contattiamo. E offriamo sconti.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Database: ripristinato
- Ordini recuperati: 221.720
- Ordini persi: 12.847
- Disco: pulito

E tutto funzionava. Ma avevamo perso dati. E la lezione era chiara. Il backup va testato. E il disco va monitorato. Amen.

---

**Lunedì - 09:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL non era di buon umore.

**UL**: Pronto?

**ME**: Abbiamo avuto un problema con il database.

**UL**: Che problema?

**ME**: La tabella orders si è corrotta. E i backup erano corrotti.

**UL**: CORROTTI?!

**ME**: Sì. Il disco del backup server era pieno. I backup si interrompevano prima di finire.

**UL**: E DA QUANDO?!

**ME**: Dal 9 aprile. Due giorni.

**UL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Non c'era monitoraggio sul disco del backup server.

**UL**: E QUANTI DATI PERSI?!

**ME**: 12.847 ordini. 3 giorni.

**UL**: 12.847 ORDINI?!

**ME**: Sì. Ma abbiamo ripristinato il backup del 8 aprile.

**UL**: E I CLIENTI?!

**ME**: Li contattiamo. E offriamo sconti.

**UL**: E CHI GESTISCE I BACKUP?!

**ME**: JN. Ma non li ha mai testati.

**UL**: MAI?!

**ME**: Mai. E non c'era monitoraggio sul disco.

**UL**: E QUINDI?!

**ME**: E quindi... aggiungo monitoraggio. E test automatici per il backup.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E configuro i test. E il monitoraggio.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. Il backup va testato. E il disco va monitorato. E la documentazione è obbligatoria. Amen.

---

**Martedì - Il Test**

Martedì. Ho aggiunto test automatici per il backup.

**TERMINALE**:
```
# Crea script di test backup
cat > /scripts/test-backup.sh << 'EOF'
#!/bin/bash
set -e

echo "=== BACKUP TEST ==="
echo "Date: $(date)"

# Verifica che il backup esista
LATEST_BACKUP=$(ls -t /backups/postgres/*.sql.gz | head -1)
if [ -z "$LATEST_BACKUP" ]; then
  echo "ERROR: No backup found!"
  exit 1
fi
echo "Latest backup: $LATEST_BACKUP"

# Verifica integrità
echo "Testing integrity..."
gzip -t "$LATEST_BACKUP" || {
  echo "ERROR: Backup is corrupted!"
  exit 1
}
echo "Integrity: OK"

# Verifica dimensione minima
SIZE=$(stat -f%z "$LATEST_BACKUP" 2>/dev/null || stat -c%s "$LATEST_BACKUP")
if [ "$SIZE" -lt 1000000000 ]; then
  echo "ERROR: Backup too small ($SIZE bytes)"
  exit 1
fi
echo "Size: $SIZE bytes"

# Test restore su database temporaneo
echo "Testing restore..."
gunzip -c "$LATEST_BACKUP" | psql -U admin -d test_restore || {
  echo "ERROR: Restore failed!"
  exit 1
}

# Verifica dati
COUNT=$(psql -U admin -d test_restore -t -c "SELECT COUNT(*) FROM orders")
echo "Orders in backup: $COUNT"

# Pulisci
psql -U admin -c "DROP DATABASE test_restore;"

echo "=== BACKUP TEST PASSED ==="
EOF

# Aggiungi a cron
echo "0 6 * * * /scripts/test-backup.sh >> /var/log/backup-test.log 2>&1" | crontab -

# Esegui test
/scripts/test-backup.sh
=== BACKUP TEST ===
Date: Tue Apr 11 06:00:00 UTC 2026
Latest backup: /backups/postgres/postgres-2026-04-11.sql.gz
Integrity: OK
Size: 48234567890 bytes
Testing restore...
Orders in backup: 221720
=== BACKUP TEST PASSED ===
```

**TL**: Hai aggiunto il test?

**ME**: Sì. Testa l'integrità. La dimensione. E il restore su database temporaneo.

**TL**: E QUANDO GIRA?!

**ME**: Ogni giorno alle 6:00. Prima che inizi la giornata.

**TL**: E SE FALLISCE?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... il backup continua a essere corrotto. Ma almeno lo sappiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: passing
- Integrità: verificata
- Restore: funzionante
- Cron: configurato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il backup va testato. E che il test deve essere automatico. E che JN va educato. Amen.

---

**Mercoledì - Il Monitoraggio**

Mercoledì. Ho aggiunto monitoraggio per il disco del backup server.

**TERMINALE**:
```
# Configura alert per disco
cat > /etc/prometheus/alerts/backup.yml << 'EOF'
groups:
  - name: backup
    rules:
      - alert: BackupDiskSpaceLow
        expr: (node_filesystem_avail_bytes{mountpoint="/backups"} / node_filesystem_size_bytes{mountpoint="/backups"}) < 0.2
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Backup disk space low on {{ $labels.instance }}"
          description: "Backup disk is {{ $value | humanizePercentage }} full. Only {{ $labels.instance }} has {{ $value }} available."

      - alert: BackupDiskSpaceCritical
        expr: (node_filesystem_avail_bytes{mountpoint="/backups"} / node_filesystem_size_bytes{mountpoint="/backups"}) < 0.1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Backup disk space CRITICAL on {{ $labels.instance }}"
          description: "Backup disk is almost full! Only {{ $value | humanizePercentage }} available."

      - alert: BackupFailed
        expr: increase(backup_success_total[1d]) == 0
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Backup has not run in the last 24 hours"
          description: "No successful backup in the last 24 hours. Check backup job."

      - alert: BackupCorrupted
        expr: backup_integrity_check == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Backup integrity check failed"
          description: "The latest backup failed integrity check. Backup may be corrupted."

      - alert: BackupRestoreTestFailed
        expr: backup_restore_test == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Backup restore test failed"
          description: "The daily backup restore test failed. Backup may not be restorable."
EOF

# Aggiungi metriche
cat > /usr/local/bin/backup-metrics.sh << 'EOF'
#!/bin/bash
# Backup metrics for Prometheus

BACKUP_DIR="/backups/postgres"
METRICS_FILE="/var/lib/node_exporter/textfile_collector/backup.prom"

# Conta backup
BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/*.sql.gz 2>/dev/null | wc -l)

# Dimensione totale
BACKUP_SIZE=$(du -sb "$BACKUP_DIR" 2>/dev/null | cut -f1)

# Ultimo backup
LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.sql.gz 2>/dev/null | head -1)
LATEST_SIZE=$(stat -c%s "$LATEST_BACKUP" 2>/dev/null || echo 0)

# Integrità
if gzip -t "$LATEST_BACKUP" 2>/dev/null; then
  INTEGRITY=1
else
  INTEGRITY=0
fi

# Scrivi metriche
cat > "$METRICS_FILE" << METRICS
backup_count $BACKUP_COUNT
backup_total_size_bytes $BACKUP_SIZE
backup_latest_size_bytes $LATEST_SIZE
backup_integrity_check $INTEGRITY
METRICS
EOF

# Aggiungi a cron
echo "* * * * * /usr/local/bin/backup-metrics.sh" | crontab -
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per disco pieno. Alert per backup fallito. Alert per integrità. Alert per test restore.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che uccidano i backup.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Test: passing
- Monitoraggio: completo

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i backup vanno testati. Amen.

---

**Giovedì - L'Educazione**

Giovedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il backup?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il backup corrotto è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: il backup va testato.

**JN**: Sempre?

**ME**: Sempre. Ogni giorno. Automaticamente. Con restore su database temporaneo.

**JN**: Ok.

**ME**: Secondo: il disco del backup server va monitorato.

**JN**: Monitorato?

**ME**: Sì. Con alert per spazio insufficiente. E per backup falliti.

**JN**: Ok.

**ME**: Terzo: il backup deve essere verificato.

**JN**: Verificato?

**ME**: Sì. Integrità del file. Dimensione minima. Contenuto valido.

**JN**: Ok.

**ME**: Quarto: il restore va testato.

**JN**: Testato?

**ME**: Sì. Prova a ripristinare su un database temporaneo. E verifica che i dati ci siano.

**JN**: Ok.

**ME**: Quinto: documenta i backup.

**JN**: Documenta?

**ME**: Sì. Dove sono. Quanto sono grandi. Quanto tempo ci vuole per ripristinare. E cosa fare se falliscono.

**JN**: E se non ho tempo?

**ME**: Allora... trovi il tempo. Perché la prossima volta il database si corrompe. E se non sai come ripristinare, sei fottuto.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Test: automatico
- Monitoraggio: attivo
- Alert: configurati
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non perdere i dati è avere backup testati. E monitorati. E documentati. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i backup.

```markdown
## Incident #BACKUP-001: Il Backup Che Non È Mai Stato Testato

**Data incident**: Lunedì 10 aprile 2026, 07:00
**Autore**: JN
**Servizio**: Database orders
**Problema**: Backup corrotti + database corrotto
**Causa**: Disco backup server pieno + nessun test del backup
**Tempo di esposizione**: 2 giorni (backup corrotti)
**Ordini persi**: 12.847
**Ordini recuperati**: 221.720
**Tempo di risoluzione**: 3 ore
**Downtime**: 1 ora (restore)
**Reazione UL**: "12.847 ordini?!"
**Reazione TL**: "I backup erano corrotti?!"
**Reazione CTO**: "Testa il backup. Monitora il disco."
**Soluzione**: Test automatici + monitoraggio + educazione
**Lezione imparata**: IL BACKUP VA TESTATO. SEMPRE.

**Regole per i backup**:
1. TESTA il backup ogni giorno. Con restore automatico.
2. MONITORA il disco del backup server. Con alert per spazio insufficiente.
3. VERIFICA l'integrità del backup. Con gzip -t o equivalente.
4. DOCUMENTA come ripristinare. E quanto tempo ci vuole.
5. Tieni backup multipli. Non fidarti di uno solo.
6. I backup corrotti non sono backup. Sono file inutili.
7. Il backup è come un paracadute. Se non lo testi, non si apre. Amen.

**Come testare il backup**:
```bash
# Verifica integrità
gzip -t /backups/postgres/latest.sql.gz

# Test restore su database temporaneo
gunzip -c /backups/postgres/latest.sql.gz | psql -U admin -d test_restore

# Verifica dati
psql -U admin -d test_restore -c "SELECT COUNT(*) FROM orders"

# Pulisci
psql -U admin -c "DROP DATABASE test_restore;"
```

**Come configurare alert per disco**:
```yaml
groups:
  - name: backup
    rules:
      - alert: BackupDiskSpaceLow
        expr: (node_filesystem_avail_bytes{mountpoint="/backups"} / node_filesystem_size_bytes{mountpoint="/backups"}) < 0.2
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Backup disk space low"
```

**Come configurare test automatico**:
```bash
# Aggiungi a cron
0 6 * * * /scripts/test-backup.sh >> /var/log/backup-test.log 2>&1
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che il backup va testato. E che il disco va monitorato. E che i backup corrotti non sono backup. E che JN va educato. E che 12.847 ordini persi sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: il backup è come un paracadute. Se non lo testi, non si apre. E se non si apre, cadi. E se cadi, il database cade. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il backup era corrotto." E UL dice: "E PERCHÉ ERA CORROTTO?!" E tu dici: "Perché il disco era pieno." E UL dice: "E PERCHÉ NON L'AVEVI MONITORATO?!" E tu dici: "Non c'era l'alert." E UL dice: "E PERCHÉ NON C'ERA L'ALERT?!" E tu dici: "Perché non pensavo che fosse importante." E la verità è che tutto è importante. Nel DevOps. E se non testi il backup, non sai se funziona. E se non sai se funziona, non funziona. E se non funziona, perdi dati. E se perdi dati, impari. Impari che il backup va testato. E che il disco va monitorato. E che JN va educato. Amen.

---

## Il costo del backup non testato

| Voce | Valore |
|------|--------|
| Servizio | Database orders |
| Autore | JN |
| Data incident | 10/04/2026, 07:00 |
| Tempo di esposizione | 2 giorni |
| Backup corrotti | 2 |
| Ultimo backup valido | 08/04/2026 |
| Ordini persi | 12.847 |
| Ordini recuperati | 221.720 |
| Tempo di risoluzione | 3 ore |
| Downtime | 1 ora |
| Disco backup server | 98% pieno |
| Test backup | Mai eseguito |
| Monitoraggio disco | Non configurato |
| Reazione UL | "12.847 ordini?!" |
| Reazione TL | "I backup erano corrotti?!" |
| Reazione CTO | "Testa il backup." |
| Soluzione | Test automatici + monitoraggio |
| Lezione imparata | BACKUP = TEST + MONITORAGGIO |
| **Totale** | **12.847 ordini persi + 3 ore di downtime + 1 junior educato** |

**Morale**: Il backup non serve a nulla se non lo testi. Puoi avere backup giornalieri. Puoi avere backup incrementali. Puoi avere backup off-site. Puoi avere tutto. Ma se non hai mai provato a ripristinare, non hai nulla. E quando il database si corrompe, e tu provi a ripristinare, e il backup non funziona, ti ritrovi con un database vuoto. E i clienti che chiamano. E UL che chiama. E tu che provi a ripristinare. E il restore fallisce. E tu ti chiedi: "Com'è possibile che il backup non funzioni?" E la risposta è semplice: perché nessuno l'ha mai testato. E il backup è come un paracadute. Se non lo testi, quando ti serve non si apre. E tu cadi. E il database cade. E tutti cadono. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](111-il-feature-flag-che-non-si-spegneva-mai.md) | [Prossima](113-la-query-che-ha-fuso-il-database.md)**
