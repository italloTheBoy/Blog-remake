import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/register', UserController.register);

userRouter.get('/login', UserController.login);

userRouter.get('/search/bar/:search', UserController.findInBar);

userRouter.get('/search/id/:id', UserController.findById);

// userRouter.get('/search/token', UserController.findByToken);

export default userRouter;
