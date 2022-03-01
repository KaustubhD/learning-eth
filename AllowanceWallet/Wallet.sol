// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Allowance.sol";

contract Wallet is Allowance {
    function withdraw(address payable _to, uint _amount) public ownerOrValidAmount(_amount) {
        require(_amount <= address(this).balance, "Funds not enough in the smart contract");
        if (!_isOwner()) {
            _decreaseBalance(_to, _amount);
        }
        _to.transfer(_amount);
    }

    receive() external payable {
    }

    fallback() external payable {
    }
}