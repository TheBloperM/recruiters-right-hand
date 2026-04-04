import { useAppStore } from "@/store";
import SetupForm from "./setupForm/setupForm";
import type { LeaderboardEntry } from "recruiters-utils";

export function RankingSetup() {
  const setLeaderboard = useAppStore((state) => state.setLeaderboard);

  const submitResumesForRanking = async (
    files: File[],
    jobDescription: string,
  ) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);

    files.forEach((file) => {
      formData.append("resumes", file);
    });

    const rankingRes = await fetch("http://localhost:3000/resume/rank", {
      method: "POST",
      body: formData,
    });

    if (!rankingRes.ok) throw new Error("Failed to rank resumes via AI");
    return rankingRes.json();
  };

  const onResumesSuccessfulyRanked = (response: {
    leaderboard: LeaderboardEntry[];
  }) => {
    setLeaderboard(response.leaderboard);
  };

  const title = "Rank Your Resumes";

  const subtitle =
    "Upload your resumes and paste the target job description. \n Our AI will intelligently rank your candidates based on their fit for the role.";

  return (
    <SetupForm
      title={title}
      subtitle={subtitle}
      onSubmit={submitResumesForRanking}
      onSuccess={onResumesSuccessfulyRanked}
      toastMessage="Rank"
      allowMultiple
    />
  );
}
