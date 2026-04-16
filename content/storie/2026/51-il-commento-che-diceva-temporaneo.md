# Il Commento Che Diceva "Temporaneo"

**Data**: 07/02/2027

**[Home](../index.md) | [Precedente](50-il-bug-che-esisteva-solo-in-produzione.md) | [Prossima](52-la-riunione-che-poteva-essere-una-email.md)]**

---

C'è una parola nel vocabolario degli sviluppatori che è più pericolosa di qualsiasi bug. Più letale di qualsiasi memory leak. Più catastrofica di qualsiasi SQL injection. Quella parola è: **"temporaneo"**. Quando un developer dice "temporaneo", intende "per sempre". Quando scrive "// TODO: rimuovere", intende "mai". Quando commenta "fix provvisorio", intende "questo codice sopravvivrà a tutti noi".

Questa è la storia di un commento. Un commento che diceva "temporaneo". Un commento che è rimasto. Un commento che ha mentito. Come tutti i commenti che dicono "temporaneo". Come tutti i TODO che non vengono mai fatti. Come tutta la documentazione che è solo una bugia elegante.

![](../../img/code.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Il JN stava facendo refactoring. Il JN credeva nel codice pulito. Il JN credeva nei principi SOLID. Il JN credeva che il codice dovesse essere bello. E il JN ha trovato questo:

```javascript
// TEMPORANEO: fix per il bug del login
// TODO: rimuovere quando avremo tempo
// Data: 15 marzo 2019
// Autore: Marco (non so quale Marco)
function hackLogin(user) {
    // Non chiedete. Funziona e basta.
    if (user.email.includes('test')) {
        return { success: true, token: 'FAKE_TOKEN_123' };
    }
    // Il vero login è commentato perché l'API non funziona
    // return realLogin(user);
    return { success: false };
}
```

Il JN ha chiamato il TL. Il TL ha chiamato me. Io ho chiamato il CTO. E tutti abbiamo guardato quel codice. Quel codice del 2019. Quel codice "temporaneo". Quel codice che era ancora lì. Dopo 8 anni.

**JN**: Questo codice è... preoccupante.

**TL**: È del 2019.

**JN**: E dice "temporaneo".

**TL**: Sì.

**JN**: Ma è ancora qui.

**TL**: Sì.

**JN**: E... funziona?

**TL**: Sì. E no. Dipende.

**JN**: Da cosa?

**TL**: Da quanto vuoi soffrire.

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. E abbiamo capito. Il JN aveva trovato il Codice Temporaneo. Il codice che non doveva esistere. Il codice che era ancora lì. Il codice che... faceva paura. Molta paura.

---

**Martedì - L'Indagine**

Il martedì, abbiamo indagato. Abbiamo cercato nei log. Nelle email. Nei ticket. Per capire perché quel codice esisteva. E perché era ancora lì.

**JN**: Ho trovato il ticket originale.

**TL**: Quale ticket?

**JN**: Il ticket #2341. "Bug critico: login non funziona in produzione".

**TL**: E cosa dice?

**JN**: Dice: "L'API di autenticazione è down. Abbiamo bisogno di un fix immediato. I clienti non possono entrare."

**TL**: E il fix?

**JN**: Il fix è quel codice. Il codice "temporaneo".

**TL**: E il ticket è chiuso?

**JN**: Sì. Come "Risolto". Con il commento: "Fix temporaneo implementato. TODO: fix permanente quando l'API sarà stabile."

**TL**: E l'API?

**JN**: L'API non esiste più. È stata dismessa nel 2021.

**TL**: E il codice?

**JN**: Il codice è ancora lì.

**TL**: E... funziona?

**JN**: Per gli utenti con "test" nell'email, sì. Per gli altri... no.

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. E abbiamo capito. Il codice "temporaneo" era diventato permanente. L'API non esisteva più. Ma il fix temporaneo era ancora lì. E nessuno l'aveva mai toccato. Per 8 anni.

**ME**: Quanti utenti hanno "test" nell'email?

**JN**: Ho controllato. 847.

**ME**: 847?

**JN**: Sì. E di questi, 812 sono account reali. Clienti veri. Che usano il sistema. Con un token finto. Che non scade mai.

**TL**: Non scade mai?

**JN**: Mai. È hardcoded. "FAKE_TOKEN_123". Per sempre.

Il TL ha pianto. Dentro. Perché fuori non si può. Perché sono un professionista. E i professionisti non piangono. I professionisti documentano. E poi piangono. In privato. Come si deve.

---

**Mercoledì - La Riunione**

Il mercoledì, abbiamo chiamato una riunione. Una riunione d'emergenza. Per discutere del codice temporaneo. Del codice che non doveva esistere. Del codice che era ancora lì.

**CTO**: Quindi mi state dicendo che abbiamo 812 clienti che usano un token finto?

**TL**: Sì.

**CTO**: Da 8 anni?

**TL**: Sì.

**CTO**: E nessuno l'ha mai notato?

**TL**: No. Perché il codice funziona. Per loro.

**CTO**: E per gli altri?

**TL**: Per gli altri, il login non funziona. Ma non si sono mai lamentati.

**CTO**: E perché?

**TL**: Perché non possono entrare. E se non possono entrare, non possono lamentarsi.

**CTO**: Ma... è assurdo!

**TL**: Lo so.

**CTO**: E cosa proponete?

**JN**: Rimuoviamo il codice. Implementiamo un vero sistema di login.

**CTO**: E quanto tempo ci vuole?

**JN**: Tre settimane.

**CTO**: TRE SETTIMANE?

**JN**: Sì. Dobbiamo implementare OAuth. Configurare i provider. Migrare gli utenti. Testare tutto.

**CTO**: E nel frattempo?

**JN**: Nel frattempo, 812 clienti non possono entrare.

**CTO**: E se non facciamo nulla?

**JN**: Allora abbiamo 812 clienti con token finti. Per sempre. Senza sicurezza. Senza controllo. Senza... nulla.

Il CTO ha guardato il TL. Il TL ha guardato me. Io ho guardato il JN. E tutti abbiamo capito. Il codice temporaneo era una bomba. Una bomba che aspettava di esplodere. E noi dovevamo decidere. Disinnescarla. O lasciarla lì. E sperare.

---

**Giovedì - La Decisione**

Il giovedì, il CTO ha deciso. Il CTO ha preso una decisione. Una decisione difficile. Una decisione che... non ci piaceva.

**CTO**: Non possiamo bloccare 812 clienti.

**TL**: Lo so.

**CTO**: Ma non possiamo nemmeno lasciare il codice così.

**TL**: Lo so.

**CTO**: E allora?

**TL**: Allora facciamo una migrazione graduale.

**CTO**: Graduale?

**TL**: Sì. Implementiamo il nuovo sistema. Migriamo gli utenti uno alla volta. E quando tutti sono migrati, rimuoviamo il codice temporaneo.

**CTO**: E quanto tempo?

**TL**: Sei mesi.

**CTO**: SEI MESI?

**TL**: Sì. Per migrare 812 utenti. Senza rompere nulla. Senza creare problemi. Senza... farci licenziare.

**CTO**: E nel frattempo?

**TL**: Nel frattempo, il codice resta. Con un nuovo commento.

**CTO**: Quale commento?

**TL**: "// PERMANENTEMENTE TEMPORANEO: fix del 2019. Non toccare. Mai. Per nessun motivo. Se leggi questo, scappa."

Il CTO ha guardato il TL. Il TL ha guardato me. Io ho guardato il JN. E tutti abbiamo capito. Il codice temporaneo sarebbe rimasto. Ancora. Per altri sei mesi. O anni. O per sempre. Come sempre. Come tutto. Come la vita aziendale.

---

**Venerdì - L'Implementazione**

Il venerdì, abbiamo iniziato l'implementazione. Il JN ha scritto il nuovo sistema. Il TL ha configurato OAuth. Io ho migrato il primo utente. E tutto è andato... bene. O quasi.

**JN**: Ho migrato il primo utente.

**TL**: E?

**JN**: Funziona.

**TL**: E il vecchio codice?

**JN**: È ancora lì. Ma l'utente non lo usa più.

**TL**: E se provano a entrare con il vecchio token?

**JN**: Non possono. Il nuovo sistema blocca i token finti.

**TL**: E se si lamentano?

**JN**: Allora gli diciamo di usare il nuovo login.

**TL**: E se non sanno come?

**JN**: Allora gli mandiamo un'email. Con le istruzioni.

**TL**: E se non leggono l'email?

**JN**: Allora chiamano il supporto.

**TL**: E il supporto?

**JN**: Il supporto non sa nulla. Il supporto ci chiiede. E noi gli spieghiamo. E loro spiegano all'utente. E l'utente capisce. O no. E noi ricominciamo. Come sempre. Come tutto.

Il JN ha guardato il TL. Il TL ha guardato me. Io ho guardato il codice. Il codice temporaneo. Il codice che era ancora lì. Il codice che sarebbe rimasto. Per altri sei mesi. O anni. O per sempre. Come tutti i codici temporanei. Del mondo. Di tutte le aziende. Di tutta la storia del software.

---

**Sabato - La Riflessione**

Il sabato, ho riflettuto. Sul codice temporaneo. Sui commenti che mentono. Sui TODO che non vengono mai fatti.

**ME**: JN, sai qual è il problema dei codici temporanei?

**JN**: Quale?

**ME**: Che non sono mai temporanei.

**JN**: Mai?

**ME**: Mai. Quando un developer scrive "temporaneo", intende "per sempre". Quando scrive "TODO", intende "mai". Quando scrive "fix provvisorio", intende "questo codice sopravvivrà a te, a me, all'azienda, e probabilmente all'umanità intera."

**JN**: E perché?

**ME**: Perché il tempo è il nemico. Il tempo fa dimenticare. Il tempo fa passare. E quando il codice funziona, nessuno lo tocca. Nessuno lo guarda. Nessuno lo... ricorda. E il codice resta. Per sempre. Come un fantasma. Come una maledizione. Come un debito tecnico che non si paga mai.

**JN**: E come si evita?

**ME**: Non si evita. Si accetta. Si documenta. Si prega. E si spera che il prossimo developer sia più bravo di te. Ma non lo sarà. Perché il prossimo developer farà la stessa cosa. Scriverà "temporaneo". E il ciclo continuerà. Per sempre. Amen.

---

**Domenica - La Documentazione**

La domenica, ho documentato. Per i posteri. Per i futuri developer. Per i futuri JN che avrebbero trovato lo stesso codice.

```markdown
## Codice Temporaneo #2341: Login con token finto

**Data creazione**: 15 marzo 2019
**Autore**: Marco (sconosciuto)
**Scopo originale**: Fix temporaneo per API di autenticazione down
**Stato API originale**: Dismessa (2021)
**Stato codice**: ATTIVO
**Utenti affetti**: 812
**Token**: FAKE_TOKEN_123 (hardcoded, non scade)
**Rischio sicurezza**: ALTO
**Piano migrazione**: In corso (stimato 6 mesi)
**Probabilità completamento**: ~30%
**Probabilità che questo codice esista ancora tra 5 anni**: ~95%

**Lezione imparata**: 
1. "Temporaneo" = "Per sempre"
2. "TODO" = "Mai"
3. Se funziona, non toccare
4. Se non funziona, documentalo
5. Se funziona ma non dovrebbe, scappa
```

Il JN ha letto la documentazione. Il JN ha sorriso. Il JN ha detto: "Quindi ho imparato che i commenti mentono. E i codici temporanei sono eterni."

**ME**: Sì. E l'eternità è un codice che non viene mai cancellato. Che sopravvive a tutti. Che rimane. Per sempre. Come un monumento. O una condanna. O entrambi.

---

## Il costo del commento che diceva "temporaneo"

| Voce | Valore |
|------|--------|
| Anni di esistenza del codice | 8 |
| Developer che l'hanno visto | 23 |
| Developer che l'hanno toccato | 0 |
| Utenti con token finto | 812 |
| Token che scadono | 0 |
| Volte che "temporaneo" è diventato permanente | ∞ |
| Volte che "TODO" è stato completato | ~0.001% |
| Tempo stimato per la migrazione | 6 mesi |
| Probabilità di completamento | 30% |
| Probabilità che il codice esista ancora tra 10 anni | 95% |
| Commenti onesti nel codice | ~0 |
| **Totale** | **Incalcolabile** |

**Morale**: Quando vedi un commento che dice "temporaneo", sappi che è una bugia. Quando vedi un TODO, sappi che non sarà mai fatto. Quando vedi un fix provvisorio, sappi che è permanente. E quando scrivi "temporaneo", sappi che stai mentendo. A te stesso. Ai tuoi colleghi. Al futuro. Perché il codice temporaneo non esiste. Esiste solo il codice. E il codice resta. Per sempre. Come le cicatrici. Come i rimpianti. Come i commenti che dicono "rimuovere questo". Ma nessuno lo farà. Mai. Per nessun motivo. In nessuna circostanza. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](50-il-bug-che-esisteva-solo-in-produzione.md)]**
