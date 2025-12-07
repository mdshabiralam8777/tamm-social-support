# TAMM Social Support Portal

A **production-ready**, **accessible**, and **bilingual (EN/AR)** web application for government social support services. Built as a case study, this project demonstrates a complete user journey from application to status tracking, enhanced with AI-powered assistance.

> **Live Demo:** [tamm-social-support.vercel.app](https://tamm-social-support.vercel.app/) _(If deployed)_

---

## 📚 Documentation

| Document                              | Description                                                                         |
| :------------------------------------ | :---------------------------------------------------------------------------------- |
| [**Assignment**](./assignment.md)     | Original case study requirements.                                                   |
| [**Enhancements**](./enhancements.md) | Features implemented _beyond_ the assignment scope (Dashboard, Chatbot, UI Polish). |
| [**Architecture**](./Architecture.md) | Technical deep-dive: state management, validation, and data flow.                   |

---

## ✨ Features at a Glance

- 🧭 **4-Step Smart Wizard:** Personal Info → Family & Finance → Situation Descriptions → Document Uploads.
- 🤖 **AI "Help Me Write":** OpenAI-powered text suggestions for free-form fields.
- 💬 **AI Chatbot:** Contextual, bilingual assistant for user guidance.
- 📊 **Application Dashboard:** Track submission status, view timelines, and manage applications.
- 🌐 **Bilingual (EN/AR):** Full RTL layout support with dynamic language switching.
- 💾 **Auto-Save Drafts:** Never lose progress, data persists in LocalStorage.
- ♿ **Accessible:** Semantic HTML, ARIA roles, and full keyboard navigation.

---

## 🛠️ Tech Stack

| Category        | Technology                         |
| :-------------- | :--------------------------------- |
| **Framework**   | React 18 (Vite)                    |
| **Language**    | TypeScript (Strict Mode)           |
| **UI**          | Material UI v5 + Custom TAMM Theme |
| **Forms**       | react-hook-form + Zod              |
| **i18n**        | react-i18next                      |
| **AI**          | OpenAI Chat Completions API        |
| **State**       | React Context API                  |
| **Persistence** | LocalStorage                       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- An **OpenAI API Key**

### 1. Clone & Install

```bash
git clone https://github.com/mdshabiralam8777/tamm-social-support.git
cd tamm-social-support
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=sk-your_api_key_here
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

> ⚠️ **Important:** Do not commit `.env` to version control. It is already in `.gitignore`.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
npm run preview  # To preview the production build
```

---

## 📂 Project Structure

```
src/
├── components/     # Reusable UI (NavBar, Footer, Chatbot, Stepper)
├── pages/          # Route views (Home, Dashboard, Wizard steps)
├── hooks/          # Custom hooks (useFormPersist)
├── services/       # API layer (OpenAI, mock backend)
├── schema/         # Zod validation schemas (i18n-aware)
├── constants/      # Step definitions, default form values
├── context/        # Global state providers (AppContext)
├── locales/        # Translation files (en, ar)
└── theme.ts        # Custom MUI theme (TAMM colors)
```

See [Architecture.md](./Architecture.md) for a detailed explanation of the data flow and design decisions.

---

## 🧑‍💻 Author

**Mohammed Shabir Alam**
Senior Frontend Developer | Angular, React, Node.js
📍 Dubai, UAE

[![GitHub](https://img.shields.io/badge/GitHub-mdshabiralam8777-181717?logo=github)](https://github.com/mdshabiralam8777)

---

## 📄 License

This project is for **educational and demonstration purposes** only.
© 2025 Mohammed Shabir Alam
