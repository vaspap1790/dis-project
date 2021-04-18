import React from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalComponent = ({
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
  successMessage
}) => {
  return (
    <Modal
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
          <Button variant='success' onClick={proceed}>
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
  info: false,
  danger: false,
  success: false,
  procced: () => {
    console.log('Proceed');
  },
  closeButton: false,
  errorMessage: null,
  successMessage: null
};

ModalComponent.propTypes = {
  info: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  closeButton: PropTypes.bool
};

export default ModalComponent;
