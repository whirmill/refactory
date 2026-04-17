# La Queue Che Ha Smarrito I Messaggi

**Data**: 06/02/2027

**[Storie 2026](index.md) | [Precedente](102-il-cron-job-che-ha-scalato-all-infinito.md) | [Prossima](104-la-transazione-che-non-esisteva.md)**

---

C'è una verità nelle code di messaggi che tutti conoscono ma nessuno rispetta: i messaggi vanno confermati. Sempre. Quando un consumer elabora un messaggio, deve dire "fatto". E il broker deve dire "ok". E il messaggio deve essere rimosso. E invece. Invece JN ha scritto un consumer che elaborava i messaggi. Ma non li confermava. E il broker li rimetteva in coda. Dopo 30 secondi. E il consumer li rielaborava. E non li confermava. E il broker li rimetteva in coda. E il loop continuava. All'infinito. O quasi. Finché non hai 234.567 messaggi duplicati. E i clienti ricevono 234.567 email. E UL chiama. E tu rispondi. E dici: "La queue ha duplicato i messaggi." E UL dice: "E QUANTE EMAIL?!" E tu dici: "234.567." E UL dice: "234.567 EMAIL?!" E la verità è che 234.567 email sono troppe. Per un singolo cliente. Che ha ordinato una pizza. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: Il cliente Mario Rossi ha ricevuto 200.000 email di conferma ordine.

**ME**: 200.000 email?!

**TL**: 200.000?!

**ME**: Sì. Per un singolo ordine.

**TL**: UN SINGOLO ORDINE?!

**ME**: Sì. Una pizza margherita.

**TL**: E QUANTE EMAIL?!

**ME**: 200.000. E crescono.

**TERMINALE**:
```
# Controlla coda
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
Timeout: 60.0 seconds ...
listing queues for vhost "/" ...
orders	234567
notifications	89
payments	12

# Controlla consumer
kubectl logs -l app=order-consumer --since=1h | grep -i "processing" | wc -l
234567

# Controlla email inviate
kubectl logs -l app=notification-service --since=1h | grep -i "email sent" | wc -l
234567

# Controlla ordine
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT * FROM orders WHERE id = 'ORD-12345'"
id: ORD-12345
customer: Mario Rossi
items: Pizza Margherita
status: confirmed
created_at: 2027-02-06 08:30:00
```

**ME**: 234.567 messaggi nella coda. E 234.567 email inviate.

**TL**: E IL CLIENTE?!

**ME**: Ha ricevuto 234.567 email. Per una pizza.

**TL**: E QUANTE PIZZE?!

**ME**: Una.

**TL**: UNA PIZZA E 234.567 EMAIL?!

**ME**: Sì. E il cliente è incazzato.

**TL**: E IL COSTO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla costo email
curl -s "https://api.sendgrid.com/v3/user/credits" -H "Authorization: Bearer $SENDGRID_API_KEY"
{
  "total": 1000000,
  "used": 234567,
  "remaining": 765433
}

# Controlla costo
echo "Costo: $((234567 * 0.0001)) USD"
Costo: 23.46 USD
```

**ME**: 23.46 dollari di email. E un cliente incazzato.

**TL**: E LA CAUSA?!

**ME**: Controllo il consumer.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Messaggi: 234.567
- Email: 234.567
- Cliente: incazzato
- Costo: $23.46

E tutto era chiaro. La queue stava duplicando i messaggi. E il consumer li rielaborava. E le email partivano. E il cliente riceveva. E riceveva. E riceveva. Amen.

---

**Lunedì - 09:30**

Ho guardato il codice del consumer. E ho capito.

**TERMINALE**:
```
# Leggi consumer
cat services/order-consumer/src/index.js
const amqp = require('amqplib');

async function consume() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const ch = await conn.createChannel();
  
  await ch.assertQueue('orders', { durable: true });
  
  ch.consume('orders', async (msg) => {
    const order = JSON.parse(msg.content.toString());
    
    // Processa ordine
    await processOrder(order);
    
    // Invia email
    await sendEmail(order);
    
    // NOTA: Manca l'ack!
    // ch.ack(msg);  <-- JN l'ha commentato per "debug"
  }, { noAck: false });
}
```

**ME**: Il consumer non fa ack dei messaggi.

**TL**: NON FA ACK?!

**ME**: No. JN l'ha commentato. Per "debug".

**TL**: PER DEBUG?!

**ME**: Sì. Tre settimane fa.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Perché i messaggi venivano elaborati. E le email partivano. Ma il broker non riceveva ack. E rimetteva in coda. Dopo 30 secondi.

**TL**: E IL LOOP?!

**ME**: Esatto. Loop infinito. O quasi.

**TL**: E CHI HA SCRITTO QUESTO CODICE?!

**ME**: JN.

**TL**: JN?!

**ME**: Sì. Tre settimane fa.

**TL**: E PERCHÉ NON FA ACK?!

**ME**: Perché l'ha commentato. Per vedere se il consumer funzionava. E poi se l'è dimenticato.

**TL**: E PER TRE SETTIMANE?!

**ME**: Sì. Ma non c'erano molti ordini. Finché oggi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Consumer: senza ack
- JN: responsabile
- Tempo: 3 settimane
- Messaggi: 234.567

E tutto era chiaro. JN aveva commentato l'ack. E se l'era dimenticato. E il broker rimetteva in coda. E il consumer rielaborava. E le email partivano. E il cliente riceveva. Amen.

---

**Lunedì - 10:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto il consumer degli ordini?

**JN**: Sì. Tre settimane fa. Perché?

**ME**: Il cliente Mario Rossi ha ricevuto 234.567 email.

**JN**: 234.567?!

**ME**: Sì. Per una pizza.

**JN**: UNA PIZZA?!

**ME**: Sì. E sai perché?

**JN**: No...

**ME**: Perché il consumer non fa ack dei messaggi.

**JN**: Non fa ack?!

**ME**: No. L'hai commentato. Per "debug".

**JN**: Ah... sì. Me l'ero dimenticato.

**ME**: DIMENTICATO?!

**JN**: Sì. Era per testare. E poi... non l'ho scommentato.

**ME**: E PER TRE SETTIMANE?!

**JN**: Non c'erano molti ordini!

**ME**: OGGI C'ERANO!

**JN**: E QUANTI?!

**ME**: 234.567 messaggi. E 234.567 email.

**JN**: E IL CLIENTE?!

**ME**: Incazzato. Molto incazzato.

**JN**: E ORA?!

**ME**: Ora fixi il consumer. E svuoti la coda. E chiami il cliente.

**JN**: Ok...

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Consumer: da fixare
- Coda: da svuotare
- Cliente: da chiamare
- JN: da educare

E la lezione era chiara. L'ack va fatto. Sempre. E JN va educato. Amen.

---

**Lunedì - 10:30**

Ho fixato il consumer. E svuotato la coda.

**TERMINALE**:
```
# Fix consumer
cat > services/order-consumer/src/index.js << 'EOF'
const amqp = require('amqplib');

async function consume() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const ch = await conn.createChannel();
  
  await ch.assertQueue('orders', { durable: true });
  
  ch.consume('orders', async (msg) => {
    try {
      const order = JSON.parse(msg.content.toString());
      
      // Processa ordine
      await processOrder(order);
      
      // Invia email
      await sendEmail(order);
      
      // ACK - IMPORTANTE!
      ch.ack(msg);
    } catch (err) {
      console.error('Error processing order:', err);
      // Nack con requeue = false per evitare loop
      ch.nack(msg, false, false);
    }
  }, { noAck: false });
}
EOF

# Deploy
kubectl rollout restart deployment/order-consumer

# Svuota coda
kubectl exec -it rabbitmq-0 -- rabbitmqctl purge_queue orders
Purging queue "orders" ...

# Verifica
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
orders	0
```

**ME**: Consumer fixato. Coda svuotata.

**TL**: E LE EMAIL?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla email recenti
kubectl logs -l app=notification-service --since=5m | grep -i "email sent" | wc -l
0

# Controlla coda
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
orders	0
```

**ME**: Zero email. Coda vuota.

**TL**: E IL CLIENTE?!

**ME**: JN lo chiama.

**TL**: JN?!

**ME**: Sì. È il suo disastro. Che chiama.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Consumer: fixato
- Coda: vuota
- Email: zero
- JN: a chiamare

E tutto era risolto. Ma il cliente restava incazzato. E JN doveva chiamare. Amen.

---

**Lunedì - 11:00**

JN ha chiamato il cliente. Il cliente ha risposto. Era lunedì. Il cliente non era di buon umore.

**CLIENTE**: Pronto?

**JN**: Buongiorno, sono JN della Refactory. La chiamo per il problema delle email.

**CLIENTE**: QUALE PROBLEMA?!

**JN**: Le email duplicate. Ne ha ricevute... molte.

**CLIENTE**: MOLTE?! NE HO RICEVUTE 234.567!

**JN**: Sì... c'è stato un bug.

**CLIENTE**: UN BUG?!

**JN**: Sì. Nel sistema di code. Ma l'abbiamo fixato.

**CLIENTE**: FIXATO?! E LE MIE 234.567 EMAIL?!

**JN**: Non... non possiamo rimuoverle.

**CLIENTE**: E LA MIA PIZZA?!

**JN**: La pizza è arrivata?

**CLIENTE**: SÌ! MA CON 234.567 CONFERME!

**JN**: Mi dispiace. Offriamo uno sconto sul prossimo ordine.

**CLIENTE**: SCONTO?! VOGLIO UNA PIZZA GRATIS!

**JN**: Ok... pizza gratis.

**CLIENTE**: E VOGLIO CHE NON SUCCEDE PIÙ!

**JN**: Non succederà più. Abbiamo fixato il bug.

**CLIENTE**: E COME FATE A ESSERE SICURI?!

**JN**: Abbiamo aggiunto test. E controlli.

**CLIENTE**: E SE SUCCEDE DI NUOVO?!

**JN**: Allora... le diamo un'altra pizza gratis.

**CLIENTE**: (sospira) Va bene. Ma non fatelo più.

**JN**: Non lo faremo più. Promesso.

JN ha riattaccato. E mi ha guardato. E io guardavo JN. E JN guardava il terminale. Il terminale mostrava:
- Cliente: calmato
- Pizza gratis: promessa
- Bug: fixato
- Promessa: non più

E tutto era risolto. Ma la lezione era chiara. L'ack va fatto. E i clienti vanno ascoltati. E JN va educato. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i consumer. Per trovare altri ack mancanti.

**TERMINALE**:
```
# Cerca tutti i consumer
find . -name "*.js" -exec grep -l "consume\|consumer" {} \; | head -20

# Controlla ogni consumer
for file in $(find . -name "*.js" -exec grep -l "consume" {} \;); do
  echo "=== $file ==="
  grep -A20 "ch.consume" $file | grep -E "ack|nack" || echo "NO ACK FOUND!"
done

# Risultati
=== services/order-consumer/src/index.js ===
ch.ack(msg);  # Fixed

=== services/payment-consumer/src/index.js ===
NO ACK FOUND!

=== services/notification-consumer/src/index.js ===
NO ACK FOUND!

=== services/analytics-consumer/src/index.js ===
NO ACK FOUND!
```

**ME**: Ci sono altri 3 consumer senza ack.

**TL**: ALTRI 3?!

**ME**: Sì. Payment, notification, analytics.

**TL**: E SONO IN PRODUZIONE?!

**ME**: Sì.

**TL**: E POSSONO DUPLICARE?!

**ME**: Sì. In qualsiasi momento.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix payment consumer
cat > services/payment-consumer/src/index.js << 'EOF'
ch.consume('payments', async (msg) => {
  try {
    const payment = JSON.parse(msg.content.toString());
    await processPayment(payment);
    ch.ack(msg);
  } catch (err) {
    console.error('Payment error:', err);
    ch.nack(msg, false, false);
  }
});
EOF

# Fix notification consumer
cat > services/notification-consumer/src/index.js << 'EOF'
ch.consume('notifications', async (msg) => {
  try {
    const notification = JSON.parse(msg.content.toString());
    await sendNotification(notification);
    ch.ack(msg);
  } catch (err) {
    console.error('Notification error:', err);
    ch.nack(msg, false, false);
  }
});
EOF

# Fix analytics consumer
cat > services/analytics-consumer/src/index.js << 'EOF'
ch.consume('analytics', async (msg) => {
  try {
    const event = JSON.parse(msg.content.toString());
    await trackEvent(event);
    ch.ack(msg);
  } catch (err) {
    console.error('Analytics error:', err);
    ch.nack(msg, false, false);
  }
});
EOF

# Deploy
kubectl rollout restart deployment/payment-consumer
kubectl rollout restart deployment/notification-consumer
kubectl rollout restart deployment/analytics-consumer
```

**ME**: Tutti i consumer fixati. Ora fanno ack.

**TL**: E QUANTI ERANO?!

**ME**: 4. Order, payment, notification, analytics.

**TL**: E TUTTI SENZA ACK?!

**ME**: Sì. Tutti scritti da JN.

**TL**: JN?!

**ME**: Sì. In momenti diversi. Per "debug".

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Perché funzionavano. Finché non funzionavano.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Consumer senza ack: 4
- Consumer fixati: 4
- Autore: JN
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti dimenticano l'ack. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i consumer?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i consumer senza ack sono stati un disastro. Ma sono anche stati un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: l'ack va fatto. Sempre.

**JN**: Sempre?

**ME**: Sempre. Dopo aver elaborato il messaggio. Con successo.

**JN**: E se fallisce?

**ME**: Allora fai nack. Con requeue = false se è un errore permanente. Con requeue = true se è temporaneo.

**JN**: Ok.

**ME**: Secondo: non commentare mai l'ack. Mai.

**JN**: Mai?

**ME**: Mai. Nemmeno per debug. Nemmeno per test. Nemmeno per 5 minuti.

**JN**: E se devo testare?

**ME**: Allimenti usi una coda di test. O un ambiente di test. Ma non commenti l'ack.

**JN**: Ok.

**ME**: Terzo: i messaggi non confermati tornano in coda.

**JN**: Tornano?

**ME**: Sì. Dopo un timeout. E il consumer li rielabora. E se non fa ack, tornano ancora. E ancora. E ancora.

**JN**: E QUINDI?!

**ME**: E quindi loop infinito. E messaggi duplicati. E clienti incazzati.

**JN**: Ok.

**ME**: Quarto: usa idempotenza.

**JN**: Idempotenza?

**ME**: Sì. Significa che elaborare lo stesso messaggio due volte non cambia il risultato.

**JN**: E come?

**ME**: Controllando se il messaggio è già stato elaborato. Prima di elaborarlo.

**JN**: E se non lo è?

**ME**: Allimenti lo elabori. E lo marchi come elaborato. E fai ack.

**JN**: Ok.

**ME**: Quinto: documenta i consumer.

**JN**: Documenta?

**ME**: Sì. Scrivi cosa fa il consumer. E come gestisce gli errori. E cosa succede se fallisce.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere come funziona. E se non lo sai, non sai se funziona.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Consumer: con ack
- Idempotenza: da implementare
- Documentazione: da scrivere
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere ack. E idempotenza. E documentazione. Amen.

---

**Giovedì - L'Idempotenza**

Giovedì. Ho aggiunto idempotenza. Per evitare duplicazioni future.

**TERMINALE**:
```
# Aggiungi idempotenza
cat > services/order-consumer/src/index.js << 'EOF'
const redis = require('redis');
const redisClient = redis.createClient({ url: process.env.REDIS_URL });

ch.consume('orders', async (msg) => {
  const order = JSON.parse(msg.content.toString());
  const messageId = msg.properties.messageId;
  
  try {
    // Controlla se già elaborato
    const alreadyProcessed = await redisClient.get(`processed:${messageId}`);
    if (alreadyProcessed) {
      console.log('Message already processed, skipping:', messageId);
      ch.ack(msg);
      return;
    }
    
    // Processa ordine
    await processOrder(order);
    
    // Invia email
    await sendEmail(order);
    
    // Marca come elaborato
    await redisClient.set(`processed:${messageId}`, '1', 'EX', 86400); // 24 ore
    
    // ACK
    ch.ack(msg);
  } catch (err) {
    console.error('Error processing order:', err);
    ch.nack(msg, false, false);
  }
});
EOF

# Aggiungi test
cat > tests/consumer-idempotency.test.js << 'EOF'
describe('Consumer Idempotency', () => {
  it('should process message only once', async () => {
    const order = { id: 'ORD-123', customer: 'Mario Rossi' };
    const messageId = 'msg-123';
    
    // Prima elaborazione
    await consumer.process(order, messageId);
    const result1 = await getOrderStatus(order.id);
    
    // Seconda elaborazione (duplicato)
    await consumer.process(order, messageId);
    const result2 = await getOrderStatus(order.id);
    
    // Dovrebbero essere identici
    expect(result1).toEqual(result2);
  });
  
  it('should ack duplicate messages', async () => {
    const order = { id: 'ORD-456', customer: 'Giuseppe Verdi' };
    const messageId = 'msg-456';
    
    // Prima elaborazione
    const ack1 = await consumer.process(order, messageId);
    expect(ack1).toBe(true);
    
    // Seconda elaborazione (duplicato)
    const ack2 = await consumer.process(order, messageId);
    expect(ack2).toBe(true); // Dovrebbe comunque fare ack
  });
});
EOF

# Esegui test
npm test tests/consumer-idempotency.test.js
PASS  tests/consumer-idempotency.test.js
```

**TL**: Hai aggiunto l'idempotenza?

**ME**: Sì. Ogni messaggio viene controllato. Se già elaborato, skip. E ack.

**TL**: E QUINDI?!

**ME**: E quindi... anche se il messaggio torna in coda, non viene rielaborato.

**TL**: E SE IL REDIS È DOWN?!

**ME**: Allimenti... il messaggio viene rielaborato. Ma è meglio di niente.

**TL**: E SE QUALCUNO COMMENTA L'ACK?!

**ME**: Allienti... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Idempotenza: attiva
- Test: passing
- Redis: configurato
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'idempotenza è essenziale. E che i test salvano. E che l'ack va fatto. Amen.

---

**Venerdì - Il Monitoraggio**

Venerdì. Ho aggiunto monitoraggio. Per vedere quando i messaggi si duplicano.

**TERMINALE**:
```
# Configura alert per code
cat > /etc/prometheus/alerts/queue.yml << 'EOF'
groups:
  - name: queue
    rules:
      - alert: QueueGrowing
        expr: rabbitmq_queue_messages > 1000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Queue {{ $labels.queue }} is growing"
          description: "Queue {{ $labels.queue }} has {{ $value }} messages. Check consumers."

      - alert: MessagesUnacked
        expr: rabbitmq_queue_messages_unacked > 100
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Queue {{ $labels.queue }} has unacked messages"
          description: "Queue {{ $labels.queue }} has {{ $value }} unacked messages. Consumers may not be acknowledging."

      - alert: ConsumerDown
        expr: rabbitmq_queue_consumers == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Queue {{ $labels.queue }} has no consumers"
          description: "Queue {{ $labels.queue }} has no consumers. Messages are not being processed."

      - alert: MessageRedeliveryRate
        expr: rate(rabbitmq_queue_message_redeliveries_total[5m]) > 10
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High message redelivery rate for {{ $labels.queue }}"
          description: "Queue {{ $labels.queue }} has high redelivery rate. Consumers may not be acknowledging messages."
EOF

# Aggiungi metriche
cat > src/lib/queue-metrics.js << 'EOF'
const prometheus = require('prom-client');

const messagesProcessed = new prometheus.Counter({
  name: 'queue_messages_processed_total',
  help: 'Total messages processed',
  labelNames: ['queue', 'status'],
});

const messagesDuplicate = new prometheus.Counter({
  name: 'queue_messages_duplicate_total',
  help: 'Total duplicate messages detected',
  labelNames: ['queue'],
});

const processingTime = new prometheus.Histogram({
  name: 'queue_processing_time_seconds',
  help: 'Message processing time',
  labelNames: ['queue'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});

module.exports = { messagesProcessed, messagesDuplicate, processingTime };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per code che crescono. Alert per messaggi unacked. Alert per consumer down. Alert per redelivery rate alto.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando i messaggi si duplicano.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allenti l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allenti... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Idempotenza: attiva
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che l'ack va fatto. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato l'ack.

```markdown
## Incident #QUEUE-001: La Queue Che Ha Smarrito I Messaggi

**Data incident**: Lunedì 6 febbraio 2027, 09:00
**Autore**: JN
**Servizio**: order-consumer
**Problema**: Consumer non faceva ack dei messaggi
**Causa**: Ack commentato per "debug" e dimenticato
**Tempo in produzione**: 3 settimane
**Messaggi duplicati**: 234.567
**Email inviate**: 234.567
**Cliente affetto**: Mario Rossi
**Costo email**: $23.46
**Tempo di risoluzione**: 2 ore
**Downtime**: 0
**Reazione UL**: "234.567 email?!"
**Reazione TL**: "Non fa ack?!"
**Reazione CTO**: "Ack sempre. Idempotenza sempre."
**Soluzione**: Ack + idempotenza + monitoraggio
**Lezione imparata**: L'ACK VA FATTO. SEMPRE.

**Regole per i consumer**:
1. L'ack VA FATTO. Sempre. Dopo aver elaborato con successo.
2. NON commentare MAI l'ack. Nemmeno per debug.
3. Usa nack per errori. Con requeue appropriato.
4. Implementa idempotenza. Controlla se già elaborato.
5. Documenta i consumer. Cosa fanno. Come gestiscono errori.
6. Monitora le code. Alert per messaggi unacked. Alert per redelivery.
7. Testa i consumer. Verifica che l'ack funzioni.
8. I messaggi non confermati tornano in coda. E creano loop. Amen.

**Come scrivere un consumer corretto**:
```javascript
ch.consume('orders', async (msg) => {
  const order = JSON.parse(msg.content.toString());
  const messageId = msg.properties.messageId;
  
  try {
    // Idempotenza: controlla se già elaborato
    const alreadyProcessed = await redis.get(`processed:${messageId}`);
    if (alreadyProcessed) {
      ch.ack(msg); // Ack comunque
      return;
    }
    
    // Processa
    await processOrder(order);
    
    // Marca come elaborato
    await redis.set(`processed:${messageId}`, '1', 'EX', 86400);
    
    // ACK - IMPORTANTE!
    ch.ack(msg);
  } catch (err) {
    console.error('Error:', err);
    ch.nack(msg, false, false); // No requeue per errori permanenti
  }
});
```

**Come configurare alert per code**:
```yaml
groups:
  - name: queue
    rules:
      - alert: MessagesUnacked
        expr: rabbitmq_queue_messages_unacked > 100
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Queue has unacked messages"
```

**Come testare l'ack**:
```javascript
describe('Consumer', () => {
  it('should ack messages after processing', async () => {
    const ackSpy = jest.fn();
    await consumer.process(mockMsg, ackSpy);
    expect(ackSpy).toHaveBeenCalled();
  });
  
  it('should nack on error', async () => {
    const nackSpy = jest.fn();
    await consumer.process(badMsg, jest.fn(), nackSpy);
    expect(nackSpy).toHaveBeenCalled();
  });
});
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che l'ack va fatto. E che l'idempotenza è essenziale. E che i messaggi non confermati tornano in coda. E che JN commenta l'ack per debug. E che 234.567 email sono troppe. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i messaggi sono come promesse. Se non le mantieni, tornano. E se tornano, le mantieni di nuovo. E se le mantieni di nuovo, i clienti ricevono due email. O tre. O 234.567. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il consumer non faceva ack." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN l'aveva commentato per debug." E UL dice: "E PER QUANTO TEMPO?!" E tu dici: "Tre settimane." E UL dice: "E NESSUNO L'HA NOTATO?!" E tu dici: "No. Perché funzionava. Finché non ha funzionato troppo." E la verità è che tutto funziona. Finché non funziona troppo. E quando funziona troppo, impari. Impari che l'ack va fatto. E che l'idempotenza è essenziale. E che JN va educato. Amen.

---

## Il costo della queue che ha smarrito i messaggi

| Voce | Valore |
|------|--------|
| Servizio | order-consumer |
| Autore | JN |
| Data creazione | Gennaio 2027 |
| Data incident | 06/02/2027, 09:00 |
| Tempo in produzione | 3 settimane |
| Messaggi duplicati | 234.567 |
| Email inviate | 234.567 |
| Cliente affetto | Mario Rossi |
| Costo email | $23.46 |
| Consumer senza ack | 4 |
| Servizi affetti | order, payment, notification, analytics |
| Autore | JN |
| Reazione UL | "234.567 email?!" |
| Reazione TL | "Non fa ack?!" |
| Reazione CTO | "Ack sempre." |
| Soluzione | Ack + idempotenza + monitoraggio |
| Lezione imparata | ACK = SEMPRE |
| **Totale** | **234.567 email + $23.46 + 4 consumer fixati + 1 junior educato** |

**Morale**: I messaggi vanno confermati. Sempre. Quando un consumer elabora un messaggio, deve dire "fatto". E il broker deve dire "ok". E il messaggio deve essere rimosso. E se non lo confermi, il messaggio torna. E se torna, lo rielabori. E se lo rielabori, il cliente riceve due email. O tre. O 234.567. E il cliente chiama. E UL chiama. E tu rispondi. E dici: "Il consumer non faceva ack." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN l'aveva commentato per debug." E UL dice: "E PERCHÉ NON L'HA SCOMMENTATO?!" E tu dici: "Se l'era dimenticato." E UL dice: "E PER TRE SETTIMANE?!" E tu dici: "Sì. Ma non c'erano molti ordini." E UL dice: "E OGGI?!" E tu dici: "Oggi c'erano. E 234.567 email." E la verità è che l'ack va fatto. Sempre. E l'idempotenza va implementata. E JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](102-il-cron-job-che-ha-scalato-all-infinito.md) | [Prossima](104-la-transazione-che-non-esisteva.md)**
