# WeddingBlogApp

Scheletro React + TypeScript + Vite per il wedding blog di Daniel e Linda, accessibile tramite invito.

## Identita evento

- Sposi: Daniel e Linda.
- Data: 28 agosto 2027.
- Palette iniziale: bianco, verde salvia e oro.

## Esperienza prevista

- Prima schermata full-screen con foto introduttiva, nomi e data.
- Sezione dedicata al video save the date.
- Pulsante di ingresso verso una pagina a scorrimento verticale.
- Sezioni iniziali per countdown, programma della giornata e RSVP.
- In futuro: login tramite invito, dati personalizzati per ospite, gestione partecipanti, preferenze alimentari e album.

## Video save the date

Il componente video punta a:

```text
src/WeddingBlogApp/public/media/save-the-date.mp4
```

Per ora il file non e incluso nel repo. Quando sara pronto, conviene metterlo in `src/WeddingBlogApp/public/media/` se resta un asset statico servito da Vite. Se il video sara pesante o dovra essere protetto, meglio usare storage esterno/CDN con URL firmati dopo il login invito.

Il poster provvisorio punta a:

```text
src/WeddingBlogApp/public/save-the-date-poster.jpg
```

## Librerie candidate

- `framer-motion`: animazioni e transizioni tra sezioni in stile Apple.
- `lucide-react`: icone leggere e coerenti per pulsanti e micro UI.
- `react-hook-form` + `zod`: RSVP robusto con validazione.
- `react-router`: routing quando introdurremo invito/login e pagine dedicate.

Lo scheletro attuale evita dipendenze extra per partire subito; possiamo aggiungerle quando definiamo la direzione visuale.

## Struttura React

```text
src/
	components/
		sections/   # sezioni principali della pagina
		ui/         # componenti riusabili, come Reveal
	data/         # contenuti evento, timeline e FAQ
	hooks/        # hook React per countdown e scroll reveal
```

Le animazioni e gli stati UI sono gestiti con React state/hooks. Redux Toolkit sarebbe valutabile solo se piu avanti avremo stato condiviso complesso tra inviti, RSVP, autenticazione e dashboard.

## Comandi

```bash
cd src/WeddingBlogApp
npm install
copy .env.example .env.local
npm run dev
npm run build
npm run lint
```

## Supabase

L'app usa Supabase per salvare le risposte RSVP e autenticare l'area amministrazione. Configurare `.env.local` partendo da `.env.example`:

```text
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Applicare lo script SQL in `../../supabase/001_create_rsvp_schema.sql` dal SQL editor Supabase, poi creare l'utente admin in Supabase Auth e inserire il suo `user_id` nella tabella `public.admin_users`.

RSVP e amministrazione sono gestiti direttamente tramite Supabase.
