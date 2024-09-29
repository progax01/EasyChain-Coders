import mongoose from "mongoose";
import { envConfigs } from "./envConfig";

const connectDb = () => {
  mongoose
    .connect(envConfigs.dbUrl)
    .then(() => {
      console.log("MongoDb connected successfully.");
    })
    .catch((err) => {
      console.log("Error connecting Mongodb: " + err);
    })
};

export default connectDb;
