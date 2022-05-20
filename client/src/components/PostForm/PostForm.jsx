import React from 'react'
import {useState} from 'react'
import styles from './postForm.module.css'
import { useHistory } from 'react-router'
import axios from 'axios'
import { TextField, Button, Typography } from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SearchImage from '../SearchImage/SearchImage'

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


const PostForm = () => {
    const history = useHistory();

    // if not loggedIn we should not allow user to access this route 
    if(localStorage.getItem('loggedIn') === 'false') {
        history.push('/');
    }

    // grab all the values and just send it to backend
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formValues = new FormData();
        formValues.append('title', title)
        formValues.append('creator', localStorage.getItem('username'))
        formValues.append('description', description)
        formValues.append('image', image)

        try {
            const res = await axios.post('http://localhost:3001/createPost', formValues, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
        } catch(err) {
            console.log(err)
        }

        history.push('/viewAllPosts')
    }

    const classes = useStyles();
    return (
      <div>
        <form className={styles.materialUiForm} autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
        <Typography variant="h4">Create a Post</Typography><span>({localStorage.getItem('username')})</span>
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
      <SearchImage />
      </div>
    )
}

export default PostForm
