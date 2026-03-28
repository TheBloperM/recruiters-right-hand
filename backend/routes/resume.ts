import { Router } from "express";
import { generateResumeFromJobDescription } from "../services/aiService.js";
import multer from "multer";
import { PDFParse } from "pdf-parse";

var router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/generate", async function (req, res, next) {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    const resume = await generateResumeFromJobDescription(jobDescription);

    res.json({ resume });
  } catch (error: any) {
    console.error("AI Generation Error:", error);

    res.status(error.status || 500).json({
      error: "Failed to generate resume",
      details: error.message,
    });
  }
});

router.post(
  "/parse",
  upload.array("resumeFiles", 5),
  async (req, res, next) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No PDF files uploaded." });
      }
      const parsePromises = files.map(async (file) => {
        const pdfData = new PDFParse(file.buffer);

        return {
          fileName: file.originalname,
          text: await pdfData.getText(),
        };
      });

      const parsedResumes = await Promise.all(parsePromises);

      res.json({ resumes: parsedResumes });
    } catch (error) {
      console.error("PDF Parsing Error:", error);
      res.status(500).json({ error: "Failed to extract text from PDFs." });
    }
  },
);
export default router;
