import { useContext } from 'react'
import './sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'

const Sidebar = ({ user }) => {
  // useContext
  const { dispatch } = useContext(Context)

  //useNavigate
  let navigate = useNavigate()

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
          <Link to="/ask" className="link">
            <li>Ask</li>
          </Link>
          <Link to="/about" className="link">
            <li>About</li>
          </Link>
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
          <>
            <button onClick={() => navigate(`/profile/${user.id}`)}>
              Profile
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Sidebar
