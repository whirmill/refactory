# Il Deploy del Venerdì Pomeriggio

**Data**: 14/03/2027

**[Home](../index.md) | [Precedente](55-il-file-env-che-era-su-git.md)]**

---

C'è una regola nel mondo dello sviluppo software. Una regola sacra. Una regola inviolabile. Una regola che ogni developer conosce, rispetta, e... ignora. Quella regola è: **"Mai fare deploy di venerdì pomeriggio"**. Ma c'è una regola ancora più sacra. Ancora più inviolabile. Ancora più ignorata. Quella regola è: **"Mai fare deploy di venerdì pomeriggio alle 17:55"**. E questa è la storia di chi l'ha fatto. Di chi l'ha voluto. Di chi l'ha subito. E di chi, forse, ha imparato. O no. Perché i deploy del venerdì sono come i gatti. Cadono sempre in piedi. O quasi. E quando non cadono in piedi, cadono sulla tua faccia. Di venerdì. Alle 18:00. Proprio mentre stavi per andare a casa.

![](../../img/code.jpg)

---

**Venerdì - 17:30**

Era venerdì. Il TL stava per andare a casa. Il JN stava per andare a casa. Io stavo per andare a casa. Tutti stavano per andare a casa. E poi... è arrivato il PM.

**PM**: Abbiamo una richiesta urgente.

**TL**: Che tipo di richiesta?

**PM**: Una feature.

**TL**: Che feature?

**PM**: Un fix.

**TL**: Un fix?

**PM**: Sì. Il cliente ha trovato un bug.

**TL**: Che bug?

**PM**: Un bug critico.

**TL**: Critico?

**PM**: Sì. Il pulsante "Salva" non funziona.

**TL**: Non funziona?

**PM**: No. È grigio.

**TL**: Grigio?

**PM**: Sì. Grigio. E non si può cliccare.

**TL**: E quando è successo?

**PM**: Ieri.

**TL**: IERI?

**PM**: Sì. Ma il cliente l'ha segnalato solo ora.

**TL**: E perché?

**PM**: Perché pensavano che fosse una feature.

**TL**: Una feature?

**PM**: Sì. Pensavano che avessimo disabilitato il pulsante di proposito.

**TL**: E ora?

**PM**: Ora vogliono che funzioni.

**TL**: E quando?

**PM**: Ora. Subito. Prima del weekend.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava l'orologio. Erano le 17:32. E il PM sorrideva. Il PM sorrideva come chi non sa cosa sta per fare. Come chi non capisce. Come chi... non ha mai fatto un deploy di venerdì.

---

**Venerdì - 17:45**

Il JN ha trovato il bug. Il JN ha fixato il bug. Il JN ha fatto il commit. E ora... il deploy.

**JN**: Ho trovato il bug.

**TL**: Cosa era?

**JN**: Una variabile non inizializzata.

**TL**: Una variabile?

**JN**: Sì. La variabile `canSave` era `undefined` invece di `true`.

**TL**: E questo disabilitava il pulsante?

**JN**: Sì. Perché `undefined` è falsy.

**TL**: E il fix?

**JN**: Ho aggiunto `= true`.

**TL**: Tutto qui?

**JN**: Tutto qui. Una riga.

**TL**: E i test?

**JN**: Passano tutti.

**TL**: Tutti?

**JN**: Tutti. 342 test. Tutti verdi.

**TL**: E il code review?

**JN**: L'ho fatto da solo. È una riga.

**TL**: Una riga?

**JN**: Sì. Una riga. Non può rompere nulla.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava l'orologio. Erano le 17:47. E il PM sorrideva ancora. Il PM non sapeva. Il PM non poteva sapere. Il PM... non aveva mai visto un deploy di venerdì andare male. Ma noi sì. Noi l'avevamo visto. Noi l'avevamo vissuto. Noi... avevamo i PTSD del deploy.

---

**Venerdì - 17:55**

Il deploy è partito. Il deploy è andato. Il deploy... ha iniziato a sbagliare.

**JN**: Deploy iniziato.

**TL**: Bene.

**JN**: Build in corso.

**TL**: Bene.

**JN**: Test in corso.

**TL**: Bene.

**JN**: Test passati.

**TL**: Bene.

**JN**: Deploy in produzione.

**TL**: Bene.

**JN**: Deploy completato.

**TL**: Perfetto. Andiamo a casa.

**JN**: Aspetta.

**TL**: Cosa?

**JN**: C'è un errore nei log.

**TL**: Che errore?

**JN**: Un errore. Tanti errori.

**TL**: TANTI?

**JN**: Sì. Guarda.

Il JN ha girato lo schermo. I log erano rossi. Tutti rossi. Come un Natale in luglio. Ma senza gioia. Senza pace. Senza... speranza.

**TL**: Cosa dice l'errore?

**JN**: `TypeError: Cannot read property 'save' of undefined`.

**TL**: `save`?

**JN**: Sì. La funzione `save` non esiste.

**TL**: COME NON ESISTE?

**JN**: Non lo so. Il codice c'era prima.

**TL**: E ora?

**JN**: Ora non c'è più.

**TL**: E il pulsante?

**JN**: Il pulsante non c'è più.

**TL**: NON C'È PIÙ?

**JN**: No. È sparito. Insieme a tutto il form.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava i log. I log guardavano noi. E tutti guardavamo l'orologio. Erano le 17:58. E il weekend era morto. Come il form. Come il pulsante. Come... la nostra sanità mentale.

---

**Venerdì - 18:15**

Abbiamo investigato. Abbiamo guardato il codice. Abbiamo guardato il commit. Abbiamo guardato... l'errore.

**TL**: JN, cosa hai fatto esattamente?

**JN**: Ho cambiato `let canSave` in `let canSave = true`.

**TL**: Solo questo?

**JN**: Solo questo.

**TL**: E il pulsante è sparito?

**JN**: Sì.

**TL**: E il form?

**JN**: Sì.

**TL**: E tutto il resto?

**JN**: Sì.

**TL**: E come è possibile?

**JN**: Non lo so.

**TL**: Non lo sai?

**JN**: No. Ho cambiato solo una variabile.

**TL**: E il resto?

**JN**: Il resto non l'ho toccato.

**TL**: E allora perché è sparito?

**JN**: Non lo so.

Il TL ha guardato il codice. Il codice era strano. Il codice era... diverso. Il codice non era quello che il JN aveva committato.

**TL**: JN, questo non è il tuo commit.

**JN**: Cosa?

**TL**: Questo codice è diverso.

**JN**: Diverso come?

**TL**: Diverso come "qualcuno ha fatto un altro deploy mentre noi stavamo guardando i log".

**JN**: Un altro deploy?

**TL**: Sì. Guarda la cronologia.

Il JN ha guardato la cronologia. La cronologia mostrava due deploy. Il deploy del JN. E un altro deploy. Un deploy fatto 30 secondi dopo. Da un certo... "CTO".

**TL**: Il CTO ha fatto un deploy?

**JN**: Sì.

**TL**: Mentre noi facevamo il nostro?

**JN**: Sì.

**TL**: E cosa ha deployato?

**JN**: Non lo so. Guardiamo il commit.

Il JN ha guardato il commit del CTO. Il commit diceva: "Refactor form component - remove unused code".

**TL**: Remove unused code?

**JN**: Sì.

**TL**: E cosa ha rimosso?

**JN**: Il pulsante. Il form. E la funzione `save`.

**TL**: TUTTO?

**JN**: Tutto. Perché era "unused".

Il TL ha guardato me. Io ho guardato il soffitto. Il soffitto era più interessante del disastro. Il soffitto non aveva deploy. Il soffitto non aveva form. Il soffitto... era perfetto. A differenza del nostro venerdì.

---

**Venerdì - 18:30**

Abbiamo chiamato il CTO. Il CTO era a casa. Il CTO stava cenando. Il CTO... non sapeva.

**CTO**: Pronto?

**TL**: CTO, hai fatto un deploy?

**CTO**: Sì. Perché?

**TL**: Quando?

**CTO**: 10 minuti fa. Perché?

**TL**: E cosa hai deployato?

**CTO**: Un refactor. Ho rimosso codice inutilizzato.

**TL**: E cosa hai rimosso?

**CTO**: Non lo so. Codice che non veniva usato.

**TL**: E come facevi a sapere che non veniva usato?

**CTO**: Ho cercato nei file. Non c'erano riferimenti.

**TL**: E i test?

**CTO**: I test passavano.

**TL**: E il code review?

**CTO**: Non l'ho fatto. Era un refactor semplice.

**TL**: SEMPLICE?

**CTO**: Sì. Ho rimosso solo codice morto.

**TL**: E il codice morto era il form di salvataggio?

**CTO**: Il form di salvataggio?

**TL**: Sì. Il form che il cliente sta cercando di usare.

**CTO**: Ah.

**TL**: Ah?

**CTO**: Sì. Ah.

**TL**: E ora?

**CTO**: Ora... torno in ufficio?

**TL**: Sì. Ora torni in ufficio. E fixi tutto.

**CTO**: Ma sto cenando.

**TL**: E noi stavamo andando a casa.

**CTO**: Ah.

**TL**: Sì. Ah.

Il CTO ha riattaccato. Il TL ha guardato me. Io ho guardato il JN. E tutti abbiamo guardato l'orologio. Erano le 18:35. E il weekend era sempre più morto. Come il form. Come il pulsante. Come... la nostra pazienza.

---

**Venerdì - 19:00**

Il CTO è arrivato. Il CTO ha guardato il codice. Il CTO ha capito. Il CTO... ha sbagliato.

**CTO**: Ok, ho capito l'errore.

**TL**: Quale errore?

**CTO**: Ho rimosso il form.

**TL**: Sì. L'abbiamo notato.

**CTO**: E il pulsante.

**TL**: Sì. Anche quello.

**CTO**: E la funzione save.

**TL**: Sì. Tutto.

**CTO**: Perché pensavo fosse codice morto.

**TL**: E non lo era?

**CTO**: No. Era codice vivo. Molto vivo.

**TL**: E come mai non c'erano riferimenti?

**CTO**: Perché i riferimenti erano in un file che non ho cercato.

**TL**: Quale file?

**CTO**: Il file del JN.

**TL**: Il file del JN?

**CTO**: Sì. Il file che il JN stava modificando.

**TL**: E non l'hai guardato?

**CTO**: No. Non pensavo che fosse collegato.

**TL**: E il JN stava fixando proprio quel form.

**CTO**: Ah.

**TL**: Sì. Ah.

Il CTO ha guardato il JN. Il JN ha guardato il TL. Il TL guardava me. E io guardavo l'orologio. Erano le 19:05. E il weekend non esisteva più. Come il form. Come il pulsante. Come... tutto.

---

**Venerdì - 20:00**

Abbiamo fixato. Abbiamo deployato. Abbiamo... sopravvissuto.

**JN**: Ho ripristinato il codice.

**TL**: Tutto?

**JN**: Tutto. Form. Pulsante. Funzione save. Tutto.

**TL**: E i test?

**JN**: Passano tutti.

**TL**: Tutti?

**JN**: Tutti. 342 test. Tutti verdi.

**TL**: E il deploy?

**JN**: Fatto.

**TL**: E funziona?

**JN**: Sì. Il cliente ha confermato.

**TL**: E il CTO?

**JN**: Il CTO è andato a casa.

**TL**: A casa?

**JN**: Sì. Ha detto che aveva una cena.

**TL**: Una cena?

**JN**: Sì. Con la famiglia.

**TL**: E noi?

**JN**: Noi siamo ancora qui.

**TL**: Ancora qui?

**JN**: Sì. A fixare il suo refactor.

**TL**: Il suo refactor che ha rotto tutto?

**JN**: Sì.

**TL**: E lui è andato a cena?

**JN**: Sì.

Il TL ha guardato me. Io ho guardato il JN. Il JN guardava l'orologio. Erano le 20:05. E il weekend era iniziato. Male. Molto male. Come tutti i venerdì che finiscono con un deploy. Alle 17:55. Da un CTO che non fa code review. E che va a cena mentre noi fixiamo. Perché questo è il mondo dello sviluppo. Il mondo dei deploy di venerdì. Il mondo dei refactor senza review. Il mondo... del dolore.

---

**Sabato - La Riflessione**

Sabato. Ho dormito. Ho dormito 12 ore. Ho dormito come non dormivo da... venerdì. E quando mi sono svegliato, ho riflettuto.

**ME**: JN, sai qual è la lezione?

**JN**: Quale?

**ME**: Mai fare deploy di venerdì.

**JN**: Sì. L'ho imparata.

**ME**: E sai qual è l'altra lezione?

**JN**: Quale?

**ME**: Il code review serve. Sempre. Anche per i refactor. Anche per il CTO. Anche per una riga.

**JN**: Sì. L'ho imparata anche quella.

**ME**: E sai qual è la lezione più importante?

**JN**: Quale?

**ME**: Che il venerdì pomeriggio è sacro. È il momento di andare a casa. Non di fare deploy. Non di refactorare. Non di... rompere tutto. E se il PM chiede un fix urgente, la risposta è: "Lunedì". Sempre "lunedì". Perché il lunedì i deploy vanno bene. Il venerdì no. Il venerdì è per la pace. Per il riposo. Per... non essere in ufficio alle 20:00 a fixare il refactor del CTO. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri JN che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #DEPLOY-FRI-001: Il Deploy del Venerdì Pomeriggio

**Data**: Venerdì 14 marzo 2027
**Ora deploy JN**: 17:55
**Ora deploy CTO**: 17:56 (30 secondi dopo)
**Conflitto**: Sì. Grave.
**Codice rimosso**: Form completo + pulsante + funzione save
**Motivo rimozione**: "Codice morto"
**Verifica codice morto**: No
**Code review**: No
**Test**: Passavano (ma non testavano il form)
**Tempo per fixare**: 2 ore e 15 minuti
**Weekend rovinato**: Sì
**Cena del CTO**: Sì (non rovinata)
**Cena del team**: No (saltata)
**Lezione imparata**: Mai deploy di venerdì
**Probabilità che succeda di nuovo**: 100%

**Regole per il futuro**:
1. Mai deploy di venerdì dopo le 15:00
2. Mai deploy senza code review
3. Mai refactor "codice morto" senza verificare
4. Mai due deploy contemporaneamente
5. Se il PM chiede un fix urgente di venerdì, la risposta è: "Lunedì"
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che un deploy di venerdì può rovinare il weekend. E che il CTO può andare a cena mentre noi fixiamo."

**ME**: Sì. E la lezione più importante è questa: il venerdì pomeriggio è sacro. Non toccarlo. Non deployarlo. Non refactorarlo. Lascialo in pace. E vai a casa. Prima che il PM arrivi. Prima che il CTO refactori. Prima che... tutto si rompa. Perché il venerdì pomeriggio è il momento peggiore per fare deploy. E il momento migliore per andare a casa. E noi abbiamo scelto il deploy. E abbiamo perso il weekend. E il CTO ha scelto la cena. E ha vinto. Perché il CTO vince sempre. Anche quando sbaglia. Anche quando rompe tutto. Anche quando... va a cena. Amen.

---

## Il costo del deploy di venerdì

| Voce | Valore |
|------|--------|
| Ora del deploy | 17:55 |
| Ora del fix | 20:05 |
| Tempo totale | 2 ore 15 minuti |
| Weekend rovinato | Sì |
| Cena rovinata | 3 (team) |
| Cena salvata | 1 (CTO) |
| Codice rimosso | Form completo |
| Codice ripristinato | Form completo |
| Deploy conflittuali | 2 |
| Code review fatte | 0 |
| Code review necessarie | 2 |
| Lezione imparata | Mai venerdì |
| Probabilità che succeda di nuovo | 100% |
| **Totale** | **Weekend sacrificato agli dei del deploy** |

**Morale**: Il venerdì pomeriggio non è per i deploy. È per andare a casa. Se il PM chiede un fix urgente, la risposta è sempre "lunedì". Se il CTO vuole refactorare, la risposta è sempre "con code review". E se qualcuno dice "è solo una riga", la risposta è sempre "una riga può rompere tutto". Perché il venerdì pomeriggio è sacro. E il weekend è sacro. E la cena è sacra. E noi abbiamo sacrificato tutto sull'altare del deploy urgente. E il CTO ha cenato. E noi no. E questo è il mondo dello sviluppo. Il mondo dei venerdì rovinati. Il mondo dei refactor senza review. Il mondo... del dolore. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](55-il-file-env-che-era-su-git.md)]**
