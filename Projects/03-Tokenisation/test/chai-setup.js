const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const BN = web3.utils.BN
const chaiBN = require('chai-bn')(BN)
const expect = chai.expect
chai
  .use(chaiBN)
  .use(chaiAsPromised)

module.exports = chai