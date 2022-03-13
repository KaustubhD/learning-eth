// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Kyc is Ownable {
	mapping(address => bool) whitelist;

  function setKycCompleted(address _address) public onlyOwner {
    whitelist[_address] = true;
  }

  function setKycRevoked(address _address) public onlyOwner {
    whitelist[_address] = false;
  }

  function kycStatus(address _address) public view returns(bool) {
    return whitelist[_address];
  }
}