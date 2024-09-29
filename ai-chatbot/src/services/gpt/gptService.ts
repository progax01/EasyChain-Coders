import OpenAI from "openai";
import { envConfigs } from "../../config/envConfig";
import { MainPipeline } from "./main.pipeline";
import { chatRoles } from "../../types/enums";
import { gptResponse } from "../../types";

const openai = new OpenAI({ apiKey: envConfigs.openApi.key });

async function getResponoseFromGpt(userMessages: {role:chatRoles,content:string}[]):Promise<gptResponse>{
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: MainPipeline.systemMessage },
        ...userMessages],
      functions: MainPipeline.functions,
      model: envConfigs.openApi.chat_model,
    });
    if (completion.choices[0]?.finish_reason === "stop")
      return completion.choices[0]?.message.content;
    const function_name = completion.choices[0]?.message.function_call.name;
    const function_arguments = JSON.parse(
      completion.choices[0]?.message.function_call.arguments
    );

    return {function_name,function_arguments}
  } catch (error) {
    throw new Error(`Error while getting response from chat assistant`);
  }
}

export { getResponoseFromGpt };
