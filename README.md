# paris clim

Spots climatisés à Paris — cafés, restos, bars et refuges frais.

Idée née avec [Evel](https://www.instagram.com/itsevel/) · palette rose / rose pâle / blanc glacé.

## Stack

- Vite + React + TypeScript + Tailwind
- [React Bits](https://reactbits.dev/) (Aurora, BlurText, FadeContent)
- Supabase (Postgres + RLS)
- Leaflet (carte)
- Prêt pour Vercel

## Setup local

```bash
npm install
cp .env.example .env
# remplir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
npm run dev
```

## Variables d’environnement

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé anon / publishable |

Sur Vercel : Project Settings → Environment Variables → les mêmes clés.

## Modération

Les suggestions arrivent en `status = pending`. Pour les publier, passe le statut à `approved` dans le [Table Editor Supabase](https://supabase.com/dashboard/project/auzhhdktmaryxqmykijq/editor).

## Scripts

```bash
npm run dev      # local
npm run build    # production
npm run preview  # preview du build
```
