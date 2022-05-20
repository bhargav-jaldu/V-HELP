const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vhelp'
})

db.connect((err) => {
    if(err) console.log(err)
    else console.log("mysql connected....")
})

// create database
let sql = 'CREATE DATABASE IF NOT EXISTS socialMedia;';
db.query(sql, (err, result) => {
    if(err) console.log(err)
    else console.log("created database succesfully....")
})

// creating table
let signUpTable = 'CREATE TABLE IF NOT EXISTS signin (id INT AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), department VARCHAR(255), roll VARCHAR(255), subject VARCHAR(255), rollNo VARCHAR(255),  PRIMARY KEY(id))';
db.query(signUpTable, (err, result) => {
    if(err) console.log(err)
    else console.log("signin table created succesfully")
})

// creating table for post
let postSql = "CREATE TABLE IF NOT EXISTS posts ( `id` INT NOT NULL AUTO_INCREMENT , creator VARCHAR(255), `title` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `imageUrl` VARCHAR(255) NOT NULL , `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`))"
db.query(postSql, (err, result) => {
    if(err) console.log(err)
    else console.log("posts table created succesfully")
})

// creating likes table
let likeSql = "CREATE TABLE IF NOT EXISTS likes (id INT AUTO_INCREMENT, whoLiked VARCHAR(255), postId INT, likes INT, PRIMARY KEY(id))"
db.query(likeSql, (err, result) => {
    if(err) console.log(err)
    else console.log("likes table created succesfully")
})

// creating comments table
let commentSql = "CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT, postId INT, commentedBy VARCHAR(255), comment TEXT, PRIMARY KEY(id))"
db.query(commentSql, (err, result) => {
    if(err) console.log(err)
    else console.log("comments table created succesfully")
})

// creating teacherForm for post
let teacherForm = "CREATE TABLE IF NOT EXISTS teacherForm ( `id` INT NOT NULL AUTO_INCREMENT , creator VARCHAR(255), `title` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `imageUrl` VARCHAR(255) NOT NULL , subject VARCHAR(255), `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`))"
db.query(teacherForm, (err, result) => {
    if(err) console.log(err)
    else console.log("teacherForm table created succesfully")
})

// creating uploadAss for post
let uploadAss = "CREATE TABLE IF NOT EXISTS uploadAss ( `id` INT NOT NULL AUTO_INCREMENT , whoUploaded VARCHAR(255), `toWhichAssign` INT NOT NULL , `assignment` TEXT NOT NULL , `marks` INT NOT NULL, `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`))"
db.query(uploadAss, (err, result) => {
    if(err) console.log(err)
    else console.log("uploadAss table created succesfully")
})

module.exports = db;