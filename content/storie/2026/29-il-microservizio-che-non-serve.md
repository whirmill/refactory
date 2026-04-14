# Il Microservizio Che Non Serve

**Data**: 06/09/2026

---

**[Home](../index.md) | [Precedente](28-il-deploy-di-venerdi.md)**

---

C'è una cosa che ho imparato: i microservizi sono come i figli. Tutti dicono che sono meravigliosi. Ma nessuno ti dice quanto costano. E quanto rompono le scatole.

![](../../img/microservizio.jpg)

Era un mercoledì. Il CTO ha chiamato una riunione.

"Dobbiamo modernizzare l'architettura."

"Modernizzare come?" ho chiesto.

"Microservizi."

"Microservizi?"

"Sì. Il monolite è obsoleto. Tutti usano microservizi ora."

"Tutti chi?"

"Netflix. Amazon. Google. Tutti."

"Noi non siamo Netflix. Siamo 4 sviluppatori. Con un monolite che funziona da 3 anni."

"Appunto. È ora di evolvere."

Il JN era entusiasta. "Io posso farlo! Ho letto un libro sui microservizi!"

"Hai letto un libro?"

"Sì. E fatto un corso online. So tutto."

Il TL ha sospirato. "Quanti microservizi?"

"Il CTO ha guardato una slide. "Iniziamo con 5. Poi espandiamo."

"5 microservizi per cosa?"

"Uno per gli utenti. Uno per gli ordini. Uno per i pagamenti. Uno per le notifiche. E uno per... non so. Qualcosa."

"Qualcosa?"

"Sì. Ci penseremo."

"Quindi 5 microservizi. Per un sistema che ora è un monolite. Che funziona. Che è gestito da 4 persone."

"Sì. È la scala enterprise."

"Enterprise? Abbiamo 200 utenti. Enterprise è quando hai 2 milioni di utenti."

"Il CTO ha scosso la testa. "Pensa in grande. Dobbiamo essere pronti per la crescita."

"Quale crescita?"

"La crescita futura."

"La crescita futura che non c'è?"

"Che ci sarà. E quando ci sarà, saremo pronti."

Tre mesi dopo, avevamo 5 microservizi. E 5 problemi.

"Il servizio degli utenti è giù" ha detto il JN.

"E quindi?"

"E quindi non si possono fare gli ordini."

"Perché?"

"Perché gli ordini dipendono dagli utenti. E gli utenti sono giù."

"E i pagamenti?"

"I pagamenti dipendono dagli ordini. Che dipendono dagli utenti. Che sono giù."

"E le notifiche?"

"Le notifiche dipendono dai pagamenti. Che dipendono dagli ordini. Che dipendono dagli utenti. Che sono giù."

"Quindi tutto è giù?"

"Sì. Tutto è giù. Perché un servizio è giù."

"E prima? Quando era un monolite?"

"Prima, se una parte era giù, il resto funzionava."

"Esatto. Ora, se una parte è giù, tutto è giù."

"È il prezzo della modernità" ha detto il CTO passando.

"La modernità?" ho chiesto. "Abbiamo trasformato un sistema che funzionava in 5 sistemi che si rompono a vicenda."

"Ma è scalabile."

"Scalabile verso il basso. Sì."

Il PM è arrivato. "Il cliente chiama. Il sistema è giù."

"Il servizio degli utenti è giù" ho detto.

"E quindi?"

"E quindi tutto è giù."

"Perché tutto dipende da tutto?"

"Sì. È l'architettura a microservizi."

"E perché abbiamo fatto questa architettura?"

"Per essere come Netflix."

"Siamo come Netflix?"

"No. Netflix ha 2000 ingegneri. Noi abbiamo 4. E 5 microservizi. E un sistema che non funziona."

Il JN stava debuggando. "Ho trovato il problema."

"Quale?"

"Il servizio degli utenti ha un memory leak."

"Un memory leak?"

"Sì. L'ho introdotto io. Quando ho scritto il servizio."

"E non l'hai trovato prima?"

"Non l'ho trovato perché non testiamo i microservizi insieme. Li testiamo separatamente. E separatamente funzionano. Insieme no."

"Quindi abbiamo 5 servizi che funzionano da soli. Ma non insieme."

"Esatto."

"E questo è meglio del monolite?"

"In teoria, sì."

"E in pratica?"

"In pratica, no. Ma in teoria è più elegante."

Abbiamo passato 2 giorni a sistemare il memory leak. E altri 3 giorni a sistemare i problemi che il memory leak aveva causato. E altri 2 giorni a scrivere test di integrazione. Che non avevamo. Perché "i microservizi sono semplici."

Il CTO ha chiamato un'altra riunione.

"Cosa abbiamo imparato?"

"I microservizi sono complicati" ho detto.

"I microservizi sono il futuro" ha detto il CTO.

"Il futuro è complicato."

"Il futuro è scalabile."

"Scalabile quando funziona. Quando non funziona, è un disastro."

Il JN ha alzato la mano. "Ho un'idea."

"Quale?"

"Torniamo al monolite."

"Tornare al monolite?" ha chiesto il CTO. "Indietro?"

"Sì. Il monolite funzionava. I microservizi no."

"Ma il monolite è obsoleto."

"Obsoleto ma funzionante. I microservizi sono moderni ma rotti."

Il CTO ha pensato. "Ok. Ma non ditelo a nessuno."

"A nessuno?"

"No. La narrative è che stiamo ottimizzando l'architettura. Non che stiamo tornando indietro."

"Quindi mentiamo?"

"Non mentiamo. Rielaboriamo la verità."

Abbiamo passato 3 mesi a tornare al monolite. Chiamandolo "ottimizzazione dell'architettura." Il sistema ha ricominciato a funzionare. Il cliente ha smesso di chiamare. Il PM ha smesso di lamentarsi.

Il JN ha chiesto: "Quindi i microservizi erano inutili?"

"I microservizi non erano inutili. Erano sbagli per noi."

"Perché?"

"Perché Netflix ha 2000 ingegneri. Noi abbiamo 4. Netflix ha milioni di utenti. Noi abbiamo 200. Netflix ha problemi di scala. Noi abbiamo problemi di budget."

"E quindi?"

"E quindi non dobbiamo essere come Netflix. Dobbiamo essere come noi. Con la nostra architettura. Che funziona. Che è semplice. Che è gestibile. Da 4 persone. Non da 2000."

La morale: i microservizi sono come le auto sportive. Sembrano fichi. Costano un sacco. E se non sai guidarle, ti ammazzano. E la maggior parte delle aziende non ha bisogno di auto sportive. Ha bisogno di una macchina che va. Che non si rompe. Che costa poco. E che porta le persone dove devono andare. Ma le auto sportive sono fichi. E tutti vogliono essere fichi. Anche se non possono permettersele. Anche se non sanno guidarle. Anche se le distruggono al primo incidente. E poi tornano alla macchina vecchia. Che andava. E continua ad andare. Mentre l'auto sportiva è in officina. Ad arrugginire. Come i nostri 5 microservizi. Che ora sono 5 repository. Che nessuno tocca. Che nessuno ricorda. Ma che erano "moderni." E "scalabili." E "enterprise." E completamente inutili. Per noi.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](28-il-deploy-di-venerdi.md)**
