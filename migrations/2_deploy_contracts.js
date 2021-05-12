var Registry = artifacts.require('./Registry.sol');
var DataDappContract = artifacts.require('./DataDappContract.sol');
var TestDataDappContract = artifacts.require('./TestDataDappContract.sol');

module.exports = function (deployer) {
  deployer.deploy(Registry);
  deployer.deploy(DataDappContract);
  deployer.deploy(TestDataDappContract);
};
