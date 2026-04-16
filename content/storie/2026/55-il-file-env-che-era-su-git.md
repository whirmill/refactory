# Il File .env Che Era Su Git

**Data**: 07/03/2027

**[Home](../index.md) | [Precedente](54-il-refactor-che-ha-rotto-tutto.md)]**

---

C'è una regola nel mondo dello sviluppo software. Una regola sacra. Una regola inviolabile. Una regola che ogni developer conosce, rispetta, e... viola. Quella regola è: **"Mai committare il file .env"**. Ma c'è una regola ancora più sacra. Ancora più inviolabile. Ancora più violata. Quella regola è: **"Mai committare il file .env con le password di produzione"**. E questa è la storia di chi l'ha fatto. Di chi l'ha scoperto. Di chi ha vissuto l'incubo. E di chi, forse, ha imparato. O no. Perché le lezioni, nel mondo dello sviluppo, si imparano. Si dimenticano. E si reimparano. Ogni volta che qualcuno fa un commit. Senza guardare. Senza pensare. Senza... speranza.

![](../../img/code.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Il JN stava facendo onboarding. Il JN stava imparando il progetto. Il JN stava... leggendo la storia dei commit. Perché il JN è così. Il JN vuole capire. Il JN vuole imparare. Il JN vuole... soffrire.

**JN**: Ehm.

**ME**: Cosa?

**JN**: Ho trovato una cosa.

**ME**: Cosa?

**JN**: Nel repository.

**ME**: Cosa?

**JN**: Un file.

**ME**: Quale file?

**JN**: Il file .env.

**ME**: Il file .env?

**JN**: Sì.

**ME**: E cosa c'è nel file .env?

**JN**: Le password.

**ME**: Quali password?

**JN**: Tutte.

**ME**: TUTTE?

**JN**: Sì. Database. API. AWS. Stripe. SendGrid. Tutto.

**ME**: E... è su Git?

**JN**: Sì. Dal 2019.

**ME**: E... è pubblico?

**JN**: No. È un repo privato.

**ME**: Meno male.

**JN**: Ma...

**ME**: Ma?

**JN**: Ma ci sono 47 contributori.

**ME**: 47?

**JN**: Sì. E 12 sono ex-dipendenti.

**ME**: Ex-dipendenti?

**JN**: Sì. Che hanno ancora accesso.

**ME**: E le password?

**JN**: Non sono mai state cambiate.

Il JN mi ha guardato. Io ho guardato il JN. Il JN ha guardato lo schermo. Lo schermo mostrava il commit. Il commit del 2019. Il commit che aveva cambiato tutto. Il commit che aveva... condannato tutti. O quasi. Perché le password erano lì. In chiaro. Su Git. Per sempre. Come un monumento all'idiozia. Come un testamento alla negligenza. Come... la realtà di ogni azienda.

---

**Martedì - L'Analisi**

Il martedì, abbiamo analizzato. Abbiamo guardato il commit. Abbiamo guardato l'autore. Abbiamo guardato... il disastro.

**TL**: Chi ha fatto il commit?

**JN**: Un certo "Marco".

**TL**: Marco?

**JN**: Sì. Marco Rossi. Ha lasciato l'azienda nel 2020.

**TL**: E cosa dice il messaggio del commit?

**JN**: "Fix config".

**TL**: "Fix config"?

**JN**: Sì. Solo "Fix config".

**TL**: E ha committato il .env?

**JN**: Sì. Con tutte le password.

**TL**: E nessuno l'ha notato?

**JN**: No. Per 8 anni.

**TL**: 8 ANNI?

**JN**: Sì. 8 anni. 312 commit. 47 contributori. E nessuno ha mai guardato il .env.

**TL**: E il .gitignore?

**JN**: Il .gitignore non esisteva. È stato aggiunto nel 2021.

**TL**: E il file .env?

**JN**: Era già su Git. Il .gitignore non ha effetto sui file già tracciati.

**TL**: E quindi?

**JN**: E quindi il file .env è rimasto. Per 8 anni. Con tutte le password. In chiaro. Su Git. Per sempre.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il commit. E tutti abbiamo capito. Il disastro era completo. Il disastro era totale. Il disastro era... storico. Come tutti i disastri. Come tutte le password su Git. Come tutta la storia del software.

---

**Mercoledì - La Riunione**

Il mercoledì, abbiamo chiamato una riunione. Una riunione d'emergenza. Per discutere del file .env. Delle password. Del disastro.

**CTO**: Quindi mi state dicendo che le password di produzione sono su Git?

**TL**: Sì.

**CTO**: Da 8 anni?

**TL**: Sì.

**CTO**: E nessuno l'ha mai notato?

**TL**: No.

**CTO**: E quante persone hanno accesso al repo?

**TL**: 47. Di cui 12 ex-dipendenti.

**CTO**: E le password sono state cambiate?

**TL**: No.

**CTO**: MAI?

**TL**: Mai.

**CTO**: E questo significa che...

**TL**: Sì. 12 ex-dipendenti hanno ancora accesso a tutto. Database. AWS. Stripe. SendGrid. Tutto.

**CTO**: E non abbiamo modo di sapere se hanno usato queste credenziali?

**TL**: No. I log vanno indietro solo 90 giorni.

**CTO**: E quindi?

**TL**: E quindi non sappiamo nulla. Non sappiamo se qualcuno ha usato le password. Non sappiamo se qualcuno ha accesso. Non sappiamo... nulla.

Il CTO ha guardato il TL. Il TL ha guardato me. Io ho guardato il JN. E tutti abbiamo capito. Il disastro era silenzioso. Il disastro era invisibile. Il disastro era... completo. Come tutti i disastri di sicurezza. Che non fanno rumore. Non fanno vittime. Non fanno... nulla. Finché non fanno tutto.

---

**Giovedì - La Rotazione**

Il giovedì, abbiamo iniziato la rotazione. Abbiamo cambiato tutto. Database. API. AWS. Stripe. SendGrid. Tutto. E tutto è andato... male. O quasi.

**JN**: Ho cambiato la password del database.

**TL**: E?

**JN**: E l'applicazione è andata giù.

**TL**: GIÙ?

**JN**: Sì. Perché il .env in produzione aveva la vecchia password.

**TL**: E non l'hai aggiornato?

**JN**: Non sapevo dove fosse il .env in produzione.

**TL**: COME NON SAPEVI?

**JN**: Perché non è documentato.

**TL**: E chi lo sa?

**JN**: Nessuno. Marco lo sapeva. Ma Marco se n'è andato nel 2020.

**TL**: E quindi?

**JN**: E quindi ho dovuto cercare. Per 3 ore. In tutti i server. In tutte le cartelle. In tutti i... posti.

**TL**: E l'hai trovato?

**JN**: Sì. In una cartella chiamata "vecchio". Dentro un'altra cartella chiamata "backup". Dentro un'altra cartella chiamata "non_cancellare".

**TL**: E l'hai aggiornato?

**JN**: Sì. E l'applicazione è tornata su.

**TL**: E le altre password?

**JN**: Le altre password sono... complicate.

**TL**: Complicate?

**JN**: Sì. La password di AWS è collegata a 23 servizi. La password di Stripe è collegata a 5 webhook. La password di SendGrid è usata da 3 applicazioni diverse.

**TL**: E se le cambiamo?

**JN**: E se le cambiamo, rompiamo tutto.

**TL**: E se non le cambiamo?

**JN**: E se non le cambiamo, 12 ex-dipendenti hanno ancora accesso.

**TL**: E quindi?

**JN**: E quindi siamo fottuti. In entrambi i casi.

Il JN ha guardato il TL. Il TL ha guardato me. Io ho guardato il soffitto. Il soffitto era più interessante del disastro. Il soffitto non aveva password. Il soffitto non aveva .env. Il soffitto... era perfetto. A differenza del nostro sistema.

---

**Venerdì - La Soluzione**

Il venerdì, abbiamo trovato una soluzione. Una soluzione parziale. Una soluzione che... non ci piaceva. Ma era l'unica.

**CTO**: Ok, ecco il piano.

**TL**: Quale piano?

**CTO**: Cambiamo tutto. E fixiamo tutto. E rompiamo tutto. E poi fixiamo di nuovo.

**TL**: E quanto tempo?

**CTO**: Tutto il weekend.

**TL**: TUTTO IL WEEKEND?

**CTO**: Sì. Tutto il weekend. Perché lunedì voglio che tutto sia sicuro.

**TL**: E se non ce la facciamo?

**CTO**: Allora ce la fate. Perché non c'è alternativa.

**TL**: E i ex-dipendenti?

**CTO**: I ex-dipendenti non sanno che abbiamo scoperto il problema. E non sanno che stiamo cambiando le password. E se qualcuno ha usato le credenziali, lo sapremo. Perché i log di AWS mostrano tutto.

**TL**: E se mostrano qualcosa?

**CTO**: Allora chiamiamo gli avvocati. E la polizia. E il CTO di un'altra azienda. Perché questo CTO sarà in prigione. O licenziato. O entrambi.

Il CTO ha guardato il TL. Il TL ha guardato me. Io ho guardato il JN. E tutti abbiamo capito. Il weekend era finito. Il weekend era morto. Il weekend... non esisteva più. Come tutte le password che avremmo cambiato. Come tutti i .env che avremmo cancellato. Come tutta la sicurezza che avremmo implementato. Troppo tardi. Come sempre.

---

**Venerdì - 23:59**

Eravamo ancora lì. A cambiare password. A fixare configurazioni. A... sopravvivere.

**JN**: Ho cambiato l'ultima password.

**TL**: Quale?

**JN**: Stripe. E ho aggiornato tutti i webhook.

**TL**: E funziona?

**JN**: Sì. Ho testato tutto.

**TL**: Tutto?

**JN**: Tutto. Pagamenti. Refund. Webhook. Tutto.

**TL**: E il .env su Git?

**JN**: L'ho rimosso dalla storia.

**TL**: Dalla storia?

**JN**: Sì. Con git filter-branch. Ho riscritto la storia del repo.

**TL**: E ci sono volute 6 ore.

**JN**: Sì. 6 ore. Per rimuovere un file. Un file che non doveva esistere. Un file che ha causato tutto questo.

**TL**: E ora?

**JN**: Ora il repo è pulito. Il .env non esiste più. E le password sono nuove.

**TL**: E gli ex-dipendenti?

**JN**: Gli ex-dipendenti non hanno più accesso. Ho revocato tutti i permessi.

**TL**: E i log di AWS?

**JN**: I log di AWS mostrano... nulla. Nessun accesso non autorizzato. Nessuna attività sospetta. Nessun... nulla.

**TL**: E questo significa?

**JN**: Significa che siamo stati fortunati. Molto fortunati. Inspiegabilmente fortunati.

Il JN mi ha guardato. Io ho guardato il TL. Il TL guardava l'orologio. Erano le 23:59. E il TL ha detto: "Andiamo a casa. E non parliamone più. Mai. Con nessuno. Per nessun motivo. Amen."

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 14 ore. Ho dormito come non dormivo da anni. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Mai committare il .env.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: I .gitignore vanno creati il primo giorno. Non tre anni dopo.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che la sicurezza è un processo. Non un evento. Che le password vanno cambiate. Che gli accessi vanno revocati. Che i file .env vanno ignorati. E che Marco, ovunque sia, sta ridendo di noi. Perché il suo commit del 2019 ha rovinato il nostro weekend del 2027. E questo è il potere del codice. Il potere di un singolo commit. Il potere di un singolo file. Un file chiamato .env. Che non doveva esistere. Ma esisteva. Per 8 anni. Con tutte le password. Del mondo. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore.

```markdown
## Incident #ENV-001: Il file .env su Git

**Data scoperta**: Lunedì 7 marzo 2027
**Data commit originale**: 15 marzo 2019
**Autore commit**: Marco Rossi (ex-dipendente, 2020)
**Messaggio commit**: "Fix config"
**File committato**: .env
**Contenuto file**: TUTTE le password
**Anni su Git**: 8
**Contributori con accesso**: 47
**Ex-dipendenti con accesso**: 12
**Password mai cambiate**: Sì
**Accessi non autorizzati rilevati**: 0 (fortunatamente)
**Tempo per fixare**: 48 ore (weekend intero)
**Weekend rovinato**: Sì
**Caffè bevuti**: 23
**Lezione imparata**: Mai .env su Git
**Probabilità che succeda di nuovo**: 100% (da parte di un altro JN)

**Regole per il futuro**:
1. Il file .env VA nel .gitignore. Il PRIMO giorno.
2. Le password vanno cambiate quando qualcuno se ne va.
3. Gli accessi vanno revocati. Subito. Non "più tardi".
4. I commit vanno controllati. Sempre. Da tutti.
5. Se vedi un .env su Git, NON IGNORARLO.
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che un singolo file può rovinare 8 anni di sicurezza. E un weekend intero di sonno."

**ME**: Sì. E il file .env è il nemico. Il nemico silenzioso. Il nemico che non fa rumore. Che non si vede. Che esiste. E aspetta. Aspetta che qualcuno lo committi. Aspetta che qualcuno lo ignori. Aspetta... di essere scoperto. 8 anni dopo. Da un JN che stava solo cercando di imparare. E che invece ha trovato l'incubo. L'incubo di ogni azienda. L'incubo di ogni CTO. L'incubo... del file .env su Git. Amen.

---

## Il costo del file .env su Git

| Voce | Valore |
|------|--------|
| Anni su Git | 8 |
| Commit con il file | 312 |
| Contributori che l'hanno visto | 47 |
| Contributori che l'hanno segnalato | 0 |
| Ex-dipendenti con accesso | 12 |
| Password nel file | Tutte |
| Password mai cambiate | Sì |
| Accessi non autorizzati | 0 (fortuna) |
| Tempo per fixare | 48 ore |
| Weekend rovinato | 1 |
| Caffè bevuti | 23 |
| Lezione imparata | Mai .env su Git |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **Disastro evitato per pura fortuna** |

**Morale**: Il file .env non va mai su Git. Mai. Per nessun motivo. In nessuna circostanza. E se è su Git, toglilo. Subito. Non tra 8 anni. Non tra 8 giorni. Ora. E cambia tutte le password. E revoca tutti gli accessi. E controlla i log. E prega. Prega che nessuno abbia usato quelle password. Prega che nessuno abbia notato. Prega... e impara. Perché il file .env su Git è l'errore più comune. L'errore più pericoloso. L'errore che tutti fanno. E che nessuno ammette. Fino a quando un JN non lo scopre. E rovina il weekend di tutti. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](54-il-refactor-che-ha-rotto-tutto.md)]**
