# Il Deploy del Venerdì alle 17:58

**Data**: 06/06/2026

**[Home](../index.md) | [Precedente](67-la-api-key-nel-repo-pubblico.md) | [Prossima](69-il-cron-job-che-non-si-fermava-mai.md)]**

---

C'è una regola nel mondo dello sviluppo software. Una regola sacra. Una regola scritta nel sangue di innumerevoli weekend rovinati. Quella regola è: **"Non si fa mai il deploy di venerdì. Mai. Soprattutto alle 17:58. Soprattutto prima di un weekend lungo. Soprattutto quando il PM dice 'è una modifica piccolissima, cosa può andare storto?'"**. E quando qualcuno dice "cosa può andare storto", qualcosa va storto. Sempre. È una legge della natura. Come la gravità. Come la morte. Come le tasse. E come il fatto che, se c'è un weekend lungo, qualcuno proverà a fare un deploy. E quel qualcuno sarò io. Perché il PM ha chiesto. E il CTO ha approvato. E io non ho detto di no. E questo è il mio errore. Il mio errore più grande. Amen.

![](../../img/deploy.jpg)

---

**Venerdì - 17:45**

Era venerdì. Il sole tramontava. Il weekend si avvicinava. E io volevo solo andare a casa.

**PM**: Abbiamo una modifica urgente.

**ME**: Urgente?

**PM**: Sì. Il cliente ha trovato un bug.

**ME**: Un bug?

**PM**: Sì. Nel form di contatto.

**ME**: E cosa non funziona?

**PM**: La validazione dell'email.

**ME**: E quindi?

**PM**: E quindi accetta email senza @.

**ME**: E questo è urgente?

**PM**: Sì. Il cliente dice che è critico.

**ME**: Critico?

**PM**: Sì. Per la compliance.

**ME**: Quale compliance?

**PM**: Non lo so. Ma il cliente ha detto compliance.

**ME**: E quando vuole la fix?

**PM**: Oggi.

**ME**: Oggi?

**PM**: Sì. Prima delle 18.

**ME**: Sono le 17:45.

**PM**: Sì. Hai 15 minuti.

**ME**: 15 minuti?

**PM**: Sì. È una modifica piccolissima.

**ME**: E se qualcosa va storto?

**PM**: Cosa può andare storto? È solo una regex.

Il PM mi ha guardato. Io guardavo l'orologio. L'orologio mostrava 17:46. E io sapevo. Sapevo che era sbagliato. Sapevo che non si fa. Sapevo che... il PM chiamava. E il PM voleva. E io non ho detto di no. Amen.

---

**Venerdì - 17:52**

Ho fatto la modifica. Era piccola. Davvero piccola. Solo una regex.

```javascript
// Prima
const emailRegex = /.+/;

// Dopo
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

Una regex. Una sola regex. Cosa poteva andare storto?

**ME**: Ho fatto la modifica.

**PM**: Ottimo! Testala.

**ME**: La testo.

Ho testato. Il test è passato. Il form accettava solo email valide. Tutto funzionava.

**ME**: Il test passa.

**PM**: Perfetto! Deploya.

**ME**: Adesso?

**PM**: Sì. Il cliente aspetta.

**ME**: Ma sono le 17:55.

**PM**: E allora?

**ME**: E se qualcosa va storto?

**PM**: Cosa può andare storto? È una regex.

Il PM mi ha guardato. Io guardavo il terminale. Il terminale mostrava: "git push origin main". E io ho premuto invio. E il codice è andato. E la CI è partita. E tutto era... in moto. Amen.

---

**Venerdì - 17:58**

La CI è finita. Il deploy è partito. E io guardavo. Guardavo i log. Guardavo il progresso. Guardavo... il disastro avvicinarsi.

**CI LOG**: Build started...
**CI LOG**: Running tests...
**CI LOG**: Tests passed: 847
**CI LOG**: Tests failed: 0
**CI LOG**: Building Docker image...
**CI LOG**: Docker image built
**CI LOG**: Pushing to registry...
**CI LOG**: Deploying to production...
**CI LOG**: Deployment successful

**ME**: Il deploy è andato.

**PM**: Ottimo! Il cliente sarà contento.

**ME**: Sì. Contento.

**PM**: E tu? Non sei contento?

**ME**: Sono le 17:59.

**PM**: E quindi?

**ME**: E quindi è venerdì.

**PM**: E quindi?

**ME**: E quindi vado a casa.

**PM**: Ottimo! Buon weekend!

**ME**: Sì. Buon weekend.

Il PM mi ha sorriso. Io ho sorriso. Ma dentro, sapevo. Sapevo che qualcosa non andava. Sapevo che... era troppo facile. Sapevo che... il venerdì non perdona. Amen.

---

**Venerdì - 18:23**

Ero a casa. Ero sul divano. Stavo per aprire una birra. E poi... il telefono.

**SLACK**: @here Il sito non funziona.

**SLACK**: @channel Errore 500 su tutte le pagine.

**SLACK**: @everyone PRODUZIONE GIÙ.

Ho guardato il telefono. Ho guardato la birra. Ho guardato... il mio weekend morire.

**ME**: Cosa è successo?

**TL**: Non lo so. Ma il sito è down.

**ME**: Down?

**TL**: Sì. Errore 500.

**ME**: Su tutte le pagine?

**TL**: Sì. Tutte.

**ME**: E da quando?

**TL**: Da 20 minuti.

**ME**: 20 minuti?

**TL**: Sì. Da quando hai fatto il deploy.

**ME**: Il deploy?

**TL**: Sì. Il deploy delle 17:58.

**ME**: Ma era solo una regex.

**TL**: E quindi?

**ME**: E quindi non può aver rotto tutto.

**TL**: E invece?

**ME**: Invece... controllo.

Ho aperto il laptop. Ho aperto i log. E lì, nei log, c'era la verità. La verità che faceva male. La verità che... la regex era sbagliata.

---

**Venerdì - 18:41**

La regex era sbagliata. Non sbagliata nel senso che non validava le email. Sbagliata nel senso che... causava un loop infinito. Su ogni richiesta. Su ogni pagina.

**TL**: Hai trovato il problema?

**ME**: Sì.

**TL**: E cosa è?

**ME**: La regex.

**TL**: La regex?

**ME**: Sì. La regex del cazzo che ho scritto.

**TL**: E cosa fa?

**ME**: Causa un loop infinito.

**TL**: Un loop?

**ME**: Sì. Su ogni richiesta.

**TL**: E quindi?

**ME**: E quindi il server si pianta.

**TL**: Si pianta?

**ME**: Sì. Ogni volta che qualcuno carica una pagina.

**TL**: E quante richieste?

**ME**: Non lo so. Ma il load balancer mostra... 503 error.

**TL**: 503?

**ME**: Sì. Service unavailable.

**TL**: E da quanto?

**ME**: Da 43 minuti.

**TL**: 43 minuti?

**ME**: Sì.

**TL**: E il cliente?

**ME**: Il cliente chiama.

Il TL mi ha guardato. Io guardavo i log. I log mostravano:
- 18:01 - Request: GET / → 500 (timeout dopo 30s)
- 18:01 - Request: GET /about → 500 (timeout dopo 30s)
- 18:01 - Request: GET /contact → 500 (timeout dopo 30s)
- ... 12.847 richieste in 43 minuti ...

E tutte con lo stesso errore. Tutte con lo stesso loop. Tutte... morte. Amen.

---

**Venerdì - 19:15**

Ho fatto il rollback. Il rollback ha funzionato. Il sito è tornato su. Ma il danno era fatto.

**TL**: Il sito è su.

**ME**: Sì.

**TL**: E cosa è successo?

**ME**: La regex.

**TL**: Ancora?

**ME**: Sì. La regex aveva un problema.

**TL**: Quale problema?

**ME**: Il quantificatore.

**TL**: Il quantificatore?

**ME**: Sì. Ho usato `+` invece di `*`.

**TL**: E questo causa un loop?

**ME**: Sì. Con certi input.

**TL**: Quali input?

**ME**: Input con caratteri speciali.

**TL**: E il form di contatto?

**ME**: Il form di contatto ha un campo nascosto.

**TL**: Nascosto?

**ME**: Sì. Per i bot.

**TL**: E cosa contiene?

**ME**: Contiene... di tutto.

**TL**: Di tutto?

**ME**: Sì. I bot ci mettono di tutto. Script, SQL, HTML, emoji...

**TL**: Emoji?

**ME**: Sì. Emoji.

**TL**: E le emoji causano il loop?

**ME**: Sì. Con la regex che ho scritto.

**TL**: E perché?

**ME**: Perché la regex ha un catastrophic backtracking.

**TL**: Catastrophic?

**ME**: Sì. Catastrophic.

**TL**: E sai da quanto tempo esiste questo problema?

**ME**: No.

**TL**: Da quando le regex esistono. È un problema noto. È documentato. È... ovvio.

**ME**: Ovvio?

**TL**: Sì. Per chi conosce le regex.

**ME**: E io?

**TL**: Tu non conosci le regex.

**ME**: ...

**TL**: E hai fatto un deploy di venerdì. Alle 17:58. Con una regex che non conosci.

**ME**: ...

**TL**: E adesso?

**ME**: Adesso imparo.

**TL**: Sì. Adesso impari. Ma prima, rispondi al cliente.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era la mia serata. Il nulla che era il mio weekend. Il nulla... che era la mia dignità. Persa. Per una regex. Una regex che non conoscevo. Amen.

---

**Sabato - 09:00**

Il sabato mattina. Il cliente chiamava. Il cliente voleva risposte. E io... rispondevo.

**CLIENTE**: Il sito era down per 2 ore.

**ME**: Sì. Mi dispiace.

**CLIENTE**: 2 ore.

**ME**: Sì.

**CLIENTE**: E sapete perché?

**ME**: Sì. È stato un deploy.

**CLIENTE**: Un deploy?

**ME**: Sì. Una modifica.

**CLIENTE**: E cosa avete modificato?

**ME**: La validazione delle email.

**CLIENTE**: La validazione?

**ME**: Sì.

**CLIENTE**: E questo ha mandato down il sito?

**ME**: Sì.

**CLIENTE**: Per 2 ore?

**ME**: Sì.

**CLIENTE**: E chi ha fatto il deploy?

**ME**: Io.

**CLIENTE**: Tu?

**ME**: Sì.

**CLIENTE**: E quando?

**ME**: Venerdì alle 17:58.

**CLIENTE**: Venerdì?

**ME**: Sì.

**CLIENTE**: Alle 17:58?

**ME**: Sì.

**CLIENTE**: Di venerdì?

**ME**: Sì.

**CLIENTE**: E perché?

**ME**: Perché... il PM ha chiesto.

**CLIENTE**: Il PM?

**ME**: Sì.

**CLIENTE**: E tu hai detto sì?

**ME**: Sì.

**CLIENTE**: E non hai detto "no, è venerdì"?

**ME**: No.

**CLIENTE**: E non hai detto "no, sono le 17:58"?

**ME**: No.

**CLIENTE**: E non hai detto "no, è una modifica, può andare storto"?

**ME**: No.

**CLIENTE**: E perché?

**ME**: Perché... non ci ho pensato.

**CLIENTE**: Non ci hai pensato?

**ME**: No.

**CLIENTE**: E adesso?

**ME**: Adesso ci penso.

**CLIENTE**: Bene. Perché la prossima volta che succede, non chiamo te. Chiamo il tuo capo.

Il cliente ha riattaccato. Io ho guardato il telefono. Il telefono guardava me. E io sapevo. Sapevo che aveva ragione. Sapevo che... non dovevo farlo. Sapevo che... il venerdì non perdona. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #DEPLOY-001: Il Deploy del Venerdì alle 17:58

**Data incident**: Venerdì 5 giugno 2026, 17:58
**Autore deploy**: ME
**Modifica**: Validazione email (regex)
**Riga di codice**: 1
**Test effettuati**: Sì (passati)
**Test con emoji**: NO
**Test con input malevoli**: NO
**Tempo tra deploy e down**: 3 minuti
**Durata outage**: 2 ore e 3 minuti
**Richieste fallite**: 12.847
**Utenti impattati**: ~8.000 (stimato)
**Rollback effettuato**: Sì (alle 19:15)
**Causa root**: Catastrophic backtracking in regex
**Input problematico**: Emoji in campo honeypot
**Cliente contattato**: Sì (sabato 09:00)
**Reazione cliente**: "La prossima volta chiamo il tuo capo."
**Reazione PM**: "Ma era solo una regex!"
**Reazione TL**: "Non conosci le regex."
**Reazione CTO**: "Venerdì non si fa il deploy. Mai."
**Lezione imparata**: Venerdì = NO DEPLOY. Regex = ATTENZIONE.
**Probabilità che succeda di nuovo**: 73% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. Non si fa MAI il deploy di venerdì. MAI.
2. Non si fa MAI il deploy dopo le 17:00. MAI.
3. Non si fa MAI il deploy prima di un weekend lungo. MAI.
4. Le regex vanno testate con input malevoli.
5. Le regex vanno testate con emoji.
6. Le regex vanno testate con caratteri speciali.
7. Il PM non sa cosa è una regex. Non chiedergli.
8. "È una modifica piccolissima" = "È una modifica che può uccidere tutto".
9. "Cosa può andare storto?" = "Tutto può andare storto".
10. Il venerdì non perdona. Le regex nemmeno.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che il venerdì non si fa il deploy. E che le regex possono uccidere. E che il PM non sa un cazzo. E che il cliente chiama il sabato mattina. E che il tuo weekend può morire in 3 minuti. Tutto per una regex. Una regex che non conoscevi. E che non hai testato. E che hai deployato di venerdì. Alle 17:58. Amen."

**ME**: Sì. E la lezione più importante è questa: il venerdì è sacro. Il venerdì è per andare a casa. Il venerdì è per staccare. Il venerdì NON è per i deploy. E quando il PM chiede "puoi fare un deploy?", la risposta è NO. Sempre NO. Anche se è una modifica piccolissima. Anche se è solo una regex. Anche se "non può andare storto". Perché può andare storto. Sempre. E quando va storto, va storto di venerdì. E quando va storto di venerdì, il tuo weekend muore. E il cliente chiama. E il TL ti guarda. E tu sai. Sai che hai sbagliato. Sai che non dovevi. Sai che... il venerdì non perdona. Amen.

---

## Il costo del deploy di venerdì

| Voce | Valore |
|------|--------|
| Giorno | Venerdì |
| Ora deploy | 17:58 |
| Tempo al weekend | 2 minuti |
| Modifica | 1 regex |
| Righe di codice | 1 |
| Test effettuati | Sì (base) |
| Test con emoji | NO |
| Test con input malevoli | NO |
| Tempo al down | 3 minuti |
| Durata outage | 2 ore 3 minuti |
| Richieste fallite | 12.847 |
| Utenti impattati | ~8.000 |
| Rollback | Sì (19:15) |
| Weekend rovinato | Sì |
| Birra bevuta | 0 |
| Chiamata cliente | Sabato 09:00 |
| Reazione cliente | "Chiamo il tuo capo" |
| Reazione PM | "Era solo una regex!" |
| Reazione TL | "Non conosci le regex" |
| Reazione CTO | "Venerdì = NO DEPLOY" |
| **Totale** | **1 weekend + 1 dignità + 8.000 utenti arrabbiati** |

**Morale**: Non si fa mai il deploy di venerdì. Mai. Nemmeno se è "una modifica piccolissima". Nemmeno se "non può andare storto". Nemmeno se il PM chiede. Nemmeno se sono le 17:58 e vuoi andare a casa. Perché può andare storto. E quando va storto di venerdì, va storto per tutto il weekend. E il cliente chiama. E il TL ti guarda. E tu sai. Sai che hai sbagliato. Sai che non dovevi. Sai che... il venerdì non perdona. E le regex nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](67-la-api-key-nel-repo-pubblico.md)]**
