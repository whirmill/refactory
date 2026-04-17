# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-la-tabella-sbagliata.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Dopo che la feature è stata rilasciata. E testata. E verificata. E quando dico "rimossi", intendo eliminati dal codice. Non disabilitati nel pannello di controllo. Non settati a "false" nel file di configurazione. ELIMINATI. Dal codice. Perché un feature flag disabilitato è come una bomba a orologeria. È lì. Pronta a esplodere. E un giorno qualcuno la attiva per sbaglio. O un bot la attiva. O un test la attiva. E la bomba esplode. E tu ti chiedi: "Com'è possibile che il feature flag fosse ancora lì?" E la risposta è semplice: perché nessuno lo ricordava. E il feature flag era lì. Da due anni. E nessuno sapeva cosa faceva. E quando è stato attivato, ha fatto quello che era programmato per fare. E quello che era programmato per fare era distruggere tutto. Amen.

![](../../img/server.jpg)

---

**Lunedì - L'Attivazione**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato l'alert.

**ALERT**: Order processing rate dropped by 95%

**ME**: Il processing degli ordini è crollato?!

**TL**: Crollato?!

**ME**: Sì. Dal 95%.

**TL**: E QUANTI ORDINI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(orders_processed_total[5m]))'
{status: "success", data: {result: [{value: ["12"]}]}}  # 12 ordini al minuto

# Normalmente?
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(orders_processed_total[5m] offset 1h))'
{status: "success", data: {result: [{value: ["234"]}]}}  # 234 ordini al minuto

# Controlla errori
kubectl logs -l app=order-service --since=30m | grep -i error | tail -20
2027-01-16 08:55:01 ERROR: Order validation failed: invalid_promo_code
2027-01-16 08:55:01 ERROR: Order rejected: promo_code_not_found
2027-01-16 08:55:02 ERROR: Order validation failed: invalid_promo_code
...

# Conta errori
kubectl logs -l app=order-service --since=30m | grep -i "invalid_promo_code" | wc -l
8923
```

**ME**: 8923 ordini rifiutati per "invalid_promo_code".

**TL**: PROMO CODE?!

**ME**: Sì. Ma non abbiamo promo code attivi.

**TL**: E ALLORA PERCHÉ?!

**ME**: Non lo so. Guardo il codice.

**TERMINALE**:
```
# Cerca promo code nel codice
grep -r "promo_code" src/ | head -20
src/services/order.js:    if (featureFlags.STRICT_PROMO_VALIDATION) {
src/services/order.js:      const promo = await validatePromoCode(order.promoCode);
src/services/order.js:      if (!promo.valid) {
src/services/order.js:        throw new Error('invalid_promo_code');
src/services/order.js:      }
src/services/order.js:    }

# Controlla feature flag
curl -s http://feature-flag-service:8080/flags | jq '.flags.STRICT_PROMO_VALIDATION'
{
  "name": "STRICT_PROMO_VALIDATION",
  "enabled": true,
  "created_at": "2025-03-15T10:00:00Z",
  "created_by": "unknown",
  "description": null
}
```

**ME**: C'è un feature flag "STRICT_PROMO_VALIDATION" che è attivo.

**TL**: ATTIVO?!

**ME**: Sì. E valida i promo code. Ma i promo code non esistono più.

**TL**: NON ESISTONO PIÙ?!

**ME**: No. Li abbiamo rimossi sei mesi fa.

**TL**: E IL FEATURE FLAG?!

**ME**: Il feature flag è ancora lì. E ora è attivo.

**TL**: E CHI L'HA ATTIVATO?!

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
# Controlla log feature flag service
kubectl logs feature-flag-service-0 --since=2h | grep STRICT_PROMO_VALIDATION
2027-01-16 08:45:23 INFO: Flag STRICT_PROMO_VALIDATION set to true by user: deployment-bot

# Controlla deployment-bot
kubectl logs deployment-bot-0 --since=2h | grep STRICT_PROMO_VALIDATION
2027-01-16 08:45:22 INFO: Syncing feature flags from config repository
2027-01-16 08:45:22 INFO: Found flag STRICT_PROMO_VALIDATION in legacy-flags.yaml
2027-01-16 08:45:22 INFO: Setting STRICT_PROMO_VALIDATION = true (from config)
```

**ME**: Il deployment-bot ha attivato il flag. Leggendo da un file di configurazione legacy.

**TL**: LEGACY?!

**ME**: Sì. C'è un file "legacy-flags.yaml" che ha il flag settato a true.

**TL**: E CHI L'HA CREATO?!

**ME**: Non lo so. Il file è del marzo 2025.

**TL**: MARZO 2025?!

**ME**: Sì. Quasi due anni fa.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: STRICT_PROMO_VALIDATION
- Stato: attivo
- Creato: marzo 2025
- Creato da: unknown
- Descrizione: nessuna
- Risultato: 8923 ordini rifiutati

E tutto era chiaro. Un feature flag dimenticato. Attivato per sbaglio. Che ha bloccato il sistema. Amen.

---

**Lunedì - 09:30**

Ho disattivato il flag. E gli ordini hanno ripreso a fluire.

**TERMINALE**:
```
# Disattiva flag
curl -X POST http://feature-flag-service:8080/flags/STRICT_PROMO_VALIDATION/disable
{"status": "disabled"}

# Verifica
curl -s http://feature-flag-service:8080/flags | jq '.flags.STRICT_PROMO_VALIDATION'
{
  "name": "STRICT_PROMO_VALIDATION",
  "enabled": false
}

# Controlla ordini
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(orders_processed_total[5m]))'
{status: "success", data: {result: [{value: ["198"]}]}}  # 198 ordini al minuto

# Controlla errori
kubectl logs -l app=order-service --since=5m | grep -i "invalid_promo_code" | wc -l
0
```

**ME**: Flag disattivato. Ordini ripresi. Zero errori.

**TL**: E GLI ORDINI PERSI?!

**ME**: 8923. In 30 minuti.

**TL**: E IL VALORE?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla valore medio ordine
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT AVG(total) FROM orders WHERE created_at > '2027-01-01'"
avg
-------
€45.23

# Calcola valore perso
# 8923 ordini × €45.23 = €403,598.29
```

**ME**: Circa 400.000 euro di ordini persi.

**TL**: 400.000 EURO?!

**ME**: Sì. Ma... non tutti i clienti torneranno. Quindi è una perdita potenziale.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag: disattivato
- Ordini: ripresi
- Persi: 8923
- Valore: €400,000

E tutto funzionava di nuovo. Ma i soldi erano persi. E il feature flag era ancora lì. Nel codice. E nel file di configurazione. E nessuno sapeva perché. Amen.

---

**Lunedì - 10:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con gli ordini.

**UL**: Che problema?

**ME**: Un feature flag dimenticato è stato attivato. E ha bloccato 8923 ordini.

**UL**: 8923 ORDINI?!

**ME**: Sì. Per 30 minuti.

**UL**: E IL VALORE?!

**ME**: Circa 400.000 euro. Potenziali.

**UL**: 400.000 EURO?!

**ME**: Sì. Ma ho disattivato il flag. E gli ordini sono ripresi.

**UL**: E COME FA UN FEATURE FLAG A BLOCCARE GLI ORDINI?!

**ME**: Il flag attivava la validazione dei promo code. Ma i promo code non esistono più.

**UL**: NON ESISTONO PIÙ?!

**ME**: No. Li abbiamo rimossi sei mesi fa. Ma il flag era ancora lì.

**UL**: E PERCHÉ ERA ANCORA LÌ?!

**ME**: Perché nessuno lo ricordava. Era del marzo 2025.

**UL**: MARZO 2025?!

**ME**: Sì. Quasi due anni fa.

**UL**: E NESSUNO L'HA RIMOSSO?!

**ME**: No. E il deployment-bot l'ha attivato leggendo un file legacy.

**UL**: E CHI HA CREATO IL FILE?!

**ME**: Non lo so. C'era scritto "unknown".

**UL**: E ORA?!

**ME**: Ora il flag è disattivato. E sto per rimuoverlo dal codice.

**UL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta... aggiungo un processo per rimuovere i feature flag vecchi.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I feature flag vanno rimossi. E i file legacy vanno puliti. E la documentazione è obbligatoria. Amen.

---

**Lunedì - 11:00**

Ho auditato tutti i feature flag. Per trovare altre bombe a orologeria.

**TERMINALE**:
```
# Lista tutti i feature flag
curl -s http://feature-flag-service:8080/flags | jq '.flags | keys'
[
  "STRICT_PROMO_VALIDATION",
  "NEW_CHECKOUT_FLOW",
  "LEGACY_PAYMENT_GATEWAY",
  "EXPERIMENTAL_SEARCH",
  "DISABLE_RATE_LIMITING",
  "SKIP_AUTH_FOR_TESTING",
  "ENABLE_DEBUG_LOGGING",
  "OLD_EMAIL_PROVIDER",
  "BYPASS_VALIDATION",
  "USE_LEGACY_API"
]

# Controlla età dei flag
for flag in STRICT_PROMO_VALIDATION NEW_CHECKOUT_FLOW LEGACY_PAYMENT_GATEWAY EXPERIMENTAL_SEARCH DISABLE_RATE_LIMITING SKIP_AUTH_FOR_TESTING ENABLE_DEBUG_LOGGING OLD_EMAIL_PROVIDER BYPASS_VALIDATION USE_LEGACY_API; do
  echo "=== $flag ==="
  curl -s http://feature-flag-service:8080/flags/$flag | jq '{created_at, created_by, description}'
done

# Risultati
=== STRICT_PROMO_VALIDATION ===
{"created_at": "2025-03-15", "created_by": "unknown", "description": null}

=== NEW_CHECKOUT_FLOW ===
{"created_at": "2025-06-20", "created_by": "jn", "description": "New checkout flow - remove after v2.0 release"}

=== LEGACY_PAYMENT_GATEWAY ===
{"created_at": "2024-11-10", "created_by": "bob", "description": null}

=== EXPERIMENTAL_SEARCH ===
{"created_at": "2025-01-05", "created_by": "me", "description": "Experimental search - remove after testing"}

=== DISABLE_RATE_LIMITING ===
{"created_at": "2024-08-22", "created_by": "unknown", "description": null}

=== SKIP_AUTH_FOR_TESTING ===
{"created_at": "2024-05-15", "created_by": "jn", "description": "Skip auth for testing - REMOVE BEFORE PROD"}

=== ENABLE_DEBUG_LOGGING ===
{"created_at": "2024-12-01", "created_by": "bob", "description": null}

=== OLD_EMAIL_PROVIDER ===
{"created_at": "2024-02-28", "created_by": "unknown", "description": null}

=== BYPASS_VALIDATION ===
{"created_at": "2024-09-10", "created_by": "unknown", "description": null}

=== USE_LEGACY_API ===
{"created_at": "2023-11-20", "created_by": "legacy", "description": null}
```

**ME**: Ci sono 10 feature flag. E almeno 5 sono potenzialmente pericolosi.

**TL**: PERICOLOSI?!

**ME**: Sì. Guarda questi:
- DISABLE_RATE_LIMITING: disabilita il rate limiting
- SKIP_AUTH_FOR_TESTING: salta l'autenticazione
- BYPASS_VALIDATION: bypassa la validazione
- ENABLE_DEBUG_LOGGING: logga tutto
- USE_LEGACY_API: usa API vecchie

**TL**: E SE VENGONO ATTIVATI?!

**ME**: SKIP_AUTH_FOR_TESTING permette a chiunque di accedere senza auth. DISABLE_RATE_LIMITING permette DDoS. BYPASS_VALIDATION permette dati invalidi.

**TL**: E SONO ATTIVI?!

**ME**: No. Per ora. Ma sono lì. Pronti.

**TL**: E QUANTI ANNI HANNO?!

**ME**: Da 1 a 3 anni. Il più vecchio è del novembre 2023.

**TL**: E NESSUNO LI HA RIMOSSI?!

**ME**: No. Perché nessuno li ricordava.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag totali: 10
- Flag pericolosi: 5
- Età media: 1.5 anni
- Più vecchio: novembre 2023
- Documentazione: quasi inesistente

E tutto era chiaro. I feature flag si accumulano. E nessuno li rimuove. E diventano bombe a orologeria. Amen.

---

**Lunedì - 14:00**

Ho rimosso i feature flag pericolosi. E pulito il codice.

**TERMINALE**:
```
# Rimuovi flag pericolosi
curl -X DELETE http://feature-flag-service:8080/flags/SKIP_AUTH_FOR_TESTING
curl -X DELETE http://feature-flag-service:8080/flags/DISABLE_RATE_LIMITING
curl -X DELETE http://feature-flag-service:8080/flags/BYPASS_VALIDATION
curl -X DELETE http://feature-flag-service:8080/flags/ENABLE_DEBUG_LOGGING
curl -X DELETE http://feature-flag-service:8080/flags/USE_LEGACY_API

# Rimuovi dal codice
# Prima: cerca tutti i riferimenti
grep -r "SKIP_AUTH_FOR_TESTING" src/
src/middleware/auth.js:    if (featureFlags.SKIP_AUTH_FOR_TESTING) {
src/middleware/auth.js:      return next(); // Skip auth for testing
src/middleware/auth.js:    }

grep -r "DISABLE_RATE_LIMITING" src/
src/middleware/rate-limit.js:    if (featureFlags.DISABLE_RATE_LIMITING) {
src/middleware/rate-limit.js:      return next(); // No rate limiting
src/middleware/rate-limit.js:    }

# Rimuovi il codice morto
cat > src/middleware/auth.js << 'EOF'
// Auth middleware - no more skip flags
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Validate token...
  next();
}
EOF

# Deploy
kubectl rollout restart deployment/order-service
kubectl rollout restart deployment/auth-service
```

**ME**: Flag pericolosi rimossi. Codice pulito.

**TL**: E GLI ALTRI?!

**ME**: Li analizzo. E decido se rimuoverli o documentarli.

**TL**: E IL FLAG CHE HA CAUSATO IL PROBLEMA?!

**ME**: STRICT_PROMO_VALIDATION? Rimosso anche quello.

**TL**: E IL FILE LEGACY?!

**ME**: Lo rimuovo ora.

**TERMINALE**:
```
# Rimuovi file legacy
rm config/legacy-flags.yaml

# Verifica
ls config/legacy-flags.yaml
ls: cannot access 'config/legacy-flags.yaml': No such file or directory

# Commit
git add -A
git commit -m "Remove legacy feature flags and dangerous flags"
git push
```

**ME**: File legacy rimosso. E committato.

**TL**: E IL DEPLOYMENT-BOT?!

**ME**: Lo configuro per non leggere file legacy.

**TL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta... aggiungo un processo. Per i feature flag vecchi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag pericolosi: rimossi
- Codice: pulito
- File legacy: eliminato
- Deployment-bot: da configurare

E tutto era pulito. Ma la lezione era chiara. I feature flag si accumulano. E vanno rimossi. E il codice va pulito. Amen.

---

**Martedì - Il Processo**

Martedì. Ho creato un processo per i feature flag. Per evitare che si accumulino di nuovo.

**TERMINALE**:
```
# Crea script di audit
cat > scripts/feature-flag-audit.sh << 'EOF'
#!/bin/bash

# Feature Flag Audit Script
# Controlla i feature flag più vecchi di 90 giorni

MAX_AGE_DAYS=90
FLAGS=$(curl -s http://feature-flag-service:8080/flags | jq -r '.flags | keys[]')

for flag in $FLAGS; do
  created=$(curl -s http://feature-flag-service:8080/flags/$flag | jq -r '.created_at')
  age=$(( ($(date +%s) - $(date -d "$created" +%s)) / 86400 ))
  
  if [ $age -gt $MAX_AGE_DAYS ]; then
    echo "⚠️  Flag $flag is $age days old (created: $created)"
    description=$(curl -s http://feature-flag-service:8080/flags/$flag | jq -r '.description')
    if [ "$description" == "null" ] || [ -z "$description" ]; then
      echo "   ❌ NO DESCRIPTION - HIGH RISK"
    fi
  fi
done
EOF

chmod +x scripts/feature-flag-audit.sh

# Crea GitHub Action per audit automatico
cat > .github/workflows/feature-flag-audit.yml << 'EOF'
name: Feature Flag Audit
on:
  schedule:
    - cron: '0 9 * * MON'  # Ogni lunedì alle 9:00
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Feature Flag Audit
        run: |
          chmod +x scripts/feature-flag-audit.sh
          ./scripts/feature-flag-audit.sh > audit-report.txt
          
      - name: Create Issue if Old Flags Found
        if: grep -q "⚠️" audit-report.txt
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('audit-report.txt', 'utf8');
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🚨 Feature Flags da Rimuovere',
              body: `I seguenti feature flag sono più vecchi di 90 giorni:\n\n\`\`\`\n${report}\n\`\`\``,
              labels: ['tech-debt', 'feature-flags']
            });
EOF

# Crea documentazione
cat > docs/feature-flag-lifecycle.md << 'EOF'
## Feature Flag Lifecycle

### Regole

1. **Ogni feature flag DEVE avere una descrizione.**
2. **Ogni feature flag DEVE avere una data di scadenza.**
3. **I feature flag DEVONO essere rimossi entro 90 giorni dalla release.**
4. **I feature flag pericolosi DEVONO essere rimossi immediatamente dopo l'uso.**

### Processo

1. **Creazione**: Aggiungi il flag con descrizione e data di scadenza.
2. **Attivazione**: Attiva il flag per il testing.
3. **Release**: Rilascia la feature al 100% degli utenti.
4. **Pulizia**: Rimuovi il flag dal codice e dal sistema.

### Audit

- Ogni lunedì: audit automatico dei flag > 90 giorni.
- Ogni flag vecchio genera un issue GitHub.
- Il team DEVE rimuovere o documentare i flag vecchi.

### Template per nuovi flag

```json
{
  "name": "MY_NEW_FEATURE",
  "description": "Enable new feature X - remove after v2.1 release",
  "expiration": "2027-03-16",
  "created_by": "your-name",
  "created_at": "2027-01-16"
}
```
EOF
```

**TL**: Hai creato il processo?

**ME**: Sì. Audit automatico ogni lunedì. Issue per i flag vecchi. Documentazione obbligatoria.

**TL**: E SE NESSUNO RISPONDE ALL'ISSUE?!

**ME**: Allora... l'issue resta aperto. E il TL lo vede.

**TL**: E SE IL TL NON LO VEDE?!

**ME**: Allora... prega.

**TL**: E I FLAG PERICOLOSI?!

**ME**: Quelli li ho rimossi tutti. E ho aggiunto un check per i flag con nomi pericolosi.

**TERMINALE**:
```
# Aggiungi check per flag pericolosi
cat > scripts/check-dangerous-flags.sh << 'EOF'
#!/bin/bash

DANGEROUS_PATTERNS=(
  "SKIP"
  "BYPASS"
  "DISABLE"
  "NO_AUTH"
  "NO_VALIDATION"
  "DEBUG"
  "TEST"
)

FLAGS=$(curl -s http://feature-flag-service:8080/flags | jq -r '.flags | keys[]')

for flag in $FLAGS; do
  for pattern in "${DANGEROUS_PATTERNS[@]}"; do
    if [[ "$flag" == *"$pattern"* ]]; then
      echo "🚨 DANGEROUS FLAG DETECTED: $flag"
      echo "   This flag should be removed immediately!"
    fi
  done
done
EOF
```

**TL**: E QUINDI?!

**ME**: E quindi... la prossima volta non succede. O quasi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Audit: automatico
- Issue: automatici
- Check: pericolosi
- Documentazione: obbligatoria

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno gestiti. E che i processi sono essenziali. E che la documentazione è obbligatoria. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato il team. Non con rabbia. Con pazienza.

**ME**: Team, riunione.

**JN**: Sì?

**ME**: Ieri abbiamo perso 8923 ordini. Per un feature flag dimenticato.

**JN**: Un feature flag?!

**ME**: Sì. STRICT_PROMO_VALIDATION. Creato nel marzo 2025. Mai rimosso.

**JN**: E CHE FACEVA?!

**ME**: Validava i promo code. Ma i promo code non esistono più.

**JN**: Ah.

**ME**: E quando è stato attivato, ha bloccato tutto.

**JN**: E CHI L'HA ATTIVATO?!

**ME**: Il deployment-bot. Leggendo un file legacy.

**JN**: E PERCHÉ NON L'ABBIAMO RIMOSSO?!

**ME**: Perché nessuno lo ricordava. Ecco perché ora abbiamo un processo.

**JN**: Un processo?

**ME**: Sì. Cinque regole. Primo: ogni feature flag DEVE avere una descrizione.

**JN**: Sempre?

**ME**: Sempre. Senza descrizione, non sai cosa fa. E se non sai cosa fa, non sai se rimuoverlo.

**JN**: Ok.

**ME**: Secondo: ogni feature flag DEVE avere una data di scadenza.

**JN**: Scadenza?

**ME**: Sì. Quando deve essere rimosso. Di solito 90 giorni dopo la release.

**JN**: Ok.

**ME**: Terzo: i feature flag DEVONO essere rimossi entro 90 giorni.

**JN**: E SE NON LO FACCIAMO?!

**ME**: Allora l'audit lo trova. E crea un issue. E tu DEVI rispondere.

**JN**: Ok.

**ME**: Quarto: i flag pericolosi DEVONO essere rimossi immediatamente.

**JN**: Pericolosi?

**ME**: Sì. SKIP_AUTH. BYPASS_VALIDATION. DISABLE_RATE_LIMITING. Questi nomi sono vietati.

**JN**: E SE NE HO BISOGNO?!

**ME**: Allora lo usi in locale. E LO RIMUOVI prima del commit.

**JN**: Ok.

**ME**: Quinto: documenta tutto. Cosa fa il flag. Quando è stato creato. Quando deve essere rimosso.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... non crei il flag. E fai la feature senza flag.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Regole: 5
- Audit: automatico
- Flag pericolosi: rimossi
- Educazione: completata

E tutto era chiaro. Ma le cose che sembrano chiare sono le più pericolose. Perché i junior dimenticano. E i senior dimenticano. E tutti dimenticano. E l'unico modo per non far crollare il sistema è avere processi. E audit. E documentazione. Amen.

---

**Giovedì - La Pulizia**

Giovedì. Ho pulito tutti i feature flag vecchi. E rimosso il codice morto.

**TERMINALE**:
```
# Lista flag rimanenti
curl -s http://feature-flag-service:8080/flags | jq '.flags | keys'
[
  "NEW_CHECKOUT_FLOW",
  "LEGACY_PAYMENT_GATEWAY",
  "EXPERIMENTAL_SEARCH",
  "OLD_EMAIL_PROVIDER"
]

# Analizza ogni flag
for flag in NEW_CHECKOUT_FLOW LEGACY_PAYMENT_GATEWAY EXPERIMENTAL_SEARCH OLD_EMAIL_PROVIDER; do
  echo "=== $flag ==="
  curl -s http://feature-flag-service:8080/flags/$flag | jq '{created_at, description, enabled}'
done

# Risultati
=== NEW_CHECKOUT_FLOW ===
{"created_at": "2025-06-20", "description": "New checkout flow - remove after v2.0 release", "enabled": true}

=== LEGACY_PAYMENT_GATEWAY ===
{"created_at": "2024-11-10", "description": null, "enabled": false}

=== EXPERIMENTAL_SEARCH ===
{"created_at": "2025-01-05", "description": "Experimental search - remove after testing", "enabled": false}

=== OLD_EMAIL_PROVIDER ===
{"created_at": "2024-02-28", "description": null, "enabled": false}

# Controlla se NEW_CHECKOUT_FLOW è ancora necessario
grep -r "NEW_CHECKOUT_FLOW" src/
src/services/checkout.js:    if (featureFlags.NEW_CHECKOUT_FLOW) {
src/services/checkout.js:      return newCheckoutFlow(order);
src/services/checkout.js:    } else {
src/services/checkout.js:      return legacyCheckoutFlow(order);
src/services/checkout.js:    }

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(checkout_requests_total{flow="new"}[24h])) / sum(rate(checkout_requests_total[24h]))'
{status: "success", data: {result: [{value: ["0.98"]}]}}  # 98% usa il nuovo flow

# Il nuovo flow è usato al 98%. Possiamo rimuovere il flag e il codice legacy.
```

**ME**: NEW_CHECKOUT_FLOW è usato al 98%. Posso rimuoverlo e tenere solo il nuovo flow.

**TL**: E IL CODICE LEGACY?!

**ME**: Lo rimuovo. E semplifico.

**TERMINALE**:
```
# Rimuovi feature flag e codice legacy
cat > src/services/checkout.js << 'EOF'
// Checkout service - new flow only
async function processCheckout(order) {
  // Validate order
  if (!order.items || order.items.length === 0) {
    throw new Error('Empty order');
  }
  
  // Calculate total
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Process payment
  await processPayment(order.paymentMethod, total);
  
  // Create order
  return await createOrder(order, total);
}
EOF

# Rimuovi flag
curl -X DELETE http://feature-flag-service:8080/flags/NEW_CHECKOUT_FLOW

# Rimuovi altri flag inutilizzati
curl -X DELETE http://feature-flag-service:8080/flags/LEGACY_PAYMENT_GATEWAY
curl -X DELETE http://feature-flag-service:8080/flags/EXPERIMENTAL_SEARCH
curl -X DELETE http://feature-flag-service:8080/flags/OLD_EMAIL_PROVIDER

# Verifica
curl -s http://feature-flag-service:8080/flags | jq '.flags | keys'
[]
```

**ME**: Tutti i feature flag rimossi. Codice semplificato.

**TL**: E ORA?!

**ME**: Ora il sistema è pulito. Nessun feature flag. Nessun codice morto.

**TL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta... i flag vengono creati con descrizione e scadenza. E l'audit li controlla.

**TL**: E SE NESSUNO RISPONDE ALL'AUDIT?!

**ME**: Allora... il TL riceve una notifica. E interviene.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 0
- Codice morto: 0
- Audit: attivo
- Processo: documentato

E tutto era pulito. Ma avevo imparato una lezione. La lezione che i feature flag sono debito tecnico. E che il debito va pagato. E che la pulizia è essenziale. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 08:45
**Autore**: unknown
**Servizio**: order-service
**Problema**: Feature flag dimenticato attivato per sbaglio
**Causa**: Deployment-bot ha letto file legacy con flag attivo
**Nome flag**: STRICT_PROMO_VALIDATION
**Data creazione**: 15 marzo 2025
**Tempo in sistema**: 22 mesi
**Ordini persi**: 8923
**Valore potenziale**: €403,598.29
**Tempo di risoluzione**: 30 minuti
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "400.000 euro?!"
**Reazione TL**: "Un feature flag?!"
**Reazione CTO**: "I flag vanno rimossi."
**Soluzione**: Flag rimosso + audit automatico + processo documentato
**Lezione imparata**: I FEATURE FLAG VANNO RIMOSSI. SEMPRE.

**Regole per i feature flag**:
1. Ogni feature flag DEVE avere una descrizione.
2. Ogni feature flag DEVE avere una data di scadenza.
3. I feature flag DEVONO essere rimossi entro 90 giorni dalla release.
4. I flag pericolosi (SKIP, BYPASS, DISABLE) sono VIETATI.
5. L'audit automatico controlla i flag ogni lunedì.
6. I flag vecchi generano issue GitHub automatici.
7. Il team DEVE rispondere agli issue entro 7 giorni.
8. I feature flag sono debito tecnico. E il debito va pagato. Amen.

**Come creare un feature flag correttamente**:
```json
{
  "name": "MY_NEW_FEATURE",
  "description": "Enable new feature X - remove after v2.1 release",
  "expiration": "2027-04-16",
  "created_by": "your-name",
  "created_at": "2027-01-16"
}
```

**Come rimuovere un feature flag**:
```bash
# 1. Verifica che il flag non sia più necessario
curl -s http://feature-flag-service:8080/flags/MY_FLAG | jq '.enabled'
# Se false, procedi

# 2. Rimuovi il codice che usa il flag
# Cerca tutti i riferimenti
grep -r "MY_FLAG" src/
# Rimuovi o semplifica il codice

# 3. Rimuovi il flag dal sistema
curl -X DELETE http://feature-flag-service:8080/flags/MY_FLAG

# 4. Commit e deploy
git add -A
git commit -m "Remove feature flag MY_FLAG"
git push
```

**Come configurare l'audit automatico**:
```yaml
# .github/workflows/feature-flag-audit.yml
name: Feature Flag Audit
on:
  schedule:
    - cron: '0 9 * * MON'
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/feature-flag-audit.sh
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag vanno rimossi. E che l'audit è essenziale. E che la documentazione è obbligatoria. E che 8923 ordini persi sono tanti. E che 400.000 euro sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come i paracadute di riserva. Se non li controlli, non sai se funzionano. E se non li rimuovi, diventano bombe a orologeria. E un giorno esplodono. E tu ti chiedi: "Com'è possibile?" E la risposta è semplice: perché nessuno li ricordava. E il flag era lì. Da 22 mesi. E nessuno sapeva cosa faceva. E quando è stato attivato, ha fatto quello che era programmato per fare. E quello che era programmato per fare era bloccare gli ordini. E gli ordini sono stati bloccati. E i clienti hanno chiamato. E UL ha chiamato. E tu hai risposto. E hai detto: "Era un feature flag dimenticato." E UL ha detto: "DIMENTICATO?!" E tu hai detto: "Sì. Del marzo 2025." E UL ha detto: "E PERCHÉ ERA ANCORA LÌ?!" E tu hai detto: "Perché nessuno lo ricordava." E la verità è che tutti dimenticano. E l'unico modo per non dimenticare è avere processi. E audit. E documentazione. E la prossima volta, il flag viene rimosso. Entro 90 giorni. O l'audit lo trova. E tu lo rimuovi. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | order-service |
| Nome flag | STRICT_PROMO_VALIDATION |
| Autore | unknown |
| Data creazione | 15/03/2025 |
| Data incident | 16/01/2027, 08:45 |
| Tempo in sistema | 22 mesi |
| Ordini persi | 8923 |
| Valore potenziale | €403,598.29 |
| Tempo di risoluzione | 30 minuti |
| Downtime | 0 (parziale) |
| Feature flag trovati | 10 |
| Flag pericolosi | 5 |
| Flag rimossi | 10 |
| Codice morto rimosso | ~500 righe |
| Reazione UL | "400.000 euro?!" |
| Reazione TL | "Un feature flag?!" |
| Reazione CTO | "I flag vanno rimossi." |
| Soluzione | Flag rimossi + audit + processo |
| Lezione imparata | FLAG = DEBITO TECNICO |
| **Totale** | **€403,598 potenziali + 10 flag rimossi + 1 processo creato** |

**Morale**: I feature flag vanno rimossi. Sempre. Dopo che la feature è stata rilasciata. E testata. E verificata. E quando dico "rimossi", intendo eliminati dal codice. Non disabilitati nel pannello di controllo. Non settati a "false" nel file di configurazione. ELIMINATI. Dal codice. Perché un feature flag disabilitato è come una bomba a orologeria. È lì. Pronta a esplodere. E un giorno qualcuno la attiva per sbaglio. O un bot la attiva. O un test la attiva. E la bomba esplode. E tu ti chiedi: "Com'è possibile che il feature flag fosse ancora lì?" E la risposta è semplice: perché nessuno lo ricordava. E il feature flag era lì. Da 22 mesi. E nessuno sapeva cosa faceva. E quando è stato attivato, ha fatto quello che era programmato per fare. E quello che era programmato per fare era bloccare gli ordini. E gli ordini sono stati bloccati. E i clienti hanno chiamato. E UL ha chiamato. E tu hai risposto. E hai detto: "Era un feature flag dimenticato." E UL ha detto: "DIMENTICATO?!" E tu hai detto: "Sì. Del marzo 2025." E UL ha detto: "E PERCHÉ ERA ANCORA LÌ?!" E tu hai detto: "Perché nessuno lo ricordava." E UL ha detto: "E COME FA A ESSERCI DA 22 MESI?!" E tu hai detto: "Perché non avevamo un processo per rimuoverli." E la verità è che i feature flag sono debito tecnico. E il debito va pagato. E se non lo paghi, si accumula. E un giorno esplode. E ti costa 400.000 euro. O di più. E la prossima volta, il flag viene rimosso. Entro 90 giorni. O l'audit lo trova. E tu lo rimuovi. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-la-tabella-sbagliata.md)**
