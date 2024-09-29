import "dotenv/config";

const envConfigs = {
  port: process.env.PORT,
  mongoUrl: process.env.DB_URL,
};

export default envConfigs;
