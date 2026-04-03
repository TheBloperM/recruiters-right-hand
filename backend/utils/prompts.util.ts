export const insertDataToPrompt = (
  prompt: string,
  jobDescription: string,
  resumes: string | string[],
) => `${prompt} 

--- INPUT DATA ---

TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""

CANDIDATE RESUME ${Array.isArray(resumes) ? "S" : ""}:
${Array.isArray(resumes) ? resumes.join("\n") : resumes}`;
