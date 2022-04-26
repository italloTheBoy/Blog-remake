import { Router } from "express";
import Authenticator from "../helpers/validators/Authenticator";
import PostController from "../controllers/PostController";
import Token from "../helpers/auth/Token";
import CommumJoiSchemas from "../helpers/validators/schemas/CommumJoiSchema";
import PostJoiSchema from "../helpers/validators/schemas/PostJoiSchema";

const PostRouter = Router();

PostRouter.post('/', 
  Token.check,
  Authenticator.validFromBody({
    userId: CommumJoiSchemas.id,
    content: PostJoiSchema.content,
  }), 
  PostController.post,
);

export default PostRouter;
