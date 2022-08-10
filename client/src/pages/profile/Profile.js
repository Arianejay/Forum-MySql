import React, { useEffect, useState } from 'react'
import './profile.css'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('Questions')
  const [listQuestion, setListQuestion] = useState([])
  const [listComment, setListComment] = useState([])

  //useParams && useNavigate
  let { id } = useParams()
  let navigate = useNavigate()

  // Cookies
  const cookies = new Cookies()

  //useEffect
  useEffect(() => {
    //Get Questions
    axios.get(`http://localhost:3001/post/user/${id}`).then((response) => {
      setListQuestion(response.data)
    })

    //Get Comments
    axios.get(`http://localhost:3001/comment/user/${id}`).then((response) => {
      setListComment(response.data)
    })
  }, [listQuestion, listComment])

  //Delete Post/Question
  const handleDeleteQuestion = async (id) => {
    try {
      await axios
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

  //Delete Comment
  const handleDeleteComment = async (postId) => {
    try {
      await axios
        .delete(`http://localhost:3001/comment/${postId}`, {
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
      <div className="profile__wrapper">
        {/* Header */}
        <div className="profile__header">
          <h1>{user.username}</h1>
          <div className="profile__sort">
            <p
              style={
                activeTab === 'Questions'
                  ? { color: '#1363df' }
                  : { color: '#1b2430' }
              }
              onClick={() => setActiveTab('Questions')}
            >
              Questions
            </p>
            <p
              style={
                activeTab === 'Comments'
                  ? { color: '#1363df' }
                  : { color: '#1b2430' }
              }
              onClick={() => setActiveTab('Comments')}
            >
              Comments
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="profile__body">
          {/* Questions/Posts */}
          {listQuestion.map(
            (list) =>
              activeTab === 'Questions' && (
                <div className="profile__card">
                  <div className="profile__card--content">
                    <div
                      className="profile__card--title"
                      onClick={() => navigate(`/question/${list.id}`)}
                    >
                      <h1>{list.title}</h1>
                    </div>
                    <div className="profile__card--body">{list.question}</div>
                    <div className="profile__card--footer">
                      <div className="profile__footer--timestamp">
                        <p>
                          Created{' '}
                          <span>{new Date(list.createdAt).toDateString()}</span>
                        </p>
                        <p>
                          Modified{' '}
                          <span>{new Date(list.updatedAt).toDateString()}</span>
                        </p>
                      </div>
                      <div className="profile__footer--icons">
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
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )}

          {/* Comments */}
          {listComment.map(
            (item) =>
              activeTab === 'Comments' && (
                <div className="question__answer--card" key={item.id}>
                  <div
                    className="question__answer--body"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/question/${item.PostId}`)}
                  >
                    <p>{item.commentText}</p>
                  </div>
                  <div className="question__answer--footer">
                    <div className="question__answer--timestamp">
                      <p>
                        Commented{' '}
                        <span>{new Date(item.createdAt).toDateString()}</span>
                      </p>
                    </div>
                    <div
                      className="bsTrash"
                      onClick={() => handleDeleteComment(item.id)}
                    >
                      <BsTrash />
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
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

export default Profile
