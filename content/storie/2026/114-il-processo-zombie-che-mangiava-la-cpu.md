# Il Processo Zombie Che Mangiava La CPU

**Data**: 24/04/2026

**[Storie 2026](index.md) | [Precedente](113-il-migration-che-ha-cancellato-la-tabella-sbagliata.md) | [Prossima](115-la-query-che-non-aveva-limit.md)**

---

C'è una verità nei sistemi operativi che tutti conoscono ma nessuno rispetta: i processi zombie vanno uccisi. Alla radice. Non basta killarli. Non basta kill -9. Bisogna trovare il genitore. E uccidere il genitore. O aspettare che il genitore faccia wait(). E quando il genitore non fa wait(), i processi zombie si accumulano. E occupano memoria. E occupano CPU. E il server rallenta. E tu guardi top. E top mostra: 100% CPU. E tu guardi ps. E ps mostra: 47 processi zombie. E tu guardi JN. E JN guarda te. E tu dici: "Chi ha scritto questo codice?" E JN dice: "Io." E tu dici: "E perché non fa wait()?" E JN dice: "Perché... non ci ho pensato." E la lezione è chiara: i processi zombie vanno gestiti. Sempre. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 09:00. Il caffè era pronto. Il server sembrava lento.

Poi è arrivato l'alert.

**PROMETHEUS**: CPU usage > 95% su production-api-01

**ME**: CPU al 95%?!

**TL**: CPU al 95%?!

**ME**: Sì. Guarda.

**TERMINALE**:
```
# SSH sul server
ssh production-api-01

# Controlla CPU
top -bn1 | head -20
top - 09:00:15 up 47 days, 23:12,  1 user,  load average: 15.23, 12.45, 8.90
Tasks: 847 total,   1 running, 799 sleeping,   0 stopped,  47 zombie
%Cpu(s): 95.2 us,  2.1 sy,  0.0 ni,  2.7 id,  0.0 wa,  0.0 hi,  0.0 si

# Controlla processi zombie
ps aux | awk '$8 ~ /Z/ {print}' | head -20
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
app        1234  0.0  0.0      0     0 ?        Z    08:45   0:00 [worker] <defunct>
app        1235  0.0  0.0      0     0 ?        Z    08:45   0:00 [worker] <defunct>
app        1236  0.0  0.0      0     0 ?        Z    08:45   0:00 [worker] <defunct>
app        1237  0.0  0.0      0     0 ?        Z    08:45   0:00 [worker] <defunct>
app        1238  0.0  0.0      0     0 ?        Z    08:45   0:00 [worker] <defunct>
...

# Conta zombie
ps aux | awk '$8 ~ /Z/ {print}' | wc -l
47
```

**ME**: 47 processi zombie. E la CPU è al 95%.

**TL**: 47 ZOMBIE?! E LA CPU È AL 95%?!

**ME**: Sì. Ma gli zombie non dovrebbero consumare CPU.

**TL**: E QUINDI?!

**ME**: Quindi c'è qualcos'altro. Guardo i processi reali.

**TERMINALE**:
```
# Controlla processi per CPU
ps aux --sort=-%cpu | head -10
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
app        1001 89.3  2.1 123456 45678 ?        R    08:30  45:12 node worker.js
app        1002  5.2  1.8 123456 45678 ?        S    08:30   2:15 node worker.js
app        1003  0.1  1.8 123456 45678 ?        S    08:30   0:05 node worker.js
root         1  0.0  0.1 123456  1234 ?        Ss   Jan01   0:01 /sbin/init

# Controlla cosa fa il processo 1001
strace -p 1001 -c
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- --------
 89.12   145.234567         123   1234567           wait4
 10.88    17.890123         456     12345           clone
```

**ME**: Il processo 1001 sta chiamando wait4() 1.2 milioni di volte.

**TL**: WAIT4?! PERCHÉ?!

**ME**: Perché... sta cercando di fare wait() sui figli. Ma i figli sono zombie.

**TL**: E QUINDI?!

**ME**: E quindi il processo genitore è in un loop infinito. Chiama wait() su figli che non esistono più. E consuma CPU.

**TL**: E CHI HA SCRITTO QUESTO CODICE?!

**ME**: JN.

**TL**: JN?!

**ME**: Sì. Tre settimane fa. Per il worker.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- CPU: 95%
- Zombie: 47
- Genitore: in loop
- JN: responsabile

E tutto era chiaro. Il genitore non faceva wait() correttamente. E i figli diventavano zombie. E il genitore cercava di fare wait() in un loop. E consumava CPU. E il server rallentava. Amen.

---

**Lunedì - 09:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era calmo. Per ora.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto il worker che lancia i processi figli?

**JN**: Sì. Tre settimane fa. Perché?

**ME**: Ci sono 47 processi zombie. E il genitore consuma il 90% della CPU.

**JN**: 90%?!

**ME**: Sì. Perché il genitore chiama wait() in un loop infinito.

**JN**: Ah. Sì. Volevo essere sicuro di raccogliere tutti i figli.

**ME**: TUTTI I FIGLI?!

**JN**: Sì. Così non restano zombie.

**ME**: E INVECE RESTANO ZOMBIE!

**JN**: Come?!

**ME**: I figli terminano. Diventano zombie. E il genitore chiama wait() ma non trova nulla. E riprova. E riprova. E consuma CPU.

**JN**: Ma... il codice dovrebbe funzionare!

**ME**: Fammi vedere il codice.

**TERMINALE**:
```
# Leggi il codice del worker
cat workers/parent.js
const { spawn } = require('child_process');

function runWorker() {
  const worker = spawn('node', ['worker.js']);

  worker.on('exit', (code) => {
    console.log(`Worker exited with code ${code}`);
  });

  // Raccogli i figli
  while (true) {
    const result = waitpid(-1, WNOHANG);
    if (result === 0) break;
  }
}

// Lancia 50 worker
for (let i = 0; i < 50; i++) {
  runWorker();
}
```

**ME**: JN, questo codice è sbagliato.

**JN**: Perché?!

**ME**: Perché chiami waitpid() in un loop. Ma waitpid() non è una funzione Node.js. L'hai implementata tu?

**JN**: Sì. Con un modulo nativo.

**ME**: E cosa fa?

**JN**: Chiama waitpid() di Linux.

**ME**: E SE NON TROVA NULLA?!

**JN**: Ritorna 0. E il loop si ferma.

**ME**: E SE TROVA UNO ZOMBIE?!

**JN**: Lo raccoglie. E continua.

**ME**: E SE NON CI SONO ZOMBIE?!

**JN**: Ritorna 0. E il loop si ferma.

**ME**: E SE INVECE DI RITORNARE 0, RITORNA -1?!

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Ah. Non ci ho pensato.

**ME**: E QUINDI?!

**JN**: E quindi... il loop non si ferma mai.

**ME**: E CONSUMA IL 90% DELLA CPU!

**JN**: Ah.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- CPU: 95%
- Zombie: 47
- Genitore: loop infinito
- JN: colpevole

E la lezione era chiara. I loop infiniti sono pericolosi. E JN va educato. Di nuovo. Amen.

---

**Lunedì - 10:00**

Ho fixato il codice. E ucciso gli zombie.

**TERMINALE**:
```
# Uccidi il genitore
kill -9 1001

# Verifica zombie
ps aux | awk '$8 ~ /Z/ {print}' | wc -l
0

# Fix il codice
cat > workers/parent.js << 'EOF'
const { spawn } = require('child_process');

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = spawn('node', ['worker.js']);

    worker.on('exit', (code) => {
      console.log(`Worker exited with code ${code}`);
      resolve(code);
    });

    worker.on('error', (err) => {
      console.error(`Worker error: ${err.message}`);
      reject(err);
    });
  });
}

// Lancia worker con limite di concorrenza
async function runWorkers(count, concurrency = 5) {
  const workers = [];

  for (let i = 0; i < count; i += concurrency) {
    const batch = [];
    for (let j = 0; j < concurrency && i + j < count; j++) {
      batch.push(runWorker());
    }
    await Promise.all(batch);
  }
}

runWorkers(50).then(() => {
  console.log('All workers completed');
}).catch((err) => {
  console.error('Worker batch failed:', err);
  process.exit(1);
});
EOF

# Riavvia il servizio
systemctl restart worker-parent
```

**ME**: Codice fixato. Gli zombie sono morti. La CPU è libera.

**TL**: E LA CPU?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla CPU
top -bn1 | head -5
top - 10:05:23 up 47 days, 23:17,  1 user,  load average: 0.52, 2.34, 5.67
Tasks: 801 total,   1 running, 800 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.2 us,  1.1 sy,  0.0 ni, 93.7 id,  0.0 wa,  0.0 hi,  0.0 si

# Controlla zombie
ps aux | awk '$8 ~ /Z/ {print}' | wc -l
0
```

**ME**: CPU al 5%. Zero zombie.

**TL**: E JN?!

**ME**: JN... lo educo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- CPU: 5%
- Zombie: 0
- Genitore: fixato
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i processi zombie vanno gestiti. E che i loop infiniti vanno evitati. E che JN va educato. Sempre. Amen.

---

**Lunedì - 10:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era curioso.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con i processi zombie.

**UL**: Zombie?!

**ME**: Sì. 47 processi zombie. E il genitore consumava il 90% della CPU.

**UL**: 90%?!

**ME**: Sì. Perché il genitore chiamava wait() in un loop infinito.

**UL**: E CHI HA SCRITTO IL CODICE?!

**ME**: JN.

**UL**: JN?!

**ME**: Sì. Tre settimane fa.

**UL**: E PERCHÉ NON L'HA TESTATO?!

**ME**: L'ha testato. Ma non ha testato il caso in cui non ci sono figli.

**UL**: E QUANTO È DURATO?!

**ME**: Circa 30 minuti. Dalle 08:30 alle 09:00.

**UL**: E I CLIENTI?!

**ME**: Hanno notato lentezza. Ma niente downtime.

**UL**: E ORA?!

**ME**: Ora è fixato. CPU al 5%. Zero zombie.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I processi zombie vanno gestiti. E i loop infiniti vanno evitati. E JN va educato. Sempre. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i processi che lanciano figli. Per trovare altri potenziali zombie.

**TERMINALE**:
```
# Cerca tutti i file che usano spawn o fork
grep -r "spawn\|fork\|exec" --include="*.js" . | grep -v node_modules | head -30

# Controlla ogni file
for file in $(grep -rl "spawn\|fork\|exec" --include="*.js" . | grep -v node_modules); do
  echo "=== $file ==="
  grep -A5 "spawn\|fork\|exec" $file | head -20
done

# Risultati problematici
=== workers/parent.js ===
# Fixed - ora usa Promise

=== workers/legacy-parent.js ===
const { spawn } = require('child_process');
function runWorker() {
  const worker = spawn('node', ['worker.js']);
  // Nessun handler per exit!
}

=== workers/old-parent.js ===
const { fork } = require('child_process');
function runWorker() {
  const worker = fork('./worker.js');
  worker.disconnect(); // Disconnette ma non fa wait!
}
```

**ME**: Ci sono altri 2 file che non gestiscono i figli correttamente.

**TL**: ALTRI 2?!

**ME**: Sì. Non hanno handler per exit. E non fanno wait().

**TL**: E POSSONO CREARE ZOMBIE?!

**ME**: Sì. In qualsiasi momento.

**TL**: E FIXALI!

**ME**: Subito.

**TERMINALE**:
```
# Fix legacy-parent.js
cat > workers/legacy-parent.js << 'EOF'
const { spawn } = require('child_process');

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = spawn('node', ['worker.js']);

    worker.on('exit', (code) => {
      resolve(code);
    });

    worker.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { runWorker };
EOF

# Fix old-parent.js
cat > workers/old-parent.js << 'EOF'
const { fork } = require('child_process');

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = fork('./worker.js');

    worker.on('exit', (code) => {
      resolve(code);
    });

    worker.on('error', (err) => {
      reject(err);
    });

    // Non disconnettere prima che il figlio termini
  });
}

module.exports = { runWorker };
EOF

# Riavvia i servizi
systemctl restart legacy-worker
systemctl restart old-worker
```

**ME**: Tutti i file fixati. Ora gestiscono correttamente i figli.

**TL**: E QUANTI ERANO?!

**ME**: 3. parent.js, legacy-parent.js, old-parent.js.

**TL**: E TUTTI POTREBBERO CREARE ZOMBIE?!

**ME**: Sì. Se non gestiscono correttamente i figli.

**TL**: E CHI LI HA SCRITTI?!

**ME**: JN. Bob. E... io.

**TL**: TU?!

**ME**: Sì. Due anni fa. Per il vecchio worker.

**TL**: E PERCHÉ?!

**ME**: Perché... non sapevo che disconnect() non fa wait().

**TL**: E QUINDI?!

**ME**: E quindi... anche io devo imparare.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- File problematici: 3
- File fixati: 3
- Autori: JN, Bob, ME
- Lezione: imparata

E tutto era fixato. Ma avevo imparato una lezione. La lezione che tutti scrivono codice che può creare zombie. E che tutti devono imparare. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Con pazienza. E un po' di rassegnazione.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per gli zombie?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che gli zombie sono stati un disastro. Ma sono anche un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: quando lanci un processo figlio, DEVI gestire la sua terminazione.

**JN**: Sempre?

**ME**: Sempre. Se non lo fai, il figlio diventa zombie. E gli zombie occupano risorse.

**JN**: Ma non occupano CPU!

**ME**: Gli zombie no. Ma il genitore che cerca di fare wait() in un loop, sì.

**JN**: Ah.

**ME**: Secondo: usa Promise per gestire i processi figli.

**JN**: Promise?

**ME**: Sì. Promise. Async/await. È più pulito. E più sicuro.

**JN**: Ok.

**ME**: Terzo: non fare loop infiniti.

**JN**: Mai?

**ME**: Mai. A meno che tu non abbia un motivo valido. E un modo per uscirne.

**JN**: E SE HO BISOGNO DI UN LOOP?!

**ME**: Allora metti una condizione di uscita. E un timeout. E un limite di iterazioni.

**JN**: Ok.

**ME**: Quarto: testa tutti i casi. Non solo quello che funziona.

**JN**: Tutti?

**ME**: Tutti. Il caso in cui funziona. Il caso in cui fallisce. Il caso in cui non c'è nulla. Il caso in cui c'è troppo.

**JN**: E SE NON HO TEMPO?!

**ME**: Allimenti trovi il tempo. Perché la prossima volta qualcuno deve debuggare il tuo codice. E se non sai cosa fa, non sai se funziona.

**JN**: Ok.

**ME**: Quinto: i processi zombie sono come i debiti tecnici. Si accumulano. E prima o poi ti uccidono.

**JN**: Uccidono?!

**ME**: Metaforicamente. Uccidono il server. E la tua reputazione. E il tuo weekend.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Zombie: 0
- CPU: 5%
- Genitori: fixati
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è gestire correttamente i processi figli. E testare. E educare. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i processi zombie.

**TERMINALE**:
```
# Configura alert per zombie
cat > /etc/prometheus/alerts/zombie.yml << 'EOF'
groups:
  - name: zombie-processes
    rules:
      - alert: TooManyZombieProcesses
        expr: node_zombie_processes > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Too many zombie processes on {{ $labels.instance }}"
          description: "{{ $value }} zombie processes detected. Check parent process."

      - alert: ZombieProcessesCritical
        expr: node_zombie_processes > 50
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Critical number of zombie processes on {{ $labels.instance }}"
          description: "{{ $value }} zombie processes detected. Immediate action required."

      - alert: ParentProcessHighCPU
        expr: |
          sum by (instance) (
            rate(process_cpu_seconds_total{cmdline=~".*parent.*"}[5m])
          ) > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Parent process consuming high CPU on {{ $labels.instance }}"
          description: "Parent process may be stuck in a wait() loop. Check for zombie children."
EOF

# Aggiungi metriche per zombie
cat > /etc/node_exporter/collectors/zombie.sh << 'EOF'
#!/bin/bash
ZOMBIE_COUNT=$(ps aux | awk '$8 ~ /Z/ {print}' | wc -l)
echo "zombie_processes $ZOMBIE_COUNT"
EOF

chmod +x /etc/node_exporter/collectors/zombie.sh

# Riavvia node_exporter
systemctl restart node_exporter
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per zombie. Alert per genitori con CPU alta. Metriche per contare gli zombie.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo quando si accumulano gli zombie.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Zombie: 0
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i processi zombie vanno gestiti. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero creato zombie.

```markdown
## Incident #ZOMBIE-001: Il Processo Zombie Che Mangiava La CPU

**Data incident**: Lunedì 24 aprile 2026, 08:30
**Autore**: JN
**Servizio**: worker-parent
**Problema**: 47 processi zombie + genitore in loop infinito
**Causa**: Genitore chiamava wait() in loop senza condizione di uscita
**Tempo in produzione**: 3 settimane
**CPU consumata**: 90%
**Tempo di risoluzione**: 30 minuti
**Downtime**: 0 (servizio rallentato)
**Reazione UL**: "Zombie?!"
**Reazione TL**: "90%?!"
**Reazione CTO**: "I processi zombie vanno gestiti."
**Soluzione**: Codice fixato + audit + educazione
**Lezione imparata**: I PROCESSI ZOMBIE VANNO GESTITI. SEMPRE.

**Regole per i processi figli**:
1. Quando lanci un figlio, DEVI gestire la sua terminazione.
2. Usa Promise per gestire i processi figli.
3. Non fare loop infiniti senza condizione di uscita.
4. Testa tutti i casi: funziona, fallisce, vuoto, troppo.
5. I zombie si accumulano. E prima o poi ti uccidono.
6. Monitora il numero di zombie. E la CPU del genitore.
7. Se il genitore consuma CPU, controlla i figli.
8. kill -9 non basta. Bisogna fixare il genitore. Amen.

**Come gestire correttamente i processi figli**:
```javascript
const { spawn } = require('child_process');

// Modo corretto: Promise
function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = spawn('node', ['worker.js']);

    worker.on('exit', (code) => {
      console.log(`Worker exited with code ${code}`);
      resolve(code);
    });

    worker.on('error', (err) => {
      console.error(`Worker error: ${err.message}`);
      reject(err);
    });

    // Timeout per evitare figli che non terminano mai
    setTimeout(() => {
      worker.kill();
      reject(new Error('Worker timeout'));
    }, 30000);
  });
}

// Lancia worker con concorrenza limitata
async function runWorkers(count, concurrency = 5) {
  const results = [];

  for (let i = 0; i < count; i += concurrency) {
    const batch = [];
    for (let j = 0; j < concurrency && i + j < count; j++) {
      batch.push(runWorker());
    }
    const batchResults = await Promise.allSettled(batch);
    results.push(...batchResults);
  }

  return results;
}
```

**Come trovare e uccidere gli zombie**:
```bash
# Trova zombie
ps aux | awk '$8 ~ /Z/ {print}'

# Conta zombie
ps aux | awk '$8 ~ /Z/ {print}' | wc -l

# Trova il genitore degli zombie
ps -o ppid= -p $(ps aux | awk '$8 ~ /Z/ {print $2}' | head -1)

# Uccidi il genitore (e gli zombie moriranno con lui)
kill -9 <PPID>

# Se il genitore è init (PID 1), riavvia il sistema
# (ma non dovrebbe mai succedere)
```

**Come monitorare gli zombie**:
```yaml
# Prometheus alert
groups:
  - name: zombie-processes
    rules:
      - alert: TooManyZombieProcesses
        expr: node_zombie_processes > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Too many zombie processes"
          description: "{{ $value }} zombie processes detected"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i processi figli vanno gestiti. E che gli zombie si accumulano. E che i loop infiniti consumano CPU. E che JN va educato. E che 47 zombie sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i processi zombie sono come i bug. Non scompaiono da soli. Bisogna ucciderli. E per ucciderli, bisogna trovare il genitore. E fixare il genitore. E se non fixi il genitore, gli zombie tornano. Sempre. E il server rallenta. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "C'erano 47 zombie." E UL dice: "ZOMBIE?!" E tu dici: "Sì. Processi zombie." E UL dice: "E COSA SONO?!" E tu dici: "Processi figli che sono terminati ma il genitore non ha fatto wait()." E UL dice: "E PERCHÉ NON HA FATTO WAIT?!" E tu dici: "Perché JN ha scritto un loop infinito." E UL dice: "LOOP INFINITO?!" E tu dici: "Sì. Per essere sicuro di raccogliere tutti i figli." E UL dice: "E QUANTO HA COSTATO LA SICUREZZA?!" E tu dici: "90% CPU. E 47 zombie. E 3 file da fixare. E 1 junior da educare." E la verità è che la sicurezza costa. Sempre. E la prossima volta, i processi figli saranno gestiti correttamente. E non ci saranno zombie. O quasi. Amen.

---

## Il costo degli zombie

| Voce | Valore |
|------|--------|
| Servizio | worker-parent |
| Autore | JN |
| Data creazione | 3 aprile 2026 |
| Data incident | 24/04/2026, 08:30 |
| Tempo in produzione | 3 settimane |
| Zombie | 47 |
| CPU consumata | 90% |
| Tempo di risoluzione | 30 minuti |
| Downtime | 0 (rallentamento) |
| File problematici | 3 |
| Servizi affetti | worker-parent, legacy-worker, old-worker |
| Autori | JN, Bob, ME |
| Reazione UL | "Zombie?!" |
| Reazione TL | "90%?!" |
| Reazione CTO | "Vanno gestiti." |
| Soluzione | Codice fixato + audit + educazione |
| Lezione imparata | ZOMBIE = GESTIONE OBBLIGATORIA |
| **Totale** | **47 zombie + 90% CPU + 3 file fixati + 1 junior educato + 1 senior educato** |

**Morale**: I processi zombie vanno gestiti. Sempre. Quando lanci un figlio, DEVI gestire la sua terminazione. Se non lo fai, il figlio diventa zombie. E gli zombie si accumulano. E occupano risorse. E il genitore cerca di fare wait() in un loop. E consuma CPU. E il server rallenta. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "C'erano 47 zombie." E tutti dicono: "ZOMBIE?!" E tu dici: "Sì. Processi zombie." E la lezione è chiara: i processi figli vanno gestiti. E i loop infiniti vanno evitati. E JN va educato. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](113-il-migration-che-ha-cancellato-la-tabella-sbagliata.md) | [Prossima](115-la-query-che-non-aveva-limit.md)**
