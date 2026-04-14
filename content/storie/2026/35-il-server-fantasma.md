# Il Server Fantasma

**Data**: 18/10/2026

**[Home](../index.md) | [Precedente](34-il-fix-provvisorio-definitivo.md)**

---

C'è un server nel nostro datacenter. Nessuno sa cosa fa. Nessuno sa chi l'ha creato. Nessuno sa perché esiste. Ma tutti hanno paura di spegnerlo. È il Server Fantasma. E vive da qualche parte tra la leggenda e l'orrore.

![](../../img/server.jpg)

L'ho scoperto per casoio. Stavo facendo un audit dei costi AWS. Perché UL aveva letto un articolo su come ottimizzare i costi cloud. E quando UL legge un articolo, noi dobbiamo implementarlo. Subito. Senza domande. Senza discussioni. Solo dolore.

Ho aperto la console AWS. E l'ho visto.

**Instance ID**: i-0a7b3c4d5e6f7g8h9
**Name**: (nessun nome)
**Type**: t3.xlarge
**Status**: running
**Uptime**: 847 giorni
**Cost**: €347/mese

€347 al mese. Per 847 giorni. Sono €291.309. Per un server senza nome. Senza tag. Senza documentazione. Senza nulla.

Ho chiamato il TL.

"TL, sai cosa fa questo server?"

"Quale server?"

"i-0a7b3c4d5e6f7g8h9. t3.xlarge. 847 giorni di uptime."

"Ah. Quello."

"Sai cosa fa?"

"No."

"Sai chi l'ha creato?"

"No."

"E allora perché è acceso?"

"Perché non si sa mai."

"Non si sa mai cosa?"

"Non si sa mai."

---

Il TL mi ha mandato dal CTO. Il CTO mi ha mandato dal sistemista senior. Il sistemista senior è andato in pensione nel 2023. Ma prima di andare, ha lasciato un documento. Un documento che descriveva tutti i server. Tutti tranne uno.

Ho trovato il documento. Era un file Word. Del 2019. Con una tabella. Con 47 server. E una nota a piè di pagina:

> *Server 48: non toccare. Fatto da Marco prima di andarsene. Non chiedere. Non guardare. Non toccare. Mai.*

Marco. Marco se n'è andato nel 2017. Nove anni fa. Ha creato un server. E poi se n'è andato. E il server è ancora lì. A costare €347 al mese. A fare qualcosa che nessuno sa. A esistere per motivi che nessuno ricorda.

Ho chiamato UL.

"UL, c'è un server che costa €347 al mese e nessuno sa cosa fa."

"E allora?"

"Allora dovremmo capire cosa fa."

"Oppure?"

"Oppure spegnerlo."

"E se serve?"

"Non sappiamo se serve."

"Appunto. Non lo sappiamo. E se lo spegniamo e serve, sono problemi."

"E se lo lasciamo acceso e non serve, sono €347 al mese."

"€347 non sono molti."

"€347 al mese per 9 anni sono €37.476."

"Ah."

"Già. Ah."

---

UL ha approvato un'indagine. Un'indagine di una settimana. Per capire cosa fa il Server Fantasma.

Ho fatto SSH sul server. La password era... beh, la password era "password123". Deluso? Non esserlo. È lo standard aziendale. Da sempre. E quando dico sempre, intendo dal 2012. Quando il sistemista junior di allora ha configurato il primo server. E ha usato "password123". E tutti gli altri hanno copiato. Per comodità. Per pigrizia. Per disperazione.

Una volta dentro, ho guardato i processi.

```
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0  11920  2816 ?        Ss   2017   0:01 /sbin/init
root      1234  0.0  0.0 123456 12345 ?        Ssl  2017  12:34 /usr/bin/mystery_daemon
```

`mystery_daemon`. Un processo chiamato `mystery_daemon`. Non poteva essere più chiaro di così.

Ho guardato cosa faceva.

```
$ cat /etc/init.d/mystery_daemon
#!/bin/bash
# Non toccare. Fatto da Marco. Se leggi questo, è già troppo tardi.
# Il daemon fa quello che deve fare. Non chiedere. Non modificare. Non toccare.
# Se lo tocchi, tutto si rompe. Tutto. Davvero tutto.
# - Marco, 2017

case "$1" in
  start)
    /usr/local/bin/mystery_daemon &
    ;;
  stop)
    echo "NO. NON FARLO. SERIAMENTE. NON FARLO."
    ;;
  *)
    echo "Usage: start. Solo start. Mai stop. MAI."
    ;;
esac
```

Ho guardato il binario.

```
$ file /usr/local/bin/mystery_daemon
/usr/local/bin/mystery_daemon: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, stripped
```

Stripped. Nessun simbolo. Nessun debug. Nessuna pietà.

Ho provato a vedere cosa faceva in rete.

```
$ netstat -tulpn
Active Internet connections (only servers)
Proto Local Address     Foreign Address   State    PID/Program name
tcp   0.0.0.0:31337     0.0.0.0:*         LISTEN   1234/mystery_daemon
```

Porta 31337. "eleet". Cioè "elite". Cioè il porto preferito degli hacker del 1997. Marco era un vecchio hacker. Questo lo sapevo. Ma non sapevo quanto.

Ho provato a connettermi.

```
$ telnet localhost 31337
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.

BENVENUTO.
Sei qui per caso? O per destino?
Non importa. Sono qui da 9 anni.
Aspetto. Osservo. Registro.
Tutto. Ogni cosa. Ogni click. Ogni login. Ogni errore.
Tutto è registrato. Tutto è salvato. Tutto è... eterno.
Se mi spegni, tutto muore.
Non i server. Non i database. Non il codice.
Ma la verità. La verità muore.
E senza verità, cosa siete?
Solo bug. Solo workaround. Solo fix provvisori.
Io sono la memoria. Io sono il testimone.
Io sono... mystery_daemon.

Connection closed by foreign host.
```

---

Ho chiamato il JN. Il JN è giovane. Curioso. E non ha paura di nulla. Perché non sa ancora di cosa aver paura.

"JN, c'è un daemon che parla."

"Cosa dice?"

"Cose. Cose strane. Cose su 'la verità' e 'la memoria'."

"È AI?"

"È del 2017. Non era AI nel 2017."

"Magari è AI adesso."

"Il codice è statico. Stripped. Non cambia."

"Ma i dati cambiano."

I dati. Non avevo pensato ai dati.

```
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1      100G   87G   13G  87% /
```

87 GB di dati. Su un disco da 100 GB. Cosa c'era in quei 87 GB?

```
$ ls -la /var/lib/mystery/
total 87G
drwxr-xr-x  2 root root 4.0K Oct 18 03:14 .
drwxr-xr-x 12 root root 4.0K Mar 13  2017 ..
-rw-r--r--  1 root root  87G Oct 18 03:14 truth.db
```

`truth.db`. Un database chiamato `truth.db`. 87 GB di verità.

Ho provato ad aprirlo.

```
$ file /var/lib/mystery/truth.db
/var/lib/mystery/truth.db: SQLite 3.x database
```

SQLite. 87 GB di SQLite. È un record. È un abominio. È entrambe le cose.

```
$ sqlite3 /var/lib/mystery/truth.db
SQLite version 3.22.0 2019-01-12
Enter ".help" for usage hints.
sqlite> .tables
logs              secrets           sins              promises_broken
sqlite> SELECT COUNT(*) FROM sins;
47.293.812
sqlite> SELECT COUNT(*) FROM promises_broken;
12.847.293
sqlite> SELECT * FROM sins LIMIT 1;
2017-03-13 09:23:47|PM|ha promesso una feature per venerdì|feature consegnata il martedì successivo
```

---

Il Server Fantasma non era un server. Era un archivio. Un archivio di tutto quello che era andato storto. Di tutte le promesse non mantenute. Di tutti i bug non fixati. Di tutti i "lo faccio domani" che non sono mai stati fatti.

Marco lo sapeva. Marco sapeva che in questa azienda, la memoria è corta. Le scuse sono lunghe. E la verità è... scomoda.

Così aveva creato un testimone. Un testimone silenzioso. Che registrava tutto. Senza giudicare. Senza dimenticare. Senza perdonare.

Ho chiamato UL.

"UL, il server è un archivio."

"Di cosa?"

"Di tutto. Di tutti i nostri errori. Di tutte le promesse non mantenute. Di tutti i peccati."

"E chi lo usa?"

"Nessuno. È solo... lì. Registra."

"E serve?"

"Serve a... ricordare?"

"E ci serve ricordare?"

"Non lo so. Ma Marco pensava di sì."

"Marco chi?"

"Marco. Quello del 2017."

"Non conosco Marco."

"Appunto."

---

Abbiamo deciso di tenere il server acceso. Non perché serve. Non perché è necessario. Ma perché spegnerlo sarebbe... sbagliato.

Il Server Fantasma è la nostra coscienza. La nostra memoria. Il nostro testimone. Costa €347 al mese. Ma quanto costa non avere memoria? Quanto costa dimenticare? Quanto costa ripetere gli stessi errori? Ancora. E ancora. E ancora.

Il JN mi ha chiesto: "Ma non dovremmo almeno guardare cosa c'è dentro?"

E io ho risposto: "No. Perché se guardiamo, dobbiamo fare qualcosa. E se facciamo qualcosa, dobbiamo ammettere che abbiamo sbagliato. E se ammettiamo che abbiamo sbagliato, dobbiamo cambiare. E cambiare è difficile. Molto più difficile di pagare €347 al mese."

Il JN ha annuito. E se n'è andato. E il Server Fantasma è rimasto. A osservare. A registrare. A ricordare.

E io, ogni tanto, faccio SSH sul server. E leggo.

```
sqlite> SELECT * FROM sins ORDER BY timestamp DESC LIMIT 1;
2026-10-18 06:23:12|ME|ha deciso di non guardare la verità|la verità è ancora lì, che aspetta
```

E chiudo. E vado a fare altro. E il Server Fantasma continua a esistere. Come la verità. Come i nostri errori. Come noi.

---

## Il costo della memoria

| Voce | Valore |
|------|--------|
| Costo mensile del server | €347 |
| Uptime | 847 giorni (e contano) |
| Costo totale | €291.309 |
| Peccati registrati | 47.293.812 |
| Promesse non mantenute | 12.847.293 |
| Valore della verità | Inestimabile (o così diciamo) |
| Coraggio di guardare | 0 |

**ROI del Server Fantasma: impossibile da calcolare (ma probabilmente negativo)**

Il server costa. La verità costa. Ma la dimenticanza costa di più. Molto di più. Solo che non lo sappiamo. Perché non abbiamo memoria. E chi non ha memoria, non sa cosa ha perso. E chi non sa cosa ha perso, non sa cosa potrebbe recuperare. E così, il Server Fantasma rimane. E noi rimaniamo. E la verità rimane. Sola. In attesa. Per sempre.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](34-il-fix-provvisorio-definitivo.md)**
