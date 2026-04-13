# Il Database Senza Spazio

**Data**: 05/02/2026

**[Storie 2026](index.md) | [Precedente](02-stampante-posseduta.md) | [Prossima](04-riunione-1730.md)**

---

Il database ha finito lo spazio. Di nuovo. Per la terza volta questo mese. E siamo solo al 5 febbraio.

![](../../img/database.jpg)

Il problema è che il database è su un server che ha un disco da 500 GB. Il database ne usa 498. I log ne usano 1.5. Il sistema operativo ne usa 0.3. E rimangono 0.2 GB liberi.

Ogni volta che qualcuno fa una query un po' pesante, il database si riempie. E si pianta.

La soluzione ovvia sarebbe: comprare un disco più grande. O aggiungere un disco. O spostare i log da qualche altra parte.

La soluzione che UL ha approvato è: "cancella i vecchi dati".

"Ma i vecchi dati servono."

"Perché servono?"

"Per le analisi. Per i report. Per la contabilità. Per le tasse."

"Ma quanto spazio occupano?"

"Circa 400 GB."

"E se li cancelliamo?"

"Il database funziona. Ma non abbiamo più i dati."

"E non possiamo archiviarli?"

"Sì, ma serve spazio per l'archivio."

"E non possiamo comprarlo?"

"No, perché non c'è budget."

"E allora cosa facciamo?"

"Compriamo un disco più grande."

"Ma non c'è budget."

"Appunto."

Questo dialogo si ripete ogni volta che il database si riempie. Che è circa ogni 10 giorni.

L'ultima volta, ho deciso di fare qualcosa di diverso. Ho guardato cosa c'era nel database.

Ho scoperto che:
- Il 60% dello spazio era occupato da una tabella chiamata "log_accessi"
- La tabella conteneva 847 milioni di righe
- Ogni riga era un accesso al sistema
- Il sistema era stato dismesso due anni fa

Ho cancellato la tabella. Il database ha recuperato 300 GB.

UL mi ha chiamato: "Ma cosa hai fatto?"

"Ho cancellato i log di un sistema che non esiste più."

"E se servono?"

"Per cosa?"

"Non lo so, magari servono."

"Ma il sistema non esiste più."

"Sì, ma i log..."

"I log di un sistema che non esiste più."

UL ci ha pensato su. Per una settimana. Poi ha detto: "Ok, ma la prossima volta chiedi prima."

La prossima volta che il database si riempie, chiederò. E aspetterò una settimana. E il database resterà piantato per una settimana.

E poi cancellerò i log.

Perché tanto, i log di un sistema che non esiste più, a cosa servono?

A nulla. Ma non si sa mai.

---

## Commenti

I commenti vengono aggiunti **quando** e, più importante, **se** ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](02-stampante-posseduta.md) | [Prossima](04-riunione-1730.md)**
