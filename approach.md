# 🛠 Technical Approach & Key Decisions

This document outlines the architectural philosophy and strategic decisions made during the development of **Recruiter's Right Hand**.

---

## 1. Monorepo Architecture (NPM Workspaces)

**Decision:** Consolidate the Frontend, Backend, and shared logic into a single repository managed by NPM Workspaces.

- **Why:** In full-stack TypeScript projects, the "Contract" (the data shape) between the API and the UI is the most common point of failure.
- **Result:** By using a shared `packages/utils` library, we achieve **Universal Type Safety**. If the `Resume` interface changes in the utils package, both the React frontend and Express backend will fail to compile until the change is addressed. This eliminates "undefined" errors at runtime.

---

## 2. Schema-First AI Integration

**Decision:** Moving beyond "string-based" prompting to **Structured Output Schemas** using the Gemini 2.5 Flash SDK.

- **Why:** Traditional LLM prompting often returns malformed JSON or inconsistent keys, requiring complex "regex" cleaning.
- **Result:** By passing a strict `responseSchema` (similar to a Zod or JSON schema) directly to the Google AI SDK, the model is physically constrained to return a valid object. This ensures the data perfectly fits our TypeScript interfaces every time, removing the need for backend "sanitization" logic.

---

## 3. "Deductive Translation" Prompt Engineering

**Decision:** Implementing a prompt strategy that focuses on semantic mapping rather than simple rewriting.

- **Why:** Many candidates have the skills a job requires but use different terminology (e.g., "Express.js" vs. "Node.js").
- **Result:** The AI is instructed to perform **Deductive Translation**. It identifies the core competencies in the original resume and translates them into the specific vocabulary of the Job Description. This maximizes "ATS Match Scores" without hallucinating fake experience.

---

## 4. ATS-Friendly Document Generation

**Decision:** Prioritizing "Text-Selectable" PDFs over "Image-Based" PDF snapshots.

- **Why:** Many React-to-PDF libraries take a "screenshot" of the HTML. This creates an image-based PDF that Applicant Tracking Systems (ATS) cannot read, leading to automatic rejection.
- **Result:** We utilized `react-to-print` to leverage the browser's native print engine. This ensures the exported PDF contains **raw text metadata**, allowing recruiter software to highlight, search, and parse the candidate's information perfectly.

---

## 5. Pragmatic "Decoupled Monolith" Backend

**Decision:** Choosing a unified Express server (Monolith) over a Microservices architecture.

- **Why:** Microservices introduce significant networking overhead, deployment costs, and "distributed monolith" complexity that is unnecessary for a focused tool.
- **Result:** We maintained a single, highly-organized Express backend. This keeps the application "lean," easy to deploy on a single container, and significantly faster to debug while still maintaining a clean separation between the "Parsing" and "Tailoring" services.
- **Scalability Note:** This architecture is designed to be Microservice-Ready. Should the application scale to a high volume of concurrent users, the existing service boundaries (PDF Parsing, AI Processing, and Exporting) are decoupled enough to be easily extracted into independent, auto-scaling microservices (e.g., using AWS Lambda or Kubernetes) without requiring a full rewrite of the core logic.
