import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Packet from '../components/Packet';
import Rating from '../components/Rating';
import DataTable from '../components/DataTable';
import Meta from '../components/Meta';
import ReviewsContainer from '../components/ReviewsContainer';
import { ProSidebar, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Button, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import Loader from '../components/Loader';
import {
  getUserPackets,
  emptyUserPacketsError,
  listPacketData
} from '../actions/packetActions';
import {
  getUserAccess,
  emptyAccessProfileError
} from '../actions/accessActions';

const ProfileScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const userDetailsId = match.params.id;

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accessUser = useSelector((state) => state.accessUser);
  const {
    userAccess,
    loading: loadingUserAccess,
    error: userAccessError
  } = accessUser;

  const packetsUser = useSelector((state) => state.packetsUser);
  const {
    userData,
    loading: loadingUserPackets,
    error: userPacketsError
  } = packetsUser;

  const { packets: userPackets, reviews: userReviews, userRating } = userData;

  // Component Variables
  const userDetails = !userInfo
    ? true
    : userDetailsId !== undefined && userInfo._id !== userDetailsId
    ? true
    : false;

  // Hook that triggers when component did mount
  useEffect(() => {
    if (userDetails) {
      dispatch(getUserPackets(userDetailsId));
    } else {
      dispatch(getUserPackets(userInfo._id));
      dispatch(getUserAccess(userInfo._id));
    }
  }, [dispatch, history, userLogin, userInfo, userDetails, userDetailsId]);

  // Component Methods
  const uploadHandler = () => {
    history.push('/packets/create');
  };

  const updateHandler = (e) => {
    dispatch(listPacketData(e.target.id));
    history.push(`/packets/update/${e.target.id}`);
  };

  const handleUserPacketsErrorOnClose = () => {
    dispatch(emptyUserPacketsError());
  };

  const handleUserAccessErrorOnClose = () => {
    dispatch(emptyAccessProfileError());
  };

  const goBack = () => {
    history.goBack();
  };

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
        {userInfo && !userDetails ? (
          <>
            <Meta title='Data Dapp | Profile' />
            <Button
              className='btn btn-success mr-1'
              title='Upload a data packet'
              onClick={uploadHandler}
            >
              Upload <i className='fas fa-upload'></i>
            </Button>
          </>
        ) : (
          <Meta title={userRating.username} />
        )}
        <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
          User Profile
        </h1>
      </Row>
      <Row>
        {/************************************** Sidebar *****************************************/}
        <ProSidebar breakPoint='md'>
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
              {loadingUserPackets ? (
                <Loader />
              ) : userPacketsError ? null : (
                userRating && (
                  <div>
                    <div className='mx-auto' style={{ textAlign: 'center' }}>
                      {userRating.username}
                    </div>
                    <div className='mx-auto' style={{ textAlign: 'center' }}>
                      Uploaded{' '}
                      <span className='badge badge-pill badge-success'>
                        {userPackets.length}
                      </span>{' '}
                      items
                    </div>
                    <div className='mx-auto' style={{ textAlign: 'center' }}>
                      <Rating
                        value={userRating.rating}
                        text={`${userRating.numReviews} reviews`}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className='mt-3'>
            {/**************** Reviews Tab *******************/}
            {loadingUserPackets ? (
              <Loader />
            ) : (
              <ReviewsContainer reviews={userReviews} isProfile={true} />
            )}
          </SidebarContent>
        </ProSidebar>

        {/************************************* Main screen ***************************************/}
        <Col className='pt-2'>
          <Tabs defaultActiveKey='uploaded' transition={false}>
            {/*************** Uploaded Tab *******************/}
            <Tab eventKey='uploaded' title='Uploaded'>
              <div className='p-2'>
                {loadingUserPackets ? (
                  <Loader />
                ) : userPacketsError &&
                  userPacketsError === 'No items uploaded' ? (
                  <Alert variant='info'>{userPacketsError}</Alert>
                ) : userPacketsError &&
                  userPacketsError !== 'No items uploaded' ? (
                  <Alert
                    variant='danger'
                    onClose={() => {
                      handleUserPacketsErrorOnClose();
                    }}
                    dismissible={userPacketsError === 'No items uploaded'}
                  >
                    {userPacketsError}
                  </Alert>
                ) : (
                  <Row>
                    {userPackets && userPackets.length === 0 ? (
                      <Col>
                        <Alert variant='info'>No data packets uploaded</Alert>
                      </Col>
                    ) : null}
                    {userPackets &&
                      userPackets.map((packet) => (
                        <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
                          <Packet
                            handler={updateHandler}
                            packet={packet}
                            isProfile={false}
                          />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
            </Tab>
            {/*************** Purchased Tab ******************/}
            {!userDetails ? (
              <Tab eventKey='purchased' title='Purchased'>
                <div className='p-2'>
                  {loadingUserAccess ? (
                    <Loader />
                  ) : userAccessError ? (
                    <Alert
                      variant='danger'
                      onClose={() => {
                        handleUserAccessErrorOnClose();
                      }}
                      dismissible
                    >
                      {userAccessError}{' '}
                      {userAccessError === 'Not Authorised!' ? (
                        <span>
                          Try to Logout and Login again to refresh your access
                          token
                        </span>
                      ) : (
                        ''
                      )}
                    </Alert>
                  ) : (
                    <>
                      <DataTable data={userAccess} />
                    </>
                  )}
                </div>
              </Tab>
            ) : null}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
