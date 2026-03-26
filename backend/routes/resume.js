import { Router } from "express";
import { generateResumeFromJobDescription } from "../services/aiService.js";

var router = Router();
router.post("/generate", async function (req, res, next) {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    const resume = await generateResumeFromJobDescription(jobDescription);

    res.json({ resume });
  } catch (error) {
    console.error("AI Generation Error:", error);

    // 2. Send a JSON error back to the frontend instead of HTML
    res.status(error.status || 500).json({
      error: "Failed to generate resume",
      details: error.message,
    });
  }
});

export default router;
