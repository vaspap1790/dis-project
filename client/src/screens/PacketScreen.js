import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const PacketScreen = ({ match }) => {
  const [packet, setPacket] = useState({});

  useEffect(() => {
    const fetchPacket = async () => {
      const { data } = await axios.get(`/api/packets/${match.params.id}`);
      setPacket(data);
    };
    fetchPacket();
  }, [match]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={packet.image} alt={packet.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{packet.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={packet.rating}
                text={`${packet.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${packet.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${packet.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${packet.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button'>
                  Purchase
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PacketScreen;
