# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migration-che-ha-bloccato-tutto.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Dopo che la feature è stata rilasciata. E testata. E verificata. E quando il feature flag non viene rimosso, succede quello che deve succedere: qualcuno lo attiva per sbaglio. O lo disattiva per sbaglio. O lo dimentica. E il sistema si comporta in modo strano. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Non capisco, non abbiamo cambiato nulla." E invece qualcosa è cambiato. Il feature flag che nessuno ricordava. Che era lì da 18 mesi. E qualcuno l'ha toccato. E il sistema è impazzito. E tu ti chiedi: "Com'è possibile che un feature flag vecchio di 18 mesi fosse ancora attivo?" E la risposta è semplice: perché nessuno l'ha mai rimosso. E i feature flag sono come i debiti tecnici. Se non li paghi, si accumulano. E prima o poi ti presentano il conto. Amen.

![](../../img/server.jpg)

---

**Lunedì - L'Incidente**

Era lunedì. Le 10:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi. Altri prezzi nuovi. Altri prezzi che non esistono.

**ME**: Prezzi sbagliati?!

**TL**: Prezzi sbagliati?!

**ME**: Sì. I clienti vedono prezzi diversi per lo stesso prodotto.

**TL**: E QUANTI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=pricing-service --since=30m | grep -i price | tail -20
2027-01-16 09:45:12 INFO: Price calculated for product SKU-123: €99.99 (v2)
2027-01-16 09:45:13 INFO: Price calculated for product SKU-123: €149.99 (v1)
2027-01-16 09:45:14 INFO: Price calculated for product SKU-123: €99.99 (v2)
2027-01-16 09:45:15 INFO: Price calculated for product SKU-123: €199.99 (legacy)

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum by (version) (rate(pricing_calculations_total[5m]))'
{version: "v1"}: 234
{version: "v2"}: 189
{version: "legacy"}: 67

# Controlla database
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT price_version, COUNT(*) FROM products GROUP BY price_version"
price_version | count
---------------+-------
v1            | 1234
v2            | 567
legacy        | 89
```

**ME**: Ci sono tre versioni di prezzi. V1, V2, e legacy.

**TL**: TRE VERSIONI?!

**ME**: Sì. E i clienti vedono prezzi diversi a caso.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Controllo il codice.

**TERMINALE**:
```
# Cerca feature flag
grep -r "price" src/config/feature-flags.js
  USE_NEW_PRICING_V2: true,
  USE_LEGACY_PRICING: false,
  USE_PRICING_V1_FALLBACK: true,

# Controlla LaunchDarkly
curl -s "https://app.launchdarkly.com/api/v2/flags/default" -H "Authorization: $LD_API_KEY" | jq '.items[] | select(.key | contains("price"))'
{
  "key": "use-new-pricing-v2",
  "name": "Use New Pricing V2",
  "created": "2025-07-15T10:00:00Z",
  "modified": "2027-01-16T09:30:00Z",
  "on": true
}
{
  "key": "use-legacy-pricing",
  "name": "Use Legacy Pricing",
  "created": "2024-06-01T08:00:00Z",
  "modified": "2027-01-16T09:30:00Z",
  "on": true
}
{
  "key": "use-pricing-v1-fallback",
  "name": "Use Pricing V1 Fallback",
  "created": "2025-03-20T14:00:00Z",
  "modified": "2027-01-16T09:30:00Z",
  "on": true
}
```

**ME**: Ci sono tre feature flag per i prezzi. Tutti attivi.

**TL**: TUTTI ATTIVI?!

**ME**: Sì. E uno è stato creato 18 mesi fa.

**TL**: 18 MESI?!

**ME**: Sì. "use-legacy-pricing" è del giugno 2024.

**TL**: E PERCHÉ È ANCORA ATTIVO?!

**ME**: Non lo so. E qualcuno l'ha modificato stamattina alle 09:30.

**TL**: CHI?!

**ME**: Controllo l'audit log.

**TERMINALE**:
```
# Controlla audit log LaunchDarkly
curl -s "https://app.launchdarkly.com/api/v2/auditlog" -H "Authorization: $LD_API_KEY" | jq '.items[] | select(.target.name | contains("price")) | {date: .date, kind: .kind, member: .member.email}'

{
  "date": "2027-01-16T09:30:00Z",
  "kind": "flagUpdated",
  "member": "jn@company.com"
}
```

**ME**: JN ha modificato i feature flag stamattina alle 09:30.

**TL**: JN?!

**ME**: Sì. Ha attivato tutti e tre i flag.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 3 attivi
- Creati: 2024-2025
- Modificati: stamattina 09:30
- Autore: JN
- Risultato: prezzi a caso

E tutto era chiaro. JN aveva toccato feature flag vecchi. E il sistema era impazzito. Amen.

---

**Lunedì - 10:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era confuso.

**ME**: JN, hai modificato i feature flag stamattina?

**JN**: Sì. Volevo testare una cosa.

**ME**: TESTARE?!

**JN**: Sì. Volevo vedere come funzionavano i prezzi.

**ME**: E HAI ATTIVATO TUTTI E TRE I FLAG?!

**JN**: Sì. Per vedere quale aveva la precedenza.

**ME**: E IN PRODUZIONE?!

**JN**: Ah. Sì. Non c'era staging.

**ME**: JN, I FEATURE FLAG VANNO TESTATI IN STAGING!

**JN**: Ma non c'era il flag in staging!

**ME**: E QUINDI L'HAI FATTO IN PRODUZIONE?!

**JN**: Sì. Solo per un minuto.

**ME**: E I CLIENTI HANNO VISTO PREZZI SBAGLIATI!

**JN**: Ma... li ho rimessi come prima!

**ME**: E COME ERANO PRIMA?!

**JN**: Non lo so. Li ho attivati tutti.

**ME**: JN, I FLAG ERANO TUTTI DISATTIVI TRANNE V2!

**JN**: Ah. Non lo sapevo.

**ME**: E ORA SONO TUTTI ATTIVI!

**JN**: E QUINDI?!

**ME**: E QUINDI I CLIENTI VEDONO PREZZI A CASO!

**JN**: Ah. Fixo.

**ME**: E LA PROSSIMA VOLTA CHIEDI!

**JN**: Ok.

JN ha riattaccato. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Feature flag: tutti attivi
- Prezzi: a caso
- JN: confuso
- Clienti: incazzati

E la lezione era chiara. I feature flag vanno gestiti con cura. E JN va educato. Amen.

---

**Lunedì - 11:00**

Ho fixato i feature flag. E i prezzi.

**TERMINALE**:
```
# Disattiva flag legacy
curl -X PATCH "https://app.launchdarkly.com/api/v2/flags/default/use-legacy-pricing" \
  -H "Authorization: $LD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"on": false}'

# Disattiva flag v1 fallback
curl -X PATCH "https://app.launchdarkly.com/api/v2/flags/default/use-pricing-v1-fallback" \
  -H "Authorization: $LD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"on": false}'

# Verifica
curl -s "https://app.launchdarkly.com/api/v2/flags/default" -H "Authorization: $LD_API_KEY" | jq '.items[] | select(.key | contains("price")) | {key, on}'
{
  "key": "use-new-pricing-v2",
  "on": true
}
{
  "key": "use-legacy-pricing",
  "on": false
}
{
  "key": "use-pricing-v1-fallback",
  "on": false
}

# Controlla prezzi
kubectl logs -l app=pricing-service --since=5m | grep -i price | tail -10
2027-01-16 11:05:12 INFO: Price calculated for product SKU-123: €99.99 (v2)
2027-01-16 11:05:13 INFO: Price calculated for product SKU-456: €149.99 (v2)
2027-01-16 11:05:14 INFO: Price calculated for product SKU-789: €199.99 (v2)
```

**ME**: Feature flag fixati. Solo V2 attivo.

**TL**: E I PREZZI?!

**ME**: Tutti usano V2. Coerenti.

**TL**: E I CLIENTI?!

**ME**: Vedono i prezzi corretti.

**TL**: E JN?!

**ME**: JN... lo educo.

**TL**: E I FLAG VECCHI?!

**ME**: Li rimuovo. Tutti.

**TERMINALE**:
```
# Lista tutti i feature flag
curl -s "https://app.launchdarkly.com/api/v2/flags/default" -H "Authorization: $LD_API_KEY" | jq '.items[] | {key, name, created, on}'

# Risultati
{
  "key": "use-new-pricing-v2",
  "name": "Use New Pricing V2",
  "created": "2025-07-15T10:00:00Z",
  "on": true
}
{
  "key": "use-legacy-pricing",
  "name": "Use Legacy Pricing",
  "created": "2024-06-01T08:00:00Z",
  "on": false
}
{
  "key": "use-pricing-v1-fallback",
  "name": "Use Pricing V1 Fallback",
  "created": "2025-03-20T14:00:00Z",
  "on": false
}
{
  "key": "enable-dark-mode",
  "name": "Enable Dark Mode",
  "created": "2024-02-15T09:00:00Z",
  "on": true
}
{
  "key": "use-new-checkout-flow",
  "name": "Use New Checkout Flow",
  "created": "2024-09-10T11:00:00Z",
  "on": true
}
{
  "key": "enable-beta-features",
  "name": "Enable Beta Features",
  "created": "2023-11-20T14:00:00Z",
  "on": false
}
{
  "key": "use-legacy-auth",
  "name": "Use Legacy Auth",
  "created": "2023-08-01T08:00:00Z",
  "on": false
}
{
  "key": "enable-new-dashboard",
  "name": "Enable New Dashboard",
  "created": "2024-04-01T10:00:00Z",
  "on": true
}
{
  "key": "use-experimental-cache",
  "name": "Use Experimental Cache",
  "created": "2023-06-15T16:00:00Z",
  "on": false
}
{
  "key": "enable-logging-v2",
  "name": "Enable Logging V2",
  "created": "2024-01-10T09:00:00Z",
  "on": true
}
```

**ME**: Ci sono 10 feature flag. Alcuni vecchi di 3 anni.

**TL**: 3 ANNI?!

**ME**: Sì. "use-experimental-cache" è del giugno 2023.

**TL**: E È ANCORA LÌ?!

**ME**: Sì. Disattivato. Ma ancora nel codice.

**TL**: E QUANTI SONO ATTIVI?!

**ME**: 5. Gli altri 5 sono disattivati ma non rimossi.

**TL**: E QUINDI?!

**ME**: E quindi... sono debito tecnico. Che aspetta di esplodere.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag totali: 10
- Attivi: 5
- Disattivati: 5
- Più vecchio: giugno 2023
- Debito tecnico: alto

E la lezione era chiara. I feature flag vanno rimossi. E il debito tecnico si accumula. Amen.

---

**Lunedì - 14:00**

Ho auditato tutti i feature flag. Per capire cosa potevo rimuovere.

**TERMINALE**:
```
# Cerca riferimenti nel codice
for flag in $(curl -s "https://app.launchdarkly.com/api/v2/flags/default" -H "Authorization: $LD_API_KEY" | jq -r '.items[].key'); do
  echo "=== $flag ==="
  grep -r "$flag" src/ --include="*.js" --include="*.ts" | wc -l
done

# Risultati
=== use-new-pricing-v2 ===
45 riferimenti

=== use-legacy-pricing ===
12 riferimenti

=== use-pricing-v1-fallback ===
8 riferimenti

=== enable-dark-mode ===
23 riferimenti

=== use-new-checkout-flow ===
67 riferimenti

=== enable-beta-features ===
34 riferimenti

=== use-legacy-auth ===
3 riferimenti

=== enable-new-dashboard ===
89 riferimenti

=== use-experimental-cache ===
2 riferimenti

=== enable-logging-v2 ===
56 riferimenti
```

**ME**: Ci sono flag con pochi riferimenti. "use-legacy-auth" ha solo 3 riferimenti. "use-experimental-cache" ha solo 2.

**TL**: E SONO DISATTIVATI?!

**ME**: Sì. Da mesi. O anni.

**TL**: E POSSIAMO RIMUOVERLI?!

**ME**: Sì. Ma prima devo verificare che non servano.

**TL**: E COME?!

**ME**: Controllo quando sono stati usati l'ultima volta.

**TERMINALE**:
```
# Controlla utilizzo negli ultimi 30 giorni
for flag in "use-legacy-auth" "use-experimental-cache" "enable-beta-features"; do
  echo "=== $flag ==="
  curl -s "https://app.launchdarkly.com/api/v2/flags/default/$flag/metrics" -H "Authorization: $LD_API_KEY" | jq '.evaluations'
done

# Risultati
=== use-legacy-auth ===
{
  "evaluations": 0,
  "lastEvaluation": "2025-06-15T10:00:00Z"
}

=== use-experimental-cache ===
{
  "evaluations": 0,
  "lastEvaluation": "2024-12-01T14:00:00Z"
}

=== enable-beta-features ===
{
  "evaluations": 0,
  "lastEvaluation": "2025-09-20T09:00:00Z"
}
```

**ME**: Tre flag non sono stati usati da mesi.

**TL**: E QUINDI?!

**ME**: E quindi... li rimuovo.

**TERMINALE**:
```
# Rimuovi flag non utilizzati
curl -X DELETE "https://app.launchdarkly.com/api/v2/flags/default/use-legacy-auth" -H "Authorization: $LD_API_KEY"
curl -X DELETE "https://app.launchdarkly.com/api/v2/flags/default/use-experimental-cache" -H "Authorization: $LD_API_KEY"
curl -X DELETE "https://app.launchdarkly.com/api/v2/flags/default/enable-beta-features" -H "Authorization: $LD_API_KEY"

# Rimuovi codice morto
grep -rl "use-legacy-auth" src/ --include="*.js" --include="*.ts" | xargs sed -i '/use-legacy-auth/d'
grep -rl "use-experimental-cache" src/ --include="*.js" --include="*.ts" | xargs sed -i '/use-experimental-cache/d'
grep -rl "enable-beta-features" src/ --include="*.js" --include="*.ts" | xargs sed -i '/enable-beta-features/d'

# Commit
git add .
git commit -m "Rimuovi feature flag non utilizzati"
git push
```

**ME**: Tre flag rimossi. E il codice morto.

**TL**: E GLI ALTRI?!

**ME**: Gli altri servono. Ma li documento.

**TL**: E COME?!

**ME**: Aggiungo una data di scadenza. E un owner.

**TERMINALE**:
```
# Aggiungi metadata ai flag
for flag in "use-legacy-pricing" "use-pricing-v1-fallback"; do
  curl -X PATCH "https://app.launchdarkly.com/api/v2/flags/default/$flag" \
    -H "Authorization: $LD_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "description": "DEPRECATED: Remove after 2027-02-01. Owner: pricing-team@company.com",
      "tags": ["deprecated", "remove-by-2027-02-01"]
    }'
done
```

**ME**: Due flag marcati come deprecated. Con data di rimozione.

**TL**: E SE NON VENGONO RIMOSSI?!

**ME**: Allora... l'alert ci avvisa.

**TL**: QUALE ALERT?!

**ME**: Lo creo ora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 3
- Flag deprecati: 2
- Codice morto: rimosso
- Alert: da creare

E tutto era più pulito. Ma avevo imparato una lezione. La lezione che i feature flag vanno rimossi. E che il debito tecnico va pagato. Amen.

---

**Martedì - L'Alert**

Martedì. Ho creato l'alert per i feature flag vecchi.

**TERMINALE**:
```
# Crea alert per feature flag vecchi
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagOlderThan90Days
        expr: |
          feature_flag_age_days > 90
          and
          feature_flag_on == 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is older than 90 days and disabled"
          description: "Feature flag {{ $labels.flag }} was created {{ $value }} days ago and is disabled. Consider removing it."

      - alert: FeatureFlagUnusedFor30Days
        expr: |
          feature_flag_last_evaluation_days > 30
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} has not been evaluated for 30 days"
          description: "Feature flag {{ $labels.flag }} was last evaluated {{ $value }} days ago. Consider removing it."

      - alert: FeatureFlagDeprecatedPastDue
        expr: |
          feature_flag_deprecated == 1
          and
          feature_flag_removal_date < time()
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Deprecated feature flag {{ $labels.flag }} is past due for removal"
          description: "Feature flag {{ $labels.flag }} was marked for removal but is still present. Remove it now."
EOF

# Aggiungi metriche
cat > src/lib/feature-flag-metrics.js << 'EOF'
const prometheus = require('prom-client');
const LaunchDarkly = require('launchdarkly-node-server-sdk');

const ldClient = LaunchDarkly.init(process.env.LD_SDK_KEY);

const featureFlagAge = new prometheus.Gauge({
  name: 'feature_flag_age_days',
  help: 'Age of feature flag in days',
  labelNames: ['flag', 'owner'],
});

const featureFlagLastEvaluation = new prometheus.Gauge({
  name: 'feature_flag_last_evaluation_days',
  help: 'Days since last evaluation',
  labelNames: ['flag'],
});

const featureFlagOn = new prometheus.Gauge({
  name: 'feature_flag_on',
  help: 'Feature flag is on: 0=off, 1=on',
  labelNames: ['flag'],
});

const featureFlagDeprecated = new prometheus.Gauge({
  name: 'feature_flag_deprecated',
  help: 'Feature flag is deprecated: 0=no, 1=yes',
  labelNames: ['flag'],
});

async function collectFeatureFlagMetrics() {
  const flags = await ldClient.allFlagsState({ key: 'metrics' });
  const now = Date.now();

  for (const [flag, value] of Object.entries(flags)) {
    const metadata = await getFlagMetadata(flag);
    
    featureFlagAge.set({ flag, owner: metadata.owner || 'unknown' }, 
      (now - new Date(metadata.created).getTime()) / (1000 * 60 * 60 * 24));
    
    featureFlagOn.set({ flag }, value ? 1 : 0);
    
    featureFlagDeprecated.set({ flag }, metadata.deprecated ? 1 : 0);
  }
}

module.exports = { collectFeatureFlagMetrics };
EOF

# Configura cron job
cat > /etc/cron.d/feature-flag-metrics << 'EOF'
*/30 * * * * node /app/src/lib/feature-flag-metrics.js
EOF
```

**TL**: Hai creato l'alert?

**ME**: Sì. Alert per flag vecchi. Alert per flag non usati. Alert per flag deprecati scaduti.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando i feature flag diventano debito tecnico.

**TL**: E SE NON LI RIMUOVIAMO?!

**ME**: Allora... l'alert ci ricorda. Ogni giorno. Finché non lo facciamo.

**TL**: E SE LO IGNORIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Cron: ogni 30 minuti
- Feature flag: monitorati

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno monitorati. E che gli alert salvano. E che il debito tecnico va pagato. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i feature flag toccati sono stati un disastro. Ma sono anche stati un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i feature flag vanno testati in staging.

**JN**: Sempre?

**ME**: Sempre. Mai toccare un flag in produzione senza testarlo prima.

**JN**: E se non c'è staging?

**ME**: Allimenti lo crei. O chiedi. Ma non tocchi la produzione.

**JN**: Ok.

**ME**: Secondo: i feature flag vanno documentati.

**JN**: Documentati?

**ME**: Sì. Con owner. Con data di creazione. Con data di rimozione prevista.

**JN**: E se non so quando rimuoverlo?

**ME**: Allimenti metti una data stimata. E la aggiorni quando sai di più.

**JN**: Ok.

**ME**: Terzo: i feature flag vanno rimossi dopo il rilascio.

**JN**: Sempre?

**ME**: Sempre. Una feature è stata rilasciata? Il flag va rimosso. Entro 2 settimane.

**JN**: E se non posso?

**ME**: Allora lo marchi come deprecated. E lo rimuovi dopo.

**JN**: Ok.

**ME**: Quarto: non attivare flag a caso.

**JN**: Non l'ho fatto a caso!

**ME**: Hai attivato tre flag contemporaneamente. Per "vedere quale aveva la precedenza".

**JN**: Era un test!

**ME**: IN PRODUZIONE! SUI PREZZI!

**JN**: Ok. Ho capito.

**ME**: Quinto: chiedi prima di toccare un flag che non conosci.

**JN**: E se non c'è nessuno?

**ME**: Allimenti controlli la documentazione. E l'owner. E se non sai, non tocchi.

**JN**: E se devo toccarlo?

**ME**: Allimenti chiami l'owner. E chiedi. E se l'owner non c'è più, chiedi al TL.

**JN**: Ok.

**ME**: E la prossima volta, pensa. Prima di toccare un feature flag, pensa a cosa succede se è sbagliato.

**JN**: E se non so se è sbagliato?

**ME**: Allimenti chiedi. Sempre meglio chiedere che rompere.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Feature flag: documentati
- Alert: attivi
- Educazione: completata
- JN: più saggio

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E documentazione. E educazione. Amen.

---

**Giovedì - La Pulizia**

Giovedì. Ho pulito tutti i feature flag. E il codice morto.

**TERMINALE**:
```
# Lista flag rimanenti
curl -s "https://app.launchdarkly.com/api/v2/flags/default" -H "Authorization: $LD_API_KEY" | jq '.items[] | {key, created, on}'

# Risultati
{
  "key": "use-new-pricing-v2",
  "created": "2025-07-15T10:00:00Z",
  "on": true
}
{
  "key": "use-legacy-pricing",
  "created": "2024-06-01T08:00:00Z",
  "on": false,
  "deprecated": true,
  "removalDate": "2027-02-01"
}
{
  "key": "use-pricing-v1-fallback",
  "created": "2025-03-20T14:00:00Z",
  "on": false,
  "deprecated": true,
  "removalDate": "2027-02-01"
}
{
  "key": "enable-dark-mode",
  "created": "2024-02-15T09:00:00Z",
  "on": true
}
{
  "key": "use-new-checkout-flow",
  "created": "2024-09-10T11:00:00Z",
  "on": true
}
{
  "key": "enable-new-dashboard",
  "created": "2024-04-01T10:00:00Z",
  "on": true
}
{
  "key": "enable-logging-v2",
  "created": "2024-01-10T09:00:00Z",
  "on": true
}

# Aggiungi owner a tutti i flag
for flag in "use-new-pricing-v2" "enable-dark-mode" "use-new-checkout-flow" "enable-new-dashboard" "enable-logging-v2"; do
  curl -X PATCH "https://app.launchdarkly.com/api/v2/flags/default/$flag" \
    -H "Authorization: $LD_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"tags": ["owner:platform-team"]}'
done

# Crea documentazione
cat > docs/feature-flags.md << 'EOF'
# Feature Flags

## Flag Attivi

| Flag | Creato | Owner | Scopo |
|------|--------|-------|-------|
| use-new-pricing-v2 | 2025-07-15 | pricing-team | Nuovo sistema di prezzi |
| enable-dark-mode | 2024-02-15 | frontend-team | Tema scuro |
| use-new-checkout-flow | 2024-09-10 | checkout-team | Nuovo flusso checkout |
| enable-new-dashboard | 2024-04-01 | frontend-team | Nuova dashboard |
| enable-logging-v2 | 2024-01-10 | platform-team | Nuovo sistema di logging |

## Flag Deprecated (da rimuovere)

| Flag | Creato | Rimozione prevista | Note |
|------|--------|-------------------|------|
| use-legacy-pricing | 2024-06-01 | 2027-02-01 | Sistema prezzi legacy |
| use-pricing-v1-fallback | 2025-03-20 | 2027-02-01 | Fallback prezzi V1 |

## Regole

1. Ogni flag deve avere un owner
2. Ogni flag deve avere una data di rimozione prevista
3. I flag vanno rimossi entro 2 settimane dal rilascio
4. I flag disattivati da più di 30 giorni vanno rimossi
5. Mai toccare un flag in produzione senza testare in staging
EOF
```

**TL**: Hai documentato tutto?

**ME**: Sì. Ogni flag ha un owner. E una data di rimozione prevista.

**TL**: E I FLAG DEPRECATI?!

**ME**: Due flag deprecati. Da rimuovere entro febbraio.

**TL**: E CHI LI RIMUOVE?!

**ME**: Il pricing team. Ho creato un ticket.

**TL**: E SE NON LO FANNO?!

**ME**: Allora... l'alert ci avvisa. E li rimuoviamo noi.

**TL**: E JN?!

**ME**: JN... ha imparato. Spero.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: documentati
- Owner: assegnati
- Deprecated: 2
- Documentazione: completa

E tutto era in ordine. Ma avevo imparato una lezione. La lezione che i feature flag vanno gestiti. E documentati. E rimossi. E che JN va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FEATURE-FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 09:30
**Autore**: JN
**Servizio**: pricing-service
**Problema**: Feature flag attivati a caso in produzione
**Causa**: Test in produzione senza staging
**Feature flag toccati**: 3
**Feature flag totali**: 10
**Feature flag vecchi di >1 anno**: 4
**Feature flag mai usati**: 3
**Clienti affetti**: ~500
**Tempo di risoluzione**: 2 ore
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "Prezzi a caso?!"
**Reazione TL**: "18 mesi?!"
**Reazione CTO**: "I feature flag vanno rimossi."
**Soluzione**: Flag fixati + flag rimossi + documentazione + alert
**Lezione imparata**: I FEATURE FLAG VANNO RIMOSSI. SEMPRE.

**Regole per i feature flag**:
1. I feature flag VANNO testati in staging. MAI in produzione.
2. I feature flag VANNO documentati. Con owner e data di rimozione.
3. I feature flag VANNO rimossi dopo il rilascio. Entro 2 settimane.
4. I feature flag disattivati da >30 giorni VANNO rimossi.
5. I feature flag vecchi di >90 giorni VANNO auditati.
6. Non attivare flag a caso. Chiedi prima.
7. Non toccare flag che non conosci. Chiedi all'owner.
8. I feature flag sono debito tecnico. Se non li paghi, ti presentano il conto. Amen.

**Come gestire i feature flag**:
```bash
# Lista flag
curl -s "https://app.launchdarkly.com/api/v2/flags/default" -H "Authorization: $LD_API_KEY" | jq '.items[] | {key, created, on}'

# Aggiungi owner
curl -X PATCH "https://app.launchdarkly.com/api/v2/flags/default/FLAG_NAME" \
  -H "Authorization: $LD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["owner:TEAM-NAME"], "description": "Scopo del flag. Rimuovere entro YYYY-MM-DD"}'

# Rimuovi flag
curl -X DELETE "https://app.launchdarkly.com/api/v2/flags/default/FLAG_NAME" -H "Authorization: $LD_API_KEY"

# Cerca riferimenti nel codice
grep -r "FLAG_NAME" src/ --include="*.js" --include="*.ts"
```

**Come configurare alert per feature flag**:
```yaml
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagOlderThan90Days
        expr: feature_flag_age_days > 90 and feature_flag_on == 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is old and disabled"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag vanno rimossi. E che vanno documentati. E che vanno testati in staging. E che JN va educato. E che 18 mesi sono tanti per un flag. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come i prestiti. Se li prendi, devi restituirli. E se non li restituisci, si accumulano. E prima o poi ti presentano il conto. E il conto è che qualcuno li tocca per sbaglio. E il sistema impazzisce. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Non abbiamo cambiato nulla." E UL dice: "E ALLORA PERCHÉ I PREZZI SONO SBAGLIATI?!" E tu dici: "Non lo so." E poi scopri che JN ha toccato un flag vecchio di 18 mesi. E che quel flag controllava i prezzi. E che ora i clienti vedono prezzi a caso. E la verità è che i feature flag sono comodi. Ma sono anche pericolosi. E se non li gestisci, ti uccidono. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | pricing-service |
| Autore | JN |
| Data incident | 16/01/2027, 09:30 |
| Feature flag toccati | 3 |
| Feature flag totali | 10 |
| Feature flag vecchi >1 anno | 4 |
| Feature flag mai usati | 3 |
| Feature flag rimossi | 3 |
| Feature flag deprecati | 2 |
| Clienti affetti | ~500 |
| Tempo di risoluzione | 2 ore |
| Downtime | 0 (parziale) |
| Reazione UL | "Prezzi a caso?!" |
| Reazione TL | "18 mesi?!" |
| Reazione CTO | "Vanno rimossi." |
| Soluzione | Flag fixati + rimossi + documentati |
| Lezione imparata | FEATURE FLAG = RIMUOVERE DOPO RILASCIO |
| **Totale** | **3 flag rimossi + 2 deprecati + 1 junior educato + alert configurati** |

**Morale**: I feature flag vanno rimossi. Sempre. Dopo che la feature è stata rilasciata. E testata. E verificata. E se non li rimuovi, si accumulano. E diventano debito tecnico. E prima o poi qualcuno li tocca per sbaglio. E il sistema impazzisce. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Non abbiamo cambiato nulla." E invece qualcosa è cambiato. Il feature flag che nessuno ricordava. Che era lì da 18 mesi. E JN l'ha toccato. E i prezzi sono impazziti. E la verità è che i feature flag sono comodi. Ma sono anche pericolosi. E se non li gestisci, ti uccidono. E la prossima volta, rimuovi il flag. Dopo il rilascio. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migration-che-ha-bloccato-tutto.md)**
