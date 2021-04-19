import React, { useState } from 'react';
import ModalComponent from '../components/ModalComponent';
import Review from '../components/Review';
import { Alert, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ReviewsContainer = ({ reviews, isProfile }) => {
  // Component level State
  const [modal, showModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [packetName, setPacketName] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  // Component Variables
  const form = (
    <>
      <div>
        From: <span style={{ fontWeight: 'bold' }}>{username}</span>
      </div>
      {isProfile ? (
        <div>
          For: <span style={{ fontWeight: 'bold' }}>{packetName}</span>
        </div>
      ) : null}
      <div className='text-muted'>
        <Moment format='D MMM YYYY hh:mm:ss'>{createdAt}</Moment>
      </div>
      <Rating value={rating} />
      <div style={{ fontStyle: 'italic' }}>"{comment}"</div>
    </>
  );

  // Component Methods
  const closeModal = () => {
    showModal(false);
    setRating(0);
    setComment('');
    setUsername('');
    setPacketName('');
    setCreatedAt('');
  };

  const openModal = (review) => {
    console.log(review);
    setUsername(review.user.username);
    setPacketName(review.packet.name);
    setRating(review.rating);
    setComment(review.comment);
    setCreatedAt(review.createdAt);
    showModal(true);
  };

  return (
    <>
      <div className='px-2 py-1' style={{ color: 'black' }}>
        {reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
        <ListGroup
          variant='flush'
          style={{
            maxHeight: '80vh',
            minHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          {reviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              isProfile={isProfile}
              openModal={openModal}
            />
          ))}
        </ListGroup>
      </div>
      {/* Modals */}
      <ModalComponent
        show={modal}
        close={closeModal}
        title='Review'
        body={form}
        info={true}
      />
    </>
  );
};

ReviewsContainer.defaultProps = {
  isProfile: false
};

ReviewsContainer.propTypes = {
  isProfile: PropTypes.bool
};

export default ReviewsContainer;
