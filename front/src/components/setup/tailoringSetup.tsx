import { useAppStore } from "@/store";
import SetupForm from "./setupForm/setupForm";
import type { Resume } from "recruiters-utils";

export function TailoringSetup() {
  const { setResume } = useAppStore();

  const submitResumeForTailoring = async (
    texts: string[],
    jobDescription: string,
  ) => {
    const tailorRes = await fetch("http://localhost:3000/resume/tailor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobDescription,
        resume: texts[0],
      }),
    });

    if (!tailorRes.ok) throw new Error("Failed to tailor resume via AI");
    return tailorRes.json();
  };

  const onResumeSuccessfulyTrailored = (response: { resume: Resume }) => {
    setResume(response.resume);
  };
  const title = "Tailor Your Resume";

  const subtTile =
    "Upload your existing resume and paste the target job description. \n Our AI will intelligently rewrite your experience, summary, and skills to perfectly match the role and bypass Applicant Tracking Systems (ATS).";

  const buttonLabel = "Generate Tailored Resume";

  return (
    <SetupForm
      title={title}
      subtitle={subtTile}
      buttonText={buttonLabel}
      onSubmit={submitResumeForTailoring}
      onSuccess={onResumeSuccessfulyTrailored}
    />
  );
}
