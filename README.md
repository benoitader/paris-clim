# paris clim

Spots climatisés à Paris — cafés, restos, bars et refuges frais.

## Stack

- Vite + React + TypeScript + Tailwind
- [React Bits](https://reactbits.dev/)
- Supabase (Postgres + RLS + Edge Function)
- Leaflet
- Vercel

## Setup local

```bash
npm install
cp .env.example .env
# remplir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
npm run dev
```

## Variables

| Variable | Où | Description |
|----------|-----|-------------|
| `VITE_SUPABASE_URL` | Frontend / Vercel | URL projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Frontend / Vercel | Clé anon |

## Modération

Page discrète (non liée dans le menu) : `/admin`  
Protégée par un code d’accès (stocké côté Supabase, table `app_secrets`, lisible uniquement en service role).  
Edge Function `moderate` : lister / approuver / refuser les suggestions `pending`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```
