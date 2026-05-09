import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

type Submission = {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('admin_auth')) {
      navigate('/admin')
      return
    }
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/submissions`)
      const data = await res.json()
      setSubmissions(data)
    } catch {
      setError('Failed to load submissions.')
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/submissions/${id}`, {
        method: 'DELETE'
      })
      setSubmissions((prev) => prev.filter((s) => s._id !== id))
    } catch {
      alert('Failed to delete.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin')
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <p className="dashboard__eyebrow">Admin</p>
          <h1 className="dashboard__title">Submissions</h1>
        </div>
        <button className="dashboard__logout" onClick={handleLogout}>Log out</button>
      </div>

      {loading && <p className="dashboard__state">Loading...</p>}
      {error && <p className="dashboard__state dashboard__state--err">{error}</p>}
      {!loading && submissions.length === 0 && (
        <p className="dashboard__state">No submissions yet.</p>
      )}

      <div className="dashboard__list">
        {submissions.map((s) => (
          <div key={s._id} className="submission-card">
            <div className="submission-card__meta">
              <span className="submission-card__name">{s.name}</span>
              <span className="submission-card__email">{s.email}</span>
              <span className="submission-card__date">
                {new Date(s.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}
              </span>
            </div>
            <p className="submission-card__message">{s.message}</p>
            <button
              className="submission-card__delete"
              onClick={() => handleDelete(s._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}