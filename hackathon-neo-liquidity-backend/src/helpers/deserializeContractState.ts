//Get Liquidity Token supply

export class TokenBalances {
  token_lp_address: string;
  token_a_address: string;
  token_b_address: string;
  balances: Balances;
  constructor(
    token_lp_address: string,
    token_a_address: string,
    token_b_address: string,
    balances: Balances
  ) {
    this.token_lp_address = token_lp_address;
    this.token_a_address = token_a_address;
    this.token_b_address = token_b_address;
    this.balances = balances;
  }
}
export class Balances {
  a_tokens: string;
  b_tokens: string;
  liquidity_tokens: string;
  constructor(a_tokens: string, b_tokens: string, liquidity_tokens: string) {
    this.a_tokens = a_tokens;
    this.b_tokens = b_tokens;
    this.liquidity_tokens = liquidity_tokens;
  }
}

class liquidityState {
  liquidity_pool_address: string;
  swap_fee_per_mille: number;
  token_balances: TokenBalances;
  initial_liquidity_provided: boolean;
  liquidity_token_supply: string;
  constructor(
    liquidity_pool_address: string,
    swap_fee_per_mille: number,
    token_balances: TokenBalances,
    initial_liquidity_provided: boolean,
    liquidity_token_supply: string
  ) {
    this.liquidity_pool_address = liquidity_pool_address;
    this.swap_fee_per_mille = swap_fee_per_mille;
    this.token_balances = token_balances;
    this.initial_liquidity_provided = initial_liquidity_provided;
    this.liquidity_token_supply = liquidity_token_supply;
  }
}

export const deserializeContractState = (parsed: any) => {
  const state = Buffer.from(parsed.state.data, "base64");
  const uint8Array = new Uint8Array(state);
  // Step 1: Create a DataView from the Uint8Array
  const dataView = new DataView(uint8Array.buffer);
  // Step 2: Extract the values
  const extractAddress = (offset: number, length: number): string =>
    Array.from(uint8Array.slice(offset, offset + length))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  const liquidityPoolAddress = extractAddress(0, 21); //Address is taking 21 bytes (42 length)
  const swapFeePerMille = dataView.getUint16(21, true); // Little-endian

  const tokenLpAddress = extractAddress(23, 21);
  const tokenAAddress = extractAddress(44, 21);
  const tokenBAddress = extractAddress(65, 21);

  // For this example, assume that the rest of the Uint8Array is for token balances
  const balancesData = uint8Array.slice(86, 110);
  const aTokens = dataView.getBigUint64(86, true);

  const bTokens = dataView.getBigUint64(102, true);
  const liquidityTokens = dataView.getBigUint64(118, true);
  const initialLiquidityProvided = dataView.getUint8(134) === 1;
  const liquidityTokenSupply = dataView.getBigUint64(135, true).toString(); // Little-endian

  // Step 3: Create instances of the classes
  const balances = new Balances(
    aTokens.toString(),
    bTokens.toString(),
    liquidityTokens.toString()
  );
  const tokenBalancesObj = new TokenBalances(
    tokenLpAddress,
    tokenAAddress,
    tokenBAddress,
    balances
  );
  const LiquidityState = new liquidityState(
    liquidityPoolAddress,
    swapFeePerMille,
    tokenBalancesObj,
    initialLiquidityProvided,
    liquidityTokenSupply
  );

  // Step 4: Serialize the JSON object to a JSON string
  const stateJson = JSON.stringify(
    LiquidityState,
    (key, value) => (value instanceof Uint8Array ? Array.from(value) : value),
    2
  ); // Pretty print with 2 spaces
  return stateJson;
};

class AVLTreeNode {
  key: string;
  value: string;
  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }
}

class AVLTree {
  key: number;
  nodes: AVLTreeNode[];
  constructor(key: number, nodes: AVLTreeNode[]) {
    this.key = key;
    this.nodes = nodes;
  }
}

export class State {
  name: string;
  decimals: number;
  symbol: string;
  owner: string;
  total_supply: string;
  constructor(
    name: string,
    decimals: number,
    symbol: string,
    owner: string,
    total_supply: string
  ) {
    this.name = name;
    this.decimals = decimals;
    this.symbol = symbol;
    this.owner = owner;
    this.total_supply = total_supply;
  }
}

function uint8ArrayToBigInt(arr: Uint8Array): bigint {
  let value = BigInt(0);
  for (let i = arr.length - 1; i >= 0; i--) {
    value = (value << BigInt(8)) | BigInt(arr[i]);
  }
  return value;
}

export function deserializeAVLTree(jsonString: string) {
  const parsed = JSON.parse(jsonString);

  const avlTrees = parsed.avlTrees.map((tree: any, index: any) => {
    const nodes = tree.value.avlTree.map((node: any) => {
      // Step 1: Decode the Base64 string to a byte array

      const decodedBytes = Buffer.from(node.key.data.data, "base64");
      let key: any = new Uint8Array(decodedBytes);
      key = Array.from(key)
        .map((b: any) => b.toString(16).padStart(2, "0"))
        .join("");

      const decodedBytes2 = Buffer.from(node.value.data, "base64");
      let value1: any = new Uint8Array(decodedBytes2);
      const uint8Array = Uint8Array.from(value1);
      const number = uint8ArrayToBigInt(uint8Array); // Assuming little-endian

      return new AVLTreeNode(key, number.toString());
    });
    return new AVLTree(tree.key, nodes);
  });

  // const state = new State(decodeBase64(parsed.state.data));

  // console.log("Response Test token", { avlTrees, state });

  // return { avlTrees, state };
  return avlTrees;
}
