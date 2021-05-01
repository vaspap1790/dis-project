import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import ReviewsContainer from '../components/ReviewsContainer';
import { ProSidebar, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import Loader from '../components/Loader';
import 'react-pro-sidebar/dist/css/styles.css';
import { getUserDetails } from '../actions/userActions';

const ProfileSidebar = ({ id }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { userData, loading, error } = userDetails;

  const { reviews, userRating, numOfPackets } = userData;

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <ProSidebar breakPoint='md' style={{ height: '100%', width: 'inherit' }}>
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {loading ? (
            <Loader />
          ) : error ? null : (
            userRating && (
              <div>
                <div className='mx-auto' style={{ textAlign: 'center' }}>
                  {userRating.username}
                </div>
                <div className='mx-auto' style={{ textAlign: 'center' }}>
                  Uploaded{' '}
                  <span className='badge badge-pill badge-success'>
                    {numOfPackets}
                  </span>{' '}
                  items
                </div>
                <div className='mx-auto' style={{ textAlign: 'center' }}>
                  <Rating
                    value={userRating.rating}
                    text={`${userRating.numReviews}`}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className='mt-3'>
        {/**************** Reviews Tab *******************/}
        {loading ? (
          <Loader />
        ) : (
          <ReviewsContainer reviews={reviews} isProfile={true} />
        )}
      </SidebarContent>
    </ProSidebar>
  );
};

export default ProfileSidebar;
