# La CI Che Non Passa Mai

**Data**: 10/03/2026

---

**[Home](../index.md) | [Precedente](05-il-codice-senza-documentazione.md) | [Prossima](07-il-ticket-eterno.md)**

---

C'è una cosa che ho imparato: la CI non passa mai al primo tentativo. E quando passa, c'è qualcosa che non va.

Avevo una PR. Semplice. 3 file. 50 righe. Un fix per un bug minore. Niente di speciale.

Ho fatto il push. La CI è partita.

```
❌ Build failed
```

"Ok," ho pensato. "Sarà un problema di dipendenze."

Ho guardato il log. Il test `should render component` è fallito. Per un timeout.

"Timeout? Ma il test passa in locale."

Ho fatto ripartire la CI.

```
✅ Build passed
```

"Ottimo." Ho fatto merge.

5 minuti dopo, il TL mi ha chiamato.

"La build in main è fallita."

"Come? La CI è passata."

"Sì, ma la build in main è fallita."

"Ma è la stessa CI."

"Sì, ma in main è diverso."

Ho guardato il log. Il test `should render component` è fallito. Per un timeout.

"Ma è lo stesso test!"

"Sì, ma in main è diverso."

"Perché?"

"Non so. È la CI."

Ho fixato il test. Aumentando il timeout. Da 5 secondi a 10 secondi.

```
✅ Build passed
```

Ho fatto merge. La build in main è passata.

Il giorno dopo, il test è fallito di nuovo. Per un timeout.

"Ma ho aumentato il timeout!"

"Sì, ma ora il test è più lento."

"Perché?"

"Non so. È la CI."

La CI ha una personalità. A volte passa. A volte no. E non sai mai perché. Ma sai che non è colpa tua. È sempre colpa della CI.

La morale della storia: la CI è un oracolo. A volte ti dà ragione. A volte ti dà torto. E tu non puoi fare altro che accettare il suo verdetto. E aumentare i timeout.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](05-il-codice-senza-documentazione.md) | [Prossima](07-il-ticket-eterno.md)**
