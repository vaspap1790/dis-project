import React, { useState } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import ModalComponent from '../components/ModalComponent';
import { prelistPacketDetails, addToWatchlist } from '../actions/packetActions';

const Packet = ({ packet, handler, isProfile }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Component level State
  const [watchlistModal, showWatchlistModal] = useState(false);

  // Component Methods
  const clickHandler = () => {
    dispatch(prelistPacketDetails());
  };

  const addToWatclistHandler = (packet) => {
    dispatch(addToWatchlist(packet));
    showWatchlistModal(true);
  };

  const closeWatchlistModal = () => showWatchlistModal(false);

  // This will be rendered
  return (
    <>
      <Card className='my-3 p-3 rounded'>
        {!isProfile ? (
          <span className='favourite blue-hover p-2'>
            <i
              className='fas fa-eye link-icon'
              title='Add to Watchlist'
              onClick={() => addToWatclistHandler(packet)}
            ></i>
          </span>
        ) : (
          <span className='favourite blue-hover p-2'>
            <i
              className='fas fa-edit link-icon'
              title='Edit Data Packet'
              id={`${packet._id}`}
              onClick={handler}
            ></i>
          </span>
        )}
        <Link to={`/packet/${packet._id}`}>
          <Card.Img
            src={packet.image === '' ? '/images/sample.jpg' : packet.image}
            variant='top'
            title={packet.name}
            style={{
              height: '20vh'
            }}
          />
        </Link>
        <Card.Body className='p-0 pt-2'>
          <Link
            to={`/packet/${packet._id}`}
            onClick={clickHandler}
            title={packet.name}
          >
            <Card.Title as='div' className='mb-0'>
              {packet.name}
            </Card.Title>
          </Link>
          <Card.Text className='mb-3'>
            {isProfile ? null : (
              <p className='mb-0'>
                by{' '}
                <Link
                  to={`/profile/${packet.user._id}`}
                  onClick={clickHandler}
                  style={{ fontWeight: 'bold' }}
                  title={packet.user.username}
                >
                  {packet.user.username}
                </Link>
              </p>
            )}
            <p className='mb-0'>
              at{' '}
              <span className='text-muted'>
                <Moment format='D MMM YYYY hh:mm:ss'>{packet.createdAt}</Moment>
              </span>
            </p>
            <Rating
              value={packet.rating}
              text={`${packet.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as='h3'>
            <i className='fab fa-ethereum'></i>
            {packet.price}
          </Card.Text>
        </Card.Body>
      </Card>

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

export default Packet;
