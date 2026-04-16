# Il Cron Job Che Girava Ogni Secondo

**Data**: 28/03/2027

**[Home](../index.md) | [Precedente](57-la-cache-invalidation-che-ha-rotto-tutto.md)]**

---

C'è una verità nel mondo dell'automazione. Una verità sacra. Una verità ignorata. Quella verità è: **"I cron job sono silenziosi. Finché non lo sono più"**. Ma c'è una verità ancora più sacra. Ancora più ignorata. Quella verità è: **"Un cron job mal configurato è come una bomba a orologeria. Solo che l'orologeria è rotta. E la bomba esplode ogni secondo"**. E questa è la storia di chi l'ha fatto. Di chi l'ha scoperto. Di chi ha visto il server morire. E di chi, forse, ha imparato. O no. Perché i cron job sono come i gatti. Non fanno rumore. Finché non lo fanno. E quando lo fanno, è troppo tardi. Il server è morto. Il database è pieno. E tu sei lì. A chiederti perché. Perché `*/1` non significa "una volta al giorno". Significa "ogni minuto". E `* * * * *` significa "ogni minuto di ogni ora di ogni giorno". E se ci metti uno script che manda email... beh. Buon divertimento. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM ha chiamato. Il PM aveva una richiesta. Il PM aveva... un'idea.

**PM**: Ho bisogno di un report.

**TL**: Che report?

**PM**: Un report giornaliero.

**TL**: Giornaliero?

**PM**: Sì. Che arriva ogni giorno. Alle 9:00.

**TL**: E cosa deve contenere?

**PM**: Le vendite del giorno prima.

**TL**: E a chi deve arrivare?

**PM**: A me. E al CTO. E al CEO.

**TL**: E il formato?

**PM**: Email. Con un PDF allegato.

**TL**: E quando lo vuoi?

**PM**: Entro venerdì.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava... nulla. Perché il JN non aveva ancora fatto nulla. Ma il JN stava per fare. Il JN stava per... creare un cron job. E quel cron job avrebbe cambiato tutto. O meglio. Avrebbe distrutto tutto. Ma questo il JN non lo sapeva. Il JN non poteva saperlo. Il JN... era un JN. E i JN non sanno i cron. I JN non sanno Linux. I JN... imparano. Sulla pelle. Degli altri. Amen.

---

**Martedì - Lo Sviluppo**

Il martedì, il JN ha sviluppato. Ha creato lo script. Ha creato il PDF. Ha creato... il cron job.

**JN**: Ho creato lo script.

**TL**: E funziona?

**JN**: Sì. Genera il report. Crea il PDF. Manda l'email.

**TL**: E l'hai testato?

**JN**: Sì. L'ho eseguito manualmente. Funziona.

**TL**: E il cron job?

**JN**: L'ho configurato.

**TL**: E come l'hai configurato?

**JN**: Con crontab.

**TL**: E la sintassi?

**JN**: `* * * * * /path/to/script.sh`

**TL**: `* * * * *`?

**JN**: Sì.

**TL**: E sai cosa significa?

**JN**: Significa "ogni giorno".

**TL**: OGNI GIORNO?

**JN**: Sì. Ogni asterisco è un giorno. Giusto?

**TL**: ...

**JN**: ...

**TL**: JN, gli asterischi sono: minuto, ora, giorno del mese, mese, giorno della settimana.

**JN**: Ah.

**TL**: E `* * * * *` significa "ogni minuto di ogni ora di ogni giorno".

**JN**: Ah.

**TL**: E il tuo script manda email?

**JN**: Sì.

**TL**: E manda email a tre persone?

**JN**: Sì. PM, CTO, CEO.

**TL**: E quindi?

**JN**: E quindi... manda un'email ogni minuto?

**TL**: SÌ. MANDA UN'EMAIL OGNI MINUTO.

**JN**: E quante email sono?

**TL**: 60 email all'ora. 1440 email al giorno. 10.080 email a settimana.

**JN**: E questo è... male?

**TL**: QUESTO È UN DISASTRO.

Il JN ha guardato il TL. Il TL guardava me. Io guardavo il crontab. Il crontab mostrava `* * * * *`. E quel crontab era la condanna. La condanna a 1440 email al giorno. La condanna a un server che sarebbe morto. La condanna... all'inferno delle automazioni. Amen.

---

**Mercoledì - La Correzione**

Il mercoledì, abbiamo corretto. Abbiamo cambiato il cron. Abbiamo... pensato di aver fixato.

**TL**: Ok, JN. La sintassi corretta è: `0 9 * * * /path/to/script.sh`

**JN**: E cosa significa?

**TL**: Significa: "ogni giorno alle 9:00".

**JN**: E gli asterischi?

**TL**: Il primo è il minuto (0). Il secondo è l'ora (9). Gli altri sono "ogni giorno del mese, ogni mese, ogni giorno della settimana".

**JN**: Ah, ok. Ho capito.

**TL**: E ora lo cambi?

**JN**: Sì. Lo cambio subito.

Il JN ha cambiato il cron. Il JN ha salvato. Il JN ha... sbagliato di nuovo.

**JN**: Fatto.

**TL**: Fammi vedere.

**JN**: Ecco: `*/1 9 * * * /path/to/script.sh`

**TL**: `*/1`?

**JN**: Sì. Significa "una volta", giusto?

**TL**: NO. Significa "ogni 1 minuto".

**JN**: Cosa?

**TL**: `*/1` significa "ogni 1 minuto". Quindi alle 9:00, 9:01, 9:02, 9:03... fino alle 9:59.

**JN**: E quindi?

**TL**: E quindi 60 email in un'ora. Invece di una.

**JN**: Ah.

**TL**: Sì. Ah.

**JN**: E come si fa per "una volta sola"?

**TL**: Si mette `0`. Solo `0`. Non `*/1`. `0`.

**JN**: E `0 9 * * *`?

**TL**: Sì. Esattamente quello.

**JN**: Ok. Ora lo cambio.

Il JN ha cambiato di nuovo. Il JN ha salvato di nuovo. E questa volta... era corretto. O almeno, così pensavamo. Perché il JN aveva fatto un'altra cosa. Una cosa che non avevamo visto. Una cosa che avrebbe cambiato tutto. Ancora. Sempre. Amen.

---

**Giovedì - La Scoperta**

Il giovedì, abbiamo scoperto. Il server era lento. Il database era lento. Tutto era lento.

**JN**: Il server è lento.

**TL**: Quanto lento?

**JN**: Molto lento.

**TL**: E quando è iniziato?

**JN**: Ieri sera. Alle 9:00.

**TL**: Alle 9:00?

**JN**: Sì. Proprio quando il cron è partito.

**TL**: E il cron?

**JN**: Il cron era corretto. `0 9 * * *`.

**TL**: E quindi?

**JN**: E quindi non capisco.

Il TL ha guardato i log. I log mostravano... l'inferno. Lo script girava. E girava. E girava. Ma non una volta. Mille volte.

**TL**: JN, quante volte ha girato lo script?

**JN**: Una volta. Alle 9:00.

**TL**: Guarda i log.

**JN**: ...

**TL**: Quante volte?

**JN**: 847 volte.

**TL**: 847 VOLTE?

**JN**: Sì. E continua.

**TL**: E perché?

**JN**: Non lo so.

Il TL ha guardato il codice. Il codice mostrava... un loop. Un loop infinito. Dentro lo script.

**TL**: JN, c'è un `while true` nello script.

**JN**: Sì.

**TL**: E cosa fa?

**JN**: Genera il report. Finché non è completo.

**TL**: E quando è completo?

**JN**: Quando la variabile `done` è true.

**TL**: E quando `done` diventa true?

**JN**: Quando il report è generato.

**TL**: E se il report non si genera?

**JN**: Allora... non diventa mai true?

**TL**: ESATTO. E il report non si genera perché c'è un errore nel codice.

**JN**: E quindi?

**TL**: E quindi il loop gira. Per sempre. Senza fermarsi. Senza completare. Senza... pietà.

Il JN ha guardato il TL. Il TL guardava me. Io guardavo il server. Il server stava morendo. Come tutti i server che incontrano un loop infinito. Come tutti i server che incontrano un JN. Come tutti i server... del mondo. Amen.

---

**Venerdì - L'Emergenza**

Il venerdì, era un'emergenza. Il server era al 98% di CPU. La memoria era al 95%. Il database aveva 847 report identici. E le email...

**TL**: Quante email sono state mandate?

**JN**: 847. Ai tre destinatari.

**TL**: E quante email totali?

**JN**: 847 per 3. Quindi 2541 email.

**TL**: E il PM?

**JN**: Il PM ha chiamato 12 volte.

**TL**: E il CTO?

**JN**: Il CTO ha chiamato 8 volte.

**TL**: E il CEO?

**JN**: Il CEO ha chiamato 3 volte. E ha mandato un'email con oggetto: "PERCHÉ???"

**TL**: E tu cosa hai risposto?

**JN**: Non ho risposto. Ho fixato.

**TL**: E come?

**JN**: Ho ucciso il processo.

**TL**: E poi?

**JN**: Ho rimosso il cron job.

**TL**: E lo script?

**JN**: Ho rimosso il `while true`.

**TL**: E il loop?

**JN**: Ho aggiunto un timeout.

**TL**: E le email?

**JN**: Le email... sono già partite.

**TL**: E non si possono fermare?

**JN**: No. Sono già nella coda di SendGrid.

**TL**: E quando finiranno?

**JN**: Quando SendGrid le avrà mandate tutte.

**TL**: E quanto tempo?

**JN**: SendGrid ha un rate limit di 1000 email all'ora.

**TL**: E quindi?

**JN**: E quindi ci vorranno circa 3 ore.

**TL**: E in queste 3 ore?

**JN**: In queste 3 ore, il PM, il CTO e il CEO riceveranno 2541 email.

**TL**: E poi?

**JN**: E poi ci odieranno.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il telefono. Il telefono squillava. Era il PM. Era il CTO. Era il CEO. Erano tutti. E tutti erano arrabbiati. Come tutti quelli che ricevono 847 email identiche. Come tutti quelli che hanno un JN nel team. Come tutti... nel mondo dello sviluppo. Amen.

---

**Venerdì - 18:00**

Abbiamo fixato. Abbiamo scusato. Abbiamo... sopravvissuto.

**JN**: Ho rimosso tutti i report duplicati dal database.

**TL**: E le email?

**JN**: Le email sono state mandate. Tutte.

**TL**: E le risposte?

**JN**: Il PM ha risposto: "MAI PIÙ".

**TL**: E il CTO?

**JN**: Il CTO ha risposto: "VI VOGLIO BENE. MA VI ODIO."

**TL**: E il CEO?

**JN**: Il CEO ha risposto: "Questo è il motivo per cui ho un assistente. Per gestire le email. E ora il mio assistente mi odia. E io odio voi. Grazie."

**TL**: E ora?

**JN**: Ora il cron job è corretto. Lo script è corretto. E non succederà più.

**TL**: E come fai a saperlo?

**JN**: Perché ho imparato. I cron job non sono semplici. I cron job sono pericolosi. E i loop infiniti sono il diavolo.

**TL**: E la lezione?

**JN**: La lezione è: testare. Sempre. Prima di mettere in produzione.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava l'orologio. Erano le 18:05. E il venerdì era finito. Come tutti i venerdì che finiscono con un disastro. Come tutti i venerdì che finiscono con un JN. Come tutti i venerdì... del mondo. Amen.

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 10 ore. Ho dormito come non dormivo da... giovedì. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: I cron job non sono semplici.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: `* * * * *` significa "ogni minuto". Non "ogni giorno".

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che i loop infiniti non vanno negli script di automazione. Mai. Per nessun motivo. In nessuna circostanza. Perché un loop infinito in un cron job è come un cancro. Cresce. Si moltiplica. E uccide. Il server. Il database. E la tua reputazione. E la reputazione del team. E la reputazione... dell'azienda. E il CEO ha un assistente. E l'assistente ti odia. E il CEO ti odia. E tutti ti odiano. Perché hai mandato 2541 email. In un'ora. A tre persone. Che ora ti odiano. Per sempre. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #CRON-001: Il Cron Job Che Girava Ogni Secondo

**Data incident**: Giovedì 27 marzo 2027, 09:00
**Autore**: JN
**Cron configurato**: `* * * * *` (errore: doveva essere `0 9 * * *`)
**Significato errato**: "Ogni minuto" invece di "Ogni giorno alle 9:00"
**Loop nello script**: `while true` senza condizione di uscita
**Esecuzioni script**: 847
**Email mandate**: 2541 (847 × 3 destinatari)
**Destinatari**: PM, CTO, CEO
**Reazione PM**: "MAI PIÙ"
**Reazione CTO**: "VI VOGLIO BENE. MA VI ODIO."
**Reazione CEO**: "Il mio assistente mi odia. E io odio voi."
**Tempo per fixare**: 4 ore
**Weekend rovinato**: Parzialmente
**Lezione imparata**: I cron job sono pericolosi
**Probabilità che succeda di nuovo**: 100% (da parte di un altro JN)

**Regole per il futuro**:
1. `* * * * *` = ogni minuto, NON ogni giorno
2. `0 9 * * *` = ogni giorno alle 9:00
3. `*/1` = ogni 1 minuto, NON una volta sola
4. Mai `while true` negli script di automazione
5. Sempre un timeout nei loop
6. Sempre testare il cron job prima di attivarlo
7. Sempre loggare le esecuzioni
8. Sempre avere un modo per fermare il cron job
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che un asterisco può rovinare una giornata. E che 2541 email possono rovinare una reputazione."

**ME**: Sì. E la lezione più importante è questa: i cron job sono silenziosi. Finché non lo sono più. E quando non lo sono più, è troppo tardi. Le email sono partite. Il server è morto. E il CEO ti odia. Per sempre. Ma hai imparato. E la prossima volta, controllerai la sintassi. Controllerai il loop. Controllerai... tutto. Perché i cron job non perdonano. E i JN imparano. Sulla pelle. Degli altri. E sulla propria. Amen.

---

## Il costo del cron job mal configurato

| Voce | Valore |
|------|--------|
| Cron configurato | `* * * * *` (errato) |
| Cron corretto | `0 9 * * *` |
| Esecuzioni script | 847 |
| Email mandate | 2541 |
| Destinatari | 3 (PM, CTO, CEO) |
| Chiamate PM | 12 |
| Chiamate CTO | 8 |
| Chiamate CEO | 3 |
| Email CEO oggetto | "PERCHÉ???" |
| Tempo per fixare | 4 ore |
| Server CPU | 98% |
| Server memoria | 95% |
| Report duplicati nel DB | 847 |
| Lezione imparata | I cron job sono pericolosi |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **2541 email + 3 persone che ti odiano** |

**Morale**: I cron job non sono semplici. La sintassi `* * * * *` significa "ogni minuto", non "ogni giorno". E `*/1` significa "ogni 1 minuto", non "una volta sola". E se metti un loop infinito in uno script che gira ogni minuto... beh. Buon divertimento. Perché il server morirà. Il database si riempirà. E manderai 2541 email a tre persone che ti odieranno per sempre. E il CEO ha un assistente. E l'assistente ti odia. E tutti ti odiano. Perché non hai controllato la sintassi. Non hai testato lo script. Non hai... pensato. E i cron job non perdonano. Mai. Per nessun motivo. In nessuna circostanza. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](57-la-cache-invalidation-che-ha-rotto-tutto.md)]**
