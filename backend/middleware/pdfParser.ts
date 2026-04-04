import { Request, Response, NextFunction } from "express";
import { extractTextFromFiles } from "@/services/pdf.service.js";

export const parsePdfsToText = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const targetFiles = req.files || req.file;

    if (
      !targetFiles ||
      (Array.isArray(targetFiles) && targetFiles.length === 0)
    ) {
      return next();
    }

    const parsedTexts = await extractTextFromFiles(
      targetFiles as Express.Multer.File | Express.Multer.File[],
    );

    req.body.extractedPDFs = parsedTexts;

    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to parse uploaded PDFs." });
  }
};
