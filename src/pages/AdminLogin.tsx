import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (res.ok) {
        sessionStorage.setItem('admin_auth', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid username or password.')
      }
    } catch {
      setError('Could not reach the server.')
    }

    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <p className="admin-login__question">Are you an admin?</p>
        <h2 className="admin-login__title">Login</h2>

        <form onSubmit={handleSubmit} className="admin-login__form" noValidate>
          <div className="admin-form__field">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="admin-form__field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="admin-form__error">{error}</p>}

          <button type="submit" className="admin-form__submit" disabled={loading}>
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}