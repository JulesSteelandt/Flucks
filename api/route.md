# Liste des Routes

## Utilisateurs

- **POST** `/users/signin` : connexion
    - *Options*: 
        - `email` : email de l'utilisateur
        - `password` : mot de passe de l'utilisateur


- **POST** `/users/signup` : inscription
    - *Options*:
        - `email` : email de l'utilisateur
        - `password` : mot de passe de l'utilisateur
        - `pseudo` : nom d'utilisateur


- **POST** `/users/follow` : suivre ou ne plus suivre une chaine
    - *Options*:
      - *Headers*: 
          - `Authorization` : Token de l'utilisateur
        - *Body*:
            - `email` : email de la chaine à suivre
            - `abonne` : boolean, true pour follow, false pour unfollow


- **GET** `/users/video` : liste des vidéos de l'utilisateur
    - *Options*:
      - *Headers*: 
          - `Authorization`: Token de l'utilisateur
      

- **GET** `/users/abonnement` : liste des chaines suivies par l'utilisateur
    - *Options*:
        - *Headers*: 
            - `Authorization`: Token de l'utilisateur

## Diffusions

- **GET** `/diffusions` : liste des diffusions et live en public


- **GET** `/diffusions/:id` : détails d'une diffusion
    - *Options*:
        - *Optionnel*:
          - *Headers*: 
              - `Authorization`: Token (permet de savoir si l'utilisateur connecté à like et est abonné)


- **PATCH** `/diffusions/:id` : modifier une diffusion
    - *Options*:
        - *Headers*: 
            - `Authorization`: Token
        - *Optionnel*:
            - `titre` : titre de la diffusion
            - `description` : description de la diffusion
          

- **POST** `/diffusions/create` : créer une diffusion
    - *Options*:
        - *Headers*: 
            - `Authorization`: Token
        - *Body*:
            - `titre` : titre de la diffusion
            - `direct` : boolean savoir si la diffusion est en direct
            - `urgence` : boolean savoir si la diffusion est en mode urgence
            - *Optionnel*:
                - `description` : description de la diffusion
                - `geolocalisation` : objet json contenant les coordonnées de la diffusion {
                  -     latitude, longitude
                }
                - `tag` : tableau de tag de la diffusion


- **POST** `/diffusions/like/:id` : liker ou unliker une diffusion
    - *Options*:
        - *Headers*:
            - `Authorization`: Token
        - *Body*:
            - `like` : boolean, true pour liker, false pour unliker

    
- **POST** `/diffusions/commentaire/:id` : commenter une diffusion
    - *Options*:
        - *Headers*:
            - `Authorization`: Token
        - *Body*:
            - `commentaire` : commentaire de l'utilisateur


- **PATCH** `/diffusions/public/:id` : rendre une diffusion public
    - *Options*:
        - *Headers*:
            - `Authorization`: Token


- **PATCH** `/diffusions/stop/:id` : arrêter une diffusion en direct
    - *Options*:
        - *Headers*:
            - `Authorization`: Token


- **DELETE** `/diffusions/delete/:id` : supprimer une diffusion
    - *Options*:
        - *Headers*: 
            - `Authorization`: Token
        

## Géolocalisation

- **GET** `/geolocalisation` : affiche la localisation des lives en cours 

## Autres

- **GET** `/` affiche les différentes routes
