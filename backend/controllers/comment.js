/************************************************************/
/************* Controller comment  **************************/
/************************************************************/


const mysql = require('../db.mysql')


// fonction d'affichage des commentaires existants
exports.getComments = (req, res) => {
    mysql.query(
        'SELECT * FROM comments JOIN users ON user_id = users.id WHERE post_id = ?', req.params.post, (error, result) => {
            if (error) {
                res.status(400).json({ error })
            } else {
                res.status(200).json(result)
            }
        }
    )
}

exports.createComment = (req, res) => {
    // définition des champs à remplir
    const comment = {
        feedback: req.body.feedback,
        user_id: req.auth.userId,
        post_id: req.params.post
    }
    //vérification si l'utilisateur existe
    mysql.query(
        'SELECT * FROM users WHERE id = ? ', req.auth.userId, (error, result) => {
            if (error) res.status(400).json({ error })
            if (!result[0]) res.status(401).json({ message: "l'utilisateur n'est pas présent dans la base" })
            //vérification si le post existe
            mysql.query(
                'SELECT * FROM posts WHERE postId = ? ', req.params.post, (error, result) => {
                    if (error) res.status(400).json({ error })
                    if (!result[0]) return res.status(401).json({ message: "le post n'existe pas dans la base" })
                    //requête de creation
                    mysql.query(
                        'INSERT INTO comments SET ?', comment, (error) => {
                            if (error) res.status(400).json({ error })
                            res.status(201).json({ message: `Commentaire ajouté` })
                        }
                    )
                })
        })
}

exports.modifyComment = (req, res) => {
    //selection du commentaire
    mysql.query(
        'SELECT * FROM comments WHERE commentId = ? ', req.params.id, (error, result) => {
            if (error) res.status(400).json({ error })
            if (!result[0]) res.status(404).json({ message: 'post inexistant' })
            else {
                //vérification si auteur ou admin
                if (result[0].user_id == req.auth.userId || req.auth.admin == 1) {
                    //moodification du commentaire
                    mysql.query(
                        'UPDATE comments SET feedback = ? WHERE commentId = ? ', [req.body.feedback , req.params.id], (error) => {
                            if (error) res.status(400).json({ error })
                            res.status(200).json({ message: "commentaire modifié" })
                        }
                    )
                } else res.status(404).json({ message: "l'utilisateur n'est pas l'auteur ou n'est pas administrateur" })
            }
        }
    )
}

exports.deleteComment = (req, res) => {
    mysql.query(
        //recuperation du commentaire
        `SELECT * from comments WHERE commentId = ?`, req.params.id, (error, result) => {
            if (error) res.status(400).json({ error })
            if (!result[0]) res.status(404).json({ message: 'commentaire inexistant' })
            else {
                //vérification si auteur ou admin
                if (result[0].user_id == req.auth.userId || req.auth.admin == 1) {
                    // supréssion du commentaire
                    mysql.query(
                        `DELETE from comments WHERE commentId =? `, req.params.id, (error) => {
                            if (error) res.status(400).json({ error })
                            res.status(200).json({ message: "commentaire supprimé" })
                        }
                    )
                } else res.status(404).json({ message: "l'utilisateur n'est pas l'auteur ou n'est pas administrateur" })
            }
        }
    )
}
