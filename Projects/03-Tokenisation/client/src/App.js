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

      this.setState({ ...this.state, isLoaded: true, tokenSaleAddress: tokenSaleContractAddress, tokenAddress: tokenContractAddress})
      console.log(this.state)
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
        <div>
          <p>
            To buy Uno, please send ether to {this.state.tokenSaleAddress}
          </p>
          <p>
            1 UNO = 1 wei (10<sup>18</sup> eth)
          </p>
          <p>
            To see your UNO tokens in metamask add the token using address: {this.state.tokenAddress}
          </p>
        </div>
      </div>
    )
  }
}

export default App
