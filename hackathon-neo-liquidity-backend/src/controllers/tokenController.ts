import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../helpers/catchAsyncError";
import TokenModel from "../models/tokenModel";
import services from "../services";

class tokenController {
  static createToken = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, symbol, visual, totalSupply, decimals } = req.body;
      const options = {
        name,
        symbol,
        visual,
        totalSupply,
        decimals,
      };
      const token = await services.tokenServices.createToken(options);
      res.status(201).json({
        success: true,
        createdToken: token,
      });
    }
  );
  static getTokens = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { page, items } = req.query;
      const { tokens, tokensCount } = await services.tokenServices.getTokens(
        Number(page),
        Number(items),
        undefined
      );
      res.status(200).json({
        success: true,
        tokens,
        tokensCount,
      });
    }
  );
  static getTokensByChainId = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const { chainId } = req.params;
      const { page, items } = req.query;
      const { tokens, tokensCount } = await services.tokenServices.getTokens(
        Number(page),
        Number(items),
        chainId
      );
      res.status(200).json({
        success: true,
        tokens,
        tokensCount,
      });
    }
  );
}
export default tokenController;
