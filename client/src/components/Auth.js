import React, { useState } from 'react';

function Auth({ onSignup, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (isSignup) {
      onSignup(email, password, firstName, lastName);
    } else {
      onLogin(email, password);
    }
  };

  const switchForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(evt.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </label>
        <button type='submit'>{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button onClick={switchForm}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
      </button>
    </div>
  );
}

export default Auth;
