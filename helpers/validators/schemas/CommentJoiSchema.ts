import Joi from "joi";

export default class {
  static content = Joi.string()
    .trim()
    .required()
    .min(1)
    .max(255)
    .messages({ 
      'string.base': 'Insira um conteudo valido.',
      'string.required': 'Insira o conteudo do comentário.',
      'string.empty': 'Insira o conteudo do comentário.',
      'string.min': 'Conteudo muito curto.',
      'string.max': 'Conteudo muito longo.',
    })
  ;
}