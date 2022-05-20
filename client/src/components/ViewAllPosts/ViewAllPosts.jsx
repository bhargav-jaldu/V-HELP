import React from 'react'
import {useState, useEffect} from 'react'
import styles from './viewAllPosts.module.css'
import axios from 'axios'
import { useHistory } from 'react-router'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'

const ViewAllPosts = () => {
    const history = useHistory();
    
    // if not loggedIn we should not allow user to access this route 
    if(localStorage.getItem('loggedIn') === 'false') {
        history.push('/');
    }

    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axios.get('http://localhost:3001/getPosts')
        .then(res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getPosts();
    }, [])

    // like
    const handleLike = (postId) => {
        axios.post('http://localhost:3001/likes', {
            whoLiked: localStorage.getItem('username'),
            postId: postId
        })
        .then(res => {
            // console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        window.location.reload(true)
        likes();
        getHowManyLikes();
    }


    const [youLiked, setYouLiked] = useState([])
    const likes = () => {
        axios.get(`http://localhost:3001/getLikes?username=${localStorage.getItem('username')}`)
        // request.params.username
        .then(res => {
            // console.log(res.data.result)
            setYouLiked(res.data.result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const [howManyLikes, setHowManyLikes] = useState([])
    const getHowManyLikes = () => {
        axios.get('http://localhost:3001/howManyLikes')
        .then(res => {
            setHowManyLikes(res.data.howManyLikesForEachPost);
        })
        .catch(err => {
            console.log(err)
        })
    }

    function renderIcon(postId) {
        for(let i = 0;i < youLiked.length;i++) {
            if(youLiked[i] === postId) {
                return true;
            }
        }

        return false;
    }

    const handleEdit = (postId) => {
        console.log(postId)
        let title = prompt('Title: ')
        let message = prompt("Message: ")

        if (title === null && message === null) {
            alert("Please fill the prompts....")
        } else {
            // send to backend
        axios.post('http://localhost:3001/updatePost', {
            title: title,
            postId: postId,
            message: message
        })
        .then(res => {
            console.log(res.data)
            if(res.data.message === 'UPDATED') {
                setMessage("UPDATED SUCCESFULLY")
                setModal(true);
            }
            getPosts();
        })
        .catch(err => {
            console.log(err)
        })
        }
    }

    let [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = (postId) => {
        console.log(postId)
        axios.delete('http://localhost:3001/deletePost/' + postId)
        .then(res => {
            console.log(res.data)
            if(res.data.message === 'DELETED') {
                setMessage("DELETED SUCCESFULLY")
                setModal(true);
            }
            getPosts();
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        likes()
        getHowManyLikes();
    }, [])
    // let [modalIsOpen, setModalIsOpen] = useState(false)
    const closee = () => {
        setModal(false)
    }

    const [search, setSearch] = useState("");
    // const handleSearch = (e) => {
    //     e.preventDefault();

    //     console.log(search)
    // }
    
    return (
        <>
            <div className={styles.postsContainer}>
                <TextField variant="outlined" label="Search By Title" fullWidth style={{margin: '10px 0'}} onChange={(e) => setSearch(e.target.value)}></TextField>
            </div>
        <div className={styles.postsContainer}>
            {
                posts.filter(post => {
                    if(search === '') {
                        return post;
                    } else if(post.title.toLowerCase().includes(search.toLowerCase())) {
                        return post;
                    }
                }).map((post) => {
                    return (
                        <div key={post.id} className={styles.post}>
                            <Typography variant="h5" style={{padding: '10px 0 0 10px'}}>{post.creator}</Typography>
                            <Typography variant='body2' style={{padding: '0px 0 10px 10px', color: '#666'}}>{moment(post.time).fromNow()}</Typography>
                            <img src={`uploads/${post.imageUrl}`} alt={post.imageUrl} />
                            <div className={styles.content}>
                            <Typography variant="h6">{post.title}</Typography>
                            <div className={styles.descCont}>
                                <Typography className={styles.desc}>
                                    {
                                        post.description.length > 100 ? post.description.substring(0, 100) + '...' : (post.description)
                                    }
                                </Typography>
                            </div>
                            </div>
                            <div className={styles.likeCont}>
                            <button className={styles.like} onClick={() => handleLike(post.id)} >
                            {
                                renderIcon(post.id) ? <FavoriteIcon style={{color: 'red'}} /> : <FavoriteBorderIcon />
                            }
                            </button>
                            {
                                youLiked.map(like => {
                                    return like === post.id ? (<Typography style={{display: 'inline'}}  variant="body2" key={post.id}>You and&nbsp;</Typography> ) : (<Typography style={{display: 'inline'}}></Typography>)
                                })
                            }

                            {
                                howManyLikes.map(likes => {
                                    return likes.postId === post.id  ? (<Typography style={{display: 'inline'}} variant="body2" >{ likes.count } Others</Typography>) : (<Typography style={{display: 'inline'}}></Typography>)
                                })
                            }
                            </div>
                            {/* <Button variant="contained" color="primary" type="submit" style={{margin: '0 5px 5px 5px'}} onClick={() => handleClick(post.id)}><Link to={`/viewDetail/${post.id}`}>VIEW</Link></Button> */}
                            <Link to={`/viewAllPosts/${post.id}`}><Button variant="contained" color="primary" style={{margin: '0 5px 5px 10px'}}>VIEW</Button></Link>
                            {
                                post.creator === localStorage.getItem('username') ? <Button variant="contained" color="secondary" type="submit" style={{margin: '0 5px 5px 5px'}} onClick={() => handleEdit(post.id)}>Edit</Button> : ''
                            }
                            {
                                post.creator === localStorage.getItem('username') ? <Button variant="contained" color="secondary" type="submit" style={{margin: '0 5px 5px 5px',
                                 backgroundColor: 'purple'}} onClick={() => handleDelete(post.id)}>DELETE</Button> : ''
                            }

                            {
                                modal === true ? <div>
                                <Modal isOpen={modal} 
                                onRequestClose={() => setModal(false)}
                                 style={
                                     {
                                         overlay: {
                                             backgroundColor: 'grey'
                                         },
                                         content:{
                                             color: 'orange',
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             flexDirection: 'column'
                                         },
                                     }
                                 }
                                 >
                                    <h2>{message}</h2>
                                <div>
                                <Button variant="contained" color="primary" onClick={closee}>Close</Button>
                                </div>
                                </Modal>
                            </div> : ''
                            }
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default ViewAllPosts

// https://www.javascripttutorial.net/javascript-merge-objects/