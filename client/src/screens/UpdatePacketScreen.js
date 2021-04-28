import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDropZone } from 'react-drop-zone';
import axios from 'axios';
import Meta from '../components/Meta';
import 'react-drop-zone/dist/styles.css';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Container,
  InputGroup,
  Image,
  Spinner
} from 'react-bootstrap';
import Loader from '../components/Loader';
import ModalComponent from '../components/ModalComponent';
import {
  updatePacket,
  emptyUpdatePacketSuccess,
  emptyUpdatePacketError
} from '../actions/packetActions';
import {
  validateName,
  validateDescription,
  validateCategory
} from '../utils/validator';

const UpdatePacketScreen = ({ history, match }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const packetId = match.params.id;

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const packetData = useSelector((state) => state.packetData);
  const { packet } = packetData;

  const packetUpdate = useSelector((state) => state.packetUpdate);
  const { loading: loadingUpdate, error, success } = packetUpdate;

  // Component level State
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [confirmationModal, showConfirmationModal] = useState(false);

  // Component Variables
  const validForm =
    name !== undefined &&
    name.length !== 0 &&
    validateName(name) &&
    description !== undefined &&
    description.length !== 0 &&
    validateDescription(description) &&
    category !== undefined &&
    category.length !== 0 &&
    validateCategory(category);

  // Hook that triggers when component did mount
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const fetch = async () => {
      const { data } = await axios.get(`/api/packets/${packetId}`);
      setName(data.name);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
      setImage(data.image);
      setLoading(false);
    };
    fetch();
  }, [dispatch, packetId, userInfo, history]);

  // Component Methods
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleErrorOnClose = () => {
    dispatch(emptyUpdatePacketError());
  };

  const handleSuccessOnClose = () => {
    dispatch(emptyUpdatePacketSuccess());
  };

  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setImage('');
  };

  const onDropHandler = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const updateHandler = () => {
    showConfirmationModal(false);
    dispatch(
      updatePacket({ _id: packetId, name, description, category, price, image })
    );

    setTimeout(function () {
      dispatch(emptyUpdatePacketError());
      dispatch(emptyUpdatePacketSuccess());
    }, 8000);
  };

  const goBack = () => {
    history.goBack();
  };

  const closeConfirmationModal = () => showConfirmationModal(false);

  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Meta title='Data Dapp | Update Item' />
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
        <Button
          className='btn btn-info mr-1'
          title={validForm ? 'Save' : 'Enter all fields to submit'}
          disabled={!validForm || loadingUpdate}
          onClick={() => {
            showConfirmationModal(true);
          }}
        >
          {loadingUpdate ? (
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
            <>
              Save <i className='fas fa-save'></i>
            </>
          )}
        </Button>
        <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
          Update Data Packet
        </h1>
      </Row>

      {/************************************** Main Screen ****************************************/}
      {loading ? (
        <Loader />
      ) : (
        <Container>
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
          <div
            style={{ height: '55vh' }}
            className={
              (success && success !== null) || (error && error !== null)
                ? 'mb-2'
                : 'mb-2 pt-4'
            }
          >
            <StyledDropZone
              onDrop={onDropHandler}
              accept='image/*'
              className='mb-4'
            >
              {uploading ? (
                <Loader />
              ) : image.length === 0 ? (
                'Click or drop your file here'
              ) : (
                <div className='d-flex justify-content-center align-items-center'>
                  <span
                    style={{
                      width: '4rem',
                      verticalAlign: 'middle',
                      marginRight: '2rem'
                    }}
                  >
                    <Image src={image} alt={image} fluid rounded />
                  </span>{' '}
                  <span
                    style={{ verticalAlign: 'middle', marginRight: '2rem' }}
                  >
                    {image}
                  </span>{' '}
                  <span style={{ verticalAlign: 'middle' }}>
                    <i
                      className='fas fa-trash trash'
                      title='Remove from Uploads'
                      onClick={removeFromUploadsHandler}
                    ></i>
                  </span>
                </div>
              )}
            </StyledDropZone>

            <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className={
                        name.length === 0 || !validateName(name)
                          ? 'is-invalid'
                          : packet === undefined || name === packet.name
                          ? ''
                          : validateName(name) && 'is-valid'
                      }
                      type='text'
                      placeholder='Enter Name'
                      title='Enter Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                    {name.length === 0 || !validateName(name) ? (
                      <div className='invalid-feedback'>
                        Name must be from 5 to 100 characters long
                      </div>
                    ) : packet === undefined || name === packet.name ? null : (
                      validateName(name) && (
                        <div className='valid-feedback' display={'none'}>
                          Correct
                        </div>
                      )
                    )}
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      className={
                        description.length === 0 ||
                        !validateDescription(description)
                          ? 'is-invalid'
                          : packet === undefined ||
                            description === packet.description
                          ? ''
                          : validateDescription(description) && 'is-valid'
                      }
                      type='text'
                      placeholder='Enter Description'
                      title='Enter Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                    {description.length === 0 ||
                    !validateDescription(description) ? (
                      <div className='invalid-feedback'>
                        Description must be from 5 to 1000 characters long
                      </div>
                    ) : packet === undefined ||
                      description === packet.description ? null : (
                      validateDescription(description) && (
                        <div className='valid-feedback' display={'none'}>
                          Correct
                        </div>
                      )
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      className={
                        category.length === 0 || !validateCategory(category)
                          ? 'is-invalid'
                          : packet === undefined || category === packet.category
                          ? ''
                          : validateCategory(category) && 'is-valid'
                      }
                      type='text'
                      placeholder='Enter Category'
                      title='Enter Category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                    {category.length === 0 || !validateCategory(category) ? (
                      <div className='invalid-feedback'>
                        Category must be from 5 to 50 characters long
                      </div>
                    ) : packet === undefined ||
                      category === packet.category ? null : (
                      validateCategory(category) && (
                        <div className='valid-feedback' display={'none'}>
                          Correct
                        </div>
                      )
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <label htmlFor='price'>Price</label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i
                          className='fab fa-ethereum fa-lg'
                          style={{ color: 'black' }}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      id='price'
                      type='number'
                      min='0'
                      step='0.001'
                      title='Enter Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      )}

      {/* Modals */}
      <ModalComponent
        show={confirmationModal}
        close={closeConfirmationModal}
        proceed={updateHandler}
        title='Update Data Packet'
        body='Are you sure you want to update the data packet?'
        success={true}
        danger={true}
      />
    </>
  );
};

export default UpdatePacketScreen;
