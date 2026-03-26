export const EMPLOYMENT_TYPES = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Internship",
  "freelance",
] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];
