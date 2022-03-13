import React, { Component } from 'react'
import getWeb3 from './getWeb3'

import TokenContract from './contracts/UnoToken.json'
import TokenSaleContract from './contracts/UnoTokenSale.json'
import KycContract from './contracts/Kyc.json'
import './App.css'

class App extends Component {
  state = {
    isLoaded: false,
    kycAddress: '',
    tokenBalance: 0,
    numTokensToBuy: 0
  }

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3()
      this.accounts = await this.web3.eth.getAccounts()

      const networkId = await this.web3.eth.net.getId()

      const tokenContractAddress = TokenContract.networks[networkId] && TokenContract.networks[networkId].address
      this.tokenInstance = new this.web3.eth.Contract(
        TokenContract.abi,
        tokenContractAddress
      )
        
      const tokenSaleContractAddress = TokenSaleContract.networks[networkId] && TokenSaleContract.networks[networkId].address
      this.tokenSaleInstance = new this.web3.eth.Contract(
        TokenSaleContract.abi,
        tokenSaleContractAddress
      )
        
      const kycAddress = KycContract.networks[networkId] && KycContract.networks[networkId].address
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        kycAddress
      )

      this.listenToTokenTransferEvent()

      this.setState({
        ...this.state,
        isLoaded: true,
        tokenSaleAddress: tokenSaleContractAddress,
        tokenAddress: tokenContractAddress,
      }, this.updateTokenBalance)
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  handleInputChange = async (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      ...this.state,
      [name]: value,
    })
  }

  listenToTokenTransferEvent = () => {
    this.tokenInstance.events.Transfer({to: this.accounts[0]}).on('data', this.updateTokenBalance)
  }

  updateTokenBalance = async () => {
    let tokenBalance = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call()
    this.setState({
      ...this.state,
      tokenBalance
    })
  }

  handleKycWhitelist = async () => {
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({ from: this.accounts[0] })
    console.log('KYC completed for ' + this.state.kycAddress)
  }

  handleBuyToken = async () => {
    if (this.state.numTokensToBuy <= 0)
      alert('Stop playing and enter a valid value')
    
    this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: this.state.numTokensToBuy.toString() })
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className='App'>
        <h1>Uno Token crowdsale</h1>
        <p>
          1 UNO = 1 wei (10<sup>18</sup> eth)
        </p>
        <div id="container">
          <div id="id-div">
            <h3>KYC</h3>
            <p>Add address to allow purchase</p>
            <input type="text" name="kycAddress" value={this.state.kycAddress} placeholder="0x123" onChange={this.handleInputChange}/>
            <button onClick={this.handleKycWhitelist}>Add to whitelist</button>
          </div>
          <div id="buy-div">  
            <h3>How to buy</h3>
            <p>
              To buy Uno, please send ether to <pre>{this.state.tokenSaleAddress}</pre>
            </p>
            <p>
              Or enter number of tokens in the box<br />
              <input type="number" name="numTokensToBuy" value={this.state.numTokensToBuy} onChange={this.handleInputChange}/>
              <button onClick={this.handleBuyToken}>Buy tokens</button>
            </p>
          </div>
          <div id="add-token-div">
            <h3>How to view UNO in metamask ?</h3>
            <p>
              To see your UNO tokens in metamask add the token using address: <pre>{this.state.tokenAddress}</pre>
            </p>
          </div>
        <div id="balance-div">
          <h3>Balance</h3>
          <p>
            Your balance: {this.state.tokenBalance} UNO
          </p>
        </div>
        </div>
      </div>
    )
  }
}

export default App
