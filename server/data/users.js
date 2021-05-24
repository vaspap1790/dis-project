const bcrypt = require('bcryptjs');

exports.users = [
  {
    username: 'user1',
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('12121212', 10),
    rating: 3,
    numReviews: 8
  },
  {
    username: 'user2',
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('12121212', 10),
    rating: 4,
    numReviews: 22
  }
];
