# Il Kubernetes Deployment Che Ha Scalato A 100 Repliche

**Data**: 01/08/2026

**[Home](../index.md) | [Precedente](75-il-server-fantasma.md)]**

---

C'è una verità nel mondo del container orchestration. Una verità sacra. Una verità ignorata da chiunque abbia mai modificato un file YAML pensando "tanto è solo un numero". Quella verità è: **"Un Kubernetes deployment è come un branco di gatti. Puoi gestirne uno. Puoi gestirne dieci. Ma quando ne hai 100, non gestisci più nulla. Sono loro che gestiscono te. E il cluster. E i costi. E il povero account AWS che piange vedendo i costi salire. E tu non puoi fare nulla. Perché hai scritto 'replicas: 100'. E Kubernetes ha obbedito. Come un servo fedele. Che ha creato 100 pod. Che hanno consumato 100 CPU. Che hanno mangiato 200GB di RAM. E il cluster è morto. E il wallet è morto. E tu sei morto. Amen"**. Ma c'è una verità ancora più sacra. Quella verità è: **"I file YAML non perdonano. Non hanno sentimenti. Non hanno pietà. Hanno solo indentazione. E se l'indentazione è sbagliata, il deployment è sbagliato. E se il numero è sbagliato, il disastro è giusto. E tu guardi i pod moltiplicarsi come conigli. E non puoi fermarli. Perché Kubernetes non si ferma. Kubernetes obbedisce. E tu hai scritto 100. E 100 pod sono nati. E 100 pod ti odiano. Amen"**. E questa è la storia di chi ha scritto quel numero. Di chi l'ha deployato. Di chi ha guardato il cluster morire. Un pod alla volta. Amen.

![](../../img/code.jpg)

---

**Lunedì - La Richiesta**

Era lunedì. Il PM aveva una richiesta. Il PM aveva sempre una richiesta. Ma questa era diversa.

**PM**: Dobbiamo scalare il servizio.

**ME**: Scalare?

**PM**: Sì. Per il Black Friday.

**ME**: Black Friday?

**PM**: Sì. Tra 2 settimane.

**ME**: E dobbiamo prepararci ora?

**PM**: Sì. Dobbiamo testare.

**ME**: Testare cosa?

**PM**: La scalabilità.

**ME**: E quanto dobbiamo scalare?

**PM**: Non lo so. Forse 10x.

**ME**: 10x?

**PM**: Sì. Il traffico sarà 10x.

**ME**: E ora quante repliche abbiamo?

**PM**: Non lo so. 3?

**ME**: 3.

**PM**: E quindi dobbiamo andare a 30.

**ME**: 30 repliche?

**PM**: Sì. Per il test.

**ME**: E poi le riportiamo a 3?

**PM**: Sì. Dopo il test.

**ME**: E quando facciamo il test?

**PM**: Venerdì.

**ME**: Venerdì?

**PM**: Sì. Venerdì pomeriggio.

**ME**: E se qualcosa va storto?

**PM**: Cosa può andare storto? È solo un numero.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia esperienza con Kubernetes. Il nulla che era la mia attenzione ai file YAML. Il nulla... che stava per diventare un disastro. Amen.

---

**Martedì - Il Piano**

Il martedì, ho pianificato. Ho pianificato la scalata. Ho pianificato... il nulla.

**ME**: Ho guardato il deployment.

**TL**: E?

**ME**: Abbiamo 3 repliche.

**TL**: E il PM vuole?

**ME**: 30 per il test.

**TL**: 30?

**ME**: Sì. Per il Black Friday.

**TL**: E il cluster regge?

**ME**: Non lo so. Devo controllare.

**TL**: E quante CPU ha?

**ME**: 12 nodi. 4 CPU ognuno. 48 CPU totali.

**TL**: E quanta RAM?

**ME**: 96GB totali.

**TL**: E ogni pod quanto consuma?

**ME**: 500m CPU. 1GB RAM.

**TL**: E 30 pod?

**ME**: 15 CPU. 30GB RAM.

**TL**: E regge?

**ME**: Sì. Dovrebbe.

**TL**: E se il PM vuole di più?

**ME**: Non vuole di più.

**TL**: Il PM vuole sempre di più.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
```
kubectl get deployment api-server
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
api-server   3/3     3            3           342d
```

E il deployment era lì. Con 3 repliche. E il PM voleva 30. E io dovevo preparare il file YAML. Amen.

---

**Mercoledì - Il File YAML**

Il mercoledì, ho preparato. Ho preparato il file. Ho preparato... il disastro.

**ME**: Ho preparato il file.

**TL**: Fammi vedere.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 30
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api-server
        image: company/api-server:v2.3.1
        resources:
          requests:
            cpu: "500m"
            memory: "1Gi"
          limits:
            cpu: "1000m"
            memory: "2Gi"
```

**TL**: 30 repliche?

**ME**: Sì.

**TL**: E il PM ha detto 30?

**ME**: Sì. Per il test.

**TL**: E lo applichi venerdì?

**ME**: Sì. Venerdì pomeriggio.

**TL**: E lo testi prima?

**ME**: In staging.

**TL**: E quando?

**ME**: Giovedì.

**TL**: E se ci sono problemi?

**ME**: Non ci sono problemi.

**TL**: E se il cluster non regge?

**ME**: Regge.

**TL**: E se i nodi vanno in crash?

**ME**: Non vanno in crash.

**TL**: E se i costi esplodono?

**ME**: I costi?

**TL**: Sì. AWS. Ogni pod costa.

**ME**: Quanto?

**TL**: Non lo so. Ma 30 pod costano 10x di 3.

**ME**: E se è solo per il test?

**TL**: Se è solo per il test, ok. Ma se ti dimentichi di riportarlo a 3...

**ME**: Non mi dimentico.

**TL**: Ti dimentichi sempre.

Il TL mi ha guardato. Io guardavo il file. Il file mostrava `replicas: 30`. E il PM voleva 30. E io avevo preparato. Ma non avevo pensato ai costi. O al fatto che avrei dimenticato. Amen.

---

**Giovedì - Il Test In Staging**

Il giovedì, ho testato. Ho testato in staging. Ho testato... con un errore.

**ME**: Ok. Applico in staging.

**TL**: Hai controllato il file?

**ME**: Sì.

**TL**: E le repliche?

**ME**: 30.

**TL**: E staging ha la stessa capacità di produzione?

**ME**: No. Staging è più piccolo.

**TL**: Più piccolo quanto?

**ME**: 4 nodi. 16 CPU. 32GB RAM.

**TL**: E 30 pod?

**ME**: 30 pod sono 15 CPU e 30GB RAM.

**TL**: E staging ha 16 CPU e 32GB RAM.

**ME**: Sì.

**TL**: E quindi?

**ME**: E quindi... è al limite.

**TL**: AL LIMITE?

**ME**: Sì. Ma dovrebbe reggere.

**TL**: E se non regge?

**ME**: Allora riduco.

**TL**: E se non puoi ridurre perché i pod sono Pending?

**ME**: Non saranno Pending.

**TL**: E se lo sono?

**ME**: Allora... prego.

Ho applicato il file. Ho guardato i pod. Ho guardato... il disastro.

```
kubectl apply -f deployment.yaml
deployment.apps/api-server configured

kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
api-server-7d8f9c-x7k2m       0/1     Pending   0          5s
api-server-7d8f9c-p9n3q       0/1     Pending   0          5s
api-server-7d8f9c-m4k8r       0/1     Pending   0          5s
... (27 pod in Pending)
```

**ME**: I pod sono Pending.

**TL**: PENDING?

**ME**: Sì. Non c'è abbastanza risorse.

**TL**: TE L'AVEVO DETTO.

**ME**: Lo so. Ma pensavo reggesse.

**TL**: E ORA?

**ME**: Ora riduco.

**TL**: A quanto?

**ME**: A 10.

**TL**: 10?

**ME**: Sì. 10 dovrebbero reggere.

Ho ridotto. Ho guardato. Ho... visto che funzionava.

```
kubectl scale deployment api-server --replicas=10
deployment.apps/api-server scaled

kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
api-server-7d8f9c-x7k2m       1/1     Running   0          2m
api-server-7d8f9c-p9n3q       1/1     Running   0          2m
... (10 pod Running)
```

**ME**: Ok. 10 repliche funzionano.

**TL**: E per produzione?

**ME**: In produzione abbiamo più nodi. 30 dovrebbero reggere.

**TL**: Dovrebbero?

**ME**: Sì.

**TL**: E se non reggono?

**ME**: Reggono.

**TL**: E se no?

**ME**: Allora... prego.

Il TL mi ha guardato. Io guardavo i pod. I pod erano Running. Ma staging era al limite. E produzione era la scommessa. E il PM chiamava. Amen.

---

**Venerdì - 14:00**

Il venerdì, ho deployato. Ho deployato in produzione. Ho deployato... il disastro.

**ME**: Ok. Applico in produzione.

**TL**: Hai controllato il file?

**ME**: Sì.

**TL**: E le repliche?

**ME**: 30.

**TL**: 30?

**ME**: Sì. Per il test del Black Friday.

**TL**: E il PM ha confermato?

**ME**: Sì. Vuole il test alle 15.

**TL**: E tu applichi ora?

**ME**: Sì. Così i pod sono pronti.

**TL**: E il file è corretto?

**ME**: Sì. L'ho controllato.

**TL**: E le risorse?

**ME**: Produzione ha 48 CPU e 96GB RAM.

**TL**: E 30 pod?

**ME**: 15 CPU e 30GB RAM. Regge.

**TL**: E se il PM vuole di più?

**ME**: Non vuole di più.

**TL**: Il PM vuole sempre di più.

Ho aperto il file. Ho guardato il numero. E... ho visto qualcosa.

**ME**: Aspetta.

**TL**: Cosa?

**ME**: Il file.

**TL**: Cosa ha?

**ME**: Non dice 30.

**TL**: COSA?

**ME**: Dice 100.

**TL**: 100?

**ME**: Sì. 100 repliche.

**TL**: MA NE DOVEVI METTERE 30!

**ME**: Lo so! Devo aver cambiato il numero!

**TL**: QUANDO?

**ME**: Non lo so! Forse ieri sera!

**TL**: E PERCHÉ?

**ME**: Non lo so! Forse volevo testare il limite!

**TL**: E ORA?

**ME**: Ora... cambio il numero.

**TL**: CAMBIALO!

Ho aperto l'editor. Ho cambiato il numero. Ho... salvato. O almeno, credevo di aver salvato.

**ME**: Ok. Ho cambiato. Ora è 30.

**TL**: Sei sicuro?

**ME**: Sì. Ho salvato.

**TL**: E il file dice 30?

**ME**: Sì. Ora applico.

Ho applicato. Ho guardato i pod. Ho guardato... il disastro.

```
kubectl apply -f deployment.yaml
deployment.apps/api-server configured

kubectl get pods -w
NAME                          READY   STATUS    RESTARTS   AGE
api-server-7d8f9c-x7k2m       0/1     ContainerCreating   0          1s
api-server-7d8f9c-p9n3q       0/1     ContainerCreating   0          1s
api-server-7d8f9c-m4k8r       0/1     ContainerCreating   0          1s
api-server-7d8f9c-k9j2n       0/1     ContainerCreating   0          1s
api-server-7d8f9c-h3m7p       0/1     ContainerCreating   0          1s
... (i pod continuavano a essere creati)
```

**ME**: I pod stanno partendo.

**TL**: Quanti?

**ME**: Non lo so. Aspetto.

Ho aspettato. Ho contato. Ho... visto.

**ME**: Aspetta.

**TL**: Cosa?

**ME**: I pod sono troppi.

**TL**: TROPPI?

**ME**: Sì. Sono più di 30.

**TL**: QUANTI?

**ME**: Controllo.

```
kubectl get pods | wc -l
101
```

**ME**: 100 pod.

**TL**: 100 POD?

**ME**: Sì. 100 pod.

**TL**: MA NE AVEVI MESSO 30!

**ME**: Lo so! Ma il file deve dire ancora 100!

**TL**: MA HAI DETTO DI AVERLO CAMBIATO!

**ME**: Devo aver salvato quello sbagliato!

**TL**: E ORA?

**ME**: Ora... ho 100 pod.

**TL**: E IL CLUSTER?

**ME**: Il cluster...

Ho guardato i nodi. Ho guardato le risorse. Ho guardato... il nulla.

```
kubectl top nodes
NAME       CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
node-1     3.9          97%    7.8Gi           98%
node-2     3.8          95%    7.9Gi           99%
node-3     3.9          97%    7.8Gi           98%
node-4     3.8          95%    7.9Gi           99%
node-5     3.9          97%    7.8Gi           98%
node-6     3.8          95%    7.9Gi           99%
node-7     3.9          97%    7.8Gi           98%
node-8     3.8          95%    7.9Gi           99%
node-9     3.9          97%    7.8Gi           98%
node-10    3.8          95%    7.9Gi           99%
node-11    3.9          97%    7.8Gi           98%
node-12    3.8          95%    7.9Gi           99%
```

**ME**: I nodi sono al 97-99%.

**TL**: AL 97-99%?

**ME**: Sì. Tutti i nodi.

**TL**: E I POD?

**ME**: I pod sono tutti Running.

**TL**: TUTTI?

**ME**: Sì. 100 pod. Tutti Running.

**TL**: E CONSUMANO?

**ME**: Sì. 50 CPU. 100GB RAM.

**TL**: MA IL CLUSTER HA SOLO 48 CPU E 96GB RAM!

**ME**: Lo so!

**TL**: E COME FA A REGGERE?

**ME**: Non lo so! Deve aver overcommittato!

**TL**: E SE I NODI CRASHANO?

**ME**: Non crashano. Per ora.

**TL**: E SE CRASHANO?

**ME**: Allora... siamo fottuti.

Il TL mi ha guardato. Io guardavo i nodi. I nodi erano al limite. I pod erano 100. E il cluster stava per morire. Amen.

---

**Venerdì - 14:23**

Il PM ha chiamato. Il PM voleva. E io... non ho detto la verità.

**PM**: Com'è andato il deployment?

**ME**: I pod sono partiti.

**PM**: Tutti?

**ME**: Sì.

**PM**: E quanti sono?

**ME**: 30.

**PM**: 30?

**ME**: Sì. 30 repliche.

**PM**: E il test?

**ME**: Il test è alle 15.

**PM**: E il cluster regge?

**ME**: Regge.

**PM**: E i costi?

**ME**: I costi?

**PM**: Sì. AWS. Quanto costa?

**ME**: Non lo so. È solo per il test.

**PM**: E dopo il test?

**ME**: Dopo riporto a 3.

**PM**: Bene. Il CEO vuole vedere il test.

**ME**: Il CEO?

**PM**: Sì. Vuole vedere la scalabilità.

**ME**: E quando?

**PM**: Alle 15. In sala riunioni.

**ME**: In sala riunioni?

**PM**: Sì. Con il proiettore.

**ME**: E cosa mostro?

**PM**: I pod. I grafici. La scalabilità.

**ME**: E se qualcosa va storto?

**PM**: Non va storto. È solo un test.

Il PM mi ha guardato. Io guardavo il nulla. Il nulla che era la mia bugia. Il nulla che erano i 100 pod. Il nulla... che era il cluster al 97%. Amen.

---

**Venerdì - 14:47**

I nodi. I nodi che stavano morendo. I nodi... che morirono.

**TERMINALE**:
```
kubectl get nodes
NAME       STATUS     ROLES    AGE   VERSION
node-1     Ready      <none>   342d  v1.28.0
node-2     Ready      <none>   342d  v1.28.0
node-3     NotReady   <none>   342d  v1.28.0
node-4     NotReady   <none>   342d  v1.28.0
node-5     Ready      <none>   342d  v1.28.0
node-6     Ready      <none>   342d  v1.28.0
node-7     NotReady   <none>   342d  v1.28.0
node-8     Ready      <none>   342d  v1.28.0
node-9     NotReady   <none>   342d  v1.28.0
node-10    Ready      <none>   342d  v1.28.0
node-11    NotReady   <none>   342d  v1.28.0
node-12    Ready      <none>   342d  v1.28.0
```

**ME**: I nodi stanno crashando.

**TL**: CRASHANDO?

**ME**: Sì. 5 nodi sono NotReady.

**TL**: 5 NODI?

**ME**: Sì. E altri 3 sono al 99%.

**TL**: E I POD?

**ME**: I pod sui nodi crashati sono... morti.

**TL**: MORTI?

**ME**: Sì. E Kubernetes sta cercando di ricrearli.

**TL**: SU QUALI NODI?

**ME**: Su quelli ancora Ready.

**TL**: E QUELLI SONO AL 99%!

**ME**: Lo so!

**TL**: E QUINDI?

**ME**: E quindi... altri nodi crasheranno.

**TL**: E POI?

**ME**: Poi... tutto crasha.

**TL**: E IL CEO?

**ME**: Il CEO vuole vedere il test alle 15.

**TL**: E COSA GLI MOSTRI?

**ME**: Gli mostro... il disastro.

Il TL mi ha guardato. Io guardavo i nodi. I nodi morivano. I pod morivano. E il cluster moriva. E il CEO aspettava. Amen.

---

**Venerdì - 15:00**

Il CEO. Il CEO in sala riunioni. Il CEO... che vide tutto.

**CEO**: Allora, vediamo questa scalabilità.

**ME**: Ecco... c'è un problema.

**CEO**: Problema?

**ME**: Sì. Il cluster è... instabile.

**CEO**: Instabile?

**ME**: Sì. I nodi stanno crashando.

**CEO**: CRASHANDO?

**ME**: Sì. 5 su 12 sono giù.

**CEO**: E PERCHÉ?

**ME**: Perché... ho deployato troppe repliche.

**CEO**: QUANTE?

**ME**: 100.

**CEO**: 100?

**ME**: Sì.

**CEO**: E NE DOVEVI DEPLOYARE QUANTE?

**ME**: 30.

**CEO**: 30?

**ME**: Sì. Per il test.

**CEO**: E NE HAI DEPLOYATE 100?

**ME**: Sì. Per errore.

**CEO**: ERRORE?

**ME**: Sì. Ho sbagliato il file YAML.

**CEO**: E IL CLUSTER?

**ME**: Il cluster sta morendo.

**CEO**: MORENDO?

**ME**: Sì. I nodi sono sovraccarichi.

**CEO**: E I SERVIZI?

**ME**: I servizi sono down.

**CEO**: DOWN?

**ME**: Sì. Tutti i pod sono crashati.

**CEO**: E IL SITO?

**ME**: Il sito è down.

**CEO**: DOWN?

**ME**: Sì. 500 error dappertutto.

**CEO**: E I CLIENTI?

**ME**: I clienti non possono accedere.

**CEO**: E LE VENDITE?

**ME**: Le vendite sono ferme.

**CEO**: E QUANTO TEMPO?

**ME**: Non lo so. Finché non ripristino.

**CEO**: E QUANTO CI METTI?

**ME**: Non lo so. Forse 1 ora.

**CEO**: 1 ORA DI DOWNTIME?

**ME**: Sì.

**CEO**: E QUANTO COSTA?

**ME**: Non lo so. Forse €50.000.

**CEO**: €50.000?

**ME**: Sì. 1 ora di Black Friday test.

**CEO**: E I COSTI AWS?

**ME**: I costi AWS?

**CEO**: SÌ. 100 POD COSTANO.

**ME**: Non lo so. Forse €200/ora.

**CEO**: €200/ORA?

**ME**: Sì. Ma è solo per 1 ora.

**CEO**: E SE NON LO RIPRISTINI?

**ME**: Lo ripristino.

**CEO**: E COME?

**ME**: Riduco le repliche.

**CEO**: A QUANTO?

**ME**: A 3.

**CEO**: E LO FAI ORA?

**ME**: Sì. Ora.

Il CEO mi ha guardato. Io guardavo il proiettore. Il proiettore mostrava:
- Nodi: 5/12 NotReady
- Pod: 100 (50 crashati, 50 Pending)
- Servizi: DOWN
- Sito: 500 error
- Costi: €200/ora + €50.000 vendite perse

E il CEO vedeva tutto. E il CEO non era contento. Amen.

---

**Venerdì - 15:15**

Ho ridotto. Ho ridotto le repliche. Ho ridotto... il disastro.

**TERMINALE**:
```
kubectl scale deployment api-server --replicas=3
deployment.apps/api-server scaled

kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
api-server-7d8f9c-x7k2m       1/1     Running   0          30s
api-server-7d8f9c-p9n3q       1/1     Running   0          30s
api-server-7d8f9c-m4k8r       1/1     Running   0          30s
```

**ME**: Ok. Ho ridotto a 3.

**TL**: E i nodi?

**ME**: I nodi stanno tornando Ready.

**TL**: E i servizi?

**ME**: I servizi stanno tornando up.

**TL**: E il sito?

**ME**: Il sito sta tornando online.

**TL**: E quanto ci hai messo?

**ME**: 15 minuti.

**TL**: E il downtime?

**ME**: 15 minuti.

**TL**: E le vendite?

**ME**: €12.500 perse.

**TL**: E i costi AWS?

**ME**: €50 per i 15 minuti di 100 pod.

**TL**: E il CEO?

**ME**: Il CEO mi cerca.

**TL**: E sai cosa farà?

**ME**: Cosa?

**TL**: Ti farà scrivere 1.000 volte.

**ME**: 1.000 volte?

**TL**: Sì. "Non scalerò mai a 100 repliche per errore".

**ME**: A mano?

**TL**: Sì. A mano. Su carta.

**ME**: Su carta?

**TL**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

Il TL mi ha guardato. Io guardavo i pod. I pod erano 3. I nodi erano Ready. I servizi erano up. Ma 15 minuti di downtime. €12.500 persi. E il CEO mi cercava. Amen.

---

**Venerdì - 16:00**

Il CEO. Il CEO che non era contento. Il CEO... che punì.

**CEO**: Quindi mi stai dicendo che hai deployato 100 repliche invece di 30?

**ME**: Sì.

**CEO**: E perché?

**ME**: Ho sbagliato il file YAML.

**CEO**: IL FILE YAML?

**ME**: Sì. Ho scritto 100 invece di 30.

**CEO**: E NON HAI CONTROLLATO?

**ME**: Ho controllato. Ma ho salvato la versione sbagliata.

**CEO**: LA VERSIONE SBAGLIATA?

**ME**: Sì. Avevo due file aperti.

**CEO**: E HAI APPLICATO QUELLO SBAGLIATO?

**ME**: Sì.

**CEO**: E IL CLUSTER È MORTO?

**ME**: Sì. Per 15 minuti.

**CEO**: E LE VENDITE?

**ME**: €12.500 perse.

**CEO**: E I COSTI AWS?

**ME**: €50 extra.

**CEO**: E TUTTO PER UN NUMERO SBAGLIATO?

**ME**: Sì.

**CEO**: E SAI COSA FARAI?

**ME**: Cosa?

**CEO**: Scriverai 1.000 volte: "Non scalerò mai a 100 repliche per errore".

**ME**: 1.000 volte?

**CEO**: Sì. A mano. Su carta.

**ME**: Su carta?

**CEO**: Sì. E poi la scannerai. E la metterai nel repo. Come promemoria.

**ME**: E il PM?

**CEO**: Il PM?

**ME**: Sì. Il PM voleva 30 repliche.

**CEO**: E TU NE HAI MESSE 100.

**ME**: Per errore.

**CEO**: ERRORE O NO, IL CLUSTER È MORTO. E IL SITO È MORTO. E LE VENDITE SONO MORTE. E TUTTO PERCHÉ NON HAI CONTROLLATO IL FILE. NON HAI FATTO DRY-RUN. NON HAI FATTO DIFF. E HAI APPLICATO. SENZA PENSARE. E ORA PAGHI. CON LA DIGNITÀ. E CON 1.000 RIGHE. A MANO. SU CARTA. AMEN.

Il CEO mi ha guardato. Io guardavo il nulla. Il nulla che era la mia dignità. Il nulla che era la mia carriera. Il nulla... che erano 100 repliche. Deployate per errore. Amen.

---

**Sabato - La Punizione**

Il sabato, ho scritto. Ho scritto 1.000 volte. A mano. Su carta.

```
Non scalerò mai a 100 repliche per errore.
Non scalerò mai a 100 repliche per errore.
Non scalerò mai a 100 repliche per errore.
...
(997 righe dopo)
...
Non scalerò mai a 100 repliche per errore.
```

E mentre scrivevo, pensavo. Pensavo a cosa avevo fatto. Pensavo a cosa avevo imparato. Pensavo... che non avrei mai più scritto 100 in un file YAML senza controllare.

**TL**: Come va?

**ME**: Ho finito.

**TL**: Fatto?

**ME**: Sì. 1.000 volte.

**TL**: E cosa hai imparato?

**ME**: Che i file YAML vanno controllati.

**TL**: E cos'altro?

**ME**: Che 100 repliche sono troppe.

**TL**: E cos'altro?

**ME**: Che il cluster ha limiti.

**TL**: E cos'altro?

**ME**: Che i nodi crashano se sovraccarichi.

**TL**: E cos'altro?

**ME**: Che 15 minuti di downtime costano €12.500.

**TL**: E cos'altro?

**ME**: Che il CEO non perdona.

**TL**: E cos'altro?

**ME**: Che la mia dignità è persa.

**TL**: E cos'altro?

**ME**: Che... non lo so. Cos'altro c'è?

**TL**: C'è che Kubernetes non è un gioco. È un'orchestra. E tu sei il direttore. Quando dici "100 repliche", l'orchestra suona 100 strumenti. E se non hai spazio per 100 strumenti, l'orchestra collassa. E il teatro collassa. E il pubblico se ne va. E tu rimani solo. Con 100 pod morti. E un cluster morto. E €12.500 persi. E il CEO che ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché Kubernetes non perdona. E il CEO nemmeno. Amen.

Il TL mi ha guardato. Io guardavo il foglio. Il foglio con 1.000 righe. 1.000 promesse. 1.000... "Non scalerò mai a 100 repliche per errore". E sapevo che le avrei mantenute. Perché Kubernetes non perdona. E il CEO nemmeno. Amen.

---

**Domenica - La Documentazione**

Domenica. Ho documentato. Per i posteri. Per i futuri DevOps che avrebbero fatto lo stesso errore. O quasi.

```markdown
## Incident #K8S-001: Il Kubernetes Deployment Che Ha Scalato A 100 Repliche

**Data incident**: Venerdì 31 luglio 2026, 14:00
**Autore**: ME
**Comando eseguito**: kubectl apply -f deployment.yaml (con replicas: 100)
**Repliche desiderate**: 30
**Repliche deployate**: 100
**Differenza**: +70 repliche (233% in più)
**Cluster**: 12 nodi, 48 CPU, 96GB RAM
**Consumo 100 pod**: 50 CPU, 100GB RAM (overcommit)
**Nodi crashati**: 5/12 (42%)
**Pod crashati**: 50/100
**Pod Pending**: 50/100
**Tempo downtime**: 15 minuti
**Servizi impattati**: api-server (tutti)
**Sito**: 500 error per 15 minuti
**Vendite perse**: €12.500
**Costi AWS extra**: €50
**Totale perdite**: €12.550
**Punizione**: 1.000 volte "Non scalerò mai a 100 repliche per errore"
**Reazione CEO**: "Scrivi 1.000 volte. A mano. Su carta."
**Reazione CTO**: "Kubernetes non è un gioco."
**Reazione TL**: "L'orchestra ha collassato."
**Reazione PM**: "Ma dovevano essere 30!"
**Lezione imparata**: YAML = CONTROLLARE. SEMPRE.
**Probabilità che succeda di nuovo**: 8% (da parte di chi non ha ancora imparato)

**Regole per il futuro**:
1. I file YAML vanno CONTROLLATI. Prima di applicare.
2. Il numero di repliche va VERIFICATO. Due volte.
3. kubectl apply con --dry-run=client va SEMPRE fatto.
4. Il diff tra file attuale e nuovo va SEMPRE controllato.
5. Non tenere due file YAML aperti nello stesso editor.
6. Salvare il file GIUSTO. Non quello sbagliato.
7. Il cluster ha LIMITI. Rispettarli.
8. 100 repliche sono TANTE. Troppo tante.
9. 15 minuti di downtime costano €12.500.
10. 1.000 volte a mano. Ricordalo.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i file YAML vanno controllati. E che 100 repliche sono troppe. E che il cluster ha limiti. E che i nodi crashano se sovraccarichi. E che 15 minuti di downtime costano €12.500. E che il CEO ti fa scrivere 1.000 volte. E che la tua dignità è persa. E che Kubernetes non è un gioco. È un'orchestra. E tu hai detto all'orchestra di suonare 100 strumenti. E non c'era spazio per 100 strumenti. E l'orchestra ha collassato. E il teatro ha collassato. E il pubblico se n'è andato. E tu rimani solo. Con 1.000 righe. A mano. Su carta. E impari. Perché Kubernetes non perdona. E il CEO nemmeno. Amen."

**ME**: Sì. E la lezione più importante è questa: Kubernetes è un'orchestra. E tu sei il direttore. Quando dici "100 repliche", l'orchestra suona 100 strumenti. E se non hai spazio per 100 strumenti, l'orchestra collassa. E il teatro collassa. E il pubblico se ne va. E tu rimani solo. Con 100 pod morti. E un cluster morto. E €12.550 persi. E il CEO che ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché Kubernetes non perdona. E il CEO nemmeno. Amen.

---

## Il costo del deployment a 100 repliche

| Voce | Valore |
|------|--------|
| Comando | kubectl apply -f deployment.yaml |
| Repliche desiderate | 30 |
| Repliche deployate | 100 |
| Differenza | +70 (233% in più) |
| Cluster | 12 nodi, 48 CPU, 96GB RAM |
| Consumo 100 pod | 50 CPU, 100GB RAM |
| Nodi crashati | 5/12 (42%) |
| Pod crashati | 50/100 |
| Pod Pending | 50/100 |
| Tempo downtime | 15 minuti |
| Servizi impattati | api-server (tutti) |
| Sito | 500 error per 15 min |
| Vendite perse | €12.500 |
| Costi AWS extra | €50 |
| Totale perdite | €12.550 |
| Punizione | 1.000 volte a mano |
| Reazione CEO | "Scrivi 1.000 volte" |
| Reazione CTO | "Kubernetes non è un gioco" |
| Reazione TL | "L'orchestra ha collassato" |
| Reazione PM | "Dovevano essere 30!" |
| Lezione imparata | YAML = CONTROLLARE. SEMPRE. |
| **Totale** | **100 repliche + 5 nodi crashati + 15 min downtime + €12.550 persi + 1.000 righe a mano** |

**Morale**: I file YAML vanno controllati. Sempre. Due volte. Tre volte. E poi ancora. Perché un numero sbagliato può uccidere un cluster. E 100 repliche sono troppe. E 15 minuti di downtime costano €12.500. E il CEO ti fa scrivere 1.000 volte. A mano. Su carta. E tu scrivi. E impari. Perché Kubernetes non perdona. E il CEO nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](75-il-server-fantasma.md)]**
