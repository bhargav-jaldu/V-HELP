const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.post('/', (req, res) => {
    const title = req.body.title;
    const message = req.body.message;
    const postId = req.body.postId;

   db.query("UPDATE posts SET title=?, description=? WHERE id=?",[title, message, postId], (err2, result2) => {
        if(err2) {
            console.log(err2)
        }
        else {
            console.log(result2)
        }
    })

        res.json({ title: title, description: message, message: "UPDATED" })
})

module.exports = router;