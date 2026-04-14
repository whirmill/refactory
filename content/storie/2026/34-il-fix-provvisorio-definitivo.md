# Il Fix Provvisorio Definitivo

**Data**: 11/10/2026

**[Home](../index.md) | [Precedente](33-il-refactor-che-nessuno-ha-chiesto.md)**

---

C'è una legge universale nello sviluppo software: non esiste nulla di più permanente di un fix provvisorio. Il fix provvisorio è come un ospite che dice "sto solo una notte" e poi si trasferisce. Per sempre. Nel tuo codice. Nel tuo cuore. E nei tuoi incubi.

![](../../img/code.jpg)

Tutto è iniziato un venerdì sera. Venerdì 13 marzo 2024. Data che avrei dovuto leggere come presagio. Ma non l'ho fatto. Perché ero stanco. E quando sei stanco, i presagi sono solo coincidenze.

Il PM mi ha chiamato alle 18:47.

"I clienti non riescono a fare login."

"Che errore dà?"

"Non dà errore. La pagina si carica all'infinito."

Ho guardato i log. Il database delle sessioni era pieno. Completamente pieno. 2TB di sessioni vecchie. Sessioni del 2019. Sessioni di utenti che non esistevano più. Sessioni di utenti che erano morti. Letteralmente morti. Ma le loro sessioni erano ancora lì. A occupare spazio. A bloccare tutto.

Il JN era già andato via. Il TL era in ferie. Il CTO era... beh, il CTO non si occupa di queste cose. Sono cose da plebei. Da sistemisti. Da me.

Così ho fatto quello che ogni sistemista farebbe in una situazione del genere: un fix provvisorio.

```sql
-- FIX PROVVISORIO: cancellare sessioni più vecchie di 6 mesi
DELETE FROM sessions WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);
-- TODO: rimuovere questo fix e implementare cleanup automatico
```

Ho eseguito. Il database ha respirato. I login hanno funzionato. I clienti hanno smesso di urlare. Il PM ha detto: "Grazie, sei un genio."

Ho detto: "È provvisorio. Lunedì faccio il fix definitivo."

Il PM ha detto: "Ok, lunedì allora."

Lunedì non è mai arrivato.

---

Il lunedì successivo, il PM mi ha chiamato.

"Abbiamo una nuova feature urgente."

"Ma devo fixare il database delle sessioni."

"La feature è più urgente."

"Ma il fix è provvisorio."

"Il provvisorio funziona. La feature no."

Così ho fatto la feature. E il fix provvisorio è rimasto. Nel database. Come un commento. Come un promemoria. Come una promessa non mantenuta.

Il martedì, il TL è tornato dalle ferie.

"Come è andata?"

"Bene. Ho fatto un fix provvisorio al database delle sessioni."

"Provvisorio?"

"Sì. Lunedì dovevo farlo definitivo. Ma c'era una feature urgente."

"E adesso?"

"Adesso c'è un'altra feature urgente."

"E il fix?"

"Il fix aspetta."

Il fix ha aspettato. Per 2 anni. E 7 mesi.

---

Ogni tanto, qualcuno chiedeva: "Perché c'è questo commento nel codice?"

```sql
-- TODO: rimuovere questo fix e implementare cleanup automatico
```

E io rispondevo: "È un fix provvisorio. Lo rimuovo presto."

E loro dicevano: "Ok."

E io dicevo: "Presto."

E "presto" diventava "poi". E "poi" diventava "mai". E "mai" diventava "per sempre". E "per sempre" diventava... beh, adesso.

---

Il problema è che il fix provvisorio aveva un bug. Un bug piccolo. Insignificante. All'apparenza.

Il fix cancellava le sessioni più vecchie di 6 mesi. Ma cancellava anche le sessioni degli utenti "premium" che avevano un abbonamento annuale. E gli utenti premium pagavano per non dover fare login ogni volta. Per 12 mesi. Non 6.

Così, ogni 6 mesi, gli utenti premium venivano sloggati. E dovevano rifare login. E si arrabbiavano. E chiamavano il supporto. E il supporto chiamava me.

"Perché gli utenti premium vengono sloggati?"

"Perché il fix provvisorio cancella le sessioni dopo 6 mesi."

"E perché è provvisorio?"

"Perché non ho mai avuto tempo di farlo definitivo."

"E adesso?"

"Adesso ho tempo."

"Quando?"

"Adesso. Ora. Subito."

Così, dopo 2 anni e 7 mesi, ho finalmente fatto il fix definitivo.

```sql
-- FIX DEFINITIVO: cancellare sessioni più vecchie di 6 mesi per utenti normali
-- e più vecchie di 12 mesi per utenti premium
DELETE s FROM sessions s
LEFT JOIN users u ON s.user_id = u.id
WHERE (u.type = 'premium' AND s.created_at < DATE_SUB(NOW(), INTERVAL 12 MONTH))
   OR (u.type != 'premium' AND s.created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH));
```

Ho fatto il deploy. Ho testato. Ha funzionato.

Il PM mi ha chiamato: "Grazie. Ma perché ci hai messo 2 anni e 7 mesi?"

"Perché c'era sempre qualcosa di più urgente."

"E adesso non c'è?"

"Adesso gli utenti premium si sono lamentati. E quando gli utenti premium si lamentano, tutto diventa urgente."

"Ah."

"Già. Ah."

---

Ma la storia non finisce qui. Perché mentre facevo il fix definitivo, ho scoperto una cosa. Il fix provvisorio era stato copiato. In altri 3 database. Da altri 3 sviluppatori. Che avevano lo stesso problema. E che avevano trovato il mio fix. E che l'avevano usato. Senza dirmelo. Senza chiedere. Senza sapere che era provvisorio.

Così, in 3 altri database, c'era lo stesso fix provvisorio. Lo stesso commento. Lo stesso TODO. Lo stesso bug. E gli stessi utenti premium sloggati.

Ho chiamato gli altri sviluppatori.

"Avete copiato il mio fix?"

"Sì. Funzionava."

"Era provvisorio."

"Ah. E adesso?"

"Adesso dovete fixare anche voi."

"Ma non abbiamo tempo."

"E gli utenti premium?"

"Non abbiamo utenti premium."

"Ah. Ok allora."

Ma uno dei database era per i partner. E i partner erano premium. E i partner si sono lamentati. E il partner manager ha chiamato il CTO. E il CTO ha chiamato me.

"Perché i partner vengono sloggati?"

"Perché hanno copiato il mio fix provvisorio."

"E perché era provvisorio?"

"Perché non ho mai avuto tempo di farlo definitivo."

"E adesso?"

"Adesso ho fatto il fix definitivo. Ma loro non l'hanno fatto."

"E perché l'hanno copiato?"

"Perché funzionava."

"E non hanno letto il commento?"

"Il commento diceva TODO. E i TODO sono come i buoni propositi di Capodanno. Tutti li fanno. Nessuno li mantiene."

Il CTO ha sospirato. "Dobbiamo fare code review obbligatorie."

"Già fatto. Ma questo era 2 anni fa. E le code review non coprivano i database."

"Allora dobbiamo coprire anche i database."

"Già fatto. Ma era troppo tardi."

"Sempre troppo tardi."

"Sempre."

---

La morale è semplice: il fix provvisorio non esiste. Esiste solo il fix permanente che hai chiamato provvisorio per sentirti meglio. Per non dover ammettere che hai fatto un hack. Per non dover documentare. Per non dover testare. Per non dover pensare.

Ma il fix provvisorio diventa permanente. Sempre. Ogni volta. Senza eccezioni. E quando diventa permanente, il bug che contiene diventa permanente. E il bug permanente diventa un problema. E il problema diventa una crisi. E la crisi diventa un fix definitivo. Che arriva sempre troppo tardi. E costa sempre troppo. E insegna sempre troppo poco. Perché la prossima volta, qualcun altro farà un fix provvisorio. E il ciclo ricomincia. Ancora. Sempre. Per sempre.

---

## Il costo del provvisorio

| Voce | Valore |
|------|--------|
| Tempo dal fix provvisorio al definitivo | 2 anni, 7 mesi |
| Utenti premium sloggati | 12.847 |
| Ticket supporto | 3.291 |
| Database con fix provvisorio copiato | 4 |
| Partner sloggati | 23 |
| Chiamate del CTO | 7 |
| Chiamate del partner manager | 14 |
| Nervi del sistemista | Inestimabile |
| TODO rimasti nel codice | 847 (e contano) |

**ROI del fix provvisorio: -∞% (ma funziona, quindi...)**

Il fix provvisorio funziona. E questo è il problema. Perché quando funziona, nessuno lo tocca. E quando nessuno lo tocca, diventa permanente. E quando diventa permanente, diventa un problema. E quando diventa un problema, è troppo tardi. Sempre. Ogni volta. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](33-il-refactor-che-nessuno-ha-chiesto.md)**
