import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import ModalComponent from '../components/ModalComponent';
import {
  register,
  emptyRegisterError,
  emptyRegisterSuccess,
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

const RegisterScreen = ({ location, history, account, contract }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Component level State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [confirmationModal, showConfirmationModal] = useState(false);

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister
  } = userRegister;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate
  } = userUpdateProfile;

  // Component Variables
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const validForm = userInfoLogin
    ? validateUsername(username) &&
      validateEmail(email) &&
      (username !== userInfoLogin.username ||
        email !== userInfoLogin.email ||
        password.length !== 0) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword)
    : validateUsername(username) &&
      validateEmail(email) &&
      password.length !== 0 &&
      confirmPassword.length !== 0 &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword);

  // Hook that triggers when component did mount
  useEffect(() => {
    if (successRegister) {
      history.push(redirect);
      dispatch(emptyRegisterSuccess());
    }
    if (userInfoLogin) {
      setUsername(userInfoLogin.username);
      setEmail(userInfoLogin.email);
      setPassword('');
      setConfirmPassword('');
    }
  }, [dispatch, history, userInfoLogin, redirect, successRegister]);

  // Component Methods
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const registerUser = () => {
    showConfirmationModal(false);
    dispatch(register(username, email, password, account, contract));
    setTimeout(function () {
      dispatch(emptyRegisterError());
    }, 8000);
  };

  const updateUser = () => {
    showConfirmationModal(false);

    dispatch(
      updateUserProfile({ id: userInfoLogin._id, username, email, password })
    );

    setTimeout(function () {
      dispatch(emptyProfileError());
      dispatch(emptyProfileSuccess());
    }, 8000);
  };

  const handleErrorUpdateOnClose = () => {
    dispatch(emptyProfileError());
  };

  const handleSuccessUpdateOnClose = () => {
    dispatch(emptyProfileSuccess());
  };

  const handleErrorRegisterOnClose = () => {
    dispatch(emptyRegisterError());
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

  const closeConfirmationModal = () => showConfirmationModal(false);

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
        {userInfoLogin ? (
          <>
            <Meta title='Data Dapp | Update User details' />
            <Button
              className='btn btn-success mr-1'
              disabled={!validForm || loadingUpdate}
              type='submit'
              title={validForm ? 'Update' : 'Make changes to submit'}
              onClick={() => showConfirmationModal(true)}
            >
              {loadingRegister ? (
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
                <>Update</>
              )}
            </Button>
            <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
              Update User Details
            </h1>
          </>
        ) : (
          <>
            <Meta title='Data Dapp | Sign Up' />
            <Button
              className='btn btn-info mr-1'
              disabled={!validForm || loadingRegister}
              type='submit'
              title={validForm ? 'Register' : 'Enter all fields to submit'}
              onClick={() => showConfirmationModal(true)}
            >
              {loadingRegister ? (
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
                <>Register</>
              )}
            </Button>
            <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
              Sign Up
            </h1>
          </>
        )}
      </Row>

      {/************************************** Main Screen ****************************************/}
      <FormContainer>
        {errorRegister && errorRegister !== null && (
          <Alert
            variant='danger'
            onClose={() => {
              handleErrorRegisterOnClose();
            }}
            dismissible
          >
            {errorRegister}
          </Alert>
        )}
        {errorUpdate && errorUpdate !== null && (
          <Alert
            variant='danger'
            onClose={() => {
              handleErrorUpdateOnClose();
            }}
            dismissible
          >
            {errorUpdate}
          </Alert>
        )}
        {successUpdate && successUpdate !== null && (
          <Alert
            variant='success'
            onClose={() => {
              handleSuccessUpdateOnClose();
            }}
            dismissible
          >
            {successUpdate}
          </Alert>
        )}
        {loadingUpdate && <Loader />}
        {loadingRegister && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              className={
                userInfoLogin
                  ? username.length === 0 || !validateUsername(username)
                    ? 'is-invalid'
                    : username === undefined ||
                      username === userInfoLogin.username
                    ? ''
                    : validateUsername(username) && 'is-valid'
                  : username.length === 0
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
            {userInfoLogin ? (
              username.length === 0 || !validateUsername(username) ? (
                <div className='invalid-feedback'>
                  Username should be from 5 to 15 characters long
                </div>
              ) : username === undefined ||
                username === userInfoLogin.username ? null : (
                validateUsername(username) && (
                  <div className='valid-feedback' display={'none'}>
                    Correct
                  </div>
                )
              )
            ) : username.length === 0 ? null : validateUsername(username) ? (
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
                userInfoLogin
                  ? email.length === 0 || !validateEmail(email)
                    ? 'is-invalid'
                    : email === undefined || email === userInfoLogin.email
                    ? ''
                    : validateEmail(email) && 'is-valid'
                  : email.length === 0
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
            {userInfoLogin ? (
              email.length === 0 || !validateEmail(email) ? (
                <div className='invalid-feedback'>Email should be valid</div>
              ) : email === undefined ||
                email === userInfoLogin.email ? null : (
                validateEmail(email) && (
                  <div className='valid-feedback' display={'none'}>
                    Correct
                  </div>
                )
              )
            ) : email.length === 0 ? null : validateEmail(email) ? (
              <div className='valid-feedback' display={'none'}>
                Correct
              </div>
            ) : (
              <div className='invalid-feedback'>Email should be valid</div>
            )}
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='d-flex justify-content-between'>
              {userInfoLogin ? 'Change Password' : 'Password'}{' '}
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
              Confirm Password{' '}
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
        </Form>

        {!userInfoLogin && (
          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to={'/login'} style={{ fontWeight: 'bold' }}>
                Login
              </Link>
            </Col>
          </Row>
        )}
      </FormContainer>

      {/* Modals */}
      <ModalComponent
        show={confirmationModal}
        close={closeConfirmationModal}
        proceed={userInfoLogin ? updateUser : registerUser}
        title={userInfoLogin ? 'Update User Details' : 'Register User'}
        body={
          userInfoLogin
            ? 'Are you sure you want to update your information?'
            : 'Are you sure you want to register the user?'
        }
        success={true}
        danger={true}
      />
    </>
  );
};

export default RegisterScreen;
