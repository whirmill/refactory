# Il Log Che Ha Riempito Il Disco

**Data**: 28/11/2026

**[Storie 2026](index.md) | [Precedente](92-il-memory-leak-che-ha-mangiato-la-ram.md) | [Prossima](94-il-database-senza-password.md)**

---

C'è una verità nei sistemi che tutti conoscono ma nessuno rispetta: i log sono utili. Ti dicono cosa è successo. Ti dicono quando è successo. Ti dicono perché è successo. Ma i log sono anche insidiosi. Crescono. E crescono. E crescono. Finché un giorno il disco è pieno. E il sistema si ferma. E tu ti chiedi: "Com'è possibile che 500GB di disco non bastino?" E la risposta è semplice: perché qualcuno ha loggato tutto. E quando dico tutto, intendo TUTTO. Ogni richiesta. Ogni risposta. Ogni header. Ogni cookie. Ogni errore. Ogni successo. E il disco si è riempito. E il sistema è morto. Amen.

![](../../img/server.jpg)

---

**Sabato - La Scoperta**

Era sabato. Le 08:23. Il caffè non era ancora pronto.

Poi è arrivato l'alert.

**ALERT**: Disk usage > 95% on node-pool-3

**ME**: Disco al 95%?!

**TL**: 95?!

**ME**: Sì. Su un nodo da 500GB.

**TL**: E QUANTI GIGA SONO?!

**ME**: 475GB usati.

**TL**: E COSA STA USANDO TUTTO QUESTO SPAZIO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla uso disco
kubectl debug node/node-pool-3 -- df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  475G   25G  95% /
overlay         500G  475G   25G  95% /var/lib/docker

# Controlla directory più grandi
kubectl debug node/node-pool-3 -- du -sh /var/lib/docker/containers/* | sort -h | tail -5
12G   /var/lib/docker/containers/abc123.../ 
15G   /var/lib/docker/containers/def456.../
18G   /var/lib/docker/containers/ghi789.../
23G   /var/lib/docker/containers/jkl012.../
312G  /var/lib/docker/containers/mno345.../

# Controlla cosa c'è dentro
kubectl debug node/node-pool-3 -- ls -lh /var/lib/docker/containers/mno345.../
total 312G
-rw------- 1 root root 312G Nov 28 08:20 mno345-json.log
```

**ME**: Un file di log da 312GB.

**TL**: 312GB DI LOG?!

**ME**: Sì. Un solo file.

**TL**: E DI QUALE CONTAINER?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Trova il container
kubectl get pods -o wide | grep node-pool-3
api-gateway-7d9f4-pqr678   1/1     Running   0          3d    10.0.0.45   node-pool-3

# Controlla il container
kubectl describe pod api-gateway-7d9f4-pqr678 | grep -A5 "Container ID"
Container ID:   containerd://mno345...

# Controlla configurazione log
kubectl get pod api-gateway-7d9f4-pqr678 -o jsonpath='{.spec.containers[*].logPolicy}'
(no output - usando default)

# Controlla log driver
kubectl exec -it api-gateway-7d9f4-pqr678 -- cat /etc/docker/daemon.json 2>/dev/null || echo "No daemon.json"
{
  "log-driver": "json-file",
  "log-opts": {}
}
```

**ME**: L'api-gateway sta loggando tutto. Senza rotazione.

**TL**: SENZA ROTAZIONE?!

**ME**: Sì. Il log driver è json-file. E non ha limiti.

**TL**: E QUINDI?!

**ME**: E quindi... il log cresce. E cresce. E cresce. Finché il disco si riempie.

**TL**: E QUANTI LOG AL GIORNO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla età del container
kubectl get pod api-gateway-7d9f4-pqr678 -o jsonpath='{.status.startTime}'
2026-11-25T10:00:00Z

# Calcola giorni
Da 25/11 a 28/11 = 3 giorni

# Calcola log al giorno
312GB / 3 giorni = 104GB/giorno

# Controlla rate attuale
kubectl exec -it api-gateway-7d9f4-pqr678 -- sh -c "while true; do ls -l /proc/1/fd/1 2>/dev/null | awk '{print \$5}'; sleep 5; done" &
# Dopo 30 secondi: 312GB → 312.5GB → 313GB
# Rate: ~1GB ogni 10 minuti = 6GB/ora = 144GB/giorno
```

**ME**: 144GB al giorno. Di log.

**TL**: 144GB AL GIORNO?!

**ME**: Sì. E sta accelerando.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Controllo cosa sta loggando.

**TERMINALE**:
```
# Controlla ultime righe di log
kubectl logs api-gateway-7d9f4-pqr678 --tail=50
2026-11-28 08:25:01 INFO: Incoming request: GET /api/users
2026-11-28 08:25:01 DEBUG: Headers: {"user-agent":"Mozilla/5.0...","cookie":"session=abc123...","authorization":"Bearer eyJ..."}
2026-11-28 08:25:01 DEBUG: Request body: {"query":"..."}
2026-11-28 08:25:01 DEBUG: Processing request...
2026-11-28 08:25:01 DEBUG: Database query: SELECT * FROM users WHERE id = 123
2026-11-28 08:25:01 DEBUG: Database result: {"id":123,"name":"Mario","email":"mario@example.com","password_hash":"$2b$12..."}
2026-11-28 08:25:01 DEBUG: Response: {"id":123,"name":"Mario","email":"mario@example.com"}
2026-11-28 08:25:01 INFO: Response sent: 200 OK
2026-11-28 08:25:01 DEBUG: Response headers: {"content-type":"application/json","content-length":"45"}
2026-11-28 08:25:01 DEBUG: Response body: {"id":123,"name":"Mario","email":"mario@example.com"}
2026-11-28 08:25:01 DEBUG: Request completed in 45ms
2026-11-28 08:25:01 INFO: Incoming request: GET /api/products
...

# Conta righe per secondo
kubectl logs api-gateway-7d9f4-pqr678 --since=1m | wc -l
45678

# Righe al secondo
45678 / 60 = 761 righe/secondo
```

**ME**: Sta loggando TUTTO. Headers, body, response, query, risultati. In DEBUG.

**TL**: DEBUG?!

**ME**: Sì. Livello DEBUG. In produzione.

**TL**: E CHI HA ATTIVATO IL DEBUG?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla configurazione
kubectl exec -it api-gateway-7d9f4-pqr678 -- env | grep -i log
LOG_LEVEL=debug

# Controlla chi ha deployato
kubectl rollout history deployment/api-gateway
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
3         kubectl set env deployment/api-gateway LOG_LEVEL=debug --record-by=jn

# Controlla quando
kubectl rollout history deployment/api-gateway --revision=3
deployment "api-gateway" revision 3
Pod Template:
  Annotations:    kubernetes.io/change-cause: kubectl set env deployment/api-gateway LOG_LEVEL=debug --record-by=jn
Created at:    2026-11-25T10:00:00Z
```

**ME**: JN. Tre giorni fa. Ha attivato il DEBUG.

**TL**: JN?!

**ME**: Sì. Per "vedere cosa succede".

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Log level: DEBUG
- Autore: JN
- Data: 25 novembre
- Dimensione: 312GB
- Rate: 144GB/giorno

E tutto era chiaro. JN aveva attivato il DEBUG. E il DEBUG logga tutto. E tutto riempie il disco. E il disco muore. Amen.

---

**Sabato - 09:00**

Ho chiamato JN. JN ha risposto. Era sabato. JN era a letto.

**ME**: Hai attivato il DEBUG in produzione?

**JN**: (voce assonnata) Sì... per debuggare.

**ME**: PER DEBUGGARE?!

**JN**: Sì. C'era un bug. Volevo vedere i log.

**ME**: E HAI LASCIATO IL DEBUG ATTIVO PER TRE GIORNI?!

**JN**: Ah... me ne sono dimenticato.

**ME**: DIMENTICATO?!

**JN**: Sì. Scusa.

**ME**: SCUSA?! IL DISCO È AL 95%!

**JN**: Oh.

**ME**: OH?! 312GB DI LOG!

**JN**: E... cosa facciamo?

**ME**: DISABILITO IL DEBUG! E CONFIGURO LA ROTAZIONE!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA DISABILITA IL DEBUG DOPO AVER TROVATO IL BUG!

**JN**: Ok.

JN ha riattaccato. O forse ha riattaccato per tornare a dormire. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Log level: DEBUG
- Dimensione: 312GB
- Disco: 95%
- Autore: JN

E la lezione era chiara. Il DEBUG in produzione è pericoloso. E i log senza rotazione uccidono i dischi. E JN dimentica le cose. Amen.

---

**Sabato - 09:30**

Ho disabilitato il DEBUG. Ho configurato la rotazione.

**TERMINALE**:
```
# Disabilita DEBUG
kubectl set env deployment/api-gateway LOG_LEVEL=info

# Configura rotazione log
cat > /etc/docker/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "5"
  }
}
EOF

# Riavvia docker
systemctl restart docker

# Verifica
kubectl get pods -l app=api-gateway
NAME                        READY   STATUS    RESTARTS   AGE
api-gateway-7d9f4-stu901    1/1     Running   0          30s
```

**ME**: DEBUG disabilitato. Rotazione configurata.

**TL**: E ORA?

**ME**: Ora devo liberare spazio.

**TL**: E COME?

**ME**: Elimino i vecchi log.

**TERMINALE**:
```
# Controlla spazio dopo riavvio
kubectl debug node/node-pool-3 -- df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  475G   25G  95% /

# I vecchi log sono ancora lì
kubectl debug node/node-pool-3 -- ls -lh /var/lib/docker/containers/ | grep "G"
drwx------ 2 root root 4.0K Nov 28 09:30 abc123...
-rw------- 1 root root  12G Nov 28 09:25 abc123-json.log
drwx------ 2 root root 4.0K Nov 28 09:30 def456...
-rw------- 1 root root  15G Nov 28 09:25 def456-json.log
drwx------ 2 root root 4.0K Nov 28 09:30 ghi789...
-rw------- 1 root root  18G Nov 28 09:25 ghi789-json.log
drwx------ 2 root root 4.0K Nov 28 09:30 jkl012...
-rw------- 1 root root  23G Nov 28 09:25 jkl012-json.log
drwx------ 2 root root 4.0K Nov 28 09:30 mno345...
-rw------- 1 root root 312G Nov 28 09:25 mno345-json.log

# Elimina i vecchi log
kubectl debug node/node-pool-3 -- sh -c "rm /var/lib/docker/containers/*-json.log"

# Verifica spazio
kubectl debug node/node-pool-3 -- df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       500G  115G  385G  23% /
```

**ME**: Log eliminati. Disco al 23%.

**TL**: 312GB eliminati?

**ME**: Sì. E gli altri 160GB di vecchi log.

**TL**: E ORA?

**ME**: Ora il sistema è stabile. Ma devo capire perché JN ha attivato il DEBUG.

**TL**: E PERCHÉ?

**ME**: Perché c'era un bug. E voleva vederlo.

**TL**: E L'HA VISTO?

**ME**: Non lo so. Glielo chiedo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Disco: 23%
- Log: eliminati
- DEBUG: disabilitato
- Rotazione: configurata

E tutto sembrava risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché le cose che sembrano risolte le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Sabato - 10:00**

Ho chiamato JN. Di nuovo. JN ha risposto. Di nuovo.

**ME**: JN, perché hai attivato il DEBUG?

**JN**: C'era un bug. Gli utenti non riuscivano a fare login.

**ME**: E L'HAI TROVATO?

**JN**: Sì. Era un problema di cookie.

**ME**: E L'HAI FIXATO?

**JN**: Sì. Ho fatto il deploy.

**ME**: E IL DEBUG?

**JN**: Mi sono dimenticato di disattivarlo.

**ME**: TI SEI DIMENTICATO?!

**JN**: Sì. È venerdì. Ero stanco.

**ME**: E HAI LASCIATO IL DEBUG IN PRODUZIONE PER TRE GIORNI?!

**JN**: Sì. Scusa.

**ME**: E SAI QUANTO SPAZIO HA OCCUPATO?

**JN**: Non molto, spero.

**ME**: 312GB.

**JN**: ...312GB?

**ME**: Sì. Di log.

**JN**: Oh.

**ME**: OH?! IL DISCO ERA AL 95%!

**JN**: E... cosa sarebbe successo?

**ME**: IL NODO SAREBBE ANDATO IN CRASH. E I POD SAREBBERO STATI RISCHEDULATI. E I CLIENTI AVREBBERO VISTO ERRORI.

**JN**: Ma... non è successo?

**ME**: NO. PERCHÉ HO RICEVUTO L'ALERT ALLE 08:23. DI SABATO.

**JN**: Grazie.

**ME**: NON RINGRAZIARE. LA PROSSIMA VOLTA DISABILITA IL DEBUG. O NON USARLO IN PRODUZIONE.

**JN**: Ok.

JN ha riattaccato. O forse ha riattaccato per tornare a dormire. Di nuovo. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Bug: fixato
- DEBUG: dimenticato
- Log: 312GB
- JN: a letto

E la lezione era chiara. I junior dimenticano. E i log crescono. E i dischi si riempiono. E il sabato non è per le emergenze. Amen.

---

**Domenica - La Riflessione**

Domenica. Ero a casa. Ma non riuscivo a smettere di pensare. Ai log. Alla rotazione. Al DEBUG.

Ho aperto il laptop. Ho scritto la guida.

**TERMINALE**:
```
# Guida ai log
cat > docs/logging-best-practices.md << 'EOF'
## Best Practices per i Log

### Regola #1: MAI DEBUG in Produzione

Il livello DEBUG è per sviluppo. Non per produzione. In produzione, usa INFO o WARN.

```javascript
// MAI così
LOG_LEVEL=debug npm start

// SEMPRE così
LOG_LEVEL=info npm start
```

### Regola #2: Configura la Rotazione

I log crescono. Sempre. Configura la rotazione.

```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "5"
  }
}
```

Questo mantiene al massimo 500MB di log per container (100MB × 5 file).

### Regola #3: Non Loggare Tutto

Non loggare:
- Password
- Token
- Cookie
- Dati sensibili
- Header completi
- Body completi
- Risultati di query

```javascript
// MAI così
console.log('User login:', { email, password });

// SEMPRE così
console.log('User login:', { email: email.replace(/@.*/, '@***') });
```

### Regola #4: Usa Livelli Appropriati

- ERROR: Errori che richiedono intervento
- WARN: Situazioni anomale ma gestite
- INFO: Eventi importanti (login, logout, transazioni)
- DEBUG: Dettagli per debug (SOLO in sviluppo)

### Regola #5: Monitora l'Uso del Disco

Configura alert per l'uso del disco.

```yaml
groups:
  - name: disk
    rules:
      - alert: DiskUsageHigh
        expr: node_filesystem_usage_bytes{mountpoint="/"} > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk usage > 80%"
```

### Regola #6: Centralizza i Log

Non tenere i log solo sui nodi. Centralizzali.

```yaml
# Usa Fluentd o Logstash per inviare i log a:
# - Elasticsearch
# - Splunk
# - CloudWatch
# - GCP Logging
```

### Regola #7: Imposta Retention

I log centralizzati hanno un costo. Imposta una retention.

```yaml
# Elasticsearch
PUT _ilm/policy/logs
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "7d"
          }
        }
      },
      "delete": {
        "min_age": "30d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}
```
EOF
```

Il TL mi ha scritto su Slack. "Stai lavorando di domenica?"

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Scrivo la guida per i log. E configuro la centralizzazione.

**TL**: E JN?

**ME**: JN... lo educo. Lunedì.

**TL**: E la rotazione?

**ME**: Già configurata. Max 100MB per file, max 5 file.

**TL**: E I LOG VECCHI?

**ME**: Eliminati. 312GB liberati.

**TL**: E IL DEBUG?

**ME**: Disabilitato. Ora è INFO.

**TL**: Bene. Ora riposa.

**ME**: Sì. Dopo aver configurato Fluentd.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di domenica per un bug di sabato. E stai fixando il processo. E stai educando il junior. E stai proteggendo il sistema. Ma è domenica. E dovresti riposare. Amen."

---

**Lunedì - La Riunione**

Lunedì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che i log abbiano riempito il disco?

**ME**: JN ha attivato il DEBUG in produzione. E non l'ha disattivato.

**UL**: E CHI HA ATTIVATO IL DEBUG?

**ME**: JN.

**UL**: E PERCHÉ?

**JN**: C'era un bug. Volevo vederlo.

**UL**: E L'HAI DISATTIVATO?

**JN**: No. Me ne sono dimenticato.

**UL**: DIMENTICATO?!

**JN**: Sì. Scusa.

**UL**: E QUANTI GIGA HA OCCUPATO?

**ME**: 312GB. In 3 giorni.

**UL**: 312GB?!

**ME**: Sì. Di log.

**UL**: E IL DISCO?

**ME**: Era al 95%. Ho ricevuto l'alert sabato alle 08:23.

**UL**: DI SABATO?!

**ME**: Sì.

**UL**: E SE NON AVESSI RICEVUTO L'ALERT?

**ME**: Il nodo sarebbe andato in crash. E i pod sarebbero stati rischedulati.

**CTO**: Il problema è che non c'era rotazione. E non c'era centralizzazione. E ora mettiamo tutto.

**ME**: Sì.

**CTO**: E chi lo fa?

**ME**: L'ho già fatto. Sabato.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E COSA HAI IMPARATO?

**JN**: A non usare DEBUG in produzione.

**CTO**: E COS'ALTRO?

**JN**: A disattivare il DEBUG dopo aver trovato il bug.

**CTO**: E COS'ALTRO?

**JN**: A configurare la rotazione dei log.

**CTO**: E COS'ALTRO?

**JN**: A non loggare dati sensibili.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul disco riempito. E sul sabato rovinato. Amen.

---

**Lunedì - La Centralizzazione**

Lunedì. Ho configurato Fluentd. Per centralizzare i log.

**TERMINALE**:
```
# Configura Fluentd
cat > fluentd-configmap.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
        time_key time
        time_format %Y-%m-%dT%H:%M:%S.%NZ
      </parse>
    </source>

    <filter kubernetes.**>
      @type parser
      key_name log
      <parse>
        @type regexp
        expression /^\[(?<time>[^\]]+)\] (?<level>\w+): (?<message>.*)$/
      </parse>
    </filter>

    <match kubernetes.**>
      @type elasticsearch
      host elasticsearch.logging.svc.cluster.local
      port 9200
      logstash_format true
      logstash_prefix k8s-logs
      <buffer>
        @type file
        path /var/log/fluentd-buffer
        flush_interval 5s
        chunk_limit_size 16MB
        queue_limit_length 256
      </buffer>
    </match>
EOF

# Deploy Fluentd
kubectl apply -f fluentd-configmap.yaml
kubectl apply -f fluentd-daemonset.yaml

# Configura retention in Elasticsearch
curl -X PUT "localhost:9200/_ilm/policy/logs-policy" -H 'Content-Type: application/json' -d'
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "7d"
          }
        }
      },
      "delete": {
        "min_age": "30d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}'
```

**TL**: Hai centralizzato i log?

**ME**: Sì. Con Fluentd e Elasticsearch.

**TL**: E LA RETENTION?

**ME**: 30 giorni. Poi vengono eliminati.

**TL**: E I LOG SUI NODI?

**ME**: Vengono ruotati. Max 500MB per container.

**TL**: E IL DEBUG?

**ME**: Disabilitato. Ora è INFO.

**TL**: E I DATI SENSIBILI?

**ME**: Ho aggiunto un filter per mascherarli.

**TERMINALE**:
```
# Aggiungi filter per dati sensibili
cat > fluentd-filter.yaml << 'EOF'
<filter kubernetes.**>
  @type record_transformer
  <record>
    log ${record["log"].gsub(/password=\S+/, "password=***").gsub(/token=\S+/, "token=***").gsub(/cookie=\S+/, "cookie=***")}
  </record>
</filter>
EOF
```

**TL**: Hai mascherato i dati sensibili?

**ME**: Sì. Password, token, cookie. Tutti mascherati.

**TL**: E QUINDI?

**ME**: E quindi... i log sono sicuri. E centralizzati. E con retention.

**TL**: E JN?

**ME**: JN può ancora attivare il DEBUG. Ma i log non riempiranno il disco.

**TL**: E SE LO FA?

**ME**: Allora... lo educo di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Fluentd: attivo
- Elasticsearch: configurato
- Retention: 30 giorni
- Rotazione: 500MB per container
- Dati sensibili: mascherati

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i log vanno gestiti. E che la rotazione è essenziale. E che la centralizzazione salva. E che i dati sensibili vanno mascherati. E che JN va educato. Amen.

---

**Martedì - I Test**

Martedì. Ho aggiunto test. Per verificare che i log non contengano dati sensibili.

**TERMINALE**:
```
# Test per log
cat > src/lib/logger.test.js << 'EOF'
describe('Logger', () => {
  it('should not log passwords', () => {
    const logger = new Logger();
    const log = logger.info('User login', { email: 'test@example.com', password: 'secret123' });
    expect(log).not.toContain('secret123');
    expect(log).toContain('password=***');
  });

  it('should not log tokens', () => {
    const logger = new Logger();
    const log = logger.info('API call', { token: 'eyJhbGciOiJIUzI1NiIs...' });
    expect(log).not.toContain('eyJhbGciOiJIUzI1NiIs');
    expect(log).toContain('token=***');
  });

  it('should not log cookies', () => {
    const logger = new Logger();
    const log = logger.info('Request', { cookie: 'session=abc123; user=john' });
    expect(log).not.toContain('session=abc123');
    expect(log).toContain('cookie=***');
  });

  it('should respect log level', () => {
    const logger = new Logger({ level: 'INFO' });
    const debugLog = logger.debug('This should not appear');
    expect(debugLog).toBeUndefined();
    
    const infoLog = logger.info('This should appear');
    expect(infoLog).toBeDefined();
  });
});
EOF

# Esegui test
npm test
PASS  src/lib/logger.test.js
```

**TL**: Hai aggiunto i test?

**ME**: Sì. Per dati sensibili. E per livelli.

**TL**: E JN?

**ME**: JN deve far passare questi test prima di mergiare.

**TL**: E SE I TEST NON PASSANO?

**ME**: Allora non può mergiare.

**TL**: E SE JN AGGIUNGE UN NUOVO LOG?

**ME**: Allora deve aggiungere un test.

**TL**: E SE NON LO FA?

**ME**: Allora il code review lo richiede.

**TL**: E SE IL REVIEWER NON LO NOTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: passing
- Dati sensibili: testati
- Livelli: testati
- Mascheramento: verificato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i test salvano. E che i log vanno verificati. E che i dati sensibili vanno protetti. E che JN va educato. Amen.

---

**Mercoledì - Il Monitoraggio**

Mercoledì. Ho aggiunto monitoraggio. Per vedere quando i log crescono troppo.

**TERMINALE**:
```
# Configura alert per log
cat > /etc/prometheus/alerts/logging.yml << 'EOF'
groups:
  - name: logging
    rules:
      - alert: LogFileSizeHigh
        expr: container_log_file_size_bytes > 100 * 1024 * 1024
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Log file > 100MB for {{ $labels.container }}"
          description: "Log file for {{ $labels.container }} is {{ $value | humanizeBytes }}. Check log rotation."

      - alert: DebugLevelInProduction
        expr: log_level{level="debug", environment="production"} == 1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "DEBUG level active in production"
          description: "DEBUG log level is active in production for {{ $labels.service }}. This should be disabled."

      - alert: DiskUsageHigh
        expr: node_filesystem_usage_bytes{mountpoint="/"} > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk usage > 80% on {{ $labels.node }}"
          description: "Disk usage is {{ $value | humanizePercentage }}. Check log files."

      - alert: DiskUsageCritical
        expr: node_filesystem_usage_bytes{mountpoint="/"} > 0.9
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Disk usage > 90% on {{ $labels.node }}"
          description: "Disk usage is {{ $value | humanizePercentage }}. Immediate action required."
EOF

# Aggiungi metriche per log
cat > src/lib/log-metrics.js << 'EOF'
const prometheus = require('prom-client');

const logLevel = new prometheus.Gauge({
  name: 'log_level',
  help: 'Current log level: 0=ERROR, 1=WARN, 2=INFO, 3=DEBUG',
  labelNames: ['service', 'environment']
});

const logCount = new prometheus.Counter({
  name: 'log_messages_total',
  help: 'Total log messages',
  labelNames: ['service', 'level']
});

const logSize = new prometheus.Counter({
  name: 'log_bytes_total',
  help: 'Total bytes logged',
  labelNames: ['service']
});

function log(level, message, data) {
  const levelValue = { error: 0, warn: 1, info: 2, debug: 3 }[level];
  logLevel.set({ service: 'api-gateway', environment: process.env.NODE_ENV }, levelValue);
  logCount.inc({ service: 'api-gateway', level });
  logSize.inc({ service: 'api-gateway' }, Buffer.byteLength(message + JSON.stringify(data)));
  
  // Log effettivo
  console.log(`[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}`, data);
}

module.exports = { log };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Con alert per dimensione log, DEBUG in produzione, e uso disco.

**TL**: E QUANDO ALERTA?

**ME**: Quando un file di log supera 100MB. O quando il DEBUG è attivo in produzione. O quando il disco è sopra l'80%.

**TL**: E LA METRICA?

**ME**: Conta i messaggi di log. E i byte. E il livello.

**TL**: E QUINDI?

**ME**: E quindi... vediamo i problemi prima che uccidano il disco.

**TL**: E SE NON LO VEDIAMO?

**ME**: Allora... il disco si riempie. E il nodo crasha.

**TL**: E È UN PROBLEMA?

**ME**: No. È meglio che non avere alert. Ma è meglio prevenire.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Threshold: 100MB log, 80% disco
- DEBUG: monitorato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i log vanno osservati. E che JN va educato. Amen.

---

**Giovedì - L'Educazione**

Giovedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per sabato?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che sabato è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: il DEBUG non va mai in produzione.

**JN**: Mai?

**ME**: Mai. Se hai bisogno di debuggare in produzione, usa tracing. O metriche. O log strutturati con contesto. Ma non DEBUG.

**JN**: Ok.

**ME**: Secondo: i log crescono. Sempre.

**JN**: Crescono?

**ME**: Sì. E se non li ruoti, riempiono il disco. E il disco muore.

**JN**: E come si ruotano?

**ME**: Con max-size e max-file. O con logrotate. O con Fluentd.

**JN**: Ok.

**ME**: Terzo: i dati sensibili non si loggano.

**JN**: Mai?

**ME**: Mai. Password, token, cookie, numeri di carta di credito. Niente.

**JN**: E se serve per debug?

**ME**: Allora mascherali. O usa ID. O non loggarli.

**JN**: Ok.

**ME**: Quarto: i log vanno centralizzati.

**JN**: Centralizzati?

**ME**: Sì. Non tenerli sui nodi. Inviali a Elasticsearch. O Splunk. O CloudWatch.

**JN**: E PERCHÉ?

**ME**: Perché i nodi muoiono. E i log muoiono con loro. E se hai bisogno di vedere cosa è successo, non puoi.

**JN**: Ok.

**ME**: Quinto: se attivi il DEBUG, disattivalo.

**JN**: E SE ME NE DIMENTICO?

**ME**: Allora... ti chiamo. Di sabato. Alle 08:23.

**JN**: (imbarazzato) Scusa.

**ME**: E la prossima volta, pensa. Prima di attivare il DEBUG. Pensa a cosa succede se lo lasci attivo per 3 giorni.

**JN**: E se non so cosa succede?

**ME**: Allora chiedi. Al TL. A me. A qualcuno.

**JN**: E se non c'è nessuno?

**ME**: Allora... non deployare di venerdì. E non attivare il DEBUG.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- DEBUG: disabilitato
- Rotazione: configurata
- Centralizzazione: attiva
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E test. E rotazione. E centralizzazione. E pazienza. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i log.

```markdown
## Incident #LOG-001: Il Log Che Ha Riempito Il Disco

**Data incident**: Sabato 28 novembre 2026, 08:23
**Autore**: JN
**Servizio**: api-gateway
**Problema**: Disco riempito da log DEBUG
**Causa**: DEBUG attivo in produzione, nessuna rotazione, nessuna centralizzazione
**Autore del codice**: JN
**Data deploy**: Venerdì 25 novembre 2026, 10:00
**Tempo in produzione**: ~3 giorni
**Dimensione log**: 312GB
**Uso disco**: 95%
**Tempo di risoluzione**: 1 ora
**Downtime**: 0
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "312GB di log?!"
**Reazione CTO**: "Rotazione + centralizzazione + no DEBUG in produzione."
**Soluzione**: Rotazione + centralizzazione + mascheramento + educazione
**Lezione imparata**: I LOG VANNO GESTITI. SEMPRE.

**Regole per i log**:
1. MAI DEBUG in produzione.
2. Configura SEMPRE la rotazione.
3. Centralizza SEMPRE i log.
4. Maschera SEMPRE i dati sensibili.
5. Imposta SEMPRE una retention.
6. Monitora SEMPRE l'uso del disco.
7. Disattiva SEMPRE il DEBUG dopo aver trovato il bug.
8. Non deployare MAI il DEBUG di venerdì.
9. Non loggare MAI password, token, o dati sensibili.
10. I log sono utili. Ma uccidono i dischi. Amen.

**Come configurare la rotazione**:
```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "5"
  }
}
```

**Come centralizzare i log**:
```yaml
# Fluentd
<source>
  @type tail
  path /var/log/containers/*.log
  tag kubernetes.*
</source>

<match kubernetes.**>
  @type elasticsearch
  host elasticsearch.logging.svc.cluster.local
  port 9200
</match>
```

**Come mascherare i dati sensibili**:
```javascript
function sanitize(data) {
  return {
    ...data,
    password: '***',
    token: '***',
    cookie: '***',
    creditCard: data.creditCard ? '****' + data.creditCard.slice(-4) : undefined,
  };
}
```

**Come configurare alert per log**:
```yaml
groups:
  - name: logging
    rules:
      - alert: DebugLevelInProduction
        expr: log_level{level="debug", environment="production"} == 1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "DEBUG level active in production"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i log crescono. E che il DEBUG uccide. E che la rotazione salva. E che la centralizzazione è essenziale. E che i dati sensibili vanno mascherati. E che JN ha dimenticato di disattivare il DEBUG. E che 312GB sono tanti. E che il sabato non è per le emergenze. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i log sono come i rifiuti. Se non li gestisci, si accumulano. E se si accumulano, riempiono tutto. E se riempiono tutto, il sistema muore. E se il sistema muore, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "I log hanno riempito il disco." E UL dice: "COM'È POSSIBILE?!" E tu dici: "Qualcuno ha attivato il DEBUG." E UL dice: "E CHI?!" E tu dici: "JN." E UL dice: "E PERCHÉ?!" E tu dici: "Per debuggare." E UL dice: "E L'HA DISATTIVATO?!" E tu dici: "No. Se ne è dimenticato." E la verità è che tutti dimenticano. Finché non succede. E quando succede, impari. Impari che i log vanno gestiti. E che la rotazione è essenziale. E che la centralizzazione salva. E che i dati sensibili vanno mascherati. E che il DEBUG non va mai in produzione. E che JN va educato. Amen.

---

## Il costo del log che ha riempito il disco

| Voce | Valore |
|------|--------|
| Servizio | api-gateway |
| Autore | JN |
| Data deploy | 25/11/2026, 10:00 |
| Data incident | 28/11/2026, 08:23 |
| Tempo in produzione | ~3 giorni |
| Dimensione log | 312GB |
| Uso disco | 95% |
| Tempo di risoluzione | 1 ora |
| Downtime | 0 |
| Sabato rovinato | 1 |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "312GB di log?!" |
| Reazione CTO | "Rotazione + centralizzazione + no DEBUG." |
| Soluzione | Rotazione + centralizzazione + mascheramento + educazione |
| Lezione imparata | LOG = ROTAZIONE + CENTRALIZZAZIONE + NO DEBUG |
| **Totale** | **312GB di log + 1 sabato rovinato + 1 junior educato** |

**Morale**: I log sono utili. Ma sono anche pericolosi. Se non li gestisci, crescono. E se crescono, riempiono il disco. E se il disco si riempie, il sistema muore. E se il sistema muore, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "I log hanno riempito il disco." E UL dice: "COM'È POSSIBILE?!" E tu dici: "Qualcuno ha attivato il DEBUG." E UL dice: "E COS'È IL DEBUG?!" E tu dici: "Livello di log che registra tutto." E UL dice: "E PERCHÉ ERA ATTIVO?!" E tu dici: "JN se ne è dimenticato." E la verità è che tutti dimenticano. Finché non succede. E quando succede, impari. Impari che i log vanno gestiti. E che la rotazione è essenziale. E che la centralizzazione salva. E che i dati sensibili vanno mascherati. E che il DEBUG non va mai in produzione. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](92-il-memory-leak-che-ha-mangiato-la-ram.md) | [Prossima](94-il-database-senza-password.md)**
