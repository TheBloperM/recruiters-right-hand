import type { NavigationStep } from "@/types/navigationStep";
import { ViewMode, type ViewModeType } from "@/types/viewMode";

export const NAVIGATION_CONFIG: Record<ViewModeType, NavigationStep[]> = {
  [ViewMode.Candidate]: [
    {
      label: "Upload & Setup",
      path: "/",
      isDisabled: () => false,
    },
    {
      label: "Tailored Output",
      path: "/output",
      isDisabled: (state) => !state,
    },
    {
      label: "Export PDF",
      path: "/output",
      isDisabled: (_, path: string) => path !== "/output",
      isExport: true,
    },
  ],
  [ViewMode.Recruiter]: [
    {
      label: "Job & Batch Upload",
      path: "/",
      isDisabled: () => false,
    },
    {
      label: "Candidate Ranking",
      path: "/leaderboard",
      isDisabled: (state) => !state.leaderboard?.length,
    },
  ],
};
