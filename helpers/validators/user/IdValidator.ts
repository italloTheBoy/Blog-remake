import Joi from "joi";

export default Joi.number()
  .required()
  .integer()
  .positive()
  .message('Id de usuario invalido.')
;