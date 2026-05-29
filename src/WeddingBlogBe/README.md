# WeddingBlogBe

ASP.NET Core Web API per la gestione backend del wedding blog.

Il progetto segue un approccio vertical slice: ogni feature tiene vicini contratti, controller e logica applicativa. L'infrastruttura condivisa resta minima in `Data/` e nella configurazione del programma.

## Comandi

```bash
dotnet restore
dotnet run
```

## Endpoint iniziali

- `GET /` restituisce il nome dell'API.
- `GET /api/health` restituisce lo stato del servizio.
- `POST /api/auth/login` esegue login admin con ASP.NET Core Identity e cookie applicativo.
- `POST /api/auth/logout` esegue logout.
- `GET /api/auth/me` restituisce l'utente autenticato.
- `POST /api/rsvp` salva una risposta di partecipazione.
- `GET /api/rsvp` legge le risposte, protetto da login admin.

La policy CORS di sviluppo accetta richieste dalla Vite app su `http://localhost:5173` e consente credenziali cookie. Dal frontend le chiamate protette dovranno usare `credentials: "include"`.

Swagger UI e disponibile in sviluppo su `/swagger`.

## Sviluppo locale

In development viene usato SQLite con connection string `WeddingBlog.dev.db`. Il database locale e i relativi file WAL/SHM sono ignorati da git.

Le credenziali admin iniziali sono in `appsettings.Development.json` e vanno cambiate prima di qualsiasi deploy reale. In produzione vanno spostate su secret o variabili ambiente.

Gli script SQL manuali sono in `MigrationsSql/`.
