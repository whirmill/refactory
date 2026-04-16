# Il Git Push --force Che Ha Cancellato Tutto

**Data**: 11/07/2026

**[Home](../index.md) | [Precedente](72-il-file-env-che-era-su-git.md)]**

---

C'è una verità nel mondo del version control. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `git push --force` pensando "tanto è il mio branch". Quella verità è: **"Git push --force è come lanciare una granata in una biblioteca. Puoi farlo. Ma quando lo fai, i libri volano. Le pagine si strappano. La storia si cancella. E tu rimani lì, in mezzo ai resti di quello che era un repo, a chiederti 'ma dov'è finito il codice di venerdì?'. E il codice non c'è più. Perché l'hai cancellato. Con un comando. Un solo comando. E la storia di 6 mesi di lavoro è sparita. Per sempre. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"Git ricorda tutto. Ma quando fai --force, Git dimentica. I commit spariscono. I branch spariscono. Il lavoro di 3 persone sparisce. E tu non puoi fare nulla. Perché hai fatto --force. Su main. Su production. Su tutto. E quando fai --force su main, non cancelli solo il tuo codice. Cancelli il codice di tutti. E tutti ti odiano. Per sempre. Amen"**. E questa è la storia di chi ha scritto quel comando. Di chi l'ha eseguito. Di chi ha guardato il repo sparire. Un commit alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo rilasciare la feature.

**ME**: Quale feature?

**PM**: Quella del carrello.

**ME**: Il carrello?

**PM**: Sì. Quella che hai sviluppato la settimana scorsa.

**ME**: Ah, quella.

**PM**: Sì. Quella.

**ME**: E non era su main?

**PM**: No. Era su un branch.

**ME**: Quale branch?

**PM**: Non lo so. `feature/carrello`?

**ME**: E devo mergiare?

**PM**: Sì. Oggi.

**ME**: Oggi?

**PM**: Sì. Per il rilascio di domani.

**ME**: E posso testare?

**PM**: Hai già testato.

**ME**: Quando?

**PM**: La settimana scorsa.

**ME**: E se ci sono conflitti?

**PM**: Non ci sono conflitti.

**ME**: E se main è andata avanti?

**PM**: Non è andata avanti.

**ME**: E se qualcuno ha committato su main?

**PM**: Nessuno ha committato su main.

**ME**: E il branch è aggiornato?

**PM**: Sì. È aggiornato.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia paranoia. Il nulla che era la mia attenzione ai conflitti. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Merge**

Il martedì, ho mergiato. Ho mergiato il branch. Ho mergiato... il disastro.

**ME**: Ok. Faccio il merge.

**TL**: Hai fatto pull su main?

**ME**: Sì.

**TL**: E il branch è aggiornato?

**ME**: Sì.

**TL**: E non ci sono conflitti?

**ME**: No.

**TL**: E hai testato?

**ME**: Sì.

**TL**: E il merge è pulito?

**ME**: Sì.

**TL**: E poi pushi?

**ME**: Sì.

**TL**: E non fai --force?

**ME**: No. Perché dovrei?

**TL**: Perché a volte il push fallisce.

**ME**: E allora faccio pull.

**TL**: E se il pull crea conflitti?

**ME**: Allora li risolvo.

**TL**: E se non hai tempo?

**ME**: Ho tempo.

**TL**: E se il PM preme?

**ME**: Il PM non preme.

**TL**: Il PM preme sempre.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git checkout main
git pull origin main
git merge feature/carrello
```

E il merge era partito. E io aspettavo. E aspettavo. E aspettavo. Amen.

---

**Martedì - 11:23**

È successo. Quello che temevo. Quello che era inevitabile.

**TERMINALE**: 
```
Auto-merging src/components/Cart.js
CONFLICT (content): Merge conflict in src/components/Cart.js
Automatic merge failed; fix conflicts and then commit the result.
```

**ME**: ...

**TL**: Conflitti?

**ME**: Sì.

**TL**: In Cart.js?

**ME**: Sì.

**TL**: E quanti?

**ME**: Non lo so. Fammi vedere.

Ho aperto il file. Il file mostrava:
```javascript
<<<<<<< HEAD
  const cart = useCart();
  const items = cart.items || [];
=======
  const cart = useContext(CartContext);
  const items = cart?.items ?? [];
>>>>>>> feature/carrello
```

E c'erano conflitti. 47 conflitti. In 12 file. E il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Martedì - 11:47**

Il PM ha chiamato. Il PM voleva. E io... non ho detto la verità.

**PM**: Com'è andato il merge?

**ME**: Ci sono conflitti.

**PM**: Conflitti?

**ME**: Sì.

**PM**: E quanti?

**ME**: Non tanti.

**PM**: E quanto ci metti?

**ME**: Un'ora. Forse due.

**PM**: Due ore?

**ME**: Sì.

**PM**: Ma il rilascio è alle 14!

**ME**: Lo so.

**PM**: E come facciamo?

**ME**: Risolvo i conflitti.

**PM**: E se non fai in tempo?

**ME**: Faccio in tempo.

**PM**: E se non riesci?

**ME**: Riesco.

**PM**: E se il codice si rompe?

**ME**: Non si rompe.

**PM**: E se?

**ME**: Non succede nulla.

Il PM mi ha guardato. Io guardavo i conflitti. I conflitti guardavano me. E io sapevo. Sapevo che erano tanti. Sapevo che erano complessi. Sapevo che... il PM chiamava. E il PM voleva. E io non avevo tempo. Amen.

---

**Martedì - 12:30**

Ho risolto. Ho risolto i conflitti. Ho risolto... male.

**ME**: Ok. Ho risolto i conflitti.

**TL**: Tutti?

**ME**: Sì.

**TL**: E come?

**ME**: Ho preso la mia versione.

**TL**: La tua versione?

**ME**: Sì. Quella del branch.

**TL**: E il codice di main?

**ME**: L'ho sovrascritto.

**TL**: Sovrascritto?

**ME**: Sì.

**TL**: E non hai controllato?

**ME**: Non ho tempo.

**TL**: E se main aveva fix importanti?

**ME**: Non li aveva.

**TL**: E se main aveva ottimizzazioni?

**ME**: Non le aveva.

**TL**: E se main aveva bug fix?

**ME**: Non le aveva.

**TL**: E come lo sai?

**ME**: Lo so.

**TL**: E se ti sbagli?

**ME**: Non mi sbaglio.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git add .
git commit -m "Merge feature/carrello"
```

E il merge era committato. E io dovevo pushare. E il PM chiamava. E il PM voleva. Amen.

---

**Martedì - 12:47**

Ho pushato. Ho pushato il merge. Ho pushato... il nulla.

**TERMINALE**:
```
git push origin main
To github.com/company/project.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com/company/project.git'
```

**ME**: ...

**TL**: Il push è fallito.

**ME**: Sì.

**TL**: E perché?

**ME**: Perché main è andata avanti.

**TL**: E chi ha committato?

**ME**: Non lo so.

**TL**: E cosa fai?

**ME**: Faccio pull.

**TL**: E se ci sono altri conflitti?

**ME**: Li risolvo.

**TL**: E se ci metti troppo?

**ME**: Non ci metto troppo.

**TL**: E se il PM chiama?

**ME**: Il PM non chiama.

**TL**: Il PM chiama sempre.

Il TL mi ha guardato. Io guardavo l'orologio. L'orologio mostrava 12:48. E il rilascio era alle 14. E il PM chiamava. E io non avevo tempo. Amen.

---

**Martedì - 12:52**

Il PM ha chiamato. Il PM voleva. E io... ho fatto la cosa sbagliata.

**PM**: A che punto siamo?

**ME**: Il push è fallito.

**PM**: Fallito?

**ME**: Sì. Main è andata avanti.

**PM**: E chi ha committato?

**ME**: Non lo so.

**PM**: E cosa fai?

**ME**: Faccio pull.

**PM**: E quanto ci metti?

**ME**: Non lo so. Forse 30 minuti.

**PM**: 30 MINUTI?

**ME**: Sì. Se ci sono altri conflitti.

**PM**: Ma il rilascio è tra 1 ora!

**ME**: Lo so.

**PM**: E non puoi fare più veloce?

**ME**: Non posso.

**PM**: E se fai --force?

**ME**: --force?

**PM**: Sì. Forzi il push.

**ME**: Non posso fare --force su main.

**PM**: Perché?

**ME**: Perché cancella il lavoro degli altri.

**PM**: Ma chi ha committato?

**ME**: Non lo so.

**PM**: E se non è nulla di importante?

**ME**: E se lo è?

**PM**: E se è solo un README?

**ME**: E se è codice?

**PM**: Fai --force. Tanto il branch è aggiornato.

**ME**: Non posso.

**PM**: Puoi. E devi. Per il rilascio.

**ME**: Ma...

**PM**: FAI --FORCE. ORA.

Il PM mi ha guardato. Io guardavo il terminale. Il terminale aspettava. E io sapevo. Sapevo che era sbagliato. Sapevo che era pericoloso. Sapevo che... il PM voleva. E il PM premeva. E io non avevo tempo. Amen.

---

**Martedì - 12:58**

Ho fatto. Ho fatto quello che non dovevo. Ho fatto... --force.

**TERMINALE**:
```
git push origin main --force
To github.com/company/project.git
 + 8a7f3c2...b4d9e1a  main -> main (forced update)
```

**ME**: Fatto.

**TL**: COSA HAI FATTO?

**ME**: Ho fatto --force.

**TL**: --FORCE?

**ME**: Sì.

**TL**: SU MAIN?

**ME**: Sì.

**TL**: MA SEI PAZZO?

**ME**: Il PM voleva.

**TL**: IL PM NON SA COS'È --FORCE!

**ME**: Ma...

**TL**: HAI CANCELLATO I COMMIT DI TUTTI!

**ME**: Cosa?

**TL**: HAI CANCELLATO I COMMIT DI TUTTI!

**ME**: Quali commit?

**TL**: I COMMIT CHE ERANO SU MAIN!

**ME**: Ma il PM diceva che non c'era nulla!

**TL**: IL PM NON SA NULLA!

Il TL mi ha guardato. Io guardavo GitHub. GitHub mostrava:
- Commit più recente: b4d9e1a (il mio)
- Commit precedente: 8a7f3c2 (cancellato)
- Commit cancellati: 47

E 47 commit erano spariti. 47 commit di 3 sviluppatori. 47 commit di 2 settimane di lavoro. E io li avevo cancellati. Con un comando. Un solo comando. Amen.

---

**Martedì - 13:15**

Le chiamate. Le chiamate che non volevo. Le chiamate... da tutti.

**JN**: I miei commit sono spariti.

**CR**: Il mio codice non c'è più.

**TL**: Te l'avevo detto.

**CTO**: COSA HAI FATTO?

**ME**: Ho fatto --force.

**CTO**: --FORCE SU MAIN?

**ME**: Sì.

**CTO**: E PERCHÉ?

**ME**: Il PM voleva.

**CTO**: IL PM?

**ME**: Sì.

**CTO**: E HAI DATO RETTA AL PM?

**ME**: Non avevo tempo.

**CTO**: NON AVEVI TEMPO?

**ME**: No. Il rilascio era alle 14.

**CTO**: E HAI CANCELLATO 47 COMMIT?

**ME**: Non sapevo che c'erano.

**CTO**: NON LO SAPEVI?

**ME**: No.

**CTO**: E NON HAI CONTROLLATO?

**ME**: Non ho avuto tempo.

**CTO**: NON HAI AVUTO TEMPO?

**ME**: No.

**CTO**: E ADESSO?

**ME**: Adesso... non lo so.

Il CTO mi ha guardato. Io guardavo il nulla. Il nulla che era il repo. Il nulla che erano i commit. Il nulla... che erano 2 settimane di lavoro. Cancellate. Amen.

---

**Martedì - 13:30**

Il CEO ha chiamato. Il CEO non era contento. Il CEO non era mai contento. Ma questa volta era peggio.

**CEO**: Quindi mi stai dicendo che hai cancellato 2 settimane di lavoro?

**ME**: Sì.

**CEO**: Con un comando?

**ME**: Sì.

**CEO**: Un comando?

**ME**: git push --force.

**CEO**: E perché?

**ME**: Perché il push falliva.

**CEO**: E non potevi fare pull?

**ME**: Potevo. Ma non avevo tempo.

**CEO**: Non avevi tempo?

**ME**: No. Il rilascio era alle 14.

**CEO**: E hai preferito cancellare 47 commit?

**ME**: Non sapevo che c'erano.

**CEO**: Non lo sapevi?

**ME**: No.

**CEO**: E chi ha committato?

**ME**: JN, CR, e altri.

**CEO**: E cosa hanno committato?

**ME**: Non lo so.

**CEO**: NON LO SAI?

**ME**: No.

**CEO**: E sai cosa c'era in quei commit?

**ME**: No.

**CEO**: C'era il fix per il bug del pagamento.

**ME**: Il bug del pagamento?

**CEO**: Sì. Quello che faceva perdere gli ordini.

**ME**: E l'ho cancellato?

**CEO**: Sì.

**ME**: E non c'è backup?

**CEO**: Git è il backup. E tu l'hai cancellato.

**CEO**: E sai cosa significa?

**ME**: Cosa?

**CEO**: Significa che hai cancellato il fix per un bug che faceva perdere ordini. E ora il bug è tornato. E gli ordini si perderanno di nuovo. E tutto perché non hai fatto pull. Non hai controllato. Non hai pensato. E hai fatto --force. Su main. Su production. Su tutto.

**ME**: Io...

**CEO**: E sai cosa farò?

**ME**: Cosa?

**CEO**: Ti farò scrivere 1.000 volte: "Non farò mai git push --force su main".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che erano 47 commit. Cancellati. Amen.

---

**Martedì - 14:00**

Il rilascio. Il rilascio che doveva essere. Il rilascio... che non fu.

**PM**: Siamo pronti per il rilascio?

**ME**: No.

**PM**: No?

**ME**: No.

**PM**: E perché?

**ME**: Perché ho cancellato i commit.

**PM**: I commit?

**ME**: Sì. Quelli di JN e CR.

**PM**: E il fix del pagamento?

**ME**: Cancellato.

**PM**: CANCELLATO?

**ME**: Sì.

**PM**: E ora?

**ME**: Ora... non possiamo rilasciare.

**PM**: NON POSSIAMO?

**ME**: No. Il bug del pagamento è tornato.

**PM**: E GLI ORDINI?

**ME**: Si perderanno.

**PM**: SI PERDERANNO?

**ME**: Sì.

**PM**: E QUANTI?

**ME**: Non lo so. Forse tutti.

**PM**: TUTTI?

**ME**: Sì. Se non recuperiamo il codice.

**PM**: E COME LO RECUPERIAMO?

**ME**: Non lo so. Forse con git reflog.

**PM**: E QUANTO CI METTI?

**ME**: Non lo so. Forse 2 ore.

**PM**: 2 ORE?

**ME**: Sì.

**PM**: MA IL RILASCIO ERA ORA!

**ME**: Lo so.

**PM**: E ORA?

**ME**: Ora... niente rilascio.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era il rilascio. Il nulla che era il fix. Il nulla... che era il mio --force. Amen.

---

**Martedì - 15:00**

Il reflog. La salvezza. O quasi.

**TL**: Hai provato git reflog?

**ME**: Sì.

**TL**: E?

**ME**: Ho trovato i commit.

**TL**: E li hai recuperati?

**ME**: Sì.

**TL**: E il codice?

**ME**: Il codice è tornato.

**TL**: E il fix del pagamento?

**ME**: È tornato.

**TL**: E gli ordini?

**ME**: Non si perdono più.

**TL**: E quindi?

**ME**: Quindi... ho recuperato tutto.

**TL**: E quanto ci hai messo?

**ME**: 2 ore.

**TL**: 2 ore?

**ME**: Sì.

**TL**: E il rilascio?

**ME**: Il rilascio è alle 16.

**TL**: E ce la fai?

**ME**: Credo di sì.

**TL**: E la prossima volta?

**ME**: Non faccio --force.

**TL**: E cos'altro?

**ME**: Faccio pull prima.

**TL**: E cos'altro?

**ME**: Controllo cosa c'è su main.

**TL**: E cos'altro?

**ME**: Non do retta al PM.

**TL**: E cos'altro?

**ME**: Non faccio --force su main. MAI.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git reflog
git reset --hard 8a7f3c2
git merge feature/carrello
```

E i commit erano tornati. E il codice era salvo. E il fix del pagamento era recuperato. Ma 2 ore perse. E il rilascio ritardato. E il CEO che mi cercava. Amen.

---

**Mercoledì - La Punizione**

Il mercoledì, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non farò mai git push --force su main.
Non farò mai git push --force su main.
Non farò mai git push --force su main.
...
(997 righe dopo)
...
Non farò mai git push --force su main.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più fatto --force su main.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che --force su main è vietato.

**TL**: E cos'altro?

**ME**: Che il pull va fatto sempre.

**TL**: E cos'altro?

**ME**: Che i conflitti vanno risolti con calma.

**TL**: E cos'altro?

**ME**: Che il PM non sa cosa è --force.

**TL**: E cos'altro?

**ME**: Che git reflog salva la vita.

**TL**: E cos'altro?

**ME**: Che 47 commit sono tanti.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che --force non è un comando. È una bomba. Quando lo usi, cancelli la storia. Cancelli il lavoro. Cancelli la fiducia. E tutto perché non hai fatto pull. Non hai controllato. Non hai pensato. E hai dato retta al PM. Il PM che non sa cosa è un commit. Il PM che sa solo "rilascio" e "feature". Ma il rilascio senza codice è solo un rilascio vuoto. E il codice l'avevi cancellato. Con --force. Su main. Su production. Su tutto. E ora scrivi. 1.000 volte. A mano. Su carta. E impari. Perché --force non perdona. E il CEO nemmeno. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non farò mai git push --force su main". E sapevo che le avrei mantenute. Perché --force non perdona. E il CEO nemmeno. Amen.

---

**Giovedì - La Documentazione**

Giovedì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #GIT-001: Il Git Push --force Che Ha Cancellato Tutto

**Data incident**: Martedì 7 luglio 2026, 12:58
**Autore**: ME
**Comando eseguito**: git push origin main --force
**Branch**: main
**Commit cancellati**: 47
**Autori commit cancellati**: JN (23), CR (18), altri (6)
**Contenuto cancellato**: 
  - Fix bug pagamento (CR)
  - Ottimizzazione query (JN)
  - Refactoring auth (JN)
  - Test coverage +15% (CR)
  - Documentazione API (altri)
**Tempo per recuperare**: 2 ore
**Metodo recupero**: git reflog
**Codice recuperato**: Sì (100%)
**Rilascio ritardato**: 2 ore
**Ordini persi**: 0 (fortunatamente)
**Punizione**: 1.000 volte "Non farò mai git push --force su main"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "--force su main? Sei pazzo?"
**Reazione TL**: "Il PM non sa cosa è --force."
**Reazione PM**: "Ma il rilascio!"
**Reazione JN**: "I miei commit..."
**Reazione CR**: "Il mio fix..."
**Lezione imparata**: --FORCE = BOMBA. MAI SU MAIN.
**Probabilità che succeda di nuovo**: 12% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. --force su main è VIETATO. VIETATO.
2. --force su qualsiasi branch condiviso è VIETATO.
3. Fare SEMPRE pull prima di push.
4. Controllare SEMPRE cosa c'è su main.
5. Risolvere i conflitti con CALMA.
6. Non dare retta al PM per comandi Git.
7. Il PM non sa cosa è --force.
8. Il PM sa solo "rilascio" e "feature".
9. git reflog salva la vita. Ma è meglio non doverlo usare.
10. 1.000 volte a mano. Ricordalo.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che --force cancella i commit. E che 47 commit sono tanti. E che JN e CR si incazzano. E che il fix del pagamento era importante. E che git reflog salva la vita. E che 2 ore di ritardo sono meglio di 47 commit persi. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che --force non si fa su main. MAI. Amen."

**ME**: Sì. E la lezione più importante è questa: --force è una bomba. Quando lo usi, cancelli la storia. Cancelli il lavoro. Cancelli la fiducia. E tutto perché non hai fatto pull. Non hai controllato. Non hai pensato. E hai dato retta al PM. Il PM che non sa cosa è un commit. Il PM che sa solo "rilascio" e "feature". Ma il rilascio senza codice è solo un rilascio vuoto. E il codice l'avevi cancellato. Con --force. Su main. Su production. Su tutto. E ora scrivi. 1.000 volte. A mano. Su carta. E impari. Perché --force non perdona. E il CEO nemmeno. Amen.

---

## Il costo del git push --force

| Voce | Valore |
|------|--------|
| Comando | git push --force |
| Branch | main |
| Commit cancellati | 47 |
| Autori impattati | 3+ |
| Fix cancellati | 1 (pagamento) |
| Ottimizzazioni cancellate | 1 (query) |
| Test cancellati | +15% coverage |
| Tempo recupero | 2 ore |
| Metodo recupero | git reflog |
| Codice recuperato | 100% |
| Rilascio ritardato | 2 ore |
| Ordini persi | 0 |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Sei pazzo?" |
| Reazione TL | "Il PM non sa cosa è --force" |
| Reazione PM | "Ma il rilascio!" |
| Reazione JN | "I miei commit..." |
| Reazione CR | "Il mio fix..." |
| Lezione imparata | --FORCE = BOMBA |
| **Totale** | **47 commit cancellati + 2 ore ritardo + 1.000 righe a mano** |

**Morale**: --force non si usa su main. Mai. Nemmeno se "il PM vuole". Nemmeno se "non ho tempo". Nemmeno se "il push fallisce". Perché quando --force cancella, cancella tutto. I commit. Il lavoro. La fiducia. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché --force non perdona. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](72-il-file-env-che-era-su-git.md)]**
