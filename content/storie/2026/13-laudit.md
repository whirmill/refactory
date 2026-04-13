# L'Audit

**Data**: 20/05/2026

**[Storie 2026](index.md) | [Precedente](12-il-consulente.md) | [Prossima](14-il-vecchio-sistema.md)**

---

C'è una cosa che ho imparato: gli audit non servono a trovare problemi. Servono a confermare che i problemi che già conosci sono ancora lì.

![](../../img/audit.jpg)

Dopo il ransomware, dopo l'agenzia forense, dopo la formazione, dopo il consulente, è arrivato l'audit. Un audit esterno. Obbligatorio. Per la certificazione ISO 27001.

L'audit è stato richiesto da SUSL. Perché "dobbiamo dimostrare che prendiamo la sicurezza sul serio".

L'auditor si chiama "Dott. Giuseppe Verifica". Ha una certificazione. E una checklist molto lunga.

Costo: 50.000 euro. Per 3 giorni di audit.

---

Il primo giorno, l'auditor ha iniziato con la documentazione.

"Avete una policy di sicurezza?"

"Sì."

"Posso vederla?"

Ho tirato fuori un documento del 2018. Polveroso. Mai aggiornato.

"Questo è del 2018."

"Sì."

"E non è mai stato aggiornato?"

"No."

"E perché?"

"Perché nessuno l'ha mai letto."

L'auditor ha annotato qualcosa. Molto seriamente.

"Avete una procedura di gestione degli accessi?"

"Sì."

"Posso vederla?"

Ho tirato fuori un altro documento. Del 2019. Anche questo polveroso.

"Questo è del 2019."

"Sì."

"E non è mai stato aggiornato?"

"No."

"E perché?"

"Perché nessuno l'ha mai seguito."

L'auditor ha annotato qualcos'altro. Sempre più seriamente.

"Avete una procedura di backup?"

"Sì."

"Posso vederla?"

Ho tirato fuori un terzo documento. Del 2020.

"Questo è del 2020."

"Sì."

"E i backup sono offline?"

"No."

"Ma la procedura dice che devono essere offline."

"Sì."

"E allora perché non lo sono?"

"Perché non c'era budget per un sistema di backup offline."

"E la procedura?"

"La procedura è stata scritta per la certificazione. Non per essere seguita."

L'auditor ha smesso di annotare. Mi ha guardato.

"Quindi avete tutte le procedure. Ma non le seguite."

"Esatto."

"E perché?"

"Perché le procedure costano. E non c'è budget."

"Ma avete speso 50.000 euro per questo audit."

"Sì."

"E non c'era budget per le procedure?"

"No. C'era budget per l'audit. Non per le procedure."

---

Il secondo giorno, l'auditor ha controllato i sistemi.

"Posso vedere la configurazione del firewall?"

Ho mostrato la configurazione. Era del 2015. Con regole che nessuno capiva più.

"Questa configurazione è vecchia."

"Sì."

"Quando è stata aggiornata l'ultima volta?"

"2015."

"E da allora?"

"Niente."

"E perché?"

"Perché nessuno sapeva come aggiornarla senza rompere tutto."

"E non avete documentato cosa fanno le regole?"

"No."

"E se dovete cambiare qualcosa?"

"Proviamo. E se funziona, bene. Se no, facciamo rollback."

L'auditor ha annotato. Molto a lungo.

"Posso vedere i log di sicurezza?"

Ho mostrato i log. Erano su un server. Che era accessibile da tutti.

"I log sono su un server accessibile da tutti?"

"Sì."

"E non sono protetti?"

"No."

"E perché?"

"Perché non c'era budget per un sistema di log management."

"E i log vengono analizzati?"

"No."

"E perché?"

"Perché non c'è personale per analizzarli."

"E allora a cosa servono?"

"A dire che abbiamo i log."

---

Il terzo giorno, l'auditor ha presentato il rapporto.

Il rapporto aveva 47 non conformità. Divise in:

- **Non conformità maggiori**: 12
- **Non conformità minori**: 35

Le non conformità maggiori erano:

1. Policy di sicurezza non aggiornata
2. Procedure non seguite
3. Backup non offline
4. Firewall non aggiornato
5. Log non protetti
6. Log non analizzati
7. Password non cambiate regolarmente
8. Accessi non rivisti regolarmente
9. Vulnerabilità non gestite
10. Patch non applicate
11. Formazione non effettuata
12. Incident response non testata

Ho guardato l'auditor.

"Queste cose le so da 10 anni."

"Sì, ma adesso sono in un rapporto ufficiale."

"E questo cambia qualcosa?"

"Adesso dovete risolverle. Per la certificazione."

"E se non le risolviamo?"

"Non ottenete la certificazione."

"E se non otteniamo la certificazione?"

"Allora non siete compliant."

"E se non siamo compliant?"

"Allora avete problemi. Con i clienti. Con i regolatori. Con le assicurazioni."

"E quindi?"

"E quindi dovete risolvere le non conformità."

"Ma non c'è budget."

"Allora non ottenete la certificazione."

"E se non la otteniamo?"

"Allora avete speso 50.000 euro per un audit che ha confermato quello che già sapevate."

---

Il rapporto è finito sulla scrivania di SUSL. SUSL l'ha letto. O almeno, ha guardato il numero di non conformità.

"47 non conformità?"

"Sì."

"E quante sono maggiori?"

"12."

"E cosa significa?"

"Significa che non siamo compliant."

"E cosa dobbiamo fare?"

"Risolvere le non conformità."

"E quanto costa?"

"Almeno 500.000 euro."

"E non c'è budget."

"Lo so."

"Allora cosa facciamo?"

"Non lo so. Abbiamo speso 50.000 euro per un audit che ci dice che abbiamo problemi che già conoscevamo. E adesso dobbiamo spendere 500.000 euro per risolverli. Ma non c'è budget."

"E se non li risolviamo?"

"Non siamo compliant."

"E se non siamo compliant?"

"Perdiamo clienti. Perdiamo contratti. Perdiamo assicurazione."

"E quindi?"

"E quindi siamo fottuti."

---

## L'ironia dell'audit

| Voce | Costo | Risultato |
|------|-------|-----------|
| Audit ISO 27001 | 50.000€ | 47 non conformità |
| Problemi già noti | 0€ | Da 10 anni |
| Costo per risolvere | 500.000€ | Non approvato |
| Certificazione | ? | Non ottenuta |

L'audit ha confermato che:
- I problemi esistono
- Li conoscevamo già
- Non abbiamo fatto nulla
- Adesso dobbiamo fare qualcosa
- Ma non c'è budget

Quindi l'audit è servito a:
- Spendere 50.000 euro
- Avere un rapporto ufficiale
- Poter dire "abbiamo fatto un audit"
- Non ottenere la certificazione
- Avere gli stessi problemi di prima

---

## Epilogo

L'azienda non ha ottenuto la certificazione ISO 27001.

Ma ha il rapporto dell'audit. E il rapporto dell'agenzia forense. E il rapporto del consulente. E la documentazione della formazione.

Tutti dicono la stessa cosa: "Avete problemi di sicurezza."

Tutti costano soldi. Nessuno risolve nulla.

E i problemi sono ancora lì. Come prima. Come sempre.

Ma adesso sono documentati. Ufficialmente. Con grafici.

E questo, per l'azienda, è sufficiente.

Perché l'importante non è risolvere i problemi.

L'importante è poter dire: "Abbiamo fatto un audit."

---

## Commenti

I commenti vengono aggiunti **quando** e, più importante, **se** ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](12-il-consulente.md) | [Prossima](14-il-vecchio-sistema.md)**
