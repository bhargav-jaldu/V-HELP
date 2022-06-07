import React, { useEffect, useState } from 'react'
import styles from './Nav.module.css';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import {Button} from "@material-ui/core"
import {Typography} from '@material-ui/core'


const Nav = () => {
    const history = useHistory();
    
    const handleLogout = () => {
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('username', '')
        localStorage.setItem('roll', '')
        localStorage.setItem('subject', '')
        history.push('/')
    }

    const [loggedInStatus, setLoggedInStatus] = useState(false);
    let statusOfLogin = localStorage.getItem('loggedIn')
    useEffect(() => {
        setLoggedInStatus(statusOfLogin);
    }, [statusOfLogin]) 
    
    let result;

    const [home, setHome] = useState(false);
    const [posts, setPosts] = useState(false);
    const [chat, setChat] = useState(false)
    const [map, setMap] = useState(false)
    const [ass, setAss] = useState(false)

    const handleHome = () => {
        setHome(true);
        setPosts(false);
        setMap(false)
        setChat(false);
        setAss(false);
    }

    const handlePosts = () => {
        setPosts(true);
        setHome(false);
        setChat(false);
        setMap(false)
        setAss(false);
    }

    const handleChat = () => {
        setChat(true);
        setHome(false);
        setPosts(false);
        setMap(false)
        setAss(false);
    }

    const handleMap = () => {
        setMap(true)
        setChat(false);
        setHome(false);
        setPosts(false);
        setAss(false);
    }
    
    const uploadAssignement = () => {
        setAss(true);
        setMap(false)
        setChat(false);
        setHome(false);
        setPosts(false);
    }



        if(loggedInStatus === 'true') {
            result = <div className={styles.container}>
            <nav className={styles.navbar}>
                <Typography variant = "h5">V-HELP</Typography>
                <div className={styles.navContainer}>
                    <ul>
                        <Link to='/postform'><li className={home ? styles.selected : ''} onClick={handleHome}>Home</li></Link>
                        <Link to='/viewAllPosts'><li className={posts ? styles.selected : ''} onClick={handlePosts}>Posts</li></Link>
                        <Link to='/uploadAssignement'><li className={ass ? styles.selected : ''} onClick={uploadAssignement}>Assignements</li></Link>
                        {/* <Link to='/chat'><li className={chat ? styles.selected : ''} onClick={handleChat}>Chat</li></Link>
                        <Link to='/maps'><li className={map ? styles.selected : ''} onClick={handleMap}>Maps</li></Link> */}
                    </ul>
                </div>
                <Button variant='contained' color='primary' onClick={handleLogout} className={styles.logout}>LOGOUT</Button>
            </nav>
        </div>
        } else {
            result = <div className={styles.container}>
                <nav className={styles.navbar}>
                <Typography variant = "h5">V-HELP</Typography>
                </nav>
            </div>
        }

    // console.log(result)
    return (
        result
    )
}

export default Nav
