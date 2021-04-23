import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import Packet from '../components/Packet';
import HomeSidebar from '../components/HomeSidebar';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Sorting from '../components/Sorting';
import Meta from '../components/Meta';
import PacketCarousel from '../components/PacketCarousel';
import JumbotronHome from '../components/JumbotronHome';
import 'react-pro-sidebar/dist/css/styles.css';
import { listPackets } from '../actions/packetActions';

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

  const handleSorting = (value) => {
    setSorting(value);
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
            <JumbotronHome />
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
            <HomeSidebar
              collapsed={collapsed}
              toggled={toggled}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange}
              applyFilters={applyFilters}
              setRating1={setRating1}
              setRating2={setRating2}
              setRating3={setRating3}
              setRating4={setRating4}
              setRating5={setRating5}
              setPriceFrom={setPriceFrom}
              setPriceTo={setPriceTo}
              rating1={rating1}
              rating2={rating2}
              rating3={rating3}
              rating4={rating4}
              rating5={rating5}
              priceFrom={priceFrom}
              priceTo={priceTo}
            />
          </div>
        </Col>
        {/********************************** Packets *************************************/}
        <Col sm={collapsed ? 11 : 9}>
          <Row className='mx-0 align-items-center'>
            <Col xs={2}>
              <Sorting sorting={sorting} handleSorting={handleSorting} />
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
