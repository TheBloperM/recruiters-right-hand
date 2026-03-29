# Technical Approach & Design Decisions

This document outlines the engineering philosophy, trade-offs, and architectural decisions made during the development of **Recruiter's Right Hand**.

## Core Philosophy: Data Integrity in AI

The primary challenge of this application is balancing **AI creative power** with **factual accuracy**. Whether tailoring a single resume or ranking twenty, the system must translate unstructured PDF text into a highly structured React UI without "hallucinating" or inventing facts.

---

## Section 1: Candidate Mode (Resume Tailoring)

### 1.1 The Approach: "Deductive Translation"

Instead of a simple "rewrite," I approached the problem as a **Semantic Mapping** task.

- **Prompt Design:** The AI is instructed to act as a technical recruiter who bridges the gap between candidate terminology (e.g., "Express.js") and job description requirements (e.g., "Node.js").
- **Result:** This maximizes ATS match scores while remaining 100% anchored in the candidate's actual history.

### 1.2 Decisions & Trade-offs: Document Generation

- **Decision:** I utilized `react-to-print` to leverage the browser's native print engine instead of server-side PDF generation (like Puppeteer).
- **Trade-off:** Server-side generation offers more control but is resource-heavy and slow.
- **Result:** By using the browser engine, the exported PDF remains **text-selectable**, ensuring it is readable by Applicant Tracking Systems (ATS) while maintaining high performance.

### 1.3 Design: Frontend Flow

- The flow is designed as a **Linear Multi-Step State Machine** managed by Zustand.
- This ensures a clean separation between data input (PDF upload) and the complex, interactive resume output.

---

## Section 2: Recruiter Mode (Candidate Ranking)

### 2.1 The Approach: Objective Batch Evaluation

Processing multiple candidates requires a shift from "creative tailoring" to **analytical evaluation**.

- **Parallel Processing:** The backend uses `Promise.all` during the file parsing stage to handle multiple PDFs concurrently, significantly reducing the bottleneck for the end-user.

### 2.2 Decisions & Trade-offs: Schema Enforcement

- **Decision:** I strictly enforced Gemini's `responseSchema` at the SDK level rather than using raw string prompts.
- **Trade-off:** This slightly increases the complexity of the initial schema definition.
- **Result:** It eliminates the need for fragile "regex" cleaning of AI responses and ensures the UI can instantly render complex "Match Badges" and "Skill Gaps" without runtime errors.

### 2.3 Design: Backend Implementation

- The backend is a **Type-Safe Monolith**.
- By converting the backend from JavaScript to TypeScript, we achieved a "Type Contract" between the AI service and the API routes.
- Error handling was refactored to emit **JSON instead of HTML**, ensuring the React frontend can gracefully handle and display errors using `react-hot-toast`.
- Defensive AI Guardrails: The system prompts are engineered with strict failure conditions. If a user uploads an invalid file (e.g., a cooking recipe instead of a resume), the AI is instructed to return specific error strings. The Express server intercepts this, prevents the invalid data from reaching the frontend, and explicitly throws a 422 Unprocessable Entity error.

---

## Global Architectural Decisions

### 1. Monorepo & Universal Type Safety

- **Decision:** Consolidating Frontend, Backend, and shared logic into a single repository using NPM Workspaces.
- **Reasoning:** Sharing the `recruiters-utils` package ensures that a change to the `Resume` or `LeaderboardEntry` interface in one area immediately updates the entire stack.

### 2. CSS Architecture & Performance

- **Decision:** Replaced hardcoded styles with a centralized **CSS Variable System** and used Zustand's `useShallow` for state subscriptions.
- **Reasoning:** Standardizing on variables like `--blue` and `--text-main` ensures a unified brand identity. Using `useShallow` prevents massive components from re-rendering unnecessarily, maintaining a 60fps experience even with complex resume layouts.

### 3. DRY Schema Generation (Single Source of Truth)

- **Decision**: Implemented a custom schemaFactory utility to automatically generate Gemini AI schemas directly from the shared TypeScript interfaces.

- **Reasoning**: Manually maintaining massive JSON schemas for the AI prompt creates a high risk of a "Type Desync" between the backend and frontend. By dynamically crawling a template of the Resume and LeaderboardEntry interfaces, the backend automatically updates the AI's requirements if a field is added to the shared utils package. This creates a true Single Source of Truth.
