import evmBlockScanner from "../indexers/evmIndexer/blockScanner";
import { evmListener } from "../indexers/evmIndexer/listener";
import { utils } from "../helpers/common";
import stellerIndexer from "./nonEvmIndexer/stellerIndexer";

export const startIndexers = async () => {
  //webSocket Listeners
  // evmListener();

  //Cron Jobs
  const workers = [evmBlockScanner, stellerIndexer];
  for (const worker of workers) {
    utils.schedule(worker.cronTimer, worker.worker);
  }
};
