import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { validateUpdate } from '../utils/validator';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setUsername(user.username);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      validateUpdate(username, email, password, confirmPassword) !== 'Valid'
    ) {
      setMessage(validateUpdate(username, email, password, confirmPassword));
    } else {
      dispatch(updateUserProfile({ id: user._id, username, email, password }));
      setMessage('Profile Updated');
    }
  };

  const setPasswordHandler = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setConfirmPassword('');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        {message && message !== 'Profile Updated' ? (
          <Message variant='danger'>{message}</Message>
        ) : null}
        {message && message === 'Profile Updated' ? (
          <Message variant='success'>{message}</Message>
        ) : null}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Change Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPasswordHandler(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm new Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              disabled={password.length === 0}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>
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
