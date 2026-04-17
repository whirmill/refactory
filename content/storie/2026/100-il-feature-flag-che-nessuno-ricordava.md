# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-tutto.md)**

---

C'è una verità nel feature flagging che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Quando una feature è completa, il flag va rimosso. Quando una feature è abbandonata, il flag va rimosso. Quando un flag è lì da 18 mesi, VA RIMOSSO. E invece. Invece i feature flag si accumulano. E si moltiplicano. E si dimenticano. E un giorno, JN tocca un flag vecchio di 18 mesi. E i prezzi impazziscono. E i clienti vedono prezzi a caso. E tu ti chiedi: "Com'è possibile che un flag vecchio di 18 mesi controlli i prezzi?" E la risposta è semplice: perché nessuno l'ha mai documentato. E nessuno l'ha mai rimosso. E il flag era lì. Nel codice. A controllare i prezzi. Per sempre. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi. Altri prezzi nuovi. È un casino.

**ME**: Prezzi sbagliati?!

**TL**: Prezzi sbagliati?!

**ME**: Sì. Alcuni clienti vedono prezzi vecchi. Altri prezzi nuovi.

**TL**: E QUANTI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=pricing-service --since=30m | grep -i price | tail -20
2027-01-16 08:45:12 INFO: Price calculated for product SKU-1234: €99.99 (user: 12345)
2027-01-16 08:45:13 INFO: Price calculated for product SKU-1234: €79.99 (user: 12346)
2027-01-16 08:45:14 INFO: Price calculated for product SKU-1234: €99.99 (user: 12347)
2027-01-16 08:45:15 INFO: Price calculated for product SKU-1234: €79.99 (user: 12348)

# Controlla differenze
kubectl logs -l app=pricing-service --since=1h | grep "SKU-1234" | awk '{print $NF}' | sort | uniq -c
    234 €79.99
    567 €99.99

# Controlla database
kubectl exec -it postgres-0 -- psql -U pricing -c "SELECT price FROM products WHERE sku = 'SKU-1234'"
price
-------
79.99
```

**ME**: Il prezzo nel database è €79.99. Ma alcuni clienti vedono €99.99.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Il codice deve avere una logica diversa.

**TL**: E QUALE LOGICA?!

**ME**: Controllo.

**TERMINALE**:
```
# Cerca logica prezzi
grep -r "99.99" src/
src/services/pricing/calculator.js:    if (featureFlags.get('legacy-pricing')) {
src/services/pricing/calculator.js:      return legacyPriceCalculation(product);
src/services/pricing/calculator.js:    }

# Controlla feature flag
grep -r "legacy-pricing" src/
src/services/pricing/calculator.js:    if (featureFlags.get('legacy-pricing')) {
src/config/feature-flags.js:  'legacy-pricing': true,

# Controlla configurazione
cat src/config/feature-flags.js
module.exports = {
  'legacy-pricing': true,
  'new-checkout': true,
  'experimental-cache': false,
  'beta-dashboard': true,
  'old-search': true,
  'temp-discount': true,
  'migration-v2': false,
  'test-api': true,
  // ... altri 47 flag
};
```

**ME**: C'è un feature flag "legacy-pricing" impostato a true.

**TL**: E COSA FA?!

**ME**: Usa il vecchio calcolo dei prezzi. Che è €99.99 invece di €79.99.

**TL**: E PERCHÉ È ANCORA ATTIVO?!

**ME**: Non lo so. Controllo quando è stato aggiunto.

**TERMINALE**:
```
# Controlla git blame
git log --all --oneline --grep="legacy-pricing"
abc1234 (HEAD -> main) Add legacy-pricing feature flag for migration

# Controlla data
git show abc1234 --format="%ci" --no-patch
2025-07-15 14:32:00 +0200

# Controlla autore
git show abc1234 --format="%an" --no-patch
Bob

# Controlla commit message
git show abc1234 --format="%B" --no-patch
Add legacy-pricing feature flag for migration

This flag enables the legacy pricing calculation during the migration to the new pricing system.
Should be removed after migration is complete.
```

**ME**: Il flag è stato aggiunto da Bob. Il 15 luglio 2025. 18 mesi fa.

**TL**: 18 MESI FA?!

**ME**: Sì. Per una migrazione. E doveva essere rimosso.

**TL**: E BOB?!

**ME**: Bob non c'è più. Se n'è andato 6 mesi fa.

**TL**: E NESSUNO L'HA RIMOSSO?!

**ME**: No. Perché nessuno sapeva che esisteva.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: legacy-pricing
- Valore: true
- Data aggiunta: 15/07/2025
- Autore: Bob (non più in azienda)
- Scopo: migrazione (completata 18 mesi fa)
- Documentazione: inesistente

E tutto era chiaro. Un flag dimenticato controllava i prezzi. E i clienti vedevano prezzi sbagliati. E nessuno sapeva perché. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai toccato i feature flag di recente?

**JN**: Sì. Venerdì. Ho aggiunto un flag per la nuova feature.

**ME**: E COS'HA FATTO?!

**JN**: Niente. Ho solo aggiunto il flag.

**ME**: E NON HAI TOCCATO GLI ALTRI FLAG?!

**JN**: No. Perché?

**ME**: Perché i prezzi sono impazziti.

**JN**: Cosa?!

**ME**: Alcuni clienti vedono €99.99. Altri €79.99. E il flag "legacy-pricing" è attivo da 18 mesi.

**JN**: 18 MESI?!

**ME**: Sì. E controlla i prezzi. E nessuno sapeva che esisteva.

**JN**: Ma... non l'ho toccato!

**ME**: E ALLORA COS'È SUCCESSO?!

**JN**: Non lo so! Ho solo aggiunto il mio flag!

**ME**: Fammi vedere il commit.

**TERMINALE**:
```
# Controlla commit di JN
git log --oneline --author="JN" --since="2027-01-13"
def4567 Add new-feature-v2 flag

# Controlla diff
git show def4567
-  'legacy-pricing': true,
+  'legacy-pricing': Math.random() > 0.5,  // JN: testing something
```

**ME**: JN. HAI CAMBIATO IL FLAG IN MATH.RANDOM() > 0.5?!

**JN**: Ah. Sì. Volevo testare una cosa.

**ME**: E COSA VOLEVI TESTARE?!

**JN**: Volevo vedere se i feature flag funzionavano in modo dinamico.

**ME**: DINAMICO?! HAI ROTTO I PREZZI!

**JN**: Ma... non sapevo che controllasse i prezzi!

**ME**: E PERCHÉ L'HAI TOCCATO?!

**JN**: Perché... c'era. E volevo testare.

**ME**: JN. NON SI TOCCANO I FLAG A CASO!

**JN**: Ma non c'era documentazione!

**ME**: E QUINDI?!

**JN**: E quindi... non sapevo che era importante.

**ME**: E ORA FIXI. E DOCUMENTI. E NON TOCCI PIÙ I FLAG A CASO!

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Flag: legacy-pricing
- Modifica: Math.random() > 0.5
- Autore: JN
- Motivo: "testing something"
- Risultato: prezzi impazziti

E la lezione era chiara. I feature flag vanno documentati. E JN va educato. E i flag a caso non si toccano. Amen.

---

**Lunedì - 10:00**

Ho fixato il flag. E iniziato l'audit.

**TERMINALE**:
```
# Fix flag
cat > src/config/feature-flags.js << 'EOF'
module.exports = {
  'legacy-pricing': false,  // RIMOSSO - migrazione completata 18 mesi fa
  'new-checkout': true,
  'experimental-cache': false,
  'beta-dashboard': true,
  'old-search': true,
  'temp-discount': true,
  'migration-v2': false,
  'test-api': true,
  // ... altri 47 flag
};
EOF

# Deploy
kubectl rollout restart deployment/pricing-service

# Verifica
kubectl logs -l app=pricing-service --since=5m | grep "SKU-1234" | awk '{print $NF}' | sort | uniq -c
    801 €79.99

# Controlla prezzi
curl -s https://api.company.com/pricing/SKU-1234
{"price": 79.99, "currency": "EUR"}
```

**ME**: Flag disattivato. Prezzi corretti.

**TL**: E GLI ALTRI FLAG?!

**ME**: Li controllo. Tutti.

**TERMINALE**:
```
# Conta feature flag
grep -o "'[^']*':" src/config/feature-flags.js | wc -l
55

# Controlla età di ogni flag
for flag in $(grep -oP "'\K[^']+(?=')" src/config/feature-flags.js); do
  commit=$(git log --all --oneline --grep="$flag" | head -1 | awk '{print $1}')
  if [ -n "$commit" ]; then
    date=$(git show $commit --format="%ci" --no-patch)
    author=$(git show $commit --format="%an" --no-patch)
    echo "$flag | $date | $author"
  fi
done

# Risultati
legacy-pricing | 2025-07-15 | Bob
new-checkout | 2026-03-20 | ME
experimental-cache | 2026-05-10 | JN
beta-dashboard | 2026-06-15 | PM
old-search | 2025-09-01 | Bob
temp-discount | 2026-11-25 | TL
migration-v2 | 2026-08-01 | ME
test-api | 2025-04-01 | Bob
...
```

**ME**: Ci sono 55 feature flag. E alcuni hanno 18+ mesi.

**TL**: 55 FLAG?!

**ME**: Sì. E molti non sono documentati.

**TL**: E QUALI SONO ATTIVI?!

**ME**: Controllo.

**TERMINALE**:
```
# Conta flag attivi
grep "true" src/config/feature-flags.js | wc -l
34

# Conta flag inattivi
grep "false" src/config/feature-flags.js | wc -l
21

# Flag attivi con età > 6 mesi
for flag in $(grep "true" src/config/feature-flags.js | grep -oP "'\K[^']+(?=')"); do
  commit=$(git log --all --oneline --grep="$flag" | head -1 | awk '{print $1}')
  if [ -n "$commit" ]; then
    date=$(git show $commit --format="%ci" --no-patch)
    age=$(( ($(date +%s) - $(date -d "$date" +%s)) / 86400 ))
    if [ $age -gt 180 ]; then
      echo "$flag | $date | $age giorni"
    fi
  fi
done

# Risultati
legacy-pricing | 2025-07-15 | 550 giorni
old-search | 2025-09-01 | 502 giorni
test-api | 2025-04-01 | 654 giorni
beta-dashboard | 2026-06-15 | 215 giorni
```

**ME**: Ci sono 4 flag attivi con più di 6 mesi. E uno ha 654 giorni.

**TL**: 654 GIORNI?!

**ME**: Sì. Quasi 2 anni.

**TL**: E COSA FA?!

**ME**: Non lo so. Non c'è documentazione.

**TL**: E COME FA A NON AVERE DOCUMENTAZIONE?!

**ME**: Perché... nessuno l'ha scritta.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag totali: 55
- Flag attivi: 34
- Flag inattivi: 21
- Flag > 6 mesi: 4
- Flag > 1 anno: 3
- Documentazione: inesistente

E tutto era chiaro. I feature flag si accumulano. E si dimenticano. E nessuno sa cosa fanno. Amen.

---

**Lunedì - 11:00**

Ho auditato tutti i flag. Per capire cosa fanno.

**TERMINALE**:
```
# Cerca uso di ogni flag
for flag in $(grep -oP "'\K[^']+(?=')" src/config/feature-flags.js); do
  echo "=== $flag ==="
  grep -r "$flag" src/ --include="*.js" | head -5
done

# Risultati parziali
=== legacy-pricing ===
src/services/pricing/calculator.js:    if (featureFlags.get('legacy-pricing')) {
src/services/pricing/calculator.js:      return legacyPriceCalculation(product);
# USA: calcolo prezzi legacy - CRITICO

=== old-search ===
src/services/search/engine.js:    if (featureFlags.get('old-search')) {
src/services/search/engine.js:      return oldSearchAlgorithm(query);
# USA: algoritmo ricerca vecchio - CRITICO

=== test-api ===
src/api/routes.js:    if (featureFlags.get('test-api')) {
src/api/routes.js:      router.use('/test', testRoutes);
# USA: endpoint di test esposti in produzione - PERICOLOSO

=== beta-dashboard ===
src/components/Dashboard.js:    if (featureFlags.get('beta-dashboard')) {
src/components/Dashboard.js:      return <BetaDashboard />;
# USA: dashboard beta per utenti selezionati - OK

=== temp-discount ===
src/services/pricing/discount.js:    if (featureFlags.get('temp-discount')) {
src/services/pricing/discount.js:      return price * 0.9;  // 10% sconto
# USA: sconto temporaneo del 10% - CRITICO (chi l'ha autorizzato?!)
```

**ME**: Il flag "test-api" espone endpoint di test in produzione.

**TL**: IN PRODUZIONE?!

**ME**: Sì. E il flag "temp-discount" applica uno sconto del 10% a tutti.

**TL**: A TUTTI?!

**ME**: Sì. E nessuno sa chi l'ha autorizzato.

**TL**: E QUANTO CI COSTA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla ordini con sconto
kubectl exec -it postgres-0 -- psql -U orders -c "
SELECT 
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  SUM(total) / COUNT(*) as avg_order_value
FROM orders 
WHERE created_at > '2026-11-25'
"
 total_orders | total_revenue | avg_order_value
--------------+---------------+-----------------
       456789 |    45678900.00 |         100.00

# Controlla sconto applicato
kubectl exec -it postgres-0 -- psql -U orders -c "
SELECT 
  COUNT(*) as discounted_orders,
  SUM(total * 0.1) as discount_given
FROM orders 
WHERE created_at > '2026-11-25'
AND discount_applied = true
"
 discounted_orders | discount_given
-------------------+----------------
            456789 |    4567890.00
```

**ME**: Abbiamo dato €4.567.890 di sconti. In 2 mesi.

**TL**: 4.5 MILIONI DI EURO?!

**ME**: Sì. E il flag è ancora attivo.

**TL**: E CHI L'HA ATTIVATO?!

**ME**: Il TL. Il 25 novembre.

**TL**: IO?!

**ME**: Sì. Per il Black Friday.

**TL**: E NON L'HO DISATTIVATO?!

**ME**: No. È ancora attivo.

**TL**: E QUANTO MANCA A NATALE?!

**ME**: È già passato. Siamo a gennaio.

**TL**: E QUINDI HO DATO SCONTI PER 2 MESI?!

**ME**: Sì. E costano 4.5 milioni.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag: temp-discount
- Scopo: Black Friday
- Data attivazione: 25/11/2026
- Data disattivazione: mai
- Costo: €4.567.890
- Autore: TL

E tutto era chiaro. Anche il TL dimentica i flag. E i flag costano. E costano tanto. Amen.

---

**Lunedì - 12:00**

Ho disattivato tutti i flag obsoleti. E documentato.

**TERMINALE**:
```
# Disattiva flag obsoleti
cat > src/config/feature-flags.js << 'EOF'
module.exports = {
  // === FLAG ATTIVI ===
  'new-checkout': true,           // 2026-03-20 - ME - Nuovo checkout flow
  'beta-dashboard': true,         // 2026-06-15 - PM - Dashboard beta per utenti selezionati
  
  // === FLAG DISATTIVATI (da rimuovere dopo verifica) ===
  'legacy-pricing': false,        // 2025-07-15 - Bob - RIMOSSO: migrazione completata
  'old-search': false,            // 2025-09-01 - Bob - RIMOSSO: nuovo algoritmo stabile
  'test-api': false,              // 2025-04-01 - Bob - RIMOSSO: endpoint di test in produzione
  'temp-discount': false,         // 2026-11-25 - TL - RIMOSSO: Black Friday terminato
  'experimental-cache': false,    // 2026-05-10 - JN - Mai completato
  'migration-v2': false,          // 2026-08-01 - ME - Migrazione completata
  
  // === DOCUMENTAZIONE OBBLIGATORIA ===
  // Ogni flag deve avere:
  // - Data aggiunta
  // - Autore
  // - Scopo
  // - Data rimozione prevista
  // - Impatto se dimenticato
};
EOF

# Deploy
kubectl rollout restart deployment/pricing-service
kubectl rollout restart deployment/search-service
kubectl rollout restart deployment/api-gateway

# Verifica
curl -s https://api.company.com/test/health
{"error": "Not found"}  # Endpoint di test rimossi

curl -s https://api.company.com/pricing/SKU-1234
{"price": 79.99}  # Prezzi corretti
```

**ME**: Tutti i flag obsoleti disattivati. Endpoint di test rimossi. Prezzi corretti.

**TL**: E GLI SCONTI?!

**ME**: Disattivati. Ma abbiamo perso 4.5 milioni.

**TL**: E ORA?!

**ME**: Ora documento. E aggiungo controlli.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag obsoleti: disattivati
- Endpoint test: rimossi
- Prezzi: corretti
- Sconti: fermati
- Costo totale: €4.567.890

E tutto era fixato. Ma i soldi erano persi. E la lezione era chiara. I feature flag vanno documentati. E rimossi. E controllati. Amen.

---

**Lunedì - 14:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL non era di buon umore.

**UL**: Pronto?

**ME**: Abbiamo avuto un problema con i feature flag.

**UL**: Che problema?

**ME**: Un flag dimenticato ha rotto i prezzi. E un altro ha dato 4.5 milioni di sconti non autorizzati.

**UL**: 4.5 MILIONI?!

**ME**: Sì. Il flag del Black Friday non è stato disattivato.

**UL**: E PERCHÉ?!

**ME**: Perché... ce ne siamo dimenticati.

**UL**: VI SIETE DIMENTICATI?!

**ME**: Sì. E c'erano altri 55 flag. E nessuno sapeva cosa facessero.

**UL**: 55 FLAG?!

**ME**: Sì. E alcuni avevano 2 anni.

**UL**: E NESSUNO LI CONTROLLAVA?!

**ME**: No. Perché non c'era documentazione.

**UL**: E ORA?!

**ME**: Ora ho disattivato i flag obsoleti. E documentato tutto. E aggiunto controlli.

**UL**: E I 4.5 MILIONI?!

**ME**: Persi. Non possiamo chiederli indietro.

**UL**: E JN?!

**ME**: JN ha toccato un flag a caso. Ma il problema era più grande.

**UL**: E QUANTO PIÙ GRANDE?!

**ME**: 55 flag. 34 attivi. 4 con più di 6 mesi. 0 documentati.

**UL**: E CHI È RESPONSABILE?!

**ME**: Tutti. Bob ha aggiunto flag. JN ha toccato flag. Il TL ha dimenticato flag. Io non ho controllato.

**UL**: E QUINDI?!

**ME**: E quindi... sistemiamo. E non succede più.

**UL**: E COME?!

**ME**: Con documentazione. E controlli automatici. E rimozione obbligatoria.

**UL**: Bene. Documenta tutto. E non succede più.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I feature flag costano. E la documentazione è obbligatoria. E la rimozione è essenziale. Amen.

---

**Martedì - L'Audit Completo**

Martedì. Ho auditato tutti i flag. In tutti i servizi.

**TERMINALE**:
```
# Cerca feature flag in tutti i servizi
for service in pricing search api checkout notification user; do
  echo "=== $service ==="
  grep -r "featureFlags" services/$service/src/ --include="*.js" | wc -l
done

# Risultati
=== pricing ===
23 flag usati
=== search ===
15 flag usati
=== api ===
8 flag usati
=== checkout ===
12 flag usati
=== notification ===
5 flag usati
=== user ===
7 flag usati

# Totale: 70 flag usati in produzione
```

**ME**: Ci sono 70 flag usati in produzione. In 6 servizi.

**TL**: 70 FLAG?!

**ME**: Sì. E molti non sono documentati.

**TL**: E QUANTI SONO CRITICI?!

**ME**: Controllo.

**TERMINALE**:
```
# Classifica flag per impatto
for flag in $(grep -roh "featureFlags.get('[^']*')" services/ | sort -u); do
  flag_name=$(echo $flag | sed "s/featureFlags.get('\([^']*\)')/\1/")
  count=$(grep -r "$flag_name" services/ --include="*.js" | wc -l)
  echo "$flag_name | $count usi"
done | sort -t'|' -k2 -nr | head -20

# Risultati
legacy-pricing | 23 usi - CRITICO
new-checkout | 18 usi - CRITICO
old-search | 15 usi - CRITICO
beta-dashboard | 12 usi - MEDIO
temp-discount | 10 usi - CRITICO
test-api | 8 usi - PERICOLOSO
experimental-cache | 7 usi - MEDIO
migration-v2 | 5 usi - BASSO
```

**ME**: 6 flag sono critici. Controllano prezzi, checkout, ricerca.

**TL**: E SONO DOCUMENTATI?!

**ME**: No. Nessuno lo è.

**TL**: E QUINDI?!

**ME**: E quindi... documento tutto. E aggiungo controlli.

**TERMINALE**:
```
# Crea documentazione
cat > docs/feature-flags.md << 'EOF'
# Feature Flags - Documentazione

## Regole

1. **Ogni flag DEVE essere documentato** prima del merge
2. **Ogni flag DEVE avere una data di rimozione**
3. **I flag vanno rimossi entro 30 giorni** dal completamento
4. **I flag critici vanno monitorati**
5. **Nessuno tocca i flag altrui senza approvazione**

## Flag Attivi

| Flag | Servizio | Autore | Data | Scopo | Rimozione |
|------|----------|--------|------|-------|-----------|
| new-checkout | checkout | ME | 2026-03-20 | Nuovo checkout flow | 2027-03-20 |
| beta-dashboard | dashboard | PM | 2026-06-15 | Dashboard beta | 2027-06-15 |

## Flag Rimossi

| Flag | Servizio | Autore | Data aggiunta | Data rimozione | Motivo |
|------|----------|--------|---------------|----------------|--------|
| legacy-pricing | pricing | Bob | 2025-07-15 | 2027-01-16 | Migrazione completata |
| old-search | search | Bob | 2025-09-01 | 2027-01-16 | Nuovo algoritmo stabile |
| test-api | api | Bob | 2025-04-01 | 2027-01-16 | Endpoint di test rimossi |
| temp-discount | pricing | TL | 2026-11-25 | 2027-01-16 | Black Friday terminato |

## Impatto dei Flag

### CRITICO
- legacy-pricing: Controlla i prezzi. Dimenticato = prezzi sbagliati.
- new-checkout: Controlla il checkout. Dimenticato = checkout rotto.
- old-search: Controlla la ricerca. Dimenticato = ricerca lenta.
- temp-discount: Applica sconti. Dimenticato = soldi persi.

### PERICOLOSO
- test-api: Espone endpoint di test. Dimenticato = vulnerabilità.

### MEDIO
- beta-dashboard: Dashboard beta. Dimenticato = confusione utenti.
- experimental-cache: Cache sperimentale. Dimenticato = performance incerte.
EOF
```

**ME**: Documentazione creata. Con regole. E flag. E impatto.

**TL**: E I CONTROLLI?!

**ME**: Aggiungo ora.

**TERMINALE**:
```
# Aggiungi controlli automatici
cat > scripts/audit-feature-flags.js << 'EOF'
const fs = require('fs');
const { execSync } = require('child_process');

// Leggi tutti i flag
const flagsFile = fs.readFileSync('src/config/feature-flags.js', 'utf8');
const flags = flagsFile.match(/'[^']+'/g).map(f => f.replace(/'/g, ''));

// Controlla età di ogni flag
const oldFlags = [];
for (const flag of flags) {
  const commit = execSync(`git log --all --oneline --grep="${flag}" | head -1`, { encoding: 'utf8' });
  if (commit) {
    const hash = commit.split(' ')[0];
    const date = execSync(`git show ${hash} --format="%ci" --no-patch`, { encoding: 'utf8' }).trim();
    const age = (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24);
    if (age > 30) {
      oldFlags.push({ flag, date, age: Math.floor(age) });
    }
  }
}

// Report
if (oldFlags.length > 0) {
  console.log('⚠️  FLAG VECCHI TROVATI:');
  oldFlags.forEach(f => {
    console.log(`  - ${f.flag}: ${f.age} giorni (dal ${f.date})`);
  });
  process.exit(1);
} else {
  console.log('✅ Tutti i flag sono recenti');
}
EOF

# Aggiungi a CI
cat > .github/workflows/feature-flags-audit.yml << 'EOF'
name: Feature Flags Audit
on: [push, pull_request, schedule]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Audit feature flags
        run: node scripts/audit-feature-flags.js
EOF

# Esegui audit
node scripts/audit-feature-flags.js
⚠️  FLAG VECCHI TROVATI:
  - new-checkout: 302 giorni (dal 2026-03-20)
  - beta-dashboard: 215 giorni (dal 2026-06-15)
```

**ME**: Audit automatico aggiunto. Trova flag vecchi di più di 30 giorni.

**TL**: E SE NE TROVA?!

**ME**: La CI fallisce. E non si può fare merge.

**TL**: E SE È INTENZIONALE?!

**ME**: Allimenti aggiungi un'eccezione. Con documentazione.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Documentazione: creata
- Audit automatico: attivo
- CI: configurata
- Flag vecchi: trovati

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno documentati. E controllati. E rimossi. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il flag che hai toccato è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i feature flag non si toccano a caso.

**JN**: Non sapevo che fosse importante!

**ME**: E quindi chiedi. Prima di toccare. Chiedi a me. Al TL. A qualcuno.

**JN**: Ok.

**ME**: Secondo: ogni flag deve essere documentato.

**JN**: Documentato?

**ME**: Sì. Con data. Autore. Scopo. E data di rimozione.

**JN**: E se non so cosa fa?

**ME**: Allora non lo tocchi. E chiedi.

**JN**: Ok.

**ME**: Terzo: i flag vanno rimossi.

**JN**: Quando?

**ME**: Quando la feature è completa. O abbandonata. Entro 30 giorni.

**JN**: E se non so se è completa?

**ME**: Allora chiedi. Al PM. Al TL. A chi l'ha aggiunto.

**JN**: Ok.

**ME**: Quarto: i flag hanno impatti diversi.

**JN**: Diversi?

**ME**: Sì. Alcuni controllano i prezzi. Altri il checkout. Altri la ricerca. E se tocchi quello sbagliato, rompi tutto.

**JN**: E come faccio a saperlo?

**ME**: Leggi la documentazione. E se non c'è, non tocchi.

**JN**: Ok.

**ME**: Quinto: c'è un audit automatico.

**JN**: Cosa fa?

**ME**: Controlla i flag vecchi. E se ne trova, la CI fallisce.

**JN**: E se devo tenere un flag vecchio?

**ME**: Allora lo documenti. Con il motivo. E l'eccezione.

**JN**: E se non so come?

**ME**: Allora chiedi. A me. Al TL. A qualcuno.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Documentazione: obbligatoria
- Audit: automatico
- Rimozione: entro 30 giorni
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere documentazione. E controlli. E educazione. Amen.

---

**Giovedì - La Pulizia**

Giovedì. Ho rimosso i flag obsoleti. Dal codice.

**TERMINALE**:
```
# Rimuovi flag legacy-pricing
git rm src/services/pricing/legacy-calculator.js
sed -i '/legacy-pricing/d' src/config/feature-flags.js
sed -i '/legacyPriceCalculation/d' src/services/pricing/calculator.js

# Rimuovi flag old-search
git rm src/services/search/old-engine.js
sed -i '/old-search/d' src/config/feature-flags.js
sed -i '/oldSearchAlgorithm/d' src/services/search/engine.js

# Rimuovi flag test-api
git rm src/api/test-routes.js
sed -i '/test-api/d' src/config/feature-flags.js
sed -i '/testRoutes/d' src/api/routes.js

# Rimuovi flag temp-discount
sed -i '/temp-discount/d' src/config/feature-flags.js
sed -i '/price \* 0.9/d' src/services/pricing/discount.js

# Commit
git add .
git commit -m "Remove obsolete feature flags

- legacy-pricing: migration completed 18 months ago
- old-search: new algorithm stable
- test-api: test endpoints removed from production
- temp-discount: Black Friday ended 2 months ago

Total flags removed: 4
Code removed: 2347 lines
Technical debt reduced: significant"

# Push
git push origin main
```

**ME**: 4 flag rimossi. 2347 righe di codice eliminate.

**TL**: E IL DEBITO TECNICO?!

**ME**: Ridotto. Significativamente.

**TL**: E GLI ALTRI FLAG?!

**ME**: Li tengo. Ma documentati. E monitorati.

**TL**: E QUANTI NE RESTANO?!

**ME**: 51. Ma tutti documentati.

**TL**: E L'AUDIT?!

**ME**: Attivo. Controlla ogni giorno.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 4
- Codice eliminato: 2347 righe
- Flag rimanenti: 51
- Documentazione: completa
- Audit: attivo

E tutto era pulito. Ma avevo imparato una lezione. La lezione che i feature flag si accumulano. E vanno rimossi. E documentati. E controllati. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 09:00
**Autore**: JN (modifica) + Bob (flag originale)
**Servizio**: pricing-service
**Problema**: Flag dimenticato ha rotto i prezzi
**Causa**: Flag "legacy-pricing" attivo da 18 mesi, mai documentato
**Tempo in produzione**: 18 mesi
**Clienti affetti**: ~800 (prezzi sbagliati)
**Sconti non autorizzati**: €4.567.890 (flag "temp-discount" dimenticato)
**Tempo di risoluzione**: 4 ore
**Downtime**: 0
**Reazione UL**: "4.5 milioni?!"
**Reazione TL**: "Ho dimenticato il flag?!"
**Reazione CTO**: "Documentazione obbligatoria. Audit automatico."
**Soluzione**: Flag rimossi + documentazione + audit automatico
**Lezione imparata**: I FEATURE FLAG VANNO DOCUMENTATI E RIMOSSI. SEMPRE.

**Regole per i feature flag**:
1. DOCUMENTA ogni flag. Con data, autore, scopo, rimozione prevista.
2. RIMUOVI i flag entro 30 giorni dal completamento.
3. NON TOCCARE i flag altrui senza approvazione.
4. USA l'audit automatico per trovare flag vecchi.
5. I FLAG CRITICI vanno monitorati.
6. I FLAG PERICOLOSI (test-api) vanno rimossi subito.
7. I FLAG DI SCONTO vanno disattivati dopo la promozione.
8. I feature flag sono debito tecnico. Vanno pagati. Amen.

**Come documentare un feature flag**:
```javascript
// src/config/feature-flags.js
module.exports = {
  // === FLAG ATTIVI ===
  'new-checkout': {
    value: true,
    author: 'ME',
    date: '2026-03-20',
    purpose: 'Nuovo checkout flow con validazione migliorata',
    removal: '2027-03-20',
    impact: 'CRITICO - Controlla il checkout',
    approved: 'TL'
  },
  
  'beta-dashboard': {
    value: true,
    author: 'PM',
    date: '2026-06-15',
    purpose: 'Dashboard beta per utenti selezionati',
    removal: '2027-06-15',
    impact: 'MEDIO - Solo per utenti beta',
    approved: 'PM'
  }
};
```

**Come configurare l'audit automatico**:
```yaml
# .github/workflows/feature-flags-audit.yml
name: Feature Flags Audit
on: [push, pull_request, schedule]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Audit feature flags
        run: node scripts/audit-feature-flags.js
```

**Come rimuovere un feature flag**:
```bash
# 1. Verifica che non sia più usato
grep -r "flag-name" src/

# 2. Rimuovi il codice condizionale
# Sostituisci:
if (featureFlags.get('flag-name')) {
  newCode();
} else {
  oldCode();
}
# Con:
newCode();

# 3. Rimuovi il flag dalla configurazione
sed -i '/flag-name/d' src/config/feature-flags.js

# 4. Commit con documentazione
git commit -m "Remove flag-name: feature completed"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag vanno documentati. E rimossi. E controllati. E che 4.5 milioni di sconti sono tanti. E che JN va educato. E che anche io dimentico i flag. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come i prestiti. Se non li paghi, si accumulano. E se si accumulano, ti schiacciano. E se ti schiacciano, il sistema crolla. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il flag era lì da 18 mesi." E UL dice: "E PERCHÉ ERA ANCORA LÌ?!" E tu dici: "Perché nessuno l'ha rimosso." E UL dice: "E PERCHÉ NESSUNO L'HA RIMOSSO?!" E tu dici: "Perché non c'era documentazione." E UL dice: "E PERCHÉ NON C'ERA DOCUMENTAZIONE?!" E tu dici: "Perché... ce ne siamo dimenticati." E la verità è che tutti dimenticano. I junior dimenticano. I senior dimenticano. I TL dimenticano. E l'unico modo per non dimenticare è avere documentazione. E controlli. E audit. E educazione. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | pricing-service |
| Flag problematico | legacy-pricing |
| Autore flag | Bob |
| Data aggiunta | 15/07/2025 |
| Data incident | 16/01/2027 |
| Tempo in produzione | 18 mesi |
| Flag totali trovati | 55 |
| Flag attivi | 34 |
| Flag > 6 mesi | 4 |
| Flag > 1 anno | 3 |
| Clienti con prezzi sbagliati | ~800 |
| Sconti non autorizzati | €4.567.890 |
| Flag rimossi | 4 |
| Codice eliminato | 2347 righe |
| Reazione UL | "4.5 milioni?!" |
| Reazione TL | "Ho dimenticato il flag?!" |
| Reazione CTO | "Documentazione obbligatoria." |
| Soluzione | Flag rimossi + documentazione + audit |
| Lezione imparata | FLAG = DOCUMENTAZIONE + RIMOZIONE |
| **Totale** | **€4.567.890 persi + 4 flag rimossi + 1 junior educato + 1 TL educato** |

**Morale**: I feature flag vanno documentati. E rimossi. Sempre. Quando una feature è completa, il flag va rimosso. Quando una feature è abbandonata, il flag va rimosso. Quando un flag è lì da 18 mesi, VA RIMOSSO. E se non lo rimuovi, si accumula. E se si accumula, qualcuno lo tocca. E se qualcuno lo tocca, rompe tutto. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il flag era lì da 18 mesi." E UL dice: "E PERCHÉ ERA ANCORA LÌ?!" E tu dici: "Perché nessuno l'ha rimosso." E UL dice: "E QUANTO È COSTATO?!" E tu dici: "4.5 milioni di euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che i feature flag sono debito tecnico. E il debito va pagato. Sempre. E la prossima volta, documenti. E rimuovi. E controlli. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-tutto.md)**
