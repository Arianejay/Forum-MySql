import React, { useEffect, useState } from 'react'
import './question.css'
import { BiUpvote } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Question = ({ user }) => {
  // useState
  const [objectQuestion, setObjectQuestion] = useState({})
  const [comment, setComment] = useState('')
  const [listComments, setListComments] = useState([])
  const [listLikes, setListLikes] = useState([])

  //We get the length of comments list
  const commentLength = listComments.length

  //useParams
  let { id } = useParams()

  // Cookies
  const cookies = new Cookies()

  //useEffect ~~ fetch the data from the backend by id
  useEffect(() => {
    // Get Questions
    axios
      .get(`http://localhost:3001/post/${id}`, {
        cookies: { accessToken: cookies.get('access-token') },
      })
      .then((response) => {
        setObjectQuestion(response.data)
      })

    // Get Comments
    axios.get(`http://localhost:3001/comment/${id}`).then((response) => {
      setListComments(response.data)
    })

    //Get Likes List
    axios
      .get('http://localhost:3001/like', {
        PostId: id,
      })
      .then((response) => {
        setListLikes(response.data)
        console.log(listLikes)
      })
  }, [objectQuestion])

  // Send Comment value to the backend
  const handleSubmitComment = () => {
    axios.post(
      'http://localhost:3001/comment',
      {
        commentText: comment,
        PostId: id,
        username: user.username,
      },
      {
        cookies: { accessToken: cookies.get('access-token') },
      },
    )
    setComment('')
  }

  // Delete comment by user
  const handleDeleteComment = (postId) => {
    axios.delete(`http://localhost:3001/comment/${postId}`, {
      cookies: { accessToken: cookies.get('access-token') },
    })
  }

  //Upvote or like post
  const handleUpvotePost = () => {
    axios.post(
      'http://localhost:3001/like',
      {
        UserId: user.id,
        PostId: id,
      },
      {
        cookies: { accessToken: cookies.get('access-token') },
      },
    )
  }

  return (
    <div className="question__wrapper">
      {/* Header */}
      <div className="question__header">
        <h1>{objectQuestion.title}</h1>
        <div className="question__header--data">
          <p>
            Asked{' '}
            <span>{new Date(objectQuestion.createdAt).toDateString()}</span>
          </p>
          <p>
            Modified{' '}
            <span>{new Date(objectQuestion.updatedAt).toDateString()}</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="question__body">
        <div className="question__body--icon">
          <BiUpvote className="biUpvote" onClick={handleUpvotePost} />
          <p>{listLikes.length}</p>
        </div>
        <div className="question__body--content">
          <p>{objectQuestion.question}</p>
        </div>
      </div>

      {/* Answers */}
      <div className="question__answer--wrapper">
        <div className="question__answer--header">{commentLength} Answers</div>
        {listComments.map((item) => (
          <div className="question__answer--card" key={item.id}>
            <div className="question__answer--body">
              <p>{item.commentText}</p>
            </div>
            <div className="question__answer--footer">
              <div className="question__answer--username">{item.username}</div>
              <div className="question__answer--timestamp">
                {new Date(item.createdAt).toDateString()}
              </div>
              {user && user.username === item.username && (
                <div
                  className="bsTrash"
                  onClick={() => handleDeleteComment(item.id)}
                >
                  <BsTrash />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comment */}
      <div className="question__comment--wrapper">
        <div className="question__comment--header">
          <p>Know the answer?</p>
        </div>
        <textarea
          placeholder="Answer..."
          value={comment}
          spellCheck="false"
          wrap="soft"
          onChange={(e) => setComment(e.target.value)}
        />
        {user ? (
          <button onClick={handleSubmitComment}>Submit</button>
        ) : (
          <Link to="/login" className="link">
            <button>Log in</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Question
