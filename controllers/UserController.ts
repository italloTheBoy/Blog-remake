import { Request, Response } from 'express';
import { UserRepository } from '../models/repositories';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken'
import RegisterValidator from '../helpers/validators/RegisterValidator';
import LoginValidator from '../helpers/validators/LoginValidator';

export default class UserController {

  static async register(req: Request, res: Response): Promise<Response> {

    try {
      const { error, value } = RegisterValidator.validate(req.body);
      
      if (error) {
        return res.status(422).json({ 
          err: {
            label:  error.details[0].path[0],
            msg: error.details[0].message,
          }
        });
      }
        
      const userExists = await UserRepository.findOneBy({ email: value.email });

      if (userExists) {
        return res.status(422).json({
          err: {
            label: 'email',
            msg: 'Este email ja esta em uso.',
          }
        });
      }

      const newUser = UserRepository.create(value);

      await UserRepository.save(newUser);

      return res.status(201).json({
        msg: 'Usuario registrado com sucesso.',
        user: newUser,
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

  // static async login(req: Request, res: Response) {
  //   const invalidDataErr = {
  //     err: {
  //       label: 'form',
  //       msg: 'Email ou senha incorretos.',
  //     }
  //   }

  //   try {
  //     const { error, value } = LoginValidator.validate(req.body);

  //     if (error) {
  //       res.status(422).json(invalidDataErr);
  //     }

  //     const user: IUser = await User.findOne({
  //       where: { email: value.email },
  //       attributes: {
  //         include: ['password']
  //       },
  //     });

  //     if (!user) {
  //       res.status(404).json(invalidDataErr);
  //     }

  //     const paswordIsCorrect = await bcrypt.compare(value.password, user.password);

  //     // const secret = config.get<string>('secret');
  //     // const payload = {
  //     //   id: user.id,
  //     // }


  //   }
  //   catch (err) {
  //     console.log(err);

  //     return res.status(500).json(invalidDataErr);
  //   }
  // }

  static async findInBar(req: Request, res: Response): Promise<Response> {
    try { 
      const { search } = req.params;

      const [ users, count ] = await UserRepository.findAndCountBy([
        { username: search.toLowerCase() },
        { email: search },
      ])

      return res.status(200).json({
        count,
        users,
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

  static async findById(req: Request, res: Response): Promise<Response> {
    try { 
      const id = Number(req.params.id);

      const user = await UserRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).json({
          err: {
            label: 'id',
            msg: 'Usuario não encontrado.',
          }
        });
      }
  
      return res.status(200).json({ user });

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
