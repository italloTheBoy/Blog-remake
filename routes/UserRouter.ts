import { Router } from 'express';
import Authenticator from "../helpers/validators/Authenticator";
import UserController from '../controllers/UserController';
import Authorization from '../helpers/auth/Authorization';
import Token from '../helpers/auth/Token';
import UserJoiSchema from '../helpers/validators/schemas/UserJoiSchema';
import CommumJoiSchema from '../helpers/validators/schemas/CommumJoiSchema';

const userRouter = Router();

userRouter.post('/register',
  Authenticator.validFromBody({
    username: UserJoiSchema.username,
    email: UserJoiSchema.email,
    password: UserJoiSchema.password,
    repeatPassword: UserJoiSchema.repeatPassword,
  }),
  UserController.register,
);

userRouter.post('/login',
  Authenticator.validFromBody({
    email: UserJoiSchema.email.messages({
      'any.required': 'Email ou senha inválidos.',
      'string.empty': 'Email ou senha inválidos.',
      'string.email': 'Email ou senha inválidos.',
      'string.base': 'Email ou senha inválidos.',
    }),
    password: UserJoiSchema.password.messages({
      'any.required': 'Email ou senha inválidos.',
      'string.empty': 'Email ou senha inválidos.',
      'string.base': 'Email ou senha inválidos.',
      'string.min': 'Email ou senha inválidos.',
      'string.max': 'Email ou senha inválidos.',
    }),
  }), 
  UserController.login,
);

userRouter.get('/search/bar/:search', 
  UserController.findInBar,
);

userRouter.get('/search/id/:id', 
  Authenticator.validFromPath({ id: CommumJoiSchema.id }),
  UserController.findById,
);

userRouter.get('/search/token', 
  Token.check,
  UserController.findByToken,
);

userRouter.patch('/update/email', 
  Token.check, 
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    email: UserJoiSchema.email,
  }),
  UserController.changeEmail
);

userRouter.patch('/update/password', 
  Token.check, 
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    password: UserJoiSchema.password,
    repeatPassword: UserJoiSchema.repeatPassword,
    currentPassword: UserJoiSchema.password.messages({
      'any.required': 'Insira a senha atual.',
      'string.empty': 'Insira a senha atual.',
      'string.base': 'Insira a senha atual.',
      'string.min': 'Insira a senha atual.',
      'string.max': 'Insira a senha atual.',
    }),
  }),
  UserController.changePassword,
);

userRouter.patch('/update/username', 
  Token.check, 
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    username: UserJoiSchema.username,
  }),
  UserController.changeUsername,
);

userRouter.patch('/promove/adm/:id', 
  Token.check, 
  Authorization.isAdm, 
  Authenticator.validFromBody({ userId: CommumJoiSchema.id }),
  Authenticator.validFromPath({ id: CommumJoiSchema.id }),
  UserController.promoveToAdm,
);

userRouter.patch('/promove/dev/:id', 
  Token.check, 
  Authorization.isAdm, 
  Authenticator.validFromBody({ userId: CommumJoiSchema.id }),
  Authenticator.validFromPath({ id: CommumJoiSchema.id }),
  UserController.promoveToDev
);

userRouter.patch('/promove/user/:id', 
  Token.check, 
  Authorization.isAdm,
  Authenticator.validFromBody({ userId: CommumJoiSchema.id }),
  Authenticator.validFromPath({ id: CommumJoiSchema.id }), 
  UserController.promoveToUser
);

userRouter.delete('/delete', 
  Token.check, 
  Authorization.passwordIsCorrect, 
  UserController.deleteAccount
);

userRouter.delete('/ban/:id', 
  Token.check, Authorization.isAdm, 
  UserController.deleteAccount
);

export default userRouter;
