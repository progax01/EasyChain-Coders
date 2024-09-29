import { Router } from "express";
import controllers from "../controllers";

const router = Router();
router.post("/new", controllers.ledgerController.createLedger);
router.get("/:walletAddress", controllers.ledgerController.getLedgers);

export default router;
