import Joi from "joi";

export default class {
  static id = Joi.number()
    .required()
    .integer()
    .positive()
    .message('Id de usuario invalido.')
  ;

  static order = Joi.string()
    .required()
    .trim()
    .uppercase()
    .valid('ASC', 'DESC')
    .messages({
      'any.only': 'Filtro invalido.',
      'string.only': 'Filtro invalido.',
    })
  ;
}