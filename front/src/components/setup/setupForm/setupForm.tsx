import classNames from "classnames";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import style from "./setupForm.module.css";

interface SetupFormUIProps<T> {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: (texts: string[], jobDescription: string) => Promise<T>;
  allowMultiple?: boolean;
  onSuccess?: (response: T) => void;
}

export default function SetupFormUI<T>(props: SetupFormUIProps<T>) {
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [jobDescription]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleInternalSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsingPipeline = async () => {
      // 1. Prepare Multipart Form Data
      const formData = new FormData();
      files.forEach((file) => formData.append("resumeFiles", file));

      // 2. Generic Parsing Call (Both personas need this)
      const parseRes = await fetch("http://localhost:3000/file/parse", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) throw new Error("Failed to extract text from PDF(s)");
      const { resumes } = await parseRes.json();

      // Map the response into a simple array of strings
      const extractedTexts = resumes.map(
        (response: { text: string }) => response.text,
      );

      // 3. Hand off the clean data to the parent's specific AI logic
      return await props.onSubmit(extractedTexts, jobDescription);
    };

    toast
      .promise(parsingPipeline(), {
        loading: "Processing documents...",
        success: "Analysis complete!",
        error: (err) => err.message || "An error occurred.",
      })
      .then((response) => {
        props.onSuccess?.(response);
      })
      .catch(console.error);
  };

  const showcaseFiles = () => {
    if (files.length === 0) return "Drop PDF(s) here or click to browse";
    if (files.length === 1) return files[0].name;

    return files.map((f) => f.name).join(", ");
  };
  return (
    <form
      onSubmit={handleInternalSubmit}
      className={classNames(style.pageWrapper, style.formContainer)}
    >
      <div className={style.headerSection}>
        <h1 className={style.title}>{props.title}</h1>
        <p className={style.subtitle}>{props.subtitle}</p>
      </div>

      <div className={style.dropzoneWrapper}>
        <input
          type="file"
          multiple={props.allowMultiple}
          accept=".pdf"
          onChange={handleFileChange}
          className={style.hiddenFileInput}
        />
        <div className={style.dropzoneContent}>
          <span className={style.uploadIcon}>
            {props.allowMultiple ? "📚" : "📄"}
          </span>
          <p className={style.dropzoneText}>{showcaseFiles()}</p>
        </div>
      </div>

      <label className={style.label}>
        Job Description:
        <textarea
          ref={textareaRef}
          className={style.textarea}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste requirements here..."
        />
      </label>

      <button
        type="submit"
        className={style.submitButton}
        disabled={!jobDescription || files.length === 0}
      >
        {props.buttonText}
      </button>
    </form>
  );
}
