import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { sendContactFormEmail } from '../services/emailService'

const router = Router()

// Отправка писем выполняется через общий сервис emailService

// Отправить сообщение через контактную форму
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()
      })
      return
    }

    const { name, email, subject, message } = req.body

    const isSent = await sendContactFormEmail({ name, email, subject, message })

    if (!isSent) {
      res.status(500).json({
        success: false,
        error: 'Failed to send message'
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    })
  } catch (error) {
    const err = error as { message?: string; code?: string; response?: unknown; responseCode?: unknown; command?: string }
    console.error('Contact form error details:', {
      message: err?.message,
      code: err?.code,
      response: err?.response,
      responseCode: err?.responseCode,
      command: err?.command
    })
    res.status(500).json({
      success: false,
      error: 'Failed to send message',
      details: err?.message
    })
  }
})

// Получить все сообщения (требует аутентификации)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    // Здесь будет логика получения сообщений из БД
    const messages = [
      {
        id: 1,
        name: 'Иван Петров',
        email: 'ivan@example.com',
        subject: 'Предложение о сотрудничестве',
        message: 'Здравствуйте! Хотел бы обсудить возможность сотрудничества...',
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Мария Сидорова',
        email: 'maria@example.com',
        subject: 'Вопрос по проекту',
        message: 'Интересует разработка веб-приложения...',
        date: '2024-01-14'
      }
    ]

    res.json({
      success: true,
      data: messages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    })
  }
})

export default router 