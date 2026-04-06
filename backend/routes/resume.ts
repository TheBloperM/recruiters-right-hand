import { Router, Request, Response } from "express";
import { sendRequestToGemini } from "@/services/gemini.service.js";
import { aiRankingPrompt, aiTailoringPrompt } from "@/consts/prompts.js";
import { resumeSchema } from "@/schemas/resumeSchema.js";
import { leaderboardSchema } from "@/schemas/leaderboardSchema.js";
import { LeaderboardEntry, Resume } from "recruiters-utils";
import { OutputValidityCheck } from "@/types/outputValidityCheck.js";
import multer from "multer";
import { parsePdfsToText } from "@/middleware/pdfParser.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/tailor",
  upload.single("resume"),
  parsePdfsToText,
  async (req: Request, res: Response) => {
    try {
      const { jobDescription, extractedPDFs: oldResume } = req.body;

      if (!jobDescription || !oldResume) {
        return res.status(400).json({
          error: "job description and resume are required to tailor a resume",
        });
      }

      console.log("Tailoring resume...");
      const tailoringValidityCheck: OutputValidityCheck<Resume> = {
        isValid: (resume) => !resume.name.includes("ERROR"),
        message:
          "Either the job description or the resume contains invalid content.",
        status: 422,
      };

      const resume = await sendRequestToGemini<Resume>({
        prompt: aiTailoringPrompt,
        jobDescription,
        resumes: oldResume,
        schema: resumeSchema,
        outputValidityCheck: tailoringValidityCheck,
      });

      res.json({ resume });
    } catch (error: any) {
      console.error("AI Tailoring Error:", error);
      res.status(error.status || 500).json({
        error: "Failed to tailor resume",
        details: error.message,
      });
    }
  },
);

router.post(
  "/rank",
  upload.array("resumes"),
  parsePdfsToText,
  async (req: Request, res: Response) => {
    try {
      const { jobDescription, extractedPDFs: resumes } = req.body;

      if (!jobDescription || !resumes || !Array.isArray(resumes)) {
        return res.status(400).json({
          error:
            "job description and a list of resumes are required to rank resumes",
        });
      }

      console.log("Ranking resumes...");

      const rankingValidityCheck: OutputValidityCheck<LeaderboardEntry[]> = {
        isValid: (leaderboard) =>
          !leaderboard.some(
            (entry) => entry.summary === "ERROR: INVALID_DOCUMENT_TYPE",
          ),
        message:
          "The job description or one or more of the candidate resumes are invalid.",
        status: 422,
      };

      const leaderboard = await sendRequestToGemini<LeaderboardEntry[]>({
        prompt: aiRankingPrompt,
        jobDescription,
        resumes,
        schema: leaderboardSchema,
        outputValidityCheck: rankingValidityCheck,
      });

      res.json({ leaderboard });
    } catch (error: any) {
      console.error("AI Ranking Error:", error);
      res.status(error.status || 500).json({
        error: "Failed to rank resumes",
        details: error.message,
      });
    }
  },
);

export default router;
