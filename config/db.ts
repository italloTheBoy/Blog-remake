import { Sequelize } from "sequelize";
import config from "config";
import IDatabase from '../interfaces/IDatabase';

const db = config.get<IDatabase>('db');

export const connectDB = new Sequelize(
  db.database, 
  db.username, 
  db.password, 
  {
    host: db.host,
    dialect: "mysql",
  }
)
