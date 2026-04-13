# La Documentazione Mancante

**Data**: 05/07/2026

---

**[Home](../index.md) | [Precedente](18-il-deploy-di-venerdi.md) | [Prossima](20-il-legacy-code.md)**

---

C'è una cosa che ho imparato: la documentazione esiste. Da qualche parte. Forse. Se la trovi, è obsoleta. Se non la trovi, è perché non è mai esistita.

Il JN è arrivato con una domanda.

"Come funziona il modulo pagamenti?"

"Non so."

"Come non sai? È il tuo codice."

"No. È il codice di quello che c'era prima di me. Che è andato via. Tre anni fa."

"Ma la documentazione?"

"Quale documentazione?"

"La documentazione del codice."

"Ah. Quella. Non c'è."

"Non c'è?"

"No. O forse c'è. Ma non so dove."

"Ma come fate a lavorare?"

"Leggiamo il codice. E indoviniamo."

"Indovinate?"

"Sì. È come un'indagine. Solo che invece di prove, hai variabili con nomi criptici. E invece di testimoni, hai commenti del 2019 che dicono 'TODO: fix this later'. Later non è mai arrivato."

Il JN ha guardato il codice. Per due ore. Poi è tornato.

"Ho capito come funziona."

"Davvero?"

"Sì. Credo."

"Credi?"

"Sì. Il 70%."

"Il 70% è buono. Io sono al 40%."

"Ma come facciamo a essere sicuri?"

"Non possiamo. Possiamo solo provare. E vedere se si rompe."

"E se si rompe?"

"Fixiamo. E scriviamo un commento. Che dice 'TODO: document this later'. Later non arriverà mai."

Il TL è passato.

"Cosa state facendo?"

"Cercando di capire il modulo pagamenti."

"Perché?"

"Perché il JN deve implementare una nuova feature."

"Ah. C'è un documento nel wiki."

"Un documento?"

"Sì. L'ho scritto io. Nel 2021."

"Dove?"

"Nel wiki. Sezione 'Architettura'. Sotto 'Sistemi Legacy'. Pagina 'Modulo Pagamenti v1'."

Siamo andati al wiki. Abbiamo trovato la pagina. Diceva:

```
# Modulo Pagamenti v1

Stato: DEPRECATO (migrare a v2 quando possibile)

Nota: Questo modulo sarà rimosso. Non toccare.
```

"E la v2?" ho chiesto.

"Non esiste."

"Non esiste?"

"No. L'abbiamo pianificata. Ma non l'abbiamo mai fatta."

"Quindi?"

"Quindi usiamo la v1. Che è deprecata. Ma non possiamo toccare. Perché è deprecata."

"Ma dobbiamo toccarla. Per la nuova feature."

"Allora toccatela. Ma non ditelo a nessuno."

Abbiamo toccato il codice. Si è rotto. L'abbiamo fixato. E abbiamo scritto un commento:

```
// TODO: questo modulo è deprecato ma lo usiamo ancora
// TODO: documentare come funziona
// TODO: migrare a v2 (mai)
```

La morale: la documentazione è come la felicità. Tutti ne parlano. Nessuno l'ha mai vista. E quelli che dicono di averla, probabilmente mentono.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](18-il-deploy-di-venerdi.md) | [Prossima](20-il-legacy-code.md)**
