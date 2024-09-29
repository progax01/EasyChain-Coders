import { Router } from "express";
import controllers from "../controllers";
const router = Router();

router.post("/new/token", controllers.tokenControllers.createToken);
router.get("/allTokens", controllers.tokenControllers.getTokens);
router.get("/:chainId", controllers.tokenControllers.getTokens);

export default router;
