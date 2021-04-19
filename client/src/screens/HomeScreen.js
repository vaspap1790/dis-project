import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert, Button, Jumbotron, Form } from 'react-bootstrap';
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
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart
} from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import { listPackets } from '../actions/packetActions';
import Rating from '../components/Rating';

const HomeScreen = ({ match, history }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // Request Parameters
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  // App level State
  const packetList = useSelector((state) => state.packetList);
  const { loading, error, packets, pages, page } = packetList;

  // Hook that triggers when component did mount
  useEffect(() => {
    dispatch(listPackets(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // Component Methods
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
                <i className='fab fa-ethereum jm fa-10x'></i>
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
            <ProSidebar className='mt-3'>
              <SidebarHeader>
                <div
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
                  Filters
                </div>
              </SidebarHeader>
              <SidebarContent className='mt-3'>
                <Menu iconShape='square'>
                  <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                  <MenuItem icon={<FaGem />}>
                    <Rating value='1' />
                  </MenuItem>
                  <MenuItem icon={<FaGem />}>
                    <Rating value='2' />
                  </MenuItem>
                  <MenuItem icon={<FaGem />}>
                    <Rating value='3' />
                  </MenuItem>
                  <MenuItem icon={<FaGem />}>
                    <Rating value='4' />
                  </MenuItem>
                  <MenuItem icon={<FaGem />}>
                    <Rating value='5' />
                  </MenuItem>
                  <MenuItem>
                    <Form>
                      <Form.Group>
                        <Form.Label>Range</Form.Label>
                        <Form.Control
                          type='range'
                          className='custom-range'
                          style={{ backgroundColor: 'white' }}
                        />
                      </Form.Group>
                    </Form>
                  </MenuItem>
                  <SubMenu title='Components' icon={<FaHeart />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                  </SubMenu>
                </Menu>
              </SidebarContent>
            </ProSidebar>
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
