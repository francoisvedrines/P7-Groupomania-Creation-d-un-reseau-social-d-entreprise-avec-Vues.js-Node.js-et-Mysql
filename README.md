# Projet 7 - Groupomania !

7ème et dernier projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. Les principaux outils utilisés pour ce projet:

-   VueJs + vuex + axios 
-   NodeJs + express + mysql


## Base de données

Se connecter au serveur MySql. Exécuter la commande mysql:  `CREATE DATABASE groupomania;`   puis importer le fichier .sql qui à été fourni en inscrivant dans un terminal:

```
mysql -u root -p groupomania < [path]Vedrines_Francois_P7_bdd_092022.sql

```

Il faut remplacer [path]  par le chemin du fichier dans votre machine. 

Les paramètres d'accès a la base de données, si besoin de les personnaliser, sont chargés dans le fichier .env dans le dossier backend.


## Backend

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

```
npm install

```

puis

```
npm run start

```



## Frontend

Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

```
npm install

```

puis

```
npm run dev

```

si le navigateur ne s'ouvre pas automatiquement allez à :

-   http://127.0.0.1:5173/