# WeddingBlog

Wedding blog di Daniel e Linda, realizzato con React, Vite e Supabase.

## Struttura

```text
src/
  WeddingBlogApp/  # React + TypeScript + Vite
supabase/          # Script SQL per schema e policy Supabase
```

## Frontend

```bash
cd src/WeddingBlogApp
npm install
copy .env.example .env.local
npm run dev
npm run build
npm run lint
```

Configurare `.env.local` con:

```text
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

## Supabase

Il form RSVP pubblico e l'area amministrazione usano Supabase direttamente dal frontend tramite `@supabase/supabase-js`.

1. Applicare lo script `supabase/001_create_rsvp_schema.sql` dal SQL editor del progetto Supabase.
2. Creare l'utente admin in Supabase Auth con email/password.
3. Inserire lo user id dell'admin in `public.admin_users`, come indicato nel commento finale dello script SQL.

Le policy RLS permettono l'inserimento RSVP anonimo e limitano lettura, modifica e cancellazione agli utenti presenti in `public.admin_users`.
