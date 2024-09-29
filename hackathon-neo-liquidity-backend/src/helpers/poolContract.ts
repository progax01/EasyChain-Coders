import poolAbi from "../abis/poolAbi.json";
import { ethers } from "ethers";
import { neoConstraints } from "../config/constraints";
import big, { stringify } from "./big";

class poolHelpers {
  static getPoolInstance = (chainId: string, poolAddress: string) => {
    const provider = new ethers.JsonRpcProvider(
      neoConstraints.rpcUrls[chainId]
    );
    const contract = new ethers.Contract(poolAddress, poolAbi, provider);
    return contract;
  };
  static getPoolReserves = async (pool: any) => {
    const tokens = await pool.getReserves();
    const liquidity = await pool.totalLiquidity();
    console.log("tokens: ", tokens);
    console.log("liquidity: ", liquidity);
    const reserves = {
      tokenAAddress: tokens[0],
      tokenBAddress: tokens[1],
      tokenABalance: stringify(big(tokens[2]).div(big("10").pow(18))),
      tokenBBalance: stringify(big(tokens[3]).div(big("10").pow(18))),
      liquidity,
    };
    console.log(reserves);
    return reserves;
  };
  static getUserFunding = async (pool: any, userAddress: string) => {
    const userLiquidity = await pool.liquidity(userAddress);
    return userLiquidity;
  };
}

export default poolHelpers;
