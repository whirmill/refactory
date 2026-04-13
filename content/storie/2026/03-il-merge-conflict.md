# Il Merge Conflict

**Data**: 05/02/2026

---

**[Home](../index.md) | [Precedente](02-la-feature-impossibile.md) | [Prossima](04-la-riunione-delle-1730.md)**

---

C'è una cosa che ho imparato: i merge conflict non sono mai colpa tua. Sono sempre colpa di qualcun altro. Ma li devi risolvere tu.

Era venerdì. Volevo fare il merge della mia branch. Una feature semplice. 3 giorni di lavoro. 47 commit. Ma funzionava.

`git checkout main`
`git pull`
`git merge feature/la-mia-feature`

```
CONFLICT (content): Merge conflict in src/components/UserProfile.tsx
CONFLICT (content): Merge conflict in src/utils/api.ts
CONFLICT (content): Merge conflict in package.json
CONFLICT (content): Merge conflict in package-lock.json
Automatic merge failed; fix conflicts and then commit the result.
```

4 file. 4 conflitti. Su una feature che toccava 2 file.

Ho guardato chi aveva modificato quei file. Era il JN. Che aveva fatto un commit su main. Senza PR. Alle 17:30 di giovedì.

"Junior, perché hai fatto commit su main?"

"Perché la mia PR non passava la CI."

"E invece di fixare la CI, hai fatto commit su main?"

"Sì. È più veloce."

"Ma ora ho conflitti."

"Ah, scusa. Ma sono semplici da risolvere, no?"

Ho aperto il primo file. Il JN aveva cambiato tutto. Non solo il codice che serviva. Tutto. Aveva rinominato le variabili. Aggiunto commenti. Rimosso commenti. E cambiato l'indentazione. Da 2 spazi a 4. O era 4 a 2? Non lo so. Era un mix.

Il secondo file era peggio. Aveva importato una libreria nuova. Per una funzione che esisteva già in un'altra libreria. Che avevamo già.

Il terzo file era il package.json. Aveva aggiunto 15 dipendenze. Per una funzione che poteva essere scritta in 3 righe.

Ho risolto i conflitti. In 3 ore. Di venerdì. Alle 18:00.

Poi ho fatto un PR. Con un commento: "Junior, per favore, non fare commit su main. E se la CI non passa, fixa la CI. Non bypassare la CI."

Il JN ha risposto: "Ok, scusa. Ma la CI è lenta."

"La CI è lenta perché abbiamo 15 dipendenze che non servono."

"Ah. Posso rimuoverle?"

"No. Ora sono in main. E rimarranno lì per sempre."

La morale della storia: i merge conflict sono inevitabili. Ma i commit su main senza PR dovrebbero essere illegali. E invece succedono. Sempre. E li risolvi tu. Sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](02-la-feature-impossibile.md) | [Prossima](04-la-riunione-delle-1730.md)**
