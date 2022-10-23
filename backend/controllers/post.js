/************************************************************/
/************* Controller post  *****************************/
/************************************************************/

const fs = require('fs')

const mysql = require('../db.mysql')


// fonction d'affichage de tout les posts existants
exports.getAllPosts = (req, res) => { 
    
    mysql.query(
        'SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id ORDER  BY datetime DESC LIMIT 50', (error, result) => {
            if (error) {
                res.status(400).json({ error })
            } else {
                res.status(200).json(result)
            }
        }
    )
}


// fonction de création d'un post
exports.createPost = (req, res) => {
    // renommage image fourni par l'utilisateur, sinon vide
    const attachment = req.file ? `${req.protocol}://${req.get('host')}/assets/attachments/${req.file.filename}` : ""
    // définition des champs pour envoi a la base de donnée
    console.log(attachment)
    const post = {
        user_id: req.auth.userId,
        title: req.body.title,
        message: req.body.message,
        attachment: attachment,
        datetime: new Date().toLocaleString("fr", { timeZone: "Europe/Paris" })
    }

    //vérification si l'utilisateur existe
    mysql.query(
        'SELECT * FROM users WHERE id = ?', req.auth.userId, (error, result) => {
            if (error) res.status(400).json({ error })
            if (!result[0]) res.status(401).json({ message: "l'utilisateur n'est pas présent dans la base" })
            else (
                //envoi des valeurs a la base de donnée
                mysql.query(
                    'INSERT INTO posts SET ?', post, (error) => {
                        if (error) res.status(400).json({ error })
                        res.status(201).json({ message: `Post ajouté` })
                    })
            )
        }
    )
}

//fonction suppression d'un post
exports.deletePost = (req, res) => {
    mysql.query(
        `SELECT * FROM posts WHERE postId = ?`, req.params.id, (error, result) => {
            if (error) res.status(400).json({ error })
            if (!result[0]) res.status(404).json({ message: 'post inexistant' })
            else {
                //vérification si auteur ou admin
                if (result[0].user_id == req.auth.userId || req.auth.admin == 1) {
                    // recherche si image dans le post et dans ce cas suppression
                    if (result[0].attachment != "") {
                        const attachment = result[0].attachment.split('/attachments/')[1]
                        fs.unlink(`${`assets/attachments/${attachment}`}`, () => { })
                    }
                    mysql.query(
                        `DELETE FROM posts WHERE postId = ?`, req.params.id, (error) => {
                            if (error) res.status(400).json({ error })
                            res.status(200).json({ message: 'post supprimé' })
                        }
                    )
                } else res.status(404).json({ message: `l'utilisateur n'est pas l'auteur et n'est pas admin` })
                //supression du post dans la base de donnée
            }
        }
    )
}

exports.modifyPost = (req, res) => {
    //variables pour la requête de mise a jour afin de changer par concaténation éventuellement plusieurs info simultanément
    let query = 'UPDATE posts SET '
    let params = []
    mysql.query(
        //selection du post
        `SELECT * FROM posts WHERE postId = ?`, req.params.id, (error, result) => {
            if (error) res.status(400).json({ error })
            if (!result[0]) res.status(404).json({ message: 'post inexistant' })
            else {
                //vérification si auteur ou admin
                if (result[0].user_id == req.auth.userId || req.auth.admin == 1) {
                    // si envoi d'une image
                    if (req.file) {
                        console.log(req.file)
                        //déclaration d'un nouveau nom de fichier pour la nouvelle image
                        const newAttachment = `${req.protocol}://${req.get('host')}/assets/attachments/${req.file.filename}`
                        // personalisation de la rêquete mysql
                        query = query + 'attachment = ?,'
                        //ajouter de l'url du ficher dans un tableau
                        params.push(newAttachment)
                        // si image déjà affectée au post, on procède à sa supression
                        if (result[0].attachment != null) {
                            const oldAttachment = result[0].attachment.split('/attachments/')[1]
                            fs.unlink(`${`assets/attachments/${oldAttachment}`}`, () => { })
                        }
                    }
                    const { title, message } = req.body
                    //si l'utilisateur change le titre
                    if (title) {
                        query = query + 'title = ?,'
                        params.push(title)
                    }
                    //si l'utilisateur change le texte
                    if (message) {
                        query = query + 'message = ?,'
                        params.push(message)
                    }
                    //concaténation pour la finaliser "l'assemblage" de la requête en enlevant la dernière virgule présente dans le tableau
                    const datetime = new Date().toLocaleString("fr", { timeZone: "Europe/Paris" })
                    query = query + 'datetime = ?,'
                    query = query.substring(0, query.length - 1) + ' where postId = ? '
                    params.push(datetime, req.params.id)

                    //envoi de la requête a la base de donnée
                    mysql.query(query, params, (error) => {
                        if (error) res.status(400).json({ error })
                        res.status(201).json({ message: "post modifié" })
                    })
                } else res.status(404).json({ message: `l'utilisateur n'est pas l'auteur et n'est pas admin` })
            }
        }
    )
}
