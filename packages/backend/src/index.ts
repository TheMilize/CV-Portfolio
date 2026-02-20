import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import projectRoutes from './routes/projects'
import contactRoutes from './routes/contact'

// Загрузка переменных окружения
dotenv.config({ path: '../../.env' })

// Явно устанавливаем порт
const PORT = process.env.PORT || 5001

// Проверка переменных окружения для email
const checkEmailConfig = () => {
  const hasSmtpCreds = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  if (hasSmtpCreds) {
    console.log('📧 Email конфигурация: ✅ Настроена (SMTP)')
    console.log(`   SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`)
    console.log(`   SMTP User: ${process.env.SMTP_USER}`)
    console.log(`   Contact Email: ${process.env.CONTACT_EMAIL || process.env.SMTP_USER}`)
  } else {
    console.log('📧 Email конфигурация: ⚠️  Не настроена (будет использован Ethereal для тестирования)')
    console.log('   Для production добавьте SMTP_USER и SMTP_PASS в .env')
  }
}

checkEmailConfig()

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:49876',
    'http://localhost:49876',
    'http://127.0.0.1:51946',
    'http://localhost:51946'
  ],
  credentials: true
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
})

export default app 