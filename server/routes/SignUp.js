const express = require('express')
const router = express.Router();
const db = require('../dbConfig')
const bcrypt = require('bcrypt')

router.post('/', (req, res) => {
    const signUpName = req.body.signUpname
    const signUpEmail = req.body.signUpemail
    const signUpPassword = req.body.signUppassword
    const signUpDepartment = req.body.signUpDepartment
    const signUpRoll = req.body.signUpRoll
    const signUpSubject = req.body.signUpSubject
    const signUpRollno = req.body.signUpRollno

    let checkWheatherUserExits = 'SELECT * FROM signin WHERE name=' + db.escape(signUpName);
    db.query(checkWheatherUserExits, (error, result) => {
        if(result.length > 0) {
            // console.log("user exits")
            res.send({userExitOrNot: "user already exits..."})
        } else {
            // console.log("nope user doesn't exit")

            const saltRounds = 10;
            bcrypt.hash(signUpPassword, saltRounds, (err, hash) =>  {
            // console.log("encrypted password is: " + hash)

            let sql = "INSERT INTO signin (name, email, password, department, roll, subject, rollNo) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(sql, [signUpName, signUpEmail, hash, signUpDepartment, signUpRoll, signUpSubject, signUpRollno], (err, result) => {
                if(err) console.log(err)
                else res.send("Signup succesfull...")
            })
        })
    }
    })
})

module.exports = router;