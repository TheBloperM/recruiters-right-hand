import { GoogleGenAI, Type } from "@google/genai";
import { Resume } from "recruiters-utils";

const ai = new GoogleGenAI({});

const skillSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    level: {
      type: Type.STRING,
      enum: ["1", "2", "3", "4", "5"],
      description: "Proficiency level from 1 (beginner) to 5 (master).",
    },
  },
  required: ["name", "level"],
};

const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    professionalTitle: {
      type: Type.STRING,
      description:
        "A compelling job title that reflects the candidate's expertise.",
    },
    description: {
      type: Type.STRING,
      description:
        "A highly compelling professional summary for the candidate.",
    },
    contractData: {
      type: Type.OBJECT,
      properties: {
        linkedin: {
          type: Type.STRING,
          description:
            "if given linkedIn URL in the original resume, use it. If not, fabricate a realistic LinkedIn URL based on the candidate's name (e.g., linkedin.com/in/john-doe).",
        },
        email: {
          type: Type.STRING,
          description:
            "if given email in the original resume, use it. If not, fabricate a realistic email address based on the candidate's name (e.g., john.doe@example.com).",
        },
        protofolio: {
          type: Type.STRING,
          description:
            "if given portfolio URL in the original resume, use it. If not, fabricate a realistic portfolio URL based on the candidate's name (e.g., johndoe.dev).",
        },
        github: {
          type: Type.STRING,
          description:
            "if given GitHub URL in the original resume, use it. If not, fabricate a realistic GitHub URL based on the candidate's name (e.g., github.com/johndoe).",
        },
        phoneNumber: {
          type: Type.STRING,
          description:
            "if given phone number in the original resume, use it. If not, fabricate a realistic phone number formatted as (XXX) XXX-XXXX, used for job applications",
        },
        address: { type: Type.STRING, description: "city and country" },
      },
      required: [
        "linkedin",
        "email",
        "protofolio",
        "github",
        "phoneNumber",
        "address",
      ],
    },
    skillsAndTechnologies: {
      type: Type.OBJECT,
      properties: {
        softSkills: { type: Type.ARRAY, items: skillSchema },
        programmingLanguages: { type: Type.ARRAY, items: skillSchema },
        technologies: { type: Type.ARRAY, items: skillSchema },
      },
      required: ["softSkills", "programmingLanguages", "technologies"],
    },
    interests: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "Candidate's interests and passions, does not need to be work-related.",
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          nameOfTitle: { type: Type.STRING },
          educationPlace: { type: Type.STRING },
          mainSubjects: { type: Type.ARRAY, items: { type: Type.STRING } },
          startingYear: { type: Type.INTEGER },
          endingYear: { type: Type.INTEGER },
        },
        required: [
          "nameOfTitle",
          "educationPlace",
          "mainSubjects",
          "startingYear",
          "endingYear",
        ],
      },
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          workPlace: { type: Type.STRING },
          industry: { type: Type.STRING },
          jobsData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                startDate: { type: Type.STRING, description: "e.g., Jan 2020" },
                endDate: {
                  type: Type.STRING,
                  description: "e.g., Present or Dec 2023",
                },
                comments: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description:
                    "Resume bullet points using strong action verbs and quantifiable metrics.",
                },
              },
              required: ["title", "startDate", "endDate", "comments"],
            },
          },
        },
        required: ["workPlace", "jobsData", "industry"],
      },
    },
  },
  required: [
    "name",
    "description",
    "contractData",
    "skillsAndTechnologies",
    "interests",
    "education",
    "experience",
  ],
};

export const tailorResumeForJobDescription = async (
  resume: string,
  jobDescription: string,
): Promise<Resume> => {
  const tailoringPrompt = `
You are an elite ATS (Applicant Tracking System) optimizer and technical recruiter. 
Your singular task is to rewrite a candidate's Original Resume to perfectly align with a target Job Description.

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
