import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../../models/User';
import { NextFunction, Request, Response } from 'express';
import { invalidTokenException, serverExeption, tokenExeption } from '../Exeptions';
import IUserPayload from '../../interfaces/IUserPayload';

export default class {
  private static secret = config.get<string>('secret');

  public static generate(user: User): string {
    const payload = { id: user.id };

    return jwt.sign(payload, this.secret);
  }

  private static async getToken(req: Request): Promise<string | null> {
    return req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null
  }

  public static async checkLogin (
    req: Request, res: Response, next: NextFunction
  ) {
    try { 
      const token = await this.getToken(req);

      if (!token) {
        return res.status(401).json(tokenExeption);
      }

      const decoded = jwt.verify(token, this.secret) as IUserPayload;

      if (!decoded.id) {
        return res.status(401).json(invalidTokenException);
      }

      req.cookies.user = { id: decoded.id };

      next();
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }

  }  
} 
