# 🚀 CV Portfolio

Современное портфолио с Vue.js фронтендом и Node.js бэкендом, полностью контейнеризованное с Docker.

## 🐳 Быстрый старт с Docker

### Предварительные требования
- Docker Desktop
- Git

### Запуск за 3 шага:

1. **Клонирование и настройка**
```bash
git clone <repository-url>
cd CV
cp packages/backend/env.example .env
# Отредактируйте .env с вашими данными (опционально для демо)
```

2. **Запуск Docker Desktop** (если не запущен)

3. **Старт приложения**
```bash
docker compose up -d
```

🌐 **Готово!** Откройте http://localhost

## 📦 Структура проекта

```
CV/
├── packages/
│   ├── frontend/          # Vue.js приложение
│   │   └── Dockerfile     # Frontend контейнер
│   └── backend/           # Node.js API сервер
│       └── Dockerfile     # Backend контейнер
├── scripts/               # Скрипты деплоя
├── docker-compose.yml     # Локальная разработка
└── docker-compose.prod.yml # Production с SSL
```

## 🛠 Технологии

### Frontend
- Vue.js 3 + Composition API
- Vite (сборщик)
- TypeScript
- Pinia (состояние)
- Vue Router
- Tailwind CSS
- PDF генерация (jsPDF)

### Backend
- Node.js + Express
- TypeScript
- Email отправка (Nodemailer)
- CORS + Helmet (безопасность)

### DevOps
- Docker + Docker Compose
- Health checks

## 🔧 Docker команды

```bash
# Локальная разработка
docker compose up -d

# Просмотр логов
docker compose logs -f

# Пересборка
docker compose build --no-cache

# Остановка
docker compose down

# Production
docker compose -f docker-compose.prod.yml up -d
```

## 🌐 Доступ к сервисам

**Локально:**
- Frontend: http://localhost
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/api/health

## 📧 Настройка Email

Проект использует backend для отправки email через SMTP. **Для демо работает без настройки** (использует тестовый SMTP).

### Для production настройки:

1. **Получите App Password от Gmail:**
   - Включите 2FA в Google аккаунте
   - Создайте App Password в настройках безопасности

2. **Настройте .env файл:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

3. **Готово!** Форма контактов будет отправлять письма на указанный email.

## 📚 API Reference

### Health Check
- `GET /api/health` - Статус сервера

### Контакты  
- `POST /api/contact` - Отправить сообщение
  ```json
  {
    "name": "string",
    "email": "string", 
    "subject": "string",
    "message": "string"
  }
  ```

## 🎯 Особенности проекта

- ✅ **Современный дизайн** - адаптивный интерфейс с темной/светлой темой
- ✅ **Мультиязычность** - поддержка русского и английского языков
- ✅ **PDF резюме** - генерация актуального резюме одним кликом
- ✅ **Контактная форма** - отправка сообщений через SMTP
- ✅ **Docker готов** - полная контейнеризация для легкого деплоя
- ✅ **Безопасность** - все секреты через переменные окружения
- ✅ **Готов к публикации** - никаких утечек данных, чистый код

## 📄 Структура страниц

- **Главная** (`/`) - Hero секция с основной информацией
- **Обо мне** (`/about`) - Опыт, образование, навыки, скачивание резюме
- **Проекты** (`/projects`) - Портфолио проектов с описанием
- **Контакты** (`/contact`) - Контактная информация и форма связи

## 📝 Лицензия

MIT