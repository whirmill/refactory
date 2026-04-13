# Il Bug in Produzione

**Data**: 25/04/2026

---

**[Home](../index.md) | [Precedente](09-il-refactoring-che-non-finisce-mai.md) | [Prossima](11-il-pair-programming.md)**

---

C'è una cosa che ho imparato: i bug in produzione arrivano sempre di venerdì. Alle 17:00. Quando tutti stanno andando via.

Era venerdì. Alle 17:00. Stavo per chiudere il computer. Quando è arrivato il messaggio.

**PM**: "URGENTE!!! L'app non funziona!!!"

Ho aperto l'app. Funzionava.

**ME**: "A me funziona. Cosa non funziona?"

**PM**: "Il cliente non riesce a fare il login!!!"

Ho provato a fare il login. Funzionava.

**ME**: "A me funziona. Che browser usa il cliente?"

**PM**: "Non so. Ma non funziona!!!"

Ho guardato i log. C'era un errore. `TypeError: Cannot read property 'id' of undefined`. Alle 16:58. Per un utente. In Cina.

"Perché in Cina?" ho chiesto.

"Perché il cliente è in Cina," ha risposto il PM.

"E perché non funziona in Cina?"

"Non so. Ma fixalo!!!"

Ho guardato il codice. L'errore era nella funzione `getUser`. Che chiamava `getUserFromAPI`. Che ritornava `undefined` se l'utente non esisteva. Ma il codice non controllava se l'utente esisteva.

"Ma questo è un bug vecchio," ho detto.

"Fixalo e basta," ha detto il PM.

Ho fixato il bug. Con un `if (!user) return null`. E ho fatto il deploy. Alle 18:30. Di venerdì.

Il deploy è andato bene. L'app ha ricominciato a funzionare. In Cina.

Lunedì, il TL mi ha chiamato.

"Dobbiamo parlare del bug."

"Sì, l'ho fixato."

"Ma perché c'era?"

"Perché il codice non controllava se l'utente esisteva."

"E perché non lo controllava?"

"Perché è stato scritto 3 anni fa. Da Bob. E non c'è test."

"E perché non c'è test?"

"Perché Bob non scriveva test."

"Dobbiamo aggiungere test."

"Sì. Ma prima dobbiamo refactorare. Perché il codice è un disastro."

"Ok. Facciamo il refactoring."

Il refactoring è iniziato. E non è mai finito. E il bug è tornato. 6 mesi dopo. In Australia.

La morale della storia: i bug in produzione non si fixano. Si patchano. E tornano. In un altro paese. Di venerdì. Alle 17:00.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](09-il-refactoring-che-non-finisce-mai.md) | [Prossima](11-il-pair-programming.md)**
