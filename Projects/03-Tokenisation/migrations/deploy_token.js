const Token = artifacts.require('UnoToken.sol');

module.exports = function(deployer) {
  deployer.deploy(Token, 100000);
}