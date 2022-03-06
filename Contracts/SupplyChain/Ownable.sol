// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function isOwner() public view returns(bool) {
        return owner == msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "Only owner can perform this action");
        _;
    }
}