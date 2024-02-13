import React from 'react';
function SignUpForm() {
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { firstName, lastName, email, password } = state;
    alert(
      `You are sign up with first name: ${firstName} last name: ${lastName} email: ${email} and password: ${password}`,
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: '',
      });
    }
  };

  return (
    <div className='form-container sign-up-container'>
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className='social-container'>
          <a href='#' className='social'>
            <i className='fab fa-facebook-f' />
          </a>
          <a href='#' className='social'>
            <i className='fab fa-google-plus-g' />
          </a>
          <a href='#' className='social'>
            <i className='fab fa-linkedin-in' />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type='text'
          name='firstName'
          value={state.firstNamename}
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
  );
}

export default SignUpForm;
