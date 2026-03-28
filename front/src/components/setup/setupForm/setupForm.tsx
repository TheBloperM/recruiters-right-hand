import classNames from "classnames";
import { useState, type ChangeEvent } from "react";
import style from "./setupForm.module.css";
import useFileProcessing from "@/hooks/useFileProccessing";
import FileUploader from "./fileUploader/fileUploader";
import { useAutoResize } from "@/hooks/useAutoResize";

interface SetupFormUIProps<T> {
  title: string;
  subtitle: string;
  buttonText: string;
  onSubmit: (texts: string[], jobDescription: string) => Promise<T>;
  onSuccess: (response: T) => void;
  allowMultiple?: boolean;
}

export default function SetupFormUI<T>({
  title,
  subtitle,
  buttonText,
  onSubmit,
  onSuccess,
  allowMultiple = false,
}: SetupFormUIProps<T>) {
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useAutoResize(jobDescription);

  const { proccessFiles, isProcessing } = useFileProcessing({
    onSubmit: onSubmit,
    onSuccess: onSuccess,
  });

  const addFile = (newFiles: File[]) => {
    setFiles((prev) => {
      if (!allowMultiple) return [newFiles[0]];

      return [...prev, ...newFiles].filter(
        (file, index, self) =>
          index ===
          self.findIndex((f) => f.name === file.name && f.size === file.size),
      );
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isProcessing) return;
    proccessFiles(files, jobDescription);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(style.pageWrapper, style.formContainer)}
    >
      <div className={style.headerSection}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.subtitle}>{subtitle}</p>
      </div>

      <FileUploader
        files={files}
        onAdd={addFile}
        onRemove={removeFile}
        allowMultiple={allowMultiple}
      />

      <label className={style.label}>
        Job Description:
        <textarea
          ref={textareaRef}
          className={style.textarea}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste requirements here..."
          disabled={isProcessing}
        />
      </label>

      <button
        type="submit"
        className={style.submitButton}
        disabled={!jobDescription || files.length === 0 || isProcessing}
      >
        {isProcessing ? "Processing..." : buttonText}
      </button>
    </form>
  );
}
