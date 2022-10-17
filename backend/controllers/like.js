/************************************************************/
/************* Controller like  *****************************/
/************************************************************/


const mysql = require('../db.mysql')

exports.like = (req, res) => {
    //recherche si utlisateur déja présent dans la table like
    mysql.query(
        'SELECT * FROM likes WHERE user_id = ? AND post_id =?', [req.auth.userId, req.params.post], (error, result) => {
            if (error) res.status(400).json({ error })
            //si le résulta est vide
            if (result == '') {
                mysql.query(
                    //ajoute +1 au nombre de like de la table post
                    "UPDATE posts SET like_count = like_count + 1 WHERE postId = ?", req.params.post, (error) => {
                        if (error) res.status(400).json({ error })
                        // enregistrement dans la table like de l'id utilisateur et l'id du post
                        mysql.query(
                            `INSERT INTO likes (post_id, user_id) VALUES (?,?)`, [req.params.post, req.auth.userId], (error) => {
                                if (error) res.status(400).json({ error })
                                res.status(201).json({ message: "like ajouté" })
                            })
                    })
            } else {
                //si l'utilisateur a déjà liké, alors retrait du like
                mysql.query(
                    "UPDATE posts SET like_count = like_count - 1 WHERE postId = ?", req.params.post, (error) => {
                        if (error) res.status(400).json({ error })
                        // supression dans la table like de l'id utilisateur et l'id du post
                        mysql.query(
                            `DELETE FROM likes WHERE post_id = ? AND user_id = ?`, [req.params.post, req.auth.userId], (error) => {
                                if (error) res.status(400).json({ error })
                                res.status(201).json({ message: " dislike prit en compte" })
                            })
                    })

            }
        })
}

