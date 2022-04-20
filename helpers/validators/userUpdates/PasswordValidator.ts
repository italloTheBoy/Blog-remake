import Joi from "joi";

export default Joi.object({
  userId: Joi.number()
    .required()
    .integer()
    .positive()
    .message('Id de usuario invalido.')
  ,

  currentPassword: Joi.string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .message('Insira a senha atual.')
  ,

  password: Joi.string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .messages({
      'any.required': 'Insira a nova senha.',
      'string.empty': 'Insira a nova senha.',
      'string.min': 'A nova senha é muito curta.',
      'string.max': 'A nova senha é muito longa.',
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