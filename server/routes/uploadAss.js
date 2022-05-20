const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.post('/', (req, res) => {
    const toWhichAssignment = req.body.toWhichAssignment;
    const whoUploaded = req.body.whoUploaded;
    // const subject = req.body.subject

    var file;

    if(!req.files)
    {
        res.send("File was not found");
        return;
    }
    

    file = req.files.pdf; 
    const fileExtensionArray = file.name.split(".");
    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];
    const fileName = Date.now() + "." + fileExtension;
    
    file.mv(`C:/Users/bharg/OneDrive/Desktop/V-HELP/client/public/assignments/${fileName}`, err => {
      if(err) {
          console.log(err)
      }  
    })

    db.query('INSERT INTO uploadAss (whoUploaded, toWhichAssign, assignment, marks) VALUES (?, ?, ?, ?)', [whoUploaded, toWhichAssignment, fileName, 0], (err, result) => {
        if(err) console.log(err)
        else console.log("Assignment inserted succesfully")
    })

    res.json({ fileName: fileName, filePath: `/assignments/${fileName}` })
})


// getting uploaded assignments
router.get('/', (req, res) => {
    db.query('SELECT * FROM uploadass ORDER BY ID DESC', (err, result) => {
        if(err) console.log(err)
        else {
            res.send(result)
        }
    })
})

// updating marks
router.put('/:toWhichAssign', (req, res) => {
    const toWhichAssign = req.params.toWhichAssign;
    const marks = req.body.marks;

    db.query("UPDATE uploadass SET marks=? WHERE toWhichAssign=?", [marks, toWhichAssign], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json({ message: "Marks EDITED SUCCESSFULLY" })
        }
    })
})

module.exports = router;