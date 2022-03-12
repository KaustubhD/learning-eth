const TokenContract = artifacts.require('UnoToken')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const BN = web3.utils.BN
const chaiBN = require('chai-bn')(BN)
const expect = chai.expect
chai
	.use(chaiBN)
  .use(chaiAsPromised)


contract('Token test', async (accounts) => {
  it('Should contain all token in creator account', async () => {
    const instance = await TokenContract.deployed()
    const totalSupply = await instance.totalSupply()
    expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply)
  })
})