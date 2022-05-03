import Joi from "joi";

export default class {
  static content = Joi.string()
    .trim()
    .required()
    .min(1)
    .max(255)
    .messages({ 
      'string.base': 'Insira um conteudo valido para a postagem.',
      'string.required': 'Insira o conteudo da postagem.',
      'string.empty': 'Insira o conteudo da postagem.',
      'string.min': 'Conteudo muito curto.',
      'string.max': 'Conteudo muito longo.',
    })
  ;
}