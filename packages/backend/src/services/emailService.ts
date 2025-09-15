import nodemailer from 'nodemailer'

let cachedTransporter: nodemailer.Transporter | null = null
let defaultFromAddress: string | undefined = process.env.SMTP_USER

// Инициализация транспорта: если нет SMTP_USER/PASS, создаём тестовый Ethereal аккаунт
const getTransporter = async (): Promise<nodemailer.Transporter> => {
  if (cachedTransporter) return cachedTransporter

  const hasRealSmtpCreds = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)

  if (hasRealSmtpCreds) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: String(process.env.SMTP_PORT || '587') === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    defaultFromAddress = process.env.SMTP_USER
    return cachedTransporter
  }

  // Fallback: Ethereal для локальной разработки
  const testAccount = await nodemailer.createTestAccount()
  cachedTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
  defaultFromAddress = testAccount.user
  console.warn('[email] Используется Ethereal SMTP (локальная отладка).')
  return cachedTransporter
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
    const mailOptions = {
      from: defaultFromAddress,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    }

    const info = await transporter.sendMail(mailOptions)
    // Если Ethereal — выведем preview URL для удобства
    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log(`[email] Preview URL: ${previewUrl}`)
    }
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export const sendContactFormEmail = async (data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> => {
  const emailData: EmailData = {
    to: process.env.CONTACT_EMAIL || 'contact@example.com',
    subject: `Новое сообщение от ${data.name}`,
    text: `Имя: ${data.name}\nEmail: ${data.email}\nТема: ${data.subject}\nСообщение: ${data.message}`,
    html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Новое сообщение</title>
  <style>
    body{margin:0;padding:0;background:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';}
    .container{max-width:620px;margin:0 auto;padding:24px;}
    .card{background:#ffffff;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,.06);overflow:hidden}
    .header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:28px 24px;text-align:center}
    .header h1{margin:0;font-size:22px;font-weight:700}
    .header p{margin:8px 0 0 0;opacity:.95;font-size:14px}
    .content{padding:28px 24px}
    .field{margin:0 0 16px 0}
    .label{display:block;margin:0 0 6px 0;font-size:12px;letter-spacing:.4px;color:#6b7280;text-transform:uppercase;font-weight:600}
    .value{background:#f8f9fa;border-left:4px solid #667eea;border-radius:8px;padding:12px 14px;color:#111827;font-size:15px}
    .message{background:#f8f9fa;border-left:4px solid #667eea;border-radius:8px;padding:14px 16px;color:#111827;font-size:15px;white-space:pre-wrap}
    .footer{background:#f8f9fa;padding:18px 24px;text-align:center;border-top:1px solid #e9ecef}
    .footer p{margin:0;color:#6c757d;font-size:13px}
    .button{display:inline-block;margin-top:12px;background:#667eea;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600}
    .timestamp{margin-top:10px;color:#9ca3af;font-size:12px;text-align:center}
  </style>
  <!--[if mso]>
  <style type="text/css">.value{border-left:none} .message{border-left:none}</style>
  <![endif]-->
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>📧 Новое сообщение</h1>
        <p>Сообщение с портфолио</p>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">Имя</span>
          <div class="value">${data.name}</div>
        </div>
        <div class="field">
          <span class="label">Email</span>
          <div class="value">${data.email}</div>
        </div>
        <div class="field">
          <span class="label">Тема</span>
          <div class="value">${data.subject}</div>
        </div>
        <div class="field">
          <span class="label">Сообщение</span>
          <div class="message">${data.message}</div>
        </div>
        <div style="text-align:center">
          <a class="button" href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || 'Сообщение с портфолио')}">Ответить</a>
        </div>
      </div>
      <div class="footer">
        <p>Это автоматическое письмо от вашего портфолио</p>
      </div>
    </div>
    <div class="timestamp">Отправлено: ${new Date().toLocaleString('ru-RU')}</div>
  </div>
</body>
</html>`,
  }

  return await sendEmail(emailData)
} 