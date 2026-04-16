# Il Deploy Del Venerdì Sera

**Data**: 17/01/2027

**[Home](../index.md) | [Precedente](47-la-riunione-che-poteva-essere-una-email.md)]**

---

C'è una regola non scritta nello sviluppo software. Una regola che tutti conoscono. Una regola che tutti rispettano. Una regola che dice: **mai fare deploy di venerdì**. Mai. Per nessun motivo. In nessuna circostanza. Perché il venerdì è il giorno in cui i server sono stanchi. Il venerdì è il giorno in cui i bug si svegliano. Il venerdì è il giorno in cui il karma ti raggiunge. E ti distrugge.

Questa è la storia di un deploy. Un deploy di venerdì. Un deploy che non sarebbe dovuto succedere. Un deploy che è successo. E che ha cambiato tutto. Per sempre.

![](../../img/server.jpg)

---

**Venerdì - 16:47**

Era venerdì. 16:47. Il momento peggiore. Il momento in cui la speranza muore. Il momento in cui il CTO entra nel tuo ufficio.

**CTO**: Dobbiamo fare un deploy.

**TL**: Oggi?

**CTO**: Sì. Ora.

**TL**: Ma è venerdì. 16:47.

**CTO**: E allora?

**TL**: Non si fanno deploy di venerdì.

**CTO**: Chi lo dice?

**TL**: Tutti. Internet. La storia. Il buon senso.

**CTO**: Il buon senso non paga gli stipendi. I clienti pagano gli stipendi. E i clienti vogliono questa feature.

**TL**: Quale feature?

**CTO**: Il pulsante "Acquista Ora" deve essere verde.

**TL**: È già verde.

**CTO**: No. È verde scuro. Loro vogliono verde chiaro.

**TL**: E non può aspettare lunedì?

**CTO**: No. È URGENTE.

**TL**: URGENTE?

**CTO**: Sì. In maiuscolo. Con tre punti esclamativi.

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. Il JN ha guardato il terminale. E tutti abbiamo capito. Eravamo condannati. Condannati a un venerdì sera in ufficio. Condannati a un deploy che non sarebbe finito bene. Condannati a soffrire.

---

**Venerdì - 17:00**

Il JN ha fatto il deploy. Il JN era nuovo. Il JN non sapeva. Il JN credeva nelle procedure. Il JN credeva che tutto sarebbe andato bene.

```bash
git push origin main
```

La CI è partita. I test sono passati. Il build è completato. Il deploy è iniziato. Tutto sembrava perfetto. Tutto sembrava normale. Tutto sembrava... troppo facile.

**JN**: Fatto! Il deploy è andato!

**TL**: Aspetta.

**JN**: Cosa?

**TL**: Aspetta. Sempre. Dopo un deploy. Aspetta 10 minuti. E poi controlla.

**JN**: Ma i test sono passati!

**TL**: I test passano sempre. I test non significano nulla. I test sono illusioni. La realtà è la produzione. E la produzione è... imprevedibile.

Il JN ha aspettato. 10 minuti. Un'eternità. E poi ha controllato.

**JN**: Il sito è... lento.

**TL**: Quanto lento?

**JN**: Molto lento. 30 secondi per caricare.

**TL**: E gli errori?

**JN**: Non lo so. Controllo i log.

Il JN ha aperto i log. I log mostravano errori. Molti errori. Errori che non c'erano prima. Errori che non avevano senso. Errori che parlavano di "timeout". Di "connection refused". Di "database unreachable".

**JN**: Il database... non risponde.

**TL**: Cosa?

**JN**: Il database. Non risponde.

**TL**: E perché?

**JN**: Non lo so.

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. E tutti abbiamo capito. Il venerdì aveva colpito. Il venerdì si era preso la sua vendetta. Il venerdì non perdona.

---

**Venerdì - 17:30**

Il database era morto. Morto stecchito. Morto come le speranze di un weekend tranquillo. Morto come la nostra sanità mentale.

**TL**: Chi ha toccato il database?

**JN**: Io... ho cambiato una query.

**TL**: Quale query?

**JN**: Quella per il pulsante verde.

**TL**: Il pulsante verde richiede una query?

**JN**: Il CTO ha detto che il verde deve essere "dinamico".

**TL**: DINAMICO?

**JN**: Sì. Il verde deve cambiare in base all'ora del giorno.

**TL**: E questo richiede una query?

**JN**: Sì. Una query per ogni utente. Per ogni pagina. Per ogni secondo.

**TL**: E quante query al secondo?

**JN**: 47.000.

**TL**: E il database regge?

**JN**: Reggeva. In staging.

**TL**: E in produzione?

**JN**: In produzione ci sono 47.000 utenti. Non 47.

Il TL ha pianto. Dentro. Perché fuori non si può. Perché sono un professionista. E i professionisti non piangono. I professionisti risolvono problemi. Anche quando i problemi sono causati da pulsanti verdi. Dinamici. Del CTO.

---

**Venerdì - 18:00**

Il CTO ha chiamato. Il CTO voleva sapere. Il CTO voleva aggiornamenti. Il CTO voleva... il pulsante verde.

**CTO**: Com'è andato il deploy?

**TL**: Il database è morto.

**CTO**: Morto?

**TL**: Morto.

**CTO**: E il pulsante?

**TL**: Il pulsante non esiste più. Il sito non esiste più. Niente esiste più.

**CTO**: Ma i clienti?

**TL**: I clienti stanno chiamando.

**CTO**: E cosa dicono?

**TL**: Dicono che il sito non funziona. Dicono che vogliono i loro soldi. Dicono che ci faranno causa.

**CTO**: E possiamo risolvere?

**TL**: Sì. Con un rollback.

**CTO**: Un rollback?

**TL**: Sì. Torniamo alla versione precedente.

**CTO**: Ma il pulsante verde?

**TL**: Il pulsante verde può aspettare.

**CTO**: MA È URGENTE!

**TL**: Più urgente del sito che non funziona?

**CTO**: ...

Silenzio. Il silenzio del CTO che capisce. Il silenzio del CTO che realizza. Il silenzio del CTO che... no, il CTO non capisce mai. Il CTO dice:

**CTO**: E se facciamo un hotfix invece del rollback?

**TL**: Un hotfix?

**CTO**: Sì! Risolviamo il problema e teniamo il pulsante!

**TL**: Ma il problema è il pulsante!

**CTO**: Allora risolvete il pulsante!

**TL**: In che senso?

**CTO**: Fatelo funzionare!

**TL**: Ma richiede 47.000 query al secondo!

**CTO**: E ottimizzate!

**TL**: Ottimizzare richiede tempo!

**CTO**: Quanto tempo?

**TL**: Minimo 4 ore.

**CTO**: 4 ORE? MA SONO LE 18:00!

**TL**: Esatto. E se facciamo un rollback, finiamo in 10 minuti.

**CTO**: Ma il pulsante verde...

**TL**: Il pulsante verde può aspettare lunedì.

**CTO**: LUNEDÌ? MA I CLIENTI...

**TL**: I clienti non possono usare il sito. I clienti non possono comprare. I clienti non possono fare nulla. Perché il sito è morto. Per il pulsante verde. Dinamico. Tuo.

Il CTO ha sospirato. Il CTO ha capito. O forse no. Ma il CTO ha detto:

**CTO**: Ok. Fate il rollback.

---

**Venerdì - 18:15**

Il rollback è stato fatto. Il sito è tornato online. Il pulsante era verde scuro. Non verde chiaro. Non dinamico. Ma funzionante. E i clienti hanno smesso di chiamare. E gli avvocati hanno smesso di scrivere. E tutto è tornato... normale.

O quasi.

Perché il JN aveva imparato. Il JN aveva capito. Il JN aveva sofferto. E il JN ha chiesto:

**JN**: Ma perché non abbiamo testato in staging con 47.000 utenti?

**TL**: Perché in staging non abbiamo 47.000 utenti.

**JN**: E non possiamo simularli?

**TL**: Sì. Ma richiede tempo. E configurazione. E il CTO non vuole spendere tempo in "test eccessivi".

**JN**: E questo è un test eccessivo?

**TL**: Per il CTO, sì. Per noi, no. Per la realtà, decisamente no.

**JN**: E come facciamo a convincere il CTO?

**TL**: Non si convince il CTO. Si sopravvive al CTO. Si fanno i test di nascosto. Si documentano i disastri. Si spera che un giorno il CTO capisca. Ma il CTO non capisce mai. Il CTO impara solo attraverso il dolore. Il dolore degli altri. Sempre degli altri.

---

**Venerdì - 19:00**

Erano le 19:00. Il venerdì sera era andato. Il weekend era iniziato. Ma noi eravamo ancora qui. A documentare. A spiegare. A giustificare.

**TL**: Dobbiamo scrivere il post-mortem.

**JN**: Il cosa?

**TL**: Il post-mortem. Il documento che spiega cosa è successo. Perché è successo. Come evitare che succeda di nuovo.

**JN**: E chi lo legge?

**TL**: Nessuno. Ma dobbiamo scriverlo. È la procedura. È il processo. È... l'azienda.

Il JN ha scritto il post-mortem. Il JN ha documentato tutto. Il pulsante verde. Le 47.000 query. Il database morto. Il rollback. Il venerdì sera perso. Il weekend rovinato.

E il JN ha chiesto: "E ora che facciamo?"

Il TL ha risposto: "Andiamo a casa. Cerchiamo di dormire. E domani... cerchiamo di dimenticare. Ma non dimenticheremo. Perché il venerdì non si dimentica. Il venerdì si ricorda. Per sempre. Come una cicatrice. Come un trauma. Come tutto."

---

**Sabato - La Riflessione**

Il sabato, il JN mi ha chiamato. Il JN non riusciva a dormire. Il JN pensava al pulsante verde. Al database morto. Al venerdì sera.

**JN**: Ma il CTO... non ha capito?

**ME**: No.

**JN**: E perché?

**ME**: Perché il CTO non vive i disastri. Il CTO li ordina. E noi li viviamo. E questa è la differenza.

**JN**: E non possiamo cambiare le cose?

**ME**: Possiamo provarci. Ma è difficile. Il CTO ha il potere. Noi abbiamo il dolore. E il dolore non è potere. Il dolore è solo... dolore.

**JN**: E se rifiutiamo di fare i deploy di venerdì?

**ME**: Allora il CTO ci licenzia. E assume altri JN. Che faranno i deploy di venerdì. E soffriranno. Come noi. Come sempre. Come tutto.

**JN**: E non c'è speranza?

**ME**: La speranza c'è. Ma non è nel CTO. La speranza è in noi. Nel documentare. Nel imparare. Nel non ripetere gli errori. Nel sopravvivere. Un venerdì alla volta.

---

**Domenica - L'Epilogo**

La domenica, il CTO ha mandato un'email. Un'email che diceva:

```
Oggetto: Il pulsante verde

Team,

ho riflettuto sul disastro di venerdì.
Credo che abbiamo imparato tutti una lezione importante.

I deploy di venerdì sono rischiosi.
D'ora in poi, niente più deploy di venerdì.

A meno che non sia URGENTE.

Il CTO
```

Il JN ha letto l'email. Il JN ha guardato il TL. Il TL ha guardato me. Io ho guardato l'email. E tutti abbiamo capito.

"A meno che non sia URGENTE."

Il CTO non aveva imparato. Il CTO non impara mai. Il CTO aggiunge clausole. Aggiunge eccezioni. Aggiunge... nulla. Perché "URGENTE" è sempre. "URGENTE" è tutto. "URGENTE" è il CTO che vuole il pulsante verde. Di venerdì. Alle 16:47. E noi siamo lì. A fare i deploy. A soffrire. A imparare. Che il venerdì non perdona. Mai. Per nessun motivo. In nessuna circostanza. Per sempre. Amen.

---

**2026 - Oggi**

Il pulsante verde è stato implementato. Il lunedì seguente. Con i test appropriati. Con la configurazione corretta. Con 47.000 utenti simulati in staging. E funziona. Il pulsante è verde chiaro. Dinamico. In base all'ora del giorno.

Ma nessuno lo nota. Nessuno lo apprezza. Nessuno sa che è lì. Perché i clienti non guardano il verde del pulsante. I clienti comprano le scarpe. E le scarpe sono le stesse. Verdi o non verdi. Dinamiche o statiche. Il pulsante non cambia nulla. Il pulsante è solo... un pulsante.

Ma il pulsante è costato. Costato un venerdì sera. Costato un weekend. Costato la sanità mentale di un JN. Costato ore di lavoro. Costato... tutto. Per nulla. Come sempre. Come tutto. Come la vita aziendale.

Il JN ha chiesto: "Ma ne è valsa la pena?"

Il TL ha risposto: "No. Ma non importa. Perché il CTO voleva il pulsante. E il CTO ottiene quello che vuole. Sempre. A costo della nostra vita. Del nostro tempo. Della nostra anima. E noi siamo qui. A fare pulsanti. Verdi. Dinamici. Inutili. Per sempre. Amen."

---

## Il costo del deploy di venerdì sera

| Voce | Valore |
|------|--------|
| Ora del deploy | 17:00 |
| Tempo di downtime | 75 minuti |
| Utenti persi durante il downtime | 2.847 |
| Vendite perse | 34.500€ |
| Chiamate al supporto | 847 |
| Ticket aperti | 234 |
| Ore di lavoro extra | 4 |
| Post-mortem scritti | 1 |
| Post-mortem letti | 0 |
| Weekend rovinati | 3 |
| JN traumatizzati | 1 |
| CTO che hanno imparato | 0 |
| Clausole aggiunte all'email | 1 ("A meno che non sia URGENTE") |
| Deploy di venerdì futuri previsti | ∞ |
| Sanità mentale residua | ~1% |

**Morale**: Mai fare deploy di venerdì. Mai. Per nessun motivo. In nessuna circostanza. Nemmeno se il CTO dice che è URGENTE. Nemmeno se è un pulsante verde. Nemmeno se sembra semplice. Perché il venerdì è il giorno del karma. Il giorno in cui tutto va storto. Il giorno in cui i server si ribellano. E tu sei lì. Alle 19:00. Di venerdì. A scrivere post-mortem. Mentre i tuoi amici sono a cena. Mentre la tua famiglia ti aspetta. Mentre la tua vita scorre. Altrove. Senza di te. Perché tu sei qui. A fare deploy. Di venerdì. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](47-la-riunione-che-poteva-essere-una-email.md)]**
