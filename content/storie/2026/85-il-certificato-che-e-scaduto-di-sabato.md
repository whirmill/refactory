# Il Certificato Che È Scaduto di Sabato

**Data**: 03/10/2026

**[Home](../index.md) | [Precedente](84-il-vendor-che-e-scomparso.md)]**

---

C'è una legge universale nell'IT: i certificati SSL scadono sempre nel momento peggiore. E il momento peggiore è sempre sabato. Sempre. È come se i certificati avessero un calendario interno che dice: "Ah, è weekend? Perfetto, ora scado." E scadono. E tu sei a casa. A fare altro. E il telefono squilla. E il telefono non smette di squillare. E tu rispondi. E UL dice: "Il sito non funziona." E tu dici: "Che errore dà?" E UL dice: "Il browser dice che il sito non è sicuro." E tu sai. Sai già cosa è successo. Perché è sempre la stessa cosa. Il certificato è scaduto. Di sabato. Amen.

![](../../img/server.jpg)

---

**Sabato - 14:00**

Era sabato. Ero a pranzo. Con la famiglia. Per una volta. Per una fottuta volta.

Il telefono ha squillato. Ho guardato. Era UL.

**ME**: Pronto?

**UL**: Il sito non funziona!

**ME**: Che errore dà?

**UL**: Il browser dice che il sito non è sicuro.

**ME**: Cosa significa?

**UL**: Significa che non posso accedere!

**ME**: E cosa dice esattamente?

**UL**: Dice "La connessione non è sicura. Il certificato di sicurezza è scaduto."

**ME**: Scaduto?

**UL**: Sì. Scaduto.

**ME**: E quando scadeva?

**UL**: Non lo so! Tu dovresti saperlo!

**ME**: Io... non lo so.

**UL**: COME NON LO SAI?!

**ME**: Non ho controllato.

**UL**: E PERCHÉ?!

**ME**: Perché... non c'era nel calendario.

**UL**: NON C'ERA NEL CALENDARIO?!

**ME**: No. Me lo sono dimenticato.

**UL**: TI SEI DIMENTICATO?!

**ME**: Sì.

**UL**: E ORA?!

**ME**: Ora... lo rinnovo.

**UL**: E QUANTO TEMPO CI VUOLE?!

**ME**: Non lo so. Dipende dal provider.

**UL**: E IL PROVIDER?!

**ME**: È... Let's Encrypt.

**UL**: E QUANTO CI METTE?!

**ME**: Di solito poco. Ma devo accedere al server.

**UL**: E ALLORA ACCEDI!

**ME**: Sono a pranzo. Con la famiglia.

**UL**: E IL SITO?!

**ME**: Il sito... aspetta.

**UL**: IL SITO NON PUÒ ASPETTARE!

**ME**: Allora... vado.

UL ha riattaccato. Io guardavo la famiglia. La famiglia guardava me. Mia moglie ha detto: "Vai?" Ho detto: "Vado." Lei ha detto: "È sabato." Ho detto: "Lo so." Lei ha detto: "Ancora?" Ho detto: "Sempre." E sono andato. Amen.

---

**Sabato - 14:30**

Ero in ufficio. Di sabato. Per un certificato. Un fottuto certificato.

**TERMINALE**:
```
openssl s_client -connect api.produzione.com:443 2>/dev/null | openssl x509 -noout -dates
notBefore=Oct 3 2025 00:00:00 GMT
notAfter=Oct 3 2026 00:00:00 GMT
```

**ME**: Scaduto oggi. Alle 00:00.

**TL**: (su Slack) E non c'era un alert?

**ME**: No. Non ho configurato gli alert.

**TL**: E perché?

**ME**: Non c'era tempo.

**TL**: E ora?

**ME**: Ora lo rinnovo.

**TL**: E quanto ci metti?

**ME**: Poco. Let's Encrypt è automatico.

**TL**: E allora fallo.

**TERMINALE**:
```
certbot renew
Attempting to renew cert from /etc/letsencrypt/renewal/api.produzione.com.conf...
Failed to renew cert api.produzione.com.
Error: Domain failed authorization challenge.
```

**ME**: Non funziona.

**TL**: Perché?

**ME**: Non lo so. Dice "authorization challenge failed".

**TL**: E cosa significa?

**ME**: Significa che non riesce a verificare che possediamo il dominio.

**TL**: E perché?

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
cat /var/log/letsencrypt/letsencrypt.log
2026-10-03 14:35:00 ERROR: Port 80 is not accessible from the internet.
2026-10-03 14:35:00 ERROR: Cannot complete HTTP-01 challenge.
```

**ME**: La porta 80 è chiusa.

**TL**: Chiusa?

**ME**: Sì. Il firewall blocca la 80.

**TL**: E perché?

**ME**: Perché abbiamo detto di bloccarla. Per sicurezza.

**TL**: E Let's Encrypt?

**ME**: Let's Encrypt usa la porta 80 per la verifica.

**TL**: E quindi?

**ME**: E quindi non può rinnovare.

**TL**: E ora?

**ME**: Ora apro la porta 80.

**TL**: E poi?

**ME**: Poi rinnovo.

**TL**: E poi?

**ME**: Poi chiudo la porta 80.

**TL**: E quanto tempo?

**ME**: Cinque minuti. Forse meno.

**TL**: E i security audit?

**ME**: I security audit... non lo so.

**TL**: E se qualcuno nota?

**ME**: Allora... prega.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Hai aperto una porta per rinnovare un certificato che hai dimenticato di rinnovare. E ora preghi che nessuno noti. Di sabato. Amen."

---

**Sabato - 15:00**

Ho aperto la porta 80. Ho rinnovato il certificato. Ho chiuso la porta 80.

**TERMINALE**:
```
# Apri porta 80
ufw allow 80/tcp

# Rinnova certificato
certbot renew
Attempting to renew cert from /etc/letsencrypt/renewal/api.produzione.com.conf...
Successfully renewed cert api.produzione.com.

# Chiudi porta 80
ufw deny 80/tcp

# Verifica
openssl s_client -connect api.produzione.com:443 2>/dev/null | openssl x509 -noout -dates
notBefore=Oct 3 2026 14:45:00 GMT
notAfter=Jan 1 2027 00:00:00 GMT
```

**ME**: Fatto. Certificato rinnovato.

**TL**: E il sito?

**ME**: Il sito funziona.

**TL**: E UL?

**ME**: UL è... informo.

**TL**: E la famiglia?

**ME**: La famiglia... aspetta.

**TL**: E tu?

**ME**: Io... torno a casa.

**TL**: E la prossima volta?

**ME**: La prossima volta... metto un alert.

**TL**: E quando?

**ME**: Lunedì.

**TL**: E se ti dimentichi?

**ME**: Non mi dimentico.

**TL**: E SE TI DIMENTICHI?

**ME**: Allora... sabato prossimo.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Sabato prossimo. Un altro sabato. Un altro certificato. Un altro weekend rovinato. Amen."

---

**Sabato - 16:00**

Sono tornato a casa. La famiglia era ancora a tavola. Il pranzo era finito. I piatti erano stati lavati. Mia moglie mi ha guardato. Ha detto: "Fatto?" Ho detto: "Fatto." Lei ha detto: "Era importante?" Ho detto: "Era un certificato." Lei ha detto: "E ha rovinato il sabato?" Ho detto: "Sì." Lei ha detto: "E non poteva aspettare lunedì?" Ho detto: "No." Lei ha detto: "Perché?" Ho detto: "Perché il sito non funziona senza certificato." Lei ha detto: "E chi lo usa il sito di sabato?" Ho detto: "I clienti." Lei ha detto: "I clienti lavorano di sabato?" Ho detto: "A quanto pare sì." Lei ha detto: "E tu?" Ho detto: "Io... lavoro di sabato." Lei ha detto: "Sempre?" Ho detto: "Sempre." E ho guardato il nulla. Il nulla che era il mio weekend. Il nulla che era la mia vita. Il nulla... che era il certificato scaduto. Amen.

---

**Lunedì - La Riunione**

Lunedì. Riunione. Con UL. E il CTO. E il PM. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che il certificato sia scaduto?

**ME**: Non c'era un alert.

**UL**: E perché non c'era un alert?

**ME**: Non l'ho configurato.

**UL**: E perché?

**ME**: Non c'era tempo.

**UL**: E QUANDO CI SARÀ TEMPO?!

**ME**: Non lo so. Quando finiamo le feature.

**UL**: E QUANDO FINIAMO LE FEATURE?!

**ME**: Non lo so. Il PM ne aggiunge sempre.

**PM**: Ehi! Io aggiungo feature perché i clienti le vogliono!

**UL**: E I CLIENTI VOGLIONO ANCHE CHE IL SITO FUNZIONI!

**PM**: Ma... le feature...

**CTO**: Basta. Il problema è che non c'era un alert. E ora mettiamo un alert.

**ME**: Sì.

**CTO**: E chi lo mette?

**ME**: Lo metto io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E cosa monitoriamo?

**ME**: I certificati. Tutti i certificati.

**CTO**: E quanti sono?

**ME**: Non lo so. Li conto.

**TERMINALE**:
```
find /etc/letsencrypt -name "*.pem" | wc -l
47
```

**ME**: 47 certificati.

**CTO**: 47?!

**ME**: Sì. 47.

**CTO**: E quando scadono?

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
for cert in /etc/letsencrypt/live/*/cert.pem; do
  echo "$cert: $(openssl x509 -in $cert -noout -dates | grep notAfter)"
done

/etc/letsencrypt/live/api.produzione.com/cert.pem: notAfter=Jan 1 2027
/etc/letsencrypt/live/api.staging.com/cert.pem: notAfter=Oct 15 2026
/etc/letsencrypt/live/admin.produzione.com/cert.pem: notAfter=Oct 22 2026
/etc/letsencrypt/live/mail.produzione.com/cert.pem: notAfter=Nov 5 2026
/etc/letsencrypt/live/internal.tool.com/cert.pem: notAfter=Nov 12 2026
...
```

**ME**: Ecco... alcuni scadono presto.

**CTO**: QUANTO PRESTO?!

**ME**: Il 15 ottobre. Tra 12 giorni.

**CTO**: E IL 15 OTTOBRE CHE GIORNO È?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
date -d "2026-10-15" +%A
Thursday
```

**ME**: Giovedì.

**CTO**: GIOVEDÌ?!

**ME**: Sì. Giovedì.

**CTO**: E QUINDI?

**ME**: E quindi... non è sabato.

**CTO**: E QUESTO TI CONSOLA?!

**ME**: Un po'.

**CTO**: E GLI ALTRI?!

**ME**: Gli altri... controllo.

**TERMINALE**:
```
date -d "2026-10-22" +%A
Thursday
date -d "2026-11-05" +%A
Thursday
date -d "2026-11-12" +%A
Thursday
```

**ME**: Tutti giovedì.

**CTO**: TUTTI GIOVEDÌ?!

**ME**: Sì. Tutti giovedì.

**CTO**: E PERCHÉ?!

**ME**: Perché Let's Encrypt rinnova ogni 90 giorni. E 90 giorni fa era giovedì.

**CTO**: E QUINDI?

**ME**: E quindi... i certificati scadono di giovedì.

**CTO**: E SABATO?!

**ME**: Sabato era quello di oggi. Era stato rinnovato manualmente. 90 giorni fa. Di sabato.

**CTO**: E QUINDI?

**ME**: E quindi... i certificati scadono quando scadono. E quando scadono, qualcuno deve rinnovarli.

**CTO**: E CHI?

**ME**: Io.

**CTO**: E SE TI DIMENTICHI?

**ME**: Allora... il sito non funziona.

**CTO**: E I CLIENTI?

**ME**: I clienti chiamano.

**CTO**: E UL?

**ME**: UL chiama me.

**CTO**: E TU?

**ME**: Io... vengo in ufficio. Di sabato.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia pianificazione. Il nulla che era il mio sistema di alert. Il nulla... che erano 47 certificati. Tutti da monitorare. Tutti da rinnovare. Tutti... una bomba a orologeria. Amen.

---

**Martedì - L'Alert**

Martedì. Ho configurato l'alert. Per i certificati. Per tutti i certificati.

**TERMINALE**:
```
# Script di monitoraggio certificati
cat > /usr/local/bin/check-certs.sh << 'EOF'
#!/bin/bash
THRESHOLD=30  # giorni

for cert in /etc/letsencrypt/live/*/cert.pem; do
  domain=$(basename $(dirname $cert))
  expiry=$(openssl x509 -in $cert -noout -enddate | cut -d= -f2)
  expiry_epoch=$(date -d "$expiry" +%s)
  now_epoch=$(date +%s)
  days_left=$(( ($expiry_epoch - $now_epoch) / 86400 ))
  
  if [ $days_left -lt $THRESHOLD ]; then
    echo "WARNING: $domain expires in $days_left days"
    # Invia alert
    curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ Certificato $domain scade tra $days_left giorni\"}"
  fi
done
EOF

chmod +x /usr/local/bin/check-certs.sh

# Cron job
echo "0 9 * * * /usr/local/bin/check-certs.sh" | crontab -
```

**TL**: Hai configurato l'alert?

**ME**: Sì.

**TL**: E cosa fa?

**ME**: Controlla i certificati ogni giorno. E manda un messaggio su Slack se uno sta per scadere.

**TL**: E quando manda il messaggio?

**ME**: 30 giorni prima della scadenza.

**TL**: 30 giorni?

**ME**: Sì. Così ho tempo di rinnovare.

**TL**: E se non vedi il messaggio?

**ME**: Lo vedo. Slack è sempre aperto.

**TL**: E se Slack è down?

**ME**: Allora... prega.

**TL**: E se sei in vacanza?

**ME**: Allora... qualcun altro vede il messaggio.

**TL**: E CHI?!

**ME**: Non lo so. Tu?

**TL**: IO?!

**ME**: Sì. Tu.

**TL**: E SE SONO IN VACANZA ANCH'IO?!

**ME**: Allora... prega entrambi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Script: configurato
- Cron: attivo
- Alert: 30 giorni prima

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Perché le cose che sembrano ok le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Mercoledì - L'Automazione**

Mercoledì. Ho automatizzato il rinnovo. Per non dimenticare più.

**TERMINALE**:
```
# Configura rinnovo automatico
certbot renew --dry-run
Congratulations, all simulated renewals succeeded.

# Cron per rinnovo automatico
echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'" | crontab -
```

**TL**: Hai automatizzato il rinnovo?

**ME**: Sì.

**TL**: E funziona?

**ME**: Sì. Ho fatto un test.

**TL**: E la porta 80?

**ME**: La porta 80... è ancora chiusa.

**TL**: E COME RINNOVA SENZA LA PORTA 80?!

**ME**: Non lo so. Forse non rinnova.

**TL**: E QUINDI?!

**ME**: E quindi... apro la porta 80.

**TL**: E LA SICUREZZA?!

**ME**: La sicurezza... è un compromesso.

**TL**: E IL SECURITY AUDIT?!

**ME**: Il security audit... non lo so.

**TL**: E SE QUALCUNO HACKERA LA PORTA 80?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Rinnovo automatico: configurato
- Porta 80: ancora chiusa
- Problema: il rinnovo automatico non funziona senza la porta 80

E il ciclo ricomincia. La sicurezza blocca il rinnovo. Il rinnovo richiede la porta 80. La porta 80 è un rischio. Il rischio è accettabile? Non lo so. Ma il certificato deve essere rinnovato. E la porta 80 deve essere aperta. O troviamo un altro modo. Amen.

---

**Giovedì - La Soluzione**

Giovedì. Ho trovato una soluzione. Una soluzione che non richiede la porta 80.

**TERMINALE**:
```
# Configura DNS challenge per Let's Encrypt
certbot certonly --manual --preferred-challenges dns -d api.produzione.com

# Oppure usa certbot-dns-cloudflare
apt install python3-certbot-dns-cloudflare
certbot certonly --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/cloudflare.ini -d api.produzione.com
```

**TL**: Hai usato il DNS challenge?

**ME**: Sì. Non serve la porta 80.

**TL**: E come funziona?

**ME**: Let's Encrypt verifica il dominio tramite un record DNS. Non tramite HTTP.

**TL**: E la porta 80?

**ME**: La porta 80 resta chiusa.

**TL**: E LA SICUREZZA?!

**ME**: La sicurezza è... sicura.

**TL**: E IL SECURITY AUDIT?!

**ME**: Il security audit è... felice.

**TL**: E TU?

**ME**: Io... sono felice.

**TL**: E LA PROSSIMA VOLTA?

**ME**: La prossima volta... non serve aprire la porta 80.

**TL**: E SABATO?

**ME**: Sabato... è mio.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- DNS challenge: configurato
- Porta 80: chiusa
- Rinnovo automatico: funzionante

E tutto funzionava. Senza aprire la porta 80. Senza compromessi di sicurezza. Senza... sabati rovinati. O quasi. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sistemisti che avrebbero dimenticato i certificati.

```markdown
## Incident #CERT-001: Il Certificato Che È Scaduto di Sabato

**Data incident**: Sabato 3 ottobre 2026, 14:00
**Autore**: ME
**Certificato**: api.produzione.com
**Provider**: Let's Encrypt
**Data scadenza**: 3 ottobre 2026, 00:00
**Giorno della settimana**: Sabato
**Ora del guasto**: 14:00 (quando UL ha chiamato)
**Tempo di risoluzione**: 1 ora
**Impatto**: Sito non accessibile per 14 ore (dalle 00:00 alle 14:00)
**Clienti colpiti**: ~200
**Ticket aperti**: 15
**Chiamate ricevute**: 8
**Sabato rovinato**: 1
**Pranzo famiglia rovinato**: 1
**Reazione UL**: "Il sito non funziona!"
**Reazione moglie**: "Ancora?"
**Reazione TL**: "Non c'era un alert?"
**Reazione CTO**: "Mettiamo un alert."
**Soluzione**: Rinnovato manualmente, poi automatizzato con DNS challenge
**Lezione imparata**: I CERTIFICATI SCADONO. SEMPRE. E SCADONO DI SABATO.

**Certificati in produzione**: 47
**Certificati con alert**: 47 (ora)
**Certificati con rinnovo automatico**: 47 (ora)
**Metodo di rinnovo**: DNS challenge (non richiede porta 80)
**Alert configurato**: 30 giorni prima della scadenza
**Canale alert**: Slack

**Regole per il futuro**:
1. I certificati scadono. Sempre.
2. I certificati scadono di sabato. Sempre.
3. Configurare alert per tutti i certificati.
4. Automatizzare il rinnovo.
5. Usare DNS challenge per evitare di aprire la porta 80.
6. Documentare dove sono tutti i certificati.
7. Non fidarsi della memoria. La memoria dimentica.
8. I certificati non dimenticano. Scadono.
9. Sabato è sacro. Non rovinarlo con i certificati.
10. Se scade di sabato, è colpa tua. Sempre.

**Come configurare alert per certificati**:
```bash
# Script di monitoraggio
cat > /usr/local/bin/check-certs.sh << 'EOF'
#!/bin/bash
THRESHOLD=30

for cert in /etc/letsencrypt/live/*/cert.pem; do
  domain=$(basename $(dirname $cert))
  expiry=$(openssl x509 -in $cert -noout -enddate | cut -d= -f2)
  expiry_epoch=$(date -d "$expiry" +%s)
  now_epoch=$(date +%s)
  days_left=$(( ($expiry_epoch - $now_epoch) / 86400 ))
  
  if [ $days_left -lt $THRESHOLD ]; then
    curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"⚠️ Certificato $domain scade tra $days_left giorni\"}"
  fi
done
EOF

# Cron job
echo "0 9 * * * /usr/local/bin/check-certs.sh" | crontab -
```

**Come configurare rinnovo automatico con DNS challenge**:
```bash
# Installa plugin Cloudflare
apt install python3-certbot-dns-cloudflare

# Configura credenziali
cat > /root/.secrets/cloudflare.ini << EOF
dns_cloudflare_api_token = YOUR_TOKEN
EOF

# Rinnova con DNS challenge
certbot certonly --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/cloudflare.ini -d yourdomain.com

# Cron per rinnovo automatico
echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'" | crontab -
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i certificati scadono. E che scadono di sabato. E che serve un alert. E che serve l'automazione. E che la porta 80 non serve. E che il DNS challenge è meglio. E che 47 certificati sono tanti. E che la memoria dimentica. E che i certificati non dimenticano. E che sabato è sacro. E che non va rovinato. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i certificati sono come le tasse. Scadono. Sempre. E se non le paghi in tempo, paghi di più. E se non rinnovi in tempo, paghi con il sabato. E il sabato è prezioso. E i certificati non aspettano. E l'automazione salva la vita. E l'alert salva il sabato. E ora lo so. E ora lo documenti. Amen.

---

## Il costo del certificato scaduto di sabato

| Voce | Valore |
|------|--------|
| Certificato | api.produzione.com |
| Data scadenza | 3 ottobre 2026, 00:00 |
| Giorno | Sabato |
| Ora guasto | 14:00 |
| Tempo offline | 14 ore |
| Clienti colpiti | ~200 |
| Ticket aperti | 15 |
| Chiamate ricevute | 8 |
| Tempo risoluzione | 1 ora |
| Sabato rovinato | 1 |
| Pranzo famiglia rovinato | 1 |
| Reazione UL | "Il sito non funziona!" |
| Reazione moglie | "Ancora?" |
| Reazione TL | "Non c'era un alert?" |
| Reazione CTO | "Mettiamo un alert." |
| Soluzione | DNS challenge + automazione |
| Lezione imparata | CERTIFICATI = ALERT + AUTOMAZIONE |
| **Totale** | **14 ore offline + 200 clienti + 15 ticket + 1 sabato rovinato** |

**Morale**: I certificati SSL scadono. È nella loro natura. E scadono sempre nel momento peggiore. Che è quasi sempre sabato. E se non hai un alert, non lo sai. E se non lo sai, il sito va giù. E se il sito va giù, UL chiama. E se UL chiama di sabato, il tuo sabato è rovinato. E se il tuo sabato è rovinato, la tua famiglia ti odia. E se la tua famiglia ti odia, la tua vita è rovinata. E tutto per un certificato. Che costa zero euro. Ma che ti costa il sabato. E il sabato non ha prezzo. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](84-il-vendor-che-e-scomparso.md)]**
