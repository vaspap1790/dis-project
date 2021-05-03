import React from 'react';
import { Row, Dropdown, DropdownButton } from 'react-bootstrap';

const Category = ({ category, handleCategory, categories }) => {
  return (
    <>
      <Row>
        <DropdownButton
          id='dropdown-item-button'
          title='Select Category'
          variant='light'
        >
          {categories.length !== 0
            ? categories.map((c) => (
                <Dropdown.Item
                  as='button'
                  key={c}
                  value={c}
                  style={
                    category === c
                      ? {
                          backgroundColor: '#1f9bcf',
                          color: 'white'
                        }
                      : null
                  }
                  onClick={() => handleCategory(c)}
                >
                  {c}
                </Dropdown.Item>
              ))
            : null}
        </DropdownButton>
      </Row>
    </>
  );
};

export default Category;
