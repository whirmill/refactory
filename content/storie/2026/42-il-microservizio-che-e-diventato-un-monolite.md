# Il Microservizio Che È Diventato Un Monolite

**Data**: 06/12/2026

**[Home](../index.md) | [Precedente](41-il-refactor-che-non-finisce-mai.md)]**

---

C'era una volta un architettura a microservizi. Era il 2021. Il CTO aveva letto un blog post. Il CTO aveva visto una conferenza. Il CTO aveva avuto un'illuminazione. "I monoliti sono il passato. I microservizi sono il futuro. Dobbiamo migrare. Subito. Oggi. Ora."

E così è iniziata la nostra discesa. Nell'inferno dei microservizi. Dove ogni servizio parla con ogni altro servizio. Dove ogni chiamata è una chiamata HTTP. Dove ogni errore è un errore di rete. Dove ogni deploy è un deploy di 47 container. E dove il monolite che volevamo uccidere è rinato. Più grande. Più complesso. Più... monolite.

![](../../img/code.jpg)

---

**2021 - La Visione**

Il CTO ha convocato tutti. In una call. Alle 9:00 di lunedì. Il momento peggiore. Per le peggiori notizie.

**CTO**: Ho deciso. Migreremo ai microservizi.

**TL**: Tutti?

**CTO**: Tutti.

**ME**: Ma siamo 4 sviluppatori.

**CTO**: E allora?

**ME**: I microservizi richiedono team dedicati. Infrastructure. DevOps. Monitoring. Service mesh. API gateway. Circuit breaker. Distributed tracing. Chaos engineering.

**CTO**: Sì. E?

**ME**: Non abbiamo nessuna di queste cose.

**CTO**: Le costruiremo!

**JN**: Ma non abbiamo nemmeno un DevOps.

**CTO**: Il TL farà da DevOps!

**TL**: Cosa?

**CTO**: E il ME farà da architect!

**ME**: Cosa?

**CTO**: E il JN... il JN imparerà!

**JN**: Imparerò cosa?

**CTO**: Tutto! I microservizi sono il futuro. E il futuro è adesso. Abbiamo 3 mesi. Al via!

Il TL mi ha scritto in privato: "Siamo fottuti."

Ho risposto: "Lo so. Lo so da quando ha detto 'ho letto un blog post'."

---

**Mese 1 - La Frammentazione**

Abbiamo iniziato a spezzare il monolite. Il monolite era un'applicazione Node.js. 47 file. 12.000 righe. Un database PostgreSQL. Un Redis per la cache. Un S3 per i file. Semplice. Funzionante. Comprendibile.

Il CTO ha detto: "Dobbiamo separare i domini."

**CTO**: Quali sono i domini?

**TL**: Utenti, Prodotti, Ordini, Pagamenti, Notifiche.

**CTO**: Perfetto! 5 microservizi!

**ME**: Ma sono tutti collegati. Gli ordini dipendono dagli utenti. I pagamenti dipendono dagli ordini. Le notifiche dipendono da tutto.

**CTO**: Useremo gli eventi!

**ME**: Eventi?

**CTO**: Sì! Event-driven architecture! Quando un ordine viene creato, pubblichiamo un evento. Il servizio pagamenti ascolta. Il servizio notifiche ascolta. Tutto asincrono. Tutto disaccoppiato. Tutto... bello!

Il TL ha sospirato. Un sospiro che ho sentito anche con il microfono spento.

**TL**: Ok. Eventi. Quale message broker usiamo?

**CTO**: RabbitMQ!

**TL**: Chi lo configura?

**CTO**: Tu!

**TL**: Non l'ho mai fatto.

**CTO**: Imparerai!

E il TL ha imparato. Imparato che RabbitMQ è complesso. Imparato che gli eventi si perdono. Imparato che il debugging è impossibile. Imparato che i microservizi sono una bugia. Una bugia che ti fa credere che la complessità sparirà. Ma la complessità non sparisce. La complessità si sposta. E si moltiplica.

---

**Mese 2 - La Realtà**

Avevamo 5 microservizi. Ognuno con il suo database. Ognuno con la sua API. Ognuno con i suoi test. Ognuno con i suoi problemi.

**Servizio Utenti**: Gestiva gli utenti. Ma quando un utente veniva cancellato, gli ordini non lo sapevano. E i pagamenti non lo sapevano. E le notifiche continuavano ad arrivare. A un utente che non esisteva più.

**Servizio Prodotti**: Gestiva i prodotti. Ma quando un prodotto veniva aggiornato, gli ordini mostravano ancora il vecchio prezzo. Perché gli ordini avevano una copia del prodotto. E le copie non venivano aggiornate. Mai.

**Servizio Ordini**: Gestiva gli ordini. Ma per creare un ordine, doveva chiamare il servizio utenti. E il servizio prodotti. E se uno dei due non rispondeva? L'ordine non veniva creato. E l'utente vedeva un errore. E l'utente chiamava il supporto. E il supporto chiamava noi. E noi non sapevamo perché.

**Servizio Pagamenti**: Gestiva i pagamenti. Ma i pagamenti richiedevano gli ordini. E gli ordini richiedevano gli utenti. E gli utenti richiedevano... tutto. E tutto richiedeva tutto. E il circuit breaker scattava. E il fallback veniva chiamato. E il fallback era: "Riprova più tardi."

**Servizio Notifiche**: Gestiva le notifiche. Ma le notifiche richiedevano gli utenti. E gli utenti erano in un altro servizio. E se il servizio utenti era giù? Nessuna notifica. E se il servizio notifiche era giù? Nessuna notifica. E se tutto era giù? Nessuna notifica. E nessuno sapeva nulla.

Il PM ha chiesto: "Perché il sistema è così lento?"

Il TL ha risposto: "Perché ogni operazione richiede 47 chiamate HTTP."

"47?"

"Sì. Per creare un ordine, chiamiamo utenti, prodotti, pagamenti, notifiche. E ognuno di questi chiama altri servizi. E ognuno di questi chiama il database. E il database è lento. E la rete è lenta. E tutto è lento."

"Ma prima non era lento."

"Prima era un monolite. Tutto in memoria. Tutto veloce. Ora è 5 servizi. Tutto in rete. Tutto lento."

"Allora torniamo al monolite?"

"Il CTO non approverebbe mai."

"Allora ottimizziamo!"

"Ottimizzare cosa?"

"Le chiamate! Riduciamole!"

"E come?"

"Non lo so! Sei tu il TL!"

Il TL ha pianto. Dentro. Perché fuori non si può. Perché sono un professionista. E i professionisti non piangono. I professionisti ottimizzano. Anche se l'ottimizzazione è impossibile. Anche se l'architettura è sbagliata. Anche se tutto è sbagliato.

---

**Mese 3 - Il Monolite Rinato**

Il CTO ha chiesto: "Come va la migrazione?"

Il TL ha risposto: "Abbiamo 5 microservizi funzionanti."

"E il monolite?"

"Il monolite è stato eliminato."

"Perfetto! E le performance?"

"Le performance sono... migliorate."

"Migliorate quanto?"

"Non molto."

"Perché?"

"Perché... la latenza di rete."

"La latenza di rete?"

"Sì. Ogni chiamata tra servizi aggiunge latenza."

"Allora riduci le chiamate!"

"Ci stiamo lavorando."

Il TL ci stava lavorando. E la soluzione era: un nuovo servizio. Un servizio che chiamava tutti gli altri servizi. E li aggregava. E li coordinava. E li... monolitizzava.

Il servizio si chiamava `api-gateway`. Ma in realtà era il monolite. Rinato. Con un altro nome. E con più complessità. E con più latenza. E con più problemi.

Il `api-gateway` faceva questo:
1. Riceveva la richiesta dal client
2. Chiamava il servizio utenti
3. Chiamava il servizio prodotti
4. Chiamava il servizio ordini
5. Chiamava il servizio pagamenti
6. Aggregava le risposte
7. Ritornava al client

Era il monolite. Ma distribuito. E lento. E impossibile da debuggare.

Il JN mi ha chiesto: "Ma questo non è un monolite?"

Ho risposto: "Sì. Ma non dirlo al CTO."

"Perché?"

"Perché il CTO crede nei microservizi. E se scopre che abbiamo ricreato il monolite, ci uccide."

"Ma è un monolite!"

"È un monolite distribuito. Con API REST. E eventi. E message broker. E circuit breaker. E service mesh. È un monolite moderno. Un monolite 2.0. Un monolite che nessuno chiama monolite. Perché se lo chiamiamo monolite, abbiamo fallito. E non possiamo fallire. Non davanti al CTO."

---

**2022 - L'Espansione**

Il CTO ha detto: "I microservizi stanno andando bene! Dobbiamo espandere!"

Il TL ha chiesto: "Espandere cosa?"

**CTO**: Espandere i servizi! Dobbiamo essere più granulari!

**TL**: Più granulari?

**CTO**: Sì! 5 servizi sono pochi. Netflix ha 500 servizi. Amazon ha 2000. Noi abbiamo 5. Dobbiamo crescere!

**ME**: Ma Netflix ha 5000 ingegneri. Amazon ha 50.000. Noi abbiamo 4.

**CTO**: E allora?

**ME**: Non possiamo gestire 500 servizi con 4 persone.

**CTO**: Non 500! Siate ragionevoli! 20!

**TL**: 20?

**CTO**: Sì! 20 servizi! Un servizio per ogni entità!

Il TL ha guardato il CTO. Il TL ha visto la follia. Il TL ha visto il futuro. Il TL ha visto la morte.

**TL**: Ok. 20 servizi.

E così, i 5 servizi sono diventati 20. Il servizio utenti è diventato: `user-auth`, `user-profile`, `user-preferences`, `user-session`. Il servizio prodotti è diventato: `product-catalog`, `product-inventory`, `product-pricing`, `product-search`. E così via. Ogni servizio aveva il suo database. La sua API. I suoi test. I suoi problemi.

E l'api-gateway? L'api-gateway ora chiamava 20 servizi. Per ogni richiesta. E ogni richiesta impiegava 47 secondi. E ogni utente vedeva un loader. E ogni utente si lamentava. E il PM ci odiava. E il CTO era felice. Perché avevamo 20 servizi. E 20 servizi sono meglio di 5. Vero?

---

**2023 - Il Crollo**

Il sistema è crollato. Non gradualmente. Improvvisamente. Come un castello di carte. Come un sogno. Come la nostra sanità mentale.

Era un martedì. Alle 14:47. Il servizio `product-inventory` è andato in timeout. Il timeout ha fatto scattare il circuit breaker. Il circuit breaker ha aperto il circuito. E tutte le chiamate a `product-inventory` hanno fallito.

Ma `product-inventory` era chiamato da `product-catalog`. E `product-catalog` era chiamato da `order-service`. E `order-service` era chiamato da `api-gateway`. E `api-gateway` era chiamato da tutto.

E così, tutto è crollato. In 47 secondi. 20 servizi. 47 container. 12 database. Tutti giù. Tutti morti. Tutti inutili.

Il CTO ha chiamato: "COSA È SUCCESSO?"

Il TL ha risposto: "Il servizio inventory è andato in timeout."

"E PERCHÉ NON ABBIAMO UN FALLBACK?"

"Abbiamo un fallback. Il fallback è: 'Riprova più tardi'."

"RIPROVA PIÙ TARDI? È QUESTO IL NOSTRO FALLBACK?"

"Sì. È il fallback standard per i microservizi."

"MA È ORRIBILE!"

"Sì. Ma è quello che abbiamo."

"E COME LO FIXIAMO?"

"Riavviamo tutto."

"E POI?"

"E poi succederà di nuovo."

"QUANDO?"

"Non lo so. Domani? Tra un'ora? Tra un minuto? I microservizi sono imprevedibili. È parte del loro charme."

Il CTO ha urlato. Per 47 minuti. E noi abbiamo ascoltato. E abbiamo annuito. E abbiamo riavviato tutto. E tutto è tornato su. Ma sapevamo. Sapevamo che sarebbe successo di nuovo. Perché l'architettura era sbagliata. Perché i microservizi erano sbagliati. Perché tutto era sbagliato. Ma non potevamo dirlo. Non al CTO. Non dopo 2 anni di lavoro. Non dopo aver promesso il futuro.

---

**2024 - La Resa**

Il PM ha chiesto: "Possiamo semplificare?"

Il TL ha risposto: "Sì."

"Come?"

"Torniamo al monolite."

"Il CTO non approverà mai."

"Allora non glielo diciamo."

"Come?"

"Creiamo un nuovo servizio. `core-service`. E ci mettiamo dentro tutto. Tutta la logica. Tutti i dati. Tutto. E gli altri servizi diventano... proxy. Proxy che chiamano `core-service`. E `core-service` è il monolite. Ma con un altro nome. E il CTO non lo saprà mai."

Il PM ha guardato il TL. Il PM ha visto la disperazione. Il PM ha visto la soluzione. Il PM ha visto il futuro.

"Ok. Fatelo."

E così, abbiamo creato `core-service`. Un servizio gigante. 47.000 righe. Un database gigante. 47 tabelle. Una API gigante. 47 endpoint. Era il monolite. Ma in un container. E il CTO non lo sapeva. E il sistema funzionava. Finalmente. Dopo 3 anni. Finalmente funzionava.

---

**2025 - La Verità**

Il CTO ha scoperto. Come? Non lo so. Forse ha guardato i log. Forse ha guardato il codice. Forse ha guardato le metriche. E ha visto che `core-service` riceveva il 99% del traffico. E gli altri 19 servizi ricevevano l'1%. E ha capito.

**CTO**: Cos'è `core-service`?

**TL**: È... un servizio.

"Un servizio?"

"Sì. Un servizio core."

"E cosa fa?"

"Fa... tutto."

"Tutto?"

"Sì. Tutto."

"E gli altri servizi?"

"Gli altri servizi... chiamano `core-service`."

"Quindi `core-service` è un monolite?"

" Tecnicamente... sì."

"E MI AVETE PRESO IN GIRO PER 3 ANNI?"

"No! Abbiamo... ottimizzato!"

"OTTIMIZZATO? AVETE RICREATO IL MONOLITE!"

"Sì. Ma è un monolite moderno! Con container! E Kubernetes! E CI/CD! È un monolite 2.0!"

Il CTO ha urlato. Per 2 ore. E noi abbiamo ascoltato. E abbiamo annuito. E alla fine, il CTO ha detto:

"Ok. Tenete il monolite. Ma non chiamatelo monolite. Chiamatelo... 'Distributed Modular Architecture'."

"E i microservizi?"

"Tenete anche quelli. Ma non chiamateli microservizi. Chiamateli... 'Domain-Specific Bounded Contexts'."

"E l'api-gateway?"

"Tenete anche quello. Ma chiamatelo... 'Unified API Layer'."

"E RabbitMQ?"

"Tenete anche quello. Ma chiamatelo... 'Event-Driven Communication Backbone'."

"E tutto il resto?"

"Tutto il resto? Eliminatelo. Abbiamo troppe cose. Troppe complessità. Troppo... tutto."

---

**2026 - Oggi**

Abbiamo:
- 1 monolite (chiamato `core-service`, aka "Distributed Modular Architecture")
- 19 servizi proxy (chiamati "Domain-Specific Bounded Contexts")
- 1 api-gateway (chiamato "Unified API Layer")
- 1 RabbitMQ (chiamato "Event-Driven Communication Backbone")
- 47 container
- 12 database
- 8 message queue
- 3 load balancer
- 2 service mesh
- 1 CTO confuso
- 4 sviluppatori traumatizzati
- 0 sanità mentale

Il sistema funziona. A volte. Quando non crolla. Quando non va in timeout. Quando non facciamo deploy. Quando non respiriamo.

Il CTO dice ancora: "I microservizi sono il futuro."

E noi annuiamo. E sorridiamo. E diciamo: "Sì. Il futuro." Sapendo che il futuro è il passato. E il passato è il monolite. E il monolite è eterno. Come il dolore. Come le tasse. Come i TODO di Bob. Come tutto.

---

## Il costo dei microservizi

| Voce | Valore |
|------|--------|
| Anni di migrazione | 5 |
| Servizi creati | 20 |
| Servizi che fanno qualcosa | 1 (core-service) |
| Container in produzione | 47 |
| Database | 12 |
| Chiamate HTTP per richiesta | 47 |
| Latenza media | 2.3 secondi |
| Latenza del vecchio monolite | 47ms |
| Deploy al giorno | 0.3 (troppo rischioso) |
| Incidenti al mese | 12 |
| Sviluppatori persi | 2 (licenziati per "non allineamento") |
| JN traumatizzati | 8 |
| Costo infrastructure | 47x il monolite |
| Valore dei microservizi | Incalcolabile (negativo) |

**Morale**: I microservizi sono una bugia. Una bugia che ti vendono a conferenze. Una bugia che leggi su blog post. Una bugia che il tuo CTO crede. Ma la verità è: i microservizi non sono per te. Non per il tuo team di 4 persone. Non per la tua applicazione di 12.000 righe. I microservizi sono per Netflix. Per Amazon. Per Google. Per aziende con 5000 ingegneri e budget infiniti. Per te? Il monolite. Il monolite è la verità. Il monolite è la semplicità. Il monolite è la pace. Ma non puoi dirlo. Non al CTO. Non dopo che ha letto quel blog post. Non dopo che ha visto quella conferenza. Non dopo che ha creduto. Perché la fede è forte. E la realtà è debole. E tu sei solo un ingegnere. Con un monolite. Che fingi sia un "Distributed Modular Architecture". E vai avanti. E sorridi. E soffri. In silenzio. Come tutti noi.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](41-il-refactor-che-non-finisce-mai.md)]**
