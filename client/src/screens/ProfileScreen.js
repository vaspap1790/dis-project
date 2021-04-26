import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Packet from '../components/Packet';
import DataTable from '../components/DataTable';
import Sorting from '../components/Sorting';
import Meta from '../components/Meta';
import { Button, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProfileSidebar from '../components/ProfileSidebar';
import {
  getUserPackets,
  emptyUserPacketsError,
  listPacketData
} from '../actions/packetActions';

const ProfileScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const userDetailsId = match.params.id;
  const pageNumberFromURL = match.params.pageNumber || 1;

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const packetsUser = useSelector((state) => state.packetsUser);
  const { packets, loading, error, pages, page } = packetsUser;

  const [sorting, setSorting] = useState('createdAt_desc');
  const [pageNumber, setPageNumber] = useState(pageNumberFromURL);

  // Component Variables
  const userDetails = !userInfo
    ? true
    : userDetailsId !== undefined && userInfo._id !== userDetailsId
    ? true
    : false;

  // Hook that triggers when component did mount
  useEffect(() => {
    if (userDetails) {
      dispatch(getUserPackets(userDetailsId, pageNumber, sorting));
    } else {
      dispatch(getUserPackets(userInfo._id, pageNumber, sorting));
    }
  }, [
    dispatch,
    userLogin,
    userInfo,
    userDetails,
    userDetailsId,
    pageNumber,
    sorting
  ]);

  // Component Methods
  const uploadHandler = () => {
    history.push('/packets/create');
  };

  const updateHandler = (e) => {
    dispatch(listPacketData(e.target.id));
    history.push(`/packets/update/${e.target.id}`);
  };

  const handlePageNumber = (value) => {
    setPageNumber(value);
  };

  const handleSorting = (value) => {
    setSorting(value);
  };

  const handleUserPacketsErrorOnClose = () => {
    dispatch(emptyUserPacketsError());
  };

  const goBack = () => {
    history.goBack();
  };

  // This will be rendered
  return (
    <>
      {/************************************** Nav&Title ****************************************/}
      <Row className='d-flex justify-content-start align-items-center mb-3'>
        <Meta title='Data Dapp | Profile' />
        <Button
          className='btn btn-primary mr-1'
          title='Go Back'
          onClick={goBack}
        >
          Go Back
        </Button>
        {userInfo && !userDetails ? (
          <Button
            className='btn btn-success mr-1'
            title='Upload a data packet'
            onClick={uploadHandler}
          >
            Upload <i className='fas fa-upload'></i>
          </Button>
        ) : null}
        <h1 className='my-auto ml-2' style={{ display: 'inline' }}>
          User Profile
        </h1>
      </Row>

      <Row>
        {/************************************** Sidebar *****************************************/}
        <Col xs={2}>
          <ProfileSidebar id={userDetails ? userDetailsId : userInfo._id} />
        </Col>
        {/************************************* Main screen ***************************************/}
        <Col xs={10}>
          {loading ? (
            <Loader />
          ) : (
            <Tabs defaultActiveKey='uploaded' transition={false}>
              {/*************** Uploaded Tab *******************/}
              <Tab eventKey='uploaded' title='Uploaded'>
                {error && error === 'No data Packets uploaded' ? (
                  <Alert variant='info' className='mt-3'>
                    {error}
                  </Alert>
                ) : error && error !== 'No items uploaded' ? (
                  <Alert
                    variant='danger'
                    className=' mt-3'
                    onClose={() => {
                      handleUserPacketsErrorOnClose();
                    }}
                    dismissible
                  >
                    {error}
                  </Alert>
                ) : (
                  <>
                    <Row className='mx-0 align-items-center mt-3'>
                      <Col xs={2}>
                        <Sorting
                          sorting={sorting}
                          handleSorting={handleSorting}
                        />
                      </Col>
                      <Col xs={10}>
                        <Row className='d-flex justify-content-end'>
                          <Paginate
                            pages={pages}
                            page={page}
                            handlePage={handlePageNumber}
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row className='align-items-center'>
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Alert variant='danger' style={{ width: '30vw' }}>
                          {error}
                        </Alert>
                      ) : (
                        <>
                          {packets !== undefined
                            ? packets.map((packet) => (
                                <Col
                                  key={packet._id}
                                  sm={12}
                                  md={6}
                                  lg={4}
                                  xl={3}
                                >
                                  <Packet
                                    handler={updateHandler}
                                    packet={packet}
                                    isProfile={true}
                                  />
                                </Col>
                              ))
                            : null}
                        </>
                      )}
                    </Row>
                    <Row className='d-flex justify-content-end mx-0'>
                      <Paginate
                        pages={pages}
                        page={page}
                        handlePage={handlePageNumber}
                      />
                    </Row>
                  </>
                )}
              </Tab>
              {/*************** Purchased Tab ******************/}
              {!userDetails ? (
                <Tab eventKey='purchased' title='Purchased'>
                  <DataTable />
                </Tab>
              ) : null}
            </Tabs>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
