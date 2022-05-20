const express = require('express')
const router = express.Router();
const db = require('../dbConfig')

router.post('/', (req, res) => {
    const whoLiked = req.body.whoLiked
    const postId = req.body.postId

    let alreadyLiked = false;
    db.query("SELECT * FROM likes WHERE postId=? AND whoLiked=? AND likes=?", [postId, whoLiked, 1], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            if(result.length > 0) {
                alreadyLiked = true;
            }
        }

        if(alreadyLiked) {
            db.query("DELETE FROM likes WHERE postId=? AND whoLiked=? AND likes=?", [postId, whoLiked, 1], (err, result) => {
                if(err) console.log(err)
                else {
                    // db.query("UPDATE posts SET likes=? WHERE id=?",[0, postId], (err2, result2) => {
                    //     if(err2) console.log(err2)
                    //     else console.log(result2)
                    // })
                    res.json({ postId: postId, whoLiked: whoLiked, message: "DELETED SUCCESFULLY" })
                }
            })
        } else {
            db.query("INSERT INTO likes (whoLiked, postId, likes) VALUES (?, ?, ?)", [whoLiked, postId, 1], (err, result) => {
                if(err) console.log(err)
                else {
                    // db.query("UPDATE posts SET likes=? WHERE id=?",[1, postId], (err2, result2) => {
                    //     if(err2) console.log(err2)
                    //     else console.log(result2)
                    // })
                    res.json({ postId: postId, whoLiked: whoLiked, message: "LIKED SUCCESFULLY" })
                }
            })
        }
    })
})
module.exports = router;

// if(isset($_GET['likeId'])) {
//     $session_name = $_SESSION['email'];
//     $postId = $_GET['likeId'];

//     $select = "SELECT * from likes WHERE session_name='$session_name' AND post_id = '$postId' AND likes='1'";
//     $re = mysqli_query($conn, $select);
//     if(mysqli_num_rows($re) > 0) {
//         $delete = "DELETE FROM likes WHERE session_name='$session_name' AND post_id = '$postId' AND likes='1'";
//         $exe = mysqli_query($conn, $delete);
//     } else {
//         $sql = "INSERT INTO likes (session_name, post_id, likes) VALUES ('$session_name', '$postId', '1')";
//         $result = mysqli_query($conn, $sql);
//     }
// }