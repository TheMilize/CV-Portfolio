import nodemailer from 'nodemailer'

let cachedTransporter: nodemailer.Transporter | null = null
let defaultFromAddress: string | undefined = process.env.SMTP_USER

const isDev = process.env.NODE_ENV !== 'production'

const log = (...args: unknown[]) => {
  // if (isDev) console.log('[email]', ...args)
}

const getTransporter = async (): Promise<nodemailer.Transporter | null> => {
  if (cachedTransporter) return cachedTransporter

  if (isDev) {
    log('SMTP_USER:', process.env.SMTP_USER ? 'установлен' : 'не установлен')
    log('SMTP_PASS:', process.env.SMTP_PASS ? 'установлен' : 'не установлен')
    log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'установлен' : 'не установлен')
  }

  // SendGrid (приоритет, удобен для Vercel)
  if (process.env.SENDGRID_API_KEY) {
    try {
      cachedTransporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY.trim(),
        },
      })
      defaultFromAddress =
        process.env.SENDGRID_FROM_EMAIL ||
        process.env.CONTACT_EMAIL ||
        process.env.SMTP_USER
      if (!defaultFromAddress) {
        // console.error('[email] Для SendGrid задайте SENDGRID_FROM_EMAIL или CONTACT_EMAIL (verified sender)')
        return null
      }
      log('Используется SendGrid, отправитель:', defaultFromAddress)
      return cachedTransporter
    } catch (error) {
      // console.error('[email] Ошибка создания транспорта SendGrid:', (error as Error).message)
      return null
    }
  }

  // SMTP (Gmail и др.)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
      const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
      const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '').trim()

      cachedTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: smtpPass,
        },
        tls: { rejectUnauthorized: process.env.NODE_ENV === 'production' },
        connectionTimeout: 20000,
        greetingTimeout: 10000,
      })
      defaultFromAddress = process.env.SMTP_USER
      log('Используется SMTP:', smtpHost + ':' + smtpPort)
      return cachedTransporter
    } catch (error) {
      const err = error as Error
      // console.error('[email] Ошибка создания SMTP транспорта:', err.message)
      if (err.message.includes('Invalid login') || err.message.includes('authentication')) {
        // console.error('[email] Подсказка: для Gmail используйте пароль приложения и 2FA')
      }
      return null
    }
  }

  // Локальная разработка: Ethereal (тестовые письма)
  if (isDev) {
    try {
      log('Создание тестового аккаунта Ethereal...')
      const testAccount = await nodemailer.createTestAccount()
      cachedTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      })
      defaultFromAddress = testAccount.user
      // console.warn('[email] Режим Ethereal: письма не отправляются реально. Настройте SMTP/SendGrid для production.')
      return cachedTransporter
    } catch (e) {
      // console.error('[email] Ethereal недоступен:', (e as Error).message)
    }
  }

  return null
}

export interface EmailData {
  to: string
  subject: string
  text: string
  html?: string
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const transporter = await getTransporter()

    if (!transporter) {
      if (isDev) {
        // console.log('[email] Локальный режим — письмо только в лог')
        // console.log('To:', emailData.to, 'Subject:', emailData.subject)
      }
      return false
    }

    const from = defaultFromAddress || process.env.CONTACT_EMAIL || 'noreply@example.com'
    const mailOptions: nodemailer.SendMailOptions = {
      from,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    }

    log('Отправка:', mailOptions.to, mailOptions.subject)
    const info = await transporter.sendMail(mailOptions)

    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl && isDev) {
      log('Ethereal preview:', previewUrl)
    } else if (!previewUrl) {
      log('Письмо отправлено, Message ID:', info.messageId)
    }
    return true
  } catch (error) {
    const err = error as Error
    // console.error('[email] Ошибка отправки:', err.message)
    if (
      err.message.includes('Invalid login') ||
      err.message.includes('Username and Password not accepted') ||
      err.message.includes('BadCredentials')
    ) {
      // console.error(
      //   '[email] Подсказка: для Gmail нужен пароль приложения (App Password), не обычный пароль. ' +
      //     'Включите 2FA в Google → Безопасность → Пароли приложений → создайте пароль для «Почта».'
      // )
    }
    return false
  }
}

const PLACEHOLDER_EMAILS = ['your-email@gmail.com', 'contact@example.com', 'noreply@example.com']

const resolveContactTo = (): string => {
  const raw = (
    process.env.CONTACT_EMAIL ||
    process.env.SMTP_USER ||
    process.env.SENDGRID_FROM_EMAIL ||
    'contact@example.com'
  ).trim()
  return PLACEHOLDER_EMAILS.includes(raw) ? (process.env.SMTP_USER || '').trim() || raw : raw
}

export const sendContactFormEmail = async (data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> => {
  const contactEmail = resolveContactTo()

  const emailData: EmailData = {
    to: contactEmail,
    subject: `Портфолио: от ${data.name}`,
    text: `Имя: ${data.name}\nEmail: ${data.email}\nТема: ${data.subject}\n\nСообщение:\n${data.message}`,
    html: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:20px;font-family:sans-serif;background:#f5f5f5">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:24px;text-align:center">
      <h1 style="margin:0;font-size:20px">Новое сообщение с портфолио</h1>
    </div>
    <div style="padding:24px">
      <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      <p><strong>Тема:</strong> ${escapeHtml(data.subject)}</p>
      <div style="margin-top:16px;padding:12px;background:#f8f9fa;border-radius:8px;white-space:pre-wrap">${escapeHtml(data.message)}</div>
      <p style="margin-top:20px">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: ${encodeURIComponent(data.subject || 'Сообщение с портфолио')}" style="display:inline-block;background:#667eea;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600">Ответить</a>
      </p>
    </div>
    <div style="padding:12px;text-align:center;color:#888;font-size:12px;border-top:1px solid #eee">${new Date().toLocaleString('ru-RU')}</div>
  </div>
</body>
</html>`,
  }

  return sendEmail(emailData)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
