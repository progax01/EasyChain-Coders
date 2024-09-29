import { chatRoles } from "../types/enums";
import messagemap from "./messagemap";

export const formatUserMessage = (messages:string[])=>{
    return messages.map((message)=>({ role: chatRoles.user, content: message }));
}

export const generateErrorForFunction = (functionName:string,functionArguments:Object)=>{
    const functionMessageMap = messagemap[functionName];
    let message = functionMessageMap.message;
    let isError = false;
    for(let key in functionArguments){
        if(!functionArguments[key] || functionArguments[key] == 'null'){
            isError = true;
            message += `${functionMessageMap.arguments[key]}\n`
        }
    }
    return {isError,message};
}

export const isJson = (data:string)=>{
    let flag = false;
    console.log(`data:${data}`);
    try{
        JSON.parse(data);
        flag = true;
    }
    catch(error){console.log('not a json obj')}
    return flag;
}