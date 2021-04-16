import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDropZone } from 'react-drop-zone';
import axios from 'axios';
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
  Popover
} from 'react-bootstrap';
import Loader from '../components/Loader';
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

  const packetDetails = useSelector((state) => state.packetDetails);
  const { packet } = packetDetails;

  // Component level State
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [files, setFiles] = useState([]);

  // Hook that triggers when component did mount
  useEffect(() => {
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
  }, [dispatch, packetId]);

  // Component Methods
  const goBack = () => {
    history.goBack();
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleErrorOnClose = () => {
    //TODO:
  };

  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setFiles([]);
  };

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3'>Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  const onDropHandler = async (file) => {
    try {
      file.timestamp = new Date();
      var reader = new FileReader();
      reader.onload = function () {};
      reader.readAsText(file);
      if (files.length === 0) {
        await setFiles((files) => [...files, file]);
      } else {
        await setFiles([]);
        await setFiles((files) => [...files, file]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = () => {
    //TODO:
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div className='d-flex justify-content-between align-items-center'>
            <h1 style={{ display: 'inline' }}>Update Data Packet</h1>
            <Button
              variant='info'
              className='btn-sm'
              style={{ heigth: '3rem', fontSize: '0.82rem' }}
              title='Save'
              onClick={updateHandler}
            >
              Save <i className='fas fa-save fa-lg'></i>
            </Button>
          </div>

          <div style={{ height: '55vh' }} className='mb-2 pt-4'>
            <StyledDropZone
              onDrop={onDropHandler}
              accept='image/*'
              className='mb-4'
            >
              {image.length === 0 ? (
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
    </>
  );
};

export default UpdatePacketScreen;
