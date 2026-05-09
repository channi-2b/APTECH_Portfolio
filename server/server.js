import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err))

// Schema
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})

const Submission = mongoose.model('Submission', submissionSchema)

// Admin credentials (hardcoded — keep server-side only)
const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASS

// ── Routes ──────────────────────────────────────────────

// POST /api/contact — save a submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    const submission = new Submission({ name, email, message })
    await submission.save()
    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save submission' })
  }
})

// POST /api/admin/login — verify credentials
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

// GET /api/admin/submissions — fetch all submissions
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 })
    res.json(submissions)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' })
  }
})

// DELETE /api/admin/submissions/:id — delete one submission
app.delete('/api/admin/submissions/:id', async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete submission' })
  }
})

app.listen(5000, () => console.log('Server running on port 5000'))