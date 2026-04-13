# Il Refactor Che Nessuno Ha Chiesto

**Data**: 09/08/2026

---

**[Home](../index.md) | [Precedente](24-il-feature-flag-dimenticato.md) | [Prossima](26-la-soluzione-temporanea.md)**

---

C'è una cosa che ho imparato: i refactor sono come i tatuaggi. Sembrano una buona idea sul momento. Poi te ne penti. Ma è troppo tardi.

Era un martedì. Il codice funzionava. I test passavano. Il cliente era felice. Tutto era perfetto.

Poi il JN è arrivato con gli occhi brillanti.

"Ho letto il codice."

"Bravo."

"È brutto."

"Funziona."

"Sì, ma è brutto. Guarda questa funzione. Fa tre cose diverse. E ha 200 righe."

"È così da 5 anni."

"Appunto. Dovremmo refactorarla."

"Perché?"

"Per renderla più pulita."

"Pulita come?"

"Più leggibile. Più modulare. Più elegante."

"E chi l'ha chiesto?"

"Nessuno. Ma è la cosa giusta da fare."

Il TL è passato.

"Cosa state discutendo?"

"Il JN vuole refactorare la funzione principale."

"Quella che gestisce tutti gli ordini?"

"Sì."

"Quella che è stata scritta dal founder?"

"Sì."

"Quella che nessuno tocca da 5 anni perché ha 47 casi speciali?"

"Sì. Ma il JN dice che è brutta."

Il TL ha guardato il JN.

"Quanto tempo per il refactor?"

"Due giorni. Tre al massimo."

"E se si rompe qualcosa?"

"Non si rompe niente. Scrivo i test prima."

Il TL ha annuito. "Ok. Ma se si rompe, lo ripari tu."

Il JN ha sorriso. "Non si romperà niente."

Tre giorni dopo, si è rotto tutto.

"Che è successo?" ha chiesto il PM.

"Il refactor ha introdotto un bug" ho detto.

"Un bug? Ma c'erano i test!"

"I test coprivano il 60%. Il 40% erano i casi speciali. Che il JN non sapeva."

"Casi speciali?"

"Sì. Il founder ha scritto codice per gestire ogni situazione assurda che i clienti hanno richiesto in 5 anni. Il JN non li conosceva."

Il JN era pallido.

"Non lo sapevo" ha detto.

"Lo so. Per questo non si toccava."

Il cliente ha chiamato. Era arrabbiato.

"I miei ordini sono spariti!"

"Non sono spariti. Sono in uno stato strano."

"Strano come?"

"Strano come 'non completato ma nemmeno fallito'."

"E come li recupero?"

"Non lo sappiamo ancora."

Abbiamo passato 4 giorni a sistemare il refactor. Il JN ha lavorato 12 ore al giorno. Il TL ha aiutato. Io ho aiutato. Tutti hanno aiutato.

Alla fine, il codice funzionava di nuovo. Come prima. Ma con 500 righe in più. E 3 nuovi bug minori. E un commento che diceva:

```
// NON TOCCARE QUESTA FUNZIONE
// Ci abbiamo messo 4 giorni a sistemarla l'ultima volta
// Se hai bisogno di modificarla, parlane con il TL prima
// E porta caffè. Tanto caffè.
```

Il PM ha fatto una riunione post-mortem.

"Cosa abbiamo imparato?"

"I refactor non richiesti sono pericolosi" ho detto.

"Ma il codice era brutto" ha detto il JN.

"Il codice brutto che funziona è meglio del codice pulito che non funziona."

"Ma ora è pulito."

"Ora è pulito e ha 3 bug in più. Prima era brutto e funzionava."

Il CTO è intervenuto.

"Il refactor era necessario. Per la manutenibilità a lungo termine."

"A lungo termine?" ho chiesto. "Il codice era lì da 5 anni. Nessuno l'ha toccato. Quale manutenibilità?"

"La manutenibilità futura."

"La manutenibilità futura per chi?"

"Per i nuovi sviluppatori."

"I nuovi sviluppatori dovrebbero imparare il codice esistente. Non riscriverlo."

Il JN ha alzato la mano.

"Ho imparato la lezione. Non refactorerò più niente senza chiedere."

"Bene" ho detto. "Ma ora c'è un altro problema."

"Quale?"

"Ora che hai refactorato, altri vorranno refactorare. Perché hai mostrato che si può. Anche se è stato un disastro. E la prossima volta sarà un altro disastro. E quello dopo ancora. Finché non smetteremo di refactorare. O smetteremo di funzionare."

La morale: il codice brutto che funziona è codice che funziona. Il codice pulito che non funziona è codice che non funziona. E la differenza tra i due è 4 giorni di lavoro. E 3 bug nuovi. E un cliente arrabbiato. E una riunione post-mortem. E una lezione che nessuno impara. Perché il prossimo JN arriverà. Con gli occhi brillanti. E vorrà refactorare. E il TL dirà ok. E tutto si romperà di nuovo. È il ciclo della vita. Del software. Che è brutto. Ma funziona. Finché qualcuno non decide di renderlo pulito.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](24-il-feature-flag-dimenticato.md) | [Prossima](26-la-soluzione-temporanea.md)**
