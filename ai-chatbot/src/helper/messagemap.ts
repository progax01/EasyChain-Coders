const chain = 'chain name such as : Sepolia, BNB Smart Chain, Base Sepolia, Arbitrum Sepolia';
export default {
    provideLiquidity : {
        message: 'for staking liquidity in pool you should provide:\n',
        arguments:{
            tokenA: 'name of token A',
            tokenB: 'name of token B',
            amountA: 'amount that user want to deposit for tokenA',
            amountB: 'amount that user want to deposit for tokenB',
            chain
        }
    },
    removeLiquidity: {
        message: 'to withdraw liquidity from pool you should provide:\n',
        arguments:{
            liquidityAmount: 'liquidity amount',
            tokenA: "name of token A in pool",
            tokenB: "name of token B in pool",
            chain
        }
    },
    deployToken: {
        message: 'to deploy token you should provide:\n',
        arguments:{
            name: 'token name',
            symbol: 'token symbol that should be maximum 5 characters',
            initialSupply: 'initial supply of token',
            decimal: 'number of decimals for token to be deployed',
            chain
        }
    },
    multiHopSwap: {
        message: 'to swap tokens you should provide:\n',
        arguments:{
            tokenIn: 'token that you want to swap',
            tokenOut: 'token in which you want to swap',
            recipient: 'recipient address to which you want to send tokens',
            chain
        }
    },
    createPool: {
        message: 'to create liquidity pool you should provide:\n',
        arguments:{
            tokenA: "name of token A",
            tokenB: "name of token B",
            amountA: "intial amount for tokenA",
            amountB: "intial amount for tokenB",
            chain
        }
    },
    lock: {
        message: 'to bridge tokens between blockchains you should provide:\n',
        arguments:{
            token: "token that you want to use for bridging",
            amountIn: "amount that you want to bridge",
            destChainId: "destination chain on which you want to bridge",
            destToken: "token that you want to get on bridged chain",
            chain
        }
    }
}