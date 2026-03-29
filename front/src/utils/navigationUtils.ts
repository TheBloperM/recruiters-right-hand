import type { NavigationStep } from "@/types/navigationStep";
import { ViewMode, type ViewModeType } from "@/types/viewMode";

export const NAVIGATION_CONFIG: Record<ViewModeType, NavigationStep[]> = {
  [ViewMode.Candidate]: [
    {
      label: "Setup",
      path: ["/candidate", "/"],
      isDisabled: () => false,
    },
    {
      label: "Optimized Resume",
      path: "/output",
      isDisabled: (state) => !state,
    },
    {
      label: "Download",
      path: "/output",
      isDisabled: (_, path: string) => path !== "/output",
      isExport: true,
    },
  ],
  [ViewMode.Recruiter]: [
    {
      label: "Upload Candidates",
      path: "/recruiter",
      isDisabled: () => false,
    },
    {
      label: "Leaderboard",
      path: "/leaderboard",
      isDisabled: (state) => !state,
    },
  ],
};
