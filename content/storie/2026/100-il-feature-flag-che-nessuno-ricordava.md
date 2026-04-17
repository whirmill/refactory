# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-tutto.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Dopo che la feature è stata rilasciata. Dopo che è stata testata. Dopo che è stata verificata. E invece. Invece i feature flag restano. Per mesi. Per anni. Per sempre. E quando restano, qualcuno li tocca. E quando qualcuno li tocca, succede quello che deve succedere: la feature si attiva. O si disattiva. E nessuno sa perché. E il sistema si rompe. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un feature flag." E UL dice: "E CHI L'HA CREATO?!" E tu dici: "Non lo so. Era già lì." E UL dice: "E COSA FA?!" E tu dici: "Non lo so. Non c'è documentazione." E la verità è che i feature flag sono come le mine terrestri. Se le dimentichi, esplodono. E se esplodono, qualcuno si fa male. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi. Altri prezzi nuovi. È un casino.

**ME**: Prezzi sbagliati?!

**TL**: Prezzi?!

**ME**: Sì. Alcuni clienti vedono prezzi vecchi. Altri prezzi nuovi.

**TL**: E QUANTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=pricing-service --since=30m | grep -i price | tail -20
2027-01-16 09:00:12 INFO: Calculating price for product SKU-12345
2027-01-16 09:00:12 DEBUG: Using pricing engine v2: true
2027-01-16 09:00:12 INFO: Price calculated: €99.99
2027-01-16 09:00:13 INFO: Calculating price for product SKU-12345
2027-01-16 09:00:13 DEBUG: Using pricing engine v2: false
2027-01-16 09:00:13 INFO: Price calculated: €79.99

# Conta discrepanze
kubectl logs -l app=pricing-service --since=1h | grep "SKU-12345" | grep "Price calculated" | awk '{print $NF}' | sort | uniq -c
    847 €99.99
    653 €79.99

# Controlla configurazione
kubectl exec -it config-server-0 -- cat /etc/config/pricing.yml
pricing:
  engine: v1
  features:
    use-new-calculator: false
```

**ME**: Lo stesso prodotto ha due prezzi diversi. €99.99 e €79.99.

**TL**: DUE PREZZI?!

**ME**: Sì. 847 richieste a €99.99. 653 a €79.99.

**TL**: E PERCHÉ?!

**ME**: C'è un feature flag. "use-new-calculator". A volte è true. A volte è false.

**TL**: E CHI LO CONTROLLA?!

**ME**: Non lo so. Controllo il codice.

**TERMINALE**:
```
# Cerca feature flag
grep -r "use-new-calculator" src/
src/services/pricing/calculator.js:  const useNewCalculator = featureFlags.get('use-new-calculator', false);
src/services/pricing/calculator.js:  if (useNewCalculator) {
src/services/pricing/calculator.js:    return newCalculator.calculate(product);
src/services/pricing/calculator.js:  } else {
src/services/pricing/calculator.js:    return oldCalculator.calculate(product);
src/services/pricing/calculator.js:  }

# Cerca configurazione feature flag
grep -r "use-new-calculator" config/
config/feature-flags.yml:  use-new-calculator: false

# Cerca chi ha creato il flag
git log --all --oneline --grep="use-new-calculator"
abc1234 2024-03-15 Add new pricing calculator behind feature flag
def5678 2024-04-20 Enable new calculator for 10% of users
ghi9012 2024-05-10 Enable new calculator for 50% of users
jkl3456 2024-06-01 Enable new calculator for all users
```

**ME**: Il feature flag esiste da quasi 3 anni. Marzo 2024.

**TL**: 3 ANNI?!

**ME**: Sì. E l'ultimo commit è giugno 2024. "Enable for all users."

**TL**: E QUINDI DOVREBBE ESSERE SEMPRE TRUE?!

**ME**: Sì. Ma il config dice false.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Controllo chi ha cambiato il config.

**TERMINALE**:
```
# Cerca chi ha cambiato il config
git log --all --oneline -- config/feature-flags.yml | head -10
mno7890 2027-01-15 Disable new calculator for testing
pqr1234 2026-11-20 Update feature flags
stu5678 2026-08-15 Cleanup old flags
vwx9012 2026-05-01 Quarterly review

# Controlla ultimo commit
git show mno7890
commit mno7890
Author: JN <jn@company.com>
Date:   Sun Jan 15 18:45:00 2027 +0100

    Disable new calculator for testing

diff --git a/config/feature-flags.yml b/config/feature-flags.yml
-  use-new-calculator: true
+  use-new-calculator: false
```

**ME**: JN ha disabilitato il flag ieri sera. Alle 18:45.

**TL**: JN?!

**ME**: Sì. "Disable new calculator for testing."

**TL**: E PERCHÉ?!

**ME**: Non lo so. Lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: disabilitato
- Autore: JN
- Data: 15/01/2027, 18:45
- Prezzi: sbagliati
- Clienti: confusi

E tutto era chiaro. JN aveva toccato un feature flag vecchio. E il sistema si era rotto. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, hai toccato il feature flag "use-new-calculator"?

**JN**: Sì. Ieri. Perché?

**ME**: I prezzi sono sbagliati. Alcuni clienti vedono €99.99. Altri €79.99.

**JN**: Cosa?!

**ME**: Sì. Il flag controlla quale calcolatore usare. E tu l'hai disabilitato.

**JN**: Ma... era solo per testare!

**ME**: TESTARE?!

**JN**: Sì. Volevo vedere come funzionava il vecchio calcolatore.

**ME**: E L'HAI FATTO IN PRODUZIONE?!

**JN**: Non sapevo che fosse in produzione!

**ME**: JN, È IL FILE DI CONFIGURAZIONE DI PRODUZIONE!

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Ah. Non ci ho pensato.

**ME**: E QUANTI CLIENTI HANNO VISTO PREZZI SBAGLIATI?!

**JN**: Non lo so...

**ME**: 1500. In un'ora.

**JN**: 1500?!

**ME**: Sì. E ora fixi tutto. E poi mi spieghi perché stavi toccando un feature flag di 3 anni fa.

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Feature flag: da riabilitare
- Prezzi: da correggere
- JN: da educare
- Documentazione: inesistente

E la lezione era chiara. I feature flag vanno documentati. E vanno rimossi. E JN va educato. Amen.

---

**Lunedì - 10:00**

Ho riabilitato il feature flag. E verificato i prezzi.

**TERMINALE**:
```
# Riabilita feature flag
cat > config/feature-flags.yml << 'EOF'
feature-flags:
  use-new-calculator: true
EOF

# Commit e push
git add config/feature-flags.yml
git commit -m "Re-enable new calculator - was disabled by mistake"
git push origin main

# Deploy
kubectl rollout restart deployment/pricing-service

# Verifica
kubectl logs -l app=pricing-service --since=5m | grep "SKU-12345" | grep "Price calculated" | awk '{print $NF}' | sort | uniq -c
   1234 €79.99

# Controlla che tutti usino il nuovo calcolatore
kubectl logs -l app=pricing-service --since=5m | grep "Using pricing engine v2"
2027-01-16 10:05:00 DEBUG: Using pricing engine v2: true
2027-01-16 10:05:01 DEBUG: Using pricing engine v2: true
2027-01-16 10:05:02 DEBUG: Using pricing engine v2: true
```

**ME**: Feature flag riabilitato. Tutti i prezzi corretti.

**TL**: E I CLIENTI?!

**ME**: Vedono i prezzi giusti. €79.99.

**TL**: E GLI ORDINI SBAGLIATI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla ordini con prezzi sbagliati
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at BETWEEN '2027-01-16 09:00:00' AND '2027-01-16 10:00:00' AND unit_price = 99.99"
count
-------
234

# Controlla valore
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT SUM(total) FROM orders WHERE created_at BETWEEN '2027-01-16 09:00:00' AND '2027-01-16 10:00:00' AND unit_price = 99.99"
sum
------
€4,678.50
```

**ME**: 234 ordini con prezzi sbagliati. Per un totale di €4,678.50.

**TL**: E CHE FACCIAMO?!

**ME**: Li rimborsiamo. O li correggiamo.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: riabilitato
- Prezzi: corretti
- Ordini sbagliati: 234
- Valore: €4,678.50

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno documentati. E vanno rimossi. E JN va educato. Amen.

---

**Lunedì - 10:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con i prezzi.

**UL**: Che problema?

**ME**: JN ha disabilitato un feature flag. E i prezzi sono cambiati.

**UL**: CAMBIATI?!

**ME**: Sì. Alcuni clienti hanno pagato €20 in più.

**UL**: €20 IN PIÙ?!

**ME**: Sì. 234 ordini. Per un totale di €4,678.50.

**UL**: E QUANTO HANNO PAGATO IN PIÙ?!

**ME**: Circa €20 per ordine. In media.

**UL**: E CHE FACCIAMO?!

**ME**: Rimborsiamo la differenza. E ci scusiamo.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E PERCHÉ TOCCAVA UN FEATURE FLAG?!

**ME**: Perché voleva testare. Ma non sapeva che era in produzione.

**UL**: E PERCHÉ NON LO SAPEVA?!

**ME**: Perché non c'era documentazione. E il flag era lì da 3 anni.

**UL**: 3 ANNI?!

**ME**: Sì. E nessuno l'ha mai rimosso.

**UL**: E QUINDI?!

**ME**: E quindi... lo rimuovo. E documento tutti gli altri.

**UL**: Bene. E rimborsate i clienti.

E io ho rimborsato. E UL ha riattaccato. E la lezione era chiara. I feature flag vanno documentati. E vanno rimossi. E i rimborsi costano. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i feature flag. Per trovare le mine nascoste.

**TERMINALE**:
```
# Trova tutti i feature flag
grep -r "featureFlags.get" src/ | wc -l
47

# Conta flag unici
grep -rh "featureFlags.get" src/ | sed "s/.*get('\([^']*\)'.*/\1/" | sort | uniq | wc -l
23

# Lista flag
grep -rh "featureFlags.get" src/ | sed "s/.*get('\([^']*\)'.*/\1/" | sort | uniq
enable-new-ui
use-new-calculator
enable-dark-mode
show-beta-features
use-v2-api
enable-notifications
use-new-checkout
enable-analytics
show-promo-banner
use-new-search
enable-recommendations
use-new-auth
enable-logging
show-debug-info
use-new-inventory
enable-rate-limiting
use-new-payment
enable-caching
show-maintenance-banner
use-new-shipping
enable-feature-x
use-new-tax
enable-experimental

# Controlla età dei flag
for flag in $(grep -rh "featureFlags.get" src/ | sed "s/.*get('\([^']*\)'.*/\1/" | sort | uniq); do
  echo "=== $flag ==="
  git log --all --oneline --grep="$flag" | tail -1
done

# Risultati
=== enable-new-ui ===
abc1234 2023-06-15 Add new UI behind feature flag

=== use-new-calculator ===
abc1234 2024-03-15 Add new pricing calculator behind feature flag

=== enable-dark-mode ===
def5678 2023-08-20 Add dark mode toggle

=== show-beta-features ===
ghi9012 2022-11-01 Add beta features section

=== use-v2-api ===
jkl3456 2024-01-10 Migrate to v2 API

=== enable-notifications ===
mno7890 2023-04-05 Add notification system

=== use-new-checkout ===
pqr1234 2023-09-15 New checkout flow

=== enable-analytics ===
stu5678 2022-08-01 Add analytics tracking

=== show-promo-banner ===
vwx9012 2024-12-01 Holiday promo banner

=== use-new-search ===
yza1234 2024-07-20 New search engine

=== enable-recommendations ===
bcd5678 2023-02-10 Add recommendation engine

=== use-new-auth ===
efg9012 2024-05-15 New auth provider

=== enable-logging ===
hij3456 2022-05-01 Add structured logging

=== show-debug-info ===
klm7890 2023-07-01 Debug info for support

=== use-new-inventory ===
nop1234 2024-09-01 New inventory system

=== enable-rate-limiting ===
qrs5678 2023-11-15 Add rate limiting

=== use-new-payment ===
tuv9012 2024-11-01 New payment provider

=== enable-caching ===
wxy1234 2022-09-01 Add caching layer

=== show-maintenance-banner ===
zab5678 2024-02-01 Maintenance banner

=== use-new-shipping ===
cde9012 2024-08-15 New shipping calculator

=== enable-feature-x ===
fgh3456 2023-01-01 Feature X implementation

=== use-new-tax ===
ijk7890 2024-04-01 New tax calculator

=== enable-experimental ===
lmn1234 2023-05-01 Experimental features
```

**ME**: 23 feature flag. Alcuni vecchi di 5 anni.

**TL**: 5 ANNI?!

**ME**: Sì. "enable-logging" è del maggio 2022.

**TL**: E È ANCORA LÌ?!

**ME**: Sì. E non sappiamo cosa fa.

**TL**: E SE LO DISABILITIAMO?!

**ME**: Non lo so. Potrebbe rompere tutto.

**TL**: E QUINDI?!

**ME**: E quindi... documentiamo. E poi rimuoviamo. Con calma.

**TERMINALE**:
```
# Controlla cosa fa enable-logging
grep -r "enable-logging" src/
src/lib/logger.js:  if (featureFlags.get('enable-logging', true)) {
src/lib/logger.js:    return structuredLogger.log(level, message, meta);
src/lib/logger.js:  } else {
src/lib/logger.js:    return console.log(`[${level}] ${message}`);
  }

# Controlla valore attuale
grep "enable-logging" config/feature-flags.yml
  enable-logging: true

# Controlla se è mai stato false
git log --all --oneline -- config/feature-flags.yml | xargs -I {} git show {}:config/feature-flags.yml | grep "enable-logging"
  enable-logging: true  # sempre true dal 2022
```

**ME**: "enable-logging" controlla se usare structured logging. È sempre stato true. Dal 2022.

**TL**: E QUINDI?!

**ME**: E quindi... è inutile. Possiamo rimuoverlo.

**TL**: E GLI ALTRI?!

**ME**: Controllo uno per uno.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 23
- Vecchi di 5 anni: 1
- Vecchi di 4 anni: 3
- Vecchi di 3 anni: 7
- Documentazione: zero

E tutto era chiaro. I feature flag erano mine terrestri. E nessuno sapeva dove fossero. Amen.

---

**Mercoledì - La Documentazione**

Mercoledì. Ho documentato tutti i feature flag. Per sapere cosa fanno. E quando rimuoverli.

**TERMINALE**:
```
# Crea documentazione
cat > docs/feature-flags.md << 'EOF'
# Feature Flags Documentation

## Overview
This document describes all feature flags in the system, their purpose, and removal status.

## Active Feature Flags

### use-new-calculator
- **Created**: 2024-03-15
- **Author**: Bob
- **Purpose**: Switch between old and new pricing calculator
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old calculator code
- **Risk**: Low - new calculator is stable

### enable-new-ui
- **Created**: 2023-06-15
- **Author**: Alice
- **Purpose**: Enable new UI components
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old UI code
- **Risk**: Medium - need to verify all components work

### use-v2-api
- **Created**: 2024-01-10
- **Author**: Charlie
- **Purpose**: Use v2 API endpoints
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete v1 API code
- **Risk**: High - v1 API might still be used somewhere

### enable-dark-mode
- **Created**: 2023-08-20
- **Author**: Diana
- **Purpose**: Enable dark mode theme
- **Status**: ENABLED (keep as user preference)
- **Action**: Keep as user setting, not feature flag
- **Risk**: Low

### show-beta-features
- **Created**: 2022-11-01
- **Author**: Eve
- **Purpose**: Show beta features to users
- **Status**: DISABLED (keep for beta testing)
- **Action**: Keep for beta features
- **Risk**: Low

### use-new-checkout
- **Created**: 2023-09-15
- **Author**: Frank
- **Purpose**: Use new checkout flow
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old checkout code
- **Risk**: High - checkout is critical

### enable-analytics
- **Created**: 2022-08-01
- **Author**: Grace
- **Purpose**: Enable analytics tracking
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag - analytics always on
- **Risk**: Low

### show-promo-banner
- **Created**: 2024-12-01
- **Author**: Henry
- **Purpose**: Show holiday promo banner
- **Status**: DISABLED (promo ended)
- **Action**: REMOVE IMMEDIATELY
- **Risk**: None

### use-new-search
- **Created**: 2024-07-20
- **Author**: Ivy
- **Purpose**: Use new search engine
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old search code
- **Risk**: Medium

### enable-recommendations
- **Created**: 2023-02-10
- **Author**: Jack
- **Purpose**: Enable recommendation engine
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag - recommendations always on
- **Risk**: Low

### use-new-auth
- **Created**: 2024-05-15
- **Author**: Kate
- **Purpose**: Use new auth provider
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old auth code
- **Risk**: Critical - auth is critical

### enable-logging
- **Created**: 2022-05-01
- **Author**: Leo
- **Purpose**: Enable structured logging
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag - logging always on
- **Risk**: None

### show-debug-info
- **Created**: 2023-07-01
- **Author**: Mike
- **Purpose**: Show debug info for support
- **Status**: DISABLED (keep for debugging)
- **Action**: Keep for support team
- **Risk**: Low

### use-new-inventory
- **Created**: 2024-09-01
- **Author**: Nancy
- **Purpose**: Use new inventory system
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old inventory code
- **Risk**: High - inventory is critical

### enable-rate-limiting
- **Created**: 2023-11-15
- **Author**: Oscar
- **Purpose**: Enable rate limiting
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag - rate limiting always on
- **Risk**: Medium

### use-new-payment
- **Created**: 2024-11-01
- **Author**: Peter
- **Purpose**: Use new payment provider
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old payment code
- **Risk**: Critical - payment is critical

### enable-caching
- **Created**: 2022-09-01
- **Author**: Quinn
- **Purpose**: Enable caching layer
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag - caching always on
- **Risk**: Medium

### show-maintenance-banner
- **Created**: 2024-02-01
- **Author**: Rachel
- **Purpose**: Show maintenance banner
- **Status**: DISABLED (no maintenance)
- **Action**: Keep for maintenance windows
- **Risk**: Low

### use-new-shipping
- **Created**: 2024-08-15
- **Author**: Steve
- **Purpose**: Use new shipping calculator
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old shipping code
- **Risk**: Medium

### enable-feature-x
- **Created**: 2023-01-01
- **Author**: Tina
- **Purpose**: Enable Feature X
- **Status**: UNKNOWN (no documentation)
- **Action**: INVESTIGATE
- **Risk**: Unknown

### use-new-tax
- **Created**: 2024-04-01
- **Author**: Uma
- **Purpose**: Use new tax calculator
- **Status**: ENABLED (should be removed)
- **Action**: Remove flag and delete old tax code
- **Risk**: High - tax is critical

### enable-experimental
- **Created**: 2023-05-01
- **Author**: Victor
- **Purpose**: Enable experimental features
- **Status**: DISABLED (keep for experiments)
- **Action**: Keep for experimental features
- **Risk**: Low

## Summary
- Total flags: 23
- Should be removed: 14
- Keep as user preference: 1
- Keep for operational use: 4
- Unknown purpose: 1
- Critical risk: 3
- High risk: 4
- Medium risk: 5
- Low risk: 10

## Removal Plan
1. Remove low-risk flags first (enable-logging, enable-analytics, show-promo-banner)
2. Remove medium-risk flags (enable-new-ui, use-new-search, etc.)
3. Remove high-risk flags with proper testing (use-v2-api, use-new-checkout, etc.)
4. Remove critical-risk flags last (use-new-auth, use-new-payment, use-new-tax)
5. Investigate unknown flags (enable-feature-x)
EOF
```

**TL**: Hai documentato tutto?

**ME**: Sì. 23 flag. 14 da rimuovere. 3 critici.

**TL**: E QUANDO LI RIMUOVIAMO?!

**ME**: Iniziamo con quelli a basso rischio. Poi quelli medi. Poi quelli alti. E per ultimi i critici.

**TL**: E QUANTO CI VUOLE?!

**ME**: Settimane. Forse mesi. Ma li rimuoviamo tutti.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: documentati
- Rimozione: pianificata
- Rischio: calcolato
- JN: da educare

E tutto era chiaro. I feature flag andavano rimossi. E la documentazione era il primo passo. Amen.

---

**Giovedì - La Rimozione**

Giovedì. Ho iniziato a rimuovere i feature flag. Dai più sicuri.

**TERMINALE**:
```
# Rimuovi enable-logging (sempre true dal 2022)
# 1. Verifica che non ci siano riferimenti
grep -r "enable-logging" src/ --include="*.js" --include="*.ts"
src/lib/logger.js:  if (featureFlags.get('enable-logging', true)) {

# 2. Rimuovi il flag dal codice
cat > src/lib/logger.js << 'EOF'
// Feature flag removed - structured logging is always on
const structuredLogger = require('./structured-logger');

function log(level, message, meta) {
  return structuredLogger.log(level, message, meta);
}

module.exports = { log };
EOF

# 3. Rimuovi dal config
sed -i '/enable-logging/d' config/feature-flags.yml

# 4. Commit
git add src/lib/logger.js config/feature-flags.yml
git commit -m "Remove enable-logging feature flag - always enabled since 2022"

# 5. Test
npm test
PASS

# 6. Deploy
kubectl rollout restart deployment/app
```

**ME**: Primo flag rimosso. enable-logging.

**TL**: E HA FUNZIONATO?!

**ME**: Sì. Test passing. Deploy ok.

**TL**: E IL SUCCESSIVO?!

**ME**: enable-analytics. Sempre true dal 2022.

**TERMINALE**:
```
# Rimuovi enable-analytics
grep -r "enable-analytics" src/ --include="*.js" --include="*.ts"
src/lib/analytics.js:  if (featureFlags.get('enable-analytics', true)) {

# Verifica che analytics sia sempre stato true
git log --all --oneline -- config/feature-flags.yml | xargs -I {} git show {}:config/feature-flags.yml | grep "enable-analytics"
  enable-analytics: true  # sempre true

# Rimuovi il flag
cat > src/lib/analytics.js << 'EOF'
// Feature flag removed - analytics is always on
const analyticsClient = require('./analytics-client');

function track(event, properties) {
  return analyticsClient.track(event, properties);
}

module.exports = { track };
EOF

sed -i '/enable-analytics/d' config/feature-flags.yml

git add src/lib/analytics.js config/feature-flags.yml
git commit -m "Remove enable-analytics feature flag - always enabled since 2022"

npm test
PASS

kubectl rollout restart deployment/app
```

**ME**: Secondo flag rimosso. enable-analytics.

**TL**: E IL TERZO?!

**ME**: show-promo-banner. La promo è finita. È disabilitato. Lo rimuovo completamente.

**TERMINALE**:
```
# Rimuovi show-promo-banner
grep -r "show-promo-banner" src/ --include="*.js" --include="*.ts" --include="*.jsx"
src/components/PromoBanner.jsx:  const showBanner = featureFlags.get('show-promo-banner', false);
src/components/PromoBanner.jsx:  if (!showBanner) return null;

# Rimuovi il componente interamente
rm src/components/PromoBanner.jsx

# Rimuovi dal config
sed -i '/show-promo-banner/d' config/feature-flags.yml

# Rimuovi import
sed -i '/PromoBanner/d' src/components/App.jsx

git add .
git commit -m "Remove show-promo-banner feature flag and PromoBanner component - promo ended"

npm test
PASS

kubectl rollout restart deployment/app
```

**ME**: Terzo flag rimosso. show-promo-banner. E il componente.

**TL**: E QUANTI NE RESTANO?!

**ME**: 20. Ma 3 sono a basso rischio. E li rimuovo domani.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 3
- Flag restanti: 20
- Test: passing
- Deploy: ok

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno rimossi. E che la rimozione va pianificata. E che i test sono essenziali. Amen.

---

**Venerdì - L'Educazione**

Venerdì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il feature flag disabilitato è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i feature flag vanno documentati.

**JN**: Documentati?

**ME**: Sì. Devi sapere cosa fa un flag. Chi l'ha creato. Quando. E perché.

**JN**: E se non c'è documentazione?

**ME**: Allora la crei. O chiedi. O non lo tocchi.

**JN**: Ok.

**ME**: Secondo: i feature flag vanno rimossi.

**JN**: Rimossi?

**ME**: Sì. Dopo che la feature è stabile. Dopo che è stata verificata. Dopo che non serve più.

**JN**: E quando?

**ME**: Dipende. Ma in generale, entro 6 mesi. Se un flag è lì da più di 6 mesi, va rimosso.

**JN**: Ok.

**ME**: Terzo: non toccare i feature flag in produzione.

**JN**: Mai?

**ME**: Mai. A meno che tu non sappia cosa fanno. E non abbia testato. E non abbia approvazione.

**JN**: E se devo testare?

**ME**: Allora testi in staging. O in un ambiente di sviluppo. MAI in produzione.

**JN**: Ok.

**ME**: Quarto: i feature flag sono come le mine terrestri.

**JN**: Mine?!

**ME**: Sì. Se le dimentichi, esplodono. E se esplodono, qualcuno si fa male.

**JN**: E come evito?

**ME**: Documentando. E rimuovendo. E non toccando.

**JN**: Ok.

**ME**: Quinto: se tocchi un feature flag, documenti cosa hai fatto.

**JN**: Documento?

**ME**: Sì. Nel commit message. E nel ticket. E nella documentazione.

**JN**: E se non ho tempo?

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere cosa hai fatto. E se non lo sa, rompe tutto.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Feature flag: documentati
- Flag rimossi: 3
- Flag restanti: 20
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere documentazione. E processi. E educazione. Amen.

---

**Sabato - La Riflessione**

Sabato. Ero a casa. Ma non riuscivo a smettere di pensare. Ai feature flag. Alle mine. A JN.

Ho aperto il laptop. Ho scritto la guida.

**TERMINALE**:
```
# Guida ai feature flag
cat > docs/feature-flags-best-practices.md << 'EOF'
## Best Practices per i Feature Flag

### Regola #1: DOCUMENTA SEMPRE

Ogni feature flag deve avere:
- Nome descrittivo
- Data di creazione
- Autore
- Scopo
- Data prevista di rimozione
- Piano di rimozione

```yaml
# Esempio di documentazione
feature-flags:
  use-new-calculator:
    created: 2024-03-15
    author: Bob
    purpose: Switch between old and new pricing calculator
    removal_date: 2024-06-15
    removal_plan: Remove flag and delete old calculator code
    status: enabled
```

### Regola #2: RIMUOVI SEMPRE

I feature flag sono temporanei. Devono essere rimossi.

- Flag < 6 mesi: OK
- Flag 6-12 mesi: Attenzione
- Flag > 12 mesi: RIMUOVI SUBITO

### Regola #3: NON TOCCARE IN PRODUZIONE

Mai modificare un feature flag in produzione senza:
1. Documentazione
2. Test
3. Approvazione
4. Rollback plan

### Regola #4: USA NOMI DESCrittivi

- ❌ enable-feature-x
- ✅ use-new-pricing-calculator

### Regola #5: CREA UN PIANO DI RIMOZIONE

Quando crei un feature flag, crea anche il piano per rimuoverlo.

```markdown
## Feature Flag: use-new-calculator

### Creation
- Date: 2024-03-15
- Author: Bob

### Removal Plan
1. Verify new calculator is stable (2024-04-15)
2. Enable for 10% of users (2024-04-20)
3. Enable for 50% of users (2024-05-01)
4. Enable for all users (2024-05-15)
5. Remove flag and old code (2024-06-01)
```

### Regola #6: MONITORA I FEATURE FLAG

Configura alert per feature flag vecchi.

```yaml
groups:
  - name: feature-flags
    rules:
      - alert: OldFeatureFlag
        expr: feature_flag_age_days > 180
        for: 1d
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is older than 6 months"
```

### Regola #7: USA UN FEATURE FLAG MANAGER

Non gestire i feature flag con file di configurazione. Usa un tool dedicato.

- LaunchDarkly
- Split
- Flagsmith
- Unleash

### Regola #8: I FEATURE FLAG SONO MINE TERRESTRI

Se li dimentichi, esplodono. E se esplodono, qualcuno si fa male. Amen.
EOF
```

Il TL mi ha scritto su Slack. "Stai lavorando di sabato?"

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Scrivo la guida per i feature flag. E rimuovo i flag vecchi.

**TL**: E JN?

**ME**: JN... lo educo. Di nuovo. Lunedì.

**TL**: E i controlli?

**ME**: Aggiungo alert per flag vecchi. E un processo di review.

**TL**: Bene. Ora riposa.

**ME**: Sì. Dopo aver aggiunto gli alert.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di sabato per un bug di lunedì. E stai fixando il processo. E stai educando il junior. E stai proteggendo il sistema. Ma è sabato. E dovresti riposare. Amen."

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 09:00
**Autore**: JN
**Servizio**: pricing-service
**Problema**: Feature flag disabilitato per errore
**Causa**: JN ha modificato config di produzione per testare
**Feature flag**: use-new-calculator
**Data creazione flag**: Marzo 2024
**Età del flag**: 3 anni
**Tempo in produzione**: 3 anni
**Ordini con prezzi sbagliati**: 234
**Valore totale**: €4,678.50
**Rimborsi**: €4,678.50
**Tempo di risoluzione**: 1 ora
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "€4,678.50?!"
**Reazione TL**: "3 anni?!"
**Reazione CTO**: "Rimuovi tutti i flag vecchi."
**Soluzione**: Riabilitazione flag + documentazione + rimozione flag vecchi
**Lezione imparata**: I FEATURE FLAG VANNO DOCUMENTATI E RIMOSSI. SEMPRE.

**Regole per i feature flag**:
1. DOCUMENTA ogni feature flag. Nome, data, autore, scopo, piano di rimozione.
2. RIMUOVI i feature flag dopo 6 mesi. Se sono lì da più, rimuovili.
3. NON TOCCARE i feature flag in produzione senza documentazione e approvazione.
4. USA nomi descrittivi. Non "enable-feature-x".
5. CREA un piano di rimozione quando crei il flag.
6. MONITORA l'età dei feature flag. Alert per flag > 6 mesi.
7. USA un feature flag manager. Non file di configurazione.
8. I feature flag sono mine terrestri. Se li dimentichi, esplodono. Amen.

**Come documentare un feature flag**:
```yaml
feature-flags:
  use-new-calculator:
    created: 2024-03-15
    author: Bob
    purpose: Switch between old and new pricing calculator
    removal_date: 2024-06-15
    removal_plan: Remove flag and delete old calculator code
    status: enabled
```

**Come rimuovere un feature flag**:
```bash
# 1. Verifica che il flag sia sempre true/false
git log --all --oneline -- config/feature-flags.yml | xargs -I {} git show {}:config/feature-flags.yml | grep "flag-name"

# 2. Cerca riferimenti nel codice
grep -r "flag-name" src/

# 3. Rimuovi il flag dal codice
# Sostituisci if (featureFlags.get('flag-name', true)) con il codice del ramo true

# 4. Rimuovi dal config
sed -i '/flag-name/d' config/feature-flags.yml

# 5. Test
npm test

# 6. Deploy
kubectl rollout restart deployment/app
```

**Come configurare alert per flag vecchi**:
```yaml
groups:
  - name: feature-flags
    rules:
      - alert: OldFeatureFlag
        expr: feature_flag_age_days > 180
        for: 1d
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is older than 6 months"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag vanno documentati. E rimossi. E che non si toccano in produzione. E che JN va educato. E che 234 ordini sbagliati sono tanti. E che €4,678.50 di rimborsi sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come le mine terrestri. Se li dimentichi, esplodono. E se esplodono, qualcuno si fa male. E quel qualcuno sono i clienti. E UL. E tu. E tutti. E quando esplodono, ti chiedi: "Com'è possibile che un flag del 2024 fosse ancora lì?" E la risposta è semplice: perché nessuno l'ha rimosso. E nessuno l'ha documentato. E nessuno sapeva cosa faceva. E JN l'ha toccato. E il sistema si è rotto. E i clienti hanno pagato €20 in più. E UL ha chiamato. E tu hai risposto. E hai detto: "Era un feature flag." E UL ha detto: "E CHI L'HA CREATO?!" E tu hai detto: "Non lo so. Era già lì." E UL ha detto: "E COSA FA?!" E tu hai detto: "Non lo so. Non c'era documentazione." E la verità è che i feature flag sono debito tecnico. E il debito va pagato. E se non lo paghi, si accumula. E se si accumula, esplode. E la prossima volta, documenti. E rimuovi. E non tocchi. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | pricing-service |
| Autore incident | JN |
| Feature flag | use-new-calculator |
| Data creazione flag | Marzo 2024 |
| Età del flag | 3 anni |
| Data incident | 16/01/2027, 09:00 |
| Tempo di esposizione | 1 ora |
| Ordini con prezzi sbagliati | 234 |
| Valore totale | €4,678.50 |
| Rimborsi | €4,678.50 |
| Feature flag trovati | 23 |
| Feature flag da rimuovere | 14 |
| Flag rimossi | 3 |
| Reazione UL | "€4,678.50?!" |
| Reazione TL | "3 anni?!" |
| Reazione CTO | "Rimuovi tutti i flag vecchi." |
| Soluzione | Documentazione + rimozione |
| Lezione imparata | FLAG = DOCUMENTA + RIMUOVI |
| **Totale** | **€4,678.50 rimborsi + 23 flag documentati + 3 flag rimossi + 1 junior educato** |

**Morale**: I feature flag vanno documentati. E vanno rimossi. Sempre. Dopo che la feature è stabile. Dopo che è stata verificata. Dopo che non serve più. E se non li rimuovi, restano lì. Per anni. E qualcuno li tocca. E il sistema si rompe. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un feature flag." E UL dice: "E CHI L'HA CREATO?!" E tu dici: "Non lo so. Era già lì." E UL dice: "E COSA FA?!" E tu dici: "Non lo so. Non c'era documentazione." E la verità è che i feature flag sono debito tecnico. E il debito va pagato. E se non lo paghi, si accumula. E se si accumula, esplode. E la prossima volta, documenti. E rimuovi. E non tocchi. E JN impara. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-tutto.md)**
