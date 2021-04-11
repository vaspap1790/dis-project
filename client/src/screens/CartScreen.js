import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Alert,
  Spinner
} from 'react-bootstrap';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
  addNewAccess,
  emptyAccessError,
  emptyAccessSuccess
} from '../actions/accessActions';

const CartScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const packetId = match.params.id;

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems, loading: cartLoading } = cart;

  const accessAdd = useSelector((state) => state.accessAdd);
  const { success, error, loading: loadingAccess } = accessAdd;

  // Hook that triggers when component did mount
  useEffect(() => {
    if (packetId) {
      dispatch(addToCart(packetId));
    }
  }, [dispatch, packetId]);

  // Component Methods
  const goBack = () => {
    history.goBack();
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push(`/cart`);
  };

  const purchaseHandler = (id) => {
    dispatch(addNewAccess(id));
    history.push(`/cart`);

    setTimeout(function () {
      dispatch(emptyAccessError());
      dispatch(emptyAccessSuccess());
    }, 8000);
  };

  const handleErrorOnClose = () => {
    dispatch(emptyAccessError());
  };

  const handleSuccessOnClose = () => {
    dispatch(emptyAccessSuccess());
  };

  // This will be rendered
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
            {error && error !== null && (
              <Alert
                variant='danger'
                onClose={() => {
                  handleErrorOnClose();
                }}
                dismissible
              >
                {error}{' '}
                {error === 'Not Authorised!' ? (
                  <span>
                    Try to Logout and Login again to refresh your access token
                  </span>
                ) : (
                  ''
                )}
              </Alert>
            )}
            {success && (
              <Alert
                variant='success'
                onClose={() => {
                  handleSuccessOnClose();
                }}
                dismissible
              >
                {success}
              </Alert>
            )}
            {cartItems.length === 0 ? (
              <Alert variant='info'>
                Your Cart is empty{' '}
                <span
                  onClick={goBack}
                  className='link'
                  style={{ fontWeight: 'bold' }}
                >
                  Go Back
                </span>
              </Alert>
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
                          <Button
                            disabled
                            type='button'
                            className='btn btn-primary btn-sm btn-block'
                          >
                            Loading...
                            <Spinner
                              as='span'
                              animation='border'
                              size='sm'
                              role='status'
                              aria-hidden='true'
                            />
                          </Button>
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
