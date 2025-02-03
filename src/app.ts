import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import guestRouter from '@/guest/router';

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {})
    .catch((error) => {
      console.log(`Error connecting mongo: ${error}`);
    });
}

guestRouter(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Canore is alive!');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error: ', error);
  if (!(error instanceof Error)) {
    error = new Error('UNKNOWN_ERROR');
  }
  return res.status(error.status).json({
    status: error.status,
    error: error.message
  });
});

export default app;
