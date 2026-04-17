# Il Container Che Non Si Fermava Mai

**Data**: 01/05/2026

**[Storie 2026](index.md) | [Precedente](114-il-processo-zombie-che-mangiava-la-cpu.md) | [Prossima](116-la-cache-che-ha-restituito-i-dati-vecchi.md)**

---

C'è una verità universale nel mondo dei container: docker stop funziona sempre. Sempre. E se non funziona, c'è docker kill. E se non funziona nemmeno quello, c'è docker rm -f. E se non funziona nulla, allora... allora sei fottuto. E il container continua a girare. E gira. E gira. E non si ferma mai. E tu guardi i log. E i log scorrono. E tu guardi la CPU. E la CPU sale. E tu guardi JN. E JN guarda te. E tu dici: "Chi ha scritto questo Dockerfile?" E JN dice: "Io." E tu dici: "E perché non ha ENTRYPOINT?" E JN dice: "Perché... non ci ho pensato." E la lezione è chiara: i container vanno scritti bene. Sempre. Amen.

![](../../img/docker.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 08:00. Il caffè era pronto. I container giravano.

Poi è arrivato l'alert.

**PROMETHEUS**: Container memory > 90% su payment-service-01

**ME**: Memoria al 90%?!

**TL**: Memoria al 90%?!

**ME**: Sì. Guarda.

**TERMINALE**:
```
# SSH sul server
ssh payment-service-01

# Controlla container
docker ps
CONTAINER ID   IMAGE          COMMAND                  STATUS          NAMES
a1b2c3d4e5f6   payment:v2.3   "node server.js"         Up 47 days      payment-api
f6e5d4c3b2a1   redis:7        "redis-server"           Up 47 days      payment-redis

# Controlla memoria
docker stats --no-stream
CONTAINER ID   NAME            CPU %   MEM USAGE / LIMIT     MEM %
a1b2c3d4e5f6   payment-api     45.2%   1.8GiB / 2GiB         90.0%
f6e5d4c3b2a1   payment-redis   2.1%    256MiB / 512MiB       50.0%

# Controlla log
docker logs --tail 50 payment-api
[08:00:01] Processing payment...
[08:00:02] Processing payment...
[08:00:03] Processing payment...
[08:00:04] Processing payment...
[08:00:05] Processing payment...
... (stesso messaggio, 50 volte)
```

**ME**: Il container sta processando pagamenti. Ma la memoria è al 90%.

**TL**: E QUINDI?!

**ME**: Quindi... c'è un memory leak. O qualcosa che non va.

**TL**: E COSA?!

**ME**: Controllo il codice.

**TERMINALE**:
```
# Controlla il codice del container
docker exec payment-api cat /app/server.js
const express = require('express');
const app = express();

// Array per tenere traccia dei pagamenti
const payments = [];

app.post('/payment', (req, res) => {
  const payment = { id: Date.now(), ...req.body };
  payments.push(payment);  // <-- QUI!
  console.log('Processing payment...');
  res.json({ status: 'ok' });
});

app.listen(3000);
```

**ME**: Il codice salva tutti i pagamenti in un array. In memoria. Senza mai svuotarlo.

**TL**: SENZA MAI SVUOTARLO?!

**ME**: Sì. Ogni pagamento viene aggiunto all'array. E l'array cresce. E cresce. E consuma memoria.

**TL**: E QUANTI PAGAMENTI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla dimensione array
docker exec payment-api node -e "console.log(payments.length)"
ReferenceError: payments is not defined

# Ok, non posso accedere direttamente. Conto i log.
docker logs payment-api 2>&1 | grep "Processing payment" | wc -l
847293
```

**ME**: 847.293 pagamenti. In 47 giorni.

**TL**: 847MILA?!

**ME**: Sì. E ognuno occupa memoria. E la memoria è quasi finita.

**TL**: E CHI HA SCRITTO QUESTO CODICE?!

**ME**: JN.

**TL**: JN?!

**ME**: Sì. Due mesi fa. Per il servizio di pagamento.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 90%
- Pagamenti: 847.293
- Array: in memoria
- JN: responsabile

E tutto era chiaro. Il container aveva un memory leak. E il memory leak era JN. E la memoria stava per finire. Amen.

---

**Lunedì - 08:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era calmo. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto il servizio di pagamento?

**JN**: Sì. Due mesi fa. Perché?

**ME**: Sta consumando il 90% della memoria.

**JN**: 90%?!

**ME**: Sì. Perché salvi tutti i pagamenti in un array. In memoria.

**JN**: Ah. Sì. Per la dashboard.

**ME**: QUALE DASHBOARD?!

**JN**: Quella che mostra tutti i pagamenti. Per il PM.

**ME**: E QUANTI PAGAMENTI?!

**JN**: Non so. Tutti?

**ME**: 847MILA!

**JN**: 847mila?!

**ME**: Sì. E ognuno occupa memoria. E la memoria è quasi finita.

**JN**: Ma... non pensavo fossero così tanti!

**ME**: E QUINDI?!

**JN**: E quindi... devo svuotare l'array?

**ME**: NO! Devi usare un database!

**JN**: Ah.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Memoria: 90%
- Pagamenti: 847.293
- Array: in memoria
- JN: colpevole

E la lezione era chiara. Gli array in memoria non scalano. E JN va educato. Di nuovo. Amen.

---

**Lunedì - 09:00**

Ho deciso di riavviare il container. Per liberare memoria.

**TERMINALE**:
```
# Stop il container
docker stop payment-api
payment-api

# Aspetta 10 secondi
sleep 10

# Controlla se si è fermato
docker ps -a | grep payment-api
a1b2c3d4e5f6   payment:v2.3   "node server.js"   Up 10 seconds   payment-api

# Cosa?! È già up?!
docker logs --tail 20 payment-api
[09:00:15] Processing payment...
[09:00:16] Processing payment...
[09:00:17] Processing payment...
```

**ME**: Il container è ripartito. Ma non si è fermato.

**TL**: NON SI È FERMATO?!

**ME**: No. È ripartito subito.

**TL**: E PERCHÉ?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla la configurazione
docker inspect payment-api | grep -A5 "RestartPolicy"
"RestartPolicy": {
  "Name": "always",
  "MaximumRetryCount": 0
}

# Controlla docker-compose
cat docker-compose.yml
services:
  payment-api:
    image: payment:v2.3
    restart: always  # <-- QUI!
    environment:
      - NODE_ENV=production
```

**ME**: Il container ha restart: always. Quindi si riavvia sempre.

**TL**: SEMPRE?!

**ME**: Sì. Anche se lo stoppi. Si riavvia.

**TL**: E COME LO FERMI?!

**ME**: Devo usare docker rm -f. O cambiare la policy.

**TL**: E PROVA!

**TERMINALE**:
```
# Forza la rimozione
docker rm -f payment-api
payment-api

# Controlla
docker ps -a | grep payment-api
# Vuoto!

# Ma... ora il servizio non c'è più!
curl http://localhost:3000/health
curl: (7) Failed to connect to localhost port 3000

# Devo ricrearlo
docker-compose up -d payment-api
```

**ME**: Container rimosso. Ma ora devo ricrearlo.

**TL**: E LA MEMORIA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla memoria
docker stats --no-stream
CONTAINER ID   NAME            CPU %   MEM USAGE / LIMIT     MEM %
b2c3d4e5f6a7   payment-api     2.1%    128MiB / 2GiB         6.4%
f6e5d4c3b2a1   payment-redis   2.1%    256MiB / 512MiB       50.0%
```

**ME**: Memoria al 6%. Container nuovo. Array vuoto.

**TL**: E ORA?!

**ME**: Ora fixo il codice. E JN impara.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 6%
- Container: nuovo
- Array: vuoto
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i container con restart: always non si fermano mai. E che gli array in memoria non scalano. E che JN va educato. Sempre. Amen.

---

**Lunedì - 10:00**

Ho fixato il codice. E aggiunto un database.

**TERMINALE**:
```
# Fix il codice
cat > server.js << 'EOF'
const express = require('express');
const { Pool } = require('pg');
const app = express();

// Usa PostgreSQL invece di un array
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

app.post('/payment', async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO payments (data) VALUES ($1) RETURNING id',
      [JSON.stringify(req.body)]
    );
    console.log('Processing payment:', result.rows[0].id);
    res.json({ status: 'ok', id: result.rows[0].id });
  } catch (err) {
    console.error('Payment error:', err.message);
    res.status(500).json({ status: 'error' });
  }
});

app.get('/payments', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM payments ORDER BY created_at DESC LIMIT 100'
  );
  res.json(result.rows);
});

app.listen(3000);
EOF

# Crea la tabella
docker exec payment-postgres psql -U payment -d payment -c "
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
"

# Ricostruisci l'immagine
docker build -t payment:v2.4 .

# Aggiorna docker-compose
cat > docker-compose.yml << 'EOF'
services:
  payment-api:
    image: payment:v2.4
    restart: on-failure  # Cambiato da always
    environment:
      - NODE_ENV=production
      - DB_HOST=payment-postgres
      - DB_NAME=payment
      - DB_USER=payment
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      - payment-postgres

  payment-postgres:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_DB=payment
      - POSTGRES_USER=payment
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - payment-data:/var/lib/postgresql/data

volumes:
  payment-data:
EOF

# Riavvia
docker-compose up -d
```

**ME**: Codice fixato. Database aggiunto. Restart policy cambiato.

**TL**: E LA MEMORIA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla memoria
docker stats --no-stream
CONTAINER ID   NAME                CPU %   MEM USAGE / LIMIT     MEM %
c3d4e5f6a7b8   payment-api         3.2%    256MiB / 2GiB        12.8%
d4e5f6a7b8c9   payment-postgres    5.1%    512MiB / 2GiB        25.6%
```

**ME**: Memoria stabile. Database funzionante. Container sano.

**TL**: E JN?!

**ME**: JN... lo educo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 12.8%
- Database: funzionante
- Restart: on-failure
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i dati vanno salvati su database. E che gli array in memoria non scalano. E che restart: always è pericoloso. Amen.

---

**Martedì - L'Incidente**

Martedì. Il container non si fermava. Di nuovo. Ma per un altro motivo.

**TERMINALE**:
```
# Alert
**PROMETHEUS**: Container payment-api in restart loop

# Controlla
docker ps -a | grep payment-api
c3d4e5f6a7b8   payment:v2.4   "node server.js"   Restarting (1) 5 seconds ago   payment-api

# Log
docker logs --tail 50 payment-api
Error: connect ECONNREFUSED 172.18.0.5:5432
    at TCPConnectWrap.afterConnect
    ...
Error: connect ECONNREFUSED 172.18.0.5:5432
    ...
(repeat forever)
```

**ME**: Il container non riesce a connettersi al database. E si riavvia. E riprova. E fallisce. E si riavvia.

**TL**: E PERCHÉ?!

**ME**: Il database non è ancora pronto quando parte l'API.

**TL**: E COME LO FIXI?!

**ME**: Aggiungo un health check. E un wait.

**TERMINALE**:
```
# Fix docker-compose
cat > docker-compose.yml << 'EOF'
services:
  payment-api:
    image: payment:v2.4
    restart: on-failure
    environment:
      - NODE_ENV=production
      - DB_HOST=payment-postgres
      - DB_NAME=payment
      - DB_USER=payment
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      payment-postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  payment-postgres:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_DB=payment
      - POSTGRES_USER=payment
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - payment-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U payment"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  payment-data:
EOF

# Aggiungi endpoint health
cat >> server.js << 'EOF'
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
EOF

# Ricostruisci e riavvia
docker build -t payment:v2.5 .
docker-compose up -d
```

**ME**: Health check aggiunto. Il container aspetta che il database sia pronto.

**TL**: E ORA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla
docker ps
CONTAINER ID   NAME                STATUS
e5f6a7b8c9d0   payment-api         Up 2 minutes (healthy)
f6a7b8c9d0e1   payment-postgres    Up 2 minutes (healthy)

# Log
docker logs --tail 10 payment-api
Server listening on port 3000
Processing payment: 1
Processing payment: 2
Processing payment: 3
```

**ME**: Container sano. Database pronto. Pagamenti processati.

**TL**: E JN?!

**ME**: JN... impara.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Container: healthy
- Database: healthy
- Restart: stabile
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i container hanno bisogno di health check. E che le dipendenze vanno aspettate. E che restart loop sono pericolosi. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Con pazienza. E un po' di rassegnazione.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il container?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il container è stato un disastro. Ma è anche un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare. Cinque cose.

**JN**: Cinque?

**ME**: Primo: non salvare dati in memoria. Usa un database.

**JN**: Ma era per la dashboard!

**ME**: E la dashboard ha causato un memory leak. E il memory leak ha consumato il 90% della memoria. E il 90% significa che il server stava per crashare.

**JN**: Ah.

**ME**: Secondo: restart: always è pericoloso.

**JN**: Pericoloso?!

**ME**: Sì. Perché il container si riavvia sempre. Anche quando non dovrebbe. E se c'è un bug, il container entra in un restart loop. E non si ferma mai.

**JN**: E QUINDI?!

**ME**: E quindi usa restart: on-failure. O restart: unless-stopped. E aggiungi un health check.

**JN**: Ok.

**ME**: Terzo: i container hanno bisogno di dipendenze.

**JN**: Dipendenze?

**ME**: Sì. Il database deve essere pronto prima che l'API parta. Se no, l'API fallisce. E si riavvia. E fallisce. E si riavvia. E non si ferma mai.

**JN**: E COME LO SO?!

**ME**: Dipends_on con condition: service_healthy. E health check per ogni servizio.

**JN**: Ok.

**ME**: Quarto: testa il codice con carico reale.

**JN**: Carico reale?

**ME**: Sì. 847.000 pagamenti. Non 10. Perché 10 funzionano. 847.000 no.

**JN**: E COME LI GENERO?!

**ME**: Con uno script. O con un tool di load testing. O con i dati di produzione. Ma testa con numeri reali.

**JN**: Ok.

**ME**: Quinto: i container sono bestie strane. Vanno domati.

**JN**: Domati?!

**ME**: Sì. Con health check. Con restart policy giuste. Con dipendenze corrette. Con limiti di memoria. Con limiti di CPU. Senza, i container impazziscono. E non si fermano mai.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Container: healthy
- Database: healthy
- Restart: stabile
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è scrivere Dockerfile corretti. E docker-compose corretti. E testare. E educare. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i container.

**TERMINALE**:
```
# Configura alert per container
cat > /etc/prometheus/alerts/container.yml << 'EOF'
groups:
  - name: container-health
    rules:
      - alert: ContainerRestartLoop
        expr: increase(container_restart_count[5m]) > 3
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Container {{ $labels.name }} in restart loop"
          description: "Container has restarted {{ $value }} times in 5 minutes"

      - alert: ContainerHighMemory
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Container {{ $labels.name }} using high memory"
          description: "Container is using {{ $value | humanizePercentage }} of memory limit"

      - alert: ContainerUnhealthy
        expr: container_health_status == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Container {{ $labels.name }} is unhealthy"
          description: "Container health check is failing"
EOF

# Aggiungi limiti ai container
cat > docker-compose.yml << 'EOF'
services:
  payment-api:
    image: payment:v2.5
    restart: on-failure
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    environment:
      - NODE_ENV=production
      - DB_HOST=payment-postgres
      - DB_NAME=payment
      - DB_USER=payment
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      payment-postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  payment-postgres:
    image: postgres:15
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
    environment:
      - POSTGRES_DB=payment
      - POSTGRES_USER=payment
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - payment-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U payment"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  payment-data:
EOF

# Riavvia
docker-compose up -d
```

**TL**: Hai aggiunto limiti e monitoraggio?

**ME**: Sì. Limiti di memoria. Limiti di CPU. Alert per restart loop. Alert per memoria alta. Alert per container unhealthy.

**TL**: E QUINDI?!

**ME**: E quindi... i container non possono consumare tutta la memoria. E se impazziscono, l'alert ci avvisa.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... il container viene killato. E riavviato. Ma con i limiti, non può impazzire troppo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Limiti: configurati
- Alert: attivi
- Container: sano
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i container hanno bisogno di limiti. E che il monitoraggio è essenziale. E che restart loop vanno evitati. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero creato container che non si fermano.

```markdown
## Incident #CONTAINER-001: Il Container Che Non Si Fermava Mai

**Data incident**: Lunedì 1 maggio 2026, 08:00
**Autore**: JN
**Servizio**: payment-api
**Problema**: Memory leak + restart loop
**Causa**: Array in memoria + restart: always + nessun health check
**Tempo in produzione**: 47 giorni
**Memoria consumata**: 90%
**Pagamenti in memoria**: 847.293
**Tempo di risoluzione**: 2 giorni
**Downtime**: 0 (servizio degradato)
**Reazione UL**: "Container?!"
**Reazione TL**: "90%?!"
**Reazione CTO**: "I container vanno scritti bene."
**Soluzione**: Database + health check + limiti + educazione
**Lezione imparata**: I CONTAINER VANNO SCRITTI BENE. SEMPRE.

**Regole per i container**:
1. Non salvare dati in memoria. Usa un database.
2. Usa restart: on-failure, non restart: always.
3. Aggiungi health check per ogni servizio.
4. Aspetta le dipendenze con depends_on + condition.
5. Imposta limiti di memoria e CPU.
6. Testa con carico reale, non con 10 elementi.
7. Monitora i restart. E la memoria. E l'health.
8. Se il container non si ferma, usa docker rm -f. Amen.

**Come scrivere un docker-compose corretto**:
```yaml
services:
  api:
    image: my-api:v1
    restart: on-failure
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:15
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**Come fermare un container che non si ferma**:
```bash
# Stop normale
docker stop <container>

# Se non funziona, kill
docker kill <container>

# Se ancora non funziona, rm -f
docker rm -f <container>

# Se il container si riavvia sempre, controlla restart policy
docker inspect <container> | grep -A5 RestartPolicy

# Cambia la policy
docker update --restart=no <container>
docker stop <container>
```

**Come debuggare un memory leak**:
```bash
# Controlla memoria
docker stats --no-stream

# Controlla log
docker logs --tail 100 <container>

# Entra nel container
docker exec -it <container> sh

# Se è Node.js, usa --inspect
node --inspect server.js

# E apri chrome://inspect
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i container vanno scritti bene. E che gli array in memoria non scalano. E che restart: always è pericoloso. E che JN va educato. E che 847.000 pagamenti sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i container sono bestie strane. Vanno domati. Con health check. Con restart policy giuste. Con dipendenze corrette. Con limiti. E se non li domi, impazziscono. E non si fermano mai. E consumano memoria. E la CPU sale. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il container non si fermava." E UL dice: "CONTAINER?!" E tu dici: "Sì. Docker container." E UL dice: "E PERCHÉ NON SI FERMAVA?!" E tu dici: "Perché JN ha scritto restart: always." E UL dice: "ALWAYS?!" E tu dici: "Sì. Per essere sicuro che il container sia sempre up." E UL dice: "E QUANTO È COSTATA LA SICUREZZA?!" E tu dici: "90% memoria. E 847.000 pagamenti. E 2 giorni di fix. E 1 junior educato." E la verità è che la sicurezza costa. Sempre. E la prossima volta, i container saranno scritti bene. E non impazziranno. O quasi. Amen.

---

## Il costo del container impazzito

| Voce | Valore |
|------|--------|
| Servizio | payment-api |
| Autore | JN |
| Data creazione | 15 febbraio 2026 |
| Data incident | 01/05/2026, 08:00 |
| Tempo in produzione | 47 giorni |
| Memoria consumata | 90% |
| Pagamenti in memoria | 847.293 |
| Restart loop | 2 giorni |
| Tempo di risoluzione | 2 giorni |
| Downtime | 0 (degradato) |
| File problematici | 1 |
| Servizi affetti | payment-api |
| Autori | JN |
| Reazione UL | "Container?!" |
| Reazione TL | "90%?!" |
| Reazione CTO | "Vanno scritti bene." |
| Soluzione | Database + health check + limiti + educazione |
| Lezione imparata | CONTAINER = SCRITTI BENE |
| **Totale** | **90% memoria + 847K pagamenti + 2 giorni fix + 1 junior educato** |

**Morale**: I container vanno scritti bene. Sempre. Quando scrivi un container, DEVI impostare limiti. E health check. E restart policy corrette. E dipendenze. Se non lo fai, il container impazzisce. E consuma memoria. E non si ferma. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il container non si fermava." E tutti dicono: "CONTAINER?!" E tu dici: "Sì. Docker container." E la lezione è chiara: i container vanno domati. E gli array in memoria non scalano. E JN va educato. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](114-il-processo-zombie-che-mangiava-la-cpu.md) | [Prossima](116-la-cache-che-ha-restituito-i-dati-vecchi.md)**
