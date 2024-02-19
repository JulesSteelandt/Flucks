# Liste des Routes

## Utilisateurs

- **POST** `/users/signin`
    - *Options*: 
        - `email` : email de l'utilisateur
        - `password` : mot de passe de l'utilisateur


- **POST** `/users/signup`
    - *Options*:
        - `email` : email de l'utilisateur
        - `password` : mot de passe de l'utilisateur
        - `pseudo` : nom d'utilisateur


- **POST** `/users/follow`
    - *Options*:
      - *Headers*: 
          - `Authorization` : Token de l'utilisateur
        - *Body*:
            - `email` : email de la chaine à suivre
            - `abonne` : boolean, true pour follow, false pour unfollow


- **GET** `/users/video`
    - *Options*:
      - *Headers*: 
          - `Authorization`: Token de l'utilisateur
      
- **GET** `/users/abonnement`
    - *Options*:
        - *Headers*: 
            - `Authorization`: Token de l'utilisateur

## Diffusions

- **GET** `/diffusions`
    - *Options*:
- **GET**, **PATCH** `/diffusions/:id`
    - *Options*:
- **POST** `/diffusions/create`
    - *Options*:
- **POST** `/diffusions/like`
    - *Options*:
- **POST** `/diffusions/commentaire`
    - *Options*:
- **PATCH** `/diffusions/public`
    - *Options*:
- **PATCH** `/diffusions/stop`
    - *Options*:
- **DELETE** `/diffusions/delete`
    - *Options*:

## Géolocalisation

- **GET** `/geolocalisation`
    - *Options*:

## Autres

- **GET** `/`
