import Joi from "joi";

export default Joi.string()
  .required()
  .trim()
  .max(225)
  .messages({ 
    'string.base': 'Insira um conteudo valido para a postagem.',
    'string.empty': 'Insira o conteudo da postagem.',
    'string.max': 'Conteudo muito longo.',
  })
; 
