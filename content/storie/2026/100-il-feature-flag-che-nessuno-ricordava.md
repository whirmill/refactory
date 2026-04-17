# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-il-container-che-non-si-fermava-piu.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Dopo che la feature è stabile. Dopo che è stata testata. Dopo che è in produzione da un po'. E invece. Invece i feature flag si accumulano. Come polvere sotto il tappeto. Come debito tecnico nel codice. Come promesse non mantenute. E un giorno, qualcuno li attiva per sbaglio. O li disattiva per errore. O li dimentica completamente. E il sistema si rompe. E tu ti chiedi: "Com'è possibile che un flag vecchio di 18 mesi abbia rotto tutto?" E la risposta è semplice: perché nessuno lo ricordava. E perché nessuno l'ha rimosso. E perché il flag controllava qualcosa di critico. E quel qualcosa era cambiato. E il flag no. E ora il flag è attivo. E il sistema è down. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un feature flag." E UL dice: "E CHE COS'È UN FEATURE FLAG?!" E tu dici: "Un interruttore per attivare funzionalità." E UL dice: "E PERCHÉ ERA ANCORA LÌ?!" E tu dici: "Perché nessuno l'ha rimosso." E la verità è che tutti dimenticano i feature flag. E tutti pensano che qualcun altro li rimuoverà. E nessuno lo fa. E i flag si accumulano. E un giorno esplodono. Amen.

![](../../img/server.jpg)

---

**Lunedì - L'Attivazione**

Era lunedì. Le 10:00. JN stava pulendo la configurazione.

**JN**: Ho trovato un flag strano nella configurazione.

**ME**: Quale?

**JN**: `ENABLE_LEGACY_PAYMENT_FLOW`. È settato a `false` da 18 mesi.

**ME**: 18 mesi?!

**JN**: Sì. L'ho trovato mentre pulivo i flag vecchi.

**ME**: E cosa fa?

**JN**: Non lo so. Il commento dice "abilita il flusso legacy di pagamento".

**ME**: E perché è disabilitato?

**JN**: Non lo so. Ma penso che possiamo rimuoverlo. È vecchio.

**ME**: Aspetta. Prima controlliamo cosa fa.

**JN**: Ma è disabilitato da 18 mesi! Non serve più!

**ME**: JN, i flag vecchi sono i più pericolosi. Controlliamo.

**JN**: Va bene. Ma intanto lo attivo per vedere cosa succede in staging.

**ME**: NO! NON ATTIVARLO SENZA SAPERE COSA FA!

**JN**: È solo staging. Che male può fare?

**ME**: JN, staging è connesso al database di produzione per i pagamenti.

**JN**: Cosa?!

**ME**: Sì. Per i test di integrazione. Lo sai.

**JN**: Ah. Quindi... non lo attivo?

**ME**: NO. Prima controlliamo il codice.

JN ha guardato il terminale. Io guardavo JN. JN guardava me. E il flag era lì. In attesa. Come una bomba a orologeria. Amen.

---

**Lunedì - 10:30**

Ho controllato il codice. Il flag controllava qualcosa di importante.

**TERMINALE**:
```
# Cerca il flag nel codice
grep -r "ENABLE_LEGACY_PAYMENT_FLOW" src/

src/services/payment.js:    if (process.env.ENABLE_LEGACY_PAYMENT_FLOW === 'true') {
src/services/payment.js:      return legacyPaymentGateway.process(order);
src/services/payment.js:    } else {
src/services/payment.js:      return newPaymentGateway.process(order);
src/services/payment.js:    }

# Controlla i gateway
grep -r "legacyPaymentGateway" src/

src/services/payment.js:const legacyPaymentGateway = require('./legacy-gateway');
src/services/legacy-gateway.js:// DEPRECATED: Questo gateway è stato dismesso il 01/07/2025
src/services/legacy-gateway.js:// NON USARE - Il servizio è stato spento

# Controlla la configurazione del gateway legacy
cat src/config/legacy-gateway.json
{
  "url": "https://legacy-payment.company.com",
  "timeout": 30000,
  "apiKey": "DEPRECATED_DO_NOT_USE"
}
```

**ME**: Il flag controlla quale gateway di pagamento usare.

**JN**: E quale usa?

**ME**: Se il flag è `true`, usa il gateway legacy. Se è `false`, usa quello nuovo.

**JN**: E il gateway legacy?

**ME**: È stato dismesso il 1° luglio 2025. 18 mesi fa.

**JN**: E se lo attiviamo?

**ME**: Tutti i pagamenti vanno a un servizio che non esiste più.

**JN**: E quindi?

**ME**: E quindi tutti i pagamenti falliscono.

**JN**: Ma è disabilitato!

**ME**: Sì. Ma se qualcuno lo attiva per sbaglio...

**JN**: Nessuno lo farebbe!

**ME**: Tu stavi per farlo. 30 minuti fa.

**JN**: Ma... era per testare!

**ME**: E se lo testavi in produzione?

**JN**: Non lo farei mai!

**ME**: JN, hai mai fatto un deploy di venerdì sera?

**JN**: ...sì.

**ME**: Hai mai fatto un deploy senza testare?

**JN**: ...sì.

**ME**: Hai mai attivato un flag per "vedere cosa succede"?

**JN**: ...stavo per farlo ora.

**ME**: Ecco. Ecco perché i flag vanno rimossi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag: ENABLE_LEGACY_PAYMENT_FLOW
- Valore: false
- Gateway legacy: DISMANTLED
- Rischio: CRITICO

E tutto era chiaro. Il flag era una bomba. E JN stava per attivarla. Amen.

---

**Lunedì - 11:00**

Ho chiamato il TL. Il TL ha chiamato UL. UL ha chiamato il CTO.

**TL**: Quindi mi stai dicendo che c'è un flag che può mandare in tilt tutti i pagamenti?

**ME**: Sì. Se attivato, tutti i pagamenti vanno a un gateway dismesso.

**UL**: E QUANTO TEMPO È STATO LÌ?!

**ME**: 18 mesi.

**CTO**: 18 MESI?!

**ME**: Sì. Da quando abbiamo migrato al nuovo gateway.

**CTO**: E PERCHÉ NON È STATO RIMOSSO?!

**ME**: Non lo so. Forse chi ha fatto la migrazione pensava di rimuoverlo dopo.

**CTO**: E NON L'HA FATTO?!

**ME**: No. E il flag è rimasto.

**UL**: E QUANTI ALTRI FLAG CI SONO?!

**ME**: Non lo so. Dobbiamo controllare.

**CTO**: CONTROLLATE. E RIMUOVETE TUTTI I FLAG VECCHI.

**UL**: E QUELLO SPECIFICO?!

**ME**: Lo rimuoviamo oggi. Subito.

**CTO**: Bene. E documentate tutto.

Il CTO ha riattaccato. UL ha guardato il TL. Il TL ha guardato me. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Flag: pericoloso
- Gateway: dismesso
- Tempo: 18 mesi
- Responsabilità: di tutti

E la lezione era chiara. I flag vanno rimossi. E la responsabilità è di tutti. Amen.

---

**Lunedì - 11:30**

Ho rimosso il flag. E il codice morto.

**TERMINALE**:
```
# Rimuovi il flag
git checkout -b remove-legacy-payment-flag

# Modifica il codice
cat > src/services/payment.js << 'EOF'
// RIMOSSO: ENABLE_LEGACY_PAYMENT_FLOW
// Il gateway legacy è stato dismesso il 01/07/2025
// Questo flag è stato rimosso il 16/01/2027

const newPaymentGateway = require('./new-gateway');

async function processPayment(order) {
  return newPaymentGateway.process(order);
}

module.exports = { processPayment };
EOF

# Rimuovi il gateway legacy
rm src/services/legacy-gateway.js
rm src/config/legacy-gateway.json

# Aggiorna i test
cat > tests/payment.test.js << 'EOF'
describe('Payment', () => {
  it('should use new gateway', async () => {
    const result = await processPayment({ amount: 100 });
    expect(result.gateway).toBe('new');
  });

  it('should not have legacy flag', () => {
    expect(process.env.ENABLE_LEGACY_PAYMENT_FLOW).toBeUndefined();
  });
});
EOF

# Commit
git add .
git commit -m "Rimuovi feature flag legacy e codice morto

- Rimuove ENABLE_LEGACY_PAYMENT_FLOW (inattivo da 18 mesi)
- Rimuove legacy-gateway.js (dismesso il 01/07/2025)
- Aggiorna test per verificare assenza del flag

Refs: INCIDENT-FLAG-001"

# Push
git push origin remove-legacy-payment-flag
```

**ME**: Flag rimosso. Codice morto eliminato. Test aggiornati.

**TL**: E QUANTO CODICE ABBIAMO RIMOSSO?

**ME**: 347 righe. Tra gateway, configurazione, e test.

**TL**: E QUANTI FLAG RESTANO?

**ME**: Non lo so. Ora controlliamo.

**TERMINALE**:
```
# Conta tutti i feature flag
grep -r "ENABLE_\|FEATURE_\|FLAG_" src/ | grep -v node_modules | wc -l
47

# Lista flag
grep -rh "ENABLE_\|FEATURE_\|FLAG_" src/ | grep -oE "(ENABLE|FEATURE|FLAG)_[A-Z_]+" | sort | uniq -c | sort -rn
     12 ENABLE_NEW_CHECKOUT
      8 FEATURE_DARK_MODE
      6 FLAG_BETA_FEATURES
      5 ENABLE_LEGACY_API
      4 FEATURE_EXPERIMENTAL_SEARCH
      3 ENABLE_DEBUG_MODE
      2 FLAG_MIGRATION_V2
      2 FEATURE_TEMP_HACK
      1 ENABLE_LEGACY_PAYMENT_FLOW  # Appena rimosso
      ...
```

**ME**: 47 flag. Di cui 12 per il nuovo checkout.

**TL**: E IL NUOVO CHECKOUT QUANDO È STATO RILASCIATO?!

**ME**: 8 mesi fa.

**TL**: E IL FLAG È ANCORA LÌ?!

**ME**: Sì. E probabilmente non serve più.

**TL**: E GLI ALTRI?!

**ME**: Dobbiamo controllarli tutti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag totali: 47
- Flag vecchi: molti
- Flag pericolosi: almeno 1
- Lavoro: tanto

E la lezione era chiara. I flag si accumulano. E nessuno li rimuove. E qualcuno deve farlo. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i flag. Con JN. E Bob. E il TL.

**TERMINALE**:
```
# Audit completo
cat > scripts/audit-feature-flags.sh << 'EOF'
#!/bin/bash
echo "=== FEATURE FLAG AUDIT ==="
echo ""

for flag in $(grep -rh "ENABLE_\|FEATURE_\|FLAG_" src/ | grep -oE "(ENABLE|FEATURE|FLAG)_[A-Z_]+" | sort | uniq); do
  echo "=== $flag ==="
  
  # Quando è stato aggiunto
  git log --all --oneline --grep="$flag" | head -1
  
  # Ultima modifica
  git log --all --oneline -S "$flag" | head -1
  
  # Dove è usato
  grep -r "$flag" src/ | wc -l
  echo "Usato in $(grep -r "$flag" src/ | wc -l) file"
  
  # Valore attuale
  echo "Valore attuale: $(grep $flag .env 2>/dev/null || echo 'non settato')"
  
  echo ""
done
EOF

chmod +x scripts/audit-feature-flags.sh
./scripts/audit-feature-flags.sh > feature-flag-audit.txt
```

**ME**: Ecco l'audit. 47 flag. Di cui:
- 12 possono essere rimossi (feature già stabili)
- 8 sono attivi e necessari
- 6 sono sospetti (non dovrebbero esistere)
- 5 sono pericolosi (controllano cose critiche)
- 16 sono dubbi (da verificare)

**TL**: E QUALI SONO PERICOLOSI?

**ME**:
1. `ENABLE_LEGACY_API` - Se attivo, usa API deprecate
2. `FLAG_MIGRATION_V2` - Controlla una migrazione che è finita 6 mesi fa
3. `ENABLE_DEBUG_MODE` - Espone informazioni sensibili
4. `FEATURE_TEMP_HACK` - Il nome dice tutto
5. `FLAG_BETA_FEATURES` - Attiva feature non testate

**TL**: E GLI ALTRI 6 SOSPETTI?

**ME**:
1. `FEATURE_EXPERIMENTAL_SEARCH` - Sperimentale da 14 mesi
2. `ENABLE_NEW_CHECKOUT` - "Nuovo" da 8 mesi
3. `FLAG_SKIP_VALIDATION` - Perché esiste?!
4. `FEATURE_DISABLE_SECURITY` - NEGLIGENZA PURA
5. `ENABLE_MOCK_PAYMENTS` - In produzione?!
6. `FLAG_USE_TEST_DATA` - In produzione?!

**TL**: FLAG_DISABLE_SECURITY?!

**ME**: Sì. L'ha aggiunto Bob 6 mesi fa. Per "testare".

**BOB**: Era per testare!

**TL**: IN PRODUZIONE?!

**BOB**: No! In staging!

**TL**: E PERCHÉ È IN PRODUZIONE?!

**BOB**: Perché... l'ho committato nel branch sbagliato?

**TL**: E NON L'HAI RIMOSSO?!

**BOB**: Me ne sono dimenticato!

**TL**: PER 6 MESI?!

**BOB**: Sì...

Il TL ha guardato Bob. Bob guardava il pavimento. Io guardavo il terminale. Il terminale mostrava:
- Flag pericolosi: 5
- Flag sospetti: 6
- Flag da rimuovere: 12
- Bob: da educare

E la lezione era chiara. I flag sono pericolosi. E Bob va educato. E tutti vanno educati. Amen.

---

**Martedì - 14:00**

Ho rimosso i flag pericolosi. Tutti.

**TERMINALE**:
```
# Rimuovi flag pericolosi
git checkout -b remove-dangerous-flags

# Rimuovi ENABLE_LEGACY_API
sed -i '/ENABLE_LEGACY_API/d' src/services/api.js
sed -i '/ENABLE_LEGACY_API/d' .env.example

# Rimuovi FLAG_MIGRATION_V2
rm src/migration/v2-handler.js
sed -i '/FLAG_MIGRATION_V2/d' src/services/migration.js

# Rimuovi ENABLE_DEBUG_MODE
sed -i '/ENABLE_DEBUG_MODE/d' src/middleware/debug.js
sed -i '/ENABLE_DEBUG_MODE/d' src/config/security.js

# Rimuovi FEATURE_TEMP_HACK
rm src/hacks/temp-hack.js
sed -i '/FEATURE_TEMP_HACK/d' src/services/hack-handler.js

# Rimuovi FLAG_BETA_FEATURES
rm src/features/beta.js
sed -i '/FLAG_BETA_FEATURES/d' src/services/features.js

# Rimuovi FLAG_DISABLE_SECURITY
sed -i '/FLAG_DISABLE_SECURITY/d' src/middleware/security.js
sed -i '/FLAG_DISABLE_SECURITY/d' src/config/security.js

# Rimuovi FLAG_SKIP_VALIDATION
sed -i '/FLAG_SKIP_VALIDATION/d' src/middleware/validation.js

# Rimuovi FEATURE_DISABLE_SECURITY (duplicato?)
sed -i '/FEATURE_DISABLE_SECURITY/d' src/middleware/auth.js

# Rimuovi ENABLE_MOCK_PAYMENTS
rm src/services/mock-payment.js
sed -i '/ENABLE_MOCK_PAYMENTS/d' src/services/payment.js

# Rimuovi FLAG_USE_TEST_DATA
sed -i '/FLAG_USE_TEST_DATA/d' src/services/data.js

# Commit
git add .
git commit -m "Rimuovi feature flag pericolosi e sospetti

Rimossi:
- ENABLE_LEGACY_API (API deprecate)
- FLAG_MIGRATION_V2 (migrazione completata)
- ENABLE_DEBUG_MODE (info sensibili)
- FEATURE_TEMP_HACK (hack temporaneo)
- FLAG_BETA_FEATURES (feature non testate)
- FLAG_DISABLE_SECURITY (NEGLIGENZA)
- FLAG_SKIP_VALIDATION (pericoloso)
- FEATURE_DISABLE_SECURITY (duplicato pericoloso)
- ENABLE_MOCK_PAYMENTS (non per produzione)
- FLAG_USE_TEST_DATA (non per produzione)

Refs: INCIDENT-FLAG-001"

git push origin remove-dangerous-flags
```

**ME**: 10 flag rimossi. 892 righe di codice eliminate.

**TL**: E I TEST?

**ME**: Aggiornati. Tutti passing.

**TL**: E GLI ALTRI FLAG?

**ME**: Quelli necessari li teniamo. Quelli vecchi li rimuoviamo gradualmente.

**TL**: E QUANTI RESTANO?

**ME**: 37. Ma ora sono documentati. E monitorati.

**TL**: E BOB?

**ME**: Bob... lo educhiamo.

Il TL mi ha guardato. Io guardavo Bob. Bob guardava il terminale. Il terminale mostrava:
- Flag rimossi: 10
- Codice eliminato: 892 righe
- Bob: colpevole
- Educazione: necessaria

E tutto era più pulito. Ma la lezione era chiara. I flag vanno rimossi. E Bob va educato. E tutti vanno educati. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato Bob. E JN. E tutti quelli che avevano aggiunto flag.

**ME**: Bob, JN, sedetevi.

**BOB**: È per i flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i flag pericolosi sono stati un disastro potenziale. Ma sono anche un'opportunità.

**BOB**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Sette cose. Primo: i feature flag sono debito tecnico.

**BOB**: Debito tecnico?

**ME**: Sì. Ogni flag che aggiungi è una promessa che rimuoverai. Se non la mantieni, il debito aumenta.

**BOB**: Ok.

**ME**: Secondo: i flag vanno rimossi dopo che la feature è stabile.

**JN**: Dopo quanto?

**ME**: Dipende. Ma non più di 2-3 sprint. Se la feature è stabile, il flag va via.

**JN**: E se non è stabile?

**ME**: Allora la feature non è pronta. E non dovrebbe essere in produzione.

**BOB**: Ok.

**ME**: Terzo: i flag non vanno mai nel codice di produzione se sono per test.

**BOB**: Ma io l'ho fatto per testare!

**ME**: E PERCHÉ ERA IN PRODUZIONE?!

**BOB**: Ho committato nel branch sbagliato...

**ME**: E NON L'HAI CONTROLLATO?!

**BOB**: No...

**ME**: BOB, I FLAG PER TEST VANNO IN BRANCH SEPARATI. E NON VANNO MAI IN MAIN.

**BOB**: Ok.

**ME**: Quarto: i flag con nomi come "TEMP", "HACK", "SKIP" sono vietati.

**JN**: Vietati?

**ME**: Vietati. Se hai bisogno di un hack, lo fai in un branch. E lo rimuovi prima del merge.

**JN**: E se serve temporaneamente?

**ME**: Allora lo chiami con un nome descrittivo. E aggiungi un TODO per rimuoverlo. E una data.

**JN**: Ok.

**ME**: Quinto: i flag che disabilitano la sicurezza sono FUORI QUESTIONE.

**BOB**: Ma per testare...

**ME**: PER TESTARE USI UN AMBIENTE DI TEST. NON PRODUZIONE.

**BOB**: Ok...

**ME**: Sesto: documenti ogni flag. Con: cosa fa, quando è stato aggiunto, quando va rimosso, chi è responsabile.

**JN**: Documenta?

**ME**: Sì. Nel codice. E in un file separato. E nel ticket.

**JN**: E se non ho tempo?

**ME**: Allimenti non aggiungi il flag. Il tempo per documentare è parte del lavoro.

**BOB**: Ok.

**ME**: Settimo: fai audit regolari dei flag. E rimuovi quelli vecchi.

**JN**: Regolari?

**ME**: Sì. Ogni sprint. O ogni mese. Ma fallo.

**JN**: E chi lo fa?

**ME**: Tutti. È responsabilità di tutti.

Bob e JN mi hanno guardato. Io guardavo loro. Loro guardavano il terminale. Il terminale mostrava:
- Flag rimossi: 10
- Regole: 7
- Educazione: completata
- Responsabilità: di tutti

E tutto era chiaro. Ma le cose che sembrano chiare sono le più pericolose. Perché tutti dimenticano. E tutti aggiungono flag. E nessuno li rimuove. E il ciclo ricomincia. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i flag. E alert per i flag pericolosi.

**TERMINALE**:
```
# Configura alert per flag pericolosi
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: DangerousFeatureFlagActive
        expr: |
          count by (flag) (
            feature_flag_enabled{flag=~"DISABLE_|SKIP_|HACK_|TEMP_|MOCK_|TEST_"}
          ) > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Dangerous feature flag {{ $labels.flag }} is active"
          description: "Feature flag {{ $labels.flag }} is enabled. This flag pattern suggests it should not be in production."

      - alert: FeatureFlagOlderThan30Days
        expr: |
          count by (flag) (
            feature_flag_age_days > 30
          ) > 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is older than 30 days"
          description: "Feature flag {{ $labels.flag }} has been active for {{ $value }} days. Consider removing it if the feature is stable."

      - alert: FeatureFlagNeverUsed
        expr: |
          count by (flag) (
            feature_flag_enabled == 1
            and
            increase(feature_flag_evaluations_total[7d]) == 0
          ) > 0
        for: 1h
        labels:
          severity: info
        annotations:
          summary: "Feature flag {{ $labels.flag }} is never used"
          description: "Feature flag {{ $labels.flag }} is enabled but has not been evaluated in 7 days. Consider removing it."

      - alert: FeatureFlagCountIncreasing
        expr: |
          increase(feature_flag_total_count[7d]) > 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag count is increasing"
          description: "Total feature flag count has increased by {{ $value }} in the last 7 days. Remember to remove old flags."
EOF

# Aggiungi metriche per flag
cat > src/lib/feature-flag-metrics.js << 'EOF'
const prometheus = require('prom-client');

const featureFlagEnabled = new prometheus.Gauge({
  name: 'feature_flag_enabled',
  help: 'Whether a feature flag is enabled: 0=disabled, 1=enabled',
  labelNames: ['flag', 'added_date', 'owner'],
});

const featureFlagAge = new prometheus.Gauge({
  name: 'feature_flag_age_days',
  help: 'Age of feature flag in days',
  labelNames: ['flag'],
});

const featureFlagEvaluations = new prometheus.Counter({
  name: 'feature_flag_evaluations_total',
  help: 'Total evaluations of feature flags',
  labelNames: ['flag', 'result'],
});

const featureFlagTotal = new prometheus.Gauge({
  name: 'feature_flag_total_count',
  help: 'Total number of feature flags',
});

module.exports = { featureFlagEnabled, featureFlagAge, featureFlagEvaluations, featureFlagTotal };
EOF

# Configura CI check per flag pericolosi
cat > .github/workflows/feature-flag-check.yml << 'EOF'
name: Feature Flag Check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for dangerous flags
        run: |
          if grep -rE "(DISABLE_|SKIP_|HACK_|TEMP_|MOCK_|TEST_)" src/; then
            echo "ERROR: Dangerous feature flag pattern detected!"
            echo "Flags with DISABLE_, SKIP_, HACK_, TEMP_, MOCK_, or TEST_ are not allowed in production code."
            exit 1
          fi
      - name: Check for undocumented flags
        run: |
          for flag in $(grep -rh "ENABLE_\|FEATURE_\|FLAG_" src/ | grep -oE "(ENABLE|FEATURE|FLAG)_[A-Z_]+" | sort | uniq); do
            if ! grep -q "$flag" docs/feature-flags.md; then
              echo "WARNING: Flag $flag is not documented in docs/feature-flags.md"
            fi
          done
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per flag pericolosi. Alert per flag vecchi. Alert per flag mai usati. E CI check per flag sospetti.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che esplodano.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE LO IGNORIAMO?!

**ME**: Allora... il CI fallisce. E il codice non entra.

**TL**: E SE LO BYPASSIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- CI check: attivo
- Flag: monitorati

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i CI check prevengono. E che Bob va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 10:00
**Autore**: Sconosciuto (migrazione luglio 2025)
**Servizio**: Payment Service
**Problema**: Feature flag pericoloso rimasto inattivo per 18 mesi
**Causa**: Flag non rimosso dopo migrazione completata
**Tempo in codice**: 18 mesi
**Rischio**: CRITICO - Se attivato, tutti i pagamenti fallivano
**Reazione UL**: "18 mesi?!"
**Reazione TL**: "Nessuno lo ricordava?!"
**Reazione CTO**: "Rimuovete tutti i flag vecchi."
**Soluzione**: Rimozione flag + audit + educazione + monitoraggio
**Lezione imparata**: I FEATURE FLAG VANNO RIMOSSI. SEMPRE.

**Regole per i feature flag**:
1. I feature flag sono DEBITO TECNICO. Vanno rimossi.
2. Rimuovi il flag entro 2-3 sprint dopo che la feature è stabile.
3. I flag per test NON vanno mai in produzione.
4. Nomi come "TEMP", "HACK", "SKIP", "DISABLE" sono VIETATI.
5. I flag che disabilitano la sicurezza sono FUORI QUESTIONE.
6. Documenta ogni flag: cosa fa, quando aggiunto, quando rimuovere, chi responsabile.
7. Fai audit regolari. E rimuovi i flag vecchi. Amen.

**Come documentare un feature flag**:
```markdown
## Feature Flags

### ENABLE_NEW_CHECKOUT
- **Descrizione**: Abilita il nuovo flusso di checkout
- **Aggiunto il**: 01/05/2026
- **Da rimuovere il**: 01/07/2026
- **Responsabile**: JN
- **Stato**: ATTIVO (feature in rollout)
- **Ticket**: PROJ-1234
```

**Come rimuovere un feature flag**:
```bash
# 1. Verifica che la feature è stabile
grep -r "ENABLE_NEW_CHECKOUT" src/

# 2. Rimuovi il flag dal codice
sed -i '/ENABLE_NEW_CHECKOUT/d' src/services/checkout.js

# 3. Rimuovi il codice morto
rm src/services/old-checkout.js

# 4. Aggiorna i test
npm test

# 5. Commit con riferimento
git commit -m "Rimuovi ENABLE_NEW_CHECKOUT (feature stabile)

Refs: PROJ-1234, INCIDENT-FLAG-001"
```

**Come configurare alert per flag**:
```yaml
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagOlderThan30Days
        expr: feature_flag_age_days > 30
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is old"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i flag vanno rimossi. E che il debito tecnico va pagato. E che Bob va educato. E che JN va educato. E che 47 flag erano troppi. E che 10 erano pericolosi. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come i post-it. Li attacchi per ricordarti di fare qualcosa. E poi dimentichi di farla. E il post-it resta lì. Per sempre. E un giorno qualcuno lo legge. E fa quello che c'è scritto. E il sistema si rompe. E tu ti chiedi: "Com'è possibile?" E la risposta è semplice: perché non hai rimosso il post-it. E il post-it diceva: "Attiva il gateway legacy." E il gateway legacy non esisteva più. E i pagamenti fallivano. E i clienti chiamavano. E UL chiamava. E tu rispondevi. E dicevi: "Era un feature flag." E UL diceva: "E CHE COS'È UN FEATURE FLAG?!" E tu dicevi: "Un interruttore per attivare funzionalità." E UL diceva: "E PERCHÉ ERA ANCORA LÌ?!" E tu dicevi: "Perché nessuno l'ha rimosso." E la verità è che tutti pensano che qualcun altro rimuoverà i flag. E nessuno lo fa. E i flag si accumulano. E un giorno esplodono. E impari. Impari che i flag vanno rimossi. E che il debito tecnico va pagato. E che la documentazione è essenziale. E che Bob va educato. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | Payment Service |
| Flag | ENABLE_LEGACY_PAYMENT_FLOW |
| Aggiunto il | 01/07/2025 |
| Scoperto il | 16/01/2027 |
| Tempo in codice | 18 mesi |
| Rischio | CRITICO |
| Gateway legacy | DISMANTLED |
| Se attivato | Tutti i pagamenti fallivano |
| Flag totali trovati | 47 |
| Flag pericolosi | 10 |
| Flag rimossi | 10 |
| Codice eliminato | 892 righe |
| Reazione UL | "18 mesi?!" |
| Reazione TL | "Nessuno lo ricordava?!" |
| Reazione CTO | "Rimuovete tutti i flag vecchi." |
| Soluzione | Audit + rimozione + educazione + monitoraggio |
| Lezione imparata | FLAG = DEBITO TECNICO |
| **Totale** | **47 flag auditati + 10 flag rimossi + 892 righe eliminate + 2 junior educati** |

**Morale**: I feature flag vanno rimossi. Sempre. Dopo che la feature è stabile. Dopo che è stata testata. Dopo che è in produzione da un po'. E se non li rimuovi, si accumulano. Come polvere sotto il tappeto. Come debito tecnico nel codice. Come promesse non mantenute. E un giorno, qualcuno li attiva per sbaglio. O li disattiva per errore. O li dimentica completamente. E il sistema si rompe. E tu ti chiedi: "Com'è possibile?" E la risposta è semplice: perché non hai rimosso il flag. E il flag controllava qualcosa di critico. E quel qualcosa era cambiato. E il flag no. E ora il flag è attivo. E il sistema è down. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un feature flag." E UL dice: "E PERCHÉ ERA ANCORA LÌ?!" E tu dici: "Perché nessuno l'ha rimosso." E UL dice: "E PERCHÉ NESSUNO L'HA RIMOSSO?!" E tu dici: "Perché tutti pensavano che qualcun altro l'avrebbe fatto." E la verità è che tutti pensano che qualcun altro farà il lavoro. E nessuno lo fa. E il lavoro si accumula. E un giorno esplode. E impari. Impari che i flag vanno rimossi. E che il debito va pagato. E che la responsabilità è di tutti. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-il-container-che-non-si-fermava-piu.md)**
