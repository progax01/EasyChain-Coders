import { NextFunction, Request, Response } from "express";
import ledgerServices from "../services/ledgerServices";
import catchAsyncError from "../helpers/catchAsyncError";
import poolServices from "../services/poolServices";
import poolHelpers from "../helpers/poolContract";

class ledgerController {
  static createLedger = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        walletAddress,
        poolAddress,
        withdrawl,
        addedLiquidity,
        chainId,
        swap,
      } = req.body;
      const pool = await poolHelpers.getPoolInstance(chainId, poolAddress);
      const poolReserves = await poolHelpers.getPoolReserves(pool);
      await poolServices.updatedPoolReserves(
        poolReserves,
        poolAddress,
        walletAddress
      );
      const ledger = await ledgerServices.addLedger(
        walletAddress,
        poolAddress,
        withdrawl,
        addedLiquidity,
        swap || undefined
      );
      res.status(200).json({
        success: true,
        createdLedger: ledger,
      });
    }
  );
  static getLedgers = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { walletAddress } = req.params;
      const { limit, page } = req.query;

      const { ledgers, ledgersCount } = await ledgerServices.getLedgers(
        walletAddress,
        Number(limit) || 10,
        Number(page) || 1
      );
      res.status(200).json({
        success: true,
        ledgers,
        ledgersCount,
      });
    }
  );
}

export default ledgerController;
