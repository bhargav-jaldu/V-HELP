const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.delete('/:id', (req, res) => {

    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    console.log("id: ", req.params.id);
   db.query(sql, (err2, result2) => {
        if(err2) {
            console.log(err2)
        }
        else {
            res.json({ postId: req.params.id, message: "DELETED" })
        }
    })
})

module.exports = router;