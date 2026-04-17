# Il Deploy del Venerdì Pomeriggio

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-password-che-scade-sempre-di-venerdi.md)**

---

C'è una regola non scritta nel mondo IT: non si fa mai il deploy di venerdì pomeriggio. Mai. È una regola semplice. È una regola chiara. È una regola che tutti conoscono. E che tutti violano. Sempre. Perché c'è sempre un motivo. C'è sempre un'urgenza. C'è sempre un cliente che vuole la feature per il weekend. E così, venerdì alle 17:30, qualcuno fa il deploy. E venerdì alle 18:00, qualcosa si rompe. E venerdì alle 18:30, tutti sono ancora in ufficio. E sabato mattina alle 03:00, qualcuno sta ancora fixando. E lunedì mattina, UL chiede: "Perché avete fatto il deploy di venerdì?" E tu rispondi: "Perché era urgente." E UL dice: "E ora è urgente fixarlo." E tu dici: "Lo so." E UL dice: "E la prossima volta?" E tu dici: "La prossima volta non facciamo il deploy di venerdì." E UL dice: "Bene." E il venerdì dopo, qualcuno fa il deploy. Sempre. Amen.

![](../../img/deploy.jpg)

---

**Venerdì - 17:15**

Era venerdì. Le 17:15. Il weekend era vicino. Il caffè era finito. La motivazione era zero.

Poi è arrivato il messaggio.

**PM**: Abbiamo bisogno del deploy per stasera.

**ME**: Stasera?!

**PM**: Sì. Il cliente vuole la feature per il weekend.

**ME**: Ma è venerdì. Alle 17:15.

**PM**: Sì. E quindi?

**ME**: E quindi non si fa il deploy di venerdì.

**PM**: Ma è urgente.

**ME**: È sempre urgente.

**PM**: Ma il cliente...

**ME**: Il cliente può aspettare lunedì.

**PM**: No. Il cliente vuole la feature per il weekend.

**ME**: E CHE SE NE FA DEL WEEKEND?!

**PM**: Non lo so. Ma la vuole.

**ME**: E SE SI ROMPE?!

**PM**: Non si rompe.

**ME**: SI ROMPE SEMPRE!

**PM**: Ma questa volta no.

**ME**: OGNI VOLTA DICONO "QUESTA VOLTA NO"!

**PM**: Ma JN ha testato tutto.

**ME**: JN?!

**PM**: Sì. Ha fatto i test.

**ME**: JN HA FATTO I TEST?!

**PM**: Sì.

**ME**: E QUALI TEST?!

**PM**: Non lo so. Ma ha detto che funziona.

**ME**: E TU GLI CREDI?!

**PM**: Sì.

**ME**: E SE SBAGLIA?!

**PM**: Non sbaglia.

**ME**: SBAGLIA SEMPRE!

**PM**: Ma questa volta...

**ME**: QUESTA VOLTA È COME TUTTE LE ALTRE VOLTE!

Il PM mi ha guardato. Io guardavo il PM. Il PM guardava il telefono. Il telefono mostrava:
- Ora: 17:18
- Giorno: Venerdì
- Deploy: richiesto
- Motivo: urgente
- Probabilità di disastro: 99.9%

E la decisione era chiara. Non fare il deploy. Ma la decisione non spettava a me. Spettava a UL. E UL aveva già approvato. Amen.

---

**Venerdì - 17:30**

Ho chiamato UL. UL ha risposto. Era venerdì. UL voleva andare a casa. Come tutti.

**UL**: Sì?

**ME**: Il PM vuole fare il deploy.

**UL**: E quindi?

**ME**: È venerdì. Alle 17:30.

**UL**: E quindi?

**ME**: E quindi non si fa il deploy di venerdì.

**UL**: Ma il cliente vuole la feature.

**ME**: Il cliente può aspettare.

**UL**: No. Il cliente è importante.

**ME**: E SE SI ROMPE?!

**UL**: Non si rompe.

**ME**: SI ROMPE SEMPRE!

**UL**: Ma JN ha testato.

**ME**: JN?!

**UL**: Sì.

**ME**: E QUALI TEST?!

**UL**: Non lo so. Ma ha detto che funziona.

**ME**: E TU GLI CREDI?!

**UL**: Sì.

**ME**: E SE SBAGLIA?!

**UL**: Allimenti lo fixi.

**ME**: IO?!

**UL**: Sì. Tu.

**ME**: MA È VENERDÌ!

**UL**: E quindi?

**ME**: E QUINDI VOGLIO ANDARE A CASA!

**UL**: E QUINDI FAI IL DEPLOY VELOCE. E POI VAI A CASA.

**ME**: E SE SI ROMPE?!

**UL**: NON SI ROMPE!

**ME**: SI ROMPE SEMPRE!

**UL**: ALLORA NON LO FARE ROMPERE!

UL ha riattaccato. Io guardavo il telefono. Il telefono mostrava:
- Ora: 17:32
- Giorno: Venerdì
- Deploy: approvato
- Responsabile: IO
- Probabilità di disastro: 100%

E la decisione era presa. Fare il deploy. E incrociare le dita. E sperare. E sapere che non serve a nulla sperare. Perché il deploy di venerdì si rompe sempre. Amen.

---

**Venerdì - 17:45**

Ho fatto il deploy. Con JN. Che era "sicuro" che funzionasse.

**TERMINALE**:
```
# Build
npm run build
> project@1.0.0 build
> webpack --mode production
✓ Built in 47s

# Test
npm test
> project@1.0.0 test
> jest
PASS src/tests/checkout.test.js
PASS src/tests/payment.test.js
PASS src/tests/user.test.js
Test Suites: 3 passed, 3 total
Tests:       47 passed, 47 total

# Deploy
kubectl apply -f k8s/production.yaml
deployment.apps/checkout-service configured
deployment.apps/payment-service configured
deployment.apps/user-service configured
service/checkout-service unchanged
service/payment-service unchanged
service/user-service unchanged

# Verifica
kubectl rollout status deployment/checkout-service -w
deployment "checkout-service" successfully rolled out
kubectl rollout status deployment/payment-service -w
deployment "payment-service" successfully rolled out
kubectl rollout status deployment/user-service -w
deployment "user-service" successfully rolled out
```

**JN**: Vedi? Funziona!

**ME**: Aspetta.

**JN**: Cosa?

**ME**: Aspetta. Sempre aspetta.

**TERMINALE**:
```
# Controlla pod
kubectl get pods -l app=checkout-service
NAME                               READY   STATUS    RESTARTS   AGE
checkout-service-abc123-1         1/1     Running   0          2m

# Controlla log
kubectl logs -l app=checkout-service --tail=20
2027-01-16 17:47:00 INFO: Service started
2027-01-16 17:47:01 INFO: Connected to database
2027-01-16 17:47:02 INFO: Connected to cache
2027-01-16 17:47:03 INFO: Ready to accept requests

# Controlla health check
curl -s http://checkout-service:8080/health
{"status": "UP", "checks": {"database": true, "cache": true}, "timestamp": "2027-01-16T17:47:00Z"}
```

**JN**: Vedi? Tutto verde!

**ME**: Sì. Per ora.

**JN**: Per ora?!

**ME**: Sì. Il deploy di venerdì si rompe sempre. Ma non subito. Si rompe dopo.

**JN**: Dopo quanto?

**ME**: Dopo. Quando meno te lo aspetti.

**JN**: Ma i test sono passati!

**ME**: I test passano sempre. Poi si rompe in produzione.

**JN**: Ma il rollout è andato bene!

**ME**: Il rollout va sempre bene. Poi si rompe sotto carico.

**JN**: Ma i log sono ok!

**ME**: I log sono sempre ok. Finché non lo sono più.

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Deploy: completato
- Test: passati
- Rollout: successo
- Log: ok
- Health check: UP
- Sensazione: terrore

E tutto sembrava ok. Ma io sapevo. Sapevo che il deploy di venerdì si rompe sempre. E che era solo questione di tempo. Amen.

---

**Venerdì - 18:00**

Erano le 18:00. Il deploy era andato. Tutto funzionava. Stavo per andare a casa.

Poi è arrivato il messaggio.

**SUPPORTO**: I clienti non riescono a completare gli ordini. Ricevono errori 500.

**ME**: ERRORI 500?!

**SUPPORTO**: Sì. Dal checkout.

**ME**: MA SE FUNZIONAVA!

**SUPPORTO**: Funzionava. Ora non più.

**ME**: E COSA È CAMBIATO?!

**SUPPORTO**: Non lo so. Ma i clienti chiamano.

**ME**: QUANTI CLIENTI?!

**SUPPORTO**: 47 in 10 minuti.

**ME**: 47?!

**SUPPORTO**: Sì. E continuano a chiamare.

**ME**: ARRIVO!

Ho aperto il terminale. Il terminale mostrava:
- Health check: UP
- Pod: Running
- Log: ERRORI

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=checkout-service --since=15m | grep -i error | tail -30
2027-01-16 18:02:12 ERROR: Payment gateway timeout
2027-01-16 18:02:12 ERROR: Cannot process order: payment failed
2027-01-16 18:02:45 ERROR: Payment gateway timeout
2027-01-16 18:02:45 ERROR: Cannot process order: payment failed
2027-01-16 18:03:01 ERROR: Payment gateway timeout
...

# Conta errori
kubectl logs -l app=checkout-service --since=15m | grep -i error | wc -l
89

# Controlla payment gateway
curl -s -m 5 http://payment-gateway:8080/ping
curl: (28) Connection timed out

# Controlla payment service
kubectl logs -l app=payment-service --since=15m | grep -i error | tail -10
2027-01-16 18:02:00 ERROR: Cannot connect to payment gateway
2027-01-16 18:02:00 ERROR: Retrying... (1/3)
2027-01-16 18:02:05 ERROR: Cannot connect to payment gateway
2027-01-16 18:02:05 ERROR: Retrying... (2/3)
2027-01-16 18:02:10 ERROR: Cannot connect to payment gateway
2027-01-16 18:02:10 ERROR: Retrying... (3/3)
2027-01-16 18:02:15 ERROR: Payment gateway unavailable
```

**ME**: Il payment gateway è down.

**JN**: DOWN?!

**ME**: Sì. Non risponde.

**JN**: Ma perché?!

**ME**: Non lo so. Ma è down.

**JN**: E ORA?!

**ME**: Ora fixiamo.

**JN**: Ma è venerdì alle 18:00!

**ME**: LO SO!

**JN**: E QUINDI?!

**ME**: E QUINDI FIXIAMO!

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Payment gateway: DOWN
- Errori: 89
- Clienti: incazzati
- Ora: 18:05
- Venerdì: sì

E la lezione era chiara. Il deploy di venerdì si rompe sempre. E ora toccava a me fixarlo. Amen.

---

**Venerdì - 18:30**

Ho investigato. Il payment gateway era down. Ma perché?

**TERMINALE**:
```
# Controlla pod del payment gateway
kubectl get pods -l app=payment-gateway
NAME                               READY   STATUS    RESTARTS   AGE
payment-gateway-xyz789-1          0/1     Running   0          15m

# Controlla log del payment gateway
kubectl logs payment-gateway-xyz789-1 --tail=50
2027-01-16 17:45:00 INFO: Starting payment gateway
2027-01-16 17:45:01 INFO: Loading configuration
2027-01-16 17:45:02 ERROR: Invalid configuration: MERCHANT_ID is required
2027-01-16 17:45:02 ERROR: Cannot start: missing required configuration
2027-01-16 17:45:02 INFO: Retrying in 5 seconds...
2027-01-16 17:45:07 ERROR: Invalid configuration: MERCHANT_ID is required
...

# Controlla configurazione
kubectl get configmap payment-gateway-config -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: payment-gateway-config
data:
  MERCHANT_ID: ""
  API_KEY: "sk_live_xxx"
  ENDPOINT: "https://api.payment.com"
```

**ME**: Il MERCHANT_ID è vuoto.

**JN**: Vuoto?!

**ME**: Sì. La configurazione non ha il MERCHANT_ID.

**JN**: Ma perché?!

**ME**: Non lo so. Guardo il deploy.

**TERMINALE**:
```
# Controlla ultimo deploy
kubectl describe deployment payment-gateway | grep -A20 "Events"
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  20m   deployment-controller  Scaled up replica set payment-gateway-xyz789 to 1

# Controlla commit
git log --oneline -5
abc1234 (HEAD -> main) Aggiorna configurazione payment gateway
def5678 Fix health check checkout service
...

# Controlla commit
git show abc1234 --stat
 config/payment-gateway.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

git show abc1234
- MERCHANT_ID: "merchant_123"
+ MERCHANT_ID: ""
```

**ME**: Qualcuno ha cancellato il MERCHANT_ID.

**JN**: CANCELLATO?!

**ME**: Sì. Nel commit abc1234.

**JN**: Ma chi?!

**ME**: Non lo so. Guardo l'autore.

**TERMINALE**:
```
git show abc1234 --format="%an"
JN
```

**ME**: JN.

**JN**: IO?!

**ME**: Sì. Tu.

**JN**: Ma non ricordo!

**ME**: Guarda il commit.

**JN**: Ma... ma... non volevo!

**ME**: E COSA VOLEVI?!

**JN**: Volevo rimuovere il MERCHANT_ID di test!

**ME**: E INVECE?!

**JN**: Invece... ho cancellato tutto.

**ME**: HAI CANCELLATO TUTTO?!

**JN**: Sì. Ma... non volevo!

**ME**: E I TEST?!

**JN**: I test... non controllano la configurazione.

**ME**: E QUINDI?!

**JN**: E quindi... non hanno fallito.

**ME**: E ORA?!

**JN**: Ora... fixiamo?

**ME**: SÌ. ORA FIXIAMO!

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Autore: JN
- Errore: cancellato MERCHANT_ID
- Test: non hanno fallito
- Produzione: DOWN
- Venerdì: sì

E la lezione era chiara. JN aveva cancellato la configurazione. E i test non l'avevano beccato. E ora toccava a me fixarlo. Amen.

---

**Venerdì - 19:00**

Ho fixato la configurazione. E riavviato il payment gateway.

**TERMINALE**:
```
# Fix configurazione
kubectl patch configmap payment-gateway-config --type=json -p='[{"op": "replace", "path": "/data/MERCHANT_ID", "value": "merchant_123"}]'

# Riavvia payment gateway
kubectl rollout restart deployment/payment-gateway

# Verifica
kubectl rollout status deployment/payment-gateway -w
deployment "payment-gateway" successfully rolled out

# Controlla log
kubectl logs -l app=payment-gateway --tail=10
2027-01-16 19:02:00 INFO: Starting payment gateway
2027-01-16 19:02:01 INFO: Loading configuration
2027-01-16 19:02:02 INFO: Configuration loaded successfully
2027-01-16 19:02:02 INFO: Connected to payment provider
2027-01-16 19:02:03 INFO: Ready to accept requests

# Test
curl -s http://payment-gateway:8080/health
{"status": "UP", "checks": {"provider": true}, "timestamp": "2027-01-16T19:02:00Z"}

# Controlla errori recenti
kubectl logs -l app=checkout-service --since=5m | grep -i error | wc -l
0

# Controlla ordini
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-01-16 19:00:00' AND status = 'completed'"
count
-------
23
```

**ME**: Payment gateway ripristinato. Zero errori. 23 ordini completati.

**JN**: Funziona!

**ME**: Sì. Per ora.

**JN**: Per ora?!

**ME**: Sì. Il deploy di venerdì ha sempre un secondo atto.

**JN**: Un secondo atto?!

**ME**: Sì. La prima cosa che si rompe è solo l'inizio.

**JN**: E COSA SI ROMPE DOPO?!

**ME**: Non lo so. Ma qualcosa si rompe.

**JN**: Ma perché?!

**ME**: Perché è venerdì. E abbiamo fatto il deploy. E il deploy di venerdì si rompe sempre. Due volte.

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Payment gateway: UP
- Errori: zero
- Ordini: 23
- Sensazione: ancora terrore

E tutto sembrava ok. Ma io sapevo. Sapevo che il deploy di venerdì ha sempre un secondo atto. Amen.

---

**Venerdì - 20:30**

Erano le 20:30. Il payment gateway funzionava. Gli ordini arrivavano. Stavo per andare a casa. Di nuovo.

Poi è arrivato il messaggio.

**SUPPORTO**: I clienti ricevono email di conferma sbagliate.

**ME**: SBAGLIATE?!

**SUPPORTO**: Sì. Ricevono email con il nome di un altro cliente.

**ME**: UN ALTRO CLIENTE?!

**SUPPORTO**: Sì. Mario Rossi riceve l'email di conferma di Giuseppe Verdi.

**ME**: E COME È POSSIBILE?!

**SUPPORTO**: Non lo so. Ma i clienti sono incazzati.

**ME**: QUANTI CLIENTI?!

**SUPPORTO**: 12 in 30 minuti.

**ME**: 12?!

**SUPPORTO**: Sì. E continuano a chiamare.

**ME**: ARRIVO!

Ho aperto il terminale. Il terminale mostrava:
- Payment gateway: UP
- Checkout: UP
- Email: SBAGLIATE

**TERMINALE**:
```
# Controlla log del notification service
kubectl logs -l app=notification-service --since=30m | grep -i email | tail -20
2027-01-16 20:15:00 INFO: Sending order confirmation email to order #12345
2027-01-16 20:15:01 INFO: Email sent to mario.rossi@email.com
2027-01-16 20:15:30 INFO: Sending order confirmation email to order #12346
2027-01-16 20:15:31 INFO: Email sent to mario.rossi@email.com
2027-01-16 20:16:00 INFO: Sending order confirmation email to order #12347
2027-01-16 20:16:01 INFO: Email sent to mario.rossi@email.com
...

# Controlla ordini
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT id, customer_email, customer_name FROM orders WHERE id IN (12345, 12346, 12347)"
id    | customer_email           | customer_name
------|--------------------------|---------------
12345 | mario.rossi@email.com    | Mario Rossi
12346 | giuseppe.verdi@email.com | Giuseppe Verdi
12347 | anna.bianchi@email.com   | Anna Bianchi

# Controlla codice
cat services/notification/src/email.js | grep -A20 "sendOrderConfirmation"
async function sendOrderConfirmation(orderId) {
  const order = await getOrder(orderId);
  const template = await loadTemplate('order-confirmation');
  
  // BUG: Using cached customer data instead of order data
  const customer = await getCustomerFromCache();
  
  const email = {
    to: customer.email,  // WRONG: should be order.customer_email
    subject: `Conferma ordine #${orderId}`,
    body: template.render({ ...order, customer })
  };
  
  return sendEmail(email);
}
```

**ME**: Il notification service usa la cache sbagliata.

**JN**: LA CACHE?!

**ME**: Sì. Prende il cliente dalla cache invece che dall'ordine.

**JN**: Ma perché?!

**ME**: Non lo so. Guardo il commit.

**TERMINALE**:
```
# Controlla commit
git log --oneline --all -- services/notification/src/email.js | head -5
abc5678 (HEAD -> main) Ottimizza recupero cliente in notification service
def9012 Fix email template

# Controlla commit
git show abc5678
- const customer = await getCustomer(order.customer_id);
+ const customer = await getCustomerFromCache();

# Controlla autore
git show abc5678 --format="%an"
JN
```

**ME**: JN.

**JN**: IO DI NUOVO?!

**ME**: Sì. Tu di nuovo.

**JN**: Ma volevo ottimizzare!

**ME**: OTTIMIZZARE?!

**JN**: Sì. La query al database era lenta.

**ME**: E QUINDI?!

**JN**: E quindi ho usato la cache.

**ME**: E LA CACHE COSA CONTIENE?!

**JN**: Il cliente.

**ME**: QUALE CLIENTE?!

**JN**: Il... il... ultimo cliente?

**ME**: L'ULTIMO CLIENTE?!

**JN**: Sì. La cache contiene l'ultimo cliente.

**ME**: E QUINDI?!

**JN**: E quindi... tutti ricevono l'email dell'ultimo cliente.

**ME**: ESATTO!

**JN**: Ma... non volevo!

**ME**: E I TEST?!

**JN**: I test... non controllano le email.

**ME**: E QUINDI?!

**JN**: E quindi... non hanno fallito.

**ME**: E ORA?!

**JN**: Ora... fixiamo?

**ME**: SÌ. ORA FIXIAMO!

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Autore: JN
- Errore: cache sbagliata
- Test: non hanno fallito
- Email: sbagliate
- Venerdì: ancora sì

E la lezione era chiara. JN aveva ottimizzato. E aveva rotto. E ora toccava a me fixarlo. Di nuovo. Amen.

---

**Venerdì - 21:30**

Ho fixato il notification service. E riavviato.

**TERMINALE**:
```
# Fix notification service
cat > services/notification/src/email.js << 'EOF'
async function sendOrderConfirmation(orderId) {
  const order = await getOrder(orderId);
  const template = await loadTemplate('order-confirmation');
  
  // FIX: Use order customer data, not cache
  const customer = {
    email: order.customer_email,
    name: order.customer_name
  };
  
  const email = {
    to: customer.email,
    subject: `Conferma ordine #${orderId}`,
    body: template.render({ ...order, customer })
  };
  
  return sendEmail(email);
}
EOF

# Deploy
kubectl rollout restart deployment/notification-service

# Verifica
kubectl rollout status deployment/notification-service -w
deployment "notification-service" successfully rolled out

# Test
kubectl logs -l app=notification-service --tail=10
2027-01-16 21:32:00 INFO: Sending order confirmation email to order #12350
2027-01-16 21:32:01 INFO: Email sent to luca.colombo@email.com
2027-01-16 21:32:30 INFO: Sending order confirmation email to order #12351
2027-01-16 21:32:31 INFO: Email sent to elena.russo@email.com
```

**ME**: Notification service fixato. Email corrette.

**JN**: Funziona!

**ME**: Sì. Per ora.

**JN**: C'è un terzo atto?!

**ME**: Spero di no.

**JN**: Speri?!

**ME**: Sì. Spero. Ma non credo.

**JN**: Perché?!

**ME**: Perché è venerdì. E abbiamo fatto il deploy. E il deploy di venerdì si rompe sempre. Tre volte.

**JN**: TRE VOLTE?!

**ME**: Sì. Tre volte. La prima è l'errore ovvio. La seconda è l'errore nascosto. La terza è l'errore che non ti aspetti.

**JN**: E QUALE È IL TERZO?!

**ME**: Non lo so. Ma arriverà.

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Notification service: UP
- Email: corrette
- Errori: zero
- Sensazione: ancora terrore

E tutto sembrava ok. Ma io sapevo. Sapevo che il deploy di venerdì ha sempre un terzo atto. Amen.

---

**Sabato - 03:00**

Erano le 03:00 di sabato. Ero a casa. A letto. Dormivo. O quasi.

Poi è arrivato il messaggio.

**SUPPORTO**: Il sistema è down.

**ME**: DOWN?!

**SUPPORTO**: Sì. Tutto down.

**ME**: TUTTO?!

**SUPPORTO**: Sì. Checkout, payment, notification. Tutto.

**ME**: E COSA È SUCCESSO?!

**SUPPORTO**: Non lo so. Ma non funziona nulla.

**ME**: ARRIVO!

Mi sono vestito. Sono andato in ufficio. Erano le 03:30 di sabato. L'ufficio era vuoto. Il caffè era finito. La motivazione era sotto zero.

**TERMINALE**:
```
# Controlla cluster
kubectl get nodes
NAME       STATUS   ROLES    AGE   VERSION
node-1     Ready    master   1y    v1.28.0
node-2     Ready    <none>   1y    v1.28.0
node-3     NotReady <none>   1y    v1.28.0

# Controlla pod
kubectl get pods -A | grep -v Running
NAMESPACE   NAME                               READY   STATUS      RESTARTS   AGE
default     checkout-service-abc123-1         0/1     CrashLoopBackOff   5   9h
default     payment-service-def456-1          0/1     CrashLoopBackOff   5   9h
default     notification-service-ghi789-1    0/1     CrashLoopBackOff   5   9h

# Controlla log
kubectl logs checkout-service-abc123-1 --tail=20
2027-01-17 03:00:00 ERROR: Cannot connect to database: too many connections
2027-01-17 03:00:01 ERROR: Service shutting down
2027-01-17 03:00:02 INFO: Service stopped

# Controlla database
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM pg_stat_activity"
count
-------
497

# Controlla max connections
kubectl exec -it postgres-0 -- psql -U admin -c "SHOW max_connections"
max_connections
----------------
500
```

**ME**: Il database ha finito le connessioni.

**JN**: (al telefono) CONNESS...?!

**ME**: Sì. 497 su 500.

**JN**: E PERCHÉ?!

**ME**: Non lo so. Guardo cosa sta usando le connessioni.

**TERMINALE**:
```
# Controlla connessioni
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT usename, application_name, COUNT(*) FROM pg_stat_activity GROUP BY usename, application_name ORDER BY COUNT(*) DESC"
usename   | application_name     | count
----------|---------------------|-------
checkout  | checkout-service    | 200
payment   | payment-service     | 150
notification | notification-service | 100
admin     | psql                | 1

# Controlla pool size
kubectl get deployment checkout-service -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="DB_POOL_SIZE")].value}'
200

# Controlla repliche
kubectl get deployment checkout-service -o jsonpath='{.spec.replicas}'
1

# Controlla payment pool
kubectl get deployment payment-service -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="DB_POOL_SIZE")].value}'
150

# Controlla notification pool
kubectl get deployment notification-service -o jsonpath='{.spec.template.spec.containers[0].env[?(@.name=="DB_POOL_SIZE")].value}'
100
```

**ME**: I pool size sono troppo grandi.

**JN**: TROPPO GRANDI?!

**ME**: Sì. Checkout usa 200 connessioni. Payment 150. Notification 100. Totale: 450. Più le connessioni di sistema. Totale: 497.

**JN**: Ma perché?!

**ME**: Non lo so. Guardo il commit.

**TERMINALE**:
```
# Controlla commit
git log --oneline --all -- "k8s/*.yaml" | head -5
abc9999 (HEAD -> main) Aumenta pool size per performance
def1234 Fix health check

# Controlla commit
git show abc9999
- DB_POOL_SIZE: "10"
+ DB_POOL_SIZE: "200"

# Controlla autore
git show abc9999 --format="%an"
JN
```

**ME**: JN.

**JN**: IO DI NUOVO?!

**ME**: Sì. Tu di nuovo.

**JN**: Ma volevo migliorare le performance!

**ME**: PERFORMANCE?!

**JN**: Sì. Il database era lento.

**ME**: E QUINDI?!

**JN**: E quindi ho aumentato il pool size.

**ME**: DA 10 A 200?!

**JN**: Sì. Per avere più connessioni.

**ME**: E SE TUTTI I SERVIZI USANO 200 CONNESSIONI?!

**JN**: Non ci ho pensato.

**ME**: E IL DATABASE HA 500 CONNESSIONI MASSIME?!

**JN**: Non lo sapevo!

**ME**: E ORA?!

**JN**: Ora... fixiamo?

**ME**: SÌ. ORA FIXIAMO! DI SABATO ALLE 03:30!

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Autore: JN
- Errore: pool size troppo grande
- Test: non hanno fallito
- Database: DOWN
- Sabato: sì, alle 03:30

E la lezione era chiara. JN aveva ottimizzato. Di nuovo. E aveva rotto. Di nuovo. E ora toccava a me fixarlo. Di sabato. Alle 03:30. Amen.

---

**Sabato - 04:00**

Ho fixato i pool size. E riavviato i servizi.

**TERMINALE**:
```
# Fix pool size
kubectl set env deployment/checkout-service DB_POOL_SIZE=20
kubectl set env deployment/payment-service DB_POOL_SIZE=15
kubectl set env deployment/notification-service DB_POOL_SIZE=10

# Riavvia
kubectl rollout restart deployment/checkout-service
kubectl rollout restart deployment/payment-service
kubectl rollout restart deployment/notification-service

# Verifica
kubectl rollout status deployment/checkout-service -w
deployment "checkout-service" successfully rolled out
kubectl rollout status deployment/payment-service -w
deployment "payment-service" successfully rolled out
kubectl rollout status deployment/notification-service -w
deployment "notification-service" successfully rolled out

# Controlla connessioni
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM pg_stat_activity"
count
-------
47

# Controlla health
curl -s http://checkout-service:8080/health
{"status": "UP", "checks": {"database": true, "cache": true}, "timestamp": "2027-01-17T04:05:00Z"}
```

**ME**: Servizi ripristinati. Pool size corretti. Database ok.

**JN**: Funziona!

**ME**: Sì. Per ora.

**JN**: C'è un quarto atto?!

**ME**: Spero di no.

**JN**: Ma hai detto tre!

**ME**: Sì. Ma con JN non si sa mai.

**JN**: Ehi!

**ME**: È la verità.

**JN**: Ma...

**ME**: Ma niente. Il deploy di venerdì si rompe sempre. E tu hai fatto tre errori. Tre. In un solo deploy.

**JN**: Ma...

**ME**: Niente ma. Impara. E la prossima volta, non fare il deploy di venerdì.

**JN**: Ma UL ha approvato!

**ME**: E TU AVRESTI DOVUTO DIRE NO!

**JN**: Ma...

**ME**: Niente ma. Il deploy di venerdì è vietato. Sempre. Anche se UL approva. Anche se il PM vuole. Anche se è urgente. Il deploy di venerdì si rompe sempre. E tu l'hai imparato sulla tua pelle. E sulla mia. Alle 03:30 di sabato.

JN mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Servizi: UP
- Pool size: corretti
- Database: ok
- Ora: 04:10
- Giorno: Sabato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il deploy di venerdì è vietato. Sempre. E che JN va educato. E che la prossima volta, dico no. Amen.

---

**Lunedì - La Riunione**

Lunedì. UL ha chiamato una riunione. Per discutere del deploy di venerdì.

**UL**: Allora. Chi ha fatto il deploy di venerdì?

**ME**: Io. Con JN.

**UL**: E perché?

**ME**: Perché era urgente. E tu avevi approvato.

**UL**: E QUANTI ERRORI?!

**ME**: Tre. MERCHANT_ID cancellato. Cache sbagliata. Pool size troppo grande.

**UL**: TRE?!

**ME**: Sì. Tre.

**UL**: E CHI LI HA FATTI?!

**ME**: JN.

**UL**: JN?!

**JN**: Sì. Ma non volevo!

**UL**: E QUANTE ORE DI DOWNTIME?!

**ME**: Zero. Ma ho lavorato fino alle 04:10 di sabato.

**UL**: DI SABATO?!

**ME**: Sì. Di sabato. Alle 03:30.

**UL**: E PERCHÉ?!

**ME**: Perché il database aveva finito le connessioni.

**UL**: E QUANTI CLIENTI HANNO AVUTO PROBLEMI?!

**ME**: 47 per il payment gateway. 12 per le email sbagliate. Tutti per il database.

**UL**: E LA MORALE?!

**ME**: La morale è: non fare il deploy di venerdì. Mai.

**UL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta dico no. Anche se è urgente. Anche se tu approvi. Anche se il PM vuole. Il deploy di venerdì è vietato.

**UL**: E SE È DAVVERO URGENTE?!

**ME**: Allora aspettiamo sabato mattina. Quando c'è tempo di fixare. E non alle 03:30.

**UL**: E JN?!

**ME**: JN va educato. Di nuovo.

**UL**: E COME?!

**ME**: Con una regola semplice: niente deploy di venerdì. Mai. E niente ottimizzazioni senza test. E niente configurazioni senza verifica.

**UL**: E CHI CONTROLLA?!

**ME**: Io. E il TL. E il code review. E i test. E il CI/CD. E il monitoraggio. E tutto quello che serve per non fare un altro deploy di venerdì che si rompe tre volte.

UL mi ha guardato. Io guardavo UL. UL guardava JN. JN guardava il tavolo. Il tavolo mostrava:
- Deploy: venerdì
- Errori: tre
- Downtime: zero
- Lavoro: sabato alle 03:30
- Lezione: imparata

E la decisione era chiara. Niente più deploy di venerdì. Mai. Amen.

---

## Il costo del deploy di venerdì

| Voce | Valore |
|------|--------|
| Data deploy | Venerdì 16/01/2027, 17:45 |
| Ora inizio | 17:45 |
| Ora fine | Sabato 04:10 |
| Tempo totale | 10 ore 25 minuti |
| Errori | 3 |
| Errori JN | 3 |
| Clienti affetti | 59+ |
| Email sbagliate | 12 |
| Connessioni esaurite | 497/500 |
| Pool size sbagliato | 200 (checkout), 150 (payment), 100 (notification) |
| Pool size corretto | 20, 15, 10 |
| Reazione UL | "TRE?!" |
| Reazione ME | "Lo sapevo." |
| Reazione JN | "Non volevo!" |
| Soluzione | Fix x3 + educazione |
| Lezione imparata | NESSUN DEPLOY DI VENERDÌ. MAI. |
| **Totale** | **3 errori + 10 ore + 59+ clienti + 1 JN educato** |

**Morale**: Il deploy di venerdì è vietato. Sempre. Anche se è urgente. Anche se UL approva. Anche se il PM vuole. Anche se JN ha testato. Il deploy di venerdì si rompe sempre. Tre volte. La prima è l'errore ovvio. La seconda è l'errore nascosto. La terza è l'errore che non ti aspetti. E se sei fortunato, finisci alle 04:10 di sabato. Se non sei fortunato, finisci domenica. O lunedì. O mai. Perché il deploy di venerdì è come una bomba a orologeria. E l'orologio è sempre in ritardo. E la bomba esplode sempre. E tu sei lì, alle 03:30 di sabato, a fixare. E ti chiedi: "Perché ho fatto il deploy di venerdì?" E la risposta è semplice: perché era urgente. E l'urgenza è il nemico. E la prossima volta, non è urgente. La prossima volta, è sabato mattina. O lunedì. O mai. Ma non venerdì. Mai più venerdì. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-password-che-scade-sempre-di-venerdi.md)**
