/************************************************************/
/************* Controller like  *****************************/
/************************************************************/


const mysql = require('../db.mysql')

exports.like = (req, res) => {
    //recherche si l'utilisateur avec l'id du post est déja présent dans la table like
    mysql.query(
        'SELECT * FROM likes WHERE user_id = ? AND post_id =?', [req.auth.userId, req.params.post], (error, result) => {
            if (error) res.status(400).json({ error })
            //si le résultat est vide
            if (result == '') {
                // enregistrement dans la table like de l'id utilisateur et l'id du post
                mysql.query(
                    `INSERT INTO likes (post_id, user_id) VALUES (?,?)`, [req.params.post, req.auth.userId], (error) => {
                        if (error) res.status(400).json({ error })
                        res.status(201).json({ message: "like ajouté" })
                    })

            } else {
                //si l'utilisateur a déjà liké, alors suppression dans la table like de l'id utilisateur et l'id du post
                mysql.query(
                    `DELETE FROM likes WHERE post_id = ? AND user_id = ?`, [req.params.post, req.auth.userId], (error) => {
                        if (error) res.status(400).json({ error })
                        res.status(201).json({ message: " dislike prit en compte" })
                    })

            }
        })
}

exports.listLiked = (req, res) => {
    //extraire un tableau contenant la liste des likes d'un commentaire
    mysql.query(
        'SELECT * FROM likes WHERE post_id =?', req.params.post, (error, result) => {
            if (error) res.status(400).json({ error })
            if (result) res.status(200).json({ result })
        })
}