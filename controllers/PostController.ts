import { Request, Response } from "express";
import PostRepositiry from "../models/repositories/PostRepositiry";

export default class PostController {
  static async post(req: Request, res: Response) {
    const { userId, content } = req.body

    const newPost = PostRepositiry.insert({ 
      content, 
      user: userId, 
    });

    return res.status(201).json({ msg: 'Postagem feita.' });
  }
}
