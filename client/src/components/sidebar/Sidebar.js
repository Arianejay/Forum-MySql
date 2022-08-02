import { useContext } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const Sidebar = ({ user }) => {
  // useContext
  const { dispatch } = useContext(Context)

  // Logout Function
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <div className="sidebar__wrapper">
      <div className="sidebar__links">
        <ul>
          <Link to="/" className="link">
            <li>Home</li>
          </Link>
          <li>Ask</li>
          <li>About</li>
        </ul>
      </div>
      <div className="sidebar__buttons">
        {!user ? (
          <>
            <Link to="/login" className="link">
              <button>Log in</button>
            </Link>
            <Link to="/register" className="link">
              <button>Sign up</button>
            </Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  )
}

export default Sidebar
