import mongoose from "mongoose";
const bridgeTxnSchema = new mongoose.Schema(
  {
    lockId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fromNetwork: {
      type: String,
      required: true,
    },
    toNetwork: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    username: String,
    fromToken: {
      type: String,
      required: true,
    },
    srcToken: {
      type: String,
      required: true,
    },
    toToken: {
      type: String,
      required: true,
    },
    lockHash: {
      type: String,
      required: true,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    blockNumber: {
      type: String,
      required: true,
    },
    transactionIndex: {
      type: Number,
      required: true,
    },
    logIndex: {
      type: Number,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
    },
    retries: {
      type: Number,
      default: 0,
    },
    txNumber: {
      type: Number,
    },
    releaseTime: {
      type: Number,
    },
    gasAmount: {
      type: String,
    },
    lockAmount: {
      type: String,
      required: true,
    },
    lockFee: {
      type: String,
      required: true,
    },
    releaseFee: {
      type: String,
    },
    crossPower: {
      type: String,
    },
    srcAmount: {
      type: String,
      required: true,
    },
    releaseAmount: {
      type: String,
    },
    commissionAmount: {
      type: String,
    },
    releaseHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BridgeTxnModel = mongoose.model("BridgeTransaction", bridgeTxnSchema);

export default BridgeTxnModel;
