import React from 'react';
import Rating from '../components/Rating';
import Moment from 'react-moment';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Review = ({ review, isProfile, openModal }) => {
  return (
    <>
      <ListGroup.Item className='m-1'>
        <i
          className='fas fa-search-plus fa-lg search-rating link-icon'
          title='See the Review'
          onClick={() => openModal(review)}
        ></i>
        From:{' '}
        <Link
          to={`/profile/${review.user._id}`}
          title={review.user.username}
          style={{ fontWeight: 'bold' }}
        >
          {review.user.username.length > 20
            ? review.user.username.substring(0, 18) + '..'
            : review.user.username}
        </Link>
        {isProfile ? (
          <div>
            For:{' '}
            <Link
              to={`/packet/${review.packet._id}`}
              title={review.packet.name}
              style={{ fontWeight: 'bold' }}
            >
              {review.packet.name.length > 20
                ? review.packet.name.substring(0, 18) + '..'
                : review.packet.name}
            </Link>
          </div>
        ) : null}
        <div className='text-muted'>
          <Moment format='D MMM YYYY hh:mm:ss'>{review.createdAt}</Moment>
        </div>
        <Rating value={review.rating} />
        <div style={{ fontStyle: 'italic' }}>
          "
          {review.comment.length > 20
            ? review.comment.substring(0, 18) + '..'
            : review.comment}
          "
        </div>
      </ListGroup.Item>
    </>
  );
};

export default Review;
