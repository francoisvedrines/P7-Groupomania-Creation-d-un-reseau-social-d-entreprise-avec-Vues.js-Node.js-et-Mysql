# Projet 7 - Groupomania !

7ème et dernier projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. Les principaux outils utilisés pour ce projet:

-   VueJs + vuex + axios 
-   NodeJs + express + mysql


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

## Backend

Mettre dans le dossier backend le fichier .env qui à été fourni.

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

```
npm install

```

puis

```
npm run start

```

## Base de données

Se connecter au serveur MySql. Exécuter la commande mysql:  `CREATE DATABASE groupomania;`   puis importer le fichier groupomania.sql qui à été fourni en inscrivant dans un terminal:

```
mysql -u root -p groupomania < [path]groupomania.sql

```

Il faut remplacer  [path]  par le chemin du fichier dans votre machine. 

Les paramètres de la bdd, si besoin de les personnaliser, sont chargés dans le fichier .env dans le dossier backend,  qui est sur le repository exceptionnellement pour la soutenance.