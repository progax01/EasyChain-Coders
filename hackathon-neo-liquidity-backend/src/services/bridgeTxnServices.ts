import BridgeTxnModel from "../models/bridgeTxn";

class bridgeTxnServices {
  static getBridgeTxnByHash = async (lockHash: string) => {
    try {
      const txn = await BridgeTxnModel.findOne({ lockHash });
      return txn;
    } catch (err) {
      throw new Error("Error while getting bridge txn: ", err.message);
    }
  };
}
export default bridgeTxnServices;
