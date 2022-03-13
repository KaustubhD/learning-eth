require('dotenv').config({ path: '.env' })
const path = require("path")
const HDWalletProvider = require('@truffle/hdwallet-provider')

const accountIndex = 0

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ganache: {
      network_id: '5777',
      provider: new HDWalletProvider(process.env.MNEMONIC, 'http://127.0.0.1:7545', accountIndex)
    }
  },
  compilers: {
    solc: {
      version: '0.8.1'
    }
  }
}
