/************************************************************/
/************** middleware auth *****************************/
/************************************************************/
//importation du module de variable d'environnement
require('dotenv').config()
// variables d'environnement
const keyToken = process.env.KEY_TOKEN
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        // cas d'erreur pas de token
        if(!req.headers.authorization) throw "L'utilisateur n'est pas authentifié"
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, keyToken)
        //décode le userId
        const  userId = decodedToken.userId
        //décode si isAdmin
        const admin = decodedToken.admin
        // cas d'erreur décryptage token ne correspond pas à userId
        if( req.body.userId && req.body.userId !== userId) throw "User ID non valable`"
        else {
            req.auth= {userId, admin}
            next()
        }
    }catch (error) {
        res.status(401).json({ error : error})
    }
}

