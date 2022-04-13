import Joi from 'joi';

export default Joi.object({
  email: Joi.string()
    .trim()
    .required()
    .email()
  ,

  password: Joi.string()
    .trim()
    .required()
    .min(6)
    .max(20)
  ,
})