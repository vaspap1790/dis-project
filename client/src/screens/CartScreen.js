import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, history }) => {
  const packetId = match.params.id;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, cartLoading } = cart;

  useEffect(() => {
    if (packetId) {
      dispatch(addToCart(packetId));
    }
  }, [dispatch, packetId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    history.push(`/cart`);
  };
  const purchaseHandler = (id) => {};

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
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is empty{' '}
                <bold>
                  <Link to='/'>Go Back</Link>
                </bold>
              </Message>
            ) : (
              <ListGroup variant='flash'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.packet}>
                    <Row>
                      <Col md={1} lg={1} className='v-align h-align'>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={8} lg={7} className='cart-text'>
                        <Link to={`/packet/${item.packet}`}>{item.name}</Link>
                      </Col>
                      <Col md={1} lg={1} className='v-align h-align'>
                        <i className='fab fa-ethereum'></i>
                        {item.price}
                      </Col>
                      <Col md={1} lg={1} className='v-align h-align'>
                        <Button
                          title='Remove from Cart'
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(item.packet)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                      <Col md={1} lg={2} className='v-align h-align'>
                        <Button
                          title='Purchase'
                          type='button'
                          className='btn-block btn-sm btn-Text'
                          onClick={() => purchaseHandler(item.packet)}
                        >
                          <span className='btnText'>Purchase</span>{' '}
                          <i className='fab fa-ethereum fa-lg'></i>
                        </Button>
                        <Button
                          title='Purchase'
                          type='button'
                          variant='light'
                          className='btn-Icon'
                          onClick={() => purchaseHandler(item.packet)}
                        >
                          <i className='btnIcon fab fa-ethereum fa-lg'></i>
                        </Button>
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
