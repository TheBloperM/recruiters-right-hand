import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import type { Resume } from "recruiters-utils";
import { useResumeStore } from "@/store";
import toast from "react-hot-toast";
import classNames from "classnames";
import style from "./setupResume.module.css";

export default function SetupResume() {
  const [jobDescription, setJobDescription] = useState("");
  const { setResume } = useResumeStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null); // 1. New File State

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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const generateAIResume = async () => {
        const response = await fetch("http://localhost:3000/resume/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription }),
        });

        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      };

      toast
        .promise(generateAIResume(), {
          loading: "Generating resume...",
          success: "Resume generated!",
          error: "Failed to generate resume",
        })
        .then((response) => {
          setResume(response.resume as Resume);
        });
    } catch (err) {
      console.log(err);
    }
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
        {/* The actual input is stretched and invisible over this whole box */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className={style.hiddenFileInput}
        />

        {/* This is what the user actually sees */}
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
