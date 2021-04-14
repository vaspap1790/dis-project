import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDropZone } from 'react-drop-zone';
import axios from 'axios';
import { FileIcon, defaultStyles } from 'react-file-icon';
import 'react-drop-zone/dist/styles.css';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Container,
  InputGroup,
  Table,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import Loader from '../components/Loader';
import Moment from 'react-moment';
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
  const [files, setFiles] = useState([]);

  // Hook that triggers when component did mount
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`/api/packets/${packetId}`);
      setName(data.name);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
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

  const removeFromUploadsHandler = () => {
    //TODO:
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

  const onDropHandler = async (file, text) => {
    try {
      //file.timestamp = new Date();
      //console.log(file);
      await setFiles((files) => [...files, file]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <h1>Update Data Packet</h1>
          <Form>
            <Row>
              <Col md={6}>
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
                    rows={4}
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

              <Col md={6}>
                <StyledDropZone onDrop={onDropHandler} />
                <div className='my-3 text-muted'>
                  <span className='small'>
                    We'll never share your email with anyone else.
                  </span>
                  <OverlayTrigger
                    trigger='click'
                    placement='top'
                    overlay={popover}
                  >
                    <i
                      className='fas fa-search-plus fa-lg link-icon'
                      style={{ color: 'black' }}
                    ></i>
                  </OverlayTrigger>
                </div>
                <Table id='uploadsTable' bordered responsive size='sm'>
                  <thead>
                    <tr className='table-dark'>
                      <th className='uploadsTableHeaders text-center p-2'>
                        Type
                      </th>
                      <th className='uploadsTableHeaders text-center p-2'>
                        File Name
                      </th>
                      <th className='uploadsTableHeaders text-center p-2'>
                        Date
                      </th>
                      <th className='uploadsTableHeaders text-center p-2'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key='file.name'>
                        <td
                          style={{ width: '1rem', verticalAlign: 'middle' }}
                          className='p-2 small'
                        >
                          <FileIcon
                            extension={file.name.substr(
                              file.name.lastIndexOf('.') + 1
                            )}
                            {...defaultStyles[
                              file.name.substr(file.name.lastIndexOf('.') + 1)
                            ]}
                          />
                        </td>
                        <td
                          style={{ verticalAlign: 'middle' }}
                          className='text-center small'
                        >
                          {file.name}
                        </td>
                        <td
                          className='text-muted text-center small'
                          style={{ verticalAlign: 'middle' }}
                        >
                          <Moment format='D MMM YYYY hh:mm:ss'>
                            {file.timestamp}
                          </Moment>
                        </td>
                        <td
                          className='text-center small'
                          style={{ verticalAlign: 'middle' }}
                        >
                          {' '}
                          <Button
                            title='Remove from Uploads'
                            className='btn-Icon-Remove btn-sm'
                            type='button'
                            variant='light'
                            onClick={() => removeFromUploadsHandler(file.name)}
                          >
                            <i className='fas fa-trash trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Form>
          <Button>Save</Button>
        </Container>
      )}
    </>
  );
};

export default UpdatePacketScreen;
