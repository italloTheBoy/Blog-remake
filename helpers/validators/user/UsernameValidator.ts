import Joi from "joi";

export default Joi.string()
  .lowercase()
  .trim()
  .required()
  .messages({
    'any.required': 'Insira seu novo nome.',
    'string.empty': 'Insira seu novo nome.',
  })
;
