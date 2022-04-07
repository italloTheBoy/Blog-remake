import { Request, Response } from 'express';
import User from '../models/User';
import UserValidator from '../helpers/validators/UserValidator';
import bcrypt from 'bcrypt';

export default class UserController {
  static async register(req: Request, res: Response) 
  {
    const { error, value } = UserValidator.validate(req.body);

    if (error) {
      return res
        .status(422)
        .json({ 
          err: {
            label:  error.details[0].path[0],
            msg: error.details[0].message,
          }
        })
      ;
    }

    try {
      const checkUser = await User.findOne({
        where: { email: value.email}
      })

      if (checkUser) {
        return res
          .status(422)
          .json({
            err: {
              label: 'email',
              msg: 'Este email ja esta em uso.',
            }
          })
        ;
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(value.password, salt);

      const user = {
        username: value.username,
        email: value.email,
        password: hashedPassword,
      };

      const newUser = await User.create(user);

      if (!newUser) {
        return res
          .status(422)
          .json({ msg: 'Não foi possivel registrar o usuario.' })
        ;
      }

      return res
        .status(201)
        .json({
          msg: 'Usuario registrado com sucesso.',
          user: newUser,
        })
      ;
    }
    catch (err) {
      console.log(err);

      return res
        .status(500)
        .json({ 
          err: {
            label: 'server',
            msg: 'Ocorreu um erro inesperado.',
          }
        })
      ;
    }
  }
}