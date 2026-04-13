# Il Monitoraggio

**Data**: 28/06/2026

**[Storie 2026](index.md) | [Precedente](17-il-vecchio-sistema.md) | [Prossima](19-il-nuovo-assunto.md)**

---

Il monitoraggio è come un allarme antincendio. Serve a dirti quando c'è un incendio. Ma se suona ogni 5 minuti per un toast bruciato, smetti di ascoltarlo. E quando c'è un vero incendio, non lo senti.

![](../../img/monitoraggio.jpg)

Il nostro sistema di monitoraggio è stato configurato da Bob. Nel 2019. Bob se n'è andato nel 2020. Il monitoraggio è ancora lì. Configurato come l'ha lasciato Bob.

Il monitoraggio manda alert. Molti alert. Tantissimi alert.

---

**Lunedì:**

07:00 - Alert: CPU sopra 80% su server PROD-01
07:05 - Alert: CPU sopra 80% su server PROD-01 (risolto)
07:10 - Alert: Memoria sopra 90% su server DB-01
07:15 - Alert: Memoria sopra 90% su server DB-01 (risolto)
07:20 - Alert: Disco sopra 85% su server BACKUP-01
07:25 - Alert: Disco sopra 85% su server BACKUP-01 (risolto)
08:00 - Alert: Servizio Apache down su server WEB-01
08:01 - Alert: Servizio Apache up su server WEB-01
08:30 - Alert: Latenza rete sopra 100ms
08:35 - Alert: Latenza rete sotto 100ms
09:00 - Alert: CPU sopra 80% su server PROD-02
09:05 - Alert: CPU sopra 80% su server PROD-02 (risolto)
...

**Totale alert lunedì: 847**

---

Ho fatto i conti.

**Alert per giorno:** ~850
**Alert per settimana:** ~4.250
**Alert per mese:** ~17.000
**Alert per anno:** ~204.000

**Alert che richiedono intervento:** ~5
**Alert che sono falsi positivi:** ~203.995
**Percentuale falsi positivi:** 99.998%

**Tempo per leggere un alert:** 5 secondi
**Tempo totale per leggere alert:** 17 minuti al giorno
**Tempo totale per anno:** 85 ore

**Costo:** 85 ore × 50 euro = 4.250 euro all'anno. Per leggere alert inutili.

---

Un giorno, ho chiamato UL.

"Dobbiamo sistemare il monitoraggio."

"Perché?"

"Manda troppi alert."

"E qual è il problema?"

"Il problema è che nessuno li legge più."

"E perché?"

"Perché sono tutti falsi positivi."

"E allora?"

"Allora quando c'è un vero problema, non ce ne accorgiamo."

"E come fai a saperlo?"

"Perché l'altro giorno il server PROD-03 è andato giù per 2 ore. E nessuno se n'è accorto."

"Perché non è arrivato l'alert?"

"L'alert è arrivato. Ma nessuno l'ha letto."

"Perché?"

"Perché arrivano 850 alert al giorno. E quello vero era il numero 847. Tra il falso positivo sulla CPU e il falso positivo sulla memoria."

"E allora?"

"Allora dobbiamo ridurre i falsi positivi."

"E come?"

"Configurando meglio le soglie."

"E quanto costa?"

"Niente. Solo tempo."

"E quanto tempo?"

"Una settimana."

"E non c'è tempo."

"Allora i falsi positivi continuano."

"E continuiamo a non accorgerci dei problemi veri."

"Esatto."

UL ha guardato il nulla. Poi ha detto: "Ma l'alert è arrivato?"

"Sì."

"Allora il monitoraggio funziona."

"Ma nessuno l'ha letto."

"Questo è un problema delle persone. Non del monitoraggio."

---

## Il giorno che il monitoraggio morì

Il 20 giugno 2026, alle 03:00, il server principale è andato giù.

Il monitoraggio ha mandato 47 alert. In 5 minuti.

- Alert: Server PROD-01 non risponde
- Alert: CPU 0% su server PROD-01
- Alert: Memoria 0% su server PROD-01
- Alert: Disco non accessibile su server PROD-01
- Alert: Servizio database down
- Alert: Servizio web down
- Alert: Servizio API down
- ...

Nessuno li ha letti. Perché erano le 03:00. E perché arrivano 850 alert al giorno. E perché il numero 847 era uguale al numero 848. E al numero 849. E a tutti gli altri.

Alle 08:00, i clienti hanno iniziato a chiamare.

"Il sistema non funziona!"

"Lo so, stiamo controllando."

"E da quando non funziona?"

"Non lo so. Da quando è arrivato l'alert."

"E quando è arrivato?"

"Alle 03:00."

"E perché non avete fatto nulla?"

"Perché non l'abbiamo letto."

"E perché?"

"Perché arrivano troppi alert."

"E allora?"

"Allora non li leggiamo più."

---

Il server è rimasto giù per 5 ore. Dalle 03:00 alle 08:00.

Costo: 200.000 euro di transazioni non processate.

Costo di configurare meglio il monitoraggio: 0 euro. Solo una settimana di tempo.

Costo di non farlo: 200.000 euro. In una notte.

---

## La sindrome dell'allarme

È come l'allarme della macchina. Quello che suona ogni volta che passa un gatto. O il vento. O una foglia.

All'inizio, guardi. Controlli. Ti preoccupi.

Poi, dopo 100 falsi allarmi, smetti. Ignori. Non ti importa più.

E quando qualcuno ruba davvero la macchina, l'allarme suona. Ma tu non lo senti. Perché hai smesso di ascoltare.

Il monitoraggio è uguale. Troppe notifiche = nessuna notifica.

---

## Dopo l'incidente

UL mi ha chiamato.

"Dobbiamo sistemare il monitoraggio."

"Sì, l'avevo detto 6 mesi fa."

"E perché non l'abbiamo fatto?"

"Perché non c'era tempo."

"E adesso?"

"Adesso c'è tempo. Perché abbiamo perso 200.000 euro."

"E quanto serve?"

"Una settimana."

"E fallo."

Ho passato una settimana a configurare il monitoraggio. Ho alzato le soglie. Ho eliminato i falsi positivi. Ho creato regole intelligenti.

Alla fine, il monitoraggio mandava 5 alert al giorno. Solo quelli veri.

**Costo:** 0 euro. Solo tempo.
**Risultato:** Alert che si leggono. Problemi che si risolvono.

---

## Una settimana dopo

UL mi ha chiamato.

"Il monitoraggio non funziona."

"Perché?"

"Non manda più alert."

"Sì, ne manda. Solo quelli veri."

"E come faccio a sapere che funziona?"

"Quando c'è un problema, ricevi un alert."

"E se non ci sono problemi?"

"Allora non ricevi alert."

"E come faccio a sapere che il monitoraggio funziona?"

"Perché quando c'è un problema, ricevi un alert."

"Ma se non ci sono problemi?"

"Allora non ci sono problemi."

"E come faccio a saperlo?"

"Perché non ricevi alert."

"Ma se il monitoraggio è rotto?"

"Allora non ricevi alert nemmeno quando ci sono problemi."

"E come faccio a distinguere?"

"Non puoi. A meno che tu non abbia un sistema di heartbeat."

"E cos'è?"

"Un alert che ti dice che il monitoraggio funziona."

"E quanto costa?"

"Niente. Solo configurazione."

"E fallo."

Ho configurato un heartbeat. Ogni ora, il monitoraggio manda un messaggio: "Sono vivo."

**Risultato:** 24 alert al giorno. Per dire che funziona.

**Totale alert:** 24 (heartbeat) + 5 (veri) = 29 al giorno.

Meno di 850. Ma più di 5.

E UL è contento. Perché "vede che il monitoraggio funziona".

Anche se l'heartbeat è inutile. Come il monitoraggio prima. Ma con meno alert.

---

## Morale della storia

Il monitoraggio serve a qualcosa solo se è utile. Se manda troppe notifiche, diventa rumore. E il rumore si ignora.

Ma le aziende non lo capiscono. Vogliono "più monitoraggio". "Più alert". "Più controllo".

E ottengono meno. Meno attenzione. Meno reazione. Meno sicurezza.

Perché quando tutto è urgente, nulla è urgente.

E quando tutto è un alert, nulla è un alert.

---

## Commenti

I commenti vengono aggiunti **quando** e, più importante, **se** ho tempo di moderarli dopo aver rimosso Spam, Cazzate, Phishing e simili. Quindi non trattenete il respiro. E se il vostro commento non appare, probabilmente è perché non ne valeva la pena.

---

**[Storie 2026](index.md) | [Precedente](17-il-vecchio-sistema.md) | [Prossima](19-il-nuovo-assunto.md)**
