import React, {useState, useEffect } from 'react'
import styles from './student.module.css'
import axios from 'axios'
import { Button, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const Student = () => {
  const [image, setImage] = useState([]);

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

const classes = useStyles();


  const [ass, setAss] = useState([]);

  const getAss = () => {
    axios.get('http://localhost:3001/getAssignments')
        .then(res => {
            console.log(res.data)
            setAss(res.data)
        })
        .catch(err => {
            console.log(err)
        })
  }

  const handleSubmit = async (postId) => {
    const formValues = new FormData();
        formValues.append('toWhichAssignment', postId)
        formValues.append('whoUploaded', localStorage.getItem('username'))
        formValues.append('subject', localStorage.getItem('subject'))
        formValues.append('pdf', image)

        try {
            const res = await axios.post('http://localhost:3001/uploadAss', formValues, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
            getAssignments();
        } catch(err) {
            console.log(err)
        }
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
    getAss();
    getAssignments();
  }, [])

  return (
    <div className={styles.con}>
        <Typography variant="h3">Assignments</Typography>

        <div className={styles.teacherFormContainer}>

        {
          ass.map(post => (
              <div className={styles.item}> 
                <Typography variant="h6" className={styles.tag}>{post.subject}</Typography>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="h6" className={styles.desc}>{post.description}</Typography>
                <img className={styles.image} src={`teacherUploads/${post.imageUrl}`} alt={post.imageUrl} />
                {/* <input type="file" name="pdf" />  */}

{/* pdf upload */}

                <div className={classes.root}>
                <input
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    accept="application/pdf, application/vnd.ms-excel"
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

            <Button variant="contained" color="primary" size="large" type="submit" onClick={() => handleSubmit(post.id)} fullWidth>Submit</Button>

<br /><br />
            {
              assignments.map(ass => (
                ass.toWhichAssign === post.id && ass.whoUploaded === localStorage.getItem('username') ? 
                <>
                    <div className={styles.marks}>
                      <Typography variant="h6" className={styles.uploadedTag}>Uploaded</Typography>   
                      <Typography variant="h6" className={styles.marksTag}>
                        {
                          ass.marks === 0 ? "Not Evaluated" : `Marks: ${ass.marks}`
                        }
                        </Typography> 
                    </div>  <br />
                    <embed src={`assignments/${ass.assignment}`} width="100%" height="400px" />
                </>
                : ""
              ))
            }
            </div>
          ))
        }
            </div>
      </div>
  )
}

export default Student