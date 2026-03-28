import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
import style from "./leaderboard.module.css";
import type { LeaderboardEntry } from "../../../../utils/src/types";
import CandidateCard from "./candidateCard/candidateCard";

export function Leaderboard() {
  const navigate = useNavigate();
  const leaderboard = useAppStore(
    useShallow((state) => state.leaderboard as LeaderboardEntry[]),
  );

  useEffect(() => {
    if (!leaderboard || leaderboard.length === 0) {
      navigate("/recruiter", { replace: true });
    }
  }, [leaderboard, navigate]);

  if (!leaderboard || leaderboard.length === 0) return null;

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  return (
    <div className={style.leaderboardContainer}>
      <div className={style.header}>
        <h1>Candidate Rankings</h1>
        <p>
          Evaluated {sortedLeaderboard.length} candidates against the job
          description.
        </p>
      </div>

      <div className={style.cardList}>
        {sortedLeaderboard.map((entry, index) => (
          <CandidateCard
            key={entry.candidateName}
            rank={index + 1}
            entry={entry}
          />
        ))}
      </div>
    </div>
  );
}
