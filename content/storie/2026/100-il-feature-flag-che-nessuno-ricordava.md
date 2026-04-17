# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-il-migration-che-ha-cancellato-tutto.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Quando la feature è stabile, il flag va via. Quando il test è finito, il flag va via. Quando nessuno ricorda perché il flag esiste, il flag va via. E invece. Invece i feature flag si accumulano. E si moltiplicano. E si dimenticano. E un giorno, qualcuno li tocca. E tutto si rompe. E tu ti chiedi: "Com'è possibile che un flag del 2024 stesse ancora lì?" E la risposta è semplice: perché nessuno l'ha mai rimosso. E quel flag controllava qualcosa di importante. E quel qualcosa era il throttling delle API. E il throttling era disabilitato. Da due anni. E nessuno lo sapeva. E quando qualcuno ha abilitato il flag "per sbaglio", il throttling è tornato. E le API hanno smesso di funzionare. E i clienti hanno chiamato. E UL ha chiamato. E tu hai risposto. E hai detto: "Il feature flag era lì da due anni." E UL ha detto: "E PERCHÉ ERA LÌ DA DUE ANNI?!" E tu hai detto: "Perché nessuno l'ha rimosso." E UL ha detto: "E PERCHÉ NESSUNO L'HA RIMOSSO?!" E la verità è che tutti dimenticano i feature flag. E i feature flag non dimenticano. Loro restano. E aspettano. E quando li tocchi, ti mordono. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 10:00. JN stava pulendo il codice.

**JN**: Ho trovato un feature flag strano!

**ME**: Strano come?

**JN**: Si chiama `ENABLE_API_THROTTLING`. Ed è settato a `false`.

**ME**: Throttling disabilitato?

**JN**: Sì. E il commento dice "temporaneo per il Black Friday 2024".

**ME**: 2024?!

**JN**: Sì. Due anni fa.

**ME**: E È ANCORA LÌ?!

**JN**: Sì. E non so se posso rimuoverlo.

**ME**: E QUINDI?!

**JN**: Quindi... lo abilito per vedere cosa succede?

**ME**: NO! NON TOCCARE NULLA!

**JN**: Troppo tardi. Ho già fatto il deploy.

**ME**: COSA?!

**JN**: Ho pensato che fosse un bug...

**ME**: JN, I FEATURE FLAG NON SI TOCCANO SENZA SAPERE COSA FANNO!

**JN**: Ma era disabilitato da due anni!

**ME**: E FORSE C'ERA UN MOTIVO!

**TERMINALE**:
```
# Controlla stato API
kubectl logs -l app=api-gateway --since=5m | grep -i throttling | tail -20
2027-01-16 10:05:01 INFO: API Throttling enabled - limit: 100 req/min
2027-01-16 10:05:01 INFO: Client api-client-123 blocked: rate limit exceeded
2027-01-16 10:05:02 INFO: Client api-client-456 blocked: rate limit exceeded
2027-01-16 10:05:03 INFO: Client api-client-789 blocked: rate limit exceeded
...

# Conta richieste bloccate
kubectl logs -l app=api-gateway --since=5m | grep -i "blocked" | wc -l
847

# Controlla errori
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total{status="429"}[5m]))'
{status: "success", data: {result: [{value: ["234"]}]}}  # 234 errori 429 al secondo
```

**ME**: 847 client bloccati. 234 errori 429 al secondo.

**TL**: ERRORI 429?!

**ME**: Sì. Rate limiting attivo. E i client sono bloccati.

**TL**: E PERCHÉ?!

**ME**: JN ha abilitato un feature flag che era disabilitato da due anni.

**TL**: DUE ANNI?!

**ME**: Sì. Era per il Black Friday 2024. E nessuno l'ha mai rimosso.

**TL**: E COSA FA?!

**ME**: Abilita il throttling. A 100 richieste al minuto.

**TL**: E I NOSTRI CLIENTI?!

**ME**: Fanno più di 100 richieste al minuto. E sono bloccati.

**TL**: E QUINDI?!

**ME**: E quindi... disabilitiamo il flag. O alziamo il limite.

**TL**: E QUANTO CI VUOLE?!

**ME**: 30 secondi. Ma dobbiamo capire perché era disabilitato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Throttling: abilitato
- Client bloccati: 847
- Errori 429: 234/s
- JN: responsabile

E tutto era chiaro. Il feature flag era lì da due anni. E JN l'aveva toccato. E tutto si era rotto. Amen.

---

**Lunedì - 10:15**

Ho disabilitato il flag. E il throttling è tornato normale.

**TERMINALE**:
```
# Disabilita throttling
kubectl set env deployment/api-gateway ENABLE_API_THROTTLING=false

# Verifica
kubectl logs -l app=api-gateway --since=2m | grep -i throttling
2027-01-16 10:17:01 INFO: API Throttling disabled

# Controlla errori
kubectl logs -l app=api-gateway --since=2m | grep -i "blocked" | wc -l
0

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total{status="429"}[5m]))'
{status: "success", data: {result: [{value: ["0"]}]}}  # Zero errori 429
```

**ME**: Throttling disabilitato. Zero errori.

**TL**: E I CLIENTI?!

**ME**: Possono chiamare le API di nuovo.

**TL**: E PERCHÉ ERA DISABILITATO?!

**ME**: Controllo la storia.

**TERMINALE**:
```
# Cerca nel git blame
git log --all --oneline --grep="ENABLE_API_THROTTLING" | head -20
a1b2c3d4 Black Friday 2024: disable throttling for traffic spike
e5f6g7h8 Add API throttling feature flag

# Leggi commit
git show a1b2c3d4
Author: Bob <bob@company.com>
Date:   Thu Nov 28 2024 08:00:00

    Black Friday 2024: disable throttling for traffic spike
    
    Temporarily disable API throttling to handle Black Friday traffic.
    TODO: Re-enable after the event.

# Cerca commit di re-enable
git log --all --oneline --grep="re-enable" --grep="throttling" --all-match
# Nessun risultato

# Cerca ticket
jira search "throttling" --status done
# Nessun ticket chiuso
```

**ME**: Bob l'ha disabilitato per il Black Friday 2024. Con un TODO per riattivarlo.

**TL**: E BOB?!

**ME**: Bob non c'è più. Se n'è andato sei mesi fa.

**TL**: E NESSUNO L'HA RIATTIVATO?!

**ME**: No. E nessuno l'ha rimosso.

**TL**: E PER DUE ANNI?!

**ME**: Per due anni. E le API non avevano throttling.

**TL**: E NESSUNO L'HA NOTATO?!

**ME**: No. Perché funzionava tutto. Anzi, funzionava meglio. Senza throttling.

**TL**: E QUINDI?!

**ME**: E quindi... il throttling non serviva. O il limite era troppo basso.

**TL**: E ORA?!

**ME**: Ora lo rimuoviamo. E documentiamo perché.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag: disabilitato
- Autore: Bob (ex dipendente)
- Data: Novembre 2024
- TODO: ignorato
- Risultato: 2 anni senza throttling

E la lezione era chiara. I feature flag vanno rimossi. E i TODO vanno rispettati. E Bob se n'è andato lasciando debito tecnico. Amen.

---

**Lunedì - 11:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era preoccupato.

**ME**: JN, vieni qui.

**JN**: Sì? È per il feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che hai toccato un flag senza sapere cosa faceva.

**JN**: Ma era disabilitato da due anni!

**ME**: E PER DUE ANNI LE API NON HANNO AVUTO THROTTLING!

**JN**: E QUINDI?!

**ME**: E quindi... funzionava. Ma non era sicuro.

**JN**: Ma non è successo niente per due anni!

**ME**: E SE QUALCUNO AVESSE FATTO UN DDOS?!

**JN**: Non ci ho pensato...

**ME**: E ORA HAI ABBASSATO IL FLAG. E 847 CLIENT SONO STATI BLOCCATI.

**JN**: Scusa...

**ME**: E LA PROSSIMA VOLTA?!

**JN**: La prossima volta chiedo.

**ME**: ESATTO. Chiedi. Prima di toccare qualsiasi feature flag.

**JN**: Ok.

**ME**: E ora andiamo a vedere quanti feature flag ci sono.

**JN**: Quanti?

**ME**: Andiamo a vedere.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Flag toccato: ENABLE_API_THROTTLING
- Client bloccati: 847
- Tempo di esposizione: 2 anni
- JN: da educare

E la lezione era chiara. I feature flag sono pericolosi. E JN va educato. E il debito tecnico va pagato. Amen.

---

**Lunedì - 14:00**

Ho auditato tutti i feature flag. Per trovare le bombe a orologeria.

**TERMINALE**:
```
# Cerca tutti i feature flag
grep -r "FEATURE_" --include="*.js" --include="*.ts" --include="*.py" . | grep -v node_modules | wc -l
234

# Cerca flag con TODO
grep -r "TODO" --include="*.js" --include="*.ts" --include="*.py" . | grep -i "flag\|feature\|enable\|disable" | wc -l
47

# Cerca flag temporanei
grep -r "temporary\|temp\|temporarily" --include="*.js" --include="*.ts" --include="*.py" . | grep -i "flag\|feature" | wc -l
23

# Lista flag attivi
cat config/feature-flags.json | jq '.flags[] | select(.enabled == true) | .name'
"ENABLE_NEW_CHECKOUT"
"ENABLE_CACHE_REDIS"
"ENABLE_API_THROTTLING"
"DISABLE_LEGACY_AUTH"
"ENABLE_NEW_DASHBOARD"
"SKIP_VALIDATION"
"ENABLE_DEBUG_LOGGING"
"DISABLE_RATE_LIMIT"
...

# Controlla età dei flag
for flag in $(cat config/feature-flags.json | jq -r '.flags[] | .name'); do
  echo "=== $flag ==="
  git log --all --oneline --grep="$flag" | head -1
done

# Risultati
=== ENABLE_NEW_CHECKOUT ===
a1b2c3d4 Add new checkout flow (2024-03-15)

=== ENABLE_CACHE_REDIS ===
e5f6g7h8 Migrate to Redis cache (2024-06-20)

=== ENABLE_API_THROTTLING ===
i9j0k1l2 Add API throttling feature flag (2024-11-01)

=== DISABLE_LEGACY_AUTH ===
m3n4o5p6 Disable legacy auth temporarily (2024-09-10)

=== SKIP_VALIDATION ===
q7r8s9t0 Skip validation for migration (2024-12-01)

=== ENABLE_DEBUG_LOGGING ===
u1v2w3x4 Enable debug logging for incident (2025-02-14)

=== DISABLE_RATE_LIMIT ===
y5z6a7b8 Disable rate limit for partner (2025-04-20)
```

**ME**: 234 feature flag. 47 con TODO. 23 temporanei. E 7 attivi da più di un anno.

**TL**: 234 FLAG?!

**ME**: Sì. E molti sono vecchi. E nessuno sa cosa fanno.

**TL**: E QUALI SONO PERICOLOSI?!

**ME**: Quelli che disabilitano cose importanti. Come `SKIP_VALIDATION`. E `DISABLE_RATE_LIMIT`. E `DISABLE_LEGACY_AUTH`.

**TL**: E SONO ATTIVI?!

**ME**: Sì. Da mesi. O anni.

**TL**: E NESSUNO LI HA CONTROLLATI?!

**ME**: No. Perché funzionava tutto.

**TL**: E ORA?!

**ME**: Ora li rimuoviamo. O li documentiamo. O li disabilitiamo.

**TL**: E QUANTO CI VUOLE?!

**ME**: Settimane. Perché dobbiamo capire cosa fanno. E se servono ancora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 234
- Con TODO: 47
- Temporanei: 23
- Attivi da >1 anno: 7
- Pericolosi: 3

E la lezione era chiara. I feature flag si accumulano. E diventano debito tecnico. E il debito tecnico va pagato. Amen.

---

**Martedì - La Pulizia**

Martedì. Ho iniziato a pulire i feature flag. Dai più vecchi ai più recenti.

**TERMINALE**:
```
# Analizza DISABLE_LEGACY_AUTH
git log --all --oneline --grep="DISABLE_LEGACY_AUTH" | head -5
m3n4o5p6 Disable legacy auth temporarily (2024-09-10)
n7o8p9q0 Re-enable legacy auth (nessun commit trovato)

# Controlla se legacy auth esiste ancora
grep -r "legacy.*auth" --include="*.js" src/ | wc -l
0

# Il codice legacy auth non esiste più. Il flag può essere rimosso.
kubectl set env deployment/api-gateway DISABLE_LEGACY_AUTH= # rimuovi

# Analizza SKIP_VALIDATION
git log --all --oneline --grep="SKIP_VALIDATION" | head -5
q7r8s9t0 Skip validation for migration (2024-12-01)

# Controlla se la migration è finita
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM migration_log WHERE status = 'pending'"
0

# La migration è finita. Il flag può essere rimosso.
kubectl set env deployment/api-gateway SKIP_VALIDATION= # rimuovi

# Analizza DISABLE_RATE_LIMIT
git log --all --oneline --grep="DISABLE_RATE_LIMIT" | head -5
y5z6a7b8 Disable rate limit for partner (2025-04-20)

# Controlla se il partner esiste ancora
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM partners WHERE name = 'ACME Corp' AND status = 'active'"
1

# Il partner esiste. Ma perché disabilitiamo il rate limit?
# Controllo ticket
jira search "ACME Corp rate limit" --status done
# Ticket: "ACME Corp needs higher rate limit for integration"
# Soluzione: Aumentare il limite, non disabilitarlo

# Fix: alzare il limite per il partner invece di disabilitare
kubectl set env deployment/api-gateway DISABLE_RATE_LIMIT=
kubectl set env deployment/api-gateway PARTNER_ACME_RATE_LIMIT=10000
```

**ME**: Ho rimosso 3 flag. E fixato 1.

**TL**: E GLI ALTRI?!

**ME**: Li sto analizzando. Ma ci vuole tempo.

**TL**: E QUANTI RESTANO?!

**ME**: 230. Ma molti sono innocui.

**TL**: E I PERICOLOSI?!

**ME**: Quelli li rimuovo subito. Gli altri... piano piano.

**TL**: E JN?!

**ME**: JN mi aiuta. E impara.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 3
- Flag fixati: 1
- Flag restanti: 230
- Tempo stimato: settimane

E la lezione era chiara. I feature flag vanno puliti. E la pulizia richiede tempo. E JN impara. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i feature flag sono pericolosi. Ma anche utili.

**JN**: Utili?

**ME**: Sì. Se usati bene. E rimossi quando non servono più.

**JN**: E come si usano bene?

**ME**: Cinque regole. Primo: ogni feature flag ha una data di scadenza.

**JN**: Scadenza?

**ME**: Sì. Quando lo crei, decidi quando deve essere rimosso. E lo documenti.

**JN**: E se non so quando?

**ME**: Allimenti metti 30 giorni. E se serve ancora, lo estendi.

**JN**: Ok.

**ME**: Secondo: ogni feature flag ha un proprietario.

**JN**: Proprietario?

**ME**: Sì. Qualcuno che sa perché esiste. E che è responsabile di rimuoverlo.

**JN**: E se il proprietario se ne va?

**ME**: Allora il flag va rimosso. O trasferito a qualcun altro.

**JN**: Ok.

**ME**: Terzo: i feature flag temporanei vanno rimossi subito.

**JN**: Subito?

**ME**: Sì. Quando l'evento finisce, il flag va via. Il Black Friday finisce? Il flag va via. La migration finisce? Il flag va via.

**JN**: E se me lo dimentico?

**ME**: Allora... c'è la data di scadenza. E un alert.

**JN**: Ok.

**ME**: Quarto: non toccare i feature flag esistenti senza capire cosa fanno.

**JN**: Mai?

**ME**: Mai. Prima chiedi. Poi tocchi.

**JN**: E se non c'è nessuno?

**ME**: Allora... non tocchi. E aspetti.

**JN**: Ok.

**ME**: Quinto: documenta ogni feature flag.

**JN**: Documenta?

**ME**: Sì. Nome. Scopo. Data creazione. Data scadenza. Proprietario. E cosa succede se lo tocchi.

**JN**: E se non ho tempo?

**ME**: Allimenti non crei il flag. E fai un deploy normale.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Feature flag: 230
- Regole: 5
- Educazione: completata
- JN: più saggio

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i feature flag si accumulano. E il debito tecnico cresce. E l'unico modo per non far crollare il sistema è avere regole. E processi. E educazione. Amen.

---

**Giovedì - Il Sistema**

Giovedì. Ho creato un sistema per gestire i feature flag. E non dimenticarli.

**TERMINALE**:
```
# Crea registro feature flag
cat > docs/feature-flags.md << 'EOF'
# Feature Flag Registry

## Regole

1. Ogni flag ha una data di scadenza
2. Ogni flag ha un proprietario
3. I flag temporanei vanno rimossi subito
4. Non toccare i flag esistenti senza capire
5. Documenta tutto

## Flag Attivi

| Nome | Scopo | Creato | Scadenza | Proprietario | Stato |
|------|-------|--------|----------|--------------|-------|
| ENABLE_NEW_CHECKOUT | Nuovo checkout flow | 2024-03-15 | 2024-06-15 | ME | SCADUTO |
| ENABLE_CACHE_REDIS | Cache Redis | 2024-06-20 | 2024-09-20 | TL | SCADUTO |
| ENABLE_DEBUG_LOGGING | Debug per incident | 2025-02-14 | 2025-02-21 | ME | SCADUTO |

## Flag da Rimuovere

- ENABLE_NEW_CHECKOUT: scaduto da 2 anni
- ENABLE_CACHE_REDIS: scaduto da 1.5 anni
- ENABLE_DEBUG_LOGGING: scaduto da 1 anno
EOF

# Crea alert per flag scaduti
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagExpired
        expr: |
          feature_flag_age_days > feature_flag_max_age_days
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is expired"
          description: "Feature flag {{ $labels.flag }} created by {{ $labels.owner }} is {{ $value }} days old. Max age: {{ $labels.max_age }} days."

      - alert: FeatureFlagWithoutOwner
        expr: |
          feature_flag_exists == 1 and on(flag) feature_flag_owner == ""
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} has no owner"
          description: "Feature flag {{ $labels.flag }} has no owner assigned. Please update the registry."

      - alert: FeatureFlagTemporaryTooOld
        expr: |
          feature_flag_temporary == 1 and feature_flag_age_days > 7
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Temporary feature flag {{ $labels.flag }} is too old"
          description: "Temporary feature flag {{ $labels.flag }} is {{ $value }} days old. Temporary flags should be removed within 7 days."
EOF

# Crea script di cleanup
cat > scripts/feature-flag-cleanup.sh << 'EOF'
#!/bin/bash

# Controlla flag scaduti
expired_flags=$(cat config/feature-flags.json | jq -r '.flags[] | select(.expires != null and .expires < "'$(date -I)'") | .name')

for flag in $expired_flags; do
  echo "Flag $flag is expired. Removing..."
  
  # Notifica proprietario
  owner=$(cat config/feature-flags.json | jq -r '.flags[] | select(.name == "'$flag'") | .owner')
  slack-notify "#devops" "Feature flag $flag is expired. Owner: $owner. Please remove or extend."
  
  # Se temporaneo, rimuovi automaticamente dopo 7 giorni
  temporary=$(cat config/feature-flags.json | jq -r '.flags[] | select(.name == "'$flag'") | .temporary')
  if [ "$temporary" == "true" ]; then
    echo "Removing temporary flag $flag..."
    kubectl set env deployment/api-gateway $flag=
    # Aggiorna registry
    cat config/feature-flags.json | jq 'del(.flags[] | select(.name == "'$flag'"))' > config/feature-flags.json.tmp
    mv config/feature-flags.json.tmp config/feature-flags.json
  fi
done
EOF

chmod +x scripts/feature-flag-cleanup.sh

# Aggiungi al cron
echo "0 9 * * * /scripts/feature-flag-cleanup.sh" | crontab -
```

**TL**: Hai creato il sistema?

**ME**: Sì. Registro. Alert. E script di cleanup.

**TL**: E QUINDI?!

**ME**: E quindi... non dimentichiamo più i feature flag.

**TL**: E SE QUALCUNO IGNORA GLI ALERT?!

**ME**: Allora... lo script rimuove i flag temporanei automaticamente.

**TL**: E I FLAG NON TEMPORANEI?!

**ME**: Quelli... li notifica. E se nessuno risponde, li rimuove dopo 30 giorni.

**TL**: E SE SERVONO ANCORA?!

**ME**: Allora... qualcuno risponde. E li estende.

**TL**: E SE NESSUNO RISPONDE?!

**ME**: Allimenti non servono. E vanno rimossi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Registro: creato
- Alert: configurati
- Cleanup: automatico
- Flag scaduti: 3

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno gestiti. E che il sistema aiuta. E che l'automazione salva. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero creato feature flag e dimenticato di rimuoverli.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 10:00
**Autore**: JN (che ha toccato il flag)
**Creatore originale**: Bob (ex dipendente)
**Servizio**: API Gateway
**Problema**: Feature flag abilitato dopo 2 anni di inattività
**Causa**: Flag mai rimosso dopo Black Friday 2024
**Tempo in produzione**: 2 anni
**Client bloccati**: 847
**Errori 429**: 234/s
**Tempo di risoluzione**: 15 minuti
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "Due anni?!"
**Reazione TL**: "847 client?!"
**Reazione CTO**: "I feature flag vanno rimossi."
**Soluzione**: Flag rimosso + audit + sistema di gestione
**Lezione imparata**: I FEATURE FLAG VANNO RIMOSSI. SEMPRE.

**Regole per i feature flag**:
1. Ogni flag ha una DATA DI SCADENZA.
2. Ogni flag ha un PROPRIETARIO.
3. I flag TEMPORANEI vanno rimossi SUBITO.
4. Non TOCCARE i flag esistenti senza capire.
5. DOCUMENTA ogni flag.
6. I flag scaduti vanno RIMOSSI automaticamente.
7. Il debito tecnico va PAGATO. Amen.

**Come creare un feature flag correttamente**:
```yaml
# config/feature-flags.json
{
  "flags": [
    {
      "name": "ENABLE_NEW_FEATURE",
      "description": "Enable new feature for beta testing",
      "created": "2027-01-16",
      "expires": "2027-02-16",
      "owner": "team-lead@company.com",
      "temporary": false,
      "enabled": true,
      "impact": "Enables new checkout flow. Rollback: set to false."
    }
  ]
}
```

**Come rimuovere un feature flag**:
```bash
# 1. Verifica che non serva più
git log --all --oneline --grep="FLAG_NAME"

# 2. Controlla se il codice esiste ancora
grep -r "FLAG_NAME" --include="*.js" src/

# 3. Rimuovi dal codice
# Rimuovi tutti i riferimenti al flag

# 4. Rimuovi dalla configurazione
kubectl set env deployment/SERVICE FLAG_NAME=

# 5. Aggiorna il registro
# Rimuovi dal file feature-flags.json

# 6. Commit e push
git add .
git commit -m "Remove feature flag FLAG_NAME"
git push
```

**Come auditare i feature flag**:
```bash
# Lista tutti i flag
grep -r "FEATURE_" --include="*.js" src/ | cut -d: -f2 | sort | uniq

# Trova flag vecchi
for flag in $(grep -r "FEATURE_" --include="*.js" src/ | cut -d: -f2 | sort | uniq); do
  echo "=== $flag ==="
  git log --all --oneline --grep="$flag" | head -1
done

# Trova flag con TODO
grep -r "TODO" --include="*.js" src/ | grep -i "flag\|feature"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag vanno rimossi. E che le date di scadenza sono obbligatorie. E che i proprietari vanno assegnati. E che JN va educato. E che 847 client bloccati sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come gli ospiti. Quando arrivano, sono benvenuti. Ma quando la festa finisce, devono andarsene. E se non se ne vanno, occupano spazio. E consumano risorse. E un giorno qualcuno li tocca. E tutto si rompe. E tu ti chiedi: "Com'è possibile che questo flag fosse ancora qui?" E la risposta è semplice: perché nessuno l'ha mandato via. E quel flag era lì dal Black Friday 2024. E Bob se n'è andato. E il flag è rimasto. E JN l'ha toccato. E 847 client sono stati bloccati. E UL ha chiamato. E tu hai risposto. E hai detto: "Il feature flag era lì da due anni." E UL ha detto: "E PERCHÉ ERA LÌ DA DUE ANNI?!" E tu hai detto: "Perché nessuno l'ha rimosso." E UL ha detto: "E PERCHÉ NESSUNO L'HA RIMOSSO?!" E tu hai detto: "Perché non c'era un sistema." E UL ha detto: "E ORA C'È?!" E tu hai detto: "Sì. C'è il registro. E gli alert. E il cleanup automatico." E UL ha detto: "Bene. E la prossima volta?" E tu hai detto: "La prossima volta non succede. Perché c'è il sistema." E la verità è che i sistemi aiutano. Ma non sostituiscono la disciplina. E la disciplina significa rimuovere i feature flag. Quando non servono più. Sempre. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | API Gateway |
| Creatore originale | Bob (ex dipendente) |
| Data creazione | 28/11/2024 |
| Scopo | Black Friday 2024 |
| Data incident | 16/01/2027, 10:00 |
| Tempo in produzione | 2 anni |
| Client bloccati | 847 |
| Errori 429 | 234/s |
| Tempo di risoluzione | 15 minuti |
| Downtime | 0 (parziale) |
| Feature flag totali | 234 |
| Flag con TODO | 47 |
| Flag temporanei | 23 |
| Flag scaduti | 3 |
| Reazione UL | "Due anni?!" |
| Reazione TL | "847 client?!" |
| Reazione CTO | "Vanno rimossi." |
| Soluzione | Flag rimosso + audit + sistema |
| Lezione imparata | FLAG = DATA SCADENZA + PROPRIETARIO |
| **Totale** | **847 client bloccati + 234 flag auditati + 3 flag rimossi + 1 sistema creato** |

**Morale**: I feature flag sono come gli ospiti. Quando arrivano, sono benvenuti. Ma quando la festa finisce, devono andarsene. E se non se ne vanno, occupano spazio. E consumano risorse. E un giorno qualcuno li tocca. E tutto si rompe. E tu ti chiedi: "Com'è possibile che questo flag fosse ancora qui?" E la risposta è semplice: perché nessuno l'ha mandato via. E quel flag era lì dal Black Friday 2024. E Bob se n'è andato. E il flag è rimasto. E JN l'ha toccato. E 847 client sono stati bloccati. E UL ha chiamato. E tu hai risposto. E hai detto: "Il feature flag era lì da due anni." E UL ha detto: "E PERCHÉ ERA LÌ DA DUE ANNI?!" E tu hai detto: "Perché nessuno l'ha rimosso." E UL ha detto: "E PERCHÉ NESSUNO L'HA RIMOSSO?!" E tu hai detto: "Perché non c'era un sistema." E la verità è che i sistemi aiutano. Ma non sostituiscono la disciplina. E la disciplina significa rimuovere i feature flag. Quando non servono più. Sempre. E se non li rimuovi, si accumulano. E diventano debito tecnico. E il debito tecnico va pagato. Con gli interessi. E gli interessi sono 847 client bloccati. E 15 minuti di panico. E una chiamata con UL. E una lezione imparata. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-il-migration-che-ha-cancellato-tutto.md)**
