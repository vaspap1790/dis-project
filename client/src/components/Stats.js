import React, { useState } from 'react';
import ModalComponent from './ModalComponent';
import { OverlayTrigger, Popover, Spinner, Image } from 'react-bootstrap';

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
  // Component level State
  const [infoModal, showInfoModal] = useState(false);

  // Component Variables
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3'>Upload Image</Popover.Title>
      <Popover.Content>
        Tis image will be displayed for your item in the platform's landing
        page. It is not mandatory to upload an image. If you don't, the default
        image will be displayed.
      </Popover.Content>
    </Popover>
  );

  const infoModalContent = (
    <div style={{ height: '50vh', overflowX: 'hidden', overflowY: 'auto' }}>
      <Image
        src='/images/seller-upload.png'
        alt='Upload Protocol'
        style={{ maxWidth: '100%' }}
        className='p-3'
      />
    </div>
  );

  // Component Methods
  const closeInfoModal = () => showInfoModal(false);
  const openInfoModal = () => showInfoModal(true);

  // This will be rendered
  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        {currentStep === 2 && (
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
        {currentStep === 3 && (
          <>
            <button className='btn btn-info' onClick={() => openInfoModal()}>
              <i className='fas fa-search-plus fa-lg'></i>
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
      {/* Modals */}
      <ModalComponent
        show={infoModal}
        close={closeInfoModal}
        title='Upload Protocol'
        body={infoModalContent}
        info={true}
      />
    </>
  );
};

export default Stats;
