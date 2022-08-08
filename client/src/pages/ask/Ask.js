import React, { useState } from 'react'
import './ask.css'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate, Link } from 'react-router-dom'

const Ask = ({ user }) => {
  // useStates
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')

  //useNavigate
  let navigate = useNavigate()

  // Cookies
  const cookies = new Cookies()

  //Submit Function
  const handleSubmit = () => {
    //Send data to the backend
    axios
      .post(
        'http://localhost:3001/post',
        { title, question, username: user.username, UserId: user.id },
        {
          cookies: { accessToken: cookies.get('access-token') },
        },
      )
      .then(() => {
        navigate('/')
      })
  }

  return (
    <div className="ask__wrapper">
      <div className="ask__header">Ask a Question.</div>
      <div className="ask__input">
        <input
          type="text"
          placeholder="Title..."
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Question..."
          spellCheck="false"
          wrap="soft"
          maxLength={5000}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="ask__button">
        {user ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <Link to="/login" className="link">
            <button>Log in</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Ask
