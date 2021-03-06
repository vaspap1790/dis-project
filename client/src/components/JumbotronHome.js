import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JumbotronHome = () => {
  return (
    <Jumbotron className='py-4 mb-n5'>
      <h1 style={{ zIndex: 5, position: 'relative' }}>
        Welcome to Data Dapp, people of Ethereum{' '}
        <i className='fab fa-ethereum eth-jumbo fa-10x'></i>
      </h1>
      <p
        style={{
          zIndex: 5,
          position: 'relative',
          textAlign: 'justify'
        }}
        className='mb-4'
      >
        This is a Decentralised Ethereum based Data Marketplace. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in
        reprehenderit.
      </p>
      <p>
        <Link to={'/aboutUs'}>
          <Button className='btn-primary' title='Learn more about Data Dapp'>
            Learn more
          </Button>
        </Link>
      </p>
    </Jumbotron>
  );
};

export default JumbotronHome;
