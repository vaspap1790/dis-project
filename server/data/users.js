const bcrypt = require('bcryptjs');

exports.users = [
  {
    username: 'admin1',
    email: 'admin1@gmail.com',
    password: bcrypt.hashSync('admin123', 10),
    rating: 4.0,
    numReviews: 12,
    isAdmin: true
  },
  {
    username: 'user1',
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('user1234', 10),
    rating: 3.0,
    numReviews: 8
  },
  {
    username: 'user2',
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('user2345', 10),
    rating: 2.5,
    numReviews: 22
  }
];
