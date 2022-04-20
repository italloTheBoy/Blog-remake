import Joi from "joi";

export default Joi.string()
  .trim()
  .required()
  .min(6)
  .max(20)
  .messages({
    'any.required': 'Insira sua senha.',
    'string.empty': 'Insira sua senha.',
    'string.min': 'Senha invalida.',
    'string.max': 'Senha invalida.',
  })
;