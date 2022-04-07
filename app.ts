import dotenv from 'dotenv';
import express from 'express';
import config from 'config';
import { Request, Response } from 'express';
import db from './config/db';
import User from './models/User'
import UserRouter from './routes/UserRouter';

const port = config.get<number>('port');

dotenv.config();

const app = express();

app.use(express.json());  

app.use('/user', UserRouter);

try {
  db.sync({ force: false });

  app.listen(port, async () => {
    console.log(`Server runnining in http://localhost:${port}`);
  });
}
catch (err) {
  console.log(err);
}
