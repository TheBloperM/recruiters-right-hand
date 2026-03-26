export interface SalaryRange {
  min?: number;
  max?: number;
  currency?: string;
  period?: SalaryPeriod;
}

export type SalaryPeriod = "Hour" | "Day" | "Week" | "Month" | "Year";
