import { Request, Response } from "express";
import { catchExeption, serverExeption } from "../helpers/validators/Exeptions";
import ReactionRepository from "../models/repositories/ReactionRepository";

export default class LikeController {
  // CREATE
  static async createLike(req: Request, res: Response) {
    try {
      const { userId, type, reactedId: postId, } = req.body;
      
      const alreadyReacted = await ReactionRepository.findOneBy({
        user: userId,
        post: postId,
      });

      console.log(alreadyReacted);

      if (alreadyReacted) {
        return res.status(403).json(catchExeption(
          'id',
          'Você ja reagiu a esta postagem.'
        ));
      }

      await ReactionRepository.insert({
        user: userId,
        post: postId,
        type,
      });

      return res.status(200).json({
        message: 'Postagem reagida.',
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }
  // READ
  // UPDATE
  // DELETE
}