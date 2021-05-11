import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Image, Form, Alert } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ModalComponent from './ModalComponent';
import Loader from './Loader';
import {
  createUserReview,
  emptyCreateReviewError,
  emptyCreateReviewSuccess
} from '../actions/reviewActions';
import { prelistPacketDetails } from '../actions/packetActions';

const DataTablePurchased = ({ account, contract }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userPurchases = useSelector((state) => state.userPurchases);
  const {
    purchases: data,
    loading: loadingPurchases,
    error: purchasesError
  } = userPurchases;

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
  const [userId, setUserId] = useState('');

  // Component Variables
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

  // const sampleLoadingModalContent = (
  //   <>
  //     {loadingCreateAction ? (
  //       <>
  //         <Loader />
  //         <div>Retrieving key...</div>
  //       </>
  //     ) : errorCreateAction ? (
  //       <Alert variant='danger'>{errorCreateAction}</Alert>
  //     ) : (
  //       <>
  //         <div className='mb-2'>

  //         </div>
  //         <Table id='keyTable' bordered responsive size='sm'>
  //           <thead>
  //             <tr className='table-dark'>
  //               <th className='uploadsTableHeaders text-center p-2'>
  //                 IPFS Hash
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td className='d-flex align-items-center'>
  //                 <Col xs={12}>
  //                   <Row>
  //                     <InputGroup>
  //                       <Form.Control
  //                         type='textarea'
  //                         ref={textAreaRefHash}
  //                         value={data.ipfsHash}
  //                         aria-describedby='hashAppend'
  //                         readOnly
  //                       />
  //                       <InputGroup.Append>
  //                         <InputGroup.Text
  //                           id='hashAppend'
  //                           style={{ borderLeft: '0.5px solid #fff' }}
  //                         >
  //                           <i
  //                             className='fas fa-clipboard fa-lg link-icon blue-hover'
  //                             onClick={copyToClipboardHash}
  //                             title='Copy IPFS Hash to Clipboard'
  //                           ></i>
  //                         </InputGroup.Text>
  //                       </InputGroup.Append>
  //                     </InputGroup>
  //                   </Row>
  //                   {hashCopied ? (
  //                     <Row className='mt-1 justify-content-end'>
  //                       <div style={{ color: '#3ca861' }} className='small'>
  //                         Hash copied to clipboard
  //                       </div>
  //                     </Row>
  //                   ) : null}
  //                 </Col>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </Table>
  //       </>
  //     )}
  //   </>
  // );

  // Component Methods
  const closeRatingModal = () => {
    showRatingModal(false);
    setRating(0);
    setComment('');
    setUserId('');
  };
  const openRatingModal = () => showRatingModal(true);

  const rate = () => {
    dispatch(
      createUserReview(
        userId,
        {
          rating,
          comment
        },
        account,
        contract
      )
    );

    setTimeout(function () {
      dispatch(emptyCreateReviewError());
      dispatch(emptyCreateReviewSuccess());
    }, 10000);
  };

  const handlePurchasedErrorOnClose = () => {};

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
      <div className='v-align h-align' style={{ height: '3rem' }}>
        <Link to={`/packet/${row._id}`} onClick={clickHandler}>
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
        <Link to={`/packet/${row._id}`} onClick={clickHandler}>
          {cell}
        </Link>
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

  const userFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align h-align small' style={{ height: '3rem' }}>
        <Link
          to={`/profile/${row.user._id}`}
          className='link'
          title='See User Profile'
        >
          {cell}
        </Link>
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
          className='blue-hover'
          onClick={() => {
            //TODO: download data packet
            console.log(cell);
          }}
        >
          <i className='fas fa-arrow-down'></i>
        </span>
        <span
          type='button'
          variant='primary'
          title='Rate the User'
          className='blue-hover'
          onClick={() => {
            setUserId(row.user._id);
            openRatingModal();
          }}
        >
          <i className='fas fa-star'></i>
        </span>
      </div>
    );
  };

  //Column Declaration
  const columns = [
    {
      dataField: 'image',
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
      dataField: 'name',
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
      dataField: 'updatedAt',
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
      dataField: 'user.username',
      text: 'From',
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
      dataField: '_id',
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

  const clickHandler = () => {
    dispatch(prelistPacketDetails());
  };

  //DataTablePurchased instantiation
  return (
    <>
      <div className='p-2 mt-3'>
        {loadingPurchases ? (
          <Loader />
        ) : purchasesError ? (
          <Alert
            variant='danger'
            onClose={() => {
              handlePurchasedErrorOnClose();
            }}
            dismissible
          >
            {purchasesError}{' '}
            {purchasesError === 'Not Authorised!' ? (
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
            noDataIndication={'No items purchased'}
            pagination={paginationFactory(pagingOptions)}
            filter={filterFactory()}
            headerClasses='table-dark'
          />
        )}
      </div>

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

export default DataTablePurchased;
