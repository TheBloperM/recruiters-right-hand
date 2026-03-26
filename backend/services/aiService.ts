import { GoogleGenAI, Type } from '@google/genai';
import { Resume } from 'recruiters-utils'; // <-- 1. Import your shared type!

const ai = new GoogleGenAI({});

// 2. The Gemini Runtime Schema (Keep this exactly as is)
const skillSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    level: { 
      type: Type.STRING, 
      enum: ["1", "2", "3", "4", "5"],
      description: "Proficiency level from 1 (beginner) to 5 (master)."
    }
  },
  required: ["name", "level"]
};

const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING, description: "A highly compelling professional summary for the candidate." },
    contractData: {
      type: Type.OBJECT,
      properties: {
        linkedin: { type: Type.STRING, description: "Realistic mock LinkedIn URL" },
        email: { type: Type.STRING },
        protofolio: { type: Type.STRING, description: "Realistic mock portfolio URL" },
        github: { type: Type.STRING, description: "Realistic mock GitHub URL" },
        phoneNumber: { type: Type.STRING },
        address: { type: Type.STRING }
      },
      required: ["linkedin", "email", "protofolio", "github", "phoneNumber", "address"]
    },
    skillsAndTechnologies: {
      type: Type.OBJECT,
      properties: {
        softSkills: { type: Type.ARRAY, items: skillSchema },
        programmingLanguages: { type: Type.ARRAY, items: skillSchema },
        technologies: { type: Type.ARRAY, items: skillSchema }
      },
      required: ["softSkills", "programmingLanguages", "technologies"]
    },
    interests: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
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
          endingYear: { type: Type.INTEGER }
        },
        required: ["nameOfTitle", "educationPlace", "mainSubjects", "startingYear", "endingYear"]
      }
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          workPlace: { type: Type.STRING },
          jobsData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                industry: { type: Type.STRING },
                startDate: { type: Type.STRING, description: "e.g., Jan 2020" },
                endDate: { type: Type.STRING, description: "e.g., Present or Dec 2023" },
                comments: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "Resume bullet points using strong action verbs and quantifiable metrics."
                }
              },
              required: ["title", "industry", "startDate", "endDate", "comments"]
            }
          }
        },
        required: ["workPlace", "jobsData"]
      }
    }
  },
  required: ["name", "description", "contractData", "skillsAndTechnologies", "interests", "education", "experience"]
};

// 3. Strongly type the function signature and the return value
export const generateResumeFromJobDescription = async (jobDescription: string): Promise<Resume> => {
  try {
    const recruiterPrompt = `Act as an elite Executive Recruiter. I will provide a job description below. Reverse-engineer this description and generate a highly detailed resume for the ideal "unicorn" candidate who perfectly matches the role.

    CRITICAL INSTRUCTIONS:
    1. Quantifiable Achievements: Inside the 'comments' array of jobsData, use strong action verbs and realistic, quantifiable metrics (percentages, revenue, time saved).
    2. Career Progression: Fabricate a logical career trajectory over the last 7-10 years.
    3. Links: Fabricate realistic URLs for GitHub, Portfolio, and LinkedIn based on the generated name.

    Job Description: 
    ${jobDescription}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: recruiterPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      }
    });

    // 4. Cast the parsed JSON as your Resume interface
    return JSON.parse(response.text!) as Resume;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate resume from Google AI.");
  }
};