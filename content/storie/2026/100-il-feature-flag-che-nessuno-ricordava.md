# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-tutto.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Dopo che la feature è stata rilasciata. Dopo che è stata testata. Dopo che è stata verificata. I feature flag non sono permanenti. Sono temporanei. E quando li dimentichi, si accumulano. E quando si accumulano, il codice diventa incomprensibile. E quando il codice è incomprensibile, nessuno sa cosa fa. E quando nessuno sa cosa fa, qualcuno cambia un flag. E quando qualcuno cambia un flag, il sistema si rompe. E tu ti chiedi: "Com'è possibile che un flag abbia rotto tutto?" E la risposta è semplice: perché il flag era lì da 18 mesi. E nessuno sapeva a cosa serviva. E qualcuno l'ha cambiato. E il sistema è crollato. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi. Altri prezzi nuovi. Altri prezzi casuali.

**ME**: Prezzi casuali?!

**TL**: Prezzi casuali?!

**ME**: Sì. Come se il sistema scegliesse a caso quale prezzo mostrare.

**TL**: E QUANTI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=pricing-service --since=30m | grep -i price | tail -20
2027-01-16 08:45:12 INFO: Calculating price for product SKU-12345
2027-01-16 08:45:12 DEBUG: Feature flag USE_NEW_PRICING = true
2027-01-16 08:45:12 INFO: Price calculated: €99.99

2027-01-16 08:45:15 INFO: Calculating price for product SKU-12345
2027-01-16 08:45:15 DEBUG: Feature flag USE_NEW_PRICING = false
2027-01-16 08:45:15 INFO: Price calculated: €79.99

2027-01-16 08:45:18 INFO: Calculating price for product SKU-12345
2027-01-16 08:45:18 DEBUG: Feature flag USE_NEW_PRICING = null
2027-01-16 08:45:18 INFO: Price calculated: €89.99

# Controlla feature flag
curl -s http://feature-flags:8080/api/v1/flags/USE_NEW_PRICING
{
  "name": "USE_NEW_PRICING",
  "enabled": true,
  "variants": {
    "control": false,
    "treatment": true
  },
  "rules": [
    {"type": "percentage", "value": 50}
  ],
  "created": "2025-06-15T10:00:00Z",
  "lastModified": "2025-06-15T10:00:00Z"
}
```

**ME**: Il feature flag USE_NEW_PRICING è al 50%. Metà dei clienti vede il nuovo prezzo. Metà il vecchio.

**TL**: E QUANDO È STATO CREATO?!

**ME**: Giugno 2025. 18 mesi fa.

**TL**: 18 MESI?!

**ME**: Sì. E non è mai stato modificato.

**TL**: E CHE FEATURE ERA?!

**ME**: Non lo so. Controllo la documentazione.

**TERMINALE**:
```
# Cerca documentazione
grep -r "USE_NEW_PRICING" docs/ wiki/ confluence/
docs/pricing-migration-2025.md:USE_NEW_PRICING: Flag per la nuova logica di pricing

# Leggi documentazione
cat docs/pricing-migration-2025.md
# Pricing Migration 2025
# Data: 15 Giugno 2025
# Autore: Bob (non più in azienda)
#
# USE_NEW_PRICING: Flag per attivare la nuova logica di pricing
# - true: usa il nuovo algoritmo di pricing con sconti dinamici
# - false: usa il vecchio algoritmo con prezzi fissi
#
# TODO: Rimuovere il flag dopo la migrazione completata (Luglio 2025)
```

**ME**: Il flag doveva essere rimosso a luglio 2025. 18 mesi fa.

**TL**: E PERCHÉ NON È STATO RIMOSSO?!

**ME**: Bob l'ha creato. Bob non c'è più. E nessuno l'ha rimosso.

**TL**: E ORA?!

**ME**: Ora il flag è ancora al 50%. E i clienti vedono prezzi diversi.

**TL**: E I PREZZI SONO CORRETTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla quale prezzo è corretto
curl -s http://pricing-service:8080/api/v1/products/SKU-12345/price?use_new=true
{"price": 99.99, "currency": "EUR"}

curl -s http://pricing-service:8080/api/v1/products/SKU-12345/price?use_new=false
{"price": 79.99, "currency": "EUR"}

# Controlla database
kubectl exec -it postgres-0 -- psql -U pricing -c "SELECT * FROM products WHERE sku = 'SKU-12345'"
sku      | base_price | discount_price | last_updated
---------+------------+----------------+---------------
SKU-12345| 99.99      | 79.99          | 2025-06-15
```

**ME**: Il prezzo base è 99.99. Il prezzo scontato è 79.99. Il flag decide quale mostrare.

**TL**: E QUALE È CORRETTO?!

**ME**: Non lo so. La documentazione dice "nuova logica di pricing con sconti dinamici". Ma non dice quale è quello giusto.

**TL**: E BOB?!

**ME**: Bob non c'è più. E non ha lasciato indicazioni.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: USE_NEW_PRICING
- Creato: Giugno 2025
- Ultima modifica: Giugno 2025
- Stato: 50% attivo
- Documentazione: incompleta
- Autore: Bob (non più in azienda)

E tutto era chiaro. Il flag era stato dimenticato. E ora credeva confusione. E nessuno sapeva cosa fare. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, conosci il feature flag USE_NEW_PRICING?

**JN**: No. Perché?

**ME**: È attivo da 18 mesi. E sta causando prezzi diversi per lo stesso prodotto.

**JN**: 18 mesi?!

**ME**: Sì. L'ha creato Bob. E nessuno l'ha mai rimosso.

**JN**: E CHE FA?!

**ME**: Non lo so. La documentazione è incompleta.

**JN**: E ORA?!

**ME**: Ora dobbiamo capire quale prezzo è corretto. E rimuovere il flag.

**JN**: E COME?!

**ME**: Analizziamo il codice. E i log. E vediamo cosa fa.

**TERMINALE**:
```
# Cerca il codice
grep -r "USE_NEW_PRICING" src/ --include="*.js" -A5 -B5

# Risultato
src/services/pricing.js:
  const useNewPricing = await featureFlags.get('USE_NEW_PRICING', { userId });
  
  if (useNewPricing) {
    // Nuova logica: sconti dinamici basati su storico cliente
    const discount = await calculateDynamicDiscount(userId, product);
    return basePrice * (1 - discount);
  } else {
    // Vecchia logica: prezzo fisso con sconto standard
    return discountPrice;
  }

# Cerca calculateDynamicDiscount
grep -r "calculateDynamicDiscount" src/ --include="*.js" -A20

# Risultato
src/services/pricing.js:
  async function calculateDynamicDiscount(userId, product) {
    // Calcola sconto basato su:
    // 1. Storico acquisti cliente
    // 2. Stagionalità
    // 3. Scorte disponibili
    // 4. Competitor prices
    
    const purchaseHistory = await getPurchaseHistory(userId);
    const seasonality = await getSeasonalityFactor(product.category);
    const stock = await getStockLevel(product.sku);
    const competitorPrice = await getCompetitorPrice(product.sku);
    
    let discount = 0;
    
    // Sconto per clienti fedeli
    if (purchaseHistory.totalSpent > 1000) {
      discount += 0.10;
    }
    
    // Sconto stagionale
    discount += seasonality.discount;
    
    // Sconto per sovrastock
    if (stock > 100) {
      discount += 0.05;
    }
    
    // Match competitor
    if (competitorPrice < basePrice * (1 - discount)) {
      discount = (basePrice - competitorPrice) / basePrice;
    }
    
    return Math.min(discount, 0.30); // Max 30% sconto
  }
```

**ME**: La nuova logica calcola sconti dinamici. La vecchia usa prezzi fissi.

**JN**: E QUALE È MEGLIO?!

**ME**: La nuova logica è più sofisticata. Ma non so se è quella che vogliamo.

**JN**: E COME LO SCOOPRIAMO?!

**ME**: Chiediamo a UL. E al marketing. E vediamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Vecchia logica: prezzi fissi
- Nuova logica: sconti dinamici
- Flag: 50% attivo
- Decisione: da prendere

E tutto era chiaro. Ma la decisione non era nostra. Era del business. Amen.

---

**Lunedì - 10:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo un problema con i prezzi.

**UL**: Che problema?

**ME**: C'è un feature flag attivo da 18 mesi. Che mostra prezzi diversi ai clienti.

**UL**: 18 mesi?!

**ME**: Sì. L'ha creato Bob. Per la nuova logica di pricing. E non l'ha mai rimosso.

**UL**: E CHE FA?!

**ME**: Metà dei clienti vede prezzi con sconti dinamici. Metà vede prezzi fissi.

**UL**: E QUALE È CORRETTO?!

**ME**: Non lo so. La documentazione è incompleta. E Bob non c'è più.

**UL**: E I CLIENTI?!

**ME**: Vedono prezzi diversi. E sono confusi.

**UL**: E QUANTI SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta clienti per tipo di prezzo
kubectl exec -it postgres-0 -- psql -U orders -c "
SELECT 
  CASE 
    WHEN price > 90 THEN 'new_pricing'
    WHEN price < 85 THEN 'old_pricing'
    ELSE 'unknown'
  END as pricing_type,
  COUNT(*) as orders,
  SUM(total) as revenue
FROM orders
WHERE created_at > '2027-01-16 00:00:00'
GROUP BY pricing_type
"

pricing_type | orders | revenue
-------------+--------+---------
new_pricing  | 1234   | 123456.78
old_pricing  | 1187   | 94960.00
unknown      | 23     | 2070.00
```

**ME**: 1234 ordini con nuovo pricing. 1187 con vecchio. Revenue diverso.

**UL**: E QUALE È MEGLIO?!

**ME**: Il nuovo pricing genera più revenue. €123k vs €95k.

**UL**: E ALLORA USIAMO IL NUOVO!

**ME**: Ok. Rimuovo il flag. E attivo il nuovo pricing per tutti.

**UL**: E DOCUMENTA!

**ME**: Sì. E aggiungo controlli per i feature flag dimenticati.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I feature flag vanno rimossi. E le decisioni vanno prese. E la documentazione è essenziale. Amen.

---

**Lunedì - 10:30**

Ho attivato il nuovo pricing per tutti. E rimosso il flag.

**TERMINALE**:
```
# Attiva nuovo pricing per tutti
curl -X PUT http://feature-flags:8080/api/v1/flags/USE_NEW_PRICING \
  -H "Content-Type: application/json" \
  -d '{"enabled": true, "rules": [{"type": "percentage", "value": 100}]}'

# Verifica
curl -s http://feature-flags:8080/api/v1/flags/USE_NEW_PRICING
{
  "name": "USE_NEW_PRICING",
  "enabled": true,
  "rules": [{"type": "percentage", "value": 100}]
}

# Controlla log
kubectl logs -l app=pricing-service --since=5m | grep -i "USE_NEW_PRICING" | tail -5
2027-01-16 10:31:12 DEBUG: Feature flag USE_NEW_PRICING = true
2027-01-16 10:31:15 DEBUG: Feature flag USE_NEW_PRICING = true
2027-01-16 10:31:18 DEBUG: Feature flag USE_NEW_PRICING = true
```

**ME**: Nuovo pricing attivo per tutti.

**TL**: E I CLIENTI?!

**ME**: Vedono tutti lo stesso prezzo. Con sconti dinamici.

**TL**: E IL REVENUE?!

**ME**: Dovrebbe aumentare. Il nuovo pricing genera più margini.

**TL**: E IL FLAG?!

**ME**: Lo rimuovo dal codice. E dalla piattaforma.

**TERMINALE**:
```
# Rimuovi flag dal codice
cat > src/services/pricing.js << 'EOF'
async function calculatePrice(userId, product) {
  // Nuova logica: sconti dinamici basati su storico cliente
  // (Flag USE_NEW_PRICING rimosso - era temporaneo per migrazione 2025)
  const discount = await calculateDynamicDiscount(userId, product);
  return product.basePrice * (1 - discount);
}
EOF

# Rimuovi flag dalla piattaforma
curl -X DELETE http://feature-flags:8080/api/v1/flags/USE_NEW_PRICING

# Deploy
kubectl rollout restart deployment/pricing-service
```

**ME**: Flag rimosso. Codice semplificato. Deploy in corso.

**TL**: E GLI ALTRI FLAG?!

**ME**: Li controllo. Per vedere se ce ne sono altri dimenticati.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag: rimosso
- Codice: semplificato
- Pricing: unificato
- Revenue: in aumento

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno rimossi. E che il codice va pulito. E che la documentazione è essenziale. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i feature flag. Per trovare altri flag dimenticati.

**TERMINALE**:
```
# Lista tutti i feature flag
curl -s http://feature-flags:8080/api/v1/flags | jq '.[] | {name, created, lastModified}'

# Risultati
{
  "name": "USE_NEW_PRICING",
  "created": "2025-06-15T10:00:00Z",
  "lastModified": "2025-06-15T10:00:00Z"
} # RIMOSSO

{
  "name": "ENABLE_NEW_CHECKOUT",
  "created": "2025-03-20T14:00:00Z",
  "lastModified": "2025-03-20T14:00:00Z"
} # 22 MESI FA

{
  "name": "DARK_MODE_ENABLED",
  "created": "2024-11-10T09:00:00Z",
  "lastModified": "2024-11-10T09:00:00Z"
} # 26 MESI FA

{
  "name": "USE_V2_API",
  "created": "2024-08-05T11:00:00Z",
  "lastModified": "2024-08-05T11:00:00Z"
} # 29 MESI FA

{
  "name": "EXPERIMENTAL_SEARCH",
  "created": "2024-05-15T16:00:00Z",
  "lastModified": "2024-05-15T16:00:00Z"
} # 32 MESI FA

{
  "name": "NEW_EMAIL_TEMPLATES",
  "created": "2023-12-01T10:00:00Z",
  "lastModified": "2023-12-01T10:00:00Z"
} # 37 MESI FA

{
  "name": "LEGACY_PAYMENT_FLOW",
  "created": "2023-06-20T08:00:00Z",
  "lastModified": "2023-06-20T08:00:00Z"
} # 43 MESI FA

# Conta flag totali
curl -s http://feature-flags:8080/api/v1/flags | jq 'length'
47

# Conta flag vecchi (>6 mesi senza modifiche)
curl -s http://feature-flags:8080/api/v1/flags | jq '[.[] | select((now - (.lastModified | fromdateiso8601)) > 15778800)] | length'
23
```

**ME**: 47 feature flag totali. 23 non modificati da più di 6 mesi.

**TL**: 23?!

**ME**: Sì. E alcuni hanno 3-4 anni.

**TL**: E CHE FANNO?!

**ME**: Non lo so. Controllo uno per uno.

**TERMINALE**:
```
# Controlla ENABLE_NEW_CHECKOUT
grep -r "ENABLE_NEW_CHECKOUT" src/ --include="*.js" -A5 -B5
# Risultato: Flag usato in checkout.js, ma il nuovo checkout è l'unico checkout

# Controlla DARK_MODE_ENABLED
grep -r "DARK_MODE_ENABLED" src/ --include="*.js" -A5 -B5
# Risultato: Flag usato in ui.js, ma dark mode è sempre attivo

# Controlla USE_V2_API
grep -r "USE_V2_API" src/ --include="*.js" -A5 -B5
# Risultato: Flag usato in api.js, ma V2 è l'unica API

# Controlla EXPERIMENTAL_SEARCH
grep -r "EXPERIMENTAL_SEARCH" src/ --include="*.js" -A5 -B5
# Risultato: Flag usato in search.js, ma la ricerca sperimentale è ora quella standard

# Controlla NEW_EMAIL_TEMPLATES
grep -r "NEW_EMAIL_TEMPLATES" src/ --include="*.js" -A5 -B5
# Risultato: Flag usato in email.js, ma i nuovi template sono gli unici template

# Controlla LEGACY_PAYMENT_FLOW
grep -r "LEGACY_PAYMENT_FLOW" src/ --include="*.js" -A5 -B5
# Risultato: Flag usato in payment.js, ma il legacy flow è stato rimosso
```

**ME**: Tutti questi flag sono obsoleti. Le feature sono state completate. Ma i flag non sono stati rimossi.

**TL**: E QUINDI?!

**ME**: E quindi... il codice ha if per feature che non esistono più.

**TL**: E POSSONO CAUSARE PROBLEMI?!

**ME**: Sì. Se qualcuno li cambia. Come con USE_NEW_PRICING.

**TL**: E QUANTI IF INUTILI CI SONO?!

**ME**: Controllo.

**TERMINALE**:
```
# Conta riferimenti ai flag obsoleti
for flag in ENABLE_NEW_CHECKOUT DARK_MODE_ENABLED USE_V2_API EXPERIMENTAL_SEARCH NEW_EMAIL_TEMPLATES LEGACY_PAYMENT_FLOW; do
  count=$(grep -r "$flag" src/ --include="*.js" | wc -l)
  echo "$flag: $count riferimenti"
done

ENABLE_NEW_CHECKOUT: 12 riferimenti
DARK_MODE_ENABLED: 8 riferimenti
USE_V2_API: 23 riferimenti
EXPERIMENTAL_SEARCH: 15 riferimenti
NEW_EMAIL_TEMPLATES: 7 riferimenti
LEGACY_PAYMENT_FLOW: 34 riferimenti

# Totale
echo "Totale: $((12+8+23+15+7+34)) riferimenti"
Totale: 99 riferimenti
```

**ME**: 99 riferimenti a flag obsoleti. Nel codice.

**TL**: 99?!

**ME**: Sì. 99 if che non servono più.

**TL**: E QUINDI?!

**ME**: E quindi... puliamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag obsoleti: 23
- Riferimenti nel codice: 99+
- Tempo perso: anni
- Pulizia: necessaria

E tutto era chiaro. I feature flag si accumulano. E il codice si riempie di if inutili. E qualcuno deve pulire. Amen.

---

**Mercoledì - La Pulizia**

Mercoledì. Ho iniziato a pulire. Uno per uno. Con pazienza.

**TERMINALE**:
```
# Rimuovi ENABLE_NEW_CHECKOUT
# Il nuovo checkout è l'unico checkout. Flag obsoleto.

# Prima
if (await featureFlags.get('ENABLE_NEW_CHECKOUT')) {
  return newCheckout();
} else {
  return legacyCheckout();
}

# Dopo
return newCheckout();

# Rimuovi DARK_MODE_ENABLED
# Dark mode è sempre attivo. Flag obsoleto.

# Prima
const darkMode = await featureFlags.get('DARK_MODE_ENABLED', { userId });
if (darkMode) {
  applyDarkMode();
}

# Dopo
applyDarkMode();

# Rimuovi USE_V2_API
# V2 è l'unica API. Flag obsoleto.

# Prima
const useV2 = await featureFlags.get('USE_V2_API');
if (useV2) {
  return v2Api.call(params);
} else {
  return v1Api.call(params);
}

# Dopo
return v2Api.call(params);

# Rimuovi EXPERIMENTAL_SEARCH
# La ricerca sperimentale è ora standard. Flag obsoleto.

# Prima
const experimental = await featureFlags.get('EXPERIMENTAL_SEARCH');
if (experimental) {
  return searchV2(query);
} else {
  return searchV1(query);
}

# Dopo
return searchV2(query);

# Rimuovi NEW_EMAIL_TEMPLATES
# I nuovi template sono gli unici. Flag obsoleto.

# Prima
const newTemplates = await featureFlags.get('NEW_EMAIL_TEMPLATES');
if (newTemplates) {
  return renderNewTemplate(template, data);
} else {
  return renderOldTemplate(template, data);
}

# Dopo
return renderNewTemplate(template, data);

# Rimuovi LEGACY_PAYMENT_FLOW
# Il legacy flow è stato rimosso. Flag obsoleto.

# Prima
const legacy = await featureFlags.get('LEGACY_PAYMENT_FLOW');
if (legacy) {
  return legacyPayment.process(payment);
} else {
  return newPayment.process(payment);
}

# Dopo
return newPayment.process(payment);
```

**ME**: 6 flag rimossi. 99 if semplificati.

**TL**: E IL CODICE?!

**ME**: Più pulito. Più leggibile. Più manutenibile.

**TL**: E GLI ALTRI 17?!

**ME**: Li controllo. Uno per uno.

**TERMINALE**:
```
# Controlla gli altri flag vecchi
curl -s http://feature-flags:8080/api/v1/flags | jq '.[] | select((now - (.lastModified | fromdateiso8601)) > 15778800) | .name' | head -10

"ENABLE_CACHE_REDIS"
"USE_NEW_AUTH"
"EXPERIMENTAL_FEATURE_X"
"OLD_UI_FLAG"
"TEST_FEATURE_123"
"BOB_EXPERIMENT"
"TEMPORARY_FIX"
"MIGRATION_FLAG"
"DEPRECATED_API"
"REMOVED_FEATURE"

# Analizza ogni flag
for flag in ENABLE_CACHE_REDIS USE_NEW_AUTH EXPERIMENTAL_FEATURE_X OLD_UI_FLAG TEST_FEATURE_123 BOB_EXPERIMENT TEMPORARY_FIX MIGRATION_FLAG DEPRECATED_API REMOVED_FEATURE; do
  echo "=== $flag ==="
  grep -r "$flag" src/ --include="*.js" | head -3
done

# Risultati
=== ENABLE_CACHE_REDIS ===
# Flag usato, ma Redis è l'unica cache. Obsoleto.

=== USE_NEW_AUTH ===
# Flag usato, ma la nuova auth è l'unica auth. Obsoleto.

=== EXPERIMENTAL_FEATURE_X ===
# Flag usato, ma la feature X è stata rimossa. Obsoleto.

=== OLD_UI_FLAG ===
# Flag usato, ma la vecchia UI è stata rimossa. Obsoleto.

=== TEST_FEATURE_123 ===
# Flag usato per test. Mai rimosso. Obsoleto.

=== BOB_EXPERIMENT ===
# Flag di Bob. Bob non c'è più. Nessuno sa cosa fa. Obsoleto.

=== TEMPORARY_FIX ===
# Flag per fix temporaneo. Mai rimosso. Obsoleto.

=== MIGRATION_FLAG ===
# Flag per migrazione completata. Obsoleto.

=== DEPRECATED_API ===
# Flag per API deprecata. API rimossa. Obsoleto.

=== REMOVED_FEATURE ===
# Flag per feature rimossa. Obsoleto.
```

**ME**: Tutti obsoleti. Tutti da rimuovere.

**TL**: E QUANTI SONO?!

**ME**: Altri 17. Per un totale di 23 flag obsoleti.

**TL**: E QUANTO CI VUOLE?!

**ME**: Giorni. Forse settimane. Per pulire tutto.

**TL**: E NE VALE LA PENA?!

**ME**: Sì. Perché ogni flag è un rischio. E ogni if è debito tecnico.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag obsoleti: 23
- Flag rimossi: 6
- Flag da rimuovere: 17
- Tempo stimato: settimane

E tutto era chiaro. La pulizia è lunga. Ma necessaria. Amen.

---

**Giovedì - L'Automazione**

Giovedì. Ho automatizzato il rilevamento dei flag dimenticati.

**TERMINALE**:
```
# Crea script per rilevare flag dimenticati
cat > scripts/flag-audit.sh << 'EOF'
#!/bin/bash

# Flag dimenticati: non modificati da più di 6 mesi
OLD_FLAGS=$(curl -s http://feature-flags:8080/api/v1/flags | jq -r '.[] | select((now - (.lastModified | fromdateiso8601)) > 15778800) | .name')

echo "=== Feature Flag Audit ==="
echo "Data: $(date)"
echo ""

for flag in $OLD_FLAGS; do
  # Conta riferimenti nel codice
  refs=$(grep -r "$flag" src/ --include="*.js" 2>/dev/null | wc -l)
  
  # Controlla se la feature è ancora in uso
  if [ $refs -eq 0 ]; then
    status="ORFAN"
  else
    status="IN_USE"
  fi
  
  # Ottieni data creazione
  created=$(curl -s http://feature-flags:8080/api/v1/flags/$flag | jq -r '.created')
  
  echo "Flag: $flag"
  echo "  Creato: $created"
  echo "  Riferimenti: $refs"
  echo "  Stato: $status"
  echo ""
done

echo "=== Raccomandazioni ==="
echo "1. Rimuovere flag ORFAN (nessun riferimento nel codice)"
echo "2. Analizzare flag IN_USE (feature completata?)"
echo "3. Documentare decisioni"
EOF

chmod +x scripts/flag-audit.sh

# Esegui audit
./scripts/flag-audit.sh > flag-audit-report.txt

# Configura alert per flag vecchi
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagTooOld
        expr: |
          feature_flag_age_seconds > 15778800  # 6 mesi
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is too old"
          description: "Feature flag {{ $labels.name }} has not been modified in over 6 months. Consider removing it if the feature is complete."

      - alert: FeatureFlagOrphan
        expr: |
          feature_flag_references == 0
        for: 24h
        labels:
          severity: info
        annotations:
          summary: "Feature flag {{ $labels.name }} has no code references"
          description: "Feature flag {{ $labels.name }} has no references in the codebase. It may be safe to remove."
EOF

# Aggiungi metriche
cat > src/lib/flag-metrics.js << 'EOF'
const prometheus = require('prom-client');

const flagAge = new prometheus.Gauge({
  name: 'feature_flag_age_seconds',
  help: 'Age of feature flag in seconds',
  labelNames: ['name'],
});

const flagReferences = new prometheus.Gauge({
  name: 'feature_flag_references',
  help: 'Number of code references to feature flag',
  labelNames: ['name'],
});

const flagCount = new prometheus.Gauge({
  name: 'feature_flag_count',
  help: 'Total number of feature flags',
  labelNames: ['status'],
});

module.exports = { flagAge, flagReferences, flagCount };
EOF
```

**TL**: Hai automatizzato?

**ME**: Sì. Script per audit. Alert per flag vecchi. Metriche per monitoraggio.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i flag dimenticati. Prima che causino problemi.

**TL**: E SE NE TROVIAMO?!

**ME**: Allora... li rimuoviamo. O li documentiamo.

**TL**: E SE NON ABBIAMO TEMPO?!

**ME**: Allora... l'alert ci ricorda. Finché non lo facciamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Script: creato
- Alert: configurati
- Metriche: attive
- Audit: automatizzato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'automazione è essenziale. E che gli alert salvano. E che i flag vanno monitorati. Amen.

---

**Venerdì - L'Educazione**

Venerdì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i flag dimenticati sono stati un problema. Ma sono anche un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i feature flag sono temporanei.

**JN**: Temporanei?

**ME**: Sì. Non permanenti. Devono essere rimossi dopo che la feature è completata.

**JN**: E QUANDO?!

**ME**: Dipende. Ma in genere, entro 2-4 settimane dal rilascio.

**JN**: Ok.

**ME**: Secondo: documenta sempre i feature flag.

**JN**: Documenta?

**ME**: Sì. Cosa fa. Quando è stato creato. Quando deve essere rimosso. Chi è il proprietario.

**JN**: E SE NON SO?!

**ME**: Allimenti chiedi. Prima di crearlo.

**JN**: Ok.

**ME**: Terzo: usa nomi descrittivi.

**JN**: Descrittivi?

**ME**: Sì. Non "TEST_FEATURE_123" o "BOB_EXPERIMENT". Ma "ENABLE_NEW_CHECKOUT_2025_Q2".

**JN**: E PERCHÉ?!

**ME**: Perché tra 6 mesi nessuno ricorda cosa fa "BOB_EXPERIMENT". Ma "ENABLE_NEW_CHECKOUT_2025_Q2" è chiaro.

**JN**: Ok.

**ME**: Quarto: aggiungi una data di scadenza.

**JN**: Scadenza?

**ME**: Sì. Una data dopo la quale il flag deve essere rimosso. E un alert che ti ricorda.

**JN**: E SE LA FEATURE NON È PRONTA?!

**ME**: Allimenti estendi la scadenza. Ma non dimenticarla.

**JN**: Ok.

**ME**: Quinto: pulisci i flag regolarmente.

**JN**: Regolarmente?

**ME**: Sì. Ogni mese. O ogni sprint. Controlla i flag vecchi. E rimuovi quelli obsoleti.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... lo script lo fa per te. E l'alert ti ricorda.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Flag: puliti
- Codice: semplificato
- Alert: attivi
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E automazione. E educazione. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 09:00
**Autore originale**: Bob (non più in azienda)
**Servizio**: pricing-service
**Problema**: Feature flag attivo da 18 mesi causava prezzi diversi
**Causa**: Flag non rimosso dopo completamento feature
**Tempo in produzione**: 18 mesi
**Clienti affetti**: ~50% (split testing dimenticato)
**Revenue perso**: Difficile da calcolare (prezzi misti)
**Reazione UL**: "18 mesi?!"
**Reazione TL**: "Nessuno l'ha rimosso?!"
**Reazione CTO**: "I flag sono temporanei. Rimuoveteli."
**Soluzione**: Flag rimosso + audit + automazione
**Lezione imparata**: I FEATURE FLAG SONO TEMPORANEI. RIMOVETELI.

**Regole per i feature flag**:
1. I feature flag sono TEMPORANEI. Non permanenti.
2. Documenta: cosa fa, quando creato, quando rimuovere, chi possiede.
3. Usa nomi descrittivi: "ENABLE_FEATURE_NAME_YYYY_QN".
4. Aggiungi data di scadenza. E alert che ricordano.
5. Rimuovi entro 2-4 settimane dal completamento.
6. Controlla regolarmente i flag vecchi.
7. Automatizza l'audit. E gli alert.
8. Un flag dimenticato è un debito tecnico. E un rischio. Amen.

**Come creare un feature flag correttamente**:
```javascript
// Creazione flag con metadata
const flag = {
  name: 'ENABLE_NEW_CHECKOUT_2027_Q1',
  description: 'Abilita il nuovo checkout con payment step separato',
  created: '2027-01-16',
  owner: 'team-checkout',
  expiration: '2027-02-28', // 6 settimane
  removeBy: '2027-03-15',    // Data ultima rimozione
  jira: 'CHECKOUT-1234',    // Ticket associato
};

await featureFlags.create(flag);
```

**Come rimuovere un feature flag**:
```bash
# 1. Verifica che la feature sia completa
grep -r "FLAG_NAME" src/ --include="*.js"

# 2. Semplifica il codice (rimuovi if)
# Prima:
if (await featureFlags.get('FLAG_NAME')) {
  return newFeature();
} else {
  return oldFeature();
}
# Dopo:
return newFeature();

# 3. Rimuovi il flag dalla piattaforma
curl -X DELETE http://feature-flags:8080/api/v1/flags/FLAG_NAME

# 4. Deploy
kubectl rollout restart deployment/my-service

# 5. Documenta
echo "FLAG_NAME rimosso il $(date)" >> CHANGELOG.md
```

**Come automatizzare l'audit**:
```bash
# Script per trovare flag vecchi
curl -s http://feature-flags:8080/api/v1/flags | \
  jq -r '.[] | select((now - (.lastModified | fromdateiso8601)) > 15778800) | .name'

# Alert per flag vecchi
# Vedi: /etc/prometheus/alerts/feature-flags.yml
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag sono temporanei. E che vanno documentati. E che vanno rimossi. E che 23 flag obsoleti sono tanti. E che 99 if inutili sono debito tecnico. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come i post-it. Li attacchi per ricordare qualcosa di temporaneo. Ma se non li rimuovi, si accumulano. E coprono tutto. E non vedi più nulla. E il codice diventa incomprensibile. E qualcuno cambia un flag. E il sistema crolla. E tu ti chiedi: "Com'è possibile?" E la risposta è semplice: perché il flag era lì da 18 mesi. E nessuno sapeva a cosa serviva. E qualcuno l'ha cambiato. E il sistema è crollato. E la verità è che tutti dimenticano. I junior dimenticano. I senior dimenticano. Bob ha dimenticato. E l'unico modo per non dimenticare è avere processi. E automazione. E alert. E documentazione. E pulizia regolare. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | pricing-service |
| Autore originale | Bob (non più in azienda) |
| Data creazione | 15/06/2025 |
| Data incident | 16/01/2027, 09:00 |
| Tempo in produzione | 18 mesi |
| Clienti affetti | ~50% |
| Flag obsoleti trovati | 23 |
| Riferimenti nel codice | 99+ |
| Flag rimossi | 23 |
| Tempo di pulizia | 1 settimana |
| Reazione UL | "18 mesi?!" |
| Reazione TL | "Nessuno l'ha rimosso?!" |
| Reazione CTO | "I flag sono temporanei." |
| Soluzione | Flag rimossi + audit + automazione |
| Lezione imparata | FLAG = TEMPORANEI |
| **Totale** | **23 flag rimossi + 99 if semplificati + 1 sistema automatizzato** |

**Morale**: I feature flag sono temporanei. Non permanenti. Devono essere rimossi dopo che la feature è completata. E se non li rimuovi, si accumulano. E il codice si riempie di if inutili. E nessuno sa più cosa fa il sistema. E qualcuno cambia un flag. E il sistema crolla. E tu ti chiedi: "Com'è possibile?" E la risposta è semplice: perché il flag era lì da 18 mesi. E nessuno l'aveva rimosso. E la verità è che tutti dimenticano. I junior dimenticano. I senior dimenticano. Bob ha dimenticato. E l'unico modo per non dimenticare è avere processi. E automazione. E alert. E documentazione. E pulizia regolare. E la prossima volta, il flag ha una scadenza. E un alert. E un proprietario. E viene rimosso. In tempo. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-tutto.md)**
