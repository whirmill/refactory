# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-la-tabella-sbagliata.md)**

---

C'è una verità nei feature flag che tutti conoscono ma nessuno rispetta: un feature flag deve avere una data di scadenza. Sempre. Quando crei un feature flag, devi sapere quando lo rimuoverai. E se non lo sai, il feature flag resta. Per sempre. E dopo un anno, nessuno sa cosa fa. E dopo due anni, nessuno sa perché esiste. E dopo tre anni, qualcuno lo tocca. E il sistema crolla. E tu ti chiedi: "Com'è possibile che un feature flag del 2023 abbia ucciso la produzione?" E la risposta è semplice: perché nessuno lo ricordava. E nessuno lo ricordava perché non era documentato. E non era documentato perché JN l'aveva creato di venerdì sera. E se ne era dimenticato. E il feature flag è rimasto. Per tre anni. Ad aspettare. Come una mina. E quando qualcuno l'ha calpestata, è esplosa. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 10:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi, altri prezzi nuovi.

**ME**: Prezzi sbagliati?!

**TL**: Prezzi sbagliati?!

**ME**: Sì. Alcuni clienti vedono 49.99, altri 39.99.

**TL**: E QUAL È QUELLO GIUSTO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla prezzi nel database
kubectl exec -it postgres-0 -- psql -U products -c "SELECT id, name, price FROM products WHERE id = 'SKU-12345'"
id        | name           | price
----------+----------------+-------
SKU-12345 | Premium Widget | 39.99

# Controlla cache
kubectl exec -it redis-0 -- redis-cli GET "product:SKU-12345"
"{\"id\":\"SKU-12345\",\"name\":\"Premium Widget\",\"price\":39.99}"

# Controlla API response
curl -s https://api.company.com/products/SKU-12345 | jq '.price'
39.99

# Ma alcuni clienti vedono 49.99?!
curl -s -H "X-User-ID: user-12345" https://api.company.com/products/SKU-12345 | jq '.price'
49.99

# Con un altro utente
curl -s -H "X-User-ID: user-67890" https://api.company.com/products/SKU-12345 | jq '.price'
39.99
```

**ME**: Il prezzo cambia in base all'utente.

**TL**: IN BASE ALL'UTENTE?!

**ME**: Sì. Alcuni utenti vedono 49.99, altri 39.99.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Controllo il codice.

**TERMINALE**:
```
# Cerca logica prezzi
grep -r "price" src/services/product/ | grep -i "flag\|feature\|toggle"
src/services/product/pricing.js:  if (featureFlags.isEnabled('legacy-pricing-v2', userId)) {
src/services/product/pricing.js:    return legacyPrice;
src/services/product/pricing.js:  }
src/services/product/pricing.js:  return currentPrice;

# Controlla feature flag
curl -s http://feature-flags:8080/flags/legacy-pricing-v2 | jq '.'
{
  "name": "legacy-pricing-v2",
  "enabled": true,
  "created_at": "2023-04-15T18:30:00Z",
  "created_by": "jn",
  "description": null,
  "expires_at": null,
  "targeting": {
    "user_ids": ["user-12345", "user-23456", "user-34567"]
  }
}
```

**ME**: C'è un feature flag del 2023. Senza descrizione. Senza scadenza.

**TL**: DEL 2023?!

**ME**: Sì. Creato da JN. Tre anni fa.

**TL**: E COSA FA?!

**ME**: Non lo so. Non c'è descrizione.

**TL**: E PERCHÉ È ANCORA ATTIVO?!

**ME**: Non ha scadenza. E nessuno l'ha mai disattivato.

**TL**: E JN LO SA?!

**ME**: JN... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: legacy-pricing-v2
- Creato: 2023-04-15
- Autore: JN
- Descrizione: nulla
- Scadenza: mai
- Utenti affetti: 3

E tutto era chiaro. Un feature flag orfano. Senza documentazione. Senza scadenza. Che cambiava i prezzi. Per tre utenti. Da tre anni. Amen.

---

**Lunedì - 10:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era calmo. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai creato un feature flag chiamato "legacy-pricing-v2" nel 2023?

**JN**: Nel 2023? Non ricordo.

**ME**: Il 15 aprile 2023. Alle 18:30.

**JN**: Ah! Sì! Per la migrazione dei prezzi!

**ME**: Quale migrazione?

**JN**: Quella del 2023. Quando abbiamo cambiato i prezzi.

**ME**: E COME DOVEVA FUNZIONARE?!

**JN**: Il flag serviva per il rollout graduale. Prima per alcuni utenti, poi per tutti.

**ME**: E POI?!

**JN**: Poi... dovevamo rimuoverlo.

**ME**: E L'HAI FATTO?!

**JN**: No. Me ne sono dimenticato.

**ME**: PER TRE ANNI?!

**JN**: Sì. Ma... funzionava!

**ME**: FUNZIONAVA?! I CLIENTI VEDONO PREZZI SBAGLIATI!

**JN**: Sbagliati?

**ME**: Sì. 49.99 invece di 39.99.

**JN**: Ah. Sì. Quello era il prezzo vecchio.

**ME**: E PERCHÉ È ANCORA ATTIVO?!

**JN**: Non lo so. Me ne sono dimenticato.

**ME**: E QUANTI UTENTI SONO AFFETTI?!

**JN**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla targeting
curl -s http://feature-flags:8080/flags/legacy-pricing-v2/targeting | jq '.user_ids | length'
3

# Ma aspetta... controlla la percentuale
curl -s http://feature-flags:8080/flags/legacy-pricing-v2 | jq '.targeting'
{
  "user_ids": ["user-12345", "user-23456", "user-34567"],
  "percentage": 0
}

# Solo 3 utenti. Ma perché vedono prezzi vecchi?
```

**ME**: Solo 3 utenti hanno il flag. Ma vedono prezzi vecchi.

**JN**: Sì. Quelli erano i tester.

**ME**: TESTER?! SONO CLIENTI VERI!

**JN**: Cosa?!

**ME**: I tre user ID sono clienti veri. Non tester.

**JN**: Ah. Allora... forse abbiamo un problema.

**ME**: FORSE?!

**JN**: Sì. Dovremmo disattivare il flag.

**ME**: E LO FAI ORA?!

**JN**: Sì. Subito.

JN ha disattivato il flag. E i tre clienti hanno visto i prezzi giusti. Ma la domanda rimaneva: quanti altri feature flag orfani c'erano? E cosa facevano? E chi li aveva creati? E perché nessuno li ricordava? Amen.

---

**Lunedì - 11:00**

Ho auditato tutti i feature flag. Per trovare le mine nascoste.

**TERMINALE**:
```
# Lista tutti i feature flag
curl -s http://feature-flags:8080/flags | jq '.[] | {name, created_at, created_by, description, expires_at}'

# Risultati
{
  "name": "legacy-pricing-v2",
  "created_at": "2023-04-15T18:30:00Z",
  "created_by": "jn",
  "description": null,
  "expires_at": null
}
{
  "name": "new-checkout-flow",
  "created_at": "2024-02-20T14:00:00Z",
  "created_by": "bob",
  "description": "New checkout flow - REMOVE AFTER MIGRATION",
  "expires_at": null
}
{
  "name": "dark-mode-beta",
  "created_at": "2024-06-10T09:00:00Z",
  "created_by": "jn",
  "description": "Dark mode for beta users",
  "expires_at": null
}
{
  "name": "api-rate-limit-v2",
  "created_at": "2023-11-05T16:45:00Z",
  "created_by": "me",
  "description": null,
  "expires_at": null
}
{
  "name": "payment-gateway-migration",
  "created_at": "2022-08-01T10:00:00Z",
  "created_by": "bob",
  "description": "Payment gateway migration - DO NOT DISABLE",
  "expires_at": null
}
{
  "name": "experimental-cache",
  "created_at": "2023-01-15T11:30:00Z",
  "created_by": "jn",
  "description": "Testing new cache layer",
  "expires_at": null
}
{
  "name": "search-algorithm-v3",
  "created_at": "2024-09-01T08:00:00Z",
  "created_by": "tl",
  "description": "New search algorithm",
  "expires_at": null
}
{
  "name": "temp-discount-override",
  "created_at": "2023-12-20T23:59:00Z",
  "created_by": "jn",
  "description": "Temporary discount for holiday sale",
  "expires_at": null
}

# Conta flag senza scadenza
curl -s http://feature-flags:8080/flags | jq '[.[] | select(.expires_at == null)] | length'
8

# Conta flag senza descrizione
curl -s http://feature-flags:8080/flags | jq '[.[] | select(.description == null)] | length'
3

# Conta flag più vecchi di 1 anno
curl -s http://feature-flags:8080/flags | jq '[.[] | select(.created_at < "2026-01-16")] | length'
6
```

**ME**: 8 feature flag. Tutti senza scadenza. 6 più vecchi di un anno.

**TL**: 8 FEATURE FLAG?!

**ME**: Sì. E alcuni sono pericolosi.

**TL**: QUALI?!

**ME**: "temp-discount-override". Creato per il holiday sale del 2023. Ancora attivo.

**TL**: ANCORA ATTIVO?!

**ME**: Sì. E dà sconti del 50%.

**TL**: 50%?!

**ME**: Sì. A tutti gli utenti.

**TL**: A TUTTI?!

**ME**: Sì. Perché qualcuno ha cambiato il targeting da "beta" a "all".

**TL**: E QUANTO CI COSTA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla sconti applicati
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT SUM(discount) FROM orders WHERE created_at > '2023-12-20' AND discount_code = 'HOLIDAY-2023'"
sum
--------
€234,567.89

# Controlla ordini con sconto
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2023-12-20' AND discount_code = 'HOLIDAY-2023'"
count
-------
45678

# Controlla quando è stato cambiato il targeting
curl -s http://feature-flags:8080/flags/temp-discount-override/history | jq '.[] | select(.action == "update") | {timestamp, changes}'
{
  "timestamp": "2024-01-15T10:00:00Z",
  "changes": {"targeting": {"from": "beta", "to": "all"}}
}
```

**ME**: Il flag è stato cambiato da "beta" a "all" nel gennaio 2024. E da allora, 45.678 ordini hanno avuto lo sconto del 50%.

**TL**: 45.678 ORDINI?!

**ME**: Sì. Per un totale di 234.567 euro di sconti.

**TL**: 234.000 EURO DI SCONTI?!

**ME**: Sì. Non previsti.

**TL**: E PERCHÉ NESSUNO L'HA NOTATO?!

**ME**: Perché lo sconto era nel feature flag. Non nel database. E il feature flag non era monitorato.

**TL**: E ORA?!

**ME**: Ora... disabilito il flag. E chiamo UL.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag orfani: 8
- Flag pericolosi: 2
- Sconti non previsti: €234,567.89
- Ordini affetti: 45,678
- JN: responsabile

E tutto era chiaro. I feature flag orfani costano. E costano caro. E nessuno li controlla. Amen.

---

**Lunedì - 11:30**

Ho disabilitato i flag pericolosi. E chiamato UL.

**TERMINALE**:
```
# Disabilita flag pericolosi
curl -X DELETE http://feature-flags:8080/flags/temp-discount-override
curl -X DELETE http://feature-flags:8080/flags/legacy-pricing-v2

# Verifica
curl -s http://feature-flags:8080/flags | jq '.[] | select(.name | contains("temp") or contains("legacy"))'
[]
```

**ME**: Flag disabilitati. I prezzi sono corretti. Gli sconti sono fermati.

**TL**: E I 234.000 EURO?!

**ME**: Quelli... persi.

**TL**: E UL?!

**ME**: UL... lo chiamo ora.

Ho chiamato UL. UL ha risposto. Era lunedì. UL era di buon umore. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo un problema con i feature flag.

**UL**: Che problema?

**ME**: JN ha creato dei feature flag temporanei. E se ne è dimenticato.

**UL**: E?!

**ME**: E sono rimasti attivi per anni. E hanno dato sconti del 50% a tutti.

**UL**: SCONTI DEL 50%?!

**ME**: Sì. Dal gennaio 2024.

**UL**: E QUANTO?!

**ME**: 234.000 euro di sconti. Non previsti.

**UL**: 234.000 EURO?!

**ME**: Sì. E c'era anche un flag che cambiava i prezzi.

**UL**: E QUANTO È COSTATO?!

**ME**: Quello era solo 3 utenti. Ma il problema è che non sapevamo che esistesse.

**UL**: E QUANTI FEATURE FLAG CI SONO?!

**ME**: 8. Tutti senza scadenza. 6 più vecchi di un anno.

**UL**: E CHI LI HA CREATI?!

**ME**: JN. Bob. E... io.

**UL**: TU?!

**ME**: Sì. Tre anni fa. Per il rate limiting.

**UL**: E È ANCORA ATTIVO?!

**ME**: Sì. Ma quello è innocuo.

**UL**: E GLI ALTRI?!

**ME**: Li sto auditando. E documentando. E aggiungendo scadenze.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho disabilitato i flag pericolosi.

**UL**: Bene. Documenta tutto. E metti i controlli.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I feature flag vanno gestiti. E le scadenze sono obbligatorie. E JN va educato. Amen.

---

**Martedì - L'Audit Completo**

Martedì. Ho auditato tutti i flag. E documentato tutto.

**TERMINALE**:
```
# Audit completo
cat > docs/feature-flags-audit.md << 'EOF'
## Feature Flags Audit - Gennaio 2027

### Flag Attivi

| Nome | Creato | Autore | Descrizione | Scadenza | Stato |
|------|--------|--------|-------------|----------|-------|
| new-checkout-flow | 2024-02-20 | bob | New checkout flow | ❌ | ⚠️ Verificare |
| dark-mode-beta | 2024-06-10 | jn | Dark mode for beta | ❌ | ⚠️ Verificare |
| api-rate-limit-v2 | 2023-11-05 | me | Rate limiting | ❌ | ✅ Attivo |
| payment-gateway-migration | 2022-08-01 | bob | Payment migration | ❌ | ⚠️ CRITICO |
| experimental-cache | 2023-01-15 | jn | Cache layer | ❌ | ⚠️ Verificare |
| search-algorithm-v3 | 2024-09-01 | tl | Search algorithm | ❌ | ⚠️ Verificare |

### Flag Disabilitati

| Nome | Creato | Disabilitato | Motivo |
|------|--------|--------------|--------|
| legacy-pricing-v2 | 2023-04-15 | 2027-01-16 | Prezzi sbagliati |
| temp-discount-override | 2023-12-20 | 2027-01-16 | Sconti non previsti |

### Raccomandazioni

1. Aggiungere scadenza a tutti i flag
2. Documentare tutti i flag
3. Monitorare l'uso dei flag
4. Alert per flag senza scadenza
5. Review trimestrale dei flag
EOF

# Aggiungi scadenze
curl -X PATCH http://feature-flags:8080/flags/new-checkout-flow -d '{"expires_at": "2027-03-01"}'
curl -X PATCH http://feature-flags:8080/flags/dark-mode-beta -d '{"expires_at": "2027-02-01"}'
curl -X PATCH http://feature-flags:8080/flags/api-rate-limit-v2 -d '{"expires_at": "2027-12-01"}'
curl -X PATCH http://feature-flags:8080/flags/experimental-cache -d '{"expires_at": "2027-02-01"}'
curl -X PATCH http://feature-flags:8080/flags/search-algorithm-v3 -d '{"expires_at": "2027-06-01"}'

# Il payment-gateway-migration è critico - non toccare senza verifica
```

**ME**: Audit completato. Scadenze aggiunte. Flag documentati.

**TL**: E IL PAYMENT GATEWAY?!

**ME**: Quello è critico. "DO NOT DISABLE". Lo verifico con Bob.

**TL**: E BOB?!

**ME**: Bob... non c'è più. Ma il flag dice di non toccarlo.

**TL**: E QUINDI?!

**ME**: E quindi... lo lascio. Ma lo documento. E lo monitoro.

**TL**: E SE È ORFANO ANCHE QUELLO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag auditati: 8
- Flag disabilitati: 2
- Flag con scadenza: 6
- Flag critici: 1
- JN: da educare

E tutto era documentato. Ma la lezione era chiara. I feature flag orfani sono pericolosi. E vanno gestiti. E le scadenze sono obbligatorie. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i feature flag orfani sono stati un disastro. Ma sono anche stati un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: ogni feature flag deve avere una scadenza.

**JN**: Sempre?

**ME**: Sempre. Quando crei un flag, decidi quando muore. E se non lo sai, metti 30 giorni.

**JN**: Ok.

**ME**: Secondo: ogni feature flag deve avere una descrizione.

**JN**: Sempre?

**ME**: Sempre. Cosa fa. Perché esiste. Chi lo usa. Quando va rimosso.

**JN**: Ok.

**ME**: Terzo: i feature flag temporanei sono temporanei.

**JN**: Cioè?

**ME**: Cioè: "temp", "experimental", "beta", "migration" = devono morire. E in fretta.

**JN**: E se non muoiono?

**ME**: Allora qualcuno li disabilita. O li auditano. E scoprono che hai dato sconti del 50% per due anni.

**JN**: (imbarazzato) Scusa.

**ME**: Quarto: documenta il rollback.

**JN**: Il rollback?

**ME**: Sì. Cosa succede se disabiliti il flag. E come tornare indietro.

**JN**: E se non c'è rollback?

**ME**: Allora il flag è permanente. E non è un feature flag. È una configurazione.

**JN**: Ok.

**ME**: Quinto: monitora i feature flag.

**JN**: Monitora?

**ME**: Sì. Chi li usa. Quanto. E se qualcuno li cambia.

**JN**: E come?

**ME**: Con alert. E audit. E review trimestrali.

**JN**: E se non ho tempo?

**ME**: Allimenti trovi il tempo. Perché la prossima volta, i 234.000 euro di sconti li paghi tu.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Feature flag: documentati
- Scadenze: aggiunte
- Alert: configurati
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere processi. E scadenze. E documentazione. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i feature flag orfani.

**TERMINALE**:
```
# Configura alert per feature flag
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagWithoutExpiration
        expr: feature_flag_expires_at == 0
        for: 24h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} has no expiration"
          description: "Feature flag {{ $labels.name }} created by {{ $labels.created_by }} on {{ $labels.created_at }} has no expiration date."

      - alert: FeatureFlagOlderThan90Days
        expr: (time() - feature_flag_created_at) > 7776000
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is older than 90 days"
          description: "Feature flag {{ $labels.name }} has been active for more than 90 days. Review and remove if no longer needed."

      - alert: FeatureFlagOlderThan1Year
        expr: (time() - feature_flag_created_at) > 31536000
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Feature flag {{ $labels.name }} is older than 1 year"
          description: "Feature flag {{ $labels.name }} has been active for more than 1 year. This is likely orphaned and should be reviewed immediately."

      - alert: FeatureFlagWithoutDescription
        expr: feature_flag_description == 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} has no description"
          description: "Feature flag {{ $labels.name }} has no description. Add documentation."

      - alert: FeatureFlagExpiringSoon
        expr: (feature_flag_expires_at - time()) < 86400 AND feature_flag_expires_at > 0
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} expires in less than 24 hours"
          description: "Feature flag {{ $labels.name }} expires at {{ $labels.expires_at }}. Review and extend if needed."
EOF

# Aggiungi metriche
cat > src/lib/feature-flag-metrics.js << 'EOF'
const prometheus = require('prom-client');

const featureFlagEnabled = new prometheus.Gauge({
  name: 'feature_flag_enabled',
  help: 'Feature flag enabled status',
  labelNames: ['name', 'created_by'],
});

const featureFlagCreatedAt = new prometheus.Gauge({
  name: 'feature_flag_created_at',
  help: 'Feature flag creation timestamp',
  labelNames: ['name', 'created_by'],
});

const featureFlagExpiresAt = new prometheus.Gauge({
  name: 'feature_flag_expires_at',
  help: 'Feature flag expiration timestamp (0 = no expiration)',
  labelNames: ['name', 'created_by'],
});

const featureFlagDescription = new prometheus.Gauge({
  name: 'feature_flag_description',
  help: 'Feature flag has description (0 = no, 1 = yes)',
  labelNames: ['name', 'created_by'],
});

module.exports = { featureFlagEnabled, featureFlagCreatedAt, featureFlagExpiresAt, featureFlagDescription };
EOF

# Configura review trimestrale
cat > .github/workflows/feature-flag-review.yml << 'EOF'
name: Feature Flag Review
on:
  schedule:
    - cron: '0 9 1 */3 *'  # Every 3 months
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Get feature flags
        run: |
          curl -s http://feature-flags:8080/flags > flags.json
          echo "## Feature Flags Review" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          jq -r '.[] | "- **\(.name)**: created \(.created_at) by \(.created_by), expires: \(.expires_at // "never")"' flags.json >> $GITHUB_STEP_SUMMARY
      - name: Create issue for orphaned flags
        run: |
          orphaned=$(jq '[.[] | select(.expires_at == null and .created_at < "2026-01-01")] | length' flags.json)
          if [ "$orphaned" -gt 0 ]; then
            echo "::warning::$orphaned feature flags have no expiration and are older than 1 year"
          fi
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per flag senza scadenza. Alert per flag vecchi. Alert per flag senza descrizione. E review trimestrale.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i flag orfani prima che uccidano il sistema.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Review: trimestrale
- Flag: documentati

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno gestiti. E che le scadenze sono obbligatorie. E che il monitoraggio salva. E che JN va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 10:00
**Autore**: JN
**Servizio**: Product Service
**Problema**: Feature flag orfano cambiava i prezzi
**Causa**: Feature flag temporaneo mai disabilitato
**Tempo in produzione**: 3 anni e 9 mesi
**Clienti affetti**: 3 (prezzi) + 45,678 (sconti)
**Sconti non previsti**: €234,567.89
**Reazione UL**: "234.000 euro?!"
**Reazione TL**: "Feature flag orfani?!"
**Reazione CTO**: "Scadenze obbligatorie. Monitoraggio. Review trimestrale."
**Soluzione**: Disabilitazione flag + audit + scadenze + monitoraggio
**Lezione imparata**: I FEATURE FLAG DEVONO AVERE UNA SCADENZA. SEMPRE.

**Regole per i feature flag**:
1. OGNI feature flag DEVE avere una scadenza.
2. OGNI feature flag DEVE avere una descrizione.
3. I flag temporanei ("temp", "beta", "migration") DEVONO morire in fretta.
4. Documenta cosa fa il flag. E cosa succede se lo disabiliti.
5. Monitora i feature flag. Con alert. E review trimestrali.
6. Se un flag è permanente, non è un feature flag. È una configurazione.
7. I feature flag orfani costano. E costano caro. Amen.

**Come creare un feature flag correttamente**:
```bash
# Crea flag con scadenza
curl -X POST http://feature-flags:8080/flags \
  -d '{
    "name": "new-feature-x",
    "description": "Enable new feature X for beta users. Remove after 2027-02-01.",
    "created_by": "jn",
    "expires_at": "2027-02-01T00:00:00Z",
    "targeting": {
      "percentage": 10
    }
  }'
```

**Come auditare i feature flag**:
```bash
# Lista flag senza scadenza
curl -s http://feature-flags:8080/flags | jq '.[] | select(.expires_at == null)'

# Lista flag più vecchi di 1 anno
curl -s http://feature-flags:8080/flags | jq '.[] | select(.created_at < "2026-01-01")'

# Lista flag senza descrizione
curl -s http://feature-flags:8080/flags | jq '.[] | select(.description == null)'
```

**Come configurare alert**:
```yaml
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagWithoutExpiration
        expr: feature_flag_expires_at == 0
        for: 24h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag has no expiration"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag devono avere una scadenza. E una descrizione. E un monitoraggio. E che JN va educato. E che 234.000 euro di sconti sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come i debiti tecnici. Se non li paghi, si accumulano. E se si accumulano, esplodono. E quando esplodono, i clienti vedono prezzi sbagliati. E sconti non previsti. E UL chiama. E tu rispondi. E dici: "Il feature flag era del 2023." E UL dice: "E PERCHÉ ERA ANCORA ATTIVO?!" E tu dici: "Perché nessuno l'aveva disabilitato." E UL dice: "E PERCHÉ NESSUNO L'AVEVA DISABILITATO?!" E tu dici: "Perché non aveva scadenza." E UL dice: "E PERCHÉ NON AVEVA SCADENZA?!" E tu dici: "Perché JN se ne era dimenticato." E la verità è che tutti dimenticano. I junior dimenticano. I senior dimenticano. Tutti dimenticano. E l'unico modo per non far crollare il sistema è avere scadenze. E alert. E review. E documentazione. E educazione. Amen.

---

## Il costo del feature flag che nessuno ricordava

| Voce | Valore |
|------|--------|
| Servizio | Product Service |
| Autore | JN |
| Data creazione | 15/04/2023, 18:30 |
| Data discovery | 16/01/2027, 10:00 |
| Tempo in produzione | 3 anni e 9 mesi |
| Flag orfani trovati | 8 |
| Flag pericolosi | 2 |
| Clienti con prezzi sbagliati | 3 |
| Ordini con sconti non previsti | 45,678 |
| Sconti non previsti | €234,567.89 |
| Reazione UL | "234.000 euro?!" |
| Reazione TL | "Feature flag orfani?!" |
| Reazione CTO | "Scadenze obbligatorie." |
| Soluzione | Disabilitazione + audit + scadenze + monitoraggio |
| Lezione imparata | FEATURE FLAG = SCADENZA OBBLIGATORIA |
| **Totale** | **€234,567.89 di sconti + 8 flag auditati + 1 junior educato** |

**Morale**: I feature flag devono avere una scadenza. Sempre. Quando crei un flag, decidi quando muore. E se non lo sai, metti 30 giorni. E se dopo 30 giorni è ancora utile, estendi. Ma non lasciarlo senza scadenza. Perché i feature flag senza scadenza diventano orfani. E gli orfani dimenticati diventano mine. E le mine esplodono. E quando esplodono, i clienti vedono prezzi sbagliati. E sconti non previsti. E UL chiama. E tu rispondi. E dici: "Il feature flag era del 2023." E UL dice: "E PERCHÉ ERA ANCORA ATTIVO?!" E tu dici: "Perché non aveva scadenza." E UL dice: "E QUANTO È COSTATO?!" E tu dici: "234.000 euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che i feature flag orfani costano. Sempre. E la prossima volta, metti una scadenza. E una descrizione. E un alert. E una review. E tutto funziona. O quasi. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migrazione-che-ha-cancellato-la-tabella-sbagliata.md)**
