// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ItemManager {
    
    enum SupplyChainState {
        Created,
        Paid,
        Delivered
    }

    struct Item {
        string _id;
        uint _price;
        ItemManager.SupplyChainState _state;
    }
    
    mapping(uint => Item) public items;
    uint itemIndex;

    event SupplyChainStep(uint _index, uint step);

    constructor() {

    }

    function createItem(string memory _id, uint _price) public {
        items[itemIndex]._id = _id;
        items[itemIndex]._price = _price;
        items[itemIndex]._state = SupplyChainState.Created;
        
        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state));
        
        itemIndex++;
    }

    function triggerPayment(uint _index) public payable {
        require(items[_index]._price == msg.value, "Only full payment is accepted for items");
        require(items[_index]._state == SupplyChainState.Created, "Item already paid for");

        items[_index]._state = SupplyChainState.Paid;
        
        emit SupplyChainStep(_index, uint(items[_index]._state));
    }

    function triggerDelivery(uint _index) public {
        require(items[_index]._state < SupplyChainState.Paid, "Item not yet paid for");
        require(items[_index]._state > SupplyChainState.Paid, "Item already further in the chain");

        items[_index]._state = SupplyChainState.Delivered;
        
        emit SupplyChainStep(_index, uint(items[_index]._state));
    }
}