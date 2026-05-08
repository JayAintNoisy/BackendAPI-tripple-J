import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

export const validateSchema = (schema: ZodTypeAny) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Detailed logging to debug body parsing
      console.log("📨 Request received on", req.path);
      console.log("📦 Full body object:", JSON.stringify(req.body, null, 2));
      console.log("🔑 Body keys:", Object.keys(req.body || {}));
      console.log("📄 Content-Type:", req.headers['content-type']);

      await schema.parseAsync({
        body: req.body || {},
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          code: 400,
          status: "error",
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
          hint: "Make sure to send Content-Type: application/json header and proper request body",
        });
      }
      return next(error);
    }
  };