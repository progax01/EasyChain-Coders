import { Request, Response, NextFunction, query } from "express";
import catchAsyncError from "../helpers/catchAsyncError";
import axios from "axios";
import constraints from "../config/constraints";
import fs from "fs";
import {
  deserializeContractState,
  deserializeAVLTree,
} from "../helpers/deserializeContractState";
import services from "../services";
import unmarshel from "../helpers/unmarshel";
import poolServices from "../services/poolServices";
import big from "../helpers/big";
import poolHelpers from "../helpers/poolContract";
import ledgerServices from "../services/ledgerServices";

class poolControllers {
  static addPool = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      // const { poolAddress } = req.params;
      const { poolAddress, chainId, walletAddress } = req.body;

      const pool = poolHelpers.getPoolInstance(chainId, poolAddress);
      const poolReserves = await poolHelpers.getPoolReserves(pool);
      const poolExists = await poolServices.getPoolByTokens(
        poolReserves.tokenAAddress,
        poolReserves.tokenBAddress,
        chainId
      );
      console.log(poolReserves.tokenAAddress == poolReserves.tokenBAddress);
      if (poolReserves.tokenAAddress == poolReserves.tokenBAddress) {
        return next(new Error("pool can't have same tokens"));
      }
      console.log(poolExists);
      if (poolExists) {
        return next(new Error("pool with same pair on same chain exists."));
      }

      const createdPool = await services.poolServices.addPool(
        poolReserves,
        poolAddress,
        walletAddress,
        chainId
      );
      res.status(200).json({
        success: true,
        message: "Liquidity pool created",
        createdPool,
      });
    }
  );

  // static createLedgerAndUpdatePool = catchAsyncError(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     console.log("Body: ", req.body);
  //     return res.status(200).json({ success: true });
  //     const ledger = await poolServices.updatePoolAndLedger(req.body);

  //     res.status(200).json({
  //       success: true,
  //       message: "Pool updated and ledger created",
  //       ledger,
  //     });
  //   }
  // );
  static getPools = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page, items } = req.query;
      if (items == "all") {
        const { pools, poolsCount } = await poolServices.getAllPools();
        return res.status(200).json({
          success: true,
          pools,
          poolsCount,
        });
      }
      const { pools, poolsCount } = await poolServices.getPools(
        Number(page),
        Number(items)
      );
      res.status(200).json({
        success: true,
        pools,
        poolsCount,
      });
    }
  );
  static getMyPools = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page, items } = req.query;
      const { walletAddress } = req.params;
      const { myPools, myPoolsCount } = await poolServices.getMyPools(
        Number(page),
        Number(items),
        walletAddress
      );
      res.status(200).json({
        success: true,
        myPools,
        myPoolsCount,
      });
    }
  );
  static getMyledgers = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page, items } = req.query;
      console.log(req.query);
      const { walletAddress } = req.params;
      const { ledgersCount, myLedgers } = await poolServices.getMyLedgers(
        Number(page),
        Number(items),
        walletAddress
      );
      res.status(200).json({
        success: true,
        ledgersCount,
        myLedgers,
      });
    }
  );
}
export default poolControllers;
