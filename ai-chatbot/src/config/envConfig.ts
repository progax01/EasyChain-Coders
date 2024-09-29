import "dotenv/config";

export const envConfigs = {
  port: process.env.PORT as string,
  dbUrl: process.env.DB_URL as string,
  openApi: {
    key: process.env.OPENAI_API_KEY as string,
    chat_model: process.env.OPENAI_CHAT_MODEL as string  
  },
};
