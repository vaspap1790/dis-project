import React, { useState } from 'react';
import ModalComponent from './ModalComponent';
import { Spinner, Image } from 'react-bootstrap';

const Steps = ({
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
  const [infoImageModal, showInfoImageModal] = useState(false);

  // Component Variables
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

  const infoImageModalContent = (
    <div>
      Tis image will be displayed for your item in the platform's landing page.
      It is not mandatory to upload an image. If you don't, the default image
      will be displayed.
    </div>
  );

  // Component Methods
  const closeInfoModal = () => showInfoModal(false);
  const openInfoModal = () => showInfoModal(true);
  const closeInfoImageModal = () => showInfoImageModal(false);
  const openInfoImageModal = () => showInfoImageModal(true);

  // This will be rendered
  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        {currentStep === 2 && (
          <>
            <button
              className='btn btn-info'
              onClick={() => openInfoImageModal()}
              title='Upload Image Information'
            >
              <i className='fas fa-search-plus fa-lg'></i>
            </button>
            <button className='btn btn-warning mx-2' onClick={previousStep}>
              STEP {currentStep - 1}
            </button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <button
              className='btn btn-info'
              onClick={() => openInfoModal()}
              title='Upload Protocol'
            >
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
      <ModalComponent
        show={infoImageModal}
        close={closeInfoImageModal}
        title='Upload image'
        body={infoImageModalContent}
        info={true}
      />
    </>
  );
};

export default Steps;
