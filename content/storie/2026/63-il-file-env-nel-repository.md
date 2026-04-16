# Il File .env Nel Repository

**Data**: 02/05/2026

**[Home](../index.md) | [Precedente](62-il-deploy-delle-18-di-venerdi.md)]**

---

C'è una regola. Una regola sacra. Una regola scritta nel sangue di ogni sviluppatore che abbia mai committato qualcosa di cui pentirsi. Quella regola è: **"Il file .env NON va MAI nel repository. Mai. Per nessun motivo. Nemmeno se il PM ti dice che è 'solo per test'"**. E c'è una regola ancora più sacra. Quella regola è: **"Se il file .env finisce nel repository, cambia TUTTE le password. SUBITO. Non aspettare. Non 'dopo'. Non 'domani'. SUBITO"**. E questa è la storia di chi ha violato entrambe le regole. E di chi ha scoperto, tre mesi dopo, che le sue credenziali AWS erano su GitHub. In chiaro. Indicizzate da Google. E usate da 847 bot per minare criptovalute. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il JN aveva un problema. Il JN aveva sempre un problema. Ma questo era diverso.

**JN**: Non riesco a far girare il progetto in locale.

**ME**: Che errore ti dà?

**JN**: Dice che mancano le variabili d'ambiente.

**ME**: E hai creato il file .env?

**JN**: Sì. Ma non so cosa mettere.

**ME**: Chiedi al TL.

**JN**: Il TL è in ferie.

**ME**: E il PM?

**JN**: Il PM dice di chiedere a te.

**ME**: E tu hai guardato il file .env.example?

**JN**: Il file .env.example non esiste.

**ME**: Non esiste?

**JN**: No. Non c'è.

**ME**: E come fai a sapere le variabili?

**JN**: Non lo so. Per questo te lo chiedo.

Ho guardato il JN. Il JN guardava me. Io guardavo il repository. Il repository non aveva .env.example. Il repository non aveva documentazione. Il repository non aveva... nulla. Solo codice. E un JN che non sapeva cosa fare.

**ME**: Ok. Ti do io le variabili.

**JN**: Grazie!

**ME**: Ma non le committare.

**JN**: Ok.

**ME**: Mai.

**JN**: Ok.

**ME**: Per nessun motivo.

**JN**: Ho capito.

**ME**: Nemmeno se il PM ti dice di farlo.

**JN**: Ho capito!

**ME**: Nemmeno se pensi che sia una buona idea.

**JN**: HO CAPITO!

Il JN aveva capito. O almeno, così sembrava. Ma i JN capiscono. E poi dimenticano. E poi fanno quello che vogliono. Sempre. Amen.

---

**Martedì - Il Commit**

Il martedì, il JN ha committato. Non il .env. Ma qualcosa di peggio.

**JN**: Ho fatto una PR!

**ME**: Fammi vedere.

**JN**: È la PR #847. Aggiunge la configurazione del database.

**ME**: E cosa aggiunge?

**JN**: Il file config/database.yml.

**ME**: E il file .env?

**JN**: No. Non l'ho committato.

**ME**: Sicuro?

**JN**: Sì. Ho controllato.

**ME**: Fammi vedere la PR.

Ho aperto la PR. La PR aveva 3 file:
- `config/database.yml`
- `config/secrets.yml`
- `.env`

**ME**: JN.

**JN**: Sì?

**ME**: Hai committato il .env.

**JN**: Cosa?

**ME**: Hai committato il .env.

**JN**: No. Ho controllato.

**ME**: Guarda la PR.

**JN**: ... Oh.

**ME**: Sì. Oh.

**JN**: Ma come?

**ME**: Non lo so. Forse hai fatto `git add .`

**JN**: Sì. Ho fatto `git add .`

**ME**: E non hai controllato cosa aggiungevi?

**JN**: Ero di fretta. Il PM chiamava.

**ME**: E il PM ti ha detto di committare il .env?

**JN**: No. Il PM mi ha detto di committare la configurazione.

**ME**: E tu hai committato tutto.

**JN**: Sì.

**ME**: Compreso il .env.

**JN**: Sì.

**ME**: Con le credenziali di produzione.

**JN**: ... Oh no.

Il JN ha guardato me. Io guardavo la PR. La PR aveva il .env. E il .env aveva:
- `AWS_ACCESS_KEY_ID=AKIA...`
- `AWS_SECRET_ACCESS_KEY=...`
- `DATABASE_URL=postgres://admin:SuperSecretPassword123@...`
- `JWT_SECRET=super-secret-jwt-key`
- `STRIPE_API_KEY=sk_live_...`

E tutto era su GitHub. In chiaro. Per sempre. Amen.

---

**Martedì - 14:30**

Ho chiamato il TL. Il TL era in ferie. Ma questo era un'emergenza.

**TL**: Pronto?

**ME**: TL, abbiamo un problema.

**TL**: Che problema?

**ME**: Il JN ha committato il .env.

**TL**: Il .env?

**ME**: Sì. Nel repository.

**TL**: Nel repository pubblico?

**ME**: Sì.

**TL**: Con le credenziali di produzione?

**ME**: Sì.

**TL**: ...

**ME**: TL?

**TL**: ...

**ME**: TL, ci sei?

**TL**: Sì. Sto elaborando.

**ME**: Elaborando cosa?

**TL**: Il fatto che siamo fottuti.

**ME**: E quindi?

**TL**: E quindi dobbiamo ruotare TUTTE le credenziali.

**ME**: Subito?

**TL**: SUBITO. Non aspettare. Non "dopo". Non "domani". SUBITO.

**ME**: E la PR?

**TL**: Chiudila. Subito.

**ME**: E il commit?

**TL**: È su GitHub. È pubblico. È... per sempre.

**ME**: E quindi?

**TL**: E quindi dobbiamo ruotare tutto. AWS. Database. Stripe. JWT. Tutto.

**ME**: E quanto tempo?

**TL**: Ore. Forse giorni.

**ME**: E nel frattempo?

**TL**: Nel frattempo, chiunque abbia accesso al repository può vedere le nostre credenziali.

**ME**: E usarle?

**TL**: Sì. E usarle.

Il TL ha riattaccato. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava la PR. E la PR mostrava le nostre credenziali. A tutto il mondo. Per sempre. Amen.

---

**Martedì - 15:00**

Abbiamo iniziato a ruotare. Tutto. AWS. Database. Stripe. JWT. Tutto.

**ME**: Ok. Iniziamo con AWS.

**JN**: Come?

**ME**: Andiamo nella console AWS. Creiamo nuove chiavi. Disabilitiamo le vecchie.

**JN**: E il database?

**ME**: Cambiamo la password.

**JN**: E Stripe?

**ME**: Generiamo nuove API key.

**JN**: E JWT?

**ME**: Cambiamo il secret.

**JN**: E quanto tempo?

**ME**: Non lo so. Ore.

**JN**: E il PM?

**ME**: Il PM non lo sa ancora.

**JN**: E glielo diciamo?

**ME**: Prima risolviamo. Poi diciamo.

**JN**: E se non riusciamo a risolvere?

**ME**: Allora siamo fottuti.

Abbiamo iniziato. AWS. Database. Stripe. JWT. Uno dopo l'altro. E ogni volta, dovevamo:
1. Accedere alla console
2. Generare nuove credenziali
3. Aggiornare tutti i servizi che le usavano
4. Testare che tutto funzionasse
5. Disabilitare le vecchie credenziali

E ogni volta, c'era qualcosa che non funzionava. Un servizio che non si aggiornava. Un container che non si riavviava. Una variabile d'ambiente che non si propagava. E tutto mentre il JN piangeva. Letteralmente. Amen.

---

**Martedì - 19:00**

Erano le 19:00. E non avevamo finito.

**ME**: Ok. AWS è fatto. Database è fatto. Stripe è fatto.

**JN**: E JWT?

**ME**: JWT manca.

**JN**: E quanto tempo?

**ME**: Un'ora. Forse due.

**JN**: E nel frattempo?

**ME**: Nel frattempo, chiunque abbia visto il .env può usare il JWT secret per generare token.

**JN**: E cosa possono fare?

**ME**: Possono impersonare qualsiasi utente.

**JN**: Anche l'admin?

**ME**: Anche l'admin.

**JN**: E possono fare tutto?

**ME**: Tutto.

**JN**: ...

**ME**: ...

**JN**: Quindi siamo fottuti?

**ME**: Sì. Siamo fottuti.

Il JN ha guardato me. Io guardavo il terminale. Il terminale mostrava: "JWT_SECRET=super-secret-jwt-key". E quella chiave era su GitHub. In chiaro. Per sempre. E chiunque poteva usarla. Per impersonare chiunque. Per fare qualsiasi cosa. Amen.

---

**Mercoledì - La Scoperta**

Il mercoledì, abbiamo scoperto. Quello che temevamo. Quello che sapevamo sarebbe successo. Quello che... era già successo.

**TL**: Abbiamo un problema.

**ME**: Quale?

**TL**: Il nostro account AWS ha generato $47.000 di costi.

**ME**: $47.000?

**TL**: Sì. In una notte.

**ME**: E come?

**TL**: Qualcuno ha usato le nostre credenziali.

**ME**: Le nostre credenziali?

**TL**: Sì. Quelle del .env.

**ME**: Ma le abbiamo ruotate!

**TL**: Le abbiamo ruotate alle 19:00. Ma il commit era dalle 14:00.

**ME**: E in quelle 5 ore?

**TL**: In quelle 5 ore, 847 bot hanno scaricato il nostro repository. E hanno trovato il .env. E hanno usato le nostre credenziali AWS.

**ME**: E cosa hanno fatto?

**TL**: Hanno creato 847 istanze EC2. Per minare criptovalute.

**ME**: 847 ISTANZE?

**TL**: Sì. 847 istanze. Per 5 ore. Prima che le disabilitassimo.

**ME**: E il costo?

**TL**: $47.000.

**ME**: E chi paga?

**TL**: Noi.

**ME**: Noi?

**TL**: Sì. Noi. L'azienda.

**ME**: E il CTO?

**TL**: Il CTO non lo sa ancora.

Il TL mi ha guardato. Io ho guardato il JN. Il JN guardava il nulla. Il nulla che era il nostro budget. Il nulla che era la nostra sicurezza. Il nulla... che era il nostro futuro. Amen.

---

**Giovedì - La Spiegazione**

Il giovedì, abbiamo spiegato. Al PM. Al CTO. Al CEO. A tutti.

**CTO**: Quindi mi state dicendo che avete committato le credenziali AWS su GitHub?

**TL**: Sì.

**CTO**: E qualcuno le ha usate?

**TL**: Sì.

**CTO**: Per minare criptovalute?

**TL**: Sì.

**CTO**: E il costo è $47.000?

**TL**: Sì.

**CTO**: E chi ha committato il file?

**TL**: Il JN.

**CTO**: E non ha controllato?

**TL**: No.

**CTO**: E non c'era un .gitignore?

**TL**: C'era. Ma il JN ha fatto `git add .` e ha forzato l'aggiunta.

**CTO**: Ha forzato l'aggiunta?

**TL**: Sì. Con `git add -f .env`

**CTO**: E perché?

**TL**: Perché pensava che servisse per la configurazione.

**CTO**: E non ha chiesto?

**TL**: Ha chiesto al PM.

**CTO**: E il PM?

**TL**: Il PM ha detto "sì, committa tutto".

**CTO**: Il PM ha detto questo?

**TL**: Sì.

**CTO**: E il PM sapeva che il .env aveva le credenziali?

**TL**: No. Il PM non sa cosa è un .env.

**CTO**: E quindi?

**TL**: E quindi il JN ha committato. E noi abbiamo pagato $47.000. E i bot hanno minato. E tutto perché il JN non ha controllato. E il PM non ha capito. E noi non abbiamo prevenuto.

Il CTO ha guardato il TL. Il TL guardava me. Io guardavo il JN. Il JN guardava il PM. Il PM guardava il telefono. Il telefono mostrava: "Amazon Web Services: Your invoice for $47.000 is ready". Amen.

---

**Venerdì - La Lezione**

Il venerdì, abbiamo imparato. O quasi.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Il file .env non va MAI nel repository.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: Se committi credenziali, ruotale SUBITO.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che `git add .` è pericoloso. Molto pericoloso. E che `git add -f` è ancora più pericoloso. E che non si deve MAI forzare l'aggiunta di file che sono nel .gitignore. MAI. Perché quei file sono nel .gitignore per un motivo. E il motivo è: NON DEVONO ESSERE NEL REPOSITORY. E se li metti, succede questo. $47.000 di costi. 847 bot che minano criptovalute. E un CTO che ti odia. E un CEO che ti odia. E tutti ti odiano. Perché hai committato un file. Un file che non doveva essere lì. E quel file è costato $47.000. E la tua carriera. E forse l'azienda. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso cosa. O quasi.

```markdown
## Incident #GIT-001: Il File .env Nel Repository

**Data incident**: Martedì 28 aprile 2026, 14:00
**Autore commit**: JN
**File committato**: `.env`
**Contenuto**: Credenziali AWS, Database, Stripe, JWT
**Repository**: Pubblico
**Visibilità**: Tutti
**Tempo prima della rotazione**: 5 ore
**Bot che hanno scaricato**: 847
**Istanze EC2 create**: 847
**Costo totale**: $47.000
**Chi paga**: L'azienda
**Reazione CTO**: "..."
**Reazione CEO**: "Siamo rovinati."
**Reazione PM**: "Ma era solo un file di configurazione!"
**Lezione imparata**: Mai committare .env. Mai.
**Probabilità che succeda di nuovo**: 100% (da parte di un altro JN)

**Regole per il futuro**:
1. Il file .env va SEMPRE nel .gitignore.
2. Mai fare `git add .` senza controllare cosa aggiungi.
3. Mai fare `git add -f` su file nel .gitignore.
4. Se committi credenziali, ruotale SUBITO.
5. Sempre usare un tool per scansionare i commit (git-secrets, trufflehog).
6. Mai fidarsi del JN. Mai. Per nessun motivo.
7. Il PM non sa cosa è un .env. Non chiedergli.
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che un file può costare $47.000. E la mia carriera. E forse l'azienda. Ma l'ho imparato."

**ME**: Sì. E la lezione più importante è questa: i segreti non vanno nel codice. Mai. Per nessun motivo. Nemmeno se pensi che sia sicuro. Nemmeno se pensi che nessuno lo vedrà. Nemmeno se pensi che "è solo per test". Perché i segreti vengono sempre scoperti. Sempre. E quando vengono scoperti, succede questo. $47.000 di costi. 847 bot che minano. E tu sei lì. A guardare. Senza poter fare nulla. Perché il commit è fatto. E il file è su GitHub. E GitHub è per sempre. Amen.

---

## Il costo del .env nel repository

| Voce | Valore |
|------|--------|
| File committato | `.env` |
| Credenziali esposte | AWS, Database, Stripe, JWT |
| Repository | Pubblico |
| Tempo di esposizione | 5 ore |
| Bot che hanno scaricato | 847 |
| Istanze EC2 create | 847 |
| Costo AWS | $47.000 |
| Chi paga | L'azienda |
| Credenziali ruotate | Sì (dopo 5 ore) |
| Danni ulteriori | Sconosciuti |
| Reazione CTO | "..." |
| Reazione CEO | "Siamo rovinati." |
| Lezione imparata | Mai .env nel repo |
| **Totale** | **$47.000 + 1 JN che non committerà mai più .env** |

**Morale**: Il file .env non va MAI nel repository. Mai. Per nessun motivo. Nemmeno se il PM ti dice che è "solo per test". Nemmeno se pensi che nessuno lo vedrà. Nemmeno se pensi che "è solo un file di configurazione". Perché quel file ha segreti. E i segreti, una volta su GitHub, sono per sempre. E se qualcuno li trova, li usa. E quando li usa, succede questo. $47.000 di costi. Bot che minano criptovalute. E tu sei lì. A guardare la fattura AWS. Chiedendoti perché. Perché ho fatto `git add .`? Perché non ho controllato? Perché non ho ascoltato? E la risposta è: perché non si ascolta. Non si ascolta mai. Finché non è troppo tardi. E allora si ascolta. Ma è troppo tardi. I segreti sono su GitHub. I bot hanno minato. E la fattura è arrivata. $47.000. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](62-il-deploy-delle-18-di-venerdi.md)]**
