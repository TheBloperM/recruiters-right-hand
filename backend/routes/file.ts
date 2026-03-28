import { Router } from "express";
import { tailorResumeForJobDescription } from "../services/aiService.js";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { ParsedResume } from "recruiters-utils";

const upload = multer({ storage: multer.memoryStorage() });
const maxFiles = 20;
var router = Router();

router.post(
  "/parse",
  upload.array("resumeFiles", maxFiles),
  async (req, res, next) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No PDF files uploaded." });
      }
      const parsePromises = files.map(async (file): Promise<ParsedResume> => {
        const pdfData = new PDFParse(new Uint8Array(file.buffer));

        return {
          fileName: file.originalname,
          text: (await pdfData.getText()).text,
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
