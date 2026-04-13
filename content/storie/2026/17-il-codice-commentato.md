# Il Codice Commentato

**Data**: 20/06/2026

---

**[Home](../index.md) | [Precedente](16-lo-standup-infinito.md) | [Prossima](18-il-deploy-di-venerdi.md)**

---

C'è una cosa che ho imparato: il codice commentato non si cancella mai. Rimane lì. Per sempre. Come un monumento al fallimento.

Avevo un bug. Nel componente `PaymentForm`. Il pagamento non andava. A volte. Solo per alcuni utenti. Solo in produzione.

Ho aperto il file. E ho trovato questo:

```javascript
// TODO: fix this later - Bob 2019
// const oldPaymentLogic = () => {
//   ... 50 righe di codice commentato ...
// }

// DON'T DELETE THIS - it's important - Bob 2019
// function legacyPayment() {
//   ... 100 righe di codice commentato ...
// }

// FIXME: this is broken but I don't know why - Bob 2020
// if (user.type === 'premium') {
//   ... 30 righe di codice commentato ...
// }

// Actual code starts here
function processPayment(user, amount) {
  // TODO: add validation
  // TODO: add error handling
  // TODO: add logging
  // TODO: add tests
  
  return fetch('/api/pay', {
    method: 'POST',
    body: JSON.stringify({ user, amount })
  });
}
```

Ho guardato il git blame. Tutti i commenti erano di Bob. Bob non lavorava più qui. Bob se n'era andato nel 2020.

Ho cancellato i commenti. Tutti. E il codice ha smesso di funzionare.

"Perché?" ho chiesto al Tech Lead.

"Perché quei commenti erano importanti."

"Ma erano commenti! Non codice!"

"Sì, ma il codice li usava."

"Come?"

"Non so. Ma funzionava."

Ho fatto rollback. E i commenti sono tornati. E il codice ha ricominciato a funzionare.

Non ho chiesto perché. Non volevo sapere. Ho solo aggiunto un altro commento:

```javascript
// DON'T DELETE THE COMMENTS - they are load-bearing - ME 2026
```

La morale della storia: il codice commentato non si cancella mai. Perché qualcuno, da qualche parte, per qualche motivo, lo usa. E se lo cancelli, tutto si rompe. E non sai perché. E fai rollback. E i commenti rimangono. Per sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](16-lo-standup-infinito.md) | [Prossima](18-il-deploy-di-venerdi.md)**
