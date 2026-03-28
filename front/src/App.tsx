// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import SetupResume from "./components/resume/setupResume/setupResume";
import Resume from "./components/resume/resume"; // Your current ugly-but-working view

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SetupResume />} />
          <Route path="output" element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
