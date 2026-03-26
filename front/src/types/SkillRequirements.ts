import type { RequirementLevel } from "./RequirementLevel";

export interface SkillRequirement extends RequirementLevel {
  name: string;
  level?: SkillLevel;
  yearsOfExperience?: number;
}

export type SkillLevel = "Basic" | "Intermediate" | "Aadvanced" | "Expert";
