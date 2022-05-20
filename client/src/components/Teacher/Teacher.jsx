import React from 'react'
import styles from './teacher.module.css'
import TeacherForm from '../TeacherForm/TeacherForm'

const Teacher = () => {
  return (
    <div className={styles.containerr}>
        {/* teacher can assing assignment */}

        {/* which Teacher */}
        {localStorage.getItem('subject').toUpperCase() === "MACHINE" ? <h1 className={styles.subject}>MACHINE LEARNING</h1> : ''} 
        <br />
        <h1 className={styles.title}>Assign an Assignment</h1>

        <TeacherForm />
    </div>
  )
}

export default Teacher