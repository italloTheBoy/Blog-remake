import { Router } from 'express';
import UserController from '../controllers/UserController';
import Role from '../helpers/auth/Role';
import Token from '../helpers/auth/Token';

const userRouter = Router();

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.login);

userRouter.get('/search/bar/:search', UserController.findInBar);

userRouter.get('/search/id/:id', UserController.findById);

userRouter.get('/search/token', Token.checkToken, UserController.findByToken);

userRouter.patch('/promove/adm/:id', Token.checkToken, Role.isAdm, UserController.promoveToAdm);

userRouter.patch('/promove/dev/:id', Token.checkToken, Role.isAdm, UserController.promoveToDev);

userRouter.patch('/promove/user/:id', Token.checkToken, Role.isAdm, UserController.promoveToUser);

export default userRouter;
