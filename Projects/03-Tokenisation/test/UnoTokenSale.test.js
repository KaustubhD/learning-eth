const TokenContract = artifacts.require('UnoToken')
const TokenSaleContract = artifacts.require('UnoTokenSale')
const chai = require('./chai-setup')

const BN = web3.utils.BN
const expect = chai.expect

contract('Token sale test', async (accounts) => {
  
  const [deployerAccount, recipientAccount, anotherAccount] = accounts

  it('Should not contain any tokens in the deployer account', async () => {
    const instance = await TokenContract.deployed()

    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0))
  })
  
  it('Should contain all tokens in the crowdsale contract', async () => {
    const tokenInstance = await TokenContract.deployed()
    const tokenSaleInstance = await TokenSaleContract.deployed()
    const totalSupply = await tokenInstance.totalSupply()

    await expect(tokenInstance.balanceOf(tokenSaleInstance.address)).to.eventually.be.a.bignumber.equal(totalSupply)
  })

  it('Should be able to buy tokens', async () => {
    const tokenInstance = await TokenContract.deployed()
    const tokenSaleInstance = await TokenSaleContract.deployed()
    const balanceBefore = await tokenInstance.balanceOf(deployerAccount)
    const numTokens = web3.utils.toWei('1', 'wei')

    await expect(tokenSaleInstance.sendTransaction({ from: deployerAccount, value: numTokens})).to.eventually.be.fulfilled
    await expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(numTokens)))
  })
})