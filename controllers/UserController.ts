import { Request, Response } from 'express';
import User from '../models/User';
import { Op } from 'sequelize';
import UserValidator from '../helpers/validators/UserValidator';

export default class UserController {

  static async register(req: Request, res: Response): Promise<Response> {

    const { error, value } = UserValidator.validate(req.body);
    
    if (error) {
      return res.status(422).json({ 
        err: {
          label:  error.details[0].path[0],
          msg: error.details[0].message,
        }
      });
    }
        
    try {
      const [ user, created ] = await User.findOrCreate({
        where: { email: value.email },
        defaults: value,
      });

      if (created) {
        return res.status(201).json({
          msg: 'Usuario registrado com sucesso.',
          user: user,
        });
      }

      return res.status(422).json({
        err: {
          label: 'email',
          msg: 'Este email ja esta em uso.',
        }
      });
    }
    catch (err) {
      return res.status(500).json({ 
        err: {
          label: 'server',
          msg: 'Ocorreu um erro inesperado.',
        }
      });
    }
  }

  static async findInBar(req: Request, res: Response) {

    const { data } = req.params;

    try { 
      const { count, rows } = await User.findAndCountAll({
        where: {
          [Op.or]: [
            { username: data },
            { email: data },
          ]
        }
      });
  
      return res.status(200).json({
        count,
        users: rows,
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json({ 
        err: {
          label: 'server',
          msg: 'Ocorreu um erro inesperado.',
        }
      });
    }
  }
}
