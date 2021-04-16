import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import {
  validateName,
  validateDescription,
  validateCategory
} from '../utils/validator';
import StepWizard from 'react-step-wizard';
import Nav from '../components/WizardNav';
import '../css/wizard.css';
/* eslint react/prop-types: 0 */

const CreatePacket = ({ history, match }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Wizard
  const [state, updateState] = useState({
    form: {}
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    updateState({
      ...state,
      form
    });
  };

  // Component Methods
  const onStepChange = (stats) => {
    // console.log(stats);
  };

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW
    });

  const handleErrorOnClose = () => {
    //TODO:
  };

  const removeFromUploadsHandler = () => {
    //TODO:
  };

  const uploadHandler = () => {
    const { form } = state;
    if (!form.name) {
      console.log('SORRY');
    } else {
      console.log(state);
    }
    //TODO:
  };

  //This will be rendered
  return (
    <Container>
      <h1>Upload Data Packet</h1>
      <div className='row'>
        <div className={`col-12 rsw-wrapper`}>
          <StepWizard
            onStepChange={onStepChange}
            isHashEnabled
            nav={<Nav />}
            instance={setInstance}
          >
            <First hashKey={'step1'} update={updateForm} />
            <Second hashKey={'step2'} update={updateForm} form={state.form} />
            <Last
              hashKey={'step3'}
              update={updateForm}
              uploadHandler={uploadHandler}
            />
          </StepWizard>
        </div>
      </div>
    </Container>
  );
};

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
  uploadHandler,
  handleEditorValue
}) => {
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3'>Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  return (
    <div className='d-flex justify-content-end align-items-center'>
      {step > 1 && (
        <>
          <button className='btn btn-info' onClick={previousStep}>
            <OverlayTrigger trigger='click' placement='top' overlay={popover}>
              <i className='fas fa-search-plus fa-lg'></i>
            </OverlayTrigger>
          </button>
          <button className='btn btn-warning mx-2' onClick={previousStep}>
            STEP {currentStep - 1}
          </button>
        </>
      )}
      {step < totalSteps ? (
        <button className='btn btn-primary' onClick={nextStep}>
          Continue
        </button>
      ) : (
        <button
          className='btn btn-success'
          onClick={() => {
            uploadHandler();
            handleEditorValue();
          }}
        >
          Upload
        </button>
      )}
    </div>
  );
};

/** Steps */
const First = (props) => {
  // Component level State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Component Methods
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        Step 1/3: Enter Packet information
      </div>
      <div style={{ height: '55vh' }} className='mb-2'>
        <Form onSubmit={submitHandler}>
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
              placeholder='Enter Name'
              title='Enter Name'
              name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                update(e);
              }}
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
              rows={5}
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
              name='description'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                update(e);
              }}
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
              name='category'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                update(e);
              }}
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
        </Form>
      </div>
      <Stats step={1} {...props} />
    </div>
  );
};

const Second = (props) => {
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState([]);

  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setFiles([]);
  };

  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  const onDropHandler = async (file) => {
    try {
      file.timestamp = new Date();
      var reader = new FileReader();
      reader.onload = function () {};
      reader.readAsText(file);
      if (files.length === 0) {
        await setFiles((files) => [...files, file]);
        props.update('image', file);
      } else {
        await setFiles([]);
        await setFiles((files) => [...files, file]);
        props.update('image', file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        Step 2/3: Upload image and set price
      </div>
      <div style={{ height: '55vh' }} className='mb-2'>
        <StyledDropZone
          onDrop={onDropHandler}
          accept='image/*'
          className='my-4'
        >
          {files.length === 0 ? (
            'Click or drop your file here'
          ) : (
            <div className='d-flex justify-content-center align-items-center'>
              <span
                style={{
                  width: '2rem',
                  verticalAlign: 'middle',
                  marginRight: '2rem'
                }}
              >
                <FileIcon
                  extension={files[0].name.substr(
                    files[0].name.lastIndexOf('.') + 1
                  )}
                  {...defaultStyles[
                    files[0].name.substr(files[0].name.lastIndexOf('.') + 1)
                  ]}
                />
              </span>{' '}
              <span style={{ verticalAlign: 'middle', marginRight: '2rem' }}>
                {files[0].name}
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
        <Form>
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
              name='price'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                update(e);
              }}
            />
          </InputGroup>
        </Form>
      </div>
      <Stats step={2} {...props} />
    </div>
  );
};

const Last = (props) => {
  //Editor
  const [editorValue, setEditorValue] = useState('');
  const [files, setFiles] = useState([]);

  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setFiles([]);
    setEditorValue('');
  };

  const handleEditorValue = () => {
    props.update('editorValue', editorValue);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent'
  ];

  const onDropHandler = async (file, text) => {
    try {
      file.timestamp = new Date();
      var reader = new FileReader();
      reader.onload = function () {
        setEditorValue(this.result);
      };
      reader.readAsText(file);
      if (files.length === 0) {
        await setFiles((files) => [...files, file]);
        props.update('image', file);
      } else {
        await setFiles([]);
        await setFiles((files) => [...files, file]);
        props.update('image', file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        Step 3/3: Upload data packet and handle sampling
      </div>
      <div style={{ height: '55vh' }} className='mb-2'>
        <StyledDropZone onDrop={onDropHandler} className='my-4'>
          {files.length === 0 ? (
            'Click or drop your file here'
          ) : (
            <div className='d-flex justify-content-center align-items-center'>
              <span
                style={{
                  width: '2rem',
                  verticalAlign: 'middle',
                  marginRight: '2rem'
                }}
              >
                <FileIcon
                  extension={files[0].name.substr(
                    files[0].name.lastIndexOf('.') + 1
                  )}
                  {...defaultStyles[
                    files[0].name.substr(files[0].name.lastIndexOf('.') + 1)
                  ]}
                />
              </span>{' '}
              <span style={{ verticalAlign: 'middle', marginRight: '2rem' }}>
                {files[0].name}
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
        <div style={{ height: '30vh' }}>
          <ReactQuill
            theme='snow'
            name='editor'
            modules={modules}
            formats={formats}
            value={editorValue}
            preserveWhitespace
            onChange={setEditorValue}
            style={{ height: '26vh' }}
          />
        </div>
      </div>
      <Stats step={3} {...props} handleEditorValue={handleEditorValue} />
    </div>
  );
};

export default CreatePacket;
