const express = require('express')
const cors = require('cors')
const url = require('url');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const fileUpload = require("express-fileupload");
app.use(fileUpload());
const db = require('./dbConfig')

const signUpRouter = require('./routes/SignUp')
const signInRouter = require('./routes/SignIn')
const postRouter = require('./routes/posts')
const getPosts = require('./routes/getPosts')
const likes = require('./routes/likes')
const updatePost = require('./routes/updatePost')
const deletePost = require('./routes/deletePost')
const postDetails = require('./routes/postDetails')
const comments = require('./routes/comments')
const chat = require('./routes/chat')
const teacherForm = require('./routes/teacherForm')
const getTeacherAss = require('./routes/getTeacherAss')
const getAssignments = require('./routes/getAssignments')
const uploadAss = require('./routes/uploadAss')

app.use('/signup', signUpRouter);
app.use('/signin', signInRouter)
app.use('/createPost', postRouter);
app.use('/getPosts', getPosts);
app.use('/likes', likes)
app.use('/updatePost', updatePost)
app.use('/deletePost', deletePost);
app.use('/postDetails', postDetails)
app.use('/comments', comments)
app.use('/chat', chat);
app.use('/teacherForm', teacherForm);
app.use('/getTeacherAss', getTeacherAss);
app.use('/getAssignments', getAssignments);
app.use('/uploadAss', uploadAss);

app.get('/', (req, res) => {
    res.send('Social media root route')
})

// app.get('/details', (req, res) => {
//     const sql = "SELECT * FROM teacherForm signin";
// })

app.get('/getLikes', (req, res) => {
    const path = url.parse(req.url).path;
    // console.log(path)
    const current_url = new URL(`http://localhost:3001${path}`)
    // get access to URLSearchParams object
    const search_params = current_url.searchParams;
    // get url parameters
    const username = search_params.get('username');

        let result = [];
        db.query("SELECT * FROM likes", (err, likeResult) => {
            if(err) {
                console.log(err)
            }
            else {
                for(let i = 0;i < likeResult.length;i++) {
                    if(likeResult[i].whoLiked === username) {
                        result[i] = likeResult[i].postId
                    }
                }
                res.json({result})
            }
        })
})

// http://localhost:3001/getIcon -- fav icon
app.get('/getIcon', (req, res) => {
    const path = url.parse(req.url).path;
    // console.log(path)
    const current_url = new URL(`http://localhost:3001${path}`)
    // get access to URLSearchParams object
    const search_params = current_url.searchParams;
    // get url parameters
    const username = search_params.get('username');
    const postId = search_params.get('postId'); 
    console.log(username, postId)
})

app.get('/howManyLikes', (req, res) => {
    let howManyLikesForEachPost = [];
    const postIds = [];
    db.query("SELECT * FROM likes", (err, result) => {
        if(err) console.log(err)
        else {
            for(let i = 0;i < result.length;i++) {
                postIds[i] = result[i].postId;
            }

            // remove dups from postIds
            let uniquePostIds = [...new Set(postIds)];
            console.log(uniquePostIds);


            for(let i = 0;i < uniquePostIds.length;i++) {
                let count = 0;
                for(let j = 0;j < result.length;j++) {
                    if(result[j].postId === uniquePostIds[i]) {
                        count++;
                    }
                }
                howManyLikesForEachPost[i] = {postId: uniquePostIds[i], count: count}
            }

            // console.log(howManyLikesForEachPost)
            res.json({howManyLikesForEachPost})
        }
    })
})


app.listen('3001', () => {
    console.log('Server running on port 3001')
})