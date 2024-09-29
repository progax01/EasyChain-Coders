import LedgerModel from "../models/ledgerModel";
import PoolModel from "../models/poolModel";

class poolServices {
  static getMyLedgers = async (page, items, walletAddress) => {
    try {
      const pageNo = page || 1;
      const itemsPerPage = items || 10;
      const ledgersCount = await LedgerModel.find({
        walletAddress,
      }).countDocuments();
      const myLedgers = await LedgerModel.find({ walletAddress })
        .limit(itemsPerPage)
        .skip(itemsPerPage * (pageNo - 1));
      return {
        ledgersCount,
        myLedgers,
      };
    } catch (err) {
      console.log("Error while fetching my ledgers: ", err.message);
      throw new Error("Error while fetching my ledgers: ", err.message);
    }
  };
  static getPoolByTokens = async (tokenA, tokenB, chainId) => {
    try {
      const pool = await PoolModel.findOne({
        chainId,
        $or: [
          { firstTokenAddress: tokenA, secondTokenAddress: tokenB }, // tokenA is first, tokenB is second
          { firstTokenAddress: tokenB, secondTokenAddress: tokenA }, // tokenB is first, tokenA is second
        ],
      });

      return pool;
    } catch (err) {
      console.log("Error while getting pool by tokens: ", err.message);
      throw new Error("Error while getting pool by tokens: ", err.message);
    }
  };
  static updatedPoolReserves = async (
    poolReserves,
    poolAddress,
    walletAddress
  ) => {
    try {
      const pool = await PoolModel.findOne({ poolAddress });

      if (!pool) {
        throw new Error("Pool not found");
      }

      const user = pool.users.find((user) => user.address === walletAddress);

      const liquidityDifference = Math.abs(
        Number(pool.liquidityTokenBalance) - Number(poolReserves.liquidity)
      ).toString();

      if (user) {
        user.liquidity = Math.abs(
          Number(user.liquidity) + Number(liquidityDifference)
        ).toString();
      } else {
        pool.users.push({
          address: walletAddress,
          liquidity: liquidityDifference,
        });
      }

      pool.firstTokenAddress = poolReserves.tokenAAddress;
      pool.secondTokenAddress = poolReserves.tokenBAddress;
      pool.firstTokenBalance = poolReserves.tokenABalance;
      pool.secondTokenBalance = poolReserves.tokenBBalance;
      pool.liquidityTokenBalance = poolReserves.liquidity;

      await pool.save();
    } catch (err) {
      throw new Error(`Error while updating pool: ${err.message}`);
    }
  };

  static getPools = async (page, items) => {
    try {
      const pageNo = page || 1;
      const itemsPerPage = items || 10;
      const poolsCount = await PoolModel.find().countDocuments();
      const pools = await PoolModel.find()
        .limit(itemsPerPage)
        .skip(itemsPerPage * (pageNo - 1));
      return { poolsCount, pools };
    } catch (err) {
      throw new Error("Error while getting pools:", err.message);
    }
  };
  static getAllPools = async () => {
    try {
      const poolsCount = await PoolModel.find().countDocuments();
      const pools = await PoolModel.find();

      return { poolsCount, pools };
    } catch (err) {
      throw new Error("Error while getting pools:", err.message);
    }
  };
  static getMyPools = async (page, items, walletAddress) => {
    try {
      const pageNo = page || 1;
      const itemsPerPage = items || 10;
      const skip = itemsPerPage * (pageNo - 1);
      const myPoolsAggregation = [
        {
          $match: {
            users: {
              $elemMatch: {
                address: walletAddress,
              },
            },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: itemsPerPage,
        },
      ];
      const myPoolsCountAggregation = [
        {
          $match: {
            users: {
              $elemMatch: {
                address: walletAddress,
              },
            },
          },
        },
      ];

      const myPools = await PoolModel.aggregate(myPoolsAggregation);
      const myPoolsCount = await PoolModel.aggregate(myPoolsCountAggregation);
      return { myPools, myPoolsCount };
    } catch (err) {
      throw new Error("Error while getting pools:", err.message);
    }
  };
  static deleteLedgersOfPool = async (poolAddress) => {
    try {
      await LedgerModel.deleteMany({ poolAddress });
    } catch (err) {
      throw new Error("Error while deleting ledgers: ", err.message);
    }
  };
  static addPool = async (
    poolReserves,
    poolAddress,
    walletAddress,
    chainId
  ) => {
    try {
      const options = {
        firstTokenAddress: poolReserves.tokenAAddress,
        secondTokenAddress: poolReserves.tokenBAddress,
        firstTokenBalance: poolReserves.tokenABalance,
        secondTokenBalance: poolReserves.tokenBBalance,
        liquidityTokenBalance: poolReserves.liquidity,
        poolAddress,
        chainId,
        users: [
          {
            address: walletAddress,
            liquidity: poolReserves.liquidity,
          },
        ],
      };
      return await PoolModel.create(options);
    } catch (err) {
      throw new Error(`Error while syncing liquidity pool: ${err.message}`);
    }
  };
  static getPoolByAddress = async (poolAddress: string) => {
    try {
      return await PoolModel.findOne({ poolAddress }).lean();
    } catch (err) {
      console.log(`Error while getting pool information: ${err.message}`);
    }
  };
  // static createLedgerAndUpdatePool = async (transactions) => {
  //   try {
  //     for (let txn of transactions) {
  //       const args = JSON.parse(txn.node.event.arguments);
  //       const swapRoutes = args.swap_route;
  //       const pools = await PoolModel.find({
  //         poolAddress: {
  //           $in: swapRoutes,
  //         },
  //       });
  //       let fromTokenAddress = args.token_in;
  //       let amountIn = args.amount_in;
  //       for (let route of swapRoutes) {
  //         console.log("route: ", route);
  //         const pool = pools.find((pool) => pool.poolAddress == route);
  //         console.log("pools: ", pools);
  //         console.log("Pool : ", pool);
  //         if (pool.firstToken == fromTokenAddress) {
  //           let remainder_ratio = big(
  //             (1000 - constraints.swapFeePerMile).toString()
  //           );
  //           let amount_in_with_fee = remainder_ratio.times(amountIn);

  //           let numerator = amount_in_with_fee
  //             .times(pool.secondTokenBalance)
  //             .round(0, 3);
  //           let denominator = big(pool.firstTokenBalance)
  //             .times(1000)
  //             .add(amount_in_with_fee)
  //             .round(0, 3)
  //             .toString();
  //           const swapOutput = numerator.div(denominator).round(0, 3);
  //           pool.firstTokenBalance = big(pool.firstTokenBalance).add(amountIn);
  //           pool.secondTokenBalance = big(pool.secondTokenBalance)
  //             .minus(swapOutput)
  //             .round(0, 3)
  //             .toString();
  //           await pool.save();
  //           fromTokenAddress = pool.secondToken;
  //           amountIn = swapOutput;
  //         } else if (pool.secondToken == fromTokenAddress) {
  //           let remainder_ratio = big(
  //             (1000 - constraints.swapFeePerMile).toString()
  //           );
  //           let amount_in_with_fee = remainder_ratio.times(amountIn);

  //           let numerator = amount_in_with_fee
  //             .times(pool.firstTokenBalance)
  //             .round(0, 3);
  //           let denominator = big(pool.secondTokenBalance)
  //             .times(1000)
  //             .add(amount_in_with_fee)
  //             .round(0, 3);
  //           const swapOutput = numerator.div(denominator).round(0, 3);
  //           pool.secondTokenBalance = big(pool.secondTokenBalance)
  //             .add(amountIn)
  //             .round(0, 3)
  //             .toString();
  //           pool.firstTokenBalance = big(pool.firstTokenBalance)
  //             .minus(swapOutput)
  //             .round(0, 3)
  //             .toString();
  //           await pool.save();
  //           fromTokenAddress = pool.firstToken;
  //           amountIn = swapOutput;
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log("Error when updating pool: ", err.message);
  //     throw new Error("Error when updating pool: ", err.message);
  //   }
  // };
  // static getTokensAfterSwap = async (
  //   args,
  //   pool,
  //   firstTokenBalance,
  //   secondTokenBalance
  // ) => {
  //   let poolIndex;
  //   for (let add in args.swap_route) {
  //     if (args.swap_route[add] == pool.poolAddress) {
  //       poolIndex = add;
  //     }
  //   }
  //   const beforePoolsAddress = args.swap_route.slice(0, poolIndex);
  //   const beforePools = await PoolModel.find({
  //     poolAddress: {
  //       $in: beforePoolsAddress,
  //     },
  //   });

  //   let fromTokenAddress = args.token_in;
  //   for (let address of beforePoolsAddress) {
  //     const beforePool = beforePools.find(
  //       (pool) => pool.poolAddress == address
  //     );
  //     if (args.token_in.toLowerCase() == beforePool.firstToken) {
  //       fromTokenAddress = beforePool.secondToken;
  //     } else if (args.token_in.toLowerCase() == beforePool.secondToken) {
  //       fromTokenAddress = beforePool.firstToken;
  //     }
  //   }
  //   let amountIn = big(args.amount_in);
  //   for (let i = 0; i <= poolIndex; i++) {
  //     amountIn = amountIn.times(99.7).div(100).round(0, 3);
  //   }
  //   if (fromTokenAddress == pool.firstToken) {
  //     let remainder_ratio = big((1000 - constraints.swapFeePerMile).toString());
  //     let amount_in_with_fee = remainder_ratio.times(amountIn);

  //     let numerator = amount_in_with_fee.times(secondTokenBalance).round(0, 3);
  //     let denominator = big(firstTokenBalance)
  //       .times(1000)
  //       .add(amount_in_with_fee)
  //       .round(0, 3);
  //     const swapOutput = numerator.div(denominator).round(0, 3);
  //     firstTokenBalance = firstTokenBalance.add(amountIn);
  //     secondTokenBalance = secondTokenBalance.minus(swapOutput).round(0, 3);
  //     return { firstTokenBalance, secondTokenBalance };
  //   } else {
  //     let remainder_ratio = big((1000 - constraints.swapFeePerMile).toString());
  //     let amount_in_with_fee = remainder_ratio.times(amountIn).round(0, 3);

  //     let numerator = amount_in_with_fee.times(firstTokenBalance).round(0, 3);
  //     let denominator = big(secondTokenBalance)
  //       .times(1000)
  //       .add(amount_in_with_fee)
  //       .round(0, 3);
  //     const swapOutput = numerator / denominator;
  //     secondTokenBalance = secondTokenBalance.add(amountIn);
  //     firstTokenBalance = firstTokenBalance.minus(swapOutput).round(0, 3);
  //     return { firstTokenBalance, secondTokenBalance };
  //   }
  // };
  // static syncLedgers = async (transactions, isNew, poolAddress) => {
  //   try {
  //     const ledgersParams = [];
  //     const pool = await this.getPoolByAddress(poolAddress);
  //     let liquidityToken = isNew ? big("0") : big(pool.liquidityTokenBalance);
  //     let firstTokenBalance = isNew ? big("0") : big(pool.firstTokenBalance);
  //     let secondTokenBalance = isNew ? big("0") : big(pool.secondTokenBalance);
  //     for (let txn of transactions) {
  //       const ledgerData = {
  //         poolAddress: txn.node.contractId,
  //         method: txn.node.event.action,
  //         walletAddress: txn.node.from,
  //         createdAt: txn.node.event.block.productionTime,
  //       };
  //       const args = JSON.parse(txn.node.event.arguments);
  //       if (txn.node.event.action == "provide_liquidity") {
  //         ledgerData["tokenAddress"] = args.token_address;
  //         ledgerData["tokenProvided"] = args.token_amount;

  //         if (
  //           ledgerData["tokenAddress"].toLowerCase() ==
  //           pool.firstToken.toLowerCase()
  //         ) {
  //           ledgerData["userShareDiff"] = big(
  //             big(ledgerData["tokenProvided"])
  //               .times(big(liquidityToken))
  //               .div(firstTokenBalance)
  //           )
  //             .round(0, 3)
  //             .toString();
  //           secondTokenBalance = big(
  //             secondTokenBalance
  //               .add(
  //                 big(ledgerData["tokenProvided"])
  //                   .times(secondTokenBalance)
  //                   .div(firstTokenBalance)
  //               )
  //               .round(0, 3)
  //           );
  //           firstTokenBalance = firstTokenBalance.add(
  //             big(ledgerData["tokenProvided"])
  //           );
  //           liquidityToken = liquidityToken.add(
  //             big(ledgerData["userShareDiff"])
  //           );
  //         } else if (
  //           ledgerData["tokenAddress"].toLowerCase() ==
  //           pool.secondToken.toLowerCase()
  //         ) {
  //           ledgerData["userShareDiff"] = big(
  //             big(ledgerData["tokenProvided"])
  //               .times(big(liquidityToken))
  //               .div(secondTokenBalance)
  //           )
  //             .round(0, 3)
  //             .toString();
  //           firstTokenBalance = big(
  //             firstTokenBalance
  //               .add(
  //                 big(ledgerData["tokenProvided"])
  //                   .times(secondTokenBalance)
  //                   .div(firstTokenBalance)
  //               )
  //               .round(0, 3)
  //           );
  //           secondTokenBalance = secondTokenBalance.add(
  //             big(ledgerData["tokenProvided"])
  //           );
  //           liquidityToken = liquidityToken.add(
  //             big(ledgerData["userShareDiff"])
  //           );
  //         }
  //       } else if (txn.node.event.action == "reclaim_liquidity") {
  //         ledgerData["liquidityClaimed"] = args.liquidity_share;
  //         ledgerData["userShareDiff"] = args.liquidity_share;
  //         firstTokenBalance = firstTokenBalance
  //           .minus(
  //             firstTokenBalance.times(
  //               big(ledgerData["userShareDiff"]).div(liquidityToken)
  //             )
  //           )
  //           .round(0, 3);
  //         secondTokenBalance = secondTokenBalance
  //           .minus(
  //             secondTokenBalance.times(
  //               big(ledgerData["userShareDiff"]).div(liquidityToken)
  //             )
  //           )
  //           .round(0, 3);
  //         liquidityToken = liquidityToken.minus(
  //           big(ledgerData["userShareDiff"])
  //         );
  //       } else if (txn.node.event.action == "provide_initial_liquidity") {
  //         ledgerData["initialFirstTokenProvided"] = args.token_a_amount;
  //         ledgerData["initialSecondTokenProvided"] = args.token_b_amount;
  //         ledgerData["userShareDiff"] = big(args.token_a_amount)
  //           .add(big(args.token_b_amount))
  //           .toString();
  //         liquidityToken = big(ledgerData["userShareDiff"]);
  //         firstTokenBalance = big(args.token_a_amount);
  //         secondTokenBalance = big(args.token_b_amount);
  //       } else if (txn.node.event.action == "route_swap") {
  //         ledgerData["userShareDiff"] = liquidityToken;
  //         const {
  //           firstTokenBalance: firstBalance,
  //           secondTokenBalance: secondBalance,
  //         } = await this.getTokensAfterSwap(
  //           args,
  //           pool,
  //           firstTokenBalance,
  //           secondTokenBalance
  //         );
  //         firstTokenBalance = firstBalance;
  //         secondTokenBalance = secondBalance;
  //       }
  //       if (txn.node.event.action !== "swap") {
  //         ledgersParams.push(ledgerData);
  //       }
  //     }

  //     const updatedPool = {
  //       ...pool,
  //       liquidityTokenBalance: liquidityToken.toString(),
  //       firstTokenBalance: firstTokenBalance.toString(),
  //       secondTokenBalance: secondTokenBalance.toString(),
  //     };
  //     // for (let key in pool) {
  //     //   if (key != "_id") {
  //     //     updatedPool[key] = pool[key];
  //     //   }
  //     // }
  //     await PoolModel.findOneAndUpdate(
  //       { poolAddress: updatedPool.poolAddress },
  //       updatedPool
  //     );
  //     await LedgerModel.create(ledgersParams);
  //   } catch (err) {
  //     console.log(`Error while storing ledgers: ${err.message}`);
  //     throw new Error(`Error while storing ledgers: ${err.message}`);
  //   }
  // };
  static getLatestLedgerByPoolAddress = async (poolAddress) => {
    try {
      const latestLedger = await LedgerModel.find({
        poolAddress,
        method: {
          $in: [
            "provide_liquidity",
            "reclaim_liquidity",
            "provide_initial_liquidity",
            "swap",
          ],
        },
      })
        .sort({ createdAt: -1 })
        .limit(1);
      return latestLedger[0];
    } catch (err) {
      console.log(
        "Error when finding latest ledger by pool address: ",
        err.message
      );
      throw new Error(
        "Error when finding latest ledger by pool address: ",
        err.message
      );
    }
  };
  static getLatestLedgerOfSwap = async () => {
    try {
      const latestLedger = await LedgerModel.find({
        method: "route_swap",
      })
        .sort({ createdAt: -1 })
        .limit(1);
      return latestLedger[0];
    } catch (err) {
      console.log(
        "Error when finding latest ledger of swap method: ",
        err.message
      );
      throw new Error(
        "Error when finding latest ledger of swap method: ",
        err.message
      );
    }
  };
  static getPoolAddresses = async () => {
    try {
      const addresses = await PoolModel.aggregate([
        {
          $group: {
            _id: null,
            addresses: { $push: "$poolAddress" },
          },
        },
        {
          $project: {
            _id: 0,
            addresses: 1,
          },
        },
      ]);

      return addresses.length ? addresses[0].addresses : [];
    } catch (error) {
      console.error("Error fetching pool addresses:", error);
      throw new Error("Error fetching pool addresses:", error);
    }
  };
}

export default poolServices;
