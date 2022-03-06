pragma solidity ^0.8.7;

contract Mapping2 {
    struct Payment {
        uint amount;
        uint timestamp;
    }
    struct Balance {
        uint totalBalance;
        uint numPayments;
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balanceReceived;

    function getBalance() public view returns(uint) {
        return balanceReceived[msg.sender].totalBalance;
    }

    function sendMoney() public {
        Payment memory newPayment = Payment(msg.value, now);
        balanceReceived[msg.sender].numPayments++;
        balanceReceived[msg.sender].totalBalance += msg.value;
        balanceReceived[msg.sender][numPayments - 1] = newPayment;

    }
}
