const Registry = artifacts.require('./Registry.sol');
const Web3 = require('web3');

/////////////////////////////////// Utils \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
let web3 = new Web3(provider);

/////////////////////////////////// Tests \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
contract('Registry', (accounts) => {
  // Check registerUser() function
  it('...should register a user', async () => {
    // Get Contract Registry instance
    const registryInstance = await Registry.deployed();

    const result = await registryInstance.registerUser('user1', {
      from: accounts[0]
    });

    assert.equal(
      result.logs[0].args._id,
      'user1',
      'User with id user1 not registered - Register Event'
    );
  });
});
