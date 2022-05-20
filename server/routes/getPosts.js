const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY ID DESC', (err, result) => {
        if(err) console.log(err)
        else {
                res.send(result)
        }
    })
})

module.exports = router;
