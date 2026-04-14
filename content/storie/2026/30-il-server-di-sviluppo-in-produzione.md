# Il Server di Sviluppo in Produzione

**Data**: 13/09/2026

**[Home](../index.md) | [Precedente](29-il-microservizio-che-non-serve.md)**

---

C'è una regola aurea nello sviluppo software: mai, MAI, mettere credenziali di sviluppo in produzione. È la prima cosa che impari. È l'ultima cosa che dimentichi. È la cosa che tutti, prima o poi, fanno.

![](../../img/production.jpg)

Era un venerdì. Venerdì pomeriggio. Le 16:47. Un'ora pericolosa. L'ora in cui le decisioni peggiori vengono prese.

Il JN mi ha chiamato. "Ho finito la feature!"

"Ottimo. Hai fatto il deploy?"

"No, pensavo di farlo lunedì."

"Bene. Ottima idea. Non fare deploy di venerdì."

"Ma..."

"Niente ma. Lunedì. Sempre."

Il JN ha annuito. E se ne è andato.

Alle 17:23, il mio telefono ha squillato. Era il PM.

"Il sistema è giù."

"Quale sistema?"

"Quello dei pagamenti."

"Come giù?"

"Giù giù. Non funziona nulla."

Ho aperto il laptop. Ho controllato i log. C'era scritto:

`ERROR: Cannot connect to database 'dev_test_db' on '192.168.1.50:3306'`

Ho guardato lo schermo. Ho guardato il telefono. Ho guardato il soffitto.

`dev_test_db`. Su un IP interno. In produzione.

Ho chiamato il JN.

"Hai fatto il deploy?"

"Sì."

"Quando?"

"Adesso."

"Perché?"

"Perché volevo andare via prima."

"E hai messo le credenziali di sviluppo in produzione?"

"Sì. Per comodità."

"Per comodità?"

"Sì. Così non dovevo cambiare le variabili d'ambiente."

Ho respirato. Profondamente.

"Sai che il server di sviluppo è sulla mia scrivania?"

"Sì."

"E sai che è spento?"

"Sì."

"E sai che la produzione sta cercando di connettersi al mio server spento?"

"Ah."

"Ah."

"Quindi..."

"Quindi il sistema dei pagamenti è giù. Perché sta cercando un database che non esiste. Su un server spento. Sulla mia scrivania."

"Cosa facciamo?"

"Tu non fai nulla. Io fixo. E poi parliamo."

---

Sono andato in ufficio. Ho aperto il server di produzione. Ho guardato le variabili d'ambiente.

```
DB_HOST=192.168.1.50
DB_NAME=dev_test_db
DB_USER=admin
DB_PASSWORD=password123
```

`password123`. In produzione. Per un database che si chiama `dev_test_db`.

Ho cambiato tutto. Ho messo le credenziali giuste. Ho riavviato il servizio.

Il sistema è tornato online. 47 minuti di downtime. 47 minuti in cui nessuno poteva pagare. 47 minuti di panico.

Il PM mi ha chiamato. "Cosa è successo?"

"Le credenziali di sviluppo erano in produzione."

"Chi le ha messe?"

"Il JN."

"Perché?"

"Per comodità."

Il PM ha sospirato. "Ancora?"

"Sì. Ancora."

---

Il lunedì seguente, c'è stata una riunione. Con tutti. CTO, TL, PM, JN, io.

Il CTO ha iniziato: "Dobbiamo parlare di quello che è successo."

"Sì" ho detto. "Il JN ha messo le credenziali di sviluppo in produzione."

"Per comodità" ha aggiunto il JN. Con un sorriso imbarazzato.

"La comodità non è una scusa" ha detto il CTO.

"Lo so. Ma era venerdì. E volevo andare via."

"E quindi hai rischiato di far crollare tutto?"

"Non pensavo fosse un problema."

"Il database di sviluppo era su un server spento."

"Non lo sapevo."

"È il tuo lavoro saperlo."

Il TL è intervenuto. "Dobbiamo implementare controlli migliori."

"Tipo?"

"Tipo: niente credenziali hardcoded. Tipo: variabili d'ambiente obbligatorie. Tipo: CI/CD che controlla queste cose."

"Chi lo fa?"

"Io. Con il JN. Così impara."

Il JN ha annuito. "Imparo. Giuro."

---

Tre settimane dopo, avevamo un sistema. Un sistema che:
- Non accetta credenziali hardcoded
- Controlla le variabili d'ambiente prima del deploy
- Ha un file `.env.example` con tutte le variabili necessarie
- Ha un test che fallisce se le variabili non sono settate

Il JN ha fatto un deploy. Ha funzionato. Senza problemi.

Per una settimana.

Poi, il venerdì seguente, alle 16:52, il mio telefono ha squillato.

"Il sistema è giù."

"Quale sistema?"

"Quello delle notifiche."

Ho aperto il laptop. Ho guardato i log.

`ERROR: Cannot connect to SMTP server 'smtp.gmail.com' with credentials 'test@test.com:test123'`

Ho guardato lo schermo. Ho guardato il telefono. Ho guardato il soffitto.

Credenziali di test. Per Gmail. In produzione.

Ho chiamato il JN.

"Hai fatto il deploy?"

"Sì."

"Hai usato le variabili d'ambiente?"

"Sì."

"E allora perché c'è `test@test.com` nei log?"

"Ah. Quello. È che le variabili d'ambiente non funzionavano. E allora le ho messe nel codice. Solo temporaneamente."

"Temporaneamente?"

"Sì. Per far funzionare il deploy."

"E poi?"

"Poi mi sono dimenticato di toglierle."

"Quindi hai bypassato il sistema. Per comodità."

"Sì. Ma solo un po'."

Ho smesso di parlare. Perché non c'era nulla da dire.

---

La morale è semplice: i sistemi non proteggono dalle persone. Le persone proteggono le persone. Ma le persone sono pigre. E la pigrizia è il nemico della sicurezza. E la comodità è la madre di tutti i disastri.

E il JN? Il JN ha imparato. Dopo il terzo incidente. Dopo che il CTO l'ha minacciato di licenziamento. Dopo che ho dovuto spiegargli, per la quindicesima volta, che `dev` significa sviluppo e `prod` significa produzione. E che non sono la stessa cosa. E che non lo saranno mai. E che se metti una cosa nell'altra, tutto si rompe. Sempre.

Ora il JN controlla tre volte. E poi controlla ancora. E poi chiede a me. E io controllo. E poi facciamo il deploy. E funziona.

La maggior parte delle volte.

Tranne quando non funziona.

E quando non funziona, è quasi sempre venerdì. Alle 16:qualcosa. E quasi sempre c'è di mezzo la comodità. E quasi sempre c'è un `test@test.com` da qualche parte. E quasi sempre c'è un JN che dice: "Ma era solo temporaneo."

E quasi sempre, io sono lì. A fixare. A spiegare. A ripetere le stesse cose. Come un disco rotto. Come un loop infinito. Come la vita. Come il lavoro. Come la disperazione di chi sa che succederà ancora. Perché succede sempre. E succederà ancora. E ancora. E ancora.

---

## Il costo della comodità

| Voce | Valore |
|------|--------|
| Downtime primo incidente | 47 minuti |
| Downtime secondo incidente | 23 minuti |
| Tempo perso in riunioni | 4 ore |
| Tempo perso a fixare | 6 ore |
| Nervi del sistemista | Inestimabile |
| Fiducia persa nel JN | Totale |
| Lezioni imparate | 1 (dopo il terzo incidente) |

**ROI della comodità: -∞%**

Ma la comodità è comoda. E le persone scelgono la comodità. Anche quando sanno che è sbagliato. Anche quando sanno che costerà. Anche quando sanno che qualcuno dovrà fixare. Perché tanto, quel qualcuno non sono loro.

E quel qualcuno sono io.

Sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](29-il-microservizio-che-non-serve.md)**
