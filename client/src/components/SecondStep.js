import React, { useState } from 'react';
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { Form, InputGroup } from 'react-bootstrap';
import 'react-drop-zone/dist/styles.css';
import Stats from './Stats';

const SecondStep = (props) => {
  // Component level State
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState([]);

  // Component Methods
  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setFiles([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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

  // This will be rendered
  return (
    <div>
      <div className='d-flex justify-content-center'>
        Step 2/3: Upload image and set price
      </div>
      <div style={{ height: '55vh' }} className='mb-2 pt-4'>
        <StyledDropZone
          onDrop={onDropHandler}
          accept='image/*'
          className='mb-4'
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
        <Form onSubmit={submitHandler}>
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

export default SecondStep;
