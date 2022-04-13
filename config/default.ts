import dotenv from 'dotenv';
import IDatabase from '../interfaces/IDatabase';

dotenv.config();

export default {
  secret: process.env.SECRET || 'VQ4jOEcpJVBxHGjtIN6PzkVp8FeSfhu5X7PpzW8a5XrHGHBcpn',

  port: process.env.PORT || 3000,

  dbConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_DATABASE || 'test',
  } as IDatabase,
};
