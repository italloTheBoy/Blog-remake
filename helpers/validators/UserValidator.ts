import Joi from 'joi';

export default Joi.object({
  username: Joi.string()
    .lowercase()
    .trim()
    .required()
    .messages({
      'any.required': 'Insira seu nome.',
      'string.empty': 'Insira seu nome.',
    })
  ,

  email: Joi.string()
    .trim()
    .required()
    .email()
    .messages({
      'any.required': 'Insira um email valido.',
      'string.empty': 'Insira um email valido.',
      'string.email': 'Insira um email valido.',
    })
  ,

  password: Joi.string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .messages({
      'any.required': 'Insira uma senha.',
      'string.empty': 'Insira uma senha.',
      'string.min': 'A senha é muito curta.',
      'string.max': 'A senha é muito longa.',
    })
  ,
  
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.required': 'As senhas não batem.',
      'any.only': 'As senhas não batem.',
    })
  ,
});