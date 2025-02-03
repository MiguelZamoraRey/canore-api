import express, { Request, Response } from 'express';
import guestRouter from './guest/router';
import mongoose from 'mongoose';
import cors from 'cors';

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;
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

app.listen(port ? port : 3000, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
