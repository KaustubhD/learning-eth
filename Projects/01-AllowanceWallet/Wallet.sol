// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Allowance.sol";

contract Wallet is Allowance {
    event MoneyWithdrawn(address _sent_to, uint _amount);
    event MoneyReceived(address _from, uint _amount);

    function withdraw(address payable _to, uint _amount) public ownerOrValidAmount(_amount) {
        require(_amount <= address(this).balance, "Funds not enough in the smart contract");
        if (!_isOwner()) {
            _decreaseBalance(_to, _amount);
        }
        emit MoneyWithdrawn(_to, _amount);
        _to.transfer(_amount);
    }

    function renounceOwnership() override pure public {
        revert("Cannot renounce ownership");
    }

    receive() external payable {
        emit MoneyReceived(_msgSender(), msg.value);
    }

    fallback() external payable {
    }
}