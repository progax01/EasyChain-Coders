import mongoose from "mongoose";

const poolSchema = new mongoose.Schema(
  {
    poolAddress: {
      type: String,
      required: [true, "Liquidity pool address is required."],
      unique: true,
      maxLength: 42,
    },
    firstTokenAddress: {
      type: String,
      required: [true, "First token address is required."],
      maxLength: 42,
    },
    secondTokenAddress: {
      type: String,
      required: [true, "Second token address is required."],
      maxLength: 42,
    },
    firstTokenBalance: {
      type: String,
      required: [true, "First Token balance is required."],
      match: [/^\d+$/, "Balance String should only contain numbers."],
    },
    secondTokenBalance: {
      type: String,
      required: [true, "Second Token balance is required."],
      match: [/^\d+$/, "Balance String should only contain numbers."],
    },
    liquidityTokenBalance: {
      type: String,
      required: [true, "Liquidity Token balance is required."],
      match: [/^\d+$/, "Balance String should only contain numbers."],
    },
    users: [
      {
        address: {
          type: String,
          required: [true, "User Address is required."],
        },
        liquidity: {
          type: String,
          required: [true, "Users liquidity is required."],
        },
      },
    ],
    chainId: {
      type: String,
      required: [true, "ChainId is required."],
    },
  },
  {
    timestamps: true,
  }
);

const PoolModel = mongoose.model("liquiditypool", poolSchema);
export default PoolModel;
