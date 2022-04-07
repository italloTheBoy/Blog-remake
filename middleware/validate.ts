import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export function validate(req: Request, res: Response, next: NextFunction)
{

  const reqErros = validationResult(req);

  if (reqErros.isEmpty()) {
    return next();
  }


  const errors: Object[] = [];

  reqErros
    .array()
    .map(err => {
      return errors.push({
        [err.param]: err.msg
      });
    })
  ;

  return res.status(422).json({ errors });
}

