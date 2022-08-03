import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Ask from '../ask/Ask'
import Home from '../home/Home'
import Login from '../login/Login'
import Register from '../register/Register'

const Main = ({ user }) => {
  const location = useLocation()

  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/ask" element={<Ask user={user} />} exact />
      </Routes>
    </div>
  )
}

export default Main
