const DataDappContract = artifacts.require('./DataDappContract.sol');

const encryptedKeysHashed = [
  '0xb4177e1d1855a0a6d50291c02e48755378261c4114e8c5ad6ddb85b5f81fa62c',
  '0xcc58eb3067fadb2c605f4b2460c146bb45539514dd7c4e74118b5de02a212da7'
];

const encryptedKeys = [
  'f00219d7065adf16ecd6d376188e4d0403d1a88af90ede5303bb2b580ba8dac37c13952d0883a8329b49d22e2f6a82edb829241e5f658d0c544b23a91aadc94734e8cf1d227f7c7c11ef71fe664d322c2d64a2a6d60fbf6c03a8aba60fa5c03703',
  '2104cd2c1fb3d56e703a1eda3c01386b028ab452cda3b3492bce5e91db2f2ff055a4ad01f815f5153ab4ad81528517c069ccaeba1bbc5125febed4f215c41c07e8acb9332342b5a5c0fd407eae55bfd583d024706ab097849170806f6a8c85c88c'
];

/////////////////////////////////// Tests \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
contract('DataDappContract', (accounts) => {
  // Check registered() modifier
  it('...should throw if user is not registered', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();
    try {
      const result = await dataDappContract.addUpload(
        'user1',
        'packet1',
        [1, 2],
        {
          from: accounts[0]
        }
      );
    } catch (error) {
      assert(error, 'User is not registered.');
    }
  });

  // Check receive() function
  it('...should deposit successfully', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();

    const account1BalanceBefore = await web3.eth.getBalance(accounts[1]);
    let deposit1 = await dataDappContract.sendTransaction({
      from: accounts[1],
      to: contract._address,
      value: web3.utils.toWei('5', 'ether')
    });

    assert.equal(
      deposit1.logs[0].args.deposit.toString(),
      web3.utils.toWei('5', 'ether'),
      'Deposit1 failed - DepositEvent'
    );

    let deposit2 = await dataDappContract.sendTransaction({
      from: accounts[1],
      to: contract._address,
      value: web3.utils.toWei('5', 'ether')
    });

    assert.equal(
      deposit2.logs[0].args.deposit.toString(),
      web3.utils.toWei('10', 'ether'),
      'Deposit2 failed - DepositEvent'
    );

    const account1BalanceAfter = await web3.eth.getBalance(accounts[1]);
    assert.notDeepEqual(
      account1BalanceAfter,
      account1BalanceBefore,
      'Money not extracted from account1'
    );
  });

  // Check addUpload() function
  it('...should upload a packet successfully', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();

    await dataDappContract.registerUser('user1', {
      from: accounts[0]
    });

    const upload = await dataDappContract.addUpload(
      'user1',
      'packet1',
      ['hash1', 'hash2'],
      {
        from: accounts[0]
      }
    );

    assert.equal(
      upload.logs[0].args[0].ownerAddress,
      accounts[0],
      'Upload failed - UploadResult Event'
    );

    // const getter = await dataDappContract.uploads.call(
    //   keccak256_encodePacked('packet1')
    // );

    // assert.equal(getter.ownerAddress, accounts[0], 'Upload failed - Getter');
  });

  // Check addSampleRequest() function
  it('...should request for a sample successfully', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();

    // Register the requester
    await dataDappContract.registerUser('user2', {
      from: accounts[1]
    });

    // Request for sample
    const sampleRequest = await dataDappContract.addSampleRequest(
      'user2',
      'packet1',
      encryptedKeysHashed,
      {
        from: accounts[1]
      }
    );
    assert.equal(
      sampleRequest.logs[0].args.requester,
      accounts[1],
      'Sample request failed - SampleRequestResult Event'
    );
  });

  // Check addPurchase() function - owner rejection
  it('...should return money to requester', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();

    const account1BalanceBefore = await web3.eth.getBalance(accounts[1]);
    const purchase = await dataDappContract.addPurchase(
      'user1',
      'packet1',
      accounts[1],
      encryptedKeys,
      web3.utils.toWei('5', 'ether'),
      false,
      {
        from: accounts[0]
      }
    );

    assert.equal(
      purchase.logs[0].args.depositRequester.toString(),
      web3.utils.toWei('5', 'ether'),
      'Return money failed - ReturnMoneyEvent'
    );
    const account1BalanceAfter = await web3.eth.getBalance(accounts[1]);
    assert.isTrue(
      Number(account1BalanceAfter) > Number(account1BalanceBefore),
      'Money not transfered to account1'
    );
  });

  // Check addPurchase() function - owner approval
  it('...should transfer money to owner', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();

    const account0BalanceBefore = await web3.eth.getBalance(accounts[0]);
    const purchase = await dataDappContract.addPurchase(
      'user1',
      'packet1',
      accounts[1],
      encryptedKeys,
      web3.utils.toWei('5', 'ether'),
      true,
      {
        from: accounts[0]
      }
    );

    assert.equal(
      purchase.logs[0].args.depositRequester.toString(),
      0,
      'Send money failed - SendMoneyEvent'
    );

    const account0BalanceAfter = await web3.eth.getBalance(accounts[0]);
    assert.isTrue(
      Number(account0BalanceAfter) > Number(account0BalanceBefore),
      'Money not transfered to account0'
    );
  });

  // Check itemNotSold() - modifier
  it('...should throw if item has been sold', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();
    try {
      const purchase = await dataDappContract.addPurchase(
        'user1',
        'packet1',
        accounts[1],
        encryptedKeys,
        web3.utils.toWei('5', 'ether'),
        true,
        {
          from: accounts[0]
        }
      );
    } catch (error) {
      assert(error, 'Item has been sold');
    }
  });

  // Check addReview() - function
  it('...should store a review successfully', async () => {
    // Get Contract DataDappContract instance
    const dataDappContract = await DataDappContract.deployed();

    const review = await dataDappContract.addReview(
      'user1',
      'user2',
      4,
      'Really good data packet',
      {
        from: accounts[1]
      }
    );

    assert.equal(
      review.logs[0].args[0].reviewer,
      'user2',
      'Add review failed - ReviewResult'
    );
  });
});
