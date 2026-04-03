# Recruiter's Right Hand

An AI-powered, full-stack monorepo application designed to bridge the gap between job seekers and hiring managers using Google's Gemini 2.5 Flash. Depending on your goals, the application operates in two distinct modes to maximize efficiency in the hiring process.

## Candidate Mode: The Resume Tailorer

Designed to parse existing resumes and automatically tailor them to specific job descriptions. It outputs an ATS-friendly, text-selectable PDF that maximizes a candidate's chances of passing automated screening.

- **PDF Parsing:** Extracts raw text from uploaded candidate resumes using `pdf-parse`.
- **AI Tailoring:** Perfectly aligns a candidate's existing experience with a target Job Description using the STAR method, strict keyword weaving, and zero hallucination.
- **ATS-Friendly Export:** Utilizes `react-to-print` and the browser's native print engine to generate a text-selectable PDF that Applicant Tracking Systems can actually read.
- **Smart UI:** Zustand-managed state across a multi-step flow (Input -> Output -> Export).

## Recruiter Mode: The Candidate Ranker

Designed to save hours of manual screening by evaluating a batch of resumes against a specific Job Description and generating an objective, ranked leaderboard.

- **Batch PDF Processing:** Handles up to 20 candidate PDF uploads at once, securely extracting text in memory.
- **Objective Fit Scoring (0-100):** Assigns a concrete score based on how well the candidate's historical experience aligns with the JD's core requirements.
- **AI Reasoning & Summaries:** Generates a human-readable explanation of _why_ the candidate received their score, alongside extracted "Key Skills" and "Key Gaps".
- **Quick-Match Badges:** Automatically flags if a candidate matches the required Seniority, Education level, and Location parameters.

---

## Tech Stack

- **Monorepo Structure:** NPM Workspaces
- **Frontend:** React, TypeScript, Vite, Zustand, CSS Modules
- **Backend:** Node.js, Express, TypeScript, Multer (Memory Storage)
- **AI:** `@google/genai` (Gemini 2.5 Flash with strict JSON Schema generation)
- **Shared Utilities:** Custom ESM NodeNext package for shared types (`utils`)

---

## Workspace Structure

```text
recruiters-right-hand/
├── front/               # React + Vite application
├── backend/             # Express API + AI Services
├── utils/               # Shared TypeScript interfaces (Resume, LeaderboardEntry)
└── package.json         # Root workspace configuration & run scripts
```

---

## Quick Start & Setup

**1. Clone the repository**

```bash
git clone <your-repo-url>
cd recruiters-right-hand
```

**2. Set up your Environment Variables**
Navigate to the `backend/` folder and create a `.env` file. Add your Google Gemini API Key.
The port, the Gemini model you would like to use and the request type are all optional:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
GEMINI_MODEL=gemini-2.5-flash
GEMINI_MIME_TYPE=application/json
```

**3. The "God Command" (Install, Build, and Run)**
From the **root** of the project, run this single command. It will automatically install all dependencies across the monorepo, build the shared `utils` package so your types are linked, and boot up both the frontend and backend servers concurrently:

```bash
npm start
```

- **Front** will be available at: `http://localhost:5173` (or your Vite default)
- **Backend** will be running at: `http://localhost:3000`
