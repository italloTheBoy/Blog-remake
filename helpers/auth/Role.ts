import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../models/repositories/UserRepository";
import { invalidTokenException, unauthorized } from '../Exeptions';

export default class Role {
  public static async isAdm(
    req: Request, 
    res: Response, 
    next :NextFunction
  ): Promise<Response | void> 
  {
    const { userId } = req.body;

    const user = await UserRepository.findOne({ 
      where: { id: userId },
      select: ['role'],
    })

    if (!user) {
      return res.status(404).json(invalidTokenException);
    }

    return user.role === 'adm'
      ? next()
      : res.status(401).json(unauthorized);
    ;
  }

  public static async isDev(
    req: Request, 
    res: Response, 
    next :NextFunction
  ): Promise<Response | void>
  {
    const { userId } = req.body;

    const user = await UserRepository.findOne({ 
      where: { id: userId },
      select: ['role'],
    })

    if (!user) {
      return res.status(404).json(invalidTokenException);
    }

    return user.role === 'dev'
      ? next()
      : res.status(401).json(unauthorized);
    ;
  }
}