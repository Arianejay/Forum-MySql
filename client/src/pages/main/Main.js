import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import About from '../about/About'
import Ask from '../ask/Ask'
import Edit from '../edit/Edit'
import Home from '../home/Home'
import Login from '../login/Login'
import Profile from '../profile/Profile'
import Question from '../question/Question'
import Register from '../register/Register'

const Main = ({ user }) => {
  const location = useLocation()

  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home user={user} />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/login" element={user ? <Home /> : <Login />} exact />
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
          exact
        />
        <Route path="/ask" element={<Ask user={user} />} exact />
        <Route path="/question/:id" element={<Question user={user} />} exact />
        <Route path="/edit/:id" element={user ? <Edit /> : <Login />} exact />
        <Route
          path="/profile/:id"
          element={user ? <Profile user={user} /> : <Login />}
          exact
        />
      </Routes>
    </div>
  )
}

export default Main
