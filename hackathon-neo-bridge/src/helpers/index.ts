import { loggers, types, utils, web3 } from "./common";
import * as db from "../db/services";

export const saveLockEvent = async (
  network: types.EvmChains,
  log: types.Log,
  parsedLog: any,
  bridge: any
) => {
  console.log("Save Lock Event for network: ", network);
  const fromToken = utils.getSymbolfromTokenAddress(
    network,
    parsedLog.args.tokenIn
  );
  console.log("FromToken: ", fromToken);
  const srcToken = utils.getSymbolfromTokenAddress(
    network,
    parsedLog.args.tokenIn
  );
  console.log("srcToken: ", srcToken);
  const lockId = utils.createLockId({
    network,
    tokenSymbol: fromToken,
    transactionHash: log.transactionHash,
    logIndex: log.logIndex,
  });
  const exists = await db.bridgeTxn.bridgeTxnExists(lockId);
  if (exists) return;
  //process lock event
  const destChain = parsedLog.args.destChainId as string;
  console.log("destChain: ", destChain);
  const toNetwork = web3.utils.parseBytes32String(
    destChain
  ) as types.supportedChains;
  console.log("toNetwork: ", toNetwork);
  // const user = parsedLog.args[0] as string;
  const user = parsedLog.args.user as string;
  console.log("user: ", user);
  // const amount = parsedLog.args[1] as web3.BigNumber;
  const srcAmount = parsedLog.args.amountIn as web3.BigNumber;
  console.log("srcAmount: ", srcAmount);
  const amount = parsedLog.args.amountIn as web3.BigNumber;
  console.log("amount: ", amount);
  // const username = parsedLog.args[3] as string;
  const username = parsedLog.args?.username as string;
  // const recipient = parsedLog.args?.receipent as string;
  const recipient = parsedLog.args?.recipients as string;
  console.log("recipient: ", recipient);
  const toToken = utils.getSymbolfromTokenAddress(
    toNetwork,
    parsedLog.args.destToken
  );
  console.log("toToken: ", toToken);
  // const lockFee = parsedLog.args?.fee as web3.BigNumber;
  const lockFee = await web3.getFeeByHash(log.transactionHash, bridge, network);
  console.log("lockFee: ", lockFee);

  const timestamp = await web3.getBlockTimestamp(network, log.blockNumber);
  const txn: types.IBridgeTxn = {
    lockId,
    fromNetwork: network,
    toNetwork: toNetwork,
    user,
    recipient,
    fromToken: fromToken,
    srcToken,
    lockFee: utils.stringify(lockFee),
    srcAmount: utils.stringify(srcAmount),
    //TODO: get toToken from Contract
    toToken,
    lockAmount: utils.stringify(amount),
    username,
    lockHash: log.transactionHash,
    transactionIndex: log.transactionIndex,
    logIndex: log.logIndex,
    blockNumber: log.blockNumber.toString(),
    timestamp,
    //default values
    processed: false,
    retries: 0,
  };
  console.log("txn: ", txn);
  await db.bridgeTxn.createBridgeTxn(txn);
  console.log("bridge txn saved");
  loggers.functions.logTxInfo({
    header: `💠 | EVM Lock Txn Index`,
    tx: txn,
    logger: loggers.logger,
  });
};
