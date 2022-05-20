const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const creator = req.body.creator
    const subject = req.body.subject

    var file;

    if(!req.files)
    {
        res.send("File was not found");
        return;
    }
    

    file = req.files.image; 
    const fileExtensionArray = file.name.split(".");
    const fileExtension = fileExtensionArray[fileExtensionArray.length - 1];
    const fileName = Date.now() + "." + fileExtension;
    
    file.mv(`C:/Users/bharg/OneDrive/Desktop/V-HELP/client/public/teacherUploads/${fileName}`, err => {
      if(err) {
          console.log(err)
      }  
    })

    db.query('INSERT INTO teacherForm (title, creator, description, imageUrl, subject) VALUES (?, ?, ?, ?, ?)', [title, creator, description, fileName, subject], (err, result) => {
        if(err) console.log(err)
        else console.log("post inserted succesfully")
    })

    res.json({ fileName: fileName, filePath: `/uploads/${fileName}` })
})

module.exports = router;