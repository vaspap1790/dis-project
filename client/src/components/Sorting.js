import React from 'react';
import { Row, Dropdown, DropdownButton } from 'react-bootstrap';

const Sorting = ({ sorting, handleSorting }) => {
  return (
    <>
      <Row>
        <DropdownButton
          id='dropdown-item-button'
          title='Sorting'
          variant='light'
        >
          <Dropdown.Item
            as='button'
            value='createdAt_desc'
            style={
              sorting === 'createdAt_desc'
                ? {
                    backgroundColor: '#1f9bcf',
                    color: 'white'
                  }
                : null
            }
            onClick={() => handleSorting('createdAt_desc')}
          >
            Date &#x2193;
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            value='createdAt_asc'
            style={
              sorting === 'createdAt_asc'
                ? {
                    backgroundColor: '#1f9bcf',
                    color: 'white'
                  }
                : null
            }
            onClick={() => handleSorting('createdAt_asc')}
          >
            Date &#x2191;
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            value='rating_desc'
            style={
              sorting === 'rating_desc'
                ? {
                    backgroundColor: '#1f9bcf',
                    color: 'white'
                  }
                : null
            }
            onClick={() => handleSorting('rating_desc')}
          >
            Rating &#x2193;
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            value='rating_asc'
            style={
              sorting === 'rating_asc'
                ? {
                    backgroundColor: '#1f9bcf',
                    color: 'white'
                  }
                : null
            }
            onClick={() => handleSorting('rating_asc')}
          >
            Rating &#x2191;
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            value='price_desc'
            style={
              sorting === 'price_desc'
                ? {
                    backgroundColor: '#1f9bcf',
                    color: 'white'
                  }
                : null
            }
            onClick={() => handleSorting('price_desc')}
          >
            Price &#x2193;
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            value='price_asc'
            style={
              sorting === 'price_asc'
                ? {
                    backgroundColor: '#1f9bcf',
                    color: 'white'
                  }
                : null
            }
            onClick={() => handleSorting('price_asc')}
          >
            Price &#x2191;
          </Dropdown.Item>
        </DropdownButton>
      </Row>
    </>
  );
};

export default Sorting;
