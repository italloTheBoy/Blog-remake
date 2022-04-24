import Joi from "joi";

export default class {
  static id = Joi.number()
    .required()
    .integer()
    .positive()
    .message('Id de usuario invalido.')
  ;
}