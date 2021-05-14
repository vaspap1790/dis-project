import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import { login, emptyLoginError } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Component level State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // Component Variables
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const validForm = email.length !== 0 && password.length !== 0;

  // Hook that triggers when component did mount
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // Component Methods
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const logIn = () => {
    if (validForm) {
      dispatch(login(email, password));

      setTimeout(function () {
        dispatch(emptyLoginError());
      }, 8000);
    }
  };

  const handleErrorOnClose = () => {
    dispatch(emptyLoginError());
  };

  const showHidePassword = () => {
    let type = passwordType === 'text' ? 'password' : 'text';
    setPasswordType(type);
  };

  const goBack = () => {
    history.goBack();
  };

  // This will be rendered
  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Meta title='Data Dapp | Sign In' />
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
        <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
          Sign In
        </h1>
      </Row>

      {/************************************** Main Screen ****************************************/}
      <FormContainer>
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
              title='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='d-flex justify-content-between'>
              Password{' '}
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
              type={passwordType}
              placeholder='Enter password'
              title='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            className='btn btn-success mr-1'
            type='submit'
            disabled={!validForm || loading}
            title={validForm ? 'Sign In' : 'Enter all fields to submit'}
            onClick={() => logIn()}
          >
            {loading ? (
              <>
                Loading...
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              </>
            ) : (
              <>Sign in</>
            )}
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New to DataDapp?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              style={{ fontWeight: 'bold' }}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
