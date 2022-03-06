// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ItemManager.sol";

contract Item {
    uint public price;
    uint public index;
    bool public isPaid;

    ItemManager managerContract;

    constructor(ItemManager _managerContract, uint _price, uint _index) {
        managerContract = _managerContract;
        price = _price;
        index = _index;
    }

    receive() external payable {
        // Uses more gas
        // address(managerContract).transfer(msg.value);
        
        require(!isPaid, "Item is already paid for");
        require(price == msg.value, "Only full payments accepted");
        
        (bool success, ) = address(managerContract).call{value: msg.value}
            (abi.encodeWithSignature("triggerPayment(uint256)", index));
        
        require(success, "The transaction wasn't successful. Cancelling...");

        isPaid = true;
    }

    fallback() external {

    }
}