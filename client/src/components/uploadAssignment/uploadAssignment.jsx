import React from 'react'
import Teacher from '../Teacher/Teacher'
import Student from '../Student/Student'
import styles from './uploadAss.module.css'
import axios from 'axios'

const uploadAssignment = () => {

  return (
    <div className={styles.container}>
        {/* if the current user is a teacher then we have to show -- assign a assignemt section, uploaded assignments by the students, give marks to the ass */}
        {/* if the current user is a student then we have to show -- the assignments that are pending and completed, marks for the completed assignment */}

        {/* Teacher */}

        {
          localStorage.getItem('roll') === 'teacher' ? <Teacher /> : <Student />
        }
    </div>
  )
}

export default uploadAssignment