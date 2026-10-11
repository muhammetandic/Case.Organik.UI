import { useNavigate } from 'react-router-dom'
import './App.css'
import { session } from './lib/session.js'

function App() {
  const navigate = useNavigate()

  const handleLogout = () => {
    session.clear()
    navigate('/')
  }

  return (
    <>
      <h1>Sisteme giriş yaptınız</h1>
      <div className="card">
        <button onClick={handleLogout}>Çıkış</button>
      </div>
    </>
  )
}

export default App
