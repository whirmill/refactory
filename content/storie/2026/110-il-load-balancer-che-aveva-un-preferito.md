# Il Load Balancer Che Aveva Un Preferito

**Data**: 27/03/2027

**[Storie 2026](index.md) | [Precedente](109-la-queue-che-ha-perso-i-messaggi.md) | [Prossima](111-la-cache-che-non-invalidava-mai.md)**

---

C'è una verità nel load balancing che tutti conoscono ma nessuno rispetta: un load balancer deve distribuire il carico. Equamente. Tra tutti i server. Quando hai 3 istanze, ognuna deve ricevere un terzo del traffico. Quando hai 10 istanze, ognuna deve ricevere un decimo. E invece. Invece il load balancer di JN aveva un preferito. Un server che riceveva tutto. Tutte le richieste. Tutto il traffico. Tutta la sofferenza. E gli altri server? Gli altri server stavano a guardare. Vuoti. Inutili. Sprecati. E il server preferito? Il server preferito moriva. Lentamente. Sotto il peso di 10.000 richieste al secondo. Mentre gli altri ne ricevevano zero. E tu ti chiedevi: "Com'è possibile che il load balancer abbia un preferito?" E la risposta era semplice: perché JN aveva configurato l'IP hash. E l'IP hash mandava sempre lo stesso utente allo stesso server. E quando quell'utente era un bot che faceva 10.000 richieste al secondo? Quel server moriva. E gli altri vivevano. Inutili. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 10:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato l'alert.

**ALERT**: CPU > 95% for api-server-3

**ME**: CPU al 95%?!

**TL**: 95%?!

**ME**: Sì. Sul server 3.

**TL**: E GLI ALTRI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla CPU tutti i server
kubectl top pods -l app=api-server
NAME                          CPU(cores)   MEMORY(bytes)
api-server-1                  5m           256Mi
api-server-2                  8m           312Mi
api-server-3                  950m         2.1Gi

# Controlla richieste
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum by (pod) (rate(http_requests_total[5m]))'
{pod="api-server-1"} 12.5
{pod="api-server-2"} 8.3
{pod="api-server-3"} 9847.2

# Controlla connessioni
kubectl exec -it api-server-3 -- netstat -an | grep ESTABLISHED | wc -l
4521
```

**ME**: Il server 3 riceve 9847 richieste al secondo. Gli altri 20.

**TL**: 9847 CONTRO 20?!

**ME**: Sì. E il server 3 ha 4521 connessioni attive.

**TL**: E GLI ALTRI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla connessioni altri server
kubectl exec -it api-server-1 -- netstat -an | grep ESTABLISHED | wc -l
3

kubectl exec -it api-server-2 -- netstat -an | grep ESTABLISHED | wc -l
5
```

**ME**: Server 1: 3 connessioni. Server 2: 5 connessioni. Server 3: 4521 connessioni.

**TL**: E IL LOAD BALANCER?!

**ME**: Il load balancer... ha un preferito.

**TL**: UN PREFERITO?!

**ME**: Sì. Manda tutto al server 3.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Guardo la configurazione.

**TERMINALE**:
```
# Controlla configurazione load balancer
kubectl get configmap nginx-lb-config -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-lb-config
data:
  nginx.conf: |
    upstream api_servers {
      ip_hash;
      server api-server-1:8080;
      server api-server-2:8080;
      server api-server-3:8080;
    }
```

**ME**: Ecco. IP hash.

**TL**: IP HASH?!

**ME**: Sì. Il load balancer usa l'IP hash per la persistenza delle sessioni.

**TL**: E QUINDI?!

**ME**: E quindi manda sempre lo stesso IP allo stesso server.

**TL**: E SE UN SOLO IP FA 10.000 RICHIESTE?!

**ME**: Allora... un server muore. E gli altri vivono.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Server 1: 12.5 req/s, 3 connessioni
- Server 2: 8.3 req/s, 5 connessioni
- Server 3: 9847.2 req/s, 4521 connessioni
- Load balancer: ip_hash attivo

E tutto era chiaro. Il load balancer aveva un preferito. E il preferito stava morendo. Amen.

---

**Lunedì - 10:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai configurato il load balancer?

**JN**: Sì. Tre mesi fa. Perché?

**ME**: Hai usato IP hash.

**JN**: Sì. Per la persistenza delle sessioni.

**ME**: E SE UN SOLO UTENTE FA 10.000 RICHIESTE?!

**JN**: Eh?

**ME**: UN SOLO UTENTE. 10.000 RICHIESTE. TUTTE ALLO STESSO SERVER.

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Non ci avevo pensato.

**ME**: E IL SERVER 3 È AL 95% DI CPU!

**JN**: Ma... la persistenza delle sessioni!

**ME**: LA PERSISTENZA NON VUOL DIRE CHE UN SERVER DEVE MORIRE!

**JN**: E QUINDI?!

**ME**: E quindi cambiamo algoritmo. E usiamo round robin con session sticky.

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA PENSA A COSA SUCCEDE SE UN BOT FA 10.000 RICHIESTE!

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Load balancer: da fixare
- Server 3: morente
- JN: inaffidabile
- Bot: 10.000 req/s

E la lezione era chiara. L'IP hash è pericoloso. E i bot esistono. E JN non pensa. Amen.

---

**Lunedì - 11:00**

Ho fixato il load balancer. E il server 3 ha ripreso a respirare.

**TERMINALE**:
```
# Fix configurazione load balancer
cat > nginx-lb-config.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-lb-config
data:
  nginx.conf: |
    upstream api_servers {
      least_conn;
      server api-server-1:8080 weight=1;
      server api-server-2:8080 weight=1;
      server api-server-3:8080 weight=1;
      keepalive 32;
    }
    
    server {
      listen 80;
      
      location / {
        proxy_pass http://api_servers;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Session sticky via cookie
        proxy_cookie_path / /;
      }
    }
EOF

# Applica configurazione
kubectl apply -f nginx-lb-config.yaml

# Riavvia load balancer
kubectl rollout restart deployment/nginx-lb

# Verifica
kubectl rollout status deployment/nginx-lb
deployment "nginx-lb" successfully rolled out
```

**ME**: Load balancer fixato. Ora usa least_conn.

**TL**: Least connection?!

**ME**: Sì. Manda le richieste al server con meno connessioni.

**TL**: E LA PERSISTENZA?!

**ME**: La gestiamo via cookie. Non via IP hash.

**TL**: E IL SERVER 3?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla CPU dopo 5 minuti
kubectl top pods -l app=api-server
NAME                          CPU(cores)   MEMORY(bytes)
api-server-1                  320m         512Mi
api-server-2                  315m         498Mi
api-server-3                  318m         521Mi

# Controlla richieste
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum by (pod) (rate(http_requests_total[5m]))'
{pod="api-server-1"} 3284.1
{pod="api-server-2"} 3291.5
{pod="api-server-3"} 3271.6

# Controlla connessioni
kubectl exec -it api-server-1 -- netstat -an | grep ESTABLISHED | wc -l
1507

kubectl exec -it api-server-2 -- netstat -an | grep ESTABLISHED | wc -l
1512

kubectl exec -it api-server-3 -- netstat -an | grep ESTABLISHED | wc -l
1498
```

**ME**: Carico distribuito equamente. Ogni server ha ~3300 req/s e ~1500 connessioni.

**TL**: E IL BOT?!

**ME**: Il bot è ancora lì. Ma ora il carico è distribuito.

**TL**: E QUANTI ERRORI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla errori
kubectl logs -l app=api-server --since=10m | grep -i error | wc -l
0

# Controlla latenza
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))'
0.089  # 89ms P99
```

**ME**: Zero errori. P99 a 89ms.

**TL**: E QUINDI?!

**ME**: E quindi... funziona.

**TL**: E I CLIENTI?!

**ME**: I clienti ricevono risposte. E il server 3 non muore più.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Load balancer: least_conn
- Carico: distribuito
- Errori: zero
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'algoritmo di load balancing conta. E che l'IP hash è pericoloso. E che JN va educato. Amen.

---

**Lunedì - 11:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con il load balancer.

**UL**: Che problema?

**ME**: Era configurato con IP hash. E un bot ha mandato 10.000 richieste al secondo.

**UL**: 10.000 RICHIESTE?!

**ME**: Sì. Tutte allo stesso server.

**UL**: ALLO STESSO SERVER?!

**ME**: Sì. Perché l'IP hash manda sempre lo stesso IP allo stesso server.

**UL**: E IL SERVER?!

**ME**: Era al 95% di CPU. E quasi morto.

**UL**: E GLI ALTRI?!

**ME**: Gli altri erano a vuoto. 3-5 connessioni ciascuno.

**UL**: 3 CONTRO 4500?!

**ME**: Sì. E ora è fixato. Ho cambiato a least_conn.

**UL**: E CHI HA CONFIGURATO L'IP HASH?!

**ME**: JN. Tre mesi fa.

**UL**: E PERCHÉ?!

**ME**: Per la persistenza delle sessioni.

**UL**: E NON HA PENSAATO AI BOT?!

**ME**: No. E non ha pensato che un singolo IP può fare 10.000 richieste.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato il load balancer. E aggiunto monitoraggio.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. L'IP hash è pericoloso. E i bot esistono. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Analisi**

Martedì. Ho analizzato il traffico. Per capire chi era il bot.

**TERMINALE**:
```
# Analizza traffico per IP
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'topk(10, sum by (ip) (rate(http_requests_total[1h])))'
{ip="192.168.1.100"} 9847.2
{ip="10.0.0.50"} 12.3
{ip="172.16.0.25"} 8.7
...

# Controlla user agent
kubectl logs -l app=api-server --since=1h | grep "192.168.1.100" | head -5
192.168.1.100 - - [27/Mar/2027:10:15:23 +0000] "GET /api/products HTTP/1.1" 200 1234 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
192.168.1.100 - - [27/Mar/2027:10:15:23 +0000] "GET /api/products HTTP/1.1" 200 1234 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
192.168.1.100 - - [27/Mar/2027:10:15:23 +0000] "GET /api/products HTTP/1.1" 200 1234 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

# Controlla rate
kubectl logs -l app=api-server --since=1h | grep "192.168.1.100" | wc -l
35425200  # 35 milioni di richieste in un'ora
```

**ME**: 35 milioni di richieste in un'ora. Da un solo IP.

**TL**: UN SOLO IP?!

**ME**: Sì. Con user agent "Googlebot".

**TL**: GOOGLEBOT?!

**ME**: Sì. Ma non è Google. È un bot che si spaccia per Google.

**TL**: E COSA FA?!

**ME**: Scarica la lista prodotti. 10.000 volte al secondo.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Forse scraping. Forse DDoS. Forse incompetenza.

**TL**: E LO BLOCCHIAMO?!

**ME**: Sì. Al firewall.

**TERMINALE**:
```
# Blocca IP al firewall
kubectl exec -it firewall-0 -- iptables -A INPUT -s 192.168.1.100 -j DROP

# Verifica
kubectl exec -it firewall-0 -- iptables -L INPUT | grep 192.168.1.100
DROP       all  --  192.168.1.100          anywhere

# Controlla traffico dopo 5 minuti
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total[5m]))'
3284.1  # Tornato a livelli normali
```

**ME**: IP bloccato. Traffico tornato normale.

**TL**: E IL BOT?!

**ME**: Il bot è bloccato. E non può più fare danni.

**TL**: E SE CAMBIA IP?!

**ME**: Allora... aggiungo rate limiting.

**TL**: E SE LO BYPASSA?!

**ME**: Allora... aggiungo CAPTCHA.

**TL**: E SE LO BYPASSA ANCORA?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Bot: bloccato
- Traffico: normale
- IP: bannato
- Rate limiting: da aggiungere

E tutto era sotto controllo. Ma avevo imparato una lezione. La lezione che i bot esistono. E che l'IP hash li rende pericolosi. E che il rate limiting è essenziale. Amen.

---

**Mercoledì - Il Rate Limiting**

Mercoledì. Ho aggiunto rate limiting. Per evitare che un altro bot uccidesse un server.

**TERMINALE**:
```
# Configura rate limiting
cat > rate-limit-config.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: rate-limit-config
data:
  rate-limit.conf: |
    limit_req_zone $binary_remote_addr zone=ip_limit:10m rate=100r/s;
    limit_req_zone $server_name zone=server_limit:10m rate=10000r/s;
    
    limit_req_status 429;
    
    server {
      location /api/ {
        limit_req zone=ip_limit burst=200 nodelay;
        limit_req zone=server_limit burst=5000 nodelay;
        
        proxy_pass http://api_servers;
      }
    }
EOF

# Applica configurazione
kubectl apply -f rate-limit-config.yaml

# Riavvia load balancer
kubectl rollout restart deployment/nginx-lb

# Verifica
kubectl rollout status deployment/nginx-lb
deployment "nginx-lb" successfully rolled out
```

**TL**: Hai aggiunto il rate limiting?

**ME**: Sì. 100 richieste al secondo per IP. 10.000 per server.

**TL**: E SE QUALCUNO HA BISOGNO DI PIÙ?!

**ME**: Allimenti usa burst. Fino a 200 per IP. Fino a 5000 per server.

**TL**: E SE È UN CLIENTE LEGITTIMO?!

**ME**: Allora... lo whitelistiamo.

**TERMINALE**:
```
# Configura whitelist
cat > whitelist-config.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: whitelist-config
data:
  whitelist.conf: |
    geo $whitelist {
      default 0;
      10.0.0.0/8 1;      # Internal
      172.16.0.0/12 1;   # Internal
      192.168.0.0/16 1;  # Internal
      # Clienti VIP
      203.0.113.0/24 1;
    }
    
    map $whitelist $limit_key {
      0 $binary_remote_addr;
      1 "";
    }
    
    limit_req_zone $limit_key zone=ip_limit:10m rate=100r/s;
EOF

# Applica
kubectl apply -f whitelist-config.yaml
```

**ME**: Whitelist configurata. IP interni e clienti VIP non hanno limiti.

**TL**: E GLI ALTRI?!

**ME**: Gli altri hanno 100 req/s. Con burst a 200.

**TL**: E SE QUALCUNO ABUSA?!

**ME**: Allora... lo banniamo. Come il bot di ieri.

**TL**: E SE CAMBIA IP?!

**ME**: Allora... usiamo fingerprinting. E behavior analysis.

**TL**: E SE È ABBASTANZA SMART DA BYPASSARE TUTTO?!

**ME**: Allora... siamo fottuti. Ma almeno ci abbiamo provato.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Rate limiting: attivo
- Whitelist: configurata
- Limiti: 100 req/s per IP
- Burst: 200

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il rate limiting è essenziale. E che i bot esistono. E che la difesa a strati è l'unica difesa. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio. Per vedere quando un server riceve troppo traffico.

**TERMINALE**:
```
# Configura alert per load imbalance
cat > /etc/prometheus/alerts/load-balance.yml << 'EOF'
groups:
  - name: load-balance
    rules:
      - alert: LoadBalancerSkewed
        expr: |
          max by (service) (rate(http_requests_total[5m])) 
          / 
          min by (service) (rate(http_requests_total[5m])) 
          > 3
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Load balancer for {{ $labels.service }} is skewed"
          description: "One server is receiving >3x traffic than another. Check load balancer configuration."

      - alert: ServerOverloaded
        expr: |
          max by (pod) (rate(http_requests_total[5m])) > 5000
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Server {{ $labels.pod }} is receiving excessive traffic"
          description: "Server {{ $labels.pod }} is receiving {{ $value }} req/s. Check for bots or load balancer misconfiguration."

      - alert: IPHashDetected
        expr: |
          count by (service) (
            sum by (pod) (rate(http_requests_total[5m])) > 1000
            and
            sum by (pod) (rate(http_requests_total[5m])) < 100
          ) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Possible IP hash misconfiguration for {{ $labels.service }}"
          description: "Traffic distribution suggests IP hash may be in use. Consider least_conn or round_robin."
EOF

# Aggiungi metriche
cat > src/lib/load-balance-metrics.js << 'EOF'
const prometheus = require('prom-client');

const requestRate = new prometheus.Gauge({
  name: 'http_request_rate',
  help: 'HTTP request rate per second',
  labelNames: ['pod', 'service'],
});

const connectionCount = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Active connections per pod',
  labelNames: ['pod', 'service'],
});

const loadBalanceRatio = new prometheus.Gauge({
  name: 'load_balance_ratio',
  help: 'Ratio of max to min request rate (1 = perfect balance)',
  labelNames: ['service'],
});

module.exports = { requestRate, connectionCount, loadBalanceRatio };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per load imbalance. Alert per server sovraccarichi. Alert per IP hash sospetto.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando il load balancer ha un preferito.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Load balancer: least_conn
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che l'IP hash è pericoloso. Amen.

---

**Venerdì - L'Educazione**

Venerdì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il load balancer?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che l'IP hash è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: l'IP hash è pericoloso.

**JN**: Pericoloso?

**ME**: Sì. Perché manda tutto il traffico di un IP allo stesso server. E se quel IP è un bot, il server muore.

**JN**: Ok.

**ME**: Secondo: usa least_conn o round_robin.

**JN**: Sempre?

**ME**: Quasi sempre. A meno che tu non abbia un motivo valido per IP hash. E il motivo "persistenza sessioni" non è valido. Perché esistono le session sticky via cookie.

**JN**: Ok.

**ME**: Terzo: aggiungi sempre rate limiting.

**JN**: Sempre?

**ME**: Sempre. I bot esistono. E fanno 10.000 richieste al secondo. E se non hai rate limiting, uccidono i tuoi server.

**JN**: Ok.

**ME**: Quarto: monitora la distribuzione del carico.

**JN**: Come?

**ME**: Con alert. Che ti dicono quando un server riceve 3x il traffico degli altri. O quando un server riceve più di 5000 req/s.

**JN**: Ok.

**ME**: Quinto: pensa ai casi peggiori.

**JN**: Cioè?

**ME**: Cioè: cosa succede se un bot fa 10.000 richieste? Cosa succede se un IP è compromesso? Cosa succede se il load balancer ha un preferito?

**JN**: E se non lo so?

**ME**: Allimenti chiedi. A me. Al TL. A qualcuno. Ma non configurare cose che non capisci.

**JN**: E se penso di capire?

**ME**: Allora... testi. E vedi se funziona. E se non funziona, fixi. E documenti. E impari.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Load balancer: least_conn
- Rate limiting: attivo
- Monitoraggio: attivo
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere controlli. E processi. E educazione. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero usato l'IP hash.

```markdown
## Incident #LB-001: Il Load Balancer Che Aveva Un Preferito

**Data incident**: Lunedì 27 marzo 2027, 10:00
**Autore**: JN
**Servizio**: API Gateway
**Problema**: Load balancer con IP hash mandava tutto il traffico a un server
**Causa**: IP hash configurato per persistenza sessioni
**Tempo in produzione**: 3 mesi
**Server affetto**: api-server-3
**Richieste al server affetto**: 9847/s
**Richieste agli altri server**: 20/s
**CPU server affetto**: 95%
**Connessioni server affetto**: 4521
**Connessioni altri server**: 3-5
**Bot responsabile**: 192.168.1.100 (fake Googlebot)
**Richieste del bot**: 35 milioni/ora
**Tempo di risoluzione**: 1 ora
**Downtime**: 0 (servizio degradato)
**Reazione UL**: "10.000 richieste?!"
**Reazione TL**: "Un preferito?!"
**Reazione CTO**: "Least_conn + rate limiting."
**Soluzione**: least_conn + rate limiting + monitoraggio
**Lezione imparata**: L'IP HASH È PERICOLOSO. USA LEAST_CONN O ROUND_ROBIN.

**Regole per il load balancing**:
1. NON usare IP hash a meno che tu non abbia un motivo valido.
2. Usa least_conn o round_robin per distribuire il carico.
3. Aggiungi SEMPRE rate limiting. I bot esistono.
4. Monitora la distribuzione del carico. Alert se sbilanciato.
5. Usa session sticky via cookie, non via IP hash.
6. Whitelist gli IP legittimi che hanno bisogno di più richieste.
7. Blocca i bot al firewall. E aggiungi CAPTCHA se necessario.
8. Pensa ai casi peggiori: cosa succede se un bot fa 10.000 req/s? Amen.

**Come configurare least_conn**:
```nginx
upstream api_servers {
  least_conn;
  server api-server-1:8080 weight=1;
  server api-server-2:8080 weight=1;
  server api-server-3:8080 weight=1;
  keepalive 32;
}
```

**Come configurare rate limiting**:
```nginx
limit_req_zone $binary_remote_addr zone=ip_limit:10m rate=100r/s;

server {
  location /api/ {
    limit_req zone=ip_limit burst=200 nodelay;
    proxy_pass http://api_servers;
  }
}
```

**Come configurare alert per load imbalance**:
```yaml
groups:
  - name: load-balance
    rules:
      - alert: LoadBalancerSkewed
        expr: |
          max(rate(http_requests_total[5m])) / min(rate(http_requests_total[5m])) > 3
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Load balancer is skewed"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che l'IP hash è pericoloso. E che i bot esistono. E che il rate limiting è essenziale. E che il monitoraggio salva. E che JN va educato. E che un server che riceve 9847 req/s mentre gli altri ne ricevono 20 è un problema. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: il load balancer è come un genitore. Se ha un preferito, gli altri soffrono. E il preferito muore sotto il peso delle aspettative. E quando il preferito muore, tutti se ne accorgono. E UL chiama. E tu rispondi. E dici: "Il load balancer aveva un preferito." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN ha configurato l'IP hash." E UL dice: "E COS'È L'IP HASH?!" E tu dici: "Un algoritmo che manda sempre lo stesso IP allo stesso server." E UL dice: "E SE QUEL SERVER MUORE?!" E tu dici: "Allora... il traffico va agli altri." E UL dice: "E SE GLI ALTRI SONO VUOTI?!" E tu dici: "Allimenti... sprechi risorse." E UL dice: "E QUANTO COSTA SPRECARE RISORSE?!" E tu dici: "Niente. Ma costa quando il server preferito muore." E la verità è che l'IP hash sembra una buona idea. Per la persistenza delle sessioni. Ma è una trappola. Perché i bot esistono. E i bot fanno 10.000 richieste al secondo. E se il bot va sempre allo stesso server, quel server muore. E gli altri vivono. Inutili. E la prossima volta, usi least_conn. E rate limiting. E monitoraggio. E JN impara. Amen.

---

## Il costo del load balancer con un preferito

| Voce | Valore |
|------|--------|
| Servizio | API Gateway |
| Autore | JN |
| Data configurazione | Dicembre 2026 |
| Data incident | 27/03/2027, 10:00 |
| Tempo in produzione | 3 mesi |
| Algoritmo | IP hash |
| Server preferito | api-server-3 |
| Richieste al preferito | 9847/s |
| Richieste agli altri | 20/s |
| CPU preferito | 95% |
| Connessioni preferito | 4521 |
| Connessioni altri | 3-5 |
| Bot responsabile | 192.168.1.100 |
| Richieste del bot | 35 milioni/ora |
| Tempo di risoluzione | 1 ora |
| Downtime | 0 (degradato) |
| Reazione UL | "10.000 richieste?!" |
| Reazione TL | "Un preferito?!" |
| Reazione CTO | "Least_conn + rate limiting." |
| Soluzione | least_conn + rate limiting + monitoraggio |
| Lezione imparata | IP HASH = PERICOLOSO |
| **Totale** | **1 server quasi morto + 2 server inutili + 1 bot bloccato + 1 junior educato** |

**Morale**: Il load balancer deve distribuire il carico. Equamente. Tra tutti i server. Se ha un preferito, il preferito muore. E gli altri vivono. Inutili. E quando il preferito muore, UL chiama. E tu rispondi. E dici: "Il load balancer aveva un preferito." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN ha configurato l'IP hash." E UL dice: "E COS'È L'IP HASH?!" E tu dici: "Un algoritmo che manda sempre lo stesso IP allo stesso server." E UL dice: "E SEMBRA UNA BUONA IDEA?!" E tu dici: "Per la persistenza delle sessioni, sì." E UL dice: "E I BOT?!" E tu dici: "I bot... non ci avevamo pensato." E UL dice: "E QUANTO È COSTATO NON PENSAARE AI BOT?!" E tu dici: "Un server al 95% di CPU. E 35 milioni di richieste in un'ora. E un bot che si spacciava per Google." E la verità è che tutti pensano alle funzionalità. Ma nessuno pensa ai casi peggiori. E i casi peggiori succedono. Sempre. E quando succedono, impari. Impari che l'IP hash è pericoloso. E che i bot esistono. E che il rate limiting è essenziale. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](109-la-queue-che-ha-perso-i-messaggi.md) | [Prossima](111-la-cache-che-non-invalidava-mai.md)**
