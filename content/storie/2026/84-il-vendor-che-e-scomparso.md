# Il Vendor Che È Scomparso

**Data**: 26/09/2026

**[Home](../index.md) | [Precedente](83-la-variabile-che-era-diversa-in-produzione.md)]**

---

C'è una regola aurea nell'IT: mai dipendere da un singolo vendor. C'è anche una regola aziendale: il vendor più economico è sempre quello giusto. Queste due regole sono in conflitto. E quando sono in conflitto, vince sempre la seconda. Sempre. Fino a quando non perde.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era un lunedì come tanti. Il caffè era pronto. I log erano stati controllati. Tutto sembrava normale.

Poi, alle 9:17, è arrivato il ticket.

**Ticket #48291**: "Il sistema di fatturazione non funziona."

Ho aperto il sistema di fatturazione. Ha dato errore: "Impossibile connettersi al servizio di validazione."

Il sistema di validazione era un servizio esterno. Un vendor. "CloudValidate Pro" si chiamava. Costava 200 euro al mese. Era stato scelto 5 anni fa perché era il più economico.

Ho provato a connettermi. Timeout.

Ho provato a pingare. Niente.

Ho aperto il sito del vendor. "This domain is for sale."

Ho chiamato il numero di supporto. "Il numero selezionato è inesistente."

Ho mandato un'email. Bounce.

Il vendor era scomparso. Nel nulla. Senza avviso. Senza messaggio. Senza niente.

---

**Martedì - La Riunione**

UL ha indetto una riunione d'emergenza.

**UL**: Com'è possibile che un vendor scompaia?

**ME**: Succede. Le aziende falliscono.

**UL**: Ma non dovevano avvisarci?

**ME**: Dovrebbero. Ma se falliscono, chi avvisa?

**UL**: E adesso cosa facciamo?

**ME**: Troviamo un altro vendor.

**UL**: Quanto tempo ci vuole?

**ME**: Per trovarlo? Poco. Per integrarlo? Dipende.

**UL**: Da cosa?

**ME**: Da quanto è scritto male il nostro codice.

UL mi ha guardato. Io ho guardato UL. Sapevamo entrambi la risposta.

Il codice era scritto male. Molto male. Da uno stagista. 5 anni fa. Lo stagista non c'era più. Il codice era rimasto.

E il codice chiamava il vendor in 47 punti diversi. In 47 modi diversi. Con 47 configurazioni diverse. Sparse in 12 repository.

**UL**: Quanto tempo?

**ME**: Due settimane. Minimo.

**UL**: Non abbiamo due settimane. Le fatture vanno emesse oggi.

**ME**: Allora troviamo un vendor compatibile.

**UL**: Esiste?

**ME**: Non lo so. Bisogna cercare.

---

**Mercoledì - La Ricerca**

Ho cercato vendor di validazione fiscali. Ce n'erano tanti. Ma nessuno compatibile con l'API di CloudValidate Pro.

Perché CloudValidate Pro aveva un'API proprietaria. Documentata male. Con endpoint assurdi. E risposte in formati inventati.

Ho chiamato 15 vendor. 15 vendor hanno detto: "Possiamo integrarci, ma serve tempo."

**Vendor 1**: "Due settimane per l'onboarding."

**Vendor 2**: "Un mese per l'integrazione."

**Vendor 3**: "Non supportiamo quel formato, dovete cambiare il vostro codice."

**Vendor 4**: "Sì, possiamo farlo. Costa 50.000 euro di implementazione."

**Vendor 5**: "Siamo in vacanza fino a ottobre."

Nel frattempo, le fatture si accumulavano. I clienti chiamavano. L'amministrazione piangeva.

---

**Giovedì - La Soluzione (Temporanea)**

Ho trovato una soluzione. Una soluzione temporanea. Una soluzione che faceva schifo, ma funzionava.

**ME**: Possiamo bypassare la validazione.

**UL**: Bypassare?

**ME**: Sì. Invece di chiamare il vendor, facciamo la validazione locale.

**UL**: È legale?

**ME**: Tecnicamente... sì. La validazione è solo un controllo formale. Possiamo farlo noi.

**UL**: E la certificazione?

**ME**: Quella è un problema. Ma se non emettiamo fatture, è un problema più grande.

UL ha approvato. In 5 minuti. Lo stesso UL che ha impiegato 5 mesi per approvare l'acquisto di un monitor.

Ho implementato il bypass. In 4 ore. Con codice che faceva schifo. Ma funzionava.

Le fatture sono ripartite. I clienti hanno smesso di chiamare. L'amministrazione ha smesso di piangere.

Ma il codice faceva schifo. E la certificazione non c'era. E la soluzione era temporanea.

---

**Venerdì - La Verità**

Ho fatto delle ricerche su CloudValidate Pro. Ho scoperto che:

1. L'azienda era una one-man-show. Un solo sviluppatore. In un garage. In Estonia.
2. Lo sviluppatore aveva vinto alla lotteria. E se n'era andato alle Bahamas.
3. Non aveva avvisato nessuno. Perché non c'era nessuno da avvisare.
4. I server erano stati spenti. Per non pagare l'elettricità.
5. Il dominio era scaduto. Per non pagare il rinnovo.

La storia era finita su Hacker News. Con il titolo: "CloudValidate Pro: quando il tuo vendor vince alla lotteria."

I commenti erano divertenti. E terrificanti.

**Commento 1**: "Ahahah, abbiamo usato quel servizio per 3 anni. Oops."

**Commento 2**: "Questo è il motivo per cui non si dipende da un singolo vendor."

**Commento 3**: "Ma quanto costa mantenere un'alternativa? Troppo. Ecco perché."

**Commento 4**: "Io sono lo sviluppatore. Scusate. Ma le Bahamas sono belle."

---

**Lunedì Successivo - Il Post-Mortem**

UL ha indetto un post-mortem. Con slide. E grafici. E un foglio Excel.

**UL**: Cosa abbiamo imparato?

**ME**: A non dipendere da un singolo vendor.

**UL**: E cosa facciamo?

**ME**: Implementiamo un sistema di fallback.

**UL**: Quanto costa?

**ME**: Tempo. Tre mesi di sviluppo.

**UL**: Non c'è budget.

**ME**: Allora non impariamo.

**UL**: Ma dobbiamo imparare!

**ME**: Allora serve budget.

**UL**: Ma non c'è budget!

E il ciclo ricomincia.

---

**Un Mese Dopo - Il Nuovo Vendor**

Abbiamo trovato un nuovo vendor. "ValidateMax Pro". Costa 500 euro al mese. 2.5 volte tanto.

Ma ha un'API standard. E documentazione. E un team di 12 persone. E un ufficio. E un contratto di SLA.

L'integrazione è stata completata in 3 settimane. Con codice nuovo. Che non fa schifo.

Ma il codice vecchio è ancora lì. In 47 punti. Commentato. Con un TODO: "Rimuovere quando avremo tempo."

Non avremo tempo.

---

**Tre Mesi Dopo - La Certificazione**

La certificazione è arrivata. Dopo 3 mesi. Con una lettera dall'Agenzia delle Entrate.

"Caro contribuente, abbiamo notato che le vostre fatture non erano certificate per il periodo X-Y. Questo è un problema. Ma visto che avete risolto, chiudiamo un occhio. Questa volta."

UL ha festeggiato. Con una torta. E un comunicato: "Problema risolto con successo."

Il comunicato non menzionava:
- Le 500 fatture emesse senza certificazione
- Le 47 chiamate al codice commentato
- Il bypass temporaneo che è diventato permanente
- Il vendor che ha vinto alla lotteria
- Le Bahamas

---

**Epilogo**

Il codice del bypass è ancora in produzione. Funziona. Nessuno lo tocca.

Il nuovo vendor funziona. Per ora.

Il vecchio vendor è alle Bahamas. A bere cocktail. A godersi i soldi.

E noi siamo qui. A pagare 500 euro al mese. Per un servizio che prima costava 200.

Ma almeno, il nuovo vendor ha un team di 12 persone. E un ufficio. E un contratto.

E se anche loro vincessero alla lotteria?

Beh, allora ricomincia tutto da capo.

Perché l'azienda non impara. L'azienda risparmia. Ma non impara.

E i vendor scompaiono. È la natura dei vendor.

E noi siamo qui. A guardare. E a sperare che il prossimo vendor non giochi alla lotteria.

---

## Il Costo del Vendor Scomparso

| Voce | Costo |
|------|-------|
| Fatture in ritardo | 50.000€ (penali) |
| Nuovo vendor (maggior costo) | 300€/mese × 12 = 3.600€/anno |
| Tempo di integrazione | 3 settimane × 2 persone = 15.000€ |
| Stress del sistemista | Inestimabile |
| Torta di UL | 35€ |
| **Totale** | **68.635€ +** |

Risparmio usando il vendor economico per 5 anni: 200€/mese vs 500€/mese = 18.000€.

**ROI del risparmio: -280%**

Ma i manager non guardano il ROI. Guardano il costo mensile.

E il costo mensile era più basso.

Fino a quando non è diventato più alto.

Molto più alto.

---

## Commenti

I commenti vengono aggiunti **quando** e, più importante, **se** ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](83-la-variabile-che-era-diversa-in-produzione.md) | [Prossima](85-il-certificato-che-e-scaduto-di-sabato.md)]**
