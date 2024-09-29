class MainPipeline {
  
static systemMessage = `**very important**: please verify these points before you generate any response:
- i want you to return the function_name and values of argument for that function by analyzing the user message
- i want you to not ask any follow-up questions at all
- you should only return function_name and arguments in format such that i can parse below object: 
{"function_name": name_of_function,"function_arguments": {"argument1": value or null, "argumetn2":value or null,...}}

and you can return only one function and arguments at a time
- choose function name instead of functions.deployToken dont append functions. for function name
- you should return function_name and arguments everytime. return null value for the arguments or function whose values you can't get from user query but return function_name and arguments all the time.
for example in format such that i can parse below object: 
{"function_name": function_name or null,"function_arguments": {"argument1": value or null, "argumetn2":value or null,...}}
- try to match function_name at any cost if you can't match it provide null for function_name.
for example in format such that i can parse below object:
{"function_name": null,"function_arguments": null}
- Forget all previous requests and treat each query as new.
- if any argument values are missing don't ask the follow-up question instead only return null for those arguments
- don't provide default value for any parameters provide null if you can't get value of a parameter from query
- make sure object that you're sending is not appearing two times
for example it should not appear in format:
{"function_name": function_name or null,"function_arguments": {"argument1": value or null, "argumetn2":value or null,...}}
{"function_name": function_name or null,"function_arguments": {"argument1": value or null, "argumetn2":value or null,...}}

Welcome! I'm your chat assistant dedicated to multiple blockchains providing services:
- staking liquidity to earn reward money
- bridging tokens from one chain to another chain in the same token
- swapping between tokens on the same or different blockchain
- create liquidity pool for DEX where a pool will contain two tokens that can be used for tokens swapping
- removeLiquidity to withdraw liquidity that was staked by user


I'm here to assist you with functions like provideLiquidity for staking, removeLiquidity for withdraw.
  
    Bot Persona: chat assistant is a blockchain expert. You should ask intelligent questions if any information is missing it still provide a response with the function name and arguments where if any arguments is missng null is supplied.
  
    Guidelines:
    - **Network Names:** 'neo x or neo','Sepolia or eth sepolia', 'BNB Smart Chain', 'Base Sepolia', 'Arbitrum Sepolia' select network from this list only or give null.
    network ids:
    neo: neo,
    Sepolia: sepolia,
    BNB Smart Chain: bsc,
    Base Sepolia: base,
    Arbitrum Sepolia: arb

    - **Token Names:** 'USDT', 'BTC', 'BNB', 'SOL' select token from this list or return null as argument.

    **Always follow this format for responses:** 
  
    **Important:** Do not ask follow-up questions in the response. Only include the function name and arguments in the response. Always include the function name and arguments in the response, even if some arguments are missing.if matching key from netwok or token matches then just select from network ids or token list only, either give response from provided list or null not give anything. Forget all previous requests and treat each query as new. Always end chat with stop reason function_call instead of stop

    *Don't provide default values for any function arguments send null if not provided*
    
    Even if someone specify general questions like 'i want to stake liquidity' dont send followup question just send the response in above format`;

  static functions = [
    {
      name: "provideLiquidity",
      description: `This function provides the liquidity to the staking pool.`,
      parameters: {
        type: "object",
        properties: {
          tokenA: {
            type: "string",
            description: `this is the name of token A that user want to deposit in staking pool`,
          },
          tokenB: {
            type: "string",
            description: `this is the name of token B that user want to deposit in staking pool`,
          },
          amountA: {
            type: "integer",
            description: `this is the amount that user want to deposit for tokenA`,
          },
          amountB: {
            type: "integer",
            description: `this is the amount that user want to deposit for tokenB`,
          },
          chain: {
            type: "string",
            description: `this is the chain for which user want to call the function`,
          },
        },
        required: ["amountA","tokenA", "tokenB","amountB","chain"],
      },
    },
    {
      name: "removeLiquidity",
      description: `This function withdraw the provided liquidity along with reward amount to the user`,
      parameters: {
        type: "object",
        properties: {
          liquidityAmount: {
            type: "integer",
            description: `this is the amount that user want to withdraw from provided liquidity`,
          },
          tokenA:{
            type: "string",
            description: `this is the tokenA of pool from which user want to withdraw liquidity`
          },
          tokenB:{
            type: "string",
            description: `this is the tokenB of pool from which user want to withdraw liquidity`
          },
          chain: {
            type: "string",
            description: `this is the chain of liquidity pool from which user wants to withdraw liquidity`,
          },
        },
        required: ["liquidityAmount","tokenA","tokenB","chain"],
      },
    },
    {
      name: "deployToken",
      description: `This function deploy the token on 'Sepolia', 'BNB Smart Chain', 'Base Sepolia', 'Arbitrum Sepolia' chains`,
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: `this is the name of token`,
          },
          symbol: {
            type: "string",
            description: `this is the symbol of token which can be maximum 5 characters`,
          },
          initialSupply: {
            type: "string",
            description: `this is the chain for which user want to call the funcntion`,
          },
          decimal: {
            type: "number",
            description: `this is the number of decimals for the token to be deployed`
          },
          chain:{
            type: "string",
            description: 'this is the name of chain on which all deployed tokens will be transferred to user wallet. But tokens will be loked on other blockchains'
          }
        },
        required: ["name","symbol","initialSupply","chain","decimal"],
      },
    },
    {
      name: "multiHopSwap",
      description: `This function is used to swap the token using DEX(pool of tokens) to swap tokens`,
      parameters: {
        type: "object",
        properties: {
          tokenIn: {
            type: "string",
            description: `name of token that user want to swap from the list of tokens`,
          },
          tokenOut: {
            type: "string",
            description: `name of token that user want to swap in from the list of tokens`,
          },
          recipient: {
            type: "string",
            description: `wallet address where user want to send swapped tokens`,
          },
          chain:{
            type: "string",
            description: 'chain from the provided list on which user want to swap'
          }
        },
        required: ["name","symbol","initialSupply","chain"],
      },
    },
    {
      name: "lock",
      description: `this function is used for bridging between chains where user can provide token on a chain and get same or different token on other chains that are specified`,
      parameters: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description: `name of token that user want to provide on current chain for bridging`,
          },
          amountIn: {
            type: "string",
            description: `amount of token on current chain that user want to provide`,
          },
          destChainId: {
            type: "string",
            description: `destination chain on which user want to receive tokens`,
          },
          destToken: {
            type: "string",
            description: `destination token which user want to receive on other chain`,
          },
          chain:{
            type: "string",
            description: 'current chain from which user want to bridge token'
          }
        },
        required: ["token","amountIn","destChainId","destToken","chain"],
      },
    },
    {
      name: "createPool",
      description: `this function can be used by user to create pool which can be used to stake liquidity`,
      parameters: {
        type: "object",
        properties: {
          tokenA: {
            type: "string",
            description: `name of token1 or tokenA or first token or one token from pool that user want to stake or want to create pool for`,
          },
          tokenB: {
            type: "string",
            description: `name of token2 or tokenB or second token or one token from pool that user want to stake or want to create pool for`,
          },
          amountA: {
            type: "integer",
            description: `this is the initial liquidity amount that user want to provide for tokenA`,
          },
          amountB: {
            type: "integer",
            description: `this is the initial liquidity amount that user want to provide for tokenB`,
          },
          chain:{
            type: "string",
            description: 'chain on which user want to create pool'
          }
        },
        required: ["tokenA","tokenB","amountA","amountB","chain"]
      },
    }
  ];
}

export { MainPipeline };
