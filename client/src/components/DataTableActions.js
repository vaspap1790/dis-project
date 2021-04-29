import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Image, Form, Alert } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Loader from './Loader';
import { getUserActions } from '../actions/actionActions';

//import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const DataTablePurchased = () => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const actionList = useSelector((state) => state.actionList);
  const { actions: data, loading, error } = actionList;

  // Component level State
  const [packetId, setPacketId] = useState('');

  // Hook that triggers when component did mount
  // useEffect(() => {
  //   dispatch(getUserActions(userInfo._id));
  //   setInterval(function () {
  //     dispatch(getUserActions(userInfo._id));
  //   }, 60000);
  // }, [dispatch, userInfo]);

  // Component Methods
  // const handleUserActionsErrorOnClose = () => {
  //   dispatch(emptyAccessProfileError());
  // };

  const markAsRead = () => {
    //TODO:
  };

  const markAsUnread = () => {
    //TODO:
  };

  const deleteNotification = () => {
    //TODO:
  };

  // Header formatters
  const imageHeaderFormatter = (column, colIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {column.text}
      </div>
    );
  };

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
        <span className='order-last'>{filterElement}</span>
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

  const userHeaderFormatter = (column, colIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {column.text}
      </div>
    );
  };

  const statusHeaderFormatter = (column, colIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {column.text}
      </div>
    );
  };

  const typeHeaderFormatter = (column, colIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {column.text}
      </div>
    );
  };

  //Column formatters
  const imageFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <Link to={`/packet/${row.packet._id}`}>
          <Image
            src={cell}
            alt={row.name}
            title={row.name}
            fluid
            rounded
            style={{ width: '4rem', height: '3rem' }}
          />
        </Link>
      </div>
    );
  };

  const nameFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align small' style={{ height: '3rem' }}>
        <Link to={`/packet/${row.packet._id}`}>{cell}</Link>
      </div>
    );
  };

  const userFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align small' style={{ height: '3rem' }}>
        by&nbsp;
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
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span
          className={
            cell === 'Sample'
              ? 'small badge-pill badge-warning'
              : cell === 'Purchase'
              ? 'small badge-pill badge-success'
              : ''
          }
        >
          {cell}
        </span>
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
              : ''
          }
        >
          {cell}
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

  const actionFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        {cell.readByReceiver !== false ? (
          <span
            type='button'
            variant='primary'
            title='Mark as Read'
            className='blue-hover'
            onClick={() => {
              markAsRead(cell);
            }}
          >
            <i className='fas fa-bookmark'></i>
          </span>
        ) : (
          <span
            type='button'
            variant='primary'
            title='Mark as Unread'
            className='blue-hover'
            onClick={() => {
              markAsUnread(cell);
            }}
          >
            <i className='far fa-bookmark'></i>{' '}
          </span>
        )}
        &nbsp;
        <span
          type='button'
          variant='primary'
          title='Delete Notification'
          className='blue-hover'
          onClick={() => {
            deleteNotification(cell);
          }}
        >
          <i className='fas fa-times' style={{ color: '#d9534f' }}></i>{' '}
        </span>
      </div>
    );
  };

  //Column Declaration
  const columns = [
    {
      dataField: 'packet.image',
      text: 'Image',
      headerStyle: {
        borderStyle: 'none'
      },
      classes: 'hide-md',
      headerClasses: 'hide-md',
      formatter: imageFormatter,
      headerFormatter: imageHeaderFormatter
    },
    {
      dataField: 'packet.name',
      text: 'Name',
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
      text: 'User',
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

  //DataTablePurchased instantiation
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
            noDataIndication={'No actions'}
            pagination={paginationFactory(pagingOptions)}
            filter={filterFactory()}
            headerClasses='table-dark'
            rowStyle={unread}
          />
        )}
      </div>

      {/* Modals */}
    </>
  );
};

export default DataTablePurchased;
