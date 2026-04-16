# La Cache Che Non Venne Invalidata

**Data**: 16/05/2026

**[Home](../index.md) | [Precedente](64-la-regex-che-fermo-production.md)]**

---

C'è una verità nel mondo della cache. Una verità sacra. Una verità ignorata da chiunque abbia mai detto "mettiamo tutto in cache, tanto è più veloce". Quella verità è: **"La cache è come un frigorifero. Se non lo svuoti ogni tanto, dentro c'è roba vecchia. E la roba vecchia puzza. E se la servi agli utenti, gli utenti se ne accorgono"**. Ma c'è una verità ancora più sacra. Quella verità è: **"Invalidare la cache è facile. Dimenticarsi di invalidarla è ancora più facile. E quando ti dimentichi, succede il disastro"**. E questa è la storia di chi ha aggiunto la cache. Di chi si è dimenticato di invalidarla. Di chi ha servito dati vecchi. A 50.000 utenti. Per 3 giorni. Senza accorgersene. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Il sito è lento.

**ME**: Sì. Lo so.

**PM**: E quanto è lento?

**ME**: 3-4 secondi per pagina.

**PM**: E il cliente?

**ME**: Il cliente si lamenta.

**PM**: E cosa vuole il cliente?

**ME**: Vuole che sia veloce.

**PM**: E quanto veloce?

**ME**: Meno di 1 secondo.

**PM**: E come facciamo?

**ME**: Cache.

**PM**: Cache?

**ME**: Sì. Cache. Mettiamo tutto in cache.

**PM**: E funziona?

**ME**: Sì. La cache è magica.

**PM**: E quanto tempo ci vuole?

**ME**: Un giorno. Forse due.

**PM**: E il cliente quando vede i risultati?

**ME**: Domani.

**PM**: Domani?

**ME**: Sì. Domani.

**PM**: Fallo.

Il PM mi ha guardato. Io ho guardato il nulla. Il nulla che era la mia sanità mentale. Il nulla che era la mia comprensione della cache. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - L'Implementazione**

Il martedì, ho implementato. Ho implementato la cache. Ho implementato... la condanna.

**ME**: Ok. Ho aggiunto Redis.

**TL**: Redis?

**ME**: Sì. Redis per la cache.

**TL**: E cosa cache?

**ME**: Tutto.

**TL**: Tutto?

**ME**: Sì. Le query. Le API. Le pagine. Tutto.

**TL**: E l'invalidazione?

**ME**: L'invalidazione?

**TL**: Sì. Quando i dati cambiano, devi invalidare la cache.

**ME**: Ah. Sì. Ci ho pensato.

**TL**: E?

**ME**: E ho aggiunto l'invalidazione.

**TL**: Dove?

**ME**: Nel modello. Quando si salva, si invalida.

**TL**: E per le API esterne?

**ME**: Le API esterne?

**TL**: Sì. Quelle che chiamiamo per i prezzi.

**ME**: Ah. Quelle.

**TL**: Sì. Quelle.

**ME**: Non le ho invalidate.

**TL**: Non le hai invalidate?

**ME**: No. Perché... non ci ho pensato.

**TL**: E i prezzi quanto durano in cache?

**ME**: 24 ore.

**TL**: 24 ORE?

**ME**: Sì. 24 ore.

**TL**: E se i prezzi cambiano?

**ME**: Allora... restano vecchi per 24 ore.

**TL**: E il cliente?

**ME**: Il cliente vede prezzi vecchi.

**TL**: E se i prezzi scendono?

**ME**: Allora il cliente paga di più.

**TL**: E se i prezzi salgono?

**ME**: Allora noi perdiamo soldi.

**TL**: E ti sembra ok?

**ME**: No. Ma è solo per 24 ore.

**TL**: E in 24 ore quante persone vedono i prezzi?

**ME**: Non lo so. Forse 10.000?

**TL**: E se i prezzi sono sbagliati per 10.000 persone?

**ME**: Allora... abbiamo un problema.

Il TL mi ha guardato. Io guardavo il codice. Il codice guardava me. E io sapevo. Sapevo che era sbagliato. Sapevo che dovevo invalidare. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Mercoledì - Il Deploy**

Il mercoledì, ho deployato. Ho deployato la cache. Ho deployato... il disastro.

**ME**: Ok. Deploy fatto.

**TL**: E la cache?

**ME**: È in production.

**TL**: E l'invalidazione delle API?

**ME**: Non l'ho fatta.

**TL**: Non l'hai fatta?

**ME**: No. Non ho avuto tempo.

**TL**: E i prezzi?

**ME**: Restano in cache per 24 ore.

**TL**: E se cambiano?

**ME**: Allora... succede quello che succede.

**TL**: E cosa succede?

**ME**: Non lo so. Vediamo.

**TL**: Vediamo?

**ME**: Sì. Vediamo.

**TL**: E se va male?

**ME**: Allora lo sistemo.

**TL**: E quanto tempo?

**ME**: Un'ora. Forse due.

**TL**: E in quell'ora?

**ME**: In quell'ora... vediamo.

Il TL mi ha guardato. Io ho guardato il terminale. Il terminale mostrava: "Deploy complete. Status: SUCCESS". E io ho sorriso. Perché il deploy era andato. E la cache era in production. E il sito era veloce. Molto veloce. Ma il TL non sorrideva. Il TL sapeva. Il TL sapeva che qualcosa non andava. E io non sapevo. Non ancora. Amen.

---

**Mercoledì - 14:30**

È arrivato. Quello che il TL temeva. Quello che io ignoravo. Quello che... era inevitabile.

**SLACK**: @here I prezzi sono sbagliati.

**SLACK**: @channel Il cliente vede €50 ma il prezzo reale è €45.

**SLACK**: @everyone I prezzi non si aggiornano!

**ME**: ...

**TL**: Te l'avevo detto.

**ME**: Ma cosa è successo?

**TL**: La cache.

**ME**: La cache?

**TL**: Sì. La cache del cazzo che hai aggiunto.

**ME**: E perché?

**TL**: Perché i prezzi sono cambiati. E la cache non è stata invalidata.

**ME**: E adesso?

**TL**: Adesso 10.000 persone vedono prezzi sbagliati.

**ME**: E cosa facciamo?

**TL**: Invalidiamo la cache.

**ME**: Subito?

**TL**: SUBITO.

Ho aperto Redis. Ho cercato le chiavi. Ho trovato:
- `price:product:123` = €50
- `price:product:456` = €120
- `price:product:789` = €89

E tutti quei prezzi erano vecchi. Vecchi di ore. Vecchi di... errori. Amen.

---

**Mercoledì - 15:00**

Ho invalidato. Ho invalidato tutto. Ma era troppo tardi.

**ME**: Ok. Cache invalidata.

**TL**: E i prezzi?

**ME**: Ora sono corretti.

**TL**: E le persone che hanno visto i prezzi sbagliati?

**ME**: Loro... hanno visto i prezzi sbagliati.

**TL**: E quante sono?

**ME**: Non lo so. Forse 5.000?

**TL**: 5.000 PERSONE?

**ME**: Sì. Forse di più.

**TL**: E cosa hanno fatto?

**ME**: Hanno comprato.

**TL**: Hanno comprato?

**ME**: Sì. Hanno comprato a prezzi sbagliati.

**TL**: E noi?

**ME**: Noi... abbiamo perso soldi.

**TL**: Quanti soldi?

**ME**: Non lo so. Forse €10.000?

**TL**: €10.000?

**ME**: Sì. Forse di più.

**TL**: E il cliente?

**ME**: Il cliente è arrabbiato.

**TL**: E il PM?

**ME**: Il PM sta chiamando.

Il TL mi ha guardato. Io guardavo il telefono. Il telefono mostrava: 23 chiamate perse. 15 messaggi. 7 email. E tutti dicevano la stessa cosa: "I PREZZI SONO SBAGLIATI". E io sapevo. Sapevo che era colpa mia. Sapevo che avrei dovuto invalidare. Sapevo che... la cache non è magica. La cache è una responsabilità. Amen.

---

**Giovedì - La Scoperta**

Il giovedì, abbiamo scoperto. Quello che temevamo. Quello che sapevamo sarebbe successo. Quello che... era già successo.

**CTO**: Quindi mi state dicendo che avete servito prezzi sbagliati a 15.000 utenti?

**TL**: Sì.

**CTO**: Per 3 giorni?

**TL**: Sì.

**CTO**: E il costo?

**TL**: €23.000 di margini persi.

**CTO**: €23.000?

**TL**: Sì. Perché i clienti hanno pagato di meno. E noi abbiamo dovuto onorare i prezzi.

**CTO**: E perché?

**TL**: Perché la cache non era invalidata.

**CTO**: Non era invalidata?

**TL**: No. L'invalidazione non era implementata per le API esterne.

**CTO**: E chi ha implementato la cache?

**TL**: Lui.

**CTO**: E non ha implementato l'invalidazione?

**TL**: No. Ha detto che "non aveva tempo".

**CTO**: Non aveva tempo?

**TL**: Sì. Il PM chiamava.

**CTO**: E il PM sapeva?

**TL**: Il PM non sa cosa è l'invalidazione.

**CTO**: E quindi?

**TL**: E quindi abbiamo perso €23.000. E 15.000 clienti hanno visto prezzi sbagliati. E il nostro brand è danneggiato. E tutto perché non abbiamo invalidato la cache.

Il CTO ha guardato il TL. Il TL guardava me. Io guardavo il JN. Il JN guardava il PM. Il PM guardava il telefono. Il telefono mostrava: "Customer Complaint #847: Price mismatch of €15". Amen.

---

**Venerdì - La Lezione**

Il venerdì, abbiamo imparato. O quasi.

**ME**: TL, sai qual è la lezione?

**TL**: Quale?

**ME**: La cache va invalidata.

**TL**: Sì. Lo so.

**ME**: E sai qual è l'altra lezione?

**TL**: Quale?

**ME**: L'invalidazione va implementata PRIMA di mettere in production.

**TL**: Sì. Lo so anche quello.

**ME**: E sai qual è la lezione più importante?

**TL**: Quale?

**ME**: Che la cache non è magica. La cache è una responsabilità. E se non la gestisci, ti uccide. Ti uccide il brand. Ti uccide i soldi. Ti uccide la carriera. E tutto perché hai pensato: "Tanto è solo cache". Ma la cache non è "solo cache". La cache è dati. E i dati devono essere corretti. E se non sono corretti, succede questo. €23.000 persi. 15.000 clienti arrabbiati. E tu sei lì. A guardare. Senza poter fare nulla. Perché la cache è già servita. E i clienti hanno già visto. E i soldi sono già persi. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #CACHE-001: La Cache Non Invalidata

**Data incident**: Mercoledì 13 maggio 2026, 14:00
**Autore implementazione**: ME
**Tecnologia**: Redis
**TTL cache**: 24 ore
**Invalidazione implementata**: Parziale (solo modelli interni)
**API esterne invalidate**: NO
**Utenti coinvolti**: 15.000
**Prezzi serviti errati**: 847 prodotti
**Durata incident**: 3 giorni
**Costo margini persi**: €23.000
**Reclami clienti**: 847
**Reazione CTO**: "..."
**Reazione CEO**: "Dobbiamo rimborsare?"
**Reazione PM**: "Ma il sito era veloce!"
**Lezione imparata**: Invalidare SEMPRE la cache
**Probabilità che succeda di nuovo**: 87% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. La cache va SEMPRE invalidata quando i dati cambiano.
2. L'invalidazione va implementata PRIMA del deploy.
3. Il TTL deve essere appropriato al tipo di dati.
4. I prezzi non vanno mai in cache per 24 ore.
5. Monitorare sempre la cache hit/miss ratio.
6. Se i dati sono critici, non cachare. O cachare con TTL breve.
7. Il PM non sa cosa è l'invalidazione. Non chiedergli.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che la cache può costare €23.000. E il tuo brand. E forse la tua carriera. Ma l'hai imparato."

**ME**: Sì. E la lezione più importante è questa: la cache è uno strumento. Non una soluzione. E se la usi senza capire, ti uccide. Ti uccide i dati. Ti uccide i soldi. Ti uccide la reputazione. E tutto perché hai pensato: "Tanto è più veloce". Ma veloce e sbagliato è peggio che lento e corretto. Perché i clienti perdonano la lentezza. Ma non perdonano gli errori. E i prezzi sbagliati sono errori. Errori che costano. €23.000. E la tua carriera. E forse l'azienda. Amen.

---

## Il costo della cache non invalidata

| Voce | Valore |
|------|--------|
| Tecnologia cache | Redis |
| TTL impostato | 24 ore |
| Invalidazione API esterne | NO |
| Utenti con prezzi errati | 15.000 |
| Prodotti con prezzi errati | 847 |
| Durata incident | 3 giorni |
| Margini persi | €23.000 |
| Reclami clienti | 847 |
| Reazione CTO | "..." |
| Reazione CEO | "Dobbiamo rimborsare?" |
| Reazione PM | "Ma il sito era veloce!" |
| Lezione imparata | Invalidare SEMPRE |
| **Totale** | **€23.000 + 15.000 clienti arrabbiati + 1 brand danneggiato** |

**Morale**: La cache non è magica. La cache è una responsabilità. E se non la gestisci correttamente, succede questo. Dati vecchi serviti a utenti ignari. Prezzi sbagliati che costano soldi. E un brand che si macchia. E tutto perché hai pensato: "Tanto è solo cache". Ma la cache non è "solo cache". La cache è la verità che servi ai tuoi utenti. E se quella verità è vecchia, è una bugia. E le bugie costano. €23.000. E la tua carriera. E forse l'azienda. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](64-la-regex-che-fermo-production.md)]**
