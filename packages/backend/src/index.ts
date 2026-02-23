import path from 'path'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import projectRoutes from './routes/projects'
import contactRoutes from './routes/contact'

const candidates = [
  path.resolve(process.cwd(), '../../.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../../.env'),
]
const envPath = candidates.find((p) => fs.existsSync(p))
if (envPath) {
  dotenv.config({ path: envPath })
  // console.log('[env] loaded:', envPath)
} else {
  // console.warn('[env] .env not found. candidates:', candidates)
}

const PORT = process.env.PORT || 5001
const isVercel = process.env.VERCEL === '1'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ],
    credentials: true,
  })
)
app.use(morgan(isVercel ? 'short' : 'combined'))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

app.use(notFound)
app.use(errorHandler)

if (!isVercel) {
  app.listen(PORT, () => {
    // console.log(`Server running on port ${PORT}`)
    // console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

export default app 