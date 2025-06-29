🧾 Invoice Generator Backend

This is the backend service for generating and sending PDF invoices via email.

---

📦 Tech Stack Backend:

NestJS (Express)

Prisma ORM

PostgreSQL

Redis + BullMQ

PDF Generation (html-pdf-node)

Email (Resend API)

---

📦 Tech Stack Frontend:

React + TypeScript

Vite

Axios

Tailwind CSS

---

🚀 Quick Start

0. Clone repository

🌍 Invoice Generator Backend

1. Clone and Install Dependencies:

cd backend
npm install

2. Copy the .env.example to .env and fill in your credentials:

cp .env.example .env

3. Set Up the Database:

docker-compose up -d
npx prisma migrate deploy
npm run seed

4. Start the Server:

npm run start:dev

Server runs at http://localhost:3000

🌍 Invoice Generator Frontend

1. Install Dependencies:

cd frontend
npm install

2. Start app:

npm run dev

App runs at http://localhost:5173

---

Usage:

Enter a client’s email and list of invoice items.

Submit the form.

Invoice will be generated, emailed, and stored by the backend.

You'll get a confirmation message upon success.

---

API for generating and sending invoices

Invoice API:

http://localhost:3000/api

---

Project structure:

backend
├── .env
├── .env.example
├── .prettierrc
├── docker-compose.yml
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20250629200211_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── client
│   │   ├── client.controller.ts
│   │   ├── client.module.ts
│   │   ├── client.service.ts
│   │   └── dto
│   │       ├── client-with-invoices.dto.ts
│   │       ├── client.dto.ts
│   │       ├── create-client.dto.ts
│   │       └── update-client.dto.ts
│   ├── company
│   │   ├── company.controller.ts
│   │   ├── company.module.ts
│   │   ├── company.service.ts
│   │   └── dto
│   │       ├── company-response.dto.ts
│   │       ├── company.dto.ts
│   │       ├── create-company.dto.ts
│   │       └── update-company.dto.ts
│   ├── invoice
│   │   ├── dto
│   │   │   ├── create-invoice.dto.ts
│   │   │   ├── full-invoice.dto.ts
│   │   │   ├── invoice-item.dto.ts
│   │   │   └── invoice-response.dto.ts
│   │   ├── invoice.controller.ts
│   │   ├── invoice.module.ts
│   │   └── invoice.service.ts
│   ├── mail
│   │   ├── mail.module.ts
│   │   └── mail.service.ts
│   ├── main.ts
│   ├── pdf
│   │   ├── pdf.module.ts
│   │   ├── pdf.service.ts
│   │   └── templates
│   │       └── invoice.template.html
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   └── queue
│       ├── queue.module.ts
│       ├── queue.processor.ts
│       └── queue.service.ts
├── test
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json

frontend
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── icon.ico
├── src
│   ├── App.tsx
│   ├── components
│   │   └── InvoiceForm.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
