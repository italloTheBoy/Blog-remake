import { Request, Response } from "express";
import { catchExeption, serverExeption } from "../helpers/validators/Exeptions";
import ReactionRepository from "../models/repositories/ReactionRepository";

export default class ReactionController {
  // CREATE
  static async reactPost(req: Request, res: Response) {
    try {
      const { userId, postId, type } = req.body;
      
      const alreadyReacted = await ReactionRepository.findOneBy({
        user: { id: userId },
        post: { id: postId },
      });

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
        msg: 'Postagem reagida.' 
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  // READ
  static async getMyReaction(req: Request, res: Response) {
    try {
      const { userId, postId } = req.body;

      const reaction = await ReactionRepository.findOneBy({
        user: { id: userId },
        post: { id: postId },
      });

      if (!reaction) {
        return res.status(200).json({
          IsReacted: false,
        });
      }

      return res.status(200).json({
        IsReacted: true,
        reactionType: reaction.type,
      })
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async countPostReactions(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
    
      const likes = (await ReactionRepository.findAndCountBy({
        post: { id: postId },
        type: 'like',
      }))[1];

      const dislikes = (await ReactionRepository.findAndCountBy({
        post: { id: postId },
        type: 'dislike',
      }))[1];

      return res.status(200).json({
        likes,
        dislikes,
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  // UPDATE
  static async tradePostReaction(req: Request, res: Response) {
    try {
      const { userId, postId } = req.body;

      const reaction = await ReactionRepository.findOneBy({
        user: { id: userId },
        post: { id: postId },
      });

      if (!reaction) {
        return res.status(404).json(catchExeption(
          'id',
          'Reação não encontrada.'
        ));
      }

      const reactionType = reaction.type === 'like' 
        ? 'dislike' 
        : 'like'
      ;

      await ReactionRepository.update(reaction.id, {
        type: reactionType,
      });

      return res.status(200).json({ 
        msg: 'Reação alterada.' 
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  // DELETE
  static async deletePostReaction(req: Request, res: Response) {
    try {
      const { userId, postId } = req.body;

      const reaction = await ReactionRepository.findOneBy({
        user: { id: userId },
        post: { id: postId },
      });

      if (!reaction) {
        return res.status(404).json(catchExeption(
          'id',
          'Reação não encontrada.'
        ));
      }

      await ReactionRepository.delete(reaction.id);

      return res.status(200).json({ 
        msg: 'Reação deletada.' 
      });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }
}