import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import packetRoutes from './routes/packetRoutes.js';
import userRoutes from './routes/userRoutes.js';
import accessRoutes from './routes/accessRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import actionRoutes from './routes/actionRoutes.js';

// Global variables will be available through 'process.env.*' in '.env' file
dotenv.config();

// Connect to Database
connectDB();

// Instantiate Express server
const app = express();

// Middlewares
// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Permit json in the request body
app.use(express.json());

// Routing
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/packets', packetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/access', accessRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/action', actionRoutes);

// Make this folder static so the web server can serve it
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error Handling
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
