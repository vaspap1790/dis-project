import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Alert } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addNewAccess, emptySuccess } from '../actions/accessActions';

const CartScreen = ({ match, history }) => {
  const packetId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems, cartLoading } = cart;

  const accessAdd = useSelector((state) => state.accessAdd);
  const { access, success, error, loadingAccess } = accessAdd;

  useEffect(() => {
    if (packetId) {
      dispatch(addToCart(packetId));
    }
  }, [dispatch, packetId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push(`/cart`);
  };

  const purchaseHandler = (id) => {
    dispatch(addNewAccess(id));
  };

  const handleOnClose = () => {
    dispatch(emptySuccess());
  };

  return (
    <>
      {cartLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col>
            <h1>
              Shopping Cart{' '}
              {cartItems.length !== 0 ? (
                <span className='text-muted small'>
                  Subtotal ({cartItems.length}) items{' '}
                  <i className='fab fa-ethereum'></i>
                  {cartItems
                    .reduce((acc, item) => acc + item.price, 0)
                    .toFixed(2)}
                </span>
              ) : null}
            </h1>
            {error && <Message variant='danger'>{error}</Message>}
            {success && (
              <Alert
                variant='success'
                onClose={() => {
                  handleOnClose();
                }}
                dismissible
              >
                You successfully purchased the item
              </Alert>
            )}
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is empty{' '}
                <Link to='/' style={{ fontWeight: 'bold' }}>
                  Go Back
                </Link>
              </Message>
            ) : (
              <ListGroup variant='flash'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.packet}>
                    <Row>
                      <Col md={1} lg={1} className='v-align h-align'>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col
                        md={8}
                        lg={7}
                        className='cart-text d-flex align-items-center'
                      >
                        <Link to={`/packet/${item.packet}`}>{item.name}</Link>
                      </Col>
                      <Col md={1} lg={1} className='v-align h-align'>
                        <i className='fab fa-ethereum'></i>
                        {item.price}
                      </Col>
                      <Col md={1} lg={1} className='v-align h-align'>
                        <Button
                          title='Remove from Cart'
                          className='btn-Icon-Remove'
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.packet)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                        <Button
                          title='Remove from Cart'
                          className='btn-block btn-sm btn-Text-Remove my-2'
                          type='button'
                          variant='primary'
                          onClick={() => removeFromCartHandler(item.packet)}
                        >
                          Remove <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                      <Col md={1} lg={2} className='v-align h-align'>
                        {loadingAccess ? (
                          <Loader />
                        ) : (
                          <>
                            {' '}
                            <Button
                              disabled={userInfo ? false : true}
                              title={
                                userInfo
                                  ? 'Purchase this item'
                                  : 'You have to log in to perform that action'
                              }
                              type='button'
                              className='btn-block btn-sm btn-Text-Checkout'
                              onClick={() => purchaseHandler(item.packet)}
                            >
                              <span className='btn-Text-Checkout'>
                                Purchase
                              </span>{' '}
                              <i className='fab fa-ethereum fa-lg'></i>
                            </Button>
                            <Button
                              disabled={userInfo ? false : true}
                              title={
                                userInfo
                                  ? 'Purchase this item'
                                  : 'You have to log in to perform that action'
                              }
                              type='button'
                              variant='primary'
                              className='btn-Icon-Checkout btn-sm'
                              onClick={() => purchaseHandler(item.packet)}
                            >
                              <i className='btnIcon fab fa-ethereum fa-lg'></i>
                            </Button>
                          </>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
