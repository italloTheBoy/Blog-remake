import { Router } from "express";
import LikeController from "../controllers/ReactionController";
import Token from "../helpers/auth/Token";
import Authenticator from "../helpers/validators/Authenticator";
import CommumJoiSchema from "../helpers/validators/schemas/CommumJoiSchema";
import LikeJoiSchema from "../helpers/validators/schemas/ReactionJoiSchema";

const LikeRouter = Router();

// CREATE

LikeRouter.post('/post', 
  Token.check,
  Authenticator.validFromBody({ 
    userId: CommumJoiSchema.id,
    reactedId: CommumJoiSchema.id,
    type: LikeJoiSchema.type
  }),
  LikeController.createLike,
);

LikeRouter.post('/dislike/post/:reactedId',);

LikeRouter.post('/like/comment/:reactedId',); 

LikeRouter.post('/dislike/comment/:reactedId',);

// READ

LikeRouter.get('/like/count');

LikeRouter.get('/dislike/count');

// UPDATE

LikeRouter.patch('/like');

// DELETE

LikeRouter.delete('/like');

export default LikeRouter;