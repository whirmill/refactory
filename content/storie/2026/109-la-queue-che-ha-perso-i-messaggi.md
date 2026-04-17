# La Queue Che Ha Perso I Messaggi

**Data**: 20/03/2027

**[Storie 2026](index.md) | [Precedente](108-il-certificate-che-non-veniva-rinnovato.md) | [Prossima](110-il-load-balancer-che-aveva-un-preferito.md)**

---

C'è una verità nelle code di messaggi che tutti conoscono ma nessuno rispetta: una queue deve consegnare i messaggi. Tutti. Quando un messaggio entra, deve uscire. Quando un ordine viene pubblicato, deve essere processato. Quando una notifica viene inviata, deve arrivare. E invece. Invece la queue di JN perdeva messaggi. Li perdeva silenziosamente. Senza log. Senza errori. Senza nulla. I messaggi entravano. E non uscivano mai. E gli ordini non venivano processati. E le notifiche non arrivavano. E i clienti chiamavano. E UL chiamava. E tu scoprivi che la queue aveva mangiato 5000 messaggi. E ti chiedevi: "Com'è possibile che una queue perda messaggi?" E la risposta era semplice: perché JN aveva configurato l'auto-ack. E l'auto-ack diceva "consegnato" prima che il consumatore processasse. E quando il consumatore moriva, il messaggio era già stato ackato. E perso. Per sempre. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti dicono di non aver ricevuto le email di conferma ordine.

**ME**: Email di conferma?!

**TL**: Email?!

**ME**: Sì. I clienti ordinano ma non ricevono la conferma.

**TL**: E GLI ORDINI?!

**ME**: Gli ordini ci sono. Ma le email no.

**TL**: E LA QUEUE?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla stato queue
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages messages_ready messages_unacknowledged
Timeout: 60.0 seconds
Listing queues for vhost / ...
orders.email.confirmation	0	0	0
orders.email.notification	0	0	0
orders.email.shipping	0	0	0

# Controlla consumer
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_consumers
Timeout: 60.0 seconds
Listing consumers for vhost / ...
orders.email.confirmation	<rabbit@email-service-1>	1
orders.email.notification	<rabbit@email-service-1>	1
orders.email.shipping	<rabbit@email-service-1>	1

# Controlla log consumer
kubectl logs -l app=email-service --since=1h | grep -i "received\|processed\|sent" | tail -20
2027-03-20 08:45:12 INFO: Email sent: order-12345 confirmation
2027-03-20 08:46:01 INFO: Email sent: order-12346 confirmation
2027-03-20 08:47:23 INFO: Email sent: order-12347 confirmation
...
```

**ME**: La queue è vuota. I consumer sono attivi. Le email vengono inviate.

**TL**: E ALLORA PERCHÉ I CLIENTI NON LE RICEVONO?!

**ME**: Non lo so. Controllo gli ordini.

**TERMINALE**:
```
# Controlla ordini recenti
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT id, status, created_at FROM orders WHERE created_at > '2027-03-20 07:00:00' ORDER BY created_at DESC LIMIT 20"
id     | status  | created_at
-------+---------+--------------------
12345  | pending | 2027-03-20 08:45:00
12346  | pending | 2027-03-20 08:46:00
12347  | pending | 2027-03-20 08:47:00
12348  | pending | 2027-03-20 08:48:00
12349  | pending | 2027-03-20 08:49:00
...

# Conta ordini senza email
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-03-20 07:00:00' AND email_sent = false"
count
-------
0

# Controlla tabella email
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM email_log WHERE created_at > '2027-03-20 07:00:00'"
count
-------
234
```

**ME**: 234 email inviate. Ma i clienti dicono di non averle ricevute.

**TL**: E GLI ORDINI?!

**ME**: Tutti pending. Nessuno completato.

**TL**: PENDING?!

**ME**: Sì. Gli ordini non vengono processati.

**TL**: E LA QUEUE?!

**ME**: La queue è vuota. Ma gli ordini sono pending.

**TL**: E QUINDI?!

**ME**: E quindi... i messaggi non arrivano alla queue. O la queue li perde.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Queue: vuota
- Consumer: attivi
- Email: inviate (ma non ricevute)
- Ordini: pending

E tutto era strano. Perché le email erano "inviate" ma i clienti non le ricevevano. E gli ordini erano pending ma la queue era vuota. E qualcosa non tornava. Amen.

---

**Lunedì - 09:30**

Ho controllato il producer. Il producer pubblicava i messaggi.

**TERMINALE**:
```
# Controlla log producer
kubectl logs -l app=order-service --since=2h | grep -i "published\|queue" | tail -30
2027-03-20 07:15:01 INFO: Published order-12345 to orders.email.confirmation
2027-03-20 07:16:01 INFO: Published order-12346 to orders.email.confirmation
2027-03-20 07:17:01 INFO: Published order-12347 to orders.email.confirmation
...

# Conta messaggi pubblicati
kubectl logs -l app=order-service --since=2h | grep -i "Published" | wc -l
5234

# Conta messaggi ricevuti
kubectl logs -l app=email-service --since=2h | grep -i "received" | wc -l
234

# Conta messaggi processati
kubectl logs -l app=email-service --since=2h | grep -i "processed" | wc -l
234
```

**ME**: 5234 messaggi pubblicati. 234 ricevuti.

**TL**: 234?!

**ME**: Sì. Solo 234 su 5234.

**TL**: E GLI ALTRI 5000?!

**ME**: Persi. Da qualche parte.

**TL**: PERSI?!

**ME**: Sì. La queue li ha mangiati.

**TL**: E COME FA A MANGIARLI?!

**ME**: Non lo so. Guardo la configurazione.

**TERMINALE**:
```
# Controlla configurazione queue
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name arguments
orders.email.confirmation	[{"x-auto-ack":true}]
orders.email.notification	[{"x-auto-ack":true}]
orders.email.shipping	[{"x-auto-ack":true}]

# Controlla configurazione consumer
cat services/email/src/consumer.js
const consumer = async (channel) => {
  await channel.consume('orders.email.confirmation', async (msg) => {
    // Process message
    await sendEmail(msg.content);
    // No ack - auto-ack is enabled
  }, { noAck: true });
};
```

**ME**: Auto-ack abilitato. E noAck: true nel consumer.

**TL**: AUTO-ACK?!

**ME**: Sì. La queue acka automaticamente i messaggi.

**TL**: E SE IL CONSUMER MUORE?!

**ME**: Il messaggio è già stato ackato. E perso.

**TL**: E CHI HA CONFIGURATO COSÌ?!

**ME**: JN.

**TL**: JN?!

**ME**: Sì. Tre mesi fa. Per "ottimizzare le performance".

**TL**: OTTIMIZZARE?!

**ME**: Sì. L'auto-ack è più veloce. Non aspetta l'ack del consumer.

**TL**: E PERDE I MESSAGGI?!

**ME**: Sì. Quando il consumer muore.

**TL**: E QUANTI MESSAGGI HA PERSO?!

**ME**: 5000. Nelle ultime 2 ore.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Messaggi pubblicati: 5234
- Messaggi ricevuti: 234
- Messaggi persi: 5000
- Colpevole: JN

E tutto era chiaro. La queue perdeva messaggi. Perché JN aveva configurato l'auto-ack. E l'auto-ack ackava prima del processamento. E quando il consumer moriva, il messaggio era perso. Amen.

---

**Lunedì - 10:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era calmo. Ancora non sapeva.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai configurato la queue per le email?

**JN**: Sì. Tre mesi fa. Perché?

**ME**: La queue perde messaggi.

**JN**: Perde?!

**ME**: Sì. 5000 messaggi persi. In 2 ore.

**JN**: 5000?!

**ME**: Sì. Perché l'auto-ack è abilitato.

**JN**: Auto-ack?

**ME**: Sì. La queue acka automaticamente. E quando il consumer muore, il messaggio è perso.

**JN**: Ma... è più veloce!

**ME**: PIÙ VELOCE MA PERDE MESSAGGI!

**JN**: Ma... non pensavo che il consumer morisse!

**ME**: I CONSUMER MUOIONO! SEMPRE!

**JN**: E ORA?!

**ME**: Ora fixi la configurazione. E recuperi i messaggi persi.

**JN**: Come?!

**ME**: Non puoi. I messaggi sono persi. Per sempre.

**JN**: E GLI ORDINI?!

**ME**: Li riprocessiamo. Manualmente.

**JN**: Manualmente?!

**ME**: Sì. 5000 ordini. A mano.

JN è impallidito. O forse è diventato verde. Non ricordo. Ricordo solo che guardava il terminale. Il terminale mostrava:
- Messaggi persi: 5000
- Ordini da riprocessare: 5000
- Auto-ack: disabilitato
- JN: in colpa

E la lezione era chiara. L'auto-ack è pericoloso. E i messaggi vanno ackati dopo il processamento. E JN va educato. Amen.

---

**Lunedì - 10:30**

Ho fixato la configurazione. E iniziato a riprocessare gli ordini.

**TERMINALE**:
```
# Fix configurazione queue
kubectl exec -it rabbitmq-0 -- rabbitmqctl delete_queue orders.email.confirmation
kubectl exec -it rabbitmq-0 -- rabbitmqctl delete_queue orders.email.notification
kubectl exec -it rabbitmq-0 -- rabbitmqctl delete_queue orders.email.shipping

# Ricrea queue senza auto-ack
cat > services/email/src/queue.js << 'EOF'
const createQueue = async (channel, queueName) => {
  await channel.assertQueue(queueName, {
    durable: true,
    arguments: {}  // NO auto-ack
  });
};

const consume = async (channel, queueName, processor) => {
  await channel.consume(queueName, async (msg) => {
    try {
      await processor(msg.content);
      channel.ack(msg);  // Ack AFTER processing
    } catch (err) {
      console.error('Processing failed:', err.message);
      channel.nack(msg, false, true);  // Requeue on failure
    }
  }, { noAck: false });  // Manual ack
};
EOF

# Deploy
kubectl rollout restart deployment/email-service

# Verifica configurazione
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name arguments
orders.email.confirmation	[]
orders.email.notification	[]
orders.email.shipping	[]
```

**ME**: Queue fixate. Auto-ack disabilitato. Ack manuale dopo il processamento.

**TL**: E I MESSAGGI PERSI?!

**ME**: Li riprocessiamo.

**TERMINALE**:
```
# Trova ordini non processati
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT id FROM orders WHERE created_at > '2027-03-20 07:00:00' AND status = 'pending' AND email_sent = false" > /tmp/orders-to-reprocess.txt

# Conta ordini
wc -l /tmp/orders-to-reprocess.txt
5000

# Riprocessa ordini
cat > scripts/reprocess-orders.js << 'EOF'
const fs = require('fs');
const orders = fs.readFileSync('/tmp/orders-to-reprocess.txt', 'utf8').split('\n').filter(Boolean);

for (const orderId of orders) {
  // Pubblica messaggio
  await channel.publish('orders.email.confirmation', Buffer.from(JSON.stringify({ orderId })));
  console.log(`Reprocessed order ${orderId}`);
}
EOF

node scripts/reprocess-orders.js
Reprocessed order 12345
Reprocessed order 12346
Reprocessed order 12347
...

# Verifica
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages
orders.email.confirmation	5000
```

**ME**: 5000 ordini ripubblicati. La queue ora li processerà.

**TL**: E QUANTO CI VUOLE?!

**ME**: Dipende dal consumer. Ma ora non perdiamo messaggi.

**TL**: E I CLIENTI?!

**ME**: Riceveranno le email. Con un po' di ritardo.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Auto-ack: disabilitato
- Messaggi riprocessati: 5000
- Queue: funzionante
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'auto-ack è pericoloso. E che i messaggi vanno ackati dopo il processamento. E che JN va educato. Amen.

---

**Lunedì - 11:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era... UL.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con le email di conferma.

**UL**: Che problema?

**ME**: La queue perdeva messaggi. 5000 email non sono state inviate.

**UL**: 5000?!

**ME**: Sì. L'auto-ack era abilitato. E i messaggi venivano persi.

**UL**: AUTO-ACK?!

**ME**: Sì. JN l'aveva configurato per "ottimizzare".

**UL**: E QUANTI CLIENTI?!

**ME**: 5000. Ma ora è fixato. E stiamo riprocessando.

**UL**: E QUANTO CI VUOLE?!

**ME**: Un'ora. Forse due.

**UL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta non succede. L'auto-ack è disabilitato. E c'è l'ack manuale.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato la configurazione. E aggiunto test.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. L'auto-ack è pericoloso. E i messaggi vanno ackati dopo il processamento. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutte le queue. Per trovare altri auto-ack.

**TERMINALE**:
```
# Controlla tutte le queue
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name arguments messages
orders.email.confirmation	[]	0
orders.email.notification	[]	0
orders.email.shipping	[]	0
payments.process	[{"x-auto-ack":true}]	0
notifications.push	[{"x-auto-ack":true}]	0
analytics.events	[{"x-auto-ack":true}]	0

# Controlla consumer
for file in $(find . -name "*.js" -exec grep -l "consume" {} \;); do
  echo "=== $file ==="
  grep -A5 "channel.consume" $file
done

# Risultati
=== services/email/src/consumer.js ===
channel.consume(queueName, processor, { noAck: false });  // Fixed

=== services/payment/src/consumer.js ===
channel.consume('payments.process', processor, { noAck: true });  // DANGER

=== services/notification/src/consumer.js ===
channel.consume('notifications.push', processor, { noAck: true });  // DANGER

=== services/analytics/src/consumer.js ===
channel.consume('analytics.events', processor, { noAck: true });  // DANGER
```

**ME**: Altre 3 queue con auto-ack.

**TL**: ALTRE 3?!

**ME**: Sì. Payment, notification, analytics.

**TL**: E SONO IN PRODUZIONE?!

**ME**: Sì.

**TL**: E POSSONO PERDERE MESSAGGI?!

**ME**: Sì. In qualsiasi momento.

**TL**: E FIXALE!

**ME**: Subito.

**TERMINALE**:
```
# Fix payment queue
cat > services/payment/src/consumer.js << 'EOF'
channel.consume('payments.process', async (msg) => {
  try {
    await processPayment(msg.content);
    channel.ack(msg);
  } catch (err) {
    channel.nack(msg, false, true);
  }
}, { noAck: false });
EOF

# Fix notification queue
cat > services/notification/src/consumer.js << 'EOF'
channel.consume('notifications.push', async (msg) => {
  try {
    await sendPush(msg.content);
    channel.ack(msg);
  } catch (err) {
    channel.nack(msg, false, true);
  }
}, { noAck: false });
EOF

# Fix analytics queue
cat > services/analytics/src/consumer.js << 'EOF'
channel.consume('analytics.events', async (msg) => {
  try {
    await trackEvent(msg.content);
    channel.ack(msg);
  } catch (err) {
    channel.nack(msg, false, true);
  }
}, { noAck: false });
EOF

# Deploy
kubectl rollout restart deployment/payment-service
kubectl rollout restart deployment/notification-service
kubectl rollout restart deployment/analytics-service
```

**ME**: Tutte le queue fixate. Auto-ack disabilitato ovunque.

**TL**: E QUANTE ERANO?!

**ME**: 4. Email, payment, notification, analytics.

**TL**: E TUTTE AVEVANO AUTO-ACK?!

**ME**: Sì. Tutte configurate da JN.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Queue con auto-ack: 4
- Queue fixate: 4
- Colpevole: JN
- Educazione: necessaria

E tutto era fixato. Ma avevo imparato una lezione. La lezione che l'auto-ack è ovunque. E che tutti lo usano per "ottimizzare". E che tutti perdono messaggi. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Con più calma.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per l'auto-ack?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che l'auto-ack è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: l'ack va dopo il processamento.

**JN**: Sempre?

**ME**: Sempre. Il messaggio va ackato SOLO dopo che è stato processato con successo.

**JN**: E SE FALLISCE?!

**ME**: Allora lo nacki. E lo rimetti in queue. O lo scarti. Ma non lo acki.

**JN**: Ok.

**ME**: Secondo: l'auto-ack è pericoloso.

**JN**: Perché?

**ME**: Perché acka prima del processamento. E se il consumer muore, il messaggio è perso.

**JN**: E QUANDO SI USA?!

**ME**: Mai. O quasi mai. Solo per messaggi non critici. E solo se sai cosa stai facendo.

**JN**: Ok.

**ME**: Terzo: la queue è una promessa.

**JN**: Una promessa?

**ME**: Sì. Quando pubblichi un messaggio, prometti che verrà consegnato. E processato. E se la promessa non viene mantenuta, il sistema fallisce.

**JN**: E QUINDI?!

**ME**: E quindi la queue va configurata per mantenere la promessa. Con ack manuale. Con retry. Con dead letter queue.

**JN**: Ok.

**ME**: Quarto: testa la queue con consumer che muoiono.

**JN**: Come?

**ME**: Simula un crash del consumer. E verifica che il messaggio viene rimesso in queue.

**JN**: E COME?!

**ME**: Uccidi il consumer mentre processa. E controlla che il messaggio sia ancora lì.

**JN**: Ok.

**ME**: Quinto: documenta la configurazione della queue.

**JN**: Documenta?

**ME**: Sì. Scrivi se c'è auto-ack. O ack manuale. E cosa succede se il consumer fallisce.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere come funziona la queue. E se non lo sai, non sai se perde messaggi.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Auto-ack: disabilitato
- Ack manuale: abilitato
- Queue: funzionante
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior configurano auto-ack. E i senior configurano auto-ack. E tutti configurano auto-ack. E l'unico modo per non perdere messaggi è avere ack manuale. E test. E documentazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per le queue. Per vedere quando perdono messaggi.

**TERMINALE**:
```
# Configura alert per messaggi persi
cat > /etc/prometheus/alerts/queue.yml << 'EOF'
groups:
  - name: queue
    rules:
      - alert: QueueAutoAckEnabled
        expr: |
          rabbitmq_queue_arguments{argument="x-auto-ack"} == 1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Queue {{ $labels.queue }} has auto-ack enabled"
          description: "Queue {{ $labels.queue }} has auto-ack enabled. This can cause message loss if consumers fail."

      - alert: QueueMessagesNotConsumed
        expr: |
          rabbitmq_queue_messages_ready > 1000
          and
          rate(rabbitmq_queue_messages_delivered[5m]) == 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Queue {{ $labels.queue }} has messages but no consumers"
          description: "Queue {{ $labels.queue }} has {{ $value }} messages ready but no consumers are processing them."

      - alert: QueueConsumerLag
        expr: |
          rabbitmq_queue_messages_ready > 5000
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Queue {{ $labels.queue }} has high message lag"
          description: "Queue {{ $labels.queue }} has {{ $value }} messages waiting. Consumers may be slow or failing."

      - alert: QueueDeadLetterGrowing
        expr: |
          rate(rabbitmq_queue_messages[dead-letter-queue][5m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Dead letter queue is growing"
          description: "Messages are being rejected and sent to dead letter queue. Check consumer errors."
EOF

# Aggiungi metriche per queue
cat > src/lib/queue-metrics.js << 'EOF'
const prometheus = require('prom-client');

const queueMessagesPublished = new prometheus.Counter({
  name: 'queue_messages_published_total',
  help: 'Total messages published to queue',
  labelNames: ['queue', 'service'],
});

const queueMessagesConsumed = new prometheus.Counter({
  name: 'queue_messages_consumed_total',
  help: 'Total messages consumed from queue',
  labelNames: ['queue', 'service'],
});

const queueMessagesLost = new prometheus.Counter({
  name: 'queue_messages_lost_total',
  help: 'Total messages lost (published but not consumed)',
  labelNames: ['queue', 'service'],
});

const queueProcessingTime = new prometheus.Histogram({
  name: 'queue_processing_duration_seconds',
  help: 'Time to process message',
  labelNames: ['queue', 'service'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5, 10],
});

module.exports = {
  queueMessagesPublished,
  queueMessagesConsumed,
  queueMessagesLost,
  queueProcessingTime
};
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per auto-ack abilitato. Alert per messaggi non consumati. Alert per lag. Alert per dead letter.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando una queue perde messaggi.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... i messaggi vanno in dead letter. E li recuperiamo.

**TL**: E SE NON CI SONO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Queue: funzionanti
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che le queue vanno controllate. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero configurato auto-ack.

```markdown
## Incident #QUEUE-001: La Queue Che Ha Perso I Messaggi

**Data incident**: Lunedì 20 marzo 2027, 09:00
**Autore**: JN
**Servizio**: email-service
**Problema**: Queue perdeva messaggi
**Causa**: Auto-ack abilitato
**Tempo in produzione**: 3 mesi
**Messaggi persi**: 5000
**Tempo di risoluzione**: 2 ore
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "5000?!"
**Reazione TL**: "Auto-ack?!"
**Reazione CTO**: "L'ack va dopo il processamento."
**Soluzione**: Auto-ack disabilitato + ack manuale + riprocessamento
**Lezione imparata**: L'ACK VA DOPO IL PROCESSAMENTO. SEMPRE.

**Regole per le queue**:
1. L'ack va DOPO il processamento. MAI prima.
2. L'auto-ack è pericoloso. Non usarlo. MAI.
3. Se il processamento fallisce, nack e requeue.
4. Configura una dead letter queue per i messaggi che falliscono.
5. Testa la queue con consumer che muoiono.
6. Monitora la queue. Alert per auto-ack. Alert per lag.
7. Documenta la configurazione della queue.
8. Una queue è una promessa. Mantienila. Amen.

**Come configurare una queue correttamente**:
```javascript
// Producer
const publish = async (channel, queue, message) => {
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true  // Message survives restart
  });
};

// Consumer con ack manuale
const consume = async (channel, queue, processor) => {
  await channel.assertQueue(queue, { durable: true });
  
  // Configura prefetch per non sovraccaricare il consumer
  await channel.prefetch(10);
  
  await channel.consume(queue, async (msg) => {
    try {
      const content = JSON.parse(msg.content.toString());
      await processor(content);
      channel.ack(msg);  // Ack AFTER processing
    } catch (err) {
      console.error('Processing failed:', err.message);
      // Nack e requeue per retry
      channel.nack(msg, false, true);
    }
  }, { noAck: false });  // Manual ack
};
```

**Come configurare una dead letter queue**:
```javascript
// Dead letter queue
await channel.assertExchange('dlx', 'direct', { durable: true });
await channel.assertQueue('dead-letter', { durable: true });
await channel.bindQueue('dead-letter', 'dlx', 'dead');

// Queue con dead letter
await channel.assertQueue('orders.email', {
  durable: true,
  deadLetterExchange: 'dlx',
  deadLetterRoutingKey: 'dead'
});
```

**Come testare che la queue non perde messaggi**:
```bash
# Pubblica messaggio
kubectl exec -it rabbitmq-0 -- rabbitmqadmin publish queue=orders.email payload='{"test": true}'

# Uccidi consumer
kubectl delete pod -l app=email-service

# Verifica messaggio ancora in queue
kubectl exec -it rabbitmq-0 -- rabbitmqctl list_queues name messages_ready
orders.email	1  # Messaggio ancora lì!

# Riavvia consumer
kubectl rollout restart deployment/email-service

# Verifica messaggio processato
kubectl logs -l app=email-service --since=1m | grep "test"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che l'ack va dopo il processamento. E che l'auto-ack è pericoloso. E che le queue vanno testate. E che JN va educato. E che 5000 messaggi persi sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: una queue è una promessa. Quando pubblichi un messaggio, prometti che verrà consegnato. E processato. E se la promessa non viene mantenuta, il sistema fallisce. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "La queue ha perso i messaggi." E UL dice: "PERSO?!" E tu dici: "Sì. Con l'auto-ack." E UL dice: "E COS'È L'AUTO-ACK?!" E tu dici: "Acka prima del processamento." E UL dice: "E PERCHÉ L'HAI CONFIGURATO?!" E tu dici: "Per ottimizzare." E UL dice: "E QUANTO È COSTATA L'OTTIMIZZAZIONE?!" E tu dici: "5000 messaggi. E 2 ore di fix. E 4 queue da riconfigurare. E 1 junior da educare." E la verità è che l'ottimizzazione costa. Sempre. E la prossima volta, l'ack va dopo il processamento. Sempre. Amen.

---

## Il costo della queue che perdeva messaggi

| Voce | Valore |
|------|--------|
| Servizio | email-service |
| Autore | JN |
| Data creazione | Dicembre 2026 |
| Data incident | 20/03/2027, 09:00 |
| Tempo in produzione | 3 mesi |
| Messaggi persi | 5000 |
| Tempo di risoluzione | 2 ore |
| Downtime | 0 (parziale) |
| Queue con auto-ack | 4 |
| Servizi affetti | email, payment, notification, analytics |
| Reazione UL | "5000?!" |
| Reazione TL | "Auto-ack?!" |
| Reazione CTO | "Ack dopo il processamento." |
| Soluzione | Auto-ack disabilitato + ack manuale |
| Lezione imparata | ACK = DOPO PROCESSAMENTO |
| **Totale** | **5000 messaggi persi + 4 queue fixate + 1 junior educato** |

**Morale**: Una queue è una promessa. Quando pubblichi un messaggio, prometti che verrà consegnato. E processato. E se l'auto-ack è abilitato, la promessa viene rotta. Perché l'auto-ack dice "consegnato" prima che il messaggio sia processato. E quando il consumer muore, il messaggio è perso. Per sempre. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "La queue ha perso i messaggi." E UL dice: "PERSO?!" E tu dici: "Sì. Con l'auto-ack." E UL dice: "E CHI L'HA CONFIGURATO?!" E tu dici: "JN. Per ottimizzare." E UL dice: "E QUANTO È COSTATA L'OTTIMIZZAZIONE?!" E tu dici: "5000 messaggi. E la fiducia dei clienti. E 2 ore di fix. E 4 queue da riconfigurare." E la verità è che l'ottimizzazione prematura è la radice di tutti i mali. E l'auto-ack è ottimizzazione prematura. E la prossima volta, l'ack va dopo il processamento. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](108-il-certificate-che-non-veniva-rinnovato.md) | [Prossima](110-il-load-balancer-che-aveva-un-preferito.md)**
