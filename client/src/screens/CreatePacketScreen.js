import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import 'react-drop-zone/dist/styles.css';
import { Container, Button } from 'react-bootstrap';
import StepWizard from 'react-step-wizard';
import Nav from '../components/WizardNav';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import LastStep from '../components/LastStep';
import ModalComponent from '../components/ModalComponent';
import '../css/wizard.css';
/* eslint react/prop-types: 0 */

const CreatePacketScreen = ({ history, match }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Component level State
  const [validationModal, showValidationModal] = useState(false);
  const [confirmationModal, showConfirmationModal] = useState(false);

  const [state, updateState] = useState({
    form: {}
  });

  // Component Methods
  const closeValidationModal = () => showValidationModal(false);
  const closeConfirmationModal = () => showConfirmationModal(false);

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    updateState({
      ...state,
      form
    });
  };

  const onStepChange = (stats) => {
    // console.log(stats);
  };

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW
    });

  const handleErrorOnClose = () => {
    //TODO:
  };

  const uploadHandler = () => {
    const { form } = state;
    if (!form.name) {
      showValidationModal(true);
    } else {
      showConfirmationModal(true);
    }
  };

  const handleProceed = () => {
    showConfirmationModal(false);
    console.log('YOU DID IT');
  };

  //This will be rendered
  return (
    <Container>
      <ModalComponent
        show={confirmationModal}
        close={closeConfirmationModal}
        proceed={handleProceed}
        title='Confirm Upload'
        body='Are you sure you want to proceed and upload the data packet?'
        danger={true}
        success={true}
      />
      <ModalComponent
        show={validationModal}
        close={closeValidationModal}
        title='Validation Failed'
        body='Be sure you uploaded all the necessary information. Only the image is not mandatory.'
        info={true}
      />
      <h1>Upload Data Packet</h1>
      <div className='row'>
        <div className={`col-12 rsw-wrapper`}>
          <StepWizard
            onStepChange={onStepChange}
            isHashEnabled
            nav={<Nav />}
            instance={setInstance}
          >
            <FirstStep hashKey={'step1'} update={updateForm} />
            <SecondStep
              hashKey={'step2'}
              update={updateForm}
              form={state.form}
            />
            <LastStep
              hashKey={'step3'}
              update={updateForm}
              uploadHandler={uploadHandler}
            />
          </StepWizard>
        </div>
      </div>
    </Container>
  );
};

export default CreatePacketScreen;
