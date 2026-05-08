import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import blogRoutes from "@/routes/blog.routes";
import knowledgeBaseRoutes from "@/routes/knowledgebase.routes";
import aiRoutes from "@/routes/ai.routes";

const router = Router();

// Auth Endpoints
router.use("/", authRoutes);

// Blog Endpoints
router.use("/", blogRoutes);

// Knowledge Base Endpoints
router.use("/", knowledgeBaseRoutes);

// AI Endpoints
router.use("/", aiRoutes);

export default router;