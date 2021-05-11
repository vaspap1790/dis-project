import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Alert,
  Button,
  Image,
  Badge
} from 'react-bootstrap';
import SearchBox from './SearchBox';
import ModalComponent from '../components/ModalComponent';
import { logout } from '../actions/userActions';
import { removeFromWatchlist } from '../actions/packetActions';
import { countUnreadActions } from '../actions/actionActions';
import {
  getUserNotifications,
  getUserRequests
} from '../actions/actionActions';
//import EthCrypto from 'eth-crypto';

const Header = ({ web3 }) => {
  // Hook that enables components to interact with the App State through reducers
  const dispatch = useDispatch();

  // App level State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const actionCount = useSelector((state) => state.actionCount);
  const { count } = actionCount;

  const watchlist = useSelector((state) => state.watchlist);
  const { favourites } = watchlist;

  // Component level State
  const [watchlistModal, showWatchlistModal] = useState(false);

  // Hook that triggers when component did mount
  useEffect(() => {
    if (userInfo) {
      dispatch(countUnreadActions(userInfo._id));
      dispatch(getUserNotifications(userInfo._id));
      dispatch(getUserRequests(userInfo._id));

      const intervalId = setInterval(function () {
        dispatch(countUnreadActions(userInfo._id));
        dispatch(getUserNotifications(userInfo._id));
        dispatch(getUserRequests(userInfo._id));
      }, 120000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, userInfo]);

  // Component Methods
  const logoutHandler = () => {
    dispatch(logout());
  };

  const removeFromWatchlistHandler = (packet) => {
    dispatch(removeFromWatchlist(packet));
    showWatchlistModal(true);
  };

  const closeWatchlistModal = () => showWatchlistModal(false);

  //   const getRegister1UP = async () => {
  // //TODO:Delete
  //   };

  // This will be rendered
  return (
    <>
      <header>
        <Navbar
          bg='primary'
          variant='dark'
          expand='lg'
          className='py-3'
          collapseOnSelect
        >
          {/* <button type='button' onClick={getRegister1UP}>
            Register1???UP
          </button> */}
          <Container fluid className='px-4'>
            <LinkContainer to='/'>
              <Navbar.Brand>Data Dapp</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <Nav className='ml-auto'>
                <LinkContainer to='/aboutUs'>
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
                <NavDropdown title='Watchlist' alignRight id='watchlist'>
                  {favourites.length === 0 ? (
                    <NavDropdown.Item as='div' className='p-0'>
                      <Alert variant='info' className='m-0'>
                        Watchlist is empty
                      </Alert>
                    </NavDropdown.Item>
                  ) : (
                    <>
                      {favourites.map((item) => (
                        <NavDropdown.Item
                          as='div'
                          key={item._id}
                          className='d-flex justify-content-between align-items-center mx-1 px-1'
                          style={{ overflow: 'hidden', width: '30vw' }}
                        >
                          <Image
                            src={
                              item.image === ''
                                ? '/images/sample.jpg'
                                : item.image
                            }
                            alt={item.name}
                            className='v-align h-align mx-1 px-1'
                            style={{ overflow: 'hidden', width: '4rem' }}
                            fluid
                            rounded
                          />
                          <Link
                            className='v-align h-align mx-1 px-1'
                            style={{ overflow: 'hidden', width: 'fit-content' }}
                            to={`/packet/${item._id}`}
                            title={item.name}
                          >
                            {item.name}
                          </Link>
                          <Button
                            title='Remove from Watchlist'
                            className='btn-Icon-Remove v-align h-align mx-1 px-3'
                            type='button'
                            variant='light'
                            onClick={() => removeFromWatchlistHandler(item)}
                          >
                            <i
                              className='fas fa-trash-alt'
                              style={{ color: '#d9534f' }}
                            ></i>
                          </Button>
                        </NavDropdown.Item>
                      ))}
                    </>
                  )}
                </NavDropdown>
                {userInfo ? (
                  <>
                    {count === 0 ? (
                      <Nav.Link>
                        <i className='fas fa-bell'></i>
                      </Nav.Link>
                    ) : (
                      <NavDropdown
                        title={
                          <>
                            <i className='fas fa-bell'></i>
                            <Badge variant='light' className='notif'>
                              {count}
                            </Badge>
                          </>
                        }
                        alignRight
                        id='notifications'
                      >
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                            You have unread notifications go to Profile {'>'}{' '}
                            Notifications
                          </NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                    <NavDropdown
                      title={userInfo.username}
                      alignRight
                      id='username'
                    >
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/editDetails'>
                        <NavDropdown.Item>Edit User Details</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/login'>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Modals */}
      <ModalComponent
        show={watchlistModal}
        close={closeWatchlistModal}
        title='Remove from Watchlist'
        body='You successfully removed the data packet from the Watchlist'
        info={true}
      />
    </>
  );
};

export default Header;
