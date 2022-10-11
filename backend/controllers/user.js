/************************************************************/
/************** Controller user *****************************/
/************************************************************/
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()

const mysql = require('../db.mysql')

// variables d'environnement
const keyToken = process.env.KEY_TOKEN


//fonction de création d'un compte
exports.signup = (req, res) => {
    console.log(req.body)
    const { email, password, firstname, lastname } = req.body
    //controle si formulaire entierement rempli
    if (!email || !password || !firstname || !lastname)
        return res.status(401).json({ message: "La saisie de l'email, du mot de passe, du prénom et du nom sont obligatoire" })
    //cryptage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // renommage image fourni par l'utilisateur, sinon vide
            const avatar = req.file ? `${req.protocol}://${req.get('host')}/assets/avatars/${req.file.filename}` : ""
            //déclaration de l'ojet à retourner à la base de donnée
            const user = ({
                email: email,
                password: hash,
                firstname: firstname,
                lastname: lastname,
                avatar: avatar
            })
            //création de l'utilisateur dans la base 
            mysql.query(
                'INSERT INTO users SET ?', user, (error) => {
                    if (error) {
                        res.status(401).json({ message: `L'adresse mail: ${email} est déjà utilisée` })
                    } else {
                        res.status(201).json({ message: "nouveau utilisateur enregistré" })
                    }
                }
            )
        })
        .catch(error => res.status(500).json({ error }))
}


//fonction de login
exports.login = (req, res) => {
    //controle si les champs email et mot de passe sont saisies
    if (!req.body.email || !req.body.password)
        return res.status(401).json({ message: 'Identifiant ou mot de passe non saisie' })
    //recherche de l'email dans la base de donnée
    mysql.query(
        'SELECT * FROM users WHERE email = ?', req.body.email, (error, result) => {
            if (error) {
                res.status(401).json({ error })
            } else {
                // si l'email n'est pas présent dans la db
                if (result == 0) {
                    res.status(403).json({ message: "utilisateur non présent dans la db" })
                } else {
                    //comparaison du mot de passe enregistré avec celui saisie
                    bcrypt.compare(req.body.password, result[0].password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).send({ message: 'Paire identifiant/mot de passe incorrecte' })
                            } else {
                                //insertion de l'id et de isAdmin dans un token
                                const token = jwt.sign(
                                    {
                                        userId: result[0].id,
                                        admin: result[0].isAdmin
                                    },
                                    keyToken,
                                    { expiresIn: '2h' }
                                )
                                res.status(200).json({ userId: result[0].id, token, admin: result[0].isAdmin })
                            }
                        })
                        .catch((error) => res.status(500).json({ error }))
                }
            }
        }
    )
}

//fonction de mise à jours des informations utilisateur
exports.update = (req, res) => {
    const { firstname, lastname } = req.body
    mysql.query(
        //vérification que la fiche utilisateur existe dans la base
        'SELECT * FROM users WHERE id = ?', req.params.id, (error, result) => {
            if (result == 0) {
                return res.status(404).json({ message: `utilisateur non existant` })
            }
            else {
                //vérification si auteur ou admin
                if (result[0].id == req.auth.userId || req.auth.admin == 1) {
                    //variables pour la requête de mise a jour afin de changer par concaténation éventuellement plusieurs info simultanément
                    let query = 'UPDATE users SET '
                    let params = []

                    //si envoi d'une image
                    if (req.file) {
                        // si image déjà affectée à l'utilisateur, on procède a sa supression
                        if (result[0].avatar != null) {
                            const avatarOld = result[0].avatar.split("/avatars/")[1]
                            fs.unlink(`${`assets/avatars/${avatarOld}`}`, () => { })
                        }
                        //déclaration d'un nouveau nom de fichier pour la nouvelle image
                        const newAvatar = `${req.protocol}://${req.get('host')}/assets/avatars/${req.file.filename}`
                        // personalisation de la rêquete mysql
                        query = query + 'avatar = ?,'
                        //ajouter de l'url du ficher dans un tableau
                        params.push(newAvatar)
                    }
                    //si l'utilisateur change son prénom
                    if (firstname) {
                        query = query + 'firstname = ?,'
                        params.push(firstname)
                    }
                    //si l'utilisateur change son non
                    if (lastname) {
                        query = query + 'lastname = ?,'
                        params.push(lastname)
                    }
                    //concaténation pour la finaliser "l'assemblage" de la requête en enlevant la dernière virgule présente dans le tableau
                    query = query.substring(0, query.length - 1) + ' where id = ? '
                    params.push(req.params.id)

                    //envoi de la requête a la base de donnée
                    mysql.query(query, params, (error, results) => {
                        if (error) throw error
                        res.status(201).json({ message: "utilisateur modifié" })
                    })
                } else res.status(404).json({ message: `l'utilisateur n'est pas l'auteur et n'est pas admin` })
            }
        }
    )
}

// mise à jour du mot de passe
exports.updatePassword = (req, res) => {
    //recherche si la fiche utilisateur est existante dans la base
    mysql.query(
        'SELECT * FROM users WHERE id = ?', req.params.id, (error, result) => {
            if (result == 0) {
                return res.status(404).json({ message: `utilisateur non existant` })
            }
            //vérification si auteur ou admin
            if (result[0].id == req.auth.userId || req.auth.admin == 1) {
                if (password) {
                    //cryptage du nouveau mot de passe
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            //mise a jour du mdp dans la base de donnée
                            mysql.query(
                                `UPDATE users SET password = ? WHERE id = ?`,
                                [hash, req.params.id],
                                (error) => {
                                    if (error) {
                                        res.json({ error })
                                    } else {
                                        res.status(200).json({ message: `mot de passe modifié` })
                                    }
                                }
                            )
                        })
                }
            } else res.status(404).json({ message: `l'utilisateur n'est pas l'auteur et n'est pas admin` })
        }
    )
}

//fonction de supression du profil utilisateur
exports.delete = (req, res) => {
    //vérification que l'utilisateur est présent dans la base de donnée 
    mysql.query(
        'SELECT * FROM users WHERE id = ?', req.params.id, (error, results) => {
            if (results == 0) res.status(404).json({ message: `utilisateur non existant` })
            //vérification si auteur ou admin
            if (results[0].id == req.auth.userId || req.auth.admin == 1) {
                // supression de l'image si existante
                if (results[0].avatar != null) {
                    const avatar = results[0].avatar.split("/avatars/")[1];
                    fs.unlink(`${`assets/avatars/${avatar}`}`, () => { })
                }
                // supression dans la base
                mysql.query(
                    `DELETE FROM users WHERE id = ?`, [req.params.id],
                    (error) => {
                        if (error) {
                            res.status(401).json({ error })
                        } else {
                            res.status(200).json({ message: 'Utilisateur supprimé' })
                        }
                    }
                )
            } else res.status(404).json({ message: `l'utilisateur n'est pas l'auteur et n'est pas admin` })
        }
    )
}



// fonction d'affichage de tout les utilisateurs existants
exports.getAllUsers = (req, res) => {
    mysql.query(
        'SELECT * FROM users ORDER BY users.lastname ASC', (error, result) => {
            if (error) {
                res.status(400).json({ error })
            } else {
                res.status(200).json(result)
            }
        }
    )
}