import React, { useState } from 'react';
import { StyledDropZone } from 'react-drop-zone';
import axios from 'axios';
import { Form, InputGroup, Image } from 'react-bootstrap';
import 'react-drop-zone/dist/styles.css';
import Stats from './Stats';
import Loader from '../components/Loader';

const SecondStep = (props) => {
  // Component level State
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  // Component Methods
  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setImage('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  const onDropHandler = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      props.update('image', data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
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
              <span style={{ verticalAlign: 'middle', marginRight: '2rem' }}>
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
