import React from 'react'
import './profile.css'

const Profile = ({ user }) => {
  return (
    <div className="profile__wrapper">
      {/* Header */}
      <div className="profile__header">
        <h1>{user.username}</h1>
        <p>Questions</p>
        <p>Comments</p>
      </div>

      {/* Body */}
      <div className="profile__body"></div>
    </div>
  )
}

export default Profile
