# Il Refactoring Che Non Finisce Mai

**Data**: 20/04/2026

---

**[Home](../index.md) | [Precedente](08-la-migrazione-del-database.md) | [Prossima](10-il-bug-in-produzione.md)**

---

C'è una cosa che ho imparato: il refactoring non finisce mai. Si inizia. Si ferma. E si lascia a metà. Per sempre.

Il TL ha detto: "Dobbiamo rifare il componente UserCard."

"Perché?" ho chiesto.

"Perché è legacy."

"Ma funziona."

"Sì, ma è legacy. E non è testato."

"Ok. Quanto tempo ci vuole?"

"Due settimane."

Ho iniziato il refactoring. Ho creato una nuova branch. `refactor/user-card-v2`. Ho scritto i test. Ho riscritto il componente. In due settimane.

Poi il PM ha detto: "Abbiamo una feature urgente."

"Ok. Ma sto facendo il refactoring."

"Il refactoring può aspettare. La feature no."

Ho lasciato il refactoring a metà. E ho implementato la feature. In una settimana.

Poi il TL ha detto: "Dobbiamo rifare il componente UserProfile."

"Ma non ho finito UserCard."

"UserCard può aspettare. UserProfile è più importante."

Ho lasciato UserCard a metà. E ho iniziato UserProfile. `refactor/user-profile-v2`.

Poi il PM ha detto: "Abbiamo un'altra feature urgente."

E così via. Per 6 mesi.

Ora abbiamo:
- `refactor/user-card-v2` - abbandonato
- `refactor/user-profile-v2` - abbandonato
- `refactor/api-calls-v2` - abbandonato
- `refactor/auth-v3` - abbandonato
- `refactor/everything-v4` - abbandonato

E il codice originale è ancora lì. Legacy. Non testato. E funziona.

La morale della storia: il refactoring è come la dieta. Si inizia con buone intenzioni. Si ferma alla prima tentazione. E si rimane come prima. O peggio.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](08-la-migrazione-del-database.md) | [Prossima](10-il-bug-in-produzione.md)**
