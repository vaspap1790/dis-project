import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  Jumbotron,
  Form,
  OverlayTrigger,
  Tooltip,
  Container
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
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaEthereum, FaStar } from 'react-icons/fa';
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
  const [priceRange, setPriceRange] = useState({ min: 2, max: 10 });
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
        <Row>
          <Col sm={7}>
            <PacketCarousel />
          </Col>
          <Col sm={5}>
            <Jumbotron style={{ marginBottom: '-10rem' }} className='py-4'>
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
      <h1 className='mb-0 pt-4 pb-0'>Explore Data Packets</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger' style={{ width: '30vw' }}>
          {error}
        </Alert>
      ) : (
        <>
          <Row>
            <div className={`app ${toggled ? 'toggled' : ''}`}>
              <ProSidebar
                className='mt-3'
                style={{ height: '100vh' }}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint='md'
                onToggle={handleToggleSidebar}
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
                <SidebarContent className='my-3'>
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
                      <MenuItem>Ratings</MenuItem>
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
                              tipFormatter={(value) => (
                                <>
                                  <i className='fab fa-ethereum'></i>
                                  {value}
                                </>
                              )}
                              tipProps={{
                                placement: 'top',
                                visible: true
                              }}
                            />
                          </div>
                        </MenuItem>
                      </SubMenu>
                    </Menu>
                  ) : (
                    <Menu>
                      <MenuItem>Price Range</MenuItem>
                      <MenuItem>
                        <div className='sliderArea mt-5'>
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
                            defaultValue={[200, 300]}
                            tipFormatter={(value) => (
                              <>
                                <i className='fab fa-ethereum'></i>
                                {value}
                              </>
                            )}
                            tipProps={{
                              placement: 'top',
                              visible: true
                            }}
                          />
                        </div>
                      </MenuItem>
                    </Menu>
                  )}
                </SidebarContent>
              </ProSidebar>
            </div>
            {packets.map((packet) => (
              <Col key={packet._id} sm={12} md={6} lg={4} xl={3}>
                <Packet packet={packet} isProfile={true} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
