export interface LeaderboardEntry {
  candidateName: string;
  score: number;
  summary: string;
  scoreReasoning: string;
  keySkills: string[];
  keyGaps: string[];
  isSeniorityMatching: boolean;
  isEducationMatcing: boolean;
  isLocationAccessibleToWorkplace: boolean;
  approximateSalaryMatch: boolean;
}
