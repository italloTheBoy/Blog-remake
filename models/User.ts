import { DataTypes } from 'sequelize';
import db from '../config/db';

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM('commum','admin'),
    defaultValue: 'commum',
  }
});

export default User;
