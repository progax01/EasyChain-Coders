import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Token Name is required."],
    maxLength: [20, "Token Length should be under 20 characters."],
  },
  symbol: {
    type: String,
    required: [true, "Token symbol is required."],
    maxLength: [20, "Token symbol length should be under 20 characters. "],
  },
  visual: {
    type: Buffer,
    required: [true, "Token image is required."],
  },
  totalSupply: {
    type: Number,
    required: [true, "Token supply is required."],
  },
  decimals: {
    type: Number,
    required: [true, "Token decimals is required."],
  },
  chainId: {
    type: String,
    required: [true, "Chain id is required."],
  },
});

const TokenModel = mongoose.model("partisiaTokens", tokenSchema);
export default TokenModel;
