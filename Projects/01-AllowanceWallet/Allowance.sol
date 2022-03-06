// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Allowance is Ownable {
    event AllowanceChanged(address _by, address _for, uint _from, uint _to);
    mapping(address => uint) public allowanceBalance;

    // Set how much a user is allowed to withdraw
    function setAllowanceBalance(address _to, uint _amount) public onlyOwner {
        emit AllowanceChanged(msg.sender, _to, allowanceBalance[_to], _amount);
        allowanceBalance[_to] = _amount;
    }
    
    modifier ownerOrValidAmount(uint _amount) {
        require(_isOwner() || allowanceBalance[msg.sender] >= _amount, "Invalid operation");
        _;
    }

    function _decreaseBalance(address _to, uint _amount) internal {
        emit AllowanceChanged(msg.sender, _to, allowanceBalance[_to], allowanceBalance[_to] - _amount);
        allowanceBalance[_to] -= _amount;

        /*
            ** TODO: Learn to calculate / estimate or read through the opcodes of a function
            ** Either
            emit AllowanceChanged(msg.sender, _to, allowanceBalance[_to], allowanceBalance[_to] - _amount);
            allowanceBalance[_to] -= _amount;

            ** Or
            uint newAmount = allowanceBalance[_to] - _amount;
            emit AllowanceChanges(msg.sender, _to, allowanceBalance[_to], newAmount);
            allowanceBalance[_to] = newAmount;
        */
    }

    function _isOwner() internal view returns(bool) {
        return owner() == _msgSender();
    }
}
