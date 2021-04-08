import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert } from 'react-bootstrap';
import Packet from '../components/Packet';
import Loader from '../components/Loader';
import { listPackets } from '../actions/packetActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const packetList = useSelector((state) => state.packetList);
  const { loading, error, packets } = packetList;

  useEffect(() => {
    dispatch(listPackets());
  }, [dispatch]);

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
