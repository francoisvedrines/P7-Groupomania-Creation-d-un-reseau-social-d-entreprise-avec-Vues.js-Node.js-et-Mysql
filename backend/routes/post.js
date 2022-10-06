/************************************************************/
/***************** routes post  *****************************/
/************************************************************/
const express = require('express')
const router = express.Router()

//module de gestion d'authentification
const auth = require('../middleware/auth')
//module de gestion de fichier
const multer = require('../middleware/multer-post')

const postCtrl = require('../controllers/post')


router.get('/', auth, postCtrl.getAllPosts)
router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, multer, postCtrl.deletePost)



module.exports = router