import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert, Button, Jumbotron, Form } from 'react-bootstrap';
import Switch from 'react-switch';
import Packet from '../components/Packet';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import PacketCarousel from '../components/PacketCarousel';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent
} from 'react-pro-sidebar';
import { FaEthereum, FaStar, FaFilter } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import { listPackets } from '../actions/packetActions';
import Rating from '../components/Rating';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const HomeScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  // App level State
  const packetList = useSelector((state) => state.packetList);
  const { loading, error, packets, pages, page } = packetList;

  // Component level state
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(500);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPackets(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // Component Methods
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const goBack = () => {
    history.goBack();
  };

  // This will be rendered
  return (
    <>
      <Meta />
      {!keyword ? (
        <Row className='mb-1'>
          {/********************************** Carousel *************************************/}
          <Col sm={7}>
            <PacketCarousel />
          </Col>
          {/********************************** Jumbotron ************************************/}
          <Col sm={5}>
            <Jumbotron className='py-4 mb-n5'>
              <h1 style={{ zIndex: 5, position: 'relative' }}>
                Welcome to Data Dapp, people of Ethereum{' '}
                <i className='fab fa-ethereum eth-jumbo fa-10x'></i>
              </h1>
              <p
                style={{
                  zIndex: 5,
                  position: 'relative',
                  textAlign: 'justify'
                }}
                className='mb-4'
              >
                This is a Decentralised Ethereum based Data Marketplace. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                aute irure dolor in reprehenderit.
              </p>
              <p>
                <Button
                  className='btn-primary'
                  onClick={() => history.push('/aboutUs')}
                >
                  Learn more
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      ) : (
        <Button className='btn btn-primary my-3' onClick={goBack}>
          Go Back
        </Button>
      )}
      <h1 className='mb-1 pt-4 pb-0'>Explore Data Packets</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger' style={{ width: '30vw' }}>
          {error}
        </Alert>
      ) : (
        <>
          <Row>
            {/********************************** Sidebar *************************************/}
            <Col sm={collapsed ? 1 : 3} style={{ overflow: 'hidden' }}>
              <div
                className={`app ${toggled ? 'toggled' : ''}`}
                style={{ height: '100%' }}
              >
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
                        collapsed
                          ? 'justify-content-start'
                          : 'justify-content-between'
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
                      <span>
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
                        ></MenuItem>
                      </Menu>
                    ) : null}
                    {collapsed ? (
                      <Menu iconShape='circle'>
                        <SubMenu icon={<FaStar />}>
                          <MenuItem>
                            <Form.Check
                              type='checkbox'
                              className='link-icon'
                              id='1'
                              label={
                                <span>
                                  <Rating value={1} />
                                </span>
                              }
                            />
                          </MenuItem>
                          <MenuItem>
                            <Form.Check
                              type='checkbox'
                              className='link-icon'
                              id='2'
                              label={<Rating value={2} />}
                            />
                          </MenuItem>
                          <MenuItem>
                            <Form.Check
                              type='checkbox'
                              className='link-icon'
                              id='3'
                              label={<Rating value={3} />}
                            />
                          </MenuItem>
                          <MenuItem>
                            <Form.Check
                              type='checkbox'
                              className='link-icon'
                              id='4'
                              label={<Rating value={4} />}
                            />
                          </MenuItem>
                          <MenuItem>
                            <Form.Check
                              type='checkbox'
                              className='link-icon'
                              id='5'
                              label={<Rating value={5} />}
                            />
                          </MenuItem>
                        </SubMenu>
                      </Menu>
                    ) : (
                      <Menu>
                        <MenuItem>
                          <div className='d-flex align-items-center justify-content-between'>
                            <span>Ratings</span>
                            <Button
                              variant='info'
                              className='btn-sm'
                              title='Apply the filters'
                            >
                              Apply <i className='fas fa-filter'></i>
                            </Button>
                          </div>
                        </MenuItem>
                        <MenuItem>
                          <Form.Check
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
                          />
                        </MenuItem>
                        <MenuItem>
                          <Form.Check
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
                          />
                        </MenuItem>
                        <MenuItem>
                          <Form.Check
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
                          />
                        </MenuItem>
                        <MenuItem>
                          <Form.Check
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
                          />
                        </MenuItem>
                        <MenuItem>
                          <Form.Check
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
                          />
                        </MenuItem>
                      </Menu>
                    )}

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
                                    100: (
                                      <>
                                        <i className='fab fa-ethereum'></i>100
                                      </>
                                    ),
                                    500: (
                                      <>
                                        <i className='fab fa-ethereum'></i>500
                                      </>
                                    )
                                  }}
                                  min={100}
                                  max={500}
                                  defaultValue={[200, 300]}
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
                        <MenuItem>Price Range</MenuItem>
                        <MenuItem>
                          <Row className='d-flex align-items-center'>
                            <Col xs={2}>From:</Col>
                            <Col xs={4}>
                              <Form.Control
                                readOnly
                                title='From'
                                value={priceFrom}
                                className='p-1'
                                style={{ height: '2rem' }}
                              />
                            </Col>
                            <Col xs={1}>To:</Col>
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
                                100: (
                                  <span style={{ textAlign: 'right' }}>
                                    <i className='fab fa-ethereum'></i>100
                                  </span>
                                ),
                                500: (
                                  <span style={{ textAlign: 'left' }}>
                                    <i className='fab fa-ethereum'></i>500
                                  </span>
                                )
                              }}
                              min={100}
                              max={500}
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
              </div>
            </Col>
            {/********************************** Packets *************************************/}
            <Col sm={collapsed ? 11 : 9}>
              <Row>
                {packets.map((packet) => (
                  <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
                    <Packet packet={packet} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className='d-flex justify-content-end'>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
