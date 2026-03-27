# VantaDrop

## objectif du projet

l'objectif de ce projet c'est de faire une app web type case opening (inspire cs2), ou un joueur se connecte avec discord, achete des caisses, gagne des items aleatoires, et garde sa progression.

on voulait un truc simple mais fonctionnel, avec:

- auth discord
- items reels depuis une api sneakers
- systeme de box + proba de drop
- inventaire
- sauvegarde en bdd mysql

## fonctionnalites principales

### 1) connexion oauth discord

- connexion via discord oauth
- recup du profil (id, pseudo, avatar, email)
- redirection auto vers le dashboard

### 2) systeme profil joueur

- argent
- xp + niveau
- nb de caisses ouvertes
- inventaire d'items

### 3) systeme de caisses

- 3 caisses: bronze / silver / gold
- prix fixes:
	- bronze: 90
	- silver: 180
	- gold: 360

- systeme de proba par tranche de prix selon la box
- achat d'une box = deduction argent + gain item + ajout inventaire + +10 xp

### 4) animation d'ouverture (roulette)

- animation style case opening
- item gagne affiche en fin d'anim
- item gagne aligne sous la barre du milieu

### 5) integration api sneakers

- items recup depuis The Sneaker Database (RapidAPI)
- filtre strict pour garder que les items avec:
	- image valide
	- prix valide

### 6) sauvegarde mysql

- creation / lecture / update du profil joueur en mysql
- sync auto apres login et apres achat box
- fallback localstorage si api bdd indispo (pour eviter de bloquer le joueur)

## difficultes rencontrees + solutions

### 1) lier oauth discord et mysql

souci: au debut le profil en base etait pas bien sync, et parfois les valeurs de la bdd se faisaient ecraser par le local.

solution:

- d'abord lire le profil depuis mysql si il existe
- sinon creer le profil
- ensuite sync apres les actions importantes

on a fait des recherches sur internet pour trouver une approche propre et simple avec upsert (`insert ... on duplicate key update`).

### 2) animation roulette qui ne lancait pas tjr

souci: popup visible mais des fois la piste ne defilait pas.

solution:

- gestion du timing de rendu (`nextTick` + `requestAnimationFrame`)
- calcul du decalage exact avec les dimensions dom

### 3) item indispo au 1er clic

souci: parfois au 1er clic achat box, les items etaient pas encore charges.

solution:

- forcer un chargement des items avant achat si la liste est vide
- desactiver le bouton pendant chargement

### 4) systeme de proba box

souci: bien respecter les tranches de prix et les pourcentages, sans sortir des bornes "impossible".

solution:

- tirage par tranches avec poids
- selection random dans la tranche tiree
- exclusion stricte des prix interdits

### 5) inspiration animation

on s'est inspire de cette base:
https://stackoverflow.com/questions/72911789/make-csgo-case-opener-responsive-css

puis on l'a adapte en vue + js natif (sans jquery), avec nos items api et nos regles de drop.

## installation et lancement

### prerequis

- node.js
- npm
- xampp (apache + mysql)
- une app discord pour oauth
- une cle rapidapi (The Sneaker Database)

### 1) installer les deps

```bash
npm install
```

### 2) config front (`.env`)

cree un fichier `.env` a la racine:

```env
VITE_DISCORD_CLIENT_ID=
VITE_DISCORD_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_RAPIDAPI_KEY=
VITE_API_URL=http://localhost:3001
```

et dans ton app discord ajoute cette redirect uri:

```text
http://localhost:5173/auth/callback
```

### 3) config bdd (`.env.api`)

copie `.env.api.example` en `.env.api` puis adapte:

```env
API_PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=vantadrop
```

### 4) creer la base

1. demarre apache + mysql dans xampp
2. cree la base `vantadrop` dans phpmyadmin
3. importe `backend/vantadrop.sql`

### 5) lancer le backend api

```bash
npm run api
```

### 6) lancer le front

```bash
npm run dev
```

### 7) build prod

```bash
npm run build
```
