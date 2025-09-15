# Backend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем манифесты и конфиг
COPY package*.json ./
COPY tsconfig.json ./

# Устанавливаем зависимости (dev + prod) для сборки
RUN npm install && npm cache clean --force

# Копируем исходники и билдим
COPY src ./src
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Копируем package.json и ставим только прод-зависимости
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Копируем билд
COPY --from=builder /app/dist ./dist

# Меняем владельца файлов
RUN chown -R nodejs:nodejs /app
USER nodejs

# Открываем порт
EXPOSE 5000

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=5000

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Запускаем приложение
CMD ["node", "dist/index.js"]
