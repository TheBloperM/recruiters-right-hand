import { useAppStore } from "@/store";
import SetupForm from "./setupForm/setupForm";
import type { LeaderboardEntry } from "recruiters-utils";

export function RankingSetup() {
  const setLeaderboard = useAppStore((state) => state.setLeaderboard);

  const submitResumesForRanking = async (
    texts: string[],
    jobDescription: string,
  ) => {
    const rankingRes = await fetch("http://localhost:3000/resume/rank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobDescription,
        resumes: texts,
      }),
    });

    if (!rankingRes.ok) throw new Error("Failed to rank resumes via AI");
    return rankingRes.json();
  };

  const onResumesSuccessfulyRanked = (response: {
    leaderboard: LeaderboardEntry[];
  }) => {
    console.log("Received leaderboard from backend:", response.leaderboard);
    setLeaderboard(response.leaderboard);
  };
  const title = "Rank Your Resumes";

  const subtTile =
    "Upload your resumes and paste the target job description. \n Our AI will intelligently rank your candidates based on their fit for the role.";

  const buttonLabel = "Rank Resumes";

  return (
    <SetupForm
      title={title}
      subtitle={subtTile}
      buttonText={buttonLabel}
      onSubmit={submitResumesForRanking}
      onSuccess={onResumesSuccessfulyRanked}
      allowMultiple
    />
  );
}
