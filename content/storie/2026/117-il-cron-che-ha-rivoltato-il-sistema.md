# Il Cron Che Ha Rivoltato Il Sistema

**Data**: 15/05/2026

**[Storie 2026](index.md) | [Precedente](116-la-cache-che-ha-restituito-i-dati-vecchi.md) | [Prossima](118-la-memoria-che-non-voleva-lasciare.md)**

---

C'è una regola nei sistemi Unix: i cron job vanno testati. Non basta scriverli. Non basta verificarli. Bisogna testarli. Nel contesto giusto. Con l'utente giusto. Con le variabili d'ambiente giuste. E soprattutto, con il timezone giusto. Perché i cron job non perdonano. E quando sbagliano, sbagliano in grande. E il sistema si rivolta. E tu ti ritrovi con 47 milioni di email inviate. A mezzanotte. A tutti i clienti. Con oggetto: "Il tuo account è stato CANCELLATO." E non era vero. Era un test. Ma il cron non lo sapeva. E il sistema ha eseguito. E i clienti hanno ricevuto. E UL ha chiamato. E tu hai risposto: "Era un cron job." E UL ha detto: "E PERCHÉ ERA ATTIVO?!" E tu hai detto: "Perché JN l'ha configurato male." E la verità è che i cron job sono pericolosi. Più dei deploy. Più dei database. Perché i cron job lavorano da soli. Di notte. Quando nessuno guarda. E quando sbagliano, nessuno se ne accorge. Finché non è troppo tardi. Amen.

![](../../img/server.jpg)

---

**Domenica - 23:58**

Era domenica sera. Il sistema era tranquillo. I server dormivano. I log scorrevano pigri. E JN aveva aggiunto un cron job.

**TERMINALE**:
```
# JN aveva aggiunto questo cron
crontab -l
# Output:
# m h  dom mon dow   command
0 0 * * * /opt/scripts/cleanup_users.sh
```

**JN**: Ho aggiunto uno script per pulire gli utenti inattivi.

**ME**: E l'hai testato?

**JN**: Sì. L'ho eseguito a mano. Funziona.

**ME**: E le variabili d'ambiente?

**JN**: Quali variabili?

**ME**: Quelle che lo script usa. PATH. DATABASE_URL. Le solite cose.

**JN**: Ah. Non so. Funzionava quando l'ho eseguito.

**ME**: E il timezone?

**JN**: Timezone?

**ME**: Sì. Il server è in UTC. Tu sei in CET. Quando pensi che giri?

**JN**: A mezzanotte.

**ME**: Mezzanotte quale? CET? UTC?

**JN**: Ehm... non so.

**ME**: JN, i cron girano con l'ora del server. Se il server è in UTC, gira a mezzanotte UTC. Che sono le 02:00 CET.

**JN**: Ah. Ok.

**ME**: E cosa fa lo script?

**JN**: Cancella gli utenti inattivi da più di 90 giorni.

**ME**: E come definisce "inattivi"?

**JN**: Quelli che non hanno fatto login negli ultimi 90 giorni.

**ME**: E manda notifiche?

**JN**: Sì. Una email di conferma cancellazione.

**ME**: A chi?

**JN**: All'utente.

**ME**: E se l'utente è 47 milioni?

**JN**: 47 milioni?!

**ME**: Sì. Abbiamo 47 milioni di utenti registrati. Quanti sono inattivi da 90 giorni?

**JN**: Non so. Controllo.

**TERMINALE**:
```
# Controlla utenti inattivi
psql -U users -c "SELECT COUNT(*) FROM users WHERE last_login < NOW() - INTERVAL '90 days'"
count
---------
31284763
```

**JN**: 31 milioni.

**ME**: 31 MILIONI DI UTENTI?!

**JN**: Sì. Sono quelli che non hanno fatto login negli ultimi 90 giorni.

**ME**: E LO SCRIPT MANDEVA 31 MILIONI DI EMAIL?!

**JN**: Sì. Ma... è quello che deve fare, no?

**ME**: JN, NON SI MANDANO 31 MILIONI DI EMAIL A MEZZANOTTE!

**JN**: Perché?

**ME**: PERCHÉ È UN DISASTRO! I server email non reggono! I provider ci bloccano! I clienti si spaventano!

**JN**: Ah. E quindi?

**ME**: E quindi DISABILITA QUEL CRON!

**JN**: Ma...

**ME**: ORA!

JN ha disabilitato il cron. O almeno, così credevamo. Perché JN aveva fatto una cosa. Una cosa che non avevamo notato. Una cosa che ci sarebbe costata cara. Amen.

---

**Lunedì - 00:00**

Lunedì. Mezzanotte. Il cron è partito.

**TERMINALE**:
```
# Log del sistema
2026-05-11 00:00:01 [cron] Starting cleanup_users.sh
2026-05-11 00:00:02 [cron] Connecting to database...
2026-05-11 00:00:03 [cron] Found 31284763 inactive users
2026-05-11 00:00:04 [cron] Starting deletion process...
2026-05-11 00:00:05 [cron] Sending notification emails...
```

Il sistema ha iniziato a mandare email. Una dopo l'altra. A 31 milioni di utenti. Con oggetto: "Il tuo account è stato CANCELLATO."

**TERMINALE**:
```
# Log del mail server
2026-05-11 00:00:10 [mail] Queue size: 1000
2026-05-11 00:00:20 [mail] Queue size: 5000
2026-05-11 00:00:30 [mail] Queue size: 15000
2026-05-11 00:01:00 [mail] Queue size: 50000
2026-05-11 00:02:00 [mail] Queue size: 150000
2026-05-11 00:05:00 [mail] Queue size: 500000
2026-05-11 00:10:00 [mail] Queue size: 1000000
2026-05-11 00:15:00 [mail] Queue size: 2000000
2026-05-11 00:30:00 [mail] Queue size: 5000000
2026-05-11 01:00:00 [mail] Queue size: 10000000
```

Il mail server stava soffocando. La CPU era al 100%. La memoria era al 95%. La coda cresceva. E le email partivano. Verso 31 milioni di clienti. Che stavano dormendo. E che si sarebbero svegliati con un messaggio: "Il tuo account è stato CANCELLATO."

E non era vero. Era un bug. Ma il cron non lo sapeva. E il sistema ha eseguito. Amen.

---

**Lunedì - 06:00**

Lunedì mattina. 06:00. I primi clienti si svegliano. E trovano l'email.

**SUPPORTO**: I clienti stanno chiamando. Tutti. Dicono che il loro account è stato cancellato.

**ME**: Cosa?!

**SUPPORTO**: Hanno ricevuto un'email. "Il tuo account è stato CANCELLATO."

**ME**: E GLI ACCOUNT?!

**SUPPORTO**: Non so. Controllo.

**TERMINALE**:
```
# Controlla gli account
psql -U users -c "SELECT COUNT(*) FROM users"
count
---------
31284763

# Controlla gli account attivi
psql -U users -c "SELECT COUNT(*) FROM users WHERE last_login > NOW() - INTERVAL '90 days'"
count
---------
0

# Controlla gli account cancellati
psql -U users -c "SELECT COUNT(*) FROM deleted_users"
count
---------
31284763
```

**ME**: 31 milioni di account cancellati.

**SUPPORTO**: 31 MILIONI?!

**ME**: Sì. Tutti gli utenti inattivi da 90 giorni.

**SUPPORTO**: E LE EMAIL?!

**ME**: 31 milioni di email inviate.

**SUPPORTO**: E I CLIENTI?!

**ME**: Stanno chiamando. Tutti.

Il supporto mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Account cancellati: 31.284.763
- Email inviate: 31.284.763
- Clienti arrabbiati: tutti
- JN: responsabile

E tutto era chiaro. Il cron aveva girato. E aveva cancellato tutto. E mandato email a tutti. E il sistema si era rivoltato. Amen.

---

**Lunedì - 06:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava ancora dormendo.

**ME**: JN, SVEGLIATI!

**JN**: Cosa... che succede?

**ME**: IL CRON HA GIRATO!

**JN**: Quale cron?

**ME**: QUELLO PER GLI UTENTI INATTIVI!

**JN**: Ma l'avevo disabilitato!

**ME**: EVIDENTEMENTE NO!

**JN**: Aspetta, controllo.

**TERMINALE**:
```
# Controlla il crontab
crontab -l
# Output:
# m h  dom mon dow   command
0 0 * * * /opt/scripts/cleanup_users.sh

# Controlla se lo script esiste
ls -la /opt/scripts/cleanup_users.sh
-rwxr-xr-x 1 root root 1234 May 10 23:55 /opt/scripts/cleanup_users.sh
```

**JN**: È ancora lì.

**ME**: E L'HAI DETTO DI AVERLO DISABILITATO?!

**JN**: Sì! Ho fatto `crontab -e` e l'ho commentato!

**ME**: E POI?!

**JN**: Poi... non so. Forse non ho salvato?

**ME**: NON HAI SALVATO?!

**JN**: Non ricordo!

**ME**: JN, QUANDO MODIFICHI UN CRON, DEVI SALVARE!

**JN**: Lo so! Ma...

**ME**: E ORA ABBIAMO 31 MILIONI DI CLIENTI ARRABBIATI!

**JN**: 31 milioni?!

**ME**: SÌ! E TUTTI HANNO RICEVUTO UN EMAIL CHE DICE CHE IL LORO ACCOUNT È STATO CANCELLATO!

**JN**: Ma... non era quello che doveva fare?

**ME**: SÌ! MA NON A MEZZANOTTE! E NON A 31 MILIONI DI PERSONE!

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cron: attivo
- JN: dimenticato di salvare
- Danni: 31 milioni di email
- Lezione: da imparare

E tutto era chiaro. JN aveva dimenticato di salvare. E il cron aveva girato. E il sistema si era rivoltato. Amen.

---

**Lunedì - 07:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo un problema.

**UL**: Che problema?

**ME**: Un cron job ha cancellato 31 milioni di account.

**UL**: 31 MILIONI?!

**ME**: Sì. E ha mandato 31 milioni di email.

**UL**: 31 MILIONI DI EMAIL?!

**ME**: Sì. A mezzanotte.

**UL**: A MEZZANOTTE?!

**ME**: Sì. E i clienti stanno chiamando.

**UL**: CHIAMANDO?!

**ME**: Sì. Tutti. Dicono che il loro account è stato cancellato.

**UL**: E GLI ACCOUNT?!

**ME**: Cancellati. Ma abbiamo i backup.

**UL**: E LE EMAIL?!

**ME**: Inviate. Non possiamo ritirarle.

**UL**: E QUINDI?!

**ME**: E quindi... dobbiamo recuperare i dati. E mandare un'email di scuse.

**UL**: DI SCUSE?!

**ME**: Sì. Per dire che è stato un errore.

**UL**: E CHI HA FATTO QUESTO ERRORE?!

**ME**: JN. Ha dimenticato di disabilitare il cron.

**UL**: JN?!

**ME**: Sì. Ha modificato il crontab ma non ha salvato.

**UL**: NON HA SALVATO?!

**ME**: No.

**UL**: E QUANTO COSTA QUESTO ERRORE?!

**ME**: Non so. Controllo.

**TERMINALE**:
```
# Controlla il costo
psql -U billing -c "
SELECT 
  COUNT(*) as emails_sent,
  COUNT(*) * 0.0001 as email_cost,
  COUNT(*) * 0.05 as support_cost_estimate
FROM deleted_users
"
emails_sent | email_cost | support_cost_estimate
------------+------------+----------------------
31284763    | 3128.48    | 1564238.15
```

**ME**: 3128 euro per le email. 1.5 milioni stimati per il supporto.

**UL**: 1.5 MILIONI?!

**ME**: Sì. Per gestire le chiamate. I reclami. Le minacce legali.

**UL**: MINACCE LEGALI?!

**ME**: Sì. Alcuni clienti minacciano di fare causa.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E I DATI?!

**ME**: Li recupero. Dai backup.

**UL**: E QUANTO TEMPO?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla la dimensione del backup
ls -lh /backup/users_2026-05-10.sql.gz
-rw-r--r-- 1 root root 45G May 10 23:59 /backup/users_2026-05-10.sql.gz

# Tempo stimato di restore
echo "45GB / 100MB/s = 450 secondi = 7.5 minuti"
# Ma con indici e constraints...
echo "Tempo reale stimato: 4-6 ore"
```

**ME**: 4-6 ore per il restore.

**UL**: 4-6 ORE?!

**ME**: Sì. Il database è grande.

**UL**: E LE EMAIL DI SCUSE?!

**ME**: Le preparo. E le mando dopo il restore.

**UL**: E I CLIENTI?!

**ME**: I clienti... aspettano.

UL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Dati: da recuperare
- Tempo: 4-6 ore
- Costo: 1.5 milioni
- JN: da educare

E tutto era chiaro. Il cron aveva fatto danni. E i danni erano grandi. E JN era responsabile. E la lezione era da imparare. Amen.

---

**Lunedì - 08:00**

Ho iniziato il restore. E ho preparato l'email di scuse.

**TERMINALE**:
```
# Avvia il restore
nohup psql -U users < /backup/users_2026-05-10.sql > /var/log/restore.log 2>&1 &

# Prepara l'email di scuse
cat > /tmp/apology_email.txt << 'EOF'
Oggetto: IMPORTANTE - Errore nel sistema: il tuo account è ATTIVO

Gentile Cliente,

Ti scriviamo per informarti di un errore avvenuto nel nostro sistema nella notte tra domenica e lunedì.

A causa di un problema tecnico, hai ricevuto un'email che indicava la cancellazione del tuo account. Questa email è stata inviata per ERRORE.

Il tuo account è ATTIVO e NON è stato cancellato.

Ci scusiamo sinceramente per il disagio causato. Stiamo lavorando per garantire che questo non accada più.

Se hai domande o preoccupazioni, non esitare a contattare il nostro supporto.

Cordiali saluti,
Il Team Tecnico
EOF

# Testa l'email
echo "Email pronta. Aspetto il restore per inviarla."
```

**ME**: Restore avviato. Email pronta.

**TL**: E QUANTO MANCA?!

**ME**: 4-6 ore.

**TL**: E I CLIENTI?!

**ME**: Chiamano. Il supporto risponde.

**TL**: E COSA DICONO?!

**ME**: Che è stato un errore. Che i dati sono al sicuro. Che stiamo recuperando.

**TL**: E JN?!

**ME**: JN... è qui.

JN era seduto accanto a me. Guardava il terminale. Il terminale mostrava:
- Restore: in corso
- Progress: 2%
- Email: pronta
- Colpa: sua

E JN sapeva. Sapeva di aver fatto un errore. Un errore grande. Un errore che costava 1.5 milioni. E non poteva fare nulla. Solo guardare. E imparare. Amen.

---

**Lunedì - 12:00**

Il restore era al 50%. E le chiamate continuavano.

**SUPPORTO**: Abbiamo ricevuto 500.000 chiamate. E 2 milioni di email.

**ME**: 500.000 CHIAMATE?!

**SUPPORTO**: Sì. E il 10% minaccia di abbandonare il servizio.

**ME**: ABBANDONARE?!

**SUPPORTO**: Sì. Dicono che non si fidano più.

**ME**: E COSA DICONO?!

**SUPPORTO**: Dicono: "Come faccio a sapere che non cancellerete di nuovo il mio account?"

**ME**: E COSA RISPONDIAMO?!

**SUPPORTO**: Diciamo che è stato un errore isolato. Che abbiamo fixato. Che non succederà più.

**ME**: E CI CREDONO?!

**SUPPORTO**: Alcuni sì. Altri no.

**ME**: E GLI ALTRI?!

**SUPPORTO**: Gli altri... se ne vanno.

Il supporto mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Restore: 50%
- Chiamate: 500.000
- Clienti persi: 50.000 stimati
- Fiducia: persa

E tutto era chiaro. Il cron aveva cancellato i dati. Ma aveva anche cancellato la fiducia. E la fiducia è più difficile da recuperare. Amen.

---

**Lunedì - 16:00**

Il restore era completo. I dati erano tornati. Ma la fiducia no.

**TERMINALE**:
```
# Verifica il restore
psql -U users -c "SELECT COUNT(*) FROM users"
count
---------
47000000

# Verifica gli utenti attivi
psql -U users -c "SELECT COUNT(*) FROM users WHERE last_login > NOW() - INTERVAL '90 days'"
count
---------
15715237

# Verifica gli utenti inattivi
psql -U users -c "SELECT COUNT(*) FROM users WHERE last_login < NOW() - INTERVAL '90 days'"
count
---------
31284763
```

**ME**: Dati recuperati. 47 milioni di utenti. 15 milioni attivi. 31 milioni inattivi.

**TL**: E LE EMAIL DI SCUSE?!

**ME**: Le mando ora.

**TERMINALE**:
```
# Invia email di scuse
cat /tmp/apology_email.txt | mail -s "IMPORTANTE - Errore nel sistema" -t $(psql -U users -t -c "SELECT email FROM users WHERE last_login < NOW() - INTERVAL '90 days'")

# Output
Sending to 31284763 recipients...
Queue started.
```

**ME**: Email inviate. A 31 milioni di utenti.

**TL**: E ORA?!

**ME**: Ora... aspettiamo.

**TL**: E IL CRON?!

**ME**: Disabilitato. Per sempre.

**TERMINALE**:
```
# Disabilita il cron
crontab -l | grep -v cleanup_users > /tmp/new_cron
crontab /tmp/new_cron

# Verifica
crontab -l
# Output: vuoto (o altri cron, ma non cleanup_users)
```

**ME**: Cron disabilitato. Non succederà più.

**TL**: E JN?!

**ME**: JN... lo educo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Dati: recuperati
- Cron: disabilitato
- Email: inviate
- JN: da educare

E tutto era risolto. Ma la fiducia era persa. E i clienti se ne andavano. E JN aveva imparato una lezione. Una lezione costosa. Amen.

---

**Martedì - L'Educazione**

Martedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il cron?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il cron disastroso è stato un disastro. Ma è anche stato un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Sette cose. Primo: quando modifichi un cron, SALVA.

**JN**: Lo so! Ma...

**ME**: Niente ma. Quando esci dall'editor, controlla che le modifiche siano applicate. Usa `crontab -l` per verificare.

**JN**: Ok.

**ME**: Secondo: i cron girano con l'utente che li crea. Se lo script ha bisogno di variabili d'ambiente, mettile nello script.

**JN**: Nello script?

**ME**: Sì. Non fidarti dell'ambiente. Lo script deve essere autonomo.

**JN**: Ok.

**ME**: Terzo: i cron girano con il timezone del server. Controlla sempre.

**JN**: Sempre?

**ME**: Sempre. E se vuoi un timezone diverso, mettilo nel cron.

**JN**: Come?

**ME**: `CRON_TZ=Europe/Rome` all'inizio del crontab.

**JN**: Ok.

**ME**: Quarto: i cron che fanno cose pericolose vanno loggati.

**JN**: Loggati?

**ME**: Sì. Ogni output deve andare in un file di log. E i log devono essere monitorati.

**JN**: E SE NON LO SONO?!

**ME**: Allora non sai cosa è successo. Finché non è troppo tardi.

**JN**: Ok.

**ME**: Quinto: i cron che cancellano dati vanno approvati.

**JN**: Approvati?

**ME**: Sì. Da almeno due persone. E devono avere un flag `--dry-run` per testare.

**JN**: E SE NON CE L'HANNO?!

**ME**: Allora lo aggiungi. Prima di mettere in produzione.

**JN**: Ok.

**ME**: Sesto: i cron che mandano email vanno limitati.

**JN**: Limitati?

**ME**: Sì. Non si mandano 31 milioni di email in una volta. Si mandano a batch. Con rate limiting.

**JN**: E COME?!

**ME**: Con un sistema di code. E un throttle. E un kill switch.

**JN**: Kill switch?

**ME**: Sì. Un modo per fermare tutto. Subito. Quando le cose vanno male.

**JN**: Ok.

**ME**: Settimo: i cron vanno testati. In staging. Con dati di produzione. E con qualcuno che guarda.

**JN**: Sempre?

**ME**: Sempre. Se non lo testi, non sai cosa fa. Finché non lo scopri. Nel modo peggiore.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Cron: disabilitato
- Lezione: imparata
- Costo: 1.5 milioni
- Fiducia: persa

E JN sapeva. Sapeva di aver fatto un errore. Un errore grande. E aveva imparato. Ma la lezione era costata cara. Amen.

---

**Mercoledì - Il Kill Switch**

Mercoledì. Ho aggiunto un kill switch per i cron pericolosi.

**TERMINALE**:
```
# Crea un sistema di kill switch
cat > /opt/scripts/cron_wrapper.sh << 'EOF'
#!/bin/bash

# Kill switch: se questo file esiste, il cron non gira
KILL_SWITCH="/etc/cron.d/kill_switch_$(basename $1)"

if [ -f "$KILL_SWITCH" ]; then
  echo "[$(date)] Kill switch attivo per $1. Uscita." >> /var/log/cron_kill.log
  exit 0
fi

# Log
echo "[$(date)] Starting $1" >> /var/log/cron.log

# Esegui lo script
$@

# Log
echo "[$(date)] Finished $1. Exit code: $?" >> /var/log/cron.log
EOF

chmod +x /opt/scripts/cron_wrapper.sh

# Modifica i cron pericolosi
crontab -l | sed 's|^\(.*cleanup.*\)$|/opt/scripts/cron_wrapper.sh \1|' | crontab -

# Crea kill switch per cleanup_users
touch /etc/cron.d/kill_switch_cleanup_users.sh

# Verifica
ls -la /etc/cron.d/kill_switch_*
-rw-r--r-- 1 root root 0 May 13 10:00 /etc/cron.d/kill_switch_cleanup_users.sh
```

**ME**: Kill switch aggiunto. Se il file esiste, il cron non gira.

**TL**: E COME SI ATTIVA?!

**ME**: Creando il file. `touch /etc/cron.d/kill_switch_<script_name>`.

**TL**: E COME SI DISATTIVA?!

**ME**: Cancellando il file. `rm /etc/cron.d/kill_switch_<script_name>`.

**TL**: E SE QUALCUNO DIMENTICA?!

**ME**: Allora il cron non gira. Meglio non girare che girare male.

**TL**: E I LOG?!

**ME**: Tutti i cron loggano. E i log sono monitorati.

**TL**: E GLI ALERT?!

**ME**: Se un cron fallisce, riceviamo un alert.

**TL**: E SE NON FALLISCE MA FA DISASTRI?!

**ME**: Allora... il kill switch ci salva. E i log ci dicono cosa è successo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Kill switch: attivo
- Log: configurati
- Alert: pronti
- JN: educato

E tutto era più sicuro. Ma la fiducia era ancora persa. E i clienti se ne andavano. E la lezione era stata imparata. A caro prezzo. Amen.

---

**Giovedì - L'Analisi**

Giovedì. Ho analizzato i danni. Per capire quanto era costato.

**TERMINALE**:
```
# Controlla i clienti persi
psql -U users -c "
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN unsubscribed_at > '2026-05-11' THEN 1 END) as unsubscribed_after_cron,
  COUNT(CASE WHEN last_login > NOW() - INTERVAL '7 days' THEN 1 END) as active_last_week
FROM users
"
total_users | unsubscribed_after_cron | active_last_week
-----------+-------------------------+------------------
47000000   | 127845                  | 15234128

# Controlla le chiamate al supporto
psql -U support -c "
SELECT 
  COUNT(*) as total_calls,
  AVG(wait_time) as avg_wait_time,
  AVG(resolution_time) as avg_resolution_time
FROM calls
WHERE created_at > '2026-05-11'
"
total_calls | avg_wait_time | avg_resolution_time
------------+---------------+---------------------
523847      | 00:12:34      | 00:08:45

# Controlla i costi
psql -U billing -c "
SELECT 
  'Email inviate' as item, 
  31284763 as quantity, 
  3128.48 as cost
UNION ALL
SELECT 
  'Chiamate supporto', 
  523847, 
  523847 * 0.50
UNION ALL
SELECT 
  'Clienti persi (LTV medio 100€)', 
  127845, 
  127845 * 100
UNION ALL
SELECT 
  'Overtime staff', 
  48, 
  48 * 50 * 25
"
item                    | quantity  | cost
------------------------+-----------+------------
Email inviate           | 31284763  | 3128.48
Chiamate supporto       | 523847    | 261923.50
Clienti persi (LTV)     | 127845    | 12784500.00
Overtime staff          | 48        | 60000.00
```

**ME**: Costo totale: 13.1 milioni di euro.

**TL**: 13.1 MILIONI?!

**ME**: Sì. 12.8 milioni per i clienti persi. 262k per il supporto. 60k per l'overtime. 3k per le email.

**TL**: E JN?!

**ME**: JN... lo sa.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Costo: 13.1 milioni
- Clienti persi: 127.845
- Chiamate: 523.847
- Colpa: JN

E tutto era chiaro. Il cron era costato 13.1 milioni. E JN era responsabile. E la lezione era stata imparata. A carissimo prezzo. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato di salvare i cron.

```markdown
## Incident #CRON-001: Il Cron Che Ha Rivoltato Il Sistema

**Data incident**: Lunedì 11 maggio 2026, 00:00
**Autore**: JN
**Script**: /opt/scripts/cleanup_users.sh
**Problema**: Cron eseguito nonostante "disabilitazione"
**Causa**: JN ha modificato il crontab ma non ha salvato
**Utenti cancellati**: 31.284.763
**Email inviate**: 31.284.763
**Chiamate supporto**: 523.847
**Clienti persi**: 127.845
**Costo totale**: €13.100.000
**Tempo di risoluzione**: 16 ore
**Downtime**: 0 (servizio degradato)
**Reazione UL**: "13 milioni?!"
**Reazione TL**: "31 milioni di email?!"
**Reazione CTO**: "I cron vanno testati."
**Soluzione**: Kill switch + log + educazione
**Lezione imparata**: I CRON VANNO TESTATI. E SALVATI. SEMPRE.

**Regole per i cron**:
1. Quando modifichi un cron, VERIFICA con `crontab -l`.
2. I cron girano con l'utente e l'ambiente del server. Configura tutto nello script.
3. I cron girano con il timezone del server. Usa `CRON_TZ` se necessario.
4. I cron pericolosi vanno loggati. E monitorati.
5. I cron che cancellano dati vanno approvati da almeno 2 persone.
6. I cron che mandano email vanno limitati. Con batch, throttle, e kill switch.
7. I cron vanno testati in staging. Con dati reali. E qualcuno che guarda.
8. Quando in dubbio, disabilita. Meglio non girare che girare male.

**Come configurare un kill switch**:
```bash
# Crea il wrapper
cat > /opt/scripts/cron_wrapper.sh << 'EOF'
#!/bin/bash
KILL_SWITCH="/etc/cron.d/kill_switch_$(basename $1)"
if [ -f "$KILL_SWITCH" ]; then
  echo "[$(date)] Kill switch attivo per $1" >> /var/log/cron_kill.log
  exit 0
fi
echo "[$(date)] Starting $1" >> /var/log/cron.log
$@
echo "[$(date)] Finished $1. Exit: $?" >> /var/log/cron.log
EOF

# Usa il wrapper nel cron
0 0 * * * /opt/scripts/cron_wrapper.sh /opt/scripts/cleanup_users.sh

# Attiva il kill switch
touch /etc/cron.d/kill_switch_cleanup_users.sh

# Disattiva il kill switch
rm /etc/cron.d/kill_switch_cleanup_users.sh
```

**Come limitare le email**:
```bash
# Usa un sistema di code con throttle
cat > /opt/scripts/send_emails.sh << 'EOF'
#!/bin/bash
MAX_EMAILS_PER_MINUTE=1000
QUEUE_FILE="/var/spool/email_queue"

while read -r email; do
  echo "$email" >> "$QUEUE_FILE"
done

# Processa la coda con rate limiting
while [ -s "$QUEUE_FILE" ]; do
  for i in $(seq 1 $MAX_EMAILS_PER_MINUTE); do
    email=$(head -1 "$QUEUE_FILE")
    if [ -n "$email" ]; then
      sendmail "$email"
      sed -i '1d' "$QUEUE_FILE"
    fi
  done
  sleep 60
done
EOF
```
```

Il TL ha letto la documentazione. Il TL ha sospirato. Il TL ha detto: "Quindi hai imparato che i cron vanno testati. E salvati. E che 13 milioni sono tanti. E che JN va educato. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i cron sono come le armi da fuoco. Non si puntano senza sapere cosa fanno. Non si lasciano in giro senza sicurezza. E non si usano senza qualcuno che controlla. Perché quando un cron sbaglia, sbaglia in grande. E i danni sono enormi. E la fiducia è persa. E i clienti se ne vanno. E tu ti ritrovi con 13 milioni di euro di danni. E una lezione imparata. A caro prezzo. Amen.

---

## Il costo del cron disastroso

| Voce | Valore |
|------|--------|
| Script | cleanup_users.sh |
| Autore | JN |
| Data creazione | 10/05/2026 |
| Data incident | 11/05/2026, 00:00 |
| Tempo in produzione | 1 giorno |
| Utenti cancellati | 31.284.763 |
| Email inviate | 31.284.763 |
| Chiamate supporto | 523.847 |
| Clienti persi | 127.845 |
| Tempo di risoluzione | 16 ore |
| Downtime | 0 (degradato) |
| Costo email | €3.128 |
| Costo supporto | €261.923 |
| Costo clienti persi | €12.784.500 |
| Costo overtime | €60.000 |
| **Costo totale** | **€13.109.551** |
| Reazione UL | "13 milioni?!" |
| Reazione TL | "31 milioni di email?!" |
| Reazione CTO | "Vanno testati." |
| Soluzione | Kill switch + log + educazione |
| Lezione imparata | CRON = TEST + SALVA + KILL SWITCH |

**Morale**: I cron vanno testati. E salvati. E monitorati. E limitati. E controllati. Se non lo fai, il cron si rivolta. E cancella 31 milioni di account. E manda 31 milioni di email. E costa 13 milioni di euro. E JN impara una lezione. A caro prezzo. E la prossima volta, il cron ha un kill switch. E i log. E qualcuno che controlla. E non succede. O quasi. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](116-la-cache-che-ha-restituito-i-dati-vecchi.md) | [Prossima](118-la-memoria-che-non-voleva-lasciare.md)**
