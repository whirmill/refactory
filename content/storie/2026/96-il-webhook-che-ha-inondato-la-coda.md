# Il Webhook Che Ha Inondato La Coda

**Data**: 19/12/2026

**[Storie 2026](index.md) | [Precedente](95-il-certificato-scaduto-che-ha-ucciso-tutto.md) | [Prossima](97-il-secret-che-era-nel-repo-pubblico.md)**

---

C'è una verità nei sistemi distribuiti che tutti conoscono ma nessuno rispetta: i webhook sono pericolosi. Perché i webhook chiamano. E quando chiamano, possono chiamare ancora. E ancora. E ancora. Finché un giorno la coda dei messaggi ha 2 milioni di elementi. E il consumer non riesce a stare dietro. E il disco si riempie. E la memoria finisce. E tu ti chiedi: "Com'è possibile che un webhook abbia creato 2 milioni di messaggi?" E la risposta è semplice: perché il webhook chiamava se stesso. In un loop infinito. E ogni chiamata creava un messaggio. E ogni messaggio triggerava il webhook. E il webhook chiamava. E il loop continuava. E la coda moriva. Amen.

![](../../img/server.jpg)

---

**Giovedì - Il Deploy**

Era giovedì. Le 17:30. JN voleva andare a casa.

**JN**: Ho finito il webhook per le notifiche!

**ME**: Fammi vedere.

**JN**: È semplice. Quando arriva un ordine, manda una notifica al webhook del cliente.

**ME**: E se il webhook fallisce?

**JN**: Riprova 3 volte.

**ME**: E se fallisce ancora?

**JN**: Mette il messaggio in una coda di retry.

**ME**: E la coda di retry?

**JN**: La processiamo dopo.

**ME**: E chi la processa?

**JN**: Un worker.

**ME**: E il worker cosa fa?

**JN**: Chiama il webhook.

**ME**: E se il webhook è... il nostro webhook?

**JN**: Eh?

**ME**: Niente. Fai il deploy.

JN ha fatto il deploy. Alle 17:45. Di giovedì. E io ho pensato: "Che male può fare un webhook?" E la risposta era: tutto. Tutto il male del mondo. Amen.

---

**Venerdì - La Scoperta**

Era venerdì. Le 08:15. Il caffè non era ancora pronto.

Poi è arrivato l'alert.

**ALERT**: Queue depth > 100000 for orders-webhook

**ME**: 100.000 messaggi in coda?!

**TL**: 100.000?!

**ME**: Sì. Per il webhook degli ordini.

**TL**: E QUANTI ORDINI ABBIAMO AL GIORNO?!

**ME**: 500. Forse 1000.

**TL**: E QUINDI 100.000 MESSAGGI?!

**ME**: Non è normale. Controllo.

**TERMINALE**:
```
# Controlla la coda
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
orders-webhook		247891
orders-retry		156234
orders-deadletter		0

# Controlla i consumer
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_consumers
Queue: orders-webhook
Consumer 1:	Active		Prefetch: 10
Consumer 2:	Active		Prefetch: 10
Consumer 3:	Active		Prefetch: 10

# Controlla rate
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages_ready message_rates
orders-webhook		247891		publish: 1234/s, deliver: 45/s
```

**ME**: La coda sta crescendo. 1234 messaggi al secondo in ingresso. 45 al secondo processati.

**TL**: E QUINDI?!

**ME**: E quindi... la coda cresce di 1189 messaggi al secondo.

**TL**: E QUANTI MESSAGGI CI SONO?!

**ME**: 247.891. E crescono.

**TL**: E QUANDO È INIZIATO?!

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
# Controlla log del producer
kubectl logs -l app=orders-api --since=12h | grep -i webhook | head -20
2026-12-19 06:00:01 INFO: Webhook sent to https://api.company.com/webhook/orders
2026-12-19 06:00:01 INFO: Webhook sent to https://api.company.com/webhook/orders
2026-12-19 06:00:01 INFO: Webhook sent to https://api.company.com/webhook/orders
2026-12-19 06:00:01 INFO: Webhook sent to https://api.company.com/webhook/orders
2026-12-19 06:00:01 INFO: Webhook sent to https://api.company.com/webhook/orders
...

# Controlla log del consumer
kubectl logs -l app=webhook-consumer --since=12h | head -20
2026-12-19 06:00:01 INFO: Processing webhook for order #12345
2026-12-19 06:00:01 INFO: Sending notification to https://api.company.com/webhook/orders
2026-12-19 06:00:01 INFO: Processing webhook for order #12345
2026-12-19 06:00:01 INFO: Sending notification to https://api.company.com/webhook/orders
2026-12-19 06:00:01 INFO: Processing webhook for order #12345
...

# Controlla configurazione webhook
kubectl get configmap webhook-config -o yaml | grep -A5 "webhook_url"
webhook_url: https://api.company.com/webhook/orders
```

**ME**: Il webhook URL è... il nostro webhook.

**TL**: IL NOSTRO WEBHOOK?!

**ME**: Sì. Il consumer chiama il nostro webhook. E il nostro webhook pubblica un messaggio. E il consumer lo processa. E chiama il nostro webhook. E il loop continua.

**TL**: E CHI HA CONFIGURATO COSÌ?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla chi ha modificato la config
kubectl get configmap webhook-config -o yaml | grep -A2 "metadata"
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"webhook_url":"https://api.company.com/webhook/orders"},"metadata":{"annotations":{},"name":"webhook-config"}}

# Controlla git history
cd /app/config && git log --oneline webhook-config.yaml
abc1234 JN: Update webhook URL for testing
def5678 ME: Initial webhook configuration

# Controlla il commit
git show abc1234
commit abc1234
Author: JN <jn@company.com>
Date:   Thu Dec 19 17:30:00 2026 +0000

    JN: Update webhook URL for testing

diff --git a/webhook-config.yaml b/webhook-config.yaml
- webhook_url: https://client.example.com/webhook
+ webhook_url: https://api.company.com/webhook/orders
```

**ME**: JN. Ieri alle 17:30. Ha cambiato l'URL per testing.

**TL**: PER TESTING?!

**ME**: Sì. E ha fatto il deploy.

**TL**: E HA LASCIATO IL NOSTRO URL?!

**ME**: Sì. E il nostro webhook pubblica messaggi. E il consumer li processa. E chiama il nostro webhook. E il loop continua.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Coda: 247.891 messaggi
- Rate: +1189/s
- URL: il nostro webhook
- Autore: JN
- Data: ieri, 17:30

E tutto era chiaro. JN aveva creato un loop infinito. E il loop stava uccidendo la coda. E la coda stava morendo. Amen.

---

**Venerdì - 08:30**

Ho chiamato JN. JN ha risposto. Era venerdì. JN stava ancora dormendo.

**ME**: JN, hai cambiato il webhook URL ieri?

**JN**: (voce assonnata) Sì... per testare.

**ME**: E L'HAI LASCIATO COSÌ?!

**JN**: Mi sono dimenticato di cambiarlo.

**ME**: DIMENTICATO?!

**JN**: Sì. Scusa.

**ME**: SCUSA?! LA CODA HA 250.000 MESSAGGI!

**JN**: Oh.

**ME**: OH?! IL LOOP STA UCCIDENDO TUTTO!

**JN**: E... cosa facciamo?

**ME**: FERMO IL CONSUMER! E CAMBIO L'URL!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA USA UN URL DI TEST!

**JN**: Ok.

JN ha riattaccato. O forse ha riattaccato per tornare a dormire. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Coda: 250.000+ messaggi
- Rate: +1200/s
- URL: il nostro webhook
- JN: a letto

E la lezione era chiara. I webhook sono pericolosi. E i loop infiniti uccidono. E JN dimentica le cose. Amen.

---

**Venerdì - 09:00**

Ho fermato il consumer. Ho cambiato l'URL.

**TERMINALE**:
```
# Ferma il consumer
kubectl scale deployment webhook-consumer --replicas=0

# Cambia l'URL
kubectl create configmap webhook-config --from-literal=webhook_url=https://client.example.com/webhook -o yaml --dry-run=client | kubectl apply -f -

# Verifica
kubectl get configmap webhook-config -o yaml | grep webhook_url
webhook_url: https://client.example.com/webhook

# Controlla la coda
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
orders-webhook		312456
orders-retry		198765
orders-deadletter		0
```

**ME**: Consumer fermato. URL cambiato.

**TL**: E LA CODA?!

**ME**: Ha smesso di crescere. Ma ha 312.456 messaggi.

**TL**: E ORA?!

**ME**: Ora devo svuotare la coda. O processare i messaggi.

**TL**: E QUANTI SONO?!

**ME**: 312.456. Più 198.765 nella retry.

**TL**: E SE LI PROCESSIAMO?!

**ME**: Ci vuole tempo. E il webhook del cliente non può ricevere 500.000 richieste.

**TL**: E QUINDI?!

**ME**: E quindi... li cancello. E spiego al cliente.

**TL**: E IL CLIENTE?!

**ME**: Il cliente non ha ricevuto le notifiche. Dobbiamo dirglielo.

**TL**: E UL?!

**ME**: UL... lo chiamo dopo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Consumer: fermato
- URL: corretto
- Coda: 312.456 messaggi
- Retry: 198.765 messaggi
- Totale: 511.221 messaggi

E tutto era fermo. Ma la coda era piena. E i messaggi erano persi. E il cliente non sapeva nulla. Amen.

---

**Venerdì - 09:30**

Ho svuotato la coda. Con cautela. E dolore.

**TERMINALE**:
```
# Svuota la coda principale
kubectl exec -it rabbitmq-0 -- rabbitmqctl purge_queue orders-webhook
Purging queue "orders-webhook" ...

# Svuota la coda di retry
kubectl exec -it rabbitmq-0 -- rabbitmqctl purge_queue orders-retry
Purging queue "orders-retry" ...

# Verifica
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
orders-webhook		0
orders-retry		0
orders-deadletter		0

# Riavvia il consumer
kubectl scale deployment webhook-consumer --replicas=3
```

**ME**: Code svuotate. Consumer riavviato.

**TL**: E I MESSAGGI?!

**ME**: Persi. Tutti.

**TL**: TUTTI?!

**ME**: Sì. 511.221 messaggi. Persi.

**TL**: E LE NOTIFICHE?!

**ME**: Non sono arrivate.

**TL**: E GLI ORDINI?!

**ME**: Gli ordini ci sono. Ma le notifiche no.

**TL**: E IL CLIENTE?!

**ME**: Il cliente non sa che gli ordini sono arrivati.

**TL**: E QUINDI?!

**ME**: E quindi... devo chiamare il cliente. E spiegare.

**TL**: E COSA GLI DICI?!

**ME**: "Abbiamo avuto un problema con i webhook. Le notifiche non sono arrivate. Ci scusiamo."

**TL**: E LORO?!

**ME**: Probabilmente si incazzano. Ma è la verità.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Coda: vuota
- Consumer: attivo
- Messaggi: persi
- Cliente: da chiamare

E tutto era pulito. Ma i messaggi erano persi. E il cliente andava chiamato. E UL andava informato. Amen.

---

**Venerdì - 10:00**

Ho chiamato UL. UL ha risposto. Era venerdì. UL era di buon umore. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con i webhook.

**UL**: Che problema?

**ME**: JN ha configurato l'URL sbagliato. E ha creato un loop infinito.

**UL**: Loop infinito?!

**ME**: Sì. Il webhook chiamava se stesso. E ogni chiamata creava un messaggio. E ogni messaggio triggerava il webhook.

**UL**: E QUANTI MESSAGGI?!

**ME**: 511.221. Prima che fermassi tutto.

**UL**: 511.000 MESSAGGI?!

**ME**: Sì. E li ho dovuti cancellare.

**UL**: CANCELLATI?!

**ME**: Sì. Non potevamo processarli. Il webhook del cliente non poteva ricevere 500.000 richieste.

**UL**: E LE NOTIFICHE?!

**ME**: Non sono arrivate.

**UL**: E IL CLIENTE?!

**ME**: Non sa che gli ordini sono arrivati.

**UL**: E QUANTI ORDINI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla ordini dal loop
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at BETWEEN '2026-12-19 17:30:00' AND '2026-12-20 08:00:00'"
count
-------
234

# Controlla ordini con notifica
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at BETWEEN '2026-12-19 17:30:00' AND '2026-12-20 08:00:00' AND notification_sent = true"
count
-------
0
```

**ME**: 234 ordini. Nessuna notifica inviata.

**UL**: 234 ORDINI SENZA NOTIFICA?!

**ME**: Sì. Dalle 17:30 di ieri alle 08:00 di oggi.

**UL**: E COSA FACCIAMO?!

**ME**: Chiamo il cliente. E mi scuso. E offro di reinviare le notifiche.

**UL**: E SE SI INCAZZANO?!

**ME**: Allora... mi scuso di più.

UL ha sospirato. Poi ha detto: "Chiama il cliente. E sistema tutto."

E io ho chiamato. E mi sono scusato. E il cliente si è incazzato. Ma ha accettato le scuse. E le notifiche sono state reinviare. E tutto è tornato normale. Quasi. Amen.

---

**Venerdì - 11:00**

Ho chiamato il cliente. Il cliente ha risposto. Era venerdì. Il cliente non era di buon umore.

**CLIENTE**: Pronto?

**ME**: Buongiorno, sono [nome] di [azienda]. Chiamo per un problema con i webhook.

**CLIENTE**: Che problema?

**ME**: Ieri sera abbiamo avuto un problema tecnico. Le notifiche degli ordini non sono arrivate.

**CLIENTE**: NON SONO ARRIVATE?!

**ME**: No. Abbiamo avuto un loop nel sistema. E le notifiche sono andate perse.

**CLIENTE**: ANDATE PERSE?!

**ME**: Sì. Ma abbiamo recuperato gli ordini. E posso reinviare le notifiche.

**CLIENTE**: E QUANTE NOTIFICHE?!

**ME**: 234.

**CLIENTE**: 234 NOTIFICHE PERSE?!

**ME**: Sì. Mi scuso. È stato un errore nostro.

**CLIENTE**: UN ERRORE?!

**ME**: Sì. Un nostro sviluppatore ha configurato male il webhook.

**CLIENTE**: E QUANDO LE RINVIIATE?!

**ME**: Adesso. Subito.

**CLIENTE**: E QUANTO CI VUOLE?!

**ME**: 10 minuti. Forse meno.

**CLIENTE**: E SE NON FUNZIONA?!

**ME**: Allora... mi scuso di più.

Il cliente ha sospirato. Poi ha detto: "Ok. Reinvia le notifiche. E non succeda più."

E io ho reinviato. E le notifiche sono arrivate. E il cliente si è calmato. E tutto è tornato normale. Quasi. Amen.

---

**Sabato - La Riflessione**

Sabato. Ero a casa. Ma non riuscivo a smettere di pensare. Ai webhook. Ai loop. A JN.

Ho aperto il laptop. Ho scritto la guida.

**TERMINALE**:
```
# Guida ai webhook
cat > docs/webhook-best-practices.md << 'EOF'
## Best Practices per i Webhook

### Regola #1: MAI Usare il Proprio URL

Il webhook URL deve essere ESTERNO. Mai il proprio sistema.

```yaml
# MAI così
webhook_url: https://api.company.com/webhook/orders

# SEMPRE così
webhook_url: https://client.example.com/webhook
```

### Regola #2: Valida l'URL

Prima di salvare, verifica che l'URL sia valido e esterno.

```javascript
function validateWebhookUrl(url) {
  const parsed = new URL(url);
  
  // Non deve essere il nostro dominio
  if (parsed.hostname.endsWith('company.com')) {
    throw new Error('Webhook URL cannot be internal');
  }
  
  // Deve essere HTTPS
  if (parsed.protocol !== 'https:') {
    throw new Error('Webhook URL must be HTTPS');
  }
  
  return true;
}
```

### Regola #3: Limita i Retry

I retry sono utili. Ma devono avere un limite.

```javascript
const retryConfig = {
  maxRetries: 3,
  backoff: 'exponential',
  maxBackoff: 30000, // 30 secondi max
  deadletter: true, // Messaggi falliti vanno in deadletter
};
```

### Regola #4: Monitora la Coda

Configura alert per la profondità della coda.

```yaml
groups:
  - name: queue
    rules:
      - alert: QueueDepthHigh
        expr: rabbitmq_queue_messages > 10000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Queue {{ $labels.queue }} has > 10000 messages"

      - alert: QueueDepthCritical
        expr: rabbitmq_queue_messages > 100000
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Queue {{ $labels.queue }} has > 100000 messages"
```

### Regola #5: Usa Circuit Breaker

Se il webhook fallisce troppe volte, smetti di chiamarlo.

```javascript
const circuitBreaker = new CircuitBreaker(webhookCall, {
  failureThreshold: 5,
  resetTimeout: 60000, // 1 minuto
});

circuitBreaker.fire()
  .then(result => console.log('Success', result))
  .catch(err => console.log('Circuit open', err));
```

### Regola #6: Logga con Moderazione

Non loggare ogni webhook. Logga solo errori e campioni.

```javascript
// MAI così
console.log('Webhook sent:', { url, payload, response });

// SEMPRE così
if (response.status >= 400) {
  console.error('Webhook failed:', { url, status: response.status });
}
```

### Regola #7: Testa con URL di Test

Per il testing, usa un URL dedicato. Non l'URL di produzione.

```yaml
# Configurazione per ambiente
development:
  webhook_url: https://webhook.site/test-id
  
staging:
  webhook_url: https://staging.client.example.com/webhook
  
production:
  webhook_url: https://client.example.com/webhook
```
EOF
```

Il TL mi ha scritto su Slack. "Stai lavorando di sabato?"

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Scrivo la guida per i webhook. E configuro i controlli.

**TL**: E JN?

**ME**: JN... lo educo. Lunedì.

**TL**: E i controlli?

**ME**: Aggiungo validazione URL. E alert per la coda. E circuit breaker.

**TL**: Bene. Ora riposa.

**ME**: Sì. Dopo aver aggiunto i test.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di sabato per un bug di venerdì. E stai fixando il processo. E stai educando il junior. E stai proteggendo il sistema. Ma è sabato. E dovresti riposare. Amen."

---

**Lunedì - La Riunione**

Lunedì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che il webhook abbia creato un loop?

**ME**: JN ha configurato il nostro URL invece di quello del cliente.

**UL**: E CHI HA CONFIGURATO IL NOSTRO URL?

**ME**: JN. Per testing.

**UL**: PER TESTING?!

**JN**: Sì. Volevo testare che il webhook funzionasse.

**UL**: E HAI USATO IL NOSTRO URL?!

**JN**: Sì. Non sapevo che avrebbe creato un loop.

**UL**: NON SAPEVI?!

**JN**: No. Pensavo che il nostro webhook non pubblicasse messaggi.

**UL**: E INVECE?!

**JN**: Invece... pubblica messaggi. E il consumer li processa. E chiama il webhook. E il loop continua.

**CTO**: Il problema è che non c'è validazione. E non c'è circuit breaker. E non c'è monitoraggio della coda.

**ME**: Sì. Ho aggiunto tutto. Sabato.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E COSA HAI IMPARATO?

**JN**: A non usare il nostro URL per i webhook.

**CTO**: E COS'ALTRO?

**JN**: A validare l'URL prima di salvarlo.

**CTO**: E COS'ALTRO?

**JN**: A usare URL di test per il testing.

**CTO**: E COS'ALTRO?

**JN**: A pensare prima di configurare.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul loop infinito. E sui 511.221 messaggi persi. Amen.

---

**Lunedì - La Validazione**

Lunedì. Ho aggiunto validazione. Per impedire che succeda di nuovo.

**TERMINALE**:
```
# Aggiungi validazione URL
cat > src/lib/webhook-validator.js << 'EOF'
const ALLOWED_DOMAINS = process.env.WEBHOOK_ALLOWED_DOMAINS?.split(',') || [];

function validateWebhookUrl(url) {
  try {
    const parsed = new URL(url);
    
    // Deve essere HTTPS
    if (parsed.protocol !== 'https:') {
      return { valid: false, error: 'Webhook URL must be HTTPS' };
    }
    
    // Non deve essere il nostro dominio
    const ourDomains = ['company.com', 'api.company.com', 'internal.company.com'];
    if (ourDomains.some(d => parsed.hostname.endsWith(d))) {
      return { valid: false, error: 'Webhook URL cannot be internal' };
    }
    
    // Se c'è una whitelist, deve essere nella whitelist
    if (ALLOWED_DOMAINS.length > 0) {
      if (!ALLOWED_DOMAINS.some(d => parsed.hostname.endsWith(d))) {
        return { valid: false, error: 'Webhook URL not in allowed domains' };
      }
    }
    
    return { valid: true };
  } catch (err) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

module.exports = { validateWebhookUrl };
EOF

# Aggiungi test
cat > src/lib/webhook-validator.test.js << 'EOF'
describe('Webhook Validator', () => {
  it('should reject internal URLs', () => {
    const result = validateWebhookUrl('https://api.company.com/webhook');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('internal');
  });

  it('should reject HTTP URLs', () => {
    const result = validateWebhookUrl('http://client.example.com/webhook');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('HTTPS');
  });

  it('should accept valid external HTTPS URLs', () => {
    const result = validateWebhookUrl('https://client.example.com/webhook');
    expect(result.valid).toBe(true);
  });

  it('should reject invalid URLs', () => {
    const result = validateWebhookUrl('not-a-url');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid URL');
  });
});
EOF

# Esegui test
npm test
PASS  src/lib/webhook-validator.test.js
```

**TL**: Hai aggiunto la validazione?

**ME**: Sì. Controlla che l'URL sia HTTPS. E che non sia interno. E che sia nella whitelist se configurata.

**TL**: E JN?

**ME**: JN non può più configurare il nostro URL.

**TL**: E SE LO FA?!

**ME**: Allora... la validazione fallisce. E il deploy non va.

**TL**: E SE DISABILITA LA VALIDAZIONE?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Validazione: attiva
- Test: passing
- URL interni: bloccati
- HTTP: bloccato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i webhook sono pericolosi. E che i loop infiniti uccidono. E che la validazione salva. E che JN va educato. Amen.

---

**Martedì - Il Circuit Breaker**

Martedì. Ho aggiunto il circuit breaker. Per fermare i loop prima che uccidano.

**TERMINALE**:
```
# Aggiungi circuit breaker
cat > src/lib/circuit-breaker.js << 'EOF'
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.failures = 0;
    this.state = 'CLOSED';
    this.lastFailure = null;
  }

  async fire(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit is OPEN');
      }
    }

    try {
      const result = await this.fn(...args);
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

module.exports = { CircuitBreaker };
EOF

# Aggiungi al webhook consumer
cat > src/consumers/webhook-consumer.js << 'EOF'
const { CircuitBreaker } = require('../lib/circuit-breaker');
const axios = require('axios');

const webhookCall = async (url, payload) => {
  const response = await axios.post(url, payload, { timeout: 10000 });
  return response.data;
};

const breaker = new CircuitBreaker(webhookCall, {
  failureThreshold: 5,
  resetTimeout: 60000,
});

async function processWebhook(message) {
  try {
    const result = await breaker.fire(message.webhook_url, message.payload);
    return { success: true, result };
  } catch (err) {
    if (err.message === 'Circuit is OPEN') {
      console.error('Circuit breaker is OPEN. Webhook calls blocked.');
      return { success: false, error: 'CIRCUIT_OPEN' };
    }
    console.error('Webhook failed:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { processWebhook };
EOF
```

**TL**: Hai aggiunto il circuit breaker?

**ME**: Sì. Se il webhook fallisce 5 volte, si apre. E blocca le chiamate per 1 minuto.

**TL**: E SE È UN LOOP?!

**ME**: Allora... fallisce 5 volte. E si apre. E il loop si ferma.

**TL**: E QUINDI?!

**ME**: E quindi... non arriviamo a 500.000 messaggi.

**TL**: E QUANTI MESSAGGI?!

**ME**: Al massimo 5. Per consumer. Con 3 consumer, 15 messaggi.

**TL**: 15 INVECE DI 500.000?!

**ME**: Sì. Molto meglio.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Circuit breaker: attivo
- Threshold: 5 fallimenti
- Reset: 60 secondi
- Messaggi max: 15

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i circuit breaker salvano. E che i loop vanno fermati. E che la validazione è essenziale. E che JN va educato. Amen.

---

**Mercoledì - Il Monitoraggio**

Mercoledì. Ho aggiunto monitoraggio. Per vedere quando la coda cresce troppo.

**TERMINALE**:
```
# Configura alert per la coda
cat > /etc/prometheus/alerts/queue.yml << 'EOF'
groups:
  - name: queue
    rules:
      - alert: QueueDepthHigh
        expr: rabbitmq_queue_messages > 10000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Queue {{ $labels.queue }} has > 10000 messages"
          description: "Queue {{ $labels.queue }} has {{ $value }} messages. Check consumers."

      - alert: QueueDepthCritical
        expr: rabbitmq_queue_messages > 100000
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Queue {{ $labels.queue }} has > 100000 messages"
          description: "Queue {{ $labels.queue }} has {{ $value }} messages. Immediate action required."

      - alert: QueueRateAnomaly
        expr: rate(rabbitmq_queue_messages[5m]) > 100
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Queue {{ $labels.queue }} growing at {{ $value }} msg/s"
          description: "Queue {{ $labels.queue }} is growing at {{ $value }} messages per second. Possible loop."

      - alert: CircuitBreakerOpen
        expr: circuit_breaker_state{state="open"} == 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Circuit breaker OPEN for {{ $labels.service }}"
          description: "Circuit breaker for {{ $labels.service }} is OPEN. Webhook calls are blocked."
EOF

# Aggiungi metriche
cat > src/lib/queue-metrics.js << 'EOF'
const prometheus = require('prom-client');

const queueDepth = new prometheus.Gauge({
  name: 'rabbitmq_queue_messages',
  help: 'Number of messages in queue',
  labelNames: ['queue'],
});

const circuitBreakerState = new prometheus.Gauge({
  name: 'circuit_breaker_state',
  help: 'Circuit breaker state: 0=CLOSED, 1=OPEN, 2=HALF_OPEN',
  labelNames: ['service'],
});

const webhookCalls = new prometheus.Counter({
  name: 'webhook_calls_total',
  help: 'Total webhook calls',
  labelNames: ['service', 'status'],
});

module.exports = { queueDepth, circuitBreakerState, webhookCalls };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per profondità coda. Alert per rate anomalo. Alert per circuit breaker aperto.

**TL**: E QUANDO ALERTA?!

**ME**: Quando la coda supera 10.000 messaggi. O quando cresce a più di 100 msg/s. O quando il circuit breaker si apre.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che uccidano il sistema.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... il circuit breaker si apre. E il loop si ferma.

**TL**: E È UNA SALVEZZA?!

**ME**: No. È meglio che niente. Ma è meglio prevenire.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Threshold: 10.000 messaggi, 100 msg/s
- Circuit breaker: monitorato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i circuit breaker fermano i loop. E che JN va educato. Amen.

---

**Giovedì - L'Educazione**

Giovedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per venerdì?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che venerdì è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i webhook non chiamano mai se stessi.

**JN**: Mai?

**ME**: Mai. Se devi testare, usa un URL di test. Come webhook.site. O un mock server.

**JN**: Ok.

**ME**: Secondo: i loop infiniti uccidono.

**JN**: Uccidono?

**ME**: Sì. Riempiono le code. E le code riempiono il disco. E il disco muore. E il sistema muore.

**JN**: E come si fermano?

**ME**: Con circuit breaker. E validazione. E monitoraggio.

**JN**: Ok.

**ME**: Terzo: valida sempre l'URL.

**JN**: Sempre?

**ME**: Sempre. Controlla che sia HTTPS. Che non sia interno. Che sia nella whitelist.

**JN**: E se non lo è?

**ME**: Allora... non salvarlo. E non deployarlo.

**JN**: Ok.

**ME**: Quarto: monitora la coda.

**JN**: Monitora?

**ME**: Sì. Se la coda cresce troppo, c'è un problema. E devi saperlo.

**JN**: E come?

**ME**: Con alert. E metriche. E dashboard.

**JN**: Ok.

**ME**: Quinto: se configuri un webhook per testing, cambialo dopo.

**JN**: E SE ME NE DIMENTICO?

**ME**: Allora... ti chiamo. Di venerdì. Alle 08:15.

**JN**: (imbarazzato) Scusa.

**ME**: E la prossima volta, pensa. Prima di configurare un webhook. Pensa a cosa succede se l'URL è sbagliato.

**JN**: E se non so cosa succede?

**ME**: Allora chiedi. Al TL. A me. A qualcuno.

**JN**: E se non c'è nessuno?

**ME**: Allora... non deployare di giovedì sera. E non configurare webhook senza validazione.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Validazione: attiva
- Circuit breaker: attivo
- Monitoraggio: attivo
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E validazione. E circuit breaker. E monitoraggio. E pazienza. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i webhook.

```markdown
## Incident #WEBHOOK-001: Il Webhook Che Ha Inondato La Coda

**Data incident**: Venerdì 19 dicembre 2026, 08:15
**Autore**: JN
**Servizio**: webhook-consumer
**Problema**: Loop infinito nel webhook
**Causa**: URL interno configurato come webhook URL
**Autore del codice**: JN
**Data deploy**: Giovedì 18 dicembre 2026, 17:30
**Tempo in produzione**: ~15 ore
**Messaggi creati**: 511.221
**Messaggi persi**: 511.221
**Notifiche perse**: 234
**Tempo di risoluzione**: 2 ore
**Downtime**: 0
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "511.000 messaggi?!"
**Reazione CTO**: "Validazione + circuit breaker + monitoraggio."
**Soluzione**: Validazione URL + circuit breaker + alert + educazione
**Lezione imparata**: I WEBHOOK VANNO VALIDATI. SEMPRE.

**Regole per i webhook**:
1. MAI usare il proprio URL come webhook.
2. Valida SEMPRE l'URL prima di salvarlo.
3. Usa SEMPRE circuit breaker.
4. Monitora SEMPRE la profondità della coda.
5. Configura SEMPRE alert per rate anomali.
6. Usa SEMPRE URL di test per il testing.
7. Non deployare MAI webhook di venerdì sera.
8. Non configurare MAI webhook senza validazione.
9. I webhook sono pericolosi. Trattali con rispetto. Amen.

**Come validare un URL**:
```javascript
function validateWebhookUrl(url) {
  const parsed = new URL(url);
  
  // Deve essere HTTPS
  if (parsed.protocol !== 'https:') {
    throw new Error('Webhook URL must be HTTPS');
  }
  
  // Non deve essere interno
  if (parsed.hostname.endsWith('company.com')) {
    throw new Error('Webhook URL cannot be internal');
  }
  
  return true;
}
```

**Come configurare circuit breaker**:
```javascript
const breaker = new CircuitBreaker(webhookCall, {
  failureThreshold: 5,
  resetTimeout: 60000,
});
```

**Come configurare alert per la coda**:
```yaml
groups:
  - name: queue
    rules:
      - alert: QueueRateAnomaly
        expr: rate(rabbitmq_queue_messages[5m]) > 100
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Queue growing at abnormal rate"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i webhook sono pericolosi. E che i loop infiniti uccidono. E che la validazione salva. E che i circuit breaker fermano i disastri. E che il monitoraggio è essenziale. E che JN ha dimenticato di cambiare l'URL. E che 511.221 messaggi sono tanti. E che il venerdì non è per le emergenze. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i webhook sono come le armi. Se non sai usarle, fai danni. E se punti al bersaglio sbagliato, colpisci te stesso. E quando colpisci te stesso, il loop inizia. E il loop continua. E la coda si riempie. E il sistema muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il webhook chiamava se stesso." E UL dice: "COM'È POSSIBILE?!" E tu dici: "JN ha configurato il nostro URL." E UL dice: "E PERCHÉ?!" E tu dici: "Per testare." E UL dice: "E L'HA CAMBIATO?!" E tu dici: "No. Se ne è dimenticato." E la verità è che tutti dimenticano. Finché non succede. E quando succede, impari. Impari che i webhook vanno validati. E che i circuit breaker salvano. E che il monitoraggio è essenziale. E che JN va educato. Amen.

---

## Il costo del webhook che ha inondato la coda

| Voce | Valore |
|------|--------|
| Servizio | webhook-consumer |
| Autore | JN |
| Data deploy | 18/12/2026, 17:30 |
| Data incident | 19/12/2026, 08:15 |
| Tempo in produzione | ~15 ore |
| Messaggi creati | 511.221 |
| Messaggi persi | 511.221 |
| Notifiche perse | 234 |
| Tempo di risoluzione | 2 ore |
| Downtime | 0 |
| Venerdì rovinato | 1 |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "511.000 messaggi?!" |
| Reazione CTO | "Validazione + circuit breaker." |
| Soluzione | Validazione + circuit breaker + alert + educazione |
| Lezione imparata | WEBHOOK = VALIDAZIONE + CIRCUIT BREAKER + MONITORAGGIO |
| **Totale** | **511.221 messaggi + 234 notifiche perse + 1 venerdì rovinato + 1 junior educato** |

**Morale**: I webhook sono utili. Ma sono anche pericolosi. Se non li validi, possono creare loop. E i loop riempiono le code. E le code piene uccidono il sistema. E se il sistema muore, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il webhook chiamava se stesso." E UL dice: "COM'È POSSIBILE?!" E tu dici: "JN ha configurato il nostro URL." E UL dice: "E COS'È IL NOSTRO URL?!" E tu dici: "Il nostro webhook." E UL dice: "E PERCHÉ CHIAMAVA SE STESSO?!" E tu dici: "Perché JN voleva testare." E la verità è che tutti vogliono testare. Ma non tutti pensano alle conseguenze. E le conseguenze sono loop infiniti. E code piene. E messaggi persi. E clienti arrabbiati. E venerdì rovinati. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](95-il-certificato-scaduto-che-ha-ucciso-tutto.md) | [Prossima](97-il-secret-che-era-nel-repo-pubblico.md)**
