import React from 'react';
import Rating from '../components/Rating';
import Moment from 'react-moment';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Review = ({ review, openModal }) => {
  return (
    <>
      <ListGroup.Item className='m-1'>
        <i
          className='fas fa-search-plus fa-lg search-review blue-hover link-icon'
          title='See the Review'
          onClick={() => openModal(review)}
        ></i>
        From:{' '}
        <Link
          to={`/profile/${review.reviewer._id}`}
          title={review.reviewer.username}
          style={{ fontWeight: 'bold' }}
        >
          {review.reviewer.username.length > 20
            ? review.reviewer.username.substring(0, 18) + '..'
            : review.reviewer.username}
        </Link>
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
