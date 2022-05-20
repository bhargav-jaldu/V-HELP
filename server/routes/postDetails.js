const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.get('/:postId', (req, res) => {

    console.log(req.params.postId)
    const postId = req.params.postId
    
    db.query('SELECT * FROM posts WHERE id=?', [postId], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

module.exports = router;