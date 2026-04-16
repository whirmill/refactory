# Il Cron Job Che Girava Ogni Minuto

**Data**: 15/08/2026

**[Home](../index.md) | [Precedente](77-la-migration-che-ha-droppato-la-tabella-users.md)]**

---

C'è una verità nel mondo dell'automazione. Una verità sacra. Una verità ignorata da chiunque abbia mai modificato un crontab pensando "tanto è solo un asterisco". Quella verità è: **"Un cron job è come un cuoco in cucina. Puoi farlo lavorare una volta al giorno. Puoi farlo lavorare ogni ora. Ma se gli dici di lavorare ogni minuto, quello cucina ogni minuto. E cucina. E cucina. E cucina. Finché la cucina esplode. E il server esplode. E il database esplode. E tu guardi i processi moltiplicarsi come cellule impazzite. E non puoi fermarli. Perché cron non si ferma. Cron obbedisce. E tu hai scritto '*/1 * * * *'. E ogni minuto, un nuovo processo nasce. E ogni minuto, il server muore un po' di più. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"I crontab non perdonano. Non hanno compassione. Non hanno pietà. Hanno solo cinque campi. E se il primo campo è '*/1', il disastro è garantito. E tu guardi il load average salire. E la CPU bruciare. E la RAM esaurirsi. E i processi accumularsi. E non puoi fare nulla. Perché cron ha già lanciato il prossimo. E il prossimo. E il prossimo. E tu sei lì. A guardare il server morire. Un minuto alla volta. Amen"**. E questa è la storia di chi ha scritto quell'asterisco. Di chi l'ha salvato. Di chi ha guardato il server morire. Un processo alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo automatizzare i report.

**ME**: Automatizzare?

**PM**: Sì. I report giornalieri.

**ME**: Giornalieri?

**PM**: Sì. Ogni giorno alle 8.

**ME**: E cosa fanno?

**PM**: Generano un PDF. Lo mandano via email.

**ME**: E quanto ci mette?

**PM**: Non lo so. 5 minuti?

**ME**: E lo facciamo girare su produzione?

**PM**: Sì. Sul server principale.

**ME**: E se il server è sotto carico?

**PM**: Non è mai sotto carico.

**ME**: Mai?

**PM**: Mai. Abbiamo 8 CPU e 32GB RAM.

**ME**: E il report quanto consuma?

**PM**: Non lo so. Poco.

**ME**: Poco quanto?

**PM**: Non lo so. È solo un PDF.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con i cron job. Il nulla che era la mia attenzione ai crontab. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Piano**

Il martedì, ho pianificato. Ho pianificato il cron job. Ho pianificato... il nulla.

**ME**: Ho guardato il server.

**TL**: E?

**ME**: Ha 8 CPU e 32GB RAM.

**TL**: E il carico medio?

**ME**: 0.5. Molto basso.

**TL**: E il report?

**ME**: Genera un PDF di 2MB. Ci mette 3 minuti.

**TL**: 3 minuti?

**ME**: Sì. Deve fare query sul database.

**TL**: E le query?

**ME**: Sono ottimizzate. Ci mettono 30 secondi.

**TL**: E la generazione del PDF?

**ME**: 2 minuti e mezzo.

**TL**: E l'invio email?

**ME**: 10 secondi.

**TL**: E quindi 3 minuti totali?

**ME**: Sì.

**TL**: E lo fai girare alle 8 del mattino?

**ME**: Sì. Quando c'è poco traffico.

**TL**: E se il report impiega più di 3 minuti?

**ME**: Non succede.

**TL**: E se succede?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
crontab -l
# m h  dom mon dow   command
0 8 * * * /opt/scripts/generate-report.sh
```

E il crontab era lì. Con il report alle 8 del mattino. E il PM voleva automatizzare. E io dovevo preparare lo script. Amen.

---

**Mercoledì - Lo Script**

Il mercoledì, ho scritto. Ho scritto lo script. Ho scritto... il disastro.

**ME**: Ho scritto lo script.

**TL**: Fammi vedere.

```bash
#!/bin/bash
# Script: generate-report.sh
# Author: ME
# Date: 2026-08-12
# Purpose: Generate daily report and send via email

# Configuration
DB_HOST="localhost"
DB_USER="report_user"
DB_PASS="super_secret_password_123"
EMAIL_TO="management@company.com"

# Generate report
echo "Starting report generation at $(date)"
psql -h $DB_HOST -U $DB_USER -d production -f /opt/sql/report.sql > /tmp/report.csv

# Create PDF
python3 /opt/scripts/csv-to-pdf.py /tmp/report.csv /tmp/report.pdf

# Send email
echo "Daily Report" | mutt -s "Report $(date +%Y-%m-%d)" -a /tmp/report.pdf -- $EMAIL_TO

# Cleanup
rm -f /tmp/report.csv /tmp/report.pdf

echo "Report sent at $(date)"
```

**TL**: Hai messo la password nel file?

**ME**: Sì.

**TL**: IN CHIARO?

**ME**: Sì. È solo uno script interno.

**TL**: INTERNO?

**ME**: Sì. Solo noi lo leggiamo.

**TL**: E SE QUALCUNO LO LEGGE?

**ME**: Nessuno lo legge.

**TL**: E SE QUALCUNO FA CAT?

**ME**: Non succede.

**TL**: E SE SUCCede?

**ME**: Allora... hanno la password del database.

**TL**: E LA CAMBI?

**ME**: Ora la cambio. Metto una variabile d'ambiente.

**TL**: METTILA.

Ho cambiato. Ho messo la variabile d'ambiente. E... ho fatto un altro errore.

**ME**: Ok. Ho cambiato.

**TL**: Fammi vedere.

```bash
#!/bin/bash
# Script: generate-report.sh
# Author: ME
# Date: 2026-08-12
# Purpose: Generate daily report and send via email

# Configuration
DB_HOST="localhost"
DB_USER="report_user"
DB_PASS="$DB_PASSWORD"
EMAIL_TO="management@company.com"

# Generate report
echo "Starting report generation at $(date)"
psql -h $DB_HOST -U $DB_USER -d production -f /opt/sql/report.sql > /tmp/report.csv

# Create PDF
python3 /opt/scripts/csv-to-pdf.py /tmp/report.csv /tmp/report.pdf

# Send email
echo "Daily Report" | mutt -s "Report $(date +%Y-%m-%d)" -a /tmp/report.pdf -- $EMAIL_TO

# Cleanup
rm -f /tmp/report.csv /tmp/report.pdf

echo "Report sent at $(date)"
```

**TL**: Meglio.

**ME**: Sì.

**TL**: Ma c'è un problema.

**ME**: Quale?

**TL**: Non hai il lock file.

**ME**: Lock file?

**TL**: Sì. Se lo script gira due volte contemporaneamente?

**ME**: Non gira due volte.

**TL**: E SE GIRa DUE VOLTE?

**ME**: Allora... due report.

**TL**: E DUE REPORT CONSUMANO DUE VOLTE TANTO.

**ME**: Ma gira solo alle 8.

**TL**: E SE QUALCUNO LO LANCIA A MANO?

**ME**: Non lo lancia a mano.

**TL**: E SE LO LANCIA?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo lo script. Lo script non aveva lock file. E se girava due volte contemporaneamente... due processi. Due PDF. Due email. E il server sotto carico. Amen.

---

**Giovedì - Il Test**

Il giovedì, ho testato. Ho testato lo script. Ho testato... con un errore.

**ME**: Ok. Testo lo script.

**TL**: In staging?

**ME**: Sì. In staging.

**TL**: E staging ha lo stesso database?

**ME**: No. Ha un database più piccolo.

**TL**: Quanto più piccolo?

**ME**: 1/10 di produzione.

**TL**: E il report in staging quanto ci mette?

**ME**: 30 secondi.

**TL**: E in produzione?

**ME**: 3 minuti.

**TL**: E se in produzione ci mette di più?

**ME**: Non ci mette di più.

**TL**: E SE CI METTE DI PIÙ?

**ME**: Allora... il server è sotto carico.

Ho lanciato lo script. Ho guardato l'output. Ho guardato... il successo.

```
./generate-report.sh
Starting report generation at Thu Aug 13 10:23:45 UTC 2026
CREATE TABLE
Query returned successfully: 84723 rows
PDF generated: 2.1MB
Email sent to management@company.com
Report sent at Thu Aug 13 10:24:15 UTC 2026
```

**ME**: Funziona.

**TL**: In 30 secondi?

**ME**: Sì.

**TL**: E in produzione?

**ME**: 3 minuti.

**TL**: E se il PM vuole che giri più spesso?

**ME**: Non vuole più spesso.

**TL**: Il PM vuole sempre più spesso.

Il TL mi ha guardato. Io guardavo l'output. L'output mostrava successo. Ma staging era piccolo. E produzione era grande. E il PM chiamava. Amen.

---

**Venerdì - 09:00**

Il venerdì, il PM ha chiamato. Il PM voleva. E io... ho ceduto.

**PM**: Ho visto il report.

**ME**: Sì?

**PM**: È ottimo.

**ME**: Bene.

**PM**: Ma c'è un problema.

**ME**: Quale?

**PM**: Arriva solo alle 8.

**ME**: Sì. Ogni giorno alle 8.

**PM**: Ma il CEO vuole vederlo più spesso.

**ME**: Più spesso?

**PM**: Sì. Ogni ora.

**ME**: OGNI ORA?

**PM**: Sì. Così può controllare le vendite.

**ME**: Ma il report ci mette 3 minuti.

**PM**: E quindi?

**ME**: E quindi ogni ora, 3 minuti di carico.

**PM**: E non è un problema?

**ME**: Il server ha 8 CPU. Regge.

**PM**: E allora fallo.

**ME**: Ogni ora?

**PM**: Sì. Ogni ora.

**ME**: E se il server è sotto carico?

**PM**: Non è mai sotto carico.

**ME**: E se lo è?

**PM**: Allora... non lo è.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia resistenza. Il nulla che era la mia prudenza. Il nulla... che era il PM che voleva ogni ora. Amen.

---

**Venerdì - 09:30**

Ho modificato. Ho modificato il crontab. Ho modificato... con un errore.

**ME**: Ok. Modifico il crontab.

**TL**: A cosa?

**ME**: Ogni ora.

**TL**: Ogni ora?

**ME**: Sì. 0 * * * *.

**TL**: Fammi vedere.

Ho aperto il crontab. Ho modificato. E... ho sbagliato.

```
crontab -e

# m h  dom mon dow   command
*/1 * * * * /opt/scripts/generate-report.sh
```

**ME**: Fatto.

**TL**: Fammi vedere.

**ME**: Ecco.

**TL**: ...

**ME**: Cosa?

**TL**: COSA HAI SCRITTO?

**ME**: */1 * * * *.

**TL**: */1?

**ME**: Sì. Ogni ora.

**TL**: OGNI ORA?

**ME**: Sì.

**TL**: NO!

**ME**: No?

**TL**: NO! */1 È OGNI MINUTO!

**ME**: OGNI MINUTO?

**TL**: SÌ! OGNI FOTTUTO MINUTO!

**ME**: Ma...

**TL**: MA COSA?

**ME**: Pensavo fosse ogni ora.

**TL**: OGNI ORA È 0 * * * *!

**ME**: E */1?

**TL**: */1 È OGNI MINUTO! OGNI FOTTUTO MINUTO!

**ME**: E QUINDI?

**TL**: E QUINDI OGNI MINUTO PARTE UN PROCESSO!

**ME**: E...

**TL**: E OGNI PROCESSO DURA 3 MINUTI!

**ME**: E QUINDI?

**TL**: E QUINDI DOPO 3 MINUTI CI SONO 3 PROCESSI CONTEMPORANEI!

**ME**: E DOPO 10 MINUTI?

**TL**: DOPO 10 MINUTI CI SONO 10 PROCESSI!

**ME**: E DOPO UN'ORA?

**TL**: DOPO UN'ORA CI SONO 60 PROCESSI!

**ME**: E...

**TL**: E IL SERVER HA 8 CPU E 32GB RAM!

**ME**: E...

**TL**: E IL REPORT CONSUMA 2 CPU E 4GB RAM!

**ME**: E...

**TL**: E 60 PROCESSI CONSUMANO 120 CPU E 240GB RAM!

**ME**: Ma...

**TL**: MA COSA? IL SERVER HA SOLO 8 CPU E 32GB RAM!

**ME**: E QUINDI?

**TL**: E QUINDI IL SERVER MUORE!

Il TL mi ha guardato. Io guardavo il crontab. Il crontab diceva */1 * * * *. E ogni minuto, un processo partiva. E ogni processo durava 3 minuti. E i processi si accumulavano. E il server moriva. Amen.

---

**Venerdì - 09:35**

Ho guardato. Ho guardato i processi. Ho guardato... il disastro.

**TERMINALE**:
```
ps aux | grep generate-report
root     12345  2.1  4.2  84723 42000 ?        S    09:32   0:03 /bin/bash /opt/scripts/generate-report.sh
root     12401  2.0  4.1  84723 41000 ?        S    09:33   0:02 /bin/bash /opt/scripts/generate-report.sh
root     12457  2.1  4.2  84723 42000 ?        S    09:34   0:01 /bin/bash /opt/scripts/generate-report.sh
root     12513  2.0  4.1  84723 41000 ?        S    09:35   0:00 /bin/bash /opt/scripts/generate-report.sh
```

**ME**: Ci sono già 4 processi.

**TL**: 4 PROCESSI?

**ME**: Sì. E altri ne arrivano.

**TL**: OGNI MINUTO?

**ME**: Sì. Ogni minuto.

**TL**: E QUANTI SARANNO DOPO 10 MINUTI?

**ME**: 10 processi.

**TL**: E DOPO 30 MINUTI?

**ME**: 30 processi.

**TL**: E DOPO UN'ORA?

**ME**: 60 processi.

**TL**: E IL SERVER?

**ME**: Il server...

Ho guardato il load average. Ho guardato la CPU. Ho guardato... la morte.

```
uptime
 09:35:42 up 342 days,  3 users,  load average: 8.47, 7.23, 5.12

top
%Cpu0  : 98.7 us,  1.3 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu1  : 97.3 us,  2.7 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu2  : 99.1 us,  0.9 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu3  : 98.2 us,  1.8 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu4  : 97.8 us,  2.2 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu5  : 98.9 us,  1.1 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu6  : 99.4 us,  0.6 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
%Cpu7  : 97.6 us,  2.4 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si
```

**ME**: La CPU è al 98%.

**TL**: AL 98%?

**ME**: Sì. Tutte e 8 le CPU.

**TL**: E LA RAM?

**ME**: Controllo.

```
free -h
              total        used        free      shared  buff/cache   available
Mem:           32Gi        28Gi       1.2Gi       2.1Gi       2.7Gi       1.5Gi
Swap:          8Gi        7.8Gi       0.2Gi
```

**ME**: La RAM è quasi esaurita.

**TL**: QUASI?

**ME**: Sì. 28GB su 32GB.

**TL**: E LO SWAP?

**ME**: Lo swap è al 97%.

**TL**: AL 97%?

**ME**: Sì. 7.8GB su 8GB.

**TL**: E I PROCESSI?

**ME**: I processi continuano ad arrivare.

**TL**: E QUANTI SONO ORA?

**ME**: Controllo.

```
ps aux | grep generate-report | wc -l
7
```

**ME**: 7 processi.

**TL**: E TRA UN MINUTO?

**ME**: 8 processi.

**TL**: E TRA 10 MINUTI?

**ME**: 17 processi.

**TL**: E IL SERVER?

**ME**: Il server... muore.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Load average: 8.47
- CPU: 98%
- RAM: 28GB/32GB
- Swap: 7.8GB/8GB
- Processi: 7 (e crescono)

E il server moriva. Un minuto alla volta. Un processo alla volta. Amen.

---

**Venerdì - 09:40**

Ho fermato. Ho fermato il cron. Ho fermato... quasi tutto.

**ME**: Devo fermare il cron.

**TL**: FERMALO!

**ME**: Come?

**TL**: RIMUOVI LA RIGA!

**ME**: Ok.

Ho aperto il crontab. Ho rimosso la riga. Ho... salvato.

```
crontab -e

# m h  dom mon dow   command
# (removed the line)
```

**ME**: Fatto. Ho rimosso la riga.

**TL**: E I PROCESSI?

**ME**: I processi continuano a girare.

**TL**: E QUANTI SONO?

**ME**: Controllo.

```
ps aux | grep generate-report | wc -l
9
```

**ME**: 9 processi.

**TL**: E NON SI FERMANO?

**ME**: No. Il cron non li ferma. Li ha solo smessi di lanciare.

**TL**: E QUINDI?

**ME**: E quindi devo killarli a mano.

**TL**: KILLALI!

**ME**: Ok.

Ho killato. Ho killato i processi. Ho... visto.

```
pkill -f generate-report.sh
```

**ME**: Killati.

**TL**: TUTTI?

**ME**: Controllo.

```
ps aux | grep generate-report | wc -l
1
```

**ME**: Quasi tutti. Uno è rimasto.

**TL**: UNO?

**ME**: Sì. Ma è quasi finito.

**TL**: E IL SERVER?

**ME**: Il server sta tornando normale.

**TL**: Normale?

**ME**: Sì. Il load sta scendendo.

```
uptime
 09:42:12 up 342 days,  3 users,  load average: 4.23, 6.12, 5.87
```

**ME**: Il load è sceso a 4.

**TL**: E LA CPU?

**ME**: La CPU sta scendendo.

**TL**: E LA RAM?

**ME**: La RAM sta tornando libera.

**TL**: E QUANTO CI HA MESSO?

**ME**: 7 minuti.

**TL**: 7 MINUTI?

**ME**: Sì. Dal momento in cui ho sbagliato il crontab.

**TL**: E COSA HAI IMPARATO?

**ME**: Che */1 è ogni minuto.

**TL**: E COSA ALTRO?

**ME**: Che ogni minuto è troppo spesso.

**TL**: E COSA ALTRO?

**ME**: Che i processi si accumulano.

**TL**: E COSA ALTRO?

**ME**: Che il server muore.

**TL**: E COSA ALTRO?

**ME**: Che il PM non sa cosa è un crontab.

**TL**: E COSA ALTRO?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che i cron job non sono "solo script". Sono automazioni. E le automazioni vanno controllate. Due volte. Tre volte. E poi ancora. Perché un asterisco sbagliato può uccidere un server. E */1 è ogni minuto. E ogni minuto è troppo spesso. E i processi si accumulano. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché cron ha già lanciato il prossimo. E il prossimo. E il prossimo. E tu sei lì. A guardare il server morire. Un minuto alla volta. Amen.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Load average: 2.1
- CPU: 45%
- RAM: 12GB/32GB
- Processi: 0

E il server era vivo. Ma 7 minuti di paura. 9 processi accumulati. E il PM che chiamava. Amen.

---

**Venerdì - 10:00**

Il PM ha chiamato. Il PM voleva sapere. E io... ho detto la verità.

**PM**: Com'è andato il report?

**ME**: C'è stato un problema.

**PM**: Problema?

**ME**: Sì. Ho sbagliato il crontab.

**PM**: SBAGLIATO?

**ME**: Sì. Ho messo */1 invece di 0.

**PM**: E COSA VUOL DIRE?

**ME**: Vuol dire che il report girava ogni minuto.

**PM**: OGNI MINUTO?

**ME**: Sì. Invece di ogni ora.

**PM**: E IL SERVER?

**ME**: Il server è andato sotto carico.

**PM**: SOTTO CARICO?

**ME**: Sì. CPU al 98%. RAM quasi esaurita.

**PM**: E I SERVIZI?

**ME**: I servizi hanno rallentato.

**PM**: RALLENTATO?

**ME**: Sì. Per 7 minuti.

**PM**: E I CLIENTI?

**ME**: I clienti hanno notato lentezza.

**PM**: E LE VENDITE?

**ME**: Le vendite hanno rallentato.

**PM**: E QUANTO ABBIAMO PERSO?

**ME**: Non lo so. Forse €5.000.

**PM**: €5.000?

**ME**: Sì. 7 minuti di lentezza.

**PM**: E PERCHÉ HAI SBAGLIATO?

**ME**: Non ho controllato la sintassi.

**PM**: NON HAI CONTROLLATO?

**ME**: No. Ho scritto e salvato.

**PM**: E NON HAI FATTO UN DRY-RUN?

**ME**: Non c'è dry-run per i crontab.

**PM**: E QUINDI?

**ME**: E quindi ho sbagliato.

**PM**: E IL CEO?

**ME**: Il CEO?

**PM**: SÌ. IL CEO VUOLE VEDERTI.

**ME**: Ora?

**PM**: Sì. Ora. In ufficio.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era la mia dignità. Il nulla... che era il CEO che mi cercava. Amen.

---

**Venerdì - 10:30**

Il CEO. Il CEO in ufficio. Il CEO... che punì.

**CEO**: Quindi mi stai dicendo che hai scritto */1 pensando che fosse ogni ora?

**ME**: Sì.

**CEO**: E NON HAI CONTROLLATO?

**ME**: No.

**CEO**: E IL SERVER È ANDATO SOTTO CARICO?

**ME**: Sì.

**CEO**: E PER QUANTO TEMPO?

**ME**: 7 minuti.

**CEO**: E I CLIENTI?

**ME**: Hanno notato lentezza.

**CEO**: E LE VENDITE?

**ME**: €5.000 perse.

**CEO**: E TUTTO PERCHÉ NON CONOSCI LA SINTASSI DEL CRONTAB?

**ME**: Sì.

**CEO**: E SAI COSA FARAI?

**ME**: Cosa?

**CEO**: Scriverai 1.000 volte: "Non scriverò mai */1 * * * * senza controllare".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

**ME**: E il PM?

**CEO**: Il PM?

**ME**: Sì. Il PM voleva ogni ora.

**CEO**: E TU HAI FATTO OGNI MINUTO.

**ME**: Per errore.

**CEO**: ERRORE O NO, IL SERVER È MORTO. E I SERVIZI SONO MORTI. E LE VENDITE SONO MORTE. E TUTTO PERCHÉ NON HAI CONTROLLATO LA SINTASSI. NON HAI LETTO LA DOCUMENTAZIONE. NON HAI FATTO IL TEST. E HAI SALVATO. SENZA PENSARE. E ORA PAGHI. CON LA DIGNITÀ. E CON 1.000 RIGHE. A MANO. SU CARTA. AMEN.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che era */1 * * * *. Scritto senza pensare. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non scriverò mai */1 * * * * senza controllare.
Non scriverò mai */1 * * * * senza controllare.
Non scriverò mai */1 * * * * senza controllare.
...
(997 righe dopo)
...
Non scriverò mai */1 * * * * senza controllare.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più scritto */1 senza controllare.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che */1 è ogni minuto.

**TL**: E cos'altro?

**ME**: Che 0 * * * * è ogni ora.

**TL**: E cos'altro?

**ME**: Che i crontab vanno controllati.

**TL**: E cos'altro?

**ME**: Che i processi si accumulano.

**TL**: E cos'altro?

**ME**: Che 7 minuti di carico costano €5.000.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che i cron job non sono "solo script". Sono automazioni. E le automazioni vanno controllate. Due volte. Tre volte. E poi ancora. Perché un asterisco sbagliato può uccidere un server. E */1 è ogni minuto. E ogni minuto è troppo spesso. E i processi si accumulano. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché cron ha già lanciato il prossimo. E il prossimo. E il prossimo. E tu sei lì. A guardare il server morire. Un minuto alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché cron non perdona. E il CEO nemmeno. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non scriverò mai */1 * * * * senza controllare". E sapevo che le avrei mantenute. Perché cron non perdona. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sistemisti che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #CRON-001: Il Cron Job Che Girava Ogni Minuto

**Data incident**: Venerdì 14 agosto 2026, 09:30
**Autore**: ME
**Comando eseguito**: crontab -e (con */1 * * * *)
**Intenzione**: Ogni ora (0 * * * *)
**Risultato**: Ogni minuto (*/1 * * * *)
**Differenza**: 60x più frequente
**Durata script**: 3 minuti
**Processi accumulati**: 9 (in 7 minuti)
**CPU massima**: 98%
**RAM massima**: 28GB/32GB
**Swap massimo**: 7.8GB/8GB
**Load average massimo**: 8.47
**Tempo sotto carico**: 7 minuti
**Servizi impattati**: Tutti (lentezza)
**Vendite perse**: €5.000
**Punizione**: 1.000 volte "Non scriverò mai */1 * * * * senza controllare"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "I cron job non sono solo script."
**Reazione TL**: "Le automazioni vanno controllate."
**Reazione PM**: "Volevo ogni ora!"
**Lezione imparata**: CRONTAB = CONTROLLARE. SEMPRE.
**Probabilità che succeda di nuovo**: 12% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. I crontab vanno CONTROLLATI. Prima di salvare.
2. */1 è OGNI MINUTO. Non ogni ora.
3. 0 * * * * è OGNI ORA.
4. */5 * * * * è OGNI 5 MINUTI.
5. 0 8 * * * è OGNI GIORNO ALLE 8.
6. I processi si ACCUMULANO se durano più dell'intervallo.
7. Il load average va MONITORATO.
8. I lock file vanno USATI per script lunghi.
9. 7 minuti di carico costano €5.000.
10. 1.000 volte a mano. Ricordalo.

**Crontab cheat sheet**:
```
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12)
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0)
# |  |  |  |  |
# *  *  *  *  *  command

* * * * *     # Ogni minuto
*/5 * * * *   # Ogni 5 minuti
0 * * * *     # Ogni ora
0 8 * * *     # Ogni giorno alle 8:00
0 8 * * 1     # Ogni lunedì alle 8:00
0 8 1 * *     # Ogni primo del mese alle 8:00
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che */1 è ogni minuto. E che 0 * * * * è ogni ora. E che i crontab vanno controllati. E che i processi si accumulano. E che 7 minuti di carico costano €5.000. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che i cron job non sono 'solo script'. Sono automazioni. E le automazioni vanno controllate. Due volte. Tre volte. E poi ancora. Perché un asterisco sbagliato può uccidere un server. E */1 è ogni minuto. E ogni minuto è troppo spesso. E i processi si accumulano. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché cron ha già lanciato il prossimo. E il prossimo. E il prossimo. E tu sei lì. A guardare il server morire. Un minuto alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché cron non perdona. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: i cron job sono automazioni. E le automazioni vanno controllate. Due volte. Tre volte. E poi ancora. Perché un asterisco sbagliato può uccidere un server. E */1 è ogni minuto. E ogni minuto è troppo spesso. E i processi si accumulano. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché cron ha già lanciato il prossimo. E il prossimo. E il prossimo. E tu sei lì. A guardare il server morire. Un minuto alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché cron non perdona. E il CEO nemmeno. Amen.

---

## Il costo del cron job ogni minuto

| Voce | Valore |
|------|--------|
| Comando | crontab -e |
| Intenzione | 0 * * * * (ogni ora) |
| Risultato | */1 * * * * (ogni minuto) |
| Differenza | 60x più frequente |
| Durata script | 3 minuti |
| Processi accumulati | 9 (in 7 minuti) |
| CPU massima | 98% |
| RAM massima | 28GB/32GB |
| Swap massimo | 7.8GB/8GB |
| Load average massimo | 8.47 |
| Tempo sotto carico | 7 minuti |
| Servizi impattati | Tutti (lentezza) |
| Vendite perse | €5.000 |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Non sono solo script" |
| Reazione TL | "Vanno controllate" |
| Reazione PM | "Volevo ogni ora!" |
| Lezione imparata | CRONTAB = CONTROLLARE. SEMPRE. |
| **Totale** | **9 processi + 7 min carico + €5.000 persi + 1.000 righe a mano** |

**Morale**: I crontab vanno controllati. Sempre. Due volte. Tre volte. E poi ancora. Perché un asterisco sbagliato può uccidere un server. E */1 è ogni minuto. E ogni minuto è troppo spesso. E i processi si accumulano. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché cron ha già lanciato il prossimo. E il prossimo. E il prossimo. E tu sei lì. A guardare il server morire. Un minuto alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché cron non perdona. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](77-la-migration-che-ha-droppato-la-tabella-users.md)]**
