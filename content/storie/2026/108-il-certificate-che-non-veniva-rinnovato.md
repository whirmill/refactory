# Il Certificate Che Non Veniva Rinnovato

**Data**: 13/03/2027

**[Storie 2026](index.md) | [Precedente](107-il-rate-limiter-che-bloccava-i-legittimi.md) | [Prossima](109-la-queue-che-ha-perso-i-messaggi.md)**

---

C'è una verità nei certificati SSL che tutti conoscono ma nessuno rispetta: i certificati scadono. E quando scadono, il browser mostra un errore. E i clienti vedono "Connessione non sicura". E chiamano. E UL chiama. E tu rispondi. E dici: "Il certificato è scaduto." E UL dice: "SCADUTO?!" E tu dici: "Sì. Ieri." E UL dice: "E PERCHÉ NON È STATO RINNOVATO?!" E tu dici: "Perché il rinnovo automatico non funzionava." E UL dice: "AUTOMATICO?!" E tu dici: "Sì. JN l'aveva configurato." E UL dice: "E JN DOV'È?!" E JN è già scappato. Perché JN sa. Sa che quando un certificato scade, qualcuno deve pagare. E quel qualcuno è sempre JN. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 07:00. Il caffè non era ancora pronto.

Poi è arrivata la chiamata.

**UL**: (al telefono) IL SITO È GIÙ!

**ME**: Giù?!

**UL**: SÌ! I CLIENTI VEDONO "CONNESSIONE NON SICURA"!

**ME**: Non sicura?!

**UL**: SÌ! IL BROWSER DICE CHE IL CERTIFICATO È SCADUTO!

**ME**: Scaduto?!

**UL**: SÌ! SCADUTO! IERI!

**ME**: Controllo subito.

**TERMINALE**:
```
# Controlla certificato
echo | openssl s_client -servername api.company.com -connect api.company.com:443 2>/dev/null | openssl x509 -noout -dates
notBefore=Mar 12 00:00:00 2026 GMT
notAfter=Mar 12 23:59:59 2027 GMT

# Data corrente
date
Mon Mar 13 07:00:00 UTC 2027

# Controlla cert-manager
kubectl get certificates -A
NAMESPACE     NAME                    READY   SECRET               AGE
production    api-company-com         False   api-company-tls      365d

# Controlla perché non è Ready
kubectl describe certificate api-company-com -n production
...
Status:
  Conditions:
    Type: Ready
    Status: "False"
    Reason: "Issuing certificate as Secret does not exist"
    Message: "Certificate does not exist"

# Controlla il secret
kubectl get secret api-company-tls -n production
Error from server (NotFound): secrets "api-company-tls" not found

# Controlla i log di cert-manager
kubectl logs -n cert-manager deployment/cert-manager --since=24h | grep -i "api-company"
2027-03-12 23:59:59 ERROR: Certificate api-company-com has expired
2027-03-13 00:00:00 ERROR: Failed to renew certificate: rate limited
2027-03-13 00:00:01 ERROR: Let's Encrypt rate limit exceeded for domain api.company.com
```

**ME**: Il certificato è scaduto ieri. E il rinnovo automatico ha fallito per rate limit.

**UL**: RATE LIMIT?!

**ME**: Sì. Let's Encrypt ha un limite di richieste. E qualcuno l'ha superato.

**UL**: CHI?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla chi ha fatto richieste
kubectl logs -n cert-manager deployment/cert-manager --since=7d | grep -i "request" | grep -i "api.company.com" | wc -l
847

# Controlla quando
kubectl logs -n cert-manager deployment/cert-manager --since=7d | grep -i "request" | grep -i "api.company.com" | head -5
2027-03-06 10:00:01 INFO: Requesting certificate for api.company.com
2027-03-06 10:00:05 INFO: Requesting certificate for api.company.com
2027-03-06 10:00:10 INFO: Requesting certificate for api.company.com
2027-03-06 10:00:15 INFO: Requesting certificate for api.company.com
...

# Controlla chi ha triggerato
kubectl logs -n cert-manager deployment/cert-manager --since=7d | grep -i "trigger" | grep -i "api.company.com"
2027-03-06 10:00:00 INFO: Certificate triggered by annotation update
2027-03-06 10:00:00 INFO: Annotation: cert-manager.io/renew: "true"
2027-03-06 10:00:00 INFO: Updated by: jn@company.com
```

**ME**: JN ha triggerato 847 rinnovi in una settimana. E ha superato il rate limit di Let's Encrypt.

**UL**: 847 RINNOVI?!

**ME**: Sì. Per "testare il rinnovo automatico".

**UL**: TESTARE?!

**ME**: Sì. Ha aggiunto l'annotation per forzare il rinnovo. 847 volte.

**UL**: E ORA IL CERTIFICATO È SCADUTO?!

**ME**: Sì. E non possiamo rinnovarlo per 7 giorni. Rate limit.

**UL**: 7 GIORNI?!

**ME**: Sì. Let's Encrypt blocca per 7 giorni dopo troppe richieste.

**UL**: E I CLIENTI?!

**ME**: Non possono accedere. Il browser blocca.

**UL**: E QUANTI CLIENTI?!

**ME**: Tutti.

Il UL ha urlato. Io guardavo il terminale. Il terminale mostrava:
- Certificato: scaduto
- Rate limit: superato
- Rinnovi: 847
- Autore: JN
- Blocco: 7 giorni

E tutto era chiaro. JN aveva testato troppo. E il certificato era scaduto. E i clienti non potevano accedere. Amen.

---

**Lunedì - 07:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN stava ancora dormendo.

**ME**: JN, il certificato è scaduto.

**JN**: (voce assonnata) Cosa?!

**ME**: Il certificato SSL. È scaduto ieri.

**JN**: Ma... c'era il rinnovo automatico!

**ME**: Sì. E tu l'hai triggerato 847 volte. E hai superato il rate limit.

**JN**: 847?!

**ME**: Sì. La settimana scorsa. Per "testare".

**JN**: Ma... volevo essere sicuro che funzionasse!

**ME**: E ORA NON FUNZIONA! PER 7 GIORNI!

**JN**: 7 giorni?!

**ME**: Sì. Let's Encrypt ti blocca per 7 giorni.

**JN**: Ma... i clienti?!

**ME**: Non possono accedere. Il browser blocca.

**JN**: E... e cosa facciamo?!

**ME**: Comprimo un certificato. Con soldi veri.

**JN**: Ma... costa!

**ME**: Sì. E costa anche di più non avere clienti per 7 giorni.

**JN**: Quanto?!

**ME**: Non lo so. Ma UL sta già chiamando il CTO.

JN ha riattaccato. O forse è svenuto. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Certificato: scaduto
- Rate limit: attivo
- JN: responsabile
- Soldi: da spendere

E la lezione era chiara. I test vanno fatti con attenzione. E i rate limit vanno rispettati. E JN va educato. Amen.

---

**Lunedì - 08:00**

Ho comprato un certificato. Con soldi veri. Da una CA commerciale.

**TERMINALE**:
```
# Genera CSR
openssl req -new -newkey rsa:2048 -nodes -keyout api.company.com.key -out api.company.com.csr -subj "/C=IT/ST=Milan/L=Milan/O=Company/OU=IT/CN=api.company.com"

# Compra certificato (simulato - in realtà uso DigiCert)
# Costo: €200/anno per wildcard

# Ricevi certificato
cat > api.company.com.crt << 'EOF'
-----BEGIN CERTIFICATE-----
MIIF... (certificato commerciale)
-----END CERTIFICATE-----
EOF

# Crea secret Kubernetes
kubectl create secret tls api-company-tls --cert=api.company.com.crt --key=api.company.com.key -n production

# Aggiorna ingress
kubectl patch ingress api-ingress -n production --type=json -p='[{"op": "replace", "path": "/spec/tls/0/secretName", "value": "api-company-tls"}]'

# Verifica
echo | openssl s_client -servername api.company.com -connect api.company.com:443 2>/dev/null | openssl x509 -noout -dates
notBefore=Mar 13 00:00:00 2027 GMT
notAfter=Mar 13 23:59:59 2028 GMT
```

**ME**: Certificato commerciale installato. Valido per 1 anno.

**UL**: E QUANTO È COSTATO?!

**ME**: €200. Per un anno.

**UL**: E I CLIENTI?!

**ME**: Possono accedere di nuovo.

**UL**: E IL RATE LIMIT?!

**ME**: Aspettiamo 7 giorni. Poi torniamo a Let's Encrypt.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E COME?!

**ME**: Con una lezione. Sui rate limit. E sui certificati. E su come NON testare le cose 847 volte.

UL ha sospirato. Poi ha detto: "Documenta tutto. E fai in modo che non succeda più."

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I certificati vanno rinnovati. E i rate limit vanno rispettati. E JN va educato. Amen.

---

**Lunedì - 10:00**

Ho auditato tutti i certificati. Per trovare altri problemi.

**TERMINALE**:
```
# Controlla tutti i certificati
for domain in $(kubectl get ingress -A -o jsonpath='{.items[*].spec.tls[*].hosts[*]}'); do
  echo "=== $domain ==="
  echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -dates
done

# Risultati
=== api.company.com ===
notAfter=Mar 13 23:59:59 2028 GMT  # OK - appena rinnovato

=== www.company.com ===
notAfter=Apr 15 23:59:59 2027 GMT  # OK - 33 giorni

=== staging.company.com ===
notAfter=Mar 20 23:59:59 2027 GMT  # WARNING - 7 giorni

=== internal.company.com ===
notAfter=Mar 14 23:59:59 2027 GMT  # CRITICAL - 1 giorno

=== legacy.company.com ===
notAfter=Mar 13 12:00:00 2027 GMT  # CRITICAL - scade oggi!

# Controlla cert-manager
kubectl get certificates -A -o custom-columns=NAME:.metadata.name,READY:.status.conditions[?\(@.type==\"Ready\"\)].status,EXPIRES:.status.notAfter
NAME                    READY   EXPIRES
api-company-com         True    2028-03-13
www-company-com         True    2027-04-15
staging-company-com     False   2027-03-20
internal-company-com    False   2027-03-14
legacy-company-com      False   2027-03-13
```

**ME**: Ci sono altri 3 certificati problematici.

**TL**: 3?!

**ME**: Sì. Staging scade tra 7 giorni. Internal tra 1 giorno. Legacy oggi.

**TL**: E PERCHÉ NON SONO STATI RINNOVATI?!

**ME**: Perché hanno lo stesso problema. Rate limit.

**TL**: RATE LIMIT ANCHE LORO?!

**ME**: No. Ma il cert-manager è configurato male. E non rinnova.

**TL**: E COME MALE?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla configurazione cert-manager
kubectl get clusterissuer -o yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx

# Controlla perché non rinnova
kubectl describe certificate staging-company-com -n staging
...
Status:
  Conditions:
    Type: Ready
    Status: "False"
    Reason: "Failed"
    Message: "Failed to obtain certificate: ACME client error: urn:ietf:params:acme:error:rejectedIdentifier"

# Controlla ACME error
kubectl logs -n cert-manager deployment/cert-manager --since=24h | grep -i "rejectedIdentifier"
2027-03-13 07:00:00 ERROR: ACME validation failed: domain staging.company.com does not resolve to this server
```

**ME**: Il problema è diverso. Staging non risolve. E internal e legacy usano DNS diversi.

**TL**: E QUINDI?!

**ME**: E quindi... fixo tutto.

**TERMINALE**:
```
# Fix staging - aggiorna DNS
kubectl patch certificate staging-company-com -n staging --type=json -p='[{"op": "replace", "path": "/spec/dnsNames", "value": ["staging.company.com"]}]'

# Fix internal - usa DNS challenge
cat > internal-cert.yaml << 'EOF'
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: internal-company-com
  namespace: internal
spec:
  dnsNames:
    - internal.company.com
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  secretName: internal-company-tls
  usages:
    - digital signature
    - key encipherment
EOF
kubectl apply -f internal-cert.yaml

# Fix legacy - compra certificato commerciale
# (come fatto per api.company.com)

# Verifica
kubectl get certificates -A
NAMESPACE     NAME                    READY   SECRET               AGE
production    api-company-com         True    api-company-tls      365d
production    www-company-com         True    www-company-tls      300d
staging       staging-company-com     True    staging-company-tls  200d
internal      internal-company-com    True    internal-company-tls 100d
legacy        legacy-company-com      True    legacy-company-tls   50d
```

**ME**: Tutti i certificati fixati. O rinnovati. O comprati.

**TL**: E QUANTO È COSTATO?!

**ME**: €600. Per 3 certificati commerciali.

**TL**: E I RATE LIMIT?!

**ME**: Configurati alert. E limiti. E JN non può più triggerare 847 rinnovi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Certificati: tutti rinnovati
- Costo: €800 totale
- JN: limitato
- Alert: configurati

E tutto era fixato. Ma avevo imparato una lezione. La lezione che i certificati vanno monitorati. E che i rate limit vanno rispettati. E che JN va limitato. Amen.

---

**Martedì - La Prevenzione**

Martedì. Ho aggiunto controlli. Per prevenire altri disastri.

**TERMINALE**:
```
# Configura alert per certificati in scadenza
cat > /etc/prometheus/alerts/certificates.yml << 'EOF'
groups:
  - name: certificates
    rules:
      - alert: CertificateExpiringSoon
        expr: |
          cert_manager_certificate_expiration_timestamp_seconds - time() < 86400 * 7
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Certificate {{ $labels.name }} expires in less than 7 days"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} expires on {{ $labels.expiration_date }}"

      - alert: CertificateExpiringCritical
        expr: |
          cert_manager_certificate_expiration_timestamp_seconds - time() < 86400 * 3
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: "Certificate {{ $labels.name }} expires in less than 3 days"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} expires on {{ $labels.expiration_date }}. RENEW IMMEDIATELY."

      - alert: CertificateExpired
        expr: |
          cert_manager_certificate_expiration_timestamp_seconds - time() < 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Certificate {{ $labels.name }} has EXPIRED"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} has EXPIRED. SERVICE IS DOWN."

      - alert: CertificateRenewalFailed
        expr: |
          cert_manager_certificate_ready_status{condition="Ready"} == 0
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "Certificate {{ $labels.name }} renewal failed"
          description: "Certificate {{ $labels.name }} in namespace {{ $labels.namespace }} failed to renew. Reason: {{ $labels.reason }}"

      - alert: RateLimitApproaching
        expr: |
          cert_manager_acme_requests_total{status="failed"} > 50
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "ACME rate limit may be approaching"
          description: "{{ $value }} failed ACME requests in the last 5 minutes. Let's Encrypt rate limit is 50 requests per 3 hours."
EOF

# Limita richieste ACME
cat > cert-manager-limits.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: cert-manager-config
  namespace: cert-manager
data:
  acme-http01-solver-image: "quay.io/jetstack/cert-manager-acmesolver:v1.13.0"
  # Limita retry
  max-retry-period: "3600s"
  # Limita richieste simultanee
  max-concurrent-requests: "5"
EOF

# Aggiungi RBAC per JN
cat > jn-rbac.yaml << 'EOF'
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: certificate-viewer
  namespace: production
rules:
  - apiGroups: ["cert-manager.io"]
    resources: ["certificates"]
    verbs: ["get", "list", "watch"]
    # NOTA: "update" e "patch" NON sono permessi per JN
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: jn-certificate-viewer
  namespace: production
subjects:
  - kind: User
    name: jn@company.com
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: certificate-viewer
  apiGroup: rbac.authorization.k8s.io
EOF
kubectl apply -f jn-rbac.yaml
```

**TL**: Hai limitato JN?

**ME**: Sì. Ora JN può solo vedere i certificati. Non può più triggerare rinnovi.

**TL**: E SE SERVE RINNOVARE?!

**ME**: Allora lo chiede a me. O al TL. E noi controlliamo.

**TL**: E GLI ALERT?!

**ME**: Configurati per 7 giorni, 3 giorni, e scaduto. E per rinnovi falliti. E per rate limit.

**TL**: E SE NON FUNZIONANO?!

**ME**: Allora... abbiamo un backup. Certificati commerciali per tutti i domini critici.

**TL**: E QUANTO COSTA?!

**ME**: €800/anno. Ma costa meno di 7 giorni senza clienti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Alert: configurati
- JN: limitato
- Backup: certificati commerciali
- Costo: €800/anno

E tutto funzionava. Ma avevo imparato una lezione. La lezione che la prevenzione costa. Ma costa meno del disastro. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per il certificato?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che il certificato scaduto è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i certificati scadono.

**JN**: Lo so!

**ME**: E quindi vanno rinnovati. Prima che scadano.

**JN**: Ma c'era il rinnovo automatico!

**ME**: Secondo: il rinnovo automatico va testato. Una volta. Non 847 volte.

**JN**: Ma volevo essere sicuro!

**ME**: JN, 847 volte non è sicurezza. È ossessione. E ha superato il rate limit.

**JN**: Il rate limit?

**ME**: Terzo: Let's Encrypt ha dei limiti. 50 certificati per dominio per 3 ore. 5 certificati duplicati per settimana. E quando li superi, ti bloccano.

**JN**: Per quanto?

**ME**: 7 giorni. Durante i quali i clienti non possono accedere.

**JN**: Ah.

**ME**: AH?!

**JN**: Sì. Non lo sapevo.

**ME**: Quarto: quando testi, usa staging.

**JN**: Staging?

**ME**: Sì. Let's Encrypt ha un server di staging. Senza rate limit. Per i test. Usa quello.

**JN**: E come?

**ME**: Configuri un ClusterIssuer separato. Con server https://acme-staging-v02.api.letsencrypt.org/directory. E testi lì.

**JN**: Ok.

**ME**: Quinto: i certificati vanno monitorati.

**JN**: Monitorati?

**ME**: Sì. Con alert. Che ti dicono quando stanno per scadere. Quando il rinnovo fallisce. Quando c'è un problema.

**JN**: E se non ho tempo di guardare gli alert?

**ME**: Allimenti... ti chiamano alle 07:00 di lunedì. E ti dicono che il sito è giù. E che i clienti non possono accedere. E che hai speso €800 per certificati commerciali. E che UL vuole parlarti.

**JN**: ...

**ME**: E la prossima volta, pensa. Prima di triggerare 847 rinnovi, pensa a cosa succede. Pensa ai rate limit. Pensa ai clienti. Pensa a UL che chiama alle 07:00.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Certificati: tutti rinnovati
- Rate limit: rispettati
- JN: limitato
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere alert. E backup. E educazione. Amen.

---

**Giovedì - La Documentazione**

Giovedì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i certificati.

```markdown
## Incident #CERT-001: Il Certificate Che Non Veniva Rinnovato

**Data incident**: Lunedì 13 marzo 2027, 07:00
**Autore**: JN
**Servizio**: api.company.com
**Problema**: Certificato SSL scaduto
**Causa**: Rate limit Let's Encrypt superato da 847 richieste di rinnovo
**Tempo di esposizione**: 1 ora
**Clienti bloccati**: tutti
**Costo certificati commerciali**: €800
**Rate limit blocco**: 7 giorni
**Reazione UL**: "SCADUTO?!"
**Reazione TL**: "847 RINNOVI?!"
**Reazione CTO**: "Usa staging per i test."
**Soluzione**: Certificati commerciali + alert + limiti per JN
**Lezione imparata**: I CERTIFICATI SCADONO. I RATE LIMIT ESISTONO. JN VA LIMITATO.

**Regole per i certificati**:
1. I certificati SCADONO. Monitorali.
2. Let's Encrypt ha RATE LIMIT. Rispettali.
3. Usa STAGING per i test. Non production.
4. Configura ALERT per scadenza e rinnovo fallito.
5. Hai un BACKUP. Certificati commerciali per domini critici.
6. NON triggerare 847 rinnovi. MAI.
7. Se superi il rate limit, aspetta 7 giorni. O paga.
8. Documenta. E educa. Sempre. Amen.

**Come configurare alert per certificati**:
```yaml
groups:
  - name: certificates
    rules:
      - alert: CertificateExpiringSoon
        expr: cert_manager_certificate_expiration_timestamp_seconds - time() < 86400 * 7
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Certificate {{ $labels.name }} expires in less than 7 days"
```

**Come usare staging per i test**:
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
      - http01:
          ingress:
            class: nginx
```

**Come limitare gli utenti**:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: certificate-viewer
rules:
  - apiGroups: ["cert-manager.io"]
    resources: ["certificates"]
    verbs: ["get", "list", "watch"]
    # NOTA: "update" e "patch" NON sono permessi
```

**Come controllare i certificati**:
```bash
# Controlla scadenza
echo | openssl s_client -servername api.company.com -connect api.company.com:443 2>/dev/null | openssl x509 -noout -dates

# Controlla tutti i certificati Kubernetes
kubectl get certificates -A

# Controlla stato rinnovo
kubectl describe certificate api-company-com -n production
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i certificati scadono. E che Let's Encrypt ha rate limit. E che JN va limitato. E che €800 è meno di 7 giorni senza clienti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i certificati sono come il latte. Scadono. E se non li controlli, quando li apri è troppo tardi. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Il certificato è scaduto." E UL dice: "SCADUTO?!" E tu dici: "Sì. Ieri." E UL dice: "E PERCHÉ NON È STATO RINNOVATO?!" E tu dici: "Perché JN ha triggerato 847 rinnovi. E ha superato il rate limit." E UL dice: "847?!" E tu dici: "Sì. Per testare." E UL dice: "E HA TESTATO 847 VOLTE?!" E tu dici: "Sì. E ora siamo bloccati per 7 giorni. O paghiamo €800 per certificati commerciali." E UL dice: "PAGA!" E tu paghi. E la verità è che i certificati scadono. E i rate limit esistono. E JN va limitato. E la prossima volta, usi staging. E alert. E backup. E non chiami UL alle 07:00 di lunedì. Amen.

---

## Il costo del certificato scaduto

| Voce | Valore |
|------|--------|
| Servizio | api.company.com |
| Autore | JN |
| Data incident | 13/03/2027, 07:00 |
| Tempo di esposizione | 1 ora |
| Clienti bloccati | tutti |
| Rate limit superato | 847 richieste |
| Blocco Let's Encrypt | 7 giorni |
| Costo certificati commerciali | €800 |
| Certificati problematici | 4 |
| Domini affetti | api, staging, internal, legacy |
| Reazione UL | "SCADUTO?!" |
| Reazione TL | "847 RINNOVI?!" |
| Reazione CTO | "Usa staging." |
| Soluzione | Certificati commerciali + alert + limiti |
| Lezione imparata | CERTIFICATI SCADONO. RATE LIMIT ESISTONO. |
| **Totale** | **€800 + 4 certificati fixati + 1 junior limitato** |

**Morale**: I certificati scadono. E quando scadono, i clienti non possono accedere. E UL chiama. E tu rispondi. E dici: "Il certificato è scaduto." E UL dice: "SCADUTO?!" E tu dici: "Sì. Ieri." E UL dice: "E PERCHÉ?!" E tu dici: "Perché JN ha triggerato 847 rinnovi. E ha superato il rate limit." E UL dice: "847?!" E tu dici: "Sì. Per testare." E UL dice: "E HA TESTATO 847 VOLTE?!" E tu dici: "Sì. E ora siamo bloccati per 7 giorni." E UL dice: "E I CLIENTI?!" E tu dici: "Non possono accedere." E UL dice: "E QUANTO COSTA FIXARE?!" E tu dici: "€800. Per certificati commerciali." E UL dice: "PAGA!" E tu paghi. E la verità è che i test vanno fatti con attenzione. E i rate limit vanno rispettati. E i certificati vanno monitorati. E JN va limitato. E la prossima volta, usi staging. E alert. E backup. E non chiami UL alle 07:00 di lunedì. Mai. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](107-il-rate-limiter-che-bloccava-i-legittimi.md) | [Prossima](109-la-queue-che-ha-perso-i-messaggi.md)**