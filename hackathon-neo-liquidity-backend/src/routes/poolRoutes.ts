import { Router } from "express";
import controllers from "../controllers";

const router = Router();

// router.get("/sync/:poolAddress", controllers.poolControllers.syncPool);
router.post("/new", controllers.poolControllers.addPool);
router.get("/pools", controllers.poolControllers.getPools);
router.get("/myPools/:walletAddress", controllers.poolControllers.getMyPools);
router.get(
  "/myLedgers/:walletAddress",
  controllers.poolControllers.getMyledgers
);

export default router;
