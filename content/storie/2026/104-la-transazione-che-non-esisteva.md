# La Transazione Che Non Esisteva

**Data**: 13/02/2027

**[Storie 2026](index.md) | [Precedente](103-la-queue-che-ha-smarrito-i-messaggi.md) | [Prossima](105-il-timeout-che-era-zero.md)**

---

C'è una verità nei database che tutti conoscono ma nessuno rispetta: le transazioni servono. Sempre. Quando devi fare più operazioni insieme, le fai in una transazione. E se una fallisce, tutto torna indietro. E se tutto va bene, tutto va a buon fine. E invece. Invece JN ha scritto un codice che faceva tre operazioni. Senza transazione. E la prima andava a buon fine. E la seconda anche. E la terza falliva. E le prime due restavano. E il database era inconsistente. E i clienti avevano ordini senza pagamenti. E i pagamenti senza ordini. E UL chiamava. E tu rispondevi. E dicevi: "Il database è inconsistente." E UL diceva: "E COME FA A ESSERE INCONSISTENTE?!" E tu dicevi: "Perché non c'erano transazioni." E UL diceva: "E PERCHÉ NON C'ERANO TRANSAZIONI?!" E tu dicevi: "Perché JN non le ha usate." E UL diceva: "E PERCHÉ JN NON LE HA USATE?!" E la verità è che JN non sapeva. O non voleva. O non ci pensava. E il risultato era lo stesso: dati inconsistenti. E clienti incazzati. E 847 ordini fantasma. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: Il cliente ha pagato ma non ha ricevuto l'ordine.

**ME**: Pagato ma non ricevuto?

**TL**: Pagato ma non ricevuto?!

**ME**: Sì. Il pagamento è andato a buon fine. Ma l'ordine non esiste.

**TL**: E COME FA A NON ESISTERE?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla pagamenti
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT * FROM payments WHERE customer_id = 'cust_12345' ORDER BY created_at DESC LIMIT 5"
 id  | customer_id | amount | status  | created_at
-----+-------------+--------+---------+-------------------
 892 | cust_12345  | 149.99 | success | 2027-02-13 08:45:00

# Controlla ordini
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT * FROM orders WHERE customer_id = 'cust_12345' ORDER BY created_at DESC LIMIT 5"
 id | customer_id | amount | status | created_at
----+-------------+--------+--------+------------

# Controlla log
kubectl logs -l app=order-service --since=2h | grep -i "cust_12345"
2027-02-13 08:45:12 INFO: Processing payment for cust_12345
2027-02-13 08:45:13 INFO: Payment successful: payment_id=892
2027-02-13 08:45:14 ERROR: Failed to create order: database connection timeout
```

**ME**: Il pagamento è andato. Ma l'ordine non è stato creato. Connection timeout.

**TL**: E IL DENARO?!

**ME**: Preso. 149.99 euro. Senza ordine.

**TL**: E QUANTI CASI COSÌ?!

**ME**: Controllo.

**TERMINALE**:
```
# Conta pagamenti senza ordine
kubectl exec -it postgres-0 -- psql -U admin -c "
SELECT COUNT(*) as orphan_payments
FROM payments p
LEFT JOIN orders o ON p.id = o.payment_id
WHERE o.id IS NULL AND p.status = 'success'
"
 orphan_payments
----------------
            847

# Conta totale
kubectl exec -it postgres-0 -- psql -U admin -c "
SELECT SUM(amount) as total_lost
FROM payments p
LEFT JOIN orders o ON p.id = o.payment_id
WHERE o.id IS NULL AND p.status = 'success'
"
 total_lost
------------
  127342.50
```

**ME**: 847 pagamenti orfani. Per un totale di 127.342 euro.

**TL**: 127.000 EURO?!

**ME**: Sì. Pagamenti senza ordini.

**TL**: E COME È POSSIBILE?!

**ME**: Non c'è transazione. Il pagamento viene salvato. Poi l'ordine fallisce. E il pagamento resta.

**TL**: E LA TRANSAZIONE?!

**ME**: Non c'è. Guardo il codice.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Pagamenti orfani: 847
- Totale: €127.342,50
- Transazioni: inesistenti
- JN: responsabile

E tutto era chiaro. JN aveva scritto codice senza transazioni. E i dati erano inconsistenti. E i clienti avevano pagato per nulla. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto il codice per i pagamenti?

**JN**: Sì. Due mesi fa. Perché?

**ME**: Ci sono 847 pagamenti senza ordine.

**JN**: Senza ordine?!

**ME**: Sì. Il pagamento va a buon fine. Ma l'ordine non viene creato.

**JN**: E come mai?

**ME**: Perché non c'è la transazione.

**JN**: La transazione?!

**ME**: Sì. La transazione del database. Quella che garantisce che tutto va a buon fine. O tutto fallisce.

**JN**: Ah. Non l'ho usata.

**ME**: NON L'HAI USATA?!

**JN**: No. Era lenta.

**ME**: LENTA?!

**JN**: Sì. Le transazioni rallentano.

**ME**: E QUINDI HAI LASCIATO CHE I DATI DIVENTASSERO INCONSISTENTI?!

**JN**: Ma... non succede mai!

**ME**: SUCCEDONO 847 VOLTE!

**JN**: 847?!

**ME**: Sì. E 127.000 euro di pagamenti orfani.

**JN**: 127.000?!

**ME**: Sì. E ora dobbiamo fixare. E rimborsare.

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Pagamenti orfani: 847
- Totale: €127.342,50
- JN: inaffidabile
- Clienti: incazzati

E la lezione era chiara. Le transazioni servono. E JN deve imparare. Amen.

---

**Lunedì - 10:00**

Ho guardato il codice. Era peggio del previsto.

**TERMINALE**:
```
# Leggi il codice
cat services/order/src/handlers/payment.js
async function processPayment(paymentData) {
  // Step 1: Salva pagamento
  const payment = await db.query(
    'INSERT INTO payments (customer_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
    [paymentData.customerId, paymentData.amount, 'success']
  );

  // Step 2: Crea ordine
  const order = await db.query(
    'INSERT INTO orders (customer_id, payment_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [paymentData.customerId, payment.id, paymentData.amount, 'pending']
  );

  // Step 3: Aggiorna inventario
  await db.query(
    'UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2',
    [paymentData.quantity, paymentData.productId]
  );

  // Step 4: Invia conferma
  await emailService.send(paymentData.customerEmail, 'Order confirmed!');

  return { payment, order };
}
```

**ME**: Quattro operazioni. Senza transazione.

**TL**: QUATTRO?!

**ME**: Sì. Pagamento. Ordine. Inventario. Email.

**TL**: E SE UNA FALLISCE?!

**ME**: Le altre restano. E i dati sono inconsistenti.

**TL**: E QUANTE VOLTE È SUCCESSO?!

**ME**: 847. Solo per il fallimento dell'ordine.

**TL**: E GLI ALTRI?!

**ME**: Non lo so. Controllo l'inventario.

**TERMINALE**:
```
# Controlla inventario
kubectl exec -it postgres-0 -- psql -U admin -c "
SELECT p.id, p.customer_id, p.amount, i.quantity as inventory_after
FROM payments p
LEFT JOIN orders o ON p.id = o.payment_id
LEFT JOIN inventory_log i ON p.id = i.payment_id
WHERE o.id IS NULL AND p.status = 'success'
LIMIT 10
"
 id  | customer_id | amount | inventory_after
-----+-------------+--------+-----------------
 892 | cust_12345  | 149.99 |            NULL
 893 | cust_67890  |  89.99 |            NULL
 894 | cust_11111  | 199.99 |            NULL
 ...

# Controlla email
kubectl logs -l app=email-service --since=24h | grep -c "Order confirmed"
2341
```

**ME**: L'inventario non è stato aggiornato. Ma le email sono partite.

**TL**: LE EMAIL SONO PARTITE?!

**ME**: Sì. 2341 email di conferma. Per ordini che non esistono.

**TL**: E I CLIENTI?!

**ME**: Hanno ricevuto la conferma. Ma non l'ordine.

**TL**: E QUINDI?!

**ME**: E quindi... sono incazzati. E hanno ragione.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Operazioni: 4
- Transazioni: 0
- Email false: 2341
- Inventario: inconsistente

E tutto era un disastro. Ma avevo capito il problema. E potevo fixarlo. Amen.

---

**Lunedì - 10:30**

Ho fixato il codice. Con le transazioni.

**TERMINALE**:
```
# Fix con transazione
cat > services/order/src/handlers/payment.js << 'EOF'
async function processPayment(paymentData) {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    
    // Step 1: Salva pagamento
    const payment = await client.query(
      'INSERT INTO payments (customer_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
      [paymentData.customerId, paymentData.amount, 'pending']
    );

    // Step 2: Crea ordine
    const order = await client.query(
      'INSERT INTO orders (customer_id, payment_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [paymentData.customerId, payment.id, paymentData.amount, 'pending']
    );

    // Step 3: Aggiorna inventario (con controllo)
    const inventory = await client.query(
      'UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2 AND quantity >= $1 RETURNING *',
      [paymentData.quantity, paymentData.productId]
    );
    
    if (inventory.rows.length === 0) {
      throw new Error('Insufficient inventory');
    }

    // Step 4: Processa pagamento esterno
    const paymentResult = await paymentGateway.charge(paymentData);
    
    if (!paymentResult.success) {
      throw new Error('Payment failed');
    }

    // Step 5: Aggiorna stato pagamento
    await client.query(
      'UPDATE payments SET status = $1 WHERE id = $2',
      ['success', payment.id]
    );

    // Step 6: Aggiorna stato ordine
    await client.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      ['confirmed', order.id]
    );

    await client.query('COMMIT');
    
    // Step 7: Invia conferma (fuori transazione)
    await emailService.send(paymentData.customerEmail, 'Order confirmed!');
    
    return { payment, order };
    
  } catch (error) {
    await client.query('ROLLBACK');
    
    // Log errore
    console.error('Payment processing failed:', error.message);
    
    // Notifica fallimento
    await emailService.send(paymentData.customerEmail, 'Payment failed - please try again');
    
    throw error;
  } finally {
    client.release();
  }
}
EOF

# Deploy
kubectl rollout restart deployment/order-service
```

**ME**: Codice fixato. Con transazione. E rollback. E gestione errori.

**TL**: E ORA?!

**ME**: Ora devo fixare i dati inconsistenti.

**TL**: E COME?!

**ME**: Rimborsando i pagamenti orfani. E cancellando le email false.

**TL**: E QUANTO CI VUOLE?!

**ME**: Non lo so. Dipende da quanti sono.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Codice: fixato
- Transazioni: attive
- Dati: da ripulire
- Clienti: da rimborsare

E tutto era in corso. Ma la lezione era chiara. Le transazioni servono. E i dati vanno protetti. Amen.

---

**Lunedì - 11:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo un problema con i pagamenti.

**UL**: Che problema?

**ME**: Ci sono 847 pagamenti senza ordine.

**UL**: Senza ordine?!

**ME**: Sì. Il codice non usava transazioni. E quando l'ordine falliva, il pagamento restava.

**UL**: E QUANTO DENARO?!

**ME**: 127.000 euro.

**UL**: 127.000 EURO?!

**ME**: Sì. Ma sono tutti da rimborsare.

**UL**: E I CLIENTI?!

**ME**: Hanno ricevuto la conferma. Ma non l'ordine.

**UL**: E QUINDI?!

**ME**: E quindi... sono incazzati. E hanno ragione.

**UL**: E CHI HA SCRITTO IL CODICE?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. Due mesi fa.

**UL**: E PERCHÉ NON C'ERANO TRANSAZIONI?!

**ME**: Perché JN diceva che erano lente.

**UL**: LENTE?!

**ME**: Sì. E quindi non le ha usate.

**UL**: E ORA?!

**ME**: Ora il codice è fixato. E stiamo rimborsando.

**UL**: E QUANTO CI VUOLE?!

**ME**: Qualche ora. Per tutti i rimborsi.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato il codice. E aggiunto i test.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. Le transazioni servono. E i dati vanno protetti. E la documentazione è obbligatoria. Amen.

---

**Lunedì - 14:00**

Ho processato i rimborsi. Tutti 847.

**TERMINALE**:
```
# Script per rimborsi
cat > scripts/refund_orphans.js << 'EOF'
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function refundOrphanPayments() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Trova pagamenti orfani
    const orphans = await client.query(`
      SELECT p.id, p.customer_id, p.amount, p.transaction_id
      FROM payments p
      LEFT JOIN orders o ON p.id = o.payment_id
      WHERE o.id IS NULL AND p.status = 'success'
    `);
    
    console.log(`Found ${orphans.rows.length} orphan payments`);
    
    for (const payment of orphans.rows) {
      try {
        // Processa rimborso
        await paymentGateway.refund(payment.transaction_id);
        
        // Aggiorna stato
        await client.query(
          'UPDATE payments SET status = $1 WHERE id = $2',
          ['refunded', payment.id]
        );
        
        // Log
        await client.query(
          'INSERT INTO refund_log (payment_id, reason) VALUES ($1, $2)',
          [payment.id, 'Orphan payment - no order created']
        );
        
        console.log(`Refunded payment ${payment.id}`);
        
      } catch (error) {
        console.error(`Failed to refund payment ${payment.id}:`, error.message);
        // Continua con gli altri
      }
    }
    
    await client.query('COMMIT');
    console.log('All refunds processed');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Refund process failed:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

refundOrphanPayments();
EOF

# Esegui
node scripts/refund_orphans.js
Found 847 orphan payments
Refunded payment 892
Refunded payment 893
...
All refunds processed

# Verifica
kubectl exec -it postgres-0 -- psql -U admin -c "
SELECT COUNT(*) FROM payments WHERE status = 'refunded' AND created_at > '2027-02-01'
"
 count
-------
   847
```

**ME**: Tutti i rimborsi processati. 847 pagamenti rimborsati.

**TL**: E LE EMAIL?!

**ME**: Controllo.

**TERMINALE**:
```
# Invia email di scuse
cat > scripts/apology_emails.js << 'EOF'
const orphans = await getOrphanPayments();

for (const payment of orphans) {
  await emailService.send(payment.customer_email, {
    subject: 'Our apologies - payment refunded',
    body: `
      Dear Customer,
      
      We apologize for the inconvenience. Your payment of €${payment.amount}
      has been fully refunded. The order could not be processed due to a
      technical issue.
      
      Please try again at your convenience.
      
      Sincerely,
      The Team
    `
  });
}
EOF

node scripts/apology_emails.js
Sent 847 apology emails
```

**ME**: 847 email di scuse inviate.

**TL**: E I CLIENTI?!

**ME**: Hanno ricevuto il rimborso. E le scuse.

**TL**: E TORNERANNO?!

**ME**: Non lo so. Ma almeno abbiamo fixato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Rimborsi: 847
- Email: 847
- Totale rimborsato: €127.342,50
- Clienti: scusati

E tutto era fixato. Ma avevo imparato una lezione. La lezione che le transazioni servono. E che i dati vanno protetti. E che i rimborsi costano. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutto il codice. Per trovare altre operazioni senza transazione.

**TERMINALE**:
```
# Cerca operazioni multiple senza transazione
grep -r "await db.query" services/ --include="*.js" -A5 | grep -v "BEGIN" | grep -v "COMMIT" | grep -v "ROLLBACK" > suspicious_operations.txt

# Analizza
cat suspicious_operations.txt | wc -l
234

# Controlla manualmente
for file in $(grep -l "await db.query" services/ --include="*.js" -r); do
  count=$(grep -c "await db.query" $file)
  hasTransaction=$(grep -c "BEGIN" $file)
  if [ $count -gt 1 ] && [ $hasTransaction -eq 0 ]; then
    echo "SUSPICIOUS: $file ($count operations, no transaction)"
  fi
done

# Risultati
SUSPICIOUS: services/user/src/handlers/registration.js (3 operations, no transaction)
SUSPICIOUS: services/inventory/src/handlers/stock.js (4 operations, no transaction)
SUSPICIOUS: services/notification/src/handlers/preferences.js (2 operations, no transaction)
SUSPICIOUS: services/billing/src/handlers/subscription.js (5 operations, no transaction)
```

**ME**: Ci sono altri 4 file con operazioni multiple senza transazione.

**TL**: ALTRI 4?!

**ME**: Sì. User registration. Inventory stock. Notification preferences. Billing subscription.

**TL**: E POSSONO CREARE INCONSISTENZE?!

**ME**: Sì. Tutti.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix user registration
cat > services/user/src/handlers/registration.js << 'EOF'
async function registerUser(userData) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    
    // Create user
    const user = await client.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [userData.email, hashPassword(userData.password)]
    );
    
    // Create profile
    await client.query(
      'INSERT INTO profiles (user_id, name) VALUES ($1, $2)',
      [user.id, userData.name]
    );
    
    // Create preferences
    await client.query(
      'INSERT INTO preferences (user_id) VALUES ($1)',
      [user.id]
    );
    
    await client.query('COMMIT');
    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
EOF

# Fix billing subscription
cat > services/billing/src/handlers/subscription.js << 'EOF'
async function createSubscription(subscriptionData) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    
    // Create subscription
    const subscription = await client.query(
      'INSERT INTO subscriptions (customer_id, plan_id, status) VALUES ($1, $2, $3) RETURNING *',
      [subscriptionData.customerId, subscriptionData.planId, 'active']
    );
    
    // Create invoice
    await client.query(
      'INSERT INTO invoices (subscription_id, amount, status) VALUES ($1, $2, $3)',
      [subscription.id, subscriptionData.amount, 'pending']
    );
    
    // Update customer
    await client.query(
      'UPDATE customers SET subscription_id = $1 WHERE id = $2',
      [subscription.id, subscriptionData.customerId]
    );
    
    // Log
    await client.query(
      'INSERT INTO subscription_log (subscription_id, action) VALUES ($1, $2)',
      [subscription.id, 'created']
    );
    
    // Process payment
    const payment = await paymentGateway.charge(subscriptionData);
    
    if (!payment.success) {
      throw new Error('Payment failed');
    }
    
    await client.query('COMMIT');
    return subscription;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
EOF

# Deploy
kubectl rollout restart deployment/user-service
kubectl rollout restart deployment/billing-service
kubectl rollout restart deployment/inventory-service
kubectl rollout restart deployment/notification-service
```

**ME**: Tutti i file fixati. Con transazioni.

**TL**: E QUANTI ERANO?!

**ME**: 4. Più quello dei pagamenti. 5 in totale.

**TL**: E TUTTI SENZA TRANSAZIONI?!

**ME**: Sì. Tutti scritti da JN. O Bob. O... io.

**TL**: TU?!

**ME**: Sì. Tre anni fa. Per il servizio user.

**TL**: E PERCHÉ?!

**ME**: Perché... non sapevo. Ero junior.

**TL**: E ORA?!

**ME**: Ora so. E fixo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- File senza transazioni: 5
- File fixati: 5
- Autori: JN, Bob, ME
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti scrivono codice senza transazioni. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per le transazioni?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i pagamenti orfani sono stati un disastro. Ma sono anche stati un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: le transazioni servono.

**JN**: Sempre?

**ME**: Sempre. Quando fai più operazioni che devono andare a buon fine insieme.

**JN**: E SE SONO LENTE?!

**ME**: Allora ottimizzi. Ma non le rimuovi.

**JN**: Ok.

**ME**: Secondo: le transazioni garantiscono consistenza.

**JN**: Cioè?

**ME**: Cioè: o tutto va a buon fine. O tutto fallisce. Non c'è mezzo.

**JN**: E SE VOGLIO CHE UNA PARTE VADA A BUON FINE?!

**ME**: Allora non è una transazione. Sono operazioni separate.

**JN**: Ok.

**ME**: Terzo: usa BEGIN, COMMIT, ROLLBACK.

**JN**: Sempre?

**ME**: Sempre. BEGIN all'inizio. COMMIT alla fine. ROLLBACK in caso di errore.

**JN**: E SE DIMENTICO IL ROLLBACK?!

**ME**: Allora la transazione resta aperta. E blocca il database.

**JN**: E QUINDI?!

**ME**: E quindi usi try/catch/finally. E rilasci sempre il client.

**JN**: Ok.

**ME**: Quarto: le operazioni esterne vanno fuori dalla transazione.

**JN**: Esterne?

**ME**: Sì. Le chiamate API. L'invio email. Le operazioni che non sono nel database.

**JN**: E PERCHÉ?!

**ME**: Perché non puoi fare rollback di un'email già inviata. O di una chiamata API già fatta.

**JN**: E QUINDI?!

**ME**: E quindi le fai dopo il COMMIT. Fuori dalla transazione.

**JN**: Ok.

**ME**: Quinto: testa le transazioni.

**JN**: Testa?

**ME**: Sì. Simula errori. Verifica che il rollback funzioni. Controlla che i dati siano consistenti.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta succede di nuovo. E se non testi, non sai se funziona.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Transazioni: attive
- Rollback: funzionante
- Dati: consistenti
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere transazioni. E test. E educazione. Amen.

---

**Giovedì - I Test**

Giovedì. Ho aggiunto test per le transazioni.

**TERMINALE**:
```
# Test per transazioni
cat > tests/transaction.test.js << 'EOF'
describe('Transaction Tests', () => {
  it('should rollback on payment failure', async () => {
    // Mock payment failure
    paymentGateway.charge = jest.fn().mockRejectedValue(new Error('Payment failed'));
    
    const result = await processPayment({
      customerId: 'test',
      amount: 100,
      productId: 'prod_1'
    }).catch(e => e);
    
    expect(result.message).toBe('Payment failed');
    
    // Verify no payment saved
    const payment = await db.query('SELECT * FROM payments WHERE customer_id = $1', ['test']);
    expect(payment.rows.length).toBe(0);
    
    // Verify no order created
    const order = await db.query('SELECT * FROM orders WHERE customer_id = $1', ['test']);
    expect(order.rows.length).toBe(0);
    
    // Verify inventory unchanged
    const inventory = await db.query('SELECT quantity FROM inventory WHERE product_id = $1', ['prod_1']);
    expect(inventory.rows[0].quantity).toBe(originalQuantity);
  });

  it('should rollback on inventory insufficient', async () => {
    // Set inventory to 0
    await db.query('UPDATE inventory SET quantity = 0 WHERE product_id = $1', ['prod_1']);
    
    const result = await processPayment({
      customerId: 'test',
      amount: 100,
      productId: 'prod_1',
      quantity: 1
    }).catch(e => e);
    
    expect(result.message).toBe('Insufficient inventory');
    
    // Verify no payment saved
    const payment = await db.query('SELECT * FROM payments WHERE customer_id = $1', ['test']);
    expect(payment.rows.length).toBe(0);
  });

  it('should commit all operations on success', async () => {
    // Mock successful payment
    paymentGateway.charge = jest.fn().mockResolvedValue({ success: true });
    
    const result = await processPayment({
      customerId: 'test',
      amount: 100,
      productId: 'prod_1',
      quantity: 1
    });
    
    expect(result.payment).toBeDefined();
    expect(result.order).toBeDefined();
    
    // Verify payment saved
    const payment = await db.query('SELECT * FROM payments WHERE customer_id = $1', ['test']);
    expect(payment.rows.length).toBe(1);
    
    // Verify order created
    const order = await db.query('SELECT * FROM orders WHERE customer_id = $1', ['test']);
    expect(order.rows.length).toBe(1);
    
    // Verify inventory updated
    const inventory = await db.query('SELECT quantity FROM inventory WHERE product_id = $1', ['prod_1']);
    expect(inventory.rows[0].quantity).toBe(originalQuantity - 1);
  });
});
EOF

# Esegui test
npm test tests/transaction.test.js
PASS tests/transaction.test.js
  ✓ should rollback on payment failure (45ms)
  ✓ should rollback on inventory insufficient (32ms)
  ✓ should commit all operations on success (67ms)
```

**TL**: Hai aggiunto i test?

**ME**: Sì. Test per il rollback. Test per il commit. Test per la consistenza.

**TL**: E QUINDI?!

**ME**: E quindi... la prossima volta non succede.

**TL**: E SE SUCCede?!

**ME**: Allora... il test fallisce. E il deploy non parte.

**TL**: E SE LO BYPASSANO?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: passing
- Transazioni: testate
- Rollback: verificato
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i test sono essenziali. E che le transazioni vanno verificate. E che JN va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato le transazioni.

```markdown
## Incident #TRANS-001: La Transazione Che Non Esisteva

**Data incident**: Lunedì 13 febbraio 2027, 08:45
**Autore**: JN
**Servizio**: order-service
**Problema**: Operazioni multiple senza transazione
**Causa**: Transazioni ritenute "lente"
**Tempo in produzione**: 2 mesi
**Pagamenti orfani**: 847
**Totale rimborsato**: €127.342,50
**Email false**: 2341
**Tempo di risoluzione**: 6 ore
**Downtime**: 0
**Reazione UL**: "127.000 euro?!"
**Reazione TL**: "Senza transazioni?!"
**Reazione CTO**: "Le transazioni non sono opzionali."
**Soluzione**: Transazioni + test + audit + educazione
**Lezione imparata**: LE TRANSAZIONI SERVONO. SEMPRE.

**Regole per le transazioni**:
1. Usa SEMPRE transazioni per operazioni multiple.
2. BEGIN all'inizio. COMMIT alla fine. ROLLBACK in caso di errore.
3. Usa try/catch/finally per gestire gli errori.
4. Rilascia SEMPRE il client nel finally.
5. Le operazioni esterne (API, email) vanno FUORI dalla transazione.
6. Testa il rollback. Verifica che i dati siano consistenti.
7. Le transazioni garantiscono consistenza. Non le rimuovere per "performance".
8. Se una transazione è lenta, ottimizza. Ma non rimuovere. Amen.

**Come scrivere una transazione corretta**:
```javascript
async function processPayment(data) {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    
    // Operazioni nel database
    const result1 = await client.query('INSERT INTO ...');
    const result2 = await client.query('UPDATE ...');
    const result3 = await client.query('DELETE ...');
    
    await client.query('COMMIT');
    
    // Operazioni esterne (dopo COMMIT)
    await emailService.send(...);
    await api.call(...);
    
    return { result1, result2, result3 };
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
```

**Come testare le transazioni**:
```javascript
it('should rollback on error', async () => {
  // Simula errore
  mockFailure();
  
  await expect(processPayment(data)).rejects.toThrow();
  
  // Verifica rollback
  const payments = await db.query('SELECT * FROM payments WHERE ...');
  expect(payments.rows.length).toBe(0);
});
```

**Pattern comuni di inconsistenza**:
- Pagamento salvato, ordine fallito
- Utente creato, preferenze mancanti
- Inventario aggiornato, ordine non creato
- Subscription attiva, fattura mancante
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che le transazioni servono. E che vanno testate. E che JN va educato. E che 127.000 euro sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: le transazioni sono come le cinture di sicurezza. Non le usi finché non ti servono. E quando ti servono, se non le hai, ti fai male. E nel nostro caso, il "male" sono 847 pagamenti orfani. E 127.000 euro da rimborsare. E 2341 email false. E clienti incazzati. E UL che chiama. E tu che rispondi. E dici: "Non c'erano transazioni." E UL dice: "E PERCHÉ NON C'ERANO TRANSAZIONI?!" E tu dici: "Perché JN diceva che erano lente." E UL dice: "LENTE?!" E tu dici: "Sì. E quindi non le ha usate." E UL dice: "E QUANTO È COSTATA LA LENTEZZA RISPARMIATA?!" E tu dici: "127.000 euro. Più 6 ore di fix. Più 847 rimborsi. Più 2341 email di scuse." E la verità è che la lentezza costa meno dell'inconsistenza. Sempre. E la prossima volta, usi le transazioni. Sempre. Amen.

---

## Il costo della transazione che non esisteva

| Voce | Valore |
|------|--------|
| Servizio | order-service |
| Autore | JN |
| Data creazione | Dicembre 2026 |
| Data incident | 13/02/2027, 08:45 |
| Tempo in produzione | 2 mesi |
| Pagamenti orfani | 847 |
| Totale rimborsato | €127.342,50 |
| Email false | 2341 |
| File senza transazioni | 5 |
| Servizi affetti | order, user, inventory, notification, billing |
| Autori | JN, Bob, ME |
| Tempo di risoluzione | 6 ore |
| Reazione UL | "127.000 euro?!" |
| Reazione TL | "Senza transazioni?!" |
| Reazione CTO | "Le transazioni non sono opzionali." |
| Soluzione | Transazioni + test + audit |
| Lezione imparata | TRANSAZIONI = CONSISTENZA |
| **Totale** | **€127.342,50 rimborsati + 5 file fixati + 1 junior educato + 1 senior educato** |

**Morale**: Le transazioni servono. Sempre. Quando fai più operazioni che devono andare a buon fine insieme, usi una transazione. E se una fallisce, tutto torna indietro. E se tutto va bene, tutto va a buon fine. E se non usi le transazioni, i dati diventano inconsistenti. E i clienti pagano senza ricevere. E tu rimborsi. E chiedi scusa. E UL chiama. E tu rispondi. E dici: "Non c'erano transazioni." E UL dice: "E PERCHÉ?!" E tu dici: "Perché erano lente." E UL dice: "E QUANTO È COSTATA LA LENTEZZA RISPARMIATA?!" E tu dici: "127.000 euro." E UL dice: "VALEVA LA PENA?!" E tu dici: "No." E la verità è che non vale mai la pena. Le transazioni sono come le cinture di sicurezza. Non le usi finché non ti servono. E quando ti servono, se non le hai, ti fai male. E la prossima volta, le usi. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](103-la-queue-che-ha-smarrito-i-messaggi.md) | [Prossima](105-il-timeout-che-era-zero.md)**
