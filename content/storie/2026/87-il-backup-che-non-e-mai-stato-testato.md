# Il Backup Che Non È Mai Stato Testato

**Data**: 17/10/2026

**[Home](../index.md) | [Precedente](86-il-log-che-ha-riempito-il-disco.md)]**

---

C'è una verità nell'IT che tutti conoscono ma nessuno rispetta: i backup esistono. Ma i backup testati no. E la differenza tra un backup e un backup testato è la differenza tra la speranza e la certezza. E quando il database si corrompe, e tu vai a ripristinare, e scopri che il backup è vuoto, o incompleto, o illeggibile, o della versione sbagliata, allora capisci. Capisci che la speranza non basta. E che il backup non testato è come un paracadute non testato. Ti dà sicurezza finché non ti serve. E quando ti serve, scopri che non funziona. E a quel punto, è troppo tardi. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Corruzione**

Era lunedì. Le 8:23. Il caffè era ancora bollente.

Poi è arrivato l'errore.

**TERMINALE**:
```
ERROR: Database connection failed
ERROR: Corruption detected in table 'orders'
ERROR: Unable to read page 4521
```

**ME**: Il database è corrotto.

**TL**: Corrotto?

**ME**: Sì. La tabella orders è illeggibile.

**TL**: E gli ordini?

**ME**: Non accessibili.

**TL**: E i clienti?

**ME**: Non possono ordinare.

**TL**: E le fatture?

**ME**: Non possono essere emesse.

**TL**: E QUINDI?!

**ME**: E quindi... ripristino dal backup.

**TL**: E IL BACKUP?!

**ME**: Il backup c'è. Ogni notte. Alle 3.

**TL**: E QUANDO È STATO FATTO L'ULTIMO?

**ME**: Ieri notte. Alle 3.

**TL**: E QUINDI?

**ME**: E quindi... ripristino.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Database: corrotto
- Tabella: orders
- Backup: disponibile
- Ultimo backup: 5 ore fa

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Perché le cose che sembrano ok le dai per scontate. E le cose date per scontate ti perseguitano. Amen.

---

**Lunedì - 09:00**

Ho provato a ripristinare. Ho scoperto la verità.

**TERMINALE**:
```
# Lista backup
ls -lh /backup/db/
total 0
-rw-r--r-- 1 backup backup 0 Oct 17 03:00 production-2026-10-17.sql.gz
-rw-r--r-- 1 backup backup 0 Oct 16 03:00 production-2026-10-16.sql.gz
-rw-r--r-- 1 backup backup 0 Oct 15 03:00 production-2026-10-15.sql.gz
...
```

**ME**: I backup sono vuoti.

**TL**: Vuoti?

**ME**: Sì. 0 byte.

**TL**: ZERO BYTE?!

**ME**: Zero.

**TL**: E DA QUANDO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla quando sono diventati vuoti
ls -lh /backup/db/ | head -20
-rw-r--r-- 1 backup backup 0 Oct 17 03:00 production-2026-10-17.sql.gz
-rw-r--r-- 1 backup backup 0 Oct 16 03:00 production-2026-10-16.sql.gz
...
-rw-r--r-- 1 backup backup 0 Oct 3 03:00 production-2026-10-03.sql.gz
-rw-r--r-- 1 backup backup 847M Oct 2 03:00 production-2026-10-02.sql.gz
-rw-r--r-- 1 backup backup 851M Oct 1 03:00 production-2026-10-01.sql.gz
```

**ME**: Dal 3 ottobre. Due settimane.

**TL**: DUE SETTIMANE?!

**ME**: Sì. Due settimane di backup vuoti.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Non c'era un alert.

**TL**: E PERCHÉ?!

**ME**: Perché... non ci abbiamo pensato.

**TL**: E IL BACKUP DI IERI?!

**ME**: Ieri era il 16. Vuoto.

**TL**: E QUELLO DEL 2 OTTOBRE?!

**ME**: Quello è valido. 847M.

**TL**: E QUINDI?

**ME**: E quindi... perdiamo due settimane di dati.

**TL**: DUE SETTIMANE?!

**ME**: Sì. Dal 2 al 17 ottobre.

**TL**: E GLI ORDINI?!

**ME**: Gli ordini di due settimane... andati.

**TL**: E I CLIENTI?!

**ME**: I clienti... non saranno felici.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Backup validi: fino al 2 ottobre
- Backup vuoti: dal 3 ottobre
- Dati persi: 15 giorni
- Ordini persi: non lo so ancora

E tutto era chiaro. Il backup girava. Ma non funzionava. E nessuno l'aveva testato. E nessuno l'aveva verificato. E ora pagavamo. Amen.

---

**Lunedì - 10:00**

Ho controllato lo script di backup. Ho trovato il problema.

**TERMINALE**:
```
cat /usr/local/bin/backup-db.sh
#!/bin/bash
# Backup database
DATE=$(date +%Y-%m-%d)
mysqldump -u $DB_USER -p$DB_PASS production > /tmp/backup.sql

# Comprimi
gzip /tmp/backup.sql

# Sposta in /backup/db/
mv /tmp/backup.sql.gz /backup/db/production-$DATE.sql.gz

# Pulisci
rm /tmp/backup.sql
```

**ME**: Lo script sembra ok.

**TL**: E allora perché i backup sono vuoti?

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
cat /var/log/backup.log
2026-10-17 03:00:01 Starting backup...
2026-10-17 03:00:02 ERROR: Access denied for user 'backup'@'localhost'
2026-10-17 03:00:02 Backup completed (0 bytes)
...
2026-10-03 03:00:01 Starting backup...
2026-10-03 03:00:02 ERROR: Access denied for user 'backup'@'localhost'
2026-10-03 03:00:02 Backup completed (0 bytes)
2026-10-02 03:00:01 Starting backup...
2026-10-02 03:00:05 Backup completed (851M compressed)
```

**ME**: Access denied.

**TL**: Access denied?!

**ME**: Sì. La password è cambiata il 3 ottobre.

**TL**: E CHI L'HA CAMBIATA?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
git log --all --source --full-history -S "backup" -- scripts/
commit def456abc123
Author: jn-developer
Date:   Fri Oct 2 2026

    "Updated database credentials"
```

**ME**: JN. Il junior.

**TL**: JN?!

**ME**: Sì. Ha aggiornato le credenziali il 2 ottobre.

**TL**: E NON HA AGGIORNATO LO SCRIPT DI BACKUP?!

**ME**: No. Ha aggiornato solo l'applicazione.

**TL**: E LO SCRIPT HA CONTINUATO A GIRARE CON LA VECCHIA PASSWORD?!

**ME**: Sì. E ha fallito. Ogni notte. Per due settimane.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Lo script non mandava alert.

**TL**: E QUINDI?!

**ME**: E quindi... due settimane di backup vuoti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Password cambiata: 2 ottobre
- Script non aggiornato: mai
- Backup falliti: 15 giorni
- Autore: JN
- Alert: mai

E tutto era chiaro. JN aveva cambiato la password. Ma non lo script. E lo script girava. E falliva. E nessuno lo sapeva. E ora pagavamo. Amen.

---

**Lunedì - 11:00**

Ho chiamato JN. JN ha risposto.

**ME**: Hai cambiato la password del database il 2 ottobre?

**JN**: Sì. Perché?

**ME**: E hai aggiornato lo script di backup?

**JN**: Quale script?

**ME**: Quello che fa il backup ogni notte.

**JN**: C'è uno script di backup?

**ME**: SÌ. C'È UNO SCRIPT DI BACKUP.

**JN**: Ah. Non lo sapevo.

**ME**: E QUINDI HAI CAMBIATO LA PASSWORD E NON HAI AGGIORNATO LO SCRIPT?!

**JN**: Ma... non c'era nella documentazione.

**ME**: QUALE DOCUMENTAZIONE?!

**JN**: Quella che ho letto quando sono arrivato.

**ME**: E COSA DICEVA?!

**JN**: Diceva: "Cambia le password ogni 90 giorni."

**ME**: E DICEVA DI AGGIORNARE LO SCRIPT DI BACKUP?!

**JN**: No.

**ME**: E QUINDI?!

**JN**: E quindi... non l'ho fatto.

**ME**: E ORA IL DATABASE È CORROTTO E NON ABBIAMO BACKUP!

**JN**: Oh.

**ME**: OH?!

**JN**: Scusa.

**ME**: SCUSA?!

**JN**: Sì. Scusa. Non succederà più.

**ME**: NON SUCCEDERÀ PIÙ PERCHÉ ORA METTO UN ALERT!

**JN**: Ok.

**ME**: E ORA DEVO DIRE A UL CHE ABBIAMO PERSO DUE SETTIMANE DI DATI!

**JN**: Oh.

**ME**: OH?!

JN ha riattaccato. O forse ho riattaccato io. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Backup: vuoti
- Password: cambiata
- Script: non aggiornato
- Colpa: JN
- Ma anche: nessun alert
- Ma anche: nessun test
- Ma anche: nessuna documentazione

E la colpa era di tutti. E di nessuno. E il database era corrotto. E i backup erano vuoti. E ora toccava a me dirlo a UL. Amen.

---

**Lunedì - 12:00**

Ho chiamato UL. UL ha risposto.

**ME**: Il database è corrotto.

**UL**: E IL BACKUP?!

**ME**: Il backup... è vuoto.

**UL**: VUOTO?!

**ME**: Sì. Da due settimane.

**UL**: DUE SETTIMANE?!

**ME**: Sì. La password è cambiata e lo script non è stato aggiornato.

**UL**: E CHI HA CAMBIATO LA PASSWORD?!

**ME**: JN.

**UL**: E PERCHÉ NON HA AGGIORNATO LO SCRIPT?!

**ME**: Non lo sapeva.

**UL**: NON LO SAPEVA?!

**ME**: No. Non c'era nella documentazione.

**UL**: E QUALE DOCUMENTAZIONE?!

**ME**: Quella che... non esiste.

**UL**: NON ESISTE?!

**ME**: No. Non c'è documentazione per i backup.

**UL**: E QUINDI?!

**ME**: E quindi... JN non poteva saperlo.

**UL**: E TU?!

**ME**: Io... non ho testato i backup.

**UL**: NON HAI TESTATO?!

**ME**: No. Non c'era tempo.

**UL**: E QUANDO CI SARÀ TEMPO?!

**ME**: Non lo so. Quando finiamo le feature.

**UL**: E LE FEATURE?!

**ME**: Il PM ne aggiunge sempre.

**UL**: E I BACKUP?!

**ME**: I backup... giravano. Ma non funzionavano.

**UL**: E NESSUNO L'HA VERIFICATO?!

**ME**: No.

**UL**: E NESSUNO L'HA TESTATO?!

**ME**: No.

**UL**: E ORA?!

**ME**: Ora... ripristino dal 2 ottobre.

**UL**: E I DATI DAL 2 OTTOBRE?!

**ME**: Persi.

**UL**: TUTTI?!

**ME**: Tutti.

**UL**: E GLI ORDINI?!

**ME**: Non lo so. Devo contare.

**UL**: CONTALI!

**ME**: Ora. Subito.

UL ha riattaccato. Io guardavo il nulla. Il nulla che erano i nostri backup. Il nulla che era la nostra documentazione. Il nulla che era il nostro processo. E tutto era chiaro. I backup non testati non sono backup. Sono speranze. E le speranze deludono. Amen.

---

**Lunedì - 14:00**

Ho contato gli ordini persi. Ho contato i danni.

**TERMINALE**:
```
# Conta ordini dal 2 ottobre (dal log applicazione)
grep "Order created" /var/log/app/app.log | grep -E "2026-10-(0[3-9]|1[0-7])" | wc -l
847

# Valore medio ordine
SELECT AVG(total) FROM orders WHERE date >= '2026-09-01' AND date < '2026-10-02';
AVG: 127.50€

# Valore totale perso
847 × 127.50€ = 107.992,50€
```

**ME**: 847 ordini. 108.000 euro.

**TL**: 108.000 EURO?!

**ME**: Sì. Valore totale.

**TL**: E I CLIENTI?!

**ME**: 847 clienti. Che non troveranno i loro ordini.

**TL**: E LE FATTURE?!

**ME**: Le fatture... non sono state emesse.

**TL**: E QUINDI?!

**ME**: E quindi... dobbiamo ricreare gli ordini.

**TL**: COME?!

**ME**: Dalle email. Dai log. Dai record di pagamento.

**TL**: E SE NON CI SONO?!

**ME**: Allora... sono persi.

**TL**: E I CLIENTI?!

**ME**: I clienti... chiameranno.

**TL**: E UL?!

**ME**: UL... lo dirò dopo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Ordini persi: 847
- Valore: 108.000€
- Clienti: 847
- Fatture: da ricreare

E tutto era un disastro. Ma non era finita. Perché ora dovevo ripristinare. E ricreare. E pregare. Amen.

---

**Lunedì - 15:00**

Ho ripristinato il backup del 2 ottobre. Ho ricreato gli ordini dai log.

**TERMINALE**:
```
# Ripristina backup
gunzip -c /backup/db/production-2026-10-02.sql.gz | mysql production

# Verifica
mysql -e "SELECT COUNT(*) FROM orders WHERE date < '2026-10-02';"
COUNT: 12453

mysql -e "SELECT COUNT(*) FROM orders WHERE date >= '2026-10-02';"
COUNT: 0
```

**ME**: Ripristinato. Ma mancano gli ordini dal 2 ottobre.

**TL**: E COME LI RECUPERIAMO?!

**ME**: Dai log applicazione. E dalle email.

**TERMINALE**:
```
# Estrai ordini dai log
grep "Order created" /var/log/app/app.log | grep -E "2026-10-(0[3-9]|1[0-7])" > /tmp/orders-lost.log

# Conta
wc -l /tmp/orders-lost.log
847

# Formato
head -3 /tmp/orders-lost.log
2026-10-03 08:12:34 INFO Order created: id=45821, customer=1234, total=89.00
2026-10-03 08:15:22 INFO Order created: id=45822, customer=5678, total=156.50
2026-10-03 08:22:11 INFO Order created: id=45823, customer=9012, total=234.00
```

**ME**: Ho i dati degli ordini nei log.

**TL**: E PUOI RECUPERARLI?!

**ME**: Sì. Ma serve tempo.

**TL**: QUANTO?!

**ME**: Un giorno. Forse due.

**TL**: E I CLIENTI?!

**ME**: I clienti... aspettano.

**TL**: E SE NON ASPETTANO?!

**ME**: Allora... se ne vanno.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Backup: ripristinato
- Ordini persi: 847
- Recupero possibile: sì, dai log
- Tempo: 1-2 giorni

E tutto sembrava recuperabile. Ma le cose che sembrano recuperabili sono le più pericolose. Perché le cose che sembrano recuperabili le sottovaluti. E le cose sottovalutate ti perseguitano. Amen.

---

**Martedì - Il Recupero**

Martedì. Ho passato la giornata a recuperare ordini. Dai log. Dalle email. Dai record di pagamento.

**TERMINALE**:
```
# Script di recupero
cat > /tmp/recover-orders.py << 'EOF'
import re
import mysql.connector

# Connetti al database
db = mysql.connector.connect(host="localhost", user="admin", password="...", database="production")
cursor = db.cursor()

# Leggi log
with open("/tmp/orders-lost.log") as f:
    for line in f:
        match = re.search(r"Order created: id=(\d+), customer=(\d+), total=([\d.]+)", line)
        if match:
            order_id = match.group(1)
            customer_id = match.group(2)
            total = match.group(3)
            
            # Inserisci nel database
            cursor.execute("""
                INSERT INTO orders (id, customer_id, total, date, status)
                VALUES (%s, %s, %s, DATE(NOW()), 'recovered')
            """, (order_id, customer_id, total))

db.commit()
print(f"Recuperati {cursor.rowcount} ordini")
EOF

python3 /tmp/recover-orders.py
Recuperati 847 ordini
```

**ME**: Recuperati tutti gli ordini.

**TL**: TUTTI?!

**ME**: Tutti. Dai log applicazione.

**TL**: E SONO CORRETTI?!

**ME**: Sì. I log contengono tutti i dati.

**TL**: E LE FATTURE?!

**ME**: Le fatture... devo rigenerarle.

**TL**: E QUANTO TEMPO?!

**ME**: Un'altra giornata.

**TL**: E I CLIENTI?!

**ME**: I clienti... posso avvisarli.

**TL**: E COSA GLI DICI?!

**ME**: "Scusate, c'è stato un problema tecnico. I vostri ordini sono stati recuperati."

**TL**: E SE CHIEDONO PERCHÉ?!

**ME**: Allora... dico la verità.

**TL**: QUALE VERITÀ?!

**ME**: "Il backup non era testato. Abbiamo imparato la lezione."

**TL**: E IMPARERANNO LA LEZIONE?!

**ME**: No. I clienti non imparano lezioni. I clienti vogliono i loro ordini.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Ordini recuperati: 847
- Fatture: da rigenerare
- Clienti: da avvisare
- Lezione: imparata (spero)

E tutto era quasi risolto. Ma quasi non basta. Perché quasi significa che qualcosa è ancora rotto. E le cose ancora rotte ti perseguitano. Amen.

---

**Mercoledì - La Riunione**

Mercoledì. Riunione. Con UL. E il CTO. E il PM. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che i backup fossero vuoti?

**ME**: La password è cambiata. Lo script non è stato aggiornato.

**UL**: E CHI HA CAMBIATO LA PASSWORD?

**ME**: JN.

**UL**: E PERCHÉ NON HA AGGIORNATO LO SCRIPT?

**ME**: Non lo sapeva. Non c'era documentazione.

**UL**: E TU?

**ME**: Io non ho testato i backup.

**UL**: E PERCHÉ?

**ME**: Non c'era tempo.

**UL**: E QUANDO CI SARÀ TEMPO?

**ME**: Non lo so. Quando finiamo le feature.

**PM**: Le feature sono importanti!

**UL**: I BACKUP SONO PIÙ IMPORTANTI!

**PM**: Ma i clienti vogliono le feature!

**UL**: I CLIENTI VOGLIONO ANCHE I LORO ORDINI!

**CTO**: Basta. Il problema è che non c'era un test dei backup. E non c'era un alert. E ora mettiamo entrambi.

**ME**: Sì.

**CTO**: E chi lo fa?

**ME**: Lo faccio io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E cosa testiamo?

**ME**: Il ripristino. Ogni settimana.

**CTO**: E l'alert?

**ME**: Ogni giorno. Se il backup fallisce, manda un messaggio.

**CTO**: E se il backup è vuoto?

**ME**: Allora manda un messaggio che dice "BACKUP VUOTO".

**CTO**: E SE NESSUNO LO VEDE?!

**ME**: Allora... prega.

**CTO**: E SE IL DATABASE SI CORROMPE DI NUOVO?!

**ME**: Allora... ripristiniamo.

**CTO**: E SE IL BACKUP È VUOTO DI NUOVO?!

**ME**: Allora... prega tanto.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era il nostro sistema di backup. Il nulla che era il nostro test. Il nulla che era la nostra documentazione. E tutto doveva cambiare. Amen.

---

**Giovedì - L'Alert**

Giovedì. Ho configurato l'alert per i backup. Per non essere sorpresi di nuovo.

**TERMINALE**:
```
# Script di verifica backup
cat > /usr/local/bin/check-backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/db"
MIN_SIZE=100000000  # 100MB

# Trova ultimo backup
LATEST=$(ls -t $BACKUP_DIR/*.sql.gz | head -1)
SIZE=$(stat -c%s "$LATEST")

if [ $SIZE -lt $MIN_SIZE ]; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ BACKUP VUOTO: $LATEST è solo $SIZE bytes!\"}"
  exit 1
fi

# Verifica che il backup sia leggibile
if ! gunzip -t "$LATEST" 2>/dev/null; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ BACKUP CORROTTO: $LATEST non è leggibile!\"}"
  exit 1
fi

echo "Backup OK: $LATEST ($SIZE bytes)"
EOF

chmod +x /usr/local/bin/check-backup.sh

# Cron job ogni giorno dopo il backup
echo "0 4 * * * /usr/local/bin/check-backup.sh" | crontab -
```

**TL**: Hai configurato l'alert?

**ME**: Sì.

**TL**: E cosa fa?

**ME**: Controlla che il backup non sia vuoto. E che sia leggibile.

**TL**: E quando lo controlla?

**ME**: Ogni giorno. Alle 4 del mattino. Un'ora dopo il backup.

**TL**: E se è vuoto?

**ME**: Manda un messaggio su Slack.

**TL**: E se Slack è down?

**ME**: Allora... prega.

**TL**: E SE NESSUNO VEDE IL MESSAGGIO?!

**ME**: Allora... prega tanto.

**TL**: E SE IL BACKUP È VUOTO DI NUOVO?!

**ME**: Allora... lo vediamo. E lo sistemiamo.

**TL**: E LA PROSSIMA VOLTA?

**ME**: La prossima volta... non succede.

**TL**: E SE SUCCede?

**ME**: Allora... non è colpa mia. È colpa di chi non ha letto l'alert.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurato
- Check: ogni giorno
- Threshold: 100MB
- Canale: Slack

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Perché le cose che sembrano ok le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Venerdì - Il Test**

Venerdì. Ho configurato il test del ripristino. Per verificare che il backup funzioni davvero.

**TERMINALE**:
```
# Script di test ripristino
cat > /usr/local/bin/test-restore.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/db"
TEST_DB="backup_test"

# Trova ultimo backup
LATEST=$(ls -t $BACKUP_DIR/*.sql.gz | head -1)

# Crea database di test
mysql -e "DROP DATABASE IF EXISTS $TEST_DB;"
mysql -e "CREATE DATABASE $TEST_DB;"

# Ripristina
gunzip -c "$LATEST" | mysql $TEST_DB

# Verifica
TABLES=$(mysql -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$TEST_DB';")
ROWS=$(mysql -N -e "SELECT COUNT(*) FROM $TEST_DB.orders;" 2>/dev/null || echo "0")

if [ $TABLES -lt 10 ] || [ $ROWS -lt 1000 ]; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ TEST RIPRISTINO FALLITO: $LATEST non contiene dati validi!\"}"
  exit 1
fi

# Pulisci
mysql -e "DROP DATABASE $TEST_DB;"

echo "Test OK: $LATEST contiene $TABLES tabelle e $ROWS ordini"
EOF

chmod +x /usr/local/bin/test-restore.sh

# Cron job ogni settimana
echo "0 5 * * 0 /usr/local/bin/test-restore.sh" | crontab -
```

**TL**: Hai configurato il test di ripristino?

**ME**: Sì.

**TL**: E cosa fa?

**ME**: Ripristina il backup in un database di test. E verifica che i dati ci siano.

**TL**: E quando lo fa?

**ME**: Ogni domenica. Alle 5 del mattino.

**TL**: E SE FALLISCE?

**ME**: Manda un messaggio su Slack.

**TL**: E SE NESSUNO LO VEDE?!

**ME**: Allora... prega.

**TL**: E SE IL BACKUP È CORROTTO?!

**ME**: Allora... lo scopiamo. E lo sistemiamo.

**TL**: E LA PROSSIMA VOLTA?

**ME**: La prossima volta... il backup funziona. Perché lo testiamo.

**TL**: E SE NON LO TESTIAMO?!

**ME**: Allora... non è un backup. È una speranza.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: configurato
- Frequenza: ogni settimana
- Verifica: tabelle + righe
- Canale: Slack

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i backup non testati non sono backup. Sono speranze. E le speranze deludono. E i backup testati sono certezze. E le certezze salvano. Amen.

---

**La Documentazione**

Ho documentato. Per i posteri. Per i futuri sistemisti che avrebbero dimenticato di testare i backup.

```markdown
## Incident #BACKUP-001: Il Backup Che Non È Mai Stato Testato

**Data incident**: Lunedì 17 ottobre 2026, 08:23
**Autore**: ME
**Database**: production
**Problema**: Database corrotto, backup vuoti
**Causa**: Password cambiata, script non aggiornato
**Autore del cambio password**: JN
**Data del cambio password**: 2 ottobre 2026
**Giorni di backup vuoti**: 15
**Ordini persi**: 847
**Valore ordini persi**: 108.000€
**Tempo di recupero**: 2 giorni
**Downtime**: 0 (database ripristinato)
**Clienti colpiti**: 847
**Ticket aperti**: 23
**Chiamate ricevute**: 15
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "Il backup non era testato?!"
**Reazione CTO**: "Mettiamo alert e test."
**Soluzione**: Alert + test settimanale + documentazione
**Lezione imparata**: I BACKUP NON TESTATI NON SONO BACKUP.

**Configurazione corretta**:
1. Alert per backup vuoti o corrotti
2. Test di ripristino ogni settimana
3. Documentazione per cambi password
4. Verifica dimensione backup
5. Verifica leggibilità backup
6. Database di test per ripristino
7. Notifica su Slack
8. Log di backup verificati
9. Script di backup documentato
10. I backup non testati non sono backup

**Come configurare alert per backup**:
```bash
cat > /usr/local/bin/check-backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/db"
MIN_SIZE=100000000

LATEST=$(ls -t $BACKUP_DIR/*.sql.gz | head -1)
SIZE=$(stat -c%s "$LATEST")

if [ $SIZE -lt $MIN_SIZE ]; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ BACKUP VUOTO: $LATEST\"}"
  exit 1
fi

if ! gunzip -t "$LATEST" 2>/dev/null; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ BACKUP CORROTTO: $LATEST\"}"
  exit 1
fi
EOF

echo "0 4 * * * /usr/local/bin/check-backup.sh" | crontab -
```

**Come configurare test di ripristino**:
```bash
cat > /usr/local/bin/test-restore.sh << 'EOF'
#!/bin/bash
LATEST=$(ls -t /backup/db/*.sql.gz | head -1)
mysql -e "DROP DATABASE IF EXISTS backup_test; CREATE DATABASE backup_test;"
gunzip -c "$LATEST" | mysql backup_test
TABLES=$(mysql -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'backup_test';")
if [ $TABLES -lt 10 ]; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ TEST RIPRISTINO FALLITO\"}"
  exit 1
fi
mysql -e "DROP DATABASE backup_test;"
EOF

echo "0 5 * * 0 /usr/local/bin/test-restore.sh" | crontab -
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i backup non testati non sono backup. E che le speranze deludono. E che le certezze salvano. E che JN non sapeva dello script. E che la documentazione mancava. E che l'alert salva la vita. E che il test salva i dati. E che 847 ordini sono tanti. E che 108.000 euro sono tanti. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i backup sono come i paracadute. Se non li testi, non sai se funzionano. E se non sai se funzionano, non puoi fidarti. E se non ti fidi, non hai niente. E quando ti serve, scopri che non funziona. E a quel punto, è troppo tardi. E i dati sono persi. E i clienti sono arrabbiati. E UL chiama. E tu rispondi. E dici: "Il backup era vuoto." E UL dice: "COM'È POSSIBILE?!" E tu dici: "Non l'avevamo testato." E UL dice: "E PERCHÉ?!" E tu dici: "Non c'era tempo." E il tempo non c'è mai. Ma i backup devono essere testati. Sempre. Perché i backup non testati non sono backup. Sono speranze. E le speranze deludono. Amen.

---

## Il costo del backup non testato

| Voce | Valore |
|------|--------|
| Database | production |
| Giorni di backup vuoti | 15 |
| Ordini persi | 847 |
| Valore ordini | 108.000€ |
| Tempo di recupero | 2 giorni |
| Downtime | 0 (prevenuto) |
| Clienti colpiti | 847 |
| Ticket aperti | 23 |
| Chiamate ricevute | 15 |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "Il backup non era testato?!" |
| Reazione CTO | "Mettiamo alert e test." |
| Soluzione | Alert + test + documentazione |
| Lezione imparata | BACKUP = TEST + ALERT + DOCUMENTAZIONE |
| **Totale** | **847 ordini + 108.000€ + 23 ticket + 1 lezione** |

**Morale**: I backup esistono. Ma i backup testati no. E la differenza è tutto. Perché un backup non testato è una speranza. E le speranze deludono. E quando il database si corrompe, e tu vai a ripristinare, e scopri che il backup è vuoto, allora capisci. Capisci che dovevi testare. E che dovevi verificare. E che dovevi documentare. E che la password cambiata va comunicata. E che lo script va aggiornato. E che l'alert va configurato. E che il test va fatto. E che non c'è scusa. E che non c'è tempo. Ma il tempo va trovato. Perché i dati sono tutto. E i backup sono la salvezza. Ma solo se funzionano. E funzionano solo se li testi. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](86-il-log-che-ha-riempito-il-disco.md)]**
