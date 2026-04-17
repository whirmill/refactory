# Il Feature Flag Che Non Si Spegneva Mai

**Data**: 03/04/2026

**[Storie 2026](index.md) | [Precedente](110-il-load-balancer-che-aveva-un-preferito.md) | [Prossima](112-la-migration-che-ha-cancellato-tutto.md)**

---

C'è una cosa che tutti sanno ma nessuno ammette: i feature flag sono debiti tecnici. Nascono come "temporanei". Diventano "permanenti". E alla fine, nessuno sa cosa fanno. O perché. O se si possono togliere. E quando provi a toglierli, tutto si rompe. Perché il feature flag non si spegneva mai.

![](../../img/feature-flag.jpg)

Il feature flag in questione si chiamava `ENABLE_NEW_CHECKOUT`. Era stato creato da PM. Due anni fa. Per il nuovo checkout. Che era stato lanciato. E completato. E dimenticato.

Ma il flag era ancora lì. Attivo. Su tutti gli ambienti. E nessuno sapeva perché.

---

**Lunedì - La Scoperta**

Era lunedì. Le 9:00. Il caffè era pronto. Il sistema sembrava ok.

Poi è arrivato l'alert.

**ALERT**: Feature flag `ENABLE_NEW_CHECKOUT` has been active for 730 days

**ME**: 730 giorni?!

**TL**: 730 GIORNI?!

**ME**: Sì. Due anni.

**TL**: E COSA FA?!

**ME**: Non lo so. Guardo il codice.

**TERMINALE**:
```
# Cerca il feature flag nel codice
grep -r "ENABLE_NEW_CHECKOUT" src/
src/checkout/CheckoutService.js:    if (process.env.ENABLE_NEW_CHECKOUT === 'true') {
src/checkout/OldCheckout.js:// DEPRECATED: use NewCheckout when ENABLE_NEW_CHECKOUT is true
src/checkout/NewCheckout.js:// New checkout flow - enabled via ENABLE_NEW_CHECKOUT
src/config/feature-flags.js:  ENABLE_NEW_CHECKOUT: process.env.ENABLE_NEW_CHECKOUT || 'true',
src/tests/checkout.test.js:    // Test with ENABLE_NEW_CHECKOUT=true (default)

# Controlla quando è stato aggiunto
git log -S "ENABLE_NEW_CHECKOUT" --oneline | tail -1
a3b2c1d Add ENABLE_NEW_CHECKOUT feature flag for new checkout flow - PM, 2024-04-03

# Controlla se è ancora usato
git log --oneline --since="2025-04-01" -- src/checkout/OldCheckout.js
(nothing)
```

**ME**: Il flag è stato aggiunto due anni fa. Da PM. Per il nuovo checkout.

**TL**: E IL NUOVO CHECKOUT È STATO LANCIATO?!

**ME**: Sì. Due anni fa.

**TL**: E IL FLAG È ANCORA LÌ?!

**ME**: Sì. E il vecchio checkout è ancora nel codice. Ma non viene mai usato.

**TL**: E PERCHÉ?!

**ME**: Perché il flag è sempre true. E nessuno l'ha mai spento.

**TL**: E SE LO SPENGIAMO?!

**ME**: Allora... usiamo il vecchio checkout. Che non funziona più. Perché nessuno l'ha aggiornato. Per due anni.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: attivo da 730 giorni
- Vecchio checkout: deprecato ma ancora nel codice
- Nuovo checkout: l'unico che funziona
- Flag: impossibile da spegnere

E tutto era chiaro. Il feature flag non si spegneva mai. Perché se lo spegnevi, tutto si rompeva. Amen.

---

**Lunedì - 10:00**

Ho chiamato PM. PM ha risposto. Era lunedì. PM era di buon umore. Per ora.

**ME**: PM, vieni qui.

**PM**: Sì?

**ME**: Hai creato il feature flag `ENABLE_NEW_CHECKOUT`?

**PM**: Sì. Due anni fa. Perché?

**ME**: È ancora attivo.

**PM**: E allora?

**ME**: È attivo da 730 giorni.

**PM**: E?

**ME**: E il vecchio checkout è ancora nel codice. Ma non funziona più.

**PM**: E quindi?

**ME**: E quindi non possiamo spegnere il flag.

**PM**: E perché dovremmo spegnerlo?

**ME**: Perché... è un feature flag. I feature flag dovrebbero essere temporanei.

**PM**: Ma funziona!

**ME**: Sì, ma è un debito tecnico.

**PM**: E che problema crea?

**ME**: Se qualcuno lo spegne per sbaglio, il sistema si rompe.

**PM**: E chi lo spegne per sbaglio?

**ME**: ...io. O JN. O chiunque.

**PM**: E allora non lo spegnete.

**ME**: Ma...

**PM**: MA FUNZIONA!

PM è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Feature flag: attivo
- PM: indifferente
- Debito tecnico: accumulato
- Vecchio checkout: zombie

E la lezione era chiara. I feature flag sono debiti tecnici. E i PM non capiscono il debito tecnico. Amen.

---

**Lunedì - 11:00**

Ho deciso di fare la cosa giusta. Ho deciso di rimuovere il vecchio checkout. E il feature flag.

**TERMINALE**:
```
# Controlla se il vecchio checkout è ancora referenziato
grep -r "OldCheckout" src/ --include="*.js" | grep -v "test"
src/checkout/CheckoutService.js:    const OldCheckout = require('./OldCheckout');

# Controlla se viene mai chiamato
grep -r "new OldCheckout" src/ --include="*.js"
(nothing)

# Controlla i test
grep -r "OldCheckout" src/tests/
src/tests/checkout.test.js:    // Old checkout is deprecated, skip tests

# Ok, il vecchio checkout non viene mai usato. Posso rimuoverlo.
```

**ME**: Il vecchio checkout non viene mai usato. Posso rimuoverlo.

**TL**: E SE QUALCOSA SI ROMPE?!

**ME**: Controllo i test.

**TERMINALE**:
```
# Esegui i test
npm test

PASS src/tests/checkout.test.js
  ✓ New checkout works (42ms)
  ✓ New checkout handles errors (15ms)
  ✓ New checkout validates input (8ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

**ME**: I test passano. E non testano il vecchio checkout.

**TL**: E QUINDI?!

**ME**: E quindi... rimuovo tutto.

**TERMINALE**:
```
# Rimuovi il vecchio checkout
git rm src/checkout/OldCheckout.js

# Rimuovi il feature flag
# Prima, semplifica il codice
cat > src/checkout/CheckoutService.js << 'EOF'
const NewCheckout = require('./NewCheckout');

class CheckoutService {
  async processCheckout(cart) {
    // New checkout is the only checkout now
    return NewCheckout.process(cart);
  }
}

module.exports = new CheckoutService();
EOF

# Rimuovi il flag dalla configurazione
cat > src/config/feature-flags.js << 'EOF'
module.exports = {
  // ENABLE_NEW_CHECKOUT removed - new checkout is now the default
  // No need for a flag anymore
};
EOF

# Esegui i test
npm test
PASS

# Commit
git add .
git commit -m "Remove ENABLE_NEW_CHECKOUT flag and deprecated OldCheckout"
```

**ME**: Fatto. Il feature flag è rimosso. Il vecchio checkout è rimosso.

**TL**: E SE QUALCOSA SI ROMPE?!

**ME**: Allora... i test avrebbero dovuto dircelo.

**TL**: E SE I TEST NON BASTANO?!

**ME**: Allora... lo scopriamo in produzione.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Vecchio checkout: rimosso
- Feature flag: rimosso
- Test: passati
- Rischio: alto

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Amen.

---

**Lunedì - 14:00**

Ho fatto il deploy. E tutto è andato... bene?

**TERMINALE**:
```
# Deploy in staging
kubectl apply -f k8s/deployment.yaml
deployment.apps/checkout-service configured

# Controlla i log
kubectl logs -l app=checkout-service --since=5m
[INFO] Checkout service started
[INFO] Using NewCheckout (default)
[INFO] Ready to process orders

# Test manuale
curl -X POST https://staging.example.com/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"cart_id": "test-123"}'
{"status": "success", "order_id": "ORD-456"}

# Ok, funziona. Deploy in produzione.
```

**ME**: Staging ok. Deploy in produzione.

**TL**: E SE SI ROMPE?!

**ME**: Allora... rollback.

**TERMINALE**:
```
# Deploy in produzione
kubectl apply -f k8s/deployment-prod.yaml
deployment.apps/checkout-service configured

# Controlla i log
kubectl logs -l app=checkout-service,env=prod --since=5m
[INFO] Checkout service started
[INFO] Using NewCheckout (default)
[INFO] Ready to process orders

# Controlla le metriche
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'rate(http_requests_total{service="checkout",status="200"}[5m])'
12.5  # Richieste al secondo con successo

# Controlla gli errori
kubectl exec -it prometheus-0 -- promtool query instant 'http://localhost:9090' 'rate(http_requests_total{service="checkout",status="500"}[5m])'
0  # Zero errori
```

**ME**: Produzione ok. Zero errori. Tutto funziona.

**TL**: E IL FEATURE FLAG?!

**ME**: Il feature flag è morto. E il vecchio checkout è morto con lui.

**TL**: E PM?!

**ME**: PM... non lo so. Non gli ho detto che lo rimuovevo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: rimosso
- Vecchio checkout: rimosso
- Produzione: funzionante
- PM: all'oscuro

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag sono debiti tecnici. E che vanno rimossi. Anche se i PM non capiscono. Amen.

---

**Lunedì - 15:00**

PM mi ha chiamato. PM non era contento.

**PM**: HAI RIMOSSO IL FEATURE FLAG?!

**ME**: Sì.

**PM**: E PERCHÉ?!

**ME**: Perché era attivo da 730 giorni. E il vecchio checkout non funzionava più.

**PM**: E SE QUALCOSA SI ROMPE?!

**ME**: Non si è rotto niente. I test passano. E la produzione funziona.

**PM**: MA E SE?!

**ME**: Se cosa?

**PM**: SE QUALCOSA SI ROMPE!

**ME**: Allora... rollback. Ma non si è rotto niente.

**PM**: MA IL FEATURE FLAG ERA UNA SICUREZZA!

**ME**: Una sicurezza per cosa?

**PM**: PER... PER... non lo so. Ma era una sicurezza!

**ME**: Era un debito tecnico. E l'ho rimosso.

**PM**: E CHI TI HA DATO IL PERMESSO?!

**ME**: Il buon senso. E il fatto che il vecchio checkout non funzionava più.

**PM**: MA...

**ME**: MA NIENTE. Funziona. E il codice è più pulito. E il debito tecnico è ridotto.

PM è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Feature flag: rimosso
- PM: arrabbiato
- Codice: più pulito
- Debito tecnico: ridotto

E la lezione era chiara. I feature flag sono debiti tecnici. E i PM si arrabbiano quando li rimuovi. Ma va fatto. Amen.

---

**Martedì - L'Analisi**

Martedì. Ho analizzato tutti i feature flag. Per vedere quanti altri zombie c'erano.

**TERMINALE**:
```
# Cerca tutti i feature flag
grep -r "process.env.ENABLE" src/ --include="*.js" | wc -l
47

# 47 feature flag?!

# Controlla quando sono stati aggiunti
for flag in $(grep -roh "ENABLE_[A-Z_]*" src/ | sort -u); do
  echo "=== $flag ==="
  git log -S "$flag" --oneline | tail -1
done

ENABLE_NEW_CHECKOUT: 2024-04-03 (removed yesterday)
ENABLE_DARK_MODE: 2024-06-15
ENABLE_NEW_DASHBOARD: 2024-08-20
ENABLE_API_V2: 2024-09-01
ENABLE_RECOMMENDATIONS: 2024-10-15
ENABLE_NEW_SEARCH: 2024-11-01
ENABLE_SOCIAL_LOGIN: 2024-12-01
ENABLE_NEW_PAYMENT: 2025-01-15
ENABLE_AB_TEST: 2025-02-01
ENABLE_CACHE_BUST: 2025-03-01
... (38 more)

# Controlla quali sono ancora attivi
for flag in $(grep -roh "ENABLE_[A-Z_]*" src/ | sort -u); do
  value=$(grep -A1 "$flag" src/config/feature-flags.js | grep -oE "'(true|false)'" | head -1)
  echo "$flag: $value"
done

ENABLE_DARK_MODE: 'true'
ENABLE_NEW_DASHBOARD: 'true'
ENABLE_API_V2: 'true'
ENABLE_RECOMMENDATIONS: 'true'
ENABLE_NEW_SEARCH: 'true'
ENABLE_SOCIAL_LOGIN: 'true'
ENABLE_NEW_PAYMENT: 'true'
ENABLE_AB_TEST: 'true'
ENABLE_CACHE_BUST: 'true'
... (tutti 'true')
```

**ME**: 47 feature flag. Tutti attivi. Tutti 'true'.

**TL**: 47?!

**ME**: Sì. E tutti sono attivi da almeno un anno.

**TL**: E QUANTI SI POSSONO RIMUOVERE?!

**ME**: Non lo so. Bisogna controllare uno per uno.

**TL**: E QUANTO TEMPO CI VUOLE?!

**ME**: Almeno una settimana. Forse due.

**TL**: E UL?!

**ME**: UL... lo chiamo.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: 47
- Attivi: tutti
- Zombie: probabilmente 40+
- Lavoro: tanto

E la lezione era chiara. I feature flag si accumulano. E nessuno li rimuove. E diventano zombie. Amen.

---

**Mercoledì - Il Piano**

Mercoledì. Ho chiamato UL. Per il piano di bonifica.

**UL**: 47 feature flag?!

**ME**: Sì. E tutti attivi.

**UL**: E QUANTI SI POSSONO RIMUOVERE?!

**ME**: Non lo so. Bisogna controllare.

**UL**: E QUANTO TEMPO CI VUOLE?!

**ME**: Due settimane. Forse tre.

**UL**: E QUANTO COSTA?!

**ME**: Niente. Solo tempo.

**UL**: E SE QUALCOSA SI ROMPE?!

**ME**: Allora... rollback. E fix.

**UL**: E PM?!

**ME**: PM si arrabbia. Ma va fatto.

**UL**: E PERCHÉ?!

**ME**: Perché i feature flag sono debiti tecnici. E il debito tecnico si accumula. E prima o poi, qualcosa si rompe.

**UL**: E QUINDI?!

**ME**: E quindi... bonifichiamo. Un flag alla volta.

**UL**: Ok. Ma documentate tutto. E non rompete niente.

**ME**: Ok.

UL ha riattaccato. E la lezione era chiara. I feature flag vanno rimossi. E UL approva. Ma vuole documentazione. Amen.

---

**Giovedì - La Bonifica**

Giovedì. Ho iniziato la bonifica. Un flag alla volta.

**TERMINALE**:
```
# Flag 1: ENABLE_DARK_MODE
# Controlla se è usato
grep -r "ENABLE_DARK_MODE" src/ --include="*.js" | wc -l
12

# Controlla se c'è un fallback
grep -A5 "ENABLE_DARK_MODE" src/ui/ThemeManager.js
if (process.env.ENABLE_DARK_MODE === 'true') {
  theme = 'dark';
} else {
  theme = 'light';
}

# Il fallback esiste. Ma il flag è sempre true.
# Controlla se qualcuno usa il light mode
grep -r "theme.*light" src/ --include="*.js" | wc -l
0

# Nessuno usa il light mode. Il flag è zombie.
# Rimuovi il flag e semplifica il codice.
```

**ME**: `ENABLE_DARK_MODE` è zombie. Lo rimuovo.

**TL**: E SE QUALCUNO VUOLE IL LIGHT MODE?!

**ME**: Allora... lo aggiungiamo dopo. Come una feature. Non come un flag.

**TL**: E PM?!

**ME**: PM non sa nemmeno che esiste questo flag.

**TERMINALE**:
```
# Rimuovi ENABLE_DARK_MODE
# Semplifica ThemeManager.js
cat > src/ui/ThemeManager.js << 'EOF'
class ThemeManager {
  getTheme() {
    // Dark mode is the default now
    return 'dark';
  }
}

module.exports = new ThemeManager();
EOF

# Rimuovi il flag dalla configurazione
sed -i '/ENABLE_DARK_MODE/d' src/config/feature-flags.js

# Test
npm test
PASS

# Commit
git add .
git commit -m "Remove ENABLE_DARK_MODE flag - dark mode is now default"
```

**ME**: Un flag rimosso. Ne mancano 46.

**TL**: E QUANTO TEMPO?!

**ME**: Al ritmo di uno al giorno... 46 giorni.

**TL**: E UL?!

**ME**: UL vuole che finiamo in due settimane. Quindi... tre al giorno.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 1
- Flag rimanenti: 46
- Tempo: 46 giorni (o 15 giorni a 3 al giorno)
- PM: all'oscuro

E la bonifica era iniziata. Ma c'era molta strada da fare. Amen.

---

**Venerdì - La Resistenza**

Venerdì. PM ha scoperto la bonifica. E non era contento.

**PM**: STAI RIMUOVENDO I FEATURE FLAG?!

**ME**: Sì. Quelli zombie.

**PM**: ZOMBIE?!

**ME**: Sì. Flag che sono sempre true. E che non si possono spegnere.

**PM**: E COME FAI A SAPERE CHE NON SI POSSONO SPEGNERE?!

**ME**: Perché se li spegni, il sistema si rompe.

**PM**: E ALLORA NON LI SPEGNERE!

**ME**: Ma sono debito tecnico. E vanno rimossi.

**PM**: MA SONO SICUREZZE!

**ME**: Sicurezze per cosa?

**PM**: PER... PER... per il rollback!

**ME**: Il rollback non funziona se il flag è sempre true. Perché il codice vecchio non esiste più.

**PM**: MA...

**ME**: MA NIENTE. I flag zombie vanno rimossi. E li sto rimuovendo.

**PM**: E CHI TI HA DATO IL PERMESSO?!

**ME**: UL. E il buon senso.

**PM**: E IO?!

**ME**: Tu... puoi aiutare. Dicendomi quali flag servono ancora.

**PM**: TUTTI!

**ME**: Tutti?

**PM**: SÌ! TUTTI!

**ME**: Anche `ENABLE_CACHE_BUST` che è attivo da un anno e nessuno sa cosa fa?

**PM**: SÌ!

**ME**: E `ENABLE_AB_TEST` che è finito da sei mesi?

**PM**: SÌ!

**ME**: E `ENABLE_NEW_CHECKOUT` che ho già rimosso?

**PM**: QUELLO?!

**ME**: Sì. L'ho rimosso lunedì. E non è successo niente.

**PM**: ...

PM è uscito. O forse è scappato. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Flag rimossi: 5
- Flag rimanenti: 42
- PM: frustrato
- UL: d'accordo

E la bonifica continuava. Nonostante la resistenza. Amen.

---

**Sabato - La Documentazione**

Sabato. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero creato feature flag.

```markdown
## Incident #FF-001: Il Feature Flag Che Non Si Spegneva Mai

**Data incident**: Lunedì 3 aprile 2026, 9:00
**Autore**: PM (originale), ME (rimozione)
**Servizio**: Checkout Service
**Problema**: Feature flag attivo da 730 giorni che non poteva essere spento
**Causa**: Vecchio checkout deprecato ma mai rimosso
**Tempo in produzione**: 2 anni
**Flag**: ENABLE_NEW_CHECKOUT
**Valore**: sempre 'true'
**Fallback**: OldCheckout (non funzionante)
**Rischio**: Se qualcuno avesse spento il flag, il sistema si sarebbe rotto
**Tempo di risoluzione**: 1 giorno
**Downtime**: 0
**Reazione UL**: "47 feature flag?!"
**Reazione TL**: "Zombie?!"
**Reazione PM**: "MA SONO SICUREZZE!"
**Soluzione**: Rimozione del flag e del vecchio checkout
**Lezione imparata**: I FEATURE FLAG SONO DEBITI TECNICI. RIMUOVILI.

**Regole per i feature flag**:
1. I feature flag sono TEMPORANEI. Non permanenti.
2. Quando una feature è completa, rimuovi il flag.
3. Se il flag è attivo da più di 3 mesi, è zombie.
4. Gli zombie vanno rimossi. Anche se i PM protestano.
5. Documenta quando rimuovi un flag. E perché.
6. Testa sempre il fallback. Se non funziona, il flag è zombie.
7. Non accumulare debito tecnico. I flag si accumulano.
8. Bonifica regolarmente. Una volta al trimestre. Amen.

**Come identificare i flag zombie**:
```bash
# Conta i flag
grep -r "ENABLE_" src/ | wc -l

# Controlla quando sono stati aggiunti
git log -S "ENABLE_" --oneline | tail -1

# Controlla se hanno fallback funzionante
grep -A5 "ENABLE_" src/ | grep "else"
```

**Come rimuovere un flag zombie**:
1. Verifica che il flag sia sempre true (o false).
2. Verifica che il fallback non funzioni.
3. Semplifica il codice rimuovendo il branch.
4. Rimuovi il flag dalla configurazione.
5. Testa.
6. Commit con messaggio chiaro.
7. Deploy.
8. Documenta.
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag sono debiti tecnici. E che vanno rimossi. E che i PM protestano. E che la bonifica è necessaria. E che 47 flag sono troppi. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag nascono come "temporanei". Diventano "permanenti". E alla fine, diventano "zombie". E gli zombie non muoiono. Continuano a esistere. Nel codice. Nella configurazione. Nella mente dei PM. E quando provi a ucciderli, i PM urlano. "MA SONO SICUREZZE!" Ma non sono sicurezze. Sono debiti tecnici. E il debito tecnico va pagato. Prima o poi. E meglio prima che dopo. Amen.

---

## Il costo del feature flag zombie

| Voce | Valore |
|------|--------|
| Servizio | Checkout Service |
| Autore originale | PM |
| Data creazione | 03/04/2024 |
| Data rimozione | 03/04/2026 |
| Tempo in produzione | 2 anni |
| Flag | ENABLE_NEW_CHECKOUT |
| Valore | sempre 'true' |
| Fallback | OldCheckout (non funzionante) |
| Rischio | Sistema si rompe se flag spento |
| Tempo di risoluzione | 1 giorno |
| Downtime | 0 |
| Reazione UL | "47 feature flag?!" |
| Reazione TL | "Zombie?!" |
| Reazione PM | "MA SONO SICUREZZE!" |
| Soluzione | Rimozione flag + vecchio checkout |
| Lezione imparata | FEATURE FLAG = DEBITO TECNICO |
| Flag totali trovati | 47 |
| Flag zombie stimati | 40+ |
| Tempo di bonifica | 2-3 settimane |
| **Totale** | **1 flag rimosso + 46 da rimuovere + 1 PM frustrato** |

**Morale**: I feature flag sono come i vampiri. Nascono come "temporanei". Ma non muoiono mai. Continuano a esistere. Nel codice. Nella configurazione. E quando provi a ucciderli, i PM urlano. "MA SONO SICUREZZE!" Ma non sono sicurezze. Sono debiti tecnici. E il debito tecnico va pagato. Con la bonifica. E la documentazione. E la pazienza. E quando finalmente rimuovi l'ultimo flag zombie, guardi il codice. E vedi che è più pulito. E più semplice. E più manutenibile. E pensi: "Finalmente." E poi... arriva un nuovo PM. Con una nuova feature. E un nuovo flag. "Solo temporaneo." E il ciclo ricomincia. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](110-il-load-balancer-che-aveva-un-preferito.md) | [Prossima](112-la-migration-che-ha-cancellato-tutto.md)**
