const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1. Middlewares
app.use(morgan('dev'));
app.use(express.json()); // middleware (for req.body)
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. Route Handlers

// 3. Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Neither tourRouter nor userRouter was able to catch it
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
