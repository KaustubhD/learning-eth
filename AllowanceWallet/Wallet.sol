// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Wallet is Ownable {

    mapping(address => uint) public allowance;

    // Set how much a user is allowed to withdraw
    function setAllowanceAmount(address _to, uint _amount) public onlyOwner {
        allowance[_to] = _amount;
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrValidAmount(_amount) {
        _to.transfer(_amount);
    }

    modifier ownerOrValidAmount(uint _amount) {
        require(owner() == _msgSender() || allowance[msg.sender] >= _amount, "Invalid operation");
        _;
    }

    receive() external payable {

    }
    
    fallback() external payable {

    }
}
