import { formatUserMessage, generateErrorForFunction, isJson } from "../helper";
import { getResponoseFromGpt } from "../services/gpt/gptService";
import { gptFunctionOutput } from "../types";

export default class Ai{
    static ask = async (req,res,next)=>{
        try{
            const {query,address} = req.body;
            const userMessage = formatUserMessage(query);
            let data = await getResponoseFromGpt(userMessage);
            let [success,message] = [true,'query complete',];
            if(!data){
                throw new Error('please try again later.');
            }
            if(typeof data === 'string' && isJson(data.trim())){
                data = JSON.parse(data.trim());
            }
            // if(typeof data === 'string'){
            //     success = false;
            //     // message = data;
            //     message = `please write your query around: bridge,swap,liquidity pool,cross chain token deployment`;
            //     data = "";
            //     return res.status(200).json({success, message,data});
            // }
            const {function_arguments,function_name} = data as gptFunctionOutput;
            if(!function_arguments || !function_name){
                success = false;
                message = `please write your query around: bridge,swap,liquidity pool,cross chain token deployment`;
            }
            else{
                const errorMessage = generateErrorForFunction(function_name,function_arguments);
                if(errorMessage.isError){
                    success = false;
                    message = errorMessage.message; 
                    data = "";
                }
            }
            res.status(200).json({success,message,data});
        }
        catch(error){
            res.status(500).json({success: false,message: error.message})
        }
    }
}