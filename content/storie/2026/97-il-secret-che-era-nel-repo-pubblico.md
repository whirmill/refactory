# Il Secret Che Era Nel Repo Pubblico

**Data**: 26/12/2026

**[Storie 2026](index.md) | [Precedente](96-il-webhook-che-ha-inondato-la-coda.md) | [Prossima](98-il-rollback-che-non-e-mai-arrivato.md)**

---

C'è una verità nel mondo DevOps che tutti conoscono ma nessuno rispetta: i secret non vanno mai nei repository. Mai. Per nessun motivo. In nessun caso. MAI. E quando un secret finisce in un repo pubblico, succede quello che deve succedere: qualcuno lo trova. E lo usa. E tu ti chiedi: "Com'è possibile che la chiave API fosse nel repo?" E la risposta è semplice: perché qualcuno l'ha committata. E quel qualcuno eri tu. O JN. O Bob. O qualcuno che non c'è più. E il secret era lì. Nel repo pubblico. Su GitHub. E GitHub è pubblico. E i bot scansionano GitHub. E trovano i secret. E li usano. E la fattura AWS arriva. E è di 47.000 euro. E UL chiama. E tu rispondi. E dici: "La chiave API era nel repo." E UL dice: "E PERCHÉ ERA NEL REPO?!" E tu dici: "Per comodità." E UL dice: "COMODITÀ?!" E la verità è che tutti vogliono comodità. Ma la comodità costa. E costa cara. Amen.

![](../../img/server.jpg)

---

**Lunedì - Il Commit**

Era lunedì. Le 18:45. JN voleva andare a casa.

**JN**: Ho quasi finito la feature!

**ME**: Quasi?

**JN**: Sì, devo solo pushare.

**ME**: Fammi vedere il commit.

**JN**: È semplice. Ho aggiunto la configurazione per l'API di pagamento.

**ME**: E cosa c'è nella configurazione?

**JN**: L'URL, la chiave API, il secret...

**ME**: La chiave API?!

**JN**: Sì, per le chiamate.

**ME**: E L'HAI MESSA NEL COMMIT?!

**JN**: Sì, così funziona subito.

**ME**: JN, i secret non vanno nei commit.

**JN**: Ma è un repo privato!

**ME**: È su GitHub?

**JN**: Sì.

**ME**: E chi ha accesso?

**JN**: Tutti. È pubblico.

**ME**: PUBBLICO?!

**JN**: Sì, per open source.

**ME**: E CI HAI MESSO LA CHIAVE API?!

**JN**: Sì, ma... non la guarda nessuno!

**ME**: JN, i bot scansionano GitHub 24/7.

**JN**: Ma mica trovano tutto!

**ME**: Trovano tutto. Sempre.

**JN**: Ma è una chiave di test!

**ME**: Di test?!

**JN**: Sì, per il sandbox.

**ME**: E se qualcuno la usa?

**JN**: Non possono fare danni. È sandbox.

**ME**: E se la usano per altri 47.000 euro di chiamate?

**JN**: Non possono. È sandbox.

**ME**: JN, le chiavi sandbox hanno spesso gli stessi permessi di quelle di produzione.

**JN**: Ma... non succede!

**ME**: Succede. Sempre.

**JN**: Va bene, la rimuovo.

**ME**: E fai un commit separato. E usa le environment variables.

**JN**: Ok.

JN ha fatto il commit. Alle 18:55. Di lunedì. E io ho pensato: "Almeno l'ha rimossa." Ma non sapevo che il danno era già fatto. Perché i bot scansionano GitHub. E trovano i secret. E li usano. In tempo reale. Amen.

---

**Martedì - La Scoperta**

Era martedì. Le 07:30. Il caffè non era ancora pronto.

Poi è arrivata l'email.

**AWS**: Your AWS bill for December is ready. Total: €47,234.56

**ME**: 47.000 euro?!

**TL**: 47.000?!

**ME**: Sì. La fattura AWS.

**TL**: E QUANTO DOVREBBE ESSERE?!

**ME**: 2.000. Forse 3.000.

**TL**: E 47.000?!

**ME**: Non è normale. Controllo.

**TERMINALE**:
```
# Controlla utilizzo
aws ce get-cost-and-usage --time-period Start=2026-12-01,End=2026-12-26 --granularity=DAILY --metrics BlendedCost

# Controlla servizi
aws ce get-cost-and-usage --time-period Start=2026-12-01,End=2026-12-26 --granularity=DAILY --group-by Type=DIMENSION,Key=SERVICE

# Controlla risorse
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,LaunchTime]' --output table
```

**ME**: Ci sono 847 istanze EC2 running.

**TL**: 847?!

**ME**: Sì. E 234 sono state lanciate ieri sera.

**TL**: IERI SERA?!

**ME**: Sì. Tra le 19:00 e le 23:00.

**TL**: E CHI LE HA LANCiate?!

**ME**: Non lo so. Controllo i log.

**TERMINALE**:
```
# Controlla CloudTrail
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=RunInstances --start-time 2026-12-23T18:00:00Z --end-time 2026-12-23T23:59:59Z

# Controlla chiave API
aws iam list-access-keys --user-name api-user
{
  "AccessKeys": [
    {
      "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
      "Status": "Active",
      "CreateDate": "2026-12-23T18:55:23Z"
    }
  ]
}

# Controlla utilizzo chiave
aws cloudtrail lookup-events --lookup-attributes AttributeKey=Username,AttributeValue=api-user --start-time 2026-12-23T18:00:00Z
```

**ME**: La chiave API è stata usata per lanciare le istanze.

**TL**: QUALE CHIAVE?!

**ME**: Quella che JN ha committato.

**TL**: JN?!

**ME**: Sì. Ieri. Alle 18:55.

**TL**: E L'HA COMMITTATA?!

**ME**: Sì. E l'ha rimossa dopo. Ma era troppo tardi.

**TL**: E I BOT?!

**ME**: I bot l'hanno trovata. E l'hanno usata.

**TL**: E QUANTE ISTANZE?!

**ME**: 847. E stanno ancora running.

**TL**: E IL COSTO?!

**ME**: 47.000 euro. E cresce.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Istanze: 847
- Costo: €47,234.56
- Chiave: AKIAIOSFODNN7EXAMPLE
- Utente: api-user
- Data creazione: 2026-12-23 18:55:23

E tutto era chiaro. JN aveva committato la chiave. I bot l'avevano trovata. E avevano lanciato 847 istanze. E la fattura era di 47.000 euro. Amen.

---

**Martedì - 08:00**

Ho chiamato JN. JN ha risposto. Era martedì. JN stava ancora dormendo.

**ME**: JN, hai committato la chiave API ieri?

**JN**: (voce assonnata) Sì... ma l'ho rimossa!

**ME**: E QUANDO?!

**JN**: Dopo 10 minuti. Forse 15.

**ME**: E IN QUEI 10 MINUTI?!

**JN**: Non è successo niente!

**ME**: JN, I BOT HANNO TROVATO LA CHIAVE. E HANNO LANCIATO 847 ISTANZE EC2.

**JN**: Cosa?!

**ME**: 847 ISTANZE. E LA FATTURA È DI 47.000 EURO.

**JN**: 47.000?!

**ME**: Sì. E cresce.

**JN**: Ma... era una chiave di test!

**ME**: LE CHIAVI DI TEST HANNO GLI STESSI PERMESSI DI QUELLE DI PRODUZIONE!

**JN**: Non lo sapevo!

**ME**: E ORA LA DISABILITO. E TERMINO LE ISTANZE.

**JN**: Ok...

**ME**: E LA PROSSIMA VOLTA USA LE ENVIRONMENT VARIABLES!

**JN**: Ok...

JN ha riattaccato. O forse ha riattaccato per tornare a dormire. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Istanze: 847
- Costo: €47,234.56
- Chiave: compromessa
- JN: a letto

E la lezione era chiara. I secret non vanno nei repo. E i bot trovano tutto. E JN non impara. Amen.

---

**Martedì - 08:30**

Ho disabilitato la chiave. E terminato le istanze.

**TERMINALE**:
```
# Disabilita chiave
aws iam update-access-key --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive

# Termina tutte le istanze sospette
aws ec2 describe-instances --filters Name=instance-type,Values=t2.micro --query 'Reservations[*].Instances[*].InstanceId' --output text | xargs -n1 aws ec2 terminate-instances --instance-ids

# Verifica
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]' --output table
```

**ME**: Chiave disabilitata. Istanze terminate.

**TL**: E IL COSTO?!

**ME**: 47.000 euro. Per le istanze già running.

**TL**: E ORA?!

**ME**: Ora devo chiamare AWS. E chiedere un rimborso.

**TL**: E SE NON LO DANNO?!

**ME**: Allora... paghiamo.

**TL**: E UL?!

**ME**: UL... lo chiamo dopo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Chiave: disabilitata
- Istanze: terminate
- Costo: €47,234.56
- Rimborso: da chiedere

E tutto era fermo. Ma i soldi erano persi. E UL andava chiamato. Amen.

---

**Martedì - 09:00**

Ho chiamato UL. UL ha risposto. Era martedì. UL era di buon umore. Per ora.

**UL**: Buongiorno! Come va?

**ME**: Abbiamo un problema con AWS.

**UL**: Che problema?

**ME**: JN ha committato una chiave API nel repo pubblico.

**UL**: Nel repo pubblico?!

**ME**: Sì. E i bot l'hanno trovata. E hanno lanciato 847 istanze.

**UL**: 847 ISTANZE?!

**ME**: Sì. E la fattura è di 47.000 euro.

**UL**: 47.000 EURO?!

**ME**: Sì. Ho disabilitato la chiave. E terminato le istanze. Ma il costo c'è.

**UL**: E CHI PAGA?!

**ME**: Noi. A meno che AWS non ci faccia uno sconto.

**UL**: E LO FA?!

**ME**: Non lo so. Chiamo il supporto.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E COME?!

**ME**: Con un corso. Sulla sicurezza. E sui secret. E su come non committare chiavi API.

**UL**: E SE NON IMPARA?!

**ME**: Allora... lo metto a scrivere documentazione.

UL ha sospirato. Poi ha detto: "Chiama AWS. E sistema tutto."

E io ho chiamato. E chiesto il rimborso. E AWS ha detto "forse". E tutto era in sospeso. Amen.

---

**Martedì - 10:00**

Ho chiamato AWS. AWS ha risposto. Dopo 45 minuti di attesa.

**AWS**: Grazie per aver chiamato AWS Support. Come posso aiutarla?

**ME**: Ho un problema di sicurezza. Una chiave API è stata compromessa.

**AWS**: Mi dispiace. Può darmi i dettagli?

**ME**: La chiave AKIAIOSFODNN7EXAMPLE è stata committata in un repo pubblico. E qualcuno l'ha usata per lanciare 847 istanze.

**AWS**: Capisco. E quando è successo?

**ME**: Ieri. Tra le 19:00 e le 23:00.

**AWS**: E ha disabilitato la chiave?

**ME**: Sì. Stamattina alle 08:30.

**AWS**: E le istanze?

**ME**: Terminate. Tutte.

**AWS**: E il costo?

**ME**: 47.000 euro.

**AWS**: E vuole un rimborso?

**ME**: Sì. È stato un incidente di sicurezza.

**AWS**: Capisco. Devo inoltrare la richiesta. Ma non posso garantire nulla.

**ME**: E QUANDO SAPPIAMO?!

**AWS**: Entro 7 giorni lavorativi.

**ME**: 7 GIORNI?!

**AWS**: Sì. È il tempo standard per le richieste di rimborso.

**ME**: E SE NON LO APPROVANO?!

**AWS**: Allora... paga.

Ho riattaccato. Ho guardato il TL. Il TL guardava me. Io guardavo il terminale. Il terminale mostrava:
- Ticket: aperto
- Rimborso: in valutazione
- Tempo: 7 giorni
- Esito: incerto

E tutto era in sospeso. Ma i soldi erano persi. E la lezione era chiara. I secret non vanno nei repo. E i bot trovano tutto. E AWS non garantisce rimborsi. Amen.

---

**Mercoledì - La Scansione**

Mercoledì. Ho scansionato tutti i repo. Per trovare altri secret.

**TERMINALE**:
```
# Installa trufflehog
pip install trufflehog

# Scansiona tutti i repo
for repo in $(ls ~/repos); do
  echo "Scanning $repo..."
  trufflehog git file://~/repos/$repo --only-verified
done

# Risultati
Found 23 secrets in 12 repositories:
- AWS Access Key: 5
- GitHub Token: 4
- Slack Webhook: 3
- Database Password: 2
- API Key: 9
```

**ME**: 23 secret trovati. In 12 repository.

**TL**: 23?!

**ME**: Sì. E alcuni sono ancora attivi.

**TL**: E CHI LI HA COMMITTATI?!

**ME**: JN. Bob. E... io.

**TL**: TU?!

**ME**: Sì. Due anni fa. Una chiave API di test.

**TL**: E È ANCORA ATTIVA?!

**ME**: No. L'ho disabilitata ora.

**TL**: E GLI ALTRI?!

**ME**: Li sto disabilitando tutti.

**TERMINALE**:
```
# Disabilita tutti i secret trovati
aws iam update-access-key --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive
aws iam update-access-key --access-key-id AKIAI44QHPCDEXAMPLE --status Inactive
aws iam delete-access-key --access-key-id AKIAIPPSWSEXAMPLE

# Revoca token GitHub
curl -X DELETE -H "Authorization: token $ADMIN_TOKEN" https://api.github.com/repos/company/project/keys/123

# Ruota password database
kubectl exec -it postgres-0 -- psql -U admin -c "ALTER USER admin WITH PASSWORD 'new-secure-password-$(date +%s)'"
```

**ME**: Tutti i secret disabilitati o ruotati.

**TL**: E I REPO?!

**ME**: Li rendo privati. O aggiungo git-secrets.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Secret trovati: 23
- Secret disabilitati: 23
- Repo scansionati: 12
- JN: da educare

E tutto era pulito. Ma la lezione era chiara. I secret sono ovunque. E tutti li committano. E i bot li trovano. Amen.

---

**Giovedì - La Prevenzione**

Giovedì. Ho aggiunto git-secrets. E pre-commit hooks. E scanner automatici.

**TERMINALE**:
```
# Installa git-secrets su tutti i repo
for repo in $(ls ~/repos); do
  cd ~/repos/$repo
  git secrets --install
  git secrets --register-aws
  git secrets --register-generic
done

# Configura pre-commit
cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
  - repo: https://github.com/awslabs/git-secrets
    rev: master
    hooks:
      - id: git-secrets
EOF

# Installa pre-commit
pre-commit install
pre-commit autoupdate

# Configura GitHub Action
cat > .github/workflows/secret-scan.yml << 'EOF'
name: Secret Scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
EOF
```

**TL**: Hai aggiunto i controlli?

**ME**: Sì. Git-secrets. Pre-commit hooks. E GitHub Action.

**TL**: E SE QUALCUNO COMMITTA UN SECRET?!

**ME**: Il pre-commit lo blocca. E la GitHub Action fallisce.

**TL**: E SE LO BYPASSA?!

**ME**: Allora... lo scanner lo trova. E lo notifica.

**TL**: E SE LO IGNORANO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Git-secrets: installato
- Pre-commit: attivo
- GitHub Action: configurata
- Scanner: automatico

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i secret vanno protetti. E che i controlli sono essenziali. E che JN va educato. Amen.

---

**Venerdì - L'Educazione**

Venerdì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per la chiave API?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che la chiave API è stata un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i secret non vanno mai nei repo.

**JN**: Mai?

**ME**: Mai. Nemmeno per 5 minuti. Nemmeno in un branch. Nemmeno in un commento.

**JN**: Ok.

**ME**: Secondo: i bot scansionano GitHub 24/7.

**JN**: Davvero?

**ME**: Davvero. E trovano tutto. In tempo reale. E usano i secret. Subito.

**JN**: E come fanno?

**ME**: Con regex. E machine learning. E API di GitHub. E trovano chiavi AWS, token GitHub, password, tutto.

**JN**: Ok.

**ME**: Terzo: le chiavi di test hanno spesso gli stessi permessi di quelle di produzione.

**JN**: Non lo sapevo!

**ME**: Ora lo sai. E per questo devi usare environment variables. O secret manager. O file .env che NON vanno nel repo.

**JN**: Ok.

**ME**: Quarto: se committi un secret, ruotalo subito.

**JN**: E se non posso?

**ME**: Allora disabilitalo. E poi ruotalo. Ma non aspettare.

**JN**: Ok.

**ME**: Quinto: usa git-secrets. E pre-commit. E scanner automatici.

**JN**: E cosa fanno?

**ME**: Bloccano i commit con secret. Prima che arrivino su GitHub.

**JN**: E se li bypasso?

**ME**: Allora... ti chiamo. E ti spiego. Di nuovo.

**JN**: (imbarazzato) Scusa.

**ME**: E la prossima volta, pensa. Prima di committare. Pensa a cosa succede se c'è un secret.

**JN**: E se non so se c'è un secret?

**ME**: Allora controlla. Con git-secrets. O trufflehog. O chiedi a me.

**JN**: E se non c'è nessuno?

**ME**: Allora... non committare. E aspetta.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Git-secrets: attivo
- Pre-commit: attivo
- Scanner: attivo
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere controlli. E processi. E educazione. Amen.

---

**Sabato - Il Rimborso**

Sabato. AWS ha risposto. Dopo 3 giorni. Non 7.

**AWS**: Gentile cliente, abbiamo valutato la sua richiesta di rimborso. A causa della natura dell'incidente (chiave API compromessa per commit pubblico), non possiamo approvare il rimborso completo. Tuttavia, offriamo uno sconto del 50% come gesto di buona volontà.

**ME**: 50%?!

**TL**: 50%?!

**ME**: Sì. Non il rimborso completo. Ma il 50%.

**TL**: E QUINDI?!

**ME**: E quindi... paghiamo 23.500 euro. Invece di 47.000.

**TL**: E È ACCETTABILE?!

**ME**: È meglio di niente.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Ho chiamato UL. UL ha risposto. Era sabato. UL non era di buon umore.

**UL**: Pronto?

**ME**: AWS ha risposto.

**UL**: E?!

**ME**: Rimborso del 50%.

**UL**: 50%?!

**ME**: Sì. 23.500 euro invece di 47.000.

**UL**: E È ACCETTABILE?!

**ME**: È meglio di niente.

**UL**: E PERCHÉ NON IL 100%?!

**ME**: Perché la chiave era nel repo pubblico. E siamo responsabili.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho aggiunto controlli. E scanner. E pre-commit.

**UL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta non succede. Perché ci sono i controlli.

**UL**: E SE QUALCUNO LI BYPASSA?!

**ME**: Allora... prega.

UL ha sospirato. Poi ha detto: "Ok. Paga. E documenta tutto."

E io ho pagato. E documentato. E la lezione era chiara. I secret costano. E i rimborsi non sono garantiti. E la prevenzione è essenziale. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i secret.

```markdown
## Incident #SECRET-001: Il Secret Che Era Nel Repo Pubblico

**Data incident**: Lunedì 23 dicembre 2026, 18:55
**Autore**: JN
**Servizio**: API Gateway
**Problema**: Chiave AWS committata in repo pubblico
**Causa**: Configurazione committata per comodità
**Tempo di esposizione**: ~14 ore
**Istanze lanciate**: 847
**Costo totale**: €47,234.56
**Rimborso AWS**: 50% (€23,500)
**Costo finale**: €23,500
**Reazione UL**: "47.000 euro?!"
**Reazione TL**: "847 istanze?!"
**Reazione CTO**: "Git-secrets + pre-commit + scanner."
**Soluzione**: Controlli automatici + educazione + rotazione secret
**Lezione imparata**: I SECRET NON VANNO MAI NEI REPO. MAI.

**Regole per i secret**:
1. I secret NON vanno MAI nei repository.
2. Usa SEMPRE environment variables o secret manager.
3. I bot scansionano GitHub 24/7. Trovano tutto.
4. Le chiavi di test hanno spesso gli stessi permessi di quelle di produzione.
5. Se committi un secret, ruotalo SUBITO.
6. Usa git-secrets. E pre-commit. E scanner automatici.
7. I file .env NON vanno nel repo. Aggiungili a .gitignore.
8. I secret costano. E i rimborsi non sono garantiti. Amen.

**Come configurare git-secrets**:
```bash
# Installa
git secrets --install
git secrets --register-aws

# Aggiungi pattern personalizzati
git secrets --add 'password\s*=\s*["\'].*["\']'
git secrets --add 'api_key\s*=\s*["\'].*["\']'
```

**Come configurare pre-commit**:
```yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
```

**Come scansionare i repo esistenti**:
```bash
# Con trufflehog
trufflehog git file://. --only-verified

# Con gitleaks
gitleaks detect --source . --verbose
```

**Come ruotare una chiave compromessa**:
```bash
# Disabilita
aws iam update-access-key --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive

# Crea nuova chiave
aws iam create-access-key --user-name api-user

# Aggiorna applicazione
kubectl create secret generic aws-credentials --from-literal=AWS_ACCESS_KEY_ID=new-key --from-literal=AWS_SECRET_ACCESS_KEY=new-secret -n production --dry-run=client -o yaml | kubectl apply -f -
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i secret non vanno nei repo. E che i bot trovano tutto. E che i rimborsi non sono garantiti. E che la prevenzione è essenziale. E che JN va educato. E che 23.500 euro sono meglio di 47.000. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i secret sono come i soldi. Se li lasci in giro, qualcuno li prende. E se li prendono, li usano. E se li usano, ti costano. E se ti costano, UL chiama. E tu rispondi. E dici: "La chiave API era nel repo." E UL dice: "E PERCHÉ ERA NEL REPO?!" E tu dici: "Per comodità." E UL dice: "COMODITÀ?!" E tu dici: "Sì. Per non configurare le environment variables." E UL dice: "E QUANTO È COSTATA LA COMODITÀ?!" E tu dici: "23.500 euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che nessuno pensa alle conseguenze. Finché non succede. E quando succede, impari. Impari che i secret vanno protetti. E che i controlli sono essenziali. E che i bot trovano tutto. E che JN va educato. Amen.

---

## Il costo del secret nel repo pubblico

| Voce | Valore |
|------|--------|
| Servizio | API Gateway |
| Autore | JN |
| Data commit | 23/12/2026, 18:55 |
| Data discovery | 24/12/2026, 07:30 |
| Tempo di esposizione | ~14 ore |
| Istanze lanciate | 847 |
| Costo totale | €47,234.56 |
| Rimborso AWS | 50% |
| Costo finale | €23,500 |
| Secret trovati | 23 |
| Repo scansionati | 12 |
| Reazione UL | "47.000 euro?!" |
| Reazione TL | "847 istanze?!" |
| Reazione CTO | "Git-secrets + pre-commit." |
| Soluzione | Controlli automatici + educazione |
| Lezione imparata | SECRET = MAI NEI REPO |
| **Totale** | **€23,500 + 23 secret ruotati + 1 junior educato** |

**Morale**: I secret non vanno mai nei repository. Mai. Per nessun motivo. In nessun caso. MAI. E se li committi, i bot li trovano. E se i bot li trovano, li usano. E se li usano, ti costano. E se ti costano, UL chiama. E tu rispondi. E dici: "La chiave API era nel repo." E UL dice: "E PERCHÉ ERA NEL REPO?!" E tu dici: "Per comodità." E UL dice: "COMODITÀ?!" E tu dici: "Sì. Per non configurare le environment variables." E UL dice: "E QUANTO È COSTATA LA COMODITÀ?!" E tu dici: "23.500 euro." E UL dice: "E NE VALEVA LA PENA?!" E tu dici: "No." E la verità è che la comodità costa. Sempre. E costa cara. E la prossima volta, usi le environment variables. O il secret manager. O qualsiasi cosa. Ma non il repo. Mai. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](96-il-webhook-che-ha-inondato-la-coda.md) | [Prossima](98-il-rollback-che-non-e-mai-arrivato.md)**
