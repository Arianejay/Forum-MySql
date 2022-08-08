import React, { useEffect, useState } from 'react'
import './edit.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Edit = () => {
  //useStates
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [data, setData] = useState({})

  //useParams
  let { id } = useParams()

  // Cookies
  const cookies = new Cookies()

  //Get Post/Question details ~~ for placeholder
  useEffect(() => {
    axios.get(`http://localhost:3001/post/${id}`).then((response) => {
      setData(response.data)
    })
  }, [data])

  //Post update
  const handleUpdate = async () => {
    try {
      await axios
        .put(
          `http://localhost:3001/post/${id}`,
          {
            title,
            question,
          },
          {
            cookies: { accessToken: cookies.get('access-token') },
          },
        )
        .then((response) => {
          toast.success(response.data, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setTitle('')
          setQuestion('')
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="edit__wrapper">
        <div className="edit__header">Update Question</div>

        {/* Input */}
        <div className="edit__input">
          <input
            type="text"
            value={title}
            autoFocus={true}
            placeholder={data.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            maxLength={5000}
            value={question}
            placeholder={data.question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="edit__button">
          <button onClick={handleUpdate}>Submit</button>
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

export default Edit
