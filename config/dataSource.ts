import IDatabase from '../interfaces/IDatabase';
import { DataSource } from 'typeorm';
import config from "config";
import User from '../models/User';
import Post from '../models/Post';
import Reaction from '../models/Reaction';
import Comment from '../models/Commment';

const dbConfig = config.get<IDatabase>('dbConfig');

export default new DataSource({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: ['error', 'warn'],
  entities: [
    User,
    Post,
    Reaction,
    Comment,
  ],
});