# Il Regex Che Ha Mangiato La CPU

**Data**: 05/09/2026

**[Home](../index.md) | [Precedente](80-la-variabile-dambiente-che-e-finita-su-git.md) | [Prossima](82-la-cache-che-non-scadeva-mai.md)]**

---

C'è una verità nel mondo delle espressioni regolari. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `.*.*` pensando "tanto matcha tutto". Quella verità è: **"Un regex è come un buco nero. Può risucchiare una stringa. Può risucchiare un testo. Ma se lo scrivi male, risucchia la CPU. E la CPU brucia. E il server si ferma. E le richieste si accumulano. E tu guardi il load average salire. E non sai perché. Perché il regex sembra innocuo. È solo un pattern. È solo un match. Ma dentro quel pattern c'è un mostro. Un mostro chiamato catastrophic backtracking. E il mostro mangia la CPU. Un ciclo alla volta. Un backtrack alla volta. E tu sei lì. A guardare il server morire. Una stringa alla volta. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"I regex non perdonano. Non hanno pietà. Non hanno limiti. Hanno solo pattern. E se il pattern è `^(a+)+$` e la stringa è `aaaaaaaaaaaaaaaaaaaaaaaaaaaa!`, il regex non finisce mai. Prova. Riprova. Backtrack. Riprova. Backtrack. E la CPU brucia. E il server muore. E tu guardi il processo al 100%. E non puoi fare nulla. Perché il regex è ancora lì. Che prova. Che riprova. Che backtraccia. E il server muore. Un ciclo alla volta. Amen"**. E questa è la storia di chi ha scritto quel regex. Di chi l'ha deployato. Di chi ha guardato la CPU bruciare. Un pattern alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo validare gli indirizzi email.

**ME**: Validare?

**PM**: Sì. Gli utenti inseriscono email sbagliate.

**ME**: E cosa fanno le email sbagliate?

**PM**: Non arrivano. E i clienti si lamentano.

**ME**: E quindi?

**PM**: E quindi dobbiamo validare lato server.

**ME**: E lato client?

**PM**: Già fatto. Ma i clienti lo bypassano.

**ME**: Come?

**PM**: Disabilitano JavaScript. O usano curl.

**ME**: E quindi validiamo lato server.

**PM**: Sì. Con un regex.

**ME**: Un regex?

**PM**: Sì. Per le email.

**ME**: E il regex per le email è complicato.

**PM**: Non è complicato. Basta matchare la chiocciola.

**ME**: E il punto?

**PM**: E il dominio.

**ME**: E i caratteri speciali?

**PM**: Quali caratteri speciali?

**ME**: I +, i -, i ., i _...

**PM**: Quelli sono rari.

**ME**: E se un cliente ha un'email con un +?

**PM**: Allora... non so. Matchalo.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con i regex. Il nulla che era la mia attenzione al catastrophic backtracking. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Piano**

Il martedì, ho pianificato. Ho pianificato il regex. Ho pianificato... il nulla.

**ME**: Ho cercato un regex per le email.

**TL**: E?

**ME**: Ne ho trovati 100.

**TL**: 100?

**ME**: Sì. Ognuno diverso.

**TL**: E quale usi?

**ME**: Non lo so. Quello più completo.

**TL**: Più completo?

**ME**: Sì. Quello che matcha tutto.

**TL**: E quanto è lungo?

**ME**: 500 caratteri.

**TL**: 500 CARATTERI?

**ME**: Sì.

**TL**: E cosa fa?

**ME**: Matcha le email. Tutte le email.

**TL**: E le non-email?

**ME**: Non le matcha.

**TL**: E quanto ci mette?

**ME**: Non lo so. Poco.

**TL**: E SE CI METTE TANTO?

**ME**: Non ci mette tanto.

**TL**: E SE CI METTE?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava un regex di 500 caratteri. E il PM voleva validare. E io non avevo testato le performance. Amen.

---

**Mercoledì - Il Codice**

Il mercoledì, ho scritto. Ho scritto il codice. Ho scritto... il disastro.

**ME**: Ho scritto la validazione.

**TL**: Fammi vedere.

```python
# email_validator.py
import re

EMAIL_REGEX = re.compile(
    r'^[a-zA-Z0-9._%+-]+'
    r'@[a-zA-Z0-9.-]+'
    r'\.[a-zA-Z]{2,}$'
)

def validate_email(email):
    if not email or len(email) > 10000:
        return False
    return bool(EMAIL_REGEX.match(email))
```

**TL**: Hai messo un limite di 10.000 caratteri?

**ME**: Sì.

**TL**: E se l'email è lunga 10.000 caratteri?

**ME**: Allora non la valido.

**TL**: E se è lunga 9.999?

**ME**: Allora la valido.

**TL**: E quanto ci mette?

**ME**: Non lo so. Pochi millisecondi.

**TL**: E SE CI METTE DI PIÙ?

**ME**: Non ci mette di più.

**TL**: E SE CI METTE?

**ME**: Allora... prego.

**TL**: E se qualcuno manda un'email apposta per farlo impallare?

**ME**: Nessuno lo fa.

**TL**: E SE LO FA?

**ME**: Allora... abbiamo un problema.

Il TL mi ha guardato. Io guardavo il codice. Il codice aveva un regex. E il regex era complesso. E non avevo testato le performance. E non avevo pensato al catastrophic backtracking. Amen.

---

**Giovedì - Il Test**

Il giovedì, ho testato. Ho testato il regex. Ho testato... con successo.

**ME**: Ho testato il regex.

**TL**: Con cosa?

**ME**: Con email normali.

**TL**: Normali?

**ME**: Sì. mario.rossi@gmail.com, test@company.it...

**TL**: E funziona?

**ME**: Sì. Matcha tutto.

**TL**: E quanto ci mette?

**ME**: 0.1 millisecondi.

**TL**: 0.1 millisecondi?

**ME**: Sì. Per email.

**TL**: E se l'email non è normale?

**ME**: Non lo so. Non l'ho testato.

**TL**: NON L'HAI TESTATO?

**ME**: No. Perché dovrei?

**TL**: PERCHÉ QUALCUNO PUÒ MANDARE UN'EMAIL MALETTA!

**ME**: Maledetta?

**TL**: Sì. Un'email costruita per far impallare il regex.

**ME**: E come si costruisce?

**TL**: Cerca "regex catastrophic backtracking".

**ME**: Catastrophic backtracking?

**TL**: Sì. È quando il regex fa milioni di backtrack.

**ME**: Milioni?

**TL**: Sì. Milioni. E la CPU brucia.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava test con email normali. Ma non avevo testato le email maledette. Amen.

---

**Venerdì - 09:00**

Il venerdì, ho deployato. Ho deployato il regex. Ho deployato... il disastro.

**ME**: Ho deployato.

**TL**: In produzione?

**ME**: Sì.

**TL**: Con il regex?

**ME**: Sì.

**TL**: E IL TIMEOUT?

**ME**: Non l'ho messo.

**TL**: NON L'HAI MESSO?

**ME**: No. Non c'è tempo.

**TL**: E SE QUALCUNO MANDA UN'EMAIL MALETTA?

**ME**: Nessuno manda email maledette.

**TL**: E SE LO FA?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era la mia prudenza. Il nulla che era il regex in produzione. Senza timeout. Amen.

---

**Venerdì - 10:00**

Il PM ha chiamato. Il PM voleva sapere. E io... non sapevo.

**PM**: Il deploy è andato?

**ME**: Sì.

**PM**: E la validazione funziona?

**ME**: Sì.

**PM**: Ottimo. Ma c'è un problema.

**ME**: Quale?

**PM**: Il server è lento.

**ME**: Lento?

**PM**: Sì. Le richieste impiegano 30 secondi.

**ME**: 30 SECONDI?

**PM**: Sì. E alcune non tornano.

**ME**: E quante?

**PM**: Non lo so. Forse il 10%.

**ME**: E il server?

**PM**: Il server è sotto carico.

**ME**: Sotto carico?

**PM**: Sì. CPU al 100%.

**ME**: 100%?

**PM**: Sì. E non scende.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia attenzione. Il nulla che era il server sotto carico. Il nulla... che era il regex che bruciava la CPU. Amen.

---

**Venerdì - 10:15**

Ho guardato. Ho guardato il server. Ho guardato... l'orrore.

**TERMINALE**:
```
top
%Cpu0  : 99.9 us,  0.1 sy,  0.0 ni,  0.0 id
%Cpu1  : 99.8 us,  0.2 sy,  0.0 ni,  0.0 id
%Cpu2  : 99.9 us,  0.1 sy,  0.0 ni,  0.0 id
%Cpu3  : 99.7 us,  0.3 sy,  0.0 ni,  0.0 id

PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
12345 python    20   0  512.1m  48.2m  12.1m R  99.9  12.1   0:45.23 python
12346 python    20   0  512.1m  48.2m  12.1m R  99.9  12.1   0:45.21 python
```

**ME**: La CPU è al 100%.

**TL**: AL 100%?

**ME**: Sì. Tutte e 4 le CPU.

**TL**: E I PROCESSI?

**ME**: 4 processi Python. Tutti al 99%.

**TL**: E COSA FANNO?

**ME**: Non lo so.

**TL**: CONTROLLA!

Ho controllato. Ho controllato i log. Ho controllato... l'orrore.

**TERMINALE**:
```
# Application logs
2026-09-04 10:12:23 INFO Processing email validation for: test@example.com
2026-09-04 10:12:23 INFO Email validated: True
2026-09-04 10:12:24 INFO Processing email validation for: user@domain.com
2026-09-04 10:12:24 INFO Email validated: True
2026-09-04 10:12:25 INFO Processing email validation for: aaaaaaa...@aaaaaaa...
(processing... still processing...)
```

**ME**: C'è un'email che sta processando da 10 minuti.

**TL**: 10 MINUTI?

**ME**: Sì. E non finisce.

**TL**: E COSA CONTIENE?

**ME**: 5000 caratteri di 'a' seguiti da un '!'.

**TL**: E IL REGEX?

**ME**: Sta facendo backtrack.

**TL**: BACKTRACK?

**ME**: Sì. Milioni di combinazioni.

**TL**: E QUANTE?

**ME**: Non lo so. Forse 2^5000.

**TL**: 2^5000?

**ME**: Sì. È un numero con 1500 cifre.

**TL**: E QUANTO CI METTE?

**ME**: Più dell'età dell'universo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava processi al 99%. E il regex stava backtracciando. E la CPU bruciava. E il server moriva. Amen.

---

**Venerdì - 10:30**

Ho killato. Ho killato i processi. Ho killato... quasi tutto.

**ME**: Ho killato i processi.

**TL**: Tutti?

**ME**: Sì. Tutti e 4.

**TL**: E IL SERVER?

**ME**: Il server è tornato normale.

**TL**: E LE RICHIESTE?

**ME**: Le richieste riprendono.

**TL**: E IL REGEX?

**ME**: Il regex è ancora lì.

**TL**: E SE ARRIVA UN'ALTRA EMAIL MALETTA?

**ME**: Allora... il server muore di nuovo.

**TL**: E QUINDI?

**ME**: E quindi devo fixare il regex.

**TL**: E COME?

**ME**: Metto un timeout.

**TL**: TIMEOUT?

**ME**: Sì. Se il regex ci mette più di 1 secondo, lo killa.

**TL**: E COME?

**ME**: Con signal.alarm() in Python.

**TL**: E SE NON FUNZIONA?

**ME**: Allora uso una libreria esterna.

**TL**: O SEMPLIFICHI IL REGEX.

**ME**: Sì. Anche quello.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- CPU: 15%
- Processi: 0
- Server: vivo

E il server era salvo. Ma il regex era ancora lì. Senza timeout. Senza protezione. Amen.

---

**Venerdì - 11:00**

Ho fixato. Ho fixato il regex. Ho fixato... quasi tutto.

**ME**: Ho aggiunto il timeout.

**TL**: Fammi vedere.

```python
# email_validator.py
import re
import signal

class TimeoutError(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutError("Regex timeout")

EMAIL_REGEX = re.compile(
    r'^[a-zA-Z0-9._%+-]+'
    r'@[a-zA-Z0-9.-]+'
    r'\.[a-zA-Z]{2,}$'
)

def validate_email(email):
    if not email or len(email) > 254:  # RFC 5321 limit
        return False
    
    # Timeout protection
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(1)  # 1 second timeout
    
    try:
        result = bool(EMAIL_REGEX.match(email))
        signal.alarm(0)  # Cancel alarm
        return result
    except TimeoutError:
        return False
    finally:
        signal.alarm(0)
```

**TL**: Hai messo un timeout di 1 secondo?

**ME**: Sì.

**TL**: E hai ridotto il limite a 254 caratteri?

**ME**: Sì. È il limite RFC.

**TL**: E se il regex va in timeout?

**ME**: Restituisce False.

**TL**: E l'email non è valida?

**ME**: Esatto.

**TL**: E se era un'email valida ma lenta?

**ME**: Allora... viene rifiutata.

**TL**: E I CLIENTI?

**ME**: I clienti possono riprovare.

**TL**: E SE RIPROVANO CON LA STESSA EMAIL?

**ME**: Allora... viene rifiutata di nuovo.

**TL**: E I CLIENTI SI LAMENTANO?

**ME**: Meglio lamentarsi che il server morto.

Il TL mi ha guardato. Io guardavo il codice. Il codice aveva un timeout. E il timeout proteggeva la CPU. E la CPU non bruciava più. Amen.

---

**Venerdì - 14:00**

Il CEO. Il CEO in ufficio. Il CEO... che punì.

**CEO**: Quindi mi stai dicendo che hai deployato un regex senza timeout?

**ME**: Sì.

**CEO**: E QUALCUNO HA MANDATO UN'EMAIL MALETTA?

**ME**: Sì.

**CEO**: E IL SERVER È ANDATO AL 100%?

**ME**: Sì.

**CEO**: E PER QUANTO TEMPO?

**ME**: 30 minuti.

**CEO**: E I CLIENTI?

**ME**: Non potevano usare il servizio.

**CEO**: E LE VENDITE?

**ME**: €10.000 perse.

**CEO**: E TUTTO PERCHÉ NON HAI MESSO UN TIMEOUT?

**ME**: Sì.

**CEO**: E SAI COSA FARAI?

**ME**: Cosa?

**CEO**: Scriverai 1.000 volte: "Non deployerò mai un regex senza timeout".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

**ME**: E il regex?

**CEO**: Il regex resta. Con il timeout. E tu impari. Perché i regex non perdonano. E il CEO nemmeno. Amen.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che era il regex senza timeout. Scritto senza pensare. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non deployerò mai un regex senza timeout.
Non deployerò mai un regex senza timeout.
Non deployerò mai un regex senza timeout.
...
(997 righe dopo)
...
Non deployerò mai un regex senza timeout.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più deployato un regex senza timeout.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che i regex possono fare backtrack all'infinito.

**TL**: E cos'altro?

**ME**: Che il catastrophic backtracking brucia la CPU.

**TL**: E cos'altro?

**ME**: Che un'email di 5000 caratteri può uccidere un server.

**TL**: E cos'altro?

**ME**: Che 30 minuti di downtime costano €10.000.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che i regex non sono "solo pattern". Sono algoritmi. E gli algoritmi possono essere lenti. E se sono lenti, la CPU brucia. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché il regex è ancora lì. Che backtraccia. Che prova. Che fallisce. E tu sei lì. A guardare il server morire. Un pattern alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i regex non perdonano. E il CEO nemmeno. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non deployerò mai un regex senza timeout". E sapevo che le avrei mantenute. Perché i regex non perdonano. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #REGEX-001: Il Regex Che Ha Mangiato La CPU

**Data incident**: Venerdì 4 settembre 2026, 10:00
**Autore**: ME
**Regex**: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
**Email maledetta**: 5000 caratteri di 'a' + '!' + '@' + dominio
**Tempo di processamento**: Infinito (catastrophic backtracking)
**CPU massima**: 100% (4 core)
**Tempo sotto carico**: 30 minuti
**Servizi impattati**: Tutti (timeout)
**Vendite perse**: €10.000
**Punizione**: 1.000 volte "Non deployerò mai un regex senza timeout"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "I regex sono algoritmi. E gli algoritmi possono essere lenti."
**Reazione TL**: "Catastrophic backtracking."
**Reazione PM**: "Volevo validare le email!"
**Lezione imparata**: REGEX = TIMEOUT + LIMITE + TEST CON INPUT MALETTI
**Probabilità che succeda di nuovo**: 8% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. I regex vanno testati con input maledetti.
2. I regex vanno protetti con timeout.
3. I regex vanno limitati in lunghezza.
4. Il catastrophic backtracking è reale.
5. 2^n backtrack = eternità.
6. 30 minuti di downtime = €10.000.
7. Il CEO non perdona.
8. 1.000 volte a mano. Ricordalo.

**Regex best practices**:
- Usa timeout (signal.alarm in Python, timeout in Java, etc.)
- Limita la lunghezza dell'input
- Evita quantificatori annidati come (a+)+
- Testa con input lunghi e strani
- Usa regex semplici quando possibile
- Considera alternative (parser, validatori dedicati)
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i regex possono fare backtrack all'infinito. E che il catastrophic backtracking brucia la CPU. E che un'email di 5000 caratteri può uccidere un server. E che 30 minuti di downtime costano €10.000. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che i regex non sono 'solo pattern'. Sono algoritmi. E gli algoritmi possono essere lenti. E se sono lenti, la CPU brucia. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché il regex è ancora lì. Che backtraccia. Che prova. Che fallisce. E tu sei lì. A guardare il server morire. Un pattern alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i regex non perdonano. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: i regex sono algoritmi. E gli algoritmi possono essere lenti. E se non li proteggi, la CPU brucia. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché il regex è ancora lì. Che backtraccia. Che prova. Che fallisce. E tu sei lì. A guardare il server morire. Un pattern alla volta. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i regex non perdonano. E il CEO nemmeno. Amen.

---

## Il costo del regex senza timeout

| Voce | Valore |
|------|--------|
| Regex | ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ |
| Email maledetta | 5000 caratteri di 'a' + '!' |
| Backtrack | 2^5000 (circa) |
| Tempo di processamento | Infinito |
| CPU massima | 100% (4 core) |
| Tempo sotto carico | 30 minuti |
| Servizi impattati | Tutti (timeout) |
| Vendite perse | €10.000 |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Sono algoritmi" |
| Reazione TL | "Catastrophic backtracking" |
| Reazione PM | "Volevo validare!" |
| Lezione imparata | TIMEOUT + LIMITE + TEST MALETTI |
| **Totale** | **30 min downtime + €10.000 persi + 1.000 righe a mano** |

**Morale**: I regex vanno protetti. Con timeout. Con limiti. Con test. Mai deployare un regex senza pensare al catastrophic backtracking. Perché quando il regex backtraccia, backtraccia all'infinito. E la CPU brucia. E il server muore. E tu guardi il load salire. E non puoi fare nulla. Perché il regex è ancora lì. Che prova. Che riprova. Che backtraccia. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché i regex non perdonano. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](80-la-variabile-dambiente-che-e-finita-su-git.md) | [Prossima](82-la-cache-che-non-scadeva-mai.md)]**
