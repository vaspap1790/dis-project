import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert, Button, Jumbotron } from 'react-bootstrap';
import Packet from '../components/Packet';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import PacketCarousel from '../components/PacketCarousel';

import { listPackets } from '../actions/packetActions';

const HomeScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  // App level State
  const packetList = useSelector((state) => state.packetList);
  const { loading, error, packets, pages, page } = packetList;

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPackets(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // Component Methods
  const goBack = () => {
    history.goBack();
  };

  // This will be rendered
  return (
    <>
      <Meta />
      {!keyword ? (
        <Row>
          <Col sm={7}>
            <PacketCarousel />
          </Col>
          <Col sm={5}>
            <Jumbotron style={{ marginBottom: '-10rem' }} className='py-4'>
              <h1 style={{ zIndex: 5, position: 'relative' }}>
                Welcome to Data Dapp, people of Ethereum{' '}
                <i className='fab fa-ethereum jm fa-10x'></i>
              </h1>
              <p
                style={{
                  zIndex: 5,
                  position: 'relative',
                  textAlign: 'justify'
                }}
                className='mb-4'
              >
                This is a Decentralised Ethereum based Data Marketplace. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                aute irure dolor in reprehenderit.
              </p>
              <p>
                <Button
                  className='btn-primary'
                  onClick={() => history.push('/aboutUs')}
                >
                  Learn more
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      ) : (
        <Button className='btn btn-primary my-3' onClick={goBack}>
          Go Back
        </Button>
      )}
      <h1 className='mb-0 pt-4 pb-0'>Explore Data Packets</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger' style={{ width: '30vw' }}>
          {error}
        </Alert>
      ) : (
        <>
          <Row>
            {packets.map((packet) => (
              <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
                <Packet packet={packet} isProfile={true} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
