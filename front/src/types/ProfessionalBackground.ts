import type { RequirementLevel } from "./RequirementLevel";

export interface ProfessionalBackground extends RequirementLevel {
  name: string;
  yearsOfExperience: number;
}
