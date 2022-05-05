import { Router } from "express";
import Authenticator from "../helpers/validators/Authenticator";
import PostController from "../controllers/PostController";
import Token from "../helpers/auth/Token";
import CommumJoiSchemas from "../helpers/validators/schemas/CommumJoiSchema";
import ReactionJoiSchema from "../helpers/validators/schemas/ReactionJoiSchema";
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
PostRouter.get('/my/new',
  Token.check,
  Authenticator.validFromBody({ userId: CommumJoiSchemas.id }),
  PostController.getMyPosts('DESC'),
);

PostRouter.get('/my/old',
  Token.check,
  Authenticator.validFromBody({ userId: CommumJoiSchemas.id }),
  PostController.getMyPosts('ASC'),
);

PostRouter.get('/:postId',
  Authenticator.validFromPath({ postId: CommumJoiSchemas.id }),
  PostController.getOne,
);

PostRouter.get('/:reaction/:order',
  Token.check,
  Authenticator.validFromPath({ 
    reaction: ReactionJoiSchema.type,
    order: CommumJoiSchemas.order,
  }),
  Authenticator.validFromBody({ 
    userId: CommumJoiSchemas.id,
  }),
  PostController.getReactedPosts,
);

// DELETE
PostRouter.delete('/:postId',
  Token.check,
  Authenticator.validFromPath({ postId: CommumJoiSchemas.id }),
  Authenticator.validFromBody({ userId: CommumJoiSchemas.id }),
  PostController.delete,
)

export default PostRouter;
