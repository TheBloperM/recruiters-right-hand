import { useAppStore } from "@/store";
import SetupForm from "./setupForm/setupForm";
import type { Resume } from "recruiters-utils";

export function TailoringSetup() {
  const { setResume } = useAppStore();

  const submitResumeForTailoring = async (
    files: File[],
    jobDescription: string,
  ) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", files[0]);

    const tailorRes = await fetch("http://localhost:3000/resume/tailor", {
      method: "POST",
      body: formData,
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

  return (
    <SetupForm
      title={title}
      subtitle={subtTile}
      onSubmit={submitResumeForTailoring}
      onSuccess={onResumeSuccessfulyTrailored}
      toastMessage="Tailor"
    />
  );
}
