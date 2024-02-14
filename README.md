# Projet Tutoré : Flucks (flux vidéo)

### Membres du groupe :
- Jules Steelandt
- Nathan Melbeck
- Nicolas Bernardet
- Emilien Hergott

## Sujet :

Voici un lien qui présente le sujet : [Flucks - Flux Vidéo](https://fluxvideocms.000webhostapp.com/)

## Installation du projet en local :

Tout d'abord, rendez-vous dans le dossier docker, il vous faudra créer 2 fichiers .env
```bash
cd docker
```

**Fichier db.env**

```
POSTGRES_DB=db
POSTGRES_USER=user
POSTGRES_PASSWORD=pswrd
```
**Fichier .env.local**
```
#Postgres
POSTGRES_DB=db
POSTGRES_USER=user
POSTGRES_PASSWORD=pswrd

#Prisma
DATABASE_URL="postgresql://user:pswrd@localhost:35302/db?schema=public"

#JWT et cookies
NEXT_PUBLIC_JWT_SECRET=jwtSecret
NEXT_PUBLIC_JWT_COOKIE=jwtCookie

#Bcrypt
BCRYPT_SALT=mySalt
```

Vous pouvez ensuite exécuter la commande
```bash
docker compose up -d
```

Une fois cela fait, rendez-vous dans ``/api``
à l'intérieur, installez d'abord les dépendances avec 
```bash
cd ../api 
npm install
```

Puis vous pouvez vous rendre dans ``/prisma`` et créer le fichier .env
```
DATABASE_URL="postgresql://user:pswrd@localhost:35302/db?schema=public"
```
puis exécutez les commandes
```bash
npx prisma migrate dev
npx prisma db seed
```
pour initialiser la base de données avec des données déjà générées.

Il faut ensuite créer un fichier config.js dans le dossier ``/api`` avec le contenu suivant :
```javascript
const config = {
  database: {
    host: "localhost", 
    port: 35302, 
    user: "user", 
    password: "pswd", 
    database: "db", 
  },
  jwt: {
    secret: "secret", 
    expiresIn: "30d", 
  },
};
export default config;
```


Dans le dossier ``/api``, vous pouvez maintenant exécuter la commande
``npm run dev`` et acceder aux routes

```bash
cd ../application
npm install
```

L'application sera désormais accessible