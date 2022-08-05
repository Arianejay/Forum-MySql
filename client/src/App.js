import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Main from './pages/main/Main'
import { useContext } from 'react'
import { Context } from './context/Context'
import Navbar from './components/navbar/Navbar'

function App() {
  const { user } = useContext(Context)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} />
        <Main user={user} />
      </BrowserRouter>
    </div>
  )
}

export default App

//TODO: Fix the logout bug, together with other buttons in relation to user
