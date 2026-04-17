# La Cache Che Ha Restituito I Dati Vecchi

**Data**: 08/05/2026

**[Storie 2026](index.md) | [Precedente](115-il-container-che-non-si-fermava-mai.md) | [Prossima](117-il-cron-che-ha-rivoltato-il-sistema.md)**

---

C'è una verità nel caching che tutti conoscono ma nessuno rispetta: la cache deve essere invalidata. Sempre. Quando i dati cambiano, la cache deve cambiare. Quando un prezzo viene aggiornato, la cache deve rifletterlo. Quando un utente cancella il proprio account, la cache deve saperlo. E invece. Invece la cache di JN restituiva sempre i dati vecchi. Sempre. Anche quando i prezzi erano cambiati. Anche quando gli utenti erano stati cancellati. Anche quando tutto era diverso. La cache restituiva il passato. E il passato era sbagliato. E i clienti compravano a prezzi vecchi. E il PM chiedeva perché. E UL chiamava. E tu rispondevi: "La cache non era invalidata." E UL diceva: "E PERCHÉ NON ERA INVALIDATA?!" E tu dicevi: "Perché JN non l'aveva configurata." E la verità è che tutti amano la cache. Perché è veloce. Ma nessuno ama invalidarla. Perché è complicata. E quando non la invalidi, la cache diventa una bugia. E le bugie costano. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. I prezzi erano... sbagliati.

**SUPPORTO**: I clienti segnalano prezzi errati. Un prodotto costa 50 euro ma ne viene addebitato 70.

**ME**: Prezzi errati?!

**TL**: Prezzi errati?!

**ME**: Sì. I clienti vedono 50 euro. Ma vengono addebitati 70.

**TL**: E COME È POSSIBILE?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla il database
kubectl exec -it postgres-0 -- psql -U products -c "SELECT id, name, price FROM products WHERE id = 12345"
id    | name           | price
------+----------------+-------
12345 | Widget Pro     | 70.00

# Controlla l'API
curl -s http://product-service:8080/products/12345 | jq '.price'
50.00

# Controlla la cache
redis-cli -h redis-cache GET "product:12345"
"{\"id\":12345,\"name\":\"Widget Pro\",\"price\":50.00}"

# Controlla quando è stato aggiornato
kubectl exec -it postgres-0 -- psql -U products -c "SELECT id, price, updated_at FROM products WHERE id = 12345"
id    | price | updated_at
------+-------+-------------------
12345 | 70.00 | 2026-05-08 07:30:00
```

**ME**: Il database ha prezzo 70. La cache ha prezzo 50. L'API restituisce 50.

**TL**: E QUINDI?!

**ME**: E quindi... la cache non è stata invalidata quando il prezzo è cambiato.

**TL**: E QUANDO È CAMBIATO?!

**ME**: Stamattina alle 07:30. Un'ora e mezza fa.

**TL**: E QUANTI CLIENTI HANNO VISTO IL PREZZO SBAGLIATO?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla le richieste
kubectl logs -l app=product-service --since=90m | grep "product/12345" | wc -l
234

# Controlla gli ordini
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE product_id = 12345 AND created_at > '2026-05-08 07:30:00'"
count
-------
89

# Controlla il prezzo applicato
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT id, price_charged FROM orders WHERE product_id = 12345 AND created_at > '2026-05-08 07:30:00' LIMIT 5"
id     | price_charged
-------+---------------
98765  | 50.00
98766  | 50.00
98767  | 50.00
98768  | 50.00
98769  | 50.00
```

**ME**: 89 ordini. Tutti a 50 euro. Invece di 70.

**TL**: E LA DIFFERENZA?!

**ME**: 20 euro per ordine. 89 ordini. 1780 euro di mancati guadagni.

**TL**: E SE CI SONO ALTRI PRODOTTI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla tutti i prodotti aggiornati oggi
kubectl exec -it postgres-0 -- psql -U products -c "SELECT id, name, price, updated_at FROM products WHERE updated_at > '2026-05-08 00:00:00'"
id    | name           | price | updated_at
------+----------------+-------+-------------------
12345 | Widget Pro     | 70.00 | 2026-05-08 07:30:00
12346 | Gadget Plus    | 45.00 | 2026-05-08 08:00:00
12347 | Tool Max       | 120.00| 2026-05-08 08:15:00
12348 | Device Ultra   | 89.00 | 2026-05-08 08:30:00

# Controlla la cache per ognuno
for id in 12345 12346 12347 12348; do
  echo "=== Product $id ==="
  echo "DB: $(kubectl exec -it postgres-0 -- psql -U products -t -c "SELECT price FROM products WHERE id = $id")"
  echo "Cache: $(redis-cli -h redis-cache GET "product:$id" | jq '.price')"
done

# Risultati
=== Product 12345 ===
DB: 70.00
Cache: 50.00

=== Product 12346 ===
DB: 45.00
Cache: 30.00

=== Product 12347 ===
DB: 120.00
Cache: 99.00

=== Product 12348 ===
DB: 89.00
Cache: 75.00
```

**ME**: Quattro prodotti. Tutti con prezzi vecchi in cache.

**TL**: E QUANTI ORDINI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla ordini per tutti i prodotti
kubectl exec -it postgres-0 -- psql -U orders -c "
SELECT 
  p.id, 
  p.name, 
  p.price as real_price,
  AVG(o.price_charged) as charged_price,
  COUNT(o.id) as orders_count,
  (p.price - AVG(o.price_charged)) * COUNT(o.id) as lost_revenue
FROM products p
JOIN orders o ON o.product_id = p.id
WHERE p.updated_at > '2026-05-08 00:00:00'
  AND o.created_at > p.updated_at
GROUP BY p.id, p.name, p.price
"
id    | name           | real_price | charged_price | orders_count | lost_revenue
------+----------------+------------+---------------+--------------+-------------
12345 | Widget Pro     | 70.00      | 50.00         | 89           | 1780.00
12346 | Gadget Plus    | 45.00      | 30.00         | 156          | 2340.00
12347 | Tool Max       | 120.00     | 99.00         | 45           | 945.00
12348 | Device Ultra   | 89.00      | 75.00         | 78           | 1092.00
```

**ME**: 368 ordini. 6157 euro di mancati guadagni.

**TL**: 6157 EURO?!

**ME**: Sì. E cresce. Finché non invalidiamo la cache.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Prodotti: 4
- Ordini: 368
- Persi: €6157
- Cache: non invalidata

E tutto era chiaro. La cache restituiva dati vecchi. E i clienti pagavano meno. E l'azienda perdeva soldi. E JN era responsabile. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava ancora prendendo il caffè.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai configurato la cache dei prodotti?

**JN**: Sì. Tre mesi fa. Perché?

**ME**: La cache restituisce prezzi vecchi. E i clienti pagano meno.

**JN**: Meno?!

**ME**: Sì. 6157 euro di mancati guadagni. In 2 ore.

**JN**: 6157 euro?!

**ME**: Sì. Perché la cache non è invalidata quando i prezzi cambiano.

**JN**: Ah. Sì. Non l'ho configurato.

**ME**: NON L'HAI CONFIGURATO?!

**JN**: No. Pensavo che... si invalidasse da sola.

**ME**: SI INVALIDA DA SÉ?!

**JN**: Sì. No. Non lo so.

**ME**: JN, la cache NON si invalida da sé. DEVI configurare l'invalidazione!

**JN**: E come?!

**ME**: Quando un prodotto viene aggiornato, DEVI cancellare la cache. O aggiornarla.

**JN**: Ah. Ok.

**ME**: E ORA FIXALO!

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Cache: bugiarda
- Prezzi: sbagliati
- JN: inaffidabile
- Soldi: persi

E la lezione era chiara. La cache va invalidata. E JN va educato. Di nuovo. Amen.

---

**Lunedì - 10:00**

Ho invalidato la cache manualmente. E poi ho fixato il codice.

**TERMINALE**:
```
# Invalida la cache manualmente
redis-cli -h redis-cache DEL "product:12345" "product:12346" "product:12347" "product:12348"
(integer) 4

# Verifica
curl -s http://product-service:8080/products/12345 | jq '.price'
70.00

# Fix il codice
cat > src/services/product-service.js << 'EOF'
const redis = require('redis');
const { Pool } = require('pg');

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Cache con TTL
const CACHE_TTL = 3600; // 1 ora

async function getProduct(id) {
  // Prova prima la cache
  const cached = await redisClient.get(`product:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // Se non c'è, prendi dal DB
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  const product = result.rows[0];

  // Salva in cache con TTL
  await redisClient.setex(`product:${id}`, CACHE_TTL, JSON.stringify(product));

  return product;
}

async function updateProduct(id, data) {
  // Aggiorna il DB
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
    [data.name, data.price, id]
  );

  const product = result.rows[0];

  // INVALIDA LA CACHE!
  await redisClient.del(`product:${id}`);

  // Oppure aggiorna la cache
  // await redisClient.setex(`product:${id}`, CACHE_TTL, JSON.stringify(product));

  return product;
}

async function deleteProduct(id) {
  // Cancella dal DB
  await pool.query('DELETE FROM products WHERE id = $1', [id]);

  // INVALIDA LA CACHE!
  await redisClient.del(`product:${id}`);
}

module.exports = { getProduct, updateProduct, deleteProduct };
EOF

# Deploy
kubectl rollout restart deployment/product-service
```

**ME**: Cache invalidata. Codice fixato. Ora quando un prodotto viene aggiornato, la cache viene cancellata.

**TL**: E I PREZZI?!

**ME**: Controllo.

**TERMINALE**:
```
# Verifica prezzi
for id in 12345 12346 12347 12348; do
  echo "Product $id: $(curl -s http://product-service:8080/products/$id | jq '.price')"
done

# Risultati
Product 12345: 70.00
Product 12346: 45.00
Product 12347: 120.00
Product 12348: 89.00
```

**ME**: Prezzi corretti. Cache invalidata.

**TL**: E I CLIENTI?!

**ME**: Ora vedono i prezzi giusti.

**TL**: E I SOLDI PERSI?!

**ME**: 6157 euro. Non recuperabili.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cache: invalidata
- Prezzi: corretti
- Codice: fixato
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che la cache va invalidata. E che i soldi persi non tornano. E che JN va educato. Sempre. Amen.

---

**Lunedì - 10:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con i prezzi.

**UL**: Che problema?

**ME**: La cache restituiva prezzi vecchi. E i clienti hanno pagato meno.

**UL**: MENO?!

**ME**: Sì. 6157 euro di mancati guadagni.

**UL**: 6157 EURO?!

**ME**: Sì. In 2 ore. Prima che ce ne accorgessimo.

**UL**: E COME È SUCCESSO?!

**ME**: JN non ha configurato l'invalidazione della cache.

**UL**: NON HA CONFIGURATO?!

**ME**: No. Pensava che si invalidasse da sola.

**UL**: DA SÉ?!

**ME**: Sì. Ma non funziona così.

**UL**: E ORA?!

**ME**: Ora la cache viene invalidata quando i prezzi cambiano. E ho aggiunto un TTL di 1 ora.

**UL**: E I SOLDI?!

**ME**: Persi. Non recuperabili.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato il codice. E aggiunto test.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. La cache va invalidata. E i soldi persi non tornano. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutte le cache. Per trovare altre bugie.

**TERMINALE**:
```
# Cerca tutti i servizi con cache
grep -r "redis" src/ --include="*.js" | grep -v node_modules | head -20

# Controlla ogni servizio
for file in $(grep -rl "redis" src/ --include="*.js"); do
  echo "=== $file ==="
  grep -A5 "set\|get\|del" $file | head -20
done

# Risultati
=== src/services/product-service.js ===
// Fixed - ora invalida la cache

=== src/services/user-service.js ===
await redisClient.set(`user:${id}`, JSON.stringify(user));
// MAI invalidata!

=== src/services/order-service.js ===
await redisClient.set(`order:${id}`, JSON.stringify(order));
// MAI invalidata!

=== src/services/catalog-service.js ===
await redisClient.set(`catalog:${id}`, JSON.stringify(catalog));
// MAI invalidata!
```

**ME**: Ci sono altri 3 servizi con cache non invalidata.

**TL**: ALTRI 3?!

**ME**: Sì. User, order, catalog.

**TL**: E POSSONO AVERE DATI VECCHI?!

**ME**: Sì. In qualsiasi momento.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix user-service
cat > src/services/user-service.js << 'EOF'
async function updateUser(id, data) {
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
    [data.name, data.email, id]
  );
  const user = result.rows[0];
  
  // INVALIDA LA CACHE!
  await redisClient.del(`user:${id}`);
  await redisClient.del(`user:email:${user.email}`);
  
  return user;
}

async function deleteUser(id) {
  const user = await getUser(id);
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  
  // INVALIDA LA CACHE!
  await redisClient.del(`user:${id}`);
  await redisClient.del(`user:email:${user.email}`);
}
EOF

# Fix order-service
cat > src/services/order-service.js << 'EOF'
async function updateOrderStatus(id, status) {
  const result = await pool.query(
    'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [status, id]
  );
  const order = result.rows[0];
  
  // INVALIDA LA CACHE!
  await redisClient.del(`order:${id}`);
  await redisClient.del(`user:orders:${order.user_id}`);
  
  return order;
}
EOF

# Fix catalog-service
cat > src/services/catalog-service.js << 'EOF'
async function updateCatalog(id, data) {
  const result = await pool.query(
    'UPDATE catalogs SET name = $1, products = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
    [data.name, JSON.stringify(data.products), id]
  );
  const catalog = result.rows[0];
  
  // INVALIDA LA CACHE!
  await redisClient.del(`catalog:${id}`);
  // Invalida anche le cache dei prodotti correlati
  for (const productId of data.products) {
    await redisClient.del(`product:${productId}`);
  }
  
  return catalog;
}
EOF

# Deploy
kubectl rollout restart deployment/user-service
kubectl rollout restart deployment/order-service
kubectl rollout restart deployment/catalog-service
```

**ME**: Tutte le cache fixate. Ora vengono invalid quando i dati cambiano.

**TL**: E QUANTE ERANO?!

**ME**: 4. Product, user, order, catalog.

**TL**: E TUTTE NON ERANO INVALIDATE?!

**ME**: Sì. Tutte restituivano dati potenzialmente vecchi.

**TL**: E CHI LE HA SCRITTE?!

**ME**: JN. Bob. E... io.

**TL**: TU?!

**ME**: Sì. Due anni fa. Per il servizio user.

**TL**: E PERCHÉ?!

**ME**: Perché... non pensavo fosse importante.

**TL**: NON IMPORTANTE?!

**ME**: Sì. Come JN.

**TL**: E QUINDI?!

**ME**: E quindi... anche io devo imparare.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cache bugiarde: 4
- Cache fixate: 4
- Autori: JN, Bob, ME
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti scrivono cache senza invalidazione. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per la cache?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che la cache bugiarda è stata un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: la cache va invalidata quando i dati cambiano.

**JN**: Sempre?

**ME**: Sempre. Quando aggiorni un prodotto, cancella la cache. Quando cancelli un utente, cancella la cache. Quando cambi qualsiasi cosa, cancella la cache correlata.

**JN**: E SE NON SO QUALI SONO LE CACHE CORRELATE?!

**ME**: Allimenti le cerchi. E le cancelli tutte. Meglio cancellare troppo che troppo poco.

**JN**: Ok.

**ME**: Secondo: usa un TTL.

**JN**: TTL?

**ME**: Time To Live. La cache deve scadere. Dopo un'ora, un giorno, una settimana. Ma deve scadere.

**JN**: E SE I DATI CAMBIANO PRIMA?!

**ME**: Allimenti invalidi manualmente. Ma il TTL è la tua rete di sicurezza.

**JN**: Ok.

**ME**: Terzo: distingui tra cache read-through e cache write-through.

**JN**: Cioè?

**ME**: Read-through = leggi dalla cache, se non c'è leggi dal DB e salva in cache. Write-through = scrivi nel DB E nella cache contemporaneamente.

**JN**: E QUALE USO?!

**ME**: Dipende. Read-through è più semplice. Write-through è più consistente. Ma entrambi richiedono invalidazione.

**JN**: Ok.

**ME**: Quarto: documenta cosa viene cachato. E per quanto.

**JN**: Documenta?

**ME**: Sì. Scrivi quali dati sono in cache. Con quale TTL. E quando vengono invalidati.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere cosa c'è in cache. E se non lo sai, non sai se è corretto.

**JN**: Ok.

**ME**: Quinto: testa l'invalidazione.

**JN**: Testa?

**ME**: Sì. Aggiorna un prodotto. Verifica che la cache sia cancellata. Verifica che il nuovo dato sia corretto. Se non testi, non sai se funziona.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Cache: invalidata
- TTL: configurato
- Test: passing
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere cache corrette. E invalidazione. E test. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per le cache bugiarde.

**TERMINALE**:
```
# Configura alert per cache bugiarda
cat > /etc/prometheus/alerts/cache.yml << 'EOF'
groups:
  - name: cache-consistency
    rules:
      - alert: CacheDataStale
        expr: |
          count by (service) (
            cache_data_timestamp < time() - 3600
          ) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Cache for {{ $labels.service }} may be stale"
          description: "Cache data is older than 1 hour. Check invalidation logic."

      - alert: CacheHitRateLow
        expr: |
          sum by (service) (
            rate(cache_hits_total[5m])
          ) / sum by (service) (
            rate(cache_requests_total[5m])
          ) < 0.5
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Cache hit rate low for {{ $labels.service }}"
          description: "Cache hit rate is {{ $value | humanizePercentage }}. Consider reviewing cache strategy."

      - alert: CacheInvalidationMissing
        expr: |
          sum by (service) (
            increase(db_writes_total[5m])
          ) > 0
          and
          sum by (service) (
            increase(cache_invalidations_total[5m])
          ) == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "No cache invalidation for {{ $labels.service }}"
          description: "Database writes detected but no cache invalidations. Cache may be stale."
EOF

# Aggiungi metriche per cache
cat > src/lib/cache-metrics.js << 'EOF'
const prometheus = require('prom-client');

const cacheHits = new prometheus.Counter({
  name: 'cache_hits_total',
  help: 'Total cache hits',
  labelNames: ['service', 'key'],
});

const cacheMisses = new prometheus.Counter({
  name: 'cache_misses_total',
  help: 'Total cache misses',
  labelNames: ['service', 'key'],
});

const cacheInvalidations = new prometheus.Counter({
  name: 'cache_invalidations_total',
  help: 'Total cache invalidations',
  labelNames: ['service', 'key'],
});

const cacheDataTimestamp = new prometheus.Gauge({
  name: 'cache_data_timestamp',
  help: 'Timestamp of cached data',
  labelNames: ['service', 'key'],
});

module.exports = { cacheHits, cacheMisses, cacheInvalidations, cacheDataTimestamp };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per cache stale. Alert per hit rate basso. Alert per invalidazione mancante.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando la cache mente. E quando non viene invalidata.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Cache: veritiera
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che le cache devono essere veritiere. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato di invalidare la cache.

```markdown
## Incident #CACHE-001: La Cache Che Ha Restituito I Dati Vecchi

**Data incident**: Lunedì 8 maggio 2026, 09:00
**Autore**: JN
**Servizio**: product-service
**Problema**: Cache non invalidata quando i prezzi cambiavano
**Causa**: Nessuna logica di invalidazione configurata
**Tempo in produzione**: 3 mesi
**Ordini con prezzo sbagliato**: 368
**Manci guadagni persi**: €6157
**Tempo di risoluzione**: 1 ora
**Downtime**: 0 (servizio degradato)
**Reazione UL**: "6157 euro?!"
**Reazione TL**: "Prezzi sbagliati?!"
**Reazione CTO**: "La cache va invalidata."
**Soluzione**: Invalidazione automatica + TTL + educazione
**Lezione imparata**: LA CACHE VA INVALIDATA. SEMPRE.

**Regole per la cache**:
1. La cache DEVE essere invalidata quando i dati cambiano.
2. Usa SEMPRE un TTL come rete di sicurezza.
3. Documenta cosa viene cachato e per quanto.
4. Testa l'invalidazione. Ogni. Singola. Volta.
5. Monitora la cache. Hit rate, invalidazioni, staleness.
6. Distingui tra read-through e write-through.
7. Quando in dubbio, invalida. Meglio troppe che troppo poche.
8. La cache è una bugia finché non la invalidi. Amen.

**Come configurare l'invalidazione**:
```javascript
// Quando aggiorni un dato
async function updateProduct(id, data) {
  // 1. Aggiorna il DB
  const result = await pool.query(
    'UPDATE products SET ... WHERE id = $1 RETURNING *',
    [id]
  );
  
  // 2. INVALIDA LA CACHE!
  await redisClient.del(`product:${id}`);
  
  // 3. Opzionale: aggiorna la cache con il nuovo dato
  await redisClient.setex(`product:${id}`, 3600, JSON.stringify(result.rows[0]));
  
  return result.rows[0];
}
```

**Come configurare un TTL**:
```javascript
// Salva in cache con TTL
await redisClient.setex(`product:${id}`, 3600, JSON.stringify(product));
//                                                        ^^^^
//                                                        TTL in secondi (1 ora)
```

**Come testare l'invalidazione**:
```javascript
describe('Cache Invalidation', () => {
  it('should invalidate cache when product is updated', async () => {
    // Crea prodotto
    const product = await createProduct({ name: 'Test', price: 100 });
    
    // Verifica che sia in cache
    const cached = await redisClient.get(`product:${product.id}`);
    expect(cached).not.toBeNull();
    
    // Aggiorna prodotto
    await updateProduct(product.id, { name: 'Test', price: 200 });
    
    // Verifica che la cache sia invalidata
    const cachedAfter = await redisClient.get(`product:${product.id}`);
    expect(cachedAfter).toBeNull();
    
    // Verifica che il nuovo dato sia corretto
    const fresh = await getProduct(product.id);
    expect(fresh.price).toBe(200);
  });
});
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che la cache va invalidata. E che i TTL sono essenziali. E che 6157 euro sono tanti. E che JN va educato. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: la cache è come una fotografia. Mostra il passato. E il passato può essere sbagliato. E se non la aggiorni, i clienti vedono il passato. E comprano a prezzi vecchi. E l'azienda perde soldi. E UL chiama. E tu rispondi. E dici: "La cache non era invalidata." E UL dice: "E PERCHÉ NON ERA INVALIDATA?!" E tu dici: "Perché JN non l'aveva configurato." E UL dice: "E QUANTO È COSTATO?!" E tu dici: "6157 euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che la cache è veloce. Ma è anche pericolosa. E se non la controlli, ti mente. E le bugie costano. Sempre. Amen.

---

## Il costo della cache bugiarda

| Voce | Valore |
|------|--------|
| Servizio | product-service |
| Autore | JN |
| Data creazione | Febbraio 2026 |
| Data incident | 08/05/2026, 09:00 |
| Tempo in produzione | 3 mesi |
| Prodotti con cache sbagliata | 4 |
| Ordini con prezzo sbagliato | 368 |
| Manci guadagni persi | €6157 |
| Tempo di risoluzione | 1 ora |
| Downtime | 0 (degradato) |
| Cache bugiarde trovate | 4 |
| Servizi affetti | product, user, order, catalog |
| Autori | JN, Bob, ME |
| Reazione UL | "6157 euro?!" |
| Reazione TL | "Prezzi sbagliati?!" |
| Reazione CTO | "Va invalidata." |
| Soluzione | Invalidazione + TTL + educazione |
| Lezione imparata | CACHE = INVALIDAZIONE |
| **Totale** | **€6157 persi + 4 cache fixate + 1 junior educato** |

**Morale**: La cache va invalidata. Sempre. Quando i dati cambiano, la cache deve cambiare. Se non la invalidi, la cache diventa una bugia. E le bugie costano. 6157 euro in 2 ore. E potevano essere di più. E la prossima volta, la cache viene invalidata. Automaticamente. E i clienti vedono i prezzi giusti. E l'azienda non perde soldi. E UL non chiama. O quasi. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](115-il-container-che-non-si-fermava-mai.md) | [Prossima](117-il-cron-che-ha-rivoltato-il-sistema.md)**
