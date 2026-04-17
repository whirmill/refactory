# Il Timeout Che Era Zero

**Data**: 20/02/2027

**[Storie 2026](index.md) | [Precedente](104-la-transazione-che-non-esisteva.md) | [Prossima](106-la-config-che-era-nell-immagine.md)**

---

C'è una verità nelle API che tutti conoscono ma nessuno rispetta: i timeout servono. E devono essere sensati. Non zero. Non infiniti. Qualcosa di ragionevole. E invece. Invece JN ha impostato il timeout a zero. ZERO. E quando il timeout è zero, la richiesta fallisce subito. Sempre. Anche quando il server risponde. Anche quando la rete funziona. Anche quando tutto va bene. La richiesta parte. E scade subito. Perché zero millisecondi non sono tempo. Sono un'istante. E l'istante non basta per nulla. E le API falliscono. E i clienti vedono errori. E UL chiama. E tu rispondi. E dici: "Il timeout era zero." E UL dice: "ZERO?!" E tu dici: "Sì. Zero millisecondi." E UL dice: "E CHI L'HA IMPOSTATO A ZERO?!" E tu dici: "JN." E UL dice: "E PERCHÉ?!" E tu dici: "Perché voleva che fosse veloce." E la verità è che tutti vogliono velocità. Ma la velocità ha un prezzo. E il prezzo è aspettare. E se non aspetti, non funziona. E se non funziona, non è veloce. È rotto. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 08:00. Il caffè non era ancora pronto.

Poi è arrivato l'alert.

**ALERT**: API error rate > 90% for payment-service

**ME**: 90% di errori?!

**TL**: 90%?!

**ME**: Sì. Quasi tutte le richieste falliscono.

**TL**: E QUANTE SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla errori
kubectl logs -l app=payment-service --since=30m | grep -i error | tail -20
2027-02-20 08:00:01 ERROR: Request timeout after 0ms
2027-02-20 08:00:01 ERROR: Failed to process payment: timeout
2027-02-20 08:00:02 ERROR: Request timeout after 0ms
2027-02-20 08:00:02 ERROR: Failed to process payment: timeout
...

# Conta errori
kubectl logs -l app=payment-service --since=30m | grep -i error | wc -l
45678

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total{status="500"}[5m]))'
{status: "success", data: {result: [{value: ["1234"]}]}}  # 1234 errori al secondo

# Controlla health
curl -s http://payment-service:8080/health
{"status": "UP", "checks": {"database": true, "gateway": true}}
```

**ME**: Il servizio è UP. Ma le richieste falliscono con timeout.

**TL**: TIMEOUT?!

**ME**: Sì. "Request timeout after 0ms".

**TL**: 0ms?!

**ME**: Zero millisecondi.

**TL**: E COME FA A ESSERE ZERO?!

**ME**: Non lo so. Guardo il codice.

**TERMINALE**:
```
# Leggi configurazione
cat services/payment/src/config/http.js
module.exports = {
  http: {
    timeout: parseInt(process.env.HTTP_TIMEOUT) || 0,
    retries: parseInt(process.env.HTTP_RETRIES) || 3
  }
};

# Controlla environment
kubectl get secret payment-config -o jsonpath='{.data.HTTP_TIMEOUT}' | base64 -d
0

# Controlla chi ha impostato
kubectl get secret payment-config -o yaml | grep -A5 metadata
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"kind":"Secret",...,"HTTP_TIMEOUT":"0"}
    kubernetes.io/change-cause: "JN: velocizzare le API"
```

**ME**: JN ha impostato il timeout a zero. Per "velocizzare le API".

**TL**: VELOCIZZARE?!

**ME**: Sì. Ma zero millisecondi non è veloce. È impossibile.

**TL**: E QUINDI?!

**ME**: E quindi... tutte le richieste falliscono.

**TL**: E I PAGAMENTI?!

**ME**: Non vanno. 45.678 errori in 30 minuti.

**TL**: E I CLIENTI?!

**ME**: Non possono pagare.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Timeout: 0ms
- Errori: 45.678
- Autore: JN
- Motivo: "velocizzare"

E tutto era chiaro. JN aveva impostato zero. E zero non funziona. E i pagamenti erano bloccati. Amen.

---

**Lunedì - 08:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava ancora dormendo.

**ME**: JN, hai impostato il timeout a zero?

**JN**: (voce assonnata) Sì... per velocizzare!

**ME**: VELOCIZZARE?!

**JN**: Sì! Zero millisecondi = risposta immediata!

**ME**: JN, ZERO MILLISECONDI NON È VELOCITÀ. È IMPOSSIBILITÀ.

**JN**: Ma... il default era 5000ms! Troppo lento!

**ME**: E QUINDI HAI MESSO ZERO?!

**JN**: Sì! Perché zero è più veloce di 5000!

**ME**: JN, ZERO NON È PIÙ VELOCE. È ROTTO.

**JN**: Ma... il test passava!

**ME**: IL TEST PASSAVA PERCHÉ IL SERVER ERA LOCALE! IN PRODUZIONE C'È LA RETE!

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Non ci avevo pensato.

**ME**: E ORA FIXI. SUBITO.

**JN**: Ok.

JN ha riattaccato. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Timeout: 0ms
- Errori: 45.678
- JN: a fixare
- Clienti: incazzati

E la lezione era chiara. Zero non è un timeout. È un'assenza. E le assenze non funzionano. Amen.

---

**Lunedì - 09:00**

Ho fixato il timeout. E riavviato il servizio.

**TERMINALE**:
```
# Fix timeout
kubectl create secret generic payment-config --from-literal=HTTP_TIMEOUT=5000 --dry-run=client -o yaml | kubectl apply -f -

# Riavvia servizio
kubectl rollout restart deployment/payment-service

# Verifica
kubectl rollout status deployment/payment-service
deployment "payment-service" successfully rolled out

# Controlla errori
kubectl logs -l app=payment-service --since=5m | grep -i error | wc -l
0

# Controlla pagamenti
kubectl exec -it postgres-0 -- psql -U payments -c "SELECT COUNT(*) FROM payments WHERE created_at > '2027-02-20 09:00:00' AND status = 'completed'"
count
-------
234
```

**ME**: Timeout fixato a 5000ms. Zero errori. 234 pagamenti completati.

**TL**: E QUINDI?!

**ME**: E quindi... funziona.

**TL**: E I CLIENTI?!

**ME**: Possono pagare di nuovo.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Timeout: 5000ms
- Errori: zero
- Pagamenti: completati
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i timeout vanno impostati. E che zero non è un valore. È un errore. Amen.

---

**Lunedì - 09:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con i pagamenti.

**UL**: Che problema?

**ME**: Il timeout era impostato a zero.

**UL**: ZERO?!

**ME**: Sì. Zero millisecondi.

**UL**: E COME FA A ESSERE ZERO?!

**ME**: JN l'ha impostato. Per "velocizzare le API".

**UL**: VELOCIZZARE?!

**ME**: Sì. Ma zero non è veloce. È impossibile.

**UL**: E QUANTI ERRORI?!

**ME**: 45.678. In 30 minuti.

**UL**: 45.000 ERRORI?!

**ME**: Sì. Ma ora è fixato. Timeout a 5000ms.

**UL**: E I PAGAMENTI?!

**ME**: Funzionano. 234 completati nell'ultima ora.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E COME?!

**ME**: Con una lezione. Sui timeout. E su come funzionano le reti. E sul fatto che zero non è un numero.

**UL**: E SE NON IMPARA?!

**ME**: Allora... lo metto a scrivere documentazione.

UL ha sospirato. Poi ha detto: "Documenta tutto. E educa JN. Di nuovo."

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I timeout vanno impostati. E JN va educato. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i timeout. Per trovare altri zeri.

**TERMINALE**:
```
# Cerca tutti i timeout
grep -r "timeout" --include="*.js" --include="*.ts" --include="*.yaml" . | grep -E "timeout.*[=:]\s*0" | head -20

# Risultati
./services/payment/src/config/http.js:    timeout: parseInt(process.env.HTTP_TIMEOUT) || 0,
./services/notification/src/config/sms.js:    timeout: process.env.SMS_TIMEOUT || 0,
./services/user/src/config/ldap.js:        timeout: parseInt(process.env.LDAP_TIMEOUT) || 0,
./services/order/src/config/http.js:       timeout: 0, // TODO: fix
./services/inventory/src/config/http.js:   timeout: 0,

# Controlla environment
for svc in payment notification user order inventory; do
  echo "=== $svc ==="
  kubectl get secret $svc-config -o jsonpath='{.data.*_TIMEOUT}' 2>/dev/null | base64 -d
  echo
done

# Risultati
=== payment ===
5000  # Fixato
=== notification ===
0
=== user ===
0
=== order ===
0
=== inventory ===
0
```

**ME**: Ci sono altri 4 servizi con timeout a zero.

**TL**: ALTRI 4?!

**ME**: Sì. Notification, user, order, inventory.

**TL**: E SONO IN PRODUZIONE?!

**ME**: Sì.

**TL**: E PERCHÉ NON FALLISCONO?!

**ME**: Perché... non li usano ancora. O li usano poco.

**TL**: E QUINDI?!

**ME**: E quindi... fixo tutto.

**TERMINALE**:
```
# Fix tutti i timeout
kubectl create secret generic notification-config --from-literal=SMS_TIMEOUT=10000 --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic user-config --from-literal=LDAP_TIMEOUT=5000 --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic order-config --from-literal=HTTP_TIMEOUT=5000 --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic inventory-config --from-literal=HTTP_TIMEOUT=5000 --dry-run=client -o yaml | kubectl apply -f -

# Riavvia servizi
kubectl rollout restart deployment/notification-service
kubectl rollout restart deployment/user-service
kubectl rollout restart deployment/order-service
kubectl rollout restart deployment/inventory-service

# Verifica
kubectl rollout status deployment/notification-service
kubectl rollout status deployment/user-service
kubectl rollout status deployment/order-service
kubectl rollout status deployment/inventory-service
```

**ME**: Tutti i timeout fixati. Valori sensati.

**TL**: E QUALI SONO I VALORI SENSATI?!

**ME**: Dipende dal servizio. Ma mai zero. E mai infinito.

**TL**: E QUAL È LA REGOLA?!

**ME**: La regola è: timeout = tempo massimo accettabile + margine. E se non sai, usa 5000ms.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Timeout zero: 5 trovati
- Timeout zero: 5 fixati
- Servizi: riavviati
- JN: responsabile

E tutto era fixato. Ma avevo imparato una lezione. La lezione che i timeout vanno impostati. E che zero è ovunque. E che JN va educato. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il timeout?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il timeout a zero è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: zero non è un timeout.

**JN**: Ma zero è veloce!

**ME**: Zero non è veloce. Zero è impossibile. La luce impiega 1ms per viaggiare 300km. La rete impiega almeno 1-2ms per una richiesta locale. Zero millisecondi non esistono.

**JN**: Ah.

**ME**: Secondo: i timeout servono per gestire l'incertezza.

**JN**: L'incertezza?

**ME**: Sì. La rete è incerta. I server sono incerti. Tutto è incerto. Il timeout dice: "se dopo X tempo non ho risposta, fallisco". E questo è ok.

**JN**: Ok.

**ME**: Terzo: il timeout deve essere ragionevole.

**JN**: Cioè?

**ME**: Non troppo breve (fallisce tutto). Non troppo lungo (aspetta per sempre). Qualcosa in mezzo. Per le API interne: 5-10 secondi. Per le API esterne: 10-30 secondi. Per i database: 1-5 secondi.

**JN**: E SE NON SO?!

**ME**: Allora usa 5000ms. È un buon default.

**JN**: Ok.

**ME**: Quarto: distingui tra connection timeout e read timeout.

**JN**: C'è differenza?

**ME**: Sì. Connection timeout = tempo per connettersi. Read timeout = tempo per ricevere la risposta. Sono diversi. E vanno impostati diversamente.

**JN**: E QUALI VALORI?!

**ME**: Connection: 1-5 secondi. Read: dipende dall'operazione. Ma mai zero.

**JN**: Ok.

**ME**: Quinto: documenta i timeout. E spiega perché.

**JN**: Documenta?

**ME**: Sì. Scrivi perché hai scelto quel valore. E cosa succede se scade. E come gestire il fallimento.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere perché quel timeout è quel valore. E se non lo sa, lo cambia. E magari mette zero. E succede di nuovo.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Timeout: 5000ms
- Servizi: funzionanti
- Educazione: completata
- Lezione: imparata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere timeout sensati. E processi. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i timeout. E alert per i valori strani.

**TERMINALE**:
```
# Configura alert per timeout anomali
cat > /etc/prometheus/alerts/timeout.yml << 'EOF'
groups:
  - name: timeout
    rules:
      - alert: TimeoutZero
        expr: |
          count by (service) (
            http_client_timeout_seconds == 0
            or
            grpc_client_timeout_seconds == 0
            or
            db_connection_timeout_seconds == 0
          ) > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.service }} has timeout set to zero"
          description: "Service {{ $labels.service }} has a timeout configured as zero. This will cause all requests to fail immediately."

      - alert: TimeoutTooShort
        expr: |
          count by (service) (
            http_client_timeout_seconds > 0
            and
            http_client_timeout_seconds < 0.1
          ) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Service {{ $labels.service }} has very short timeout"
          description: "Service {{ $labels.service }} has timeout < 100ms. This may cause failures under normal network latency."

      - alert: TimeoutTooLong
        expr: |
          count by (service) (
            http_client_timeout_seconds > 60
          ) > 0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Service {{ $labels.service }} has very long timeout"
          description: "Service {{ $labels.service }} has timeout > 60s. This may cause resource exhaustion under failure conditions."
EOF

# Aggiungi metriche per timeout
cat > src/lib/timeout-metrics.js << 'EOF'
const prometheus = require('prom-client');

const timeoutValue = new prometheus.Gauge({
  name: 'http_client_timeout_seconds',
  help: 'Configured HTTP client timeout in seconds',
  labelNames: ['service', 'endpoint'],
});

const timeoutExceeded = new prometheus.Counter({
  name: 'http_client_timeout_exceeded_total',
  help: 'Number of requests that exceeded timeout',
  labelNames: ['service', 'endpoint'],
});

const requestLatency = new prometheus.Histogram({
  name: 'http_client_request_duration_seconds',
  help: 'HTTP client request duration in seconds',
  labelNames: ['service', 'endpoint', 'status'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10],
});

module.exports = { timeoutValue, timeoutExceeded, requestLatency };
EOF

# Configura validazione
cat > src/lib/timeout-validator.js << 'EOF'
function validateTimeout(timeout, name) {
  if (timeout === undefined || timeout === null) {
    console.warn(`Warning: ${name} timeout is not set, using default 5000ms`);
    return 5000;
  }
  
  if (timeout === 0) {
    throw new Error(`Error: ${name} timeout cannot be zero. This will cause all requests to fail.`);
  }
  
  if (timeout < 100) {
    console.warn(`Warning: ${name} timeout is very short (${timeout}ms). This may cause failures.`);
  }
  
  if (timeout > 60000) {
    console.warn(`Warning: ${name} timeout is very long (${timeout}ms). This may cause resource issues.`);
  }
  
  return timeout;
}

module.exports = { validateTimeout };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per timeout zero. Alert per timeout troppo brevi. Alert per timeout troppo lunghi.

**TL**: E LA VALIDAZIONE?!

**ME**: Aggiunta. Se qualcuno imposta zero, il servizio non parte.

**TL**: E SE LO BYPASSANO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Validazione: implementata
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che la validazione previene. E che JN va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i timeout.

```markdown
## Incident #TIMEOUT-001: Il Timeout Che Era Zero

**Data incident**: Lunedì 20 febbraio 2027, 08:00
**Autore**: JN
**Servizio**: payment-service
**Problema**: Timeout impostato a zero millisecondi
**Causa**: Tentativo di "velocizzare" le API
**Tempo in produzione**: ~2 ore
**Errori**: 45.678
**Pagamenti completati**: 0 (durante l'incident)
**Tempo di risoluzione**: 30 minuti
**Downtime**: Parziale (pagamenti bloccati)
**Reazione UL**: "Zero?!"
**Reazione TL**: "Zero millisecondi?!"
**Reazione CTO**: "I timeout vanno impostati. Mai zero."
**Soluzione**: Timeout 5000ms + audit + validazione
**Lezione imparata**: I TIMEOUT NON SONO ZERO. MAI.

**Regole per i timeout**:
1. Il timeout NON è mai zero. MAI.
2. Zero millisecondi non esistono nella realtà.
3. Il timeout serve a gestire l'incertezza della rete.
4. Connection timeout ≠ Read timeout. Sono diversi.
5. Valori ragionevoli: API interne 5-10s, API esterne 10-30s, DB 1-5s.
6. Se non sai, usa 5000ms. È un buon default.
7. Documenta perché hai scelto quel valore.
8. Testa il timeout con latenza reale. Amen.

**Come configurare i timeout**:
```javascript
// HTTP client con timeout sensati
const client = axios.create({
  timeout: 5000, // 5 secondi
  // Oppure separati:
  // timeout: {
  //   connect: 2000,  // 2s per connettersi
  //   read: 5000,     // 5s per ricevere risposta
  // }
});

// Database con timeout
const pool = new Pool({
  connectionTimeoutMillis: 5000,
  query_timeout: 10000,
  statement_timeout: 10000,
});

// Redis con timeout
const redis = new Redis({
  connectTimeout: 5000,
  commandTimeout: 5000,
});
```

**Come validare i timeout**:
```javascript
function validateTimeout(timeout, name) {
  if (timeout === 0) {
    throw new Error(`${name} timeout cannot be zero`);
  }
  if (timeout < 100) {
    console.warn(`${name} timeout is very short: ${timeout}ms`);
  }
  if (timeout > 60000) {
    console.warn(`${name} timeout is very long: ${timeout}ms`);
  }
  return timeout;
}
```

**Come testare i timeout**:
```bash
# Simula latenza
tc qdisc add dev eth0 root netem delay 100ms

# Testa con timeout breve
curl -m 0.05 http://api.example.com/health
# Expected: timeout

# Testa con timeout ragionevole
curl -m 5 http://api.example.com/health
# Expected: success

# Rimuovi latenza
tc qdisc del dev eth0 root
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i timeout non sono zero. E che zero millisecondi non esistono. E che la rete è incerta. E che i timeout servono. E che JN va educato. E che 45.678 errori sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: il timeout è come la pazienza. Se non ne hai, tutto fallisce. E se ne hai troppo, aspetti per sempre. E se ne hai zero, non funziona nulla. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il timeout era zero." E UL dice: "ZERO?!" E tu dici: "Sì. Zero millisecondi." E UL dice: "E COME FA A ESSERE ZERO?!" E tu dici: "Perché JN voleva velocizzare." E UL dice: "E HA MESSO ZERO?!" E tu dici: "Sì. Perché zero è più veloce di 5000." E UL dice: "E QUANTO È COSTATA LA VELOCITÀ?!" E tu dici: "45.678 errori. E 2 ore di pagamenti bloccati. E 5 servizi da fixare. E 1 junior da educare." E la verità è che la velocità costa. E la pazienza serve. E i timeout vanno impostati. E zero non è un numero. È un errore. Amen.

---

## Il costo del timeout zero

| Voce | Valore |
|------|--------|
| Servizio | payment-service |
| Autore | JN |
| Data incident | 20/02/2027, 08:00 |
| Tempo in produzione | ~2 ore |
| Errori | 45.678 |
| Pagamenti completati | 0 (durante incident) |
| Tempo di risoluzione | 30 minuti |
| Downtime | Parziale |
| Timeout impostato | 0ms |
| Timeout corretto | 5000ms |
| Servizi affetti | 5 |
| Reazione UL | "Zero?!" |
| Reazione TL | "Zero millisecondi?!" |
| Reazione CTO | "Mai zero." |
| Soluzione | Timeout sensati + validazione |
| Lezione imparata | TIMEOUT ≠ ZERO |
| **Totale** | **45.678 errori + 5 servizi fixati + 1 junior educato** |

**Morale**: I timeout non sono zero. Mai. Per nessun motivo. In nessun caso. MAI. E se li imposti a zero, le richieste falliscono. Tutte. Subito. E i clienti vedono errori. E UL chiama. E tu rispondi. E dici: "Il timeout era zero." E UL dice: "ZERO?!" E tu dici: "Sì. Zero millisecondi." E UL dice: "E CHI L'HA IMPOSTATO?!" E tu dici: "JN." E UL dice: "E PERCHÉ?!" E tu dici: "Per velocizzare." E UL dice: "E HA VELOCIZZATO?!" E tu dici: "No. Ha rotto tutto." E la verità è che la velocità non si ottiene con lo zero. Si ottiene con l'ottimizzazione. E con la cache. E con le query efficienti. Ma non con timeout zero. Perché zero non è velocità. È impossibilità. E l'impossibilità non funziona. Mai. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](104-la-transazione-che-non-esisteva.md) | [Prossima](106-la-config-che-era-nell-immagine.md)**
