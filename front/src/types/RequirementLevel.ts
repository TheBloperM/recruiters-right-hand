export interface RequirementLevel {
  fieldImportance: RequirementLevelType;
}

export type RequirementLevelType = "Required" | "Recommended" | "Good-To-Have";
