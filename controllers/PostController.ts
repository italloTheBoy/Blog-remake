import { NextFunction, Request, Response } from "express";
import { FindOptionsOrderValue } from "typeorm";
import { catchExeption, serverExeption } from "../helpers/validators/Exeptions";
import PostRepositiry from "../models/repositories/PostRepositiry";

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
          'Postagem não encontrado.',
        ));
      }
  
      return res.status(200).json(post);
    }
    catch (error) {
      console.log(error);

      return res.status(500).json(serverExeption);
    }
  }

  static getMyPosts(order: FindOptionsOrderValue = 'ASC') {
    return async (req: Request, res: Response, next: NextFunction) => {
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
      catch (error) {
        console.log(error);
  
        return res.status(500).json(serverExeption);
      } 
    }
  }
  
  static async getFeed(req: Request, res: Response) {}

  static async getLikes(req: Request, res: Response) {}
  
  static async getFirstLikedPosts(req: Request, res: Response) {}
  
  static async getLastLikedPosts(req: Request, res: Response) {}
  
  static async getNumberOfLikes(req: Request, res: Response) {}

  static async getDislikes(req: Request, res: Response) {}
  
  static async getFirstDislikedPosts(req: Request, res: Response) {}
  
  static async getLastDislikedPosts(req: Request, res: Response) {}
  
  static async getNumberOfDislikes(req: Request, res: Response) {}

  static async getMyComments(req: Request, res: Response) {}
  
  static async getOtherUsersComments(req: Request, res: Response) {}

  static async getFirstCommentedPosts(req: Request, res: Response) {}
  
  static async getLastCommentedPosts(req: Request, res: Response) {}
  
  static async getNumberOfComments(req: Request, res: Response) {}

  // UPDATE
  static async like(req: Request, res: Response) {}

  static async dislike(req: Request, res: Response) {}

  static async comment(req: Request, res: Response) {}

  // DELETE
  static async delete(req: Request, res: Response) {}

}
