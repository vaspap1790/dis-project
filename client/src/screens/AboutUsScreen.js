import React from 'react';
import { Button, Row } from 'react-bootstrap';
import Meta from '../components/Meta';

const AboutUsScreen = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Meta title='Data Dapp | About Us' />
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
      </Row>

      {/************************************** Main Screen ****************************************/}
    </>
  );
};

export default AboutUsScreen;
