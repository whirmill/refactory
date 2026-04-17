# La Cache Che Non Scadeva Mai

**Data**: 12/09/2026

**[Home](../index.md) | [Precedente](81-il-regex-che-ha-mangiato-la-cpu.md)]**

---

C'è una verità nel mondo della cache. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `cache.set(key, value)` pensando "tanto la cache si svuota da sola". Quella verità è: **"Una cache è come un frigorifero. Puoi metterci dentro la roba. Puoi tirarla fuori. Ma se non la svuoti mai, la roba marcisce. E i dati marciscono. E le API restituiscono il vecchio. E gli utenti vedono il vecchio. E il vecchio è sbagliato. E il business perde soldi. E tu guardi il log. E vedi la cache hit. E pensi che tutto funzioni. Ma la cache ha dati vecchi. E i dati vecchi sono veleno. E il veleno si propaga. E gli utenti vedono prezzi sbagliati. E comprano al prezzo sbagliato. E il business perde. E tu guardi. E non capisci. Perché la cache funziona. Ma la cache non scade. Mai. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"La cache senza TTL è come un tumore. Cresce. Occupa spazio. Non muore mai. E i dati dentro invecchiano. E invecchiano. E invecchiano. Finché non sono più validi. Ma la cache li serve ancora. E il sistema serve il vecchio. E il vecchio è sbagliato. E gli utenti vedono il sbagliato. E comprano il sbagliato. E il business perde. E tu guardi la cache. E vedi hit rate al 99%. E pensi che tutto funzioni. Ma il 99% è veleno. Perché il 99% è vecchio. E il vecchio non scade. Mai. Amen"**. E questa è la storia di chi ha dimenticato il TTL. Di chi ha guardato la cache crescere. Di chi ha visto il business morire. Un dato vecchio alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Il sito è lento.

**ME**: Lento?

**PM**: Sì. Le pagine impiegano 5 secondi.

**ME**: 5 secondi?

**PM**: Sì. E gli utenti si lamentano.

**ME**: E cosa dobbiamo fare?

**PM**: Velocizzare.

**ME**: E come?

**PM**: Con la cache.

**ME**: Cache?

**PM**: Sì. Metti tutto in cache.

**ME**: Tutto?

**PM**: Sì. I prodotti. I prezzi. Le disponibilità. Tutto.

**ME**: E se i dati cambiano?

**PM**: Cambiano raramente.

**ME**: E se cambiano?

**PM**: Allora... aggiorni la cache.

**ME**: E come?

**PM**: Quando cambiano.

**ME**: E se me ne dimentico?

**PM**: Non te ne dimentichi.

**ME**: E se me ne dimentico?

**PM**: Allora... prega.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con la cache. Il nulla che era la mia attenzione al TTL. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Piano**

Il martedì, ho pianificato. Ho pianificato la cache. Ho pianificato... il nulla.

**ME**: Ho scelto Redis per la cache.

**TL**: Redis?

**ME**: Sì. È veloce. È semplice.

**TL**: E il TTL?

**ME**: TTL?

**TL**: Sì. Time To Live. La scadenza.

**ME**: Non ci ho pensato.

**TL**: Non ci hai pensato?

**ME**: No. Pensavo di aggiornare la cache quando cambiano i dati.

**TL**: E se non la aggiorni?

**ME**: La aggiorno.

**TL**: E SE NON LA AGGIORNI?

**ME**: Allora... i dati sono vecchi.

**TL**: E se i dati sono vecchi?

**ME**: Allora... gli utenti vedono il vecchio.

**TL**: E se vedono il vecchio?

**ME**: Allora... c'è un problema.

**TL**: E QUALE PROBLEMA?

**ME**: Non lo so. Dipende dai dati.

**TL**: E SE I DATI SONO I PREZZI?

**ME**: Allora... vedono prezzi vecchi.

**TL**: E SE I PREZZI VECCHI SONO PIÙ BASSI?

**ME**: Allora... comprano al prezzo vecchio.

**TL**: E NOI PERDIAMO SOLDI.

**ME**: Sì.

**TL**: E QUANTI?

**ME**: Non lo so. Dipende.

**TL**: E SE È UN PREZZO DI €100 IN MENO?

**ME**: Allora perdiamo €100 per vendita.

**TL**: E SE SONO 1000 VENDITE?

**ME**: €100.000.

**TL**: E SE SONO 10.000 VENDITE?

**ME**: €1.000.000.

**TL**: E QUINDI?

**ME**: E quindi... metto il TTL.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
redis-cli
127.0.0.1:6379> SET product:123 '{"price": 99.99}'
OK
127.0.0.1:6379> TTL product:123
(integer) -1
```

E il TTL era -1. E -1 significa "mai". E "mai" significa che la cache non scade. Mai. E i dati vecchi restano. Per sempre. Amen.

---

**Mercoledì - Il Codice**

Il mercoledì, ho scritto. Ho scritto la cache. Ho scritto... il disastro.

**ME**: Ho implementato la cache.

**TL**: Fammi vedere.

```python
# cache_service.py
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_product(product_id):
    # Check cache first
    cached = redis_client.get(f"product:{product_id}")
    if cached:
        return json.loads(cached)
    
    # Cache miss - get from database
    product = db.query(f"SELECT * FROM products WHERE id = {product_id}")
    
    # Store in cache
    redis_client.set(f"product:{product_id}", json.dumps(product))
    
    return product

def get_all_products():
    # Check cache first
    cached = redis_client.get("products:all")
    if cached:
        return json.loads(cached)
    
    # Cache miss - get from database
    products = db.query("SELECT * FROM products")
    
    # Store in cache
    redis_client.set("products:all", json.dumps(products))
    
    return products

def get_prices():
    # Check cache first
    cached = redis_client.get("prices:all")
    if cached:
        return json.loads(cached)
    
    # Cache miss - get from database
    prices = db.query("SELECT id, price FROM products")
    
    # Store in cache
    redis_client.set("prices:all", json.dumps(prices))
    
    return prices
```

**TL**: ...

**ME**: Cosa?

**TL**: NON HAI MESSO IL TTL.

**ME**: Il TTL?

**TL**: SÌ! IL TIME TO LIVE!

**ME**: Ah. Pensavo di metterlo dopo.

**TL**: DOPO?

**ME**: Sì. Dopo aver testato.

**TL**: E SE DEPLOYI SENZA TTL?

**ME**: Non deployo senza TTL.

**TL**: E SE TI DIMENTICHI?

**ME**: Non mi dimentico.

**TL**: E SE TI DIMENTICHI?

**ME**: Allora... prego.

**TL**: E SE LA CACHE HA DATI VECCHI?

**ME**: Allora... gli utenti vedono il vecchio.

**TL**: E SE IL VECCHIO È SBAGLIATO?

**ME**: Allora... c'è un problema.

**TL**: E IL PROBLEMA È?

**ME**: Non lo so. Dipende.

**TL**: DIPENDE?

**ME**: Sì. Dai dati.

**TL**: E SE I DATI SONO I PREZZI?

**ME**: Allora... prezzi sbagliati.

**TL**: E SE I PREZZI SONO PIÙ BASSI?

**ME**: Allora... perdiamo soldi.

**TL**: E QUANTI?

**ME**: Non lo so.

**TL**: E SE SONO TANTI?

**ME**: Allora... tanti soldi.

**TL**: E IL CEO?

**ME**: Il CEO si arrabbia.

**TL**: E TU?

**ME**: Io... scrivo 1.000 volte.

Il TL mi ha guardato. Io guardavo il codice. Il codice non aveva TTL. E senza TTL, la cache non scade. E se non scade, i dati vecchi restano. E i dati vecchi sono veleno. Amen.

---

**Giovedì - Il Deploy**

Il giovedì, ho deployato. Ho deployato la cache. Ho deployato... il disastro.

**ME**: Ho deployato.

**TL**: Con il TTL?

**ME**: Sì.

**TL**: Fammi vedere.

```python
# cache_service.py (updated)
def get_product(product_id):
    cached = redis_client.get(f"product:{product_id}")
    if cached:
        return json.loads(cached)
    
    product = db.query(f"SELECT * FROM products WHERE id = {product_id}")
    redis_client.set(f"product:{product_id}", json.dumps(product), ex=3600)  # 1 hour TTL
    
    return product
```

**TL**: Hai messo 1 ora di TTL?

**ME**: Sì.

**TL**: E per gli altri?

**ME**: Quelli... non li ho aggiornati.

**TL**: NON LI HAI AGGIORNATI?

**ME**: No. Solo il prodotto singolo.

**TL**: E get_all_products?

**ME**: Quello... non ha TTL.

**TL**: E get_prices?

**ME**: Quello... non ha TTL.

**TL**: E QUINDI?

**ME**: E quindi... alcuni hanno TTL. Alcuni no.

**TL**: E QUALI NON HANNO TTL?

**ME**: get_all_products e get_prices.

**TL**: E get_prices COSA FA?

**ME**: Restituisce i prezzi.

**TL**: I PREZZI?

**ME**: Sì.

**TL**: E NON HA TTL?

**ME**: No.

**TL**: E SE I PREZZI CAMBIANO?

**ME**: Allora... la cache ha i vecchi.

**TL**: E GLI UTENTI VEDONO I VECCHI?

**ME**: Sì.

**TL**: E COMPRANO AI VECCHI PREZZI?

**ME**: Sì.

**TL**: E NOI PERDIAMO SOLDI?

**ME**: Sì.

**TL**: E QUANTI?

**ME**: Non lo so.

**TL**: E SE È UNA PROMOZIONE?

**ME**: Allora... tanti.

Il TL mi ha guardato. Io guardavo il codice. Il codice aveva TTL solo per alcuni endpoint. E get_prices non aveva TTL. E get_prices restituiva i prezzi. E i prezzi erano soldi. E i soldi persi erano tanti. Amen.

---

**Venerdì - 09:00**

Il venerdì, il PM ha chiamato. Il PM voleva. E io... non sapevo.

**PM**: Abbiamo un problema.

**ME**: Quale?

**PM**: I prezzi sono sbagliati.

**ME**: Sbagliati?

**PM**: Sì. Gli utenti vedono prezzi vecchi.

**ME**: Vecchi?

**PM**: Sì. I prezzi della settimana scorsa.

**ME**: E cosa è successo?

**PM**: Abbiamo cambiato i prezzi ieri.

**ME**: Ieri?

**PM**: Sì. C'era un rincaro. €50 in più su tutto.

**ME**: E la cache?

**PM**: La cache ha i vecchi prezzi.

**ME**: E gli utenti?

**PM**: Gli utenti vedono i vecchi prezzi.

**ME**: E comprano?

**PM**: Sì. Al prezzo vecchio.

**ME**: E noi?

**PM**: Noi perdiamo €50 per vendita.

**ME**: E quante vendite?

**PM**: 500 da ieri.

**ME**: 500?

**PM**: Sì.

**ME**: E quindi?

**PM**: €25.000 persi.

**ME**: €25.000?

**PM**: Sì. E continua.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia attenzione. Il nulla che era il TTL mancante. Il nulla... che erano €25.000 persi. Amen.

---

**Venerdì - 09:30**

Ho controllato. Ho controllato la cache. Ho controllato... l'orrore.

**TERMINALE**:
```
redis-cli
127.0.0.1:6379> GET prices:all
"[{\"id\": 1, \"price\": 99.99}, {\"id\": 2, \"price\": 149.99}, ...]"

127.0.0.1:6379> TTL prices:all
(integer) -1

127.0.0.1:6379> DBSIZE
(integer) 1523

127.0.0.1:6379> INFO memory
used_memory: 524288000
used_memory_human: 500.00M
```

**ME**: La cache ha 500MB di dati.

**TL**: 500MB?

**ME**: Sì. E non scadono mai.

**TL**: MAI?

**ME**: Mai. TTL -1.

**TL**: E I PREZZI?

**ME**: I prezzi sono vecchi.

**TL**: E QUANTO VECCHI?

**ME**: Non lo so. Forse una settimana.

**TL**: E IN UNA SETTIMANA QUANTI PREZZI SONO CAMBIATI?

**ME**: Tutti. C'è stato un rincaro.

**TL**: E QUINDI?

**ME**: E quindi tutti i prezzi nella cache sono sbagliati.

**TL**: E GLI UTENTI VEDONO I PREZZI SBAGLIATI?

**ME**: Sì.

**TL**: E COMPRANO AI PREZZI SBAGLIATI?

**ME**: Sì.

**TL**: E NOI PERDIAMO SOLDI?

**ME**: Sì.

**TL**: E QUANTI?

**ME**: €50 per vendita.

**TL**: E QUANTE VENDITE?

**ME**: 500 da ieri.

**TL**: E QUINDI?

**ME**: €25.000.

**TL**: E CONTINUA?

**ME**: Sì. Finché non fixo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cache: 500MB
- TTL: -1 (mai)
- Prezzi: vecchi di una settimana
- Perdite: €25.000

E la cache non scadeva. E i prezzi erano vecchi. E gli utenti compravano al prezzo sbagliato. E noi perdevamo soldi. Amen.

---

**Venerdì - 10:00**

Ho fixato. Ho fixato la cache. Ho fixato... quasi tutto.

**ME**: Ho aggiunto il TTL a get_prices.

**TL**: Fammi vedere.

```python
# cache_service.py (fixed)
def get_prices():
    cached = redis_client.get("prices:all")
    if cached:
        return json.loads(cached)
    
    prices = db.query("SELECT id, price FROM products")
    redis_client.set("prices:all", json.dumps(prices), ex=300)  # 5 minutes TTL
    
    return prices
```

**TL**: 5 minuti?

**ME**: Sì. I prezzi cambiano spesso.

**TL**: E get_all_products?

**ME**: Anche quello. 1 ora.

**TL**: E ora?

**ME**: Ora la cache scade.

**TL**: E I VECCHI DATI?

**ME**: Li cancello.

**TERMINALE**:
```
redis-cli
127.0.0.1:6379> DEL prices:all
(integer) 1

127.0.0.1:6379> DEL products:all
(integer) 1
```

**ME**: Fatto. Cancellati.

**TL**: E ORA?

**ME**: Ora la cache si riempie con i nuovi dati.

**TL**: E I PREZZI SONO CORRETTI?

**ME**: Sì.

**TL**: E GLI UTENTI VEDONO I PREZZI CORRETTI?

**ME**: Sì.

**TL**: E NOI NON PERDIAMO PIÙ SOLDI?

**ME**: Sì.

**TL**: E I €25.000 PERSI?

**ME**: Quelli... sono persi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Cache: svuotata
- TTL: configurato
- Prezzi: corretti

E la cache era fixata. Ma i €25.000 erano persi. E il CEO stava arrivando. Amen.

---

**Venerdì - 14:00**

Il CEO. Il CEO in ufficio. Il CEO... che punì.

**CEO**: Quindi mi stai dicendo che hai dimenticato il TTL?

**ME**: Sì.

**CEO**: E LA CACHE HA TENUTO I VECCHI PREZZI?

**ME**: Sì.

**CEO**: E GLI UTENTI HANNO COMPRATO AI VECCHI PREZZI?

**ME**: Sì.

**CEO**: E NOI ABBIAMO PERSO €25.000?

**ME**: Sì.

**CEO**: E TUTTO PERCHÉ NON HAI MESSO UN NUMERO?

**ME**: Sì.

**CEO**: UN NUMERO?

**ME**: Sì. Il TTL.

**CEO**: E SAI COSA FARAI?

**ME**: Cosa?

**CEO**: Scriverai 1.000 volte: "Non dimenticherò mai il TTL sulla cache".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

**ME**: E i €25.000?

**CEO**: Quelli sono persi. Ma tu impari. Perché la cache senza TTL è come un frigorifero senza corrente. I dati marciscono. E i dati marci sono veleno. E il veleno uccide il business. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché la cache non perdona. E il CEO nemmeno. Amen.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che era il TTL dimenticato. Scritto senza pensare. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non dimenticherò mai il TTL sulla cache.
Non dimenticherò mai il TTL sulla cache.
Non dimenticherò mai il TTL sulla cache.
...
(997 righe dopo)
...
Non dimenticherò mai il TTL sulla cache.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più dimenticato il TTL.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che la cache senza TTL è pericolosa.

**TL**: E cos'altro?

**ME**: Che i dati vecchi sono veleno.

**TL**: E cos'altro?

**ME**: Che €25.000 persi sono tanti.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che la cache è uno strumento. E gli strumenti vanno usati bene. E se non li usi bene, ti si ritorcono contro. E la cache senza TTL è come un tumore. Cresce. Occupa spazio. Non muore mai. E i dati dentro invecchiano. E invecchiano. E invecchiano. Finché non sono più validi. Ma la cache li serve ancora. E il sistema serve il vecchio. E il vecchio è sbagliato. E gli utenti vedono il sbagliato. E comprano il sbagliato. E il business perde. E tu guardi la cache. E vedi hit rate al 99%. E pensi che tutto funzioni. Ma il 99% è veleno. Perché il 99% è vecchio. E il vecchio non scade. Mai. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché la cache non perdona. E il CEO nemmeno. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non dimenticherò mai il TTL sulla cache". E sapevo che le avrei mantenute. Perché la cache non perdona. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #CACHE-001: La Cache Che Non Scadeva Mai

**Data incident**: Venerdì 11 settembre 2026, 09:00
**Autore**: ME
**Cache**: Redis
**Dati cachati**: Prodotti, prezzi, disponibilità
**TTL configurato**: Solo per get_product (1 ora)
**TTL mancante**: get_all_products, get_prices
**Dimensione cache**: 500MB
**Età dati**: 1 settimana
**Prezzi cambiati**: Tutti (+€50 rincaro)
**Vendite con prezzo sbagliato**: 500
**Perdita per vendita**: €50
**Perdita totale**: €25.000
**Tempo di esposizione**: 24 ore
**Soluzione**: Aggiunto TTL (5 min per prezzi, 1 ora per prodotti)
**Punizione**: 1.000 volte "Non dimenticherò mai il TTL sulla cache"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "La cache è uno strumento. Usalo bene."
**Reazione TL**: "I dati vecchi sono veleno."
**Reazione PM**: "I prezzi erano sbagliati!"
**Lezione imparata**: CACHE = TTL + INVALIDAZIONE + MONITORAGGIO
**Probabilità che succeda di nuovo**: 12% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. SEMPRE il TTL sulla cache. SEMPRE.
2. I prezzi hanno TTL breve (5 minuti).
3. I prodotti hanno TTL medio (1 ora).
4. I dati statici hanno TTL lungo (1 giorno).
5. I dati dinamici NON vanno in cache. O con TTL brevissimo.
6. La cache va monitorata. Hit rate + età dati.
7. I dati vecchi sono veleno.
8. €25.000 persi = 1.000 righe a mano.
9. Il CEO non perdona.
10. 1.000 volte a mano. Ricordalo.

**Cache TTL best practices**:
```python
# Prezzi: TTL breve (cambiano spesso)
redis_client.set("prices:all", json.dumps(prices), ex=300)  # 5 minuti

# Prodotti: TTL medio (cambiano ogni tanto)
redis_client.set(f"product:{id}", json.dumps(product), ex=3600)  # 1 ora

# Categorie: TTL lungo (cambiano raramente)
redis_client.set("categories:all", json.dumps(categories), ex=86400)  # 1 giorno

# Sessioni utente: TTL medio
redis_client.set(f"session:{user_id}", json.dumps(session), ex=1800)  # 30 minuti

# MAI senza TTL (a meno che non sia intenzionale)
# MAI TTL -1 (significa "mai")
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che la cache senza TTL è pericolosa. E che i dati vecchi sono veleno. E che €25.000 persi sono tanti. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che la cache è uno strumento. E gli strumenti vanno usati bene. E se non li usi bene, ti si ritorcono contro. E la cache senza TTL è come un tumore. Cresce. Occupa spazio. Non muore mai. E i dati dentro invecchiano. E invecchiano. E invecchiano. Finché non sono più validi. Ma la cache li serve ancora. E il sistema serve il vecchio. E il vecchio è sbagliato. E gli utenti vedono il sbagliato. E comprano il sbagliato. E il business perde. E tu guardi la cache. E vedi hit rate al 99%. E pensi che tutto funzioni. Ma il 99% è veleno. Perché il 99% è vecchio. E il vecchio non scade. Mai. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché la cache non perdona. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: la cache va configurata. Il TTL va messo. I dati vanno monitorati. Mai lasciare la cache senza scadenza. Mai pensare che i dati non cambiano. Mai fidarsi dell'hit rate. Perché l'hit rate alto può essere veleno. E il veleno uccide il business. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché la cache non perdona. E il CEO nemmeno. Amen.

---

## Il costo della cache senza TTL

| Voce | Valore |
|------|--------|
| Cache | Redis |
| Dati cachati | Prodotti, prezzi, disponibilità |
| TTL configurato | Solo get_product (1 ora) |
| TTL mancante | get_all_products, get_prices |
| Dimensione cache | 500MB |
| Età dati | 1 settimana |
| Prezzi cambiati | Tutti (+€50) |
| Vendite con prezzo sbagliato | 500 |
| Perdita per vendita | €50 |
| Perdita totale | €25.000 |
| Tempo di esposizione | 24 ore |
| Soluzione | TTL 5 min per prezzi, 1 ora per prodotti |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Usa bene gli strumenti" |
| Reazione TL | "Dati vecchi = veleno" |
| Reazione PM | "Prezzi sbagliati!" |
| Lezione imparata | TTL + INVALIDAZIONE + MONITORAGGIO |
| **Totale** | **500 vendite sbagliate + €25.000 persi + 1.000 righe a mano** |

**Morale**: La cache va configurata con TTL. Sempre. Senza eccezioni. I dati vecchi sono veleno. E il veleno uccide il business. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché la cache non perdona. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](81-il-regex-che-ha-mangiato-la-cpu.md)]**
