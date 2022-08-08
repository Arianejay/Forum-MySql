import React, { useEffect, useState } from 'react'
import './questions.css'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Questions = ({ user }) => {
  //useState
  const [listQuestion, setListQuestion] = useState([])
  const [comments, setComments] = useState([])

  //useNavigate
  let navigate = useNavigate()

  // Cookies
  const cookies = new Cookies()

  //We get the length of list
  const questionLength = listQuestion.length

  //useEffect ~~ fetch data from the backend
  useEffect(() => {
    //Get Questions
    axios.get('http://localhost:3001/post').then((response) => {
      setListQuestion(response.data)
    })
  }, [listQuestion])

  //Delete Post/Question
  const handleDeleteQuestion = (id) => {
    try {
      axios
        .delete(`http://localhost:3001/post/${id}`, {
          cookies: { accessToken: cookies.get('access-token') },
        })
        .then((response) =>
          toast.success(response.data, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }),
        )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="question__wrapper">
        {/* Header */}
        <div className="question__header">
          <h1>All Questions</h1>
          <p>{questionLength} questions</p>
        </div>

        {/* Card */}
        {listQuestion.map((list) => (
          <div key={list.id}>
            <div className="question__card">
              <div className="question__card--content">
                <div
                  className="question__card--title"
                  onClick={() => navigate(`/question/${list.id}`)}
                >
                  <h1>{list.title}</h1>
                </div>
                <div className="question__card--body">{list.question}</div>
                <div className="question__card--footer">
                  <div className="question__footer--username">
                    {list.username}
                  </div>
                  <div className="question__footer--timestamp">
                    {new Date(list.createdAt).toDateString()}
                  </div>
                  {user && user.username === list.username && (
                    <>
                      <div
                        className="bsTrash"
                        onClick={() => handleDeleteQuestion(list.id)}
                      >
                        <BsTrash />
                      </div>
                      <div
                        className="FiEdit"
                        onClick={() => navigate(`/edit/${list.id}`)}
                      >
                        <FiEdit />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  )
}

export default Questions
