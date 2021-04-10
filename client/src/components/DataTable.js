import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

//import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const DataTable = ({ data }) => {
  const downloadFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align' style={{ height: '4rem' }}>
        <Button
          className='btn btn-sm btn-primary'
          onClick={() => {
            console.log(cell);
          }}
        >
          Download
        </Button>
      </div>
    );
  };

  const imageFormatter = (cell, row, rowIndex) => {
    return (
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
    );
  };

  const nameFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align' style={{ height: '4rem' }}>
        <Link to={`/packet/${row.packet._id}`}>{cell}</Link>
      </div>
    );
  };

  const dateFormatter = (cell, row, rowIndex) => {
    return (
      <div className='v-align' style={{ height: '4rem' }}>
        {cell}
      </div>
    );
  };

  const columns = [
    {
      dataField: 'packet.image',
      text: '',
      headerStyle: {
        borderStyle: 'none'
      },
      formatter: imageFormatter
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
      formatter: nameFormatter
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
      formatter: dateFormatter
    },
    {
      dataField: 'packet._id',
      text: '',
      headerStyle: {
        borderStyle: 'none'
      },
      formatter: downloadFormatter
    }
  ];

  const defaultSorted = [
    {
      dataField: 'createdAt',
      order: 'desc'
    }
  ];

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

  return (
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
  );
};

export default DataTable;
