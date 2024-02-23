import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'

function SignUpForm() {
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const handleOnSubmit = (evt) => {
    evt.preventDefault()

    const { firstName, lastName, email, password } = state
    // send a request to the server to create a new user server/routes/userAuth.js
    axios
      .post('http://localhost:8080/userAuth/register', {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        // handle successful creation of user
        console.log(response)
        // clear form fields
        setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          type: 'signIn',
        })
        alert('User created successfully')
      })
      .catch((error) => {
        // handle error during creation of user
        console.error(error)
      })
  }

  return (
    <div className='form-container sign-up-container'>
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {/* These are here as potential placeholders for integration of social login connections. */}
        <div className='social-container'>
          <a href='#' className='social'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href='#' className='social'>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href='#' className='social'>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type='text'
          name='firstName'
          value={state.firstName}
          onChange={handleChange}
          placeholder='First Name'
        />
        <input
          type='text'
          name='lastName'
          value={state.lastName}
          onChange={handleChange}
          placeholder='Last Name'
        />
        <input
          type='email'
          name='email'
          value={state.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <input
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
