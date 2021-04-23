import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent
} from 'react-pro-sidebar';
import Rating from '../components/Rating';
import { Row, Col, Alert, Button, Form } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Switch from 'react-switch';
import { FaEthereum, FaStar, FaFilter } from 'react-icons/fa';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const HomeSidebar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  applyFilters,
  setRating1,
  setRating2,
  setRating3,
  setRating4,
  setRating5,
  setPriceFrom,
  setPriceTo,
  rating1,
  rating2,
  rating3,
  rating4,
  rating5,
  priceFrom,
  priceTo
}) => {
  return (
    <ProSidebar
      className='mt-3'
      collapsed={collapsed}
      toggled={toggled}
      breakPoint='md'
      onToggle={handleToggleSidebar}
      style={collapsed ? null : { width: 'inherit' }}
    >
      <SidebarHeader>
        <div
          className={`d-flex align-items-center ${
            collapsed ? 'justify-content-start' : 'justify-content-between'
          }`}
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {!collapsed ? <span>Filters</span> : null}
          <span title='Collapse Sidebar'>
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleCollapsedChange}
              checked={collapsed}
              onColor='#219de9'
              offColor='#bbbbbb'
            />
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className='mt-3'>
        {collapsed ? (
          <Menu iconShape='circle'>
            <MenuItem
              id='applyFilter'
              icon={<FaFilter />}
              title='Apply the filters'
              onClick={applyFilters}
            ></MenuItem>
          </Menu>
        ) : null}
        {/********************************** Ratings *************************************/}
        {collapsed ? (
          <Menu iconShape='circle'>
            <SubMenu icon={<FaStar />}>
              <MenuItem title='Packets rated with 1 star'>
                <Form.Check
                  checked={rating1}
                  type='checkbox'
                  className='link-icon'
                  id='1'
                  label={
                    <span>
                      <Rating value={1} />
                    </span>
                  }
                  onChange={() => {
                    if (rating1) {
                      setRating1(false);
                    } else {
                      setRating1(true);
                    }
                  }}
                />
              </MenuItem>
              <MenuItem title='Packets rated with 2 stars'>
                <Form.Check
                  checked={rating2}
                  type='checkbox'
                  className='link-icon'
                  id='2'
                  label={<Rating value={2} />}
                  onChange={() => {
                    if (rating2) {
                      setRating2(false);
                    } else {
                      setRating2(true);
                    }
                  }}
                />
              </MenuItem>
              <MenuItem title='Packets rated with 3 stars'>
                <Form.Check
                  checked={rating3}
                  type='checkbox'
                  className='link-icon'
                  id='3'
                  label={<Rating value={3} />}
                  onChange={() => {
                    if (rating3) {
                      setRating3(false);
                    } else {
                      setRating3(true);
                    }
                  }}
                />
              </MenuItem>
              <MenuItem title='Packets rated with 4 stars'>
                <Form.Check
                  checked={rating4}
                  type='checkbox'
                  className='link-icon'
                  id='4'
                  label={<Rating value={4} />}
                  onChange={() => {
                    if (rating4) {
                      setRating4(false);
                    } else {
                      setRating4(true);
                    }
                  }}
                />
              </MenuItem>
              <MenuItem title='Packets rated with 5 stars'>
                <Form.Check
                  checked={rating5}
                  type='checkbox'
                  className='link-icon'
                  id='5'
                  label={<Rating value={5} />}
                  onChange={() => {
                    if (rating5) {
                      setRating5(false);
                    } else {
                      setRating5(true);
                    }
                  }}
                />
              </MenuItem>
            </SubMenu>
          </Menu>
        ) : (
          <Menu>
            <MenuItem>
              <div className='d-flex align-items-center justify-content-between'>
                <span style={{ color: '#adadad' }}>Ratings</span>
                <Button
                  variant='info'
                  className='btn-sm'
                  title='Apply the filters'
                  onClick={applyFilters}
                >
                  Apply <i className='fas fa-filter'></i>
                </Button>
              </div>
            </MenuItem>
            <MenuItem title='Packets rated with 1 star'>
              <Form.Check
                checked={rating1}
                type='checkbox'
                className='link-icon'
                id='1'
                label={
                  <>
                    <span
                      style={{
                        width: '2rem',
                        display: 'inline-block'
                      }}
                    ></span>
                    <Rating value={1} />
                  </>
                }
                onChange={() => {
                  if (rating1) {
                    setRating1(false);
                  } else {
                    setRating1(true);
                  }
                }}
              />
            </MenuItem>
            <MenuItem title='Packets rated with 2 stars'>
              <Form.Check
                checked={rating2}
                type='checkbox'
                className='link-icon'
                id='2'
                label={
                  <>
                    <span
                      style={{
                        width: '2rem',
                        display: 'inline-block'
                      }}
                    ></span>
                    <Rating value={2} />
                  </>
                }
                onChange={() => {
                  if (rating2) {
                    setRating2(false);
                  } else {
                    setRating2(true);
                  }
                }}
              />
            </MenuItem>
            <MenuItem title='Packets rated with 3 stars'>
              <Form.Check
                checked={rating3}
                type='checkbox'
                className='link-icon'
                id='3'
                label={
                  <>
                    <span
                      style={{
                        width: '2rem',
                        display: 'inline-block'
                      }}
                    ></span>
                    <Rating value={3} />
                  </>
                }
                onChange={() => {
                  if (rating3) {
                    setRating3(false);
                  } else {
                    setRating3(true);
                  }
                }}
              />
            </MenuItem>
            <MenuItem title='Packets rated with 4 stars'>
              <Form.Check
                checked={rating4}
                type='checkbox'
                className='link-icon'
                id='4'
                label={
                  <>
                    <span
                      style={{
                        width: '2rem',
                        display: 'inline-block'
                      }}
                    ></span>
                    <Rating value={4} />
                  </>
                }
                onChange={() => {
                  if (rating4) {
                    setRating4(false);
                  } else {
                    setRating4(true);
                  }
                }}
              />
            </MenuItem>
            <MenuItem title='Packets rated with 5 stars'>
              <Form.Check
                checked={rating5}
                type='checkbox'
                className='link-icon'
                id='5'
                label={
                  <>
                    <span
                      style={{
                        width: '2rem',
                        display: 'inline-block'
                      }}
                    ></span>
                    <Rating value={5} />
                  </>
                }
                onChange={() => {
                  if (rating5) {
                    setRating5(false);
                  } else {
                    setRating5(true);
                  }
                }}
              />
            </MenuItem>
          </Menu>
        )}

        {/******************************* Price Range **********************************/}
        {collapsed ? (
          <Menu iconShape='circle'>
            <SubMenu icon={<FaEthereum />}>
              <MenuItem>
                <Row className='d-flex align-items-center'>
                  <Col>From:</Col>
                  <Col>
                    <Form.Control
                      readOnly
                      title='From'
                      value={priceFrom}
                      className='p-1'
                      style={{ height: '2rem' }}
                    />
                  </Col>
                </Row>
                <Row className='d-flex align-items-center mt-1'>
                  <Col>To:</Col>
                  <Col>
                    <Form.Control
                      readOnly
                      title='To'
                      value={priceTo}
                      className='p-1'
                      style={{ height: '2rem' }}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className='sliderArea-collapsed mt-5'>
                    <Range
                      marks={{
                        0: (
                          <>
                            <i className='fab fa-ethereum'></i>0
                          </>
                        ),
                        1000: (
                          <>
                            <i className='fab fa-ethereum'></i>1000
                          </>
                        )
                      }}
                      min={0}
                      max={1000}
                      defaultValue={[0, 0]}
                      tipProps={{
                        placement: 'top',
                        visible: false
                      }}
                      onChange={(value) => {
                        setPriceFrom(value[0]);
                        setPriceTo(value[1]);
                      }}
                    />
                  </div>
                </Row>
              </MenuItem>
            </SubMenu>
          </Menu>
        ) : (
          <Menu>
            <MenuItem>
              <span style={{ color: '#adadad' }}>Price Range</span>
            </MenuItem>
            <MenuItem>
              <Row className='d-flex align-items-center'>
                <Col xs={2}>
                  <span style={{ color: '#adadad' }}>From:</span>:
                </Col>
                <Col xs={4}>
                  <Form.Control
                    readOnly
                    title='From'
                    value={priceFrom}
                    className='p-1'
                    style={{ height: '2rem' }}
                  />
                </Col>
                <Col xs={1}>
                  <span style={{ color: '#adadad' }}>To:</span>
                </Col>
                <Col xs={4}>
                  <Form.Control
                    readOnly
                    title='To'
                    value={priceTo}
                    className='p-1'
                    style={{ height: '2rem' }}
                  />
                </Col>
                <Col xs={1}></Col>
              </Row>
            </MenuItem>
            <MenuItem>
              <div className='sliderArea mt-2'>
                <Range
                  marks={{
                    0: (
                      <span style={{ textAlign: 'right' }}>
                        <i className='fab fa-ethereum'></i>0
                      </span>
                    ),
                    1000: (
                      <span style={{ textAlign: 'left' }}>
                        <i className='fab fa-ethereum'></i>1000
                      </span>
                    )
                  }}
                  min={0}
                  max={1000}
                  defaultValue={[0, 0]}
                  tipProps={{
                    placement: 'top',
                    visible: false
                  }}
                  onChange={(value) => {
                    setPriceFrom(value[0]);
                    setPriceTo(value[1]);
                  }}
                />
              </div>
            </MenuItem>
          </Menu>
        )}
      </SidebarContent>
    </ProSidebar>
  );
};

export default HomeSidebar;
