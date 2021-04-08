import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Loader from '../components/Loader';
import {
  updateUserProfile,
  emptyProfileError,
  emptyProfileSuccess
} from '../actions/userActions';
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

  // What will be rendered
  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
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
              <div className='invalid-feedback'>
                Please insert a valid email
              </div>
            )}
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>
              Change Password{' '}
              <span
                className='link'
                onClick={showHidePassword}
                title='Show/Hide Password'
              >
                <i className='fas fa-eye search-icon'></i>
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
            <Form.Label>
              Confirm New Password{' '}
              <span
                className='link'
                onClick={showHideConfirmPassword}
                title='Show/Hide Confirm Password'
              >
                <i className='fas fa-eye search-icon'></i>
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
      </Col>
      <Col md={9}>
        <h2>My Data</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
