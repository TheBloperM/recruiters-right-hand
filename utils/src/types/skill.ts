export interface Skill {
  name: string;
  level: SkillLevelType;
}

export const SkillLevel = {
  CourseLevel: "Course-Level",
  Beginner: "Beginner",
  Intermediate: "Intermediate",
  Advanced: "Advanced",
  Expert: "Expert",
} as const;

export type SkillLevelType = (typeof SkillLevel)[keyof typeof SkillLevel];
