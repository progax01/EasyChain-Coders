import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../helpers/catchAsyncError";
import services from "../services";

class bridgeController {
  static getBridgeByLockHash = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { lockHash } = req.params;
      const transaction =
        await services.bridgeTxnServices.getBridgeTxnByHash(lockHash);
      res.status(200).json({
        success: true,
        transaction,
      });
    }
  );
}
export default bridgeController;
