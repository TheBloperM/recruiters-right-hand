Here is the updated, perfectly tailored `README.md`. It reflects your new monorepo workspace setup and highlights the ultimate "one-click" `npm start` god-command we just built.

---

# Recruiter's Right Hand

An AI-powered, full-stack monorepo application designed to parse existing resumes and automatically tailor them to specific job descriptions using Google's Gemini AI. It outputs an ATS-friendly, text-selectable PDF that maximizes a candidate's chances of passing automated screening.

## Features

- **PDF Parsing:** Extracts raw text from uploaded candidate resumes using `pdf-parse`.
- **AI Tailoring:** Uses Gemini 2.5 Flash to perfectly align a candidate's existing experience with a target Job Description (applying the STAR method, strict keyword weaving, and zero hallucination).
- **ATS-Friendly Export:** Utilizes `react-to-print` and the browser's native print engine to generate a text-selectable PDF that Applicant Tracking Systems can actually read.
- **Smart UI:** Zustand-managed state across a multi-step flow (Input -> Output -> Export).

## Tech Stack

- **Monorepo Structure:** NPM Workspaces
- **Frontend:** React, TypeScript, Vite, Zustand, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Multer (Memory Storage)
- **AI:** `@google/genai` (Gemini 2.5 Flash with strict JSON Schema generation)
- **Shared Utilities:** Custom ESM NodeNext package for shared types (`recruiters-utils`)

---

## Workspace Structure

```text
recruiters-right-hand/
├── front/             # React + Vite application
├── backend/              # Express API + AI Services
├── utils/            # Shared TypeScript interfaces (Resume, ParsedResume)
└── package.json          # Root workspace configuration & run scripts
```

---

## Quick Start & Setup

**1. Clone the repository**

```bash
git clone <your-repo-url>
cd recruiters-right-hand
```

**2. Set up your Environment Variables**
Navigate to the `backend/` folder and create a `.env` file. Add your Google Gemini API Key:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

**3. The "God Command" (Install, Build, and Run)**
From the **root** of the project, run this single command. It will automatically install all dependencies across the monorepo, build the shared `utils` package so your types are linked, and boot up both the frontend and backend servers concurrently:

```bash
npm start
```

- **Front** will be available at: `http://localhost:5173` (or your Vite default)
- **Backend** will be running at: `http://localhost:3000`

---

This perfectly captures the architecture you've built. Would you like me to draft up a standard `.gitignore` file to go alongside this so you don't accidentally push your `.env` or the massive `node_modules` folders to your repo?
