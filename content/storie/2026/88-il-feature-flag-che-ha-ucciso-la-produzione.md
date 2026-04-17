# Il Feature Flag Che Ha Ucciso La Produzione

**Data**: 24/10/2026

**[Home](../index.md) | [Precedente](87-il-backup-che-non-e-mai-stato-testato.md)]**

---

C'è una verità nell'IT moderno che tutti conoscono ma nessuno rispetta: i feature flag sono una benedizione e una maledizione. Ti permettono di deployare senza rilasciare. Di testare in produzione senza rischi. Di abilitare e disabilitare feature con un click. Ma sono anche un coltello a serramanico. E se non stai attento, ti tagli. E se ti tagli, sanguini. E se sanguini, la produzione va giù. E se la produzione va giù, UL chiama. E se UL chiama, il tuo venerdì sera è finito. E tutto per un flag. Un fottuto flag booleano. Amen.

![](../../img/server.jpg)

---

**Venerdì - 18:00**

Era venerdì. Le 18:00. Stavo per staccare. Il weekend era a portata di mano.

Poi è arrivato l'errore.

**ALERT**: Error rate on api.produzione.com: 34%

**ME**: 34%?!

**TL**: È alto.

**ME**: È altissimo.

**TL**: E cosa è successo?

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
# Controlla errori recenti
kubectl logs -l app=api --since=10m | grep -i error | tail -20

2026-10-23 18:02:34 ERROR: TypeError: Cannot read property 'discount' of undefined
2026-10-23 18:02:35 ERROR: TypeError: Cannot read property 'discount' of undefined
2026-10-23 18:02:36 ERROR: TypeError: Cannot read property 'discount' of undefined
...
```

**ME**: TypeError. Discount undefined.

**TL**: Discount?

**ME**: Sì. Qualcosa cerca 'discount' su un oggetto undefined.

**TL**: E chi ha toccato il codice del discount?

**ME**: Non lo so. Controllo.

**TERMINALE**:
```
git log --oneline --since="1 day" --all -- "*discount*"
a1b2c3d JN: "Add premium discount feature flag"
```

**ME**: JN. Il junior.

**TL**: JN?!

**ME**: Sì. Ha aggiunto un feature flag per il discount premium.

**TL**: E QUANDO?!

**ME**: Ieri. Alle 17:45.

**TL**: IERI ALLE 17:45?!

**ME**: Sì. Prima del weekend.

**TL**: E HA DEPLOYATO DI VENERDÌ?!

**ME**: Sì.

**TL**: E NON HA TESTATO?!

**ME**: A quanto pare no.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Error rate: 34%
- Errore: TypeError discount undefined
- Autore: JN
- Data deploy: venerdì 17:45

E tutto era chiaro. JN aveva deployato di venerdì. Senza testare. E ora la produzione era a terra. E il mio weekend era finito. Amen.

---

**Venerdì - 18:15**

Ho chiamato JN. JN ha risposto.

**ME**: Hai deployato il feature flag del discount premium?

**JN**: Sì. Ieri.

**ME**: E l'hai testato?

**JN**: In staging sì. Funzionava.

**ME**: E IN PRODUZIONE?!

**JN**: Non ancora.

**ME**: E QUINDI?!

**JN**: E quindi... non so se funziona.

**ME**: NON FUNZIONA! LA PRODUZIONE È A TERRA!

**JN**: Oh.

**ME**: OH?!

**JN**: Scusa.

**ME**: SCUSA?! IL 34% DELLE RICHIESTE FALLISCE!

**JN**: E cosa facciamo?

**ME**: DISABILITO IL FEATURE FLAG!

**JN**: Ok.

**ME**: E POI PARLIAMO!

**JN**: Ok.

**ME**: E LA PROSSIMA VOLTA TESTI IN PRODUZIONE PRIMA DI ANDARTENE!

**JN**: Ma... è venerdì.

**ME**: APPUNTO! È VENERDÌ! NON DEPLOYARE DI VENERDÌ!

JN ha riattaccato. O forse ho riattaccato io. Non ricordo. Ricordo solo che guardavo il terminale. Il terminale mostrava:
- Error rate: 34%
- Feature flag: abilitato
- Autore: JN
- Lezione: non deployare di venerdì

E il venerdì sera era rovinato. Amen.

---

**Venerdì - 18:30**

Ho disabilitato il feature flag. Ho salvato la produzione.

**TERMINALE**:
```
# Disabilita feature flag
curl -X POST https://flags.produzione.com/api/v1/flags/premium-discount \
  -H "Authorization: Bearer $FLAG_TOKEN" \
  -d '{"enabled": false}'

{"status": "ok", "flag": "premium-discount", "enabled": false}

# Verifica error rate
kubectl logs -l app=api --since=2m | grep -i error | wc -l
0
```

**ME**: Disabilitato. Error rate a zero.

**TL**: E cosa è successo?

**ME**: Il feature flag era abilitato per tutti. Ma il codice non gestiva il caso undefined.

**TL**: E QUINDI?!

**ME**: E quindi quando un utente non aveva il campo 'premium', il codice crashava.

**TL**: E QUANTI UTENTI?!

**ME**: Il 34%. Quelli senza premium.

**TL**: E JN NON HA TESTATO QUESTO CASO?!

**ME**: No. Ha testato solo con utenti premium.

**TL**: E GLI UTENTI NORMALI?!

**ME**: Non li ha testati.

**TL**: E QUINDI?!

**ME**: E quindi... 34% di errori.

**TL**: E ORA?

**ME**: Ora il flag è disabilitato. E la produzione funziona.

**TL**: E JN?

**ME**: JN... parliamo lunedì.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Feature flag: disabilitato
- Error rate: 0%
- Produzione: stabile
- Weekend: rovinato

E tutto sembrava risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché le cose che sembrano risolte le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Venerdì - 19:00**

Ho guardato il codice. Ho capito il problema.

**TERMINALE**:
```
git show a1b2c3d --stat
commit a1b2c3d
Author: JN
Date:   Thu Oct 22 17:45:00 2026

    "Add premium discount feature flag"

    src/services/pricing.js | 15 +++++++++++++++

git show a1b2c3d -- src/services/pricing.js
+function applyPremiumDiscount(user, cart) {
+  if (flags.isEnabled('premium-discount')) {
+    const discount = user.premium.discount;  // <-- CRASH se user.premium è undefined
+    cart.total = cart.total * (1 - discount);
+  }
+  return cart;
+}
```

**ME**: Eccolo. user.premium.discount.

**TL**: E se user.premium non esiste?

**ME**: Crash. TypeError.

**TL**: E JN NON HA CONTROLLATO?!

**ME**: No. Ha dato per scontato che tutti gli utenti avessero premium.

**TL**: MA NON È VERO!

**ME**: No. Solo il 66% ha premium.

**TL**: E IL 34%?!

**ME**: Il 34% non ha premium. E crasha.

**TL**: E QUINDI?!

**ME**: E quindi... JN non ha pensato agli utenti normali.

**TL**: E PERCHÉ?!

**ME**: Perché JN è junior. E i junior non pensano ai casi limite.

**TL**: E CHI DOVREBBE PENSAVCI?!

**ME**: Il code review.

**TL**: E IL CODE REVIEW?!

**ME**: Il code review... non c'è stato.

**TL**: NON C'È STATO?!

**ME**: No. JN ha mergiato da solo.

**TL**: DA SOLO?!

**ME**: Sì. Senza review.

**TL**: E PERCHÉ?!

**ME**: Perché... non è obbligatorio.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Codice: buggato
- Review: nessuna
- Merge: da solo
- Deploy: venerdì 17:45

E tutto era chiaro. JN aveva mergiato senza review. Aveva deployato di venerdì. Senza testare. E la produzione era crashata. E il mio venerdì era finito. Amen.

---

**Sabato - La Riflessione**

Sabato. Ero a casa. Ma non riuscivo a smettere di pensare. Al feature flag. Al codice buggato. Al venerdì rovinato.

Ho aperto il laptop. Ho guardato il codice. Ho scritto la fix.

**TERMINALE**:
```
# Fix del codice
cat > /tmp/fix-pricing.js << 'EOF'
function applyPremiumDiscount(user, cart) {
  if (flags.isEnabled('premium-discount')) {
    // Fix: controlla che user.premium esista
    if (user.premium && user.premium.discount) {
      const discount = user.premium.discount;
      cart.total = cart.total * (1 - discount);
    }
  }
  return cart;
}
EOF

# Commit
git checkout -b fix/premium-discount-undefined
git add src/services/pricing.js
git commit -m "Fix: handle undefined user.premium in discount calculation"
git push origin fix/premium-discount-undefined
```

**TL**: (su Slack) Stai lavorando di sabato?

**ME**: Sì. Non riesco a smettere di pensarci.

**TL**: E cosa fai?

**ME**: Fixo il codice. E aggiungo test.

**TL**: E JN?

**ME**: JN... lo educo. Lunedì.

**TL**: E il code review?

**ME**: Il code review... lo rendo obbligatorio.

**TL**: E come?

**ME**: Configuro branch protection. Nessuno può mergiare senza review.

**TL**: E UL?

**ME**: UL... lo informo lunedì.

Il TL mi ha guardato. Attraverso Slack. Ma sentivo lo sguardo. Lo sguardo che diceva: "Stai lavorando di sabato per un bug di venerdì. E stai fixando il processo. E stai educando il junior. E stai proteggendo la produzione. Ma è sabato. E dovresti riposare. Amen."

---

**Lunedì - La Riunione**

Lunedì. Riunione. Con UL. E il CTO. E JN. Tutti a chiedere. Tutti a volere risposte.

**UL**: Com'è possibile che un feature flag abbia crashato la produzione?

**ME**: Il codice non gestiva il caso undefined.

**UL**: E chi l'ha scritto?

**ME**: JN.

**UL**: E chi l'ha approvato?

**ME**: Nessuno. JN ha mergiato da solo.

**UL**: DA SOLO?!

**ME**: Sì. Non c'è branch protection.

**UL**: E PERCHÉ?!

**ME**: Non l'abbiamo configurata.

**UL**: E IL CODE REVIEW?!

**ME**: Non è obbligatorio.

**UL**: E I TEST?!

**ME**: JN ha testato solo in staging. Con utenti premium.

**UL**: E GLI UTENTI NORMALI?!

**ME**: Non li ha testati.

**UL**: E QUINDI?!

**ME**: E quindi... 34% di errori.

**UL**: E IL COSTO?!

**ME**: Non lo so. Il PM lo sa.

**PM**: (entrando) Il costo di cosa?

**UL**: Del feature flag!

**PM**: Ah. I clienti hanno chiamato. 23 ticket. 5 hanno minacciato di andarsene.

**UL**: E IL COSTO?!

**PM**: Non lo so. Ma 5 clienti che se ne vanno sono 25.000€ al mese.

**UL**: 25.000€?!

**PM**: Sì. Se se ne vanno.

**CTO**: Basta. Il problema è che non c'è code review obbligatorio. E non c'è branch protection. E JN non ha testato tutti i casi. E ora mettiamo tutto.

**ME**: Sì.

**CTO**: E chi lo fa?

**ME**: Lo faccio io.

**CTO**: E quando?

**ME**: Oggi.

**CTO**: E JN?

**ME**: JN... lo educo.

**JN**: (imbarazzato) Scusa. Non succederà più.

**CTO**: E cosa hai imparato?

**JN**: A non deployare di venerdì. E a testare tutti i casi. E a chiedere code review.

**CTO**: E COS'ALTRO?

**JN**: A non dare per scontato che i dati ci siano.

**CTO**: E COS'ALTRO?

**JN**: A pensare agli utenti normali. Non solo a quelli premium.

**CTO**: Bene. E la prossima volta?

**JN**: La prossima volta... non deployo di venerdì.

**CTO**: E SE DEVI DEPLOYARE?

**JN**: Allora... chiedo review. E testo tutto. E aspetto lunedì per abilitare il flag.

**CTO**: Bene.

Il CTO mi ha guardato. Io guardavo JN. JN guardava il tavolo. Il tavolo era l'unico posto sicuro dove guardare. Perché tutti gli altri sguardi erano su di lui. E su di me. E sul processo rotto. E sul venerdì rovinato. Amen.

---

**Lunedì - La Branch Protection**

Lunedì. Ho configurato la branch protection. Per non avere più merge senza review.

**TERMINALE**:
```
# Configura branch protection su GitHub
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  -f required_status_checks='{"strict":true,"contexts":["ci/tests"]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1}'
```

**TL**: Hai configurato la branch protection?

**ME**: Sì.

**TL**: E cosa fa?

**ME**: Richiede almeno una review approvata per mergiare.

**TL**: E i test?

**ME**: I test devono passare.

**TL**: E gli admin?

**ME**: Anche gli admin devono rispettare le regole.

**TL**: E JN?

**ME**: JN non può più mergiare da solo.

**TL**: E SE JN HA BISOGNO DI DEPLOYARE URGENTE?

**ME**: Allora chiede review. E qualcuno approva.

**TL**: E SE NON C'È NESSUNO?

**ME**: Allora... aspetta.

**TL**: E SE È URGENTE?!

**ME**: Allora... mi chiama. E io approvo.

**TL**: E SE SEI IN VACANZA?

**ME**: Allora... c'è il TL.

**TL**: E SE SONO IN VACANZA ANCH'IO?!

**ME**: Allora... c'è il CTO.

**TL**: E SE IL CTO È IN VACANZA?!

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Branch protection: attiva
- Review obbligatoria: sì
- Test obbligatori: sì
- Admin: soggetti alle regole

E tutto sembrava ok. Ma le cose che sembrano ok sono le più pericolose. Perché le cose che sembrano ok le dimentichi. E le cose dimenticate ti perseguitano. Amen.

---

**Martedì - I Test**

Martedì. Ho aggiunto test. Per il feature flag. E per tutti i casi limite.

**TERMINALE**:
```
# Test per feature flag
cat > src/services/pricing.test.js << 'EOF'
describe('applyPremiumDiscount', () => {
  it('should apply discount for premium users', () => {
    const user = { premium: { discount: 0.1 } };
    const cart = { total: 100 };
    const result = applyPremiumDiscount(user, cart);
    expect(result.total).toBe(90);
  });

  it('should not crash for non-premium users', () => {
    const user = {};  // senza premium
    const cart = { total: 100 };
    const result = applyPremiumDiscount(user, cart);
    expect(result.total).toBe(100);  // nessuno sconto
  });

  it('should not crash for undefined premium', () => {
    const user = { premium: undefined };
    const cart = { total: 100 };
    const result = applyPremiumDiscount(user, cart);
    expect(result.total).toBe(100);
  });

  it('should not crash for null premium', () => {
    const user = { premium: null };
    const cart = { total: 100 };
    const result = applyPremiumDiscount(user, cart);
    expect(result.total).toBe(100);
  });

  it('should handle flag disabled', () => {
    flags.setEnabled('premium-discount', false);
    const user = { premium: { discount: 0.1 } };
    const cart = { total: 100 };
    const result = applyPremiumDiscount(user, cart);
    expect(result.total).toBe(100);  // flag disabilitato, nessuno sconto
  });
});
EOF

# Esegui test
npm test
PASS  src/services/pricing.test.js
  applyPremiumDiscount
    ✓ should apply discount for premium users (5ms)
    ✓ should not crash for non-premium users (1ms)
    ✓ should not crash for undefined premium (1ms)
    ✓ should not crash for null premium (1ms)
    ✓ should handle flag disabled (1ms)
```

**TL**: Hai aggiunto i test?

**ME**: Sì. Per tutti i casi limite.

**TL**: E cosa testano?

**ME**: Testano utenti premium, non-premium, undefined, null, e flag disabilitato.

**TL**: E JN?

**ME**: JN deve far passare questi test prima di mergiare.

**TL**: E SE I TEST NON PASSANO?

**ME**: Allora non può mergiare.

**TL**: E SE JN AGGIUNGE UN NUOVO CASO?

**ME**: Allora deve aggiungere un test.

**TL**: E SE NON LO FA?

**ME**: Allora il code review lo richiede.

**TL**: E SE IL REVIEWER NON LO NOTA?

**ME**: Allora... prega.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Test: 5 passing
- Casi coperti: tutti
- CI: configurato
- Merge: bloccato se test falliscono

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i test salvano. E che i casi limite uccidono. E che il venerdì non è per deployare. E che i feature flag sono coltelli. E che i junior vanno educati. E che il code review è obbligatorio. Amen.

---

**Mercoledì - L'Educazione**

Mercoledì. Ho educato JN. Non con rabbia. Con pazienza.

**ME**: JN, vieni qui.

**JN**: Sì?

**ME**: Siediti.

**JN**: (si siede) È per venerdì?

**ME**: Sì. E no.

**JN**: Cosa significa?

**ME**: Significa che venerdì è stato un disastro. Ma è anche stata un'opportunità.

**JN**: Un'opportunità?

**ME**: Sì. Per imparare.

**JN**: Imparare cosa?

**ME**: Tre cose. Primo: non deployare di venerdì.

**JN**: Ok.

**ME**: Secondo: testa tutti i casi. Non solo quelli che ti aspetti.

**JN**: Ok.

**ME**: Terzo: chiedi sempre code review. Anche se sei sicuro. Soprattutto se sei sicuro.

**JN**: Ok.

**ME**: E quarto: i feature flag sono pericolosi.

**JN**: Perché?

**ME**: Perché ti danno un senso di sicurezza falso. Pensi: "Se qualcosa va storto, disabilito il flag." Ma se il flag è abilitato di default, e il codice è buggato, la produzione crasha prima che tu possa disabilitarlo.

**JN**: E quindi?

**ME**: E quindi i feature flag devono essere disabilitati di default. E abilitati solo dopo aver testato.

**JN**: Ma... il mio flag era abilitato di default.

**ME**: Appunto.

**JN**: E quindi... ho sbagliato.

**ME**: Sì. Ma hai imparato.

**JN**: E ora?

**ME**: Ora... il codice è fixato. I test ci sono. La branch protection è attiva. E tu sai cosa fare.

**JN**: E se sbaglio di nuovo?

**ME**: Allora... il code review lo prende. O i test lo prendono. O la branch protection lo ferma.

**JN**: E se passa tutto?

**ME**: Allora... prega.

JN mi ha guardato. Io guardavo JN. JN guardava il terminale. Il terminale mostrava:
- Fix: mergiato
- Test: passing
- Branch protection: attiva
- Educazione: completata

E tutto era risolto. Ma le cose che sembrano risolte sono le più pericolose. Perché i junior sbagliano. E i senior sbagliano. E tutti sbagliano. E l'unico modo per non far crashare la produzione è avere processi. E test. E review. E pazienza. Amen.

---

**Giovedì - Il Feature Flag Corretto**

Giovedì. Ho corretto il feature flag. Per renderlo sicuro di default.

**TERMINALE**:
```
# Configura feature flag disabilitato di default
curl -X POST https://flags.produzione.com/api/v1/flags/premium-discount \
  -H "Authorization: Bearer $FLAG_TOKEN" \
  -d '{
    "enabled": false,
    "defaultVariation": "disabled",
    "variations": {
      "enabled": true,
      "disabled": false
    },
    "rules": [
      {
        "targeting": [{"name": "premium", "value": true}],
        "variation": "enabled"
      }
    ]
  }'
```

**TL**: Hai configurato il flag disabilitato di default?

**ME**: Sì.

**TL**: E cosa cambia?

**ME**: Il flag è disabilitato per tutti. Tranne per gli utenti premium.

**TL**: E se il codice è buggato?

**ME**: Allora solo gli utenti premium sono colpiti. Non tutti.

**TL**: E QUANTI SONO?

**ME**: Il 66%. Ma almeno non è il 100%.

**TL**: E SE IL BUG È NEL CALCOLO DEL DISCOUNT?

**ME**: Allora... solo gli utenti premium hanno lo sconto sbagliato.

**TL**: E GLI UTENTI NORMALI?

**ME**: Gli utenti normali non sono colpiti. Il flag è disabilitato per loro.

**TL**: E QUINDI?

**ME**: E quindi... il danno è limitato.

**TL**: E SE IL FLAG È ABILITATO PER TUTTI?

**ME**: Allora... il danno è totale.

**TL**: E QUINDI?

**ME**: E quindi... i flag devono essere disabilitati di default.

Il TL mi ha guardato. Io guardavo il terminale. Il terminale mostrava:
- Flag: disabilitato di default
- Targeting: solo premium
- Danno potenziale: limitato
- Sicurezza: aumentata

E tutto funzionava. Ma avevo imparato una lezione. La lezione che i feature flag devono essere sicuri di default. E che il targeting deve essere specifico. E che il default deve essere "off". E che "on" deve essere una scelta consapevole. Amen.

---

**Venerdì - La Documentazione**

Venerdì. Ho documentato. Per i posteri. Per i futuri sviluppatori che avrebbero dimenticato i feature flag.

```markdown
## Incident #FLAG-001: Il Feature Flag Che Ha Ucciso La Produzione

**Data incident**: Venerdì 23 ottobre 2026, 18:00
**Autore**: JN
**Feature flag**: premium-discount
**Problema**: TypeError per user.premium undefined
**Causa**: Codice non gestiva caso undefined, flag abilitato per tutti
**Autore del codice**: JN
**Data deploy**: Giovedì 22 ottobre 2026, 17:45
**Tempo in produzione**: ~24 ore
**Error rate**: 34%
**Richieste fallite**: ~12.000
**Clienti colpiti**: ~8.000
**Ticket aperti**: 23
**Chiamate ricevute**: 12
**Tempo di risoluzione**: 30 minuti
**Downtime**: 0 (feature disabilitata)
**Reazione UL**: "Com'è possibile?!"
**Reazione TL**: "JN ha mergiato da solo?!"
**Reazione CTO**: "Branch protection obbligatoria."
**Soluzione**: Flag disabilitato + fix codice + test + branch protection
**Lezione imparata**: I FEATURE FLAG DEVONO ESSERE DISABILITATI DI DEFAULT.

**Regole per i feature flag**:
1. I feature flag devono essere disabilitati di default.
2. I feature flag devono essere abilitati solo per target specifici.
3. Il codice deve gestire tutti i casi (undefined, null, ecc.).
4. I test devono coprire tutti i casi limite.
5. Il code review è obbligatorio.
6. Non deployare di venerdì.
7. Se deployi di venerdì, non abilitare il flag fino a lunedì.
8. I feature flag sono coltelli. Usali con cautela.
9. Il default è "off". "On" è una scelta consapevole.
10. Se non sei sicuro, chiedi.

**Come configurare feature flag sicuro**:
```bash
# Flag disabilitato di default
curl -X POST https://flags.produzione.com/api/v1/flags/my-feature \
  -d '{
    "enabled": false,
    "defaultVariation": "disabled",
    "rules": [
      {
        "targeting": [{"name": "beta-tester", "value": true}],
        "variation": "enabled"
      }
    ]
  }'
```

**Come gestire undefined nei feature flag**:
```javascript
// MAI così
if (flags.isEnabled('my-feature')) {
  const value = user.premium.discount;  // CRASH se undefined
}

// SEMPRE così
if (flags.isEnabled('my-feature')) {
  if (user.premium && user.premium.discount) {
    const value = user.premium.discount;
  }
}

// O così
const discount = user?.premium?.discount ?? 0;  // optional chaining + nullish coalescing
```

**Come configurare branch protection**:
```bash
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  -f required_pull_request_reviews='{"required_approving_review_count":1}'
```
```

Il TL ha letto la documentazione. Il TL ha sorriso. Il TL ha detto: "Quindi hai imparato che i feature flag sono pericolosi. E che devono essere disabilitati di default. E che il codice deve gestire undefined. E che i test salvano. E che il code review è obbligatorio. E che non si deploya di venerdì. E che JN ha imparato. E che la branch protection ferma i disastri. E che ora hai un sistema. E che ora funziona. E che la prossima volta non succede. O quasi. Amen."

**ME**: Sì. E la lezione più importante è questa: i feature flag sono come le armi. Ti danno potere. Ma il potere senza controllo è pericoloso. E se non hai test, e non hai review, e non hai branch protection, e non hai documentazione, allora il potere ti si ritorce contro. E la produzione crasha. E UL chiama. E il venerdì sera è rovinato. E tutto per un flag. Un fottuto flag booleano. Che costa zero euro. Ma che ti costa il weekend. Amen.

---

## Il costo del feature flag che ha ucciso la produzione

| Voce | Valore |
|------|--------|
| Feature flag | premium-discount |
| Autore | JN |
| Data deploy | 22/10/2026, 17:45 |
| Data incident | 23/10/2026, 18:00 |
| Tempo in produzione | ~24 ore |
| Error rate | 34% |
| Richieste fallite | ~12.000 |
| Clienti colpiti | ~8.000 |
| Ticket aperti | 23 |
| Chiamate ricevute | 12 |
| Tempo risoluzione | 30 minuti |
| Downtime | 0 (feature disabilitata) |
| Venerdì rovinato | 1 |
| Reazione UL | "Com'è possibile?!" |
| Reazione TL | "JN ha mergiato da solo?!" |
| Reazione CTO | "Branch protection obbligatoria." |
| Soluzione | Fix + test + branch protection + educazione |
| Lezione imparata | FLAG = DEFAULT OFF + TEST + REVIEW |
| **Totale** | **12.000 errori + 23 ticket + 1 venerdì rovinato + 1 junior educato** |

**Morale**: I feature flag sono una benedizione e una maledizione. Ti permettono di deployare senza rilasciare. Ma se non li configuri bene, rilasciano disastri. E se non testi tutti i casi, i casi limite ti uccidono. E se non hai code review, i bug arrivano in produzione. E se deployi di venerdì, il venerdì sera è rovinato. E se il flag è abilitato per tutti, tutti sono colpiti. E se il flag è disabilitato di default, solo chi deve essere colpito è colpito. E il default deve essere "off". Sempre. Amen.

---

## Commenti

I commenti vengono aggiunti quando e, più importante, se ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il tuo commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Home](../index.md) | [Precedente](87-il-backup-che-non-e-mai-stato-testato.md)]**
