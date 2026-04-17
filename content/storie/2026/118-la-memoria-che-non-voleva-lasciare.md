# La Memoria Che Non Voleva Lasciare

**Data**: 22/05/2026

**[Storie 2026](index.md) | [Precedente](117-il-cron-che-ha-rivoltato-il-sistema.md) | [Prossima](119-il-load-balancer-che-odiava-la-simmetria.md)**

---

C'è una verità nella programmazione che tutti conoscono ma nessuno rispetta: la memoria va liberata. Sempre. Quando apri una connessione, la chiudi. Quando allochi un buffer, lo dealloci. Quando crei un oggetto, lo distruggi. E se non lo fai, la memoria si accumula. E cresce. E cresce. Finché non c'è più spazio. E il sistema rallenta. E il garbage collector impazzisce. E i container vengono killati per OOM. E tu ti chiedi: "Com'è possibile che 64GB di RAM non bastino?" E la risposta è semplice: perché JN ha scritto un loop che allocava memoria senza mai liberarla. E il loop girava. E la memoria cresceva. E nessuno se ne accorgeva. Finché non era troppo tardi. E il sistema è morto. E i clienti hanno chiamato. E UL ha chiamato. E tu hai risposto: "La memoria era piena." E UL ha detto: "E PERCHÉ ERA PIENA?!" E tu hai detto: "Perché JN non liberava gli oggetti." E UL ha detto: "E CHE OGGETTI?!" E tu hai detto: "Sessioni. Migliaia di sessioni. Che non venivano mai chiuse." E la verità è che la memoria è come una casa. Se entri e non esci mai, la casa si riempie. E se la casa si riempie, non ci sta più nessuno. E il sistema crolla. Amen.

![](../../img/server.jpg)

---

**Lunedì - Il Segnale**

Era lunedì. Le 09:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato l'alert.

**ALERT**: Memory usage > 85% for api-gateway

**ME**: Memoria all'85%?!

**TL**: 85%?!

**ME**: Sì. Su 64GB.

**TL**: E QUANTO USA DI NORMALE?!

**ME**: 20GB. Forse 25.

**TL**: E 64GB?!

**ME**: Non è normale. Controllo.

**TERMINALE**:
```
# Controlla memoria
kubectl top pods -n production
NAME                              CPU(cores)   MEMORY(bytes)
api-gateway-abc123-1              500m         54Gi
api-gateway-def456-1              450m         52Gi
api-gateway-ghi789-1              480m         53Gi

# Controlla trend
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'container_memory_usage_bytes{pod=~"api-gateway.*"}'
{pod="api-gateway-abc123-1"} 58000000000
{pod="api-gateway-def456-1"} 56000000000
{pod="api-gateway-ghi789-1"} 57000000000

# Controlla GC
kubectl logs -l app=api-gateway --since=1h | grep -i "GC" | tail -20
[GC pause (G1 Evacuation Pause) 234ms]
[GC pause (G1 Evacuation Pause) 456ms]
[GC pause (G1 Evacuation Pause) 789ms]
[GC pause (G1 Evacuation Pause) 1234ms]
[GC pause (G1 Evacuation Pause) 2345ms]
```

**ME**: Il GC sta impazzendo. Pause di 2 secondi.

**TL**: 2 SECONDI?!

**ME**: Sì. E la memoria continua a crescere.

**TL**: E QUANTO CRESCONO?!

**ME**: 1GB all'ora. Forse di più.

**TL**: E QUANDO FINISCE LA MEMORIA?!

**ME**: Tra 10 ore. Forse 12.

**TL**: E QUINDI?!

**ME**: E quindi... devo capire cosa la sta mangiando.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 54GB su 64GB
- GC: pause di 2+ secondi
- Trend: +1GB/ora
- Tempo rimanente: ~10 ore

E tutto era chiaro. La memoria stava finendo. E il GC non riusciva a liberare nulla. E qualcosa stava trattenendo tutto. Amen.

---

**Lunedì - 09:30**

Ho analizzato la memoria. Per capire cosa la stava mangiando.

**TERMINALE**:
```
# Heap dump
kubectl exec -it api-gateway-abc123-1 -- jmap -dump:format=b,file=/tmp/heap.hprof 1

# Analizza con MAT
kubectl cp api-gateway-abc123-1:/tmp/heap.hprof ./heap.hprof

# Controlla oggetti
jhat -J-Xmx4g heap.hprof
# Output:
# Instance Counts for All Classes (excluding platform)
# 234,567 instances of 'com.company.api.Session'
# 123,456 instances of 'com.company.api.UserContext'
# 89,012 instances of 'com.company.api.RequestCache'

# Controlla dimensioni
# Session: 2KB each
# UserContext: 1KB each
# RequestCache: 5KB each

# Totale
# Session: 234,567 * 2KB = 468MB
# UserContext: 123,456 * 1KB = 123MB
# RequestCache: 89,012 * 5KB = 445MB
```

**ME**: 234.000 sessioni in memoria. E non vengono mai chiuse.

**TL**: 234.000?!

**ME**: Sì. E crescono. 1000 nuove ogni ora.

**TL**: E PERCHÉ NON VENGONO CHIUSE?!

**ME**: Non lo so. Guardo il codice.

**TERMINALE**:
```
# Cerca codice sessioni
grep -r "Session" src/ | grep -i "close\|remove\|invalidate" | wc -l
0

# Cerca creazione sessioni
grep -r "new Session" src/ | wc -l
47

# Controlla codice
cat src/handlers/AuthHandler.js
router.post('/login', async (req, res) => {
  const session = new Session(req.body.userId);
  sessions[session.id] = session;  // MAI RIMOSSA
  res.json({ token: session.token });
});

// Logout? Non esiste.
// Timeout? Non esiste.
// Cleanup? Non esiste.
```

**ME**: Le sessioni vengono create ma mai chiuse. Mai rimosse. Mai invalidate.

**TL**: MAI?!

**ME**: Mai. JN ha scritto il login. Ma non il logout.

**TL**: E IL TIMEOUT?!

**ME**: Non c'è. Le sessioni non scadono mai.

**TL**: E QUINDI?!

**ME**: E quindi... ogni login crea una sessione. E la sessione resta in memoria. Per sempre.

**TL**: E QUANTE NE VENGONO CREATE?!

**ME**: 1000 all'ora. 24.000 al giorno.

**TL**: E QUANDO FINISCE LA MEMORIA?!

**ME**: Dipende da quante ne ha create JN.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Sessioni: 234.567
- Logout: inesistente
- Timeout: inesistente
- Cleanup: inesistente
- JN: responsabile

E la lezione era chiara. JN aveva creato un memory leak. E il memory leak stava uccidendo il sistema. Amen.

---

**Lunedì - 10:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto il codice di login?

**JN**: Sì. Tre mesi fa. Perché?

**ME**: Le sessioni non vengono mai chiuse.

**JN**: Chiuse?

**ME**: Sì. Create ma mai rimosse. Mai invalidate. Mai pulite.

**JN**: Ah. Sì. Non l'ho implementato.

**ME**: E IL LOGOUT?!

**JN**: Non l'ho fatto. Non era nella specifica.

**ME**: E IL TIMEOUT?!

**JN**: Non ci ho pensato.

**ME**: E QUINDI LE SESSIONI RESTANO IN MEMORIA PER SEMPRE?!

**JN**: Sì. Ma... non sono tante!

**ME**: 234.000. E crescono di 1000 all'ora.

**JN**: 234.000?!

**ME**: Sì. E la memoria è al 85%.

**JN**: E QUANDO FINISCE?!

**ME**: Tra 10 ore. Se non facciamo nulla.

**JN**: E COSA FACCIAMO?!

**ME**: Fixiamo. Ora.

**JN**: Ok.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Sessioni: 234.567
- Memoria: 85%
- Tempo: 10 ore
- JN: da educare

E la lezione era chiara. La memoria va liberata. E JN va educato. Amen.

---

**Lunedì - 10:30**

Ho fixato il codice. E aggiunto logout, timeout, e cleanup.

**TERMINALE**:
```
# Fix session handler
cat > src/handlers/AuthHandler.js << 'EOF'
const sessions = new Map();
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minuti

// Cleanup periodico
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.lastAccess > SESSION_TIMEOUT) {
      sessions.delete(id);
    }
  }
}, 60 * 1000); // Ogni minuto

router.post('/login', async (req, res) => {
  const session = new Session(req.body.userId);
  session.lastAccess = Date.now();
  sessions.set(session.id, session);
  res.json({ token: session.token });
});

router.post('/logout', async (req, res) => {
  const sessionId = req.headers['x-session-id'];
  sessions.delete(sessionId);
  res.json({ success: true });
});

// Middleware per aggiornare lastAccess
router.use((req, res, next) => {
  const sessionId = req.headers['x-session-id'];
  const session = sessions.get(sessionId);
  if (session) {
    session.lastAccess = Date.now();
  }
  next();
});
EOF

# Deploy
kubectl rollout restart deployment/api-gateway

# Verifica
kubectl rollout status deployment/api-gateway
deployment "api-gateway" successfully rolled out
```

**ME**: Codice fixato. Logout aggiunto. Timeout di 30 minuti. Cleanup ogni minuto.

**TL**: E LE SESSIONI ESISTENTI?!

**ME**: Vengono pulite dal cleanup. Entro 30 minuti.

**TL**: E LA MEMORIA?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla memoria dopo 30 minuti
kubectl top pods -n production
NAME                              CPU(cores)   MEMORY(bytes)
api-gateway-abc123-1              200m         12Gi
api-gateway-def456-1              180m         11Gi
api-gateway-ghi789-1              190m         11Gi

# Controlla sessioni
kubectl exec -it api-gateway-abc123-1 -- node -e "console.log(process.memoryUsage())"
{ rss: 12800000000, heapTotal: 8000000000, heapUsed: 2000000000 }
```

**ME**: Memoria scesa a 12GB. Sessioni pulite.

**TL**: E IL GC?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla GC
kubectl logs -l app=api-gateway --since=30m | grep -i "GC" | tail -10
[GC pause (G1 Evacuation Pause) 12ms]
[GC pause (G1 Evacuation Pause) 15ms]
[GC pause (G1 Evacuation Pause) 18ms]
```

**ME**: GC normale. Pause di 15ms.

**TL**: E QUINDI?!

**ME**: E quindi... funziona.

**TL**: E I CLIENTI?!

**ME**: Possono fare logout. E le sessioni scadono.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 12GB
- Sessioni: pulite
- GC: normale
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che la memoria va liberata. E che le sessioni vanno chiuse. E che JN va educato. Amen.

---

**Lunedì - 11:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era calmo. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema di memoria.

**UL**: Che problema?

**ME**: Le sessioni non venivano chiuse. E la memoria cresceva.

**UL**: CRESCITA?!

**ME**: Sì. Da 20GB a 54GB. In pochi giorni.

**UL**: E QUANTO AVETE DI MEMORIA?!

**ME**: 64GB. Per pod.

**UL**: E STAVA FINENDO?!

**ME**: Sì. Tra 10 ore.

**UL**: E COSA AVETE FATTO?!

**ME**: Fixato il codice. Aggiunto logout, timeout, cleanup.

**UL**: E CHI HA SCRITTO IL CODICE ORIGINALE?!

**ME**: JN. Tre mesi fa.

**UL**: E NON HA IMPLEMENTATO IL LOGOUT?!

**ME**: No. Non era nella specifica.

**UL**: E IL TIMEOUT?!

**ME**: Non ci aveva pensato.

**UL**: E PER TRE MESI NESSUNO L'HA NOTATO?!

**ME**: No. Perché la memoria non era critica. Finché oggi.

**UL**: E QUANTE SESSIONI C'ERANO?!

**ME**: 234.000.

**UL**: 234.000 SESSIONI?!

**ME**: Sì. E crescevano di 1000 all'ora.

**UL**: E QUINDI?!

**ME**: E quindi... fixato. E aggiunti controlli.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato il codice. E aggiunto monitoraggio.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. La memoria va liberata. E le sessioni vanno chiuse. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutto il codice. Per trovare altri memory leak.

**TERMINALE**:
```
# Cerca tutti i Map/Set senza cleanup
grep -r "new Map\|new Set\|new WeakMap\|new WeakSet" src/ | wc -l
47

# Cerca listener senza remove
grep -r "addEventListener\|on(" src/ | grep -v "removeEventListener\|off(" | wc -l
23

# Cerca connessioni senza close
grep -r "connect\|createConnection" src/ | grep -v "close\|disconnect\|end" | wc -l
15

# Cerca timer senza clear
grep -r "setTimeout\|setInterval" src/ | grep -v "clearTimeout\|clearInterval" | wc -l
34
```

**ME**: 47 Map/Set. 23 listener. 15 connessioni. 34 timer. Tutti potenziali memory leak.

**TL**: E QUANTI SONO PROBLEMI REALI?!

**ME**: Controllo.

**TERMINALE**:
```
# Analizza ogni caso
for file in $(grep -rl "new Map" src/); do
  echo "=== $file ==="
  grep -A5 "new Map" $file
done

# Risultati
=== src/cache/RequestCache.js ===
const cache = new Map();
// Ha cleanup ogni 5 minuti - OK

=== src/handlers/WebSocketHandler.js ===
const connections = new Map();
// NON HA CLEANUP - PROBLEMA

=== src/services/RateLimiter.js ===
const requests = new Map();
// Ha cleanup ogni minuto - OK

=== src/handlers/UploadHandler.js ===
const uploads = new Map();
// NON HA CLEANUP - PROBLEMA
```

**ME**: Trovati 2 memory leak reali. WebSocketHandler e UploadHandler.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix WebSocketHandler
cat > src/handlers/WebSocketHandler.js << 'EOF'
const connections = new Map();
const CONNECTION_TIMEOUT = 5 * 60 * 1000; // 5 minuti

// Cleanup connessioni inattive
setInterval(() => {
  const now = Date.now();
  for (const [id, conn] of connections) {
    if (now - conn.lastActivity > CONNECTION_TIMEOUT) {
      conn.ws.close();
      connections.delete(id);
    }
  }
}, 60 * 1000);

wss.on('connection', (ws) => {
  const id = generateId();
  connections.set(id, { ws, lastActivity: Date.now() });
  
  ws.on('message', () => {
    const conn = connections.get(id);
    if (conn) conn.lastActivity = Date.now();
  });
  
  ws.on('close', () => {
    connections.delete(id);
  });
});
EOF

# Fix UploadHandler
cat > src/handlers/UploadHandler.js << 'EOF'
const uploads = new Map();
const UPLOAD_TIMEOUT = 30 * 60 * 1000; // 30 minuti

// Cleanup upload incompleti
setInterval(() => {
  const now = Date.now();
  for (const [id, upload] of uploads) {
    if (now - upload.startTime > UPLOAD_TIMEOUT) {
      upload.stream.destroy();
      uploads.delete(id);
    }
  }
}, 60 * 1000);

router.post('/upload', (req, res) => {
  const id = generateId();
  const upload = { stream: req, startTime: Date.now() };
  uploads.set(id, upload);
  
  req.on('end', () => {
    uploads.delete(id);
  });
  
  req.on('error', () => {
    uploads.delete(id);
  });
});
EOF

# Deploy
kubectl rollout restart deployment/api-gateway
```

**ME**: Tutti i memory leak fixati. Cleanup aggiunto ovunque.

**TL**: E QUANTI ERANO?!

**ME**: 3. Sessioni, WebSocket, Upload.

**TL**: E TUTTI DI JN?!

**ME**: No. WebSocket era di Bob. Upload era mio.

**TL**: TU?!

**ME**: Sì. Due anni fa. Non ci avevo pensato.

**TL**: E QUINDI?!

**ME**: E quindi... anche io devo imparare.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memory leak: 3
- Fixati: 3
- Autori: JN, Bob, ME
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti scrivono memory leak. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per le sessioni?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che le sessioni senza logout sono state un disastro. Ma sono anche state un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: tutto ciò che viene creato va distrutto.

**JN**: Sempre?

**ME**: Sempre. Sessioni, connessioni, timer, listener. Tutto va chiuso. O rimosso. O invalidato.

**JN**: E SE NON LO FACCIO?!

**ME**: Allora la memoria si riempie. E il sistema muore.

**JN**: Ok.

**ME**: Secondo: usa timeout per tutto ciò che persiste.

**JN**: Timeout?

**ME**: Sì. Le sessioni devono scadere. Le connessioni devono chiudersi. I timer devono fermarsi.

**JN**: E QUANTO DEVE ESSERE IL TIMEOUT?!

**ME**: Dipende. Le sessioni: 30 minuti. Le connessioni: 5 minuti. I timer: quando non servono più.

**JN**: Ok.

**ME**: Terzo: implementa cleanup periodici.

**JN**: Cleanup?

**ME**: Sì. Un processo che pulisce le cose vecchie. Che rimuove le sessioni scadute. Le connessioni morte. I timer inutili.

**JN**: E QUANDO DEVE GIRARE?!

**ME**: Ogni minuto. O ogni 5 minuti. Dipende da quanto è critico.

**JN**: Ok.

**ME**: Quarto: testa il memory leak.

**JN**: Come?!

**ME**: Con load test. E monitorando la memoria. Se la memoria cresce senza fermarsi, c'è un leak.

**JN**: E COME LO TROVO?!

**ME**: Con heap dump. E analizzando gli oggetti. E vedendo cosa non viene liberato.

**JN**: Ok.

**ME**: Quinto: documenta cosa viene creato e come viene distrutto.

**JN**: Documenta?

**ME**: Sì. Scrivi: "Questa sessione viene creata al login e distrutta al logout o dopo 30 minuti di inattività." Così tutti sanno.

**JN**: E SE NON HO TEMPO?!

**ME**: Allora... trovi il tempo. Perché la prossima volta qualcuno deve sapere come funziona. E se non lo sai, non sai se funziona.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Sessioni: con timeout
- Connessioni: con cleanup
- Timer: con clear
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere cleanup. E timeout. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i memory leak.

**TERMINALE**:
```
# Configura alert per memoria
cat > /etc/prometheus/alerts/memory.yml << 'EOF'
groups:
  - name: memory
    rules:
      - alert: MemoryUsageHigh
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Memory usage > 85% for {{ $labels.pod }}"
          description: "Pod {{ $labels.pod }} is using {{ $value }}% of memory. Check for memory leaks."

      - alert: MemoryGrowing
        expr: |
          deriv(container_memory_usage_bytes[1h]) > 0
          and
          container_memory_usage_bytes > 5000000000
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "Memory growing for {{ $labels.pod }}"
          description: "Pod {{ $labels.pod }} memory is growing consistently. Possible memory leak."

      - alert: GCPauseTooLong
        expr: |
          histogram_quantile(0.99, sum by (pod, le) (
            rate(jvm_gc_pause_seconds_bucket[5m])
          )) > 0.5
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: "GC pause too long for {{ $labels.pod }}"
          description: "Pod {{ $labels.pod }} GC pause is {{ $value }}s. Memory pressure detected."
EOF

# Aggiungi metriche per sessioni
cat > src/lib/session-metrics.js << 'EOF'
const prometheus = require('prom-client');

const sessionCount = new prometheus.Gauge({
  name: 'session_count',
  help: 'Number of active sessions',
  labelNames: ['service'],
});

const sessionCreated = new prometheus.Counter({
  name: 'session_created_total',
  help: 'Total sessions created',
  labelNames: ['service'],
});

const sessionDestroyed = new prometheus.Counter({
  name: 'session_destroyed_total',
  help: 'Total sessions destroyed',
  labelNames: ['service', 'reason'],
});

module.exports = { sessionCount, sessionCreated, sessionDestroyed };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per memoria alta. Alert per memoria crescente. Alert per GC lento.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i memory leak prima che uccidano il sistema.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Sessioni: monitorate
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che la memoria va liberata. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato di liberare la memoria.

```markdown
## Incident #MEMORY-001: La Memoria Che Non Voleva Lasciare

**Data incident**: Lunedì 22 maggio 2026, 09:00
**Autore**: JN
**Servizio**: api-gateway
**Problema**: Sessioni non chiuse, memory leak
**Causa**: Logout non implementato, timeout non implementato
**Tempo in produzione**: 3 mesi
**Sessioni accumulate**: 234.567
**Memoria usata**: 54GB su 64GB
**Tempo di risoluzione**: 1 ora
**Downtime**: 0
**Reazione UL**: "234.000 sessioni?!"
**Reazione TL**: "Mai chiuse?!"
**Reazione CTO**: "La memoria va liberata."
**Soluzione**: Logout + timeout + cleanup + monitoraggio
**Lezione imparata**: LA MEMORIA VA LIBERATA. SEMPRE.

**Regole per la memoria**:
1. Tutto ciò che viene creato va distrutto.
2. Implementa SEMPRE logout, close, disconnect.
3. Usa SEMPRE timeout per sessioni e connessioni.
4. Implementa SEMPRE cleanup periodici.
5. Monitora la memoria. E il GC.
6. Testa i memory leak con load test.
7. Documenta cosa viene creato e come viene distrutto.
8. La memoria è come una casa. Se entri e non esci, si riempie. Amen.

**Come trovare memory leak**:
```bash
# Heap dump
kubectl exec -it pod-name -- jmap -dump:format=b,file=/tmp/heap.hprof 1

# Analizza
jhat -J-Xmx4g heap.hprof

# Oppure con Node.js
kubectl exec -it pod-name -- node --heapsnapshot-signal=SIGUSR2 index.js
kill -USR2 <pid>
```

**Come implementare cleanup**:
```javascript
// Cleanup periodico
setInterval(() => {
  const now = Date.now();
  for (const [id, item] of collection) {
    if (now - item.lastAccess > TIMEOUT) {
      collection.delete(id);
    }
  }
}, CLEANUP_INTERVAL);

// Timeout su sessioni
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minuti

// Logout
router.post('/logout', (req, res) => {
  sessions.delete(req.session.id);
  res.json({ success: true });
});
```

**Come configurare alert memoria**:
```yaml
groups:
  - name: memory
    rules:
      - alert: MemoryUsageHigh
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Memory usage > 85%"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che la memoria va liberata. E che le sessioni vanno chiuse. E che i timeout sono essenziali. E che i cleanup salvano. E che JN va educato. E che 234.000 sessioni sono troppe. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: la memoria è come una casa. Se entri e non esci mai, la casa si riempie. E se la casa si riempie, non ci sta più nessuno. E il sistema crolla. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "La memoria era piena." E UL dice: "E PERCHÉ ERA PIENA?!" E tu dici: "Perché le sessioni non venivano chiuse." E UL dice: "E PERCHÉ NON VENIVANO CHIUSE?!" E tu dici: "Perché JN non aveva implementato il logout." E UL dice: "E IL LOGOUT NON ERAVA NELLA SPECIFICA?!" E tu dici: "No. Ma doveva esserci." E UL dice: "E QUANTE SESSIONI C'ERANO?!" E tu dici: "234.000." E UL dice: "E NESSUNO L'HA NOTATO?!" E tu dici: "No. Finché la memoria non è finita." E la verità è che tutti danno per scontato che la memoria sia infinita. Ma non lo è. E se non la liberi, si riempie. E se si riempie, il sistema muore. E impari. Impari che la memoria va liberata. E che le sessioni vanno chiuse. E che i timeout sono essenziali. E che JN va educato. Amen.

---

## Il costo della memoria non liberata

| Voce | Valore |
|------|--------|
| Servizio | api-gateway |
| Autore | JN |
| Data creazione | Febbraio 2026 |
| Data incident | 22/05/2026, 09:00 |
| Tempo in produzione | 3 mesi |
| Sessioni accumulate | 234.567 |
| Memoria usata | 54GB su 64GB |
| Tempo di risoluzione | 1 ora |
| Downtime | 0 |
| Memory leak trovati | 3 |
| Servizi affetti | api-gateway |
| Autori | JN, Bob, ME |
| Reazione UL | "234.000 sessioni?!" |
| Reazione TL | "Mai chiuse?!" |
| Reazione CTO | "La memoria va liberata." |
| Soluzione | Logout + timeout + cleanup |
| Lezione imparata | MEMORIA = LIBERARE |
| **Totale** | **3 memory leak fixati + 1 junior educato + 1 senior educato** |

**Morale**: La memoria va liberata. Sempre. Quando apri una connessione, chiudila. Quando crei una sessione, distruggila. Quando allochi memoria, liberala. E se non lo fai, la memoria si accumula. E cresce. E cresce. Finché non c'è più spazio. E il sistema muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "La memoria era piena." E UL dice: "E PERCHÉ ERA PIENA?!" E tu dici: "Perché le sessioni non venivano chiuse." E UL dice: "E PERCHÉ NON VENIVANO CHIUSE?!" E tu dici: "Perché JN non aveva implementato il logout." E UL dice: "E NON ERAVA NELLA SPECIFICA?!" E tu dici: "No. Ma doveva esserci." E la verità è che le specifiche non dicono tutto. E le cose ovvie vanno fatte anche se non sono scritte. E la memoria va liberata. Sempre. Anche se nessuno te lo chiede. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](117-il-cron-che-ha-rivoltato-il-sistema.md) | [Prossima](119-il-load-balancer-che-odiava-la-simmetria.md)**
