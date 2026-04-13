# La Soluzione Temporanea

**Data**: 16/08/2026

---

**[Home](../index.md) | [Precedente](25-il-refactor-che-nessuno-ha-chiesto.md)**

---

C'è una cosa che ho imparato: nulla è più permanente di una soluzione temporanea. È una legge fondamentale dell'informatica. Come il fatto che il caffè è sempre troppo poco. O che il WiFi si disconnette durante le call importanti.

![](../../img/temporaneo.jpg)

Era un giovedì. Il cliente aveva un problema urgente. Il sistema di pagamenti era lento. Molto lento. I clienti si lamentavano. Il cliente si lamentava. Il PM si lamentava. Tutti si lamentavano.

"Ho una soluzione" ho detto al PM.

"Dimmi."

"Aggiungo un cache."

"Quanto tempo?"

"Due ore."

"E funziona?"

"Sì, ma è temporaneo. Poi dobbiamo sistemare la query."

"La query?"

"Sì, la query che fa il join di 47 tabelle. Quella che ci mette 30 secondi."

"E quanto tempo per sistemarla?"

"Due settimane. Forse tre."

"Allora facciamo il cache."

"L'ho detto che è temporaneo?"

"Sì, sì. Temporaneo. Intanto il cliente smette di lamentarsi."

Ho implementato il cache. In due ore. Il sistema è diventato veloce. Il cliente ha smesso di lamentarsi. Il PM ha smesso di lamentarsi. Tutti hanno smesso di lamentarsi.

"Ottimo lavoro" ha detto il PM. "Ma non dimenticare di sistemare la query."

"Non dimenticherò."

Tre mesi dopo, il cache era ancora lì. La query era ancora lì. Il join di 47 tabelle era ancora lì.

Un giorno, il cache ha smesso di funzionare. Perché il server di cache ha finito la memoria. Perché nessuno aveva configurato l'eviction. Perché era "temporaneo".

Il sistema è andato giù. Il cliente ha chiamato. Il PM ha chiamato. Tutti hanno chiamato.

"Che è successo?"

"Il cache ha finito la memoria."

"E perché?"

"Perché non era configurato."

"E perché non era configurato?"

"Perché era temporaneo."

"E perché è ancora temporaneo dopo tre mesi?"

"Perché nessuno ha sistemato la query."

"E perché nessuno ha sistemato la query?"

"Perché il cache funzionava. E quando il cache funziona, la query non è urgente. E quando non è urgente, non la fai. E quando non la fai, rimane temporanea. Per sempre."

Il PM ha guardato me. Io ho guardato il PM.

"Ok" ha detto il PM. "Sistemiamo la query."

"Quanto tempo?"

"Due settimane. Forse tre."

"E il sistema nel frattempo?"

"Riavviamo il cache."

"E quando si riempie di nuovo?"

"Lo riavviamo di nuovo."

"E questo è..."

"Temporaneo."

Abbiamo riavviato il cache. Il sistema ha ripreso a funzionare. Il cliente ha smesso di lamentarsi. Il PM ha smesso di lamentarsi.

La query è ancora lì. Il join di 47 tabelle è ancora lì. Il cache è ancora lì. E ogni settimana, qualcuno deve riavviarlo. Perché si riempie. Perché non è configurato. Perché è temporaneo.

Il JN ha chiesto: "Perché non sistemiamo la query?"

"Perché è complicata."

"Ma se la sistemiamo, non dobbiamo riavviare il cache ogni settimana."

"Vero. Ma sistemare la query richiede tempo. E il tempo serve per le feature. E le feature servono per i clienti. E i clienti non vedono la query. Vedono le feature."

"Ma vedono anche il sistema lento quando il cache si riempie."

"Sì, ma quello succede una volta a settimana. Le feature servono ogni giorno."

Il JN ha annuito. Ma non ha capito. Non ancora. Capirà. Tra qualche anno. Quando diventerà senior. E vedrà le sue soluzioni temporanee diventare permanenti. E i suoi cache diventare infrastruttura critica. E le sue query diventare leggenda.

La morale: ogni soluzione temporanea è permanente. Finché non si rompe. E quando si rompe, la sistemiamo con un'altra soluzione temporanea. Che diventa permanente. E il ciclo continua. Perché sistemare le cose per bene richiede tempo. E il tempo costa. E il costo non è giustificato. Finché non lo è. Ma quando lo è, è troppo tardi. Perché la soluzione temporanea è diventata infrastruttura. E l'infrastruttura non si tocca. Si riavvia. Una volta a settimana. Per sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](25-il-refactor-che-nessuno-ha-chiesto.md)**
