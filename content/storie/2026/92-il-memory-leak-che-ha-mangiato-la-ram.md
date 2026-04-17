# Il Memory Leak Che Ha Mangiato La RAM

**Data**: 21/11/2026

**[Home](../index.md) | [Precedente](91-il-deadlock-che-ha-bloccato-tutto.md)]**

---

C'è una verità nella programmazione che tutti conoscono ma nessuno rispetta: la memoria è infinita. O almeno così sembra. Allochi. Usi. Dimentichi. E la memoria resta lì. Occupata. Per sempre. Finché un giorno il processo mangia tutto. E il sistema va in OOM. E il kernel uccide il tuo processo. E tu ti chiedi: "Com'è possibile che 64GB di RAM non bastino?" E la risposta è semplice: perché hai un memory leak. E il memory leak non perdona. E non dimentica. E continua a mangiare. Finché non resta più nulla. Amen.

![](../../img/server.jpg)

---

**Giovedì - La Scoperta**

Era giovedì. Le 09:17. Il caffè era ancora caldo.

Poi è arrivato l'alert.

**ALERT**: Node memory usage > 90%

**ME**: 90% di memoria?!

**TL**: 90?!

**ME**: Sì. Su un nodo da 64GB.

**TL**: E QUANTI GIGA SONO?!

**ME**: 57.6GB usati.

**TL**: E COSA STA USANDO TUTTA QUESTA RAM?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla uso memoria per pod
kubectl top pods -n production --sort-by=memory
NAME                        CPU(cores)   MEMORY(bytes)
api-server-7d9f4-abc12      150m         48Gi
api-server-7d9f4-def34      120m         2.1Gi
api-server-7d9f4-ghi56      130m         2.0Gi
worker-7d9f4-jkl78          200m         1.8Gi
redis-7d9f4-mno90           50m          512Mi

# Controlla dettagli pod
kubectl describe pod api-server-7d9f4-abc12 -n production | grep -A5 "Containers:"
Containers:
  api-server:
    Container ID:   containerd://abc123...
    Image:          registry.company.com/api-server:v2.3.1
    Memory Limit:   8Gi
    Memory Request: 2Gi
```

**ME**: L'api-server sta usando 48GB. Ma il limit è 8GB.

**TL**: 48GB CON UN LIMIT DI 8?!

**ME**: Sì. Sta sforando.

**TL**: E COME È POSSIBILE?!

**ME**: Non lo so. Il limit dovrebbe essere hard.

**TL**: E INVECE?!

**ME**: Invece... il processo sta mangiando tutto.

**TL**: E IL NODO?!

**ME**: Il nodo sta per andare in OOM.

**TERMINALE**:
```
# Controlla eventi OOM
kubectl describe node node-pool-1 | grep -i oom
  Warning  OOMKilling   5m    kubelet  Memory cgroup out of memory: Kill process 12345 (node) score 1000

# Controlla memoria del nodo
kubectl describe node node-pool-1 | grep -A5 "Allocated resources:"
Allocated resources:
  CPU Requests:     12.5 (62%)
  Memory Requests:  58Gi (90%)
  Memory Limits:    64Gi (100%)
```

**ME**: Il nodo ha già ucciso processi. E sta per uccidere ancora.

**TL**: E QUINDI?!

**ME**: E quindi... dobbiamo capire perché l'api-server sta mangiando memoria.

**TL**: E CHI HA DEPLOYATO L'ULTIMA VERSIONE?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla ultimo deploy
kubectl rollout history deployment/api-server -n production
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
3         kubectl set image deployment/api-server api-server=registry.company.com/api-server:v2.3.1 --record-by=jn

# Controlla changelog
git log --oneline --since="3 days" --all
a1b2c3d JN: "Add in-memory cache for user sessions"
```

**ME**: JN. Tre giorni fa. Ha aggiunto una cache in-memory.

**TL**: JN?!

**ME**: Sì. Per le sessioni utente.

**TL**: E QUANTI UTENTI CI SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Conta sessioni attive
kubectl exec -it api-server-7d9f4-abc12 -- node -e "console.log(Object.keys(require('./session-cache').sessions).length)"
Error: Cannot find module './session-cache'

# Controlla memoria heap
kubectl exec -it api-server-7d9f4-abc12 -- node -e "console.log(process.memoryUsage())"
{
  rss: 51582976512,        // 48GB
  heapTotal: 51002736640,  // 47.5GB
  heapUsed: 50827366400,   // 47.3GB
  external: 1234567
}
```

**ME**: 47GB di heap usati. Per sessioni.

**TL**: 47GB DI SESSIONI?!

**ME**: Sì. E crescono.

**TL**: E QUANTO CRESCONO?!

**ME**: Non lo so. Controllo tra 5 minuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 48GB
- Heap: 47GB usati
- Limit: 8GB
- Autore: JN

E tutto era chiaro. JN aveva aggiunto una cache. E la cache non aveva limiti. E la cache cresceva. E cresceva. E cresceva. Finché non c'era più memoria. Amen.

---

**Giovedì - 09:45**

Ho chiamato JN. JN ha risposto.

**ME**: Hai aggiunto la cache in-memory per le sessioni?

**JN**: Sì. Per performance.

**ME**: E QUANTE SESSIONI SALVI?!

**JN**: Tutte.

**ME**: TUTTE?!

**JN**: Sì. Così non devo fare query al database.

**ME**: E NON LE CANCELLI MAI?!

**JN**: No. Perché dovrei?

**ME**: PERCHÉ LA MEMORIA È FINITA!

**JN**: Ah.

**ME**: AH?!

**JN**: Pensavo che... non so cosa pensavo.

**ME**: PENSAVI CHE LA MEMORIA FOSSE INFINITA?!

**JN**: Sì. O no. Non lo so.

**ME**: E ORA IL SERVER STA USANDO 48GB DI RAM!

**JN**: Oh.

**ME**: OH?! IL NODO STA PER ANDARE IN OOM!

**JN**: E... cosa facciamo?

**ME**: RIPIGLIAMO IL SERVER! E FIXIAMO LA CACHE!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA METTI UN LIMITE ALLA CACHE!

**JN**: Ok.

JN ha riattaccato. O forse ho riattaccato io. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Cache: illimitata
- Sessioni: tutte salvate
- Memoria: 48GB
- Risultato: OOM imminente

E la lezione era chiara. Le cache senza limiti sono memory leak. E i memory leak uccidono i server. E JN non pensa alla memoria. Amen.

---

**Giovedì - 10:00**

Ho riavviato il pod. Ho liberato la memoria.

**TERMINALE**:
```
# Riavvia il pod
kubectl delete pod api-server-7d9f4-abc12 -n production
pod "api-server-7d9f4-abc12" deleted

# Verifica nuovo pod
kubectl get pods -n production -l app=api-server
NAME                        READY   STATUS    RESTARTS   AGE
api-server-7d9f4-xyz99      1/1     Running   0          30s
api-server-7d9f4-def34      1/1     Running   0          5d
api-server-7d9f4-ghi56      1/1     Running   0          5d

# Controlla memoria
kubectl top pods -n production -l app=api-server
NAME                        CPU(cores)   MEMORY(bytes)
api-server-7d9f4-xyz99      100m         512Mi
api-server-7d9f4-def34      120m         2.1Gi
api-server-7d9f4-ghi56      130m         2.0Gi
```

**ME**: Pod riavviato. Memoria libera.

**TL**: E ORA?

**ME**: Ora devo fixare la cache.

**TL**: E COME?

**ME**: Aggiungo un limite. E un TTL.

**TL**: E QUANTO?

**ME**: Max 10000 sessioni. TTL 30 minuti.

**TL**: E SE CI SONO PIÙ DI 10000 UTENTI?

**ME**: Allora le più vecchie vengono eliminate. LRU.

**TL**: E SE UN UTENTE VIENE ELIMINATO?

**ME**: Allora... fa login di nuovo.

**TL**: E È UN PROBLEMA?

**ME**: No. È meglio di far crashare il server.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Memoria: 512MB
- Cache: da fixare
- Limit: da aggiungere
- TTL: da configurare

E tutto sembrava risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché le cose che sembrano risolte le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Giovedì - 11:00**

Ho guardato il codice. Ho capito il problema.

**TERMINALE**:
```
git show a1b2c3d -- src/lib/session-cache.js
+// Cache in-memory per sessioni utente
+const sessions = {};
+
+function setSession(userId, sessionData) {
+  sessions[userId] = sessionData;
+}
+
+function getSession(userId) {
+  return sessions[userId];
+}
+
+function deleteSession(userId) {
+  delete sessions[userId];
+}
+
+module.exports = { setSession, getSession, deleteSession, sessions };
```

**ME**: Ecco il problema.

**TL**: Cosa?

**ME**: La cache non ha limite. E non ha TTL.

**TL**: E QUINDI?!

**ME**: E quindi... ogni sessione resta per sempre. E la memoria cresce.

**TL**: E QUANTE SESSIONI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log accessi
kubectl logs -l app=api-server --since=24h | grep "login success" | wc -l
84723

# Controlla sessioni uniche
kubectl logs -l app=api-server --since=24h | grep "login success" | grep -oE "user_id=[0-9]+" | sort -u | wc -l
23456
```

**ME**: 23.456 utenti unici nelle ultime 24 ore.

**TL**: E QUANTI GIGA PER UTENTE?!

**ME**: Non lo so. Dipende dai dati della sessione.

**TERMINALE**:
```
# Controlla dimensione sessione media
kubectl exec -it api-server-7d9f4-xyz99 -- node -e "
const sessions = require('./src/lib/session-cache').sessions;
const sizes = Object.values(sessions).map(s => JSON.stringify(s).length);
console.log('Avg session size:', (sizes.reduce((a,b) => a+b, 0) / sizes.length / 1024).toFixed(2), 'KB');
console.log('Max session size:', (Math.max(...sizes) / 1024).toFixed(2), 'KB');
"
Avg session size: 2.34 KB
Max session size: 15.67 KB
```

**ME**: 2.34KB per sessione. Media.

**TL**: E QUINDI?!

**ME**: 23.456 utenti × 2.34KB = 54.8MB. Ma il server ne usava 48GB.

**TL**: E COME È POSSIBILE?!

**ME**: Non è possibile. C'è qualcos'altro.

**TERMINALE**:
```
# Controlla heap snapshot
kubectl exec -it api-server-7d9f4-xyz99 -- node -e "
const v8 = require('v8');
const snapshot = v8.getHeapStatistics();
console.log(JSON.stringify(snapshot, null, 2));
"
{
  "total_heap_size": 53477376,
  "total_heap_size_executable": 524288,
  "total_physical_size": 53477376,
  "total_available_size": 4294967296,
  "used_heap_size": 23456789,
  "heap_size_limit": 4294967296,
  "malloced_memory": 1234567,
  "peak_malloced_memory": 2345678,
  "does_zap_garbage": false
}
```

**ME**: Aspetta. Il heap size limit è 4GB. Ma il processo ne usava 48GB.

**TL**: E COME?!

**ME**: Non lo so. Forse c'è un altro leak.

**TERMINALE**:
```
# Controlla il codice completo
git show a1b2c3d -- src/services/auth.js
+const sessionCache = require('../lib/session-cache');
+
+async function handleLogin(req, res) {
+  const user = await authenticateUser(req.body.username, req.body.password);
+  if (user) {
+    const sessionData = {
+      userId: user.id,
+      username: user.username,
+      permissions: user.permissions,
+      lastActivity: Date.now(),
+      // Cache dell'intero oggetto utente
+      user: user,
+      // Cache delle preferenze
+      preferences: await getUserPreferences(user.id),
+      // Cache dei permessi
+      permissionDetails: await getPermissionDetails(user.permissions),
+      // Cache delle notifiche
+      notifications: await getUserNotifications(user.id),
+      // Cache del carrello
+      cart: await getUserCart(user.id),
+      // Cache della cronologia
+      history: await getUserHistory(user.id, 100),
+    };
+    sessionCache.setSession(user.id, sessionData);
+    res.json({ success: true, sessionId: user.id });
+  }
+}
```

**ME**: ECCO IL PROBLEMA!

**TL**: COSA?!

**ME**: Ogni sessione salva TUTTO. Utente, preferenze, permessi, notifiche, carrello, cronologia.

**TL**: E QUANTO PESA?!

**ME**: Non 2KB. Molto di più.

**TERMINALE**:
```
# Controlla dimensione reale
kubectl exec -it api-server-7d9f4-xyz99 -- node -e "
const sessions = require('./src/lib/session-cache').sessions;
let total = 0;
for (const [id, s] of Object.entries(sessions)) {
  total += JSON.stringify(s).length;
}
console.log('Total sessions:', Object.keys(sessions).length);
console.log('Total size:', (total / 1024 / 1024).toFixed(2), 'MB');
console.log('Avg per session:', (total / Object.keys(sessions).length / 1024).toFixed(2), 'KB');
"
Total sessions: 1247
Total size: 234.56 MB
Avg per session: 193.12 KB
```

**ME**: 193KB per sessione. Non 2KB.

**TL**: 193KB?!

**ME**: Sì. Perché salva tutto.

**TL**: E 23.456 UTENTI × 193KB?!

**ME**: 4.4GB. In 24 ore.

**TL**: E IL SERVER NE USAVA 48GB?!

**ME**: Sì. Perché non riavviavamo da 3 giorni.

**TL**: E QUINDI?!

**ME**: E quindi... 3 giorni × 4.4GB = 13GB. Ma erano 48GB.

**TL**: E GLI ALTRI 35GB?!

**ME**: Non lo so. Forse c'è un altro leak.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Sessioni: 193KB cada
- Totale: 4.4GB/giorno
- Usato: 48GB
- Diff: 35GB misteriosi

E tutto era chiaro. Ma non completamente. Perché c'era un altro leak. E dovevo trovarlo. Amen.

---

**Giovedì - 14:00**

Ho cercato l'altro leak. E l'ho trovato.

**TERMINALE**:
```
# Controlla altri file modificati
git show a1b2c3d --stat
commit a1b2c3d
Author: JN
Date:   Mon Nov 18 16:30:00 2026

    "Add in-memory cache for user sessions"

    src/lib/session-cache.js      | 25 +++++++++++++++++++++++++
    src/services/auth.js          | 45 ++++++++++++++++++++++++++++++---------
    src/middleware/request-log.js | 15 +++++++++++++++

# Controlla request-log.js
git show a1b2c3d -- src/middleware/request-log.js
+// Log delle richieste per debugging
+const requestLog = [];
+
+function logRequest(req, res, next) {
+  const entry = {
+    timestamp: Date.now(),
+    method: req.method,
+    url: req.url,
+    headers: req.headers,
+    body: req.body,
+    user: req.user,
+    response: null,
+  };
+  
+  // Salva la risposta
+  const originalEnd = res.end;
+  res.end = function(chunk) {
+    entry.response = chunk ? chunk.toString() : null;
+    requestLog.push(entry);
+    originalEnd.apply(res, arguments);
+  };
+  
+  next();
+}
+
+module.exports = { logRequest, requestLog };
```

**ME**: ECCO L'ALTRO LEAK!

**TL**: COSA?!

**ME**: Il request log. Salva ogni richiesta. E ogni risposta.

**TL**: E QUANTE RICHIESTE?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla richieste per minuto
kubectl logs -l app=api-server --since=1h | grep -c "incoming request"
12456

# Richieste per minuto
12456 / 60 = 207 req/min

# Richieste in 3 giorni
207 × 60 × 24 × 3 = 894240 richieste
```

**ME**: 894.240 richieste in 3 giorni.

**TL**: E QUANTO PESA OGNI RICHIESTA?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla dimensione media richiesta
kubectl exec -it api-server-7d9f4-xyz99 -- node -e "
const requestLog = require('./src/middleware/request-log').requestLog;
let total = 0;
for (const entry of requestLog) {
  total += JSON.stringify(entry).length;
}
console.log('Total entries:', requestLog.length);
console.log('Total size:', (total / 1024 / 1024).toFixed(2), 'MB');
console.log('Avg per entry:', (total / requestLog.length).toFixed(2), 'bytes');
"
Total entries: 45678
Total size: 1.23 GB
Avg per entry: 27.8 KB
```

**ME**: 27.8KB per richiesta loggata.

**TL**: E 894.240 RICHIESTE × 27.8KB?!

**ME**: 23.4GB. Di solo request log.

**TL**: E CON LE SESSIONI?!

**ME**: 23.4GB + 13GB = 36.4GB.

**TL**: E GLI ALTRI 12GB?!

**ME**: Probabilmente overhead di Node.js. E oggetti temporanei.

**TL**: E QUINDI?!

**ME**: E quindi... JN ha creato DUE memory leak. La cache delle sessioni. E il log delle richieste.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Sessioni: 13GB
- Request log: 23.4GB
- Overhead: 12GB
- Totale: 48GB

E tutto era chiaro. JN aveva creato due cache. Entrambe senza limiti. Entrambe crescevano per sempre. E il server moriva. Amen.

---

**Venerdì - La Riunione**

Venerdì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che un memory leak abbia mangiato 48GB?

**ME**: Due memory leak. La cache delle sessioni. E il log delle richieste.

**UL**: E CHI HA SCRITTO IL CODICE?

**ME**: JN.

**UL**: E PERCHÉ NON HA MESSO LIMITI?

**JN**: Non sapevo che servissero.

**UL**: NON SAPEVI?!

**JN**: No. Pensavo che la memoria fosse... abbondante.

**UL**: ABBONDANTE?!

**JN**: Sì. Abbastanza per tutto.

**UL**: E HAI SALVATO TUTTE LE RICHIESTE IN MEMORIA?!

**JN**: Sì. Per debugging.

**UL**: PER DEBUGGING?!

**JN**: Sì. Così potevo vedere cosa succedeva.

**UL**: E NON HAI PENSAto CHE AVREBBE MANGIATO LA RAM?!

**JN**: No. Non ci ho pensato.

**CTO**: Il problema è che non c'è cultura della memoria. E ora la creiamo.

**ME**: Sì.

**CTO**: E chi la crea?

**ME**: La creo io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E COSA HAI IMPARATO?

**JN**: A mettere limiti alle cache.

**CTO**: E COS'ALTRO?

**JN**: A non salvare tutto in memoria.

**CTO**: E COS'ALTRO?

**JN**: A usare TTL per le cache.

**CTO**: E COS'ALTRO?

**JN**: A pensare alla memoria come a una risorsa limitata.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul processo rotto. E sulla memoria mangiata. Amen.

---

**Venerdì - Il Fix**

Venerdì. Ho fixato il codice. Con limiti. E TTL. E LRU.

**TERMINALE**:
```
# Fix della cache sessioni
cat > src/lib/session-cache.js << 'EOF'
// Cache LRU con TTL per sessioni utente
const LRU = require('lru-cache');

const sessionCache = new LRU({
  max: 10000,              // Max 10000 sessioni
  maxAge: 1000 * 60 * 30,  // TTL 30 minuti
  sizeCalculation: (value, key) => {
    // Calcola dimensione in byte
    return JSON.stringify(value).length;
  },
  maxSize: 500 * 1024 * 1024,  // Max 500MB totali
});

function setSession(userId, sessionData) {
  // Salva solo i dati essenziali
  const minimal = {
    userId: sessionData.userId,
    username: sessionData.username,
    permissions: sessionData.permissions,
    lastActivity: Date.now(),
  };
  sessionCache.set(userId, minimal);
}

function getSession(userId) {
  return sessionCache.get(userId);
}

function deleteSession(userId) {
  sessionCache.del(userId);
}

module.exports = { setSession, getSession, deleteSession };
EOF

# Fix del request log
cat > src/middleware/request-log.js << 'EOF'
// Log delle richieste con buffer circolare
const CircularBuffer = require('circular-buffer');

const requestLog = new CircularBuffer(1000);  // Max 1000 richieste

function logRequest(req, res, next) {
  const entry = {
    timestamp: Date.now(),
    method: req.method,
    url: req.url,
    statusCode: null,
  };
  
  const originalEnd = res.end;
  res.end = function(chunk) {
    entry.statusCode = res.statusCode;
    requestLog.push(entry);
    originalEnd.apply(res, arguments);
  };
  
  next();
}

module.exports = { logRequest, requestLog };
EOF

# Commit
git checkout -b fix/memory-leak-session-cache
git add src/lib/session-cache.js src/middleware/request-log.js
git commit -m "Fix: add limits and TTL to session cache and request log"
git push origin fix/memory-leak-session-cache
```

**TL**: Hai fixato tutto?

**ME**: Sì. Cache LRU con 10000 sessioni max. TTL 30 minuti. Max 500MB totali.

**TL**: E IL REQUEST LOG?

**ME**: Buffer circolare. Max 1000 richieste. Solo dati essenziali.

**TL**: E LA DIMENSIONE DELLE SESSIONI?

**ME**: Ridotta. Salvo solo userId, username, permissions. Niente carrello, cronologia, notifiche.

**TL**: E DOVE VANNO QUEI DATI?

**ME**: Nel database. O in Redis. Non in memoria.

**TL**: E LA PERFORMANCE?

**ME**: Un po' più lenta. Ma il server non crasha.

**TL**: E È UN BUON COMPROMESSO?

**ME**: Sì. Meglio lento che morto.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cache: LRU con limiti
- TTL: 30 minuti
- Max: 10000 sessioni, 500MB
- Request log: buffer circolare 1000

E tutto funzionava. Ma avevo imparato una lezione. La lezione che le cache vanno limitate. E che i TTL sono essenziali. E che la memoria non è infinita. E che JN va educato. Amen.

---

**Sabato - I Test**

Sabato. Ho aggiunto test. Per i memory leak.

**TERMINALE**:
```
# Test per cache LRU
cat > src/lib/session-cache.test.js << 'EOF'
describe('SessionCache', () => {
  it('should limit number of sessions', () => {
    const cache = new LRU({ max: 100 });
    
    for (let i = 0; i < 200; i++) {
      cache.set(i, { userId: i });
    }
    
    expect(cache.size).toBe(100);
  });

  it('should expire sessions after TTL', async () => {
    const cache = new LRU({ max: 100, maxAge: 100 });
    
    cache.set(1, { userId: 1 });
    await sleep(150);
    
    expect(cache.get(1)).toBeUndefined();
  });

  it('should limit total size', () => {
    const cache = new LRU({
      max: 10000,
      maxSize: 1000,  // 1KB max
      sizeCalculation: (v) => JSON.stringify(v).length,
    });
    
    cache.set(1, { data: 'x'.repeat(500) });
    cache.set(2, { data: 'x'.repeat(600) });  // Questo dovrebbe evictare il primo
    
    expect(cache.get(1)).toBeUndefined();
    expect(cache.get(2)).toBeDefined();
  });
});
EOF

# Test per buffer circolare
cat > src/middleware/request-log.test.js << 'EOF'
describe('RequestLog', () => {
  it('should limit number of entries', () => {
    const buffer = new CircularBuffer(100);
    
    for (let i = 0; i < 200; i++) {
      buffer.push({ id: i });
    }
    
    expect(buffer.size()).toBe(100);
  });

  it('should overwrite old entries', () => {
    const buffer = new CircularBuffer(10);
    
    for (let i = 0; i < 15; i++) {
      buffer.push({ id: i });
    }
    
    const entries = buffer.toarray();
    expect(entries[0].id).toBe(5);  // I primi 5 sono stati sovrascritti
    expect(entries[9].id).toBe(14);
  });
});
EOF

# Esegui test
npm test
PASS  src/lib/session-cache.test.js
PASS  src/middleware/request-log.test.js
```

**TL**: Hai aggiunto i test?

**ME**: Sì. Per i limiti. Per il TTL. Per la dimensione.

**TL**: E JN?

**ME**: JN deve far passare questi test prima di mergiare.

**TL**: E SE I TEST NON PASSANO?

**ME**: Allora non può mergiare.

**TL**: E SE JN AGGIUNGE UNA NUOVA CACHE?

**ME**: Allora deve aggiungere un test per i limiti.

**TL**: E SE NON LO FA?

**ME**: Allora il code review lo richiede.

**TL**: E SE IL REVIEWER NON LO NOTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: passing
- Limiti: testati
- TTL: testati
- LRU: testato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i test salvano. E che i memory leak uccidono. E che le cache vanno limitate. E che JN va educato. Amen.

---

**Domenica - Il Monitoraggio**

Domenica. Ho aggiunto monitoraggio. Per vedere i memory leak prima che uccidano.

**TERMINALE**:
```
# Aggiungi metriche per memoria
cat > src/lib/memory-metrics.js << 'EOF'
const prometheus = require('prom-client');

const heapUsed = new prometheus.Gauge({
  name: 'nodejs_heap_used_bytes',
  help: 'Heap memory used',
});

const heapTotal = new prometheus.Gauge({
  name: 'nodejs_heap_total_bytes',
  help: 'Heap memory total',
});

const externalMemory = new prometheus.Gauge({
  name: 'nodejs_external_memory_bytes',
  help: 'External memory used',
});

const cacheSize = new prometheus.Gauge({
  name: 'session_cache_size',
  help: 'Number of sessions in cache',
});

const cacheBytes = new prometheus.Gauge({
  name: 'session_cache_bytes',
  help: 'Total bytes in session cache',
});

setInterval(() => {
  const mem = process.memoryUsage();
  heapUsed.set(mem.heapUsed);
  heapTotal.set(mem.heapTotal);
  externalMemory.set(mem.external);
  
  // Aggiorna metriche cache
  const sessionCache = require('./session-cache').sessionCache;
  cacheSize.set(sessionCache.size);
  cacheBytes.set(sessionCache.calculatedSize || 0);
}, 10000);
EOF

# Configura alert per memoria
cat > /etc/prometheus/alerts/memory.yml << 'EOF'
groups:
  - name: memory
    rules:
      - alert: HighMemoryUsage
        expr: nodejs_heap_used_bytes / nodejs_heap_total_bytes > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.pod }}"
          description: "Heap usage is above 80% for more than 5 minutes."

      - alert: MemoryLeakSuspected
        expr: deriv(nodejs_heap_used_bytes[1h]) > 0
        for: 30m
        labels:
          severity: critical
        annotations:
          summary: "Memory leak suspected on {{ $labels.pod }}"
          description: "Heap memory is continuously growing. Possible memory leak."

      - alert: SessionCacheTooLarge
        expr: session_cache_bytes > 400 * 1024 * 1024
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Session cache is too large"
          description: "Session cache is using more than 400MB. Consider increasing limits or investigating."
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Con metriche per heap, cache, e alert per leak.

**TL**: E QUANDO ALERTA?

**ME**: Quando la memoria cresce per più di 30 minuti. O quando l'heap è sopra l'80%.

**TL**: E LA CACHE?

**ME**: Alerta se supera 400MB.

**TL**: E QUINDI?

**ME**: E quindi... vediamo i memory leak prima che uccidano.

**TL**: E SE NON LO VEDIAMO?

**ME**: Allora... il nodo va in OOM. E il pod viene ucciso.

**TL**: E È UN PROBLEMA?

**ME**: No. È meglio che far crashare tutto il nodo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Metriche: attive
- Alert: configurati
- Threshold: 80% heap, 400MB cache
- Leak detection: attiva

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i memory leak vanno osservati. E che JN va educato. Amen.

---

**Lunedì - La Guida**

Lunedì. Ho scritto la guida. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato la memoria.

```markdown
## Guida ai Memory Leak e alle Cache

### Cos'è un Memory Leak?

Un memory leak è quando allochi memoria e non la liberi mai. E la memoria cresce. E cresce. E cresce. Finché non c'è più nulla.

Esempio:
```javascript
// MEMORY LEAK!
const cache = {};
function addToCache(key, value) {
  cache[key] = value;  // Mai rimosso!
}
```

### Come Prevenire i Memory Leak

1. **Usa cache con limiti**: LRU, LFU, o simili.
2. **Imposta TTL**: Le entry vecchie vengono eliminate.
3. **Limita la dimensione**: Max numero di entry, o max byte.
4. **Usa WeakMap per riferimenti**: Se gli oggetti possono essere garbage collected.
5. **Non salvare tutto in memoria**: Usa database o Redis per dati grandi.

### Codice Corretto

```javascript
// MAI così (memory leak)
const sessions = {};
function setSession(userId, data) {
  sessions[userId] = data;  // Mai rimosso!
}

// SEMPRE così (con limiti)
const LRU = require('lru-cache');
const sessions = new LRU({
  max: 10000,              // Max 10000 sessioni
  maxAge: 1000 * 60 * 30,  // TTL 30 minuti
  maxSize: 500 * 1024 * 1024,  // Max 500MB
  sizeCalculation: (v) => JSON.stringify(v).length,
});
```

### Come Rilevare i Memory Leak

```bash
# Controlla memoria del processo
kubectl top pods

# Controlla heap di Node.js
kubectl exec -it pod -- node -e "console.log(process.memoryUsage())"

# Heap snapshot
kubectl exec -it pod -- node -e "
const v8 = require('v8');
console.log(v8.getHeapStatistics());
"
```

### Regole d'Oro

1. Sempre mettere limiti alle cache.
2. Sempre impostare TTL.
3. Sempre monitorare l'uso della memoria.
4. Mai salvare tutto in memoria.
5. Mai crescere all'infinito.
6. Mai assumere che la memoria sia infinita.
7. I memory leak sono silenziosi. Ma uccidono i server. Amen.
```

Il TL ha letto la guida. Il TL ha sorriso. Il TL ha detto: "Quindi hai scritto una guida completa. Con esempi. Con regole. Con metriche. E con la documentazione dei limiti. E ora tutti sanno cosa fare. E la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: la memoria è come il tempo. Non è infinita. E se non la gestisci, si esaurisce. E se si esaurisce, il server muore. E se il server muore, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un memory leak." E UL dice: "E COS'È UN MEMORY LEAK?!" E tu dici: "Memoria allocata mai liberata." E UL dice: "E PERCHÉ NON L'ABBIAMO LIBERATA?!" E tu dici: "Perché JN non ha messo limiti." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, impari. Impari che le cache vanno limitate. E che i TTL sono essenziali. E che la memoria va monitorata. E che JN va educato. Amen.

---

## Il costo del memory leak che ha mangiato la RAM

| Voce | Valore |
|------|--------|
| Servizio | api-server |
| Autore | JN |
| Data deploy | 18/11/2026, 16:30 |
| Data incident | 21/11/2026, 09:17 |
| Tempo in produzione | ~3 giorni |
| Memoria usata | 48GB |
| Limit configurato | 8GB |
| Sessioni salvate | 23.456 |
| Richieste loggate | 894.240 |
| Pod riavviati | 1 |
| Tempo di risoluzione | 2 ore |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "48GB di RAM?!" |
| Reazione CTO | "Cache con limiti + TTL + monitoraggio." |
| Soluzione | LRU cache + TTL + buffer circolare + educazione |
| Lezione imparata | MEMORY LEAK = CACHE SENZA LIMITI + MONITORAGGIO |
| **Totale** | **48GB mangiati + 1 pod ucciso + 2 ore perse + 1 junior educato** |

**Morale**: La memoria è finita. E se non la gestisci, si esaurisce. E se si esaurisce, il server muore. E se il server muore, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Era un memory leak." E UL dice: "E COS'È UN MEMORY LEAK?!" E tu dici: "Memoria allocata mai liberata." E UL dice: "E PERCHÉ NON L'ABBIAMO LIBERATA?!" E tu dici: "Perché JN non ha messo limiti." E la verità è che nessuno ci pensa. Finché non succede. E quando succede, impari. Impari che le cache vanno limitate. E che i TTL sono essenziali. E che la memoria va monitorata. E che i buffer circolari salvano. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](91-il-deadlock-che-ha-bloccato-tutto.md)]**
