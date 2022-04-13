import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../../models/User';

export default class {
  private static secret = config.get<string>('secret');

  public static generate(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    }

    return jwt.sign(payload, this.secret);
  }
} 