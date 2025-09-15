# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY env.d.ts ./
COPY vite.config.ts ./
COPY index.html ./

# Устанавливаем зависимости
RUN npm install && npm cache clean --force

# Копируем исходный код
COPY src ./src
COPY public ./public

# Собираем приложение для production (локальный docker: API на 5001)
ENV VITE_API_URL=http://localhost:5001/api
RUN npm run build

# Production stage: serve статику через serve (SPA fallback)
FROM node:18-alpine AS production

WORKDIR /srv/app

# Установим статический сервер с SPA fallback
RUN npm install -g serve && npm cache clean --force

# Копируем билд фронтенда
COPY --from=builder /app/dist ./dist

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["serve", "-s", "dist", "-l", "80"]
