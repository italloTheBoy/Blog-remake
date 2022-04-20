import Joi from "joi";

export default Joi.string()
  .trim()
  .required()
  .email()
  .messages({
    'any.required': 'Insira um email valido.',
    'string.empty': 'Insira um email valido.',
    'string.email': 'Insira um email valido.',
  })
;