import dotenv from 'dotenv';
import IDatabase from '../interfaces/IDatabase';


dotenv.config();


export default {
  port: process.env.PORT || 3000,

  dbConfig: {
    database: process.env.DB_DATABASE || 'test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    host: process.env.DB_HOST || 'localhost',
  } as IDatabase
};
