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
    form: {},
    transitions: {}
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
            <Second hashKey={'step2'} form={state.form} />
            <Last hashKey={'step3'} />
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
  step
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
        <button className='btn btn-success' onClick={nextStep}>
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
            onChange={(e) => setCategory(e.target.value)}
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
      <hr />
      <label>First Name</label>
      <input
        type='text'
        className='form-control'
        name='firstname'
        placeholder='First Name'
        onChange={update}
      />
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

  const onDropHandler = async (file, text) => {
    try {
      //file.timestamp = new Date();
      //console.log(file);
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
  const validate = () => {
    if (window.confirm('Are you sure you want to go back?')) {
      // eslint-disable-line
      props.previousStep();
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        Step 2/3: Upload image and set price
      </div>
      <StyledDropZone onDrop={onDropHandler} accept='image/*' className='my-4'>
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputGroup>
      </Form>
      {props.form.firstname && <h3>Hey {props.form.firstname}!</h3>}
      <Stats step={2} {...props} previousStep={validate} />
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

  const handleSave = () => {
    console.log(editorValue);
    //TODO:
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
      //file.timestamp = new Date();
      var reader = new FileReader();
      reader.onload = function () {
        setEditorValue(this.result);
      };
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

  const submit = () => {
    alert('You did it! Yay!'); // eslint-disable-line
  };

  return (
    <div>
      <div style={{ height: '60vh' }} className='mb-2'>
        <div className='d-flex justify-content-center'>
          Step 3/3: Upload data packet and handle sampling
        </div>
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
            modules={modules}
            formats={formats}
            value={editorValue}
            preserveWhitespace
            onChange={setEditorValue}
            style={{ height: '26vh' }}
          />
        </div>
      </div>
      <Stats step={3} {...props} nextStep={submit} />
    </div>
  );
};

export default CreatePacket;
