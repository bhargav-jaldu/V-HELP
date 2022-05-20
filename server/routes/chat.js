const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.get('/', (req, res) => {


    db.query("SELECT * FROM signin", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result)
            res.json({ chat: result })
        }
    })
})

router.get('/:userId', (req, res) => {
    console.log(req.params.userId);

    db.query("SELECT * FROM signin WHERE id = ?", [req.params.userId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({ user: result })
        }
    })
})

module.exports = router