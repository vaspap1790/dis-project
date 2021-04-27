import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import 'react-drop-zone/dist/styles.css';
import StepWizard from 'react-step-wizard';
import Nav from '../components/WizardNav';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import LastStep from '../components/LastStep';
import ModalComponent from '../components/ModalComponent';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import ipfs from '../utils/ipfs';
import '../css/wizard.css';
import { Button, Row, Container } from 'react-bootstrap';
import {
  createPacket,
  emptyCreatePacketError,
  emptyCreatePacketSuccess
} from '../actions/packetActions';
import {
  validateName,
  validateDescription,
  validateCategory
} from '../utils/validator';
/* eslint react/prop-types: 0 */

const CreatePacketScreen = ({ history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const packetCreate = useSelector((state) => state.packetCreate);
  const { loading, error, success } = packetCreate;

  // Component level State
  const [validationModal, showValidationModal] = useState(false);
  const [confirmationModal, showConfirmationModal] = useState(false);
  const [loadingModal, showLoadingModal] = useState(false);

  const [state, updateState] = useState({
    form: {}
  });

  // Hook that triggers when component did mount
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (success) {
      history.push(`/profile`);
    }
  }, [history, userInfo, success]);

  // Component Methods
  const closeValidationModal = () => showValidationModal(false);
  const closeConfirmationModal = () => showConfirmationModal(false);
  const closeLoadingModal = () => showLoadingModal(false);

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

  const uploadHandler = () => {
    const { form } = state;
    let keys = true;
    for (let i = 0; i < form.data.length; i++) {
      if (form.data[i].encryptionKey === '') {
        keys = false;
      }
    }

    if (
      !keys ||
      !form.name ||
      !validateName(form.name) ||
      !form.description ||
      !validateDescription(form.description) ||
      !form.category ||
      !validateCategory(form.category) ||
      !form.price ||
      !form.data
    ) {
      showValidationModal(true);
    } else {
      showConfirmationModal(true);
    }
  };

  const uploadToIPFS = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const result = await ipfs.add(Buffer(reader.result));
        resolve(result);
      };
    });
  };

  const handleProceed = async () => {
    const { form } = state;
    const files = form.data;

    showConfirmationModal(false);
    showLoadingModal(true);

    let encryptionKeys = [];
    let ipfsHashes = [];

    for (let i = 0; i < files.length; i++) {
      const result = await uploadToIPFS(files[i]);
      ipfsHashes.push(result.path);
      encryptionKeys.push(files[i].encryptionKey);
    }

    const newPacket = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: form.price,
      image: form.image,
      ipfsHashes: ipfsHashes,
      encryptionKeys: encryptionKeys
    };

    dispatch(createPacket(newPacket));
    showLoadingModal(false);

    setTimeout(function () {
      dispatch(emptyCreatePacketError());
      dispatch(emptyCreatePacketSuccess());
    }, 8000);
  };

  const goBack = () => {
    history.goBack();
  };

  const loadingModalContent = (
    <>
      <Loader />
      <div className='my-2'>Uploading your files to IPFS...</div>
    </>
  );

  //This will be rendered
  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Meta title='Data Dapp | Upload Item' />
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
        <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
          Upload Data Packet
        </h1>
      </Row>

      {/************************************** Main Screen ****************************************/}
      <Container>
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
                error={error}
                loading={loading}
              />
            </StepWizard>
          </div>
        </div>

        {/* Modals */}
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
          show={loadingModal}
          close={closeLoadingModal}
          title='Uploading...'
          body={loadingModalContent}
        />
        <ModalComponent
          show={validationModal}
          close={closeValidationModal}
          title='Validation Failed'
          body='Be sure you uploaded all the necessary information. Image and sampling are not mandatory.'
          info={true}
        />
      </Container>
    </>
  );
};

export default CreatePacketScreen;
