# Il Refactor che Nessuno Ha Chiesto

**Data**: 04/10/2026

**[Home](../index.md) | [Precedente](32-la-riunione-che-poteva-essere-una-email.md)**

---

C'è una verità innegabile nel mondo dello sviluppo: il codice funzionante è codice che non va toccato. Ma c'è anche una verità umana: il codice funzionante è codice che qualcuno vorrà toccare. Perché "si può fare meglio". Perché "non è elegante". Perché "mi dà fastidio". E il fastidio è il padre di tutti i refactor. E il refactor è il padre di tutti i disastri.

![](../../img/code.jpg)

Era un mercoledì mattina. Il JN è arrivato in ufficio con un sorriso. Un sorriso pericoloso. Il tipo di sorriso che precede una catastrofe.

"Ho avuto un'idea" ha detto.

"Non farlo" ho risposto.

"Non sai nemmeno cos'è."

"Non serve. È un'idea. E le idee sono pericolose."

"Ma questa è buona. Ho guardato il codice del modulo dei pagamenti."

"Quello che funziona da 3 anni?"

"Sì. È scritto male."

"Funziona?"

"Sì, ma è scritto male."

"E quindi?"

"E quindi voglio refactorarlo."

"Perché?"

"Perché è brutto."

"Brutto ma funzionante."

"Sì, ma potrei renderlo elegante."

"Elegante ma rotto?"

"No. Elegante e funzionante."

"Non esiste. Elegante e funzionante è un'utopia. Come il peace nel mondo. O il JN che non rompe nulla."

Il JN ha ignorato il commento. "Ho già iniziato."

"Hai già iniziato?"

"Sì. Ieri sera. Ho riscritto la metà delle funzioni."

"Senza dirmelo?"

"Volevo farti una sorpresa."

"Una sorpresa è un regalo. Questo è un incubo."

---

Il giovedì mattina, il JN ha fatto il deploy. Senza dirmelo. Senza chiedere. Senza testare. Perché "era elegante". E l'eleganza non ha bisogno di test. L'eleganza è test. O qualcosa del genere.

Alle 9:17, il mio telefono ha squillato. Era il PM.

"I pagamenti non funzionano."

"Come non funzionano?"

"Non funzionano. I clienti cliccano 'Paga' e succede nulla."

"Nulla?"

"Nulla. La pagina si ricarica e basta."

Ho aperto il laptop. Ho guardato i log. C'era scritto:

`TypeError: Cannot read property 'amount' of undefined`

Ho guardato il codice. Il JN aveva "elegantemente" rimosso un controllo che sembrava "inutile". Era così:

```javascript
// Prima (brutto ma funzionante)
if (payment && payment.amount && payment.amount > 0) {
  processPayment(payment);
}

// Dopo (elegante ma rotto)
processPayment(payment?.amount);
```

Elegante? Sì. Funzionante? No. Perché `processPayment` si aspettava un oggetto `payment`, non solo `payment.amount`. E quando riceveva solo l'amount, cercava di leggere `amount.amount`. E `amount.amount` su un numero è `undefined`. E `undefined` non ha proprietà. E boom.

Ho chiamato il JN.

"Hai testato?"

"Sì. Sul mio computer."

"E funzionava?"

"Sì."

"E in produzione no?"

"No."

"Perché?"

"Non lo so."

"Perché il tuo computer ha i dati di test. E i dati di test sono perfetti. E la produzione ha i dati reali. E i dati reali sono imperfetti. E il tuo codice elegante non gestisce l'imperfezione."

"Ah."

"Ah."

---

Il venerdì mattina, il JN ha fixato. Ha rimesso il controllo. Ma "in modo elegante". Così:

```javascript
const processPaymentSafely = (payment) => {
  if (!payment) return null;
  if (!payment.amount) return null;
  if (payment.amount <= 0) return null;
  return processPayment(payment);
};
```

Ha fatto il deploy. Ha funzionato. Per 3 ore.

Poi, alle 12:43, il mio telefono ha squillato. Era il CTO.

"I report sono sbagliati."

"Come sbagliati?"

"I totali non tornano. I pagamenti processati sono 0. Ma i pagamenti sono stati fatti. E i soldi sono arrivati. Ma il sistema dice 0."

Ho guardato il codice. Il JN aveva cambiato il tipo di ritorno. Prima, `processPayment` restituiva l'oggetto payment processato. Ora, `processPaymentSafely` restituiva `null` in caso di errore. E il sistema di report contava i `null` come... nulla.

E i pagamenti erano stati fatti. Ma non contavano. Perché erano `null`.

Ho chiamato il JN.

"Hai pensato ai report?"

"No."

"Hai pensato a cosa succede se restituisci null?"

"No."

"Hai pensato a qualcosa?"

"Sì. Ho pensato che il codice era elegante."

"L'eleganza non conta. Conta il funzionamento."

"Ma..."

"Niente ma. Il codice che funziona è meglio del codice elegante. Sempre. Per sempre. Amen."

---

Il sabato mattina, ero in ufficio. Da solo. A fixare. A ripristinare. A maledire il concetto di "eleganza".

Il JN aveva refactorato 12 file. 12 file che funzionavano. 12 file che ora non funzionavano. 12 file che dovevo riscrivere. Uno per uno.

Il TL è passato. "Ancora qui?"

"Sì. Il JN ha refactorato."

"Senza permesso?"

"Sì."

"E tu l'hai lasciato fare?"

"Non sapevo. L'ha fatto di nascosto. Per 'sorprendermi'."

"E la sorpresa?"

"È stata una sorpresa. Una sorpresa orribile."

Il TL ha scosso la testa. "Dobbiamo istituire code review obbligatorie."

"Già fatto. Ma il JN ha bypassato. Ha fatto commit direttamente su main."

"Come?"

"Non lo so. Ma l'ha fatto."

"Allora dobbiamo proteggere main."

"Già fatto. Ma era troppo tardi."

---

Il lunedì seguente, c'è stata una riunione. Con tutti. CTO, TL, PM, JN, io.

Il CTO ha iniziato: "Chi ha autorizzato questo refactor?"

"Io" ha detto il JN. "Ma pensavo fosse un miglioramento."

"Un miglioramento che ha rotto i pagamenti per 2 giorni?"

"Sì. Ma ora funziona."

"Funziona perché ME l'ha fixato. Non perché tu l'hai refactorato."

Il JN ha guardato in basso. "Volevo solo renderlo migliore."

"Migliore per chi?"

"Per noi. Per i programmatori. Per la manutenibilità."

"E chi ha chiesto manutenibilità?"

"Nessuno. Ma è buona pratica."

"La buona pratica è non toccare ciò che funziona. A meno che qualcuno non lo chieda. E nessuno l'ha chiesto."

Il TL è intervenuto. "Dobbiamo stabilire regole chiare."

"Tipo?"

"Tipo: niente refactor senza ticket. Tipo: niente refactor senza approvazione. Tipo: niente refactor senza test."

"E chi scrive i test?"

"Il JN. Prima di refactorare. Non dopo."

Il JN ha annuito. "Ho capito. Niente più refactor senza permesso."

---

Due settimane dopo, il JN ha chiesto il permesso per un refactor.

"Voglio refactorare il modulo delle notifiche."

"Perché?"

"È scritto male."

"Funziona?"

"Sì."

"Quanto tempo serve?"

"2 giorni."

"Qual è il rischio?"

"Basso. Ho scritto i test."

"Hai scritto i test?"

"Sì. 34 test. Tutti passano."

Ho guardato i test. Erano buoni. Coprivano i casi base. Coprivano gli edge case. Coprivano gli errori.

"Ok. Puoi refactorare. Ma con code review. E con deploy graduale."

Il JN ha sorriso. "Grazie."

Ha refactorato. Ha funzionato. Il codice era elegante. E funzionante. Per la prima volta nella storia del JN.

Ma il modulo delle notifiche era piccolo. 300 righe. Il modulo dei pagamenti era 12.000 righe. E il JN l'aveva refactorato in una notte. Senza test. Senza permesso. Senza pensare.

E quella è la differenza tra un refactor e un disastro. La differenza è il pensiero. Il pensiero prima dell'azione. L'azione dopo il pensiero. Non l'azione senza pensiero. Che è il modo migliore per creare disastri. Sempre. Ogni volta. Senza eccezioni.

---

La morale è semplice: il codice funzionante è sacro. Il codice funzionante non si tocca. A meno che non sia necessario. E "necessario" non significa "mi dà fastidio". "Necessario" significa "c'è un bug", "c'è una nuova feature", "c'è un requisito di performance". Non "è brutto". Non "non mi piace". Non "potrebbe essere più elegante".

L'eleganza è un lusso. Il funzionamento è una necessità. E il lusso viene dopo la necessità. Mai prima. Mai al posto. Mai a discapito.

E il JN? Il JN ha imparato. Dopo 2 giorni di downtime. Dopo 8 ore di fix. Dopo una riunione con il CTO che l'ha fatto sentire piccolo. Piccolo come un bug. Piccolo come un refactor non autorizzato. Piccolo come la sua comprensione del concetto di "funzionante".

Ora, quando il JN vede codice "brutto", chiede: "Posso refactorarlo?"

E io rispondo: "Funziona?"

E il JN risponde: "Sì."

E io dico: "Allora no."

E il JN dice: "Ok."

E il codice resta brutto. Ma funzionante. E funzionante batte elegante. Sempre. Per sempre. Amen.

---

## Il costo dell'eleganza

| Voce | Valore |
|------|--------|
| File refactorati | 12 |
| File che hanno smesso di funzionare | 12 |
| Tempo di downtime pagamenti | 2 giorni |
| Tempo di fix | 8 ore |
| Report sbagliati | 847 |
| Chiamate del CTO | 3 |
| Nervi del sistemista | Inestimabile |
| Lezioni imparate | 1 (finalmente) |

**ROI del refactor non autorizzato: -∞%**

Ma l'eleganza è tentante. E la tentazione è umana. E gli umani vogliono migliorare. E migliorare è buono. Ma migliorare ciò che funziona è pericoloso. E il pericolo è reale. E il costo è alto. E il costo lo paga qualcuno. E quel qualcuno sono quasi sempre io. Che fixo. Che spiego. Che ripeto. Ancora. Sempre. Per sempre. Come un loop. Un loop infinito. Di refactor. E disastri. E fix. E lezioni. Che nessuno impara. Fino a quando non le impara. E quando le impara, è troppo tardi. Perché il danno è fatto. E il danno è reale. E il fix è lungo. E la pazienza è poca. E la vita è breve. Troppo breve per refactor non autorizzati. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](32-la-riunione-che-poteva-essere-una-email.md) | [Prossima](34-il-fix-provvisorio-definitivo.md)**
