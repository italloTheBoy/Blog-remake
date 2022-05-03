import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../models/repositories/ReactionRepository";
import { catchExeption, catchJoiExeption, invalidTokenException, unauthorized } from '../validators/Exeptions';
import bcrypt from 'bcrypt';
import UserJoiSchema from "../validators/schemas/UserJoiSchema";

export default class Authorization {
  public static async isAdm(
    req: Request, 
    res: Response, 
    next: NextFunction
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

  public static async passwordIsCorrect(
    req: Request, 
    res: Response, 
    next :NextFunction
  ): Promise<Response | void> {
    const { error } = UserJoiSchema.password.validate(req.body.password);

    if (error) {
      return res.status(422).json(catchJoiExeption(error));
    }

    const { userId , password } = req.body;

    const user = await UserRepository.findOne({ 
      where: { id: userId },
      select: ['password'],
    });

    console.log(userId);

    const passwordMath = await bcrypt.compare(password, user!.password);

    if (!passwordMath) {
      return res.status(422).json(catchExeption(
        'password',
        'Senha incorreta.',
      ));
    }

    return next();
  }
}