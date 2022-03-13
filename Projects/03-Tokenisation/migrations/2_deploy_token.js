const Token = artifacts.require('UnoToken')
const TokenSale = artifacts.require('UnoTokenSale')

module.exports = async function(deployer) {
  const totalSupply = 100000
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(Token, totalSupply)
  await deployer.deploy(TokenSale, 1, addresses[0], Token.address)

  const tokenInstance = await Token.deployed()
  await tokenInstance.transfer(TokenSale.address, totalSupply)

}