import React, { useState } from 'react';
import { StyledDropZone } from 'react-drop-zone';
import { FileIcon, defaultStyles } from 'react-file-icon';
import ReactQuill from 'react-quill';
import { Alert } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import 'react-drop-zone/dist/styles.css';
import Stats from './Stats';

const LastStep = (props) => {
  // Component level State
  const [editorValue, setEditorValue] = useState('');
  const [files, setFiles] = useState([]);

  // Component Variables
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

  // Component Methods
  const removeFromUploadsHandler = (e) => {
    e.stopPropagation();
    setFiles([]);
    setEditorValue('');
  };

  const handleEditorValue = () => {
    props.update('editorValue', editorValue);
  };

  const onDropHandler = async (file) => {
    try {
      file.timestamp = new Date();
      var reader = new FileReader();
      reader.onload = function () {
        setEditorValue(this.result);
      };
      reader.readAsText(file);
      if (files.length === 0) {
        await setFiles((files) => [...files, file]);
        props.update('data', file);
      } else {
        await setFiles([]);
        await setFiles((files) => [...files, file]);
        props.update('data', file);
      }
    } catch (error) {
      console.log(error);
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
        style={{ height: '55vh' }}
        className={props.error && props.error !== null ? 'mb-2' : 'mb-2 pt-4'}
      >
        <StyledDropZone onDrop={onDropHandler} className='mb-4'>
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

export default LastStep;
