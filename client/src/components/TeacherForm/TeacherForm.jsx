import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { TextField, Button, Typography } from '@material-ui/core';
import styles from './teacherForm.module.css'


import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SearchImage from '../SearchImage/SearchImage'
import { circularProgressClasses } from '@mui/material';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


const TeacherForm = () => {
    const history = useHistory();

    // if not loggedIn we should not allow user to access this route 
    if(localStorage.getItem('loggedIn') === 'false') {
        history.push('/');
    }

    // grab all the values and just send it to backend
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([]);

    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axios.get('http://localhost:3001/getTeacherAss')
        .then(res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    // getting all uploaded assignments
  const [assignments, setAssignments] = useState([])

  const getAssignments = () => {
      axios.get('http://localhost:3001/uploadAss')
      .then(res => {
          console.log(res.data)
          setAssignments(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  }

    useEffect(() => {
      getPosts();
      getAssignments();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formValues = new FormData();
        formValues.append('title', title)
        formValues.append('creator', localStorage.getItem('username'))
        formValues.append('description', description)
        formValues.append('image', image)
        formValues.append('subject', localStorage.getItem('subject'));

        try {
            const res = await axios.post('http://localhost:3001/teacherForm', formValues, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
        } catch(err) {
            console.log(err)
        }

        // history.push('/viewAllPosts')
        getPosts();
        console.log(posts);
    }

    const [pId, setPid] = useState(null);
    const showAss = (postId) => {
      setPid(postId);
    }

    const [marks, setMarks] = useState(0);
    const [gave, setGave] = useState(false)
    const giveMarks = (toWhichAssign) => {
      console.log("toWhichAssign: " + toWhichAssign)
      console.log("Marks: " + marks);

      // send update request to backend
        axios.put('http://localhost:3001/uploadAss/' + toWhichAssign, {
          marks: marks
      }) 
      .then(res => {
          console.log(res)
          setGave(true); 
      })
      .catch((err) => {
          console.log(err)
      })
    }
    

    const classes = useStyles();
    return (
      <div>

        <form className={styles.materialUiForm} autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
        <Typography variant="h4">Assign An Assignment</Typography><span>({localStorage.getItem('username')})</span>
        <TextField name="creator" variant="outlined" label="Title" fullWidth onChange={(e) => setTitle(e.target.value)} value={title}/>
        {/* <TextareaAutosize aria-label="minimum height" minRows={5} fullWidth placeholder="Description" onChange={(e) => setDescription(e.target.value)} /> */}
        <textarea cols="50" rows="6" placeholder="Description..." onChange={(e) => setDescription(e.target.value)}></textarea>
        {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
        <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                    Upload
                    </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
        </div>
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      </form>

      {/* // teacherForm Assingments for current teacher */}
      <div className={styles.con}>
        <h1>Assignments You Assigned</h1>


        <div className={styles.teacherFormContainer}>

        {
          posts.map(post => (

              localStorage.getItem('username') === post.creator ?
              <div className={styles.item}>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="h6" className={styles.desc}>{post.description}</Typography>
                <img className={styles.image} src={`teacherUploads/${post.imageUrl}`} alt={post.imageUrl} />
                <Button variant="contained" color="primary" component="span" onClick={() => showAss(post.id)}>View All Submissions</Button> <br /><br />

                {/* get assignments if uploaded */}
                {
                  assignments.map(ass => (
                    post.id === ass.toWhichAssign && localStorage.getItem('username') === post.creator && pId === post.id ? 
                    <div>
                    <Typography variant="h6" className={styles.uploadedTag}>{ass.whoUploaded}</Typography> <br />
                    <embed src={`assignments/${ass.assignment}`} width="100%" height="200px" /> <br /><br />
                    <TextField name="creator" variant="outlined" label="Marks" onChange={(e) => setMarks(e.target.value)} fullWidth/> <br /> <br />
                    <Button variant="contained" color="primary" component="span" onClick={() => giveMarks(ass.toWhichAssign)}>Give Marks</Button><br /><br />

                    {
          gave === true ? <Alert severity="success">Marks Uploaded Succesfully!!</Alert> : "" 
        }
                  </div>
                    : ''
                  ))
                }
            </div>
              : '' 
          ))
        }
        
            </div>
      </div>
    </div>

    )
}

export default TeacherForm
