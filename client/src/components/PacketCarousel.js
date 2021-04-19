import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { listTopPackets } from '../actions/packetActions';

const PacketCarousel = () => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const packetTopRated = useSelector((state) => state.packetTopRated);
  const { loading, error, packets } = packetTopRated;

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listTopPackets());
  }, [dispatch]);

  // This will be rendered
  return loading ? (
    <Loader />
  ) : error ? (
    <Alert variant='danger'>{error}</Alert>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {packets.map((packet) => (
        <Carousel.Item key={packet._id}>
          <Link to={`/packet/${packet._id}`}>
            <Image src={packet.image} alt={packet.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h4>
                {packet.name} (<i className='fab fa-ethereum'></i>
                {packet.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PacketCarousel;
