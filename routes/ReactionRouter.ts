import { Router } from "express";
import ReactionController from "../controllers/ReactionController";
import Token from "../helpers/auth/Token";
import Authenticator from "../helpers/validators/Authenticator";
import CommumJoiSchema from "../helpers/validators/schemas/CommumJoiSchema";
import ReactionJoiSchema from "../helpers/validators/schemas/ReactionJoiSchema";

const LikeRouter = Router();

// CREATE

LikeRouter.post('/post', 
  Token.check,
  Authenticator.validFromBody({ 
    userId: CommumJoiSchema.id,
    postId: CommumJoiSchema.id,
    type: ReactionJoiSchema.type
  }),
  ReactionController.reactPost,
);

// READ
LikeRouter.get('/post/my/reaction',
  Token.check,
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    postId: CommumJoiSchema.id,
  }),
  ReactionController.getMyReaction,
)

LikeRouter.get('/post/count/:postId',
  Authenticator.validFromPath({
    postId: CommumJoiSchema.id,
  }),
  ReactionController.countPostReactions,
);

// UPDATE

LikeRouter.patch('/post',
  Token.check,
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    postId: CommumJoiSchema.id,
  }),
  ReactionController.tradePostReaction,
);

// DELETE

LikeRouter.delete('/post',
  Token.check,
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    postId: CommumJoiSchema.id,
  }),
  ReactionController.deletePostReaction,
);

export default LikeRouter;