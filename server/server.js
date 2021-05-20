const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const packetRoutes = require('./routes/packetRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const actionRoutes = require('./routes/actionRoutes.js');

// Global variables will be available through 'process.env.*' in '.env' file
dotenv.config();

// Connect to Database
connectDB();

// Instantiate Express server
const app = express();

// Middleware - Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Middleware - Permit json in the request body
app.use(express.json());

// Routing
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/packets', packetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/action', actionRoutes);

// Make this folder static so the web server can serve it
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// Middleware - Error Handling
app.use(notFound);
app.use(errorHandler);

// Configuration
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
