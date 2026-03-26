import type { RequirementLevel } from "./RequirementLevel";

export interface EducationRequirement extends RequirementLevel {
  degree: DegreeLevel;
  fieldOfStudy: string;
}

export type DegreeLevel =
  | "high-school"
  | "associate"
  | "bachelor"
  | "master"
  | "phd"
  | "other";
