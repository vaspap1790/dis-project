import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login, emptyLoginError } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setTimeout(function () {
      dispatch(emptyLoginError());
    }, 5000);
  };

  const handleErrorOnClose = () => {
    dispatch(emptyLoginError());
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New to DataDapp?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
