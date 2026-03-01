import { Router } from "express";
import healthRoutes from "./healthRoutes.js";
import chatRoutes from "./chatRoutes.js";

const router = Router();

router.use(healthRoutes);
router.use(chatRoutes);

export default router;

