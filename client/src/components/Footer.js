import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-dark'>
      <Container fluid className='px-5 py-4'>
        <Row>
          <Col xs={4} className='d-flex flex-column align-items-center'>
            <div className='p-2'>Flex item 1</div>
            <div className='p-2'>Flex item 2</div>
            <div className='p-2'>Flex item 3</div>
          </Col>
          <Col
            xs={4}
            className='d-flex justify-content-center align-items-center'
          >
            <div className='p-2'>Flex item 1</div>
            <div className='p-2'>Flex item 2</div>
            <div className='p-2'>Flex item 3</div>
          </Col>
          <Col xs={4} className='d-flex flex-column align-items-center'>
            <div className='p-2'>Flex item 1</div>
            <div className='p-2'>Flex item 2</div>
            <div className='p-2'>Flex item 3</div>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className='d-flex'></Col>
          <Col xs={4} className='d-flex flex-column align-items-center'>
            <div className='p-2'>Flex item 1</div>
            <div className='p-2'>Flex item 2</div>
            <div className='p-2'>Flex item 3</div>
            <div className='p-2'>&copy; Data Dapp</div>
          </Col>
          <Col xs={4} className='d-flex'></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
