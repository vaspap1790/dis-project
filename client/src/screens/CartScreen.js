import React, { useEffect, useState } from 'react';
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
import ModalComponent from '../components/ModalComponent';
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

  // Component level State
  const [purchaseModal, showPurchaseModal] = useState(false);
  const [removeModal, showRemoveModal] = useState(false);
  const [itemId, setItemId] = useState('');

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

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(itemId));
    showRemoveModal(false);
    setItemId('');
    history.push(`/cart`);
  };

  const purchaseHandler = () => {
    dispatch(addNewAccess(itemId));
    showPurchaseModal(false);
    setItemId('');
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

  const closePurchaseModal = () => showPurchaseModal(false);
  const closeRemoveModal = () => showRemoveModal(false);

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
                        <Image
                          src={
                            item.image === ''
                              ? '/images/sample.jpg'
                              : item.image
                          }
                          alt={item.name}
                          fluid
                          rounded
                        />
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
                          onClick={() => {
                            showRemoveModal(true);
                            setItemId(item.packet);
                          }}
                        >
                          <i className='fas fa-trash trash'></i>
                        </Button>
                        <Button
                          title='Remove from Cart'
                          className='btn-block btn-sm btn-Text-Remove my-2'
                          type='button'
                          variant='danger'
                          onClick={() => {
                            showRemoveModal(true);
                            setItemId(item.packet);
                          }}
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
                              onClick={() => {
                                showPurchaseModal(true);
                                setItemId(item.packet);
                              }}
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
                              onClick={() => {
                                showPurchaseModal(true);
                                setItemId(item.packet);
                              }}
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

      {/* Modals */}
      <ModalComponent
        show={removeModal}
        close={closeRemoveModal}
        proceed={removeFromCartHandler}
        title='Remove from Cart'
        body='Are you sure you want to remove the data packet from your cart?'
        success={true}
        danger={true}
      />
      <ModalComponent
        show={purchaseModal}
        close={closePurchaseModal}
        proceed={purchaseHandler}
        title='Purchase the item'
        body='Are you sure you want to purchase the data packet?'
        success={true}
        danger={true}
      />
    </>
  );
};

export default CartScreen;
