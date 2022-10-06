/************************************************************/
/***************** routes comment ***************************/
/************************************************************/
const express = require('express')
const router = express.Router()

//module de gestion d'authentification
const auth = require('../middleware/auth')


const commentCtrl = require('../controllers/comment')

router.get('/:post', auth, commentCtrl.getComments)
router.post('/:post', auth, commentCtrl.createComment)
router.put('/:id', auth, commentCtrl.modifyComment)
router.delete('/:id', auth, commentCtrl.deleteComment)


module.exports = router