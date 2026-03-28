import { Type, Schema } from "@google/genai";

export const leaderboardSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    candidateName: { type: Type.STRING },
    score: { type: Type.NUMBER },
    summary: { type: Type.STRING },
    scoreReasoning: { type: Type.STRING },
    keySkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    keyGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
    isSeniorityMatching: { type: Type.BOOLEAN },
    isEducationMatcing: { type: Type.BOOLEAN },
    isLocationAccessibleToWorkplace: { type: Type.BOOLEAN },
    approximateSalaryMatch: { type: Type.BOOLEAN },
  },
  required: [
    "candidateName",
    "score",
    "summary",
    "scoreReasoning",
    "keySkills",
    "keyGaps",
    "isSeniorityMatching",
    "isEducationMatcing",
    "isLocationAccessibleToWorkplace",
    "approximateSalaryMatch",
  ],
};
