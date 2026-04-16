# Il Server Fantasma

**Data**: 25/07/2026

**[Home](../index.md) | [Precedente](74-il-npm-update-che-ha-rotto-tutto.md)]**

---

C'è una regola nella documentazione IT: ogni server deve essere documentato. Nome, IP, funzione, responsabile, password in un vault sicuro. Tutto scritto. Tutto tracciato. Tutto accessibile quando serve.

![](../../img/server.jpg)

C'è anche una regola nella realtà aziendale: la documentazione è per chi non ha niente di meglio da fare. I veri professionisti lavorano. Non scrivono. E quando un server viene dimenticato, quando nessuno sa che esiste, quando nessuno sa cosa fa... quello diventa un fantasma. Un server fantasma. Che continua a funzionare. Silenzioso. Invisibile. Finché un giorno non funziona più. E allora tutti scoprono che esisteva. E che era fondamentale. E che nessuno sa come riavviarlo. Perché nessuno sapeva che esistesse.

Questa è la storia di un fantasma. E del giorno in cui è morto.

---

**Lunedì - La Scoperta**

Era lunedì. Un lunedì come tanti. Il caffè era amaro. Il ticket queue era pieno. E il monitoraggio mostrava tutto verde.

**ME**: Tutto verde.

**TL**: Bene.

**ME**: Troppo verde.

**TL**: Troppo?

**ME**: Sì. Non è mai tutto verde.

**TL**: E quindi?

**ME**: E quindi controllo.

**TL**: Controllo cosa?

**ME**: I log. I server. Tutto.

**TL**: E quanto ci metti?

**ME**: Un'ora. Forse due.

**TL**: E se trovi qualcosa?

**ME**: Allora non era tutto verde.

Il TL mi ha guardato. Io guardavo il monitor. Il monitor mostrava 47 server. Tutti verdi. Tutti monitored. Tutti... tranne uno.

**ME**: Aspetta.

**TL**: Cosa?

**ME**: C'è un IP che non conosco.

**TL**: Un IP?

**ME**: Sì. 192.168.1.47.

**TL**: E cosa fa?

**ME**: Non lo so. Non è nel monitoring.

**TL**: Non è nel monitoring?

**ME**: No. Ma risponde al ping.

**TL**: E cosa succede se ci connetti?

**ME**: Non lo so. Provo.

Ho aperto SSH. Ho scritto l'IP. Ho premuto invio.

```
ssh admin@192.168.1.47
The authenticity of host '192.168.1.47' can't be established.
Are you sure you want to continue connecting?
```

**ME**: Non è mai stato connesso.

**TL**: Mai?

**ME**: Mai. SSH non ha la chiave.

**TL**: E quindi?

**ME**: E quindi è un server sconosciuto.

**TL**: E chi l'ha creato?

**ME**: Non lo so.

**TL**: E quando?

**ME**: Non lo so.

**TL**: E cosa fa?

**ME**: Non lo so.

**TL**: E quindi?

**ME**: E quindi mi connetto.

Ho scritto "yes". Ho scritto la password di default. E... sono entrato.

**ME**: Sono entrato.

**TL**: Con la password di default?

**ME**: Sì. admin/admin.

**TL**: ADMIN/ADMIN?

**ME**: Sì.

**TL**: E funziona?

**ME**: Sì.

**TL**: E chi l'ha configurato così?

**ME**: Non lo so. Ma guardo.

Ho guardato. Ho guardato i processi. Ho guardato i servizi. Ho guardato... e ho visto.

**ME**: Oh cazzo.

**TL**: Cosa?

**ME**: Questo server fa... tutto.

**TL**: Tutto?

**ME**: Sì. LDAP. DNS. NTP. SMTP. E... il database principale.

**TL**: IL DATABASE PRINCIPALE?

**ME**: Sì. PostgreSQL. Con tutti i dati.

**TL**: E NON È NEL MONITORING?

**ME**: No.

**TL**: E NON È NELLA DOCUMENTAZIONE?

**ME**: No.

**TL**: E NON HA BACKUP?

**ME**: Controllo.

Ho controllato. Ho guardato le cartelle. Ho guardato i cron job. Ho guardato... il nulla.

**ME**: Niente backup.

**TL**: NIENTE?

**ME**: Niente. Zero. Nulla.

**TL**: E I DATI?

**ME**: Solo su questo server.

**TL**: E SE SI ROMPE?

**ME**: Se si rompe... perdiamo tutto.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Server: 192.168.1.47
- Nome: nessuno (hostname: localhost)
- Servizi: LDAP, DNS, NTP, SMTP, PostgreSQL
- Backup: NESSUNO
- Documentazione: NESSUNA
- Responsabile: NESSUNO
- Password: admin/admin

E il server era lì. Vivo. Funzionante. Critico. E nessuno sapeva che esistesse.

---

**Martedì - Le Indagini**

Il martedì, ho indagato. Ho indagato su chi aveva creato quel server. Ho indagato... nel passato.

**ME**: Ho trovato qualcosa.

**TL**: Cosa?

**ME**: I log di creazione.

**TL**: E dicono?

**ME**: Il server è stato creato 7 anni fa.

**TL**: 7 ANNI?

**ME**: Sì. 2019.

**TL**: E chi l'ha creato?

**ME**: Un certo "Giovanni B."

**TL**: E chi è?

**ME**: Non lavora più qui.

**TL**: E dove?

**ME**: Non lo so. Se n'è andato nel 2021.

**TL**: E perché ha creato questo server?

**ME**: Non lo so. Ma ho trovato un commento nel codice.

**TL**: Quale codice?

**ME**: Uno script di init. Dice: "Server temporaneo per migrazione. Rimuovere dopo."

**TL**: TEMPORANEO?

**ME**: Sì. Per una migrazione.

**TL**: E LA MIGRAZIONE?

**ME**: Non è mai stata completata.

**TL**: E IL SERVER TEMPORANEO?

**ME**: È diventato permanente.

**TL**: E NESSUNO L'HA DOCUMENTATO?

**ME**: No.

**TL**: E NESSUNO L'HA MONITORATO?

**ME**: No.

**TL**: E NESSUNO CI HA FATTO BACKUP?

**ME**: No.

**TL**: E PER 7 ANNI?

**ME**: Per 7 anni. Ha funzionato. Senza che nessuno sapesse.

Il TL mi ha guardato. Io guardavo i log. I log mostravano:
- 2019-03-15: Server creato
- 2019-03-16: "Rimuovere dopo migrazione"
- 2019-03-17: (nessun log)
- 2019-03-18: (nessun log)
- ...
- 2026-07-21: Ancora in funzione

E per 7 anni, il server aveva funzionato. Silenzioso. Invisibile. Critico. E nessuno sapeva.

---

**Mercoledì - Il Piano**

Il mercoledì, abbiamo pianificato. Abbiamo pianificato di documentare. Di monitorare. Di fare backup. Di... salvare il salvabile.

**ME**: Dobbiamo fare qualcosa.

**TL**: Cosa?

**ME**: Documentare. Monitorare. Fare backup.

**TL**: E quanto ci vuole?

**ME**: Per documentare? Un giorno.

**TL**: E per monitorare?

**ME**: Un giorno.

**TL**: E per il backup?

**ME**: Il database è 2 TB. Ci vuole una notte.

**TL**: E quindi?

**ME**: E quindi iniziamo.

**TL**: E se si rompe mentre facciamo tutto questo?

**ME**: Allora perdiamo tutto.

**TL**: E il PM?

**ME**: Il PM non sa.

**TL**: E se glielo diciamo?

**ME**: Allora vuole che risolviamo subito.

**TL**: E quanto ci vuole per risolvere subito?

**ME**: Non si può risolvere subito. Serve un piano.

**TL**: E il piano?

**ME**: Il piano è: documentare, monitorare, backup, migrare.

**TL**: E quanto ci vuole?

**ME**: Due settimane. Forse tre.

**TL**: E se si rompe prima?

**ME**: Allora siamo fottuti.

Il TL mi ha guardato. Io guardavo il server. Il server stava lì. Vivo. Funzionante. Critico. E noi avevamo un piano. Ma il piano richiedeva tempo. E il server poteva morire da un momento all'altro.

---

**Giovedì - La Crisi**

Il giovedì, è successo. Quello che temevamo. Quello che era inevitabile.

**ALLE 09:47**:

**MONITOR**: (nessun allarme - il server non era monitorato)

**UTENTE**: Il sito non funziona.

**ME**: Cosa?

**UTENTE**: Il login non va.

**ME**: Il login?

**UTENTE**: Sì. Dice "LDAP non disponibile".

**ME**: LDAP?

Ho guardato il server. Il server... non rispondeva.

**ME**: Il server fantasma è down.

**TL**: DOWN?

**ME**: Sì. Non risponde al ping.

**TL**: E COSA FA?

**ME**: LDAP. DNS. NTP. SMTP. PostgreSQL.

**TL**: E QUINDI?

**ME**: E quindi niente login. Niente DNS. Niente email. Niente database.

**TL**: NIENTE DI NIENTE?

**ME**: Niente di niente.

**TL**: E I BACKUP?

**ME**: Non ci sono.

**TL**: E LA DOCUMENTAZIONE?

**ME**: Non c'è.

**TL**: E CHI SA COME RIAVVIARLO?

**ME**: Nessuno.

**TL**: NESSUNO?

**ME**: Nessuno. È un server fantasma.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che era il nostro sistema. Il nulla che era il server. Il nulla... che era 7 anni di dati. Senza backup. Senza documentazione. Senza speranza.

---

**Giovedì - 10:15**

Sono andato. Sono andato fisicamente. Nel datacenter. A cercare il server.

**ME**: Sono in datacenter.

**TL**: E lo vedi?

**ME**: Ci sono 47 server.

**TL**: E quale è?

**ME**: Non lo so. Non è etichettato.

**TL**: NON È ETICHETTATO?

**ME**: No. Nessuna etichetta.

**TL**: E COME FAI A TROVARLO?

**ME**: Devo seguire i cavi.

**TL**: I cavi?

**ME**: Sì. Il cavo di rete. Dallo switch.

Ho seguito il cavo. Ho seguito... per 20 minuti. Tra i server. Sotto il pavimento. Dietro i rack. E alla fine, l'ho trovato.

**ME**: L'ho trovato.

**TL**: E com'è?

**ME**: È un vecchio Dell. Di quelli del 2015.

**TL**: E lo schermo?

**ME**: Nero.

**TL**: E i LED?

**ME**: Spenti.

**TL**: E il rumore?

**ME**: Nessuno. È morto.

**TL**: MORTO?

**ME**: Morto. Alimentatore bruciato.

**TL**: E I DATI?

**ME**: I dischi dovrebbero essere ok.

**TL**: E PUOI RECUPERARLI?

**ME**: Devo smontare i dischi. E metterli in un altro server.

**TL**: E QUANTO CI METTI?

**ME**: Un'ora. Forse due.

**TL**: E IL SISTEMA?

**ME**: Down per due ore.

**TL**: E IL PM?

**ME**: Il PM chiama.

Il TL mi ha guardato. Io guardavo il server. Il server morto. Con 7 anni di dati. Senza backup. E io dovevo resuscitarlo. Con un cacciavite. E la speranza.

---

**Giovedì - 12:30**

Ho smontato. Ho smontato i dischi. Li ho messi in un altro server. E ho pregato.

**ME**: Ok. Dischi montati.

**TL**: E il boot?

**ME**: Provo.

Ho acceso. Il server ha fatto beep. Ha mostrato... errori.

```
ERROR: Disk 1 - SMART failure
ERROR: Disk 2 - Filesystem corrupted
ERROR: Disk 3 - Offline
WARNING: RAID degraded
```

**ME**: Oh cazzo.

**TL**: Cosa?

**ME**: I dischi sono danneggiati.

**TL**: DANNAGGIATI?

**ME**: Sì. SMART failure. Filesystem corrupted.

**TL**: E I DATI?

**ME**: Non lo so. Provo a montare.

Ho provato. Ho provato a montare il filesystem. E... ha funzionato. Parzialmente.

```
mount /dev/sda1 /mnt/recovery
mount: warning: filesystem has errors. Running fsck.
fsck: 847 errors found. 847 errors corrected.
```

**ME**: 847 errori corretti.

**TL**: E I DATI?

**ME**: Sembrano esserci.

**TL**: TUTTI?

**ME**: Non lo so. Devo verificare.

Ho verificato. Ho verificato il database. Ho verificato... il disastro.

```
psql: ERROR: database "production" is corrupted
psql: ERROR: 23 tables missing
psql: ERROR: 147 indexes corrupted
```

**ME**: Il database è corrotto.

**TL**: QUANTO CORROTTO?

**ME**: 23 tabelle mancanti. 147 indici corrotti.

**TL**: E SI PUÒ RECUPERARE?

**ME**: Non lo so. Provo pg_dump.

Ho provato. Ho provato a fare dump. E... ha funzionato. Parzialmente.

```
pg_dump: WARNING: 23 tables skipped (missing)
pg_dump: WARNING: 147 indexes skipped (corrupted)
pg_dump: dumped 847 tables successfully
```

**ME**: 847 tabelle recuperate.

**TL**: E LE ALTRE 23?

**ME**: Perse.

**TL**: PERSE?

**ME**: Perse. Per sempre.

**TL**: E QUALI ERANO?

**ME**: Controllo.

Ho controllato. Ho guardato quali tabelle mancavano. E... ho visto.

**ME**: Oh cazzo.

**TL**: COSA?

**ME**: Le tabelle mancanti sono: users, orders, payments, invoices...

**TL**: QUELLE TABELLE?

**ME**: Sì. Quelle critiche.

**TL**: E SONO PERSE?

**ME**: Perse.

**TL**: E I DATI?

**ME**: 7 anni di utenti. 7 anni di ordini. 7 anni di pagamenti. 7 anni di fatture.

**TL**: TUTTI PERSE?

**ME**: Tutti.

Il TL mi ha guardato. Io guardavo il nulla. Il nulla che erano i nostri dati. Il nulla che era 7 anni di business. Il nulla... che era il server fantasma. Morto. E con lui, i nostri dati.

---

**Venerdì - La Verità**

Il venerdì, abbiamo detto la verità. Al PM. Al CTO. Al CEO. A tutti.

**PM**: COSA VUOL DIRE CHE I DATI SONO PERSE?

**ME**: Vuol dire che non ci sono più.

**PM**: E I BACKUP?

**ME**: Non c'erano.

**PM**: NON C'ERANO?

**ME**: No. Il server non era documentato. Non era monitorato. Non aveva backup.

**PM**: E PERCHÉ?

**ME**: Perché era un server fantasma. Creato 7 anni fa. Per una migrazione che non è mai stata completata. E dimenticato.

**PM**: DIMENTICATO?

**ME**: Sì. Per 7 anni. Ha funzionato. Senza che nessuno sapesse.

**PM**: E NESSUNO L'HA CONTROLLATO?

**ME**: No. Perché non era nel monitoring.

**PM**: E NESSUNO CI HA FATTO BACKUP?

**ME**: No. Perché nessuno sapeva che esisteva.

**PM**: E ADESSO?

**ME**: Adesso è morto. E con lui, 7 anni di dati.

**PM**: E QUANTO ABBIAMO PERSO?

**ME**: Non lo so. Forse milioni.

**PM**: MILIONI?

**ME**: Sì. Tutti gli utenti. Tutti gli ordini. Tutti i pagamenti.

**PM**: E NON SI PUÒ RECUPERARE?

**ME**: No. I dischi sono danneggiati.

**PM**: E ADESSO?

**ME**: Adesso ricominciamo da zero.

Il PM mi ha guardato. Il CTO mi ha guardato. Il CEO mi ha guardato. E io guardavo il nulla. Il nulla che era la nostra colpa. Il nulla che era la nostra negligenza. Il nulla... che era il server fantasma.

---

**Sabato - La Lezione**

Il sabato, abbiamo documentato. Per i posteri. Per i futuri sistemisti. Per chiunque avrebbe creato un server "temporaneo".

```markdown
## Incident #GHOST-001: Il Server Fantasma

**Data incident**: Giovedì 23 luglio 2026, 09:47
**Server**: 192.168.1.47 (localhost)
**Creato**: 2019-03-15
**Creatore**: Giovanni B. (non più in azienda)
**Scopo originale**: Server temporaneo per migrazione
**Migrazione completata**: NO
**Documentato**: NO
**Monitorato**: NO
**Backup**: NO
**Password**: admin/admin
**Etichetta**: NESSUNA
**Responsabile**: NESSUNO
**Anni in funzione**: 7
**Giorni di downtime**: 2
**Dati persi**: 23 tabelle critiche (users, orders, payments, invoices)
**Anni di dati persi**: 7
**Valore stimato**: €2.000.000+
**Lezione imparata**: NESSUN SERVER È TEMPORANEO. NESSUN SERVER È INVISIBILE. TUTTI I SERVER VANNO DOCUMENTATI. TUTTI I SERVER VANNO MONITORATI. TUTTI I SERVER VANNO BACKUPPATI. SEMPRE.

**Regole per il futuro**:
1. Ogni server va DOCUMENTATO. Nome, IP, funzione, responsabile.
2. Ogni server va MONITORATO. Sempre. Senza eccezioni.
3. Ogni server va BACKUPPATO. Sempre. Senza eccezioni.
4. Ogni server va ETICHETTATO. Fisicamente. Nel datacenter.
5. Ogni server "temporaneo" va RIMOSSO. Non dimenticato.
6. Ogni password va cambiata da default. Sempre.
7. Ogni migrazione va COMPLETATA. Non abbandonata.
8. Ogni responsabile va TRACCIATO. Non dimenticato.
9. Ogni server fantasma va CACCIATO. Prima che muoia.
10. NESSUN SERVER È INVISIBILE. NESSUN SERVER È TEMPORANEO. NESSUN SERVER È SOSTITUIBILE.
```

Il TL ha letto la documentazione. Il TL ha sospirato. Il TL ha detto: "Quindi abbiamo imparato che i server fantasma esistono. Che esistono perché qualcuno ha creato un server 'temporaneo' e se n'è dimenticato. Che esistono perché nessuno controlla. Che esistono perché la documentazione è 'per chi non ha niente di meglio da fare'. E che quando muoiono, portano con sé 7 anni di dati. E milioni di euro. E la dignità di un'intera azienda. E la lezione è questa: NESSUN SERVER È TEMPORANEO. NESSUN SERVER È INVISIBILE. TUTTI I SERVER VANNO DOCUMENTATI. TUTTI I SERVER VANNO MONITORATI. TUTTI I SERVER VANNO BACKUPPATI. SEMPRE. SENZA ECCEZIONI. PERCHÉ QUANDO UN SERVER FANTASMA MUORE, NON PORTA SOLO I DATI. PORTA CON SÉ LA REALTÀ. E LA REALTÀ È CHE ABBIAMO FALLITO. PER 7 ANNI. A DOCUMENTARE. A MONITORARE. A BACKUPPARE. E ORA PAGHIAMO. CON I DATI. CON I SOLDI. CON LA DIGNITÀ. AMEN."

**ME**: Sì. E la lezione più importante è questa: un server "temporaneo" è permanente finché qualcuno non lo rimuove. E se nessuno lo rimuove, resta lì. Per 7 anni. Funzionando. Silenziosamente. Finché muore. E quando muore, porta con sé tutto. Perché nessuno sapeva che esisteva. Nessuno l'aveva documentato. Nessuno l'aveva monitorato. Nessuno ci aveva fatto backup. E ora è troppo tardi. I dati sono persi. I soldi sono persi. La dignità è persa. E tutto perché qualcuno ha scritto "Rimuovere dopo migrazione". E se n'è dimenticato. Per 7 anni. Amen.

---

## Il costo del server fantasma

| Voce | Valore |
|------|--------|
| Server | 192.168.1.47 (localhost) |
| Creato | 2019-03-15 |
| Anni in funzione | 7 |
| Documentato | NO |
| Monitorato | NO |
| Backup | NO |
| Password | admin/admin |
| Etichetta | NESSUNA |
| Dati persi | 23 tabelle critiche |
| Anni di dati | 7 |
| Utenti persi | 847.000 |
| Ordini persi | 1.200.000 |
| Pagamenti persi | €15.000.000 |
| Fatture perse | 340.000 |
| Valore totale | €2.000.000+ (stime conservative) |
| Tempo di recupero | MAI |
| Lezione imparata | NESSUN SERVER È TEMPORANEO |
| **Totale** | **7 anni + 23 tabelle + €2.000.000 + dignità persa** |

**Morale**: Un server "temporaneo" è permanente finché qualcuno non lo rimuove. E se nessuno lo rimuove, diventa un fantasma. Un fantasma che vive per anni. Silenzioso. Invisibile. Finché muore. E quando muore, porta con sé tutto. I dati. I soldi. La dignità. E tutto perché qualcuno ha scritto "Rimuovere dopo". E se n'è dimenticato. Per 7 anni. E ora è troppo tardi. Perché i server fantasma non perdonano. E la negligenza nemmeno. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](74-il-npm-update-che-ha-rotto-tutto.md)]**
