import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useResumeStore } from "@/store";
import toast from "react-hot-toast";
import classNames from "classnames";
import style from "./setupResume.module.css";

export default function SetupResume() {
  const [jobDescription, setJobDescription] = useState("");
  const { setResume } = useResumeStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [jobDescription]);

  const handleFileChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (files && files.length > 0) {
      setResumeFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processResumePipeline = async () => {
      const formData = new FormData();
      formData.append("resumeFiles", resumeFile as Blob);

      const parseRes = await fetch("http://localhost:3000/file/parse", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) throw new Error("Failed to extract text from PDF");
      const parseData = await parseRes.json();
      const extractedText = parseData.resumes[0].text;

      const tailorRes = await fetch("http://localhost:3000/resume/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          resume: extractedText,
        }),
      });

      if (!tailorRes.ok) throw new Error("Failed to tailor resume via AI");
      return tailorRes.json();
    };

    toast
      .promise(processResumePipeline(), {
        loading: "Tailoring your resume! This may take a moment...",
        success: "Resume perfectly tailored!",
        error: (err) => err.message || "Something went wrong.",
      })
      .then((response) => {
        setResume(response.resume);
      })
      .catch(console.error);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(style.pageWrapper, style.formContainer)}
    >
      <div className={style.headerSection}>
        <h1 className={style.title}>Tailor Your Resume</h1>
        <p className={style.subtitle}>
          Upload your existing resume and paste the target job description. Our
          AI will intelligently rewrite your experience, summary, and skills to
          perfectly match the role and bypass Applicant Tracking Systems (ATS).
        </p>
      </div>

      <div className={style.dropzoneWrapper}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className={style.hiddenFileInput}
        />

        <div className={style.dropzoneContent}>
          <span className={style.uploadIcon}>📄</span>
          <p className={style.dropzoneText}>
            {resumeFile ? (
              <span className={style.fileName}>
                Selected: {resumeFile.name}
              </span>
            ) : (
              "Drag & drop your PDF here, or click to browse"
            )}
          </p>
        </div>
      </div>

      <label className={style.label}>
        Job Description:
        <textarea
          ref={textareaRef}
          className={style.textarea}
          placeholder="Paste the job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className={style.submitButton}
        disabled={!jobDescription || !resumeFile} // Disable if either job description or resume file is missing
      >
        Generate Resume
      </button>
    </form>
  );
}
