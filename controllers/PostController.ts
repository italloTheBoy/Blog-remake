import { Request, Response } from "express";
import { FindOptionsOrderValue } from "typeorm";
import { catchExeption, serverExeption } from "../helpers/validators/Exeptions";
import CommentRepository from "../models/repositories/CommentRepository";
import PostRepositiry from "../models/repositories/PostRepositiry";
import ReactionRepository from "../models/repositories/ReactionRepository";

export default class PostController {
  // CREATE
  static async post(req: Request, res: Response) {
    try {
      const { userId, content } = req.body
  
      await PostRepositiry.insert({ 
        content, 
        user: userId, 
      });
      
      return res.status(201).json({ msg: 'Postagem feita.' });
    }
    catch (error) {
      console.error(error);

      return res.status(500).json(serverExeption);
    }
  }

  // READ 
  static async getOne(req: Request, res: Response) {
    try { 
      const postId = Number(req.params.postId);
  
      const post = await PostRepositiry.findOneBy({ id: postId });
    
      if (!post) {
        return res.status(404).json(catchExeption(
          'id',
          'Postagem não encontrada.',
        ));
      }
  
      return res.status(200).json(post);
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  static getMyPosts(order: FindOptionsOrderValue = 'DESC') {
    return async (req: Request, res: Response) => {
      try { 
        const { userId } = req.body;
  
        const posts = await PostRepositiry.find({
          where: { user: userId },
          order: { createdAt: order },
        });
  
        if (!posts) {
          return res.status(404).json(catchExeption(
            'id',
            'Nenhuma postagem foi encontrada.',
          ));
        }
  
        return res.status(200).json(posts);
      } 
      catch (err) {
        console.log(err);
  
        return res.status(500).json(serverExeption);
      } 
    }
  }
  
  static async getFeed(req: Request, res: Response) {}


  static async getReactedPosts(req: Request, res: Response) {
    try {
      const { reaction, order } = req.params ;
      const { userId } = req.body;

      const reactedPosts = await ReactionRepository.find({
        where: { 
          user: { id: userId },
          type: reaction as 'like' | 'dislike',
        },
        relations: ['post'],
        order: { createdAt: order as FindOptionsOrderValue },
      });

      if (!reactedPosts) {
        return res.status(404).json(catchExeption(
          'id',
          'Nenhuma postagem foi encontrada.',
        ));
      }

      const posts = reactedPosts.map(reaction => reaction.post);

      return res.status(200).json(posts);
    } 
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    } 
  }

  static async getCommentedPosts(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { order } = req.params;

      const comments = await CommentRepository.find({
        order: { createdAt: order as FindOptionsOrderValue },
        relations: ['post'],
        where: { 
          user: { id: userId },
        },
      });

      if (comments.length === 0) {
        return res.status(404).json(catchExeption(
          'id',
          'Nenhuma postagem foi encontrada.',
        ))
      }

      const posts = comments.map(comment => comment.post);

      res.status(200).json({ posts })
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const { userId } = req.body;
    
      const post = await PostRepositiry.findOneBy({ 
        id: postId,
        user: { id: userId },
      });

      if (!post) {
        return res.status(404).json(catchExeption(
          'id',
          'Postagem não encontrada.',
        ));
      }

      await PostRepositiry.remove(post);

      return res.status(200).json({ msg: 'Postagem deletada.' });
    }
    catch (err) {
      console.log(err);

      return res.status(500).json(serverExeption);
    }  
  }
}
