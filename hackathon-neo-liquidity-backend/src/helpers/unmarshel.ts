import axios from "axios";
import constraints from "../config/constraints";
import envConfigs from "../config/envConfig";

class unmarshel{
  static subscribeWebhook = async(poolAddress)=>{
    try{
      const options = {
        method: 'POST',
        url: constraints.unmarshelNotificationUrl,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': envConfigs.unmarshelKey
        },
        data: {url: constraints.webhookUrl, wallet_ids: [poolAddress]}
      };
      
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
          throw error
        });
    }catch(err){
      console.log("Error while subscribing to webhook: ", err.message)
      throw new Error("Error while subscribing to webhook: ", err.message)
    }
  }
  static unSubscribeWebhook = async(address)=>{
    try{
      const options = {
        method: 'POST',
        url: `  https://testnet-notify.unmarshal.com/v1/${address}/unsubscribe`,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': envConfigs.unmarshelKey
        },
      };
      let data 
      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          data = response.data
        })
        .catch(function (error) {
          console.error(error);
          throw error
        });
        return data
    }catch(err){
      console.log("Error while unsubscribing to webhook: ", err.message)
      throw new Error("Error while unsubscribing to webhook: ", err.message)
    }
  }
  static listWebhooks = async()=>{
    try{

const options = {
  method: 'GET',
  url: 'https://testnet-notify.unmarshal.com/v1/subscriptions',
  headers: {'x-api-key': envConfigs.unmarshelKey}
};
  let data
await axios
  .request(options)
  .then(function (response) {
    data = response.data
  })
  .catch(function (error) {
    console.error(error);
    throw error
  });
  return data
    }catch(err){
      console.log("Error when fetching subscriptions: ", err.message)
      throw new Error("Error when fetching subscriptions: ", err.message)
      
    }
  }
}
export default unmarshel