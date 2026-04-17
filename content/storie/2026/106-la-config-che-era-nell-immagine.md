# La Config Che Era Nell'Immagine

**Data**: 27/02/2027

**[Storie 2026](index.md) | [Precedente](105-il-timeout-che-era-zero.md) | [Prossima](107-il-load-balancer-che-non-bilanciava.md)**

---

C'è una verità nel containerizzazione che tutti conoscono ma nessuno rispetta: la configurazione non va mai nell'immagine. Mai. Per nessun motivo. In nessun caso. MAI. E quando la configurazione finisce nell'immagine Docker, succede quello che deve succedere: l'immagine funziona in un ambiente. E in un solo ambiente. E quando la deployi altrove, non funziona. E tu ti chiedi: "Com'è possibile che non funzioni?" E la risposta è semplice: perché l'URL del database è hardcoded nell'immagine. E l'URL del database di staging non è quello di produzione. E l'URL del database di produzione non è quello di disaster recovery. E tu devi ricostruire l'immagine per ogni ambiente. E ogni ricostruzione richiede tempo. E il tempo è denaro. E il denaro è quello che UL non vuole spendere. E tu rispondi. E dici: "La configurazione era nell'immagine." E UL dice: "E PERCHÉ ERA NELL'IMMAGINE?!" E tu dici: "Per comodità." E UL dice: "COMODITÀ?!" E la verità è che tutti vogliono comodità. Ma la comodità costa. E costa cara. Amen.

![](../../img/server.jpg)

---

**Lunedì - Il Deploy**

Era lunedì. Le 10:00. JN aveva finito la nuova versione del payment service.

**JN**: Ho finito! È tutto pronto per il deploy.

**ME**: Fammi vedere il Dockerfile.

**JN**: È semplice. Ho messo tutto nell'immagine.

**ME**: Tutto?

**JN**: Sì. Configurazione, certificati, tutto.

**ME**: E LA CONFIGURAZIONE?!

**JN**: Sì. Nel file config.json.

**ME**: E DOVE STA?!

**JN**: Nell'immagine. Così non devo configurare nulla.

**ME**: JN, la configurazione non va nell'immagine.

**JN**: Ma è più comodo!

**ME**: E SE DEVO CAMBIARE L'URL DEL DATABASE?!

**JN**: Ricostruisci l'immagine.

**ME**: E QUANTO CI VUOLE?!

**JN**: 5 minuti.

**ME**: E SE È UN'EMERGENZA?!

**JN**: Allora... 5 minuti.

**ME**: E SE IL DATABASE È DOWN E DEVO PUNTARE AL BACKUP?!

**JN**: Allora... 5 minuti.

**ME**: E IN 5 MINUTI QUANTI ORDINI PERSI?!

**JN**: Non lo so.

**ME**: TANTI. TROPPI.

**JN**: Ma è più comodo!

**ME**: E LA SICUREZZA?!

**JN**: La configurazione è sicura. È nell'immagine.

**ME**: E SE QUALCUNO ACCEDE ALL'IMMAGINE?!

**JN**: Non possono. È nel registry privato.

**ME**: E SE QUALCUNO FA PULL DELL'IMMAGINE?!

**JN**: Non possono. È privato.

**ME**: JN, le immagini si possono ispezionare. E i secret si possono estrarre.

**JN**: Ma... non succede!

**ME**: Succede. Sempre.

**JN**: Va bene, la rimuovo.

**ME**: E usa le environment variables. O i ConfigMap. O i Secret.

**JN**: Ok.

JN ha fatto il deploy. Alle 10:15. Di lunedì. E io ho pensato: "Almeno l'ha rimossa." Ma non sapevo che il danno era già fatto. Perché la configurazione era nell'immagine. E l'immagine era stata pushata. E il deploy era partito. E il payment service puntava al database di staging. In produzione. Amen.

---

**Lunedì - 10:30**

Il deploy è andato. Il sistema sembrava ok. Poi sono arrivati gli errori.

**ALERT**: Payment service connection refused to database

**ME**: Connessione rifiutata?!

**TL**: Rifiutata?!

**ME**: Sì. Il payment service non riesce a connettersi al database.

**TL**: E PERCHÉ?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=payment-service --since=10m | grep -i error | tail -20
2027-02-27 10:20:01 ERROR: Connection refused to staging-db.internal:5432
2027-02-27 10:20:01 ERROR: Cannot connect to database
2027-02-27 10:20:02 ERROR: Connection refused to staging-db.internal:5432
2027-02-27 10:20:02 ERROR: Cannot connect to database
...

# Controlla configurazione
kubectl exec -it payment-service-abc123 -- cat /app/config.json
{
  "database": {
    "host": "staging-db.internal",
    "port": 5432,
    "name": "payment_staging"
  },
  "redis": {
    "host": "staging-redis.internal",
    "port": 6379
  },
  "api": {
    "paymentGateway": "https://staging-gateway.example.com"
  }
}

# Controlla database di produzione
kubectl get configmap payment-config -o yaml
apiVersion: v1
data:
  DATABASE_HOST: "prod-db.internal"
  DATABASE_PORT: "5432"
  DATABASE_NAME: "payment_prod"
```

**ME**: La configurazione nell'immagine punta a staging. Ma siamo in produzione.

**TL**: STAGING?!

**ME**: Sì. L'URL del database è staging-db.internal. Ma siamo in produzione.

**TL**: E QUINDI?!

**ME**: E quindi il payment service cerca di connettersi al database di staging. Da produzione.

**TL**: E IL DATABASE DI STAGING?!

**ME**: Non è accessibile da produzione. La rete è isolata.

**TL**: E QUINDI?!

**ME**: E quindi... niente pagamenti.

**TL**: E I CLIENTI?!

**ME**: Non possono pagare.

**TL**: E QUANTI ORDINI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla ordini in attesa
kubectl exec -it prod-db-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE status = 'pending_payment' AND created_at > '2027-02-27 10:00:00'"
count
-------
2345

# Controlla pagamenti completati
kubectl exec -it prod-db-0 -- psql -U orders -c "SELECT COUNT(*) FROM payments WHERE created_at > '2027-02-27 10:00:00' AND status = 'completed'"
count
-------
0
```

**ME**: 2345 ordini in attesa. Zero pagamenti completati.

**TL**: ZERO?!

**ME**: Zero. Il payment service non funziona.

**TL**: E QUINDI?!

**ME**: E quindi... ricostruiamo l'immagine. Con la configurazione giusta.

**TL**: E QUANTO CI VUOLE?!

**ME**: 5 minuti. Come diceva JN.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Database: staging-db.internal
- Ambiente: produzione
- Pagamenti: zero
- Ordini in attesa: 2345

E tutto era chiaro. La configurazione era nell'immagine. E l'immagine puntava a staging. E staging non era accessibile da produzione. E i pagamenti non funzionavano. Amen.

---

**Lunedì - 11:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava prendendo un caffè.

**ME**: JN, la configurazione nell'immagine punta a staging.

**JN**: Staging?!

**ME**: Sì. E siamo in produzione.

**JN**: Ah. Non avevo pensato a quello.

**ME**: NON AVEVI PENSATO?!

**JN**: No. Ho usato la configurazione che avevo in locale.

**ME**: E IN LOCALE COS'AVEVI?!

**JN**: Staging. Per i test.

**ME**: E L'HAI MESSA NELL'IMMAGINE?!

**JN**: Sì. Per comodità.

**ME**: E ORA IN PRODUZIONE NON FUNZIONA!

**JN**: Ma... ricostruisco l'immagine!

**ME**: E QUANTO CI VUOLE?!

**JN**: 5 minuti.

**ME**: E IN 5 MINUTI QUANTI ORDINI PERSI?!

**JN**: Non lo so.

**ME**: TANTI. E LA PROSSIMA VOLTA?!

**JN**: Uso le environment variables.

**ME**: ESATTO. E I CONFIGMAP. E I SECRET. MAI L'IMMAGINE.

**JN**: Ok.

**ME**: E ORA FIXA!

**JN**: Ok.

JN ha riattaccato. O forse è scappato a ricostruire. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Immagine: payment:v2.3.1
- Configurazione: staging
- Ambiente: produzione
- JN: a fixare

E la lezione era chiara. La configurazione non va nell'immagine. E JN non impara. Amen.

---

**Lunedì - 11:30**

Ho fixato la configurazione. E ricostruito l'immagine. E fatto il deploy.

**TERMINALE**:
```
# Rimuovi configurazione dall'immagine
cat > Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
# NESSUNA CONFIGURAZIONE HARDCODED
EXPOSE 8080
CMD ["node", "src/index.js"]
EOF

# Aggiungi configurazione via ConfigMap
cat > k8s/payment-configmap.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: payment-config
data:
  DATABASE_HOST: "prod-db.internal"
  DATABASE_PORT: "5432"
  DATABASE_NAME: "payment_prod"
  REDIS_HOST: "prod-redis.internal"
  REDIS_PORT: "6379"
  PAYMENT_GATEWAY_URL: "https://prod-gateway.example.com"
EOF

# Aggiungi secret per le credenziali
cat > k8s/payment-secret.yaml << 'EOF'
apiVersion: v1
kind: Secret
metadata:
  name: payment-secret
type: Opaque
stringData:
  DATABASE_USER: "payment_user"
  DATABASE_PASSWORD: "super-secret-password-$(date +%s)"
  PAYMENT_GATEWAY_KEY: "pk_live_xxxxx"
EOF

# Aggiorna deployment per usare ConfigMap e Secret
cat > k8s/payment-deployment.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
spec:
  template:
    spec:
      containers:
        - name: payment
          image: registry.company.com/payment:v2.3.2
          envFrom:
            - configMapRef:
                name: payment-config
            - secretRef:
                name: payment-secret
          env:
            - name: NODE_ENV
              value: "production"
EOF

# Applica configurazione
kubectl apply -f k8s/payment-configmap.yaml
kubectl apply -f k8s/payment-secret.yaml
kubectl apply -f k8s/payment-deployment.yaml

# Ricostruisci e pusha immagine
docker build -t registry.company.com/payment:v2.3.2 .
docker push registry.company.com/payment:v2.3.2

# Verifica deploy
kubectl rollout status deployment/payment-service
deployment "payment-service" successfully rolled out
```

**ME**: Immagine ricostruita. Configurazione via ConfigMap. Deploy completato.

**TL**: E FUNZIONA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=payment-service --since=5m | grep -i error | wc -l
0

# Controlla connessione database
kubectl exec -it payment-service-abc123 -- env | grep DATABASE
DATABASE_HOST=prod-db.internal
DATABASE_PORT=5432
DATABASE_NAME=payment_prod

# Test pagamento
curl -X POST https://api.company.com/payment -d '{"amount": 100, "currency": "EUR"}'
{"status": "success", "payment_id": "pay_123456"}

# Controlla pagamenti
kubectl exec -it prod-db-0 -- psql -U orders -c "SELECT COUNT(*) FROM payments WHERE created_at > '2027-02-27 11:30:00' AND status = 'completed'"
count
-------
567
```

**ME**: Zero errori. 567 pagamenti completati.

**TL**: E GLI ORDINI IN ATTESA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla ordini in attesa
kubectl exec -it prod-db-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE status = 'pending_payment' AND created_at > '2027-02-27 10:00:00'"
count
-------
123

# Controlla ordini completati
kubectl exec -it prod-db-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE status = 'completed' AND created_at > '2027-02-27 11:30:00'"
count
-------
456
```

**ME**: 123 ordini ancora in attesa. 456 completati.

**TL**: E GLI ALTRI?!

**ME**: Gli altri... sono persi. O i clienti hanno rinunciato.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Pagamenti: funzionanti
- Ordini persi: ~1800
- Configurazione: corretta
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che la configurazione non va nell'immagine. E che JN va educato. Amen.

---

**Lunedì - 12:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era a pranzo.

**UL**: Pronto?

**ME**: Abbiamo avuto un problema con il payment service.

**UL**: Che problema?

**ME**: La configurazione era hardcoded nell'immagine. Puntava a staging.

**UL**: STAGING?!

**ME**: Sì. E siamo in produzione.

**UL**: E QUINDI?!

**ME**: E quindi il payment service non funzionava. Per 1 ora.

**UL**: 1 ORA?!

**ME**: Sì. Il tempo di capire il problema. E ricostruire l'immagine.

**UL**: E QUANTI ORDINI PERSI?!

**ME**: Circa 1800. I clienti non potevano pagare.

**UL**: 1800 ORDINI?!

**ME**: Sì. Ma ora funziona. E la configurazione è via ConfigMap.

**UL**: E CHI HA MESSO LA CONFIG NELL'IMMAGINE?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. Per comodità.

**UL**: COMODITÀ?!

**ME**: Sì. Per non dover configurare nulla.

**UL**: E QUANTO È COSTATA LA COMODITÀ?!

**ME**: 1800 ordini. E 1 ora di downtime.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho aggiunto controlli. E documentazione.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. La configurazione non va nell'immagine. E JN va educato. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutte le immagini. Per trovare altra configurazione hardcoded.

**TERMINALE**:
```
# Scansiona tutte le immagini
for image in $(kubectl get deployments -o jsonpath='{.items[*].spec.template.spec.containers[*].image}' | tr ' ' '\n' | sort -u); do
  echo "=== $image ==="
  docker pull $image
  docker run --rm $image find /app -name "*.json" -o -name "*.yaml" -o -name "*.env" 2>/dev/null
done

# Risultati
=== registry.company.com/payment:v2.3.1 ===
/app/config.json  # CONTIENE CONFIG STAGING
/app/.env         # CONTIENE SECRET

=== registry.company.com/user:v1.5.0 ===
/app/config.json  # CONTIENE URL DATABASE
/app/cert.pem     # CONTIENE CERTIFICATO

=== registry.company.com/notification:v2.1.0 ===
/app/config.yaml  # CONTIENE URL SMTP
/app/.env         # CONTIENE PASSWORD SMTP

=== registry.company.com/analytics:v1.0.0 ===
/app/config.json  # CONTIENE API KEY
/app/.env         # CONTIENE SECRET

# Conta immagini con configurazione hardcoded
Found 4 images with hardcoded configuration
```

**ME**: 4 immagini con configurazione hardcoded.

**TL**: 4?!

**ME**: Sì. Payment, user, notification, analytics.

**TL**: E COSA CONTENGONO?!

**ME**: URL database, certificati, password, API key.

**TL**: E SONO IN PRODUZIONE?!

**ME**: Sì.

**TL**: E POSSONO ROMPERSI?!

**ME**: Sì. In qualsiasi momento.

**TL**: E FIXALE!

**ME**: Subito.

**TERMINALE**:
```
# Fix user service
cat > services/user/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
# CONFIG VIA ENVIRONMENT VARIABLES
EXPOSE 8080
CMD ["node", "src/index.js"]
EOF

# Fix notification service
cat > services/notification/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
# CONFIG VIA ENVIRONMENT VARIABLES
EXPOSE 8080
CMD ["node", "src/index.js"]
EOF

# Fix analytics service
cat > services/analytics/Dockerfile << 'EOF'
FROM python:3.11-alpine
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src ./src
# CONFIG VIA ENVIRONMENT VARIABLES
EXPOSE 8080
CMD ["python", "src/main.py"]
EOF

# Ricostruisci tutte le immagini
docker build -t registry.company.com/user:v1.5.1 services/user
docker build -t registry.company.com/notification:v2.1.1 services/notification
docker build -t registry.company.com/analytics:v1.0.1 services/analytics

# Pusha immagini
docker push registry.company.com/user:v1.5.1
docker push registry.company.com/notification:v2.1.1
docker push registry.company.com/analytics:v1.0.1

# Aggiorna deployment
kubectl set image deployment/user-service user=registry.company.com/user:v1.5.1
kubectl set image deployment/notification-service notification=registry.company.com/notification:v2.1.1
kubectl set image deployment/analytics-service analytics=registry.company.com/analytics:v1.0.1
```

**ME**: Tutte le immagini fixate. Configurazione via environment variables.

**TL**: E I SECRET?!

**ME**: Li ho rimossi dalle immagini. E messi nei Kubernetes Secret.

**TL**: E I CERTIFICATI?!

**ME**: Stesso. Ora sono montati come volume.

**TL**: E QUINDI?!

**ME**: E quindi... la prossima volta non succede.

**TL**: E SE QUALCUNO RIMETTE LA CONFIG NELL'IMMAGINE?!

**ME**: Allora... lo scanner lo trova. E il deploy fallisce.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Immagini fixate: 4
- Configurazione: environment variables
- Secret: Kubernetes Secret
- Certificati: volumi

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti mettono la configurazione nelle immagini. E che tutti devono imparare. Amen.

---

**Mercoledì - La Prevenzione**

Mercoledì. Ho aggiunto scanner e controlli. Per prevenire configurazione hardcoded.

**TERMINALE**:
```
# Aggiungi Dockerfile linter
cat > .dockerfile-linter.yaml << 'EOF'
rules:
  - id: hardcoded-config
    description: "Check for hardcoded configuration files"
    pattern: "COPY *.json *.yaml *.env /app/"
    severity: error
    message: "Configuration files should not be copied into the image. Use ConfigMap or environment variables."

  - id: hardcoded-secret
    description: "Check for hardcoded secrets"
    pattern: "COPY *.pem *.key *.crt /app/"
    severity: error
    message: "Secrets should not be copied into the image. Use Kubernetes Secrets."

  - id: env-file
    description: "Check for .env files"
    pattern: "COPY .env /app/"
    severity: error
    message: ".env files should not be copied into the image. Use environment variables or Secrets."
EOF

# Aggiungi GitHub Action per scansionare Dockerfile
cat > .github/workflows/dockerfile-scan.yml << 'EOF'
name: Dockerfile Scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Scan Dockerfiles
        run: |
          for dockerfile in $(find . -name "Dockerfile*"); do
            echo "Scanning $dockerfile..."
            # Check for hardcoded config
            if grep -E "COPY.*\.(json|yaml|yml|env)" "$dockerfile"; then
              echo "ERROR: Hardcoded configuration found in $dockerfile"
              exit 1
            fi
            # Check for hardcoded secrets
            if grep -E "COPY.*\.(pem|key|crt)" "$dockerfile"; then
              echo "ERROR: Hardcoded secrets found in $dockerfile"
              exit 1
            fi
          done
      - name: Scan images for secrets
        run: |
          docker build -t scan-target .
          docker run --rm scan-target find /app -name "*.env" -o -name "config.json" -o -name "*.pem" | while read file; do
            echo "WARNING: Found $file in image"
          done
EOF

# Aggiungi pre-commit hook
cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: local
    hooks:
      - id: dockerfile-lint
        name: Dockerfile lint
        entry: bash -c 'for f in $(find . -name "Dockerfile*"); do grep -E "COPY.*\.(json|yaml|yml|env|pem|key|crt)" "$f" && exit 1 || true; done'
        language: system
        files: Dockerfile.*
EOF

# Installa pre-commit
pre-commit install
```

**TL**: Hai aggiunto i controlli?

**ME**: Sì. Dockerfile linter. GitHub Action. E pre-commit hook.

**TL**: E SE QUALCUNO COMMITTA UN DOCKERFILE CON CONFIG?!

**ME**: Il pre-commit lo blocca. E la GitHub Action fallisce.

**TL**: E SE LO BYPASSA?!

**ME**: Allora... lo scanner trova la configurazione nell'immagine. E notifica.

**TL**: E SE LO IGNORANO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Linter: attivo
- GitHub Action: configurata
- Pre-commit: installato
- Scanner: automatico

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i controlli sono essenziali. E che la prevenzione è meglio del fix. E che JN va educato. Amen.

---

**Giovedì - L'Educazione**

Giovedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per la configurazione nell'immagine?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che la configurazione hardcoded è stata un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: la configurazione non va mai nell'immagine.

**JN**: Mai?

**ME**: Mai. Nemmeno per test. Nemmeno per comodità. Nemmeno per 5 minuti.

**JN**: Ok.

**ME**: Secondo: usa le environment variables per la configurazione.

**JN**: Sempre?

**ME**: Sempre. O i ConfigMap. O i Secret. Ma mai l'immagine.

**JN**: Ok.

**ME**: Terzo: i secret vanno nei Kubernetes Secret. Non nell'immagine.

**JN**: E se non uso Kubernetes?

**ME**: Allora usa HashiCorp Vault. O AWS Secrets Manager. O Azure Key Vault. Ma non l'immagine.

**JN**: Ok.

**ME**: Quarto: i certificati vanno montati come volumi. Non copiati nell'immagine.

**JN**: E perché?

**ME**: Perché i certificati scadono. E quando scadono, devi ruotarli. E se sono nell'immagine, devi ricostruire. E se devi ricostruire, perdi tempo. E il tempo è denaro.

**JN**: Ok.

**ME**: Quinto: un'immagine deve essere immutabile e portabile.

**JN**: Cioè?

**ME**: Cioè la stessa immagine deve funzionare in tutti gli ambienti. Staging, produzione, disaster recovery. Senza modifiche.

**JN**: E come?

**ME**: Con la configurazione esterna. Environment variables. ConfigMap. Secret. Ma non hardcoded.

**JN**: E se ho bisogno di configurazione diversa per ambiente?

**ME**: Allimenti usi ConfigMap diversi per ambiente. O Helm values diversi. O Kustomize overlay. Ma la stessa immagine.

**JN**: Ok.

**ME**: E la prossima volta, pensa. Prima di mettere la configurazione nell'immagine, pensa a cosa succede se devi cambiarla.

**JN**: E se non so se è configurazione o codice?

**ME**: Allimenti chiedi. A me. Al TL. A qualcuno.

**JN**: E se non c'è nessuno?

**ME**: Allimenti... non committare. E aspetta.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Configurazione: esterna
- Immagini: pulite
- Secret: Kubernetes
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere controlli. E processi. E educazione. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato la configurazione.

```markdown
## Incident #CONFIG-001: La Config Che Era Nell'Immagine

**Data incident**: Lunedì 27 febbraio 2027, 10:30
**Autore**: JN
**Servizio**: payment-service
**Problema**: Configurazione hardcoded nell'immagine Docker
**Causa**: Configurazione di staging copiata nell'immagine
**Tempo di esposizione**: 1 ora
**Ordini persi**: ~1800
**Pagamenti completati**: 0 (per 1 ora)
**Tempo di risoluzione**: 1 ora
**Downtime**: 1 ora (payment service)
**Reazione UL**: "Staging?!"
**Reazione TL**: "Nell'immagine?!"
**Reazione CTO**: "Config via environment variables. Sempre."
**Soluzione**: ConfigMap + Secret + immagini pulite
**Lezione imparata**: LA CONFIGURAZIONE NON VA MAI NELL'IMMAGINE. MAI.

**Regole per la configurazione**:
1. La configurazione NON va MAI nell'immagine Docker.
2. Usa SEMPRE environment variables o ConfigMap.
3. I secret vanno nei Kubernetes Secret. O in Vault.
4. I certificati vanno montati come volumi. Non copiati.
5. Un'immagine deve essere immutabile e portabile.
6. La stessa immagine deve funzionare in tutti gli ambienti.
7. Se devi ricostruire per cambiare configurazione, è sbagliato.
8. La configurazione esterna permette cambi rapidi. E rollback rapidi. Amen.

**Come configurare correttamente**:
```dockerfile
# Dockerfile CORRETTO
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
# NESSUNA CONFIGURAZIONE HARDCODED
EXPOSE 8080
CMD ["node", "src/index.js"]
```

**Come usare ConfigMap**:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-service-config
data:
  DATABASE_HOST: "prod-db.internal"
  DATABASE_PORT: "5432"
  REDIS_HOST: "prod-redis.internal"
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: my-service
          envFrom:
            - configMapRef:
                name: my-service-config
```

**Come usare Secret**:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-service-secret
type: Opaque
stringData:
  DATABASE_PASSWORD: "super-secret"
  API_KEY: "sk_live_xxxxx"
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: my-service
          envFrom:
            - secretRef:
                name: my-service-secret
```

**Come montare certificati**:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-service-tls
type: kubernetes.io/tls
data:
  tls.crt: <base64>
  tls.key: <base64>
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: my-service
          volumeMounts:
            - name: tls
              mountPath: /etc/tls
              readOnly: true
      volumes:
        - name: tls
          secret:
            secretName: my-service-tls
```

**Come scansionare le immagini**:
```bash
# Scansiona immagine per configurazione hardcoded
docker run --rm my-image find /app -name "*.json" -o -name "*.env" -o -name "*.pem"

# Scansiona immagine per secret
docker run --rm my-image cat /app/.env

# Usa trivy per scansionare
trivy image my-image --scanners secret
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che la configurazione non va nell'immagine. E che le environment variables sono la soluzione. E che i secret vanno nei Kubernetes Secret. E che i certificati vanno montati come volumi. E che JN va educato. E che 1800 ordini persi sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: un'immagine Docker è come una scatola chiusa. Se ci metti dentro la configurazione, non puoi cambiarla senza aprirla. E per aprirla, devi ricostruirla. E per ricostruirla, ci vuole tempo. E il tempo è denaro. E il denaro è quello che UL non vuole spendere. E tu rispondi. E dici: "La configurazione era nell'immagine." E UL dice: "E PERCHÉ ERA NELL'IMMAGINE?!" E tu dici: "Per comodità." E UL dice: "COMODITÀ?!" E tu dici: "Sì. Per non dover configurare nulla." E UL dice: "E QUANTO È COSTATA LA COMODITÀ?!" E tu dici: "1800 ordini. E 1 ora di downtime." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che la comodità costa. Sempre. E costa cara. E la prossima volta, usi le environment variables. O i ConfigMap. O i Secret. Ma non l'immagine. Mai. Amen.

---

## Il costo della configurazione nell'immagine

| Voce | Valore |
|------|--------|
| Servizio | payment-service |
| Autore | JN |
| Data deploy | 27/02/2027, 10:15 |
| Data incident | 27/02/2027, 10:30 |
| Tempo di esposizione | 1 ora |
| Ordini persi | ~1800 |
| Pagamenti completati | 0 (per 1 ora) |
| Tempo di risoluzione | 1 ora |
| Downtime | 1 ora |
| Immagini con config hardcoded | 4 |
| Servizi affetti | payment, user, notification, analytics |
| Reazione UL | "Staging?!" |
| Reazione TL | "Nell'immagine?!" |
| Reazione CTO | "Config via env vars." |
| Soluzione | ConfigMap + Secret + immagini pulite |
| Lezione imparata | CONFIG = ESTERNA ALL'IMMAGINE |
| **Totale** | **~1800 ordini persi + 4 immagini fixate + 1 junior educato** |

**Morale**: La configurazione non va mai nell'immagine Docker. Mai. Per nessun motivo. In nessun caso. MAI. E se ci metti la configurazione, l'immagine funziona in un solo ambiente. E quando la deployi altrove, non funziona. E i clienti non possono pagare. E UL chiama. E tu rispondi. E dici: "La configurazione era nell'immagine." E UL dice: "E PERCHÉ ERA NELL'IMMAGINE?!" E tu dici: "Per comodità." E UL dice: "COMODITÀ?!" E tu dici: "Sì. Per non dover configurare nulla." E UL dice: "E QUANTO È COSTATA LA COMODITÀ?!" E tu dici: "1800 ordini. E 1 ora di downtime." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che la comodità costa. Sempre. E la prossima volta, usi le environment variables. O i ConfigMap. O i Secret. Ma non l'immagine. Mai. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](105-il-timeout-che-era-zero.md) | [Prossima](107-il-load-balancer-che-non-bilanciava.md)**
