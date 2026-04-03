import { Schema } from "@google/genai";
import { LeaderboardEntry } from "recruiters-utils";
import { generateSchema } from "../utils/schemasFactory.util.js";

const template: LeaderboardEntry = {
  candidateName: "",
  score: 0,
  summary: "",
  scoreReasoning: "",
  keySkills: [""],
  keyGaps: [""],
  isSeniorityMatching: true,
  isEducationMatcing: true,
  isLocationAccessibleToWorkplace: true,
  approximateSalaryMatch: true,
};

export const leaderboardSchema: Schema = generateSchema(template);
