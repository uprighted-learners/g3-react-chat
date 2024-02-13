import logo from './logo.svg';
import './App.css';
// import Auth from './components/Auth';
import React, {useState} from 'react';
// import './Styles.css';
import Room from './components/Room';
import Layout from './components/Layout';
import Login from './components/Login';

export default function App() {
  const [type, setType] = useState('signIn');
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  return (
    <div className="App">
      <Layout>
        {/* we should implement routing here, only one of these should be active at a time */}
        {/* <Login type={type} handleOnClick={handleOnClick} /> */}
        <Room />
      </Layout>
    </div>
  );
}
