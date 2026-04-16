# Il Backup Che Non Esisteva

**Data**: 04/04/2027

**[Home](../index.md) | [Precedente](58-il-cron-job-che-girava-ogni-secondo.md)]**

---

C'è una verità nel mondo dell'IT. Una verità sacra. Una verità ignorata. Quella verità è: **"I backup sono come le assicurazioni. Non ti servono finché non ti servono. E quando ti servono, è troppo tardi per farli"**. Ma c'è una verità ancora più sacra. Ancora più ignorata. Quella verità è: **"Un backup non testato non è un backup. È una bugia. Una bugia che ti racconti ogni notte. Finché un giorno la bugia muore. E con lei, i tuoi dati"**. E questa è la storia di chi credeva nei backup. Di chi li controllava. O quasi. Di chi ha scoperto che non esistevano. E di chi, forse, ha imparato. O no. Perché i backup sono come la fiducia. La perdi quando meno te lo aspetti. E quando la perdi, perdi tutto. I dati. Il lavoro. La carriera. E la voglia di vivere. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM ha chiamato. Il PM aveva una richiesta. Il PM aveva... paura.

**PM**: Ho bisogno di un report.

**TL**: Che report?

**PM**: Un report sui backup.

**TL**: Backup?

**PM**: Sì. Il cliente vuole sapere se i dati sono sicuri.

**TL**: E perché?

**PM**: Perché hanno letto di un'azienda che ha perso tutto.

**TL**: E vogliono sapere se noi siamo diversi?

**PM**: Sì. Vogliono sapere se abbiamo backup.

**TL**: E noi abbiamo backup. Giusto?

**TL**: ...

**ME**: ...

**JN**: ...

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava... il pannello di amministrazione. E nel pannello c'era scritto: "Backup: Attivo. Ultimo backup: 2 ore fa". E tutti abbiamo sorriso. Perché i backup c'erano. I backup funzionavano. I backup... esistevano. O almeno, così pensavamo. Amen.

---

**Martedì - La Verifica**

Il martedì, abbiamo verificato. Abbiamo aperto il pannello. Abbiamo guardato i log. Abbiamo... creduto.

**JN**: Ho controllato i backup.

**TL**: E?

**JN**: Funzionano.

**TL**: Come fai a saperlo?

**JN**: Il pannello dice "Backup attivo".

**TL**: E i log?

**JN**: I log dicono "Backup completato con successo".

**TL**: E i file?

**JN**: I file?

**TL**: Sì. I file di backup. Dove sono?

**JN**: Non lo so. Il pannello non lo dice.

**TL**: E dove li salva?

**JN**: Non lo so. Il pannello non lo dice.

**TL**: E quanto sono grandi?

**JN**: Non lo so. Il pannello non lo dice.

**TL**: E quindi come fai a sapere che funzionano?

**JN**: Perché il pannello dice "Backup completato con successo".

**TL**: E ti fidi?

**JN**: Sì. Perché dovrebbe mentire?

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il pannello. Il pannello guardava noi. E tutti guardavamo la scritta "Backup completato con successo". Che era verde. Che era rassicurante. Che... non significava nulla. Perché un messaggio verde non è un backup. Un messaggio verde è solo un messaggio. E i messaggi possono mentire. Come le persone. Come i pannelli. Come... tutto. Amen.

---

**Mercoledì - L'Investigazione**

Il mercoledì, abbiamo investigato. Siamo andati oltre il pannello. Siamo andati... nel server.

**TL**: JN, entra nel server.

**JN**: Quale server?

**TL**: Il server di backup.

**JN**: E dov'è?

**TL**: Non lo so. Cerca nei log.

**JN**: Ok. I log dicono: "Backup salvato in /var/backups/".

**TL**: E cosa c'è in /var/backups/?

**JN**: Aspetta... ls -la /var/backups/

**TL**: E?

**JN**: È vuoto.

**TL**: VUOTO?

**JN**: Sì. Completamente vuoto.

**TL**: E i backup?

**JN**: Non ci sono.

**TL**: E il messaggio "Backup completato con successo"?

**JN**: Era una bugia.

**TL**: UNA BUGIA?

**JN**: Sì. Lo script faceva echo "Backup completato con successo" alla fine. Ma non faceva nulla prima.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava la directory vuota. La directory guardava noi. E tutti guardavamo il nulla. Il nulla che era il nostro backup. Il nulla che era la nostra sicurezza. Il nulla... che era la nostra vita. Amen.

---

**Giovedì - La Scoperta**

Il giovedì, abbiamo scoperto. Abbiamo guardato lo script. Abbiamo guardato la cronologia. Abbiamo guardato... il colpevole.

**TL**: Chi ha scritto questo script?

**JN**: Non lo so. Guardiamo la cronologia di git.

**JN**: ...

**TL**: Cosa dice?

**JN**: Dice: "Commit iniziale: setup backup script".

**TL**: E chi ha fatto il commit?

**JN**: Il CTO.

**TL**: IL CTO?

**JN**: Sì. Tre anni fa.

**TL**: E cosa ha scritto?

**JN**: Ha scritto uno script che fa echo "Backup completato con successo".

**TL**: E nient'altro?

**JN**: Nient'altro.

**TL**: E in tre anni nessuno ha controllato?

**JN**: Nessuno.

**TL**: E il pannello?

**JN**: Il pannello legge l'output dello script. E lo script dice "Backup completato con successo". Quindi il pannello mostra "Backup attivo".

**TL**: E i dati?

**JN**: I dati non sono mai stati salvati.

**TL**: MAI?

**JN**: Mai. In tre anni. Mai un backup. Mai una copia. Mai... nulla.

Il TL ha guardato me. Io ho guardato il soffitto. Il soffitto non aveva backup. Il soffitto non aveva dati. Il soffitto... non aveva problemi. A differenza di noi. Che avevamo dati. Che avevamo clienti. Che avevamo... zero backup. Da tre anni. Amen.

---

**Venerdì - L'Emergenza**

Il venerdì, è successo. Quello che doveva succedere. Quello che succede sempre. Quando non hai backup.

**PM**: Il database è sparito.

**TL**: Sparito?

**PM**: Sì. Non c'è più.

**TL**: E i backup?

**PM**: Non ci sono.

**TL**: E i dati?

**PM**: Non ci sono.

**TL**: E il cliente?

**PM**: Il cliente sta chiamando.

**TL**: E cosa dice?

**PM**: Dice: "Dove sono i miei dati?"

**TL**: E tu cosa dici?

**PM**: Non dico nulla. Non so cosa dire.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il database. Il database non c'era più. Era stato cancellato. Da un comando. Un comando sbagliato. Un comando che non avrebbe dovuto essere eseguito. Ma che era stato eseguito. E ora i dati non c'erano più. E i backup non c'erano. E noi eravamo fottuti. Come tutti quelli che non hanno backup. Come tutti quelli che credono ai messaggi verdi. Come tutti... nel mondo dell'IT. Amen.

---

**Venerdì - 14:00**

Abbiamo chiamato il CTO. Il CTO era in riunione. Il CTO era importante. Il CTO... non c'era.

**TL**: CTO, abbiamo un problema.

**CTO**: Che problema?

**TL**: Il database è stato cancellato.

**CTO**: E i backup?

**TL**: Non ci sono.

**CTO**: Come non ci sono?

**TL**: Non esistono. Lo script di backup non faceva nulla.

**CTO**: Non faceva nulla?

**TL**: No. Faceva solo echo "Backup completato con successo".

**CTO**: E chi l'ha scritto?

**TL**: Tu. Tre anni fa.

**CTO**: Io?

**TL**: Sì. Tu.

**CTO**: E non l'hai mai testato?

**TL**: No. Ti sei fidato del messaggio.

**CTO**: E in tre anni nessuno ha controllato?

**TL**: No. Tutti si sono fidati del messaggio.

**CTO**: E ora?

**TL**: Ora non abbiamo dati. Non abbiamo backup. E abbiamo un cliente che vuole sapere dove sono i suoi dati.

**CTO**: E cosa gli diciamo?

**TL**: Non lo so. La verità?

**CTO**: La verità?

**TL**: Sì. Che non abbiamo backup. Che non abbiamo mai avuto backup. Che abbiamo mentito per tre anni. A noi stessi. Al cliente. A tutti.

**CTO**: ...

**TL**: ...

**CTO**: C'è un'altra opzione?

**TL**: Sì. Possiamo dire che è stato un attacco hacker.

**CTO**: Un attacco hacker?

**TL**: Sì. I clienti credono agli attacchi hacker. I clienti non credono all'incompetenza.

**CTO**: E funziona?

**TL**: Sempre.

Il CTO ha guardato il TL. Il TL guardava me. Io guardavo il JN. Il JN guardava il nulla. Il nulla che era il nostro database. Il nulla che erano i nostri backup. Il nulla... che era la nostra carriera. Amen.

---

**Venerdì - 18:00**

Abbiamo recuperato. Quello che si poteva recuperare. Che non era molto.

**JN**: Ho trovato qualcosa.

**TL**: Cosa?

**JN**: Un dump del database. Di tre anni fa.

**TL**: Tre anni fa?

**JN**: Sì. Era nella home del CTO.

**TL**: Nella home del CTO?

**JN**: Sì. Un file che si chiama "backup_test.sql".

**TL**: E cosa contiene?

**JN**: Contiene i dati di tre anni fa.

**TL**: E quanti dati sono?

**JN**: 847 record.

**TL**: E quanti ne avevamo prima?

**JN**: 2.3 milioni.

**TL**: E quindi?

**JN**: E quindi abbiamo perso il 99.96% dei dati.

**TL**: E il cliente?

**JN**: Il cliente ha 2.3 milioni di clienti. E noi abbiamo recuperato 847 record.

**TL**: E cosa gli diciamo?

**JN**: Non lo so. Che abbiamo avuto un attacco hacker?

**TL**: Sì. Quello funziona sempre.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il file. Il file conteneva 847 record. Su 2.3 milioni. Era il 0.04%. Era nulla. Era... tutto quello che avevamo. Amen.

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 3 ore. Ho dormito tra un messaggio al cliente e l'altro. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: I backup vanno testati.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: Un messaggio verde non è un backup. Un messaggio verde è solo un messaggio.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che il CTO non dovrebbe scrivere script di backup. Mai. Per nessun motivo. In nessuna circostanza. Perché il CTO scrive script che fanno echo. E l'echo non è un backup. L'echo è una bugia. Una bugia verde. Che ti fa dormire tranquillo. Per tre anni. Finché un giorno il database sparisce. E tu scopri che l'echo non ha salvato nulla. E hai perso 2.3 milioni di record. E il cliente ti odia. E tu odi te stesso. E tutti odiano tutti. Perché ti sei fidato di un messaggio verde. Senza mai controllare. Senza mai testare. Senza mai... pensare. E ora pensi. Ma è troppo tardi. I dati sono andati. I backup non c'erano. E la tua carriera è finita. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #BACKUP-001: Il Backup Che Non Esisteva

**Data incident**: Venerdì 4 aprile 2027
**Autore script**: CTO (3 anni prima)
**Contenuto script**: echo "Backup completato con successo"
**Backup effettuati**: 0
**Anni senza backup**: 3
**Messaggio pannello**: "Backup attivo" (bugia)
**Database cancellato**: Sì (comando errato)
**Record persi**: 2.299.153
**Record recuperati**: 847 (0.04%)
**Fonte recupero**: File "backup_test.sql" nella home del CTO
**Scusa usata**: "Attacco hacker"
**Cliente convinto**: Parzialmente
**CTO licenziato**: No (è il fondatore)
**Team licenziato**: No (ma ci ha pensato)
**Lezione imparata**: I backup vanno testati
**Probabilità che succeda di nuovo**: 100% (da parte di un altro CTO)

**Regole per il futuro**:
1. I backup vanno testati. Ogni mese. Minimo.
2. Un messaggio verde non è un backup. È solo un messaggio.
3. Lo script di backup deve salvare file. Non solo stampare messaggi.
4. Il CTO non scrive script di infrastruttura.
5. I backup vanno verificati con un restore. Non solo con un ls.
6. Se il backup è di 0 byte, non è un backup.
7. Se il backup non cresce mai, non è un backup.
8. Se il backup ha sempre la stessa data, non è un backup.
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che un backup non testato è una bugia. E che le bugie verdi sono le più pericolose. Perché ti fanno dormire tranquillo. Finché non ti svegli. E scopri che non c'è più nulla."

**ME**: Sì. E la lezione più importante è questa: i backup sono come le assicurazioni. Non ti servono finché non ti servono. E quando ti servono, è troppo tardi per farli. E se non li hai testati, non li hai. È solo una bugia. Una bugia che ti racconti. Che racconti al cliente. Che racconti a tutti. Finché un giorno la bugia muore. E con lei, 2.3 milioni di record. E la tua carriera. E la fiducia del cliente. E tutto. Perché ti sei fidato di un messaggio verde. Senza mai guardare dentro. Senza mai verificare. Senza mai... dubitare. E il dubbio è la virtù del sysadmin. Il dubbio è la virtù del developer. Il dubbio... è la virtù. Punto. Amen.

---

## Il costo del backup inesistente

| Voce | Valore |
|------|--------|
| Anni senza backup | 3 |
| Backup effettuati | 0 |
| Messaggio pannello | "Backup attivo" (bugia) |
| Record totali | 2.300.000 |
| Record persi | 2.299.153 |
| Record recuperati | 847 (0.04%) |
| Fonte recupero | Home del CTO |
| Scusa usata | "Attacco hacker" |
| Cliente convinto | Parzialmente |
| CTO responsabile | Sì |
| CTO licenziato | No (fondatore) |
| Team incolpato | Sì |
| Lezione imparata | Testare i backup |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **2.299.153 record persi + 1 carriera rovinata** |

**Morale**: I backup non testati non sono backup. Sono bugie. Bugie verdi che ti fanno dormire tranquillo. Finché un giorno il database sparisce. E scopri che il tuo backup era solo un echo. Un echo che non ha salvato nulla. E ora hai perso 2.3 milioni di record. E il cliente ti odia. E tu odi te stesso. E tutto perché ti sei fidato di un messaggio. Senza mai verificare. Senza mai testare. Senza mai... pensare. E ora pensi. Ma è troppo tardi. I dati sono andati. I backup non c'erano. E la tua unica speranza è un file nella home del CTO. Che contiene 847 record. Su 2.3 milioni. È il 0.04%. È nulla. Ma è tutto quello che hai. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](58-il-cron-job-che-girava-ogni-secondo.md)]**
