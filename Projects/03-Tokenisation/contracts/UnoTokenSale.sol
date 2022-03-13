// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CrowdSale.sol";

contract UnoTokenSale is Crowdsale {
  constructor(uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {
  
  }
}