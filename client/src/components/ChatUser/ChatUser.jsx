import React, {useState, useEffect} from 'react'
import styles from './chatUser.module.css'
import {Typography, TextField} from '@material-ui/core'
import axios from 'axios'

const ChatUser = () => {
    const [name, setName] = useState('');

    const url = window.location.href;
    const arr = url.split('/');
    const match = arr[arr.length - 1];

    const getUser = () => {
        axios.get('http://localhost:3001/chat/'+ match)
        .then((res) => {
            setName(res.data.user[0].name)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className={styles.container}>
            <h1>{name}</h1>
            <TextField
                variant="outlined" label="Type..." className={styles.textField}
                multiline
                minRows={3}
                maxRows={4}
            />
            <div className={styles.msgContainer}>
                <Typography variant="h6" className={styles.msg}>Hello!</Typography>
            </div>
        </div>
    )
}

export default ChatUser
