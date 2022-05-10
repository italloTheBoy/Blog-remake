import { Request, Response } from "express";
import { catchExeption, serverExeption } from "../helpers/validators/Exeptions";
import CommentRepository from "../models/repositories/CommentRepository";

export default class CommentController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const { userId, postId, content } = req.body
  
      await CommentRepository.insert({ 
        user: userId, 
        post: postId, 
        content, 
      });
      
      return res.status(201).json({ msg: 'Postagem comentada.' });
    }
    catch (err) {
      console.error(err);

      return res.status(500).json(serverExeption);
    }
  }  

  // READ
  static async getMyComments(req: Request, res: Response) {
    try {
      const { postId, userId } = req.body;

      const comments = await CommentRepository.find({
        order: { createdAt: 'DESC' },
        where: {
          post: { id: postId }, 
          user: { id: userId }, 
        },
      });

      if (!comments) {
        return res.status(404).json(catchExeption(
          'id',
          'Nenhum comentário foi encontrado.'
        ));
      }

      return res.status(200).json(comments);
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const commentId = Number(req.params.commentId);
      const { userId } = req.body;
    
      const comment = await CommentRepository.findOneBy({ 
        id: commentId,
        user: userId,
      });

      if (!comment) {
        return res.status(404).json(catchExeption(
          'id',
          'Comentario não encontrada.',
        ));
      }

      await CommentRepository.delete(commentId);

      return res.status(200).json({ msg: 'Comentario deletada.' });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }  
  }
}
