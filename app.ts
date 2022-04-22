import express from 'express';
import config from 'config';
import dataSource from './config/dataSource';
import UserRouter from './routes/UserRouter';
import cors from 'cors';
import PostRouter from './routes/PostRouter';

const port = config.get<number>('port');
const app = express();

app.use(express.json());  

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/user', UserRouter);
app.use('/post', PostRouter);

try {
  dataSource.initialize();

  app.listen(port, async () => {
    console.log(`Server runnining in http://localhost:${port}`);
  });
}
catch (err) {
  console.log(err);
}
