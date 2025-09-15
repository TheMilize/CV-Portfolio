#!/bin/bash

# Скрипт для быстрой настройки портфолио

echo "🚀 Настройка портфолио..."

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Пожалуйста, установите Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Требуется Node.js 18+. Текущая версия: $(node -v)"
    exit 1
fi

echo "✅ Node.js версия: $(node -v)"

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm run install:all

# Настройка переменных окружения
echo "⚙️  Настройка переменных окружения..."

if [ ! -f "packages/backend/.env" ]; then
    cp packages/backend/env.example packages/backend/.env
    echo "✅ Создан файл .env для бэкенда"
else
    echo "ℹ️  Файл .env уже существует"
fi

# Создание директорий для загрузок
mkdir -p packages/backend/uploads

echo "🎉 Настройка завершена!"
echo ""
echo "Для запуска проекта используйте:"
echo "  npm run dev          # Запуск фронтенда и бэкенда"
echo "  npm run dev:frontend # Только фронтенд"
echo "  npm run dev:backend  # Только бэкенд"
echo ""
echo "Доступ к приложению:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000" 