import { Router } from "express";
import { getChatMessages, getChats, getRelevantChunks, postChat } from "../controllers/chatController.js";
import { requireUserIdHeader } from "../middleware/requireUserIdHeader.js";
import { validateChatRequest } from "../middleware/validateChatRequest.js";

const router = Router();

router.post("/chat", requireUserIdHeader, validateChatRequest, postChat);
router.get("/chunks", getRelevantChunks);
router.get("/chats", requireUserIdHeader, getChats);
router.get("/chats/:chatId", requireUserIdHeader, getChatMessages);


export default router;
