// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Resume from "./components/resume/resume"; // Your current ugly-but-working view
import { TailoringSetup } from "./components/setup/tailoringSetup";
import { RankingSetup } from "./components/setup/rankingSetup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TailoringSetup />} />
          <Route path="/output" element={<Resume />} />
          <Route path="/candidate" element={<TailoringSetup />} />
          <Route path="/recruiter" element={<RankingSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
