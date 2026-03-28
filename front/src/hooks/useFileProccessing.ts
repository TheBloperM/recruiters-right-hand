import { useState } from "react";
import toast from "react-hot-toast";

interface FileProcessingHookProps<T> {
  onSubmit: (texts: string[], jobDescription: string) => Promise<T>;
  onSuccess: (response: T) => void;
}

export default function useFileProcessing<T>({
  onSubmit,
  onSuccess,
}: FileProcessingHookProps<T>) {
  const [isProcessing, setIsProcessing] = useState(false);

  const proccessFiles = async (files: File[], jobDescription: string) => {
    setIsProcessing(true); // Lock the form

    const parsingPipeline = async () => {
      const formData = new FormData();
      files.forEach((file) => formData.append("resumeFiles", file));

      const parseRes = await fetch("http://localhost:3000/file/parse", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) throw new Error("Failed to extract text from PDF(s)");
      const { resumes } = await parseRes.json();

      const extractedTexts = resumes.map(
        (response: { text: string }) => response.text,
      );

      return await onSubmit(extractedTexts, jobDescription);
    };

    toast
      .promise(parsingPipeline(), {
        loading: "Processing documents...",
        success: "Analysis complete!",
        error: (err) => err.message || "An error occurred.",
      })
      .then((response) => {
        if (response) onSuccess(response);
      })
      .catch(console.error)
      .finally(() => setIsProcessing(false)); // Unlock the form
  };

  return { proccessFiles, isProcessing };
}
