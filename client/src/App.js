import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import PacketScreen from './screens/PacketScreen';
import CreatePacketScreen from './screens/CreatePacketScreen';
import UpdatePacketScreen from './screens/UpdatePacketScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import AboutUsScreen from './screens/AboutUsScreen';

import DataDappContract from './contracts/DataDappContract.json';
import getWeb3 from './getWeb3';

const App = () => {
  // Component level State
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [account, setAccount] = useState(null);
  const [dataDappContract, setDataDappContract] = useState(null);

  // Metamask Wallet: handle account changes
  const getAccount = async () => {
    const accounts = await ethereum.enable();
    setAccount(accounts[0]);
  };
  const ethereum = window.ethereum;
  if (ethereum) {
    ethereum.on('accountsChanged', function (accounts) {
      getAccount();
    });
  }

  // Hook that triggers when component did mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Get network provider and web3 instance
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        // Use web3 to get the accounts
        const accountsInstance = await web3Instance.eth.getAccounts();
        setAccounts(accountsInstance);
        setAccount(accountsInstance[0]);

        // Get the network id
        const networkId = await web3Instance.eth.net.getId();

        // Get contract instance
        const dataDappContractInstance = new web3Instance.eth.Contract(
          DataDappContract.abi,
          DataDappContract.networks[networkId] &&
            DataDappContract.networks[networkId].address
        );
        setDataDappContract(dataDappContractInstance);

        // Listen to contract events
        dataDappContractInstance.events
          .DepositEvent()
          .on('data', async function (evt) {
            console.log(evt);
          });
      } catch (error) {
        console.log(
          'Failed to load web3, accounts, or contract. Check console for details.'
        );
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Header account={account} contract={dataDappContract} />
      <main className='py-3'>
        <Container fluid className='px-5'>
          <Route path='/login' component={LoginScreen} />
          <Route
            path='/register'
            render={(props) => (
              <RegisterScreen
                {...props}
                account={account}
                contract={dataDappContract}
              />
            )}
          />
          <Route path='/editDetails' component={RegisterScreen} />
          <Route path='/aboutUs' component={AboutUsScreen} />
          <Route
            path='/profile/:id?'
            render={(props) => (
              <ProfileScreen
                {...props}
                account={account}
                contract={dataDappContract}
              />
            )}
          />
          <Route
            path='/packet/:id'
            render={(props) => (
              <PacketScreen
                {...props}
                account={account}
                contract={dataDappContract}
              />
            )}
          />
          <Route
            path='/packets/create'
            render={(props) => (
              <CreatePacketScreen
                {...props}
                account={account}
                contract={dataDappContract}
              />
            )}
          />
          <Route path='/packets/update/:id' component={UpdatePacketScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
