import { useState, type SubmitEvent } from "react";
import type { Resume } from "recruiters-utils";
import { useResumeStore } from "../store";

export default function ResumeGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const { setResume } = useResumeStore();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/resume/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate resume");
      }

      setResume(data.resume as Resume);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Description:
        <textarea
          placeholder="Paste the job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!jobDescription}>
        Generate Resume
      </button>
    </form>
  );
}
