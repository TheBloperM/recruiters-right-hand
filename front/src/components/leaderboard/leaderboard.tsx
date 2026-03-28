import { useAppStore } from "@/store";

export function Leaderboard() {
  const leaderboard = useAppStore((state) => state.leaderboard);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard?.map((entry, index) => (
          <li key={index}>
            <strong>{entry.candidateName}</strong>: {entry.score}%
          </li>
        ))}
      </ul>
    </div>
  );
}
