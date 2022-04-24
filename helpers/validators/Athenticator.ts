import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { catchJoiExeption, serverExeption } from "./Exeptions";

export default class Athenticator {
  private static authenticate(data: object, schema: object) {
    const joiSchema = Joi.object(schema);

    const { error, value } = joiSchema.validate(data);
  
    return { value, error };    
  }

  static validFromBody(schema: object) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { value, error } = Athenticator.authenticate(req.body, schema);
  
        if (error) {
          return res.status(422).json(
            catchJoiExeption(error)
            // error
          );
        }
    
        req.body = value;
          
        next();
      }
      catch (err) {
        console.log(err);
  
        return res.status(500).json(serverExeption);
      }
    };
  }

  static validFromPath(schema: object) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { value, error } = Athenticator.authenticate(req.params, schema);
  
        if (error) {
          return res.status(422).json(
            catchJoiExeption(error)
            // error
          );
        }
        
        req.params = value;
          
        next();
      }
      catch (err) {
        console.log(err);
  
        return res.status(500).json(serverExeption);
      }
    };
  }
}
