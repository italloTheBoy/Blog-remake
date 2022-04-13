import Joi from 'joi';

const loginExeption = {
  err: {
    label: 'form',
    msg: 'Email ou senha incorretos.',
  },
};

const serverExeption = {
  err: {
    label: 'server',
    msg: 'Ocorreu um erro inesperado.',
  },
};

const tokenExeption = {
  err: {
    label: 'token',
    msg: 'Login necessário.',
  },
};

const invalidTokenException = {
  err: {
    label: 'token',
    msg: 'Token inválido.',
  },
};

function catchJoiExeption(error: Joi.ValidationError) {
  return {
    err: {
      label:  error.details[0].path[0],
      msg: error.details[0].message,
    },
  };
}

function catchExeption(label: string, msg: string) {
  return {
    err: {
      label,
      msg, 
    },
  }
}

export {
  loginExeption,
  serverExeption,
  tokenExeption,
  invalidTokenException,
  catchJoiExeption,
  catchExeption,
}
