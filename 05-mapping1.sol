// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Mapping1 {
    mapping(uint => bool) public intboolMap;
    mapping(address => bool) public whitelistMap;

    function setIntToTrue(uint index) public {
        intboolMap[index] = true;
    }

    function addToWhitelist() public {
        whitelistMap[msg.sender] = true;
    }
}
