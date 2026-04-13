# Il Feature Flag Dimenticato

**Data**: 02/08/2026

---

**[Home](../index.md) | [Precedente](23-la-stima-che-non-va-mai-bene.md) | [Prossima](25-il-refactor-che-nessuno-ha-chiesto.md)**

---

C'è una cosa che ho imparato: i feature flag sono come i parassiti. Una volta che li introduci, non te ne liberi più. E si moltiplicano.

Tre anni fa, il PM ha avuto un'idea.

"Facciamo un feature flag."

"Per cosa?" ho chiesto.

"Per la nuova feature. Così possiamo rilasciarla gradualmente."

"Gradualmente?"

"Sì. Prima al 10% degli utenti. Poi al 50%. Poi a tutti."

"E poi?"

"Poi lo togliamo."

"Quando?"

"Quando la feature è stabile."

La feature è stata rilasciata. Con il feature flag. `ENABLE_NEW_DASHBOARD`. Che controllava la nuova dashboard. Che mostrava i dati. In modo nuovo.

Dopo due settimane, la feature era stabile. Il PM ha detto: "Ora possiamo togliere il flag."

"Ottimo" ho detto. "Lo tolgo."

Ho aperto il codice. E ho trovato questo:

```javascript
if (ENABLE_NEW_DASHBOARD) {
  // nuova dashboard
} else {
  // vecchia dashboard
}
```

"Semplice" ho pensato. "Rimuovo il flag e tengo solo la nuova dashboard."

Poi ho cercato `ENABLE_NEW_DASHBOARD` nel codice. 47 risultati. In 23 file diversi.

"Ok. Più complicato del previsto. Ma fattibile."

Ho iniziato a rimuovere il flag. Poi il PM è arrivato.

"Aspetta. Non toglierlo ancora."

"Perché?"

"Perché alcuni clienti vogliono la vecchia dashboard."

"La vecchia dashboard? Ma è peggio."

"Lo so. Ma ci sono abituati."

"Quindi teniamo entrambe?"

"Sì. Per ora."

"Per ora quanto?"

"Non so. Vediamo."

Un anno dopo, il flag era ancora lì. E c'erano altri 12 flag.

`ENABLE_NEW_LOGIN`
`ENABLE_NEW_CHECKOUT`
`ENABLE_NEW_PROFILE`
`ENABLE_NEW_SEARCH`
`ENABLE_NEW_EVERYTHING`

"Quanti flag abbiamo?" ho chiesto al TL.

"23."

"23 feature flag?"

"Sì."

"E quanti dovrebbero esserci?"

"Zero. Dovrebbero essere temporanei."

"E perché non li togliamo?"

"Perché ogni volta che proviamo, qualcuno si lamenta."

"Di cosa?"

"Della feature che non vuole."

"Ma le feature sono migliori."

"Per noi. Non per loro."

Il JN è arrivato. Con una domanda.

"Che cos'è questo flag?" ha chiesto. `ENABLE_LEGACY_MODE`.

"Non toccarlo" ho detto.

"Perché?"

"Perché è maledetto."

"Maledetto?"

"Sì. Se lo tocchi, si rompe tutto."

"Ma cosa fa?"

"Nessuno lo sa più. È lì da prima di noi."

"E perché non lo togliamo?"

"Perché nessuno ha il coraggio di farlo."

Il JN l'ha toccato. E si è rotto tutto.

"Te l'avevo detto" ho detto.

"Ma volevo capire!"

"Ora capisci. Il flag era lì per un motivo. Un motivo che nessuno ricorda. Ma che esiste."

Abbiamo passato tre giorni a capire cosa faceva `ENABLE_LEGACY_MODE`. Risultato: niente. Faceva niente. Era un flag morto. Che controllava codice morto. Che non veniva mai eseguito.

"Quindi lo togliamo?" ha chiesto il JN.

"Sì. Finalmente."

L'abbiamo tolto. E il codice ha funzionato. Uguale a prima. Perché il flag non faceva niente.

"Ora togliamo gli altri 22" ho detto.

Il PM è arrivato.

"No. Non potete."

"Perché?"

"Perché i clienti si abituano."

"Si abituano a cosa? Ai flag?"

"Si abituano alle opzioni. Se togliamo i flag, togliamo opzioni."

"Ma le opzioni sono codice morto. Che non usano."

"Come fai a saperlo?"

"Perché ho guardato i log. Il 99% degli utenti usa le nuove feature."

"E l'1%?"

"L'1% usa le vecchie. E sono sempre gli stessi 3 utenti."

"3 utenti su quanti?"

"50.000."

"Quindi 3 utenti contano più di 49.997?"

"Sì. Perché sono quelli che si lamentano."

La morale: i feature flag sono temporanei. Ma temporanei significa "finché non muore qualcuno". E quel qualcuno sei tu. Che devi mantenere 23 flag. Per 3 utenti. Che si lamentano. E il PM che non vuole toglierli. E il codice che cresce. E cresce. E cresce. Finché non capisci più niente. Ma almeno hai opzioni. Opzioni che nessuno usa. Ma che non puoi togliere. Perché qualcuno si lamenterebbe.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](23-la-stima-che-non-va-mai-bene.md) | [Prossima](25-il-refactor-che-nessuno-ha-chiesto.md)**
