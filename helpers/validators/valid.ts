import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { catchJoiExeption } from "../Exeptions";

export function valid(schema: Joi.Schema) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const objectToValid = req.body || req.params;

    const { error } = schema.validate(objectToValid);

    if (error) {
      return res.status(422).json(
        catchJoiExeption(error)
        // error
      );
    }

    next();
  }
}