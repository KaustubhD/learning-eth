const dotenv = require('dotenv').config({ path: '../.env' })
const Token = artifacts.require('UnoToken')
const TokenSale = artifacts.require('UnoTokenSale')

module.exports = async function(deployer) {
  const totalSupply = process.env.TOKEN_TOTAL_SUPPLY
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(Token, totalSupply)
  await deployer.deploy(TokenSale, 1, addresses[0], Token.address)

  const tokenInstance = await Token.deployed()
  await tokenInstance.transfer(TokenSale.address, totalSupply)

}