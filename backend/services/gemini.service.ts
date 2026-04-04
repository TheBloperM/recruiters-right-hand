import { GoogleGenAI, Type } from "@google/genai";
import { insertDataToPrompt } from "#utils/prompts.util.js";
import { GeminiRequestProps } from "#types/geminiRequestProps.js";

const ai = new GoogleGenAI({});
const defaultGeminiModel = "gemini-2.5-flash";
const defaultMimeType = "application/json";

export const sendRequestToGemini = async <T>({
  prompt,
  jobDescription,
  resumes,
  schema,
  outputValidityCheck,
}: GeminiRequestProps<T>) => {
  const fullPrompt = insertDataToPrompt(prompt, jobDescription, resumes);

  const responseSchema = Array.isArray(resumes)
    ? {
        type: Type.ARRAY,
        items: schema,
      }
    : schema;

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL ?? defaultGeminiModel,
      contents: fullPrompt,
      config: {
        responseSchema,
        responseMimeType: process.env.GEMINI_MIME_TYPE ?? defaultMimeType,
      },
    });

    const data = JSON.parse(response.text!) as T;

    if (outputValidityCheck && !outputValidityCheck.isValid(data)) {
      console.error(outputValidityCheck.message);
      const error: any = new Error(outputValidityCheck.message);
      error.status = outputValidityCheck.status;

      throw error;
    }

    return data;
  } catch (error: any) {
    console.error(`Gemini request error: ${error}`);

    throw new Error(`Error sending request to Gemini: ${error.message}`);
  }
};
