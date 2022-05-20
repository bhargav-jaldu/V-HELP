import React, {useState, useEffect} from 'react'
import styles from './chat.module.css'
import axios from 'axios'
import {Typography} from '@material-ui/core'
import { Link } from 'react-router-dom'


const Chat = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get('http://localhost:3001/chat/')
        .then((res) => {
            console.log(res.data.chat)
            setUsers(res.data.chat);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className={styles.container}>
            <Typography variant="h3">Chat With: </Typography>
            {
                users.length > 0 ? users.map((user) => 
                user.name === localStorage.getItem('username') ? '' : 
                    <div>
                        <Link to={`/chat/${user.id}`}><Typography variant="h4">{user.name}</Typography></Link>
                    </div>
                ) : ''
            }
        </div>
    )
}

export default Chat
