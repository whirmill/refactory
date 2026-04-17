# Il Health Check Che Mentiva Sempre

**Data**: 09/01/2027

**[Storie 2026](index.md) | [Precedente](98-il-rollback-che-non-e-mai-arrivato.md) | [Prossima](100-il-feature-flag-che-nessuno-ricordava.md)**

---

C'è una verità nel monitoraggio che tutti conoscono ma nessuno rispetta: un health check deve dire la verità. Sempre. Quando un servizio sta male, l'health check deve dire "sto male". Quando un servizio è down, l'health check deve dire "sono down". Quando un servizio è completamente fottuto, l'health check deve urlare "SONO FOTTUTO". E invece. Invece l'health check di JN restituiva sempre 200 OK. Sempre. Anche quando il database era down. Anche quando la cache era satura. Anche quando il servizio non rispondeva. 200 OK. Perché JN aveva scritto l'health check così. E quando l'health check mente, il load balancer crede che tutto vada bene. E manda traffico a un servizio morto. E i clienti ricevono errori. E tu ricevi ticket. E UL riceve chiamate. E tutti ricevono la verità. Tranne l'health check. Che continua a dire 200 OK. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti non riescono a completare gli ordini. Ricevono errori 500.

**ME**: Errori 500?!

**TL**: Errori 500?!

**ME**: Sì. Ma il dashboard mostra tutto verde.

**TL**: Tutto verde?!

**ME**: Sì. Guarda.

**TERMINALE**:
```
# Controlla health check
curl -s http://checkout-service:8080/health
{"status": "UP", "timestamp": "2027-01-09T09:00:00Z"}

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'up{job="checkout-service"}'
{status: "success", data: {result: [{value: ["1"]}]}}  # UP

# Controlla pod
kubectl get pods -l app=checkout-service
NAME                               READY   STATUS    RESTARTS   AGE
checkout-service-abc123-1         1/1     Running   0          2h
checkout-service-def456-1         1/1     Running   0          2h
checkout-service-ghi789-1         1/1     Running   0          2h
```

**ME**: Tutto verde. I pod sono running. L'health check è UP.

**TL**: E GLI ERRORI 500?!

**ME**: Controllo i log.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=checkout-service --since=30m | grep -i error | tail -20
2027-01-09 08:45:12 ERROR: Database connection refused
2027-01-09 08:45:12 ERROR: Cannot process order: no database connection
2027-01-09 08:46:01 ERROR: Database connection refused
2027-01-09 08:46:01 ERROR: Cannot process order: no database connection
2027-01-09 08:47:23 ERROR: Database connection refused
...

# Conta errori
kubectl logs -l app=checkout-service --since=30m | grep -i error | wc -l
1247

# Controlla database
kubectl exec -it postgres-0 -- pg_isready
pg_isready: could not connect to server: Connection refused
```

**ME**: Il database è down. Ma l'health check dice UP.

**TL**: COME FA A DIRE UP SE IL DATABASE È DOWN?!

**ME**: Non lo so. Guardo il codice.

**TERMINALE**:
```
# Leggi health check
cat src/routes/health.js
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});
```

**ME**: L'health check non controlla nulla. Restituisce sempre 200 OK.

**TL**: SEMPRE?!

**ME**: Sempre. Non controlla il database. Non controlla la cache. Non controlla nulla.

**TL**: E CHI L'HA SCRITTO?!

**ME**: JN.

**TL**: JN?!

**ME**: Sì. Tre mesi fa.

**TL**: E PER TRE MESI NESSUNO L'HA NOTATO?!

**ME**: No. Perché il servizio funzionava. E l'health check diceva UP. E tutti credevano che fosse UP.

**TL**: E ORA?!

**ME**: Ora il database è down. E l'health check dice ancora UP. E il load balancer manda traffico. E i clienti ricevono errori.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Health check: UP
- Database: DOWN
- Errori: 1247
- JN: responsabile

E tutto era chiaro. L'health check mentiva. E il load balancer credeva alle bugie. E i clienti pagavano il prezzo. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto l'health check del checkout service?

**JN**: Sì. Tre mesi fa. Perché?

**ME**: Il database è down. E l'health check dice UP.

**JN**: UP?!

**ME**: Sì. Restituisce sempre 200 OK. Anche quando il database è down.

**JN**: Ah. Sì. L'ho fatto semplice.

**ME**: SEMPLICE?!

**JN**: Sì. Per non rallentare le risposte.

**ME**: E QUINDI NON CONTROLLA NULLA?!

**JN**: No. Ma... funziona!

**ME**: FUNZIONA?! IL DATABASE È DOWN E L'HEALTH CHECK DICE UP!

**JN**: Ma... il pod è running!

**ME**: IL POD È RUNNING MA IL SERVIZIO NON FUNZIONA!

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Ah. Non ci avevo pensato.

**ME**: E PER TRE MESI?!

**JN**: Non è mai successo niente!

**ME**: PERCHÉ IL DATABASE NON ERA MAI DOWN!

**JN**: E ORA?!

**ME**: ORA FIXI L'HEALTH CHECK. E POI FIXI IL DATABASE.

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Health check: bugiardo
- Database: DOWN
- JN: inaffidabile
- Clienti: incazzati

E la lezione era chiara. L'health check deve dire la verità. E JN deve imparare. Amen.

---

**Lunedì - 10:00**

Ho fixato l'health check. E il database.

**TERMINALE**:
```
# Fix health check
cat > src/routes/health.js << 'EOF'
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const redis = require('redis');
const redisClient = redis.createClient({ url: process.env.REDIS_URL });

router.get('/health', async (req, res) => {
  const checks = {
    database: false,
    cache: false,
    timestamp: new Date().toISOString()
  };

  try {
    // Check database
    await pool.query('SELECT 1');
    checks.database = true;
  } catch (err) {
    console.error('Database health check failed:', err.message);
  }

  try {
    // Check cache
    await redisClient.ping();
    checks.cache = true;
  } catch (err) {
    console.error('Cache health check failed:', err.message);
  }

  const isHealthy = checks.database && checks.cache;
  const status = isHealthy ? 'UP' : 'DOWN';

  res.status(isHealthy ? 200 : 503).json({
    status,
    checks,
    timestamp: checks.timestamp
  });
});

router.get('/health/ready', async (req, res) => {
  // Readiness probe - can the service accept traffic?
  try {
    await pool.query('SELECT 1');
    await redisClient.ping();
    res.status(200).json({ status: 'READY' });
  } catch (err) {
    res.status(503).json({ status: 'NOT_READY', error: err.message });
  }
});

router.get('/health/live', (req, res) => {
  // Liveness probe - is the process alive?
  res.status(200).json({ status: 'ALIVE' });
});
EOF

# Fix database
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT pg_is_in_recovery()"
kubectl rollout restart statefulset/postgres

# Verifica
curl -s http://checkout-service:8080/health
{"status": "DOWN", "checks": {"database": false, "cache": true}, "timestamp": "2027-01-09T10:00:00Z"}
```

**ME**: L'health check ora controlla il database. E la cache. E dice la verità.

**TL**: E IL DATABASE?!

**ME**: Lo sto riavviando.

**TL**: E QUANTO CI VUOLE?!

**ME**: Non lo so. Dipende da quanto è corrotto.

**TERMINALE**:
```
# Controlla stato database
kubectl logs postgres-0 --tail=50
2027-01-09 09:55:00 LOG: database system is starting up
2027-01-09 09:55:05 LOG: database system is ready to accept connections

# Verifica connessioni
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM pg_stat_activity"
count
-------
12

# Test health check
curl -s http://checkout-service:8080/health
{"status": "UP", "checks": {"database": true, "cache": true}, "timestamp": "2027-01-09T10:05:00Z"}
```

**ME**: Database ripristinato. Health check funzionante.

**TL**: E GLI ERRORI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla errori recenti
kubectl logs -l app=checkout-service --since=5m | grep -i error | wc -l
0

# Controlla ordini
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-01-09 10:00:00' AND status = 'completed'"
count
-------
89
```

**ME**: Zero errori. 89 ordini completati.

**TL**: E I CLIENTI?!

**ME**: Possono ordinare di nuovo.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Health check: veritiero
- Database: UP
- Errori: zero
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'health check deve dire la verità. E che JN va educato. Amen.

---

**Lunedì - 10:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con il checkout.

**UL**: Che problema?

**ME**: Il database era down. Ma l'health check diceva UP.

**UL**: Diceva UP?!

**ME**: Sì. L'health check non controllava nulla. Restituiva sempre 200 OK.

**UL**: SEMPRE?!

**ME**: Sempre. Per tre mesi.

**UL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Perché il database non era mai down.

**UL**: E QUANTI ERRORI?!

**ME**: 1247. In 30 minuti.

**UL**: 1247 ERRORI?!

**ME**: Sì. Ma ora è fixato. L'health check controlla tutto.

**UL**: E CHI HA SCRITTO L'HEALTH CHECK?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. Tre mesi fa.

**UL**: E PERCHÉ NON CONTROLLAVA NULLA?!

**ME**: Perché JN voleva che fosse "semplice".

**UL**: SEMPLICE?!

**ME**: Sì. Per non rallentare le risposte.

**UL**: E QUINDI MENTIVA?!

**ME**: Sì. Sempre.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato l'health check. E il database.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. L'health check deve dire la verità. E JN va educato. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti gli health check. Per trovare altre bugie.

**TERMINALE**:
```
# Cerca tutti gli health check
find . -name "*.js" -exec grep -l "health" {} \; | head -20

# Controlla ogni health check
for file in $(find . -name "*.js" -exec grep -l "health" {} \;); do
  echo "=== $file ==="
  grep -A10 "router.get.*health" $file
done

# Risultati
=== src/routes/health.js ===
router.get('/health', async (req, res) => {
  // Fixed - now checks database and cache
});

=== src/routes/health-legacy.js ===
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

=== src/routes/health-simple.js ===
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

=== src/routes/health-old.js ===
router.get('/health', (req, res) => {
  res.send('OK');
});
```

**ME**: Ci sono altri 3 health check che non controllano nulla.

**TL**: ALTRI 3?!

**ME**: Sì. In altri servizi.

**TL**: E QUALI SERVIZI?!

**ME**: Payment. Notification. User.

**TL**: E SONO IN PRODUZIONE?!

**ME**: Sì.

**TL**: E POSSONO MENTIRE?!

**ME**: Sì. In qualsiasi momento.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix payment health check
cat > services/payment/src/routes/health.js << 'EOF'
router.get('/health', async (req, res) => {
  const checks = { database: false, paymentGateway: false };

  try {
    await pool.query('SELECT 1');
    checks.database = true;
  } catch (err) {}

  try {
    await fetch(process.env.PAYMENT_GATEWAY_URL + '/ping');
    checks.paymentGateway = true;
  } catch (err) {}

  const isHealthy = checks.database && checks.paymentGateway;
  res.status(isHealthy ? 200 : 503).json({ status: isHealthy ? 'UP' : 'DOWN', checks });
});
EOF

# Fix notification health check
cat > services/notification/src/routes/health.js << 'EOF'
router.get('/health', async (req, res) => {
  const checks = { database: false, smtp: false, push: false };

  try {
    await pool.query('SELECT 1');
    checks.database = true;
  } catch (err) {}

  try {
    await smtpClient.verify();
    checks.smtp = true;
  } catch (err) {}

  try {
    await pushClient.checkConnection();
    checks.push = true;
  } catch (err) {}

  const isHealthy = checks.database && checks.smtp && checks.push;
  res.status(isHealthy ? 200 : 503).json({ status: isHealthy ? 'UP' : 'DOWN', checks });
});
EOF

# Fix user health check
cat > services/user/src/routes/health.js << 'EOF'
router.get('/health', async (req, res) => {
  const checks = { database: false, ldap: false };

  try {
    await pool.query('SELECT 1');
    checks.database = true;
  } catch (err) {}

  try {
    await ldapClient.search('cn=users,dc=company,dc=com', {});
    checks.ldap = true;
  } catch (err) {}

  const isHealthy = checks.database && checks.ldap;
  res.status(isHealthy ? 200 : 503).json({ status: isHealthy ? 'UP' : 'DOWN', checks });
});
EOF

# Deploy
kubectl rollout restart deployment/payment-service
kubectl rollout restart deployment/notification-service
kubectl rollout restart deployment/user-service
```

**ME**: Tutti gli health check fixati. Ora controllano le dipendenze.

**TL**: E QUANTI ERANO?!

**ME**: 4. Checkout, payment, notification, user.

**TL**: E TUTTI MENTIVANO?!

**ME**: Sì. Tutti restituivano 200 OK senza controllare nulla.

**TL**: E CHI LI HA SCRITTI?!

**ME**: JN. Bob. E... io.

**TL**: TU?!

**ME**: Sì. Due anni fa. Per il servizio user.

**TL**: E PERCHÉ?!

**ME**: Perché... volevo che fosse semplice.

**TL**: SEMPLICE?!

**ME**: Sì. Come JN.

**TL**: E QUINDI?!

**ME**: E quindi... anche io devo imparare.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Health check bugiardi: 4
- Health check fixati: 4
- Autori: JN, Bob, ME
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti scrivono health check bugiardi. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per l'health check?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che l'health check bugiardo è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: l'health check deve dire la verità.

**JN**: Sempre?

**ME**: Sempre. Se il database è down, l'health check deve dire DOWN. Se la cache è down, deve dire DOWN. Se qualcosa non va, deve dirlo.

**JN**: E SE È LENTO?!

**ME**: Allora metti un timeout. Ma non mentire.

**JN**: Ok.

**ME**: Secondo: l'health check deve controllare tutte le dipendenze.

**JN**: Tutte?

**ME**: Tutte. Database. Cache. API esterne. Tutto ciò che serve per far funzionare il servizio.

**JN**: E SE SONO TROPPE?!

**ME**: Allimenti fai un health check separato per ogni dipendenza. Ma non ignorarle.

**JN**: Ok.

**ME**: Terzo: distingui tra liveness e readiness.

**JN**: Cioè?

**ME**: Liveness = il processo è vivo. Readiness = il processo può accettare traffico.

**JN**: E LA DIFFERENZA?!

**ME**: Un servizio può essere vivo ma non pronto. Per esempio, se il database è down, il processo è vivo ma non può accettare traffico.

**JN**: E QUINDI?!

**ME**: E quindi il readiness probe deve controllare le dipendenze. Il liveness probe no.

**JN**: Ok.

**ME**: Quarto: usa gli status code corretti.

**JN**: Cioè?

**ME**: 200 = tutto ok. 503 = servizio non disponibile. Non usare mai 200 quando qualcosa non va.

**JN**: E SE USO 500?!

**ME**: 500 è per gli errori interni. 503 è per "servizio non disponibile". Usa 503 quando le dipendenze sono down.

**JN**: Ok.

**ME**: Quinto: documenta cosa controlla l'health check.

**JN**: Documenta?

**ME**: Sì. Scrivi quali dipendenze controlla. E cosa succede se falliscono.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere cosa controlla l'health check. E se non lo sai, non sai se funziona.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Health check: veritiero
- Dipendenze: controllate
- Status code: corretti
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere health check veritieri. E processi. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per gli health check bugiardi.

**TERMINALE**:
```
# Configura alert per health check bugiardi
cat > /etc/prometheus/alerts/health-check.yml << 'EOF'
groups:
  - name: health-check
    rules:
      - alert: HealthCheckNotCheckingDependencies
        expr: |
          count by (service) (
            http_endpoint_status{endpoint="/health"} == 1
            and
            http_endpoint_status{endpoint="/health/ready"} == 1
            and
            db_connection_status == 0
          ) > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Health check for {{ $labels.service }} may be lying"
          description: "Service {{ $labels.service }} reports healthy but database is down. Check health check implementation."

      - alert: HealthCheckAlways200
        expr: |
          sum by (service) (
            increase(http_requests_total{endpoint="/health",status="200"}[1h])
          ) > 0
          and
          sum by (service) (
            increase(http_requests_total{endpoint="/health",status!="200"}[1h])
          ) == 0
          and
          sum by (service) (
            increase(http_requests_total{endpoint="/health"}[1h])
          ) > 1000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Health check for {{ $labels.service }} always returns 200"
          description: "Service {{ $labels.service }} health check has returned only 200 status for the last hour. This may indicate a health check that doesn't check dependencies."

      - alert: HealthCheckResponseTimeTooFast
        expr: |
          histogram_quantile(0.99, sum by (service, le) (
            rate(http_request_duration_seconds_bucket{endpoint="/health"}[5m])
          )) < 0.001
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Health check for {{ $labels.service }} is suspiciously fast"
          description: "Health check for {{ $labels.service }} responds in less than 1ms. This may indicate a health check that doesn't actually check anything."
EOF

# Aggiungi metriche per health check
cat > src/lib/health-metrics.js << 'EOF'
const prometheus = require('prom-client');

const healthCheckStatus = new prometheus.Gauge({
  name: 'health_check_status',
  help: 'Health check status: 0=unhealthy, 1=healthy',
  labelNames: ['service', 'check'],
});

const healthCheckDuration = new prometheus.Histogram({
  name: 'health_check_duration_seconds',
  help: 'Health check duration in seconds',
  labelNames: ['service', 'check'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
});

const healthCheckLying = new prometheus.Gauge({
  name: 'health_check_lying',
  help: 'Health check is lying: 0=honest, 1=lying',
  labelNames: ['service'],
});

module.exports = { healthCheckStatus, healthCheckDuration, healthCheckLying };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per health check bugiardi. Alert per health check troppo veloci. Alert per health check che non controllano le dipendenze.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando un health check mente.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Health check: veritieri
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che gli health check devono dire la verità. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero scritto health check bugiardi.

```markdown
## Incident #HEALTH-001: Il Health Check Che Mentiva Sempre

**Data incident**: Lunedì 9 gennaio 2027, 09:00
**Autore**: JN
**Servizio**: checkout-service
**Problema**: Health check restituiva sempre 200 OK
**Causa**: Health check non controllava le dipendenze
**Tempo in produzione**: 3 mesi
**Errori**: 1247
**Tempo di risoluzione**: 1 ora
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "Diceva UP?!"
**Reazione TL**: "Sempre?!"
**Reazione CTO**: "L'health check deve dire la verità."
**Soluzione**: Health check veritiero + audit + educazione
**Lezione imparata**: L'HEALTH CHECK DEVE DIRE LA VERITÀ. SEMPRE.

**Regole per gli health check**:
1. L'health check DEVE controllare le dipendenze.
2. Usa 200 per "tutto ok", 503 per "servizio non disponibile".
3. Distingui tra liveness (processo vivo) e readiness (può accettare traffico).
4. Controlla database, cache, API esterne, tutto ciò che serve.
5. Metti timeout per non bloccare le risposte.
6. Documenta cosa controlla l'health check.
7. Non mentire MAI. Un health check bugiardo è peggio di nessun health check.
8. Testa l'health check con dipendenze down. Amen.

**Come scrivere un health check veritiero**:
```javascript
router.get('/health', async (req, res) => {
  const checks = {
    database: false,
    cache: false,
    externalApi: false
  };

  // Check database
  try {
    await pool.query('SELECT 1');
    checks.database = true;
  } catch (err) {
    console.error('Database check failed:', err.message);
  }

  // Check cache
  try {
    await redisClient.ping();
    checks.cache = true;
  } catch (err) {
    console.error('Cache check failed:', err.message);
  }

  // Check external API
  try {
    const response = await fetch(process.env.EXTERNAL_API_URL + '/ping', {
      timeout: 5000
    });
    checks.externalApi = response.ok;
  } catch (err) {
    console.error('External API check failed:', err.message);
  }

  const isHealthy = checks.database && checks.cache && checks.externalApi;
  
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'UP' : 'DOWN',
    checks,
    timestamp: new Date().toISOString()
  });
});

// Liveness probe - is the process alive?
router.get('/health/live', (req, res) => {
  res.status(200).json({ status: 'ALIVE' });
});

// Readiness probe - can the service accept traffic?
router.get('/health/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    await redisClient.ping();
    res.status(200).json({ status: 'READY' });
  } catch (err) {
    res.status(503).json({ status: 'NOT_READY', error: err.message });
  }
});
```

**Come configurare Kubernetes probes**:
```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3
```

**Come testare l'health check**:
```bash
# Test con database down
kubectl exec -it postgres-0 -- pg_ctl stop -D /var/lib/postgresql/data

# Verifica health check
curl -s http://checkout-service:8080/health
# Expected: {"status": "DOWN", "checks": {"database": false, ...}}

# Verifica status code
curl -s -o /dev/null -w "%{http_code}" http://checkout-service:8080/health
# Expected: 503

# Riavvia database
kubectl exec -it postgres-0 -- pg_ctl start -D /var/lib/postgresql/data

# Verifica health check
curl -s http://checkout-service:8080/health
# Expected: {"status": "UP", "checks": {"database": true, ...}}
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che l'health check deve dire la verità. E che deve controllare le dipendenze. E che deve usare gli status code corretti. E che JN va educato. E che 1247 errori sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: l'health check è come un medico. Se il paziente sta male, il medico deve dire "stai male". Se il medico dice sempre "tutto ok", il paziente muore. E nel nostro caso, il paziente è il servizio. E il medico è l'health check. E se l'health check mente, il servizio muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "L'health check diceva UP." E UL dice: "E IL DATABASE ERA DOWN?!" E tu dici: "Sì." E UL dice: "E L'HEALTH CHECK DICEVA UP?!" E tu dici: "Sì." E UL dice: "E COME FA A DIRE UP SE IL DATABASE È DOWN?!" E tu dici: "Perché non lo controllava." E UL dice: "E PERCHÉ NON LO CONTROLLAVA?!" E tu dici: "Perché JN voleva che fosse semplice." E UL dice: "SEMPLICE?!" E tu dici: "Sì. Per non rallentare le risposte." E UL dice: "E QUANTO È COSTATA LA SEMPLICITÀ?!" E tu dici: "1247 errori. E 1 ora di downtime parziale. E 4 health check da fixare. E 1 junior da educare." E la verità è che la semplicità costa. Sempre. E la prossima volta, l'health check controlla tutto. E dice la verità. Sempre. Amen.

---

## Il costo dell'health check bugiardo

| Voce | Valore |
|------|--------|
| Servizio | checkout-service |
| Autore | JN |
| Data creazione | Ottobre 2026 |
| Data incident | 09/01/2027, 09:00 |
| Tempo in produzione | 3 mesi |
| Errori | 1247 |
| Tempo di risoluzione | 1 ora |
| Downtime | 0 (parziale) |
| Health check bugiardi trovati | 4 |
| Servizi affetti | checkout, payment, notification, user |
| Autori | JN, Bob, ME |
| Reazione UL | "Diceva UP?!" |
| Reazione TL | "Sempre?!" |
| Reazione CTO | "Deve dire la verità." |
| Soluzione | Health check veritieri + audit + educazione |
| Lezione imparata | HEALTH CHECK = VERITÀ |
| **Totale** | **1247 errori + 4 health check fixati + 1 junior educato + 1 senior educato** |

**Morale**: L'health check deve dire la verità. Sempre. Quando il database è down, deve dire DOWN. Quando la cache è down, deve dire DOWN. Quando qualcosa non va, deve dirlo. E se l'health check mente, il load balancer crede che tutto vada bene. E manda traffico a un servizio morto. E i clienti ricevono errori. E tu ricevi ticket. E UL riceve chiamate. E tutti ricevono la verità. Tranne l'health check. Che continua a dire 200 OK. E tu ti chiedi: "Com'è possibile che l'health check dica UP se il database è down?" E la risposta è semplice: perché JN l'ha scritto così. E JN voleva che fosse semplice. E la semplicità costa. Sempre. E la prossima volta, l'health check controlla tutto. E dice la verità. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](98-il-rollback-che-non-e-mai-arrivato.md) | [Prossima](100-il-feature-flag-che-nessuno-ricordava.md)**
