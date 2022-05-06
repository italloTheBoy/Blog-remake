import { Router } from "express";
import CommentController from "../controllers/CommentController";
import Token from "../helpers/auth/Token";
import Authenticator from "../helpers/validators/Authenticator";
import CommentJoiSchema from "../helpers/validators/schemas/CommentJoiSchema";
import CommumJoiSchema from "../helpers/validators/schemas/CommumJoiSchema";

const CommentRouter = Router();

// CREATE
CommentRouter.post('/',
  Token.check,
  Authenticator.validFromBody({
    userId: CommumJoiSchema.id,
    postId: CommumJoiSchema.id,
    content: CommentJoiSchema.content
  }),
  CommentController.create,
);

// DELETE
CommentRouter.delete('/:commentId',
  Token.check,
  Authenticator.validFromPath({ commentId: CommumJoiSchema.id }),
  Authenticator.validFromBody({ userId: CommumJoiSchema.id }),
  CommentController.delete,
);

export default CommentRouter;
