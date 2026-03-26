export interface ProfessionalExperience {
  workPlace: string;
  jobsData: JobData[];
}

interface JobData {
  title: string;
  industry: string;
  startDate: string;
  endDate: string;
  comments: string[];
}
