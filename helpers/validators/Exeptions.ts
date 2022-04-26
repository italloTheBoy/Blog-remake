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

const unauthorized = {
  err: {
    label: 'unauthorized',
    msg: 'Acesso não autorizado.',
  }
}

const selfhandleException = {
  err: {
    label: 'id',
    msg: 'Não é possivel realizar esta ação em você mesmo.',
  }
}

export const unfindedUserExeption = {
  err: {
    label: 'id',
    msg: 'Usuario não encontrado.',
  }
}

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
  unauthorized,
  selfhandleException,
  catchJoiExeption,
  catchExeption,
}
