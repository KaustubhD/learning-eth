const Token = artifacts.require('UnoToken');

module.exports = function(deployer) {
  deployer.deploy(Token, 100000);
}