# Il Cron Job Che Non Si Fermava Mai

**Data**: 13/06/2026

**[Home](../index.md) | [Precedente](68-il-deploy-del-venerdi-alle-1758.md) | [Prossima](70-il-select-asterisco-che-ha-ucciso-il-database.md)]**

---

C'è una verità nel mondo dell'automazione. Una verità sacra. Una verità ignorata da chiunque abbia mai detto "è solo un cron job, cosa può fare?". Quella verità è: **"Un cron job senza controllo è come un robot senza interruttore. Puoi avviarlo. Ma quando vuoi fermarlo, non puoi. E lui continua. Continua a girare. Continua a eseguire. Continua a mandare email. 847.000 email. A 847.000 clienti. In 47 minuti. E tu non puoi fare nulla. Perché non c'è l'interruttore. Non c'è il kill switch. Non c'è... la salvezza"**. Ma c'è una verità ancora più sacra. Quella verità è: **"I cron job vanno scritti con idempotenza. Vanno scritti con lock. Vanno scritti con timeout. E soprattutto, vanno scritti con un modo per fermarli. Perché quando un cron job impazzisce, non si ferma da solo. Continua. E continua. E continua. Fino a quando non hai mandato 847.000 email. E il provider ti ha bannato. E i clienti ti odiano. E il CEO ti cerca. Con un fucile. Metaforico. O forse no. Amen"**. E questa è la storia di chi ha scritto quel cron job. Di chi l'ha avviato. Di chi ha guardato impotente mentre mandava email. A tutti. Per sempre. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo mandare una newsletter.

**ME**: Una newsletter?

**PM**: Sì. Ai clienti che non hanno comprato da 6 mesi.

**ME**: E quanti sono?

**PM**: Non lo so. Forse 5.000?

**ME**: E quando la dobbiamo mandare?

**PM**: Giovedì mattina.

**ME**: Giovedì?

**PM**: Sì. Alle 9:00.

**ME**: E come?

**PM**: Con un cron job.

**ME**: Un cron job?

**PM**: Sì. Che parte alle 9:00 e manda le email.

**ME**: E se qualcosa va storto?

**PM**: Cosa può andare storto? È solo un invio email.

**ME**: E se il cron job si blocca?

**PM**: Si blocca?

**ME**: Sì. Se si blocca a metà.

**PM**: E allora?

**ME**: E allora bisogna poterlo fermare.

**PM**: Fermarlo?

**ME**: Sì. Un kill switch.

**PM**: Ma è solo una newsletter!

**ME**: E se manda troppe email?

**PM**: Non succederà.

**ME**: E se succede?

**PM**: Non succederà. È un cron job semplice.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia sanità mentale. Il nulla che era la mia attenzione ai dettagli. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Codice**

Il martedì, ho scritto. Ho scritto il cron job. Ho scritto... la condanna.

**ME**: Ok. Ho scritto il cron job.

**TL**: Fammi vedere.

**ME**:
```javascript
// cron: 0 9 * * 4 (ogni giovedì alle 9:00)
async function sendNewsletter() {
  const users = await db.query('SELECT * FROM users WHERE last_purchase < NOW() - INTERVAL 6 MONTHS');
  
  for (const user of users) {
    await email.send({
      to: user.email,
      subject: 'Ti manchiamo?',
      body: 'È da tanto che non compri. Torna a trovarci!'
    });
  }
}
```

**TL**: E questo?

**ME**: Questo è il cron job.

**TL**: E funziona?

**ME**: Sì. L'ho testato.

**TL**: E con quanti utenti?

**ME**: 10.

**TL**: 10?

**ME**: Sì. In locale.

**TL**: E in production quanti sono?

**ME**: Il PM dice 5.000.

**TL**: E hai testato con 5.000?

**ME**: No.

**TL**: E perché?

**ME**: Perché non ho 5.000 utenti in locale.

**TL**: E non hai pensato di mettere un limite?

**ME**: Un limite?

**TL**: Sì. Un batch size. Mandare 100 email alla volta.

**ME**: Ma il PM vuole che siano tutte mandate giovedì.

**TL**: E se il cron job impiega troppo?

**ME**: Non impiegherà troppo.

**TL**: E se il server va giù?

**ME**: Non va giù.

**TL**: E se il provider banna l'IP?

**ME**: Perché dovrebbe?

**TL**: Perché mandi 5.000 email in poco tempo.

**ME**: Ma sono newsletter! Non spam!

**TL**: E il provider come fa a saperlo?

**ME**: ...

**TL**: ...

**ME**: Non ci ho pensato.

**TL**: E il lock?

**ME**: Il lock?

**TL**: Sì. Per evitare che il cron job parta due volte.

**ME**: Perché dovrebbe partire due volte?

**TL**: Perché i cron job sono così. Se il precedente non finisce, parte quello nuovo.

**ME**: E quindi?

**TL**: E quindi hai due cron job che mandano email.

**ME**: Ma è impossibile!

**TL**: È impossibile?

**ME**: Sì. Il cron job finisce in 5 minuti.

**TL**: E se non finisce?

**ME**: Finirà.

**TL**: E se non finisce?

**ME**: Allora... non lo so.

Il TL mi ha guardato. Io guardavo il codice. Il codice guardava me. E io sapevo. Sapevo che era sbagliato. Sapevo che mancava qualcosa. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Mercoledì - La Review**

Il mercoledì, la CR. La Code Review. La... condanna.

**CR**: Ho guardato il cron job.

**ME**: E?

**CR**: E manca il lock.

**ME**: Il lock?

**CR**: Sì. Per evitare esecuzioni multiple.

**ME**: Ma il TL ha detto che ci pensava lui.

**CR**: Il TL?

**ME**: Sì. Il TL ha detto che avrebbe aggiunto il lock.

**CR**: E l'ha fatto?

**ME**: Non lo so. Chiedi a lui.

**CR**: Il TL è in ferie.

**ME**: In ferie?

**CR**: Sì. È partito ieri.

**ME**: E quindi?

**CR**: E quindi apro la PR. E commento che manca il lock.

**ME**: E il PM?

**CR**: E il PM?

**ME**: Il PM vuole che sia fatto per domani.

**CR**: E se non c'è il lock?

**ME**: Allora... non c'è il lock.

**CR**: E se il cron job parte due volte?

**ME**: Non succederà.

**CR**: Non succederà?

**ME**: No. Il cron job finisce in 5 minuti.

**CR**: E se non finisce?

**ME**: Finirà.

**CR**: E se il server è lento?

**ME**: Non è lento.

**CR**: E se la query impiega troppo?

**ME**: Non impiegherà troppo.

**CR**: E se il provider rallenta?

**ME**: ...

**CR**: ...

**ME**: Non ci ho pensato.

La CR ha guardato me. Io guardavo la PR. La PR aveva 3 commenti. Uno diceva: "Manca il lock". Un altro diceva: "Manca il rate limiting". L'ultimo diceva: "Manca il kill switch". E io ho ignorato tutti. Perché il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Giovedì - 09:00**

Il giovedì, il cron job è partito. È partito... il disastro.

**ME**: Ok. Il cron job è partito.

**PM**: Ottimo! Quante email?

**ME**: Non lo so. Controllo i log.

Ho aperto i log. I log mostravano:
- 09:00 - Cron job started
- 09:00 - Query executed: 847,293 users found
- 09:00 - Sending email 1/847293...
- 09:00 - Sending email 2/847293...
- 09:00 - Sending email 3/847293...

**ME**: PM?

**PM**: Sì?

**ME**: Quanti utenti avevi detto?

**PM**: 5.000.

**ME**: E quanti sono?

**PM**: Non lo so. Perché?

**ME**: Perché sono 847.000.

**PM**: 847.000?

**ME**: Sì.

**PM**: E il cron job li sta processando tutti?

**ME**: Sì.

**PM**: E quanto ci vuole?

**ME**: Non lo so. Ma sta mandando email.

**PM**: E quindi?

**ME**: E quindi stiamo mandando 847.000 email.

**PM**: Ma è ottimo!

**ME**: Ottimo?

**PM**: Sì! Più email = più clienti!

**ME**: Ma il provider?

**PM**: Il provider?

**ME**: Sì. Il provider di email.

**PM**: E allora?

**ME**: E allora potrebbe bannarci.

**PM**: Perché?

**ME**: Perché 847.000 email in poco tempo sembrano spam.

**PM**: Ma non è spam! È newsletter!

**ME**: E il provider come fa a saperlo?

**PM**: ...

**ME**: ...

**PM**: Non ci ho pensato.

Il PM mi ha guardato. Io guardavo i log. I log mostravano:
- 09:05 - Sending email 47.293/847293...
- 09:05 - Sending email 47.294/847293...
- 09:05 - Sending email 47.295/847293...

E il cron job continuava. E continuava. E continuava. E io non potevo fermarlo. Perché non c'era il kill switch. Non c'era il lock. Non c'era... la salvezza. Amen.

---

**Giovedì - 09:15**

È arrivato. Quello che temevo. Quello che era inevitabile.

**SLACK**: @here Il provider di email ha bannato il nostro IP.

**SLACK**: @channel Abbiamo ricevuto un warning per spam.

**SLACK**: @everyone IL CRON JOB STA MANDANDO EMAIL A TUTTI.

**ME**: ...

**TL**: (da ferie) Te l'avevo detto.

**ME**: Ma cosa è successo?

**TL**: Il cron job.

**ME**: Il cron job?

**TL**: Sì. Il cron job del cazzo che hai scritto.

**ME**: E perché?

**TL**: Perché non ha il lock.

**ME**: Il lock?

**TL**: Sì. Il lock che non c'è.

**ME**: E quindi?

**TL**: E quindi il cron job è partito due volte.

**ME**: Due volte?

**TL**: Sì. Alle 9:00. E alle 9:05.

**ME**: E perché?

**TL**: Perché il primo non era finito.

**ME**: E il secondo?

**TL**: Il secondo è partito lo stesso.

**ME**: E quindi?

**TL**: E quindi hai due cron job che mandano email.

**ME**: Due?

**TL**: Sì. Due. E mandano la stessa email. Agli stessi utenti. Due volte.

Abbiamo guardato i log. I log mostravano:
- 09:00 - Cron job #1 started
- 09:05 - Cron job #2 started (job #1 ancora in esecuzione)
- 09:05 - Job #1: Sending email 47.293/847293...
- 09:05 - Job #2: Sending email 1/847293...
- 09:05 - Job #1: Sending email 47.294/847293...
- 09:05 - Job #2: Sending email 2/847293...

E lì, in quei log, c'era la verità. La verità che faceva male. La verità che... due cron job stavano mandando email. A 847.000 utenti. Due volte ciascuno. E il provider stava per bannarci. Amen.

---

**Giovedì - 09:30**

Ho chiamato il provider. Il provider non era contento.

**PROVIDER**: Pronto?

**ME**: Sì, abbiamo un problema.

**PROVIDER**: Quale problema?

**ME**: Il nostro cron job sta mandando troppe email.

**PROVIDER**: Troppe?

**ME**: Sì. 847.000. Anzi, 1.694.000. Perché sono partiti due job.

**PROVIDER**: 1.694.000 email?

**ME**: Sì.

**PROVIDER**: E in quanto tempo?

**ME**: 30 minuti.

**PROVIDER**: 30 MINUTI?

**ME**: Sì.

**PROVIDER**: E non avete il rate limiting?

**ME**: No.

**PROVIDER**: E non avete il lock?

**ME**: No.

**PROVIDER**: E non avete il kill switch?

**ME**: No.

**PROVIDER**: E quindi?

**ME**: E quindi non posso fermarlo.

**PROVIDER**: Non puoi fermarlo?

**ME**: No.

**PROVIDER**: E il server?

**ME**: Il server?

**PROVIDER**: Sì. Il server che manda le email.

**ME**: Non posso fermarlo. È un cron job.

**PROVIDER**: E non puoi killare il processo?

**ME**: Non ho accesso al server.

**PROVIDER**: E chi ce l'ha?

**ME**: Il DevOps.

**PROVIDER**: E dov'è?

**ME**: In ferie.

**PROVIDER**: ...

**ME**: ...

**PROVIDER**: Siete fottuti.

**ME**: E l'IP?

**PROVIDER**: L'IP è bannato.

**ME**: Bannato?

**PROVIDER**: Sì. Per spam.

**ME**: Ma non è spam!

**PROVIDER**: 1.694.000 email in 30 minuti è spam.

**ME**: E quanto dura il ban?

**PROVIDER**: Permanente.

**ME**: Permanente?

**PROVIDER**: Sì. Non mandate più email da questo IP.

**ME**: E quindi?

**PROVIDER**: E quindi trovate un altro provider. O un altro IP. O un altro modo. Ma con noi, avete chiuso.

Il provider ha riattaccato. Io ho guardato il TL. Il TL guardava me (dal telefono, in ferie). Io guardavo i log. I log mostravano:
- 09:30 - Cron job #1: Sending email 284.729/847293...
- 09:30 - Cron job #2: Sending email 237.436/847293...
- 09:30 - Provider response: IP BANNED

E le email continuavano ad andare. Anche se il provider le rifiutava. Il cron job non si fermava. Non poteva fermarsi. Non c'era il kill switch. Amen.

---

**Giovedì - 10:00**

È arrivato il CTO. Il CTO non era contento. Il CTO non era mai contento. Ma questa volta era peggio.

**CTO**: Quindi mi stai dicendo che hai mandato 1.694.000 email?

**ME**: Sì.

**CTO**: A 847.000 clienti?

**ME**: Sì.

**CTO**: Due volte ciascuno?

**ME**: Sì.

**CTO**: E il provider ti ha bannato?

**ME**: Sì.

**CTO**: E non puoi fermare il cron job?

**ME**: No.

**CTO**: E perché?

**ME**: Perché non c'è il kill switch.

**CTO**: Non c'è il kill switch?

**ME**: No.

**CTO**: E perché?

**ME**: Non ho avuto tempo.

**CTO**: Non hai avuto tempo?

**ME**: Il PM chiamava.

**CTO**: E il PM sapeva che non c'era il kill switch?

**ME**: Il PM non sa cosa è un kill switch.

**CTO**: E il lock?

**ME**: Non c'è.

**CTO**: Nemmeno il lock?

**ME**: No.

**CTO**: E il rate limiting?

**ME**: Non c'è.

**CTO**: Nemmeno il rate limiting?

**ME**: No.

**CTO**: E cosa c'è?

**ME**: C'è... il cron job.

**CTO**: Solo il cron job?

**ME**: Sì.

**CTO**: E nient'altro?

**ME**: No.

**CTO**: E quindi?

**ME**: E quindi ho mandato 1.694.000 email. E il provider ci ha bannato. E i clienti sono arrabbiati. E non posso fermarlo. E il DevOps è in ferie. E tu mi odi. E il CEO ti odia. E tutti ci odiano. Perché abbiamo mandato spam. A tutti. Due volte. Amen.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia carriera. Il nulla che era la nostra reputazione. Il nulla... che erano 1.694.000 email. Mandate. A tutti. Due volte. Amen.

---

**Giovedì - 11:00**

Il DevOps ha risposto. Dal mare. Dalle ferie. Ma ha risposto.

**DEVOPS**: Pronto?

**ME**: DevOps, abbiamo un problema.

**DEVOPS**: Che problema?

**ME**: Il cron job non si ferma.

**DEVOPS**: E lo killi?

**ME**: Non posso.

**DEVOPS**: Perché?

**ME**: Non ho accesso.

**DEVOPS**: E chi ce l'ha?

**ME**: Tu.

**DEVOPS**: Io?

**ME**: Sì.

**DEVOPS**: E dov'è il server?

**ME**: Su AWS.

**DEVOPS**: E l'istanza?

**ME**: Non lo so. Non ho accesso.

**DEVOPS**: E il kill switch?

**ME**: Non c'è.

**DEVOPS**: Non c'è?

**ME**: No.

**DEVOPS**: E come pensavi di fermarlo?

**ME**: Non ci ho pensato.

**DEVOPS**: Non ci hai pensato?

**ME**: No.

**DEVOPS**: E adesso?

**ME**: Adesso mi serve il tuo aiuto.

**DEVOPS**: Sono in ferie.

**ME**: Lo so.

**DEVOPS**: Al mare.

**ME**: Lo so.

**DEVOPS**: Con la famiglia.

**ME**: Lo so.

**DEVOPS**: E mi chiami per un cron job?

**ME**: Sì.

**DEVOPS**: Un cron job senza kill switch?

**ME**: Sì.

**DEVOPS**: E vuoi che lo killi io?

**ME**: Sì.

**DEVOPS**: ...

**ME**: ...

**DEVOPS**: Ok. Dammi 5 minuti.

Il DevOps ha aperto il terminale. Ha trovato l'istanza. Ha killato il processo. E il cron job si è fermato. Finalmente. Ma il danno era fatto. 1.694.000 email mandate. O tentate. E il provider ci aveva bannato. E i clienti erano arrabbiati. E noi... eravamo fottuti. Amen.

---

**Venerdì - Le Conseguenze**

Il venerdì, le conseguenze. I clienti chiamavano. I clienti volevano risposte. E noi... rispondevamo.

**CLIENTE 1**: Ho ricevuto 2 email uguali.

**ME**: Sì. Mi dispiace.

**CLIENTE 2**: Ho ricevuto 4 email uguali.

**ME**: Sì. Mi dispiace.

**CLIENTE 3**: Ho ricevuto 8 email uguali.

**ME**: 8?

**CLIENTE 3**: Sì. 8.

**ME**: E come?

**CLIENTE 3**: Non lo so. Ma ne ho 8.

**ME**: E cosa dicono?

**CLIENTE 3**: "Ti manchiamo?"

**ME**: Sì.

**CLIENTE 3**: E mi mancate?

**ME**: Non lo so.

**CLIENTE 3**: E perché me l'avete mandata 8 volte?

**ME**: Perché... il cron job è impazzito.

**CLIENTE 3**: Impazzito?

**ME**: Sì.

**CLIENTE 3**: E non potevate fermarlo?

**ME**: No.

**CLIENTE 3**: E perché?

**ME**: Perché non c'era il kill switch.

**CLIENTE 3**: Il kill switch?

**ME**: Sì. Il modo per fermarlo.

**CLIENTE 3**: E non c'era?

**ME**: No.

**CLIENTE 3**: E perché?

**ME**: Perché non ci ho pensato.

**CLIENTE 3**: Non ci hai pensato?

**ME**: No.

**CLIENTE 3**: E adesso?

**ME**: Adesso ci penso.

**CLIENTE 3**: Bene. Perché la prossima volta che mi mandate 8 email, vi denuncio.

Il cliente ha riattaccato. E non era l'unico. 847.000 clienti avevano ricevuto email. Alcuni 2. Alcuni 4. Alcuni 8. E tutti erano arrabbiati. E tutti chiamavano. E tutti volevano risposte. E noi... non avevamo risposte. Avevamo solo scuse. E le scuse non bastavano. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #CRON-001: Il Cron Job Che Non Si Fermava Mai

**Data incident**: Giovedì 11 giugno 2026, 09:00
**Autore cron job**: ME
**Job programmato**: 0 9 * * 4 (ogni giovedì alle 9:00)
**Lock presente**: NO
**Kill switch presente**: NO
**Rate limiting presente**: NO
**Batch size**: NO
**Timeout**: NO
**Utenti target**: 847.293 (stimati 5.000)
**Job avviati**: 2 (senza lock)
**Email mandate/tentate**: 1.694.586
**Email per utente**: 2 (media), 8 (massimo)
**Tempo esecuzione**: 47 minuti (prima del kill)
**Provider bannato**: Sì (permanente)
**Clienti arrabbiati**: ~847.000
**Reclami ricevuti**: 12.847
**Minacce legali**: 23
**Reazione CTO**: "Siete fottuti."
**Reazione CEO**: "Quanto costa un nuovo provider?"
**Reazione PM**: "Ma le email sono partite!"
**Reazione DevOps**: "Sono in ferie. E mi chiamate per questo?"
**Lezione imparata**: I cron job vanno scritti con LOCK, KILL SWITCH, RATE LIMITING.
**Probabilità che succeda di nuovo**: 67% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. I cron job vanno SEMPRE con un lock distribuito.
2. I cron job vanno SEMPRE con un kill switch.
3. I cron job vanno SEMPRE con rate limiting.
4. I cron job vanno SEMPRE con batch size.
5. I cron job vanno SEMPRE con timeout.
6. I cron job vanno SEMPRE con logging.
7. I cron job vanno SEMPRE con monitoring.
8. Il PM non sa cosa è un cron job. Non chiedergli.
9. "È solo un cron job" = "È una bomba a orologeria".
10. Il DevOps va in ferie. E non chiamarlo.
```

Il TL ha letto la documentazione (era tornato dalle ferie). Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che un cron job senza lock è un disastro. E senza kill switch è una catastrofe. E senza rate limiting è un ban. E hai imparato che 847.000 utenti ricevono email. E che alcuni ne ricevono 8. E che il provider ti banna. E che i clienti ti odiano. E che il DevOps va in ferie. E che tu non lo devi chiamare. Tutto per un cron job. Un cron job che non si fermava. Amen."

**ME**: Sì. E la lezione più importante è questa: i cron job sono pericolosi. Più pericolosi di quanto pensi. Perché non li vedi. Non li controlli. Non li fermi. E quando impazziscono, non si fermano da soli. Continuano. E continuano. E continuano. Fino a quando non hai mandato 1.694.000 email. E il provider ti ha bannato. E i clienti ti odiano. E il CEO ti cerca. E tu non puoi fare nulla. Perché non c'è il kill switch. Non c'è il lock. Non c'è... la salvezza. E tutto perché hai pensato: "È solo un cron job". Ma i cron job non sono "solo cron job". I cron job sono automazione. E l'automazione va controllata. Sempre. Con lock. Con kill switch. Con rate limiting. Con tutto. Perché quando non lo fai, succede questo. 1.694.000 email. 847.000 clienti arrabbiati. 1 provider bannato. E la tua dignità. Persa. Per sempre. Amen.

---

## Il costo del cron job senza controllo

| Voce | Valore |
|------|--------|
| Job programmato | 0 9 * * 4 |
| Lock presente | NO |
| Kill switch | NO |
| Rate limiting | NO |
| Batch size | NO |
| Timeout | NO |
| Utenti target | 847.293 |
| Job avviati | 2 |
| Email mandate | 1.694.586 |
| Email per utente | 2-8 |
| Tempo esecuzione | 47 minuti |
| Provider bannato | Sì (permanente) |
| Clienti arrabbiati | ~847.000 |
| Reclami | 12.847 |
| Minacce legali | 23 |
| Reazione CTO | "Siete fottuti." |
| Reazione CEO | "Quanto costa un nuovo provider?" |
| Reazione PM | "Ma le email sono partite!" |
| Reazione DevOps | "Sono in ferie." |
| Lezione imparata | LOCK + KILL SWITCH + RATE LIMITING |
| **Totale** | **1.694.586 email + 1 provider bannato + 847.000 clienti arrabbiati + 23 minacce legali** |

**Morale**: I cron job vanno scritti con controllo. Con lock. Con kill switch. Con rate limiting. Con batch size. Con timeout. Con tutto. Perché quando un cron job impazzisce, non si ferma da solo. Continua. E continua. E continua. Fino a quando non hai mandato 1.694.000 email. E il provider ti ha bannato. E i clienti ti odiano. E il CEO ti cerca. E tu non puoi fare nulla. Perché non c'è il kill switch. Non c'è il lock. Non c'è... la salvezza. E tutto perché hai pensato: "È solo un cron job". Ma i cron job non sono "solo cron job". Sono bombe. Bombe a orologeria. E quando esplodono, esplodono tutto. La tua carriera. La tua dignità. La tua azienda. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](68-il-deploy-del-venerdi-alle-1758.md)]**
