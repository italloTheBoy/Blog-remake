import { Router } from "express";
import { valid } from "../helpers/validators/valid";
import PostController from "../controllers/PostController";
import Token from "../helpers/auth/Token";
import contentValidator from "../helpers/validators/post/contentValidator";
import IdValidator from "../helpers/validators/user/IdValidator";
import Joi from "joi";

const PostRouter = Router();

PostRouter.post('/', 
  Token.check,
  valid(Joi.object({
    userId: IdValidator,
    content: contentValidator,
  })), 
  PostController.post,
);

export default PostRouter;
