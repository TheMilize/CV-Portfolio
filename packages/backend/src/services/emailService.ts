import nodemailer from 'nodemailer'

let cachedTransporter: nodemailer.Transporter | null = null
let defaultFromAddress: string | undefined = process.env.SMTP_USER

// Инициализация транспорта: если нет SMTP_USER/PASS, создаём тестовый Ethereal аккаунт
const getTransporter = async (): Promise<nodemailer.Transporter | null> => {
  if (cachedTransporter) return cachedTransporter

  const hasRealSmtpCreds = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  
  // Логируем состояние переменных окружения для отладки
  console.log('[email] Проверка SMTP настроек:')
  console.log(`[email] SMTP_USER: ${process.env.SMTP_USER ? '✅ установлен' : '❌ не установлен'}`)
  console.log(`[email] SMTP_PASS: ${process.env.SMTP_PASS ? '✅ установлен' : '❌ не установлен'}`)
  console.log(`[email] SMTP_HOST: ${process.env.SMTP_HOST || 'smtp.gmail.com (по умолчанию)'}`)

  if (hasRealSmtpCreds) {
    try {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
      const smtpPort = parseInt(process.env.SMTP_PORT || '587')
      const isGmail = smtpHost.includes('gmail.com')
      
      // Убираем пробелы из пароля, если они есть (Gmail App Password обычно без пробелов)
      const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '')
      
      // Если есть SendGrid API ключ, используем его
      if (process.env.SENDGRID_API_KEY) {
        cachedTransporter = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
          },
        })
      } else {
        // Иначе пробуем Gmail
        cachedTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000
      })
      }
      
      // Проверяем подключение (опционально, может вызывать проблемы)
      try {
        await cachedTransporter.verify()
        console.log(`[email] Подключение к SMTP серверу успешно проверено`)
      } catch (verifyError) {
        const error = verifyError as Error
        console.log(`[email] ⚠️  Проверка подключения не удалась, но пробуем отправить...`)
        console.log(`[email] Ошибка verify: ${error.message}`)
      }
      
      defaultFromAddress = process.env.SMTP_USER
      console.log(`[email] ✅ Используется реальный SMTP сервер: ${smtpHost}:${smtpPort}`)
      console.log(`[email] Отправитель: ${defaultFromAddress}`)
      return cachedTransporter
    } catch (error) {
      const err = error as Error
      console.error('[email] ❌ Ошибка при создании SMTP транспорта:')
      console.error('[email] Сообщение:', err.message)
      console.error('[email] Код:', (error as any)?.code)
      console.error('[email] Стек:', err.stack)
      
      // Дополнительные подсказки для Gmail
      if (err.message.includes('Invalid login') || err.message.includes('authentication')) {
        console.error('[email] 💡 Подсказка: Проверьте правильность пароля приложения Gmail')
        console.error('[email] 💡 Убедитесь, что в аккаунте включена двухфакторная аутентификация')
        console.error('[email] 💡 Пароль приложения должен быть без пробелов')
      }
      
      return null
    }
  }

  // Fallback: Ethereal для локальной разработки
  try {
    console.log('[email] Попытка создать Ethereal тестовый аккаунт...')
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
    console.warn('\n[email] ⚠️  ВНИМАНИЕ: Используется Ethereal SMTP (тестовый режим)')
    console.warn('[email] Письма НЕ будут отправляться реально!')
    console.warn('[email] Это только для локальной разработки и тестирования')
    console.log(`[email] Ethereal аккаунт: ${testAccount.user}`)
    console.log(`[email] Для реальной отправки настройте SMTP_USER и SMTP_PASS в .env\n`)
    return cachedTransporter
  } catch (error) {
    console.error('[email] Не удалось создать Ethereal аккаунт:', error)
    console.warn('[email] Письма будут логироваться в консоль (локальная разработка)')
    return null
  }
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
    
    // Если транспортер не создан (нет SMTP и Ethereal не работает), логируем в консоль
    if (!transporter) {
      console.log('\n========== EMAIL (LOCAL DEV MODE) ==========')
      console.log('To:', emailData.to)
      console.log('Subject:', emailData.subject)
      console.log('Text:', emailData.text)
      if (emailData.html) {
        console.log('HTML:', emailData.html.substring(0, 200) + '...')
      }
      console.log('==========================================\n')
      return true // Возвращаем true, так как письмо "отправлено" (залогировано)
    }

    // Добавляем BCC на адрес отправителя, чтобы письмо сохранилось в "Отправленные" Gmail
    const mailOptions: any = {
      from: defaultFromAddress,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    }
    
    // Если отправляем через Gmail и адрес отправителя указан, добавляем BCC для сохранения в "Отправленные"
    if (defaultFromAddress && defaultFromAddress.includes('@gmail.com') && emailData.to !== defaultFromAddress) {
      mailOptions.bcc = defaultFromAddress
      console.log(`[email] Добавлена скрытая копия (BCC) для сохранения в "Отправленные": ${defaultFromAddress}`)
    }

    console.log(`[email] Отправка письма:`)
    console.log(`[email]   От: ${mailOptions.from}`)
    console.log(`[email]   Кому: ${mailOptions.to}`)
    console.log(`[email]   Тема: ${mailOptions.subject}`)
    
    const info = await transporter.sendMail(mailOptions)
    
    // Если Ethereal — выведем preview URL для удобства
    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log(`\n[email] ⚠️  ВНИМАНИЕ: Используется Ethereal Email (тестовый SMTP)`)
      console.log(`[email] Письмо НЕ отправлено реально, только для тестирования!`)
      console.log(`[email] Preview URL для просмотра письма: ${previewUrl}\n`)
      console.log(`[email] 💡 Для реальной отправки настройте SMTP_USER и SMTP_PASS в .env\n`)
    } else {
      console.log(`[email] ✅ Письмо отправлено успешно через реальный SMTP`)
      console.log(`[email] Message ID: ${info.messageId}`)
      console.log(`[email] Письмо должно прийти на: ${mailOptions.to}`)
      console.log(`[email] 💡 Проверьте папку "Входящие" и "Спам"\n`)
    }
    return true
  } catch (error) {
    const err = error as Error
    console.error('[email] ❌ Ошибка при отправке письма:')
    console.error('[email] Сообщение:', err.message)
    console.error('[email] Код:', (error as any)?.code)
    console.error('[email] Команда:', (error as any)?.command)
    console.error('[email] Стек:', err.stack)
    
    // Специфичные ошибки Gmail
    if (err.message.includes('Invalid login') || err.message.includes('authentication')) {
      console.error('[email] 💡 Проблема с аутентификацией Gmail')
      console.error('[email] 💡 Проверьте пароль приложения (должен быть без пробелов)')
    } else if (err.message.includes('ECONNREFUSED') || err.message.includes('ETIMEDOUT')) {
      console.error('[email] 💡 Проблема с подключением к SMTP серверу')
      console.error('[email] 💡 Проверьте интернет-соединение и настройки SMTP_HOST/SMTP_PORT')
    }
    
    // Логируем письмо в консоль как fallback
    console.log('\n========== EMAIL (FALLBACK - LOGGED TO CONSOLE) ==========')
    console.log('To:', emailData.to)
    console.log('Subject:', emailData.subject)
    console.log('Text:', emailData.text)
    console.log('==========================================================\n')
    
    // Возвращаем специальный объект для fallback режима
    const fallbackError = new Error('SMTP fallback mode - email logged to console')
    ;(fallbackError as any).code = 'ESOCKET'
    ;(fallbackError as any).isFallback = true
    throw fallbackError
  }
}

export const sendContactFormEmail = async (data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> => {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'contact@example.com'
  
  console.log(`\n[email] 📧 Подготовка к отправке контактной формы:`)
  console.log(`[email] Получатель: ${contactEmail}`)
  console.log(`[email] От: ${data.name} (${data.email})`)
  console.log(`[email] Тема: ${data.subject}\n`)
  
  const emailData: EmailData = {
    to: contactEmail,
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