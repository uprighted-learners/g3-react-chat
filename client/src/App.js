import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
// import Auth from './components/Auth';
import { React, useState } from 'react'
import Room from './pages/Room/index'
import Login from './pages/Home/index'

export default function App() {
  const [type, setType] = useState('signIn')

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text)
      return
    }
  }

  // See https://hygraph.com/blog/routing-in-react js-using-react-router for routing explanation
  return (
    <div>
      <Routes>
        <Route
          exact
          path='/'
          element={<Login type={type} handleOnClick={handleOnClick} />}
        />
        <Route path='/room' element={<Room />} />
      </Routes>
    </div>
  )
}
