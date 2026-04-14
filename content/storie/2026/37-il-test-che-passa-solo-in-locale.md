# Il Test Che Passa Solo in Locale

**Data**: 01/11/2026

**[Home](../index.md) | [Precedente](36-il-ticket-che-non-muore-mai.md)**

---

C'è un test. Passa sul mio computer. Passa sul computer del JN. Passa sul computer del TL. Ma fallisce in CI. Sempre. Ogni volta. Senza eccezioni. E nessuno sa perché.

![](../../img/code.jpg)

Il test si chiama `test_user_registration_complete_flow`. È un test importante. Testa la registrazione degli utenti. Che è, beh, abbastanza critica. Se la registrazione non funziona, non abbiamo utenti. Se non abbiamo utenti, non abbiamo business. Se non abbiamo business, non abbiamo stipendi. Quindi, abbastanza importante.

Il test è stato scritto dal JN. Nel 2024. Due anni fa. E da allora, il test fallisce in CI. Ma passa in locale. Sempre. Per tutti.

La prima volta che l'ho visto fallire, era il 2024. Ho guardato il log. Diceva: "AssertionError: Expected email to be sent, but no email was sent."

Ho guardato il codice. Il codice mandava un'email. O almeno, chiamava la funzione che mandava un'email. La funzione esisteva. L'avevo scritta io. Funzionava. L'avevo testata. In locale.

Ho chiesto al JN: "Il tuo test fallisce in CI."

Il JN ha detto: "Sì, lo so."

"E non l'hai fixato?"

"Non riesco a fixarlo. In locale passa."

"E in CI?"

"In CI fallisce. Ma non so perché."

"Hai guardato i log?"

"Sì. Dice che l'email non viene mandata."

"E l'email viene mandata?"

"In locale sì. In CI non lo so."

"E quindi?"

"E quindi lo ignoro. Come tutti."

---

Il test è diventato parte della nostra routine. Ogni mattina, la CI fallisce. Ogni mattina, guardiamo il log. Ogni mattina, vediamo: "AssertionError: Expected email to be sent, but no email was sent." Ogni mattina, scrolliamo le spalle. E andiamo avanti.

Il PM ha chiesto: "Perché la CI è sempre rossa?"

Il TL ha risposto: "C'è un test che fallisce."

"E non lo fixate?"

"Non riusciamo a fixarlo. In locale passa."

"E quindi?"

"E quindi lo ignoriamo."

"Ma la CI è rossa!"

"Sì. Ma sappiamo perché. Quindi è ok."

"Non è ok! La CI dovrebbe essere verde!"

"Lo sappiamo. Ma il test passa in locale. E non sappiamo perché fallisce in CI. E abbiamo altre cose da fare. Quindi..."

"Quindi?"

"Quindi ignoriamo. Come sempre."

Il PM non era contento. Ma il PM ha imparato. Come abbiamo imparato tutti. Che alcuni test non si possono fixare. Si possono solo ignorare.

---

Un giorno, ho deciso di indagare. Davvero. Non solo guardare i log e scrollare le spalle. Ma indagare. Come un detective. Come qualcuno a cui importa. Anche se non importava. Ma volevo sapere. Volevo capire. Volevo risolvere il mistero.

Ho guardato il test. Il test faceva questo:
1. Creava un utente
2. Chiamava l'API di registrazione
3. Verificava che l'email fosse stata mandata
4. Verificava che l'utente fosse nel database

Semplice. Diretto. Chiaro. In locale, funzionava. In CI, falliva al punto 3.

Ho guardato l'ambiente CI. Era Linux. Come il mio computer. Era la stessa versione. Stesso kernel. Stesso tutto.

Ho guardato le variabili d'ambiente. Erano diverse. Ma non sembravano rilevanti.

Ho guardato la configurazione. Era diversa. Ma non sembrava rilevante.

Ho guardato... tutto. Per 3 giorni. E non ho trovato nulla.

Il TL mi ha chiesto: "Cosa stai facendo?"

"Indago sul test."

"Quello che fallisce in CI?"

"Sì."

"E l'hai fixato?"

"No."

"E allora perché perdi tempo?"

"Perché voglio capire."

"Capire cosa?"

"Capire perché fallisce."

"È da due anni che fallisce. Nessuno l'ha capito. Perché tu dovresti?"

"Perché sono testardo."

"Il testardo sei tu. Il test è maledetto. Lascialo perdere."

Non l'ho lasciato perdere. Perché sono testardo. E perché il mistero mi consumava. Come un prurito che non si può grattare. Come un pensiero che non se ne va. Come un bug che non si può fixare.

---

Il quarto giorno, ho trovato qualcosa. Non la soluzione. Ma un indizio. Un piccolo, minuscolo, insignificante indizio.

Il test usava una variabile chiamata `EMAIL_ENABLED`. In locale, era `true`. In CI, era `false`.

Ho cercato nel codice. La variabile era usata in un solo posto: la funzione che mandava le email. Se `EMAIL_ENABLED` era `false`, la funzione non mandava nulla. Ritornava subito. Senza fare niente.

Ho cercato nel file di configurazione della CI. La variabile era lì. `EMAIL_ENABLED=false`. Con un commento: "Non mandare email in CI per evitare spam."

Il commento era di Bob. Bob che non lavora più qui. Bob che ha configurato la CI nel 2019. Bob che ha disabilitato le email per evitare spam. Bob che ha rotto il test senza saperlo. Bob che se n'è andato. Lasciandoci con un test rotto. Per sempre.

Ho cambiato la variabile. `EMAIL_ENABLED=true`. Ho fatto partire la CI. Il test è passato.

Ho urlato. Di gioia. Di sollievo. Di vittoria. Finalmente. Dopo due anni. Avevo trovato. Avevo capito. Avevo fixato.

---

Il PM mi ha chiamato: "La CI è verde!"

"Sì, ho fixato il test."

"Come?"

"Ho trovato la variabile `EMAIL_ENABLED`. Era `false` in CI. L'ho messa a `true`."

"E perché era `false`?"

"Perché Bob non voleva spam."

"Bob chi?"

"Bob che non lavora più qui."

"Ah. E adesso?"

"Adesso il test passa."

"E le email?"

"Le email vengono mandate."

"In CI?"

"In CI."

"Ma non è un problema?"

"Perché?"

"Perché manda email a... chi?"

Ho guardato. Il test mandava email a `test@example.com`. Un indirizzo finto. Un indirizzo che non esisteva. Un indirizzo che... non poteva ricevere email.

Ma la CI mandava le email. Attraverso il nostro server SMTP. Che era configurato per mandare email reali. A indirizzi reali. Anche se non esistevano.

Il server SMTP ha ritornato un errore: "550 User not found."

E il test è fallito di nuovo.

Non per l'email non mandata. Ma per l'email non consegnata.

Il test non controllava solo che l'email fosse mandata. Controllava che fosse consegnata. E in CI, con `EMAIL_ENABLED=true`, l'email veniva mandata. Ma non veniva consegnata. Perché l'indirizzo non esisteva.

E il test è tornato a fallire. Come prima. Come sempre. Come per sempre.

---

Ho rimesso `EMAIL_ENABLED=false`. Il test è tornato a passare. In locale. E a fallire. In CI.

Il TL mi ha guardato. Ha detto: "Te l'avevo detto."

"Sì, me l'avevi detto."

"E ora lo sai. Il test è maledetto."

"Il test non è maledetto. È mal configurato."

"E puoi configurarlo bene?"

"No. Perché se configuro bene, le email vengono mandate. E se vengono mandate, falliscono perché l'indirizzo non esiste. E se non vengono mandate, falliscono perché non vengono mandate."

"E quindi?"

"E quindi il test è impossibile."

"Te l'avevo detto."

"Sì. Me l'avevi detto."

"E ora?"

"Ora lo ignoro. Come tutti."

---

**2026 - Oggi**

Il test è ancora lì. `test_user_registration_complete_flow`. Passa in locale. Fallisce in CI. Da due anni.

La CI è rossa. Da due anni. Ogni giorno. Ogni build. Ogni volta.

I nuovi assunti chiedono: "Perché la CI è rossa?"

E noi rispondiamo: "C'è un test che fallisce."

"E non lo fixate?"

"Ci abbiamo provato. Non si può fixare."

"E perché?"

"Perché è maledetto."

"E non potete cancellarlo?"

"Il PM non vuole. Dice che è importante."

"E non potete farlo passare?"

"Ci abbiamo provato. Non passa. In CI. Solo in locale."

"E quindi?"

"E quindi ignoriamo. Come la morte. Come le tasse. Come la realtà."

Il test è il nostro monumento all'impossibilità. Il nostro promemoria che non tutto si può fixare. Che non tutto si può capire. Che a volte, la cosa migliore è arrendersi. E andare avanti.

Con una CI rossa. Per sempre.

---

## Il costo del test immortale

| Voce | Valore |
|------|--------|
| Anni di fallimento | 2 |
| Build fallite | ~1.460 |
| Tempo perso a guardare i log | ~200 ore |
| Tempo perso a cercare di fixarlo | ~50 ore |
| Email mandate a indirizzi inesistenti | 0 (grazie Bob) |
| Variabili di Bob ancora presenti | 47 |
| Valore del test | Negativo (ma il PM insiste) |

**Morale**: Se un test passa solo in locale, forse il problema non è il test. Forse il problema è che Bob ha configurato tutto male nel 2019 e poi se n'è andato. Ma questo non cambia nulla. Il test continuerà a fallire. E noi continueremo a ignorarlo. Perché la vita è troppo breve per debuggare i test di Bob.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](36-il-ticket-che-non-muore-mai.md) | [Prossima](38-il-deploy-del-venerdi.md)**
