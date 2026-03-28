import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Resume from "./components/resume/resume";
import { TailoringSetup } from "./components/setup/tailoringSetup";
import { RankingSetup } from "./components/setup/rankingSetup";
import { Leaderboard } from "./components/leaderboard/leaderboard";
import { useEffect } from "react";
import { useAppStore } from "./store";

export default function App() {
  const leaderboard = useAppStore((state) => state.leaderboard);

  useEffect(() => {
    console.log(leaderboard, "leaderboard in app.tsx");
  }, [leaderboard]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TailoringSetup />} />
          <Route path="/output" element={<Resume />} />
          <Route path="/candidate" element={<TailoringSetup />} />
          <Route path="/recruiter" element={<RankingSetup />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
