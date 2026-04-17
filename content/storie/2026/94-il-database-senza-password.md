# Il Database Senza Password

**Data**: 05/12/2026

**[Storie 2026](index.md) | [Precedente](93-il-log-che-ha-riempito-il-disco.md) | [Prossima](95-il-certificato-scaduto-che-ha-ucciso-tutto.md)**

---

C'è una regola fondamentale nella sicurezza informatica: i database devono avere una password. Sempre. Senza eccezioni. Mai. Per nessun motivo. Mai.

![](../../img/database.jpg)

C'è anche una regola fondamentale nel mondo aziendale: le regole sono fatte per essere ignorate quando sono scomode. Soprattutto se a ignorarle è un manager che ha fretta.

La storia inizia un venerdì pomeriggio. UL mi chiama nel suo ufficio.

"Dobbiamo fare una demo lunedì mattina."

"Che demo?"

"La demo per il cliente importante."

"Quale cliente importante?"

"Quello che ci può dare il contratto da 5 milioni."

"Ah, quel cliente. E cosa dobbiamo dimostrare?"

"Il nuovo sistema di gestione."

"Quale nuovo sistema?"

"Quello che non abbiamo ancora sviluppato."

Ho aspettato. UL ha continuato.

"Ma abbiamo il database!"

"Il database?"

"Sì, il database con tutti i dati del cliente!"

"Quale database?"

"Quello che ho fatto configurare ieri."

"Ieri?"

"Sì, ho chiesto a Bob di configurarlo."

"Bob?"

"Sì, Bob. Il part-time."

Ho chiamato Bob. Bob ha risposto.

"Hai configurato un database ieri?"

"Sì."

"Per chi?"

"Per UL."

"E che database è?"

"Un MySQL."

"E dove sta?"

"Su quel server vecchio in cantina."

"E ha una password?"

Silenzio.

Poi: "UL mi ha detto di fare in fretta."

"E quindi?"

"E quindi l'ho configurato senza password."

"Senza password?"

"Sì, UL ha detto che la password era una perdita di tempo."

Ho riattaccato. Ho guardato UL.

"Il database non ha password."

"E allora?"

"È un database di produzione. Con dati del cliente. Senza password."

"E chi vuoi che lo trovi?"

"È su un server in cantina. Connesso alla rete. Senza password."

"Ma chi va in cantina?"

"Hacker. Bot. Script kiddies. Chiunque."

"Ma non sanno che c'è!"

"Il server è in rete. Ha un IP. Una scansione di porte lo trova in 30 secondi."

UL ha sbuffato.

"Sei paranoico. Nessuno scannerà le nostre porte."

---

Il sabato sera, ho ricevuto un messaggio dal sistema di monitoraggio. Il messaggio diceva:

"ALERT: Connessione insolita al database in cantina."

Ho aperto il log. Il log diceva:

```
[2026-12-05 23:47:12] Connessione da: 192.168.1.105
[2026-12-05 23:47:15] Query: SHOW DATABASES;
[2026-12-05 23:47:18] Query: SELECT * FROM clienti;
[2026-12-05 23:47:22] Query: SELECT * FROM credenziali;
[2026-12-05 23:47:30] Query: DROP DATABASE produzione;
```

Ho chiamato UL. UL non ha risposto.

Ho chiamato SL. SL ha risposto.

"Il database è stato cancellato."

"Quale database?"

"Quello in cantina. Senza password."

"Ma quello era per la demo!"

"Era per la demo. Adesso è vuoto."

"E i dati?"

"Tutti cancellati."

"Tutti?"

"Tutti. 50.000 record. 3 anni di lavoro. Andati."

"E chi è stato?"

"Non lo so. L'IP era interno. 192.168.1.105."

"Interno?"

"Sì. Qualcuno dalla nostra rete."

---

Il lunedì mattina, la demo è stata... interessante.

UL: "E questo è il nostro sistema di gestione!"

Cliente: "Molto interessante. Possiamo vedere i dati?"

UL: "Certo!" (clicca) "Ecco... ehm..."

Schermata vuota.

Cliente: "Non ci sono dati?"

UL: "C'è stato un... piccolo problema tecnico."

Cliente: "Che tipo di problema?"

UL: "I dati sono... temporaneamente non disponibili."

Cliente: "E quando saranno disponibili?"

UL: "Stiamo lavorando per recuperarli."

Cliente: "Ma i dati che mi avete mostrato nel contratto? I 50.000 record?"

UL: "Sì, beh, quelli... erano... di test."

Cliente: "Di test? Nel contratto c'era scritto 'dati reali'."

UL: "Sì, ma... c'è stato un aggiornamento."

Cliente: "Un aggiornamento che ha cancellato tutto?"

UL: "Più o meno."

Il cliente se n'è andato. Senza firmare il contratto. Senza i 5 milioni.

---

L'indagine interna ha rivelato che:

1. L'IP 192.168.1.105 apparteneva al laptop di JN
2. JN aveva installato un "tool di ottimizzazione database" trovato su un forum
3. Il tool era in realtà uno script che cercava database senza password
4. Lo script trovava il database, scaricava i dati, e li cancellava
5. JN non sapeva cosa facesse il tool
6. JN pensava fosse un tool per "velocizzare le query"

JN ha detto: "Ma come facevo a sapere che era pericoloso? C'era scritto 'Ottimizzatore Professionale'!"

E io ho detto: "E l'hai installato sul laptop aziendale?"

E JN ha detto: "Sì, per ottimizzare il database!"

E io ho detto: "Il database di produzione?"

E JN ha detto: "Non sapevo che fosse di produzione!"

E io ho detto: "E perché hai lanciato DROP DATABASE?"

E JN ha detto: "Pensavo fosse un comando di ottimizzazione!"

E io ho smesso di parlare.

---

La lezione, come sempre, è che:

1. I database devono avere una password. Sempre.
2. I database di produzione non stanno su server vecchi in cantina
3. I dipendenti non installano tool trovati su forum
4. I manager non chiedono database senza password
5. Le demo non si fanno con database senza backup

Ma la lezione più importante è questa: quando UL dice "fai in fretta", la risposta giusta è "facciamo come si deve".

Perché altrimenti, il database non ha password. E qualcuno lo trova. E lo cancella. E la demo va male. E il cliente se ne va. E i 5 milioni diventano zero.

E UL dice: "Non potevamo sapere che sarebbe successo."

E io dico: "Sì che potevamo. Bastava mettere una password."

E UL dice: "Ma era una perdita di tempo!"

E io dico: "Adesso abbiamo perso tutto."

E UL dice: "Ma come facciamo la demo?"

E io dico: "Non la facciamo."

E UL dice: "E i 5 milioni?"

E io dico: "Andati."

E UL dice: "E adesso?"

E io dico: "Adesso mettiamo una password."

---

## Il costo del non mettere una password

| Voce | Costo |
|------|-------|
| Contratto perso | 5.000.000€ |
| Dati persi | Inestimabile |
| Tempo di recupero | 3 settimane |
| Reputazione | Inestimabile |
| Nervi del sistemista | Inestimabile |
| **Totale** | **5.000.000€ +** |

Costo di mettere una password: 30 secondi.

**ROI del non mettere una password: -∞%**

Ma i manager non capiscono l'infinito. Capiscono solo "fai in fretta".

E la fretta costa. Sempre.

---

## Epilogo

Dopo l'incidente, sono state implementate nuove regole:
1. Tutti i database devono avere una password
2. I database di produzione stanno su server di produzione
3. I dipendenti non installano tool senza approvazione
4. I backup sono obbligatori e verificati
5. Le demo si fanno con dati di test, non di produzione

UL ha seguito un corso di sicurezza dei database. Ha imparato che:
- Le password sono obbligatorie
- I database di produzione sono sacri
- I backup sono essenziali
- La fretta è nemica della sicurezza

Il corso è durato 4 ore. UL ha detto: "Ho imparato molto."

La settimana dopo, UL ha chiesto un nuovo database. Per un altro cliente importante. Con una demo il lunedì dopo.

Ho chiesto: "Ha la password?"

UL ha detto: "Sì, certo!"

Ho verificato. La password era: "password123".

E il ciclo ricomincia.

---

## Commenti

I commenti vengono aggiunti **quando** e, più importante, **se** ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](93-il-log-che-ha-riempito-il-disco.md) | [Prossima](95-il-certificato-scaduto-che-ha-ucciso-tutto.md)**
