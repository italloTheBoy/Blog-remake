import Joi from "joi";

export default class {
  static id = Joi.number()
    .required()
    .integer()
    .positive()
    .messages({
      'any.only': 'Id invalido.',
      'number.only': 'Id invalido.',
      'number.base': 'Id invalido.',
      'number.integer': 'Id invalido.',
      'number.positive': 'Id invalido.',
    })
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