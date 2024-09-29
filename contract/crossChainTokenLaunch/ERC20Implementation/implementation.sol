// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CorssCToken.sol";  // Import the abstract OmniERC20 contract;

contract tokenLaunch is CrossCToken {

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply,
        address minterAddress,
        bool ismainChain
    ) CrossCToken(name_, symbol_) {
      
        if(ismainChain== true){
        _mint(minterAddress, initialSupply);
        }
        else {
              _mint(address(this), initialSupply);
        }
    }

    
    function mint(address account, uint256 value) public {
      
        _mint(account, value);
    }

  
    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(address(0), account, value);
    }
}
