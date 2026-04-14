# Il Fix che Ha Rotto Tutto

**Data**: 20/09/2026

**[Home](../index.md) | [Precedente](30-il-server-di-sviluppo-in-produzione.md)**

---

C'è una legge fondamentale nell'informatica: ogni fix ne genera altri due. È come l'idra di Lerna, ma con bug. E senza Ercole. E con più caffè.

![](../../img/bug.jpg)

Era un martedì mattina. Un martedì qualunque. Niente di speciale. Il tipo di giornata in cui pensi: "Oggi sistemo quella cosina e poi me ne vado presto."

La cosina era un bug segnalato dal PM. Un bug piccolo. Un bug insignificante. Un bug che, secondo il PM, era "critico e urgente e bloccante e perché non l'hai ancora risolto".

Il bug era questo: in certi casi, il sistema di fatturazione mostrava il prezzo sbagliato. Invece di 100 euro, mostrava 100.00 euro. Con due decimali. Che orrore.

Il PM aveva scritto: "I clienti sono confusi! Vedono due decimali e pensano che ci sia un errore! Dobbiamo fixarlo subito!"

Ho guardato il codice. Ho trovato la funzione che formatta i prezzi. Era così:

```javascript
function formatPrice(price) {
  return price.toFixed(2);
}
```

Semplice. Chiaro. Funzionante. Ma il PM voleva che i prezzi interi non avessero decimali. Quindi 100 doveva diventare "100", non "100.00".

Ho fatto il fix. Una riga. Una sola riga:

```javascript
function formatPrice(price) {
  return price % 1 === 0 ? price.toString() : price.toFixed(2);
}
```

Se il prezzo è intero, lo mostro senza decimali. Se ha decimali, li mostro. Semplice. Geniale. Una riga.

Ho fatto il commit. Ho fatto il push. Ho fatto il deploy. E me ne sono andato a prendere un caffè.

---

Il mercoledì mattina, il mio telefono ha squillato alle 7:43. Era il PM.

"Il sistema è rotto."

"Quale sistema?"

"Quello delle fatture."

"Che succede?"

"Le fatture non si generano più."

"Come non si generano?"

"Non si generano. C'è un errore. E i clienti non ricevono le fatture. E non possiamo fatturare. E siamo fermi."

Ho aperto il laptop. Ho guardato i log. C'era scritto:

`TypeError: price.toString is not a function`

Ho guardato lo schermo. Ho guardato il telefono. Ho guardato il soffitto.

`price.toString is not a function`.

Il prezzo non era un numero. Era una stringa. Una stringa che arrivava da un altro sistema. Un sistema legacy. Un sistema che nessuno aveva documentato.

La funzione `formatPrice` riceveva una stringa. E le stringhe non hanno `toString()`. O meglio, ce l'hanno, ma non funziona come pensavo. E `price % 1` su una stringa restituisce `NaN`. E `NaN === 0` è `false`. Quindi il codice cercava di chiamare `toString()` su una stringa. E JavaScript, nella sua infinita saggezza, diceva: "Non funziona così."

Ho fixato. Così:

```javascript
function formatPrice(price) {
  const num = parseFloat(price);
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}
```

Ho fatto il commit. Ho fatto il push. Ho fatto il deploy. E ho pensato: "Fatto. Problema risolto."

---

Il giovedì mattina, il mio telefono ha squillato alle 6:17. Era il CTO.

"Il sistema è rotto."

"Quale sistema?"

"Quello dei pagamenti."

"Che succede?"

"I pagamenti non vengono processati."

"Come non vengono processati?"

"C'è un errore. E i clienti non possono pagare. E i soldi non arrivano. E l'azienda perde 50.000 euro all'ora."

Ho aperto il laptop. Ho guardato i log. C'era scritto:

`Error: Price mismatch in payment gateway. Expected: "100.00", Got: "100"`

Ho guardato lo schermo. Ho guardato il telefono. Ho guardato il soffitto.

Il gateway di pagamento si aspettava i prezzi con due decimali. Sempre. Anche per i numeri interi. Era documentato? No. Era ovvio? No. Era un problema? Sì.

Il gateway rifiutava i pagamenti perché il formato del prezzo non corrispondeva a quello che si aspettava. E il formato che si aspettava era quello vecchio. Quello con `toFixed(2)`. Sempre.

Ho chiamato il provider del gateway. "Perché volete i decimali anche per i numeri interi?"

"Perché il nostro sistema è fatto così."

"Ma è stupido."

"È il nostro standard."

"E non potete cambiarlo?"

"No."

"E se vi mando i prezzi senza decimali?"

"Li rifiutiamo."

"Tutti?"

"Tutti."

"E da quando?"

"Da sempre. È sempre stato così."

"Ma prima funzionava."

"Perché prima mandavate i prezzi con i decimali."

"Ah."

Ho fixato. Così:

```javascript
function formatPrice(price, options = {}) {
  const num = parseFloat(price);
  if (options.forPayment) {
    return num.toFixed(2);
  }
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}
```

Ho dovuto cambiare tutte le chiamate alla funzione. In tutto il sistema. In 47 file diversi. Perché il gateway di pagamento non accettava prezzi senza decimali. E nessuno lo sapeva. E nessuno l'aveva documentato. E io avevo rotto tutto. Con una riga.

---

Il venerdì mattina, il mio telefono ha squillato alle 5:23. Era il CEO.

"Il sistema è rotto."

"Quale sistema?"

"Tutto."

"Tutto?"

"Tutto. Le fatture, i pagamenti, i report, tutto."

"Che succede?"

"I numeri non tornano. I report mostrano valori sbagliati. Il contabile dice che è tutto sbagliato. E dobbiamo rifare i report del trimestre."

Ho aperto il laptop. Ho guardato i log. Ho guardato il database. Ho guardato i report.

I report sommavano i prezzi. Ma alcuni prezzi erano stringhe. E alcuni erano numeri. E alcuni avevano decimali. E alcuni no. E JavaScript, quando somma stringhe e numeri, fa cose strane.

`"100" + "50.00" + 25` diventava `"10050.0025"`. Non `175`. Ma `"10050.0025"`.

E i report erano tutti sbagliati. Tutti. Del trimestre intero. 3 mesi di report. Da rifare.

Ho fixato. Così:

```javascript
function formatPrice(price, options = {}) {
  const num = parseFloat(price);
  if (options.forPayment) {
    return num.toFixed(2);
  }
  if (options.forReport) {
    return num.toFixed(2);
  }
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}
```

E ho dovuto ricalcolare tutti i report. Tutti. Del trimestre intero. 3 mesi di dati. 847 report. 847 file Excel. 847 email da rinviare.

---

La settimana dopo, c'è stata una riunione. Con tutti. CEO, CTO, PM, TL, io.

Il CEO ha iniziato: "Chi ha fatto questo fix?"

"Io" ho detto.

"Perché?"

"Perché il PM voleva che i prezzi interi non avessero decimali."

"E hai rotto tutto?"

"Sì."

"Perché?"

"Perché non sapevo che il gateway di pagamento voleva i decimali. E non sapevo che i report sommavano stringhe. E non sapevo che i prezzi potevano essere stringhe. E non sapevo che c'erano 47 file che usavano quella funzione. E non sapevo un sacco di cose."

"E perché non le sapevi?"

"Perché non erano documentate."

"E perché non le hai cercate?"

"Perché era una riga. Una sola riga. Pensavo fosse semplice."

Il CTO è intervenuto. "Una riga non è mai semplice. Una riga è la riga più pericolosa. Perché una riga significa che non hai pensato a tutto il resto. E il resto è sempre più grande di una riga."

Il TL ha aggiunto: "Dobbiamo avere test. Test che verificano che una modifica non rompe tutto."

"E chi li scrive i test?"

"Io. Con te. Così impari."

Ho imparato. Ho scritto test. 23 test per la funzione `formatPrice`. Test per numeri interi. Test per decimali. Test per stringhe. Test per il gateway di pagamento. Test per i report. Test per tutto.

E i test hanno trovato altri 3 bug. Bug che non sapevo di aver introdotto. Bug che avrebbero rotto altre cose. Bug che ho fixato. Prima che rompessero tutto.

---

La morale è semplice: una riga non è mai una riga. Una riga è l'inizio di una storia. Una storia che può finire bene. O può finire con il telefono che squilla alle 5:23. Con il CEO che urla. Con i report da rifare. Con la disperazione di chi pensava che fosse semplice.

E il PM? Il PM ha smesso di chiedere fix "veloci". Dopo che ho spiegato che il suo fix da "una riga" aveva causato 847 report da rifare. E 50.000 euro persi in un'ora. E 3 giorni di lavoro. E un'ulcera.

Ora, quando il PM vuole un fix, chiede: "Quanto tempo serve?"

E io rispondo: "Per fare il fix? 5 minuti. Per assicurarmi che non rompa tutto? 2 giorni."

E il PM dice: "Ok, prenditi 2 giorni."

E io dico: "Grazie."

E il fix funziona. Senza rompere tutto. La maggior parte delle volte.

Tranne quando rompe tutto. Perché non si può mai sapere. E non si può mai testare tutto. E c'è sempre qualcosa che non avevi considerato. Qualcosa che non era documentato. Qualcosa che ti aspetta. Come una mina. Pronta a esplodere. Quando meno te lo aspetti. Di solito il venerdì. Alle 16:qualcosa. O il sabato. Alle 5:23. Quando il CEO chiama. E tu sei lì. A fixare. A spiegare. A imparare. Ancora. Sempre. Per sempre.

---

## Il costo di una riga

| Voce | Valore |
|------|--------|
| Tempo per il fix originale | 5 minuti |
| Tempo per fixare i bug successivi | 3 giorni |
| Report da rifare | 847 |
| Soldi persi (downtime pagamenti) | 400.000€ |
| Chiamate alle 5:23 | 2 |
| Nervi del sistemista | Inestimabile |
| Lezioni imparate | Molte |
| Test scritti | 23 |

**ROI di una riga: -∞%**

Ma una riga è veloce. E la velocità è tentante. E la tentazione è umana. E gli umani fanno errori. E gli errori costano. E il costo è sempre più alto di quanto pensi. Sempre. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](30-il-server-di-sviluppo-in-produzione.md)**
