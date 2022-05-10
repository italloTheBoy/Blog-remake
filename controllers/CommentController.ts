import { Request, Response } from "express";
import { Not } from "typeorm";
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
  static async getOneComment(req: Request, res: Response) {
    try {
      const commentId = Number(req.params.commentId);

      const comment = await CommentRepository.findOne({
        order: { createdAt: 'DESC' },
        where: { id: commentId },
      });

      if (!comment) {
        return res.status(404).json(catchExeption(
          'id',
          'Comentario não encontrado.',
        ))
      }

      return res.status(200).json(comment);
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async getMyComments(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const { userId } = req.body;

      const comments = await CommentRepository.find({
        order: { createdAt: 'DESC' },
        where: {
          post: { id: postId }, 
          user: { id: userId }, 
        },
      });

      return res.status(200).json(comments);
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static async getOtherUsersComments(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const { userId } = req.body;

      const comments = await CommentRepository.find({
        order: { createdAt: 'DESC' },
        where: {
          post: { id: postId },
          user: { id: Not(userId) }, 
        },
      });

      return res.status(200).json(comments);
    }
    catch (err) {
      console.log(err);
    
      return res.status(500).json(serverExeption);
    }
  }

  static async getAllComments(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);

      const comments = await CommentRepository.find({
        order: { createdAt: 'DESC' },
        where: {
          post: { id: postId }, 
        },
      });

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
