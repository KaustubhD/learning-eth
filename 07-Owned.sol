// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Owned {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier needsOwner {
        require(msg.sender == owner, "Only owner is allowed to perform this operation");
        _;
    }
}
