export interface ProfessionalExperience {
  workPlace: string;
  industry: string;
  jobsData: JobData[];
}

interface JobData {
  title: string;
  startDate: string;
  endDate: string;
  comments: string[];
}
