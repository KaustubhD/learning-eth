pragma solidity ^0.8.7;

contract OwnerCanWithdraw {
    // Objective
    /*
        Pause the contract to allow no further withdraw
        Only the owner can pause or resume
        Only the owner can withdraw ether from the contract
    */
    bool public paused;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // Sort of like an event listener to the paying event
    function deposit() public payable {
    }

    function setPaused(bool _paused) public {
        require(msg.sender == owner, "Only owner can pause or resume the contract");
        paused = _paused;
    }

    function withdraw(address payable to) public {
        require(to == owner, "Only owner can withdraw money from this contract");
        require(!paused, "Contract is paused at the moment");
        to.transfer(address(this).balance);
    }

    // Destroy a smart contract and send the remaining funds to the passed address
    function destroy(address payable to) public {
        require(owner == to, "Only owner can destroy a smart contract");
        selfdestruct(to);
    }
}
