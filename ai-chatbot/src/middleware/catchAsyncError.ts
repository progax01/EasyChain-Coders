import { catchAsyncError } from "../types";
import { Request,Response,NextFunction } from "express";

const catchAsyncError = (func:catchAsyncError) => (req:Request, res:Response, next:NextFunction) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
export default catchAsyncError;
