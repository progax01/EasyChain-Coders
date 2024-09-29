import { Request,Response,NextFunction } from "express"

export type catchAsyncError = (req:Request,res:Response,next:NextFunction)=>void

export type gptFunctionOutput = {function_name:string,function_arguments:Object}

export type gptResponse = string | gptFunctionOutput;