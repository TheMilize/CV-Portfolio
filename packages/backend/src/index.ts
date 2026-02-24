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

// На Vercel переменные задаются в Project Settings → Environment Variables; .env не используется
if (process.env.VERCEL !== '1') {
  const candidates = [
    path.resolve(process.cwd(), '../../.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(__dirname, '../../../.env'),
  ]
  const envPath = candidates.find((p) => fs.existsSync(p))
  if (envPath) dotenv.config({ path: envPath })
}

const PORT = process.env.PORT || 5001
const isVercel = process.env.VERCEL === '1'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
      process.env.VERCEL_URL ? `https://www.${process.env.VERCEL_URL}` : '',
      'http://localhost:3001',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
)
app.use(morgan(isVercel ? 'short' : 'combined'))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/health', (_req, res) => {
  const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY?.trim())
  const hasSmtp = Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim())
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    vercel: process.env.VERCEL === '1',
    emailConfigured: hasSendGrid || hasSmtp,
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