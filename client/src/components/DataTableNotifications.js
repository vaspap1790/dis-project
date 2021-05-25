import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Image, Alert, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Loader from './Loader';
import { countUnreadActions } from '../actions/actionActions';
import ModalComponent from '../components/ModalComponent';
import { prelistPacketDetails } from '../actions/packetActions';
import { getUserNotifications, updateAction } from '../actions/actionActions';

const DataTableNotifications = ({ account, contract, web3 }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const notifList = useSelector((state) => state.notifList);
  const { notifications: data, loading, error } = notifList;

  const actionUpdate = useSelector((state) => state.actionUpdate);
  const { loading: actionUpdateLoading, error: actionUpdateError } =
    actionUpdate;

  // Component level State
  const [actionId, setActionId] = useState('');
  const [readModal, showReadModal] = useState(false);
  const [unreadModal, showUnreadModal] = useState(false);
  const [approveModal, showApproveModal] = useState(false);
  const [rejectModal, showRejectModal] = useState(false);
  const [removeModal, showRemoveModal] = useState(false);
  const [loadingModal, showLoadingModal] = useState(false);

  // Component Methods
  const closeReadModal = () => showReadModal(false);
  const closeUnreadModal = () => showUnreadModal(false);
  const closeApproveModal = () => showApproveModal(false);
  const closeRejectModal = () => showRejectModal(false);
  const closeRemoveModal = () => showRemoveModal(false);
  const closeLoadingModal = () => showLoadingModal(false);

  const reloadTable = () => {
    dispatch(countUnreadActions(userInfo._id));
    dispatch(getUserNotifications(userInfo._id));
  };

  const readProceed = async () => {
    showReadModal(false);
    dispatch(updateAction(actionId, 'Read', userInfo._id));
    showLoadingModal(true);
  };

  const unreadProceed = async () => {
    showUnreadModal(false);
    dispatch(updateAction(actionId, 'Unread', userInfo._id));
    showLoadingModal(true);
  };

  const rejectProceed = async () => {
    showRejectModal(false);
    dispatch(
      updateAction(actionId, 'Reject', userInfo._id, account, contract, web3)
    );
    showLoadingModal(true);
  };

  const approveProceed = () => {
    showApproveModal(false);
    dispatch(
      updateAction(actionId, 'Approve', userInfo._id, account, contract, web3)
    );
    showLoadingModal(true);
  };

  const removeProceed = () => {
    showRemoveModal(false);
    dispatch(updateAction(actionId, 'Remove', userInfo._id));
    showLoadingModal(true);
  };

  const loadingProceed = () => {
    reloadTable();
    showLoadingModal(false);
  };

  const loadingModalContent = (
    <>
      {actionUpdateLoading ? (
        <Loader />
      ) : actionUpdateError ? (
        <Alert variant='danger'>{actionUpdateError}</Alert>
      ) : (
        <div className='my-2'>Action Completed</div>
      )}
    </>
  );

  // Header formatters
  const nameHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span>{column.text}</span>
        <span>{sortElement}</span>
        <span className='order-last'>{filterElement}</span>
      </div>
    );
  };

  const dateHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span>{column.text}</span>
        <span>{sortElement}</span>
      </div>
    );
  };

  const actionHeaderFormatter = (column, colIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {column.text}
      </div>
    );
  };

  const userHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span>{column.text}</span>
        <span>{sortElement}</span>{' '}
      </div>
    );
  };

  const statusHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span>{column.text}</span>
        <span>{sortElement}</span>
      </div>
    );
  };

  const typeHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span>{column.text}</span>
        <span>{sortElement}</span>{' '}
      </div>
    );
  };

  const readHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span>{column.text}</span>
        <span>{sortElement}</span>{' '}
      </div>
    );
  };

  //Column formatters
  const nameFormatter = (cell, row, rowIndex) => {
    return (
      <div className='' style={{ height: '3rem' }}>
        <Row>
          <Col xs={1}></Col>
          <Col xs={3} className='v-align justify-content-start'>
            <Link to={`/packet/${row.packet._id}`} onClick={clickHandler}>
              <Image
                src={row.packet.image}
                alt={row.name}
                title={row.name}
                fluid
                rounded
                style={{ width: '4rem', height: '3rem' }}
              />
            </Link>
          </Col>
          <Col xs={4} className='v-align h-align small'>
            <Link
              to={`/packet/${row.packet._id}`}
              onClick={clickHandler}
              title={row.packet.name}
            >
              {cell}
            </Link>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </div>
    );
  };

  const userFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align small' style={{ height: '3rem' }}>
        <Link
          to={`/profile/${row.requester._id}`}
          className='link'
          title='See User Profile'
        >
          {cell}
        </Link>
      </div>
    );
  };

  const typeFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align small' style={{ height: '3rem' }}>
        {cell}
      </div>
    );
  };

  const statusFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span
          className={
            cell === 'Pending'
              ? 'small badge-pill badge-info'
              : cell === 'Approved'
              ? 'small badge-pill badge-success'
              : cell === 'Rejected'
              ? 'small badge-pill badge-danger'
              : cell === 'No Status'
              ? 'small'
              : ''
          }
        >
          {cell === 'No Status' ? (
            <span style={{ fontStyle: 'italic' }}>{cell}</span>
          ) : (
            cell
          )}
        </span>
      </div>
    );
  };

  const dateFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align small' style={{ height: '3rem' }}>
        <Moment format='D MMM YYYY hh:mm:ss'>{cell}</Moment>
      </div>
    );
  };

  const readFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {row.readByReceiver === false ? (
          <span
            type='button'
            variant='primary'
            title='Mark as Read'
            className='blue-hover'
            onClick={() => {
              setActionId(row._id);
              showReadModal(true);
            }}
          >
            <i className='far fa-bookmark'></i>
          </span>
        ) : (
          <span
            type='button'
            variant='primary'
            title='Mark as Unread'
            className='blue-hover'
            onClick={() => {
              setActionId(row._id);
              showUnreadModal(true);
            }}
          >
            <i className='fas fa-bookmark'></i>{' '}
          </span>
        )}
      </div>
    );
  };

  const actionFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {row.status === 'Pending' ? (
          <>
            <span
              type='button'
              variant='primary'
              title='Approve Request'
              className='blue-hover'
              onClick={() => {
                setActionId(row._id);
                showApproveModal(true);
              }}
            >
              <i className='fas fa-check' style={{ color: '#4bbf73' }}></i>{' '}
            </span>
            &nbsp;
            <span
              type='button'
              variant='primary'
              title='Reject Request'
              className='blue-hover'
              onClick={() => {
                setActionId(row._id);
                showRejectModal(true);
              }}
            >
              <i className='fas fa-times' style={{ color: '#d9534f' }}></i>{' '}
            </span>
            &nbsp;
          </>
        ) : null}
        {row.status !== 'Pending' ? (
          <>
            &nbsp;
            <span
              type='button'
              variant='primary'
              title='Delete Notification'
              className='blue-hover'
              onClick={() => {
                setActionId(row._id);
                showRemoveModal(true);
              }}
            >
              <i className='fas fa-trash-alt' style={{ color: '#d9534f' }}></i>{' '}
            </span>
          </>
        ) : null}
      </div>
    );
  };

  //Column Declaration
  const columns = [
    {
      dataField: 'packet.name',
      text: 'Item Name',
      sort: true,
      headerTitle: true,
      filter: textFilter(),
      headerStyle: {
        borderStyle: 'none',
        borderRightStyle: 'solid',
        borderRightColor: '#fff',
        borderLeftStyle: 'solid',
        borderLeftColor: '#fff'
      },
      formatter: nameFormatter,
      headerFormatter: nameHeaderFormatter
    },
    {
      dataField: 'requester.username',
      text: 'Request from',
      sort: true,
      headerTitle: true,
      headerStyle: {
        borderStyle: 'none',
        borderRightStyle: 'solid',
        borderRightColor: '#fff',
        borderLeftStyle: 'solid',
        borderLeftColor: '#fff'
      },
      formatter: userFormatter,
      headerFormatter: userHeaderFormatter
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      headerTitle: true,
      headerStyle: {
        borderStyle: 'none',
        borderRightStyle: 'solid',
        borderRightColor: '#fff',
        borderLeftStyle: 'solid',
        borderLeftColor: '#fff'
      },
      formatter: typeFormatter,
      headerFormatter: typeHeaderFormatter
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerTitle: true,
      headerStyle: {
        borderStyle: 'none',
        borderRightStyle: 'solid',
        borderRightColor: '#fff',
        borderLeftStyle: 'solid',
        borderLeftColor: '#fff'
      },
      formatter: statusFormatter,
      headerFormatter: statusHeaderFormatter
    },
    {
      dataField: 'createdAt',
      text: 'Date',
      sort: true,
      headerTitle: true,
      headerStyle: {
        borderStyle: 'none',
        borderRightStyle: 'solid',
        borderRightColor: '#fff'
      },
      formatter: dateFormatter,
      headerFormatter: dateHeaderFormatter
    },
    {
      dataField: 'readByReceiver',
      text: 'Read',
      sort: true,
      headerStyle: {
        borderStyle: 'none',
        borderRightStyle: 'solid',
        borderRightColor: '#fff'
      },
      formatter: readFormatter,
      headerFormatter: readHeaderFormatter
    },
    {
      dataField: 'packet._id',
      text: 'Actions',
      headerStyle: {
        borderStyle: 'none'
      },
      formatter: actionFormatter,
      headerFormatter: actionHeaderFormatter
    }
  ];

  //Sorting Options
  const defaultSorted = [
    {
      dataField: 'createdAt',
      order: 'desc'
    }
  ];

  //Pagination Options
  const pagingOptions = {
    paginationSize: 5,
    pageStartIndex: 1,
    showTotal: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5
      },
      {
        text: '10',
        value: 10
      },
      {
        text: 'All',
        value: data.length
      }
    ]
  };

  const unread = (row, rowIndex) => {
    const style = {};
    if (row.readByReceiver === false) {
      style.backgroundColor = '#d2ebf5';
    }

    return style;
  };

  const clickHandler = () => {
    dispatch(prelistPacketDetails());
  };

  //DataTableNotifications instantiation
  return (
    <>
      <div className='p-2 mt-3'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert
            variant='danger'
            // onClose={() => {
            //   handleUserActionsErrorOnClose();
            // }}
            // dismissible
          >
            {error}{' '}
            {error === 'Not Authorised!' ? (
              <span>
                Try to Logout and Login again to refresh your access token
              </span>
            ) : (
              ''
            )}
          </Alert>
        ) : (
          <BootstrapTable
            bootstrap4
            keyField='createdAt'
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
            striped
            hover
            condensed
            noDataIndication={'No notifications'}
            pagination={paginationFactory(pagingOptions)}
            filter={filterFactory()}
            headerClasses='table-dark'
            rowStyle={unread}
          />
        )}
      </div>

      {/* Modals */}
      <ModalComponent
        show={loadingModal}
        close={closeLoadingModal}
        proceed={loadingProceed}
        title='Performing Action'
        body={loadingModalContent}
        success={true}
        loading={actionUpdateLoading}
      />
      <ModalComponent
        show={readModal}
        close={closeReadModal}
        proceed={readProceed}
        title='Confirm Mark as Read'
        body='Are you sure you want to mark this notification as read?'
        danger={true}
        success={true}
      />
      <ModalComponent
        show={unreadModal}
        close={closeUnreadModal}
        proceed={unreadProceed}
        title='Confirm Mark as Unread'
        body='Are you sure you want to mark this notification as unread?'
        danger={true}
        success={true}
      />
      <ModalComponent
        show={approveModal}
        close={closeApproveModal}
        proceed={approveProceed}
        title='Confirm Approve'
        body='Are you sure you want to proceed and approve the purchase request? All other requests for this item will be rejected.'
        danger={true}
        success={true}
        smartContract={true}
      />
      <ModalComponent
        show={rejectModal}
        close={closeRejectModal}
        proceed={rejectProceed}
        title='Confirm Reject'
        body='Are you sure you want to proceed and reject the purchase request?'
        danger={true}
        success={true}
        smartContract={true}
      />
      <ModalComponent
        show={removeModal}
        close={closeRemoveModal}
        proceed={removeProceed}
        title='Confirm Remove'
        body='Are you sure you want to proceed and remove this notification?'
        danger={true}
        success={true}
      />
    </>
  );
};

export default DataTableNotifications;
