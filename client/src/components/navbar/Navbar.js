import { useContext, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './navbar.css'
import Hamburger from 'hamburger-react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const Navbar = ({ user }) => {
  // useStates
  const [isOpen, setIsOpen] = useState(false)

  // useContext
  const { dispatch } = useContext(Context)

  // Logout Function
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <>
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <h1>Ask it!</h1>
        </div>
        <div className="navbar__links">
          <ul>
            <Link to="/" className="link">
              <li>Home</li>
            </Link>
            <Link to="/ask" className="link">
              <li>Ask</li>
            </Link>
            <li>About</li>
          </ul>
        </div>
        {!user ? (
          <div className="navbar__buttons">
            <Link to="/login" className="link">
              <button>Log in</button>
            </Link>
            <Link to="/register" className="link">
              <button>Sign up</button>
            </Link>
          </div>
        ) : (
          <div className="navbar__username">
            <p>{user.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <div className="navbar__hamburger">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>
      <div className="dropdown">{isOpen && <Sidebar user={user} />}</div>
    </>
  )
}

export default Navbar
