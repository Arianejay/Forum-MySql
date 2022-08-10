import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

const Login = () => {
  // Usestates
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  // UseNavigate
  let navigate = useNavigate()

  // UseContext
  const { dispatch, isFetching } = useContext(Context)

  // Pass it to the backend
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })

    try {
      axios
        .post(
          'http://localhost:3001/auth/login',
          {
            username,
            password,
          },
          { withCredentials: true },
        )
        .then((response) => {
          if (response.data.error) {
            dispatch({ type: 'LOGIN_FAILURE' })
            setError(true)
          } else {
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
            setError(false)
            navigate('/')
          }
        })
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' })
      setError(true)
    }
  }

  return (
    <div className="login__wrapper">
      <div className="login__form--wrapper">
        <div className="login__form">
          {/* Logo -- Header */}
          <div className="login__header">
            Ask it!
            <p>Log in</p>
          </div>

          <div className="login__content">
            <form onSubmit={handleSubmit}>
              {/* Inputs */}
              <input
                type="text"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Loading fetch */}
              {isFetching && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Logging in...
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: '0.3rem' }}
                  >
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </span>
              )}

              {/* If there is error */}
              {error && (
                <span
                  style={{
                    fontSize: '0.9rem',
                    marginTop: '0.3rem',
                    color: '#ff869e',
                  }}
                >
                  Error, wrong credentials.
                </span>
              )}

              {/* Button */}
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>

        {/* Register Link */}
        <div className="login__link--register">
          <h1>
            Don't have an account? {''}
            <span>
              <Link to="/register" className="link">
                Sign Up
              </Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Login
