# Progetto INGSW: Ratatouille23

## Funzionalità di sistema
- Amministrazione di un'attività di ristorazione, con gestione gerarchica di
  ruoli (administrator, supervisor, waiter, cook).
- Inserimento manuale (e/o parzilamente automatizzato tramite
  [OpenFoodFacts](https://world.openfoodfacts.org/) di pietanze, complete di descrizione, prezzo e allergeni.
- Visualizzazione (e confronto) del rendimento dei singoli cuochi mediante
  l'utilizzo di grafici [Nivo](https://nivo.rocks/).
- Creazione, nonchè gestione, di comande che quindi vengono trasmesse alla
  cucina.
- Inserimento e visualizzazione di notifiche di sistema *globali*, che cioè
  possono essere visualizzate da tutti i dipendenti.
- Gestione completa, tramite websockets, in real-time del sistema, per
  notifiche, e aggiornamenti live di ordini e modifiche varie. 

## Tecnologie utilizzate
- [Java 17 Spring](https://spring.io/) per il back-end.
- [React](https://react.dev/), [Nginx](https://www.nginx.com/) per il front-end.
- [Postgres DBMS](https://www.postgresql.org/).
- [Docker](https://www.docker.com/) per velocizzarne il deployment delle varie componenti su macchine
  remote.

Il progetto è inoltre completo di documentazione in lualatex.

## Contributori
| [Ciro Amato](https://github.com/DrKGD)<br/> N86002525 |  <img src="https://avatars.githubusercontent.com/u/44092476?v=4" width="80"/> | <img width="40"/> | <img src="https://avatars.githubusercontent.com/u/36681316?v=4" width="80"/> | [Vincenzo Lombardi](https://github.com/Zen920) <br/> N86002753 |
| :--- | :---: | :---: | :---: |  ---: |

