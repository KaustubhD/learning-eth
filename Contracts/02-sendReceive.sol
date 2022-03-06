pragma solidity ^0.8.7;

contract sendReceive {
    uint public balance;

    // Either this or default getter. Both works
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function transferToContract() public payable {
        // event object msg
        balance += msg.value;
    }

    function transferEverythingFromContract() public {
        address payable to = payable(msg.sender);
        uint amountToTransfer = this.getBalance();
        to.transfer(amountToTransfer);
        balance -= amountToTransfer;   
    }

    function transferFromContractTo(address payable to) public {
        uint amountToTransfer = this.getBalance();
        to.transfer(amountToTransfer);
        balance -= amountToTransfer; 
    }

}
