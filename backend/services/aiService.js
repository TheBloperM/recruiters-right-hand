import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateResumeFromJobDescription = async (jobDescription) => {
  try {
    const recruiterPrompt = `Act as an elite Executive Recruiter and Talent Acquisition Expert. I will provide a job description below. Your task is to reverse-engineer this job description and generate a comprehensive, highly detailed resume for the ideal "unicorn" candidate who perfectly matches the role.

    CRITICAL INSTRUCTIONS FOR INVALID INPUTS:
    Before generating the resume, evaluate the provided job description:
    - If the job description is empty, nonsensical, or extremely brief (under 30 words): DO NOT generate a resume. Instead, abort the task and output exactly this string: "ERROR: The provided job description is too short or invalid. Please provide a detailed description."
    - If the job description has a valid title but is missing critical details, proceed with generating the resume by making highly educated assumptions based on elite industry standards. Explicitly list your assumptions in the "Recruiter's Note."

    1. Format: Structure the resume professionally (Mock Contact Info, Summary, Core Competencies, Experience, Education).
    2. Quantifiable Achievements: Use strong action verbs and include realistic, quantifiable metrics (percentages, revenue, time saved).
    3. Career Progression: Fabricate a logical career trajectory over the last 7-10 years.
    4. Keyword Optimization: Naturally integrate the tools and key phrases from the description.
    5. Recruiter's Justification: Add a brief "Recruiter's Note" at the end explaining your choices.

    Here is the job description: 
    ${jobDescription}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: recruiterPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate resume from Google AI.");
  }
};
