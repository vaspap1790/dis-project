import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Steps from './Steps';
import { BANKING_DATA, IOT_SENSOR_DATA, OTHER } from '../constants/categories';
import { validateName, validateDescription } from '../utils/validator';

const FirstStep = (props) => {
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

  // This will be rendered
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
                Name must be from 5 to 100 characters long
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
                Description must be from 5 to 1000 characters long
              </div>
            )}
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='select'
              title='Enter Category'
              name='category'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                update(e);
              }}
            >
              <option value=''>Select Category</option>
              <option value={BANKING_DATA}>{BANKING_DATA}</option>
              <option value={IOT_SENSOR_DATA}>{IOT_SENSOR_DATA}</option>
              <option value={OTHER}>{OTHER}</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <Steps step={1} {...props} />
    </div>
  );
};

export default FirstStep;
