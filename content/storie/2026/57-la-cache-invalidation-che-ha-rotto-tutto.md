# La Cache Invalidation Che Ha Rotto Tutto

**Data**: 21/03/2027

**[Home](../index.md) | [Precedente](56-il-deploy-del-venerdi-pomeriggio.md) | [Prossima](58-il-cron-job-che-girava-ogni-secondo.md)]**

---

C'è una frase famosa nel mondo dello sviluppo software. Una frase attribuita a Phil Karlton. Una frase che ogni developer conosce. Una frase che ogni developer ignora. Quella frase è: **"There are only two hard things in Computer Science: cache invalidation and naming things"**. Ma c'è una cosa ancora più difficile della cache invalidation. Una cosa che nessuno menziona. Una cosa che tutti fanno. Quella cosa è: **"Cache invalidation senza capire cosa stai invalidando"**. E questa è la storia di chi l'ha fatto. Di chi ha cancellato. Di chi ha distrutto. E di chi, forse, ha imparato. O no. Perché la cache è come la memoria. La perdi quando meno te lo aspetti. E quando la perdi, perdi tutto. I dati. I clienti. Il lavoro. E la sanità mentale. Amen.

![](../../img/code.jpg)

---

**Lunedì - Il Problema**

Era lunedì. Il PM ha chiamato. Il PM aveva un problema. Il PM aveva... fretta.

**PM**: Il sito è lento.

**TL**: Quanto lento?

**PM**: Molto lento.

**TL**: E quando?

**PM**: Sempre.

**TL**: E cosa significa "lento"?

**PM**: Significa che i clienti si lamentano.

**TL**: E cosa dicono?

**PM**: Dicono che le pagine ci mettono 10 secondi a caricare.

**TL**: 10 SECONDI?

**PM**: Sì. E alcuni dicono 15.

**TL**: E da quando?

**PM**: Da ieri.

**TL**: Ieri?

**PM**: Sì. Dopo l'ultimo deploy.

**TL**: E cosa abbiamo deployato?

**PM**: Non lo so. Qualcosa.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava i log. I log mostravano... l'inferno. Query lente. Timeouts. Errori. Tutto rosso. Come un Natale in marzo. Ma senza gioia. Senza pace. Senza... speranza.

---

**Martedì - L'Analisi**

Il martedì, abbiamo analizzato. Abbiamo guardato le query. Abbiamo guardato il database. Abbiamo guardato... la cache.

**JN**: Ho trovato il problema.

**TL**: Cosa?

**JN**: La cache.

**TL**: La cache?

**JN**: Sì. La cache non funziona.

**TL**: Non funziona?

**JN**: No. È vuota.

**TL**: Vuota?

**JN**: Sì. Completamente vuota.

**TL**: E perché?

**JN**: Non lo so. Ma il database riceve ogni query. Nessuna cache hit.

**TL**: E questo significa?

**JN**: Significa che ogni richiesta va al database.

**TL**: E il database?

**JN**: Il database sta morendo.

**TL**: Morendo?

**JN**: Sì. CPU al 98%. Memoria al 95%. Query che impiegano 12 secondi.

**TL**: E la cache?

**JN**: La cache è vuota. E non si riempie.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava Redis. Redis guardava noi. E tutti abbiamo capito. La cache era morta. La cache era vuota. La cache... non esisteva più. E senza cache, il sistema moriva. Lentamente. Come tutto. Come sempre.

---

**Mercoledì - L'Investigazione**

Il mercoledì, abbiamo investigato. Abbiamo guardato i log di Redis. Abbiamo guardato la configurazione. Abbiamo guardato... il colpevole.

**JN**: Ho trovato chi ha svuotato la cache.

**TL**: Chi?

**JN**: Il CTO.

**TL**: Il CTO?

**JN**: Sì. Guarda il log.

**TL**: Cosa dice?

**JN**: Dice: "FLUSHALL" eseguito da utente "cto" alle 14:32 di domenica.

**TL**: FLUSHALL?

**JN**: Sì. Il comando che cancella TUTTO.

**TL**: Tutto?

**JN**: Tutto. Ogni chiave. Ogni valore. Ogni... cosa.

**TL**: E perché?

**JN**: Non lo so. Guardiamo il messaggio del commit.

Il JN ha guardato il commit. Il commit era nel repository. Il commit diceva: "Clear cache for fresh data testing".

**TL**: "Clear cache for fresh data testing"?

**JN**: Sì.

**TL**: E l'ha fatto in produzione?

**JN**: Sì.

**TL**: Di domenica?

**JN**: Sì.

**TL**: Senza dircelo?

**JN**: Sì.

**TL**: E poi è andato via?

**JN**: Sì. Il log mostra che si è disconnesso 5 minuti dopo.

Il TL ha guardato me. Io ho guardato il soffitto. Il soffitto era più interessante del disastro. Il soffitto non aveva cache. Il soffitto non aveva CTO. Il soffitto... era perfetto. A differenza del nostro sistema.

---

**Giovedì - La Riunione**

Il giovedì, abbiamo chiamato una riunione. Una riunione con il CTO. Una riunione... difficile.

**CTO**: Quindi mi state dicendo che il sito è lento?

**TL**: Sì.

**CTO**: E perché?

**TL**: Perché la cache è vuota.

**CTO**: E perché è vuota?

**TL**: Perché qualcuno ha eseguito FLUSHALL.

**CTO**: FLUSHALL?

**TL**: Sì. Il comando che cancella tutto.

**CTO**: E chi l'ha eseguito?

**TL**: Tu.

**CTO**: Io?

**TL**: Sì. Domenica alle 14:32.

**CTO**: Ah.

**TL**: Sì. Ah.

**CTO**: E perché?

**TL**: Perché volevi "fresh data testing".

**CTO**: Ah, sì. Stavo testando una cosa.

**TL**: In produzione?

**CTO**: Sì. Non avevo accesso a staging.

**TL**: E hai cancellato TUTTA la cache?

**CTO**: Sì. Volevo dati freschi.

**TL**: E non hai pensato di ricaricarla?

**CTO**: Ricaricarla?

**TL**: Sì. Popolare la cache dopo averla svuotata.

**CTO**: Non sapevo che fosse necessario.

**TL**: NECESSARIO?

**CTO**: Sì. Pensavo che si sarebbe riempita da sola.

**TL**: E in quanto tempo?

**CTO**: Non lo so. Subito?

**TL**: SUBITO?

**CTO**: Sì. Non funziona così?

Il TL ha guardato il CTO. Il CTO guardava il TL. Il TL guardava me. E io guardavo l'orologio. L'orologio non aveva cache. L'orologio non aveva problemi. L'orologio... funzionava. A differenza del nostro sistema.

---

**Venerdì - La Soluzione**

Il venerdì, abbiamo fixato. Abbiamo ripopolato la cache. Abbiamo ottimizzato. Abbiamo... sopravvissuto.

**JN**: Ho creato uno script per ripopolare la cache.

**TL**: E funziona?

**JN**: Sì. Ma ci vuole tempo.

**TL**: Quanto?

**JN**: 6 ore. Per caricare tutti i dati.

**TL**: 6 ORE?

**JN**: Sì. Abbiamo 47 milioni di chiavi.

**TL**: E il database?

**JN**: Il database sta ancora soffrendo.

**TL**: E i clienti?

**JN**: I clienti stanno ancora aspettando.

**TL**: E il CTO?

**JN**: Il CTO è in vacanza.

**TL**: IN VACANZA?

**JN**: Sì. È partito mercoledì sera.

**TL**: E ci ha lasciato qui?

**JN**: Sì. A fixare il suo "fresh data testing".

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava lo script. Lo script girava. Lentamente. Come tutto. Come la cache. Come... la nostra vita.

---

**Venerdì - 18:00**

Lo script ha finito. La cache era piena. Il sistema funzionava. Ma qualcosa non tornava.

**JN**: La cache è piena.

**TL**: E il sito?

**JN**: Il sito è veloce.

**TL**: E i clienti?

**JN**: I clienti sono felici.

**TL**: E allora qual è il problema?

**JN**: Il problema è che i dati sono sbagliati.

**TL**: SBAGLIATI?

**JN**: Sì. Guarda.

Il JN ha girato lo schermo. Lo schermo mostrava il sito. Il sito mostrava... cose strane.

**TL**: Cosa sono questi prezzi?

**JN**: Non lo so. Ma non sono quelli del database.

**TL**: E da dove arrivano?

**JN**: Dalla cache.

**TL**: E perché sono sbagliati?

**JN**: Perché lo script ha caricato i dati di STAGING.

**TL**: STAGING?

**JN**: Sì. Ho usato l'URL sbagliato.

**TL**: E quindi?

**JN**: E quindi la cache ha i prezzi di test.

**TL**: E i clienti?

**JN**: I clienti stanno comprando a prezzi scontati del 90%.

**TL**: 90%?

**JN**: Sì. I prezzi di staging sono scontati del 90%.

**TL**: E quanto abbiamo perso?

**JN**: Non lo so. Ma il PM sta chiamando.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il telefono. Il telefono squillava. Il PM era dall'altra parte. E il PM non era felice. Il PM era... furioso. Come tutti. Come sempre. Come la vita del developer.

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 4 ore. Ho dormito tra un fix e l'altro. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: La cache invalidation è difficile.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: FLUSHALL in produzione è vietato. Per sempre. Senza eccezioni.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che il CTO non dovrebbe avere accesso a Redis. Mai. Per nessun motivo. In nessuna circostanza. Perché il CTO con accesso a Redis è come un bambino con una pistola. Carica. Senza sicura. Puntata verso i piedi. Dei suoi. E il CTO non lo sa. Il CTO pensa di sapere. Il CTO pensa di capire. Il CTO... non capisce. E quando non capisce, cancella. E quando cancella, noi fixiamo. Per sempre. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #CACHE-001: La Cache Invalidation Che Ha Rotto Tutto

**Data incident**: Domenica 14 marzo 2027, 14:32
**Autore**: CTO
**Comando eseguito**: FLUSHALL
**Ambiente**: Produzione (errore: doveva essere staging)
**Chiavi cancellate**: 47 milioni
**Tempo per ripopolare**: 6 ore
**Dati caricati**: Staging (errore: doveva essere produzione)
**Prezzi sbagliati**: Sì, sconto 90%
**Vendite a prezzo sbagliato**: 847 ordini
**Perdita stimata**: €127.000
**CTO in vacanza durante il fix**: Sì
**Weekend rovinato**: Sì
**Lezione imparata**: Mai FLUSHALL in produzione
**Probabilità che succeda di nuovo**: 100% (da parte di un altro CTO)

**Regole per il futuro**:
1. FLUSHALL è vietato in produzione. Per sempre.
2. Il CTO non ha accesso diretto a Redis.
3. La cache va ripopolata DOPO essere stata svuotata.
4. Gli script di cache vanno testati. Sempre.
5. Gli URL di staging e produzione sono DIVERSI. Controllare due volte.
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che la cache è sacra. E FLUSHALL è il diavolo. E che il CTO in vacanza mentre noi fixiamo è la normalità."

**ME**: Sì. E la normalità è questa: la cache invalidation è difficile. La cache popolazione è più difficile. E la cache con i dati sbagliati è un disastro. Un disastro che costa soldi. Un disastro che rovina weekend. Un disastro che... il CTO non vedrà mai. Perché il CTO è in vacanza. E noi siamo qui. A fixare. A documentare. A imparare. Che la cache è come la fiducia. La perdi in un secondo. E la ricostruisci in 6 ore. O in una vita. Dipende da quanto hai cancellato. E da quanto hai perso. E noi abbiamo perso molto. Ma abbiamo imparato. O no. Perché la prossima volta, un altro CTO farà FLUSHALL. E un altro JN fixerà. E il ciclo continuerà. Per sempre. Amen.

---

## Il costo della cache invalidation

| Voce | Valore |
|------|--------|
| Chiavi cancellate | 47 milioni |
| Tempo per ripopolare | 6 ore |
| Dati caricati | Sbagliati (staging) |
| Prezzi mostrati | Scontati 90% |
| Ordini a prezzo sbagliato | 847 |
| Perdita stimata | €127.000 |
| CTO in vacanza | Sì |
| Weekend rovinato | Sì |
| Lezione imparata | Mai FLUSHALL in produzione |
| Accesso CTO a Redis | Revocato |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **€127.000 + 1 weekend sacrificato** |

**Morale**: La cache invalidation è difficile. Ma la cache invalidation senza capire è disastrosa. FLUSHALL in produzione è come giocare alla roulette russa con il tuo business. Solo che invece di una pallottola, hai 47 milioni di chiavi cancellate. E invece di morire, perdi €127.000. E il tuo weekend. E la tua fiducia nel CTO. E la tua fiducia nella cache. E la tua fiducia... in tutto. Perché la cache è sacra. E la cache va rispettata. E la cache non va cancellata. Mai. Per nessun motivo. In nessuna circostanza. E se devi cancellarla, fallo in staging. E se devi farlo in produzione, chiedi. E se non sai chi chiedere, non farlo. E se il CTO lo fa, revocagli l'accesso. Subito. Prima che faccia FLUSHALL. Di nuovo. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](56-il-deploy-del-venerdi-pomeriggio.md) | [Prossima](58-il-cron-job-che-girava-ogni-secondo.md)]**
