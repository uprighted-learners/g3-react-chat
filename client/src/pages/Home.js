import './styles.css';
import SignInForm from '../components/Login/SignIn';
import SignUpForm from '../components/Login/SignUp';

function Login(props) {
  const containerClass = 'container ' + (props.type === 'signUp' ? 'right-panel-active' : '');

  return (
    <>
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => props.handleOnClick('signIn')}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost " id="signUp" onClick={() => props.handleOnClick('signUp')}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
