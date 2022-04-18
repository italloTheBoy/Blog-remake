import express from 'express';
import config from 'config';
import dataSource from './config/dataSource';
import UserRouter from './routes/UserRouter';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

const secret = config.get<string>('secret');
const port = config.get<number>('port');
const app = express();

app.use(express.json());  

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', UserRouter);

try {
  dataSource.initialize();

  app.listen(port, async () => {
    console.log(`Server runnining in http://localhost:${port}`);
  });
}
catch (err) {
  console.log(err);
}
