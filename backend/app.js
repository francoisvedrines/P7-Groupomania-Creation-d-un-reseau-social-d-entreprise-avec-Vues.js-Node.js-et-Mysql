/************************************************************/
/************************ app *******************************/
/************************************************************/

//importation des modules nécessaires
const express = require('express')
//module pour travailler dans des dossiers
const path = require('path')
// sécurité: paramètrage en-tête http
const helmet = require('helmet')
// sécurité: empèche l'usage de caractères dans les saisies pour attaque par injection
const mongoSanitize = require('express-mongo-sanitize')

//import connexion a la DB
const mysql = require('./db.mysql')
//importation du module de variable d'environnement
require('dotenv').config()

//importation des fichiers de routing
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const likeRoutes = require('./routes/like')

// création de l'application express
const app = express()
app.use(express.json())


//déclaration des autorisations
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//ajout de modules de sécurité    
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(mongoSanitize())


app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
module.exports = app