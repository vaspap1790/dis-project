import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Alert,
  Table,
  Form,
  InputGroup
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import ModalComponent from '../components/ModalComponent';
import Meta from '../components/Meta';
import 'react-drop-zone/dist/styles.css';
import { listPacketDetails, addToWatchlist } from '../actions/packetActions';
import { getUserRequests, createAction } from '../actions/actionActions';

const PacketScreen = ({ history, match, account, contract, web3 }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const packetDetails = useSelector((state) => state.packetDetails);
  const { loading: loadingDetails, error, packet } = packetDetails;

  const actionCreate = useSelector((state) => state.actionCreate);
  const {
    loading: loadingCreateAction,
    error: errorCreateAction,
    data
  } = actionCreate;

  const textAreaRefKey = useRef(null);
  const textAreaRefHash = useRef(null);

  // Component level State
  const [watchlistModal, showWatchlistModal] = useState(false);
  const [sampleModal, showSampleModal] = useState(false);
  const [purchaseModal, showPurchaseModal] = useState(false);
  const [loadingSampleModal, showLoadingSampleModal] = useState(false);
  const [loadingPurchaseModal, showLoadingPurchaseModal] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [hashCopied, setHashCopied] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPacketDetails(match.params.id));
  }, [dispatch, match]);

  // Component Methods
  const reloadTable = () => {
    dispatch(getUserRequests(userInfo._id));
  };

  const purchaseProceed = () => {
    showPurchaseModal(false);
    dispatch(
      createAction(
        packet._id,
        userInfo._id,
        packet.user._id,
        'Purchase',
        packet.price,
        account,
        contract,
        publicKey,
        web3
      )
    );
    showLoadingPurchaseModal(true);
  };

  const sampleProceed = () => {
    if (publicKey.length !== 0) {
      showSampleModal(false);

      dispatch(
        createAction(
          packet._id,
          userInfo._id,
          packet.user._id,
          'Sample',
          packet.price,
          account,
          contract,
          publicKey,
          web3
        )
      );
      setPublicKey('');
      showLoadingSampleModal(true);
    }
  };

  const sampleLoadingProceed = () => {
    reloadTable();
    showLoadingSampleModal(false);
  };

  const purchaseLoadingProceed = () => {
    reloadTable();
    showLoadingPurchaseModal(false);
  };

  const copyToClipboardKey = (e) => {
    textAreaRefKey.current.select();
    document.execCommand('copy');
    e.target.focus();
    setKeyCopied(true);
    setTimeout(function () {
      setKeyCopied(false);
    }, 3000);
  };

  const copyToClipboardHash = (e) => {
    textAreaRefHash.current.select();
    document.execCommand('copy');
    e.target.focus();
    setHashCopied(true);
    setTimeout(function () {
      setHashCopied(false);
    }, 3000);
  };

  const purchaseModalContent = (
    <>
      {loadingCreateAction ? (
        <Loader />
      ) : errorCreateAction ? (
        <Alert variant='danger'>{errorCreateAction}</Alert>
      ) : (
        <div className='my-2'>Your purchase request was successfully sent</div>
      )}
    </>
  );

  const sampleModalContent = (
    <>
      <div className='mb-3'>
        Are you sure you want to request a sample of this data item? You will
        need to enter your private key (mandatory):
      </div>
      <Form>
        <Form.Group controlId='pkey'>
          <Form.Control
            type='text'
            placeholder='Enter private key'
            title='Enter private key'
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
    </>
  );

  const sampleLoadingModalContent = (
    <>
      {loadingCreateAction ? (
        <>
          <Loader />
          <div>Retrieving key...</div>
        </>
      ) : errorCreateAction ? (
        <Alert variant='danger'>{errorCreateAction}</Alert>
      ) : (
        <>
          <div className='mb-2'>
            You can access the sample file in{' '}
            <span style={{ textDecoration: 'underline' }}>
              https://ipfs.infura.io/ipfs/
            </span>{' '}
            + IPFS Hash
          </div>
          <Table id='keyTable' bordered responsive size='sm'>
            <thead>
              <tr className='table-dark'>
                <th className='uploadsTableHeaders text-center p-2'>
                  IPFS Hash
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='d-flex align-items-center'>
                  <Col xs={12}>
                    <Row>
                      <InputGroup>
                        <Form.Control
                          type='textarea'
                          ref={textAreaRefHash}
                          value={data.ipfsHash}
                          aria-describedby='hashAppend'
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text
                            id='hashAppend'
                            style={{ borderLeft: '0.5px solid #fff' }}
                          >
                            <i
                              className='fas fa-clipboard fa-lg link-icon blue-hover'
                              onClick={copyToClipboardHash}
                              title='Copy IPFS Hash to Clipboard'
                            ></i>
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Row>
                    {hashCopied ? (
                      <Row className='mt-1 justify-content-end'>
                        <div style={{ color: '#3ca861' }} className='small'>
                          Hash copied to clipboard
                        </div>
                      </Row>
                    ) : null}
                  </Col>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className='my-2'>
            You can decypt the data with the following encryption key. For
            security reasons, the key is encrypted with your public key, thus
            you can decrypt it with your private key.
          </div>
          <Table id='keyTable' bordered responsive size='sm'>
            <thead>
              <tr className='table-dark'>
                <th className='uploadsTableHeaders text-center p-2'>
                  Encryption Key
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='d-flex align-items-center'>
                  <Col xs={12}>
                    <Row>
                      <InputGroup>
                        <Form.Control
                          type='textarea'
                          ref={textAreaRefKey}
                          value={data.encryptionKey}
                          aria-describedby='inputGroupPrepend'
                          readOnly
                        />
                        <InputGroup.Append>
                          <InputGroup.Text
                            id='inputGroupPrepend'
                            style={{ borderLeft: '0.5px solid #fff' }}
                          >
                            <i
                              className='fas fa-clipboard fa-lg link-icon blue-hover'
                              onClick={copyToClipboardKey}
                              title='Copy Encryption Key to Clipboard'
                            ></i>
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Row>
                    {keyCopied ? (
                      <Row className='mt-1 justify-content-end'>
                        <div style={{ color: '#3ca861' }} className='small'>
                          Key copied to clipboard
                        </div>
                      </Row>
                    ) : null}
                  </Col>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );

  const goBack = () => {
    history.goBack();
  };

  const addToWatclistHandler = (packet) => {
    dispatch(addToWatchlist(packet));
    showWatchlistModal(true);
  };

  const closeWatchlistModal = () => showWatchlistModal(false);
  const closeSampleModal = () => showSampleModal(false);
  const closePurchaseModal = () => showPurchaseModal(false);
  const closeLoadingSampleModal = () => showLoadingSampleModal(false);
  const closeLoadingPurchaseModal = () => showLoadingPurchaseModal(false);

  // This will be rendered
  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
        {loadingDetails ? (
          <Loader />
        ) : error ? null : (
          <>
            <Button
              className='btn btn-info mr-1'
              title='Add to Watchlist'
              onClick={() => addToWatclistHandler(packet)}
            >
              Watch <i className='fas fa-eye'></i>
            </Button>
            <Button
              onClick={() => showSampleModal(true)}
              className='btn btn-warning mr-1'
              disabled={userInfo === undefined || !userInfo}
              title={
                userInfo === undefined || !userInfo
                  ? 'You have to be logged in to perform this action'
                  : 'See a sample of the data packet'
              }
            >
              Sample <i className='fas fa-search'></i>
            </Button>
            <Button
              onClick={() => showPurchaseModal(true)}
              className='btn btn-success mr-1'
              disabled={userInfo === undefined || !userInfo}
              title={
                userInfo === undefined || !userInfo
                  ? 'You have to be logged in to perform this action'
                  : 'Purchase this item'
              }
            >
              Purchase <i className='fab fa-ethereum'></i>
            </Button>
            <Meta title={packet.name} />
          </>
        )}
      </Row>
      {/************************************* Main screen ***************************************/}
      {loadingDetails ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={6} className='px-0'>
              <Image
                src={packet.image === '' ? '/images/sample.jpg' : packet.image}
                alt={packet.name}
                fluid
              />
            </Col>
            <Col md={6} className='px-0'>
              <Row className='d-flex'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{packet.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: <i className='fab fa-ethereum'></i>
                    {packet.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={packet.rating}
                      text={`${packet.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Category: {packet.category}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {packet.description}
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Col>
          </Row>
        </>
      )}

      {/* Modals */}
      <ModalComponent
        show={watchlistModal}
        close={closeWatchlistModal}
        title='Add to Watchlist'
        body='You successfully added the data packet to the Watchlist'
        info={true}
      />
      <ModalComponent
        show={sampleModal}
        close={closeSampleModal}
        proceed={sampleProceed}
        title='Sample'
        body={sampleModalContent}
        danger={true}
        success={true}
      />
      <ModalComponent
        size='lg'
        show={loadingSampleModal}
        close={closeLoadingSampleModal}
        proceed={sampleLoadingProceed}
        title='Performing Action'
        body={sampleLoadingModalContent}
        success={true}
      />
      <ModalComponent
        show={purchaseModal}
        close={closePurchaseModal}
        proceed={purchaseProceed}
        title='Purchase'
        body='Are you sure you want to proceed and request to purchase this data packet?'
        danger={true}
        success={true}
      />
      <ModalComponent
        show={loadingPurchaseModal}
        close={closeLoadingPurchaseModal}
        proceed={purchaseLoadingProceed}
        title='Performing Action'
        body={purchaseModalContent}
        success={true}
      />
    </>
  );
};

export default PacketScreen;
