import React, { useEffect, useState } from 'react'
import './questions.css'
import axios from 'axios'

const Questions = () => {
  //useState
  const [listQuestion, setListQuestion] = useState([])

  // We get the length if list
  const questionLength = listQuestion.length

  //useEffect ~~ fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/post').then((response) => {
      setListQuestion(response.data)
    })
  }, [listQuestion])

  return (
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
            <div className="question__card--data">
              <p>0 votes</p>
              <p>1 answers</p>
            </div>
            <div className="question__card--content">
              <div className="question__card--title">
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Questions
