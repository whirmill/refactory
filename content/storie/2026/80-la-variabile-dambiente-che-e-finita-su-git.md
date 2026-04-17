# La Variabile d'Ambiente Che È Finita Su Git

**Data**: 29/08/2026

**[Home](../index.md) | [Precedente](79-il-log-che-ha-riempito-il-disco.md)]**

---

C'è una verità nel mondo del version control. Una verità sacra. Una verità ignorata da chiunque abbia mai scritto `git add .` pensando "tanto è solo un file". Quella verità è: **"Un repository è come una casa di vetro. Puoi metterci quello che vuoi. Ma tutto quello che metti, resta visibile. Per sempre. E se ci metti una password, quella password è visibile. Per sempre. E se ci metti una API key, quella API key è visibile. Per sempre. E se ci metti un token, quel token è visibile. Per sempre. E qualcuno lo trova. E qualcuno lo usa. E qualcuno entra nel tuo sistema. E tu guardi il log. E vedi l'accesso. E sai che è colpa tua. Perché hai scritto `git add .`. E il punto ha aggiunto tutto. Anche il .env. E il .env aveva la chiave. E la chiave è su GitHub. E GitHub è pubblico. E il mondo ha visto. E il mondo è entrato. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"Git non dimentica. Non perdona. Non cancella. Ha solo commit. E i commit sono per sempre. E se in un commit c'è un segreto, quel segreto è per sempre. Anche se lo cancelli nel commit dopo. Anche se fai force push. Anche se preghi. Il segreto resta. Nella storia. Nell'anima del repository. E qualcuno lo trova. Con git log. Con git show. Con git bisect. E il segreto è svelato. E tu sei fottuto. Amen"**. E questa è la storia di chi ha committato il .env. Di chi l'ha pushato. Di chi ha guardato il mondo entrare nel sistema. Un commit alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo deployare il nuovo servizio di pagamenti.

**ME**: Pagamenti?

**PM**: Sì. Stripe integration.

**ME**: Stripe?

**PM**: Sì. Per le carte di credito.

**ME**: E le API key?

**PM**: Ce le ho io.

**ME**: E dove le mettiamo?

**PM**: In un file .env.

**ME**: .env?

**PM**: Sì. Environment variables.

**ME**: E il .env va su git?

**PM**: NO! Il .env NON va su git!

**ME**: E quindi?

**PM**: Quindi lo metti nel .gitignore.

**ME**: E le variabili di test?

**PM**: Quelle vanno in .env.example.

**ME**: E le variabili di produzione?

**PM**: Quelle vanno nel sistema di deploy.

**ME**: E se qualcuno committa il .env?

**PM**: Non succede.

**ME**: E se succede?

**PM**: Allora... siamo fottuti.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia attenzione al .gitignore. Il nulla che era la mia consapevolezza dei segreti. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Setup**

Il martedì, ho configurato. Ho configurato l'ambiente. Ho configurato... quasi tutto.

**ME**: Ho creato il progetto.

**TL**: E il .gitignore?

**ME**: L'ho creato.

**TL**: Fammi vedere.

```
# .gitignore
node_modules/
.env
.env.local
.env.*.local
dist/
build/
*.log
.DS_Store
```

**TL**: Bene. Il .env è ignorato.

**ME**: Sì.

**TL**: E il .env.example?

**ME**: L'ho creato.

```
# .env.example
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-secret-here
```

**TL**: Ottimo.

**ME**: E il .env vero?

**TL**: Quello NON va su git.

**ME**: Lo so.

**TL**: E dove lo metti?

**ME**: In locale. Per i test.

**TL**: E in produzione?

**ME**: Nel sistema di deploy.

**TL**: Bene.

**ME**: E se qualcuno lo committa?

**TL**: NON LO COMMITTA.

**ME**: E se lo committa?

**TL**: Allora siamo fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git status
On branch main
Untracked files:
  .env
  .env.example
  .gitignore
  package.json
  src/
```

E il .env era lì. Non ancora committato. Ma presente. E io dovevo fare attenzione. Perché il .gitignore era configurato. Ma bastava un `git add .` sbagliato. E il disastro era fatto. Amen.

---

**Mercoledì - Il Codice**

Il mercoledì, ho scritto. Ho scritto il codice. Ho scritto... il disastro.

**ME**: Ho scritto l'integrazione Stripe.

**TL**: Fammi vedere.

```javascript
// src/payment.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(amount, currency = 'eur') {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe uses cents
    currency,
  });
  return paymentIntent;
}

async function confirmPayment(paymentIntentId) {
  const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
  return paymentIntent;
}

module.exports = { createPaymentIntent, confirmPayment };
```

**TL**: Usa le variabili d'ambiente?

**ME**: Sì. process.env.STRIPE_SECRET_KEY.

**TL**: E se la variabile non c'è?

**ME**: Allora Stripe fallisce.

**TL**: E l'errore?

**ME**: Lo gestisco.

**TL**: E il .env?

**ME**: È in locale.

**TL**: E il .gitignore?

**ME**: È configurato.

**TL**: E se qualcuno fa `git add .`?

**ME**: Il .gitignore lo blocca.

**TL**: E SE IL .gitignore NON FUNZIONA?

**ME**: Funziona. L'ho testato.

**TL**: E SE QUALCUNO FA `git add -f .env`?

**ME**: Nessuno fa force add.

**TL**: E SE QUALCUNO LO FA?

**ME**: Allora... siamo fottuti.

Il TL mi ha guardato. Io guardavo il codice. Il codice usava le variabili d'ambiente. E le variabili d'ambiente erano nel .env. E il .env era ignorato. Ma bastava un errore. Un comando sbagliato. E il .env finiva su git. E se finiva su git... era pubblico. Per sempre. Amen.

---

**Giovedì - Il Test**

Il giovedì, ho testato. Ho testato il pagamento. Ho testato... con successo.

**ME**: Ho testato Stripe.

**TL**: In sandbox?

**ME**: Sì. Con le chiavi di test.

**TL**: E funziona?

**ME**: Sì. Pagamento creato. Confermato. Tutto ok.

**TL**: E il .env?

**ME**: Ha le chiavi di test.

**TL**: E le chiavi di produzione?

**ME**: Non le ho ancora.

**TL**: E quando le hai?

**ME**: Le metto nel sistema di deploy.

**TL**: E NON nel .env?

**ME**: No. Mai nel .env.

**TL**: E perché?

**ME**: Perché il .env può finire su git.

**TL**: E se finisce su git?

**ME**: Allora le chiavi sono pubbliche.

**TL**: E se le chiavi sono pubbliche?

**ME**: Allora chiunque può usare il nostro account Stripe.

**TL**: E cosa può fare?

**ME**: Creare pagamenti. Leggere transazioni. Modificare account. Tutto.

**TL**: E quanto costa?

**ME**: Non lo so. Forse €100.000. Forse di più.

**TL**: E quindi?

**ME**: E quindi NON metto le chiavi di produzione nel .env.

**TL**: MAI.

**ME**: Mai.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
STRIPE_SECRET_KEY=sk_test_FAKE_TEST_KEY_EXAMPLE
```

E la chiave era di test. E le chiavi di test sono sicure. Ma le chiavi di produzione... quelle sono pericolose. E se finivano su git... il disastro era totale. Amen.

---

**Venerdì - 09:00**

Il venerdì, il PM ha chiamato. Il PM voleva. E io... ho ceduto.

**PM**: Dobbiamo deployare oggi.

**ME**: Oggi?

**PM**: Sì. Il CEO vuole vedere il pagamento funzionante.

**ME**: Ma non ho le chiavi di produzione.

**PM**: Te le do io.

**ME**: E dove le metto?

**PM**: Nel .env.

**ME**: Nel .env?

**PM**: Sì. Così è più veloce.

**ME**: Ma il .env non va su git.

**PM**: E allora non metterlo su git.

**ME**: E come faccio il deploy?

**PM**: Fai il deploy. E il .env resta in locale.

**ME**: E se qualcuno lo committa?

**PM**: Non lo committa.

**ME**: E se lo committa?

**PM**: Allora siamo fottuti.

**ME**: E quindi?

**PM**: E quindi fai attenzione. E NON lo committi.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia prudenza. Il nulla che era la mia attenzione. Il nulla... che era il PM che voleva il deploy. Oggi. Con le chiavi di produzione. Nel .env. Amen.

---

**Venerdì - 10:00**

Ho ricevuto. Ho ricevuto le chiavi. Ho ricevuto... il disastro.

**PM**: Ecco le chiavi.

**ME**: Di produzione?

**PM**: Sì. sk_live_xxxxxxxxxxxxx.

**ME**: E la metto nel .env?

**PM**: Sì.

**ME**: E poi?

**PM**: Poi fai il deploy.

**ME**: E il .env?

**PM**: Resta in locale. NON committarlo.

**ME**: Ok.

Ho aperto il .env. Ho aggiunto la chiave. Ho... scritto il disastro.

```
# .env
STRIPE_PUBLIC_KEY=pk_live_FAKE_KEY_EXAMPLE
STRIPE_SECRET_KEY=sk_live_FAKE_KEY_EXAMPLE
DATABASE_URL=postgresql://prod_user:FAKE_PASSWORD@prod-db.company.com:5432/production
JWT_SECRET=FAKE_JWT_SECRET_EXAMPLE
```

**ME**: Fatto.

**TL**: COSA HAI FATTO?

**ME**: Ho aggiunto le chiavi di produzione.

**TL**: NEL .env?

**ME**: Sì.

**TL**: E LA PASSWORD DEL DATABASE?

**ME**: Sì. Era nel .env.

**TL**: E IL JWT SECRET?

**ME**: Sì. Era nel .env.

**TL**: E HAI MESSO TUTTO NEL .env?

**ME**: Sì. Per il deploy.

**TL**: E IL .gitignore?

**ME**: È configurato.

**TL**: E SE QUALCUNO FA `git add .`?

**ME**: Il .gitignore blocca il .env.

**TL**: E SE IL .gitignore NON FUNZIONA?

**ME**: Funziona.

**TL**: E SE NON FUNZIONA?

**ME**: Allora... siamo fottuti.

Il TL mi ha guardato. Io guardavo il .env. Il .env aveva:
- STRIPE_SECRET_KEY di produzione (sk_live_...)
- DATABASE_URL con password
- JWT_SECRET di produzione

E tutto era nel .env. E il .env era nella cartella del progetto. E bastava un `git add .` sbagliato. E tutto finiva su GitHub. E GitHub era pubblico. E il mondo vedeva. E il mondo entrava. Amen.

---

**Venerdì - 10:30**

Ho deployato. Ho deployato il codice. Ho deployato... quasi tutto.

**ME**: Ho fatto il deploy.

**TL**: E il .env?

**ME**: È in locale.

**TL**: E su GitHub?

**ME**: Non c'è.

**TL**: E il .gitignore?

**ME**: Ha funzionato.

**TL**: E le variabili di produzione?

**ME**: Le ho messe nel sistema di deploy.

**TL**: E il .env locale?

**ME**: È ancora lì.

**TL**: E se qualcuno lo committa?

**ME**: Non lo committa.

**TL**: E SE LO COMMITTA?

**ME**: Allora siamo fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git status
On branch main
nothing to commit, working tree clean
```

E il working tree era clean. E il .env non era committato. E tutto sembrava ok. Ma il .env era ancora lì. Con le chiavi di produzione. E bastava un errore. Un comando sbagliato. E il disastro era fatto. Amen.

---

**Venerdì - 11:00**

Il PM ha chiamato. Il PM voleva. E io... ho sbagliato.

**PM**: Il deploy è andato?

**ME**: Sì.

**PM**: E il pagamento funziona?

**ME**: Sì.

**PM**: Ottimo. Ma c'è un problema.

**ME**: Quale?

**PM**: Il CEO vuole un fix.

**ME**: Un fix?

**PM**: Sì. Un piccolo bug nel checkout.

**ME**: E cosa devo fare?

**PM**: Fixarlo. E pushare.

**ME**: Ora?

**PM**: Sì. Ora.

**ME**: Ok.

Ho aperto il codice. Ho fixato il bug. Ho... committato.

```
git add .
git commit -m "Fix checkout bug"
git push origin main
```

**ME**: Fatto.

**TL**: COSA HAI FATTO?

**ME**: Ho fixato il bug.

**TL**: E COSA HAI SCRITTO?

**ME**: `git add .`

**TL**: `git add .`?

**ME**: Sì.

**TL**: E IL .gitignore?

**ME**: Il .gitignore...

**TL**: IL .gitignore?

**ME**: Non ha funzionato.

**TL**: NON HA FUNZIONATO?

**ME**: No.

**TL**: E COSA HAI COMMITTATO?

**ME**: Tutto.

**TL**: TUTTO?

**ME**: Sì. Anche il .env.

**TL**: ANCHE IL .env?

**ME**: Sì.

**TL**: CON LE CHIAVI DI PRODUZIONE?

**ME**: Sì.

**TL**: E HAI PUSHATO?

**ME**: Sì.

**TL**: SU GITHUB?

**ME**: Sì.

**TL**: E GITHUB È PUBBLICO?

**ME**: Sì.

**TL**: E QUINDI?

**ME**: E quindi... le chiavi sono pubbliche.

**TL**: PUBBLICHE?

**ME**: Sì. Chiunque può vederle.

**TL**: E USARLE?

**ME**: Sì.

**TL**: E QUANDO?

**ME**: Ora. In questo momento.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git log --oneline -1
a3f8b2c Fix checkout bug

git show a3f8b2c --name-only
.env
src/checkout.js
```

E il .env era nel commit. E il commit era su GitHub. E GitHub era pubblico. E le chiavi di produzione erano visibili. A tutti. Per sempre. Amen.

---

**Venerdì - 11:15**

Ho guardato. Ho guardato GitHub. Ho guardato... l'orrore.

**TERMINALE**:
```
curl -s https://raw.githubusercontent.com/company/payment-service/main/.env

# .env
STRIPE_PUBLIC_KEY=pk_live_FAKE_KEY_EXAMPLE_NOT_REAL
STRIPE_SECRET_KEY=sk_live_FAKE_KEY_EXAMPLE_NOT_REAL
DATABASE_URL=postgresql://prod_user:FAKE_PASSWORD@prod-db.company.com:5432/production
JWT_SECRET=FAKE_JWT_SECRET_EXAMPLE
```

**ME**: Il .env è visibile.

**TL**: VISIBILE?

**ME**: Sì. Chiunque può vederlo.

**TL**: E LE CHIAVI?

**ME**: Sono lì. In chiaro.

**TL**: E LA PASSWORD DEL DATABASE?

**ME**: È lì. La password del database!

**TL**: E IL JWT SECRET?

**ME**: È lì. Il JWT secret di produzione.

**TL**: E QUANTI MINUTI SONO PASSATI?

**ME**: 15 minuti.

**TL**: 15 MINUTI?

**ME**: Sì. Da quando ho pushato.

**TL**: E QUANTI BOT HANNO VISTO IL REPO?

**ME**: Non lo so. Forse 100. Forse 1000.

**TL**: E COSA FANNO I BOT?

**ME**: Scansionano per segreti.

**TL**: E QUANDO TROVANO UN SEGRETO?

**ME**: Lo usano.

**TL**: E QUANTO CI METTONO?

**ME**: Secondi. Forse millisecondi.

**TL**: E QUINDI?

**ME**: E quindi... le chiavi sono già compromesse.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava il .env. Su GitHub. In chiaro. Con tutte le chiavi. E i bot stavano già scansionando. E i bot stavano già usando. E io non potevo fare nulla. Perché git non dimentica. E il commit era lì. Per sempre. Amen.

---

**Venerdì - 11:30**

Ho cancellato. Ho cancellato il file. Ho cancellato... quasi nulla.

**ME**: Ho cancellato il .env dal repo.

**TL**: E ORA?

**ME**: Ora non c'è più.

**TL**: NELLA STORIA?

**ME**: Nella storia c'è ancora.

**TL**: E QUINDI?

**ME**: E quindi chiunque può vedere il commit.

**TL**: E IL COMMIT HA IL .env?

**ME**: Sì.

**TL**: E QUINDI?

**ME**: E quindi le chiavi sono ancora visibili.

**TL**: E COME LE VEDE?

**ME**: Con git show. Con git log. Con l'interfaccia di GitHub.

**TL**: E QUANTI COMMIT SONO PASSATI?

**ME**: 1. Ho cancellato subito.

**TL**: E QUANTI MINUTI SONO PASSATI?

**ME**: 30 minuti.

**TL**: E IN 30 MINUTI QUANTI BOT HANNO SCANSIONATO?

**ME**: Non lo so. Forse 500.

**TL**: E HANNO TROVATO LE CHIAVI?

**ME**: Sì.

**TL**: E LE HANNO USATE?

**ME**: Probabilmente.

**TL**: E QUANDO LO SCOPRIAMO?

**ME**: Quando vediamo i log.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
git log --oneline
a4f9c3d Remove .env from repository
a3f8b2c Fix checkout bug
```

E il .env era stato rimosso. Ma il commit a3f8b2c aveva ancora il .env. E chiunque poteva vederlo. E i bot l'avevano visto. E le chiavi erano compromesse. Amen.

---

**Venerdì - 12:00**

Ho controllato. Ho controllato i log. Ho controllato... l'orrore.

**TERMINALE**:
```
# Stripe Dashboard - Recent API Calls

2026-08-28 11:32:15 UTC - payment_intent.created - €0.50 - card: 4242...4242
2026-08-28 11:32:18 UTC - payment_intent.created - €0.50 - card: 4242...4242
2026-08-28 11:32:21 UTC - payment_intent.created - €0.50 - card: 4242...4242
2026-08-28 11:32:24 UTC - payment_intent.created - €0.50 - card: 4242...4242
2026-08-28 11:32:27 UTC - payment_intent.created - €0.50 - card: 4242...4242
...
2026-08-28 11:45:00 UTC - payment_intent.created - €1000.00 - card: 4929...1234
2026-08-28 11:45:05 UTC - payment_intent.created - €1000.00 - card: 4929...5678
2026-08-28 11:45:10 UTC - payment_intent.created - €1000.00 - card: 4929...9012
...
```

**ME**: Ci sono pagamenti sospetti.

**TL**: SOSPETTI?

**ME**: Sì. Centinaia di pagamenti.

**TL**: E DA DOVE VENGONO?

**ME**: Non lo so. Da IP diversi.

**TL**: E QUANTO HANNO PAGATO?

**ME**: Non lo so. Forse €50.000.

**TL**: €50.000?

**ME**: Sì. In 30 minuti.

**TL**: E CHI HA PAGATO?

**ME**: Non lo so. Carte diverse.

**TL**: E LE CARTE?

**ME**: Non sono le nostre.

**TL**: E QUINDI?

**ME**: E quindi qualcuno sta usando le nostre chiavi.

**TL**: E CHI?

**ME**: I bot che hanno trovato il .env.

**TL**: E QUANTO COSTA?

**ME**: Non lo so. Stripe addebita le commissioni.

**TL**: E QUANTO?

**ME**: 2.9% + €0.30 per transazione.

**TL**: E SU €50.000?

**ME**: €1.480 di commissioni.

**TL**: E I CHARGEBACK?

**ME**: I chargeback costano €15 cadauno.

**TL**: E QUANTI SONO?

**ME**: Non lo so. Forse 100.

**TL**: E QUINDI?

**ME**: E quindi €1.500 di chargeback.

**TL**: E IL TOTALE?

**ME**: €3.000. Più la reputazione.

**TL**: E LA REPUTAZIONE?

**ME**: Stripe può bannarci.

**TL**: BANNARCI?

**ME**: Sì. Per attività sospetta.

**TL**: E SE CI BANNA?

**ME**: Non possiamo più accettare pagamenti.

**TL**: E IL BUSINESS?

**ME**: Il business muore.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Pagamenti sospetti: 500+
- Totale transato: €52.847
- Commissioni: €1.533
- Chargeback previsti: €1.500
- Rischio ban: ALTO

E le chiavi erano state usate. E i bot avevano pagato. E Stripe stava notando. E il business rischiava di morire. Amen.

---

**Venerdì - 12:30**

Ho rotato. Ho rotato le chiavi. Ho rotato... tutto.

**ME**: Ho rotato le chiavi Stripe.

**TL**: E LE VECCHIE?

**ME**: Le ho revocate.

**TL**: E I PAGAMENTI?

**ME**: I nuovi pagamenti non funzionano più con le vecchie chiavi.

**TL**: E I PAGAMENTI FRAUDOLENTI?

**ME**: Quelli sono già fatti.

**TL**: E LA PASSWORD DEL DATABASE?

**ME**: L'ho cambiata.

**TL**: E IL JWT SECRET?

**ME**: L'ho cambiato.

**TL**: E QUANTO CI HAI MESSO?

**ME**: 30 minuti.

**TL**: E IN 30 MINUTI?

**ME**: In 30 minuti i bot hanno fatto €50.000 di pagamenti.

**TL**: E ORA?

**ME**: Ora le chiavi sono nuove.

**TL**: E I BOT?

**ME**: I bot hanno le vecchie chiavi. Non funzionano più.

**TL**: E IL DANNÒ?

**ME**: Il danno è fatto. €3.000 persi.

**TL**: E LA REPUTAZIONE?

**ME**: Stripe ci sta controllando.

**TL**: E SE CI BANNA?

**ME**: Allora siamo fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Chiavi Stripe: ROTATE
- Password database: CAMBIATA
- JWT Secret: CAMBIATO
- Danno: €3.000
- Rischio ban: MEDIO

E le chiavi erano state rotate. Ma il danno era fatto. E Stripe ci stava guardando. E il CEO ci stava cercando. Amen.

---

**Venerdì - 14:00**

Il CEO. Il CEO in ufficio. Il CEO... che punì.

**CEO**: Quindi mi stai dicendo che hai committato il .env su GitHub?

**ME**: Sì.

**CEO**: CON LE CHIAVI DI PRODUZIONE?

**ME**: Sì.

**CEO**: E HAI ASPETTATO 30 MINUTI PRIMA DI ROTARE?

**ME**: Sì.

**CEO**: E IN 30 MINUTI I BOT HANNO FATTO €50.000 DI PAGAMENTI FRAUDOLENTI?

**ME**: Sì.

**CEO**: E HAI PERSO €3.000 IN COMMISSIONI E CHARGEBACK?

**ME**: Sì.

**CEO**: E STRIPE CI STA CONTROLLANDO?

**ME**: Sì.

**CEO**: E POSSIAMO ESSERE BANNATI?

**ME**: Sì.

**CEO**: E TUTTO PERCHÉ HAI FATTO `git add .`?

**ME**: Sì.

**CEO**: E SAI COSA FARAI?

**ME**: Cosa?

**CEO**: Scriverai 1.000 volte: "Non committerò mai il .env su git".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

**ME**: E il .env nel commit?

**CEO**: Quello resta. Per sempre. Git non dimentica. E tu non dimenticherai. Perché ogni volta che guardi la storia del repo, vedrai il commit a3f8b2c. E vedrai il .env. E vedrai le chiavi. E ricorderai. Che hai committato il .env. E che il mondo l'ha visto. E che i bot l'hanno usato. E che hai perso €3.000. E che Stripe ci ha quasi bannato. E che il CEO ti ha fatto scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché git non dimentica. E il CEO nemmeno. Amen.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che era `git add .`. Scritto senza pensare. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non committerò mai il .env su git.
Non committerò mai il .env su git.
Non committerò mai il .env su git.
...
(997 righe dopo)
...
Non committerò mai il .env su git.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più committato il .env.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che il .env NON va su git.

**TL**: E cos'altro?

**ME**: Che `git add .` è pericoloso.

**TL**: E cos'altro?

**ME**: Che i bot scansionano GitHub.

**TL**: E cos'altro?

**ME**: Che le chiavi di produzione sono sacre.

**TL**: E cos'altro?

**ME**: Che 30 minuti sono troppi.

**TL**: E cos'altro?

**ME**: Che €3.000 persi sono tanti.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che i segreti non vanno su git. MAI. E se ci vanno, il mondo li vede. E i bot li usano. E tu perdi soldi. E perdi reputazione. E perdi dignità. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché git non dimentica. E i segreti nemmeno. E se committi un segreto, quel segreto è per sempre. Anche se lo cancelli. Anche se lo ruoti. Anche se preghi. Il segreto resta. Nella storia. Nell'anima del repository. E qualcuno lo trova. E lo usa. E tu sei fottuto. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non committerò mai il .env su git". E sapevo che le avrei mantenute. Perché git non dimentica. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #GIT-001: La Variabile d'Ambiente Che È Finita Su Git

**Data incident**: Venerdì 28 agosto 2026, 11:00
**Autore**: ME
**Comando eseguito**: git add . (con .env presente)
**File committato**: .env
**Contenuto del file**:
  - STRIPE_SECRET_KEY (produzione)
  - DATABASE_URL (con password)
  - JWT_SECRET (produzione)
**Tempo di esposizione**: 30 minuti
**Bot che hanno scansionato**: ~500
**Pagamenti fraudolenti**: 523
**Totale transato**: €52.847
**Commissioni perse**: €1.533
**Chargeback previsti**: €1.500
**Danno totale**: €3.033
**Rischio ban Stripe**: ALTO
**Chiavi rotate**: Sì (dopo 30 minuti)
**Password cambiate**: Sì
**JWT Secret cambiato**: Sì
**Punizione**: 1.000 volte "Non committerò mai il .env su git"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "I segreti non vanno su git. MAI."
**Reazione TL**: "Git non dimentica."
**Reazione PM**: "Volevo il deploy veloce!"
**Lezione imparata**: .env = .gitignore + MAI COMMITTARE
**Probabilità che succeda di nuovo**: 15% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. IL .env VA SEMPRE NEL .gitignore.
2. `git add .` È PERICOLOSO. Usare `git add -p`.
3. I SEGRETI NON VANNO SU GIT. MAI.
4. LE CHIAVI DI PRODUZIONE VANNO NEL SISTEMA DI DEPLOY.
5. I BOT SCANSIONANO GITHUB. IN TEMPO REALE.
6. 30 MINUTI SONO TROPPI. RUOTARE SUBITO.
7. GIT NON DIMENTICA. I COMMIT SONO PER SEMPRE.
8. €3.000 SONO TANTI. MA LA REPUTAZIONE È DI PIÙ.
9. STRIPE PUÒ BANNARTI. E IL BUSINESS MUORE.
10. 1.000 VOLTE A MANO. RICORDALO.

**Git secrets prevention**:
```bash
# Install git-secrets
brew install git-secrets

# Configure for repository
git secrets --install
git secrets --register-aws
git secrets --add 'sk_live_.*'
git secrets --add 'pk_live_.*'
git secrets --add 'DATABASE_URL.*'

# Pre-commit hook
#!/bin/bash
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  against=HEAD
else
  against=$(git hash-object -t tree /dev/null)
fi

# Check for .env files
if git diff --cached --name-only $against | grep -E '\.env$'; then
  echo "ERROR: .env file detected in commit!"
  echo "Please remove .env from staging area."
  exit 1
fi
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che il .env non va su git. E che `git add .` è pericoloso. E che i bot scansionano GitHub. E che le chiavi di produzione sono sacre. E che 30 minuti sono troppi. E che €3.000 persi sono tanti. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che git non dimentica. E che i segreti nemmeno. E se committi un segreto, quel segreto è per sempre. Anche se lo cancelli. Anche se lo ruoti. Anche se preghi. Il segreto resta. Nella storia. Nell'anima del repository. E qualcuno lo trova. E lo usa. E tu sei fottuto. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché git non dimentica. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: i segreti non vanno su git. MAI. E se ci vanno, il mondo li vede. E i bot li usano. E tu perdi soldi. E perdi reputazione. E perdi dignità. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché git non dimentica. E i segreti nemmeno. E se committi un segreto, quel segreto è per sempre. Anche se lo cancelli. Anche se lo ruoti. Anche se preghi. Il segreto resta. Nella storia. Nell'anima del repository. E qualcuno lo trova. E lo usa. E tu sei fottuto. Amen.

---

## Il costo del .env su git

| Voce | Valore |
|------|--------|
| Comando | git add . |
| File committato | .env |
| Tempo di esposizione | 30 minuti |
| Bot che hanno scansionato | ~500 |
| Pagamenti fraudolenti | 523 |
| Totale transato | €52.847 |
| Commissioni perse | €1.533 |
| Chargeback previsti | €1.500 |
| Danno totale | €3.033 |
| Rischio ban Stripe | ALTO |
| Chiavi rotate | Sì (dopo 30 min) |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Mai su git" |
| Reazione TL | "Git non dimentica" |
| Reazione PM | "Volevo veloce!" |
| Lezione imparata | .env = .gitignore + MAI COMMITTARE |
| **Totale** | **523 pagamenti fraudolenti + €3.033 persi + rischio ban + 1.000 righe a mano** |

**Morale**: Il .env non va su git. MAI. E se ci va, il mondo lo vede. E i bot lo usano. E tu perdi soldi. E perdi reputazione. E perdi dignità. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché git non dimentica. E i segreti nemmeno. E se committi un segreto, quel segreto è per sempre. Anche se lo cancelli. Anche se lo ruoti. Anche se preghi. Il segreto resta. Nella storia. Nell'anima del repository. E qualcuno lo trova. E lo usa. E tu sei fottuto. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](79-il-log-che-ha-riempito-il-disco.md)]**
