<<<<<<< HEAD
import React from 'react';
import {useNavigate} from 'react-router-dom';
=======
import React from 'react'
>>>>>>> 9bf981fc1f0a29f4a2046b262d6a35e6540fc4e6

function SignInForm() {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const {email, password} = state;
    try {
      const response = await fetch('http://localhost:8080/userAuth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const res = await response.json();
      if (response.ok) {
        // login successed
        localStorage.setItem('userInfo', JSON.stringify(response));
        alert(res.message);
        navigate('/room');
      } else {
        // login failed
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    for (const key in state) {
      setState({
        ...state,
        [key]: '',
      })
    }
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input type="email" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignInForm
