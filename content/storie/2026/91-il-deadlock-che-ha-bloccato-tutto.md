# Il Deadlock Che Ha Bloccato Tutto

**Data**: 14/11/2026

**[Home](../index.md) | [Precedente](90-il-retry-che-ha-peggiorato-tutto.md)]**

---

C'è una verità nei database che tutti conoscono ma nessuno rispetta: i deadlock sono silenziosi. Arrivano. E bloccano. E tu non li vedi. Non li senti. Non li controlli. Finché un giorno tutto si ferma. Le transazioni si accumulano. Le connessioni si esauriscono. Il database va in tilt. E tu ti chiedi: "Com'è possibile che tutto sia bloccato?" E la risposta è semplice: perché due transazioni si stanno aspettando. E nessuna delle due cede. E intanto tutto il resto aspetta. E mentre aspetta, muore. Amen.

![](../../img/server.jpg)

---

**Martedì - La Scoperta**

Era martedì. Le 10:15. Il caffè era ancora caldo.

Poi è arrivato l'alert.

**ALERT**: Database connection pool exhausted

**ME**: Connection pool esaurito?

**TL**: Esaurito?

**ME**: Sì. Zero connessioni disponibili.

**TL**: E QUANTE SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla connessioni attive
kubectl exec -it postgres-primary -- psql -c "SELECT count(*) FROM pg_stat_activity;"
 count
-------
 247

# Controlla connessioni in attesa
kubectl exec -it postgres-primary -- psql -c "SELECT state, count(*) FROM pg_stat_activity GROUP BY state;"
 state     | count
-----------+-------
 active    | 247
 idle      | 3

# Controlla query in esecuzione
kubectl exec -it postgres-primary -- psql -c "SELECT query, state FROM pg_stat_activity WHERE state = 'active' LIMIT 10;"
 query                                    | state
------------------------------------------+--------
 UPDATE orders SET status = 'pending'... | active
 UPDATE inventory SET quantity = ...     | active
 UPDATE orders SET status = 'shipped'... | active
 UPDATE inventory SET quantity = ...     | active
 ...
```

**ME**: 247 connessioni attive. Tutte bloccate.

**TL**: BLOCCATE?!

**ME**: Sì. Query UPDATE su orders e inventory.

**TL**: E PERCHÉ SONO BLOCCATE?!

**ME**: Non lo so. Controllo i lock.

**TERMINALE**:
```
# Controlla lock
kubectl exec -it postgres-primary -- psql -c "SELECT locktype, relation::regclass, mode, granted FROM pg_locks WHERE NOT granted;"
 locktype | relation |      mode       | granted
----------+----------+-----------------+---------
 tuple    | orders   | ExclusiveLock   | f
 tuple    | inventory| ExclusiveLock   | f
 tuple    | orders   | ExclusiveLock   | f
 tuple    | inventory| ExclusiveLock   | f
 ...

# Controlla deadlock
kubectl exec -it postgres-primary -- psql -c "SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock';"
 pid  | query                                    | wait_event
------+------------------------------------------+------------
 1234 | UPDATE orders SET status = 'pending'... | transactionid
 1235 | UPDATE inventory SET quantity = ...     | transactionid
 1236 | UPDATE orders SET status = 'shipped'... | transactionid
 1237 | UPDATE inventory SET quantity = ...     | transactionid
 ...
```

**ME**: Deadlock. Transazioni che si aspettano.

**TL**: DEADLOCK?!

**ME**: Sì. Una transazione ha lock su orders e aspetta inventory. Un'altra ha lock su inventory e aspetta orders.

**TL**: E QUANTE SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta transazioni in deadlock
kubectl exec -it postgres-primary -- psql -c "SELECT count(*) FROM pg_stat_activity WHERE wait_event_type = 'Lock';"
 count
-------
 244

# Controlla chi ha iniziato
kubectl exec -it postgres-primary -- psql -c "SELECT pid, query_start, query FROM pg_stat_activity WHERE wait_event_type = 'Lock' ORDER BY query_start LIMIT 5;"
 pid  |      query_start      | query
------+-----------------------+------------------------------------------
 1234 | 2026-11-14 10:05:23   | UPDATE orders SET status = 'pending'...
 1235 | 2026-11-14 10:05:24   | UPDATE inventory SET quantity = ...
 1236 | 2026-11-14 10:05:25   | UPDATE orders SET status = 'shipped'...
 1237 | 2026-11-14 10:05:26   | UPDATE inventory SET quantity = ...
```

**ME**: Iniziate alle 10:05. Sono 10 minuti che sono bloccate.

**TL**: 10 MINUTI?!

**ME**: Sì. E nel frattempo altre transazioni sono arrivate. E si sono bloccate anche loro.

**TL**: E QUANTE?!

**ME**: 244.

**TL**: 244 TRANSAZIONI BLOCCATE?!

**ME**: Sì. E il connection pool è 250.

**TL**: E QUINDI?!

**ME**: E quindi... il pool è quasi esaurito. E il database è paralizzato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Connessioni: 247 attive
- Lock: non granted
- Deadlock: confermato
- Tempo: 10 minuti

E tutto era chiaro. Ma le cose chiare sono le più pericolose. Perché le cose chiare le ignori. E le cose ignorate ti perseguitano. Amen.

---

**Martedì - 10:30**

Ho ucciso le transazioni. Ho liberato il database.

**TERMINALE**:
```
# Uccidi tutte le transazioni in attesa
kubectl exec -it postgres-primary -- psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE wait_event_type = 'Lock';"
 pg_terminate_backend
----------------------
 t
 t
 t
 ... (244 rows)

# Verifica connessioni
kubectl exec -it postgres-primary -- psql -c "SELECT count(*) FROM pg_stat_activity;"
 count
-------
 12

# Verifica lock
kubectl exec -it postgres-primary -- psql -c "SELECT count(*) FROM pg_locks WHERE NOT granted;"
 count
-------
 0
```

**ME**: Transazioni terminate. Database libero.

**TL**: E ORA?

**ME**: Ora devo capire perché è successo.

**TL**: E CHI HA SCRITTO IL CODICE?

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Cerca chi ha modificato orders e inventory
git log --oneline --since="1 week" --all -- "*orders*" "*inventory*"
c4d5e6f JN: "Add order processing with inventory update"

# Mostra il codice
git show c4d5e6f --stat
commit c4d5e6f
Author: JN
Date:   Mon Nov 13 16:30:00 2026

    "Add order processing with inventory update"

    src/services/order-processor.js | 45 ++++++++++++++++++++++++++++++

git show c4d5e6f -- src/services/order-processor.js
+async function processOrder(order) {
+  // Aggiorna lo stato dell'ordine
+  await db.query("UPDATE orders SET status = 'processing' WHERE id = $1", [order.id]);
+
+  // Aggiorna l'inventario
+  await db.query("UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2", [order.quantity, order.product_id]);
+
+  // Aggiorna lo stato dell'ordine a completato
+  await db.query("UPDATE orders SET status = 'completed' WHERE id = $1", [order.id]);
+}
```

**ME**: JN. Ieri.

**TL**: JN?!

**ME**: Sì. Ha aggiunto il processore degli ordini.

**TL**: E DOV'È IL PROBLEMA?!

**ME**: Il problema è che aggiorna orders due volte. E inventory una volta. E se due ordini arrivano insieme...

**TL**: E SE DUE ORDINI ARRIVANO INSIEME?!

**ME**: Allora uno prende lock su orders. L'altro prende lock su inventory. E si aspettano.

**TL**: E QUINDI?!

**ME**: E quindi... deadlock.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Autore: JN
- Data: 13 novembre, 16:30
- Codice: order-processor.js
- Problema: ordine dei lock sbagliato

E tutto era chiaro. JN aveva scritto codice che poteva causare deadlock. E nessuno l'aveva notato. E il database era andato in tilt. Amen.

---

**Martedì - 11:00**

Ho chiamato JN. JN ha risposto.

**ME**: Hai scritto il processore degli ordini?

**JN**: Sì. Ieri.

**ME**: E l'hai testato?

**JN**: Sì. Con un ordine. Funzionava.

**ME**: E CON DUE ORDINI INSIEME?!

**JN**: Non ci ho pensato.

**ME**: NON CI HAI PENSATO?!

**JN**: No. Pensavo che... non so cosa pensavo.

**ME**: PENSAVI CHE GLI ORDINI ARRIVASSERO UNO ALLA VOLTA?!

**JN**: Sì. O no. Non lo so.

**ME**: E ORA IL DATABASE È ANDATO IN TILT!

**JN**: Oh.

**ME**: OH?!

**JN**: Scusa.

**ME**: SCUSA?! 244 TRANSAZIONI BLOCCATE!

**JN**: E... cosa facciamo?

**ME**: FIXIAMO IL CODICE! E AGGIUNGIAMO LOCK NELL'ORDINE GIUSTO!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA PENSA A COSA SUCCEDE SE DUE TRANSAZIONI ARRIVANO INSIEME!

**JN**: Ok.

JN ha riattaccato. O forse ho riattaccato io. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Transazioni: terminate
- Database: libero
- Codice: da fixare
- Autore: JN

E la lezione era chiara. I deadlock sono silenziosi. E uccidono i database. E JN non pensa alla concorrenza. Amen.

---

**Martedì - 12:00**

Ho chiamato UL. UL ha risposto.

**ME**: Il database è andato in tilt per un deadlock.

**UL**: DEADLOCK?!

**ME**: Sì. 244 transazioni bloccate.

**UL**: 244?!

**ME**: Sì. Per 10 minuti.

**UL**: 10 MINUTI?!

**ME**: Sì. Il connection pool si è esaurito.

**UL**: E CHI HA SCRITTO IL CODICE?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. Ieri.

**UL**: E NESSUNO L'HA VERIFICATO?!

**ME**: Il code review c'è stato. Ma non ha notato il problema.

**UL**: E PERCHÉ?!

**ME**: Perché i deadlock non sono ovvi. Bisogna pensarci.

**UL**: E QUANTI ORDINI SONO ANDATI PERSI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta ordini processati
SELECT count(*) FROM orders WHERE created_at >= '2026-11-14 10:00:00' AND created_at < '2026-11-14 10:15:00';
 count
-------
 1247

# Conta ordini completati
SELECT count(*) FROM orders WHERE created_at >= '2026-11-14 10:00:00' AND created_at < '2026-11-14 10:15:00' AND status = 'completed';
 count
-------
 89

# Conta ordini falliti
SELECT count(*) FROM orders WHERE created_at >= '2026-11-14 10:00:00' AND created_at < '2026-11-14 10:15:00' AND status != 'completed';
 count
-------
 1158
```

**ME**: 1247 ordini. 89 completati. 1158 falliti.

**UL**: 1158 ORDINI FALLITI?!

**ME**: Sì. Perché le transazioni sono state terminate.

**UL**: E IL COSTO?!

**ME**: Non lo so. Il PM lo sa.

**PM**: (entrando) Il costo di cosa?

**UL**: Degli ordini falliti!

**PM**: Ah. 1158 ordini. Valore medio 75€. Totale 86.850€.

**UL**: 86.000 EURO?!

**PM**: Sì. Ma possiamo processarli di nuovo.

**ME**: Sì. Li rimettiamo in coda.

**UL**: E I CLIENTI?!

**PM**: I clienti... vedono "ordine in elaborazione". Non sanno che è fallito.

**UL**: E QUINDI?!

**ME**: E quindi... riprocessiamo. E sistemiamo il codice.

UL ha riattaccato. Io guardavo il nulla. Il nulla che era la nostra architettura. Il nulla che era il nostro coordinamento. Il nulla che era il nostro processo. E tutto doveva cambiare. Amen.

---

**Martedì - 14:00**

Ho fixato il codice. Ho aggiunto l'ordinamento dei lock.

**TERMINALE**:
```
# Fix del processore ordini
cat > /tmp/fix-order-processor.js << 'EOF'
async function processOrder(order) {
  // IMPORTANTE: Acquisire i lock in ordine consistente!
  // Prima tutti i lock su orders, poi tutti i lock su inventory
  // Questo previene i deadlock

  // Inizia transazione
  await db.query("BEGIN");

  try {
    // Prima: lock su orders (ordine consistente per ID)
    await db.query("UPDATE orders SET status = 'processing' WHERE id = $1", [order.id]);

    // Secondo: lock su inventory (ordine consistente per product_id)
    await db.query("UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2", [order.quantity, order.product_id]);

    // Terzo: aggiorna stato finale
    await db.query("UPDATE orders SET status = 'completed' WHERE id = $1", [order.id]);

    await db.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
}
EOF

# Commit
git checkout -b fix/deadlock-order-processor
git add src/services/order-processor.js
git commit -m "Fix: prevent deadlock by consistent lock ordering"
git push origin fix/deadlock-order-processor
```

**TL**: Hai fixato il codice?

**ME**: Sì. Con lock ordering.

**TL**: E COS'È IL LOCK ORDERING?

**ME**: È quando acquisisci i lock sempre nello stesso ordine. Così eviti i deadlock.

**TL**: E COME FUNZIONA?

**ME**: Se tutti acquisiscono prima orders e poi inventory, non c'è deadlock.

**TL**: E SE QUALCUNO ACQUISISCE PRIMA INVENTORY?

**ME**: Allora... c'è deadlock.

**TL**: E QUINDI?

**ME**: E quindi... tutti devono seguire lo stesso ordine.

**TL**: E COME LO ASSICURIAMO?

**ME**: Con la documentazione. E con il code review.

**TL**: E SE IL REVIEWER NON LO NOTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Fix: lock ordering
- Transazione: BEGIN/COMMIT/ROLLBACK
- Ordine: orders → inventory
- Deadlock: prevenuto

E tutto funzionava. Ma le cose che funzionano sono le più pericolose. Perché le cose che funzionano le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Mercoledì - La Riunione**

Mercoledì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che un deadlock abbia bloccato tutto?

**ME**: Due transazioni acquisivano i lock in ordine diverso.

**UL**: E CHI HA SCRITTO IL CODICE?

**ME**: JN.

**UL**: E PERCHÉ NON HA PENSATO AI DEADLOCK?

**JN**: Non sapevo che fosse un problema.

**UL**: NON SAPEVI?!

**JN**: No. Non ci ho pensato.

**UL**: E NESSUNO L'HA NOTATO NEL CODE REVIEW?!

**ME**: No. I deadlock non sono ovvi.

**CTO**: Il problema è che non c'è una guida sui lock. E ora la scriviamo.

**ME**: Sì.

**CTO**: E chi la scrive?

**ME**: La scrivo io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E COSA HAI IMPARATO?

**JN**: A pensare alla concorrenza.

**CTO**: E COS'ALTRO?

**JN**: A acquisire i lock in ordine consistente.

**CTO**: E COS'ALTRO?

**JN**: A usare transazioni con BEGIN/COMMIT/ROLLBACK.

**CTO**: E COS'ALTRO?

**JN**: A chiedere aiuto se non sono sicuro.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul processo rotto. E sul database bloccato. Amen.

---

**Giovedì - La Guida**

Giovedì. Ho scritto la guida. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i deadlock.

```markdown
## Guida ai Lock e ai Deadlock

### Cos'è un Deadlock?

Un deadlock si verifica quando due o più transazioni si aspettano a vicenda. Ognuna ha un lock che l'altra vuole. E nessuna cede.

Esempio:
- Transazione A: ha lock su orders, vuole lock su inventory
- Transazione B: ha lock su inventory, vuole lock su orders
- Risultato: entrambe aspettano. Per sempre.

### Come Prevenire i Deadlock

1. **Lock Ordering**: Acquisisci i lock sempre nello stesso ordine.
   - Se tutti acquisiscono prima orders, poi inventory, non c'è deadlock.
   - Documenta l'ordine dei lock nel codice.

2. **Lock Timeout**: Imposta un timeout per i lock.
   - Se un lock non viene acquisito entro N secondi, la transazione fallisce.
   - PostgreSQL: `SET lock_timeout = '5s';`

3. **Transazioni Breve**: Mantieni le transazioni il più brevi possibile.
   - Meno tempo passi dentro una transazione, meno probabilità di deadlock.

4. **Lock Minimi**: Acquisisci solo i lock necessari.
   - Non lockare righe che non modifichi.

5. **Indici**: Assicurati che le query usino indici.
   - Query senza indici lockano più righe del necessario.

### Codice Corretto

```javascript
// MAI così (deadlock potenziale)
async function processOrder(order) {
  await db.query("UPDATE orders SET status = 'processing' WHERE id = $1", [order.id]);
  await db.query("UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2", [order.quantity, order.product_id]);
  await db.query("UPDATE orders SET status = 'completed' WHERE id = $1", [order.id]);
}

// SEMPRE così (con transazione e lock ordering)
async function processOrder(order) {
  await db.query("BEGIN");
  try {
    // Lock ordering: prima orders, poi inventory
    await db.query("UPDATE orders SET status = 'processing' WHERE id = $1", [order.id]);
    await db.query("UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2", [order.quantity, order.product_id]);
    await db.query("UPDATE orders SET status = 'completed' WHERE id = $1", [order.id]);
    await db.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
}
```

### Come Rilevare i Deadlock

```sql
-- Controlla transazioni in attesa
SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock';

-- Controlla lock non acquisiti
SELECT locktype, relation::regclass, mode, granted FROM pg_locks WHERE NOT granted;

-- Controlla deadlock recenti
SELECT * FROM pg_stat_activity WHERE wait_event = 'transactionid';
```

### Come Risolvere i Deadlock

```sql
-- Termina una transazione specifica
SELECT pg_terminate_backend(pid);

-- Termina tutte le transazioni in attesa
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE wait_event_type = 'Lock';
```

### Regole d'Oro

1. Sempre usare transazioni esplicite (BEGIN/COMMIT/ROLLBACK).
2. Sempre acquisire i lock nello stesso ordine.
3. Sempre documentare l'ordine dei lock.
4. Sempre impostare un lock timeout.
5. Sempre gestire gli errori con ROLLBACK.
6. Mai fare query lunghe dentro una transazione.
7. Mai lockare più del necessario.
8. Mai assumere che gli ordini arrivino uno alla volta.
9. Mai deployare codice che modifica dati senza test di concorrenza.
10. I deadlock sono silenziosi. Ma uccidono i database. Amen.
```

Il TL ha letto la guida. Il TL ha sorriso. Il TL ha detto: "Quindi hai scritto una guida completa. Con esempi. Con regole. Con query di debug. E con la documentazione dell'ordine dei lock. E ora tutti sanno cosa fare. E la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i deadlock sono come le code. Se non le gestisci, si accumulano. E se si accumulano, bloccano tutto. E se bloccano tutto, il database muore. E se il database muore, UL chiama. E tu rispondi. E dici: "Era un deadlock." E UL dice: "E COS'È UN DEADLOCK?!" E tu dici: "Due transazioni che si aspettano." E UL dice: "E PERCHÉ NON LO SAPEVAMO?!" E tu dici: "Perché non ci abbiamo pensato." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, impari. Impari che i lock vanno ordinati. E che le transazioni vanno brevi. E che i timeout vanno impostati. E che JN va educato. Amen.

---

**Venerdì - I Test di Concorrenza**

Venerdì. Ho aggiunto test di concorrenza. Per verificare che il deadlock non si ripresenti.

**TERMINALE**:
```
# Test di concorrenza
cat > src/services/order-processor.test.js << 'EOF'
describe('OrderProcessor - Concurrency', () => {
  it('should handle concurrent orders without deadlock', async () => {
    const orders = [
      { id: 1, product_id: 100, quantity: 1 },
      { id: 2, product_id: 100, quantity: 1 },
      { id: 3, product_id: 100, quantity: 1 },
      { id: 4, product_id: 100, quantity: 1 },
      { id: 5, product_id: 100, quantity: 1 },
    ];

    // Processa tutti gli ordini in parallelo
    const results = await Promise.allSettled(
      orders.map(order => processOrder(order))
    );

    // Verifica che tutti siano completati
    const fulfilled = results.filter(r => r.status === 'fulfilled');
    expect(fulfilled.length).toBe(5);
  });

  it('should rollback on error', async () => {
    const order = { id: 999, product_id: 999, quantity: 999999 };

    await expect(processOrder(order)).rejects.toThrow();

    // Verifica che l'ordine non sia in stato 'processing'
    const result = await db.query("SELECT status FROM orders WHERE id = $1", [999]);
    expect(result.rows[0].status).not.toBe('processing');
  });

  it('should handle lock timeout', async () => {
    // Imposta lock timeout breve
    await db.query("SET lock_timeout = '1s'");

    // Crea una situazione di lock
    await db.query("BEGIN");
    await db.query("UPDATE orders SET status = 'locked' WHERE id = 1");

    // Prova ad aggiornare la stessa riga
    await expect(
      db.query("UPDATE orders SET status = 'test' WHERE id = 1")
    ).rejects.toThrow('lock timeout');

    await db.query("ROLLBACK");
  });
});
EOF

# Esegui test
npm test
PASS  src/services/order-processor.test.js
  OrderProcessor - Concurrency
    ✓ should handle concurrent orders without deadlock (234ms)
    ✓ should rollback on error (12ms)
    ✓ should handle lock timeout (1023ms)
```

**TL**: Hai aggiunto i test di concorrenza?

**ME**: Sì. Con test paralleli, rollback, e lock timeout.

**TL**: E cosa testano?

**ME**: Testano che 5 ordini paralleli non causino deadlock. E che il rollback funzioni. E che il lock timeout sia gestito.

**TL**: E JN?

**ME**: JN deve far passare questi test prima di mergiare.

**TL**: E SE I TEST NON PASSANO?

**ME**: Allora non può mergiare.

**TL**: E SE JN AGGIUNGE UN NUOVO CASO?

**ME**: Allora deve aggiungere un test di concorrenza.

**TL**: E SE NON LO FA?

**ME**: Allora il code review lo richiede.

**TL**: E SE IL REVIEWER NON LO NOTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: 3 passing
- Concorrenza: testata
- Deadlock: prevenuto
- Rollback: verificato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i test di concorrenza salvano. E che i deadlock uccidono. E che il lock ordering è essenziale. E che JN va educato. Amen.

---

**Sabato - Il Monitoraggio**

Sabato. Ho aggiunto monitoraggio. Per vedere i deadlock prima che uccidano il database.

**TERMINALE**:
```
# Aggiungi metriche per deadlock
cat > /etc/prometheus/alerts/deadlock.yml << 'EOF'
groups:
  - name: deadlock
    rules:
      - alert: DeadlockDetected
        expr: pg_stat_activity_count{state="active", wait_event_type="Lock"} > 10
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Deadlock detected: {{ $value }} transactions waiting for locks"
          description: "More than 10 transactions are waiting for locks. Possible deadlock."

      - alert: ConnectionPoolExhausted
        expr: pg_stat_activity_count{state="active"} / pg_settings_max_connections > 0.9
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Connection pool almost exhausted"
          description: "More than 90% of connections are active. Check for deadlocks or long-running queries."

      - alert: LongRunningTransaction
        expr: pg_stat_activity_max_tx_duration{state="active"} > 300
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Long running transaction detected"
          description: "A transaction has been running for more than 5 minutes. This may cause lock contention."
EOF

# Configura lock timeout di default
kubectl exec -it postgres-primary -- psql -c "ALTER SYSTEM SET lock_timeout = '5s';"
kubectl exec -it postgres-primary -- psql -c "SELECT pg_reload_conf();"
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Con alert per deadlock, connection pool, e transazioni lunghe.

**TL**: E quando alerta?

**ME**: Quando più di 10 transazioni aspettano lock per più di 1 minuto.

**TL**: E IL LOCK TIMEOUT?

**ME**: Impostato a 5 secondi di default.

**TL**: E SE UNA TRANSAZIONE DURA PIÙ DI 5 SECONDI?

**ME**: Allora fallisce. E fa rollback.

**TL**: E È UN PROBLEMA?

**ME**: No. È meglio che bloccare tutto.

**TL**: E SE LA TRANSAZIONE È LEGITTIMA?

**ME**: Allora... la rielaboriamo.

**TL**: E COME?

**ME**: Con una coda di retry.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Lock timeout: 5 secondi
- Monitoraggio: attivo
- Deadlock: rilevato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio salva. E che gli alert prevengono. E che i lock timeout proteggono. E che JN va educato. Amen.

---

## Il costo del deadlock che ha bloccato tutto

| Voce | Valore |
|------|--------|
| Servizio | order-processor |
| Autore | JN |
| Data deploy | 13/11/2026, 16:30 |
| Data incident | 14/11/2026, 10:05 |
| Tempo in produzione | ~18 ore |
| Transazioni bloccate | 244 |
| Ordini falliti | 1158 |
| Valore ordini | 86.850€ |
| Tempo di downtime | 10 minuti |
| Tempo di risoluzione | 30 minuti |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "244 transazioni bloccate?!" |
| Reazione CTO | "Lock ordering + timeout." |
| Soluzione | Lock ordering + transazioni + timeout + test |
| Lezione imparata | DEADLOCK = LOCK ORDERING + TIMEOUT + MONITORAGGIO |
| **Totale** | **244 transazioni + 1158 ordini + 86.850€ + 10 minuti di downtime + 1 junior educato** |

**Morale**: I deadlock sono silenziosi. Arrivano. E bloccano. E se non hai lock ordering, e non hai timeout, e non hai monitoraggio, il database muore. E se il database muore, gli ordini falliscono. E se gli ordini falliscono, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un deadlock." E UL dice: "E COS'È UN DEADLOCK?!" E tu dici: "Due transazioni che si aspettano." E UL dice: "E PERCHÉ NON LO SAPEVAMO?!" E tu dici: "Perché non ci abbiamo pensato." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, impari. Impari che i lock vanno ordinati. E che i timeout vanno impostati. E che le transazioni vanno brevi. E che il monitoraggio salva. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](90-il-retry-che-ha-peggiorato-tutto.md)]**
