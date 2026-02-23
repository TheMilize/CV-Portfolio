# Portfolio (Vercel-ready)

Modern portfolio website designed for deployment on Vercel.

## Overview

- **Frontend**: Vue 3 + TypeScript + Vite, Tailwind-based UI, i18n (EN/RU), theme toggle.
- **Backend**: Node.js + Express API (serverless on Vercel), contact form delivery via SMTP/SendGrid.
- **Features**: projects showcase, contact form, PDF resume generation (EN/RU).

## Vercel

- Static frontend is served from `packages/frontend/dist`.
- API is available under `/api/*` and handled by the backend function.

## Project structure

```
CV-Portfolio/
├── package.json
├── vercel.json
├── .env.example
├── .gitignore
├── docker-compose.yml
├── docker-compose.prod.yml
├── packages/
│   ├── frontend/
│   │   ├── public/
│   │   │   ├── flags/          # locale flags (en, ru)
│   │   │   └── fonts/          # Roboto for PDF (Cyrillic)
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   └── styles/
│   │   │   ├── components/     # AppHeader, AppFooter, ProjectCard, etc.
│   │   │   ├── locales/        # i18n (EN/RU)
│   │   │   ├── router/
│   │   │   ├── stores/         # Pinia (theme, language)
│   │   │   ├── utils/          # api, resumeGenerator
│   │   │   ├── views/          # Home, About, Projects, Contact
│   │   │   ├── App.vue
│   │   │   └── main.ts
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── build-vercel.js
│   │   └── Dockerfile
│   └── backend/
│       ├── src/
│       │   ├── middleware/     # errorHandler, notFound
│       │   ├── routes/         # contact, projects
│       │   ├── services/       # emailService
│       │   └── index.ts
│       ├── env.example
│       ├── tsconfig.json
│       ├── nodemon.json
│       └── Dockerfile
└── scripts/
    ├── deploy.sh
    └── setup.sh
```
