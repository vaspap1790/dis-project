import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { prelistPacketDetails } from '../actions/packetActions';

const Packet = ({ packet }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Component Methods
  const clickHandler = () => {
    dispatch(prelistPacketDetails());
  };

  // This will be rendered
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/packet/${packet._id}`}>
        <Card.Img src={packet.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/packet/${packet._id}`} onClick={clickHandler}>
          <Card.Title as='div'>{packet.name}</Card.Title>
        </Link>
        <Card.Text>
          <div>
            by{' '}
            <Link
              to={`/profile/${packet.user._id}`}
              onClick={clickHandler}
              style={{ fontWeight: 'bold' }}
            >
              {packet.user.username}
            </Link>{' '}
            at{' '}
            <span className='text-muted'>
              <Moment format='D MMM YYYY hh:mm:ss'>{packet.createdAt}</Moment>
            </span>
          </div>
          <Rating value={packet.rating} text={`${packet.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>
          <i className='fab fa-ethereum'></i>
          {packet.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Packet;
