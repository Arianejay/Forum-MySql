import React from 'react'
import Questions from '../../components/questions/Questions'

const Home = ({ user }) => {
  return (
    <div className="home__wrapper">
      <div className="home__content">
        <Questions user={user} />
      </div>
    </div>
  )
}

export default Home
