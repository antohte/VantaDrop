# VantaDrop

A Vue.js project built with Vite.

## Environment variables

Crée un fichier `.env` a la racine et mets ça :

- `VITE_DISCORD_CLIENT_ID` (obligatoire)
- `VITE_DISCORD_REDIRECT_URI` (optionnel, sinon ça prend `/auth/callback` auto)
- `VITE_RAPIDAPI_KEY` (obligatoire pour charger les sneakers)

Exemple en local :

```
VITE_DISCORD_CLIENT_ID=TON_CLIENT_ID_DISCORD
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_RAPIDAPI_KEY=TA_CLE_RAPIDAPI
```

Ds ton app discord, ajoute exactement cette redirect URI :

```
http://localhost:5173/auth/callback
```

## API sneakers (The Sneaker Database)

1. il faut aller sur RapidAPI et s'abonner à The Sneaker Database.
2. copie ta clé RapidAPI.
3. colle-la dans `.env` sur `VITE_RAPIDAPI_KEY`.
4. redémarre le serveur (`npm run dev`).

les sneakers (photo, nom, prix) se chargent automatiquement dans le dashboard

## Axios (comme au cours)

- Config globale Axios dans `src/services/apiClient.js`
- Requête GET dans `src/services/sneakerDb.js` avec `try...catch`
- Données utilisées dans `src/views/Dashboard.vue`

## Getting Started

Install dependencies:
```
npm install
```

Run development server:
```
npm run dev
```

Build for production:
```
npm run build
```
