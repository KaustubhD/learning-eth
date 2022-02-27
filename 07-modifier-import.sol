// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./07-Owned.sol";

contract InheritanceModifier is Owned {
    mapping(address => uint) public tokenBalance;

    // address owner;

    uint tokenPrice = 1 ether;

    constructor() {
        // owner = msg.sender;
        tokenBalance[owner] = 100;
    }

    // function createNewToken() public {
    //     require(msg.sender == owner, "Only owner can perform this action");
    function createNewToken() public needsOwner {
        tokenBalance[owner]++;
    }

    // function burnToken() public {
    //     require(msg.sender == owner, "Only owner can perform this function");
    function burnToken() public needsOwner {
        tokenBalance[owner]--;
    }

    function purchaseToken() public payable {
        require((tokenBalance[owner] * tokenPrice) / msg.value > 0, "Not enough tokens");
        tokenBalance[owner] -= msg.value / tokenPrice;
        tokenBalance[msg.sender] += msg.value / tokenPrice;
    }

    function sendToken(address _to, uint _amount) public {
        require(tokenBalance[msg.sender] >= _amount, "Not enough tokens");
        assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);
        assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]);
        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;
    }
}
