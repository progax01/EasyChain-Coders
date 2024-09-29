import LedgerModel from "../models/ledgerModel";

class ledgerServices {
  static addLedger = async (
    walletAddress,
    poolAddress,
    withdrawl,
    addedLiquidity,
    swap
  ) => {
    try {
      const options = {
        walletAddress,
        poolAddress,
      };
      if (withdrawl) {
        options["withdrawl"] = withdrawl;
      }
      if (addedLiquidity) {
        options["addedLiquidity"] = addedLiquidity;
      }
      if (swap) {
        options["fromToken"] = swap.fromToken;
        options["fromAmount"] = swap.fromAmount;
      }
      const ledger = await LedgerModel.create(options);
      return ledger;
    } catch (err) {
      console.log("Error while saving ledger: ", err.message);
      throw new Error("Error while saving ledger: ", err.message);
    }
  };
  static getLedgers = async (walletAddress, limit, page) => {
    try {
      const skip = (page - 1) * limit;
      const ledgersCount = await LedgerModel.find({
        walletAddress,
      }).countDocuments();
      const ledgers = await LedgerModel.find({ walletAddress })
        .limit(limit)
        .skip(skip);
      return { ledgers, ledgersCount };
    } catch (err) {
      throw new Error("Errow while getting ledgers: ", err.message);
    }
  };
}

export default ledgerServices;
