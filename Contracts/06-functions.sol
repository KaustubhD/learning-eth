// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Functions {
    mapping(address => uint) public balanceReceived;

    address payable owner;

    /*
    **  Called once during deployment
    **  Either public or internal
    */
    constructor() {
        owner = payable(msg.sender);
    }

    function destroyContract() public payable {
        require(msg.sender == owner, "Only owner can perform this action");
        selfdestruct(owner);
    }

    function sendToContract() public payable {
        assert(balanceReceived[msg.sender] + msg.value >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += msg.value;
    }

    function withdrawFromContract(address payable _to, uint _amount) public {
        require(_amount <= balanceReceived[msg.sender], "not enough funds");
        assert(balanceReceived[msg.sender] >= balanceReceived[msg.sender] - _amount);
        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);
    }

    /*
    **  View function
    **  Interacts with variables in a readonly state
    **  Can not call writable functions
    **  Can call other view functions and pure functions
    */
    function getOwner() public view returns(address) {
        return owner;
    }

    /*
    **  Pure function
    **  Doesn't interact with any contract variables (read or write)
    **  Scope generally limits to the function body
    **  Can only call other pure functions
    */
    function convertWeiToEther(uint _amount) public pure returns(uint) {
        return _amount / 1 ether;
    }

    /*
    **  Fallback function
    **  Has no name
    **  Works when transaction without a function call is sent to the contract
    **  Kind of like a catch all function
    **  Only works with external
    **  Eg. This will be called when we send money to this contract from metamask    
    */
    fallback () external payable {
        sendToContract();
    }
}
