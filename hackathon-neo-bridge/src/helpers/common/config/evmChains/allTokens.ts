import { Token } from "../../types";

export const allTokens: Token[] = [
  // native Tokens

  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x8a7813c4bdeEc6158462603aF9c5DFF1f68e5FB0",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/WETH.png",
    coinGeckoId: "weth",
  },
  //Stable Coins
  {
    name: "Tether",
    symbol: "USDT",
    address: "0xb4e2Cb231E0F4af05a60f4B0586d0460c8dF5485",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/USDT.png",
    coinGeckoId: "tether",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x96Fa93a85013b01CFe3Ebd6A3bA55ffa13E4c9Dc",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/USDC.png",
    coinGeckoId: "usd-coin",
  },
  {
    name: "Binance",
    symbol: "BUSD",
    address: "0xC155C82bd1A10E5bc4905E3EDc945305ca490896",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/BUSD.png",
    coinGeckoId: "binance-usd",
  },
  // Other Tokens
  {
    name: "Stellar",
    symbol: "XLM",
    address: "0x6497E66dD2f1F99569C373c1F17911E6de9d8C36",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/SPS.png",
    coinGeckoId: "stellar",
  },

  {
    name: "Solana",
    symbol: "SOL",
    address: "0x283C0f7E5cee80a5cF69778Add0D2AD33Cb295f9",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/SPS.png",
    coinGeckoId: "stellar",
  },

  {
    name: "Polygon",
    symbol: "MATIC",
    address: "0xA0E98aE3794E039991ABc55E14c8f4584D3829a4",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/SPS.png",
    coinGeckoId: "matic-network",
  },
  {
    name: "Toncoin",
    symbol: "TON",
    address: "0x2E3Bfbc38eb96547f146eDADB1315BFc6a4175b1",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/SPS.png",
    coinGeckoId: "the-open-network",
  },
  {
    name: "Tron",
    symbol: "TRX",
    address: "0xc72D3c8b52FD8206c4fCCBfbF02AeB2451664DCD",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/SPS.png",
    coinGeckoId: "tron",
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x273E4b4be0916F66816fAB7BC2a2601e378FDa9c",
    decimals: 18,
    logoURI: "https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/SPS.png",
    coinGeckoId: "wrapped-bitcoin",
  },
];
