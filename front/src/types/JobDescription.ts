import type { EducationRequirement } from "./EducationRequirement";
import type { EmploymentType } from "./EmployeeType";
import type { JobLocation } from "./JobLocation";
import type { ProfessionalBackground } from "./ProfessionalBackground";
import type { SalaryRange } from "./SalaryRange";
import type { SeniorityLevel } from "./SeniorityLevel";
import type { SkillRequirement } from "./SkillRequirements";
import type { RemoteDays } from "./WeeklyTimeAtOffice";

export interface JobDescription {
  title: string;
  companyName: string;
  employmentType: EmploymentType;
  remoteDays: RemoteDays;
  location: JobLocation;
  responsibilities: string[];
  summary?: string;
  skills?: SkillRequirement[];
  seniorityLevel?: SeniorityLevel;
  salary?: SalaryRange;
  yearsOfExperience?: number;
  benefits?: string[];
  educationRequirements?: EducationRequirement[];
  certifications?: string[];
  background?: ProfessionalBackground[];
}
