import { config, loggers, web3, types } from "../../helpers/common";
import * as redis from "../../redis";
import { saveLockEvent } from "../../helpers";

const evmBlockScanner = async () => {
  try {
    for (const network of config.evmChains) {
      //recheck missed Lock Events on common Bridge
      console.log("Gettings logs for evmBLockScanner: ", network);
      const fromBlockNumber = await redis.getLastSyncBlockNumber(
        network,
        config.events.evm
      );
      console.log("From Block: ", fromBlockNumber);
      const toBlockNumber = await web3.getLatestBlockNumber(network);
      console.log("To block: ", toBlockNumber);
      if (fromBlockNumber == toBlockNumber) {
        continue;
      }
      const bridge = await web3.getBridgeInstance(network);
      const filter: any = bridge.filters[config.events.evm]?.();
      console.log("Filter: ", filter);
      const logs = await web3.getLogs(
        network,
        bridge,
        filter!,
        fromBlockNumber,
        toBlockNumber
      );
      console.log("Logs got from event: ", logs);
      for (const log of logs) {
        const parsedLog = bridge.interface.parseLog(log);
        console.log("Parsed Logs: ", parsedLog);
        await saveLockEvent(network, log, parsedLog, bridge);
        console.log("logs saved");
      }
      await redis.setLastSyncBlockNumber(
        network,
        config.events.evm,
        toBlockNumber
      );
    }
  } catch (e: any) {
    console.log("Error in blockscanner: ", e.message);
    console.log("Starting evmBlockScanner");
    evmBlockScanner();
    loggers.logger.error(`🚫 | error in EVM block Scanner`, e.message);
  }
};

export default {
  worker: evmBlockScanner,
  cronTimer: config.cronInfo.evmBlockScanner,
};
