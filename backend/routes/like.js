/************************************************************/
/***************** routes like  *****************************/
/************************************************************/
const express = require('express')
const router = express.Router()

//module de gestion d'authentification
const auth = require('../middleware/auth')


const likeCtrl = require('../controllers/like')


router.post('/', auth, likeCtrl.like)


module.exports = router