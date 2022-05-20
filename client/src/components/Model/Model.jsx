import React, {useState} from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router'

Modal.setAppElement('#root')
const Model = ({ message }) => {
    let [modalIsOpen, setModalIsOpen] = useState(false)
    const history = useHistory();

    if(message === 'DELETED') {
        modalIsOpen = true;
    }

    const closee = () => {
        history.push('/')
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} 
            onRequestClose={() => setModalIsOpen(false)}
             ariaHideApp={false}
             style={
                 {
                     overlay: {
                         backgroundColor: 'grey'
                     },
                     content:{
                         color: 'orange'
                     }
                 }
             }
             >
                <h2>Modal title</h2>
                <p>Modal body</p>
            <div>
                <button onClick={closee}>Close</button>
            </div>
            </Modal>
        </div>
    )
}

export default Model
