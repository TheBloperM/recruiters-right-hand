import { Router } from "express";
import {
  rankResumesForJobDescription,
  tailorResumeForJobDescription,
} from "../services/aiService.js";

var router = Router();

router.post("/tailor", async function (req, res, next) {
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

export default router;

router.post("/rank", async function (req, res, next) {
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
