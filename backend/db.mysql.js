/*************************************************/
/***********  base de donnée mySQL ***************/


const mysql = require('mysql2')

//importation du module de variable d'environnement
require('dotenv').config()

// variables d'environnement
const DATABASE = process.env.DB_DATABASE
const NAME = process.env.DB_NAME
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST


//connection a la base de donnée mySQL
//démarrage serveur avec test DB
const dbMysql = mysql.createConnection({
  host: HOST,
  database: DATABASE,
  user: NAME,
  password: PASSWORD
})

dbMysql.connect(function (err) {
  if (err) {
    console.log(`erreur de connexion: ${err}`)
  } else {
    console.log(`Connecté à la base de données MySQL groupomania`)
  }
})

module.exports = dbMysql