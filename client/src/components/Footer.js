import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='bg-dark'>
      <Container fluid className='px-5 py-4'>
        <Row className='mt-2'>
          <Col xs={4} className='d-flex flex-column align-items-center'>
            <div className='p-1 link-icon blue-hover text-uppercase small'>
              About Us
            </div>
            <div className='p-1 link-icon blue-hover text-uppercase small'>
              Home
            </div>
            <div className='p-1 link-icon blue-hover text-uppercase small'>
              Why dataDapp?
            </div>
          </Col>
          <Col
            xs={4}
            className='d-flex justify-content-center align-items-center'
          >
            <i className='fab fa-github p-2 link-icon blue-hover fa-2x'></i>
            <i className='fab fa-linkedin p-2 link-icon blue-hover fa-2x'></i>
            <i className='fab fa-twitter p-2 link-icon blue-hover fa-2x'></i>
          </Col>
          <Col xs={4} className='d-flex flex-column align-items-center'>
            <div className='p-1 link-icon blue-hover text-uppercase small'>
              Terms and Conditions
            </div>
            <div className='p-1 link-icon blue-hover text-uppercase small'>
              Privacy
            </div>
            <div className='p-1 link-icon blue-hover text-uppercase small'>
              What is next?
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className='d-flex'></Col>
          <Col xs={4} className='d-flex flex-column align-items-center'>
            <div className='p-1 link-icon blue-hover my-4 text-uppercase small'>
              Contact Us
            </div>
            <div className='p-1 text-uppercase small'>
              &copy; 2021 dataDapp | All Rights Reserved
            </div>
          </Col>
          <Col xs={4} className='d-flex'></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
