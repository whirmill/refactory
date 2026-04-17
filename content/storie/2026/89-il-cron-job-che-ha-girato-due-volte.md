# Il Cron Job Che Ha Girato Due Volte

**Data**: 31/10/2026

**[Home](../index.md) | [Precedente](88-il-feature-flag-che-ha-ucciso-la-produzione.md)]**

---

C'è una verità nell'IT che tutti conoscono ma nessuno rispetta: i cron job sono silenziosi. Girano. E girano. E girano. E tu non li vedi. Non li senti. Non li controlli. Finché un giorno non girano due volte. E quando un cron job gira due volte, succede il disastro. I dati si duplicano. Le email si moltiplicano. I pagamenti si raddoppiano. E tu ti chiedi: "Com'è possibile che un job sia girato due volte?" E la risposta è semplice: perché i cron job non perdonano. E perché il tempo è relativo. E perché i server hanno orologi diversi. E perché nessuno ha pensato di controllare. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 9:15. Il caffè era ancora caldo.

Poi è arrivata l'email.

**DA**: cliente.importante@azienda.it
**OGGETTO**: PERCHÉ HO RICEVUTO DUE FATTURE?!

**ME**: Due fatture?

**TL**: Due?

**ME**: Sì. Il cliente ha ricevuto due fatture identiche.

**TL**: Identiche?

**ME**: Sì. Stesso numero. Stesso importo. Stessa data.

**TL**: E COME È POSSIBILE?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Cerca fatture duplicate
SELECT * FROM invoices WHERE customer_id = 1234 AND date = '2026-10-30';
+----+-------------+--------+------------+---------+
| id | customer_id | number | date       | total   |
+----+-------------+--------+------------+---------+
| 1  | 1234        | 45821  | 2026-10-30 | 1250.00 |
| 2  | 1234        | 45821  | 2026-10-30 | 1250.00 |
+----+-------------+--------+------------+---------+
```

**ME**: Due fatture. Identiche.

**TL**: IDENTICHE?!

**ME**: Sì. Stesso numero. Stesso importo. Stessa data.

**TL**: E COME È POSSIBILE?!

**ME**: Non lo so. Il cron job delle fatture gira ogni notte alle 3.

**TL**: E QUINDI?!

**ME**: E quindi... dovrebbe generare una fattura per cliente.

**TL**: E INVECE?!

**ME**: Invece ne ha generate due.

**TL**: DUE?!

**ME**: Sì. Per lo stesso cliente.

**TL**: E QUANTI ALTRI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta fatture duplicate
SELECT date, COUNT(*) as count FROM invoices 
WHERE date >= '2026-10-01' 
GROUP BY date 
HAVING COUNT(*) > (SELECT COUNT(DISTINCT customer_id) FROM customers);

+------------+-------+
| date       | count |
+------------+-------+
| 2026-10-30 | 847   |
+------------+-------+

# Clienti totali
SELECT COUNT(DISTINCT customer_id) FROM customers;
+--------------------------+
| COUNT(DISTINCT customer_id) |
+--------------------------+
| 423                      |
+--------------------------+
```

**ME**: 847 fatture per 423 clienti.

**TL**: E QUINDI?!

**ME**: E quindi... quasi il doppio.

**TL**: IL DOPPIO?!

**ME**: Sì. Ogni cliente ha ricevuto due fatture.

**TL**: DUE FATTURE PER OGNI CLIENTE?!

**ME**: Sì. 423 clienti × 2 = 846 fatture. Più una in più per qualche motivo.

**TL**: E QUINDI?!

**ME**: E quindi... il cron job è girato due volte.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Fatture: 847
- Clienti: 423
- Rapporto: 2:1
- Problema: cron job girato due volte

E tutto era chiaro. Ma le cose chiare sono le più pericolose. Perché le cose chiare le ignori. E le cose ignorate ti perseguitano. Amen.

---

**Lunedì - 10:00**

Ho controllato i log del cron job. Ho trovato la verità.

**TERMINALE**:
```
# Log del cron job
grep "generate-invoices" /var/log/cron.log | grep "Oct 30"
Oct 30 03:00:01 prod-app-01 CROND[12345]: (root) CMD (python /opt/scripts/generate-invoices.py)
Oct 30 03:00:01 prod-app-02 CROND[12345]: (root) CMD (python /opt/scripts/generate-invoices.py)
```

**ME**: Due server. Due esecuzioni.

**TL**: DUE SERVER?!

**ME**: Sì. prod-app-01 e prod-app-02.

**TL**: E ENTRAMBI HANNO IL CRON JOB?!

**ME**: Sì. Entrambi configurati per girare alle 3.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla configurazione cron su entrambi i server
ssh prod-app-01 "crontab -l"
0 3 * * * python /opt/scripts/generate-invoices.py

ssh prod-app-02 "crontab -l"
0 3 * * * python /opt/scripts/generate-invoices.py
```

**ME**: Entrambi hanno lo stesso cron job.

**TL**: E QUINDI?!

**ME**: E quindi... girano entrambi. Alle 3. In parallelo.

**TL**: IN PARALLELO?!

**ME**: Sì. E generano fatture duplicate.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Fino a oggi.

**TL**: E QUANDO È STATO CONFIGURATO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla quando è stato aggiunto il cron job
ssh prod-app-01 "grep -r 'generate-invoices' /var/log/auth.log*"
Oct 15 14:23:45 prod-app-01 sudo: jn-developer : TTY=pts/0 ; PWD=/home/jn ; USER=root ; COMMAND=/usr/bin/crontab -e

ssh prod-app-02 "grep -r 'generate-invoices' /var/log/auth.log*"
Oct 15 14:25:12 prod-app-02 sudo: jn-developer : TTY=pts/0 ; PWD=/home/jn ; USER=root ; COMMAND=/usr/bin/crontab -e
```

**ME**: JN. Il 15 ottobre.

**TL**: JN?!

**ME**: Sì. Ha configurato il cron job su entrambi i server.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Server 1: prod-app-01, cron attivo
- Server 2: prod-app-02, cron attivo
- Autore: JN
- Data: 15 ottobre
- Risultato: fatture duplicate

E tutto era chiaro. JN aveva configurato il cron job su entrambi i server. E nessuno l'aveva notato. E per due settimane, ogni notte, le fatture si duplicavano. Amen.

---

**Lunedì - 11:00**

Ho chiamato JN. JN ha risposto.

**ME**: Hai configurato il cron job delle fatture su entrambi i server?

**JN**: Sì. Perché?

**ME**: E ENTRAMBI GIRANO ALLE 3 DI NOTTE?!

**JN**: Sì. Per alta disponibilità.

**ME**: ALTA DISPONIBILITÀ?!

**JN**: Sì. Se un server è down, l'altro genera le fatture.

**ME**: E SE ENTRAMBI SONO UP?!

**JN**: Ah.

**ME**: AH?!

**JN**: Non ci ho pensato.

**ME**: NON CI HAI PENSATO?!

**JN**: No. Pensavo che... non so cosa pensavo.

**ME**: PENSavi CHE NON SAREBBE SUCCESSO?!

**JN**: Sì. O no. Non lo so.

**ME**: E ORA ABBIAMO 847 FATTURE DUPLICATE!

**JN**: Oh.

**ME**: OH?!

**JN**: Scusa.

**ME**: SCUSA?! I CLIENTI HANNO RICEVUTO DUE FATTURE!

**JN**: E... cosa facciamo?

**ME**: ELIMINIAMO LE DUPLICATE! E DISABILITIAMO UN CRON JOB!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA PENSA A COSA SUCCEDE SE ENTRAMBI I SERVER SONO UP!

**JN**: Ok.

JN ha riattaccato. O forse ho riattaccato io. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Fatture duplicate: 847
- Server con cron: 2
- Autore: JN
- Motivazione: "alta disponibilità"
- Risultato: disastro

E la lezione era chiara. L'alta disponibilità senza coordinamento è un disastro. E i cron job duplicati uccidono i dati. E JN non pensa alle conseguenze. Amen.

---

**Lunedì - 12:00**

Ho chiamato UL. UL ha risposto.

**ME**: Il cron job delle fatture è girato due volte.

**UL**: DUE VOLTE?!

**ME**: Sì. Era configurato su due server.

**UL**: SU DUE SERVER?!

**ME**: Sì. Per "alta disponibilità".

**UL**: E CHI L'HA CONFIGURATO?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. Il 15 ottobre.

**UL**: E NESSUNO L'HA VERIFICATO?!

**ME**: No.

**UL**: E NESSUNO L'HA TESTATO?!

**ME**: No.

**UL**: E QUANTE FATTURE DUPLICATE?!

**ME**: 847.

**UL**: 847?!

**ME**: Sì. Una per ogni cliente. Per due settimane.

**UL**: DUE SETTIMANE?!

**ME**: Sì. Dal 15 ottobre al 30 ottobre.

**UL**: E I CLIENTI?!

**ME**: I clienti... hanno ricevuto due fatture.

**UL**: E COSA HANNO DETTO?!

**ME**: Uno ha scritto. Gli altri... non lo so ancora.

**UL**: E QUINDI?!

**ME**: E quindi... elimino le duplicate. E disabilito un cron job.

**UL**: E IL COSTO?!

**ME**: Non lo so. Il PM lo sa.

**PM**: (entrando) Il costo di cosa?

**UL**: Delle fatture duplicate!

**PM**: Ah. I clienti hanno chiamato. 12 ticket. 3 hanno chiesto sconti.

**UL**: SCONTI?!

**PM**: Sì. Per il "disagio".

**UL**: E QUANTO?!

**PM**: 500€ a cliente. 1.500€ totali.

**UL**: 1.500€?!

**PM**: Sì. Se glieli diamo.

**UL**: E SE NON GLIELI DIAMO?!

**PM**: Allora... se ne vanno.

**UL**: E QUINDI?!

**ME**: E quindi... diamo gli sconti. E sistemiamo il cron job.

UL ha riattaccato. Io guardavo il nulla. Il nulla che era la nostra architettura. Il nulla che era il nostro coordinamento. Il nulla che era il nostro processo. E tutto doveva cambiare. Amen.

---

**Lunedì - 14:00**

Ho eliminato le fatture duplicate. Ho disabilitato il cron job su un server.

**TERMINALE**:
```
# Trova fatture duplicate
SELECT id, customer_id, number, date, 
       ROW_NUMBER() OVER (PARTITION BY customer_id, number, date ORDER BY id) as rn
FROM invoices 
WHERE date = '2026-10-30'
HAVING rn > 1;

+----+-------------+--------+------------+----+
| id | customer_id | number | date       | rn |
+----+-------------+--------+------------+----+
| 2  | 1234        | 45821  | 2026-10-30 | 2  |
| 4  | 5678        | 45822  | 2026-10-30 | 2  |
...
+----+-------------+--------+------------+----+
423 rows

# Elimina duplicate
DELETE FROM invoices 
WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY customer_id, number, date ORDER BY id) as rn
    FROM invoices WHERE date = '2026-10-30'
  ) t WHERE rn > 1
);
Query OK, 423 rows affected

# Disabilita cron job su prod-app-02
ssh prod-app-02 "crontab -l | grep -v generate-invoices | crontab -"
```

**ME**: Eliminate 423 fatture duplicate. Disabilitato cron su prod-app-02.

**TL**: E ORA?

**ME**: Ora solo prod-app-01 genera fatture.

**TL**: E SE PROD-APP-01 È DOWN?

**ME**: Allora... non si generano fatture.

**TL**: E QUINDI?!

**ME**: E quindi... serve un meccanismo di lock.

**TL**: UN LOCK?!

**ME**: Sì. Un lock distribuito. Per evitare che due job girino insieme.

**TL**: E COME SI FA?!

**ME**: Con Redis. O con un database. O con un file di lock.

**TL**: E QUANDO LO FAI?

**ME**: Ora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Fatture duplicate: eliminate
- Cron job: disabilitato su un server
- Lock: da implementare

E tutto sembrava risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché le cose che sembrano risolte le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Martedì - Il Lock Distribuito**

Martedì. Ho implementato il lock distribuito. Per evitare che il job giri due volte.

**TERMINALE**:
```
# Script con lock distribuito
cat > /opt/scripts/generate-invoices.py << 'EOF'
import redis
import sys
from datetime import datetime

# Connetti a Redis
r = redis.Redis(host='redis.internal', port=6379, db=0)

# Lock key
lock_key = f"invoices:lock:{datetime.now().date()}"

# Prova a acquisire il lock
if r.setnx(lock_key, "locked"):
    # Lock acquisito, imposta scadenza di 2 ore
    r.expire(lock_key, 7200)
    
    # Genera fatture
    print("Generazione fatture iniziata...")
    # ... codice per generare fatture ...
    print("Generazione fatture completata.")
    
    # Rilascia il lock
    r.delete(lock_key)
else:
    print("Lock già acquisito. Un altro job sta girando.")
    sys.exit(1)
EOF

# Deploy su entrambi i server
scp /opt/scripts/generate-invoices.py prod-app-01:/opt/scripts/
scp /opt/scripts/generate-invoices.py prod-app-02:/opt/scripts/

# Riabilita cron su prod-app-02
ssh prod-app-02 "echo '0 3 * * * python /opt/scripts/generate-invoices.py' | crontab -"
```

**TL**: Hai implementato il lock?

**ME**: Sì. Con Redis.

**TL**: E come funziona?

**ME**: Il primo job che arriva acquisisce il lock. Il secondo trova il lock e esce.

**TL**: E se il primo job crasha?

**ME**: Il lock scade dopo 2 ore.

**TL**: E SE IL JOB IMPIEGA PIÙ DI 2 ORE?!

**ME**: Allora... il lock scade. E il secondo job può partire.

**TL**: E QUINDI?!

**ME**: E quindi... il job deve completare in meno di 2 ore.

**TL**: E SE NON COMPLETA?!

**ME**: Allora... prega.

**TL**: E SE IL LOCK SCADE MENTRE IL JOB GIRA?!

**ME**: Allora... abbiamo un problema.

**TL**: E COME LO RISOLVIAMO?!

**ME**: Aumentiamo la scadenza. O usiamo un lock rinnovabile.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Lock: implementato
- Scadenza: 2 ore
- Server: entrambi attivi
- Coordinamento: Redis

E tutto funzionava. Ma le cose che funzionano sono le più pericolose. Perché le cose che funzionano le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Mercoledì - La Riunione**

Mercoledì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che il cron job sia girato due volte?

**ME**: Era configurato su due server. Entrambi attivi.

**UL**: E CHI L'HA CONFIGURATO?

**ME**: JN.

**UL**: E PERCHÉ SU DUE SERVER?

**JN**: Per alta disponibilità.

**UL**: ALTA DISPONIBILITÀ?!

**JN**: Sì. Se un server è down, l'altro genera le fatture.

**UL**: E SE ENTRAMBI SONO UP?

**JN**: Non ci ho pensato.

**UL**: NON CI HAI PENSATO?!

**JN**: No. Scusa.

**CTO**: Il problema è che non c'era coordinamento. E ora c'è un lock distribuito.

**UL**: E COME FUNZIONA?

**ME**: Usa Redis. Il primo job acquisisce il lock. Il secondo trova il lock e esce.

**UL**: E SE REDIS È DOWN?

**ME**: Allora... entrambi i job girano.

**UL**: ENTRAMBI?!

**ME**: Sì. Se Redis è down, il lock non funziona.

**UL**: E QUINDI?!

**ME**: E quindi... Redis deve essere up.

**UL**: E SE REDIS È DOWN?!

**ME**: Allora... prega.

**CTO**: Configuriamo Redis in alta disponibilità.

**ME**: Sì.

**CTO**: E chi lo fa?

**ME**: Lo faccio io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E COSA HAI IMPARATO?

**JN**: A non configurare cron job su più server senza coordinamento.

**CTO**: E COS'ALTRO?

**JN**: A pensare a cosa succede se entrambi i server sono up.

**CTO**: E COS'ALTRO?

**JN**: A usare lock distribuiti per i job paralleli.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul processo rotto. E sulle fatture duplicate. Amen.

---

**Giovedì - Redis in Alta Disponibilità**

Giovedì. Ho configurato Redis in alta disponibilità. Per non avere single point of failure.

**TERMINALE**:
```
# Configura Redis Sentinel
cat > /etc/redis/redis.conf << 'EOF'
replicaof 192.168.1.10 6379
EOF

cat > /etc/redis/sentinel.conf << 'EOF'
sentinel monitor mymaster 192.168.1.10 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1
EOF

# Avvia Sentinel
systemctl enable redis-sentinel
systemctl start redis-sentinel

# Verifica
redis-cli -p 26379 SENTINEL master mymaster
name: mymaster
ip: 192.168.1.10
port: 6379
num-slaves: 2
num-other-sentinels: 2
```

**TL**: Hai configurato Redis Sentinel?

**ME**: Sì. Con 3 nodi.

**TL**: E cosa fa?

**ME**: Se il master va down, Sentinel elegge un nuovo master.

**TL**: E IL LOCK?

**ME**: Il lock continua a funzionare. Il nuovo master ha i dati.

**TL**: E SE TUTTI I NODI SONO DOWN?

**ME**: Allora... il lock non funziona.

**TL**: E QUINDI?!

**ME**: E quindi... i job possono girare in parallelo.

**TL**: E SE I JOB GIRANO IN PARALLELO?!

**ME**: Allora... abbiamo di nuovo fatture duplicate.

**TL**: E COME LO EVITIAMO?!

**ME**: Non lo so. A parte tenere Redis up.

**TL**: E SE REDIS È DOWN?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Redis: 3 nodi
- Sentinel: attivo
- Failover: automatico
- Lock: robusto

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'alta disponibilità è difficile. E che i lock distribuiti sono complessi. E che i cron job duplicati uccidono i dati. E che JN non pensa alle conseguenze. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i cron job.

```markdown
## Incident #CRON-001: Il Cron Job Che Ha Girato Due Volte

**Data incident**: Lunedì 31 ottobre 2026, 09:15
**Autore**: JN
**Cron job**: generate-invoices.py
**Problema**: Fatture duplicate per cron job su due server
**Causa**: Cron job configurato su due server senza coordinamento
**Server coinvolti**: prod-app-01, prod-app-02
**Data configurazione**: 15 ottobre 2026
**Giorni con duplicati**: 15
**Fatture duplicate**: 423 per notte × 15 notti = 6.345
**Clienti colpiti**: 423
**Ticket aperti**: 12
**Sconti richiesti**: 1.500€
**Tempo di risoluzione**: 1 giorno
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "JN ha configurato due cron job?!"
**Reazione CTO**: "Lock distribuito + Redis HA."
**Soluzione**: Lock distribuito + Redis Sentinel + educazione
**Lezione imparata**: I CRON JOB DEVONO ESSERE COORDINATI.

**Regole per i cron job**:
1. Un cron job = un server. O lock distribuito.
2. Mai configurare lo stesso job su più server senza coordinamento.
3. Usare lock distribuiti (Redis, database, file).
4. Il lock deve avere una scadenza.
5. Il lock deve essere rinnovabile se il job è lungo.
6. Monitorare i cron job.
7. Loggare l'inizio e la fine del job.
8. Alert se il job fallisce.
9. Alert se il job gira due volte.
10. I cron job non perdonano.

**Come implementare un lock distribuito**:
```python
import redis
from datetime import datetime

r = redis.Redis(host='redis.internal', port=6379, db=0)
lock_key = f"invoices:lock:{datetime.now().date()}"

if r.setnx(lock_key, "locked"):
    r.expire(lock_key, 7200)  # 2 ore
    try:
        # Genera fatture
        pass
    finally:
        r.delete(lock_key)
else:
    print("Lock già acquisito. Esco.")
    exit(1)
```

**Come configurare Redis Sentinel**:
```bash
# Su ogni nodo
cat > /etc/redis/sentinel.conf << 'EOF'
sentinel monitor mymaster 192.168.1.10 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
EOF

systemctl enable redis-sentinel
systemctl start redis-sentinel
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i cron job devono essere coordinati. E che l'alta disponibilità senza coordinamento è un disastro. E che JN non pensa alle conseguenze. E che i lock distribuiti salvano. E che Redis Sentinel è un amico. E che 6.345 fatture duplicate sono tante. E che 1.500€ di sconti sono tanti. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i cron job sono come i bambini. Se non li coordini, fanno disastri. E se li metti su più server, si moltiplicano. E se si moltiplicano, i dati si duplicano. E i dati duplicati sono un incubo. E i clienti si arrabbiano. E UL chiama. E tu rispondi. E dici: "Il cron job era su due server." E UL dice: "COM'È POSSIBILE?!" E tu dici: "Per alta disponibilità." E UL dice: "E SE ENTRAMBI SONO UP?!" E tu dici: "Non ci ho pensato." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, è troppo tardi. E i dati sono duplicati. E le fatture sono duplicate. E i clienti chiamano. E tu impari. E impari che i cron job devono essere coordinati. Sempre. Amen.

---

## Il costo del cron job che ha girato due volte

| Voce | Valore |
|------|--------|
| Cron job | generate-invoices.py |
| Server | prod-app-01, prod-app-02 |
| Autore | JN |
| Data configurazione | 15/10/2026 |
| Giorni con duplicati | 15 |
| Fatture duplicate | 6.345 |
| Clienti colpiti | 423 |
| Ticket aperti | 12 |
| Sconti richiesti | 1.500€ |
| Tempo risoluzione | 1 giorno |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "JN ha configurato due cron job?!" |
| Reazione CTO | "Lock distribuito + Redis HA." |
| Soluzione | Lock + Redis Sentinel + educazione |
| Lezione imparata | CRON = LOCK + COORDINAMENTO |
| **Totale** | **6.345 fatture + 1.500€ + 12 ticket + 1 lezione** |

**Morale**: I cron job sono silenziosi. Girano. E girano. E se non li coordini, girano due volte. E se girano due volte, i dati si duplicano. E i dati duplicati sono un incubo. E i clienti si arrabbiano. E UL chiama. E tu rispondi. E dici: "Era per alta disponibilità." E UL dice: "E SE ENTRAMBI I SERVER SONO UP?!" E tu dici: "Non ci ho pensato." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, impari. Impari che i cron job devono essere coordinati. E che i lock distribuiti salvano. E che Redis Sentinel è un amico. E che JN va educato. E che l'alta disponibilità senza coordinamento è un disastro. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](88-il-feature-flag-che-ha-ucciso-la-produzione.md)]**
