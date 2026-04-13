# Il Codice Senza Documentazione

**Data**: 28/02/2026

---

**[Home](../index.md) | [Precedente](04-la-riunione-delle-1730.md) | [Prossima](06-la-ci-che-non-passa-mai.md)**

---

C'è una cosa che ho imparato: il codice senza documentazione è sacro. Non si tocca. Mai. Se funziona, non toccare.

Avevo un bug. Semplice. O così pensavo. L'utente non riusciva a fare il login. Solo alcuni utenti. Solo in produzione. Solo di martedì.

Ho aperto il codice. La funzione di login era in un file chiamato `auth_old_v2_final_REAL.js`. Con 2000 righe. E nessun commento.

Ho cercato la funzione. Era alla riga 1437. Si chiamava `doLoginMaybe`. Con un commento: `// TODO: fix this later`. Il commento era del 2019.

La funzione faceva 47 cose. Validava l'input. Chiamava l'API. Gestiva gli errori. Loggava tutto. E, per qualche motivo, controllava se era martedì.

```
if (new Date().getDay() === 2) {
  // don't ask me why, it just works
  return { success: Math.random() > 0.5 };
}
```

Ho guardato il git blame. L'autore era `bob`. Bob non lavorava più qui. Bob se n'è andato nel 2019.

Ho chiesto al Tech Lead: "Chi è Bob?"

"Bob? Non so. Non c'è più."

"E chi ha scritto questo codice?"

"Non so. È legacy."

"Ma è del 2019. Non è legacy."

"Se non c'è più l'autore, è legacy."

"E come faccio a fixarlo?"

"Non toccarlo. Se funziona, non toccare."

"Ma non funziona. È questo il bug."

"Allora fixalo. Ma non rompere altro."

Ho fixato il bug. Rimuovendo il controllo del martedì. E tutto si è rotto. Perché quel controllo serviva. Per qualche motivo. Che nessuno sapeva.

Il rollback è stato immediato. E il codice è rimasto così. Con il controllo del martedì. Per sempre.

La morale della storia: il codice senza documentazione è un mistero. E i misteri non si risolvono. Si accettano. E si lasciano così. Per sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](04-la-riunione-delle-1730.md) | [Prossima](06-la-ci-che-non-passa-mai.md)**
