import dotenv from 'dotenv';
import IDatabase from '../interfaces/IDatabase';


dotenv.config();


export default {
  env: process.env.ENV,

  port: process.env.PORT || 'teu cu',

  db: {
    database: process.env.DB_DATABASE || 'test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
  } as IDatabase
};