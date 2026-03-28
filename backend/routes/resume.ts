import { Router, Request, Response } from "express";
import {
  rankResumesForJobDescription,
  tailorResumeForJobDescription,
} from "../services/aiService.js";

const router = Router();

router.post("/tailor", async (req: Request, res: Response) => {
  try {
    const { jobDescription, resume: oldResume } = req.body;

    if (!jobDescription || !oldResume) {
      return res
        .status(400)
        .json({ error: "jobDescription and resume are required" });
    }

    const resume = await tailorResumeForJobDescription(
      oldResume,
      jobDescription,
    );
    res.json({ resume });
  } catch (error: any) {
    console.error("AI Tailoring Error:", error);
    res.status(error.status || 500).json({
      error: "Failed to tailor resume",
      details: error.message,
    });
  }
});

router.post("/rank", async (req: Request, res: Response) => {
  try {
    const { jobDescription, resumes } = req.body;

    if (!jobDescription || !resumes || !Array.isArray(resumes)) {
      return res
        .status(400)
        .json({ error: "jobDescription and resumes[] are required" });
    }

    const leaderboard = await rankResumesForJobDescription(
      resumes,
      jobDescription,
    );
    res.json({ leaderboard });
  } catch (error: any) {
    console.error("AI Ranking Error:", error);
    res.status(error.status || 500).json({
      error: "Failed to rank resumes",
      details: error.message,
    });
  }
});

export default router;
