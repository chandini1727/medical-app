# 🏥 Medical App

A full-stack healthcare platform providing users with AI-powered symptom analysis, medicine ordering, nearby hospital/pharmacy listings, and more — all in one place.

---
## 🚀 Features

- 🧠 **AI Symptom Checker** – Suggests possible conditions and remedies using LLMs.
- 💊 **Medicine Ordering** – Search and order medicines with availability tracking.
- 🏥 **Hospital & Pharmacy Locator** – Find nearby facilities using geolocation.
- 🗣️ **AI Therapist Chatbot** – Mental health companion with smart conversation flow.
- 📋 **External Forms Management** – Manage Google/Microsoft forms for patient data.
- 🛡️ **Authentication** – Role-based login for Users, Admins, and Therapists.
- 📈 **Admin Dashboard** – Manage users, analytics, and form submissions.
---
## 🧑‍💻 Tech Stack

### 🌐 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### 🔧 Backend
- Node.js + Express.js
- PostgreSQL (with Prisma / Sequelize)
- Firebase Admin SDK (for Auth & Emulator)

### 🤖 AI Integration
- OpenAI / Ollama (local inference)
- LangChain (for symptom → medicine reasoning)
- LLaMA 3 (via local API)

### ☁️ Deployment & Tools
- Docker (Dev & Production)
- Firebase Emulator (Dev)
- Vercel / Netlify (Frontend Deployment)
- Railway / Render / DockerHub (Backend Deployment)

---

## 🛠️ Local Development

### 📦 Prerequisites
- Node.js & npm
- PostgreSQL
- Docker (optional)
- Firebase CLI (if using Firebase Emulator)

### 🧪 Setup Steps

```bash
# Clone the repository
git clone https://github.com/<your-username>/medical-app.git
cd medical-app

# Install backend dependencies
cd backend
npm install

# Setup PostgreSQL DB (adjust .env file)
npx prisma migrate dev

# Run backend
npm run dev

# Install frontend dependencies
cd ../frontend
npm install

# Start frontend
npm start
