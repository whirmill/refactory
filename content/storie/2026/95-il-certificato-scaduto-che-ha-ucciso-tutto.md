# Il Certificato Scaduto Che Ha Ucciso Tutto

**Data**: 12/12/2026

**[Storie 2026](index.md) | [Precedente](94-il-database-senza-password.md) | [Prossima](96-il-webhook-che-ha-inondato-la-coda.md)**

---

C'è una verità nella sicurezza informatica che tutti conoscono ma nessuno rispetta: i certificati SSL scadono. Sempre. Ogni volta. E quando scadono, tutto si ferma. Le API non rispondono. I browser mostrano warning. I clienti chiamano. E tu ti chiedi: "Com'è possibile che nessuno abbia controllato la data di scadenza?" E la risposta è semplice: perché tutti pensano che qualcun altro l'abbia fatto. E nessuno l'ha fatto. E il certificato scade. E il sistema muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il certificato è scaduto." E UL dice: "E COS'È UN CERTIFICATO?!" E tu dici: "Quella cosa che fa funzionare HTTPS." E UL dice: "E PERCHÉ È SCADUTO?!" E tu dici: "Perché aveva una data di scadenza. E quella data è passata." E la verità è che tutti sanno che i certificati scadono. Ma nessuno controlla. Finché non scadono. E quando scadono, impari. Amen.

![](../../img/server.jpg)

---

**Sabato - La Scoperta**

Era sabato. Le 06:00. Il sole non era ancora sorto.

Poi è arrivato l'alert.

**ALERT**: SSL certificate expired for api.company.com

**ME**: Certificato scaduto?!

**TL**: Scaduto?!

**ME**: Sì. Per api.company.com.

**TL**: E QUANDO È SCADUTO?!

**ME**: Oggi. Alle 00:00.

**TL**: E NESSUNO HA CONTROLLATO?!

**ME**: Evidentemente no.

**TERMINALE**:
```
# Controlla certificato
openssl s_client -connect api.company.com:443 -servername api.company.com 2>/dev/null | openssl x509 -noout -dates
notBefore=Dec 12 00:00:00 2025 GMT
notAfter=Dec 12 00:00:00 2026 GMT

# Data corrente
date
Sat Dec 12 06:00:00 UTC 2026

# Verifica
echo | openssl s_client -connect api.company.com:443 2>&1 | grep -i "verify"
Verify return code: 10 (certificate has expired)
```

**ME**: Il certificato è scaduto a mezzanotte. Esattamente un anno dopo il rilascio.

**TL**: E NESSUNO HA CONTROLLATO?!

**ME**: No. Non c'era monitoraggio.

**TL**: E QUINDI?!

**ME**: E quindi... tutte le API sono down.

**TL**: TUTTE?!

**ME**: Sì. Tutte quelle che usano HTTPS.

**TL**: E QUANTE SONO?!

**ME**: Tutte. È produzione.

**TERMINALE**:
```
# Controlla status API
curl -k https://api.company.com/health 2>&1
curl: (60) SSL certificate problem: certificate has expired

# Controlla con --insecure
curl -k https://api.company.com/health
{"status": "ok", "message": "Service is running"}

# Il servizio è up, ma il certificato è scaduto
# I client rifiutano la connessione
```

**ME**: Il servizio funziona. Ma i client rifiutano la connessione.

**TL**: E I CLIENTI?!

**ME**: Non possono usare le API.

**TL**: E QUANTI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total[5m]))'
{status: "success", data: {result: [{value: ["0"]}]}}  # Zero richieste

# Controlla log errori
kubectl logs -l app=api-gateway --since=1h | grep -i "ssl\|certificate\|expired" | wc -l
45678

# Controlla ticket supporto
curl -s "https://support.company.com/api/tickets?status=open&category=api" | jq '.total'
234
```

**ME**: 234 ticket aperti. Zero richieste API. 45.678 errori SSL nell'ultima ora.

**TL**: E QUINDI?!

**ME**: E quindi... siamo fottuti.

**TL**: E ORA?!

**ME**: Ora rinnovo il certificato.

**TL**: E QUANTO CI VUOLE?!

**ME**: Non lo so. Dipende dal provider.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Certificato: scaduto
- Data scadenza: 12/12/2026 00:00:00
- Data corrente: 12/12/2026 06:00:00
- Richieste: zero
- Ticket: 234

E tutto era chiaro. Il certificato era scaduto. E nessuno aveva controllato. E il sistema era morto. Amen.

---

**Sabato - 06:30**

Ho chiamato il provider. Il provider ha risposto. Dopo 20 minuti di attesa.

**PROVIDER**: Grazie per aver chiamato CertificatiSSL4Less. Come posso aiutarla?

**ME**: Ho un certificato scaduto. Devo rinnovarlo. URGENTE.

**PROVIDER**: Certamente. Posso avere il suo account ID?

**ME**: Non lo so. È un account aziendale.

**PROVIDER**: E chi ha creato l'account?

**ME**: Non lo so. Forse UL. O il CTO. O qualcuno che non c'è più.

**PROVIDER**: Capisco. E chi ha acquistato il certificato?

**ME**: Non lo so. È stato fatto un anno fa.

**PROVIDER**: E non avete i documenti?

**ME**: Non lo so. Forse UL. O il CTO. O qualcuno che non c'è più.

**PROVIDER**: Capisco. E posso parlare con UL?

**ME**: È sabato. Alle 06:30. UL dorme.

**PROVIDER**: E il CTO?

**ME**: Anche lui dorme.

**PROVIDER**: E chi può autorizzare il rinnovo?

**ME**: Io. Ma non ho l'account.

**PROVIDER**: Allora deve aspettare che UL o il CTO si sveglino.

**ME**: E QUANTO TEMPO?!

**PROVIDER**: Non lo so. Quando si svegliano?

Ho riattaccato. Ho chiamato UL. UL ha risposto. Dopo 10 squilli.

**UL**: (voce assonnata) Pronto?

**ME**: Il certificato SSL è scaduto.

**UL**: Cosa?

**ME**: Il certificato SSL. Per api.company.com. È scaduto a mezzanotte.

**UL**: E quindi?

**ME**: E quindi tutte le API sono down.

**UL**: Down?!

**ME**: Sì. I client rifiutano la connessione.

**UL**: E QUANTI CLIENTI?!

**ME**: 234 ticket aperti. Zero richieste.

**UL**: E QUINDI?!

**ME**: E quindi devo rinnovare il certificato. Ma non ho l'account del provider.

**UL**: Quale provider?

**ME**: Non lo so. Quello che ha comprato il certificato.

**UL**: E chi l'ha comprato?

**ME**: Non lo so. Forse tu. O il CTO.

**UL**: Io?! Non compro certificati!

**ME**: Allora il CTO.

**UL**: E dov'è?

**ME**: Dorme.

**UL**: E QUINDI?!

**ME**: E quindi... sveglialo.

**UL**: È sabato! Alle 06:30!

**ME**: E le API sono down.

**UL**: E QUANTO TEMPO PER RINNOVARE?!

**ME**: Non lo so. Dipende dal provider.

**UL**: E SE USIAMO LET'S ENCRYPT?!

**ME**: Ci ho pensato. Ma dobbiamo cambiare la configurazione. E testare. E deployare.

**UL**: E QUANTO TEMPO?!

**ME**: Un'ora. Forse due.

**UL**: E IL PROVIDER?!

**ME**: Non lo so. Bisogna svegliare il CTO.

UL ha sospirato. Poi ha detto: "Chiamo il CTO."

E io ho aspettato. E il tempo passava. E i ticket aumentavano. E le API restavano down. Amen.

---

**Sabato - 07:00**

Il CTO ha chiamato. Era sveglio. Era arrabbiato.

**CTO**: Chi ha comprato il certificato?!

**ME**: Non lo so. Il provider non trova l'account.

**CTO**: E QUANDO È STATO COMPRATO?!

**ME**: Un anno fa. 12/12/2025.

**CTO**: E CHI ERAVA UN ANNO FA?!

**ME**: Non lo so. Forse qualcuno che non c'è più.

**CTO**: E I DOCUMENTI?!

**ME**: Non lo so. UL dice che non li ha.

**CTO**: E IL BACKUP?!

**ME**: Non lo so. Non c'è documentazione.

**CTO**: E QUINDI?!

**ME**: E quindi... usiamo Let's Encrypt.

**CTO**: E QUANTO TEMPO?!

**ME**: Un'ora. Forse due.

**CTO**: E LE API?!

**ME**: Down. Fino a quando non rinnoviamo.

**CTO**: E I CLIENTI?!

**ME**: 234 ticket. E crescono.

**CTO**: E IL COSTO?!

**ME**: Zero per Let's Encrypt. Ma tempo.

**CTO**: E IL PROVIDER?!

**ME**: Non troviamo l'account.

**CTO**: (sospira) Fai Let's Encrypt. E documentalo.

**ME**: Ok.

**CTO**: E LA PROSSIMA VOLTA?!

**ME**: Metto il monitoraggio.

**CTO**: E I RINNOVI AUTOMATICI?!

**ME**: Sì. Con cert-manager.

**CTO**: Bene.

Il CTO ha riattaccato. Io guardavo il terminale. Il terminale mostrava:
- Ticket: 312 (aumentati)
- Tempo: 1 ora persa
- Soluzione: Let's Encrypt
- Documentazione: da fare

E tutto era chiaro. Il certificato era scaduto. E nessuno sapeva chi l'aveva comprato. E dovevamo usare Let's Encrypt. E documentare. E monitorare. Amen.

---

**Sabato - 07:30**

Ho configurato Let's Encrypt. Con cert-manager. Per non rifare lo stesso errore.

**TERMINALE**:
```
# Installa cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Crea ClusterIssuer per Let's Encrypt
cat > letsencrypt-issuer.yaml << 'EOF'
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: certs@company.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
EOF

kubectl apply -f letsencrypt-issuer.yaml

# Crea certificato
cat > api-certificate.yaml << 'EOF'
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: api-company-com
  namespace: production
spec:
  secretName: api-company-com-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
    - api.company.com
    - www.api.company.com
EOF

kubectl apply -f api-certificate.yaml

# Verifica
kubectl get certificate -n production
NAME              READY   SECRET                AGE
api-company-com   True    api-company-com-tls   2m
```

**ME**: Certificato emesso. Let's Encrypt.

**TL**: E ORA?!

**ME**: Ora aggiorno l'ingress.

**TERMINALE**:
```
# Aggiorna ingress
kubectl patch ingress api-ingress -n production --type=json -p='[
  {
    "op": "replace",
    "path": "/spec/tls/0/secretName",
    "value": "api-company-com-tls"
  }
]'

# Verifica
kubectl get ingress api-ingress -n production -o yaml | grep -A5 "tls:"
tls:
  - hosts:
      - api.company.com
    secretName: api-company-com-tls
```

**ME**: Ingress aggiornato. Certificato attivo.

**TL**: E LE API?!

**ME**: Controllo.

**TERMINALE**:
```
# Testa API
curl https://api.company.com/health
{"status": "ok", "message": "Service is running"}

# Verifica certificato
openssl s_client -connect api.company.com:443 -servername api.company.com 2>/dev/null | openssl x509 -noout -dates
notBefore=Dec 12 07:35:00 2026 GMT
notAfter=Mar 12 07:35:00 2027 GMT

# Verifica chain
echo | openssl s_client -connect api.company.com:443 2>&1 | grep -i "verify"
Verify return code: 0 (ok)
```

**ME**: API funzionanti. Certificato valido. Scade tra 3 mesi.

**TL**: 3 MESI?!

**ME**: Sì. Let's Encrypt ha certificati da 90 giorni. Ma cert-manager li rinnova automaticamente.

**TL**: E QUINDI?!

**ME**: E quindi... non succede più.

**TL**: E I CLIENTI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla richieste
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'sum(rate(http_requests_total[5m]))'
{status: "success", data: {result: [{value: ["1234"]}]}}  # Richieste riprese

# Controlla ticket
curl -s "https://support.company.com/api/tickets?status=open&category=api" | jq '.total'
456  # Aumentati durante il downtime
```

**ME**: Richieste riprese. Ma 456 ticket aperti.

**TL**: E ORA?!

**ME**: Ora rispondo ai ticket. E spiego. E mi scuso.

**TL**: E UL?!

**ME**: UL... lo chiamo dopo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Certificato: valido
- Scadenza: 90 giorni
- Rinnovo: automatico
- Richieste: riprese
- Ticket: 456

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i certificati scadono. E che il monitoraggio è essenziale. E che la documentazione salva. E che Let's Encrypt è gratis. E che cert-manager rinnova automaticamente. Amen.

---

**Sabato - 09:00**

Ho chiamato UL. UL ha risposto. Era sveglio. Era arrabbiato.

**UL**: 456 ticket?!

**ME**: Sì. Durante il downtime.

**UL**: E QUANTO TEMPO?!

**ME**: 3 ore. Dalle 00:00 alle 03:00 circa.

**UL**: 3 ORE?!

**ME**: Sì. Il tempo di svegliarti. Svegliare il CTO. Configurare Let's Encrypt.

**UL**: E IL PROVIDER?!

**ME**: Non abbiamo trovato l'account.

**UL**: E CHI L'HA COMPRATO?!

**ME**: Non lo so. Forse qualcuno che non c'è più.

**UL**: E I DOCUMENTI?!

**ME**: Non c'erano.

**UL**: E QUINDI?!

**ME**: E quindi ho usato Let's Encrypt. Con rinnovo automatico.

**UL**: E QUANTO COSTA?!

**ME**: Zero.

**UL**: Zero?!

**ME**: Sì. Let's Encrypt è gratis.

**UL**: E PERCHÉ NON L'ABBIAMO USATO PRIMA?!

**ME**: Non lo so. Forse perché qualcuno ha comprato un certificato commerciale. E non l'ha documentato.

**UL**: E CHI?!

**ME**: Non lo so. Forse qualcuno che non c'è più.

**UL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta non succede. Perché c'è cert-manager. E rinnova automaticamente. E c'è monitoraggio.

**UL**: E I COSTI?!

**ME**: Zero. Per sempre.

**UL**: E I CLIENTI?!

**ME**: Li chiamo. E mi scuso.

**UL**: E COSA GLI DICI?!

**ME**: "Il certificato SSL è scaduto. L'abbiamo rinnovato. Non succederà più."

**UL**: E LORO?!

**ME**: Probabilmente si incazzano. Ma è la verità.

UL ha sospirato. Poi ha detto: "Ok. Chiama i clienti. E documenta tutto."

E io ho documentato. E chiamato. E mi sono scusato. E i clienti si sono incazzati. Ma era la verità. Amen.

---

**Domenica - Il Monitoraggio**

Domenica. Ho aggiunto monitoraggio. Per vedere i certificati che scadono. Prima che scadano.

**TERMINALE**:
```
# Configura alert per certificati
cat > /etc/prometheus/alerts/certificates.yml << 'EOF'
groups:
  - name: certificates
    rules:
      - alert: CertificateExpiringSoon
        expr: cert_manager_certificate_expiration_timestamp_seconds - time() < 86400 * 30
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Certificate expiring in 30 days for {{ $labels.name }}"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} expires in less than 30 days."

      - alert: CertificateExpiringCritical
        expr: cert_manager_certificate_expiration_timestamp_seconds - time() < 86400 * 7
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Certificate expiring in 7 days for {{ $labels.name }}"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} expires in less than 7 days. Immediate action required."

      - alert: CertificateExpired
        expr: cert_manager_certificate_expiration_timestamp_seconds - time() < 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Certificate EXPIRED for {{ $labels.name }}"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} has EXPIRED. All HTTPS connections are failing."
EOF

# Aggiungi metriche per certificati
kubectl apply -f - << 'EOF'
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: cert-manager
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: cert-manager
  endpoints:
    - port: http
      path: /metrics
EOF

# Verifica
kubectl get servicemonitor -n monitoring
NAME           AGE
cert-manager   1m
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert a 30 giorni. Alert critico a 7 giorni. Alert emergenza se scaduto.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i certificati che scadono. Prima che scadano.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... cert-manager rinnova automaticamente. Quindi non dovrebbe succedere.

**TL**: E SE CERT-MANAGER FALLISCE?!

**ME**: Allora... l'alert a 30 giorni ci avvisa. E abbiamo tempo di fixare.

**TL**: E SE NON LO VEDIAMO NEANCHE QUELLO?!

**ME**: Allora... l'alert a 7 giorni è critico. E non possiamo ignorarlo.

**TL**: E SE LO IGNORIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- Threshold: 30 giorni, 7 giorni, scaduto
- Cert-manager: attivo
- Rinnovo: automatico

E tutto funzionava. Ma avevo imparato una lezione. La lezione che il monitoraggio è essenziale. E che gli alert salvano. E che i certificati scadono. E che cert-manager rinnova. E che la documentazione è obbligatoria. Amen.

---

**Lunedì - La Riunione**

Lunedì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che il certificato sia scaduto?

**ME**: Nessuno ha controllato la data di scadenza.

**UL**: E PERCHÉ?!

**ME**: Non c'era monitoraggio. E non c'era documentazione.

**UL**: E CHI HA COMPRATO IL CERTIFICATO?!

**ME**: Non lo sappiamo. Il provider non trova l'account.

**UL**: E I DOCUMENTI?!

**ME**: Non ce n'erano.

**UL**: E QUINDI?!

**ME**: E quindi ho usato Let's Encrypt. Con cert-manager. E rinnovo automatico.

**CTO**: E il monitoraggio?

**ME**: Aggiunto. Alert a 30 giorni, 7 giorni, e se scaduto.

**CTO**: E la documentazione?

**ME**: Aggiunta. Con tutti i certificati. E le procedure di rinnovo.

**CTO**: E JN?

**ME**: JN... non c'entra. Questa volta.

**JN**: (sollevato) Grazie.

**CTO**: Ma la prossima volta, controlla i certificati.

**JN**: Ok.

**CTO**: E COSA HAI IMPARATO?

**JN**: A monitorare i certificati.

**CTO**: E COS'ALTRO?

**JN**: A documentare chi compra cosa.

**CTO**: E COS'ALTRO?

**JN**: A usare Let's Encrypt con rinnovo automatico.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul certificato scaduto. E sulle 3 ore di downtime. Amen.

---

**Lunedì - La Documentazione**

Lunedì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i certificati.

```markdown
## Incident #CERT-001: Il Certificato Scaduto Che Ha Ucciso Tutto

**Data incident**: Sabato 12 dicembre 2026, 00:00
**Servizio**: api.company.com
**Problema**: Certificato SSL scaduto
**Causa**: Nessun monitoraggio, nessuna documentazione, nessun rinnovo automatico
**Autore del certificato**: Sconosciuto (probabilmente qualcuno che non c'è più)
**Data acquisto**: 12/12/2025
**Data scadenza**: 12/12/2026
**Tempo di downtime**: ~3 ore
**Ticket aperti**: 456
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "Nessun monitoraggio?!"
**Reazione CTO**: "Let's Encrypt + cert-manager + monitoraggio."
**Soluzione**: Let's Encrypt con cert-manager, rinnovo automatico, alert configurati
**Lezione imparata**: I CERTIFICATI SCADONO. SEMPRE. MONITORALI.

**Regole per i certificati**:
1. USA Let's Encrypt con cert-manager.
2. CONFIGURA il rinnovo automatico.
3. MONITORA la data di scadenza.
4. ALERTA a 30 giorni, 7 giorni, e se scaduto.
5. DOCUMENTA chi compra cosa.
6. NON usare certificati commerciali senza documentazione.
7. I certificati scadono. Sempre. Amen.

**Come configurare Let's Encrypt con cert-manager**:
```yaml
# ClusterIssuer
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: certs@company.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

**Come configurare alert per certificati**:
```yaml
groups:
  - name: certificates
    rules:
      - alert: CertificateExpiringSoon
        expr: cert_manager_certificate_expiration_timestamp_seconds - time() < 86400 * 30
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Certificate expiring in 30 days"
```

**Come verificare un certificato**:
```bash
# Verifica data scadenza
openssl s_client -connect api.company.com:443 -servername api.company.com 2>/dev/null | openssl x509 -noout -dates

# Verifica chain
echo | openssl s_client -connect api.company.com:443 2>&1 | grep -i "verify"
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i certificati scadono. E che il monitoraggio è essenziale. E che Let's Encrypt è gratis. E che cert-manager rinnova automaticamente. E che la documentazione salva. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i certificati sono come il latte. Hanno una data di scadenza. E se non li controlli, scadono. E se scadono, tutto si ferma. E se tutto si ferma, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il certificato è scaduto." E UL dice: "E COS'È UN CERTIFICATO?!" E tu dici: "Quella cosa che fa funzionare HTTPS." E UL dice: "E PERCHÉ È SCADUTO?!" E tu dici: "Perché aveva una data di scadenza. E quella data è passata." E la verità è che tutti sanno che i certificati scadono. Ma nessuno controlla. Finché non scadono. E quando scadono, impari. Impari che il monitoraggio è essenziale. E che Let's Encrypt è gratis. E che cert-manager rinnova automaticamente. E che la documentazione è obbligatoria. Amen.

---

## Il costo del certificato scaduto

| Voce | Valore |
|------|--------|
| Servizio | api.company.com |
| Data scadenza | 12/12/2026 00:00:00 |
| Data discovery | 12/12/2026 06:00:00 |
| Tempo di downtime | ~3 ore |
| Ticket aperti | 456 |
| Richieste perse | Inestimabile |
| Reputazione | Danneggiata |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "Nessun monitoraggio?!" |
| Reazione CTO | "Let's Encrypt + cert-manager." |
| Soluzione | Let's Encrypt + cert-manager + monitoraggio |
| Costo certificato nuovo | 0€ (Let's Encrypt) |
| Costo downtime | Inestimabile |
| Lezione imparata | CERTIFICATI = MONITORAGGIO + RINNOVO AUTOMATICO |
| **Totale** | **3 ore di downtime + 456 ticket + 1 lezione imparata** |

**Morale**: I certificati scadono. Sempre. E se non li monitori, scadono senza avviso. E se scadono senza avviso, le API muoiono. E se le API muoiono, i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il certificato è scaduto." E UL dice: "E COS'È UN CERTIFICATO?!" E tu dici: "Quella cosa che fa funzionare HTTPS." E UL dice: "E PERCHÉ NON L'ABBIAMO RINNOVATO?!" E tu dici: "Perché nessuno ha controllato." E la verità è che tutti pensano che qualcun altro abbia controllato. E nessuno ha controllato. E il certificato scade. E il sistema muore. E impari. Impari che il monitoraggio è essenziale. E che Let's Encrypt è gratis. E che cert-manager rinnova automaticamente. E che la documentazione è obbligatoria. E che i certificati scadono. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](94-il-database-senza-password.md) | [Prossima](96-il-webhook-che-ha-inondato-la-coda.md)**
