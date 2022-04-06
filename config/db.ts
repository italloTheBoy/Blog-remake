import { Sequelize } from "sequelize";
import config from "config";
import IDatabase from '../interfaces/IDatabase';

const { 
  database,
  username,
  password,
  host,
} = config.get<IDatabase>('dbConfig');


export default new Sequelize(
  database, 
  username, 
  password, 
  {
    host: host,
    dialect: 'mysql',
  }
);
