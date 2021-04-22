import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  Jumbotron,
  Form,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
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
  const pageNumberFromURL = match.params.pageNumber || 1;

  // App level State
  const packetList = useSelector((state) => state.packetList);
  const { loading, error, packets, pages, page } = packetList;

  // Component level state
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const [sorting, setSorting] = useState('createdAt_desc');

  const [filters, setFilters] = useState({
    rating1: false,
    rating2: false,
    rating3: false,
    rating4: false,
    rating5: false,
    priceFrom: 0,
    priceTo: 0
  });

  const [rating1, setRating1] = useState(false);
  const [rating2, setRating2] = useState(false);
  const [rating3, setRating3] = useState(false);
  const [rating4, setRating4] = useState(false);
  const [rating5, setRating5] = useState(false);

  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);

  const [pageNumber, setPageNumber] = useState(pageNumberFromURL);

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPackets(keyword, pageNumber, sorting, filters));
  }, [dispatch, keyword, pageNumber, filters, sorting]);

  // Component Methods
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const handlePageNumber = (value) => {
    setPageNumber(value);
  };

  const applyFilters = () => {
    setFilters({
      rating1: rating1,
      rating2: rating2,
      rating3: rating3,
      rating4: rating4,
      rating5: rating5,
      priceFrom: priceFrom,
      priceTo: priceTo
    });
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
                  title='Learn more about Data Dapp'
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
      <h1 className='mb-3 mt-2 pt-4 pb-0'>Explore Data Packets</h1>

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
          </div>
        </Col>
        {/********************************** Packets *************************************/}
        <Col sm={collapsed ? 11 : 9}>
          <Row className='mx-0 align-items-center'>
            <Col xs={2}>
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
                        ? { backgroundColor: '#1f9bcf', color: 'white' }
                        : null
                    }
                    onClick={() => setSorting('createdAt_desc')}
                  >
                    Date &#x2193;
                  </Dropdown.Item>
                  <Dropdown.Item
                    as='button'
                    value='createdAt_asc'
                    style={
                      sorting === 'createdAt_asc'
                        ? { backgroundColor: '#1f9bcf', color: 'white' }
                        : null
                    }
                    onClick={() => setSorting('createdAt_asc')}
                  >
                    Date &#x2191;
                  </Dropdown.Item>
                  <Dropdown.Item
                    as='button'
                    value='rating_desc'
                    style={
                      sorting === 'rating_desc'
                        ? { backgroundColor: '#1f9bcf', color: 'white' }
                        : null
                    }
                    onClick={() => setSorting('rating_desc')}
                  >
                    Rating &#x2193;
                  </Dropdown.Item>
                  <Dropdown.Item
                    as='button'
                    value='rating_asc'
                    style={
                      sorting === 'rating_asc'
                        ? { backgroundColor: '#1f9bcf', color: 'white' }
                        : null
                    }
                    onClick={() => setSorting('rating_asc')}
                  >
                    Rating &#x2191;
                  </Dropdown.Item>
                  <Dropdown.Item
                    as='button'
                    value='price_desc'
                    style={
                      sorting === 'price_desc'
                        ? { backgroundColor: '#1f9bcf', color: 'white' }
                        : null
                    }
                    onClick={() => setSorting('price_desc')}
                  >
                    Price &#x2193;
                  </Dropdown.Item>
                  <Dropdown.Item
                    as='button'
                    value='price_asc'
                    style={
                      sorting === 'price_asc'
                        ? { backgroundColor: '#1f9bcf', color: 'white' }
                        : null
                    }
                    onClick={() => setSorting('price_asc')}
                  >
                    Price &#x2191;
                  </Dropdown.Item>
                </DropdownButton>
              </Row>
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
                {packets.map((packet) => (
                  <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
                    <Packet packet={packet} />
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Col>
      </Row>

      <Row className='d-flex justify-content-end mx-0'>
        <Paginate pages={pages} page={page} handlePage={handlePageNumber} />
      </Row>
    </>
  );
};

export default HomeScreen;
