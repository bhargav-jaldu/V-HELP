const express = require('express')
// const app = express();
const router = express.Router();
const db = require('../dbConfig')
const bcrypt = require('bcrypt')

router.post('/', (req, res) => {
    const siginEmail = req.body.signinEmail;
    const signinPassword = req.body.signinPassword;

    let sql = 'SELECT * FROM signin WHERE email=' + db.escape(siginEmail);
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length === 0) {
            res.json({ loggedIn: false, message: "incorrect email or password" })
            return;
        }
        else if(result[0].password) {
            bcrypt.compare(signinPassword, result[0].password, function(errr, resultt) {
                if(errr) console.log("errr is: " + errr)
                if(resultt) {
                    res.json({ loggedIn: true, username: result[0].name, roll: result[0].roll, subject: result[0].subject })
                } else {
                    // res.send('incorrect email or password')
                    res.json({ loggedIn: false, username: result[0].name, message: "incorrect email or password" })
                }
            });
        } else {
            // console.log("please create an account....")
            res.json({ loggedIn: false, username: result[0].name, message: "please create an account...." })
        }
    })
})

module.exports = router;