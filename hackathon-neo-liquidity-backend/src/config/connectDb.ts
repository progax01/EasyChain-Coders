import mongoose from "mongoose"
import envConfigs from "./envConfig"

const connectDb = ()=>{
  mongoose.connect(envConfigs.mongoUrl).then(()=>{
    console.log("Mongodb connected")
  }).catch((err)=>{
    console.log("Error connecting mongodb: ", err.message)
  })
}

export default connectDb