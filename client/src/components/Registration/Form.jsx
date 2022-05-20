import React from 'react'
import { useState, useEffect } from 'react'
import styles from './formStyles.module.css';
import axios from 'axios';
import { useHistory } from 'react-router';
// import PostForm from '../PostForm/PostForm';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Formm = () => {
    const [className, setClassName] = useState(styles.container);

	// adding classes dynamically for the form 
    const addRightPanelActive = () => {
        setClassName(`${styles.container} ${styles.rightpanelactive}`)
    }

    const removeRightPanelActive = () => {
        setClassName(styles.container);
    }
	// ******************************************* //

	const [signUpname, setsignUpname] = useState("");
	const [signUpemail, setsignUpemail] = useState("");
	const [signUppassword, setsignUppassword] = useState("");

	// assignments
	const [roll, setRoll] = useState("");
	const [subject, setSubject] = useState("");
	const [deparment, setDepartment] = useState("");
	const [rollNo, setRollNo] = useState("");


	// validation signup
	const [validName, setValidName] = useState(`${styles.validName} ${styles.notdisp}`);
	const [validEmail, setValidEmail] = useState(`${styles.validEmail} ${styles.notdisp}`);

	const getSignUpValues = (e) => {
		e.preventDefault();
		
		if(!validateName(signUpname)) {
			setValidName(`${styles.validName} ${styles.disp}`);
		} else {
			setValidName(`${styles.validName} ${styles.notdisp}`);
			if(!validateEmail(signUpemail)) {
				setValidEmail(`${styles.validEmail} ${styles.disp}`);
			} else {
				setValidEmail(`${styles.validEmail} ${styles.notdisp}`);
				console.log("everything ok")
				sendSignUpDetailsToServer();
			}
		}
	}

	const validateEmail = (email) => {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
		if(email.match(mailformat)) {
			return true;
		} else {
			return false;
		}
	}

	const validateName = (name) => {
		if(name.length < 4) {
			return false;
		} else {
			return true;
		}
	}

	const [signupStatus, setsignupStatus] = useState('')

	const sendSignUpDetailsToServer = () => {
		axios.post('http://localhost:3001/signup', {
			signUpname: signUpname,
			signUpemail: signUpemail,
			signUppassword: signUppassword,
			signUpDepartment: deparment,
			signUpRoll: roll,
			signUpSubject: subject,
			signUpRollno: rollNo
		}).then((res) => {
			if(res.data === 'Signup succesfull...') {
				setsignupStatus(res.data);
				localStorage.setItem('roll', roll);
				localStorage.setItem('subject', subject);
			} else {
				setsignupStatus('User already exits! Try Other names...')
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	// signin
	const [signinEmail, setsigninEmail] = useState('');
	const [signinPassword, setsigninPassword] = useState('')

	// signin status

	let history = useHistory();
	// const [loggedInStatus, setLoggedInStatus] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const getSigninValues = (e) => {
		e.preventDefault();

		if(signinEmail.length > 0 && signinPassword.length > 0) {
			axios.post('http://localhost:3001/signin', {
				signinEmail: signinEmail,
				signinPassword:signinPassword,
			})
			.then((res) => {
				// setsigninStatus(res.data)
				// console.log(res)
				if(res.data.loggedIn === true) {
					localStorage.setItem('loggedIn', true);
					localStorage.setItem('username', res.data.username);
					localStorage.setItem('roll', res.data.roll);
					localStorage.setItem('subject', res.data.subject);
					console.log(res);
					history.push('/postform');
				} else {
					localStorage.setItem('loggedIn', false);
					localStorage.setItem('username', res.data.username)
					setErrorMessage(res.data.message);
					history.push('/')
				}
			})
			.catch(err => console.log(err))
		}
	}

	// For Assignments Section

  const handleChange = (event) => {
    setRoll(event.target.value);
  };

  const handleChangeSubject = (event) => {
	setSubject(event.target.value);
  }


  useEffect(() => {
	setRoll(roll);
	setSubject(subject);
  }, [roll, subject])

	// usefull if we close the tab and when we are logged in
    useEffect(() => {
        if(localStorage.getItem('loggedIn') === 'true') {
            history.push('/postform')
        } else {
            history.push('/')
        }
    }, [history])

    return (
        <div className={styles.wholeWrapper}>
		<div className={styles.wrapper}>
		<div className={className}>
<div className={`${styles.formcontainer} ${styles.signupcontainer}`}>
	<form className={styles.form} action="#" onSubmit={getSignUpValues}>
		<h1 className={styles.heading}>Create Account</h1>
		<div className={styles.socialcontainer}>
		<a href="/" className={styles.social}><i className="fab fa-facebook-f"></i></a>
		<a href="/" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
		<a href="/" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
		</div>
		<span>or use your email for registration</span>
		<input className={styles.input} type="text" placeholder="Name" onChange={(e) => {setsignUpname(e.target.value)}}/>
		<small className={validName}>**Name must contain atleast 4 chars</small>
		<input className={styles.input} type="text" placeholder="Email" onChange={(e) => {setsignUpemail(e.target.value)}}/>
		<small className={validEmail}>**Please enter a valid email!</small>
		<input className={styles.input} type="password" placeholder="Password" onChange={(e) => {setsignUppassword(e.target.value)}} />

{/* For Assignements section */}
<input className={styles.input} type="text" placeholder="Department" onChange={(e) => {setDepartment(e.target.value)}} />

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Roll</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Roll"
    onChange={handleChange}
  >
    <MenuItem value="student">Student</MenuItem>
    <MenuItem value="teacher">Teacher</MenuItem>
  </Select>
</FormControl> <br />

{/* Form for Subject */}

{
	roll === 'student' ? '' : <FormControl fullWidth>
	<InputLabel id="demo-simple-select-label">Subject</InputLabel>
	<Select
	  labelId="demo-simple-select-label"
	  id="demo-simple-select"
	  label="Subject"
	  onChange={handleChangeSubject}
	>
	  <MenuItem value="machine">Machine Learning</MenuItem>
	  <MenuItem value="web">Web Technologies</MenuItem>
	  <MenuItem value="deep">Deep Learning</MenuItem>
	</Select>
  </FormControl>
}


<input className={styles.input} type="text" placeholder="Roll No" onChange={(e) => {setRollNo(e.target.value)}} />

{/* submit */}


		<button className={styles.signupbutton}>Sign Up</button>
		<small className={styles.status}>{signupStatus}</small>
	</form>
</div>
<div className={`${styles.formcontainer} ${styles.signincontainer}`}>
	<form className={styles.form} action="#" onSubmit={getSigninValues}>
		<h1 className={styles.heading}>Sign in</h1>
		<div className={styles.socialcontainer}>
			<a href="/" className={styles.social}><i className="fab fa-facebook-f"></i></a>
			<a href="/" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
			<a href="/" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
		</div>
		<span>or use your account</span>
		<input className={styles.input} type="email" placeholder="Email" onChange={(e) => setsigninEmail(e.target.value)} />
		<input className={styles.input} type="password" placeholder="Password" onChange={(e) => setsigninPassword(e.target.value)} />
		<a href="/">Forgot your password?</a>
		<button className={styles.signupbutton}>Sign In</button>
		<small className={styles.status}>{errorMessage}</small>
	</form>
</div>
<div className={styles.overlaycontainer}>
	<div className={styles.overlay}>
		<div className={`${styles.overlaypanel} ${styles.overlayleft}`}>
			<h1 className={styles.heading}>Welcome Back!</h1>
			<p className={`${styles.smallP} ${styles.p}`}>To keep connected with us please login with your personal info</p>
			<button className={`${styles.signupbutton} ${styles.ghost}`} onClick={removeRightPanelActive}>Sign In</button>
		</div>
		<div className={`${styles.overlaypanel} ${styles.overlayright}`}>
			<h1 className={styles.heading}>Hello, Friend!</h1>
			<p className={`${styles.smallP} ${styles.p}`}>Enter your personal details and start journey with us</p>
			<button className={`${styles.signupbutton} ${styles.ghost}`} onClick={addRightPanelActive}>Sign Up</button>
		</div>
	</div>
</div>
</div>
	</div>
	</div>
    )
}

export default Formm
