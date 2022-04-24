import { Router } from "express";
import Athenticator from "../helpers/validators/Athenticator";
import PostController from "../controllers/PostController";
import Token from "../helpers/auth/Token";
import CommumJoiSchemas from "../helpers/validators/schemas/CommumJoiSchemas";
import PostJoiSchema from "../helpers/validators/schemas/PostJoiSchema";

const PostRouter = Router();

PostRouter.post('/', 
  Token.check,
  Athenticator.validFromBody({
    userId: CommumJoiSchemas.id,
    content: PostJoiSchema.content,
  }), 
  PostController.post,
);

export default PostRouter;
