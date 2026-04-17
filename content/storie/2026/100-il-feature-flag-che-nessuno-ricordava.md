# Il Feature Flag Che Nessuno Ricordava

**Data**: 16/01/2027

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-lezione.md)**

---

C'è una verità nel feature toggling che tutti conoscono ma nessuno rispetta: i feature flag vanno rimossi. Sempre. Quando la feature è stabile, il flag va rimosso. Quando la feature è in produzione da mesi, il flag va rimosso. Quando tutti hanno dimenticato perché il flag esiste, il flag va rimosso. E invece. Invece i feature flag si accumulano. E si moltiplicano. E si dimenticano. E un giorno, qualcuno li tocca. Per sbaglio. O per curiosità. O perché pensa che non servano più. E il sistema crolla. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Ho solo spento un feature flag." E UL dice: "E PERCHÉ IL SISTEMA È DOWN?!" E tu dici: "Non sapevo che fosse importante." E UL dice: "E PERCHÉ NON LO SAPEVI?!" E tu dici: "Perché nessuno l'aveva documentato." E la verità è che i feature flag sono come le mine. Se non le rimuovi, esplodono. E se non le documenti, qualcuno le tocca. E se qualcuno le tocca, boom. Amen.

![](../../img/server.jpg)

---

**Lunedì - La Scoperta**

Era lunedì. Le 10:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato il ticket.

**SUPPORTO**: I clienti vedono prezzi sbagliati. Alcuni vedono prezzi vecchi, altri prezzi nuovi.

**ME**: Prezzi sbagliati?!

**TL**: Prezzi?!

**ME**: Sì. Incoerenza nei prezzi.

**TL**: E QUANTI CLIENTI?!

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla log
kubectl logs -l app=pricing-service --since=30m | grep -i price | tail -20
2027-01-16 09:45:12 INFO: Price calculated for product SKU-1234: €99.99 (v1)
2027-01-16 09:45:13 INFO: Price calculated for product SKU-1234: €149.99 (v2)
2027-01-16 09:45:14 INFO: Price calculated for product SKU-1234: €99.99 (v1)
2027-01-16 09:45:15 INFO: Price calculated for product SKU-1234: €149.99 (v2)

# Controlla configurazione
kubectl get configmap pricing-config -o yaml | grep -A5 "feature"
  FEATURE_NEW_PRICING: "false"
  FEATURE_NEW_PRICING_ROLLOUT: "50"
  FEATURE_LEGACY_PRICING: "true"
  FEATURE_PRICING_V2: "true"
  FEATURE_PRICING_V3: "false"
  FEATURE_PRICING_BETA: "true"
  FEATURE_PRICING_ALPHA: "false"
  FEATURE_PRICING_EXPERIMENTAL: "true"

# Controlla feature flags
curl -s http://feature-flags:8080/api/v1/flags | jq '.flags[] | select(.name | contains("pricing"))'
{
  "name": "pricing-new-algorithm",
  "enabled": true,
  "created": "2024-03-15",
  "lastModified": "2024-03-15",
  "description": null
}
{
  "name": "pricing-v2",
  "enabled": true,
  "created": "2024-06-20",
  "lastModified": "2024-06-20",
  "description": null
}
{
  "name": "pricing-v3-beta",
  "enabled": false,
  "enabled": true,
  "created": "2024-09-10",
  "lastModified": "2025-02-14",
  "description": null
}
{
  "name": "pricing-legacy-compat",
  "enabled": true,
  "created": "2023-11-01",
  "lastModified": "2023-11-01",
  "description": null
}
{
  "name": "pricing-experimental-rounding",
  "enabled": true,
  "created": "2024-01-15",
  "lastModified": "2024-01-15",
  "description": null
}
{
  "name": "pricing-weekend-mode",
  "enabled": true,
  "created": "2024-04-01",
  "lastModified": "2024-04-01",
  "description": null
}
```

**ME**: Ci sono 7 feature flag per il pricing. E nessuno ha descrizione.

**TL**: 7?!

**ME**: Sì. E alcuni sono vecchi di 3 anni.

**TL**: E CHI LI HA CREATI?!

**ME**: Non lo so. Non c'è documentazione.

**TL**: E QUAL È IL PROBLEMA?!

**ME**: I flag sono in conflitto. Alcuni clienti vedono v1, altri v2, altri v3.

**TL**: E QUINDI?!

**ME**: E quindi... i prezzi sono incoerenti.

**TL**: E I CLIENTI?!

**ME**: Si lamentano. E chiedono rimborsi.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 7
- Documentazione: zero
- Conflitti: sì
- Prezzi: incoerenti

E tutto era chiaro. I feature flag si erano accumulati. E nessuno sapeva perché. E nessuno li aveva documentati. E ora causavano problemi. Amen.

---

**Lunedì - 10:30**

Ho chiamato JN. JN ha risposto. Era lunedì. JN era di buon umore. Per ora.

**ME**: JN, hai toccato i feature flag del pricing?

**JN**: Sì! Ho abilitato pricing-v3-beta. Per testare.

**ME**: E PERCHÉ?!

**JN**: Perché volevo vedere se funzionava.

**ME**: E HAI CONTROLLATO GLI ALTRI FLAG?!

**JN**: Quali altri flag?

**ME**: CI SONO 7 FEATURE FLAG PER IL PRICING!

**JN**: 7?!

**ME**: Sì. E alcuni sono in conflitto.

**JN**: Non lo sapevo!

**ME**: E ORA I PREZZI SONO INCOERENTI!

**JN**: Cosa?!

**ME**: I CLIENTI VEDONO PREZZI DIVERSI. E SI LAMENTANO.

**JN**: Ma... pensavo fosse dismesso!

**ME**: DISMESSO?! NON C'È NESSUNA DOCUMENTAZIONE!

**JN**: E QUINDI?!

**ME**: E QUINDI HAI ROTTO IL PRICING!

**JN**: Ok. Lo rimetto come prima.

**ME**: E LA PROSSIMA VOLTA CHIEDI!

**JN**: Ok.

JN ha disabilitato il flag. E i prezzi sono tornati coerenti. Ma la domanda rimaneva: perché c'erano 7 feature flag? E nessuno sapeva perché? E nessuno li aveva documentati? E la risposta era semplice: perché i feature flag si accumulano. E si dimenticano. E nessuno li rimuove. Amen.

---

**Lunedì - 11:00**

Ho auditato tutti i feature flag. Per capire il disastro.

**TERMINALE**:
```
# Conta feature flag totali
curl -s http://feature-flags:8080/api/v1/flags | jq '.flags | length'
147

# Conta flag senza descrizione
curl -s http://feature-flags:8080/api/v1/flags | jq '[.flags[] | select(.description == null)] | length'
89

# Conta flag vecchi (>1 anno)
curl -s http://feature-flags:8080/api/v1/flags | jq '[.flags[] | select(.created < "2026-01-16")] | length'
67

# Conta flag mai modificati
curl -s http://feature-flags:8080/api/v1/flags | jq '[.flags[] | select(.created == .lastModified)] | length'
112

# Lista flag più vecchi
curl -s http://feature-flags:8080/api/v1/flags | jq '.flags | sort_by(.created) | .[:10]'
{
  "name": "legacy-auth-compat",
  "enabled": true,
  "created": "2022-03-15",
  "description": null
}
{
  "name": "old-checkout-flow",
  "enabled": false,
  "created": "2022-05-20",
  "description": null
}
{
  "name": "experimental-search",
  "enabled": true,
  "created": "2022-06-10",
  "description": null
}
...
```

**ME**: 147 feature flag totali. 89 senza descrizione. 67 vecchi di più di un anno. 112 mai modificati dalla creazione.

**TL**: 147?!

**ME**: Sì. E il più vecchio è del 2022.

**TL**: E CHI LI HA CREATI?!

**ME**: Non lo so. Non c'è tracciabilità.

**TL**: E QUALI SONO ATTIVI?!

**ME**: 98. Su 147.

**TL**: 98 FLAG ATTIVI?!

**ME**: Sì. E non sappiamo cosa fanno.

**TL**: E QUINDI?!

**ME**: E quindi... potrebbero essercene altri che causano problemi.

**TL**: E JN?!

**ME**: JN... lo educo. Di nuovo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 147
- Senza descrizione: 89
- Vecchi: 67
- Attivi: 98
- Documentazione: zero

E tutto era chiaro. I feature flag erano un cimitero. Di decisioni dimenticate. Di feature abbandonate. Di esperimenti mai conclusi. E nessuno sapeva cosa facessero. Amen.

---

**Lunedì - 14:00**

Ho iniziato l'archeologia. Per capire cosa facevano i flag.

**TERMINALE**:
```
# Cerca riferimenti nel codice
grep -r "FEATURE_NEW_PRICING" --include="*.js" --include="*.ts" --include="*.py" .
./src/pricing/calculator.js:  if (process.env.FEATURE_NEW_PRICING === 'true') {
./src/pricing/calculator.js:  } else if (process.env.FEATURE_PRICING_V2 === 'true') {
./src/pricing/calculator.js:  } else if (process.env.FEATURE_PRICING_V3 === 'true') {
./src/pricing/calculator.js:  } else if (process.env.FEATURE_LEGACY_PRICING === 'true') {
./src/pricing/calculator.js:  } else if (process.env.FEATURE_PRICING_BETA === 'true') {
./src/pricing/calculator.js:  } else if (process.env.FEATURE_PRICING_ALPHA === 'true') {
./src/pricing/calculator.js:  } else if (process.env.FEATURE_PRICING_EXPERIMENTAL === 'true') {

# Controlla git blame
git log --all --oneline --grep="FEATURE_NEW_PRICING" | head -5
abc1234 Add FEATURE_NEW_PRICING flag for new pricing algorithm
def5678 Enable FEATURE_NEW_PRICING for 50% of users
ghi9012 Fix pricing calculation when FEATURE_NEW_PRICING is enabled

# Controlla chi ha fatto il commit
git show abc1234 --format="%an %ad" | head -1
Bob 2024-03-15

# Controlla se Bob c'è ancora
slack users list | grep Bob
# (nessun risultato)
```

**ME**: Il flag FEATURE_NEW_PRICING è stato creato da Bob. Nel 2024. Bob non c'è più.

**TL**: BOB?!

**ME**: Sì. Se n'è andato 6 mesi fa.

**TL**: E IL FLAG È ANCORA LÌ?!

**ME**: Sì. E non sappiamo se serve.

**TL**: E GLI ALTRI?!

**ME**: Li sto controllando.

**TERMINALE**:
```
# Analizza tutti i flag
for flag in $(curl -s http://feature-flags:8080/api/v1/flags | jq -r '.flags[].name'); do
  echo "=== $flag ==="
  git log --all --oneline --grep="$flag" | head -1
  grep -r "$flag" --include="*.js" --include="*.ts" --include="*.py" . | wc -l
done

# Risultati (primi 10)
=== legacy-auth-compat ===
abc1234 Add legacy auth compat flag (2022-03-15)
0 references in code

=== old-checkout-flow ===
def5678 Add old checkout flow flag (2022-05-20)
0 references in code

=== experimental-search ===
ghi9012 Add experimental search flag (2022-06-10)
3 references in code

=== pricing-new-algorithm ===
jkl3456 Add new pricing algorithm flag (2024-03-15)
12 references in code

=== pricing-v2 ===
mno7890 Add pricing v2 flag (2024-06-20)
8 references in code
```

**ME**: 2 flag non hanno riferimenti nel codice. Sono zombie.

**TL**: ZOMBIE?!

**ME**: Sì. Flag che non fanno nulla. Ma sono ancora nel sistema.

**TL**: E QUANTI SONO?!

**ME**: Non lo so. Li sto contando.

**TERMINALE**:
```
# Conta flag zombie
for flag in $(curl -s http://feature-flags:8080/api/v1/flags | jq -r '.flags[].name'); do
  count=$(grep -r "$flag" --include="*.js" --include="*.ts" --include="*.py" . 2>/dev/null | wc -l)
  if [ $count -eq 0 ]; then
    echo $flag
  fi
done | wc -l
34

# Conta flag con riferimenti
for flag in $(curl -s http://feature-flags:8080/api/v1/flags | jq -r '.flags[].name'); do
  count=$(grep -r "$flag" --include="*.js" --include="*.ts" --include="*.py" . 2>/dev/null | wc -l)
  if [ $count -gt 0 ]; then
    echo "$flag: $count references"
  fi
done | wc -l
113
```

**ME**: 34 flag zombie. 113 con riferimenti nel codice.

**TL**: E QUINDI?!

**ME**: E quindi... 34 flag possono essere rimossi. Gli altri vanno analizzati.

**TL**: E QUANTO CI VUOLE?!

**ME**: Settimane. Forse mesi.

**TL**: E JN?!

**ME**: JN... lo metto a fare archeologia.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag zombie: 34
- Flag attivi: 113
- Tempo necessario: settimane
- JN: archeologo

E tutto era chiaro. I feature flag erano un disastro. E la pulizia sarebbe stata lunga. Amen.

---

**Martedì - La Pulizia**

Martedì. Ho iniziato a rimuovere i flag zombie. Con cautela.

**TERMINALE**:
```
# Lista flag zombie
cat > zombie-flags.txt << 'EOF'
legacy-auth-compat
old-checkout-flow
experimental-search-v1
deprecated-notification
old-payment-gateway
legacy-shipping
experimental-ui-v1
test-feature-abc
test-feature-def
test-feature-ghi
EOF

# Verifica ogni flag
for flag in $(cat zombie-flags.txt); do
  echo "Checking $flag..."
  
  # Controlla se è usato
  count=$(grep -r "$flag" --include="*.js" --include="*.ts" --include="*.py" . 2>/dev/null | wc -l)
  
  # Controlla se è abilitato
  enabled=$(curl -s http://feature-flags:8080/api/v1/flags/$flag | jq '.enabled')
  
  echo "  References: $count"
  echo "  Enabled: $enabled"
done

# Risultati
Checking legacy-auth-compat...
  References: 0
  Enabled: true

Checking old-checkout-flow...
  References: 0
  Enabled: false

Checking experimental-search-v1...
  References: 0
  Enabled: true
```

**ME**: 3 flag zombie sono abilitati. Ma non fanno nulla.

**TL**: E QUINDI?!

**ME**: E quindi... possono essere rimossi senza impatto.

**TL**: E SE SBAGLIAMO?!

**ME**: Allora... il sistema crolla. Ma non dovrebbero fare nulla.

**TL**: E JN?!

**ME**: JN... lo faccio verificare.

**JN**: Verifico cosa?

**ME**: Questi flag. Sono zombie. Non hanno riferimenti nel codice.

**JN**: E QUINDI?!

**ME**: E quindi li rimuoviamo. Ma prima verifica che non siano usati altrove.

**JN**: Altrove dove?

**ME**: In configurazioni. In script. In CI/CD. In qualsiasi posto.

**JN**: Ok.

**TERMINALE**:
```
# Cerca riferimenti ovunque
for flag in $(cat zombie-flags.txt); do
  echo "=== $flag ==="
  
  # Cerca in config
  grep -r "$flag" --include="*.yaml" --include="*.yml" --include="*.json" --include="*.env" . 2>/dev/null
  
  # Cerca in CI/CD
  grep -r "$flag" --include="*.yaml" .github/ 2>/dev/null
  
  # Cerca in script
  grep -r "$flag" --include="*.sh" scripts/ 2>/dev/null
  
  # Cerca in documentazione
  grep -r "$flag" --include="*.md" docs/ 2>/dev/null
done

# Risultati
=== legacy-auth-compat ===
(no output)

=== old-checkout-flow ===
docs/archive/old-checkout-flow.md: This flag controls the old checkout flow.

=== experimental-search-v1 ===
.github/workflows/test.yml:  EXPERIMENTAL_SEARCH_V1: true
```

**JN**: 2 flag hanno riferimenti. In documentazione e CI.

**ME**: E QUINDI?!

**JN**: E quindi... non sono completamente zombie.

**ME**: E ORA?!

**JN**: Verifico se i riferimenti sono importanti.

**TERMINALE**:
```
# Controlla documento
cat docs/archive/old-checkout-flow.md
# This flag controls the old checkout flow.
# DEPRECATED: This flag is no longer used. The old checkout flow was removed in 2023.

# Controlla CI
cat .github/workflows/test.yml | grep -A2 -B2 EXPERIMENTAL_SEARCH_V1
env:
  EXPERIMENTAL_SEARCH_V1: true
# Note: This flag is no longer used but kept for backwards compatibility
```

**JN**: I riferimenti sono obsoleti. Possiamo rimuoverli.

**ME**: Ok. Rimuovi tutto.

**TERMINALE**:
```
# Rimuovi flag zombie
for flag in $(cat zombie-flags.txt); do
  echo "Removing $flag..."
  curl -X DELETE http://feature-flags:8080/api/v1/flags/$flag
done

# Rimuovi riferimenti obsoleti
rm docs/archive/old-checkout-flow.md
sed -i '/EXPERIMENTAL_SEARCH_V1/d' .github/workflows/test.yml

# Verifica
curl -s http://feature-flags:8080/api/v1/flags | jq '.flags | length'
113
```

**ME**: 34 flag rimossi. Ora ne restano 113.

**TL**: E GLI ALTRI?!

**ME**: Gli altri vanno analizzati. Uno per uno.

**TL**: E QUANTO CI VUOLE?!

**ME**: Settimane. Forse mesi.

**TL**: E JN?!

**ME**: JN... continua l'archeologia.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 34
- Flag rimanenti: 113
- Tempo necessario: settimane
- JN: archeologo

E tutto era più pulito. Ma il lavoro era lungo. Amen.

---

**Mercoledì - La Documentazione**

Mercoledì. Ho documentato i feature flag. Quelli che restavano.

**TERMINALE**:
```
# Crea documentazione
cat > docs/feature-flags.md << 'EOF'
# Feature Flags

## Regole

1. Ogni feature flag DEVE avere una descrizione.
2. Ogni feature flag DEVE avere un owner.
3. Ogni feature flag DEVE avere una data di scadenza.
4. I feature flag vanno rimossi quando la feature è stabile.
5. Non creare feature flag per esperimenti permanenti.

## Flag Attivi

### pricing-new-algorithm
- **Creato**: 2024-03-15
- **Owner**: Bob (ex) → Team Pricing
- **Descrizione**: Abilita il nuovo algoritmo di pricing
- **Scadenza**: 2027-03-15
- **Stato**: Stabile, da rimuovere
- **Riferimenti**: 12

### pricing-v2
- **Creato**: 2024-06-20
- **Owner**: Team Pricing
- **Descrizione**: Pricing v2 con supporto multi-valuta
- **Scadenza**: 2027-06-20
- **Stato**: In produzione, da valutare
- **Riferimenti**: 8

### pricing-v3-beta
- **Creato**: 2024-09-10
- **Owner**: JN
- **Descrizione**: Pricing v3 beta (ATTENZIONE: in conflitto con altri flag)
- **Scadenza**: 2027-01-20
- **Stato**: Beta, da disabilitare
- **Riferimenti**: 5

### auth-new-flow
- **Creato**: 2025-01-15
- **Owner**: Team Auth
- **Descrizione**: Nuovo flusso di autenticazione OAuth2
- **Scadenza**: 2027-01-15
- **Stato**: Stabile, da rimuovere
- **Riferimenti**: 23

### checkout-simplified
- **Creato**: 2025-06-01
- **Owner**: Team Checkout
- **Descrizione**: Checkout semplificato in 3 step
- **Scadenza**: 2027-06-01
- **Stato**: In rollout, da monitorare
- **Riferimenti**: 15

...

## Flag da Rimuovere

- pricing-new-algorithm (stabile da 2 anni)
- auth-new-flow (stabile da 1 anno)
- legacy-compat-mode (non usato)
- experimental-logging (non usato)

## Processo di Rimozione

1. Verifica che il flag non sia usato
2. Disabilita il flag
3. Monitora per 1 settimana
4. Rimuovi il flag dal sistema
5. Rimuovi il codice morto
EOF

# Aggiungi owner a tutti i flag
for flag in $(curl -s http://feature-flags:8080/api/v1/flags | jq -r '.flags[].name'); do
  curl -X PATCH http://feature-flags:8080/api/v1/flags/$flag \
    -H "Content-Type: application/json" \
    -d '{"owner": "Team Unknown", "expiryDate": "2027-12-31"}'
done
```

**TL**: Hai documentato tutto?

**ME**: Sì. Ogni flag ha descrizione, owner, e data di scadenza.

**TL**: E I FLAG DA RIMUOVERE?!

**ME**: Identificati. 4 flag sono stabili e possono essere rimossi.

**TL**: E QUANDO?!

**ME**: Dopo aver verificato. E testato.

**TL**: E JN?!

**ME**: JN... continua a verificare.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Documentazione: creata
- Owner: assegnati
- Scadenze: impostate
- Flag da rimuovere: 4

E tutto era documentato. Ma il lavoro continuava. Amen.

---

**Giovedì - L'Educazione**

Giovedì. Ho educato JN. Di nuovo. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per i feature flag?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che i feature flag sono un disastro. Ma sono anche un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Cinque cose. Primo: i feature flag vanno documentati.

**JN**: Sempre?

**ME**: Sempre. Ogni flag deve avere descrizione, owner, e data di scadenza.

**JN**: E SE NON HO TEMPO?!

**ME**: Allimenti non crei il flag. O lo crei dopo.

**JN**: Ok.

**ME**: Secondo: i feature flag vanno rimossi.

**JN**: Quando?

**ME**: Quando la feature è stabile. Di solito dopo 2-4 settimane.

**JN**: E SE LA FEATURE È COMPLESSA?!

**ME**: Allora la rimuovi a fasi. Ma la rimuovi.

**JN**: Ok.

**ME**: Terzo: non toccare i flag che non conosci.

**JN**: E se non so se conosco un flag?

**ME**: Allimenti chiedi. O controlli la documentazione. O non lo tocchi.

**JN**: Ok.

**ME**: Quarto: i flag in conflitto causano disastri.

**JN**: Conflitti?

**ME**: Sì. Se hai 7 flag per il pricing, e alcuni sono in conflitto, i clienti vedono prezzi sbagliati.

**JN**: Non lo sapevo!

**ME**: Ora lo sai. E per questo devi verificare prima di abilitare.

**JN**: Ok.

**ME**: Quinto: i feature flag sono debito tecnico.

**JN**: Debito?

**ME**: Sì. Ogni flag che non rimuovi è debito. E il debito si accumula. E un giorno esplode.

**JN**: E COME EVITARLO?!

**ME**: Rimuovendo i flag. E documentandoli. E non creandone troppi.

**JN**: E SE NE HO GIÀ CREATI TROPPI?!

**ME**: Allora... li rimuovi. E impari. E la prossima volta ne crei meno.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Feature flag: documentati
- Processo: definito
- Educazione: completata
- JN: consapevole

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crollare il sistema è avere documentazione. E processi. E educazione. Amen.

---

**Venerdì - La Rimozione**

Venerdì. Ho iniziato a rimuovere i flag stabili. Con cautela.

**TERMINALE**:
```
# Lista flag da rimuovere
cat > flags-to-remove.txt << 'EOF'
pricing-new-algorithm
auth-new-flow
legacy-compat-mode
experimental-logging
EOF

# Per ogni flag
for flag in $(cat flags-to-remove.txt); do
  echo "=== Removing $flag ==="
  
  # 1. Verifica riferimenti
  refs=$(grep -r "$flag" --include="*.js" --include="*.ts" --include="*.py" . 2>/dev/null | wc -l)
  echo "References: $refs"
  
  # 2. Disabilita
  curl -X PATCH http://feature-flags:8080/api/v1/flags/$flag \
    -H "Content-Type: application/json" \
    -d '{"enabled": false}'
  echo "Disabled"
  
  # 3. Attendi
  echo "Waiting 1 hour..."
  sleep 3600
  
  # 4. Verifica errori
  errors=$(kubectl logs -l app=pricing-service --since=1h | grep -i error | wc -l)
  echo "Errors in last hour: $errors"
  
  # 5. Se tutto ok, rimuovi
  if [ $errors -eq 0 ]; then
    curl -X DELETE http://feature-flags:8080/api/v1/flags/$flag
    echo "Removed"
  else
    echo "ERRORS DETECTED - ABORTING"
    exit 1
  fi
done

# Risultati
=== Removing pricing-new-algorithm ===
References: 12
Disabled
Waiting 1 hour...
Errors in last hour: 0
Removed

=== Removing auth-new-flow ===
References: 23
Disabled
Waiting 1 hour...
Errors in last hour: 0
Removed

=== Removing legacy-compat-mode ===
References: 0
Disabled
Waiting 1 hour...
Errors in last hour: 0
Removed

=== Removing experimental-logging ===
References: 2
Disabled
Waiting 1 hour...
Errors in last hour: 0
Removed
```

**ME**: 4 flag rimossi. Senza errori.

**TL**: E IL CODICE?!

**ME**: Ora rimuovo il codice morto.

**TERMINALE**:
```
# Rimuovi codice morto
for flag in $(cat flags-to-remove.txt); do
  echo "Cleaning up $flag..."
  
  # Trova file con riferimenti
  files=$(grep -rl "$flag" --include="*.js" --include="*.ts" --include="*.py" . 2>/dev/null)
  
  # Per ogni file
  for file in $files; do
    echo "Processing $file..."
    
    # Rimuovi blocchi condizionali
    sed -i "/if.*$flag/,/}/d" $file
    sed -i "/\/\/ $flag/,/\/\/ end $flag/d" $file
    
    # Rimuovi variabili
    sed -i "/$flag/d" $file
  done
done

# Verifica
npm test
All tests passing

# Commit
git add .
git commit -m "Remove feature flags: pricing-new-algorithm, auth-new-flow, legacy-compat-mode, experimental-logging"
git push
```

**ME**: Codice morto rimosso. Test passing.

**TL**: E QUANTI FLAG RESTANO?!

**ME**: 109. Da 147 iniziali.

**TL**: E GLI ALTRI?!

**ME**: Gli altri vanno analizzati. E rimossi. A poco a poco.

**TL**: E JN?!

**ME**: JN... continua l'archeologia.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 38 (34 zombie + 4 stabili)
- Flag rimanenti: 109
- Codice morto: rimosso
- Test: passing

E tutto era più pulito. Ma il lavoro continuava. Amen.

---

**Sabato - La Riflessione**

Sabato. Ero a casa. Ma non riuscivo a smettere di pensare. Ai feature flag. A JN. Al debito tecnico.

Ho aperto il laptop. Ho scritto la guida.

**TERMINALE**:
```
# Guida ai feature flag
cat > docs/feature-flags-best-practices.md << 'EOF'
## Best Practices per i Feature Flag

### Regola #1: DOCUMENTA SEMPRE

Ogni feature flag deve avere:
- Descrizione chiara
- Owner responsabile
- Data di creazione
- Data di scadenza
- Stato (draft/beta/stable)

```yaml
feature-flags:
  - name: new-checkout-flow
    description: "Abilita il nuovo checkout in 3 step"
    owner: "team-checkout@company.com"
    created: "2026-01-15"
    expiry: "2026-03-15"
    status: "beta"
```

### Regola #2: RIMUOVI I FLAG

I feature flag sono debito tecnico. Rimuovili quando:
- La feature è stabile da 2+ settimane
- Il flag è in produzione da 3+ mesi
- Il flag non ha riferimenti nel codice

```bash
# Processo di rimozione
1. Disabilita il flag
2. Monitora per 1 settimana
3. Rimuovi il flag
4. Rimuovi il codice morto
5. Commit e push
```

### Regola #3: NON ACCUMULARE

Non creare feature flag per:
- Esperimenti permanenti
- Configurazioni che non cambiano
- Feature che saranno sempre attive

Usa invece:
- Configurazioni
- Environment variables
- Database settings

### Regola #4: VERIFICA I CONFLITTI

Prima di abilitare un flag:
- Controlla se esistono flag simili
- Verifica conflitti
- Testa in staging

```bash
# Cerca flag simili
curl -s http://feature-flags:8080/api/v1/flags | jq '.flags[] | select(.name | contains("pricing"))'

# Verifica conflitti
grep -r "FEATURE.*PRICING" --include="*.js" .
```

### Regola #5: USA IL TOOL GIUSTO

Per feature flag: usa un feature flag system.
Per configurazioni: usa config maps.
Per secrets: usa secret manager.

Non mischiare.

### Regola #6: MONITORA

Configura alert per:
- Flag abilitati da troppo tempo
- Flag senza owner
- Flag in scadenza

```yaml
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagTooOld
        expr: feature_flag_age_days > 90
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is too old"
```

### Regola #7: NON TOCCARE I FLAG ALTRUI

Se non sei l'owner:
- Chiedi prima
- Verifica la documentazione
- Non abilitare/disabilitare senza permesso

### Regola #8: I FLAG SONO TEMPORANEI

I feature flag non sono permanenti. Se una feature deve essere permanente:
- Rimuovi il flag
- Semplifica il codice
- Documenta la decisione

Amen.
EOF
```

Il TL mi ha scritto su Slack. "Stai lavorando di sabato?"

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Scrivo la guida per i feature flag. E configuro alert per i flag vecchi.

**TL**: E JN?

**ME**: JN... lo educo. Di nuovo. Lunedì.

**TL**: E i controlli?

**ME**: Aggiungo monitoraggio per i flag. E alert per i flag in scadenza. E processi per la rimozione.

**TL**: Bene. Ora riposa.

**ME**: Sì. Dopo aver aggiunto gli alert.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di sabato per un disastro di lunedì. E stai fixando il processo. E stai educando il junior. E stai proteggendo il sistema. Ma è sabato. E dovresti riposare. Amen."

---

**Domenica - Il Monitoraggio**

Domenica. Ho aggiunto monitoraggio. Per vedere quando i flag invecchiano.

**TERMINALE**:
```
# Configura alert per feature flag
cat > /etc/prometheus/alerts/feature-flags.yml << 'EOF'
groups:
  - name: feature-flags
    rules:
      - alert: FeatureFlagTooOld
        expr: feature_flag_age_days > 90
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is too old"
          description: "Feature flag {{ $labels.name }} has been active for {{ $value }} days. Consider removing it."

      - alert: FeatureFlagNoOwner
        expr: feature_flag_owner == ""
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} has no owner"
          description: "Feature flag {{ $labels.name }} has no owner assigned. Please assign an owner."

      - alert: FeatureFlagNoDescription
        expr: feature_flag_description == ""
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} has no description"
          description: "Feature flag {{ $labels.name }} has no description. Please add a description."

      - alert: FeatureFlagExpiringSoon
        expr: feature_flag_expiry_days < 7
        for: 1h
        labels:
          severity: critical
        annotations:
          summary: "Feature flag {{ $labels.name }} is expiring soon"
          description: "Feature flag {{ $labels.name }} expires in {{ $value }} days. Review and extend or remove."

      - alert: FeatureFlagZombie
        expr: feature_flag_references == 0 and feature_flag_enabled == 1
        for: 24h
        labels:
          severity: warning
        annotations:
          summary: "Feature flag {{ $labels.name }} is a zombie"
          description: "Feature flag {{ $labels.name }} is enabled but has no code references. Consider removing."
EOF

# Aggiungi metriche
cat > src/lib/feature-flag-metrics.js << 'EOF'
const prometheus = require('prom-client');

const featureFlagAge = new prometheus.Gauge({
  name: 'feature_flag_age_days',
  help: 'Age of feature flag in days',
  labelNames: ['name', 'owner'],
});

const featureFlagEnabled = new prometheus.Gauge({
  name: 'feature_flag_enabled',
  help: 'Feature flag enabled status: 0=disabled, 1=enabled',
  labelNames: ['name'],
});

const featureFlagReferences = new prometheus.Gauge({
  name: 'feature_flag_references',
  help: 'Number of code references to feature flag',
  labelNames: ['name'],
});

const featureFlagCount = new prometheus.Gauge({
  name: 'feature_flag_count',
  help: 'Total number of feature flags',
  labelNames: ['status'],
});

module.exports = { featureFlagAge, featureFlagEnabled, featureFlagReferences, featureFlagCount };
EOF

# Configura job per raccogliere metriche
cat > /etc/prometheus/targets/feature-flags.yml << 'EOF'
- targets:
    - feature-flags:8080
  labels:
    job: feature-flags
EOF
```

**TL**: Hai aggiunto il monitoraggio?

**ME**: Sì. Alert per flag vecchi. Alert per flag senza owner. Alert per flag zombie. Alert per flag in scadenza.

**TL**: E QUINDI?!

**ME**: E quindi... vediamo i problemi prima che esplodano.

**TL**: E SE NON LO VEDIAMO?!

**ME**: Allora... l'alert ci avvisa. E interveniamo.

**TL**: E SE NON INTERVENIAMO?!

**ME**: Allora... siamo fottuti. Ma almeno sappiamo di essere fottuti.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Hai configurato tutto. Ora riposa. È domenica. Amen."

---

## Il costo del feature flag dimenticato

| Voce | Valore |
|------|--------|
| Servizio | Pricing |
| Autore | JN |
| Data incident | 16/01/2027, 10:00 |
| Flag totali | 147 |
| Flag zombie | 34 |
| Flag senza descrizione | 89 |
| Flag vecchi (>1 anno) | 67 |
| Flag rimossi | 38 |
| Flag rimanenti | 109 |
| Prezzi incoerenti | Sì |
| Clienti impattati | ~500 |
| Ticket supporto | 23 |
| Reazione UL | "147 flag?!" |
| Reazione TL | "34 zombie?!" |
| Reazione CTO | "Documenta e rimuovi." |
| Soluzione | Documentazione + rimozione + educazione |
| Lezione imparata | FEATURE FLAG = DEBITO TECNICO |
| **Totale** | **38 flag rimossi + 500 clienti impattati + 1 junior educato** |

**Morale**: I feature flag sono come le mine. Se non le rimuovi, esplodono. E se non le documenti, qualcuno le tocca. E se qualcuno le tocca, boom. E i clienti chiamano. E UL chiama. E tu rispondi. E dici: "Ho solo toccato un feature flag." E UL dice: "E PERCHÉ IL SISTEMA È DOWN?!" E tu dici: "Non sapevo che fosse importante." E UL dice: "E PERCHÉ NON LO SAPEVI?!" E tu dici: "Perché nessuno l'aveva documentato." E la verità è che i feature flag si accumulano. E si dimenticano. E nessuno li rimuove. E un giorno esplodono. E impari. Impari che i feature flag vanno documentati. E rimossi. E monitorati. E che JN va educato. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](99-il-health-check-che-mentiva-sempre.md) | [Prossima](101-la-lezione.md)**
