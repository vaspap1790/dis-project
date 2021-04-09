import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Alert
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { listPacketDetails } from '../actions/packetActions';

const PacketScreen = ({ history, match }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const packetDetails = useSelector((state) => state.packetDetails);
  const { loadingDetails, error, packet } = packetDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPacketDetails(match.params.id));
  }, [dispatch, match]);

  // Component Methods
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };

  // This will be rendered
  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      {loadingDetails ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row>
          <Col md={6} className='pr-0'>
            <Image src={packet.image} alt={packet.name} fluid />
          </Col>
          <Col md={6}>
            <Row className='d-flex'>
              <Col
                md={{ span: 12, order: 'last' }}
                lg={{ span: 6, order: 'first' }}
                className='pr-0'
              >
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
                  <ListGroup.Item>Category: {packet.category}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {packet.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col
                md={{ span: 12, order: 'first' }}
                lg={{ span: 6, order: 'last' }}
              >
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <i className='fab fa-ethereum'></i>
                          {packet.price}
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
          </Col>
        </Row>
      )}
    </>
  );
};

export default PacketScreen;
