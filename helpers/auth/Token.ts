import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../../models/User';
import { NextFunction, Request, Response } from 'express';
import { invalidTokenException, serverExeption, tokenExeption } from '../Exeptions';
import IUserPayload from '../../interfaces/IUserPayload';

export default class Token {
  private static secret = config.get<string>('secret');

  public static generate(user: User): string {
    const payload = { 
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, Token.secret);
  }

  private static async getToken(req: Request): Promise<string | null> {
    return req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null
  }

  public static async checkToken (
    req: Request, res: Response, next: NextFunction
  ) {
    try { 
      const token = await Token.getToken(req);

      if (!token) {
        return res.status(401).json(tokenExeption);
      }

      const decoded = jwt.verify(token, Token.secret) as IUserPayload;

      if (!decoded.id || !decoded.email) {
        return res.status(401).json(invalidTokenException);
      }

      req.body.user = decoded;

      next();
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }

  }  
} 
