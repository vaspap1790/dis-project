import React from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalComponent = ({
  size,
  show,
  close,
  proceed,
  title,
  body,
  success,
  info,
  danger,
  closeButton,
  loading,
  errorMessage,
  successMessage,
  smartContract
}) => {
  return (
    <Modal
      size={size}
      show={show}
      onHide={close}
      backdrop='static'
      keyboard={false}
      centered
    >
      {closeButton ? (
        <Modal.Header
          closeButton
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          <Modal.Title style={{ color: 'white' }}>{title}</Modal.Title>
        </Modal.Header>
      ) : (
        <Modal.Header style={{ backgroundColor: 'black', color: 'white' }}>
          <Modal.Title style={{ color: 'white' }}>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        {successMessage !== null && (
          <Alert
            variant='success'
            // onClose={() => {
            //   handleSuccessOnClose();
            // }}
            // dismissible
          >
            {successMessage}
          </Alert>
        )}
        {errorMessage !== null && (
          <Alert
            variant='danger'
            // onClose={() => {
            //   handleErrorOnClose();
            // }}
            // dismissible
          >
            {errorMessage}
          </Alert>
        )}
        <div>{body}</div>
      </Modal.Body>
      <Modal.Footer>
        {smartContract && (
          <span style={{ fontStyle: 'italic' }} className='pb-2'>
            This operation needs to interact with the Blockchain. The gas needed
            will charge your account.
          </span>
        )}
        {info ? (
          <Button variant='info' onClick={close}>
            Close
          </Button>
        ) : null}
        {danger ? (
          <Button variant='danger' onClick={close}>
            Cancel
          </Button>
        ) : null}
        {success ? (
          <Button variant='success' onClick={proceed} disabled={loading}>
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
              <>Procced</>
            )}
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

ModalComponent.defaultProps = {
  size: 'md',
  info: false,
  danger: false,
  success: false,
  proceed: () => {
    console.log('Proceed');
  },
  closeButton: false,
  errorMessage: null,
  successMessage: null,
  smartContract: false
};

ModalComponent.propTypes = {
  info: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  closeButton: PropTypes.bool
};

export default ModalComponent;
