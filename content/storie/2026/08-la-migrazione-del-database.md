# La Migrazione del Database

**Data**: 15/04/2026

---

**[Home](../index.md) | [Precedente](07-il-ticket-eterno.md) | [Prossima](09-il-refactoring-che-non-finisce-mai.md)**

---

C'è una cosa che ho imparato: le migrazioni del database non vanno mai come previsto. Mai.

Il TL ha deciso: "Dobbiamo migrare da MySQL a PostgreSQL."

"Perché?" ho chiesto.

"Perché PostgreSQL è meglio."

"In che senso?"

"È più... enterprise."

"Enterprise?"

"Sì. È quello che usano le grandi aziende."

"Siamo 5 persone."

"Ma dobbiamo pensare in grande."

La migrazione è iniziata. Con un piano. Un piano di 3 mesi. Con milestone. E test. E rollback plan.

Il primo mese è andato bene. Abbiamo creato lo script di migrazione. Abbiamo testato su staging. Tutto funzionava.

Il secondo mese è andato bene. Abbiamo migrato i dati di test. Abbiamo verificato le query. Tutto funzionava.

Il terzo mese è andato male. Abbiamo migrato in produzione. E tutto si è rotto.

La query che funzionava su MySQL non funzionava su PostgreSQL. La JOIN che era veloce su MySQL era lenta su PostgreSQL. L'indice che esisteva su MySQL non esisteva su PostgreSQL.

"Ma non avevamo testato?" ha chiesto il TL.

"Sì, ma su staging."

"E perché su staging funzionava?"

"Perché su staging c'erano 1000 righe. In produzione ce ne sono 10 milioni."

"Ah."

Abbiamo fatto rollback. In 4 ore. E la migrazione è stata rimandata. A data da destinarsi.

Tre mesi dopo, il TL ha deciso: "Dobbiamo migrare da PostgreSQL a MongoDB."

"Ma non abbiamo mai migrato a PostgreSQL!"

"Appunto. Restiamo su MySQL. E migriamo a MongoDB."

"Perché?"

"Perché è NoSQL. È il futuro."

La morale della storia: le migrazioni del database non finiscono mai. Si rimandano. E si cambia idea. E si rimane sul database che si voleva cambiare. Per sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](07-il-ticket-eterno.md) | [Prossima](09-il-refactoring-che-non-finisce-mai.md)**
