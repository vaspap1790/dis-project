import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Packet from '../components/Packet';
import Rating from '../components/Rating';
import ModalComponent from '../components/ModalComponent';
import DataTable from '../components/DataTable';
import Meta from '../components/Meta';
import ReviewsContainer from '../components/ReviewsContainer';
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Form, Button, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import Loader from '../components/Loader';
import {
  updateUserProfile,
  emptyProfileError,
  emptyProfileSuccess
} from '../actions/userActions';
import {
  getUserPackets,
  emptyUserPacketsError,
  listPacketDetails
} from '../actions/packetActions';
import {
  getUserAccess,
  emptyAccessProfileError
} from '../actions/accessActions';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../utils/validator';

const ProfileScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const userDetailsId = match.params.id;

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading, error } = userUpdateProfile;

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

  // Component level State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [confirmationModal, showConfirmationModal] = useState(false);

  // Component Variables
  const validForm =
    validateUsername(username) &&
    validateEmail(email) &&
    (username !== userInfo.username ||
      email !== userInfo.email ||
      password.length !== 0) &&
    validatePassword(password) &&
    validateConfirmPassword(password, confirmPassword);

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
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setPassword('');
      setConfirmPassword('');
      dispatch(getUserPackets(userInfo._id));
      dispatch(getUserAccess(userInfo._id));
    }
  }, [dispatch, history, userLogin, userInfo, userDetails, userDetailsId]);

  // Component Methods
  const closeConfirmationModal = () => showConfirmationModal(false);
  const openConfirmationModal = () => showConfirmationModal(true);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUserProfile({ id: userInfo._id, username, email, password })
    );

    setTimeout(function () {
      dispatch(emptyProfileError());
      dispatch(emptyProfileSuccess());
    }, 8000);
  };

  const uploadHandler = () => {
    history.push('/packets/create');
  };

  const updateHandler = (e) => {
    dispatch(listPacketDetails(e.target.id));
    history.push(`/packets/update/${e.target.id}`);
  };

  const handleErrorOnClose = () => {
    dispatch(emptyProfileError());
  };

  const handleSuccessOnClose = () => {
    dispatch(emptyProfileSuccess());
  };

  const handleUserPacketsErrorOnClose = () => {
    dispatch(emptyUserPacketsError());
  };

  const handleUserAccessErrorOnClose = () => {
    dispatch(emptyAccessProfileError());
  };

  const showHidePassword = () => {
    let type = passwordType === 'text' ? 'password' : 'text';
    setPasswordType(type);
  };

  const showHideConfirmPassword = () => {
    let type = confirmPasswordType === 'text' ? 'password' : 'text';
    setConfirmPasswordType(type);
  };

  const setPasswordHandler = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setConfirmPassword('');
    }
  };

  const goBack = () => {
    history.goBack();
  };

  //!userDetails ?
  const form = (
    <div className='p-2'>
      {success && success !== null && (
        <Alert
          variant='success'
          onClose={() => {
            handleSuccessOnClose();
          }}
          dismissible
        >
          {success}
        </Alert>
      )}
      {error && error !== null && (
        <Alert
          variant='danger'
          onClose={() => {
            handleErrorOnClose();
          }}
          dismissible
        >
          {error}
        </Alert>
      )}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={
              username.length === 0 ||
              (userInfo && username === userInfo.username)
                ? ''
                : validateUsername(username)
                ? 'is-valid'
                : 'is-invalid'
            }
            type='text'
            placeholder='Enter username'
            title='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
          {username.length === 0 ? null : validateUsername(username) ? (
            <div className='valid-feedback' display={'none'}>
              Correct
            </div>
          ) : (
            <div className='invalid-feedback'>
              Username should be from 5 to 15 characters long
            </div>
          )}
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            className={
              email.length === 0 || (userInfo && email === userInfo.email)
                ? ''
                : validateEmail(email)
                ? 'is-valid'
                : 'is-invalid'
            }
            type='text'
            placeholder='Enter email'
            title='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          {email.length === 0 ? null : validateEmail(email) ? (
            <div className='valid-feedback'>Correct</div>
          ) : (
            <div className='invalid-feedback'>Please insert a valid email</div>
          )}
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label className='d-flex justify-content-between'>
            Change Password{' '}
            <span
              className='link'
              onClick={showHidePassword}
              title='Show/Hide Password'
            >
              <i
                className={
                  passwordType === 'text'
                    ? 'fas fa-eye search-icon'
                    : 'fas fa-eye-slash search-icon'
                }
              ></i>
            </span>
          </Form.Label>
          <Form.Control
            className={
              password.length === 0
                ? ''
                : validatePassword(password)
                ? 'is-valid'
                : 'is-invalid'
            }
            type={passwordType}
            placeholder='Enter password'
            title='Enter password'
            value={password}
            onChange={(e) => setPasswordHandler(e.target.value)}
          ></Form.Control>
          {password.length === 0 ? null : validatePassword(password) ? (
            <div className='valid-feedback'>Correct</div>
          ) : (
            <div className='invalid-feedback'>
              Password should be from 8 to 15 characters long
            </div>
          )}
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label className='d-flex justify-content-between'>
            Confirm New Password{' '}
            <span
              className='link'
              onClick={showHideConfirmPassword}
              title='Show/Hide Confirm Password'
            >
              <i
                className={
                  confirmPasswordType === 'text'
                    ? 'fas fa-eye search-icon'
                    : 'fas fa-eye-slash search-icon'
                }
              ></i>
            </span>
          </Form.Label>
          <Form.Control
            className={
              confirmPassword.length === 0
                ? ''
                : validateConfirmPassword(password, confirmPassword)
                ? 'is-valid'
                : 'is-invalid'
            }
            type={confirmPasswordType}
            placeholder='Confirm password'
            title='Confirm password'
            disabled={password.length === 0}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
          {confirmPassword.length === 0 ? null : validateConfirmPassword(
              password,
              confirmPassword
            ) ? (
            <div className='valid-feedback'>Correct</div>
          ) : (
            <div className='invalid-feedback'>
              Confrim Password should be much Password
            </div>
          )}
        </Form.Group>
        <Button
          variant='primary'
          disabled={!validForm}
          title={
            validForm ? 'Update Profile' : 'Enter correct values to submit'
          }
          className='btn btn-sm btn-block'
          type='submit'
        >
          Update
        </Button>
      </Form>
    </div>
  );

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
        <ProSidebar>
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
              {userRating && (
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
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className='mt-3'>
            {/**************** Reviews Tab *******************/}
            <ReviewsContainer reviews={userReviews} isProfile={true} />
          </SidebarContent>
        </ProSidebar>

        {/************************************* Main screen ***************************************/}
        <Col md={9} className='pt-2'>
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
                    <DataTable data={userAccess} />
                  )}
                </div>
              </Tab>
            ) : null}
          </Tabs>
        </Col>
      </Row>
      {/* Modals */}
      <ModalComponent
        show={confirmationModal}
        close={closeConfirmationModal}
        //proceed={handleProceed}
        title='Confirm Upload'
        body='Are you sure you want to proceed and update your profile?'
        danger={true}
        success={true}
      />
    </>
  );
};

export default ProfileScreen;
