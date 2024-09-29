import TokenModel from "../models/tokenModel";

class tokenServices {
  static createToken = async (options) => {
    try {
      return await TokenModel.create(options);
    } catch (err) {
      console.log("Error when creating token: ", err.message);
      throw new Error("Error when creating token: ", err.message);
    }
  };
  static getTokens = async (page, items, chainId) => {
    try {
      const pageNo = page || 1;
      const itemsPerPage = items || 10;
      const options = {};
      if (chainId) {
        options["chainId"] = chainId;
      }
      const tokensCount = await TokenModel.find(options).countDocuments();
      const tokens = await TokenModel.find(options)
        .limit(itemsPerPage)
        .skip(itemsPerPage * (pageNo - 1));
      return { tokensCount, tokens };
    } catch (err) {
      console.log("Error while fetching all tokens: ", err.message);
      throw new Error("Error while fetching all tokens: ", err.message);
    }
  };
}
export default tokenServices;
