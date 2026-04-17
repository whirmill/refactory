# Il Cron Job Che Ha Scalato All'Infinito

**Data**: 30/01/2027

**[Storie 2026](index.md) | [Precedente](101-la-migrazione-che-ha-cancellato-la-tabella-sbagliata.md) | [Prossima](103-la-queue-che-ha-smarrito-i-messaggi.md)**

---

C'è una verità negli autoscaling group che tutti conoscono ma nessuno rispetta: i cron job non dovrebbero attivare l'autoscaling. Mai. Quando un cron job gira, consuma risorse. Ma è temporaneo. E l'autoscaling non dovrebbe reagire a picchi temporanei. E invece. Invece JN ha configurato un cron job che girava ogni minuto. E l'autoscaling reagiva. E scalava. E il cron job girava su più server. E consumava più risorse. E l'autoscaling reagiva ancora. E scalava ancora. E il cron job girava su ancora più server. E il loop continuava. All'infinito. O quasi. Finché non hai 847 istanze. E una fattura di 12.000 euro. E UL chiama. E tu rispondi. E dici: "Il cron job ha attivato l'autoscaling." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN l'ha configurato così." E UL dice: "E QUANTE ISTANZE?!" E tu dici: "847." E UL dice: "847?!" E la verità è che 847 istanze sono troppe. Per un cron job. Che invia email. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 08:00. Il caffè non era ancora pronto.

Poi è arrivato l'alert.

**ALERT**: EC2 instances > 500 for more than 10 minutes

**ME**: 500 istanze?!

**TL**: 500?!

**ME**: Sì. E stanno crescendo.

**TL**: CRESCENDO?!

**ME**: Sì. Erano 200 dieci minuti fa. Ora sono 500.

**TL**: E QUANTE DOVREBBERO ESSERE?!

**ME**: 3. Forse 5.

**TL**: E 500?!

**ME**: Non è normale. Controllo.

**TERMINALE**:
```
# Controlla istanze
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,LaunchTime,State.Name]' --output table

# Conta istanze
aws ec2 describe-instances --query 'Reservations[*].Instances[*].InstanceId' --output text | wc -l
847

# Controlla quando sono state lanciate
aws ec2 describe-instances --query 'Reservations[*].Instances[*].LaunchTime' --output text | sort | uniq -c | tail -20
     12 2027-01-30T06:45:00Z
     23 2027-01-30T06:46:00Z
     45 2027-01-30T06:47:00Z
     89 2027-01-30T06:48:00Z
    178 2027-01-30T06:49:00Z
    356 2027-01-30T06:50:00Z
    144 2027-01-30T06:51:00Z

# Controlla autoscaling group
aws autoscaling describe-auto-scaling-groups --auto-scaling-group-name email-worker-asg
{
  "AutoScalingGroups": [{
    "AutoScalingGroupName": "email-worker-asg",
    "DesiredCapacity": 847,
    "MinSize": 1,
    "MaxSize": 1000,
    "Instances": [...]
  }]
}
```

**ME**: L'autoscaling group ha DesiredCapacity a 847.

**TL**: 847?!

**ME**: Sì. E MaxSize è 1000.

**TL**: E CHI L'HA CONFIGURATO?!

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
# Controlla CloudTrail per scaling events
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=SetDesiredCapacity --start-time 2027-01-30T06:00:00Z

# Controlla metriche che attivano scaling
aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=AutoScalingGroupName,Value=email-worker-asg --start-time 2027-01-30T06:00:00Z --end-time 2027-01-30T07:00:00Z --period 60 --statistics Average

# Controlla processi sulle istanze
aws ssm send-command --document-name "AWS-RunShellScript" --instance-ids "i-1234567890abcdef0" --parameters 'commands=["ps aux | grep -E \"(cron|email)\""]'
```

**ME**: La CPU è al 95% su tutte le istanze.

**TL**: 95%?!

**ME**: Sì. E c'è un processo cron che gira ogni minuto.

**TL**: OGNI MINUTO?!

**ME**: Sì. E consuma CPU. E attiva l'autoscaling.

**TL**: E L'AUTOSCALING COSA FA?!

**ME**: Scala. E il cron gira su più istanze. E consuma più CPU. E l'autoscaling scala ancora.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Istanze: 847
- CPU: 95%
- Cron: ogni minuto
- Autoscaling: impazzito

E tutto era chiaro. Il cron job attivava l'autoscaling. E l'autoscaling creava più istanze. E il cron girava su più istanze. E il loop continuava. All'infinito. Amen.

---

**Lunedì - 08:30**

Ho fermato l'autoscaling. E disabilitato il cron.

**TERMINALE**:
```
# Ferma autoscaling
aws autoscaling update-auto-scaling-group --auto-scaling-group-name email-worker-asg --min-size 1 --max-size 5 --desired-capacity 3

# Termina istanze extra
aws autoscaling set-instance-protection --instance-ids $(aws ec2 describe-instances --query 'Reservations[*].Instances[*].InstanceId' --output text | tail -n +4) --auto-scaling-group-name email-worker-asg --no-protected-from-scale-in

# Disabilita cron
kubectl patch cronjob email-sender --patch '{"spec":{"suspend":true}}'

# Verifica
kubectl get cronjob email-sender
NAME            SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE
email-sender    * * * * *   True      0        <none>          2y123d
```

**ME**: Autoscaling fermato. Cron disabilitato.

**TL**: E LE ISTANZE?!

**ME**: Sto terminando quelle extra.

**TL**: E QUANTE NE RESTANO?!

**ME**: 3. Come dovrebbe essere.

**TL**: E IL COSTO?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla costo
aws ce get-cost-and-usage --time-period Start=2027-01-30,End=2027-01-30 --granularity=DAILY --metrics BlendedCost

# Stima costo orario
aws ec2 describe-instances --query 'Reservations[*].Instances[*].InstanceType' --output text | sort | uniq -c | head -5
    847 t3.medium

# Calcola costo
# t3.medium = $0.0416/ora
# 847 istanze * 2 ore * $0.0416 = ~$70
# Ma alcune sono state running per più tempo...
```

**ME**: Circa 12.000 euro di costo extra. Per le istanze lanciate stamattina.

**TL**: 12.000 EURO?!

**ME**: Sì. Per le 847 istanze. Per circa 2-3 ore.

**TL**: E PERCHÉ NON L'ABBIAMO NOTATO PRIMA?!

**ME**: Non lo so. Controllo quando è iniziato.

**TERMINALE**:
```
# Controlla cronologia scaling
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=SetDesiredCapacity --start-time 2027-01-29T00:00:00Z --end-time 2027-01-30T08:00:00Z | jq '.Events | length'
234

# Primo evento
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=SetDesiredCapacity --start-time 2027-01-29T00:00:00Z --end-time 2027-01-30T08:00:00Z | jq '.Events[-1].EventTime'
"2027-01-29T22:00:00Z"

# Controlla chi ha modificato il cron
kubectl logs -l app=cron-controller --since=24h | grep email-sender
2027-01-29 21:55:00 INFO: CronJob email-sender modified by user: jn@company.com
```

**ME**: JN ha modificato il cron ieri sera alle 21:55.

**TL**: JN?!

**ME**: Sì. E lo scaling è iniziato alle 22:00.

**TL**: E QUINDI?!

**ME**: E quindi... JN ha rotto qualcosa.

**TL**: E COSA?!

**ME**: Controllo il cron.

**TERMINALE**:
```
# Controlla configurazione cron
kubectl get cronjob email-sender -o yaml | grep -A20 "spec:"
spec:
  concurrencyPolicy: Allow  # <-- PROBLEMA
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: email-sender
            image: registry.company.com/email-sender:v2.3.1
            resources:
              requests:
                cpu: "500m"
                memory: "256Mi"
  schedule: '* * * * *'  # <-- OGNI MINUTO
  successfulJobsHistoryLimit: 3
  suspend: true
```

**ME**: Il cron ha concurrencyPolicy: Allow. E gira ogni minuto.

**TL**: E CHE VUOL DIRE?!

**ME**: Vuol dire che se il job precedente non finisce, ne parte un altro. E un altro. E un altro.

**TL**: E QUINDI?!

**ME**: E quindi... i job si accumulano. E consumano CPU. E attivano l'autoscaling.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cron: ogni minuto
- ConcurrencyPolicy: Allow
- Jobs: accumulati
- Autoscaling: impazzito

E tutto era chiaro. JN aveva cambiato la concurrency policy. E il cron job si era moltiplicato. E l'autoscaling aveva reagito. E il loop era continuato. All'infinito. Amen.

---

**Lunedì - 09:00**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava ancora dormendo.

**ME**: JN, hai modificato il cron email-sender ieri sera?

**JN**: (voce assonnata) Sì... volevo che fosse più veloce.

**ME**: PIÙ VELOCE?!

**JN**: Sì. Le email impiegavano troppo. Ho cambiato la concurrency policy.

**ME**: E IN COSA?!

**JN**: Allow. Così possono girare più job insieme.

**ME**: E QUANTI JOB?!

**JN**: Non lo so. Tanti?

**ME**: JN, HAI CREATO 847 ISTANZE. E UNA FATTURA DI 12.000 EURO.

**JN**: Cosa?!

**ME**: IL CRON GIRAVA OGNI MINUTO. E I JOB SI ACCUMULAVANO. E L'AUTOSCALING REAGIVA. E SCALAVA. E IL CRON GIRAVA SU PIÙ ISTANZE. E IL LOOP CONTINUAVA.

**JN**: Ma... non pensavo che...

**ME**: NON PENSavi?! HAI CONFIGURATO UN CRON CHE GIRA OGNI MINUTO CON CONCURRENCY ALLOW!

**JN**: Ma le email dovevano partire più veloci!

**ME**: E INVECE HAI CREATO UN LOOP INFINITO!

**JN**: Scusa...

**ME**: E LA PROSSIMA VOLTA PENSA A COSA FA L'AUTOSCALING!

**JN**: Ok...

JN ha riattaccato. O forse ha riattaccato per tornare a dormire. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Istanze: 3
- Cron: disabilitato
- Costo: €12,000
- JN: a letto

E la lezione era chiara. I cron job vanno configurati bene. E l'autoscaling va capito. E JN va educato. Amen.

---

**Lunedì - 09:30**

Ho fixato il cron. E configurato l'autoscaling correttamente.

**TERMINALE**:
```
# Fix cron job
cat > email-sender-cronjob.yaml << 'EOF'
apiVersion: batch/v1
kind: CronJob
metadata:
  name: email-sender
spec:
  concurrencyPolicy: Forbid  # <-- Non permettere job sovrapposti
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      activeDeadlineSeconds: 300  # <-- Timeout di 5 minuti
      backoffLimit: 2
      template:
        spec:
          containers:
          - name: email-sender
            image: registry.company.com/email-sender:v2.3.1
            resources:
              requests:
                cpu: "100m"  # <-- Ridotto
                memory: "128Mi"
              limits:
                cpu: "500m"
                memory: "256Mi"
          restartPolicy: OnFailure
  schedule: '*/5 * * * *'  # <-- Ogni 5 minuti, non ogni minuto
  successfulJobsHistoryLimit: 3
  suspend: false
EOF

kubectl apply -f email-sender-cronjob.yaml

# Configura autoscaling con metriche appropriate
cat > email-worker-asg-policy.json << 'EOF'
{
  "AutoScalingGroupName": "email-worker-asg",
  "PolicyName": "email-worker-scaling-policy",
  "PolicyType": "TargetTrackingScaling",
  "TargetTrackingConfiguration": {
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 70,
    "ScaleOutCooldown": 300,  # <-- 5 minuti di cooldown
    "ScaleInCooldown": 300
  }
}
EOF

aws autoscaling put-scaling-policy --cli-input-json file://email-worker-asg-policy.json

# Configura alert per scaling eccessivo
cat > /etc/prometheus/alerts/scaling.yml << 'EOF'
groups:
  - name: scaling
    rules:
      - alert: ExcessiveScaling
        expr: aws_ec2_instances_total > 20
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Too many EC2 instances"
          description: "There are {{ $value }} EC2 instances. This may indicate a runaway scaling process."

      - alert: CronJobAccumulation
        expr: kube_cronjob_status_active > 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "CronJob {{ $labels.cronjob }} has too many active jobs"
          description: "CronJob {{ $labels.cronjob }} has {{ $value }} active jobs. Check concurrency policy."
EOF
```

**TL**: Hai fixato tutto?

**ME**: Sì. Cron con concurrency Forbid. Schedule ogni 5 minuti. Autoscaling con cooldown di 5 minuti. E alert per scaling eccessivo.

**TL**: E QUINDI?!

**ME**: E quindi... non succede più.

**TL**: E SE SUCCede?!

**ME**: Allora l'alert ci avvisa. E interveniamo.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cron: fixato
- Autoscaling: configurato
- Alert: attivi
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i cron job vanno configurati bene. E che l'autoscaling va capito. E che JN va educato. Amen.

---

**Lunedì - 10:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era di buon umore. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo avuto un problema con l'autoscaling.

**UL**: Che problema?

**ME**: JN ha configurato un cron job che ha attivato un loop di scaling.

**UL**: Loop di scaling?!

**ME**: Sì. Il cron girava ogni minuto. E i job si accumulavano. E l'autoscaling reagiva. E scalava. E il cron girava su più istanze. E il loop continuava.

**UL**: E QUANTE ISTANZE?!

**ME**: 847.

**UL**: 847?!

**ME**: Sì. Ma le ho fermate. E fixato il cron.

**UL**: E IL COSTO?!

**ME**: Circa 12.000 euro. Per le istanze lanciate stamattina.

**UL**: 12.000 EURO?!

**ME**: Sì. Ma era peggio. Potevano essere 100.000. O più.

**UL**: E COME È SUCCESSO?!

**ME**: JN ha cambiato la concurrency policy del cron. Da Forbid ad Allow.

**UL**: E CHE VUOL DIRE?!

**ME**: Vuol dire che i job potevano sovrapporsi. E si sono sovrapposti. E si sono moltiplicati.

**UL**: E PERCHÉ?!

**ME**: Perché JN voleva che le email partissero più veloci.

**UL**: E INVECE?!

**ME**: Invece ha creato un loop infinito. E 847 istanze. E 12.000 euro di costo.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho fixato il cron. E configurato alert. E cooldown per l'autoscaling.

**UL**: Bene. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I cron job vanno configurati bene. E l'autoscaling va capito. E la documentazione è obbligatoria. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i cron job. E gli autoscaling group.

**TERMINALE**:
```
# Lista tutti i cron job
kubectl get cronjobs --all-namespaces -o json | jq '.items[] | {name: .metadata.name, namespace: .metadata.namespace, schedule: .spec.schedule, concurrency: .spec.concurrencyPolicy, suspend: .spec.suspend}'

# Risultati
{
  "name": "email-sender",
  "namespace": "default",
  "schedule": "*/5 * * * *",
  "concurrency": "Forbid",
  "suspend": false
}
{
  "name": "report-generator",
  "namespace": "default",
  "schedule": "0 6 * * *",
  "concurrency": "Allow",  # <-- PROBLEMA
  "suspend": false
}
{
  "name": "cache-cleaner",
  "namespace": "default",
  "schedule": "*/10 * * * *",
  "concurrency": "Allow",  # <-- PROBLEMA
  "suspend": false
}
{
  "name": "data-sync",
  "namespace": "default",
  "schedule": "* * * * *",  # <-- OGNI MINUTO
  "concurrency": "Allow",  # <-- PROBLEMA
  "suspend": false
}

# Conta problemi
kubectl get cronjobs --all-namespaces -o json | jq '[.items[] | select(.spec.concurrencyPolicy == "Allow")] | length'
3

# Conta autoscaling group
aws autoscaling describe-auto-scaling-groups --query 'AutoScalingGroups[*].[AutoScalingGroupName,MinSize,MaxSize,DesiredCapacity]' --output table
```

**ME**: Ci sono altri 3 cron job con concurrency Allow. E uno gira ogni minuto.

**TL**: ALTRI 3?!

**ME**: Sì. report-generator, cache-cleaner, data-sync.

**TL**: E DATA-SYNC GIRA OGNI MINUTO?!

**ME**: Sì. Come email-sender.

**TL**: E PERCHÉ NON HA SCALATO?!

**ME**: Non lo so. Forse perché data-sync è più leggero. O perché l'autoscaling non è configurato.

**TL**: E QUINDI?!

**ME**: E quindi... fixo tutto.

**TERMINALE**:
```
# Fix tutti i cron job
kubectl patch cronjob report-generator --patch '{"spec":{"concurrencyPolicy":"Forbid"}}'
kubectl patch cronjob cache-cleaner --patch '{"spec":{"concurrencyPolicy":"Forbid"}}'
kubectl patch cronjob data-sync --patch '{"spec":{"concurrencyPolicy":"Forbid","schedule":"*/5 * * * *"}}'

# Verifica
kubectl get cronjobs -o custom-columns=NAME:.metadata.name,SCHEDULE:.spec.schedule,CONCURRENCY:.spec.concurrencyPolicy
NAME                SCHEDULE            CONCURRENCY
email-sender        */5 * * * *        Forbid
report-generator    0 6 * * *          Forbid
cache-cleaner       */10 * * * *       Forbid
data-sync           */5 * * * *        Forbid
```

**ME**: Tutti i cron job fixati. Concurrency Forbid. E data-sync cambiato a ogni 5 minuti.

**TL**: E GLI AUTOSCALING GROUP?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla autoscaling group senza cooldown
aws autoscaling describe-scaling-policies --query 'ScalingPolicies[*].[PolicyName,PolicyType,ScaleOutCooldown,ScaleInCooldown]' --output table

# Risultati
PolicyName                    PolicyType              ScaleOutCooldown  ScaleInCooldown
---------------------------   --------------------    ----------------  ---------------
email-worker-scaling-policy  TargetTrackingScaling   300               300
web-server-scaling-policy     TargetTrackingScaling   60                60   # <-- TROPPO BREVE
api-server-scaling-policy    TargetTrackingScaling   60                60   # <-- TROPPO BREVE
worker-scaling-policy         TargetTrackingScaling   0                 0    # <-- NO COOLDOWN

# Fix cooldown
aws autoscaling put-scaling-policy --auto-scaling-group-name web-server-asg --policy-name web-server-scaling-policy --policy-type TargetTrackingScaling --target-tracking-configuration file://(echo '{"PredefinedMetricSpecification":{"PredefinedMetricType":"ASGAverageCPUUtilization"},"TargetValue":70,"ScaleOutCooldown":300,"ScaleInCooldown":300}' | jq -c .)
```

**ME**: Trovati 3 autoscaling group con cooldown troppo brevi. O inesistenti.

**TL**: E COSA VUOL DIRE?!

**ME**: Vuol dire che possono scalare troppo velocemente. E creare loop.

**TL**: E FIXALI!

**ME**: Subito.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cron job: fixati
- Autoscaling: da fixare
- Cooldown: configurati
- JN: da educare

E tutto era fixato. Ma avevo imparato una lezione. La lezione che i cron job vanno auditati. E gli autoscaling group vanno configurati. E JN va educato. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il cron job?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il cron job è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i cron job con schedule frequente vanno configurati con concurrency Forbid.

**JN**: Forbid?

**ME**: Sì. Non Allow. Forbid. Se il job precedente non finisce, non ne parte un altro.

**JN**: Ok.

**ME**: Secondo: non usare schedule ogni minuto. A meno che non sia necessario.

**JN**: Ma le email dovevano partire veloci!

**ME**: E invece sono partite troppo veloci. E hanno creato 847 istanze. E 12.000 euro di costo.

**JN**: Ok.

**ME**: Terzo: pensa a cosa fa l'autoscaling quando configuri un cron.

**JN**: L'autoscaling?

**ME**: Sì. Se il cron consuma CPU, l'autoscaling scala. E se scala, il cron gira su più istanze. E consuma più CPU. E scala ancora.

**JN**: E come lo evito?

**ME**: Con cooldown. E limitando le risorse. E usando concurrency Forbid.

**JN**: Ok.

**ME**: Quarto: configura alert per scaling eccessivo.

**JN**: Alert?

**ME**: Sì. Se le istanze superano una certa soglia, qualcuno deve saperlo. Prima che la fattura arrivi.

**JN**: E come?

**ME**: Con Prometheus. E alertmanager. E notifiche su Slack.

**JN**: Ok.

**ME**: Quinto: documenta i cron job. E gli autoscaling group. E le loro interazioni.

**JN**: Documenta?

**ME**: Sì. Scrivi cosa fa il cron. Quanto spesso gira. Quanto consuma. E come reagisce l'autoscaling.

**JN**: E se non ho tempo?

**ME**: Allora... trovi il tempo. Perché la prossima volta succede di nuovo. E se non documenti, non sai perché.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Cron: fixato
- Autoscaling: configurato
- Alert: attivi
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere controlli. E processi. E educazione. Amen.

---

**Giovedì - Il Monitoraggio**

Giovedì. Ho aggiunto monitoraggio per i cron job. E per l'autoscaling.

**TERMINALE**:
```
# Configura metriche per cron job
cat > cronjob-metrics.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cronjob-exporter
spec:
  template:
    spec:
      containers:
      - name: cronjob-exporter
        image: registry.company.com/cronjob-exporter:v1.0.0
        env:
        - name: KUBERNETES_SERVICE_HOST
          value: "kubernetes.default.svc"
        ports:
        - containerPort: 9173
          name: metrics
---
apiVersion: v1
kind: Service
metadata:
  name: cronjob-exporter
  labels:
    app: cronjob-exporter
spec:
  ports:
  - port: 9173
    name: metrics
  selector:
    app: cronjob-exporter
EOF

kubectl apply -f cronjob-metrics.yaml

# Configura alert per cron job
cat > /etc/prometheus/alerts/cronjob.yml << 'EOF'
groups:
  - name: cronjob
    rules:
      - alert: CronJobRunningTooLong
        expr: kube_cronjob_status_last_schedule_time - time() > 600
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "CronJob {{ $labels.cronjob }} has been running for more than 10 minutes"
          description: "CronJob {{ $labels.cronjob }} may be stuck. Check job status."

      - alert: CronJobFailed
        expr: kube_cronjob_status_failed > 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "CronJob {{ $labels.cronjob }} has failed jobs"
          description: "CronJob {{ $labels.cronjob }} has {{ $value }} failed jobs. Check logs."

      - alert: CronJobConcurrencyViolation
        expr: kube_cronjob_status_active > 1 and on(cronjob) kube_cronjob_spec_concurrency_policy == "Forbid"
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "CronJob {{ $labels.cronjob }} has multiple active jobs despite Forbid policy"
          description: "CronJob {{ $labels.cronjob }} has {{ $value }} active jobs but concurrency policy is Forbid. This should not happen."

      - alert: CronJobTooFrequent
        expr: kube_cronjob_spec_schedule == "* * * * *"
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: "CronJob {{ $labels.cronjob }} runs every minute"
          description: "CronJob {{ $labels.cronjob }} is configured to run every minute. This may cause performance issues."
EOF

# Configura dashboard Grafana
cat > grafana-dashboard-cronjob.json << 'EOF'
{
  "dashboard": {
    "title": "CronJob Monitoring",
    "panels": [
      {
        "title": "Active Jobs by CronJob",
        "type": "graph",
        "targets": [
          {
            "expr": "kube_cronjob_status_active",
            "legendFormat": "{{ cronjob }}"
          }
        ]
      },
      {
        "title": "Job Duration",
        "type": "graph",
        "targets": [
          {
            "expr": "kube_job_status_completion_time - kube_job_status_start_time",
            "legendFormat": "{{ job_name }}"
          }
        ]
      },
      {
        "title": "Failed Jobs",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(kube_cronjob_status_failed)",
            "legendFormat": "Total Failed"
          }
        ]
      }
    ]
  }
}
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Metriche per cron job. Alert per job che durano troppo. Alert per job falliti. Alert per concurrency violation. E dashboard Grafana.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che uccidano il sistema.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Metriche: attive
- Alert: configurati
- Dashboard: pronta
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i cron job vanno controllati. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i cron job.

```markdown
## Incident #CRON-001: Il Cron Job Che Ha Scalato All'Infinito

**Data incident**: Lunedì 30 gennaio 2027, 06:00
**Autore**: JN
**Servizio**: email-sender
**Problema**: Cron job ha attivato loop di autoscaling
**Causa**: Concurrency policy Allow + schedule ogni minuto
**Tempo di esposizione**: ~2 ore
**Istanze create**: 847
**Costo totale**: €12,000
**Reazione UL**: "847 istanze?!"
**Reazione TL**: "Loop di scaling?!"
**Reazione CTO**: "Concurrency Forbid. Cooldown. Alert."
**Soluzione**: Cron fixato + autoscaling configurato + alert
**Lezione imparata**: I CRON JOB VANNO CONFIGURATI BENE. E L'AUTOSCALING VA CAPITO.

**Regole per i cron job**:
1. Usa SEMPRE concurrencyPolicy: Forbid per job che non devono sovrapporsi.
2. Evita schedule ogni minuto. Usa */5 * * * * o più raro.
3. Imposta activeDeadlineSeconds per evitare job che non finiscono mai.
4. Limita le risorse (CPU, memoria) per ogni job.
5. Configura alert per job che durano troppo o falliscono.
6. Documenta cosa fa il cron. E quanto spesso gira. E quanto consuma.
7. Pensa a come reagisce l'autoscaling quando configuri un cron.
8. I cron job e l'autoscaling interagiscono. Sempre. Amen.

**Regole per l'autoscaling**:
1. Configura SEMPRE ScaleOutCooldown e ScaleInCooldown.
2. Usa almeno 300 secondi (5 minuti) di cooldown.
3. Non reagire a picchi temporanei. Usa metriche aggregate.
4. Imposta MaxSize ragionevole. Non 1000.
5. Configura alert per scaling eccessivo.
6. Monitora le istanze. E il costo.
7. L'autoscaling è uno strumento. Non una bacchetta magica. Amen.

**Come configurare un cron job correttamente**:
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: email-sender
spec:
  concurrencyPolicy: Forbid  # Non permettere sovrapposizioni
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      activeDeadlineSeconds: 300  # Timeout di 5 minuti
      backoffLimit: 2
      template:
        spec:
          containers:
          - name: email-sender
            image: registry.company.com/email-sender:v2.3.1
            resources:
              requests:
                cpu: "100m"
                memory: "128Mi"
              limits:
                cpu: "500m"
                memory: "256Mi"
          restartPolicy: OnFailure
  schedule: '*/5 * * * *'  # Ogni 5 minuti
  successfulJobsHistoryLimit: 3
```

**Come configurare l'autoscaling con cooldown**:
```bash
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name email-worker-asg \
  --policy-name email-worker-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-configuration '{
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 70,
    "ScaleOutCooldown": 300,
    "ScaleInCooldown": 300
  }'
```

**Come configurare alert per scaling eccessivo**:
```yaml
groups:
  - name: scaling
    rules:
      - alert: ExcessiveScaling
        expr: aws_ec2_instances_total > 20
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Too many EC2 instances"
          description: "There are {{ $value }} EC2 instances. This may indicate a runaway scaling process."
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i cron job vanno configurati bene. E che l'autoscaling va capito. E che i cooldown sono essenziali. E che gli alert salvano. E che JN va educato. E che 12.000 euro sono tanti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i cron job e l'autoscaling interagiscono. Sempre. E se non pensi a come interagiscono, succede quello che è successo. Il cron consuma CPU. L'autoscaling scala. Il cron gira su più istanze. Consuma più CPU. L'autoscaling scala ancora. E il loop continua. All'infinito. O finché non finiscono i soldi. O finché qualcuno non se ne accorge. E quando qualcuno se ne accorge, è troppo tardi. Le istanze sono 847. E la fattura è di 12.000 euro. E UL chiama. E tu rispondi. E dici: "Il cron job ha attivato l'autoscaling." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN l'ha configurato così." E UL dice: "E COME?!" E tu dici: "Concurrency Allow. E schedule ogni minuto." E UL dice: "E NON HA PENsato ALL'AUTOSCALING?!" E tu dici: "No." E UL dice: "E QUANTO È COSTATO?!" E tu dici: "12.000 euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che nessuno pensa alle conseguenze. Finché non succede. E quando succede, impari. Impari che i cron job vanno configurati bene. E che l'autoscaling va capito. E che i cooldown sono essenziali. E che gli alert salvano. E che JN va educato. Amen.

---

## Il costo del cron job che ha scalato all'infinito

| Voce | Valore |
|------|--------|
| Servizio | email-sender |
| Autore | JN |
| Data modifica | 29/01/2027, 21:55 |
| Data incident | 30/01/2027, 06:00 |
| Tempo di esposizione | ~2 ore |
| Istanze create | 847 |
| Istanze previste | 3 |
| Costo totale | €12,000 |
| Concurrency policy | Allow (sbagliato) |
| Schedule | * * * * * (ogni minuto) |
| Autoscaling cooldown | Non configurato |
| Reazione UL | "847 istanze?!" |
| Reazione TL | "Loop di scaling?!" |
| Reazione CTO | "Concurrency Forbid. Cooldown." |
| Soluzione | Cron fixato + cooldown + alert |
| Lezione imparata | CRON + AUTOSCALING = ATTENZIONE |
| **Totale** | **€12,000 + 4 cron job fixati + 3 autoscaling configurati + 1 junior educato** |

**Morale**: I cron job e l'autoscaling interagiscono. Sempre. E se non pensi a come interagiscono, succede quello che è successo. Il cron consuma CPU. L'autoscaling scala. Il cron gira su più istanze. Consuma più CPU. L'autoscaling scala ancora. E il loop continua. All'infinito. O finché non finiscono i soldi. O finché qualcuno non se ne accorge. E quando qualcuno se ne accorge, è troppo tardi. Le istanze sono 847. E la fattura è di 12.000 euro. E UL chiama. E tu rispondi. E dici: "Il cron job ha attivato l'autoscaling." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN l'ha configurato così." E UL dice: "E COME?!" E tu dici: "Concurrency Allow. E schedule ogni minuto." E UL dice: "E NON HA PENsato ALL'AUTOSCALING?!" E tu dici: "No." E UL dice: "E QUANTO È COSTATO?!" E tu dici: "12.000 euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che la comodità costa. Sempre. E la prossima volta, usi concurrency Forbid. E schedule ogni 5 minuti. E cooldown per l'autoscaling. E alert per scaling eccessivo. E pensi. Prima di configurare. Pensi a cosa succede. E a quanto costa. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](101-la-migrazione-che-ha-cancellato-la-tabella-sbagliata.md) | [Prossima](103-la-queue-che-ha-smarrito-i-messaggi.md)**
