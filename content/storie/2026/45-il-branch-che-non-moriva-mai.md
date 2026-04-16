# Il Branch Che Non Moriva Mai

**Data**: 27/12/2026

**[Home](../index.md) | [Precedente](44-il-bug-che-era-un-feature.md)]**

---

C'è una verità in Git che nessuno ti dice. Una verità che impari solo con il dolore. Una verità che ti cambia per sempre. La verità è: **i branch non muoiono mai**. Puoi cancellarli. Puoi eliminarli. Puoi dimenticarli. Ma loro tornano. Sempre. Come zombie. Come errori del passato. Come il codice di Bob.

Questo è il racconto di un branch. Un branch che non sarebbe dovuto esistere. Un branch che è stato cancellato. Un branch che è tornato. E tornato. E tornato. Fino a consumare tutto.

![](../../img/code.jpg)

---

**2019 - La Creazione**

Era un martedì qualunque. Il CTO aveva un'idea. Il CTO aveva sempre un'idea. Il CTO non sapeva che le idee costano. Le idee costano tempo. Le idee costano dolore. Le idee costano branch.

**CTO**: Dobbiamo rifare l'interfaccia utente.

**TL**: L'interfaccia utente?

**CTO**: Sì. È vecchia. È brutta. Non è "moderna".

**ME**: Ma funziona.

**CTO**: Funziona non basta. Deve essere moderna.

**TL**: Cosa significa "moderna"?

**CTO**: Non lo so. Ma lo riconosco quando lo vedo.

**JN**: E come la rifacciamo?

**CTO**: Creiamo un branch! `ui-redesign`. Lavoriamo lì. E quando è pronto, mergiamo!

Il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. Il JN non sapeva. Il JN non poteva sapere. Il JN era innocente. Il JN era condannato.

**TL**: Ok. Creiamo il branch.

```bash
git checkout -b ui-redesign
```

E così è nato. Il branch che ci avrebbe distrutti. Il branch che non sarebbe mai morto. Il branch che sarebbe diventato leggenda. O maledizione. O entrambi.

---

**2019 - Il Lavoro**

Abbiamo lavorato sul branch. Per 3 mesi. 3 mesi di redesign. 3 mesi di "non è abbastanza moderno". 3 mesi di CTO che cambiava idea. Ogni giorno. Ogni ora. Ogni minuto.

**CTO**: Voglio i pulsanti rotondi.

**TL**: Ok. Pulsanti rotondi.

**CTO**: No, quadrati. I rotondi sono "giocattolo".

**TL**: Ok. Pulsanti quadrati.

**CTO**: No, rotondi ma con gli angoli. "Rounded".

**TL**: Ma è la stessa cosa di prima.

**CTO**: No. Prima erano "rotondi". Ora sono "rounded". È diverso.

Il JN ha chiesto: "Ma non dovremmo definire le specifiche prima?"

Il TL ha risposto: "Il CTO non crede nelle specifiche. Il CTO crede nelle 'iterazioni'."

"E cosa sono le iterazioni?"

"Le iterazioni sono quando il CTO cambia idea 47 volte e tu rifai tutto 47 volte e alla fine il CTO dice 'non è quello che volevo' e tu piangi."

Il JN ha pianto. Dentro. Perché fuori non si può. Perché sono un professionista. E i professionisti non piangono. I professionisti iterano. E soffrono. In silenzio.

---

**2020 - L'Abbandono**

Dopo 6 mesi, il CTO ha perso interesse. Il CTO perdeva sempre interesse. Il CTO aveva la attenzione span di un criceto su caffeina.

**CTO**: Ho letto di blockchain.

**TL**: Blockchain?

**CTO**: Sì! Dobbiamo integrare blockchain!

**ME**: Ma siamo un e-commerce di scarpe.

**CTO**: E allora? Le scarpe possono essere sulla blockchain!

**TL**: Come?

**CTO**: Non lo so! Scopritelo! Creiamo un branch! `blockchain-integration`!

E così, il branch `ui-redesign` è stato abbandonato. Non cancellato. Non mergiato. Abbandonato. Lì. Nel limbo dei branch. Dove i branch aspettano. Dove i branch covano. Dove i branch tramano la loro vendetta.

Il TL ha detto: "Dovremmo cancellarlo."

Il CTO ha detto: "No! Potrebbe servire! Non si sa mai!"

E non si sa mai. Ma non serve mai. E i branch rimangono. E crescono. E invecchiano. E diventano mostri.

---

**2021 - Il Ritorno**

Un anno dopo. Un anno. Il JN era diventato ME. Il ME era diventato TL. Il TL era diventato... ancora TL. Perché il TL non viene promosso. Il TL sopravvive.

Il CTO ha detto: "Riprendiamo il redesign!"

**TL**: Quale redesign?

**CTO**: `ui-redesign`! Il branch è ancora lì!

**TL**: È lì da un anno.

**CTO**: E allora? I branch non scadono!

**TL**: Ma il codice è vecchio. La main è cambiata. Ci saranno conflitti.

**CTO**: I conflitti si risolvono!

Il TL ha fatto il checkout del branch. E l'inferno è iniziato.

```bash
git checkout ui-redesign
git merge main
CONFLICT (content): Merge conflict in 47 files
```

47 file. 47 conflitti. 47 motivi per piangere.

**TL**: Ci sono 47 conflitti.

**CTO**: E risolvili!

**TL**: Ci vorranno settimane.

**CTO**: Allora inizia oggi!

Il TL ha iniziato. Ha risolto conflitti. Per 3 settimane. 3 settimane di `<<<<<<<`, `=======`, `>>>>>>>`. 3 settimane di "chi ha scritto questo?", "perché questo codice esiste?", "cosa significa questo commento di Bob?".

E poi, quando tutti i conflitti erano risolti, quando il branch era pronto, quando finalmente si poteva mergiare...

Il CTO ha detto: "Ho cambiato idea. Non voglio più il redesign."

**TL**: COSA?

**CTO**: Ho visto un nuovo trend. "Minimalismo brutale". Niente pulsanti. Solo testo.

**TL**: Solo testo?

**CTO**: Sì! È il futuro!

**TL**: E il branch?

**CTO**: Tienilo! Potrebbe servire!

Il branch è rimasto. Ancora. Sempre. Per sempre.

---

**2022 - L'Esplosione**

Il branch `ui-redesign` era lì. Da 3 anni. 3 anni. Nel frattempo, la main era cambiata. 847 commit. 47 release. 12 breaking changes. E il branch era lì. A marcire. A putrefare. A diventare radioattivo.

Il JN (un nuovo JN, perché i JN si consumano) ha chiesto: "Cos'è questo branch?"

**TL**: Non toccarlo.

**JN**: Ma è vecchio. Possiamo cancellarlo?

**TL**: NO!

**JN**: Perché?

**TL**: Perché il CTO dice che "potrebbe servire".

**JN**: Ma sono 3 anni!

**TL**: E allora? I branch non scadono!

Il JN non ha toccato. Ma il JN ha guardato. E ha visto. Ha visto che il branch aveva 847 commit. Ha visto che il branch aveva 47.000 righe di codice. Ha visto che il branch aveva... vita propria.

Perché il branch non era solo codice. Il branch era un organismo. Un organismo che cresceva. Che si evolveva. Che aspettava. Il momento giusto. Per colpire.

---

**2023 - L'Incidente**

Era venerdì. 16:47. Il momento peggiore. Il momento in cui tutto va storto.

Il JN ha fatto un push. Sulla main. Un push piccolo. Una fix. Un carattere. Un punto e virgola.

Ma il JN ha sbagliato. Il JN non ha fatto push sulla main. Il JN ha fatto push su `ui-redesign`. Perché il JN aveva fatto checkout del branch per "dare un'occhiata". E si era dimenticato di tornare sulla main.

```bash
git push origin ui-redesign
```

E il branch è tornato in vita. Dopo 4 anni. Come un zombie. Come un vampiro. Come un incubo che non finisce mai.

Il CTO ha visto il push. Il CTO ha un bot che lo notifica di tutto. Di ogni push. Di ogni commit. Di ogni respiro.

**CTO**: COS'È QUESTO PUSH SU `ui-redesign`?

**JN**: Io... ho sbagliato.

**CTO**: SBAGLIATO?

**JN**: Sì. Volevo pushare sulla main.

**CTO**: E PERCHÉ ERAVI SU QUEL BRANCH?

**JN**: Volevo... dare un'occhiata.

**CTO**: UN'OCCHIATA? A UN BRANCH DI 4 ANNI FA?

**JN**: Sì.

**CTO**: E COSA HAI VISTO?

**JN**: Che... è vecchio?

**CTO**: VECCHIO? È UNA MINA! UNA MINA CHE HAI ATTIVATO!

Il CTO aveva ragione. Era una mina. Perché il push aveva attivato la CI/CD. E la CI/CD aveva cercato di fare il deploy. E il deploy aveva fallito. Ma aveva fallito in modo spettacolare.

Il deploy aveva creato un ambiente di staging. Con il codice del branch. Un codice di 4 anni prima. Un codice che chiamava API che non esistevano più. Che usava database che non esistevano più. Che faceva cose che non doveva fare.

E il sistema di staging è crollato. E ha trascinato con sé il sistema di CI. E ha trascinato con sé il sistema di monitoring. E ha trascinato con sé la nostra sanità mentale.

---

**2024 - La Guerra**

Il CTO ha dichiarato guerra al branch.

**CTO**: Dobbiamo eliminarlo!

**TL**: Finalmente!

**CTO**: Ma non possiamo cancellarlo direttamente!

**TL**: Perché?

**CTO**: Perché potrebbe contenere codice prezioso!

**TL**: Prezioso? È vecchio di 4 anni!

**CTO**: E allora? Non si sa mai!

**TL**: E cosa facciamo?

**CTO**: Analizziamo! Ogni riga! Ogni file! E vediamo se c'è qualcosa di utile!

Il TL ha analizzato. Per 2 mesi. 2 mesi a leggere codice vecchio. 2 mesi a capire cosa faceva. 2 mesi a chiedersi perché. Perché esisteva. Perché era stato creato. Perché non era mai morto.

E alla fine, il TL ha trovato. Una funzione. Una funzione che faceva qualcosa di utile. Una funzione che non esisteva più sulla main. Una funzione che... serviva.

**TL**: Ho trovato una funzione utile.

**CTO**: VISTO? TE L'AVEVO DETTO!

**TL**: Sì. Ma è l'unica cosa utile in 47.000 righe.

**CTO**: Non importa! Una cosa utile giustifica tutto!

**TL**: E il resto?

**CTO**: Il resto... lo mergiamo!

**TL**: COSA?

**CTO**: Sì! Mergiamo tutto! E poi cancelliamo quello che non serve!

**TL**: Ma sono 47.000 righe!

**CTO**: E allora? Sei pagato per questo!

Il TL ha pianto. Dentro. Perché fuori non si può. Perché sono un professionista. E i professionisti non piangono. I professionisti mergiano. E soffrono. In silenzio.

---

**2025 - Il Merge**

Il merge è durato 6 mesi. 6 mesi. Per un branch che non doveva esistere. Per un branch che era stato abbandonato. Per un branch che non moriva mai.

Ogni giorno. Ogni ora. Ogni minuto. Conflitti. Conflitti. Conflitti.

```
CONFLICT (content): Merge conflict in src/components/Button.js
CONFLICT (content): Merge conflict in src/components/Header.js
CONFLICT (content): Merge conflict in src/components/Footer.js
CONFLICT (content): Merge conflict in src/components/Everything.js
```

Il JN ha chiesto: "Ma non è più facile ricominciare da zero?"

Il TL ha risposto: "Sì. Ma il CTO vuole 'preservare il lavoro fatto'."

"Ma il lavoro è vecchio di 5 anni!"

"E allora? Il lavoro è lavoro. E il lavoro non si butta."

"E se il lavoro è inutile?"

"Allora lo preservi lo stesso. E lo mergi. E lo odi. E vai avanti. Come tutti. Come sempre. Per sempre."

Il merge è stato completato. Il 24 dicembre. Come regalo di Natale. Un regalo che nessuno voleva. Un regalo che ha distrutto il weekend di tutti. Un regalo che ha portato solo dolore.

---

**2026 - Oggi**

Il branch `ui-redesign` non esiste più. È stato mergiato. È stato cancellato. È stato dimenticato.

Ma il codice del branch è ancora lì. Nella main. Misto con il codice nuovo. Confuso con il codice vecchio. Intrecciato con il codice di Bob. E nessuno sa cosa fa. E nessuno sa cosa significa. E nessuno sa perché è lì.

Il JN ha chiesto: "Ma questo codice... serve?"

Il TL ha risposto: "Non lo so."

"E come facciamo a saperlo?"

"Non lo sappiamo. Non lo sapremo mai. Perché il codice è lì. E il codice resta. E il codice non muore. Come i branch. Come il dolore. Come i TODO di Bob. Come tutto."

"E se proviamo a rimuoverlo?"

"Allora qualcosa si romperà. E non sapremo cosa. E non sapremo perché. E dovremo rimetterlo. E il codice tornerà. Come i branch. Come tutto. Sempre. Per sempre. Amen."

Il CTO ha creato un nuovo branch. La settimana scorsa. `ai-integration`. Perché il CTO ha letto un blog post. Perché il CTO ha visto una demo. Perché il CTO ha avuto un'idea.

E il TL ha guardato me. Io ho guardato il TL. Abbiamo guardato il JN. E il JN ha guardato il terminale. E il JN ha scritto:

```bash
git checkout -b ai-integration
```

E un altro branch è nato. Un altro branch che non morirà mai. Un altro branch che aspetterà. Nel limbo. Per anni. Fino a quando qualcuno lo toccherà. E l'inferno ricomincerà. Come sempre. Come tutto. Come la vita. Dei branch. Che non muoiono mai.

---

## Il costo del branch immortale

| Voce | Valore |
|------|--------|
| Anni di vita del branch | 7 |
| Commit nel branch | 847 |
| Righe di codice | 47.000 |
| Conflitti risolti | 2.847 |
| Mesi di lavoro persi | 8 |
| JN traumatizzati | 3 |
| Weekend rovinati | 12 |
| Natale rovinato | 1 |
| Funzioni utili trovate | 1 |
| Funzioni utili effettivamente usate | 0 |
| Branch cancellati | 1 |
| Branch ricreati | 1 (`ai-integration`) |
| Sanità mentale residua | ~3% |

**Morale**: I branch non muoiono mai. Puoi cancellarli. Puoi mergiarli. Puoi dimenticarli. Ma loro tornano. Sempre. Come zombie. Come errori del passato. Come il codice di Bob. E l'unica cosa che puoi fare? Non crearli. Non crearli mai. Non per un'idea del CTO. Non per un "potrebbe servire". Non per "non si sa mai". Perché i branch costano. Costano tempo. Costano dolore. Costano vite. Di sviluppatori. Che mergiano. Che risolvono conflitti. Che piangono. Dentro. E fuori. E sempre. Per sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](44-il-bug-che-era-un-feature.md) | [Prossima](46-il-backup-che-non-esisteva.md)]**
