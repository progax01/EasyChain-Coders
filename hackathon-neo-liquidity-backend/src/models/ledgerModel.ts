import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    poolAddress: {
      type: String,
      maxLength: 42,
      required: [true, "Pool address is required."],
    },
    addedLiquidity: {
      type: String,
    },
    withdrawl: {
      type: String,
    },
    walletAddress: {
      type: String,
      required: [true, "Wallet address is required."],
    },
    fromAmount: {
      type: Number,
    },
    fromAddress: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const LedgerModel = mongoose.model("ledgerTxn", ledgerSchema);

export default LedgerModel;
