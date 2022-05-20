import React, { useState, useEffect } from 'react'
import styles from './postDetail.module.css'
import axios from 'axios'
import {Typography} from '@material-ui/core'
import Comments from '../Comments/Comments'

const PostDetail = ({ match }) => {

    const [details, setDetails] = useState([]);

    // const [comment, setComment] = useState();

    // // comments when compounent mounts
    // const [allComments, setAllComments] = useState([]);

    const fetchDetails = () => {

        axios.get('http://localhost:3001/postDetails/' + match.params.id)
        .then(res => {
            setDetails(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    // const handleComment = (e) => {
    //     e.preventDefault()
    //     const formValues = new FormData();
    //     formValues.append('postId', match.params.id)
    //     formValues.append('commentedBy', localStorage.getItem('username'));
    //     formValues.append('comment', comment);

    //     // console.log(match.params.id)
    //     axios.post('http://localhost:3001/comments', formValues)
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    //     getComments();
    // }

    // const getComments = () => {
    //     axios.get('http://localhost:3001/comments/'+ match.params.id)
    //     .then((res) => {
    //         setAllComments(res.data.result);
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    useEffect(() => {
        fetchDetails();
        // getComments()
    }, [])

    return (
        <div>
            {
                details.map(detail => (
                    <div className={styles.container}>
                        <Typography variant="h3">{detail.title}</Typography>
                        <Typography variant="h5">{detail.creator}</Typography>
                        <Typography variant="h6" style={{margin: '10px 0'}}>{detail.description}</Typography>
                        <img src={process.env.PUBLIC_URL + '/uploads/' + detail.imageUrl} alt={detail.imageUrl} className={styles.detailsImage} />
                    </div>
                ))
            }

            {/* comments

            <div className={styles.container}>
                <Typography variant = "h3">Comments: </Typography>
                <form onSubmit={(e) => handleComment(e)}>
                    <TextField variant="outlined" label="Comment" fullWidth style={{margin: '10px 0'}} onChange={(e) => setComment(e.target.value)}></TextField>
                    <Button variant="contained" color="secondary" type="submit" style={{margin: '0 5px 5px 5px', backgroundColor: '#333'}}>Comment</Button>
                </form>
            </div>

            <div className={styles.container}>
                {
                    allComments.map((comment) => (
                        <div className={styles.comments}>
                            <Typography variant="h4" styles={{color: '#333'}}>{comment.commentedBy}</Typography>
                            <Typography variant="h5" color="primary">{comment.comment}</Typography>
                            <hr />
                        </div>
                    ))
                }
            </div> */}

            <Comments />
        </div>
    )
}

export default PostDetail
