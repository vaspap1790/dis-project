import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Image, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ModalComponent from '../components/ModalComponent';
import {
  createPacketReview,
  emptyCreateReviewError,
  emptyCreateReviewSuccess
} from '../actions/reviewActions';

//import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const DataTable = ({ data }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: reviewLoading,
    error: reviewError,
    success: reviewSuccess
  } = reviewCreate;

  // Component level State
  const [ratingModal, showRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [packetId, setPacketId] = useState('');

  const form = (
    <Form>
      <Form.Group controlId='rating'>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as='select'
          value={rating}
          className='link-icon'
          onChange={(e) => setRating(e.target.value)}
        >
          <option value=''>Select...</option>
          <option value='1'>1 - Poor</option>
          <option value='2'>2 - Fair</option>
          <option value='3'>3 - Good</option>
          <option value='4'>4 - Very Good</option>
          <option value='5'>5 - Excellent</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='comment'>
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as='textarea'
          row='5'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Form.Control>
      </Form.Group>
    </Form>
  );

  // Component Methods
  const closeRatingModal = () => {
    showRatingModal(false);
    setRating(0);
    setComment('');
    setPacketId('');
  };
  const openRatingModal = () => showRatingModal(true);

  const rate = () => {
    dispatch(
      createPacketReview(packetId, {
        rating,
        comment
      })
    );

    setTimeout(function () {
      dispatch(emptyCreateReviewError());
      dispatch(emptyCreateReviewSuccess());
    }, 10000);
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

  //Column formatters
  const imageFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '4rem' }}>
        <Link to={`/packet/${row.packet._id}`}>
          <Image
            src={cell}
            alt={row.name}
            title={row.name}
            fluid
            rounded
            style={{ width: '5rem', height: '4rem' }}
          />
        </Link>
      </div>
    );
  };

  const nameFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '4rem' }}>
        <Link to={`/packet/${row.packet._id}`}>{cell}</Link>
      </div>
    );
  };

  const dateFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '4rem' }}>
        <Moment format='D MMM YYYY hh:mm:ss'>{cell}</Moment>
      </div>
    );
  };

  const actionFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <span
          type='button'
          variant='primary'
          title='Download'
          onClick={() => {
            //TODO: download data packet
            console.log(cell);
          }}
        >
          <i
            className='fas fa-file-download fa-2x'
            style={{ color: 'black' }}
          ></i>
        </span>
        <span
          type='button'
          variant='primary'
          title='Rate'
          onClick={() => {
            setPacketId(cell);
            openRatingModal();
          }}
        >
          <i className='fas fa-star fa-2x' style={{ color: 'black' }}></i>
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
      dataField: 'createdAt',
      text: 'Purchased',
      sort: true,
      headerTitle: true,
      filter: textFilter(),
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

  //DataTable instantiation
  return (
    <>
      <BootstrapTable
        bootstrap4
        keyField='createdAt'
        data={data}
        columns={columns}
        defaultSorted={defaultSorted}
        striped
        hover
        condensed
        noDataIndication={'No items purchased'}
        pagination={paginationFactory(pagingOptions)}
        filter={filterFactory()}
        headerClasses='table-dark'
      />

      {/* Modals */}
      <ModalComponent
        show={ratingModal}
        close={closeRatingModal}
        proceed={rate}
        title='Leave a rating'
        body={form}
        success={true}
        closeButton={true}
        loading={reviewLoading}
        errorMessage={reviewError}
        successMessage={reviewSuccess}
      />
    </>
  );
};

export default DataTable;
