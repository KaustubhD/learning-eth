pragma solidity ^0.8.7;

contract Variables {
    uint256 public intVar;
    // uint is an alias for uint256
    function setIntVar(uint _intVar) public {
        intVar = _intVar;
    }

    bool public boolVar;
    function setBoolVar(bool _boolVar) public {
        boolVar = _boolVar;
    }

    // Integers wrap around
    // No longer wrap from v0.8.0 onwards
    // uint8 ranges from [0, 255]
    uint8 public wrapVar;
    function incrementWrapVar() public {
        wrapVar++;
    }
    function decrementWrapVar() public {
        wrapVar--;
    }

    address public addressVar;
    function setAddressVar(address _addressVar) public {
        addressVar = _addressVar;
    }
    function getBalance() public view returns(uint256) {
        return addressVar.balance;
    }
}
