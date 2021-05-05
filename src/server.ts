import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes/index';
import AppError from './errors/AppError';

import './database';

const app = express();
const porta = process.env.PORT;

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(porta || 3333, () => {
  if (porta) {
    console.log(`🚀 Server started on port ${porta}!`);
  }
  console.log('🚀 Server started on port 3333!');
});
