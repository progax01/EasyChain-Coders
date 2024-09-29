const constraints = {
  poolSerializedDataQuery: `query ContractStateQuery(
    $identifier: BLOCKCHAIN_ADDRESS!
  ) {
    contract(address: $identifier) {
      publicState
      serializedState
      id
    }
  }, `,
  partisiaBackendUrl:
    "https://backend.browser.testnet.partisiablockchain.com/graphql/query",
  webhookUrl:
    "https://eb05-2401-4900-1c0a-7b07-871b-ab51-6c2e-e2aa.ngrok-free.app/api/pool/webhook",
  unmarshelNotificationUrl:
    "https://testnet-notify.unmarshal.com/v1/webhook/subscribe?chain=partisiablockchain",
  routerSwapContractAddress: "02f78df153be163a123c0b3e3a36fc46206aa15651",
  swapFeePerMile: 3,
};
export const neoConstraints = {
  rpcUrls: {
    neo: "https://neoxt4seed1.ngd.network",
    base: "https://base-sepolia.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy",
    arb: "https://arb-sepolia.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy",
    bnb: "https://bnb-testnet.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy",
    eth: "https://eth-sepolia.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy",
  },
};

export default constraints;
