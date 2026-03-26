import type { Certification } from "./certification.js";
import type { ContractData } from "./contractData.js";
import type { EducationData } from "./educationData.js";
import type { ProfessionalExperience } from "./professionalExperience.js";
import type { SkillsAndTechnologies } from "./skillsAndTechnologies.js";

export interface Resume {
  name: string;
  professionalTitle: string;
  description: string;
  contractData: ContractData;
  skillsAndTechnologies: SkillsAndTechnologies;
  interests: string[];
  education: EducationData[];
  experience: ProfessionalExperience[];
  certifications: Certification[];
}
