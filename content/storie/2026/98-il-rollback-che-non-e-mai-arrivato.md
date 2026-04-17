# Il Rollback Che Non È Mai Arrivato

**Data**: 02/01/2027

**[Storie 2026](index.md) | [Precedente](97-il-secret-che-era-nel-repo-pubblico.md) | [Prossima](99-il-health-check-che-mentiva-sempre.md)**

---

C'è una verità nel deployment continuo che tutti conoscono ma nessuno rispetta: il rollback è la tua rete di sicurezza. Finché non lo è. E quando non lo è, ti ritrovi con un sistema down. E i clienti che chiamano. E UL che chiama. E tu che provi a fare rollback. E il rollback non parte. O parte ma non arriva. O arriva ma non funziona. E tu ti chiedi: "Com'è possibile che il rollback non funzioni?" E la risposta è semplice: perché nessuno l'ha mai testato. E il rollback è come un paracadute. Se non lo testi, quando ti serve non si apre. E tu cadi. E il sistema cade. E tutti cadono. Amen.

![](../../img/server.jpg)

---

**Lunedì - Il Deploy**

Era lunedì. Le 17:00. JN voleva andare a casa.

**JN**: Ho finito la nuova versione del checkout!

**ME**: Fammi vedere.

**JN**: È semplice. Ho ottimizzato le query del database. E aggiunto la cache.

**ME**: E l'hai testato?

**JN**: Sì. In staging. Funziona.

**ME**: E il rollback?

**JN**: C'è. Automatico.

**ME**: E l'hai testato?

**JN**: No. Ma c'è.

**ME**: E SE NON FUNZIONA?!

**JN**: Funziona. È automatico.

**ME**: E SE IL DATABASE HA PROBLEMI?!

**JN**: Allora... facciamo rollback.

**ME**: E SE IL ROLLBACK NON FUNZIONA?!

**JN**: Funziona. È automatico.

**ME**: Ok. Fai il deploy.

JN ha fatto il deploy. Alle 17:15. Di lunedì. E io ho pensato: "Che male può fare un rollback automatico?" E la risposta era: tutto. Tutto il male del mondo. Perché il rollback automatico non era mai stato testato. E quando non testi qualcosa, non sai se funziona. E quando non sai se funziona, scopri che non funziona. Nel momento peggiore. Amen.

---

**Lunedì - 17:30**

Il deploy è andato. Il sistema sembrava ok. Poi sono arrivati gli errori.

**ALERT**: Error rate > 5% for checkout-service

**ME**: Errori nel checkout?!

**TL**: Errori?!

**ME**: Sì. 5% delle richieste falliscono.

**TL**: E QUANTE SONO?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla errori
kubectl logs -l app=checkout-service --since=30m | grep -i error | tail -20
2027-01-01 17:20:01 ERROR: Database connection timeout
2027-01-01 17:20:01 ERROR: Query failed: SELECT * FROM orders WHERE...
2027-01-01 17:20:02 ERROR: Database connection timeout
2027-01-01 17:20:02 ERROR: Query failed: SELECT * FROM orders WHERE...
...

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total{status="500"}[5m]))'
{status: "success", data: {result: [{value: ["234"]}]}}  # 234 errori al secondo

# Controlla database
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active'"
count
-------
892

# Controlla connessioni
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT max_conn, used FROM pg_settings"
max_conn | used
----------+------
100       | 98
```

**ME**: Il database ha 98 connessioni su 100. Quasi sature.

**TL**: E PERCHÉ?!

**ME**: Le query ottimizzate di JN. Aumentano le connessioni.

**TL**: E QUINDI?!

**ME**: E quindi... il database è sovraccarico.

**TL**: E IL CHECKOUT?!

**ME**: Down. 5% delle richieste falliscono.

**TL**: E I CLIENTI?!

**ME**: Non possono completare gli ordini.

**TL**: E QUANTI ORDINI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla ordini falliti
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-01-01 17:00:00' AND status = 'failed'"
count
-------
1234

# Controlla ordini completati
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-01-01 17:00:00' AND status = 'completed'"
count
-------
567
```

**ME**: 1234 ordini falliti. 567 completati. Più del 50% fallisce.

**TL**: E QUINDI?!

**ME**: E quindi... facciamo rollback.

**TL**: E IL ROLLBACK?!

**ME**: È automatico. Parte ora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Errori: 234/s
- Ordini falliti: 1234
- Rollback: in corso

E tutto sembrava sotto controllo. Ma il rollback non era mai stato testato. E quando qualcosa non è mai stato testato, non funziona. Amen.

---

**Lunedì - 17:45**

Ho lanciato il rollback. Il rollback non è partito.

**TERMINALE**:
```
# Lancio rollback
kubectl rollout undo deployment/checkout-service

# Verifica stato
kubectl rollout status deployment/checkout-service
Waiting for deployment "checkout-service" rollout to finish: 1 out of 3 new replicas have been updated...
Error: deployment "checkout-service" exceeded its progress deadline

# Controlla pod
kubectl get pods -l app=checkout-service
NAME                               READY   STATUS             RESTARTS   AGE
checkout-service-abc123-1         0/1     ImagePullBackOff    0          2m
checkout-service-def456-2          1/1     Running             0          30m
checkout-service-ghi789-2          1/1     Running             0          30m
checkout-service-jkl012-2          1/1     Running             0          30m

# Controlla errori
kubectl describe pod checkout-service-abc123-1 | grep -A5 "Events"
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Pulling    2m                 kubelet            Pulling image "registry.company.com/checkout:v1.2.3"
  Warning  Failed     1m                 kubelet            Failed to pull image "registry.company.com/checkout:v1.2.3": rpc error: code = Unknown desc = Error response from daemon: manifest for registry.company.com/checkout:v1.2.3 not found
```

**ME**: Il rollback sta fallendo. L'immagine vecchia non esiste.

**TL**: NON ESISTE?!

**ME**: No. È stata rimossa dal registry.

**TL**: E PERCHÉ?!

**ME**: Perché il registry ha una retention policy. E cancella le immagini vecchie.

**TL**: E QUINDI?!

**ME**: E quindi... non possiamo fare rollback.

**TL**: E ORA?!

**ME**: Ora... fixiamo il codice. E facciamo un nuovo deploy.

**TL**: E QUANTO CI VUOLE?!

**ME**: Non lo so. Dipende dal problema.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Rollback: fallito
- Immagine: non trovata
- Retention: attiva
- Soluzione: fix e nuovo deploy

E tutto era chiaro. Il rollback non funzionava. Perché l'immagine vecchia non esisteva. E non esisteva perché il registry la cancellava. E nessuno lo sapeva. Perché nessuno testava il rollback. Amen.

---

**Lunedì - 18:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava andando a casa.

**ME**: JN, il rollback non funziona.

**JN**: Cosa?!

**ME**: L'immagine vecchia non esiste. Il registry l'ha cancellata.

**JN**: Cancellata?!

**ME**: Sì. La retention policy rimuove le immagini dopo 30 giorni.

**JN**: E QUINDI?!

**ME**: E quindi non possiamo fare rollback.

**JN**: Ma... è automatico!

**ME**: AUTOMATICO NON VUOL DIRE CHE FUNZIONA!

**JN**: E ORA?!

**ME**: Ora fixi il codice. E fai un nuovo deploy.

**JN**: E QUANTO CI VUOLE?!

**ME**: Il tempo di capire il problema. E fixarlo.

**JN**: E IL DATABASE?!

**ME**: Il database è sovraccarico. Le tue query ottimizzate aprono troppe connessioni.

**JN**: Ma... erano ottimizzate!

**ME**: OTTIMIZZATE MA NON TESTATE IN PRODUZIONE!

**JN**: Ok. Fixo.

**ME**: E LA PROSSIMA VOLTA TESTA IL ROLLBACK!

**JN**: Ok.

JN ha riattaccato. O forse ha riattaccato per tornare a fixare. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Rollback: fallito
- Immagine: inesistente
- JN: a fixare
- Clienti: incazzati

E la lezione era chiara. Il rollback va testato. E le immagini vanno preservate. E JN va educato. Amen.

---

**Lunedì - 18:30**

Ho configurato il registry per preservare le immagini. E aggiunto test per il rollback.

**TERMINALE**:
```
# Configura retention policy
cat > registry-retention.yaml << 'EOF'
retention:
  enabled: true
  policies:
    - repository: "checkout"
      pattern: "v*"
      keep_n: 10  # Tieni le ultime 10 versioni
    - repository: "checkout"
      pattern: "stable-*"
      keep_n: 5   # Tieni le ultime 5 stable
EOF

# Applica policy
kubectl apply -f registry-retention.yaml

# Verifica immagini
curl -s https://registry.company.com/v2/checkout/tags/list | jq '.tags'
["v1.2.3", "v1.2.2", "v1.2.1", "v1.2.0", "v1.1.9", "v1.1.8", "v1.1.7", "v1.1.6", "v1.1.5", "v1.1.4"]

# Aggiungi test rollback
cat > tests/rollback.test.js << 'EOF'
describe('Rollback', () => {
  it('should have previous image available', async () => {
    const tags = await getRegistryTags('checkout');
    expect(tags.length).toBeGreaterThan(1);
    expect(tags).toContain(process.env.PREVIOUS_VERSION);
  });

  it('should rollback successfully', async () => {
    const result = await kubectl('rollout undo deployment/checkout-service');
    expect(result).toContain('rolled back');
    
    const status = await kubectl('rollout status deployment/checkout-service');
    expect(status).toContain('successfully rolled out');
  });

  it('should serve traffic after rollback', async () => {
    const response = await fetch('https://api.company.com/checkout/health');
    expect(response.status).toBe(200);
  });
});
EOF

# Esegui test
npm test tests/rollback.test.js
PASS  tests/rollback.test.js
```

**TL**: Hai configurato la retention?

**ME**: Sì. Tengo le ultime 10 versioni. E le ultime 5 stable.

**TL**: E IL TEST?!

**ME**: Aggiunto. Verifica che l'immagine esista. E che il rollback funzioni.

**TL**: E QUINDI?!

**ME**: E quindi... la prossima volta il rollback funziona.

**TL**: E SE NON FUNZIONA?!

**ME**: Allora... il test fallisce. E il deploy non parte.

**TL**: E SE LO BYPASSANO?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Retention: configurata
- Test: passing
- Immagini: preservate
- Rollback: testato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il rollback va testato. E che le immagini vanno preservate. E che la retention policy va configurata. E che JN va educato. Amen.

---

**Lunedì - 19:00**

JN ha fixato il codice. Ha fatto un nuovo deploy.

**JN**: Ho fixato le query!

**ME**: Fammi vedere.

**JN**: Ho ridotto le connessioni. E aggiunto connection pooling.

**ME**: E l'hai testato?

**JN**: Sì. In staging. E ho verificato che il rollback funziona.

**ME**: Bene. Fai il deploy.

**TERMINALE**:
```
# Deploy nuova versione
kubectl set image deployment/checkout-service checkout=registry.company.com/checkout:v1.2.5

# Verifica stato
kubectl rollout status deployment/checkout-service
deployment "checkout-service" successfully rolled out

# Controlla errori
kubectl logs -l app=checkout-service --since=5m | grep -i error | wc -l
0

# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total{status="500"}[5m]))'
{status: "success", data: {result: [{value: ["0"]}]}}  # Zero errori

# Controlla connessioni database
kubectl exec -it postgres-0 -- psql -U admin -c "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active'"
count
-------
45
```

**ME**: Deploy completato. Zero errori. Connessioni a 45.

**TL**: E GLI ORDINI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla ordini completati
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-01-01 19:00:00' AND status = 'completed'"
count
-------
234

# Controlla ordini falliti
kubectl exec -it postgres-0 -- psql -U orders -c "SELECT COUNT(*) FROM orders WHERE created_at > '2027-01-01 19:00:00' AND status = 'failed'"
count
-------
0
```

**ME**: 234 ordini completati. Zero falliti.

**TL**: E QUINDI?!

**ME**: E quindi... funziona.

**TL**: E I CLIENTI?!

**ME**: Possono ordinare di nuovo.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Deploy: completato
- Errori: zero
- Ordini: completati
- Rollback: funzionante

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il rollback va testato. E che le immagini vanno preservate. E che i fix vanno verificati. E che JN impara. Amen.

---

**Lunedì - 19:30**

Ho chiamato UL. UL ha risposto. Era lunedì. UL non era di buon umore.

**UL**: Pronto?

**ME**: Abbiamo avuto un problema con il checkout.

**UL**: Che problema?

**ME**: Il deploy di JN ha sovraccaricato il database.

**UL**: SOVRACCARICATO?!

**ME**: Sì. Le query ottimizzate aprivano troppe connessioni.

**UL**: E QUANTI ORDINI PERSI?!

**ME**: 1234. Prima che fixassimo.

**UL**: 1234 ORDINI?!

**ME**: Sì. Ma ora funziona. E il rollback è testato.

**UL**: E PERCHÉ NON ERAVATE PRONTI?!

**ME**: Perché il rollback non era mai stato testato. E l'immagine vecchia non esisteva.

**UL**: NON ESISTEVA?!

**ME**: No. Il registry l'ha cancellata. Con la retention policy.

**UL**: E CHI HA CONFIGURATO LA RETENTION?!

**ME**: Non lo so. Forse qualcuno che non c'è più.

**UL**: E ORA?!

**ME**: Ora tengo le ultime 10 versioni. E il rollback è testato.

**UL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta non succede. Perché c'è il test. E le immagini sono preservate.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ha fixato il codice. E testato il rollback.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. Il rollback va testato. E le immagini vanno preservate. E la documentazione è obbligatoria. Amen.

---

**Martedì - La Riflessione**

Martedì. Ero a casa. Ma non riuscivo a smettere di pensare. Ai rollback. Alle immagini. A JN.

Ho aperto il laptop. Ho scritto la guida.

**TERMINALE**:
```
# Guida ai rollback
cat > docs/rollback-best-practices.md << 'EOF'
## Best Practices per i Rollback

### Regola #1: TESTA IL ROLLBACK

Il rollback va testato. SEMPRE. Prima di ogni deploy.

```bash
# Test rollback
kubectl rollout undo deployment/my-service --dry-run=client

# Verifica immagine disponibile
curl -s https://registry.company.com/v2/my-service/tags/list | jq '.tags'
```

### Regola #2: PRESERVA LE IMMAGINI

Configura la retention per mantenere le immagini necessarie.

```yaml
retention:
  policies:
    - repository: "my-service"
      pattern: "v*"
      keep_n: 10
    - repository: "my-service"
      pattern: "stable-*"
      keep_n: 5
```

### Regola #3: USA TAG STABILI

Per le versioni stabili, usa tag dedicati.

```bash
# Tagga come stable
docker tag my-service:v1.2.5 my-service:stable-1.2
docker push my-service:stable-1.2
```

### Regola #4: MONITORA I DEPLOY

Configura alert per i deploy falliti.

```yaml
groups:
  - name: deployment
    rules:
      - alert: DeploymentFailed
        expr: kube_deployment_status_replicas_unavailable > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Deployment {{ $labels.deployment }} has unavailable replicas"
```

### Regola #5: DOCUMENTA I ROLLBACK

Ogni rollback va documentato. Con causa. E soluzione.

```markdown
## Rollback 2027-01-01

**Servizio**: checkout-service
**Versione da**: v1.2.4
**Versione a**: v1.2.3
**Causa**: Database sovraccarico
**Soluzione**: Fix query + connection pooling
**Tempo**: 2 ore
```

### Regola #6: AUTOMATIZZA I TEST

Aggiungi test automatici per il rollback.

```javascript
describe('Rollback', () => {
  it('should have previous image available', async () => {
    const tags = await getRegistryTags('my-service');
    expect(tags.length).toBeGreaterThan(1);
  });

  it('should rollback successfully', async () => {
    const result = await kubectl('rollout undo deployment/my-service');
    expect(result).toContain('rolled back');
  });
});
```

### Regola #7: NON DEPLOYARE DI LUNEDÌ SERA

Il lunedì sera è per le emergenze. Non per i deploy.

```yaml
# Configura orari deploy
deploy:
  allowed_hours:
    - start: "09:00"
      end: "17:00"
  blocked_days:
    - monday
    - friday
```
EOF
```

Il TL mi ha scritto su Slack. "Stai lavorando di martedì sera?"

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Scrivo la guida per i rollback. E configuro i test.

**TL**: E JN?

**ME**: JN... lo educo. Di nuovo. Domani.

**TL**: E i controlli?

**ME**: Aggiungo test per il rollback. E alert per i deploy falliti. E retention per le immagini.

**TL**: Bene. Ora riposa.

**ME**: Sì. Dopo aver aggiunto i test.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di martedì sera per un bug di lunedì. E stai fixando il processo. E stai educando il junior. E stai proteggendo il sistema. Ma è martedì sera. E dovresti riposare. Amen."

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il rollback?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il rollback fallito è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: il rollback va testato.

**JN**: Sempre?

**ME**: Sempre. Prima di ogni deploy. Verifica che l'immagine esista. E che il rollback funzioni.

**JN**: Ok.

**ME**: Secondo: le immagini vanno preservate.

**JN**: Preservate?

**ME**: Sì. Configura la retention per mantenere le versioni necessarie.

**JN**: E quante?

**ME**: Almeno 10. Per i servizi critici, 20.

**JN**: Ok.

**ME**: Terzo: non deployare mai di lunedì sera.

**JN**: Mai?

**ME**: Mai. Il lunedì sera è per le emergenze. Non per i deploy.

**JN**: E se devo?

**ME**: Allora... chiedi. Al TL. A me. A qualcuno.

**JN**: Ok.

**ME**: Quarto: testa sempre in staging. E verifica le metriche.

**JN**: Le metriche?

**ME**: Sì. Connessioni database. Memoria. CPU. Tutto.

**JN**: E come?

**ME**: Con load test. E monitoring. E alert.

**JN**: Ok.

**ME**: Quinto: se qualcosa va storto, documenta.

**JN**: Documenta?

**ME**: Sì. Cosa è successo. Perché. Come l'hai fixato. E cosa hai imparato.

**JN**: E se non ho tempo?

**ME**: Allora... trovi il tempo. Perché la prossima volta succede di nuovo. E se non documenti, non sai perché.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Rollback: testato
- Retention: configurata
- Deploy: bloccato lunedì sera
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere test. E processi. E documentazione. E pazienza. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio. Per vedere quando i deploy falliscono.

**TERMINALE**:
```
# Configura alert per deploy
cat > /etc/prometheus/alerts/deployment.yml << 'EOF'
groups:
  - name: deployment
    rules:
      - alert: DeploymentFailed
        expr: kube_deployment_status_replicas_unavailable > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Deployment {{ $labels.deployment }} has unavailable replicas"
          description: "Deployment {{ $labels.deployment }} in namespace {{ $labels.namespace }} has {{ $value }} unavailable replicas. Check rollout status."

      - alert: RollbackFailed
        expr: kube_deployment_status_replicas_unavailable > 0 and on(deployment) kube_deployment_metadata_generation < 5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Rollback may have failed for {{ $labels.deployment }}"
          description: "Deployment {{ $labels.deployment }} has unavailable replicas after rollback attempt. Check image availability."

      - alert: ImagePullBackOff
        expr: kube_pod_container_status_waiting_reason{reason="ImagePullBackOff"} > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Image pull failed for {{ $labels.pod }}"
          description: "Pod {{ $labels.pod }} cannot pull image {{ $labels.container }}. Check registry and image availability."
EOF

# Aggiungi metriche
cat > src/lib/deployment-metrics.js << 'EOF'
const prometheus = require('prom-client');

const deploymentStatus = new prometheus.Gauge({
  name: 'deployment_status',
  help: 'Deployment status: 0=failed, 1=running, 2=rolling out',
  labelNames: ['deployment', 'namespace'],
});

const rollbackCount = new prometheus.Counter({
  name: 'rollback_total',
  help: 'Total rollbacks',
  labelNames: ['deployment', 'namespace', 'reason'],
});

const imageAvailability = new prometheus.Gauge({
  name: 'image_availability',
  help: 'Image availability: 0=not found, 1=available',
  labelNames: ['service', 'version'],
});

module.exports = { deploymentStatus, rollbackCount, imageAvailability };
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per deploy falliti. Alert per rollback falliti. Alert per immagini non trovate.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che uccidano il sistema.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... il test del rollback fallisce. E il deploy non parte.

**TL**: E SE LO BYPASSANO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Metriche: attive
- Test: passing
- Rollback: funzionante

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i test prevengono. E che JN va educato. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i rollback.

```markdown
## Incident #ROLLBACK-001: Il Rollback Che Non È Mai Arrivato

**Data incident**: Lunedì 1 gennaio 2027, 17:30
**Autore**: JN
**Servizio**: checkout-service
**Problema**: Rollback fallito
**Causa**: Immagine precedente non disponibile (cancellata da retention policy)
**Autore del codice**: JN
**Data deploy**: 1/1/2027, 17:15
**Tempo in produzione**: ~15 minuti
**Ordini falliti**: 1234
**Ordini completati**: 567
**Tempo di risoluzione**: 2 ore
**Downtime**: 0 (servizio parzialmente funzionante)
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "Il rollback non funziona?!"
**Reazione CTO**: "Testa il rollback. Preserva le immagini."
**Soluzione**: Fix codice + retention configurata + test rollback
**Lezione imparata**: IL ROLLBACK VA TESTATO. SEMPRE.

**Regole per i rollback**:
1. TESTA il rollback prima di ogni deploy.
2. PRESERVA le immagini necessarie.
3. CONFIGURA la retention policy.
4. USA tag stabili per le versioni critiche.
5. MONITORA i deploy e i rollback.
6. DOCUMENTA ogni rollback.
7. NON deployare di lunedì sera.
8. Il rollback è come un paracadute. Se non lo testi, non si apre. Amen.

**Come testare il rollback**:
```bash
# Verifica immagine disponibile
curl -s https://registry.company.com/v2/my-service/tags/list | jq '.tags'

# Test rollback dry-run
kubectl rollout undo deployment/my-service --dry-run=client

# Test rollback completo
kubectl rollout undo deployment/my-service
kubectl rollout status deployment/my-service
```

**Come configurare la retention**:
```yaml
retention:
  policies:
    - repository: "my-service"
      pattern: "v*"
      keep_n: 10
    - repository: "my-service"
      pattern: "stable-*"
      keep_n: 5
```

**Come configurare alert per deploy**:
```yaml
groups:
  - name: deployment
    rules:
      - alert: DeploymentFailed
        expr: kube_deployment_status_replicas_unavailable > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Deployment has unavailable replicas"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che il rollback va testato. E che le immagini vanno preservate. E che la retention va configurata. E che i deploy di lunedì sera sono vietati. E che JN va educato. E che 1234 ordini persi sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: il rollback è come un paracadute. Se non lo testi, non si apre. E se non si apre, cadi. E se cadi, il sistema cade. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il rollback non ha funzionato." E UL dice: "E PERCHÉ?!" E tu dici: "Perché l'immagine non esisteva." E UL dice: "E PERCHÉ NON ESISTEVA?!" E tu dici: "Perché il registry l'ha cancellata." E UL dice: "E PERCHÉ L'HAI LASCIATA CANCELLARE?!" E tu dici: "Perché non avevo configurato la retention." E la verità è che tutti pensano che il rollback funzioni. Ma nessuno lo testa. Finché non serve. E quando serve, non funziona. E impari. Impari che il rollback va testato. E che le immagini vanno preservate. E che la retention va configurata. E che JN va educato. Amen.

---

## Il costo del rollback che non è mai arrivato

| Voce | Valore |
|------|--------|
| Servizio | checkout-service |
| Autore | JN |
| Data deploy | 01/01/2027, 17:15 |
| Data incident | 01/01/2027, 17:30 |
| Tempo in produzione | ~15 minuti |
| Ordini falliti | 1234 |
| Ordini completati | 567 |
| Tempo di risoluzione | 2 ore |
| Downtime | 0 (parziale) |
| Immagine precedente | Non disponibile |
| Retention policy | Non configurata |
| Test rollback | Mai eseguito |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "Il rollback non funziona?!" |
| Reazione CTO | "Testa il rollback." |
| Soluzione | Fix + retention + test |
| Lezione imparata | ROLLBACK = TEST + PRESERVAZIONE |
| **Totale** | **1234 ordini persi + 2 ore di fix + 1 rollback testato + 1 junior educato** |

**Morale**: Il rollback è la tua rete di sicurezza. Finché non lo è. E quando non lo è, scopri che non l'hai mai testato. E che l'immagine non esiste. E che il registry l'ha cancellata. E che non puoi tornare indietro. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il rollback non ha funzionato." E UL dice: "E PERCHÉ?!" E tu dici: "Perché l'immagine non esisteva." E UL dice: "E COME FA A NON ESISTERE?!" E tu dici: "Il registry l'ha cancellata." E UL dice: "E PERCHÉ?!" E tu dici: "Perché la retention policy la rimuoveva." E UL dice: "E PERCHÉ NON L'AVEVI CONFIGURATA?!" E tu dici: "Non sapevo che fosse importante." E la verità è che tutto è importante. Nel DevOps. E se non testi il rollback, non sai se funziona. E se non sai se funziona, non funziona. E se non funziona, cadi. E se cadi, impari. Impari che il rollback va testato. E che le immagini vanno preservate. E che la retention va configurata. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](97-il-secret-che-era-nel-repo-pubblico.md) | [Prossima](99-il-health-check-che-mentiva-sempre.md)**
