import React, { useState, useEffect, useRef } from 'react'
import styles from './comments.module.css'
import axios from 'axios'
import {Typography, TextField, Button} from '@material-ui/core'
// import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Comments = () => {


    let [comment, setComment] = useState();
// comments when compounent mounts
    const [allComments, setAllComments] = useState([]);

    // const queryParams = new URLSearchParams(window.location.search);
    // console.log(queryParams)

    const [showUpdateBtn, setShowUpdateBtn] = useState(false);

    const url = window.location.href;
    const arr = url.split('/');
    const match = arr[arr.length - 1];

    const [errorMsg, setErrorMsg] = useState(false);
    const [deleteCommentErrMsg, setDeleteCommentErrMsg] = useState(false)


    const ref = useRef();
    const scrollToRef = () => window.scrollBy({
        top: 100000000,
        behavior: 'smooth'
    })   
    const myRef = useRef(null)
    const executeScrollTop = () => scrollToRef(myRef)

    const scrollToRefBottom = () => window.scrollBy({
        top: -100000,
        behavior: 'smooth'
    })   
    const myReff = useRef(null)
    const executeScrollBottom = () => scrollToRefBottom(myReff)

const handleComment = (e) => {

    e.preventDefault()
    // setComment(ref.current.value);

    const formValues = new FormData();

    if(comment === undefined) {
        setErrorMsg(true)
    } else {
        setErrorMsg(false)
        formValues.append('postId', match)
        formValues.append('commentedBy', localStorage.getItem('username'));
        formValues.append('comment', comment);

        // console.log(match)
        axios.post('http://localhost:3001/comments', formValues)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        // comment = '';
        // setComment('')
        ref.current.value = ""
        getComments();
        executeScrollTop();
    }
}

const getComments = () => {
    // console.log("get comments match is:  "+ match);
    axios.get('http://localhost:3001/comments/'+ match)
    .then((res) => {
        console.log(res.data.result)
        setAllComments(res.data.result);
    })
    .catch(err => {
        console.log(err)
    })
}

const [id, setId] = useState();

const handleEditComment = (id) => {
    console.log('Handle Edit Comment', id)
    setShowUpdateBtn(true);
    setId(id);

    for(let i = 0;i < allComments.length;i++) {
        if(allComments[i].id === id) {
            ref.current.value = allComments[i].comment;
            setComment(allComments[i].comment)
            break;
        }
    }

    executeScrollBottom();
}

const handleEditCommentt = (id) => {
    const updatedComment = comment;
    // send update request to backend
    axios.put('http://localhost:3001/comments/' + id, {
        updatedComment: updatedComment
    }) 
    .then(res => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

    setShowUpdateBtn(false);
    getComments();
}

const handleDeleteComment = (id) => {
    // console.log("Handle Delete Comment")

    axios.delete('http://localhost:3001/comments/' + id)
    .then(res => {
        if(res.data.message === "Comment Deleted") {
            setDeleteCommentErrMsg(true);
            setInterval(() => {
                setDeleteCommentErrMsg(false);
            }, 4000)
            getComments();
        } else {
            console.log("Something went wrong in comment deletion....")
        }
    })
    .catch(err => {
        console.log(err)
    })
}

    useEffect(() => {
        getComments();
    }, [])

    return (
        <div>
            {/* comments */}

            <div className={styles.container}>
                <Typography variant = "h3">Comments: </Typography>
                <form onSubmit={showUpdateBtn ? () => handleEditCommentt(id) : (e) => handleComment(e)}>
                    <TextField variant="outlined" label="Comment" fullWidth style={{margin: '10px 0'}} inputRef={ref} onChange={(e) => setComment(e.target.value)}></TextField>
                    {

                        showUpdateBtn ? 
                        <Button variant="contained" color="secondary" type="submit" style={{margin: '0 5px 5px 5px'}}
                        >UPDATE</Button> 
                        : 
                        <Button variant="contained" color="secondary" type="submit" style={{margin: '0 5px 5px 5px', backgroundColor: '#333'}}>Comment</Button>
                    }
                </form>

                {
                    errorMsg ? <Typography variant="h5">You have to type something !</Typography> : ''
                }
            </div>

            {
                deleteCommentErrMsg ? 
                    <div className={styles.container}>
                        <Typography variant="h6">Comment Deleted Succesfully</Typography> 
                    </div>
                : ''
            }

            {
                allComments.length === 0 ? 
                <div className={styles.container}>
                    <Typography variant="h4">Hey, Be First to Comment!</Typography>
                </div>
                :
                <div className={styles.container}>
                {
                    allComments.map((comment) => (
                        <div className={styles.comments}>
                            <div>
                                <Typography variant="h4" styles={{color: '#333'}}>{comment.commentedBy}</Typography>
                                <Typography variant="h5" color="primary">{comment.comment}</Typography>
                            </div>
                            <div>
                                {/* If the current user === createdBy then only show edit button */}
                                {
                                    localStorage.getItem('username') === comment.commentedBy ? 
                                    <ModeEditOutlineOutlinedIcon onClick={() => handleEditComment(comment.id)} style={{cursor: 'pointer', color: 'green'}}/>
                                    :
                                    ''
                                }
                                <DeleteOutlinedIcon onClick={() => handleDeleteComment(comment.id)} style={{cursor: 'pointer', color: 'red'}} />
                            </div>
                        </div>
                    ))
                }
            </div> 
            }
        </div>
    )
}

export default Comments
