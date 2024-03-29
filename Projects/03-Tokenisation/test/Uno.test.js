const dotenv = require('dotenv').config({ path: '../.env' })
const TokenContract = artifacts.require('UnoToken')
const chai = require('./chai-setup')

const BN = web3.utils.BN
const expect = chai.expect


contract('Token test', async (accounts) => {
  const totalSupply = new BN(process.env.TOKEN_TOTAL_SUPPLY)
  const [deployerAccount, recipientAccount, anotherAccount] = accounts
  let instance

  beforeEach(async () => {
    instance = await TokenContract.new(totalSupply)
  })


  it('Should contain all tokens in creator account', async () => {  
    expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply)
  })

  it('Is possible to transfer tokens between accounts', async () => {
    const numTokens = 1
    const senderBalance = await instance.balanceOf(deployerAccount)
    const recipientBalance = await instance.balanceOf(recipientAccount)
    
    await instance.transfer(recipientAccount, numTokens)
    const newSenderBalance = await instance.balanceOf(deployerAccount)
    const newRecipientBalance = await instance.balanceOf(recipientAccount)

    expect(newSenderBalance).to.be.a.bignumber.equal(senderBalance.sub(new BN(numTokens)))
    expect(newRecipientBalance).to.be.a.bignumber.equal(recipientBalance.add(new BN(numTokens)))
  })

  it('Is not possible to send more token than totalSupply', async () => {
    await expect(instance.transfer(recipientAccount, totalSupply.add(new BN(1)))).to.eventually.be.rejected
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
  })
})