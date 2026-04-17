# Il Retry Che Ha Peggiorato Tutto

**Data**: 07/11/2026

**[Home](../index.md) | [Precedente](89-il-cron-job-che-ha-girato-due-volte.md)]**

---

C'è una verità nell'IT che tutti conoscono ma nessuno rispetta: i retry sono una buona idea. Se una richiesta fallisce, riprova. Se un servizio non risponde, riprova. Se un timeout scade, riprova. È resilienza. È robustezza. È best practice. Ma i retry sono anche un'arma carica. E se non li configuri bene, sparano. E se sparano, colpiscono. E se colpiscono, il sistema crolla. E se il sistema crolla, UL chiama. E se UL chiama, il tuo venerdì sera è finito. E tutto per un retry. Un fottuto retry con exponential backoff sbagliato. Amen.

![](../../img/server.jpg)

---

**Venerdì - 17:30**

Era venerdì. Le 17:30. Stavo per staccare. Il weekend era a portata di mano.

Poi è arrivato l'alert.

**ALERT**: API response time > 30 seconds

**ME**: 30 secondi?!

**TL**: È tanto.

**ME**: È tantissimo.

**TL**: E cosa è successo?

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla metriche API
kubectl top pods -l app=api
NAME                    CPU(cores)   MEMORY(bytes)
api-7d9f4-abc12         950m         2Gi
api-7d9f4-def34         980m         1.9Gi
api-7d9f4-ghi56         920m         2.1Gi

# Controlla richieste
kubectl logs -l app=api --since=10m | grep -i "timeout" | wc -l
847

# Controlla errori
kubectl logs -l app=api --since=10m | grep -i "error" | tail -10
2026-11-06 17:32:45 ERROR: Connection refused to payment-service:443
2026-11-06 17:32:46 ERROR: Retry 1/5 failed: Connection refused
2026-11-06 17:32:47 ERROR: Retry 2/5 failed: Connection refused
2026-11-06 17:32:48 ERROR: Retry 3/5 failed: Connection refused
2026-11-06 17:32:49 ERROR: Retry 4/5 failed: Connection refused
2026-11-06 17:32:50 ERROR: Retry 5/5 failed: Connection refused
```

**ME**: Il payment service è down. E l'API sta facendo retry.

**TL**: Retry?

**ME**: Sì. 5 retry per ogni richiesta.

**TL**: E QUANTI SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta richieste al secondo
kubectl logs -l app=api --since=1m | grep "incoming request" | wc -l
2340

# Richieste al secondo
2340 / 60 = 39 req/s

# Con 5 retry ognuna
39 × 5 = 195 richieste/s al payment service
```

**ME**: 39 richieste al secondo. Con 5 retry ognuna. Sono 195 richieste al secondo al payment service.

**TL**: E IL PAYMENT SERVICE?!

**ME**: È down.

**TL**: E QUINDI?!

**ME**: E quindi... l'API bombarda il payment service di retry.

**TL**: E IL PAYMENT SERVICE NON RIESCE A RIALZARSI?!

**ME**: No. Perché ogni volta che prova a rispondere, arriva un'altra ondata di retry.

**TL**: E QUINDI?!

**ME**: E quindi... il retry sta peggiorando tutto.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- API: 39 req/s
- Retry: 5 per richiesta
- Payment service: bombardato
- Risultato: cascata di errori

E tutto era chiaro. Il retry era configurato male. E stava uccidendo il sistema. E il mio venerdì era finito. Amen.

---

**Venerdì - 17:45**

Ho chiamato JN. JN ha risposto.

**ME**: Hai configurato i retry sul payment service?

**JN**: Sì. Per resilienza.

**ME**: E QUANTI RETRY?!

**JN**: 5. Con exponential backoff.

**ME**: E QUANTO È IL BACKOFF?!

**JN**: 100ms. Raddoppia ogni retry.

**ME**: E QUINDI?!

**JN**: Quindi... 100ms, 200ms, 400ms, 800ms, 1.6s.

**ME**: E IL TIMEOUT?!

**JN**: 30 secondi per richiesta.

**TL**: E QUANTE RICHIESTE CONTEMPORANEE?!

**JN**: Non lo so. Il connection pool è 100.

**ME**: 100 CONNESSIONI?!

**JN**: Sì. Per alta disponibilità.

**ME**: E SE TUTTE LE 100 CONNESSIONI FANNO RETRY?!

**JN**: Ah.

**ME**: AH?!

**JN**: Non ci ho pensato.

**ME**: NON CI HAI PENSATO?!

**JN**: No. Pensavo che... non so cosa pensavo.

**ME**: PENSAVI CHE NON SAREBBE SUCCESSO?!

**JN**: Sì. O no. Non lo so.

**ME**: E ORA IL PAYMENT SERVICE È DOWN E L'API LO STA BOMBARDANDO!

**JN**: Oh.

**ME**: OH?!

**JN**: Scusa.

**ME**: SCUSA?! I CLIENTI NON POSSONO PAGARE!

**JN**: E... cosa facciamo?

**ME**: DISABILITO I RETRY! E RIPIGLIO IL PAYMENT SERVICE!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA PENSA A COSA SUCCEDE SE TUTTI I RETRY PARTONO INSIEME!

**JN**: Ok.

JN ha riattaccato. O forse ho riattaccato io. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Retry: 5 per richiesta
- Backoff: 100ms iniziale
- Connection pool: 100
- Risultato: bombardamento

E la lezione era chiara. I retry senza limiti sono un disastro. E il payment service era a terra. E il venerdì sera era rovinato. Amen.

---

**Venerdì - 18:00**

Ho disabilitato i retry. Ho salvato il payment service.

**TERMINALE**:
```
# Disabilita retry via feature flag
curl -X POST https://flags.produzione.com/api/v1/flags/payment-retry \
  -H "Authorization: Bearer $FLAG_TOKEN" \
  -d '{"enabled": false}'

# Riavvia payment service
kubectl rollout restart deployment/payment-service

# Verifica
kubectl logs -l app=payment --since=2m | grep -i "ready"
2026-11-06 18:05:12 INFO: Payment service ready on port 443
```

**ME**: Retry disabilitati. Payment service riavviato.

**TL**: E ora?

**ME**: Ora il payment service può rispondere.

**TL**: E I CLIENTI?!

**ME**: I clienti... possono pagare di nuovo.

**TL**: E LE RICHIESTE FALLITE?!

**ME**: Le richieste fallite... sono fallite.

**TL**: E QUANTE SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta richieste fallite
kubectl logs -l app=api --since=30m | grep "payment failed" | wc -l
1247

# Valore medio transazione
SELECT AVG(amount) FROM payments WHERE date >= '2026-11-06';
AVG: 87.50€

# Valore totale perso
1247 × 87.50€ = 109.112,50€
```

**ME**: 1247 transazioni fallite. 109.000 euro.

**TL**: 109.000 EURO?!

**ME**: Sì. Valore totale.

**TL**: E I CLIENTI?!

**ME**: I clienti... hanno ricevuto errore.

**TL**: E HANNO RIPROVATO?!

**ME**: Spero di sì.

**TL**: E SE NON HANNO RIPROVATO?!

**ME**: Allora... abbiamo perso le vendite.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Transazioni fallite: 1247
- Valore: 109.000€
- Retry: disabilitati
- Payment service: ripristinato

E tutto sembrava risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché le cose che sembrano risolte le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Venerdì - 19:00**

Ho guardato il codice. Ho capito il problema.

**TERMINALE**:
```
git log --oneline --since="1 week" --all -- "*payment*"
b4c5d6e JN: "Add retry logic for payment service resilience"

git show b4c5d6e -- src/services/payment.js
+const retryPayment = async (payment, retries = 5) => {
+  const backoff = 100 * Math.pow(2, retries - 5);  // 100ms, 200ms, 400ms...
+  for (let i = 0; i < retries; i++) {
+    try {
+      return await callPaymentService(payment);
+    } catch (err) {
+      console.log(`Retry ${i+1}/${retries} failed`);
+      await sleep(backoff * Math.pow(2, i));
+    }
+  }
+  throw new Error("Payment failed after retries");
+};
```

**ME**: Il backoff è sbagliato.

**TL**: Sbagliato?

**ME**: Sì. Il backoff base è 100ms. Ma moltiplica per 2^i. Quindi:
- Retry 1: 100ms × 2^0 = 100ms
- Retry 2: 100ms × 2^1 = 200ms
- Retry 3: 100ms × 2^2 = 400ms
- Retry 4: 100ms × 2^3 = 800ms
- Retry 5: 100ms × 2^4 = 1.6s

**TL**: E QUINDI?!

**ME**: E quindi... il backoff è troppo breve. I retry partono troppo vicini.

**TL**: E IL PROBLEMA?!

**ME**: Il problema è che quando il payment service va down, tutte le richieste fanno retry insieme. E il payment service non ha tempo di riprendersi.

**TL**: E QUANTE RICHIESTE?!

**ME**: 39 al secondo. Con 5 retry ognuna. Sono 195 richieste al secondo che bombardano il payment service.

**TL**: E IL PAYMENT SERVICE?!

**ME**: Il payment service non regge. E va in crash loop.

**TL**: E QUINDI?!

**ME**: E quindi... il retry sta uccidendo il servizio che dovrebbe proteggere.

**TL**: E JN NON HA PENSAto A QUESTO?!

**ME**: No. JN ha pensato alla resilienza. Ma non al thundering herd.

**TL**: THUNDERING HERD?!

**ME**: Sì. Quando tutti i client fanno retry insieme. E schiacciano il server.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Backoff: troppo breve
- Retry: troppo vicini
- Thundering herd: attivo
- Risultato: disastro

E tutto era chiaro. JN aveva configurato i retry. Ma non aveva pensato al thundering herd. E il sistema era crollato. E il venerdì era rovinato. Amen.

---

**Sabato - La Riflessione**

Sabato. Ero a casa. Ma non riuscivo a smettere di pensare. Ai retry. Al backoff. Al thundering herd.

Ho aperto il laptop. Ho scritto la fix.

**TERMINALE**:
```
# Fix del retry con jitter
cat > /tmp/fix-payment.js << 'EOF'
const retryPayment = async (payment, retries = 3) => {
  const baseBackoff = 1000;  // 1 secondo, non 100ms
  const maxBackoff = 30000;  // 30 secondi max
  
  for (let i = 0; i < retries; i++) {
    try {
      return await callPaymentService(payment);
    } catch (err) {
      console.log(`Retry ${i+1}/${retries} failed`);
      
      // Exponential backoff con jitter
      const backoff = Math.min(baseBackoff * Math.pow(2, i), maxBackoff);
      const jitter = Math.random() * backoff * 0.5;  // 0-50% jitter
      await sleep(backoff + jitter);
    }
  }
  throw new Error("Payment failed after retries");
};
EOF

# Commit
git checkout -b fix/retry-thundering-herd
git add src/services/payment.js
git commit -m "Fix: add jitter and increase backoff for retry logic"
git push origin fix/retry-thundering-herd
```

**TL**: (su Slack) Stai lavorando di sabato?

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Fixo il retry. Aggiungo jitter. Aumento il backoff.

**TL**: E JN?

**ME**: JN... lo educo. Lunedì.

**TL**: E il circuit breaker?

**ME**: Il circuit breaker... lo aggiungo.

**TL**: E COME FUNZIONA?

**ME**: Se il payment service fallisce troppe volte, il circuit breaker si apre. E smette di chiamare. Per un po'.

**TL**: E QUANTO TEMPO?!

**ME**: 30 secondi. Poi prova di nuovo.

**TL**: E SE FUNZIONA?!

**ME**: Allora il circuit si chiude. E riprende a chiamare.

**TL**: E SE NON FUNZIONA?!

**ME**: Allora il circuit resta aperto. E i clienti vedono "servizio non disponibile".

**TL**: E È MEGLIO?!

**ME**: Sì. È meglio di bombardare il servizio con retry.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di sabato per un bug di venerdì. E stai fixando il processo. E stai educando il junior. E stai proteggendo il sistema. Ma è sabato. E dovresti riposare. Amen."

---

**Lunedì - La Riunione**

Lunedì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che i retry abbiano peggiorato tutto?

**ME**: Il backoff era troppo breve. E non c'era jitter. E tutti i client hanno fatto retry insieme.

**UL**: E CHI HA CONFIGURATO I RETRY?

**ME**: JN.

**UL**: E PERCHÉ IL BACKOFF ERA TROPPO BREVE?

**JN**: Pensavo che 100ms fosse un buon valore.

**UL**: 100ms?!

**JN**: Sì. Per resilienza.

**UL**: E IL THUNDERING HERD?!

**JN**: Non sapevo cosa fosse.

**UL**: NON SAPEVI COSA FOSSE?!

**JN**: No. Non l'avevo mai sentito.

**UL**: E HAI CONFIGURATO I RETRY SENZA SAPERE DEL THUNDERING HERD?!

**JN**: Sì. Scusa.

**CTO**: Il problema è che non c'era circuit breaker. E non c'era jitter. E il backoff era troppo breve. E ora mettiamo tutto.

**ME**: Sì.

**CTO**: E chi lo fa?

**ME**: Lo faccio io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E COSA HAI IMPARATO?

**JN**: A non configurare retry senza pensare al thundering herd.

**CTO**: E COS'ALTRO?

**JN**: A usare backoff più lunghi. E aggiungere jitter.

**CTO**: E COS'ALTRO?

**JN**: A usare circuit breaker per proteggere i servizi.

**CTO**: E COS'ALTRO?

**JN**: A non dare per scontato che i retry migliorino le cose.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul processo rotto. E sul venerdì rovinato. Amen.

---

**Lunedì - Il Circuit Breaker**

Lunedì. Ho implementato il circuit breaker. Per proteggere il payment service.

**TERMINALE**:
```
# Implementa circuit breaker
cat > src/lib/circuit-breaker.js << 'EOF'
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;  // 30 secondi
    this.state = 'CLOSED';  // CLOSED, OPEN, HALF_OPEN
    this.failures = 0;
    this.lastFailure = null;
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
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

module.exports = CircuitBreaker;
EOF

# Usa circuit breaker nel payment service
cat > src/services/payment.js << 'EOF'
const CircuitBreaker = require('../lib/circuit-breaker');

const paymentBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 30000
});

const retryPayment = async (payment, retries = 3) => {
  const baseBackoff = 1000;
  const maxBackoff = 30000;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await paymentBreaker.call(() => callPaymentService(payment));
    } catch (err) {
      if (err.message === 'Circuit breaker is OPEN') {
        throw new Error('Payment service unavailable');
      }
      
      const backoff = Math.min(baseBackoff * Math.pow(2, i), maxBackoff);
      const jitter = Math.random() * backoff * 0.5;
      await sleep(backoff + jitter);
    }
  }
  throw new Error("Payment failed after retries");
};
EOF
```

**TL**: Hai implementato il circuit breaker?

**ME**: Sì.

**TL**: E come funziona?

**ME**: Se il payment service fallisce 5 volte, il circuit si apre. E smette di chiamare per 30 secondi.

**TL**: E DOPO 30 SECONDI?

**ME**: Prova una richiesta. Se funziona, il circuit si chiude. Se fallisce, resta aperto.

**TL**: E IL JITTER?

**ME**: Il jitter randomizza il backoff. Così i retry non sono tutti insieme.

**TL**: E QUANTO È IL BACKOFF?

**ME**: 1 secondo base. Raddoppia ogni retry. Max 30 secondi.

**TL**: E QUANTI RETRY?

**ME**: 3. Non 5.

**TL**: E PERCHÉ 3?

**ME**: Perché 5 è troppo. Se fallisce 3 volte, probabilmente il servizio è down.

**TL**: E QUINDI?

**ME**: E quindi... smettiamo di bombardarlo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Circuit breaker: implementato
- Threshold: 5 fallimenti
- Reset timeout: 30 secondi
- Retry: 3
- Backoff: 1s base, exponential con jitter

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i retry sono pericolosi. E che il thundering herd uccide. E che il circuit breaker salva. E che il jitter è essenziale. E che JN va educato. Amen.

---

**Martedì - I Test**

Martedì. Ho aggiunto test. Per il circuit breaker. E per i retry.

**TERMINALE**:
```
# Test per circuit breaker
cat > src/lib/circuit-breaker.test.js << 'EOF'
describe('CircuitBreaker', () => {
  it('should start in CLOSED state', () => {
    const breaker = new CircuitBreaker();
    expect(breaker.state).toBe('CLOSED');
  });

  it('should open after threshold failures', async () => {
    const breaker = new CircuitBreaker({ failureThreshold: 3 });
    
    for (let i = 0; i < 3; i++) {
      try {
        await breaker.call(() => Promise.reject(new Error('fail')));
      } catch (e) {}
    }
    
    expect(breaker.state).toBe('OPEN');
  });

  it('should reject calls when OPEN', async () => {
    const breaker = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 10000 });
    
    try {
      await breaker.call(() => Promise.reject(new Error('fail')));
    } catch (e) {}
    
    await expect(breaker.call(() => Promise.resolve('ok')))
      .rejects.toThrow('Circuit breaker is OPEN');
  });

  it('should close after successful call in HALF_OPEN', async () => {
    const breaker = new CircuitBreaker({ failureThreshold: 1, resetTimeout: 0 });
    
    try {
      await breaker.call(() => Promise.reject(new Error('fail')));
    } catch (e) {}
    
    breaker.state = 'HALF_OPEN';
    await breaker.call(() => Promise.resolve('ok'));
    
    expect(breaker.state).toBe('CLOSED');
  });
});
EOF

# Test per retry con jitter
cat > src/services/payment.test.js << 'EOF'
describe('retryPayment', () => {
  it('should retry with exponential backoff', async () => {
    const mock = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce({ success: true });
    
    const result = await retryPayment({}, 3);
    expect(result).toEqual({ success: true });
    expect(mock).toHaveBeenCalledTimes(3);
  });

  it('should fail after max retries', async () => {
    const mock = jest.fn().mockRejectedValue(new Error('fail'));
    
    await expect(retryPayment({}, 3)).rejects.toThrow('Payment failed');
    expect(mock).toHaveBeenCalledTimes(3);
  });

  it('should add jitter to backoff', async () => {
    const start = Date.now();
    
    try {
      await retryPayment({}, 1);
    } catch (e) {}
    
    const elapsed = Date.now() - start;
    // Con jitter, il backoff dovrebbe essere tra 1000ms e 1500ms
    expect(elapsed).toBeGreaterThanOrEqual(1000);
    expect(elapsed).toBeLessThanOrEqual(2000);
  });
});
EOF

# Esegui test
npm test
PASS  src/lib/circuit-breaker.test.js
PASS  src/services/payment.test.js
```

**TL**: Hai aggiunto i test?

**ME**: Sì. Per il circuit breaker e per i retry.

**TL**: E cosa testano?

**ME**: Testano che il circuit si apra dopo i fallimenti. E che si chiuda dopo il successo. E che i retry abbiano jitter.

**TL**: E JN?

**ME**: JN deve far passare questi test prima di mergiare.

**TL**: E SE I TEST NON PASSANO?

**ME**: Allora non può mergiare.

**TL**: E SE JN AGGIUNGE UN NUOVO CASO?

**ME**: Allora deve aggiungere un test.

**TL**: E SE NON LO FA?

**ME**: Allora il code review lo richiede.

**TL**: E SE IL REVIEWER NON LO NOTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: passing
- Circuit breaker: testato
- Retry: testato
- Jitter: verificato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i test salvano. E che il thundering herd uccide. E che il venerdì non è per configurare retry. E che i retry sono armi cariche. E che i junior vanno educati. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Non con rabbia. Con pazienza.

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

**ME**: Quattro cose. Primo: i retry sono pericolosi.

**JN**: Pericolosi?

**ME**: Sì. Se non li configuri bene, peggiorano le cose.

**JN**: Ok.

**ME**: Secondo: il thundering herd è un problema reale.

**JN**: Thundering herd?

**ME**: Sì. Quando tutti i client fanno retry insieme. E schiacciano il server.

**JN**: E come si evita?

**ME**: Con il jitter. E con backoff più lunghi.

**JN**: Ok.

**ME**: Terzo: il circuit breaker è essenziale.

**JN**: Circuit breaker?

**ME**: Sì. Se il servizio fallisce troppe volte, smetti di chiamare. Dagli tempo di riprendersi.

**JN**: Ok.

**ME**: Quarto: i retry non sono sempre la risposta.

**JN**: E COSA È LA RISPOSTA?

**ME**: A volte la risposta è: fallisci velocemente. E mostra un errore chiaro.

**JN**: Ma... non è meglio riprovare?

**ME**: A volte sì. A volte no. Se il servizio è down, riprovare lo uccide.

**JN**: E QUINDI?

**ME**: E quindi... pensa. Prima di configurare retry. Pensa a cosa succede se tutti i client fanno retry insieme.

**JN**: E se non so cosa succede?

**ME**: Allora chiedi. Al TL. A me. A qualcuno.

**JN**: E se non c'è nessuno?

**ME**: Allora... non deployare di venerdì.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Circuit breaker: attivo
- Retry: configurati bene
- Jitter: aggiunto
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E test. E circuit breaker. E jitter. E pazienza. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio. Per vedere quando il circuit breaker si apre.

**TERMINALE**:
```
# Aggiungi metriche per circuit breaker
cat > src/lib/circuit-breaker.js << 'EOF'
const prometheus = require('prom-client');

const circuitState = new prometheus.Gauge({
  name: 'circuit_breaker_state',
  help: 'Circuit breaker state: 0=CLOSED, 1=HALF_OPEN, 2=OPEN',
  labelNames: ['service']
});

const circuitFailures = new prometheus.Counter({
  name: 'circuit_breaker_failures_total',
  help: 'Total failures recorded by circuit breaker',
  labelNames: ['service']
});

class CircuitBreaker {
  constructor(options = {}) {
    this.service = options.service || 'unknown';
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailure = null;
    this.updateMetrics();
  }

  updateMetrics() {
    const stateValue = this.state === 'CLOSED' ? 0 : this.state === 'HALF_OPEN' ? 1 : 2;
    circuitState.set({ service: this.service }, stateValue);
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
    this.updateMetrics();
  }

  onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    circuitFailures.inc({ service: this.service });
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      this.updateMetrics();
    }
  }
}
EOF

# Configura alert per circuit breaker aperto
cat > /etc/prometheus/alerts/circuit-breaker.yml << 'EOF'
groups:
  - name: circuit_breaker
    rules:
      - alert: CircuitBreakerOpen
        expr: circuit_breaker_state == 2
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Circuit breaker OPEN for {{ $labels.service }}"
          description: "The circuit breaker for {{ $labels.service }} has been open for more than 1 minute."
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Con metriche Prometheus e alert.

**TL**: E cosa monitora?

**ME**: Lo stato del circuit breaker. E il numero di fallimenti.

**TL**: E QUANDO ALERTA?

**ME**: Quando il circuit è aperto per più di 1 minuto.

**TL**: E QUANDO SI APRE?

**ME**: Quando il servizio fallisce 5 volte.

**TL**: E QUINDI?

**ME**: E quindi... sappiamo quando qualcosa non va.

**TL**: E SE IL CIRCUIT SI APRE SPESSO?

**ME**: Allora... il servizio ha problemi. E dobbiamo indagare.

**TL**: E SE NON LO SAPPIAMO?

**ME**: Allora... i clienti vedono errori. E noi non sappiamo perché.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Metriche: attive
- Alert: configurato
- Threshold: 1 minuto
- Servizio: monitorato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i circuit breaker vanno osservati. E che JN va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i retry.

```markdown
## Incident #RETRY-001: Il Retry Che Ha Peggiorato Tutto

**Data incident**: Venerdì 6 novembre 2026, 17:30
**Autore**: JN
**Servizio**: payment-service
**Problema**: Thundering herd causato da retry mal configurati
**Causa**: Backoff troppo breve, nessun jitter, nessun circuit breaker
**Autore del codice**: JN
**Data deploy**: Giovedì 5 novembre 2026, 16:30
**Tempo in produzione**: ~24 ore
**Transazioni fallite**: 1247
**Valore transazioni**: 109.000€
**Clienti colpiti**: 1247
**Ticket aperti**: 34
**Chiamate ricevute**: 18
**Tempo di risoluzione**: 30 minuti
**Downtime**: 0 (retry disabilitati)
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "I retry hanno peggiorato tutto?!"
**Reazione CTO**: "Circuit breaker + jitter + backoff lungo."
**Soluzione**: Circuit breaker + jitter + backoff 1s base + educazione
**Lezione imparata**: I RETRY DEVONO ESSERE CONFIGURATI CON CURA.

**Regole per i retry**:
1. Il backoff base deve essere almeno 1 secondo.
2. Il backoff deve essere exponential.
3. Il backoff deve avere un massimo (es. 30 secondi).
4. Il backoff deve avere jitter per evitare thundering herd.
5. Il numero di retry deve essere limitato (3-5).
6. Il circuit breaker deve essere usato per proteggere i servizi.
7. Il circuit breaker deve avere una threshold di fallimenti.
8. Il circuit breaker deve avere un reset timeout.
9. I retry devono essere monitorati.
10. I retry non sono sempre la risposta.

**Come configurare retry correttamente**:
```javascript
const retry = async (fn, retries = 3) => {
  const baseBackoff = 1000;  // 1 secondo
  const maxBackoff = 30000;  // 30 secondi
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      const backoff = Math.min(baseBackoff * Math.pow(2, i), maxBackoff);
      const jitter = Math.random() * backoff * 0.5;  // 0-50% jitter
      await sleep(backoff + jitter);
    }
  }
  throw new Error("Max retries exceeded");
};
```

**Come implementare circuit breaker**:
```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED';
    this.failures = 0;
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
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
```

**Come configurare alert per circuit breaker**:
```yaml
groups:
  - name: circuit_breaker
    rules:
      - alert: CircuitBreakerOpen
        expr: circuit_breaker_state == 2
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Circuit breaker OPEN for {{ $labels.service }}"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i retry sono pericolosi. E che il thundering herd uccide. E che il jitter salva. E che il circuit breaker è essenziale. E che il backoff deve essere lungo. E che JN non sapeva del thundering herd. E che 1247 transazioni sono tante. E che 109.000 euro sono tanti. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i retry sono come le medicine. La dose giusta cura. La dose sbagliata uccide. E se non hai jitter, e non hai circuit breaker, e non hai backoff lungo, la dose è sbagliata. E il sistema muore. E i clienti non pagano. E UL chiama. E tu rispondi. E dici: "I retry hanno peggiorato tutto." E UL dice: "COM'È POSSIBILE?!" E tu dici: "Non c'era jitter." E UL dice: "E COS'È IL JITTER?!" E tu dici: "Randomizzazione del backoff per evitare thundering herd." E UL dice: "E COS'È IL THUNDERING HERD?!" E tu dici: "Quando tutti i client fanno retry insieme." E UL dice: "E PERCHÉ NON LO SAPEVAMO?!" E tu dici: "Perché JN non lo sapeva." E la verità è che nessuno lo sa. Finché non succede. E quando succede, impari. Impari che i retry vanno configurati con cura. E che il jitter è essenziale. E che il circuit breaker salva. E che il backoff deve essere lungo. E che il venerdì non è per configurare retry. Amen.

---

## Il costo del retry che ha peggiorato tutto

| Voce | Valore |
|------|--------|
| Servizio | payment-service |
| Autore | JN |
| Data deploy | 05/11/2026, 16:30 |
| Data incident | 06/11/2026, 17:30 |
| Tempo in produzione | ~24 ore |
| Transazioni fallite | 1247 |
| Valore transazioni | 109.000€ |
| Clienti colpiti | 1247 |
| Ticket aperti | 34 |
| Chiamate ricevute | 18 |
| Tempo risoluzione | 30 minuti |
| Downtime | 0 (retry disabilitati) |
| Venerdì rovinato | 1 |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "I retry hanno peggiorato tutto?!" |
| Reazione CTO | "Circuit breaker + jitter + backoff lungo." |
| Soluzione | Circuit breaker + jitter + backoff 1s + educazione |
| Lezione imparata | RETRY = JITTER + CIRCUIT BREAKER + BACKOFF LUNGO |
| **Totale** | **1247 transazioni + 109.000€ + 34 ticket + 1 venerdì rovinato + 1 junior educato** |

**Morale**: I retry sono una buona idea. Ma sono anche un'arma carica. E se non li configuri bene, sparano. E se sparano, colpiscono il servizio che dovrebbero proteggere. E il servizio muore. E i clienti non pagano. E UL chiama. E tu rispondi. E dici: "Era per resilienza." E UL dice: "E HA UCCISO IL SERVIZIO?!" E tu dici: "Sì. Perché non c'era jitter." E UL dice: "E COS'È IL JITTER?!" E tu dici: "Randomizzazione del backoff." E UL dice: "E PERCHÉ NON C'ERA?!" E tu dici: "Non ci abbiamo pensato." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, impari. Impari che i retry vanno configurati con cura. E che il jitter è essenziale. E che il circuit breaker salva. E che il backoff deve essere lungo. E che il thundering herd è reale. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](89-il-cron-job-che-ha-girato-due-volte.md)]**
