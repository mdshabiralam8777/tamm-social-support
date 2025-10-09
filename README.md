# TAMM Social Support

A **React + TypeScript** web application for applying to government social support programs.
Built with **Material UI**, **react-hook-form**, **Zod**, and **react-i18next** for internationalization (English + Arabic).
Includes AI-assisted text generation for writing situation descriptions using **OpenAI GPT API**.

---

## 🏗️ Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Framework  | React (Vite + TypeScript)        |
| UI Library | Material UI (MUI)                |
| Styling    | MUI `sx` + optional Tailwind     |
| Forms      | React Hook Form + Zod            |
| i18n       | react-i18next                    |
| Routing    | React Router v6                  |
| API        | Axios / Fetch (mocked for now)   |
| State      | Context API + local state        |
| Storage    | LocalStorage (draft persistence) |

---

## 🚀 Features

- 🧭 **3-Step Multi-form Wizard**
  Personal Info → Family & Financial Info → Situation Descriptions
  with inline validation and step gating.

- 💾 **Auto-save Progress** (LocalStorage)

- 🧠 **AI Assistance**
  “Help Me Write” buttons that call OpenAI API to generate text suggestions.

- 🌐 **Multilingual Support**
  English and Arabic (RTL layout + language switch).

- 🔒 **Accessible**
  Keyboard-friendly, ARIA labels, clear form focus handling.

- 📱 **Responsive Design**
  Works smoothly across mobile, tablet, and desktop.

- 🎯 **Well-structured Codebase**
  Modular folder organization with constants, schemas, hooks, and components.

---

## 🧩 Project Structure

```
src/
├─ assets/                 # Images, icons, mock data
│  └─ mock/services.json
├─ components/             # Shared UI components
│  ├─ NavBar.tsx
│  ├─ LanguageSwitch.tsx
│  ├─ HelpMeWriteDialog.tsx
│  └─ FormStepper.tsx
├─ context/
│  └─ AppContext.tsx       # Global notification context
├─ hooks/
│  └─ useFormPersist.ts    # Auto-save form drafts
├─ pages/
│  ├─ Home.tsx
│  └─ form/
│     ├─ Wizard.tsx
│     ├─ Step1.tsx
│     ├─ Step2.tsx
│     ├─ Step3.tsx
│     └─ SubmissionSuccess.tsx
├─ schema/
│  └─ applicationSchema.ts # Zod + i18n-aware validation schema
├─ constants/
│  ├─ stepFields.ts
│  └─ defaultValues.ts
├─ services/
│  └─ api.ts               # Mock submit + OpenAI API integration
├─ locales/                # Translation files (en/ar)
│  ├─ en/translation.json
│  └─ ar/translation.json
├─ i18n.ts                 # i18n configuration
├─ App.tsx
└─ main.tsx
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** ≥ 18 (you have v22.18.0 ✅)
- **npm** ≥ 10

---

### 1. Clone the repository

```bash
git clone https://github.com/mdshabiralam8777/tamm-social-support.git
cd tamm-social-support
```

### 2. Install dependencies

```bash
npm install
```

If you get version errors for `react-i18next`, install manually:

```bash
npm install react-i18next@13.3.1 i18next@25.5.3 i18next-browser-languagedetector
```

---

### 3. Environment variables

Create a `.env` file in the project root:

```bash
touch .env
```

Add your **OpenAI API Key**:

```env
VITE_OPENAI_API_KEY=sk-your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

> ⚠️ **Do not commit this file.** > `.env` is already listed in `.gitignore`.

---

### 4. Run the project locally

```bash
npm run dev
```

Visit 👉 [http://localhost:5173](http://localhost:5173)

---

### 5. Build for production

```bash
npm run build
```

Preview build output:

```bash
npm run preview
```

---

### 6. Deploy to Vercel

1. Push your code to GitHub.
2. Log in to [Vercel](https://vercel.com).
3. **Import Project →** select this repo.
4. Framework preset: **Vite**.
5. Add the environment variable:

   ```
   VITE_OPENAI_API_KEY = sk-your_openai_api_key
   ```

6. Deploy.

---

## 🤖 OpenAI Integration

### Location

`src/services/api.ts`

### API call (example)

```ts
import axios from "axios";

export async function generateText(prompt: string) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
    }
  );
  return res.data.choices[0].message.content;
}
```

Used in **Step 3** fields (`HelpMeWriteDialog`) to provide text suggestions.

---

## 📄 Architecture Overview

A high-level explanation of the app’s architecture is in
[`Architecture.md`](./Architecture.md).

It covers:

- React + TypeScript structure
- Form validation flow
- i18n implementation
- Wizard step logic
- State and persistence
- Future improvement areas

---

## 🧠 Design Decisions & Improvements

### Why React Hook Form + Zod

- Excellent performance for large multi-step forms.
- Built-in validation and error control.
- No need for controlled input re-renders.

### Why `pointerEvents: "none"` on Hero

- Prevented click interception overlay issue (ensured interactive routes work cleanly).

### Why i18n with `buildApplicationSchema(t)`

- Ensures all validation messages translate dynamically on language switch.
- Keeps validation logic and UI perfectly in sync.

### Future Enhancements

- Emotion RTL cache for full MUI RTL styling.
- Integrate real backend API (replace mock).
- Add unit tests and e2e testing (Testing Library / Cypress).
- Generate PDF confirmation receipt after submission.

---

## 🧑‍💻 Author

**Mohammed Shabir Alam**
Senior Frontend Developer — Angular | React | Node.js | MongoDB
🌍 Dubai, UAE

🔗 [GitHub](https://github.com/mdshabiralam8777)
💼 [Portfolio](https://mohammedshabiralam-personal-portfolio.vercel.app/)

---

## 🪪 License

This project is for **educational and demo** purposes only.
© 2025 Mohammed Shabir Alam — All Rights Reserved.
