import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "ATS Optimizer API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
