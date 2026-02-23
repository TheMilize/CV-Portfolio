import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { sendContactFormEmail } from '../services/emailService'

const router = Router()

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Требуется валидный email'),
    body('message').trim().notEmpty().withMessage('Сообщение обязательно'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() })
        return
      }

      const { name, email, subject, message } = req.body
      const sent = await sendContactFormEmail({
        name,
        email,
        subject: subject || 'Сообщение с портфолио',
        message,
      })

      if (!sent) {
        res.status(500).json({
          success: false,
          error: 'Не удалось отправить сообщение. Проверьте настройки почты на сервере.',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: 'Сообщение отправлено успешно',
      })
    } catch (error) {
      // console.error('Contact form error:', error)
      res.status(500).json({
        success: false,
        error: 'Не удалось отправить сообщение',
      })
    }
  }
)

export default router
