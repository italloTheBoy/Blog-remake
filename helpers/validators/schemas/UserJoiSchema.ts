import Joi from "joi";

export default class UserJoiSchema {
  static username = Joi.string()
    .required()
    .trim() 
    .lowercase()
    .messages({
      'any.required': 'Insira seu nome.',
      'string.empty': 'Insira seu nome.',
      'string.base': 'Insira um nome valido.',
    })
  ;

  static email = Joi.string()
    .required()
    .trim()
    .email()
    .messages({
      'any.required': 'Insira um email.',
      'string.empty': 'Insira um email.',
      'string.email': 'Insira um email valido.',
      'string.base': 'Insira um email valido.',
    })
  ;

  static password = Joi.string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .messages({
      'any.required': 'Insira uma senha.',
      'string.empty': 'Insira uma senha.',
      'string.base': 'Insira uma senha valida.',
      'string.min': 'A senha é muito curta.',
      'string.max': 'A senha é muito longa.',
    })
  ;

  static repeatPassword = Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.required': 'As senhas não batem.',
      'any.only': 'As senhas não batem.',
    })
  ;
}