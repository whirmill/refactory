# La Feature Flag Che Nessuno Ricordava

**Data**: 11/04/2027

**[Home](../index.md) | [Precedente](59-il-backup-che-non-esisteva.md) | [Prossima](61-la-query-che-non-aveva-where.md)]**

---

C'è una verità nel mondo del feature flagging. Una verità sacra. Una verità ignorata. Quella verità è: **"Le feature flag sono come gli ospiti a cena. Arrivano, mangiano, e se ne vanno. Ma alcuni non se ne vanno mai. E quelli sono i peggiori"**. Ma c'è una verità ancora più sacra. Ancora più ignorata. Quella verità è: **"Una feature flag dimenticata è come una bomba a orologeria. Solo che l'orologio non ha lancette. E la bomba esplode quando meno te lo aspetti"**. E questa è la storia di chi l'ha dimenticata. Di chi l'ha trovata. Di chi ha visto il sistema morire. E di chi, forse, ha imparato. O no. Perché le feature flag sono come i segreti. Li dimentichi. Ma loro non dimenticano te. E quando tornano, è sempre nel momento peggiore. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM ha chiamato. Il PM aveva una richiesta. Il PM aveva... un'idea.

**PM**: Ho bisogno di una feature.

**TL**: Che feature?

**PM**: Una feature nascosta.

**TL**: Nascosta?

**PM**: Sì. Che solo alcuni clienti vedono.

**TL**: E quali clienti?

**PM**: I clienti premium.

**TL**: E come facciamo a sapere chi è premium?

**PM**: C'è un flag nel database. `is_premium`.

**TL**: E la feature?

**PM**: La feature è un nuovo checkout. Più veloce. Più bello. Più... premium.

**TL**: E quando lo vuoi?

**PM**: Entro venerdì.

**TL**: E come lo gestiamo?

**PM**: Con una feature flag.

**TL**: Una feature flag?

**PM**: Sì. Così possiamo attivarla e disattivarla quando vogliamo.

**TL**: E chi la gestisce?

**PM**: Tu. O il JN. O chiunque.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava... il pannello delle feature flag. E nel pannello c'erano 847 feature flag. 847. E nessuna aveva una descrizione. Nessuna aveva una data di scadenza. Nessuna... aveva senso. Ma questo il PM non lo sapeva. Il PM voleva solo la sua feature. E noi gliel'avremmo data. Perché questo facciamo. Diamo feature. E dimentichiamo. Sempre. Amen.

---

**Martedì - Lo Sviluppo**

Il martedì, il JN ha sviluppato. Ha creato la feature flag. Ha creato il checkout premium. Ha creato... il caos.

**JN**: Ho creato la feature flag.

**TL**: E come si chiama?

**JN**: `premium_checkout_v2`.

**TL**: E cosa fa?

**JN**: Mostra il nuovo checkout ai clienti premium.

**TL**: E come funziona?

**JN**: Controlla il flag `is_premium` nel database.

**TL**: E se il flag è true?

**JN**: Mostra il nuovo checkout.

**TL**: E se è false?

**JN**: Mostra il vecchio checkout.

**TL**: E la feature flag?

**JN**: La feature flag è attiva per tutti.

**TL**: Per tutti?

**JN**: Sì. Ma il codice controlla `is_premium`. Quindi solo i premium vedono il nuovo checkout.

**TL**: E se disattiviamo la feature flag?

**JN**: Allora nessuno vede il nuovo checkout.

**TL**: E se la lasciamo attiva?

**JN**: Allora i premium vedono il nuovo checkout.

**TL**: E per quanto tempo la lasciamo attiva?

**JN**: Non lo so. Fino a quando il PM dice di spegnerla.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il codice. Il codice funzionava. Il codice era pulito. Il codice... era perfetto. Ma la feature flag era lì. Attiva. In attesa. Come tutte le feature flag. Come tutti i problemi. Come... tutto. Amen.

---

**Mercoledì - Il Deploy**

Il mercoledì, abbiamo deployato. Abbiamo messo in produzione. Abbiamo... pregato.

**JN**: Ho deployato.

**TL**: E funziona?

**JN**: Sì. Ho testato con un account premium.

**TL**: E?

**JN**: E il nuovo checkout funziona.

**TL**: E con un account normale?

**JN**: Il vecchio checkout funziona.

**TL**: E la feature flag?

**JN**: La feature flag è attiva.

**TL**: E il PM?

**JN**: Il PM è felice.

**TL**: E il CTO?

**JN**: Il CTO non sa.

**TL**: E il CEO?

**JN**: Il CEO non sa.

**TL**: E quindi?

**JN**: E quindi tutto funziona.

Il TL ha guardato me. Io ho guardato il monitor. Il monitor mostrava le metriche. Le metriche erano verdi. Tutto era verde. Tutto funzionava. Tutto... era perfetto. Ma la feature flag era lì. Attiva. E nessuno l'aveva documentata. Nessuno l'aveva schedulata per la rimozione. Nessuno... ci aveva pensato. Perché nessuno ci pensa mai. Alle feature flag. Ai problemi. Al futuro. Amen.

---

**Giovedì - L'Oblio**

Il giovedì, abbiamo dimenticato. Abbiamo lavorato ad altro. Abbiamo... vissuto.

**PM**: Grazie per la feature.

**TL**: Prego.

**PM**: I clienti premium sono contenti.

**TL**: Bene.

**PM**: Il checkout è più veloce.

**TL**: Bene.

**PM**: E possiamo lasciarlo così?

**TL**: Sì. La feature flag è attiva.

**PM**: E quando la spegniamo?

**TL**: Non lo so. Quando non serve più.

**PM**: E quando non serve più?

**TL**: Non lo so. Mai?

**PM**: Mai?

**TL**: Sì. Se funziona, perché spegnerla?

**PM**: Giusto. Se funziona, lasciala accesa.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il ticket. Il ticket era chiuso. Il ticket diceva: "Feature completata". E la feature era completata. Ma la feature flag era ancora lì. Attiva. Per sempre. Come tutte le feature flag. Come tutti i problemi. Come... tutto. Amen.

---

**Venerdì - La Calma**

Il venerdì, era calma. Tutto funzionava. I clienti erano felici. Il PM era felice. Noi... eravamo felici.

**JN**: Tutto funziona.

**TL**: Sì.

**JN**: Nessun problema.

**TL**: Sì.

**JN**: Possiamo andare a casa presto?

**TL**: Sì.

**JN**: E la feature flag?

**TL**: Quale feature flag?

**JN**: `premium_checkout_v2`.

**TL**: Ah, quella. È ancora attiva.

**JN**: E la spegniamo?

**TL**: No. Funziona. Lasciala accesa.

**JN**: E se un giorno la dimentichiamo?

**TL**: Non la dimenticheremo.

**JN**: E se la dimentichiamo?

**TL**: Non la dimenticheremo.

**JN**: E se?

**TL**: JN, non la dimenticheremo. Fidati.

Il JN ha guardato me. Io ho guardato il TL. Il TL guardava l'orologio. Erano le 17:30. E venerdì. E tutto funzionava. E noi volevamo andare a casa. E la feature flag era lì. Attiva. Dimenticata. Come tutte le feature flag. Come tutti i problemi. Come... tutto. Amen.

---

**Sei Mesi Dopo - Il Risveglio**

Sei mesi dopo. Era un martedì qualunque. Il PM ha chiamato. Il PM aveva un problema. Il PM aveva... panico.

**PM**: IL CHECKOUT È ROTTO.

**TL**: Cosa?

**PM**: IL CHECKOUT. NON FUNZIONA.

**TL**: Quale checkout?

**PM**: TUTTI I CHECKOUT.

**TL**: Tutti?

**PM**: SÌ. I clienti non possono comprare.

**TL**: E da quando?

**PM**: DA STAMATTINA.

**TL**: E cosa è cambiato?

**PM**: NIENTE. NON ABBIAMO CAMBIATO NIENTE.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il monitor. Il monitor mostrava... errori. Tanti errori. Errori nel checkout. Errori nel database. Errori... ovunque.

**JN**: Ho trovato il problema.

**TL**: Cosa?

**JN**: La feature flag.

**TL**: Quale feature flag?

**JN**: `premium_checkout_v2`.

**TL**: E cosa ha?

**JN**: È ancora attiva.

**TL**: E quindi?

**JN**: E quindi il codice cerca una tabella che non esiste più.

**TL**: NON ESISTE PIÙ?

**JN**: No. È stata rimossa tre mesi fa.

**TL**: RIMOSSA?

**JN**: Sì. Nel refactor del database.

**TL**: E la feature flag?

**JN**: La feature flag è ancora attiva.

**TL**: E il codice?

**JN**: Il codice cerca la tabella. La tabella non c'è. E tutto si rompe.

Il TL ha guardato me. Io ho guardato il soffitto. Il soffitto non aveva feature flag. Il soffitto non aveva tabelle. Il soffitto... non aveva problemi. A differenza di noi. Che avevamo una feature flag. Dimenticata. Per sei mesi. Che cercava una tabella. Rimossa. Per tre mesi. E ora tutto era rotto. Amen.

---

**Martedì - 14:00**

Abbiamo investigato. Abbiamo guardato i log. Abbiamo guardato il codice. Abbiamo guardato... il disastro.

**JN**: La feature flag `premium_checkout_v2` è stata creata 6 mesi fa.

**TL**: E chi l'ha creata?

**JN**: Io.

**TL**: E chi ha rimosso la tabella?

**JN**: Il CR.

**TL**: E il CR sapeva della feature flag?

**JN**: No. La feature flag non era documentata.

**TL**: E nel refactor?

**JN**: Il CR ha rimosso la tabella `premium_users`.

**TL**: E la feature flag?

**JN**: La feature flag controllava `is_premium` nella tabella `premium_users`.

**TL**: E la tabella non c'è più?

**JN**: No. Ora `is_premium` è nella tabella `users`.

**TL**: E il codice della feature flag?

**JN**: Il codice cerca ancora `premium_users`.

**TL**: E quindi?

**JN**: E quindi quando un cliente premium prova a fare checkout, il codice cerca la tabella. La tabella non c'è. E tutto si rompe.

**TL**: E perché non l'abbiamo notato prima?

**JN**: Perché il codice aveva un fallback. Se la tabella non c'era, usava il vecchio checkout.

**TL**: E il fallback?

**JN**: Il fallback è stato rimosso la settimana scorsa. In un altro refactor.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il codice. Il codice era un disastro. Il codice era un cimitero. Di feature flag dimenticate. Di fallback rimossi. Di... speranze perdute. Amen.

---

**Martedì - 18:00**

Abbiamo fixato. Abbiamo spento la feature flag. Abbiamo... pianto.

**JN**: Ho spento la feature flag.

**TL**: E il checkout?

**JN**: Il checkout funziona.

**TL**: E i clienti?

**JN**: I clienti possono comprare.

**TL**: E i premium?

**JN**: I premium usano il vecchio checkout.

**TL**: E il PM?

**JN**: Il PM sta chiamando.

**TL**: E cosa dice?

**JN**: Dice: "DOVE È FINITO IL CHECKOUT PREMIUM?"

**TL**: E tu cosa dici?

**JN**: Non dico nulla. Non so cosa dire.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava il telefono. Il telefono squillava. Era il PM. Era il CTO. Era il CEO. Erano tutti. E tutti volevano sapere. Dove era finito il checkout premium. E noi non potevamo dire. Che l'avevamo dimenticato. Che l'avevamo perso. Che non esisteva più. Perché una feature flag dimenticata è come un fantasma. Ti perseguita. Quando meno te lo aspetti. Amen.

---

**Mercoledì - La Spiegazione**

Il mercoledì, abbiamo spiegato. Al PM. Al CTO. Al CEO. A tutti.

**CTO**: Quindi mi state dicendo che la feature flag era attiva da 6 mesi?

**TL**: Sì.

**CTO**: E nessuno l'ha controllata?

**TL**: No.

**CTO**: E la tabella è stata rimossa 3 mesi fa?

**TL**: Sì.

**CTO**: E nessuno ha verificato le dipendenze?

**TL**: No.

**CTO**: E il fallback è stato rimosso la settimana scorsa?

**TL**: Sì.

**CTO**: E nessuno ha testato?

**TL**: No.

**CTO**: E quindi?

**TL**: E quindi tutto si è rotto.

**CTO**: E quanto è durato?

**TL**: 4 ore.

**CTO**: E quante vendite abbiamo perso?

**TL**: Non lo so. Ma il PM dice 847.

**CTO**: 847 VENDITE?

**TL**: Sì. In 4 ore.

**CTO**: E quanto in euro?

**TL**: €42.350.

**CTO**: ...

**TL**: ...

**CTO**: E la feature flag?

**TL**: L'abbiamo spenta.

**CTO**: E il checkout premium?

**TL**: Non esiste più.

**CTO**: E il PM?

**TL**: Il PM vuole il checkout premium.

**CTO**: E cosa gli diciamo?

**TL**: Non lo so. La verità?

**CTO**: La verità?

**TL**: Sì. Che abbiamo dimenticato la feature flag. E che il codice è morto con lei.

Il CTO ha guardato il TL. Il TL guardava me. Io guardavo il JN. Il JN guardava il nulla. Il nulla che era il nostro checkout premium. Il nulla che era la nostra organizzazione. Il nulla... che era la nostra vita. Amen.

---

**Giovedì - La Riflessione**

Giovedì. Ho dormito. Ho dormito 5 ore. Ho dormito tra un fix e l'altro. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Le feature flag vanno documentate.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: Le feature flag vanno spente. Quando non servono più.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che 847 feature flag sono troppe. E che nessuna ha una descrizione. E che nessuna ha una data di scadenza. E che nessuna ha un proprietario. E che quando rimuovi una tabella, devi controllare TUTTE le feature flag. E tutti i codici. E tutti i fallback. E tutto. Perché una feature flag dimenticata è come una mina. Sta lì. In attesa. Per mesi. Per anni. Finché qualcuno ci cammina sopra. E boom. Il checkout si rompe. I clienti non comprano. E perdi €42.350 in 4 ore. E il PM ti odia. E il CTO ti odia. E il CEO ti odia. E tutti ti odiano. Perché hai dimenticato una feature flag. Una feature flag di 6 mesi fa. Che nessuno controllava. Che nessuno documentava. Che nessuno... ricordava. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #FLAG-001: La Feature Flag Che Nessuno Ricordava

**Data incident**: Martedì 7 ottobre 2027, 10:00
**Autore feature flag**: JN
**Data creazione**: 11 aprile 2027
**Mesi attiva**: 6
**Nome feature flag**: `premium_checkout_v2`
**Documentata**: No
**Data scadenza**: Nessuna
**Proprietario**: Nessuno
**Tabella rimossa**: `premium_users` (3 mesi prima)
**Autore rimozione**: CR
**Fallback rimosso**: Sì (1 settimana prima)
**Ore di disservizio**: 4
**Vendite perse**: 847
**Perdita stimata**: €42.350
**Clienti premium colpiti**: 100%
**Reazione PM**: "DOVE È FINITO IL CHECKOUT PREMIUM?"
**Reazione CTO**: "..."
**Reazione CEO**: "..."
**Lezione imparata**: Le feature flag vanno documentate e spente
**Probabilità che succeda di nuovo**: 100%

**Regole per il futuro**:
1. Ogni feature flag deve avere una descrizione.
2. Ogni feature flag deve avere una data di scadenza.
3. Ogni feature flag deve avere un proprietario.
4. Ogni feature flag deve essere recensita ogni mese.
5. Quando si rimuove una tabella, controllare tutte le feature flag.
6. Quando si rimuove un fallback, testare tutte le feature flag.
7. Le feature flag spente vanno rimosse dal codice.
8. Mai lasciare una feature flag attiva "per sempre".
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che una feature flag è come un prestito. La prendi. La usi. E poi devi restituirla. Se non la restituisci, ti perseguita. Per sempre. Con gli interessi."

**ME**: Sì. E gli interessi sono €42.350. E la persecuzione è il PM che chiama ogni ora. E il CTO che ti guarda male. E il CEO che si chiede perché hai perso 847 vendite. E tutto perché hai dimenticato. Hai dimenticato di documentare. Hai dimenticato di spegnere. Hai dimenticato... di pensare. E le feature flag non perdonano. Le feature flag aspettano. Pazienti. Silenziose. Finché un giorno, qualcuno rimuove una tabella. E tutto esplode. E tu sei lì. A chiederti perché. E la risposta è: perché hai dimenticato. E il dimenticare è il nemico. Il nemico del developer. Il nemico del sistema. Il nemico... di tutto. Amen.

---

## Il costo della feature flag dimenticata

| Voce | Valore |
|------|--------|
| Feature flag | `premium_checkout_v2` |
| Data creazione | 11/04/2027 |
| Mesi attiva | 6 |
| Documentata | No |
| Data scadenza | Nessuna |
| Proprietario | Nessuno |
| Tabella rimossa | `premium_users` |
| Fallback rimosso | Sì |
| Ore disservizio | 4 |
| Vendite perse | 847 |
| Perdita stimata | €42.350 |
| Feature flag totali | 847 |
| Feature flag documentate | 0 |
| Lezione imparata | Documentare e spegnere |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **€42.350 + 1 checkout premium perso** |

**Morale**: Le feature flag sono come i prestiti. Le prendi, le usi, e poi devi restituirle. Se non le restituisci, ti perseguitano. Con gli interessi. E gli interessi sono vendite perse. E clienti arrabbiati. E PM che chiamano ogni ora. E CTO che ti guardano male. E CEO che si chiedono perché. E tutto perché hai dimenticato. Hai dimenticato di documentare. Hai dimenticato di spegnere. Hai dimenticato di rimuovere. E la feature flag è rimasta lì. Per 6 mesi. In attesa. Paziente. Silenziosa. Finché un giorno, qualcuno ha rimosso una tabella. E tutto è esploso. E tu hai perso €42.350. E il checkout premium. E la fiducia del PM. E la fiducia del CTO. E la fiducia del CEO. E la fiducia... in te stesso. Perché hai dimenticato. E il dimenticare è il nemico. Il nemico del developer. Il nemico del sistema. Il nemico... di tutto. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](59-il-backup-che-non-esisteva.md)]**
