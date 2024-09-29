import { getRpcApi } from ".";
import { EvmChainInfo, EvmChains } from "../types";
import { bscTokens } from "./evmChains/bscTokens";
import { ethTokens } from "./evmChains/ethTokens";
import { polygonTokens } from "./evmChains/polygonTokens";
import { arbitrumTokens } from "./evmChains/arbitrumTokens";
import { stellarTokens } from "./nonEvmChains/stellarTokens";
import { allTokens } from "./evmChains/allTokens";

export const evmChains = ["bsc", "arb", "eth", "base", "neo"] as const;
// export const evmChains = ["arb"] as const;

export const bridgeTokenAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
export const evmChainsInfo: Record<string, EvmChainInfo> = {
  bsc: {
    chainId: 56,
    name: "Binance Smart Chain",
    zeroxUrl: "https://bsc.api.0x.org/",
    // rpcUrl: `https://site1.moralis-nodes.com/bsc/ec8dad635a2942ebbc7fa1ea29b2bc83`,
    rpcUrl: `https://bnb-testnet.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy`,
    // rpcUrl: `https://bsc-rpc.publicnode.com`,
    explorerUrl: "https://bscscan.com/",
    bridgeAddress: `0x27E11cd7831963101452dbd0f41c1D011F2Fa122`,
    bridgeDeployBlock: 44278383,
    eventPollingInterval: 3000,
    hivePlayerId: "terablock-bsc",
    mainToken: {
      name: "Binance Coin",
      symbol: "BNB",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      graphAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      decimals: 18,
      logoURI:
        "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/BNB.png",
      coinGeckoId: "binancecoin",
    },
    supportedTokens: allTokens,
  },
  neo: {
    chainId: 47763,
    name: "Binance Smart Chain",
    zeroxUrl: "https://bsc.api.0x.org/",
    // rpcUrl: `https://site1.moralis-nodes.com/bsc/ec8dad635a2942ebbc7fa1ea29b2bc83`,
    rpcUrl: `https://neoxt4seed1.ngd.network`,
    // rpcUrl: `https://bsc-rpc.publicnode.com`,
    explorerUrl: "https://bscscan.com/",
    bridgeAddress: `0xE844478Acb6b7714ac1ffb08aFC3E9D13a1E8fB7`,
    bridgeDeployBlock: 501765,
    eventPollingInterval: 3000,
    hivePlayerId: "terablock-bsc",
    mainToken: {
      name: "Binance Coin",
      symbol: "BNB",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      graphAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      decimals: 18,
      logoURI:
        "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/BNB.png",
      coinGeckoId: "binancecoin",
    },
    supportedTokens: allTokens,
  },
  eth: {
    chainId: 1,
    name: "Ethereum",
    zeroxUrl: "https://api.0x.org/",
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy`,
    explorerUrl: "https://etherscan.io/",
    bridgeAddress: `0x41E65e9E6b200eb6cf9af08Fe0A876e2B32E5249`,
    bridgeDeployBlock: 6777164,
    eventPollingInterval: 10000,
    // hiveWallet: "terablock-eth",
    mainToken: {
      name: "Ether",
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      graphAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      logoURI:
        "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/ETH.png",
      coinGeckoId: "ethereum",
    },
    supportedTokens: allTokens,
  },

  // poly: {
  //   chainId: 137,
  //   name: "Polygon",
  //   zeroxUrl: "https://polygon.api.0x.org/",
  //   // rpcUrl: `https://site2.moralis-nodes.com/polygon/33ee35df39e44e4c8df0f84372d79b93`,
  //   // rpcUrl: `https://polygon-mainnet.infura.io/v3/${getRpcApi()}`,
  //   rpcUrl: `https://polygon-mainnet.infura.io/v3/`,
  //   explorerUrl: "https://polygonscan.com/",
  //   bridgeAddress: `0x21568459854Adcda462F6D9C11ce4F157Dc70f93`,
  //   bridgeDeployBlock: 61454670,
  //   eventPollingInterval: 3000,
  //   mainToken: {
  //     name: "Matic",
  //     symbol: "MATIC",
  //     address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  //     graphAddress: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  //     decimals: 18,
  //     logoURI:
  //       "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/MATIC.png",
  //     coinGeckoId: "matic-network",
  //   },
  //   supportedTokens: polygonTokens,
  // },
  arb: {
    chainId: 42161,
    name: "Arbitrum",
    zeroxUrl: "https://arbitrum.api.0x.org/",
    // rpcUrl: `https://site1.moralis-nodes.com/arbitrum/57d1ee4880a04a60bc7523e2a4a41ebf`,
    rpcUrl: `https://arb-sepolia.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy`,
    explorerUrl: "https://arbiscan.io/",
    bridgeAddress: `0x0A063b3AD7044a122c4C0b31A5BcB07e9D8498be`,
    bridgeDeployBlock: 84832222,
    eventPollingInterval: 3000,
    mainToken: {
      name: "Ether",
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      graphAddress: "0x9623063377AD1B27544C965cCd7342f7EA7e88C7",
      decimals: 18,
      logoURI:
        "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/ARB.png",
      coinGeckoId: "matic-network",
    },
    supportedTokens: allTokens,
  },
  base: {
    chainId: 8453,
    name: "Base",
    zeroxUrl: "https://arbitrum.api.0x.org/",
    // rpcUrl: `https://site1.moralis-nodes.com/arbitrum/57d1ee4880a04a60bc7523e2a4a41ebf`,
    rpcUrl: `https://base-sepolia.g.alchemy.com/v2/XE-fniPpIqe120z7FJ1mYLMQodkasCzy`,
    explorerUrl: "https://arbiscan.io/",
    bridgeAddress: `0x27E11cd7831963101452dbd0f41c1D011F2Fa122`,
    bridgeDeployBlock: 15893902,
    eventPollingInterval: 3000,
    mainToken: {
      name: "Ether",
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      graphAddress: "0x9623063377AD1B27544C965cCd7342f7EA7e88C7",
      decimals: 18,
      logoURI:
        "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/ARB.png",
      coinGeckoId: "matic-network",
    },
    supportedTokens: allTokens,
  },
};

export const nonEvmChainsInfo: Record<string, any> = {
  stellar: {
    chainId: 1,
    name: "Stellar",
    bridgeAddress: "CA6UHQAJTSR24TCV6OBXAPFNDNT56HSJRIRBENDLXGW3TEWZQ37O52WR",
    bridgeDeployLedger: 53352792,
    mainToken: {
      name: "Stellar Lumens",
      address: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
      graphAddress: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
      symbol: "XLM",
      logoURI:
        "https://assets.coingecko.com/coins/images/100/standard/Stellar_symbol_black_RGB.png",
      decimals: 7,
      coinGeckoIds: "xlm",
    },

    supportedTokens: stellarTokens,
  },
};

// export const supportedChains = [
//   "arb",
//   "bsc",
//   "stellar",
//   "neo",
//   "base",
//   "eth",
// ] as const;
export const supportedChains = [
  "arb",
  "bsc",
  "stellar",
  "neo",
  "base",
  "eth",
] as const;

export const alchemyNetworks = ["arb", "poly"] as const;

export const allChainsInfo = {
  ...evmChainsInfo,
  ...nonEvmChainsInfo,
};

const mainTokenCoinIds = Object.values(evmChainsInfo).map(
  (chain) => chain.mainToken.coinGeckoId
);
const tokenCoinIds = Object.values(evmChainsInfo)
  .map((chain) => chain.supportedTokens.map((token) => token.coinGeckoId))
  .flat();

export const coinGeckoIds = [
  ...mainTokenCoinIds,
  ...tokenCoinIds,
  "stellar",
].filter((value) => value) as string[];
