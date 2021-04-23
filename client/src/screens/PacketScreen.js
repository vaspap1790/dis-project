import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Alert } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import ModalComponent from '../components/ModalComponent';
import ReviewsContainer from '../components/ReviewsContainer';
import ReactQuill from 'react-quill';
import Meta from '../components/Meta';
import 'react-quill/dist/quill.snow.css';
import 'react-drop-zone/dist/styles.css';
import { listPacketDetails, addToWatchlist } from '../actions/packetActions';

const PacketScreen = ({ history, match }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const packetDetails = useSelector((state) => state.packetDetails);
  const { loading: loadingDetails, error, packet, reviews } = packetDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Component level State
  const [watchlistModal, showWatchlistModal] = useState(false);

  //Component Variables
  const modules = {
    toolbar: false
  };

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPacketDetails(match.params.id));
  }, [dispatch, match]);

  // Component Methods
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };

  const goBack = () => {
    history.goBack();
  };

  const addToWatclistHandler = (packet) => {
    dispatch(addToWatchlist(packet));
    showWatchlistModal(true);
  };

  const closeWatchlistModal = () => showWatchlistModal(false);

  // This will be rendered
  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
        {loadingDetails ? (
          <Loader />
        ) : error ? null : (
          <>
            <Button
              className='btn btn-info mr-1'
              title='Add to Watchlist'
              onClick={() => addToWatclistHandler(packet)}
            >
              Watch <i className='fas fa-eye'></i>
            </Button>
            <Button
              onClick={addToCartHandler}
              className='btn btn-success mr-1'
              disabled={cartItems.find(
                (cartItem) => cartItem.packet === packet._id
              )}
              title={
                cartItems.find((cartItem) => cartItem.packet === packet._id)
                  ? 'You have already added this item to your Cart'
                  : 'Add this item to your Cart'
              }
            >
              Cart <i className='fas fa-shopping-cart'></i>
            </Button>
            <Meta title={packet.name} />
          </>
        )}
      </Row>
      {/************************************* Main screen ***************************************/}
      {loadingDetails ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={6} className='px-0'>
              {packet.sample !== '' ? (
                <div>
                  <ReactQuill
                    theme='snow'
                    name='editor'
                    modules={modules}
                    value={packet.sample}
                    preserveWhitespace
                    readOnly
                  />
                </div>
              ) : (
                <Image
                  src={
                    packet.image === '' ? '/images/sample.jpg' : packet.image
                  }
                  alt={packet.name}
                  fluid
                />
              )}
            </Col>
            <Col md={6} className='px-0'>
              <Row className='d-flex'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{packet.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: <i className='fab fa-ethereum'></i>
                    {packet.price}
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
                  <ListGroup.Item>
                    <h2>Reviews</h2>
                    <ReviewsContainer reviews={reviews} />
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Col>
          </Row>
        </>
      )}

      {/* Modals */}
      <ModalComponent
        show={watchlistModal}
        close={closeWatchlistModal}
        title='Add to Watchlist'
        body='You successfully added the data packet to the Watchlist'
        info={true}
      />
    </>
  );
};

export default PacketScreen;
