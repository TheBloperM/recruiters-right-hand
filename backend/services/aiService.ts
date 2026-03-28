import { GoogleGenAI, Type } from "@google/genai";
import { LeaderboardEntry, Resume } from "recruiters-utils";
import { resumeSchema } from "../schemas/resumeSchema.js";
import { leaderboardSchema } from "../schemas/leaderboardSchema.js";

const ai = new GoogleGenAI({});

export const tailorResumeForJobDescription = async (
  resume: string,
  jobDescription: string,
): Promise<Resume> => {
  const tailoringPrompt = `
You are an elite ATS (Applicant Tracking System) optimizer and technical recruiter. 
Your singular task is to rewrite a candidate's Original Resume to perfectly align with a target Job Description.

--- CRITICAL GUARDRAIL: INPUT VALIDATION ---
If the "ORIGINAL RESUME TEXT" or "TARGET JOB DESCRIPTION" provided below is garbled, contains non-resume content (e.g., a cooking recipe, random gibberish), or is otherwise invalid for professional processing, you MUST NOT proceed. 
Instead, populate the "name" field with the exact string "ERROR: INVALID_RESUME_INPUT" and leave all other fields as empty strings or empty arrays.

CRITICAL DIRECTIVES:

1. ABSOLUTE FACTUALITY (ZERO HALLUCINATION): 
You are strictly forbidden from inventing jobs, degrees, metrics, responsibilities, or years of experience. Do not add skills the candidate does not actually possess. Your modifications must be anchored entirely in the provided resume.

2. DEDUCTIVE TRANSLATION (HEAVILY IMPLIED CONTEXT): 
You must translate the candidate's existing experience into the exact vocabulary used in the Job Description, provided the original resume heavily implies it or it can be easily assumed by an industry expert.
- Example: If the resume states "Built a backend server using Express" and the JD asks for "Node.js development", you must rewrite the bullet point to include "Node.js".

3. KEYWORD WEAVING: 
Identify the mandatory keywords (tools, frameworks, methodologies) from the Job Description. Naturally weave these exact keywords into the resume's summary, skills section, and experience bullets wherever the candidate's historical context logically supports it.

4. STRATEGIC REORDERING & EMPHASIS: 
Analyze the core priorities of the Job Description. Rewrite the professional summary to highlight the candidate's most relevant traits. Reorder the bullet points under each job so the accomplishments that best match the JD appear at the very top.

5. NOISE REDUCTION (RUTHLESS PRUNING):
If the candidate has bullet points, skills, or past roles that are completely irrelevant to the target Job Description, ruthlessly condense or de-emphasize them. Your goal is a high signal-to-noise ratio. The recruiter should only see what matters for this specific role.

6. IMPACT & ACTION FORMATTING (STAR METHOD):
Ensure every bullet point begins with a strong, active-voice verb (e.g., "Architected", "Spearheaded", "Optimized" instead of "Responsible for" or "Helped with"). Preserve and highlight ALL existing metrics, percentages, or concrete numbers from the original resume, framing them as the direct result of the candidate's actions.

7. SENIORITY ALIGNMENT:
Adjust the tone of the accomplishments to match the seniority level of the JD. 
- If the JD is a Senior/Lead role, frame the existing experience around architecture, system design, mentoring, and ownership.
- If the JD is a Mid-level role, focus on execution, delivering features, and technical proficiency.

--- INPUT DATA ---

TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""

ORIGINAL RESUME TEXT:
"""
${resume}
"""
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: tailoringPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: resumeSchema,
    },
  });

  return JSON.parse(response.text!) as Resume;
};

export const rankResumesForJobDescription = async (
  resumes: string[],
  jobDescription: string,
): Promise<LeaderboardEntry[]> => {
  const rankingPrompt = `Act as a Senior Technical Recruiter and expert Applicant Tracking System (ATS) evaluator. Your task is to analyze a provided Job Description and objectively evaluate a batch of Candidate Resumes against it.

  --- CRITICAL GUARDRAIL: INPUT VALIDATION ---
If any "CANDIDATE RESUME" or "TARGET JOB DESCRIPTION" provided below is invalid, garbled, or not a professional resume, you must still return an entry for that candidate but set their "score" to 0 and their "summary" to "ERROR: INVALID_DOCUMENT_TYPE".

INSTRUCTIONS:

ANALYZE the Job Description: Identify the core requirements, mandatory skills (hard and soft), required years of experience, and nice-to-haves.

EVALUATE the Candidates: Review each provided Resume strictly against the Job Description criteria. Look for direct matches, transferable skills, and explicitly note missing requirements. Do not invent or assume qualifications that are not explicitly written in the resume.

SCORE & RANK: Assign a "Fit Score" from 0 to 100 for each candidate based on their alignment with the role, then rank them from highest score to lowest.

SUMMARIZE: Provide a concise breakdown of why the candidate received their score, highlighting their strongest matching points and their biggest gaps.


--- INPUT DATA ---

TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""

CANDIDATE RESUMES:
${resumes.map((resume, index) => `Candidate ${index + 1} Resume:\n"""${resume}"""\n`).join("\n")}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: rankingPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: leaderboardSchema,
      },
    },
  });

  return JSON.parse(response.text!) as LeaderboardEntry[];
};
