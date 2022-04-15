import { Router } from 'express';
import UserController from '../controllers/UserController';
import Token from '../helpers/auth/Token';

const userRouter = Router();

userRouter.post('/register', UserController.register);

userRouter.get('/login', UserController.login);

userRouter.get('/search/bar/:search', UserController.findInBar);

userRouter.get('/search/id/:id', UserController.findById);

userRouter.get('/search/token', Token.checkToken, UserController.findByToken);

export default userRouter;
