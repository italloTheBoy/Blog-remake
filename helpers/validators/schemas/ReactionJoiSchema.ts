import Joi from "joi";

export default class LikeJoiSchema {
  static type = Joi.string()
    .required()
    .trim()
    .lowercase()
    .valid('like', 'dislike')
    .messages({
      'any.required': 'Reação invalida.',
      'any.valid': 'Reação invalida.',
      'string.empty': 'Reação invalida.',
      'string.base': 'Reação invalida.',
    })
  ;
}