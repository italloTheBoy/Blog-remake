import jwt from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { invalidTokenException, serverExeption, tokenExeption } from '../validators/Exeptions';
import { UserRepository } from '../../models/repositories/UserRepository';

export default class Token {
  private static secret = config.get<string>('secret');

  static generate(id: number | string): string {
    const payload = { 
      id: id,
    };

    return jwt.sign(payload, Token.secret);
  }

  private static async getToken(req: Request): Promise<string | null> {
    return req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null
  }

  static async check (req: Request, res: Response, next: NextFunction) {
    try { 
      const token = await Token.getToken(req);

      if (!token) {
        return res.status(401).json(tokenExeption);
      }

      const decoded = jwt.verify(token, Token.secret) as { id: number };

      if (!decoded.id) {
        return res.status(401).json(invalidTokenException);
      }

      const user = await UserRepository.findOneBy({ id: decoded.id });

      if (!user) {
        return res.status(401).json(invalidTokenException);
      }

      req.body.userId = user.id;

      next();
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }  
} 
