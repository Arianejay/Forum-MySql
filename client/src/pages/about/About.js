import React from 'react'
import './about.css'
import { aboutData } from './Data'

const About = () => {
  return (
    <div className="about__wrapper">
      <div className="about__header">About</div>
      <div className="about__content">
        <p>{aboutData}</p>
        <p>{aboutData}</p>
        <br />
        <p>{aboutData}</p>
      </div>
    </div>
  )
}

export default About
