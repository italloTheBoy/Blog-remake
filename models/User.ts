import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
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
    set(value: string) {
      const hash = bcrypt.hashSync(value, 12);

      this.setDataValue('password', hash);
    }
  },

  type: {
    type: DataTypes.ENUM('commum', 'dev', 'admin'),
    defaultValue: 'commum',
  },
});

export default User;
