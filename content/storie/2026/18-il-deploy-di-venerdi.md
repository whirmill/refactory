# Il Deploy di Venerdì

**Data**: 28/06/2026

---

**[Home](../index.md) | [Precedente](17-il-codice-commentato.md) | [Prossima](19-la-documentazione-mancante.md)**

---

C'è una cosa che ho imparato: i deploy di venerdì sono vietati. Ma si fanno lo stesso. E si rompono. Sempre.

Era venerdì. Alle 16:30. Il PM è arrivato.

"Dobbiamo fare il deploy."

"Oggi?" ho chiesto.

"Sì. Il cliente vuole la feature per domani."

"Ma è venerdì. I deploy di venerdì sono vietati."

"Chi l'ha detto?"

"La policy. Che abbiamo scritto. Insieme. L'anno scorso."

"Ah. Ma questa è un'emergenza."

"Ogni volta è un'emergenza."

"Ma questa volta è vera."

"Lo dite sempre."

"Sì, ma questa volta è diverso."

"Lo dite sempre anche questo."

Il PM non ha aspettato. Ha fatto il deploy. Senza testare. Senza review. Senza backup.

Alle 17:00, il deploy è andato. L'app funzionava.

Alle 17:30, l'app non funzionava più.

"Cosa è successo?" ha chiesto il PM.

"Non so. Il deploy è andato."

"Ma ora non funziona."

"Lo so. Sto guardando i log."

"Cosa dicono i log?"

"Dicono che c'è un errore."

"Quale errore?"

"Non so. È criptico."

"Fixalo."

"Non so cosa fixare."

"Ma è un errore. Fixalo."

Alle 18:00, ho trovato il bug. Era una variabile non definita. In una funzione che non veniva chiamata. Tranne in un caso. Che non avevamo testato. Perché non avevamo test.

"Posso fixarlo?" ho chiesto.

"Sì. Ma fai in fretta."

"Devo fare un altro deploy."

"Fallo."

"Ma è venerdì. E abbiamo già fatto un deploy."

"E allora?"

"E se si rompe di nuovo?"

"Non si romperà."

"Lo dite sempre."

"Sì, ma questa volta è diverso."

"Lo dite sempre anche questo."

Ho fatto il deploy. Alle 18:30. E si è rotto di nuovo. Per un altro motivo.

"Ora cosa c'è?" ha chiesto il PM.

"Un altro bug."

"Un altro?"

"Sì. Questo codice non è testato."

"E perché non è testato?"

"Perché non c'è tempo per i test."

"E quando facciamo i test?"

"Mai. Perché c'è sempre un'emergenza."

Alle 19:00, ho fatto rollback. E l'app ha ricominciato a funzionare. Come prima. Senza la feature.

"Allora?" ha chiesto il PM.

"Allora niente. La feature non c'è."

"Ma il cliente la vuole per domani!"

"E allora dovevi dirmelo prima. E non fare il deploy di venerdì."

"Ma era un'emergenza!"

"Ogni volta è un'emergenza. E ogni volta si rompe. E ogni volta facciamo rollback. E ogni volta la feature non c'è."

Il PM se n'è andato. Frustrato. Io sono rimasto. A guardare i log. E a chiedermi perché facciamo ancora deploy di venerdì.

La morale della storia: i deploy di venerdì sono vietati. Ma si fanno lo stesso. E si rompono. Sempre. E si fa rollback. E la feature non c'è. E il cliente è arrabbiato. E noi siamo stanchi. E il venerdì successivo, si ricomincia.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](17-il-codice-commentato.md) | [Prossima](19-la-documentazione-mancante.md)**
