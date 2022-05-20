import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/NavBar/Nav'
import PostForm from './components/PostForm/PostForm'
import Formm from './components/Registration/Form'
import ViewAllPosts from './components/ViewAllPosts/ViewAllPosts'
import PostDetail from './components/PostDetail/PostDetail'
import Chat from './components/Chat/Chat'
import ChatUser from './components/ChatUser/ChatUser'
import uploadAssignement from './components/uploadAssignment/uploadAssignment'

// https://medium.com/@ideepaksharma/develop-and-integrate-amazon-lex-chatbot-into-website-47f50fe4cfed

const App = () => {
    
    return (
        <div>
            <Router>
                <Route path='/' component={Nav} />
                <Route path='/' exact component={Formm} />
                <Switch>
                    <Route path="/postForm" exact component={PostForm} />
                    <Route path="/viewAllPosts" exact component={ViewAllPosts} />
                    <Route path="/viewAllPosts/:id" component = {PostDetail} />
                    <Route path = "/uploadAssignement" component = {uploadAssignement} />
                    <Route path="/chat" exact component= {Chat} />
                    <Route path="/chat/:id" component= {ChatUser} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
