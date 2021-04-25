import React, { useState } from 'react';
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { Alert, Table, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import 'react-drop-zone/dist/styles.css';
import Stats from './Stats';

const LastStep = (props) => {
  // Component level State
  const [files, setFiles] = useState([]);

  // Component Methods
  const removeFromUploadsHandler = (key) => {
    setFiles(files.filter((file) => file.key !== key));
  };

  const onDropHandler = async (filesUploaded) => {
    for (let i = 0; i < filesUploaded.length; i++) {
      try {
        filesUploaded[i].timestamp = new Date();
        filesUploaded[i].key = filesUploaded[i].timestamp + i;

        await setFiles((files) => [...files, filesUploaded[i]]);
        console.log(files);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // This will be rendered
  return (
    <div>
      <div className='d-flex justify-content-center'>
        Step 3/3: Upload data packet and handle sampling
      </div>
      {props.error && props.error !== null && (
        <Alert variant='danger'>{props.error}</Alert>
      )}
      <div
        style={{ minHeight: '55vh' }}
        className={props.error && props.error !== null ? 'mb-2' : 'mb-2 pt-4'}
      >
        <StyledDropZone multiple onDrop={onDropHandler} className='mb-4' />

        <Table id='uploadsTable' bordered responsive size='sm'>
          <thead>
            <tr className='table-dark'>
              <th className='uploadsTableHeaders text-center p-2'>Type</th>
              <th className='uploadsTableHeaders text-center p-2'>File Name</th>
              <th className='uploadsTableHeaders text-center p-2'>Date</th>
              <th className='uploadsTableHeaders text-center p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.key}>
                <td
                  style={{ width: '1rem', verticalAlign: 'middle' }}
                  className='p-2 small'
                >
                  <FileIcon
                    extension={file.name.substr(file.name.lastIndexOf('.') + 1)}
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
                  <Moment format='D MMM YYYY hh:mm:ss'>{file.timestamp}</Moment>
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
                    onClick={() => removeFromUploadsHandler(file.key)}
                  >
                    <i className='fas fa-trash trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Stats step={3} {...props} files={files} />
    </div>
  );
};

export default LastStep;
