import React, { Component } from 'react'
import getWeb3 from './getWeb3'

import TokenContract from './contracts/UnoToken.json'
import TokenSaleContract from './contracts/UnoTokenSale.json'
import KycContract from './contracts/Kyc.json'
import './App.css'

class App extends Component {
  state = { isLoaded: false, kycAddress: '' }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId()
      // const deployedNetwork = await t
      this.tokenInstance = new this.web3.eth.Contract(
        TokenContract.abi,
        TokenContract.networks[networkId] && TokenContract.networks[networkId].address
      )
      this.tokenSaleInstance = new this.web3.eth.Contract(
        TokenSaleContract.abi,
        TokenSaleContract.networks[networkId] && TokenSaleContract.networks[networkId].address
      )
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[networkId] && KycContract.networks[networkId].address
      )

      this.setState({ ...this.state, isLoaded: true })
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

  handleKycWhitelist = async () => {
    console.log(this.accounts)
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({ from: this.accounts[0] })
    console.log('KYC completed for ' + this.state.kycAddress)
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className='App'>
        <h1>Uno Token crowdsale</h1>
        <div>
          <span>Add address to allow purchase</span>
          <input type="text" name="kycAddress" value={this.state.kycAddress} placeholder="0x123" onChange={this.handleInputChange}/>
          <button onClick={this.handleKycWhitelist}>Add to whitelist</button>
        </div>
      </div>
    )
  }
}

export default App
