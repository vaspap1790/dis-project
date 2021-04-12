import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Container,
  InputGroup
} from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  validateName,
  validateDescription,
  validateCategory
} from '../utils/validator';

const PacketFormScreen = ({ history, match }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const packetId = match.params.id;

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const packetDetails = useSelector((state) => state.packetDetails);
  const { loading, error, packet } = packetDetails;

  // Component level State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  //   const [price, setPrice] = useState(0);
  const [files, setFiles] = useState([]);

  // Hook that triggers when component did mount
  useEffect(() => {
    if (packetId !== undefined) {
      if (packet !== undefined) {
        setName(packet.name);
        setDescription(packet.description);
        setCategory(packet.category);
      }
    } else {
      setName('');
      setDescription('');
      setCategory('');
    }
  }, [dispatch, match, packet, packetId]);

  // Component Methods
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleErrorOnClose = () => {};

  const onDropHandler = async (file, text) => {
    try {
      const type = file.name.substr(file.name.lastIndexOf('.') + 1);
      await setFiles((files) => [...files, file]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Container>
          {packetId === undefined ? (
            <h1>Upload Data Packet</h1>
          ) : (
            <h1>Update Data Packet</h1>
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
            <Row>
              <Col md={6}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className={
                      name.length === 0
                        ? ''
                        : validateName(name)
                        ? 'is-valid'
                        : 'is-invalid'
                    }
                    type='text'
                    placeholder='Enter name'
                    title='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  {name.length === 0 ? null : validateName(name) ? (
                    <div className='valid-feedback' display={'none'}>
                      Correct
                    </div>
                  ) : (
                    <div className='invalid-feedback'>
                      Name must be from 5 to 30 characters long
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={4}
                    className={
                      description.length === 0
                        ? ''
                        : validateDescription(description)
                        ? 'is-valid'
                        : 'is-invalid'
                    }
                    type='text'
                    placeholder='Enter Description'
                    title='Enter Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                  {description.length === 0 ? null : validateDescription(
                      description
                    ) ? (
                    <div className='valid-feedback' display={'none'}>
                      Correct
                    </div>
                  ) : (
                    <div className='invalid-feedback'>
                      Description must be from 5 to 100 characters long
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    className={
                      category.length === 0
                        ? ''
                        : validateCategory(category)
                        ? 'is-valid'
                        : 'is-invalid'
                    }
                    type='text'
                    placeholder='Enter Category'
                    title='Enter Category'
                    value={category}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  {category.length === 0 ? null : validateCategory(category) ? (
                    <div className='valid-feedback' display={'none'}>
                      Correct
                    </div>
                  ) : (
                    <div className='invalid-feedback'>
                      Category must be from 5 to 15 characters long
                    </div>
                  )}
                </Form.Group>

                <label htmlFor='price'>Price</label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className='fab fa-ethereum fa-lg'></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control id='price' type='number' />
                </InputGroup>
              </Col>
              <Col md={6}>
                <StyledDropZone className='mb-3' onDrop={onDropHandler} />
                {files.map((file) => (
                  <Col key={file.name}>{file.name}</Col>
                ))}
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default PacketFormScreen;
