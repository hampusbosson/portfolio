import { Router } from "express";
import { postContact } from "../controllers/contactController.js";
import { requireUserIdHeader } from "../middleware/requireUserIdHeader.js";
import { validateContactRequest } from "../middleware/validateContactRequest.js";

const router = Router();

router.post("/contact", requireUserIdHeader, validateContactRequest, postContact);

export default router;
