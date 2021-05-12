const Registry = artifacts.require('./Registry.sol');

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
      'User not registered - Register Event'
    );
  });
});
