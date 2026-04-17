# La Variabile Che Era Diversa in Produzione

**Data**: 19/09/2026

**[Home](../index.md) | [Precedente](82-la-cache-che-non-scadeva-mai.md) | [Prossima](84-il-vendor-che-e-scomparso.md)]**

---

C'è una verità universale nello sviluppo software: "Funziona sulla mia macchina". È una frase che ha fatto piangere manager, disperare DevOps, e ridere sviluppatori. Ma c'è una verità ancora più universale: "La variabile d'ambiente che era diversa in produzione". E questa è la storia di quella variabile. Di quella variabile che era "true" in sviluppo. E "false" in produzione. E che ha fatto piangere tutti. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era semplice. O quasi.

**PM**: Dobbiamo aggiungere un feature flag.

**ME**: Un feature flag?

**PM**: Sì. Per la nuova funzionalità di export PDF.

**ME**: E come lo chiamiamo?

**PM**: `ENABLE_PDF_EXPORT`.

**ME**: E il valore di default?

**PM**: False. Così non va in produzione finché non siamo pronti.

**ME**: E quando siamo pronti?

**PM**: Quando lo dico io.

**ME**: E come lo dici?

**PM**: Cambio la variabile in true.

**ME**: E se me lo dimentico?

**PM**: Non te lo dimentichi.

**ME**: E se me lo dimentico?

**PM**: Allora... l'export PDF non funziona.

**ME**: E i clienti?

**PM**: I clienti aspettano.

**ME**: E se non aspettano?

**PM**: Allora... prega.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia fiducia nei feature flag. Il nulla che era la mia attenzione alle variabili d'ambiente. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Codice**

Il martedì, ho scritto. Ho scritto il feature flag. Ho scritto... la trappola.

```python
# config.py
import os

ENABLE_PDF_EXPORT = os.getenv('ENABLE_PDF_EXPORT', 'false').lower() == 'true'

# pdf_export.py
from config import ENABLE_PDF_EXPORT

def export_to_pdf(data):
    if not ENABLE_PDF_EXPORT:
        return {"error": "Feature non abilitata"}
    
    # Genera il PDF
    pdf = generate_pdf(data)
    return {"pdf": pdf}
```

**TL**: Hai scritto il codice?

**ME**: Sì.

**TL**: E il default è false?

**ME**: Sì.

**TL**: E in sviluppo?

**ME**: In sviluppo ho messo true. Per testare.

**TL**: E in produzione?

**ME**: In produzione è false. Come richiesto.

**TL**: E come lo attivi?

**ME**: Cambio la variabile d'ambiente.

**TL**: E dove la cambi?

**ME**: Nel pannello di configurazione del cloud.

**TL**: E se ti dimentichi?

**ME**: Non mi dimentico.

**TL**: E SE TI DIMENTICHI?

**ME**: Allora... l'export non funziona.

**TL**: E I CLIENTI?

**ME**: I clienti aspettano.

**TL**: E SE NON ASPETTANO?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il codice. Il codice sembrava semplice. Ma le cose semplici sono le più pericolose. Perché le cose semplici le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Mercoledì - Il Test**

Il mercoledì, ho testato. Ho testato l'export. Ho testato... il successo.

**TERMINALE**:
```
curl -X POST http://localhost:3000/api/export/pdf -d '{"data": "test"}'
{"pdf": "JVBERi0xLjQKJe..."}
```

**ME**: Funziona!

**TL**: In sviluppo?

**ME**: Sì.

**TL**: E in produzione?

**ME**: Non l'ho ancora deployato.

**TL**: E quando lo deployi?

**ME**: Domani.

**TL**: E il feature flag?

**ME**: È false di default.

**TL**: E quindi?

**ME**: E quindi non va finché non lo attivo.

**TL**: E quando lo attivi?

**ME**: Quando il PM dice che è pronto.

**TL**: E quando dice che è pronto?

**ME**: Non lo so. Forse mai.

**TL**: MAI?

**ME**: I PM dicono "pronto" ma poi cambiano idea.

**TL**: E QUINDI?

**ME**: E quindi il feature flag resta false.

**TL**: E IL CODICE?

**ME**: Il codice è lì. Pronto. In attesa.

**TL**: E SE NON VIENE MAI ATTIVATO?

**ME**: Allora... è codice morto.

**TL**: E IL CODICE MORTO?

**ME**: Il codice morto è... morto.

**TL**: E IL DEBT?

**ME**: Il debt si accumula.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Export PDF: funzionante
- Feature flag: true in sviluppo
- Feature flag: false in produzione (default)
- Status: pronto per deploy

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Perché le cose che sembrano ok le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Giovedì - Il Deploy**

Il giovedì, ho deployato. Ho deployato il codice. Ho deployato... la trappola.

**TERMINALE**:
```
git push origin main
Deploying to production...
✓ Build completed
✓ Tests passed
✓ Deployed to production

Environment variables:
- ENABLE_PDF_EXPORT: false (default)
```

**ME**: Deployato!

**TL**: Con il feature flag false?

**ME**: Sì. Come richiesto.

**TL**: E ora?

**ME**: Ora aspetto che il PM dica "attiva".

**TL**: E quando lo dice?

**ME**: Non lo so. Forse domani. Forse la prossima settimana. Forse mai.

**TL**: E IL CODICE?

**ME**: Il codice è in produzione. Ma disabilitato.

**TL**: E SE C'È UN BUG?

**ME**: Non c'è un bug. Ho testato.

**TL**: E SE C'È UN BUG NELLA PARTE DISABILITATA?

**ME**: Non può esserci. La parte è disabilitata.

**TL**: E SE LA ABILITANO?

**ME**: Allora... si vede il bug.

**TL**: E SE È UN BUG GRAVE?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Deploy: completato
- Feature flag: false
- Status: in produzione

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Amen.

---

**Venerdì - 09:00**

Il venerdì, il PM ha chiamato. Il PM voleva. E io... non sapevo.

**PM**: Attiva l'export PDF!

**ME**: Ora?

**PM**: Sì! I clienti lo vogliono!

**ME**: Ok. Lo attivo.

**TERMINALE**:
```
# Pannello configurazione cloud
Environment variables:
- ENABLE_PDF_EXPORT: true

Save... ✓ Saved
Restarting services... ✓ Restarted
```

**ME**: Attivato!

**PM**: Ottimo! I clienti possono esportare!

**ME**: Sì. Funziona.

**PM**: Bene. Ho una riunione. Ciao!

Il PM ha riattaccato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: true
- Services: riavviati
- Status: attivo

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Amen.

---

**Venerdì - 09:30**

Il telefono ha suonato. Era UL. UL non chiama mai alle 09:30. A meno che non ci sia un problema.

**UL**: L'export PDF non funziona!

**ME**: Non funziona?

**UL**: No! I clienti chiamano! Dicono "Feature non abilitata"!

**ME**: Ma l'ho appena attivato!

**UL**: E allora perché non funziona?!

**ME**: Non lo so! Controllo!

**TERMINALE**:
```
curl -X POST https://api.produzione.com/export/pdf -d '{"data": "test"}'
{"error": "Feature non abilitata"}
```

**ME**: Non funziona!

**UL**: LO SO!

**ME**: Ma la variabile è true!

**UL**: E ALLORA?!

**ME**: Non lo so! Controllo i log!

**TERMINALE**:
```
kubectl logs api-pod-1234
[INFO] ENABLE_PDF_EXPORT = false
[INFO] Feature PDF export: disabled
```

**ME**: I log dicono false!

**UL**: MA L'HAI CAMBIATO A TRUE!

**ME**: Sì! Ma il pod non l'ha preso!

**UL**: E PERCHÉ?!

**ME**: Non lo so! Forse non ha riavviato!

**UL**: RIAVVIALO!

**TERMINALE**:
```
kubectl rollout restart deployment/api
deployment.apps/api restarted
```

**ME**: Riavviato!

**UL**: E ORA?

**TERMINALE**:
```
kubectl logs api-pod-5678
[INFO] ENABLE_PDF_EXPORT = false
[INFO] Feature PDF export: disabled
```

**ME**: ANCORA FALSE!

**UL**: MA COME È POSSIBILE?!

**ME**: Non lo so! La variabile è true nel pannello!

**UL**: E NEI POD?!

**ME**: Nei pod è false!

**UL**: E PERCHÉ?!

**ME**: Non lo so! Forse c'è un'altra variabile!

**UL**: UN'ALTRA?!

**ME**: Sì! Forse c'è una variabile hardcoded!

**UL**: DOVE?!

**ME**: Non lo so! Cerco!

UL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Pannello: ENABLE_PDF_EXPORT = true
- Pod: ENABLE_PDF_EXPORT = false
- Status: NON FUNZIONA

E la variabile era diversa. Era true nel pannello. Era false nel pod. E nessuno sapeva perché. Amen.

---

**Venerdì - 10:00**

Ho cercato. Ho cercato ovunque. Ho cercato... l'origine del false.

**TERMINALE**:
```
grep -r "ENABLE_PDF_EXPORT" .
./config.py:ENABLE_PDF_EXPORT = os.getenv('ENABLE_PDF_EXPORT', 'false').lower() == 'true'
./k8s/deployment.yaml:        - name: ENABLE_PDF_EXPORT
./k8s/deployment.yaml:          value: "false"
```

**ME**: HO TROVATO!

**TL**: Cosa?!

**ME**: La variabile è nel deployment.yaml!

**TL**: E COSA DICE?!

**ME**: Dice "false"!

**TL**: E IL PANNELLO?!

**ME**: Il pannello dice "true"!

**TL**: E QUALE VINCE?!

**ME**: Il deployment.yaml!

**TL**: PERCHÉ?!

**ME**: Perché il deployment.yaml è nel repo! E il pannello sovrascrive solo se non c'è!

**TL**: E C'È?!

**ME**: C'È!

**TL**: E QUINDI?!

**ME**: E quindi il deployment.yaml vince!

**TL**: E IL PANNELLO?!

**ME**: Il pannello viene ignorato!

**TL**: IGNORATO?!

**ME**: Sì! Perché il deployment.yaml ha la precedenza!

**TL**: E PERCHÉ?!

**ME**: Non lo so! È così che funziona Kubernetes!

**TL**: E QUINDI?!

**ME**: E quindi devo cambiare il deployment.yaml!

**TL**: E CAMBIALO!

**TERMINALE**:
```
# k8s/deployment.yaml
- name: ENABLE_PDF_EXPORT
  value: "true"
```

**ME**: Cambiato!

**TL**: E ORA?!

**ME**: Ora deployo!

**TERMINALE**:
```
git add k8s/deployment.yaml
git commit -m "Enable PDF export"
git push origin main

Deploying to production...
✓ Build completed
✓ Tests passed
✓ Deployed to production
```

**ME**: Deployato!

**TL**: E ORA?!

**TERMINALE**:
```
kubectl logs api-pod-9012
[INFO] ENABLE_PDF_EXPORT = true
[INFO] Feature PDF export: enabled
```

**ME**: FUNZIONA!

**TL**: E I CLIENTI?!

**ME**: I clienti possono esportare!

**TL**: E UL?!

**ME**: UL è felice!

**TL**: E IL PM?!

**ME**: Il PM non sa che c'è stato un problema!

**TL**: E TU?!

**ME**: Io... ho imparato una lezione.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: true
- Status: FUNZIONA

E tutto funzionava. Ma avevo imparato una lezione. La lezione che le variabili d'ambiente possono essere in più posti. E che i posti diversi possono avere valori diversi. E che quando i valori sono diversi, uno vince. E quello che vince non è sempre quello che pensi. Amen.

---

**Venerdì - 14:00**

UL mi ha chiamato. UL voleva capire. E io... ho spiegato.

**UL**: Quindi mi stai dicendo che c'erano due variabili?

**ME**: Sì. Una nel pannello. Una nel deployment.yaml.

**UL**: E quella nel deployment.yaml vinceva?

**ME**: Sì. Perché Kubernetes dà la precedenza alle variabili nel deployment.

**UL**: E il pannello?

**ME**: Il pannello sovrascrive solo le variabili che non sono nel deployment.

**UL**: E perché non lo sapevamo?

**ME**: Perché non abbiamo documentato come funzionano le variabili.

**UL**: E ora?

**ME**: Ora lo documentiamo.

**UL**: E chi lo documenta?

**ME**: Lo documento io.

**UL**: E lo fai?

**ME**: Sì. Ora.

**UL**: E la prossima volta?

**ME**: La prossima volta controllo prima.

**UL**: E come?

**ME**: Controllo tutti i posti dove può essere definita una variabile.

**UL**: E quali sono?

**ME**: Il pannello. Il deployment.yaml. Il Dockerfile. Il codice. L'ambiente del sistema operativo.

**UL**: E QUALE VINCE?

**ME**: Dipende. Ma di solito il deployment.yaml.

**UL**: E QUINDI?

**ME**: E quindi devo sempre controllare il deployment.yaml.

**UL**: E LO FARAI?

**ME**: Sì.

**UL**: E SE TI DIMENTICHI?

**ME**: Allora... prega.

UL mi ha guardato. Io guardavo il nulla. Il nulla che era la mia fiducia nelle variabili d'ambiente. Il nulla che era la mia attenzione ai deployment.yaml. Il nulla... che era diventato un disastro. Ma ora sapevo. E ora documentavo. Amen.

---

**Sabato - La Documentazione**

Il sabato, ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #ENV-001: La Variabile Che Era Diversa in Produzione

**Data incident**: Venerdì 18 settembre 2026, 09:30
**Autore**: ME
**Variabile**: ENABLE_PDF_EXPORT
**Valore nel pannello**: true
**Valore nel deployment.yaml**: false
**Valore effettivo nei pod**: false
**Motivo**: Il deployment.yaml ha la precedenza sul pannello
**Tempo di inattività**: 30 minuti
**Clienti colpiti**: ~50
**Ticket aperti**: 12
**Reazione UL**: "Perché non funziona?!"
**Reazione PM**: "L'ho attivato!"
**Reazione TL**: "Controlla il deployment.yaml"
**Soluzione**: Cambiato il valore nel deployment.yaml
**Lezione imparata**: LE VARIABILI POSSONO ESSERE IN PIÙ POSTI

**Ordine di precedenza delle variabili in Kubernetes**:
1. Variabili nel deployment.yaml (VINCE)
2. Variabili nel ConfigMap
3. Variabili nel Secret
4. Variabili nel pannello cloud (se non sovrascritte dal deployment)
5. Variabili nel Dockerfile
6. Variabili nel sistema operativo

**Regole per il futuro**:
1. SEMPRE controllare il deployment.yaml prima di cambiare variabili
2. Il pannello cloud NON sovrascrive le variabili del deployment.yaml
3. Se vuoi usare il pannello, NON mettere la variabile nel deployment.yaml
4. Se metti la variabile nel deployment.yaml, DEVI cambiare lì
5. Documentare dove sono definite le variabili
6. Usare un solo posto per le variabili (o deployment.yaml O pannello, non entrambi)
7. Testare in produzione dopo il cambio
8. I log mostrano il valore effettivo
9. Non fidarsi del pannello
10. Il deployment.yaml è la verità

**Come verificare il valore effettivo**:
```bash
# Controllare i log
kubectl logs api-pod-XXX | grep ENABLE_PDF_EXPORT

# Controllare le variabili del pod
kubectl exec api-pod-XXX -- env | grep ENABLE_PDF_EXPORT

# Controllare il deployment
kubectl get deployment api -o yaml | grep -A5 ENABLE_PDF_EXPORT
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che le variabili possono essere in più posti. E che i posti diversi hanno precedenze diverse. E che il deployment.yaml vince sul pannello. E che non fidarsi del pannello. E che sempre controllare i log. E che documentare dove sono le variabili. E che usare un solo posto. E che testare in produzione. E che le variabili d'ambiente sono pericolose. E che le cose semplici sono le più pericolose. E che la variabile che era diversa in produzione ti ha fatto piangere. E che ora lo sai. E che ora lo documenti. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: le variabili d'ambiente sono come i segreti. Possono essere nascoste in più posti. E se non le trovi tutte, una ti sorprende. E la sorpresa è sempre brutta. E le cose semplici sono le più pericolose. E il deployment.yaml è la verità. E il pannello mente. E i log non mentono. E ora lo so. E ora lo documenti. Amen.

---

## Il costo della variabile diversa

| Voce | Valore |
|------|--------|
| Variabile | ENABLE_PDF_EXPORT |
| Valore nel pannello | true |
| Valore nel deployment.yaml | false |
| Valore effettivo | false |
| Motivo | deployment.yaml ha precedenza |
| Tempo di inattività | 30 minuti |
| Clienti colpiti | ~50 |
| Ticket aperti | 12 |
| Soluzione | Cambiato deployment.yaml |
| Reazione UL | "Perché non funziona?!" |
| Reazione PM | "L'ho attivato!" |
| Reazione TL | "Controlla il deployment.yaml" |
| Lezione imparata | VARIABILI IN PIÙ POSTI = DISASTRO |
| **Totale** | **30 min downtime + 50 clienti + 12 ticket + 1 lezione** |

**Morale**: Le variabili d'ambiente possono essere definite in più posti. E i posti diversi hanno precedenze diverse. E se non controlli tutti i posti, uno ti sorprende. E la sorpresa è sempre brutta. E il deployment.yaml è la verità. E il pannello mente. E i log non mentono. E le cose semplici sono le più pericolose. E ora lo sai. E ora lo documenti. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](82-la-cache-che-non-scadeva-mai.md)]**
