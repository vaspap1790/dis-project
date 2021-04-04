import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listPacketDetails } from '../actions/packetActions';

const PacketScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const packetDetails = useSelector((state) => state.packetDetails);
  const { loading, error, packet } = packetDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listPacketDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
              <ListGroup.Item>
                Description: ${packet.description}
              </ListGroup.Item>
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
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={cartItems.find(
                      (cartItem) => cartItem.packet === packet._id
                    )}
                    title={
                      cartItems.find(
                        (cartItem) => cartItem.packet === packet._id
                      )
                        ? 'You have already added this item to your Cart'
                        : 'Add this item to your Cart'
                    }
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PacketScreen;
