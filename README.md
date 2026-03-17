# VantaDrop

A Vue.js project built with Vite.

## Environment variables

Crée un fichier `.env` a la racine et mets ça :

- `VITE_DISCORD_CLIENT_ID` (obligatoire)
- `VITE_DISCORD_REDIRECT_URI` (optionnel, sinon ça prend `/auth/callback` auto)

Exemple en local :

```
VITE_DISCORD_CLIENT_ID=TON_CLIENT_ID_DISCORD
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/auth/callback
```

Ds ton app discord, ajoute exactement cette redirect URI :

```
http://localhost:5173/auth/callback
```

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
