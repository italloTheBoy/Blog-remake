import { 
  catchExeption, 
  catchJoiExeption, 
  loginExeption, 
  selfhandleException, 
  serverExeption, 
  unfindedUserExeption
} from '../helpers/validators/Exeptions';
import { Request, Response } from 'express';
import { UserRepository } from '../models/repositories/UserRepository';
import bcrypt from 'bcrypt';
import Token from '../helpers/auth/Token';
import CommumJoiSchema from '../helpers/validators/schemas/CommumJoiSchema';

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
      const { password, email } = req.body;

      const user = await UserRepository.findOne({ 
        where: { email },
        select: ['id', 'email', 'password'],
      });

      if (!user) {
        return res.status(404).json(loginExeption);
      }

      const paswordIsCorrect = await bcrypt.compare(password, user!.password);

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
      const { userId, email } = req.body;
    
      const emailInUse = await UserRepository.findOneBy({ email });

      if (emailInUse) {
        return res.status(422).json(catchExeption(
          'email',
          'Este email ja esta em uso.',
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
      const { userId, currentPassword, password } = req.body;
      
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

      const passwordIsCorrect  = await bcrypt.compare(currentPassword, user.password);

      if (!passwordIsCorrect ) {
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
      const { userId, username } = req.body;
  
      await UserRepository.update(userId, { username });
  
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
    try {
      const admId = req.body.userId;
      const userId = Number(req.params.id);

      if (admId === userId) {
        return res.status(422).json(selfhandleException);
      }

      const user = await UserRepository.findOneBy({ id: userId });
  
      if (!user) {
        return res.status(404).json(unfindedUserExeption);
      }

      user.role = 'adm';

      await UserRepository.save(user);

      return res.status(200).json({
        msg: 'Cargo alterado com sucesso.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async promoveToDev(req: Request, res: Response): Promise<Response> {
    try {
      const admId = req.body.userId;
      const userId = Number(req.params.id);
  
      if (admId === userId) {
        return res.status(422).json(selfhandleException);
      }

      const user = await UserRepository.findOneBy({ id: userId });
  
      if (!user) {
        return res.status(404).json(unfindedUserExeption);
      }

      user.role = 'dev';

      await UserRepository.save(user);
  
      return res.status(200).json({
        msg: 'Cargo alterado com sucesso.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async promoveToUser(req: Request, res: Response): Promise<Response> {
    try {
      const admId = req.body.userId;
      const userId = Number(req.params.id);
  
      if (admId === userId) {
        return res.status(422).json(selfhandleException);
      }
  
      const user = await UserRepository.findOneBy({ id: userId });
  
      if (!user) {
        return res.status(404).json(unfindedUserExeption);
      }

      user.role = 'user';

      await UserRepository.save(user);
  
      return res.status(200).json({
        msg: 'Cargo alterado com sucesso.',
      });
    }
  catch (err) {
    console.error(err);

    return res.status(500).json(serverExeption);
  }    
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

      const { error } = CommumJoiSchema.id.validate(id);

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
