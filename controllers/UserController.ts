import { 
  catchExeption, 
  catchJoiExeption, 
  loginExeption, 
  serverExeption 
} from '../helpers/validators/Exeptions';
import { Request, Response } from 'express';
import { UserRepository } from '../models/repositories/UserRepository';
import bcrypt from 'bcrypt';
import Token from '../helpers/auth/Token';
import RegisterValidator from '../helpers/validators/user/RegisterValidator';
import LoginValidator from '../helpers/validators/user/LoginValidator';
import EmailValidator from '../helpers/validators/user/EmailValidator';
import PasswordValidator from '../helpers/validators/user/PasswordValidator';
import UsernameValidator from '../helpers/validators/user/UsernameValidator';
import IdValidator from '../helpers/validators/user/IdValidator';

export default class UserController {
  
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      // const { error, value } = RegisterValidator.validate(req.body);
      
      // if (error) {
      //   return res.status(422).json(catchJoiExeption(error));
      // }

      const { email } = req.body;
        
      const userExists = await UserRepository.findOneBy({ email });

      if (userExists) {
        return res.status(422).json(catchExeption(
          'email',
          'Este email ja esta em uso.'
        ))
      }

      const user = UserRepository.create(req.body);

      await UserRepository.save(user);

      return res.status(201).json({
        msg: 'Usuario registrado com sucesso.',
        user,
      });
    }
    catch (err) {
      console.log(err); 

      return res.status(500).json(serverExeption);
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = LoginValidator.validate(req.body);

      if (error) {
        return res.status(422).json(loginExeption);
      }

      const user = await UserRepository.findOne({ 
        where: { email: req.body.email },
        select: ['id', 'email', 'password'],
      });

      if (!user) {
        return res.status(404).json(loginExeption);
      }

      const paswordIsCorrect = await bcrypt.compare(value.password, user!.password);

      if (!paswordIsCorrect) {
        return res.status(404).json(loginExeption);
      }

      const token = Token.generate(user.id);

      return res.status(200).json({ token });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }  

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

      return res.status(500).json(serverExeption);
    }
  }

  static async findById(req: Request, res: Response): Promise<Response> {
    try { 
      const id = Number(req.params.id);

      const user = await UserRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).json(catchExeption(
          'id',
          'Usuario não encontrado.'
        ));
      }
  
      return res.status(200).json({ user });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async findByToken(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body;

      const user = await UserRepository.findOneBy({ id: userId });
    
      if (!user) {
        res.status(404).json(catchExeption(
          'id',
          'Usuario não encontrado.',
        ));
      }

      return res.status(200).json({ user });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async changeEmail(req: Request, res: Response): Promise<Response>{
    try {
      const { userId } = req.body;
      const { error, value: email } = EmailValidator.validate(req.body.email);

      if (error) {
        return res.status(422).json(catchJoiExeption(error));
      }

      const emailExists = await UserRepository.findOneBy({ email });

      if (emailExists) {
        return res.status(422).json(catchExeption(
          'email',
          'Este email ja esta em uso.'
        ));
      }

      await UserRepository.update(userId, { email });

      return res.status(200).json({
        msg: 'Email alterado com sucesso.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = PasswordValidator.validate(req.body);

      if (error) {
        return res.status(422).json(catchJoiExeption(error));
      }

      const { userId } = req.body;
      
      const user = await UserRepository.findOne({ 
        where: { id: userId },
        select: ['password'],
      });
      
      if (!user) {
        return res.status(404).json(catchExeption(
          'id',
          'Usuario não encontrado.',
        )); 
      }

      const { currentPassword, password } = value;

      const passwordMath = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMath) {
        return res.status(404).json(catchExeption(
          'currentPassword',
          'Insira a senha atual corretamente.',
        ));
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await UserRepository.update(userId, { password: hashedPassword });
      
      return res.status(200).json({
        msg: 'Senha alterada com sucesso.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async changeUsername(req: Request, res: Response): Promise<Response> {
    try {
      const { value, error } = UsernameValidator.validate(req.body.username);
  
      if (error) {
        return res.status(422).json(catchJoiExeption(error));
      }
  
      const { userId } = req.body;
  
      await UserRepository.update(userId, { username: value });
  
      return res.status(200).json({
        msg: 'Nome de usuario alterado com sucesso.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  } 

  static async promoveToAdm(req: Request, res: Response): Promise<Response> {
    const loggedUserId = req.body.userId;
    const userIdToPromove = req.params.id;

    if (loggedUserId == userIdToPromove) {
      return res.status(422).json(catchExeption(
        'unauthorized',
        'Não é possivel promover você mesmo.'
      ));
    }

    const promotion = await UserRepository.update(userIdToPromove, { role: 'adm' });

    if (promotion.affected === 0) {
      return res.status(404).json(catchExeption(
        'email',
        'Usuario não encontrado.',
      ));
    }

    return res.status(200).json({
      msg: 'Cargo alterado com sucesso.',
    });
  }

  static async promoveToDev(req: Request, res: Response): Promise<Response> {
    const loggdUserId = req.body.userId;
    const idToPromove = req.params.id;

    if (loggdUserId == idToPromove) {
      return res.status(422).json(catchExeption(
        'unauthorized',
        'Não é possivel promover você mesmo.'
      ));
    }

    const promotion = await UserRepository.update(idToPromove, { role: 'dev' });

    if (promotion.affected === 0) {
      return res.status(404).json(catchExeption(
        'email',
        'Usuario não encontrado.',
      ));
    }

    return res.status(200).json({
      msg: 'Cargo alterado com sucesso.',
    });
  }

  static async promoveToUser(req: Request, res: Response): Promise<Response> {
    const loggdUserId = req.body.userId;
    const idToPromove = req.params.id;

    if (loggdUserId == idToPromove) {
      return res.status(422).json(catchExeption(
        'unauthorized',
        'Não é possivel promover você mesmo.'
      ));
    }

    const promotion = await UserRepository.update(idToPromove, { role: 'user' });

    if (promotion.affected === 0) {
      return res.status(404).json(catchExeption(
        'email',
        'Usuario não encontrado.',
      ));
    }

    return res.status(200).json({
      msg: 'Cargo alterado com sucesso.',
    });
  }

  static async deleteAccount(req: Request, res: Response): Promise<Response> {
    try {
      enum UserloggedIs {
        Adm = Number(req.params.id),
        User = req.body.userId
      }

      const id = UserloggedIs.Adm
        ? UserloggedIs.Adm
        : UserloggedIs.User 
      ;

      const { error } = IdValidator.validate(id);

      if (error) {
        return res.status(422).json(catchJoiExeption(error));
      }
      
      const deleteUser = await UserRepository.delete(id);

      if (deleteUser.affected === 0) {
        return res.status(404).json(catchExeption(
          'id',
          'Usuario não encontrado.',
        ));
      }

      return res.status(200).json({
        msg: 'Conta deletada com sucesso.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }
}
