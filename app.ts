import dotenv from 'dotenv';
import express from 'express';
import config from 'config';
import { Request, Response } from 'express';
import db from './config/db';


const port = config.get<number>('port');

dotenv.config();


const app = express();

app.use(express.json());  


app.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Ai seu Armando vai tomar no cu!!!',
  });
});


try {
  db.sync()

  app.listen(port, async () => {
    console.log(`Server runnining in http://localhost:${port}`);
  });
}
catch (err) {
  console.log(err);
}
