import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Tabs,
  Tab,
  Card
} from 'react-bootstrap';
import Loader from '../components/Loader';
import {
  updateUserProfile,
  emptyProfileError,
  emptyProfileSuccess
} from '../actions/userActions';
import {
  getUserPackets,
  emptyUserPacketsError
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

const ProfileScreen = ({ history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Component level State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

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
    userPackets,
    loading: loadingUserPackets,
    error: userPacketsError
  } = packetsUser;

  // Component Variables
  const validForm =
    validateUsername(username) &&
    validateEmail(email) &&
    (username !== userInfo.username ||
      email !== userInfo.email ||
      password.length !== 0) &&
    validatePassword(password) &&
    validateConfirmPassword(password, confirmPassword);

  // Hook that triggers when component did mount
  useEffect(() => {
    if (!userLogin || !userInfo) {
      history.push('/login');
    } else {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setPassword('');
      setConfirmPassword('');
      dispatch(getUserPackets(userInfo._id));
      dispatch(getUserAccess(userInfo._id));
    }
  }, [dispatch, history, userLogin, userInfo]);

  // Component Methods
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

  const handleErrorOnClose = () => {
    dispatch(emptyProfileError());
  };

  const handleSuccessOnClose = () => {
    dispatch(emptyProfileSuccess());
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

  // This will be rendered
  return (
    <Row>
      <Col md={3} className='table-dark p-2' id='sidebarProfile'>
        <h2 style={{ color: 'white' }}>User Details</h2>
        <Tabs
          defaultActiveKey='update'
          transition={false}
          className='profileTabs'
        >
          <Tab eventKey='profile' title='Profile'>
            <div className='p-2'>Profile</div>
          </Tab>
          <Tab eventKey='update' title='Update'>
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
                      email.length === 0 ||
                      (userInfo && email === userInfo.email)
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
                    <div className='invalid-feedback'>
                      Please insert a valid email
                    </div>
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
                  {confirmPassword.length ===
                  0 ? null : validateConfirmPassword(
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
                    validForm
                      ? 'Update Profile'
                      : 'Enter correct values to submit'
                  }
                  className='btn btn-sm btn-block'
                  type='submit'
                >
                  Update
                </Button>
              </Form>
            </div>
          </Tab>
          <Tab eventKey='reviews' title='Reviews'>
            <div className='p-2'>Reviews</div>
          </Tab>
        </Tabs>
      </Col>
      <Col md={9} className='pt-2'>
        <h2>User Data Packets</h2>
        <Tabs defaultActiveKey='uploaded' transition={false}>
          <Tab eventKey='uploaded' title='Uploaded'></Tab>
          <Tab eventKey='purchased' title='Purchased'></Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
