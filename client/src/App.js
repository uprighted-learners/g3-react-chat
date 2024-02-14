import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
// import Auth from './components/Auth';
import {React, useState} from 'react';
import Room from './components/Room';
import Layout from './layout/Layout';
import Login from './pages/Home';

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
      <Router>
        <Routes>
          <Route exact path="/" element={<Login type={type} handleOnClick={handleOnClick} />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}
