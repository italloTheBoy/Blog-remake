import { Router } from 'express';
import UserController from '../controllers/UserController';
import Authorization from '../helpers/auth/Authorization';
import Token from '../helpers/auth/Token';

const userRouter = Router();

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.login);

userRouter.get('/search/bar/:search', UserController.findInBar);

userRouter.get('/search/id/:id', UserController.findById);

userRouter.get('/search/token', Token.checkToken, UserController.findByToken);

userRouter.patch('/update/email', Token.checkToken, UserController.changeEmail);

userRouter.patch('/update/username', Token.checkToken, UserController.changeUsername);

userRouter.patch('/update/password', Token.checkToken, UserController.changePassword);

userRouter.patch('/promove/adm/:id', Token.checkToken, Authorization.isAdm, UserController.promoveToAdm);

userRouter.patch('/promove/dev/:id', Token.checkToken, Authorization.isAdm, UserController.promoveToDev);

userRouter.patch('/promove/user/:id', Token.checkToken, Authorization.isAdm, UserController.promoveToUser);

userRouter.delete('/delete', Token.checkToken, Authorization.passwordIsCorrect, UserController.deleteAccount);

userRouter.delete('/ban/:id', Token.checkToken, Authorization.isAdm, UserController.deleteAccount);

export default userRouter;
