import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert } from 'react-bootstrap';
import Packet from '../components/Packet';
import Loader from '../components/Loader';
import { listPackets } from '../actions/packetActions';

const HomeScreen = () => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const packetList = useSelector((state) => state.packetList);
  const { loading, error, packets } = packetList;

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPackets());
  }, [dispatch]);

  // This will be rendered
  return (
    <>
      <h1>Latest Packets</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row>
          {packets.map((packet) => (
            <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
              <Packet packet={packet} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
