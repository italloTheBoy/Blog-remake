import jwt from 'jsonwebtoken';

export default interface IUserPayload extends jwt.JwtPayload {
  id: number;
};