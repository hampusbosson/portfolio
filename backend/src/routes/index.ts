import { Router } from "express";
import healthRoutes from "./healthRoutes.js";
import chatRoutes from "./chatRoutes.js";
import contactRoutes from "./contactRoutes.js";

const router = Router();

router.use(healthRoutes);
router.use(chatRoutes);
router.use(contactRoutes);

export default router;
