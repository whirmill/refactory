# Il Log Che Ha Riempito Il Disco

**Data**: 10/10/2026

**[Home](../index.md) | [Precedente](85-il-certificato-che-e-scaduto-di-sabato.md)]**

---

C'è una verità nell'IT che tutti conoscono ma nessuno rispetta: i log crescono. Sempre. E crescono in silenzio. Non mandano email. Non aprono ticket. Non chiamano. Crescono e basta. Un byte alla volta. Una riga alla volta. Fino a quando il disco è pieno. E quando il disco è pieno, tutto si ferma. Tutto. Il database non scrive. L'applicazione non parte. Il server non risponde. E tu ti chiedi: "Com'è possibile che un log abbia ucciso tutto?" E la risposta è semplice: perché i log non perdonano. Amen.

![](../../img/server.jpg)

---

**Lunedì - L'Allarme**

Era lunedì. Le 8:47. Il caffè era ancora caldo.

Poi è arrivato l'allarme.

**ALERT**: Disk usage on prod-db-01: 94%

**ME**: 94%?

**TL**: È alto.

**ME**: Sì. Molto alto.

**TL**: E cosa occupa spazio?

**ME**: Controllo.

**TERMINALE**:
```
ssh prod-db-01
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       100G   94G    6G  94% /

du -sh /* 2>/dev/null | sort -rh | head -10
12G   /var
8G    /home
4G    /usr
...
```

**ME**: 12G in /var.

**TL**: E cosa c'è in /var?

**TERMINALE**:
```
du -sh /var/* 2>/dev/null | sort -rh | head -10
8G    /var/log
2G    /var/lib
1G    /var/cache
```

**ME**: 8G di log.

**TL**: 8G?!

**ME**: Sì.

**TL**: E quali log?

**TERMINALE**:
```
du -sh /var/log/* 2>/dev/null | sort -rh | head -10
4G    /var/log/application.log
2G    /var/log/nginx/access.log
1G    /var/log/syslog
500M  /var/log/auth.log
```

**ME**: 4G di application.log.

**TL**: 4G?!

**ME**: Sì.

**TL**: E da quando?

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
ls -lh /var/log/application.log
-rw-r--r-- 1 app app 4.0G Oct 10 08:45 /var/log/application.log

head -5 /var/log/application.log
2026-01-15 00:00:01 INFO Application started
2026-01-15 00:00:02 INFO Connecting to database...
2026-01-15 00:00:03 INFO Database connected
```

**ME**: Il log esiste da gennaio.

**TL**: E nessuno l'ha mai ruotato?

**ME**: A quanto pare no.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Non c'era un alert per i log.

**TL**: E PERCHÉ?!

**ME**: Perché... non ci abbiamo pensato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Disco: 94% pieno
- Log: 4G
- Rotazione: mai
- Alert: mai

E tutto era ovvio. Ma le cose ovvie sono le più pericolose. Perché le cose ovvie le ignori. E le cose ignorate ti perseguitano. Amen.

---

**Lunedì - 09:30**

Ho pulito. Ho ruotato. Ho liberato.

**TERMINALE**:
```
# Backup vecchio log
mv /var/log/application.log /var/log/application.log.old

# Crea nuovo log vuoto
touch /var/log/application.log
chown app:app /var/log/application.log

# Comprimi vecchio log
gzip /var/log/application.log.old &

# Verifica spazio
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       100G   90G   10G  90% /
```

**ME**: Liberato 4G.

**TL**: E ora?

**ME**: Ora il disco è al 90%.

**TL**: E gli altri log?

**ME**: Li ruoto anche quelli.

**TERMINALE**:
```
# Ruota nginx
mv /var/log/nginx/access.log /var/log/nginx/access.log.1
touch /var/log/nginx/access.log
gzip /var/log/nginx/access.log.1 &

# Ruota syslog
mv /var/log/syslog /var/log/syslog.1
touch /var/log/syslog
systemctl restart rsyslog

# Verifica
df -h
/dev/sda1       100G   86G   14G  86% /
```

**ME**: Ora è all'86%.

**TL**: Meglio.

**ME**: Ma non basta.

**TL**: E quindi?

**ME**: E quindi configuro la rotazione automatica.

**TL**: E quando?

**ME**: Ora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Disco: 86%
- Log: ruotati
- Rotazione automatica: da configurare

E tutto sembrava risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché le cose che sembrano risolte le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Lunedì - 10:00**

Ho configurato logrotate. Per non dimenticare più.

**TERMINALE**:
```
cat > /etc/logrotate.d/application << 'EOF'
/var/log/application.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 app app
}
EOF

# Test
logrotate -d /etc/logrotate.d/application
reading config file /etc/logrotate.d/application
Handling 1 logs
rotating pattern: /var/log/application.log  after 1 days (7 rotations)
```

**ME**: Configurato.

**TL**: E cosa fa?

**ME**: Ruota i log ogni giorno. Ne tiene 7. Comprime i vecchi.

**TL**: E se crescono troppo?

**ME**: Allora... prega.

**TL**: E SE CRESCONO TROPPO?!

**ME**: Allora aggiungo un limite di dimensione.

**TERMINALE**:
```
cat > /etc/logrotate.d/application << 'EOF'
/var/log/application.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    maxsize 100M
    create 0644 app app
}
EOF
```

**ME**: Aggiunto maxsize 100M.

**TL**: E ora?

**ME**: Ora ruota quando arriva a 100M. O ogni giorno. Quello che viene prima.

**TL**: E l'alert?

**ME**: L'alert... non c'è ancora.

**TL**: E LO CONFIGURI?!

**ME**: Sì. Ora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Logrotate: configurato
- Maxsize: 100M
- Alert: da configurare

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Amen.

---

**Lunedì - 11:00**

Ho configurato l'alert per il disco. Per non essere sorpreso di nuovo.

**TERMINALE**:
```
# Script di monitoraggio disco
cat > /usr/local/bin/check-disk.sh << 'EOF'
#!/bin/bash
THRESHOLD=80

usage=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')

if [ $usage -gt $THRESHOLD ]; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ Disco al ${usage}%!\"}"
fi
EOF

chmod +x /usr/local/bin/check-disk.sh

# Cron job ogni ora
echo "0 * * * * /usr/local/bin/check-disk.sh" | crontab -
```

**ME**: Alert configurato.

**TL**: E quando scatta?

**ME**: Quando il disco supera l'80%.

**TL**: 80%?

**ME**: Sì. Così ho tempo di agire.

**TL**: E se supera 80% di notte?

**ME**: Allora... lo vedo la mattina.

**TL**: E SE SUPERA 100% DI NOTTE?!

**ME**: Allora... prega.

**TL**: E SE IL SERVER SI FERMA?!

**ME**: Allora... riavvio.

**TL**: E SE NON RIAVVIA?!

**ME**: Allora... ripristino dal backup.

**TL**: E IL BACKUP?!

**ME**: Il backup... c'è.

**TL**: E SE È VECCHIO?!

**ME**: Allora... prega tanto.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurato
- Threshold: 80%
- Backup: ...c'è?

E le domande senza risposta sono le più pericolose. Perché le domande senza risposta le ignori. E le cose ignorate ti perseguitano. Amen.

---

**Martedì - La Riunione**

Martedì. Riunione. Con UL. E il CTO. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che il disco si sia riempito?

**ME**: I log non erano ruotati.

**UL**: E perché?

**ME**: Non c'era logrotate configurato.

**UL**: E PERCHÉ?!

**ME**: Non ci abbiamo pensato.

**UL**: NON CI AVETE PENSATO?!

**ME**: No. I log crescono lentamente. Non si nota.

**UL**: E QUANDO SI NOTA?!

**ME**: Quando il disco è pieno.

**UL**: E QUANDO È PIENO?!

**ME**: Quando tutto si ferma.

**UL**: E TUTTO SI È FERMATO?!

**ME**: Quasi. L'ho notato al 94%.

**UL**: E SE LO NOTAVI AL 100%?!

**ME**: Allora... tutto si fermava.

**UL**: E I CLIENTI?!

**ME**: I clienti non potevano usare l'applicazione.

**UL**: E QUANTO TEMPO?!

**ME**: Un'ora. Forse meno.

**UL**: E IL COSTO?!

**ME**: Non lo so. Il PM lo sa.

**PM**: (entrando) Il costo di cosa?

**UL**: Del disco pieno!

**PM**: Ah. I clienti hanno chiamato. 15 ticket. 3 hanno minacciato di andarsene.

**UL**: E IL COSTO?!

**PM**: Non lo so. Ma 3 clienti che se ne vanno sono 15.000€ al mese.

**UL**: 15.000€?!

**PM**: Sì. Se se ne vanno.

**UL**: E SE NON SE NE VANNO?!

**PM**: Allora... solo stress.

**CTO**: Il problema è che non c'era monitoraggio. E ora c'è.

**UL**: E cosa monitoriamo?

**ME**: Il disco. I log. Tutto.

**CTO**: E chi lo controlla?

**ME**: Lo script controlla ogni ora. E manda un alert su Slack.

**UL**: E SE SLACK È DOWN?!

**ME**: Allora... prega.

**UL**: E SE IL SERVER È DOWN?!

**ME**: Allora... non manda l'alert.

**UL**: E QUINDI?!

**ME**: E quindi non lo sappiamo.

**UL**: E QUINDI?!

**ME**: E quindi... serve un sistema esterno.

**CTO**: Configuriamo un monitoraggio esterno.

**ME**: Sì. Lo faccio.

**CTO**: E quando?

**ME**: Oggi.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era il mio sistema di monitoraggio. Il nulla che era la mia fiducia nei log. Il nulla... che era diventato un disastro. Ma ora sapevo. E ora configuravo. Amen.

---

**Mercoledì - Il Monitoraggio Esterno**

Mercoledì. Ho configurato il monitoraggio esterno. Per non dipendere dal server stesso.

**TERMINALE**:
```
# Configura Prometheus Node Exporter
apt install prometheus-node-exporter

# Configura metriche disco
cat >> /etc/prometheus/node_exporter.yml << 'EOF'
collectors:
  filesystem:
    mount-points:
      - /
EOF

# Configura alert in Prometheus
cat > /etc/prometheus/alerts/disk.yml << 'EOF'
groups:
  - name: disk
    rules:
      - alert: DiskUsageHigh
        expr: (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes * 100 > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disco al {{ $value }}%"
EOF
```

**TL**: Hai configurato Prometheus?

**ME**: Sì. E AlertManager.

**TL**: E cosa fa?

**ME**: Controlla il disco ogni 15 secondi. E manda alert se supera l'80%.

**TL**: E se il server è down?

**ME**: Prometheus è su un altro server. Lo vede.

**TL**: E se Prometheus è down?

**ME**: Allora... prega.

**TL**: E SE TUTTO È DOWN?!

**ME**: Allora... non c'è soluzione.

**TL**: E QUINDI?!

**ME**: E quindi... prega che non sia tutto down.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Prometheus: configurato
- AlertManager: configurato
- Threshold: 80%
- Monitoraggio esterno: attivo

E tutto funzionava. Ma le cose che funzionano sono le più pericolose. Perché le cose che funzionano le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Giovedì - La Scoperta**

Giovedì. Ho scoperto perché il log era cresciuto così tanto.

**TERMINALE**:
```
zcat /var/log/application.log.old.gz | head -100
2026-01-15 00:00:01 INFO Application started
2026-01-15 00:00:02 INFO Connecting to database...
...

zcat /var/log/application.log.old.gz | tail -100
2026-10-10 08:45:23 DEBUG Entering function process_request
2026-10-10 08:45:23 DEBUG Request: {"id": 123, "data": "..."}
2026-10-10 08:45:23 DEBUG Processing request...
2026-10-10 08:45:23 DEBUG Entering function validate_request
2026-10-10 08:45:23 DEBUG Validation: OK
2026-10-10 08:45:23 DEBUG Entering function save_to_database
2026-10-10 08:45:23 DEBUG Database query: INSERT INTO...
2026-10-10 08:45:23 DEBUG Query executed in 23ms
2026-10-10 08:45:23 DEBUG Entering function send_response
2026-10-10 08:45:23 DEBUG Response: {"status": "ok"}
```

**ME**: DEBUG?!

**TL**: Cosa?!

**ME**: Il log è in DEBUG mode!

**TL**: E QUINDI?!

**ME**: E quindi logga TUTTO!

**TL**: TUTTO?!

**ME**: Tutto! Ogni funzione! Ogni query! Ogni request!

**TL**: E QUANTE RIGHE?!

**TERMINALE**:
```
zcat /var/log/application.log.old.gz | wc -l
45234521
```

**ME**: 45 milioni di righe.

**TL**: 45 MILIONI?!

**ME**: Sì. In 9 mesi.

**TL**: E QUANTE AL GIORNO?!

**ME**: 45 milioni / 270 giorni = 167.000 righe al giorno.

**TL**: 167.000?!

**ME**: Sì. Ogni giorno.

**TL**: E CHI HA MESSO DEBUG?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
git log --all --source --full-history -S "DEBUG" -- config.py
commit abc123def456
Author: stagista-2025
Date:   Mon Jan 13 2026

    "Added debug logging for testing"
```

**ME**: Lo stagista.

**TL**: LO STAGISTA?!

**ME**: Sì. Nel gennaio 2026.

**TL**: E NESSUNO L'HA MAI TOLTO?!

**ME**: No. È andato in produzione così.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. I log crescono in silenzio.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Log level: DEBUG
- Righe: 45 milioni
- Autore: stagista-2025
- Data: gennaio 2026

E tutto era chiaro. Lo stagista aveva aggiunto DEBUG per testare. E poi se n'era andato. E il DEBUG era rimasto. E il log era cresciuto. E il disco si era riempito. E tutto per un "Added debug logging for testing". Amen.

---

**Venerdì - La Correzione**

Venerdì. Ho corretto il log level. E ho imparato una lezione.

**TERMINALE**:
```
# Cambia log level da DEBUG a INFO
sed -i 's/LOG_LEVEL = "DEBUG"/LOG_LEVEL = "INFO"/' config.py

# Commit
git add config.py
git commit -m "Change log level from DEBUG to INFO"
git push origin main

# Deploy
Deploying to production...
✓ Build completed
✓ Tests passed
✓ Deployed to production
```

**TL**: Hai cambiato il log level?

**ME**: Sì. Da DEBUG a INFO.

**TL**: E cosa cambia?

**ME**: Ora logga solo le info importanti. Non ogni funzione.

**TL**: E quanto risparmia?

**ME**: Non lo so. Vediamo tra una settimana.

**TL**: E SE CRESCONO ANCORA?!

**ME**: Allora c'è logrotate.

**TL**: E SE LOGROTATE NON FUNZIONA?!

**ME**: Allora c'è l'alert.

**TL**: E SE L'ALERT NON FUNZIONA?!

**ME**: Allora... prega.

**TL**: E SE NESSUNO VEDE L'ALERT?!

**ME**: Allora... prega tanto.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Log level: INFO
- Logrotate: attivo
- Alert: attivo
- Monitoraggio: esterno

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Perché le cose che sembrano ok le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Una Settimana Dopo - La Verifica**

Una settimana dopo. Ho verificato. Ho visto.

**TERMINALE**:
```
ls -lh /var/log/application.log
-rw-r--r-- 1 app app 12M Oct 17 08:45 /var/log/application.log

# Righe al giorno
wc -l /var/log/application.log
89234
```

**ME**: 89.000 righe in una settimana.

**TL**: E prima?

**ME**: Prima erano 167.000 al giorno.

**TL**: E QUINDI?

**ME**: E quindi... la metà.

**TL**: LA METÀ?!

**ME**: Sì. Da DEBUG a INFO, la metà delle righe.

**TL**: E LO SPAZIO?

**ME**: 12M in una settimana. Prima erano 4G in 9 mesi.

**TL**: E QUINDI?

**ME**: E quindi... molto meglio.

**TL**: E IL DISCO?

**TERMINALE**:
```
df -h
/dev/sda1       100G   87G   13G  87% /
```

**ME**: 87%. Stabile.

**TL**: E GLI ALERT?

**ME**: Nessun alert. Sotto l'80%.

**TL**: E QUINDI?

**ME**: E quindi... tutto ok.

**TL**: E LA PROSSIMA VOLTA?

**ME**: La prossima volta... controllo i log level prima di deployare.

**TL**: E CHI LO FA?

**ME**: Lo faccio io.

**TL**: E SE TI DIMENTICHI?

**ME**: Allora... c'è l'alert.

**TL**: E SE L'ALERT NON BASTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Log: 12M
- Disco: 87%
- Alert: nessuno
- Status: OK

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i log crescono. E che crescono in silenzio. E che il DEBUG mode è per il debug. Non per la produzione. E che gli stagisti vanno supervisionati. E che le cose ovvie vanno controllate. E che l'alert salva la vita. E che logrotate è un amico. E che il disco pieno uccide tutto. Amen.

---

**La Documentazione**

Ho documentato. Per i posteri. Per i futuri sistemisti che avrebbero dimenticato i log.

```markdown
## Incident #LOG-001: Il Log Che Ha Riempito Il Disco

**Data incident**: Lunedì 10 ottobre 2026, 08:47
**Autore**: ME
**Server**: prod-db-01
**Problema**: Disco al 94% per log non ruotati
**Log incriminato**: /var/log/application.log (4G)
**Causa**: Log level DEBUG in produzione
**Autore del DEBUG**: stagista-2025
**Data del DEBUG**: Gennaio 2026
**Tempo in DEBUG**: 9 mesi
**Righe log**: 45 milioni
**Tempo di risoluzione**: 2 ore
**Impatto**: Disco quasi pieno, nessun downtime
**Clienti colpiti**: 0 (prevenuto)
**Ticket aperti**: 0 (prevenuto)
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "Nessuno ha configurato logrotate?!"
**Reazione CTO**: "Configuriamo monitoraggio esterno."
**Soluzione**: Logrotate + alert + log level INFO
**Lezione imparata**: I LOG CRESCONO. SEMPRE.

**Configurazione corretta**:
1. Logrotate per tutti i log
2. Maxsize 100M per rotazione
3. Alert a 80% disco
4. Monitoraggio esterno (Prometheus)
5. Log level INFO in produzione
6. Mai DEBUG in produzione
7. Supervisionare gli stagisti
8. Documentare i log level
9. Controllare i log periodicamente
10. I log non perdonano

**Come configurare logrotate**:
```bash
cat > /etc/logrotate.d/application << 'EOF'
/var/log/application.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    maxsize 100M
    create 0644 app app
}
EOF
```

**Come configurare alert disco**:
```bash
cat > /usr/local/bin/check-disk.sh << 'EOF'
#!/bin/bash
THRESHOLD=80
usage=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $usage -gt $THRESHOLD ]; then
  curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ Disco al ${usage}%!\"}"
fi
EOF

echo "0 * * * * /usr/local/bin/check-disk.sh" | crontab -
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i log crescono. E che crescono in silenzio. E che il DEBUG mode è per il debug. E che gli stagisti vanno supervisionati. E che logrotate è un amico. E che l'alert salva la vita. E che il disco pieno uccide tutto. E che 45 milioni di righe sono tante. E che 4G di log sono tanti. E che le cose ovvie vanno controllate. E che ora lo sai. E che ora lo documenti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i log sono come i bambini. Crescono. E se non li controlli, diventano grandi. E quando diventano grandi, occupano spazio. E lo spazio è limitato. E il disco si riempie. E tutto si ferma. E tutto per un log level DEBUG. Che uno stagista ha aggiunto. E nessuno ha mai tolto. Amen.

---

## Il costo del log che ha riempito il disco

| Voce | Valore |
|------|--------|
| Server | prod-db-01 |
| Disco | 100G |
| Spazio usato | 94G (94%) |
| Log size | 4G |
| Righe log | 45 milioni |
| Log level | DEBUG |
| Autore DEBUG | stagista-2025 |
| Tempo in DEBUG | 9 mesi |
| Tempo risoluzione | 2 ore |
| Downtime | 0 (prevenuto) |
| Clienti colpiti | 0 (prevenuto) |
| Ticket aperti | 0 (prevenuto) |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "Nessuno ha configurato logrotate?!" |
| Reazione CTO | "Configuriamo monitoraggio esterno." |
| Soluzione | Logrotate + alert + INFO level |
| Lezione imparata | LOG = LOGROTATE + ALERT + INFO |
| **Totale** | **0 downtime + 0 clienti + 0 ticket + 1 lezione** |

**Morale**: I log crescono. È nella loro natura. E crescono in silenzio. E se non li ruoti, riempiono il disco. E se riempiono il disco, tutto si ferma. E se tutto si ferma, UL chiama. E se UL chiama, il tuo lunedì è rovinato. E tutto per un log level DEBUG. Che uno stagista ha aggiunto. E nessuno ha mai controllato. E i log non perdonano. E logrotate è un amico. E l'alert salva la vita. E il DEBUG è per il debug. Non per la produzione. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](85-il-certificato-che-e-scaduto-di-sabato.md)]**
