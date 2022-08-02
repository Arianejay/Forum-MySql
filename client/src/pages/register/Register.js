import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Register = ({ user }) => {
  // Usestates
  const [error, setError] = useState(null)

  // For Formik
  const initialValues = {
    username: '',
    password: '',
  }
  const validationSchema = yup.object().shape({
    username: yup.string().min(3).max(15).required(),
    password: yup.string().min(3).max(15).required(),
  })

  // Register Submit
  const handleSubmit = (data) => {
    axios.post('http://localhost:3001/auth/register', data).then((response) => {
      if (response.data.error) {
        setError(true)
      } else {
        setError(false)
      }
    })
  }

  return (
    <div className="register__wrapper">
      <div className="register__form">
        {/* Logo -- Header */}
        <div className="register__header">
          Ask it!
          <p>Register</p>
        </div>

        <div className="register__content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {/* Inputs */}
            <Form className="register__input--wrapper">
              <Field
                autoComplete="off"
                name="username"
                placeholder="Username..."
                className="register__input"
              />
              <ErrorMessage
                className="register__error"
                name="username"
                component="span"
              />
              <Field
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Password..."
                className="register__input"
              />
              <ErrorMessage
                className="register__error"
                name="password"
                component="span"
              />

              {/* If there is error */}
              {error && (
                <span
                  style={{
                    fontSize: '0.9rem',
                    marginTop: '0.3rem',
                    color: '#ff869e',
                  }}
                >
                  User already taken.
                </span>
              )}
              {error === false && (
                <span
                  style={{
                    fontSize: '0.9rem',
                    marginTop: '0.3rem',
                    color: '#5BB318',
                  }}
                >
                  Registration successful.{' '}
                  <Link to="/login" className="link">
                    Log in.
                  </Link>
                </span>
              )}

              {/* Button */}
              <button className="register__button" type="submit">
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {/* Log in Link */}
      <div className="register__link--login">
        <h1>
          Already have an account? {''}
          <span>
            <Link to="/login" className="link">
              Sign in
            </Link>
          </span>
        </h1>
      </div>
    </div>
  )
}

export default Register
