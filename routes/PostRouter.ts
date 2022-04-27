import { Router } from "express";
import Authenticator from "../helpers/validators/Authenticator";
import PostController from "../controllers/PostController";
import Token from "../helpers/auth/Token";
import CommumJoiSchemas from "../helpers/validators/schemas/CommumJoiSchema";
import PostJoiSchema from "../helpers/validators/schemas/PostJoiSchema";

const PostRouter = Router();

// CREATE
PostRouter.post('/', 
  Token.check,
  Authenticator.validFromBody({
    userId: CommumJoiSchemas.id,
    content: PostJoiSchema.content,
  }), 
  PostController.post,
);

// READ


// UPDATE
PostRouter.get('/search/my/new',
  Token.check,
  Authenticator.validFromBody({ userId: CommumJoiSchemas.id }),
  PostController.getMyPosts('DESC'),
);

PostRouter.get('/search/my/old',
  Token.check,
  Authenticator.validFromBody({ userId: CommumJoiSchemas.id }),
  PostController.getMyPosts('ASC'),
);

PostRouter.get('/search/:postId',
  Authenticator.validFromPath({ postId: CommumJoiSchemas.id }),
  PostController.getOne,
);

// DELETE
PostRouter.delete('/delete/:postId',
  Token.check,
  Authenticator.validFromPath({ postId: CommumJoiSchemas.id }),
  Authenticator.validFromBody({ userId: CommumJoiSchemas.id }),
  PostController.delete,
)

export default PostRouter;
