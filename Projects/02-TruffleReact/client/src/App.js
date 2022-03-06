import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    isLoaded: false,
    itemName: '',
    itemPrice: 0
 };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      this.accounts = await web3.eth.getAccounts();
      this.networkId = await web3.eth.net.getId();
      
      this.itemManagerInstance = new web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId]?.address
      );
      this.itemInstance = new web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId]?.address
      );

      this.listenBlockChainEvents();
      this.setState({ ...this.state, isLoaded: true });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  listenBlockChainEvents = async () => {
    this.itemManagerInstance.events.SupplyChainStep.on('data', async (evt) => {
      const itemIndex = evt.returnValues._itemIndex;
      let itemObj = this.itemManagerInstance.methods.items(itemIndex).call();

      alert(`Item ${itemObj._id} was paid for. Ready for delivery`);
    })
  }

  handleCreateItem = async (event) => {
    const {itemName, itemPrice} = this.state;
    console.log(`Item creating. Name: ${itemName}, Price: ${itemPrice} wei`);
    const result = await this.itemManagerInstance.methods
      .createItem(itemName, itemPrice)
      .send({ from: this.accounts[0] });
    
    alert(`Send ${itemPrice} wei to ${result.events.SupplyChainStep.returnValues._itemAddress}`);
  }

  handleInputChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <h1>Supply chain!</h1>
        <div>
          <h2>Add item</h2>
          <label>
            Item Name: 
            <input type="text" name="itemName" placeholder="example_1" value={this.state.itemName} onChange={this.handleInputChange} />
          </label>
          <label>
            Item Price (in Wei): 
            <input type="number" name="itemPrice" value={this.state.itemPrice} onChange={this.handleInputChange} />
          </label>
          <button onClick={this.handleCreateItem}>Add Item</button>
        </div>
      </div>
    )
  }
}

export default App;
