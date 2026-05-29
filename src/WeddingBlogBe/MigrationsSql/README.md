# SQL migrations

Questa cartella contiene script SQL manuali da copiare e incollare quando il database sara pronto.

## Ordine

1. `001_create_identity_and_rsvp_sqlite.sql`

Lo script crea le tabelle ASP.NET Core Identity e la tabella `RsvpResponses` per SQLite. In sviluppo l'app usa comunque `EnsureCreatedAsync`, quindi il database locale puo nascere automaticamente; gli script restano qui come riferimento operativo/manuale.

L'utente admin di sviluppo viene creato dall'app tramite `IdentitySeed` in `appsettings.Development.json`, perche l'hash della password viene generato da ASP.NET Core Identity.
