import { Router } from 'express';
import UserController from '../controllers/UserController';
import Authorization from '../helpers/auth/Authorization';
import Token from '../helpers/auth/Token';

const userRouter = Router();

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.login);

userRouter.get('/search/bar/:search', UserController.findInBar);

userRouter.get('/search/id/:id', UserController.findById);

userRouter.get('/search/token', Token.check, UserController.findByToken);

userRouter.patch('/update/email', Token.check, UserController.changeEmail);

userRouter.patch('/update/username', Token.check, UserController.changeUsername);

userRouter.patch('/update/password', Token.check, UserController.changePassword);

userRouter.patch('/promove/adm/:id', Token.check, Authorization.isAdm, UserController.promoveToAdm);

userRouter.patch('/promove/dev/:id', Token.check, Authorization.isAdm, UserController.promoveToDev);

userRouter.patch('/promove/user/:id', Token.check, Authorization.isAdm, UserController.promoveToUser);

userRouter.delete('/delete', Token.check, Authorization.passwordIsCorrect, UserController.deleteAccount);

userRouter.delete('/ban/:id', Token.check, Authorization.isAdm, UserController.deleteAccount);

export default userRouter;
