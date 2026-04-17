# Il Deploy Del Venerdì Pomeriggio

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-documentazione-che-nessuno-leggeva.md)**

---

C'è una regola non scritta nel mondo IT: non si fa mai il deploy di venerdì pomeriggio. È una regola semplice. Una regola chiara. Una regola che tutti conoscono. E che tutti violano. Sempre. Perché il venerdì pomeriggio è quando il PM ti chiama e dice: "Possiamo fare questo deploy? È urgente." E tu dici: "È venerdì pomeriggio." E il PM dice: "Lo so, ma è urgente." E tu dici: "Se qualcosa va storto, non c'è nessuno per fixarlo." E il PM dice: "Non andrà storto. È un deploy semplice." E tu sai che non è vero. Il PM sa che non è vero. Tutti sanno che non è vero. Ma il deploy si fa lo stesso. E qualcosa va storto. Sempre. Amen.

![](../../img/deploy.jpg)

---

**Venerdì - 16:45**

Era venerdì. 16:45. Il weekend era vicino. Il caffè era finito. La motivazione era zero.

Poi è arrivato il PM.

**PM**: Abbiamo un deploy urgente!

**ME**: È venerdì. 16:45.

**PM**: Lo so! Ma il cliente vuole questa feature per lunedì!

**ME**: E non potevamo farlo giovedì?

**PM**: Il codice non era pronto!

**ME**: E non possiamo farlo lunedì mattina?

**PM**: Il cliente la vuole per lunedì mattina!

**ME**: E se qualcosa va storto?

**PM**: Non andrà storto! È un deploy semplice!

**ME**: Semplice come?

**PM**: Solo un piccolo cambiamento al database!

**ME**: ...database?

**PM**: Sì! Dobbiamo aggiungere una colonna!

**ME**: Una colonna?

**PM**: Sì! Una colonna nullable!

**ME**: E la migration?

**PM**: È già pronta! L'ha scritta JN!

**ME**: JN?!

**PM**: Sì! È semplice!

**ME**: Fammi vedere la migration.

**TERMINALE**:
```
# Leggi migration
cat migrations/20270116_add_user_preferences.sql
-- Add user preferences column
ALTER TABLE users ADD COLUMN preferences JSONB DEFAULT '{}';

-- Update existing users
UPDATE users SET preferences = '{"theme": "light", "notifications": true}';

-- Add index
CREATE INDEX idx_users_preferences ON users USING GIN (preferences);
```

**ME**: Questa migration fa un UPDATE su tutti gli utenti.

**PM**: Sì! Per dare un default!

**ME**: Quanti utenti abbiamo?

**PM**: Non lo so! Tanti!

**TERMINALE**:
```
# Conta utenti
psql -c "SELECT COUNT(*) FROM users"
 count
--------
847293
```

**ME**: 847.293 utenti.

**PM**: E quindi?

**ME**: E quindi l'UPDATE bloccherà la tabella per minuti.

**PM**: Ma è un UPDATE semplice!

**ME**: È un UPDATE su 847.293 righe. Su una tabella che viene usata per il login. Durante l'orario di lavoro.

**PM**: Ma sono le 16:50! Tra poco smettono di lavorare!

**ME**: In Italia sì. Ma in America sono le 10:50 del mattino!

**PM**: Ah.

**ME**: Ah.

**PM**: E quindi?

**ME**: E quindi non facciamo il deploy di venerdì pomeriggio.

**PM**: Ma il cliente...

**ME**: Il cliente capirà. O non capirà. Ma se facciamo il deploy e il sistema si blocca, il cliente non capirà. E UL non capirà. E il CTO non capirà. E io non capirò perché ho fatto il deploy di venerdì pomeriggio.

Il PM mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Utenti: 847.293
- Migration: bloccante
- Ora: 16:52
- Giorno: venerdì
- Saggio: no

E tutto era chiaro. Il deploy di venerdì pomeriggio è una pessima idea. E il PM lo sapeva. E io lo sapevo. E tutti lo sapevano. Ma il PM voleva farlo lo stesso. Perché il cliente voleva la feature. E il cliente è sempre più importante del buon senso. Amen.

---

**Venerdì - 17:00**

Il PM è andato da UL. UL ha chiamato me.

**UL**: Il PM mi dice che non vuoi fare il deploy.

**ME**: È venerdì pomeriggio. La migration blocca la tabella users. Abbiamo 847.293 utenti. In America sono le 11 del mattino.

**UL**: E quindi?

**ME**: E quindi se facciamo il deploy, il sistema si blocca. E gli utenti non possono fare login. E il business si ferma.

**UL**: E per quanto tempo?

**ME**: Non lo so. Dipende da quanto ci mette l'UPDATE. Potrebbero essere minuti. O ore.

**UL**: Ore?!

**ME**: Se la tabella è sotto carico, l'UPDATE può essere molto lento.

**UL**: E non possiamo farlo in un altro momento?

**ME**: Sì. Sabato mattina. O domenica sera. Quando c'è meno traffico.

**UL**: Ma il cliente vuole la feature per lunedì.

**ME**: E l'avrà. Se facciamo il deploy domenica sera.

**UL**: E chi fa il deploy domenica sera?

**ME**: Io.

**UL**: Tu?!

**ME**: Sì. Vengo domenica sera. Faccio il deploy. Controllo che tutto funzioni. E lunedì mattina la feature è pronta.

**UL**: E vieni domenica sera?!

**ME**: Sì. Meglio che venire sabato mattina per fixare un disastro.

UL mi ha guardato. Io guardavo il calendario. Il calendario mostrava:
- Venerdì: no
- Sabato: no
- Domenica: deploy
- Lunedì: feature pronta

E tutto era deciso. Niente deploy di venerdì pomeriggio. Deploy domenica sera. E il weekend era salvo. O quasi. Amen.

---

**Venerdì - 17:30**

Il PM non era contento. Il PM è venuto da me. Il PM aveva domande.

**PM**: Perché non possiamo fare il deploy adesso?

**ME**: Te l'ho spiegato. La migration blocca la tabella.

**PM**: Ma è una migration semplice!

**ME**: Semplice non significa sicura.

**PM**: E chi ha scritto la migration?

**ME**: JN.

**PM**: E JN non sapeva che era pericolosa?

**ME**: JN non ha pensato al numero di utenti.

**PM**: E tu come lo sai?

**ME**: Perché ho controllato.

**PM**: E JN non ha controllato?

**ME**: No.

**PM**: E perché no?

**ME**: Perché JN è un junior. E i junior non pensano a queste cose.

**PM**: E tu ci pensi?

**ME**: Sì. Perché sono un senior. E i senior pensano a queste cose. E evitano i disastri. O almeno ci provano.

**PM**: E quindi non facciamo il deploy?

**ME**: No. Lo facciamo domenica sera.

**PM**: Ma è il tuo weekend!

**ME**: Preferisco sacrificare una domenica sera che un intero weekend a fixare un disastro.

**PM**: E se non ci fosse nessun disastro?

**ME**: Non c'è mai "nessun disastro" con i deploy di venerdì pomeriggio. C'è sempre un disastro. È la legge di Murphy. È la legge dell'IT. È la legge del venerdì pomeriggio.

Il PM mi ha guardato. Io guardavo l'orologio. L'orologio mostrava:
- Ora: 17:35
- Giorno: venerdì
- Deploy: no
- Weekend: salvo
- Domenica: lavoro

E tutto era deciso. Ma il PM non era contento. Perché il PM voleva il deploy. E il cliente voleva la feature. E il venerdì pomeriggio voleva il disastro. E io volevo il weekend. E non si può avere tutto. Amen.

---

**Domenica - 20:00**

Domenica sera. 20:00. Il traffico era al minimo. Il caffè era pronto. La motivazione era... beh, c'era.

**TERMINALE**:
```
# Controlla traffico
curl -s http://prometheus:9090/api/v1/query?query=rate(http_requests_total[5m]) | jq '.data.result[].value[1]' | sort -n | tail -5
"12"
"15"
"18"
"23"
"31"

# Traffico normale: 200+ richieste al minuto
# Traffico attuale: 31 richieste al minuto
# Ok, è il momento

# Controlla utenti online
psql -c "SELECT COUNT(*) FROM sessions WHERE last_activity > NOW() - INTERVAL '5 minutes'"
 count
-------
   127
```

**ME**: 127 utenti online. Traffico al minimo. Possiamo procedere.

**TL**: (su Slack) Ok, procedi. Io monitoro.

**TERMINALE**:
```
# Backup prima del deploy
pg_dump -Fc users > /backup/users_20270116.dump

# Esegui migration in una transazione
psql << 'EOF'
BEGIN;
-- Add column without default (instant)
ALTER TABLE users ADD COLUMN preferences JSONB;

-- Add index CONCURRENTLY (non-blocking)
CREATE INDEX CONCURRENTLY idx_users_preferences ON users USING GIN (preferences);

-- Update in batches
DO $$
DECLARE
  batch_size INT := 10000;
  offset_val INT := 0;
  total_updated INT := 0;
BEGIN
  WHILE EXISTS (SELECT 1 FROM users WHERE preferences IS NULL LIMIT 1) LOOP
    UPDATE users 
    SET preferences = '{"theme": "light", "notifications": true}'
    WHERE id IN (
      SELECT id FROM users WHERE preferences IS NULL LIMIT batch_size
    );
    
    GET DIAGNOSTICS total_updated = ROW_COUNT;
    offset_val := offset_val + total_updated;
    
    RAISE NOTICE 'Updated % rows, total: %', total_updated, offset_val;
    
    COMMIT;
    BEGIN;
  END LOOP;
END $$;

-- Set default for new rows
ALTER TABLE users ALTER COLUMN preferences SET DEFAULT '{}';

COMMIT;
EOF
```

**ME**: Migration completata. In batch. Senza bloccare la tabella.

**TL**: Tempo?

**ME**: 23 minuti. Per 847.293 utenti.

**TL**: E il traffico?

**ME**: Controllo.

**TERMINALE**:
```
# Controlla errori durante migration
kubectl logs -l app=api --since=30m | grep -i error | wc -l
0

# Controlla login
curl -s http://api:8080/health
{"status": "UP", "checks": {"database": true, "cache": true}}

# Controlla utenti online
psql -c "SELECT COUNT(*) FROM sessions WHERE last_activity > NOW() - INTERVAL '5 minutes'"
 count
-------
   143
```

**ME**: Zero errori. 143 utenti online. Tutto funzionante.

**TL**: Ottimo. Deploy completato.

**ME**: Sì. E senza disastri.

**TL**: E senza venerdì pomeriggio.

**ME**: Esattamente.

Il TL mi ha risposto su Slack. Io guardavo il terminale. Il terminale mostrava:
- Migration: completata
- Errori: zero
- Tempo: 23 minuti
- Venerdì: evitato
- Domenica: sacrificata

E tutto funzionava. E la feature era pronta per lunedì. E il disastro era stato evitato. E la lezione era chiara. Il deploy di venerdì pomeriggio è sempre una pessima idea. E la domenica sera è sempre meglio. Amen.

---

**Lunedì - 09:00**

Lunedì mattina. 09:00. La feature era in produzione. Il cliente era contento. Il PM era contento. UL era contento.

**UL**: Ottimo lavoro! La feature è online!

**ME**: Sì. L'abbiamo deployata domenica sera.

**UL**: E tutto ha funzionato?

**ME**: Sì. Zero errori. Zero downtime.

**UL**: E il cliente?

**ME**: Il cliente è contento. La feature funziona.

**UL**: E il PM?

**ME**: Il PM è contento. Ha la sua feature.

**UL**: E tu?

**ME**: Io sono stanco. Ma contento.

**UL**: E la lezione?

**ME**: La lezione è: non fare mai il deploy di venerdì pomeriggio.

**UL**: E se il PM insiste?

**ME**: Allora dici: "Ok, ma lo facciamo domenica sera." E il PM accetta. O non accetta. Ma almeno non fai il deploy di venerdì pomeriggio.

**UL**: E se non c'è scelta?

**ME**: C'è sempre una scelta. La scelta è: disastro venerdì o successo domenica. E tu scegli domenica.

UL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature: online
- Errori: zero
- Clienti: contenti
- Venerdì: evitato
- Lezione: imparata

E tutto era risolto. Ma la lezione era chiara. Il deploy di venerdì pomeriggio è sempre una pessima idea. E la domenica sera è sempre meglio. E se il PM insiste, tu dici di no. E se UL insiste, tu spieghi i rischi. E se tutti insistono, tu fai il deploy. E poi fixi il disastro. Ma almeno ci hai provato. Amen.

---

**Martedì - L'Educazione**

Martedì. Ho educato JN. Di nuovo. Sempre.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Hai scritto la migration del weekend?

**JN**: Sì. Perché?

**ME**: La migration faceva un UPDATE su 847.293 utenti.

**JN**: Sì. Per il default.

**ME**: E non hai pensato che poteva bloccare la tabella?

**JN**: No. Era un UPDATE semplice.

**ME**: JN, non esistono UPDATE semplici su 847.293 righe.

**JN**: Ah.

**ME**: E non esistono deploy semplici di venerdì pomeriggio.

**JN**: Ah.

**ME**: E non esistono migration che non vanno testate.

**JN**: Ah.

**ME**: Tre cose da imparare. Primo: conta le righe prima di fare UPDATE.

**JN**: Contare le righe?

**ME**: Sì. `SELECT COUNT(*) FROM tabella`. Se sono più di 10.000, pensaci due volte.

**JN**: Ok.

**ME**: Secondo: fai le migration in batch. Non un UPDATE gigante.

**JN**: In batch?

**ME**: Sì. 10.000 righe alla volta. Con COMMIT intermedi. Così non blocchi la tabella.

**JN**: Ok.

**ME**: Terzo: non fare mai il deploy di venerdì pomeriggio.

**JN**: Mai?

**ME**: Mai. A meno che non sia un'emergenza vera. E "il cliente vuole la feature" non è un'emergenza.

**JN**: E se il PM insiste?

**ME**: Allora dici: "Lo facciamo domenica sera." E il PM accetta.

**JN**: E se non accetta?

**ME**: Allora vieni da me. E io parlo con UL. E UL decide. E se UL dice di fare il deploy, allora lo fai. Ma documenti tutto. E ti prepari al disastro.

**JN**: Al disastro?!

**ME**: Sì. Perché il deploy di venerdì pomeriggio è sempre un disastro. E tu devi essere pronto.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Migration: corretta
- Deploy: domenica
- Disastro: evitato
- JN: educato

E tutto era risolto. Ma la lezione era chiara. I junior sbagliano. E i senior li correggono. E i deploy di venerdì pomeriggio sono sempre una pessima idea. E la domenica sera è sempre meglio. Amen.

---

## Il costo del deploy di venerdì pomeriggio

| Voce | Valore |
|------|--------|
| Migration | ALTER TABLE + UPDATE su 847.293 righe |
| Autore | JN |
| Rischio | Blocco tabella users per minuti/ore |
| Ora proposta | Venerdì 16:45 |
| Traffico America | 11:00 AM (alto) |
| Decisione | NO |
| Deploy effettivo | Domenica 20:00 |
| Tempo migration | 23 minuti |
| Errori | 0 |
| Downtime | 0 |
| Weekend sacrificato | 1 domenica sera |
| Lezione imparata | NO DEPLOY VENERDÌ |
| **Totale** | **1 domenica sera + 0 disastri + 1 junior educato** |

**Morale**: Il deploy di venerdì pomeriggio è come il gioco d'azzardo. Puoi vincere una volta. Puoi vincere due volte. Ma alla fine perdi. E quando perdi, perdi tutto. Il sistema si blocca. Gli utenti non possono fare login. Il business si ferma. UL chiama. Il CTO chiama. Il CEO chiama. E tu rispondi: "Era un deploy semplice." E UL dice: "SEMPLICE?!" E tu dici: "Sì. Solo una migration." E UL dice: "E LA MIGRATION HA BLOCCATO LA TABELLA?!" E tu dici: "Sì. Perché aveva 847.293 righe." E UL dice: "E NON HAI CONTROLLATO?!" E tu dici: "JN l'ha scritta." E UL dice: "E JN NON HA CONTROLLATO?!" E tu dici: "JN è un junior." E UL dice: "E TU SEI UN SENIOR! E I SENIOR CONTROLLANO!" E hai ragione. I senior controllano. E i senior evitano i deploy di venerdì pomeriggio. E i senior sacrificano la domenica sera. Perché la domenica sera è meglio del disastro. Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-documentazione-che-nessuno-leggeva.md)**
