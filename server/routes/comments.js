const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.post('/', (req, res) => {
    
    const postId = req.body.postId;
    const comment = req.body.comment;
    const commentedBy = req.body.commentedBy

   db.query("INSERT INTO comments (postId, commentedBy, comment) VALUES (?, ?, ?)",[postId, commentedBy, comment], (err2, result2) => {
        if(err2) {
            console.log(err2)
        }
        else {
            console.log(result2)
        }
    })

    res.json({ postId: postId, comment: comment, message: 'Inserted' })
})

router.get('/:postId', (req, res) => {
    // console.log(req.params.postId);

    db.query("SELECT * FROM comments WHERE postId = ?", [req.params.postId], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json({ result: result })
            // console.log(result)
        }
    })
})

router.delete('/:commentId', (req, res) => {
    const id = req.params.commentId;

    db.query("DELETE FROM comments WHERE id=?", [id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(result)
            res.json({ message: "Comment Deleted" })
        }
    })
})

router.put('/:commentId', (req, res) => {
    const id = req.params.commentId;
    const updated = req.body.updatedComment;
    console.log(updated)

    db.query("UPDATE comments SET comment=? WHERE id=?", [updated, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json({ message: "COMMENT EDITED SUCCESSFULLY" })
            console.log(result)
        }
    })
})

module.exports = router;