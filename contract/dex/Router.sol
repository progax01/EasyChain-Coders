// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "./IERC20.sol";
import {Pool} from "./pool.sol";

contract Router {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // Dynamic multi-hop swap function
    function multiHopSwap(
        address tokenIn,           
        uint256 amountIn,        
        uint256 minimumOutAmount, 
        address tokenOut, 
        address recipient,  
        address[] memory poolAddresses 
    ) external returns (uint256 finalOutputAmount) {
        require(poolAddresses.length > 0, "No pool addresses provided");
        require(amountIn > 0, "Input amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient");

        uint256 currentAmount = amountIn;
        address currentToken = tokenIn;

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);

        for (uint256 i = 0; i < poolAddresses.length; i++) {
            Pool pool = Pool(poolAddresses[i]);
            
            address tokenA = address(pool.tokenA());
            address tokenB = address(pool.tokenB());

            address nextToken = currentToken == tokenA ? tokenB : tokenA;

            IERC20(currentToken).approve(poolAddresses[i], currentAmount);

            currentAmount = pool.swap(currentToken, currentAmount, address(this), 0);

            currentToken = nextToken;
        }

        require(currentToken == tokenOut, "Final token does not match the desired output token");

        require(currentAmount >= minimumOutAmount, "Insufficient output amount");

        IERC20(tokenOut).transfer(recipient, currentAmount);
        finalOutputAmount = currentAmount;

        return finalOutputAmount;
    }
}
