import { Schema } from "@google/genai";
import { OutputValidityCheck } from "./outputValidityCheck.js";

export interface GeminiRequestProps<T> {
  prompt: string;
  jobDescription: string;
  resumes: string | string[];
  schema: Schema;
  outputValidityCheck?: OutputValidityCheck<T>;
}
