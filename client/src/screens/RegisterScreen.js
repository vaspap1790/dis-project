import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../utils/validator';

const RegisterScreen = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    console.log(username.length === 0);
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validForm =
    validateUsername(username) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validateConfirmPassword(password, confirmPassword);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setMessage('All fields are required');
    } else {
      if (validForm) {
        dispatch(register(username, email, password));
        setMessage(undefined);
      }
    }
  };

  const setPasswordHandler = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setConfirmPassword('');
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={
              username.length === 0
                ? ''
                : validateUsername(username)
                ? 'is-valid'
                : 'is-invalid'
            }
            type='text'
            placeholder='Enter username'
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
              email.length === 0
                ? ''
                : validateEmail(email)
                ? 'is-valid'
                : 'is-invalid'
            }
            type='text'
            placeholder='Enter email'
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={
              password.length === 0
                ? ''
                : validatePassword(password)
                ? 'is-valid'
                : 'is-invalid'
            }
            type='password'
            placeholder='Enter password'
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
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={
              confirmPassword.length === 0
                ? ''
                : validateConfirmPassword(password, confirmPassword)
                ? 'is-valid'
                : 'is-invalid'
            }
            type='password'
            placeholder='Confirm password'
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
        <Button variant='primary' type='submit' disabled={!validForm}>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
