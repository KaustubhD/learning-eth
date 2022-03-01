// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Allowance is Ownable {
    mapping(address => uint) public allowanceBalance;

    // Set how much a user is allowed to withdraw
    function setAllowanceBalance(address _to, uint _amount) public onlyOwner {
        allowanceBalance[_to] = _amount;
    }
        modifier ownerOrValidAmount(uint _amount) {
        require(_isOwner() || allowanceBalance[msg.sender] >= _amount, "Invalid operation");
        _;
    }

    function _decreaseBalance(address _to, uint _amount) internal {
        allowanceBalance[_to] -= _amount;
    }

    function _isOwner() internal view returns(bool) {
        return owner() == _msgSender();
    }
}
