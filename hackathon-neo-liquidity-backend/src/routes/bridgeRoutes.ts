import { Router } from "express";
import bridgeController from "../controllers/bridgeTxnController";

const router = Router();

router.get("/:lockHash", bridgeController.getBridgeByLockHash);
export default router;
