# Il Log Che Ha Riempito Il Disco

**Data**: 22/08/2026

**[Home](../index.md) | [Precedente](78-il-cron-job-che-girava-ogni-minuto.md)]**

---

C'è una verità nel mondo del logging. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `logger.info()` pensando "tanto è solo un log". Quella verità è: **"Un log è come un rubinetto aperto. Puoi farlo gocciolare. Puoi farlo scorrere. Ma se lo lasci aperto senza controllo, l'acqua riempie tutto. E il disco si riempie. E il server si ferma. E il database non scrive. E il sistema muore. E tu guardi 'No space left on device'. E non puoi fare nulla. Perché il log ha mangiato tutto. E il disco è pieno. E tu sei lì. A guardare il server morire. Un megabyte alla volta. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"I log non perdonano. Non hanno limiti. Non hanno pietà. Hanno solo file. E i file crescono. E crescono. E crescono. Finché non c'è più spazio. E quando non c'è più spazio, non c'è più nulla. Niente database. Niente cache. Niente deploy. Niente vita. Solo 'No space left on device'. E tu guardi il messaggio. E sai che è colpa tua. Perché hai lasciato il rubinetto aperto. Amen"**. E questa è la storia di chi ha lasciato il log aperto. Di chi ha guardato il disco riempirsi. Di chi ha visto il server morire. Un megabyte alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo debuggare il problema dei pagamenti.

**ME**: Debuggare?

**PM**: Sì. I pagamenti falliscono in modo casuale.

**ME**: Casuale?

**PM**: Sì. A volte funzionano. A volte no.

**ME**: E quando falliscono?

**PM**: Non lo sappiamo. Non c'è log.

**ME**: Non c'è log?

**PM**: No. Il sistema non logga nulla.

**ME**: Nulla?

**PM**: Nulla. E dobbiamo capire perché fallisce.

**ME**: E come facciamo?

**PM**: Aggiungi log. Dappertutto.

**ME**: Dappertutto?

**PM**: Sì. In ogni funzione. In ogni riga. In ogni if.

**ME**: Ma non è troppo?

**PM**: Troppo cosa?

**ME**: Troppo log.

**PM**: Non esiste troppo log. Esiste troppo poco debug.

**ME**: E la dimensione?

**PM**: Quale dimensione?

**ME**: La dimensione dei file di log.

**PM**: Abbiamo 500GB di disco. Non si riempie.

**ME**: Mai?

**PM**: Mai. Abbiamo spazio per anni.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con i log. Il nulla che era la mia attenzione al disk space. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Piano**

Il martedì, ho pianificato. Ho pianificato i log. Ho pianificato... il nulla.

**ME**: Ho guardato il sistema.

**TL**: E?

**ME**: Non ha log.

**TL**: Niente?

**ME**: Niente. Zero. Nulla.

**TL**: E i pagamenti?

**ME**: Falliscono senza lasciare traccia.

**TL**: E come debugghi?

**ME**: Non puoi. È come cercare un ago nel pagliaio. Al buio. Con le mani legate.

**TL**: E quindi?

**ME**: Quindi aggiungo log.

**TL**: Dove?

**ME**: Dappertutto.

**TL**: Dappertutto?

**ME**: Sì. In ogni funzione. In ogni if. In ogni loop.

**TL**: E la rotazione?

**ME**: Rotazione?

**TL**: Sì. La log rotation.

**ME**: Non ci ho pensato.

**TL**: Non ci hai pensato?

**ME**: No. Pensavo solo a debuggare.

**TL**: E i file quanto crescono?

**ME**: Non lo so. Forse 1GB al giorno.

**TL**: 1GB al giorno?

**ME**: Sì. Forse meno.

**TL**: E se è di più?

**ME**: Non è di più.

**TL**: E SE È DI PIÙ?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  127G  373G  26% /
```

E il disco aveva 373GB liberi. E il PM voleva log. E io non avevo pensato alla rotazione. Amen.

---

**Mercoledì - Il Codice**

Il mercoledì, ho scritto. Ho scritto i log. Ho scritto... il disastro.

**ME**: Ho aggiunto i log.

**TL**: Fammi vedere.

```python
# payment_service.py
import logging

logger = logging.getLogger('payment')
logger.setLevel(logging.DEBUG)

# Log everything
def process_payment(user_id, amount, card_data):
    logger.debug(f"Processing payment for user {user_id}")
    logger.debug(f"Amount: {amount}")
    logger.debug(f"Card data: {card_data}")  # TODO: remove in prod
    logger.debug(f"Starting validation")
    
    if validate_card(card_data):
        logger.debug(f"Card validated successfully")
        logger.debug(f"Calling payment gateway")
        result = call_gateway(user_id, amount, card_data)
        logger.debug(f"Gateway response: {result}")
        
        if result.success:
            logger.debug(f"Payment successful")
            logger.debug(f"Updating database")
            update_payment_status(user_id, 'success')
            logger.debug(f"Database updated")
            logger.debug(f"Sending confirmation email")
            send_email(user_id, 'payment_success')
            logger.debug(f"Email sent")
            return result
        else:
            logger.debug(f"Payment failed: {result.error}")
            logger.debug(f"Updating database")
            update_payment_status(user_id, 'failed')
            logger.debug(f"Database updated")
            logger.debug(f"Sending failure email")
            send_email(user_id, 'payment_failed')
            logger.debug(f"Email sent")
            return result
    else:
        logger.debug(f"Card validation failed")
        logger.debug(f"Returning error")
        return Error("Invalid card")

def validate_card(card_data):
    logger.debug(f"Validating card: {card_data}")
    # validation logic
    logger.debug(f"Card validation complete")
    return True

def call_gateway(user_id, amount, card_data):
    logger.debug(f"Calling gateway with amount {amount}")
    logger.debug(f"User: {user_id}")
    logger.debug(f"Card: {card_data}")
    # gateway call
    logger.debug(f"Gateway call complete")
    return Result(success=True)

# ... and so on for every function
```

**TL**: ...

**ME**: Cosa?

**TL**: HAI MESSO IL LOGGING A DEBUG?

**ME**: Sì.

**TL**: IN PRODUZIONE?

**ME**: Sì.

**TL**: E QUANTI LOG GENERA?

**ME**: Non lo so. Tanti.

**TL**: TANTI?

**ME**: Sì. Per ogni pagamento.

**TL**: E QUANTI PAGAMENTI CI SONO?

**ME**: 10.000 al giorno.

**TL**: 10.000?

**ME**: Sì.

**TL**: E QUANTE RIGHE DI LOG PER PAGAMENTO?

**ME**: Forse 50.

**TL**: 50 RIGHE PER 10.000 PAGAMENTI?

**ME**: Sì.

**TL**: E QUANTE RIGHE AL GIORNO?

**ME**: 500.000.

**TL**: E QUANTI BYTE PER RIGA?

**ME**: Forse 200.

**TL**: 200 BYTE PER 500.000 RIGHE?

**ME**: Sì.

**TL**: E QUANTI GB AL GIORNO?

**ME**: ...100MB.

**TL**: 100MB?

**ME**: Sì. 500.000 * 200 = 100MB.

**TL**: E SE I PAGAMENTI AUMENTANO?

**ME**: Aumentano i log.

**TL**: E SE RADDOPPIANO?

**ME**: Raddoppiano i log.

**TL**: E SE DECIMPLICANO?

**ME**: ...1GB al giorno.

**TL**: E IN UN MESE?

**ME**: 30GB.

**TL**: E IN UN ANNO?

**ME**: 365GB.

**TL**: E LO SPAZIO?

**ME**: Abbiamo 373GB.

**TL**: E QUINDI?

**ME**: E quindi... si riempie in un anno.

**TL**: E SE I PAGAMENTI AUMENTANO DI 10X?

**ME**: ...si riempie in un mese.

Il TL mi ha guardato. Io guardavo il codice. Il codice aveva DEBUG logging. E DEBUG logging logga tutto. E tutto significa 50 righe per pagamento. E 10.000 pagamenti al giorno. E 100MB al giorno. E se i pagamenti aumentano... il disco si riempie. Amen.

---

**Giovedì - Il Deploy**

Il giovedì, ho deployato. Ho deployato i log. Ho deployato... il disastro.

**ME**: Ho deployato.

**TL**: In produzione?

**ME**: Sì.

**TL**: Con DEBUG logging?

**ME**: Sì.

**TL**: E LA ROTAZIONE?

**ME**: Non l'ho messa.

**TL**: NON L'HAI MESSA?

**ME**: No. Pensavo di farla dopo.

**TL**: DOPO?

**ME**: Sì. Dopo aver debuggato.

**TL**: E SE IL DISCO SI RIEMPIE PRIMA?

**ME**: Non si riempie. Abbiamo 373GB.

**TL**: E SE I LOG CRESCONO PIÙ DEL PREVISTO?

**ME**: Non crescono più del previsto.

**TL**: E SE CRESCONO?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
kubectl logs -f payment-service-7f8b9c

2026-08-13 10:23:45.123 DEBUG [payment] Processing payment for user 847231
2026-08-13 10:23:45.124 DEBUG [payment] Amount: 49.99
2026-08-13 10:23:45.125 DEBUG [payment] Card data: **** **** **** 4242
2026-08-13 10:23:45.126 DEBUG [payment] Starting validation
2026-08-13 10:23:45.127 DEBUG [payment] Validating card: **** **** **** 4242
2026-08-13 10:23:45.128 DEBUG [payment] Card validation complete
2026-08-13 10:23:45.129 DEBUG [payment] Card validated successfully
2026-08-13 10:23:45.130 DEBUG [payment] Calling payment gateway
2026-08-13 10:23:45.131 DEBUG [payment] Calling gateway with amount 49.99
2026-08-13 10:23:45.132 DEBUG [payment] User: 847231
2026-08-13 10:23:45.133 DEBUG [payment] Card: **** **** **** 4242
2026-08-13 10:23:45.234 DEBUG [payment] Gateway call complete
2026-08-13 10:23:45.235 DEBUG [payment] Gateway response: Result(success=True)
2026-08-13 10:23:45.236 DEBUG [payment] Payment successful
2026-08-13 10:23:45.237 DEBUG [payment] Updating database
2026-08-13 10:23:45.338 DEBUG [payment] Database updated
2026-08-13 10:23:45.339 DEBUG [payment] Sending confirmation email
2026-08-13 10:23:45.440 DEBUG [payment] Email sent
```

E i log scorrevano. E scorrevano. E scorrevano. E ogni pagamento generava 20 righe. E i pagamenti arrivavano. E i log crescevano. E il disco si riempiva. Amen.

---

**Venerdì - 09:00**

Il venerdì, ho guardato. Ho guardato i log. Ho guardato... il disastro.

**TERMINALE**:
```
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  187G  313G  38% /
```

**ME**: Il disco è salito.

**TL**: Salito?

**ME**: Sì. Da 127GB a 187GB.

**TL**: IN UN GIORNO?

**ME**: Sì. 60GB in un giorno.

**TL**: 60GB?

**ME**: Sì.

**TL**: E I PAGAMENTI?

**ME**: Sono aumentati.

**TL**: Aumentati quanto?

**ME**: 10x. C'è una promozione.

**TL**: UNA PROMOZIONE?

**ME**: Sì. Il PM ha lanciato una promozione.

**TL**: E QUANTI PAGAMENTI CI SONO?

**ME**: 100.000 al giorno.

**TL**: 100.000?

**ME**: Sì. 10x il normale.

**TL**: E I LOG?

**ME**: 1GB all'ora.

**TL**: 1GB ALL'ORA?

**ME**: Sì. 24GB al giorno.

**TL**: E LO SPAZIO?

**ME**: 313GB.

**TL**: E QUANDO SI RIEMPIE?

**ME**: Tra 13 giorni.

**TL**: 13 GIORNI?

**ME**: Sì. Se la promozione continua.

**TL**: E SE CONTINUA?

**ME**: Allora... il disco si riempie.

**TL**: E IL SERVER?

**ME**: Il server si ferma.

**TL**: E I PAGAMENTI?

**ME**: I pagamenti smettono.

**TL**: E IL BUSINESS?

**ME**: Il business muore.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Disco: 187GB usati su 500GB
- Crescita: 60GB in un giorno
- Proiezione: 13 giorni al riempimento

E la promozione continuava. E i pagamenti aumentavano. E i log crescevano. E il disco si riempiva. Amen.

---

**Venerdì - 14:00**

Il PM ha chiamato. Il PM voleva sapere. E io... ho detto la verità.

**PM**: Come va con i log?

**ME**: C'è un problema.

**PM**: Problema?

**ME**: Sì. I log stanno riempiendo il disco.

**PM**: Riempendo?

**ME**: Sì. 60GB in un giorno.

**PM**: E lo spazio?

**ME**: 313GB liberi.

**PM**: E quando si riempie?

**ME**: Tra 13 giorni.

**PM**: 13 giorni?

**ME**: Sì. Se la promozione continua.

**PM**: E LA PROMOZIONE CONTINUA!

**ME**: Allora il disco si riempie.

**PM**: E IL SERVER?

**ME**: Il server si ferma.

**PM**: E I PAGAMENTI?

**ME**: I pagamenti smettono.

**PM**: E LE VENDITE?

**ME**: Le vendite muoiono.

**PM**: E QUANTO COSTA?

**ME**: Non lo so. Forse €100.000 al giorno.

**PM**: €100.000?

**ME**: Sì. Se il server si ferma.

**PM**: E QUINDI?

**ME**: E quindi devo aggiungere la rotazione dei log.

**PM**: E QUANTO CI VUOLE?

**ME**: Un'ora. Forse due.

**PM**: E PERCHÉ NON L'HAI FATTO PRIMA?

**ME**: Non pensavo che i log crescessero così tanto.

**PM**: NON PENSAVI?

**ME**: No.

**PM**: E ORA?

**ME**: Ora lo faccio.

**PM**: FALLO. SUBITO.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia pianificazione. Il nulla che era la mia attenzione. Il nulla... che era il disco che si riempiva. Amen.

---

**Venerdì - 15:00**

Ho configurato. Ho configurato la rotazione. Ho configurato... quasi tutto.

**ME**: Ho configurato logrotate.

**TL**: Fammi vedere.

```
# /etc/logrotate.d/payment-service
/var/log/payment/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    size 100M
}
```

**TL**: Daily?

**ME**: Sì. Ruota ogni giorno.

**TL**: E SE CRESCONO PIÙ DI 100MB?

**ME**: Ruota prima.

**TL**: E QUANTI FILE MANTIENE?

**ME**: 7 giorni.

**TL**: E POI?

**ME**: Poi li cancella.

**TL**: E LA COMPRESSSIONE?

**ME**: Sì. Comprime i vecchi.

**TL**: E QUANTO RISPARMI?

**ME**: 90%. I log compressi sono piccoli.

**TL**: E QUINDI?

**ME**: E quindi i log non riempiono più il disco.

**TL**: E SE LA ROTAZIONE FALLISCE?

**ME**: Non fallisce.

**TL**: E SE FALLISCE?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo la configurazione. La configurazione era corretta. Ma non avevo testato. E se la rotazione falliva... il disco si riempiva. Amen.

---

**Venerdì - 16:00**

Ho testato. Ho testato la rotazione. Ho testato... con successo.

**TERMINALE**:
```
logrotate -f /etc/logrotate.d/payment-service

ls -la /var/log/payment/
total 2.1G
drwxr-xr-x 2 root root      4096 Aug 14 16:00 .
drwxr-xr-x 3 root root      4096 Aug 14 16:00 ..
-rw-r--r-- 1 root root  100M Aug 14 16:00 payment.log
-rw-r--r-- 1 root root  100M Aug 14 15:59 payment.log.1
-rw-r--r-- 1 root root   10M Aug 14 15:59 payment.log.2.gz
-rw-r--r-- 1 root root   10M Aug 14 15:59 payment.log.3.gz
-rw-r--r-- 1 root root   10M Aug 14 15:59 payment.log.4.gz
-rw-r--r-- 1 root root   10M Aug 14 15:59 payment.log.5.gz
-rw-r--r-- 1 root root   10M Aug 14 15:59 payment.log.6.gz
-rw-r--r-- 1 root root   10M Aug 14 15:59 payment.log.7.gz
```

**ME**: Funziona.

**TL**: E QUANTO SPAZIO USA ORA?

**ME**: 200MB per i log attivi. 60MB per i compressi.

**TL**: 260MB TOTALI?

**ME**: Sì.

**TL**: E PRIMA?

**ME**: 60GB al giorno.

**TL**: E ORA?

**ME**: 260MB fissi.

**TL**: E IL DISCO?

**ME**: Il disco non si riempie più.

**TL**: E I PAGAMENTI?

**ME**: I pagamenti continuano.

**TL**: E IL BUSINESS?

**ME**: Il business vive.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Log attivi: 200MB
- Log compressi: 60MB
- Totale: 260MB
- Rotazione: funzionante

E il disco era salvo. E i pagamenti continuavano. E il business viveva. Amen.

---

**Venerdì - 17:00**

Ma non era finita. Non era mai finita. Perché...

**TERMINALE**:
```
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  247G  253G  50% /
```

**ME**: Il disco è salito ancora.

**TL**: Salito?

**ME**: Sì. Da 187GB a 247GB.

**TL**: IN UN'ORA?

**ME**: Sì. 60GB in un'ora.

**TL**: 60GB IN UN'ORA?

**ME**: Sì.

**TL**: E LA ROTAZIONE?

**ME**: La rotazione è attiva.

**TL**: E ALLORA PERCHÉ CRESCONO?

**ME**: Non lo so.

**TL**: CONTROLLA!

Ho controllato. Ho controllato i log. Ho controllato... l'orrore.

**TERMINALE**:
```
ls -la /var/log/payment/
total 62G
drwxr-xr-x 2 root root      4096 Aug 14 17:00 .
drwxr-xr-x 3 root root      4096 Aug 14 17:00 ..
-rw-r--r-- 1 root root   62G Aug 14 17:00 payment.log
```

**ME**: Il file è 62GB.

**TL**: 62GB?

**ME**: Sì.

**TL**: E LA ROTAZIONE?

**ME**: Non ha funzionato.

**TL**: PERCHÉ?

**ME**: Non lo so.

**TL**: CONTROLLA!

Ho controllato. Ho controllato logrotate. Ho controllato... l'errore.

**TERMINALE**:
```
cat /var/log/logrotate.log

error: error running shared postrotate script for '/var/log/payment/*.log'
error: failed to compress /var/log/payment/payment.log.1
```

**ME**: La compressione è fallita.

**TL**: FALLITA?

**ME**: Sì.

**TL**: PERCHÉ?

**ME**: Non c'è spazio per comprimere.

**TL**: NON C'È SPAZIO?

**ME**: No. Il disco è al 50%.

**TL**: E QUINDI?

**ME**: E quindi la rotazione non può comprimere.

**TL**: E I LOG CRESCONO?

**ME**: Sì. Senza sosta.

**TL**: E QUANTO CRESCONO?

**ME**: 1GB al minuto.

**TL**: 1GB AL MINUTO?

**ME**: Sì. La promozione è virale.

**TL**: E IL DISCO?

**ME**: Il disco si riempie in 4 ore.

**TL**: 4 ORE?

**ME**: Sì. 253GB liberi. 1GB al minuto.

**TL**: E DOBBIAMO FARE QUALCOSA!

**ME**: Cosa?

**TL**: FERMARE I LOG!

**ME**: Fermare?

**TL**: SÌ! CAMBIARE IL LIVELLO DA DEBUG A ERROR!

**ME**: E I PAGAMENTI?

**TL**: I PAGAMENTI CONTINUANO! SOLO I LOG SI FERMANO!

**ME**: Ok. Lo faccio.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Disco: 247GB usati su 500GB
- Crescita: 1GB al minuto
- Tempo: 4 ore al riempimento

E la rotazione era fallita. E i log crescevano. E il disco si riempiva. Amen.

---

**Venerdì - 17:15**

Ho cambiato. Ho cambiato il livello. Ho cambiato... quasi in tempo.

**TERMINALE**:
```
kubectl set env deployment/payment-service LOG_LEVEL=ERROR

deployment.apps/payment-service env updated
```

**ME**: Fatto.

**TL**: E I LOG?

**ME**: Controllo.

```
kubectl logs -f payment-service-7f8b9c

2026-08-14 17:16:23.456 ERROR [payment] Payment failed for user 847231: Gateway timeout
2026-08-14 17:16:45.789 ERROR [payment] Payment failed for user 847232: Invalid card
```

**ME**: I log sono diminuiti.

**TL**: DI QUANTO?

**ME**: Da 50 righe per pagamento a 0.1 righe per pagamento.

**TL**: 0.1?

**ME**: Sì. Solo gli errori.

**TL**: E QUANTI ERRORI CI SONO?

**ME**: 1% dei pagamenti.

**TL**: E QUINDI?

**ME**: E quindi i log sono 500x meno.

**TL**: E LA CRESCITA?

**ME**: La crescita è fermata.

**TL**: E IL DISCO?

**ME**: Il disco è salvo.

**TL**: E I PAGAMENTI?

**ME**: I pagamenti continuano.

**TL**: E IL BUSINESS?

**ME**: Il business vive.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Log level: ERROR
- Crescita: fermata
- Disco: salvo

E i log erano sotto controllo. E i pagamenti continuavano. E il business viveva. Amen.

---

**Venerdì - 18:00**

Ma non era finita. Non era mai finita. Perché...

**TERMINALE**:
```
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  287G  213G  58% /
```

**ME**: Il disco è ancora salito.

**TL**: Salito?

**ME**: Sì. Da 247GB a 287GB.

**TL**: MA I LOG SONO FERMATI!

**ME**: Sì.

**TL**: E ALLORA COSA CRESCIA?

**ME**: Non lo so.

**TL**: CONTROLLA!

Ho controllato. Ho controllato i file. Ho controllato... l'orrore.

**TERMINALE**:
```
du -sh /var/log/* | sort -h

10M     /var/log/auth.log
15M     /var/log/syslog
20M     /var/log/nginx
62G     /var/log/payment
...
```

**ME**: I log payment sono ancora 62GB.

**TL**: ANCORA?

**ME**: Sì. Non sono stati cancellati.

**TL**: PERCHÉ?

**ME**: La rotazione è fallita.

**TL**: E QUINDI?

**ME**: E quindi i vecchi log sono ancora lì.

**TL**: E QUANTI SONO?

**ME**: 62GB.

**TL**: E LI DEVI CANCELLARE!

**ME**: Ora li cancello.

**TERMINALE**:
```
rm /var/log/payment/payment.log

ls -la /var/log/payment/
total 0
drwxr-xr-x 2 root root      4096 Aug 14 18:05 .
drwxr-xr-x 3 root root      4096 Aug 14 18:05 ..
```

**ME**: Fatto. Cancellati.

**TL**: E IL DISCO?

**ME**: Controllo.

```
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  225G  275G  46% /
```

**ME**: Il disco è sceso.

**TL**: Sceso?

**ME**: Sì. Da 287GB a 225GB.

**TL**: 62GB LIBERATI?

**ME**: Sì.

**TL**: E ORA?

**ME**: Ora il disco è salvo.

**TL**: E I LOG?

**ME**: I log sono sotto controllo.

**TL**: E I PAGAMENTI?

**ME**: I pagamenti continuano.

**TL**: E IL BUSINESS?

**ME**: Il business vive.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Disco: 225GB usati su 500GB
- Log: sotto controllo
- Business: vivo

E il disco era salvo. E i log erano sotto controllo. E il business viveva. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non lascerò mai il logging a DEBUG in produzione.
Non lascerò mai il logging a DEBUG in produzione.
Non lascerò mai il logging a DEBUG in produzione.
...
(997 righe dopo)
...
Non lascerò mai il logging a DEBUG in produzione.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più lasciato il logging a DEBUG in produzione.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che DEBUG logging in produzione è pericoloso.

**TL**: E cos'altro?

**ME**: Che la log rotation va configurata.

**TL**: E cos'altro?

**ME**: Che i log crescono più del previsto.

**TL**: E cos'altro?

**ME**: Che 62GB di log sono tanti.

**TL**: E cos'altro?

**ME**: Che il disco si riempie.

**TL**: E cos'altro?

**ME**: Che il server si ferma.

**TL**: E cos'altro?

**ME**: Che il business muore.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che i log non sono "solo testo". I log sono dati. E i dati crescono. E crescono. E crescono. Finché non c'è più spazio. E quando non c'è più spazio, non c'è più nulla. Niente database. Niente cache. Niente deploy. Niente vita. Solo 'No space left on device'. E tu guardi il messaggio. E sai che è colpa tua. Perché hai lasciato il rubinetto aperto. E il rubinetto era DEBUG. E DEBUG logga tutto. E tutto riempie il disco. E il disco si riempie. E il server muore. E tu guardi. E non puoi fare nulla. Perché i log hanno mangiato tutto. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i log non perdonano. E il CEO nemmeno. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non lascerò mai il logging a DEBUG in produzione". E sapevo che le avrei mantenute. Perché i log non perdonano. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #LOG-001: Il Log Che Ha Riempito Il Disco

**Data incident**: Venerdì 14 agosto 2026, 09:00
**Autore**: ME
**Livello logging**: DEBUG (in produzione)
**File di log**: /var/log/payment/payment.log
**Dimensione massima**: 62GB
**Crescita**: 1GB/minuto (durante promozione)
**Rotazione**: NON configurata (inizialmente)
**Rotazione**: FALLITA (per mancanza di spazio)
**Spazio disco usato**: 287GB/500GB (58%)
**Tempo a riempimento**: 4 ore
**Pagamenti al giorno**: 100.000 (durante promozione)
**Righe di log per pagamento**: 50
**Byte per riga**: 200
**Crescita prevista**: 100MB/giorno (normale)
**Crescita reale**: 1GB/minuto (promozione virale)
**Differenza**: 144x il previsto
**Soluzione**: Cambiato livello da DEBUG a ERROR
**Risultato**: Log ridotti di 500x
**Punizione**: 1.000 volte "Non lascerò mai il logging a DEBUG in produzione"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "I log sono dati. E i dati crescono."
**Reazione TL**: "Hai lasciato il rubinetto aperto."
**Reazione PM**: "La promozione è virale!"
**Lezione imparata**: LOGGING = LIVELLO GIUSTO + ROTAZIONE + MONITORAGGIO
**Probabilità che succeda di nuovo**: 18% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. MAI DEBUG in produzione. Usare INFO o WARNING.
2. SEMPRE configurare la log rotation.
3. MONITORARE la dimensione dei log.
4. MONITORARE il disk space.
5. I log crescono più del previsto.
6. Le promozioni possono essere virali.
7. 1GB al minuto = 60GB all'ora = disco pieno in 4 ore.
8. ERROR logging = 500x meno log.
9. La compressione risparmia 90%.
10. 1.000 volte a mano. Ricordalo.

**Log levels cheat sheet**:
```
DEBUG: Tutto. Usare solo in sviluppo.
INFO: Operazioni normali. Usare con moderazione.
WARNING: Situazioni anomale ma gestibili.
ERROR: Errori che richiedono attenzione.
CRITICAL: Errori che fermano il sistema.
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che DEBUG in produzione è pericoloso. E che la log rotation va configurata. E che i log crescono più del previsto. E che 62GB di log sono tanti. E che il disco si riempie. E che il server si ferma. E che il business muore. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che i log non sono 'solo testo'. Sono dati. E i dati crescono. E crescono. E crescono. Finché non c'è più spazio. E quando non c'è più spazio, non c'è più nulla. Solo 'No space left on device'. E tu guardi il messaggio. E sai che è colpa tua. Perché hai lasciato il rubinetto aperto. E il rubinetto era DEBUG. E DEBUG logga tutto. E tutto riempie il disco. E il disco si riempie. E il server muore. E tu guardi. E non puoi fare nulla. Perché i log hanno mangiato tutto. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i log non perdonano. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: i log sono dati. E i dati crescono. E se non li controlli, crescono senza sosta. E riempiono il disco. E il disco si riempie. E il server muore. E tu guardi 'No space left on device'. E sai che è colpa tua. Perché hai lasciato il rubinetto aperto. E il rubinetto era DEBUG. E DEBUG logga tutto. E tutto riempie il disco. E il disco si riempie. E il server muore. E tu guardi. E non puoi fare nulla. Perché i log hanno mangiato tutto. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i log non perdonano. E il CEO nemmeno. Amen.

---

## Il costo del log senza rotazione

| Voce | Valore |
|------|--------|
| Livello logging | DEBUG |
| File di log | /var/log/payment/payment.log |
| Dimensione massima | 62GB |
| Crescita | 1GB/minuto |
| Rotazione | Non configurata |
| Spazio disco usato | 287GB/500GB (58%) |
| Tempo a riempimento | 4 ore |
| Pagamenti al giorno | 100.000 |
| Righe per pagamento | 50 |
| Byte per riga | 200 |
| Crescita prevista | 100MB/giorno |
| Crescita reale | 1GB/minuto |
| Differenza | 144x |
| Soluzione | Cambiato a ERROR |
| Riduzione log | 500x |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "I log sono dati" |
| Reazione TL | "Rubinetto aperto" |
| Reazione PM | "Promozione virale!" |
| Lezione imparata | LIVELLO + ROTAZIONE + MONITORAGGIO |
| **Totale** | **62GB log + 4 ore a rischio + 1.000 righe a mano** |

**Morale**: I log vanno configurati. Il livello va scelto. La rotazione va attivata. Il disco va monitorato. Mai lasciare DEBUG in produzione. Mai senza rotazione. Mai senza pensare. Perché quando i log crescono, crescono senza sosta. E riempiono il disco. E il server muore. E tu guardi 'No space left on device'. E sai che è colpa tua. Perché hai lasciato il rubinetto aperto. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i log non perdonano. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](78-il-cron-job-che-girava-ogni-minuto.md)]**
