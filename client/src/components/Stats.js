import React from 'react';
import { OverlayTrigger, Popover, Spinner } from 'react-bootstrap';

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
  loading,
  files,
  update
}) => {
  // Component Methods
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3'>
        {step === 2 ? 'Upload Image' : 'Upload Data and Sampling'}
      </Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  // This will be rendered
  return (
    <div className='d-flex justify-content-end align-items-center'>
      {step > 1 && (
        <>
          <button className='btn btn-info'>
            <OverlayTrigger
              trigger='click'
              placement='top'
              rootClose
              overlay={popover}
            >
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
          title='Upload Data Packet'
          onClick={() => {
            update('data', files);
            uploadHandler();
          }}
        >
          {loading ? (
            <>
              Loading...
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            </>
          ) : (
            <>
              Upload <i className='fas fa-upload'></i>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Stats;
