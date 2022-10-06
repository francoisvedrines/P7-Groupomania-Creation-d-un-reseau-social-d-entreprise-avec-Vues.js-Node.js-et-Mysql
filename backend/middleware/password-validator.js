/************************************************************/
/************* middleware password validator*****************/
/************************************************************/

const passwordValidator = require('password-validator')

//création du schéma de mot de passe
const schemaPassword = new passwordValidator()

schemaPassword
.is().min(8)
.is().max(20)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().symbols()
.has().not().spaces()

module.exports = (req, res, next) => {
    if(schemaPassword.validate(req.body.password)){
        next()
    }else{
        return res.status(400).json({error : `Le mot de passe doit contenir entre 8 et 20 caractères, au moins une majuscule, une minuscule, un chiffre un caractère spécial et les espaces ne sont pas autorisés `})
    }
}