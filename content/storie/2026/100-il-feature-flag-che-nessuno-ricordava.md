# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migration-che-ha-bloccato-tutto.md)**

---

C'è una verità nel feature flagging che tutti conoscono ma nessuno rispetta: un feature flag deve avere una data di scadenza. Sempre. Quando lo crei, devi decidere quando lo rimuovi. E se non lo decidi, il feature flag resta. Per sempre. E dopo sei mesi, nessuno sa cosa fa. E dopo un anno, nessuno sa perché esiste. E dopo due anni, il feature flag controlla qualcosa che non esiste più. E il codice che controlla è morto. Ma il flag è ancora lì. E qualcuno lo cambia. E qualcosa si rompe. E tu ti chiedi: "Com'è possibile che un flag vecchio di due anni abbia rotto tutto?" E la risposta è semplice: perché nessuno l'ha documentato. E nessuno l'ha rimosso. E tutti hanno dimenticato. E il feature flag è diventato una bomba a orologeria. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 10:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi, altri prezzi nuovi.

**ME**: Prezzi sbagliati?!

**TL**: Prezzi sbagliati?!

**ME**: Sì. Alcuni clienti vedono il vecchio listino. Altri il nuovo.

**TL**: E QUANTI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=pricing-service --since=30m | grep -i price | tail -20
2027-01-16 09:45:12 INFO: Price calculated for product SKU-123: €45.00 (listino v2)
2027-01-16 09:45:13 INFO: Price calculated for product SKU-123: €42.00 (listino v1)
2027-01-16 09:45:14 INFO: Price calculated for product SKU-123: €45.00 (listino v2)
2027-01-16 09:45:15 INFO: Price calculated for product SKU-123: €42.00 (listino v1)

# Controlla distribuzione
kubectl logs -l app=pricing-service --since=30m | grep "listino v1" | wc -l
4523

kubectl logs -l app=pricing-service --since=30m | grep "listino v2" | wc -l
4891

# Controlla feature flags
curl -s http://feature-flag-service:8080/flags | jq '.'
{
  "flags": [
    {"name": "new-pricing-engine", "enabled": true},
    {"name": "legacy-listino-v1", "enabled": true},
    {"name": "listino-v2-rollout", "enabled": true},
    {"name": "pricing-migration", "enabled": false},
    {"name": "old-pricing-fallback", "enabled": true}
  ]
}
```

**ME**: Ci sono 5 feature flag per il pricing. E alcuni sono in conflitto.

**TL**: IN CONFLITTO?!

**ME**: Sì. "new-pricing-engine" è true. "legacy-listino-v1" è true. "listino-v2-rollout" è true. "old-pricing-fallback" è true.

**TL**: E QUALE VINCE?!

**ME**: Non lo so. Dipende dall'ordine di valutazione. E dall'implementazione.

**TL**: E CHI HA CREATO QUESTI FLAG?!

**ME**: Controllo.

**TERMINALE**:
```
# Controlla storia dei flag
curl -s http://feature-flag-service:8080/flags/history | jq '.'
{
  "new-pricing-engine": {
    "created": "2025-03-15",
    "created_by": "bob",
    "last_modified": "2025-03-15",
    "description": "Enable new pricing engine"
  },
  "legacy-listino-v1": {
    "created": "2024-08-22",
    "created_by": "alice",
    "last_modified": "2024-08-22",
    "description": "Keep legacy listino v1 active"
  },
  "listino-v2-rollout": {
    "created": "2025-06-10",
    "created_by": "jn",
    "last_modified": "2025-06-10",
    "description": "Rollout listino v2"
  },
  "pricing-migration": {
    "created": "2025-09-01",
    "created_by": "me",
    "last_modified": "2025-09-01",
    "description": "Enable pricing migration"
  },
  "old-pricing-fallback": {
    "created": "2024-11-05",
    "created_by": "bob",
    "last_modified": "2024-11-05",
    "description": "Fallback to old pricing if new fails"
  }
}
```

**ME**: Il flag più vecchio è di agosto 2024. Quasi 2 anni e mezzo fa.

**TL**: 2 ANNI E MEZZO?!

**ME**: Sì. E l'ultimo aggiornamento è dello stesso giorno.

**TL**: E NESSUNO L'HA MAI RIMOSSO?!

**ME**: No. Sono tutti ancora attivi.

**TL**: E CHI SONO ALICE E BOB?!

**ME**: Alice non c'è più. Se n'è andata 18 mesi fa. Bob è passato a un altro team.

**TL**: E I FLAG?!

**ME**: I flag sono ancora lì. E nessuno sa cosa fanno.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 5
- Più vecchio: agosto 2024
- Più recente: settembre 2025
- Ultimo aggiornamento: mai
- Documentazione: inesistente

E tutto era chiaro. I feature flag erano zombie. Erano stati creati per rollout temporanei. E nessuno li aveva mai rimossi. E ora si combattevano tra loro. E i clienti vedevano prezzi sbagliati. Amen.

---

**Lunedì - 10:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, hai creato il flag "listino-v2-rollout"?

**JN**: Sì. Nel 2025. Perché?

**ME**: È ancora attivo. E confligge con altri flag.

**JN**: Ancora attivo?!

**ME**: Sì. E anche "legacy-listino-v1" è attivo. E "old-pricing-fallback" è attivo.

**JN**: Ma... il rollout è finito!

**ME**: QUANDO?!

**JN**: Nel 2025! Dopo due settimane!

**ME**: E PERCHÉ NON L'HAI RIMOSSO?!

**JN**: Me ne sono dimenticato.

**ME**: DIMENTICATO?!

**JN**: Sì. C'era altro da fare. E il flag funzionava. E l'ho lasciato.

**ME**: E ORA CONFLIGGE CON ALTRI FLAG!

**JN**: Quali flag?

**ME**: Quelli creati da Alice. E Bob. E me. Tutti per il pricing. Tutti attivi. Tutti in conflitto.

**JN**: E QUINDI?!

**ME**: E quindi i clienti vedono prezzi sbagliati. E dobbiamo fixare.

**JN**: E COME?!

**ME**: Prima capisco cosa fa ogni flag. Poi li rimuovo. Tutti.

**JN**: Tutti?!

**ME**: Tutti quelli che non servono più.

**JN**: E SE NE SERVE UNO?!

**ME**: Allora lo documentiamo. E gli diamo una data di scadenza.

JN è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Feature flag zombie: 5
- Creati da: Alice, Bob, JN, ME
- Documentazione: zero
- Data di scadenza: mai

E la lezione era chiara. I feature flag vanno rimossi. E documentati. E hanno bisogno di una data di scadenza. E JN dimentica. Amen.

---

**Lunedì - 11:00**

Ho analizzato il codice. Per capire cosa fanno i flag.

**TERMINALE**:
```
# Cerca riferimenti ai flag
grep -r "new-pricing-engine" src/
src/pricing/calculator.js:  if (flags['new-pricing-engine']) {
src/pricing/calculator.js:    return newPricingEngine.calculate(product);
src/pricing/calculator.js:  }

grep -r "legacy-listino-v1" src/
src/pricing/calculator.js:  if (flags['legacy-listino-v1'] && !flags['new-pricing-engine']) {
src/pricing/calculator.js:    return legacyPricing.calculate(product);
src/pricing/calculator.js:  }

grep -r "listino-v2-rollout" src/
src/pricing/calculator.js:  if (flags['listino-v2-rollout'] && flags['new-pricing-engine']) {
src/pricing/calculator.js:    return listinoV2.calculate(product);
src/pracing/calculator.js:  }

grep -r "old-pricing-fallback" src/
src/pricing/calculator.js:  if (flags['old-pricing-fallback'] && error) {
src/pricing/calculator.js:    return legacyPricing.calculate(product);
src/pricing/calculator.js:  }

grep -r "pricing-migration" src/
src/pricing/migration.js:  if (flags['pricing-migration']) {
src/pricing/migration.js:    await migratePrices();
src/pricing/migration.js:  }
```

**ME**: Ho trovato la logica. È un casino.

**TL**: UN CASINO?!

**ME**: Sì. Guarda:

```javascript
// Il codice attuale
function calculatePrice(product, flags, error) {
  // Flag 1: new-pricing-engine
  if (flags['new-pricing-engine']) {
    // Flag 3: listino-v2-rollout
    if (flags['listino-v2-rollout']) {
      return listinoV2.calculate(product);
    }
    return newPricingEngine.calculate(product);
  }
  
  // Flag 2: legacy-listino-v1
  if (flags['legacy-listino-v1']) {
    return legacyPricing.calculate(product);
  }
  
  // Flag 5: old-pricing-fallback
  if (flags['old-pricing-fallback'] && error) {
    return legacyPricing.calculate(product);
  }
  
  // Default
  return defaultPricing.calculate(product);
}
```

**TL**: E QUAL È IL PROBLEMA?!

**ME**: Il problema è che tutti i flag sono true. E la logica è:

1. Se "new-pricing-engine" è true:
   - Se "listino-v2-rollout" è true → usa listinoV2
   - Altrimenti → usa newPricingEngine
2. Se "legacy-listino-v1" è true → usa legacyPricing
3. Se "old-pricing-fallback" è true e c'è un errore → usa legacyPricing
4. Altrimenti → usa defaultPricing

**TL**: E QUINDI?!

**ME**: E quindi con tutti i flag a true:
- Il primo if è true → entra
- Il secondo if è true → usa listinoV2
- MA! Se per qualche motivo "new-pricing-engine" diventa false...
- Il primo if è false
- Il secondo if è true → usa legacyPricing
- E i clienti vedono prezzi vecchi!

**TL**: E PERCHÉ DIVENTA FALSE?!

**ME**: Perché il feature flag service ha un problema. A volte restituisce flag sbagliati.

**TL**: SBAGLIATI?!

**ME**: Sì. Ho trovato questo nei log:

**TERMINALE**:
```
# Controlla log feature flag service
kubectl logs -l app=feature-flag-service --since=1h | grep -i error | tail -10
2027-01-16 09:30:12 ERROR: Cache miss for flag new-pricing-engine, returning default (false)
2027-01-16 09:30:12 ERROR: Cache miss for flag new-pricing-engine, returning default (false)
2027-01-16 09:30:13 ERROR: Cache miss for flag new-pricing-engine, returning default (false)
2027-01-16 09:30:14 ERROR: Cache miss for flag new-pricing-engine, returning default (false)
```

**ME**: Quando la cache fallisce, il feature flag service restituisce false di default.

**TL**: FALSE DI DEFAULT?!

**ME**: Sì. E quando restituisce false, il codice usa legacyPricing. E i clienti vedono prezzi vecchi.

**TL**: E QUANTI CLIENTI?!

**ME**: Circa il 50%. Quelli che beccano la cache miss.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: conflittuali
- Cache: problematica
- Default: false
- Clienti: 50% con prezzi sbagliati

E tutto era chiaro. I feature flag zombie. La cache che falliva. Il default sbagliato. E i clienti che pagavano il prezzo. Letteralmente. Amen.

---

**Lunedì - 11:30**

Ho fixato il default. E iniziato a rimuovere i flag zombie.

**TERMINALE**:
```
# Fix default del feature flag service
cat > src/services/feature-flag-service.js << 'EOF'
async function getFlag(name) {
  try {
    // Prima controlla la cache
    const cached = await cache.get(`flag:${name}`);
    if (cached !== null) {
      return cached;
    }
    
    // Poi controlla il database
    const flag = await db.query('SELECT value FROM flags WHERE name = $1', [name]);
    if (flag) {
      await cache.set(`flag:${name}`, flag.value, { ttl: 60 });
      return flag.value;
    }
    
    // Se non esiste, restituisci true (safe default per flag esistenti)
    console.warn(`Flag ${name} not found, returning true (safe default)`);
    return true;
  } catch (error) {
    console.error(`Error getting flag ${name}:`, error);
    // In caso di errore, restituisci true (safe default)
    return true;
  }
}
EOF

# Rimuovi flag zombie
curl -X DELETE http://feature-flag-service:8080/flags/legacy-listino-v1
curl -X DELETE http://feature-flag-service:8080/flags/listino-v2-rollout
curl -X DELETE http://feature-flag-service:8080/flags/old-pricing-fallback
curl -X DELETE http://feature-flag-service:8080/flags/pricing-migration

# Tieni solo new-pricing-engine (ma documentalo!)
curl -X PUT http://feature-flag-service:8080/flags/new-pricing-engine \
  -d '{"enabled": true, "description": "Use new pricing engine (permanent)", "expires_at": null}'

# Verifica
curl -s http://feature-flag-service:8080/flags | jq '.'
{
  "flags": [
    {"name": "new-pricing-engine", "enabled": true, "description": "Use new pricing engine (permanent)"}
  ]
}
```

**ME**: Ho rimosso 4 flag zombie. E tenuto solo "new-pricing-engine".

**TL**: E IL CODICE?!

**ME**: Ora lo semplifico.

**TERMINALE**:
```
# Semplifica il codice
cat > src/pricing/calculator.js << 'EOF'
function calculatePrice(product, flags) {
  // Un solo flag: new-pricing-engine
  // Se true → usa new pricing
  // Se false → usa default (legacy)
  if (flags['new-pricing-engine']) {
    return newPricingEngine.calculate(product);
  }
  return defaultPricing.calculate(product);
}
EOF

# Deploy
kubectl rollout restart deployment/pricing-service

# Verifica
kubectl logs -l app=pricing-service --since=5m | grep -i price | tail -10
2027-01-16 11:35:12 INFO: Price calculated for product SKU-123: €45.00 (new pricing)
2027-01-16 11:35:13 INFO: Price calculated for product SKU-123: €45.00 (new pricing)
2027-01-16 11:35:14 INFO: Price calculated for product SKU-123: €45.00 (new pricing)
```

**ME**: Tutti i prezzi sono consistenti. €45.00 per tutti.

**TL**: E I CLIENTI?!

**ME**: Vedono tutti lo stesso prezzo. Finalmente.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 1 (da 5)
- Codice: semplificato
- Prezzi: consistenti
- JN: da educare

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag vanno rimossi. E documentati. E che il default deve essere safe. Amen.

---

**Lunedì - 12:00**

Ho chiamato UL. UL ha risposto. Era lunedì. UL era a pranzo. Ma ha risposto.

**UL**: Pronto?

**ME**: Abbiamo avuto un problema con i prezzi.

**UL**: Che problema?

**ME** I clienti vedevano prezzi sbagliati. Alcuni il vecchio listino, altri il nuovo.

**UL**: E PERCHÉ?!

**ME**: Perché c'erano 5 feature flag in conflitto. Creati in 2 anni. E nessuno li ha mai rimossi.

**UL**: 5 FLAG?!

**ME**: Sì. E tutti attivi. E conflittuali. E la cache del feature flag service restituiva false di default.

**UL**: FALSE DI DEFAULT?!

**ME**: Sì. E quando restituiva false, il codice usava il vecchio listino.

**UL**: E QUANTI CLIENTI?!

**ME**: Circa il 50%. Per 2 ore.

**UL**: 2 ORE?!

**ME**: Sì. Dalle 09:00 alle 11:00.

**UL**: E QUANTI ORDINI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla ordini con prezzi sbagliati
kubectl exec -it postgres-0 -- psql -U orders -c "
SELECT COUNT(*) FROM orders 
WHERE created_at BETWEEN '2027-01-16 09:00:00' AND '2027-01-16 11:00:00'
AND price != expected_price"
count
-------
234

# Controlla differenza totale
kubectl exec -it postgres-0 -- psql -U orders -c "
SELECT SUM(price - expected_price) as diff FROM orders 
WHERE created_at BETWEEN '2027-01-16 09:00:00' AND '2027-01-16 11:00:00'
AND price != expected_price"
diff
------
-€1,872.00
```

**ME**: 234 ordini con prezzi sbagliati. Differenza totale: -€1,872.

**UL**: MENOMALE CHE È IN MENO!

**ME**: Sì. I clienti hanno pagato meno. Ma è comunque un problema.

**UL**: E ORA?!

**ME**: Ora ho rimosso i flag zombie. E semplificato il codice. E fixato il default.

**UL**: E JN?!

**ME**: JN... lo educo.

**UL**: E L'HAI GIÀ EDUCATO?!

**ME**: Sì. E ho aggiunto regole per i feature flag.

**UL**: BENE. Documenta tutto.

E io ho documentato. E UL ha riattaccato. E la lezione era chiara. I feature flag vanno rimossi. E documentati. E il default deve essere safe. E JN va educato. Amen.

---

**Martedì - L'Audit**

Martedì. Ho auditato tutti i feature flag. Per trovare altri zombie.

**TERMINALE**:
```
# Lista tutti i flag
curl -s http://feature-flag-service:8080/flags/all | jq '.flags | length'
47

# Controlla età dei flag
curl -s http://feature-flag-service:8080/flags/all | jq '.flags[] | {name, created, last_modified}'

# Risultati
| Name | Created | Last Modified | Age |
|------|---------|---------------|-----|
| dark-mode-toggle | 2024-01-15 | 2024-01-15 | 3 anni |
| new-checkout-flow | 2024-03-22 | 2024-03-22 | 2 anni 10 mesi |
| mobile-app-v2 | 2024-05-10 | 2024-05-10 | 2 anni 8 mesi |
| email-templates-v2 | 2024-07-18 | 2024-07-18 | 2 anni 6 mesi |
| search-autocomplete | 2024-09-05 | 2024-09-05 | 2 anni 4 mesi |
| payment-gateway-v3 | 2025-01-12 | 2025-01-12 | 2 anni |
| user-dashboard-v2 | 2025-03-20 | 2025-03-20 | 1 anno 10 mesi |
| api-rate-limiting | 2025-05-08 | 2025-05-08 | 1 anno 8 mesi |
| notification-center | 2025-07-15 | 2025-07-15 | 1 anno 6 mesi |
| shopping-cart-v2 | 2025-09-22 | 2025-09-22 | 1 anno 4 mesi |
| ... | ... | ... | ... |
```

**ME**: Ci sono 47 feature flag. E molti sono vecchi di anni.

**TL**: 47 FLAG?!

**ME**: Sì. E almeno 30 non sono stati modificati da più di un anno.

**TL**: E SONO ANCORA ATTIVI?!

**ME**: Sì. E nessuno sa cosa fanno.

**TL**: E LI RIMUOVIAMO?!

**ME**: Con cautela. Prima verifico cosa fanno. Poi li rimuovo uno a uno.

**TERMINALE**:
```
# Analizza ogni flag
for flag in $(curl -s http://feature-flag-service:8080/flags/all | jq -r '.flags[].name'); do
  echo "=== $flag ==="
  # Cerca riferimenti nel codice
  grep -r "$flag" src/ --include="*.js" --include="*.ts" | head -5
  # Controlla se il codice esiste ancora
  if grep -r "$flag" src/ --include="*.js" --include="*.ts" -q; then
    echo "STATUS: IN USE"
  else
    echo "STATUS: ZOMBIE"
  fi
done

# Risultati
| Flag | Status | Action |
|------|--------|--------|
| dark-mode-toggle | IN USE | Keep |
| new-checkout-flow | ZOMBIE | Remove |
| mobile-app-v2 | ZOMBIE | Remove |
| email-templates-v2 | IN USE | Keep |
| search-autocomplete | ZOMBIE | Remove |
| payment-gateway-v3 | IN USE | Keep |
| user-dashboard-v2 | ZOMBIE | Remove |
| api-rate-limiting | IN USE | Keep |
| notification-center | IN USE | Keep |
| shopping-cart-v2 | ZOMBIE | Remove |
```

**ME**: Ho trovato 23 flag zombie. E 24 flag ancora in uso.

**TL**: E LI RIMUOVI?!

**ME**: Sì. I 23 zombie. E documento i 24 che restano.

**TERMINALE**:
```
# Rimuovi flag zombie
for flag in new-checkout-flow mobile-app-v2 search-autocomplete user-dashboard-v2 shopping-cart-v2 ...; do
  curl -X DELETE http://feature-flag-service:8080/flags/$flag
done

# Documenta flag rimanenti
cat > docs/feature-flags.md << 'EOF'
# Feature Flags Attivi

| Flag | Descrizione | Creato | Scadenza | Owner |
|------|-------------|--------|----------|-------|
| new-pricing-engine | Usa nuovo motore di pricing | 2025-03-15 | Permanente | Team Pricing |
| dark-mode-toggle | Abilita dark mode | 2024-01-15 | Permanente | Team UI |
| email-templates-v2 | Nuovi template email | 2024-07-18 | Permanente | Team Comms |
| payment-gateway-v3 | Gateway pagamento v3 | 2025-01-12 | Permanente | Team Payments |
| api-rate-limiting | Rate limiting API | 2025-05-08 | Permanente | Team Platform |
| notification-center | Centro notifiche | 2025-07-15 | Permanente | Team UI |
| ... | ... | ... | ... | ... |

## Regole per i Feature Flag

1. Ogni flag DEVE avere una descrizione chiara.
2. Ogni flag DEVE avere un owner.
3. I flag temporanei DEVONO avere una data di scadenza.
4. I flag permanenti DEVONO essere documentati.
5. I flag non utilizzati DEVONO essere rimossi.
6. Il default DEVE essere safe (true per flag esistenti).
7. I flag DEVONO essere auditati ogni trimestre.
EOF
```

**ME**: Ho rimosso 23 flag zombie. E documentato i 24 che restano.

**TL**: E QUANTI NE RESTANO?!

**ME**: 24. Tutti documentati. Con owner. E descrizione.

**TL**: E LA PROSSIMA VOLTA?!

**ME**: La prossima volta non succede. Perché ci sono le regole. E l'audit trimestrale.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 24 (da 47)
- Zombie rimossi: 23
- Documentati: 24
- Regole: scritte

E tutto era pulito. Ma avevo imparato una lezione. La lezione che i feature flag proliferano. E vanno potati. E documentati. E JN va educato. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i flag zombie sono stati un disastro. Ma sono anche stati un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Sette cose. Primo: i feature flag temporanei vanno rimossi.

**JN**: Sempre?

**ME**: Sempre. Dopo il rollout, rimuovi il flag. E il codice che lo controlla.

**JN**: E se non posso?

**ME**: Allimenti metti una data di scadenza. E un reminder.

**JN**: Ok.

**ME**: Secondo: ogni flag deve avere una descrizione chiara.

**JN**: Chiara?

**ME**: Sì. Cosa fa. Quando è stato creato. Chi è l'owner. Quando scade.

**JN**: E se non so cosa fa?

**ME**: Allora non lo crei. O chiedi a qualcuno.

**JN**: Ok.

**ME**: Terzo: ogni flag deve avere un owner.

**JN**: Un owner?

**ME**: Sì. Qualcuno responsabile del flag. Che sa perché esiste. E quando rimuoverlo.

**JN**: E se l'owner se ne va?

**ME**: Allora il flag va riassegnato. O rimosso.

**JN**: Ok.

**ME**: Quarto: i flag permanenti vanno documentati.

**JN**: Permanenti?

**ME**: Sì. I flag che non hanno una data di scadenza. Quelli che controllano feature permanenti.

**JN**: E come li documento?

**ME**: Nel file docs/feature-flags.md. Con descrizione, owner, e motivo.

**JN**: Ok.

**ME**: Quinto: il default deve essere safe.

**JN**: Safe?

**ME**: Sì. Se il feature flag service fallisce, deve restituire true per i flag esistenti. Non false.

**JN**: E perché?

**ME**: Perché false significa "feature disabilitata". E se la feature è importante, il sistema si rompe.

**JN**: Ok.

**ME**: Sesto: i flag vanno auditati ogni trimestre.

**JN**: Ogni trimestre?

**ME**: Sì. Verifica che i flag siano ancora necessari. E rimuovi quelli che non servono.

**JN**: E se non ho tempo?

**ME**: Allora... trovi il tempo. O qualcuno lo trova per te.

**JN**: Ok.

**ME**: Settimo: se non sai cosa fa un flag, chiedi.

**JN**: Chiedo?

**ME**: Sì. A me. Al TL. A chi l'ha creato. Ma non toccare un flag che non conosci.

**JN**: E se non c'è nessuno?

**ME**: Allimenti lo documenti come "sconosciuto". E lo rimuovi con cautela.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Feature flag: documentati
- Regole: scritte
- Audit: trimestrale
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior dimenticano. E i senior dimenticano. E tutti dimenticano. E l'unico modo per non far crollare il sistema è avere regole. E audit. E documentazione. Amen.

---

**Giovedì - L'Automazione**

Giovedì. Ho automatizzato l'audit dei feature flag.

**TERMINALE**:
```
# Script per audit automatico
cat > scripts/audit-feature-flags.js << 'EOF'
const axios = require('axios');

async function auditFeatureFlags() {
  const flags = await axios.get('http://feature-flag-service:8080/flags/all');
  const issues = [];
  
  for (const flag of flags.data.flags) {
    // Controlla età
    const age = Date.now() - new Date(flag.created).getTime();
    const ageInDays = age / (1000 * 60 * 60 * 24);
    
    // Controlla se ha descrizione
    if (!flag.description || flag.description.length < 10) {
      issues.push({
        flag: flag.name,
        issue: 'NO_DESCRIPTION',
        severity: 'warning'
      });
    }
    
    // Controlla se ha owner
    if (!flag.owner) {
      issues.push({
        flag: flag.name,
        issue: 'NO_OWNER',
        severity: 'warning'
      });
    }
    
    // Controlla se è zombie (più di 90 giorni senza modifica)
    if (ageInDays > 90 && !flag.last_modified) {
      issues.push({
        flag: flag.name,
        issue: 'ZOMBIE_FLAG',
        severity: 'critical',
        age: Math.floor(ageInDays)
      });
    }
    
    // Controlla se è scaduto
    if (flag.expires_at && new Date(flag.expires_at) < new Date()) {
      issues.push({
        flag: flag.name,
        issue: 'EXPIRED',
        severity: 'critical',
        expired: flag.expires_at
      });
    }
  }
  
  return issues;
}

// Esegui audit
auditFeatureFlags().then(issues => {
  console.log('Feature Flag Audit Report');
  console.log('=========================');
  console.log(`Total flags: ${flags.data.flags.length}`);
  console.log(`Issues found: ${issues.length}`);
  console.log('');
  
  for (const issue of issues) {
    console.log(`[${issue.severity.toUpperCase()}] ${issue.flag}: ${issue.issue}`);
    if (issue.age) console.log(`  Age: ${issue.age} days`);
    if (issue.expired) console.log(`  Expired: ${issue.expired}`);
  }
  
  // Esci con errore se ci sono issue critiche
  if (issues.filter(i => i.severity === 'critical').length > 0) {
    process.exit(1);
  }
});
EOF

# Configura cron job
cat > k8s/feature-flag-audit-cronjob.yaml << 'EOF'
apiVersion: batch/v1
kind: CronJob
metadata:
  name: feature-flag-audit
spec:
  schedule: "0 9 * * 1"  # Ogni lunedì alle 9:00
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: audit
              image: node:18
              command: ["node", "/scripts/audit-feature-flags.js"]
              volumeMounts:
                - name: scripts
                  mountPath: /scripts
          volumes:
            - name: scripts
              configMap:
                name: feature-flag-audit-script
          restartPolicy: OnFailure
EOF

# Configura alert
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: ZombieFeatureFlag
        expr: feature_flag_age_days > 90
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is a zombie"
          description: "Feature flag {{ $labels.flag }} has not been modified in {{ $value }} days. Consider removing it."

      - alert: ExpiredFeatureFlag
        expr: feature_flag_expired > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Feature flag {{ $labels.flag }} has expired"
          description: "Feature flag {{ $labels.flag }} expired on {{ $labels.expired }}. Remove or extend it."

      - alert: UndocumentedFeatureFlag
        expr: feature_flag_documented == 0
        for: 24h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.flag }} is undocumented"
          description: "Feature flag {{ $labels.flag }} has no description or owner. Document it."
EOF
```

**TL**: Hai automatizzato l'audit?

**ME**: Sì. Ogni lunedì alle 9:00. E alert per flag zombie, scaduti, e non documentati.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che uccidano il sistema.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Audit: automatico
- Alert: configurati
- Cron job: attivo
- JN: educato

E tutto funzionava. Ma avevo imparato una lezione. La lezione che l'automazione è essenziale. E che gli alert salvano. E che i feature flag vanno potati. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Nessuno Ricordava

**Data incident**: Lunedì 16 gennaio 2027, 09:00
**Autore**: JN (e Alice, Bob, ME)
**Servizio**: pricing-service
**Problema**: Feature flag in conflitto causavano prezzi inconsistenti
**Causa**: Flag zombie mai rimossi, default unsafe
**Tempo in produzione**: 2 anni
**Clienti affetti**: ~50% per 2 ore
**Ordini con prezzi sbagliati**: 234
**Differenza totale**: -€1,872
**Reazione UL**: "5 flag?!"
**Reazione TL**: "Zombie?!"
**Reazione CTO**: "Rimuovi i flag. Documenta i restanti. Automatizza l'audit."
**Soluzione**: Flag rimossi + codice semplificato + audit automatico
**Lezione imparata**: I FEATURE FLAG VANNO RIMOSSI. E DOCUMENTATI. E AUDITATI.

**Regole per i feature flag**:
1. I flag TEMPORANEI vanno RIMOSSI dopo il rollout.
2. I flag PERMANENTI vanno DOCUMENTATI con descrizione e owner.
3. Ogni flag deve avere una DATA DI SCADENZA (o essere permanente).
4. Il DEFAULT deve essere SAFE (true per flag esistenti).
5. I flag vanno AUDITATI ogni trimestre.
6. I flag ZOMBIE vanno RIMOSSI.
7. I flag SCADUTI vanno RIMOSSI.
8. Se non sai cosa fa un flag, CHIEDI. Amen.

**Come creare un feature flag correttamente**:
```javascript
// Creazione flag
await featureFlagService.create({
  name: 'new-feature-rollout',
  description: 'Enable new feature for gradual rollout',
  owner: 'team-features',
  enabled: true,
  expires_at: '2027-02-01',  // Data di scadenza!
  created_by: 'jn',
  created_at: new Date()
});

// Nel codice
if (await featureFlagService.get('new-feature-rollout')) {
  return newFeature();
}
return oldFeature();

// Dopo il rollout
await featureFlagService.delete('new-feature-rollout');
// E rimuovi il codice che lo controlla!
```

**Come auditare i feature flag**:
```bash
# Lista tutti i flag
curl -s http://feature-flag-service:8080/flags/all | jq '.flags[]'

# Controlla età
curl -s http://feature-flag-service:8080/flags/all | jq '.flags[] | {name, created, last_modified}'

# Cerca flag zombie (più di 90 giorni)
curl -s http://feature-flag-service:8080/flags/all | jq '.flags[] | select(.last_modified == null) | {name, created}'

# Rimuovi flag zombie
curl -X DELETE http://feature-flag-service:8080/flags/zombie-flag-name
```

**Come configurare l'audit automatico**:
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: feature-flag-audit
spec:
  schedule: "0 9 * * 1"  # Ogni lunedì alle 9:00
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: audit
              image: node:18
              command: ["node", "/scripts/audit-feature-flags.js"]
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag vanno rimossi. E documentati. E auditati. E che il default deve essere safe. E che JN va educato. E che 234 ordini con prezzi sbagliati sono un problema. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come le piante. Se non le poti, crescono ovunque. E soffocano tutto. E quando le lasci crescere per 2 anni, non sai più cosa fa ogni ramo. E se tagli quello sbagliato, il sistema muore. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "I feature flag erano in conflitto." E UL dice: "E PERCHÉ?!" E tu dici: "Perché nessuno li ha mai rimossi." E UL dice: "E PERCHÉ NESSUNO LI HA RIMOSSI?!" E tu dici: "Perché non c'era un processo." E UL dice: "E ORA?!" E tu dici: "Ora c'è un audit automatico. E regole. E documentazione." E la verità è che tutti dimenticano. E l'unico modo per non dimenticare è automatizzare. E documentare. E educare. E potare. Sempre. Amen.

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | pricing-service |
| Flag creati | 5 (in 2 anni) |
| Flag zombie | 23 (totali nel sistema) |
| Flag rimossi | 23 |
| Flag documentati | 24 |
| Clienti affetti | ~50% |
| Tempo incident | 2 ore |
| Ordini sbagliati | 234 |
| Differenza totale | -€1,872 |
| Reazione UL | "5 flag?!" |
| Reazione TL | "Zombie?!" |
| Reazione CTO | "Rimuovi. Documenta. Automatizza." |
| Soluzione | Flag rimossi + audit automatico |
| Lezione imparata | FLAG = RIMUOVI + DOCUMENTA + AUDITA |
| **Totale** | **23 flag zombie rimossi + 24 flag documentati + 1 audit automatico + 1 junior educato** |

**Morale**: I feature flag sono strumenti potenti. Ma se non li gestisci, diventano zombie. E i flag zombie confliggono. E i clienti vedono prezzi sbagliati. E tu ricevi ticket. E UL chiama. E tu rispondi. E dici: "I feature flag erano in conflitto." E UL dice: "E PERCHÉ?!" E tu dici: "Perché nessuno li ha mai rimossi." E UL dice: "E QUANTI ERANO?!" E tu dici: "23 zombie. Su 47 totali." E UL dice: "E COME È POSSIBILE?!" E tu dici: "Perché non c'era un processo. E nessuno documentava. E tutti dimenticavano." E la verità è che i feature flag sono come le piante. Se non le poti, crescono ovunque. E soffocano tutto. E la prossima volta, poti. E documenti. E audit. E JN impara. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-migration-che-ha-bloccato-tutto.md)**
