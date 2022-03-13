// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CrowdSale.sol";
import "./Kyc.sol";

contract UnoTokenSale is Crowdsale {
  Kyc public kyc;

  constructor(uint256 rate, address payable wallet, IERC20 token, Kyc _kyc) Crowdsale(rate, wallet, token) {
    kyc = _kyc;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kyc.kycStatus(beneficiary), "KYC not completed. Purchase aborted");
  }
}