import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Packet from '../components/Packet';
import axios from 'axios';

const HomeScreen = () => {
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const fetchPackets = async () => {
      const { data } = await axios.get('/api/packets');
      setPackets(data);
    };
    fetchPackets();
  }, []);

  return (
    <>
      <h1>Latest Packets</h1>
      <Row>
        {packets.map((packet) => (
          <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
            <Packet packet={packet} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
