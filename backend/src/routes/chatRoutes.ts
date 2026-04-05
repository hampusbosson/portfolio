import { Router } from "express";
import { getRelevantChunks, postChat } from "../controllers/chatController.js";
import { validateChatRequest } from "../middleware/validateChatRequest.js";

const router = Router();

router.post("/chat", validateChatRequest, postChat);
router.get("/chunks", getRelevantChunks);

export default router;
