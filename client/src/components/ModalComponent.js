import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalComponent = ({
  show,
  close,
  proceed,
  title,
  body,
  success,
  info,
  danger
}) => {
  return (
    <Modal
      show={show}
      onHide={close}
      backdrop='static'
      keyboard={false}
      centered
    >
      <Modal.Header style={{ backgroundColor: 'black', color: 'white' }}>
        <Modal.Title style={{ color: 'white' }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
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
            Proceed
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
  }
};

ModalComponent.propTypes = {
  info: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool
};

export default ModalComponent;
