# Il Rate Limiter Che Bloccava I Legittimi

**Data**: 06/03/2027

**[Storie 2026](index.md) | [Precedente](106-la-config-che-era-nell-immagine.md) | [Prossima](108-il-certificate-che-non-veniva-rinnovato.md)**

---

C'è una verità nella protezione dei sistemi che tutti conoscono ma nessuno rispetta: un rate limiter deve bloccare gli abusi, non i clienti. Quando un rate limiter funziona bene, i bot non passano. Quando un rate limiter funziona male, i clienti non passano. E quando un rate limiter è configurato da JN, passano i bot E non passano i clienti. E tu ti chiedi: "Com'è possibile che i bot completino gli ordini e i clienti ricevano 429 Too Many Requests?" E la risposta è semplice: perché JN ha configurato il rate limiter per IP. E i bot usano proxy. E i clienti usano NAT. E un IP dietro NAT sono 500 clienti. E 500 clienti ricevono 429. E i bot con 500 proxy fanno 500 richieste. E i clienti con 1 IP fanno 0 richieste. E UL chiama. E tu rispondi. E dici: "Il rate limiter bloccava i clienti." E UL dice: "E I BOT?!" E tu dici: "I bot passavano." E UL dice: "COME FA I BOT A PASSARE E I CLIENTI NO?!" E la verità è che il rate limiting è difficile. E JN non lo sapeva. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti non riescono ad accedere. Ricevono errori 429.

**ME**: Errori 429?!

**TL**: 429?!

**ME**: Sì. Too Many Requests.

**TL**: E QUANTI SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla errori
kubectl logs -l app=api-gateway --since=30m | grep -i "429" | wc -l
4521

# Controlla chi riceve 429
kubectl logs -l app=api-gateway --since=30m | grep "429" | grep -oE "client_ip=[0-9.]+" | sort | uniq -c | sort -rn | head -10
   892 client_ip=192.168.1.1
   654 client_ip=192.168.1.2
   423 client_ip=10.0.0.1
   312 client_ip=10.0.0.2
   234 client_ip=172.16.0.1

# Controlla richieste totali
kubectl logs -l app=api-gateway --since=30m | grep -oE "client_ip=[0-9.]+" | sort | uniq -c | wc -l
5234

# Controlla ordini completati
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-03-06 08:30:00' AND status = 'completed'"
count
-------
23
```

**ME**: 4521 errori 429 in 30 minuti. Solo 23 ordini completati.

**TL**: E GLI ALTRI ORDINI?!

**ME**: Non ci sono. I clienti non riescono nemmeno a entrare.

**TL**: E CHI RIESCE A ENTRARE?!

**ME**: Controllo gli IP che completano ordini.

**TERMINALE**:
```
# Controlla IP che completano ordini
kubectl logs -l app=api-gateway --since=30m | grep "order completed" | grep -oE "client_ip=[0-9.]+" | sort | uniq -c | sort -rn | head -10
    23 client_ip=45.33.32.156
    18 client_ip=45.33.32.157
    15 client_ip=45.33.32.158
    12 client_ip=185.220.101.1
    11 client_ip=185.220.101.2
     9 client_ip=185.220.101.3

# Controlla chi sono questi IP
whois 45.33.32.156 | grep -i "org\|descr"
OrgName: DigitalOcean
Customer: RDP/VPS Hosting

whois 185.220.101.1 | grep -i "org\|descr"
descr: TOR Exit Node
```

**ME**: Gli ordini vengono da IP di hosting. E nodi TOR.

**TL**: TOR?!

**ME**: Sì. E VPS. Sono bot.

**TL**: E I CLIENTI LEGITTIMI?!

**ME**: Bloccati. 429 Too Many Requests.

**TL**: E COME FA I BOT A PASSARE E I CLIENTI NO?!

**ME**: Controllo il rate limiter.

**TERMINALE**:
```
# Leggi configurazione rate limiter
cat config/rate-limiter.yaml
limits:
  default:
    requests: 100
    window: 60s
  by_ip:
    requests: 10
    window: 60s
  whitelist:
    - 10.0.0.0/8      # Internal
    - 192.168.0.0/16  # Internal
```

**ME**: Il rate limiter è configurato per IP. 10 richieste al minuto per IP.

**TL**: E QUINDI?!

**ME**: E quindi... gli IP interni sono in whitelist. Ma i clienti dietro NAT usano IP interni.

**TL**: E I BOT?!

**ME**: I bot usano IP diversi. Ogni richiesta da un IP diverso. E passano.

**TL**: E I CLIENTI?!

**ME**: I clienti sono dietro NAT. 500 clienti. Un IP. 10 richieste al minuto. E sono bloccati.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Errori 429: 4521
- Ordini completati: 23
- Clienti bloccati: 500+
- Bot che passano: sì
- Rate limiter: mal configurato

E tutto era chiaro. Il rate limiter bloccava i clienti. E i bot passavano. E JN aveva configurato tutto. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai configurato il rate limiter?

**JN**: Sì. La settimana scorsa. Perché?

**ME**: I clienti sono bloccati. Ricevono 429.

**JN**: 429?!

**ME**: Sì. E i bot completano ordini.

**JN**: Bot?!

**ME**: Sì. Da IP di hosting. E nodi TOR.

**JN**: Ma... il rate limiter dovrebbe bloccarli!

**ME**: Il rate limiter è per IP. E i bot usano IP diversi. E i clienti usano lo stesso IP.

**JN**: Stesso IP?!

**ME**: Sì. Dietro NAT. 500 clienti. Un IP. 10 richieste al minuto.

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Non ci avevo pensato.

**ME**: E I BOT?!

**JN**: I bot... usano IP diversi?

**ME**: Sì. Ogni richiesta da un IP diverso. E passano.

**JN**: Ma... è il modo in cui funziona il rate limiting!

**ME**: NO. IL RATE LIMITING PER IP NON FUNZIONA CON NAT. E NON FUNZIONA CON I BOT.

**JN**: E QUINDI?!

**ME**: E quindi fixiamo. Ora.

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Rate limiter: sbagliato
- Clienti: bloccati
- Bot: liberi
- JN: inaffidabile

E la lezione era chiara. Il rate limiting va pensato. E JN non pensa. Amen.

---

**Lunedì - 10:00**

Ho disabilitato il rate limiter. E i clienti sono tornati.

**TERMINALE**:
```
# Disabilita rate limiter
kubectl patch configmap api-gateway-config --patch '{"data":{"rate-limiter.yaml":"limits:\n  default:\n    requests: 10000\n    window: 60s\n"}}'

# Riavvia gateway
kubectl rollout restart deployment/api-gateway

# Controlla errori
kubectl logs -l app=api-gateway --since=5m | grep -i "429" | wc -l
0

# Controlla ordini
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-03-06 10:00:00' AND status = 'completed'"
count
-------
234
```

**ME**: Rate limiter disabilitato. Zero errori 429. 234 ordini in 5 minuti.

**TL**: E I BOT?!

**ME**: I bot... passano anche loro.

**TL**: E QUANTI SONO?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla IP sospetti
kubectl logs -l app=api-gateway --since=5m | grep "order completed" | grep -oE "client_ip=[0-9.]+" | sort | uniq -c | sort -rn | head -20
    45 client_ip=192.168.1.1    # Clienti legittimi
    38 client_ip=192.168.1.2    # Clienti legittimi
    32 client_ip=45.33.32.156   # Bot
    28 client_ip=45.33.32.157   # Bot
    25 client_ip=185.220.101.1  # TOR
    22 client_ip=185.220.101.2  # TOR
```

**ME**: I bot passano. Ma passano anche i clienti.

**TL**: E QUINDI?!

**ME**: E quindi... dobbiamo configurare il rate limiter correttamente. Non rimuoverlo.

**TL**: E COME?!

**ME**: Con rate limiting per utente. Non per IP. E con bot detection.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Clienti: sbloccati
- Bot: ancora attivi
- Rate limiter: disabilitato
- Soluzione: da implementare

E tutto funzionava. Ma i bot erano ancora lì. E andavano fermati. Amen.

---

**Lunedì - 11:00**

Ho implementato un rate limiter corretto. Con bot detection.

**TERMINALE**:
```
# Nuova configurazione rate limiter
cat > config/rate-limiter-v2.yaml << 'EOF'
limits:
  # Rate limiting per utente (autenticato)
  by_user:
    requests: 100
    window: 60s
    key: "user_id"  # Usa l'ID utente, non l'IP

  # Rate limiting per IP (solo per non autenticati)
  by_ip:
    requests: 30
    window: 60s
    key: "client_ip"
    conditions:
      - "not authenticated"

  # Bot detection
  bot_detection:
    enabled: true
    checks:
      - name: "ip_reputation"
        action: "block"
        sources:
          - "https://api.spur.us/v2/context"
          - "https://api.ipqualityscore.com/api/json/ip"
      - name: "browser_fingerprint"
        action: "challenge"
      - name: "behavior_pattern"
        action: "challenge"
        patterns:
          - "rapid_clicks"
          - "linear_timing"
          - "no_mouse_movement"

  # Whitelist
  whitelist:
    ips:
      - "10.0.0.0/8"
      - "192.168.0.0/16"
    conditions:
      - "internal_service"

  # Challenge per sospetti
  challenge:
    type: "captcha"
    trigger:
      - "bot_score > 0.7"
      - "ip_reputation == 'suspicious'"
EOF

# Implementa bot detection
cat > src/middleware/bot-detection.js << 'EOF'
const BotDetector = require('bot-detector');

const detector = new BotDetector({
  ipReputation: {
    apiKey: process.env.IP_QUALITY_SCORE_KEY,
    cacheTimeout: 3600
  },
  behaviorAnalysis: {
    windowMs: 60000,
    thresholds: {
      rapidClicks: 10,
      linearTiming: 0.95,
      noMouseMovement: true
    }
  }
});

async function botDetectionMiddleware(req, res, next) {
  const clientIp = req.ip;
  const userAgent = req.headers['user-agent'];
  const userId = req.user?.id;

  // Se autenticato, usa rate limiting per utente
  if (userId) {
    req.rateLimitKey = `user:${userId}`;
    return next();
  }

  // Controlla reputazione IP
  const reputation = await detector.checkIpReputation(clientIp);

  if (reputation.isProxy || reputation.isVpn || reputation.isTor) {
    // Challenge per IP sospetti
    if (reputation.fraudScore > 70) {
      return res.status(403).json({
        error: 'Access denied',
        reason: 'suspicious_ip',
        challenge: 'captcha'
      });
    }
  }

  // Analizza comportamento
  const behavior = await detector.analyzeBehavior(req.session.id);

  if (behavior.isBot) {
    return res.status(429).json({
      error: 'Too many requests',
      reason: 'bot_detected',
      challenge: 'captcha'
    });
  }

  // Rate limit per IP per non autenticati
  req.rateLimitKey = `ip:${clientIp}`;
  next();
}

module.exports = botDetectionMiddleware;
EOF

# Deploy
kubectl apply -f config/rate-limiter-v2.yaml
kubectl rollout restart deployment/api-gateway
```

**ME**: Nuovo rate limiter deployato. Con bot detection. E rate limiting per utente.

**TL**: E FUNZIONA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla errori
kubectl logs -l app=api-gateway --since=5m | grep -i "429\|403" | tail -20
2027-03-06 11:05:23 403 client_ip=45.33.32.156 reason=suspicious_ip
2027-03-06 11:05:24 403 client_ip=45.33.32.157 reason=suspicious_ip
2027-03-06 11:05:25 429 client_ip=185.220.101.1 reason=bot_detected
2027-03-06 11:05:26 429 client_ip=185.220.101.2 reason=bot_detected

# Controlla ordini
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-03-06 11:00:00' AND status = 'completed'"
count
-------
456

# Controlla chi completa ordini
kubectl logs -l app=api-gateway --since=5m | grep "order completed" | grep -oE "client_ip=[0-9.]+" | sort | uniq -c | sort -rn | head -10
    67 client_ip=192.168.1.1    # Clienti legittimi
    54 client_ip=192.168.1.2    # Clienti legittimi
    43 client_ip=10.0.0.1       # Clienti legittimi
    32 client_ip=77.108.65.1    # Clienti legittimi
    28 client_ip=93.45.67.89    # Clienti legittimi
```

**ME**: I bot sono bloccati. I clienti passano. 456 ordini in 5 minuti.

**TL**: E GLI ERRORI 429?!

**ME**: Solo per i bot. Zero per i clienti.

**TL**: E QUINDI?!

**ME**: E quindi... funziona.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Bot: bloccati
- Clienti: liberi
- Ordini: completati
- Rate limiter: funzionante

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il rate limiting va pensato. E che JN va educato. Amen.

---

**Lunedì - 14:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con il rate limiter.

**UL**: Che problema?

**ME**: Bloccava i clienti. E lasciava passare i bot.

**UL**: COME FA A BLOCCARE I CLIENTI E LASCIARE PASSARE I BOT?!

**ME**: Era configurato per IP. E i clienti sono dietro NAT. E i bot usano proxy.

**UL**: E QUANTI CLIENTI BLOCCATI?!

**ME**: 500+. Per 2 ore.

**UL**: E QUANTI ORDINI PERSI?!

**ME**: Difficile dirlo. Ma prima del fix, 23 ordini in 30 minuti. Dopo il fix, 456 in 5 minuti.

**UL**: E I BOT?!

**ME**: Bloccati. Con bot detection.

**UL**: E CHI HA CONFIGURATO IL RATE LIMITER?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. La settimana scorsa.

**UL**: E NON L'HA TESTATO?!

**ME**: L'ha testato. Ma non con NAT. E non con bot.

**UL**: E QUINDI?!

**ME**: E quindi... ho fixato. E educato JN.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho aggiunto bot detection. E rate limiting per utente.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. Il rate limiting va pensato. E JN va educato. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i rate limiter. Per trovare altri problemi.

**TERMINALE**:
```
# Cerca tutti i rate limiter
find . -name "*.yaml" -o -name "*.yml" | xargs grep -l "rate" | head -20

# Controlla configurazioni
for file in $(find . -name "*.yaml" -o -name "*.yml" | xargs grep -l "rate"); do
  echo "=== $file ==="
  cat $file
done

# Risultati
=== config/api-gateway/rate-limiter.yaml ===
limits:
  by_ip:
    requests: 10
    window: 60s
# PROBLEMA: Per IP, non per utente

=== config/payment/rate-limiter.yaml ===
limits:
  by_ip:
    requests: 5
    window: 60s
# PROBLEMA: Troppo restrittivo

=== config/notification/rate-limiter.yaml ===
limits:
  by_user:
    requests: 100
    window: 60s
# OK: Per utente

=== config/search/rate-limiter.yaml ===
limits:
  by_ip:
    requests: 1000
    window: 60s
# PROBLEMA: Troppo permissivo
```

**ME**: 3 rate limiter problematici. Su 4.

**TL**: 3?!

**ME**: Sì. API gateway, payment, search.

**TL**: E QUALI SONO I PROBLEMI?!

**ME**: API gateway: per IP. Payment: troppo restrittivo. Search: troppo permissivo.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix payment rate limiter
cat > config/payment/rate-limiter.yaml << 'EOF'
limits:
  by_user:
    requests: 50
    window: 60s
  by_ip:
    requests: 20
    window: 60s
    conditions:
      - "not authenticated"
EOF

# Fix search rate limiter
cat > config/search/rate-limiter.yaml << 'EOF'
limits:
  by_user:
    requests: 200
    window: 60s
  by_ip:
    requests: 30
    window: 60s
    conditions:
      - "not authenticated"
  bot_detection:
    enabled: true
EOF

# Deploy
kubectl apply -f config/payment/rate-limiter.yaml
kubectl apply -f config/search/rate-limiter.yaml
kubectl rollout restart deployment/payment-service deployment/search-service
```

**ME**: Tutti i rate limiter fixati.

**TL**: E QUANTI ERANO?!

**ME**: 4. Di cui 3 problematici.

**TL**: E CHI LI HA CONFIGURATI?!

**ME**: JN. Bob. E... io.

**TL**: TU?!

**ME**: Sì. Due anni fa. Per il servizio search.

**TL**: E ERA TROPPO PERMISSIVO?!

**ME**: Sì. Pensavo che la ricerca dovesse essere veloce.

**TL**: E I BOT?!

**ME**: I bot... non ci avevo pensato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Rate limiter problematici: 3
- Rate limiter fixati: 4
- Autori: JN, Bob, ME
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti configurano male i rate limiter. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il rate limiter?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il rate limiter che bloccava i clienti è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: il rate limiting per IP non funziona con NAT.

**JN**: Non funziona?

**ME**: No. Perché 500 clienti possono essere dietro un IP. E se limiti per IP, blocchi 500 clienti.

**JN**: E QUINDI?!

**ME**: E quindi usa rate limiting per utente. O per sessione. O per API key. Ma non per IP.

**JN**: Ok.

**ME**: Secondo: i bot usano IP diversi.

**JN**: Diversi?

**ME**: Sì. Proxy. VPN. TOR. Ogni richiesta può venire da un IP diverso. E il rate limiting per IP non li ferma.

**JN**: E COME LI FERMO?!

**ME**: Con bot detection. Controlla la reputazione dell'IP. Il comportamento. Il fingerprint del browser.

**JN**: Ok.

**ME**: Terzo: distingui tra utenti autenticati e non.

**JN**: Cioè?

**ME**: Gli utenti autenticati hanno un ID. Usa quello per il rate limiting. Gli utenti non autenticati usano l'IP. Ma con limiti più alti.

**JN**: E SE NON SONO AUTENTICATI?!

**ME**: Allora usi l'IP. Ma controlli anche la reputazione.

**JN**: Ok.

**ME**: Quarto: usa challenge per i sospetti.

**JN**: Challenge?

**ME**: Sì. CAPTCHA. O proof of work. Se un IP è sospetto, chiedi una challenge. Se passa, può continuare.

**JN**: E SE NON PASSA?!

**ME**: Allora è un bot. E lo blocchi.

**JN**: Ok.

**ME**: Quinto: testa con scenari reali.

**JN**: Cioè?

**ME**: Cioè testa con NAT. Testa con bot. Testa con clienti legittimi. Non testare solo dal tuo laptop.

**JN**: E COME FACCIO?!

**ME**: Usa tool di load testing. E bot simulation. E chiedi al team di QA.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Rate limiter: corretto
- Bot detection: attiva
- Clienti: sbloccati
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere rate limiter corretti. E bot detection. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i rate limiter.

**TERMINALE**:
```
# Configura alert per rate limiter
cat > /etc/prometheus/alerts/rate-limiter.yml << 'EOF'
groups:
  - name: rate-limiter
    rules:
      - alert: RateLimiterBlockingLegitimate
        expr: |
          sum by (service) (
            increase(http_requests_total{status="429"}[5m])
          ) > 100
          and
          sum by (service) (
            increase(http_requests_total{status="429",user_type="authenticated"}[5m])
          ) / sum by (service) (
            increase(http_requests_total{status="429"}[5m])
          ) > 0.5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Rate limiter may be blocking legitimate users"
          description: "Service {{ $labels.service }} is returning 429 errors, and more than 50% are from authenticated users."

      - alert: RateLimiterNotBlockingBots
        expr: |
          sum by (service) (
            increase(http_requests_total{status="200",bot_score>0.7}[5m])
          ) > 100
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Rate limiter may not be blocking bots"
          description: "Service {{ $labels.service }} is allowing requests from IPs with high bot scores."

      - alert: RateLimiterTooPermissive
        expr: |
          sum by (service) (
            rate(http_requests_total{status="200"}[5m])
          ) / sum by (service) (
            rate(http_requests_total[5m])
          ) > 0.99
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Rate limiter may be too permissive"
          description: "Service {{ $labels.service }} is accepting >99% of requests. Rate limiter may be disabled or misconfigured."
EOF

# Aggiungi metriche
cat > src/lib/rate-limiter-metrics.js << 'EOF'
const prometheus = require('prom-client');

const rateLimitTotal = new prometheus.Counter({
  name: 'rate_limit_total',
  help: 'Total rate limit actions',
  labelNames: ['service', 'action', 'reason', 'user_type'],
});

const rateLimitKey = new prometheus.Gauge({
  name: 'rate_limit_key_type',
  help: 'Type of key used for rate limiting',
  labelNames: ['service', 'key_type'],
});

const botScore = new prometheus.Histogram({
  name: 'bot_score',
  help: 'Bot score distribution',
  labelNames: ['service', 'ip_reputation'],
  buckets: [0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 0.99],
});

module.exports = { rateLimitTotal, rateLimitKey, botScore };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per rate limiter che blocca legittimi. Alert per rate limiter che non blocca bot. Alert per rate limiter troppo permissivo.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando il rate limiter non funziona.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Rate limiter: corretti
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i rate limiter vanno pensati. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero configurato male i rate limiter.

```markdown
## Incident #RATE-001: Il Rate Limiter Che Bloccava I Legittimi

**Data incident**: Lunedì 6 marzo 2027, 09:00
**Autore**: JN
**Servizio**: api-gateway
**Problema**: Rate limiter bloccava clienti legittimi
**Causa**: Rate limiting per IP con NAT
**Tempo di esposizione**: ~2 ore
**Clienti bloccati**: 500+
**Ordini persi**: Difficile da stimare
**Bot che passavano**: Sì
**Reazione UL**: "COME FA A BLOCCARE I CLIENTI E LASCIARE PASSARE I BOT?!"
**Reazione TL**: "429?!"
**Reazione CTO**: "Rate limiting per utente, non per IP."
**Soluzione**: Rate limiting per utente + bot detection
**Lezione imparata**: IL RATE LIMITING VA PENSATO. NON È SOLO UN NUMERO.

**Regole per i rate limiter**:
1. NON usare rate limiting per IP con NAT.
2. USA rate limiting per utente, sessione, o API key.
3. I BOT usano IP diversi. Il rate limiting per IP non li ferma.
4. IMPLEMENTA bot detection: reputazione IP, comportamento, fingerprint.
5. DISTINGUI tra utenti autenticati e non.
6. USA challenge (CAPTCHA) per IP sospetti.
7. TESTA con scenari reali: NAT, bot, clienti legittimi.
8. MONITORA i 429. Se troppi sono autenticati, c'è un problema. Amen.

**Come configurare un rate limiter corretto**:
```yaml
limits:
  # Per utenti autenticati
  by_user:
    requests: 100
    window: 60s
    key: "user_id"

  # Per IP (solo non autenticati)
  by_ip:
    requests: 30
    window: 60s
    key: "client_ip"
    conditions:
      - "not authenticated"

  # Bot detection
  bot_detection:
    enabled: true
    checks:
      - name: "ip_reputation"
        action: "block"
      - name: "behavior_pattern"
        action: "challenge"
```

**Come implementare bot detection**:
```javascript
async function botDetectionMiddleware(req, res, next) {
  const clientIp = req.ip;
  const userId = req.user?.id;

  // Utenti autenticati: rate limit per user ID
  if (userId) {
    req.rateLimitKey = `user:${userId}`;
    return next();
  }

  // Controlla reputazione IP
  const reputation = await checkIpReputation(clientIp);

  if (reputation.isProxy || reputation.isTor || reputation.fraudScore > 70) {
    return res.status(403).json({
      error: 'Access denied',
      reason: 'suspicious_ip',
      challenge: 'captcha'
    });
  }

  // Rate limit per IP per non autenticati
  req.rateLimitKey = `ip:${clientIp}`;
  next();
}
```

**Come testare il rate limiter**:
```bash
# Test con NAT (più client da stesso IP)
for i in {1..100}; do
  curl -H "X-Forwarded-For: 192.168.1.1" https://api.company.com/orders
done

# Test con bot (IP diversi)
for i in {1..100}; do
  curl -H "X-Forwarded-For: 45.33.32.$((RANDOM % 256))" https://api.company.com/orders
done

# Verifica che i bot siano bloccati
kubectl logs -l app=api-gateway | grep "403\|429" | grep "bot"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che il rate limiting per IP non funziona con NAT. E che i bot usano IP diversi. E che la bot detection è essenziale. E che JN va educato. E che 500 clienti bloccati sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: il rate limiter è come un buttafuori. Se blocca tutti, il locale è vuoto. Se non blocca nessuno, il locale è pieno di gente che non paga. E se blocca i clienti giusti e fa entrare i sbagliati, il locale fallisce. E nel nostro caso, il locale è l'API. E il buttafuori è il rate limiter. E se il rate limiter blocca i clienti e fa entrare i bot, l'API fallisce. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il rate limiter bloccava i clienti." E UL dice: "E I BOT?!" E tu dici: "I bot passavano." E UL dice: "COME FA I BOT A PASSARE E I CLIENTI NO?!" E tu dici: "Perché il rate limiter era per IP. E i clienti erano dietro NAT. E i bot usavano proxy." E UL dice: "E QUANTI CLIENTI BLOCCATI?!" E tu dici: "500." E UL dice: "500?!" E tu dici: "Sì. Per 2 ore." E la verità è che il rate limiting è difficile. E JN non lo sapeva. E ora lo sa. E la prossima volta, pensa. Pensa a NAT. Pensa a bot. Pensa a clienti. E configura il rate limiter per utenti. Non per IP. Amen.

---

## Il costo del rate limiter sbagliato

| Voce | Valore |
|------|--------|
| Servizio | api-gateway |
| Autore | JN |
| Data configurazione | Febbraio 2027 |
| Data incident | 06/03/2027, 09:00 |
| Tempo di esposizione | ~2 ore |
| Clienti bloccati | 500+ |
| Ordini persi | Difficile da stimare |
| Bot che passavano | Sì |
| Rate limiter problematici | 3 su 4 |
| Servizi affetti | api-gateway, payment, search |
| Autori | JN, Bob, ME |
| Reazione UL | "COME FA A BLOCCARE I CLIENTI E LASCIARE PASSARE I BOT?!" |
| Reazione TL | "429?!" |
| Reazione CTO | "Rate limiting per utente." |
| Soluzione | Rate limiting per utente + bot detection |
| Lezione imparata | RATE LIMITING = PENSA PRIMA |
| **Totale** | **500+ clienti bloccati + 3 rate limiter fixati + 1 junior educato + 1 senior educato** |

**Morale**: Il rate limiter deve bloccare gli abusi, non i clienti. Quando configuri un rate limiter per IP, pensa a NAT. Pensa che 500 clienti possono essere dietro un IP. Pensa che i bot usano IP diversi. Pensa che il rate limiting per IP non funziona. E configura il rate limiter per utente. O per sessione. O per API key. Ma non per IP. E se configuri per IP, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il rate limiter bloccava i clienti." E UL dice: "E I BOT?!" E tu dici: "I bot passavano." E UL dice: "COME FA I BOT A PASSARE E I CLIENTI NO?!" E tu dici: "Perché il rate limiter era per IP." E UL dice: "E PERCHÉ ERA PER IP?!" E tu dici: "Perché JN l'ha configurato così." E UL dice: "E JN?!" E tu dici: "JN... lo educo." E la verità è che tutti configurano male i rate limiter. E tutti imparano. E la prossima volta, pensi. Pensi a NAT. Pensi a bot. Pensi a clienti. E configuri per utenti. Non per IP. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](106-la-config-che-era-nell-immagine.md) | [Prossima](108-il-certificate-che-non-veniva-rinnovato.md)**
