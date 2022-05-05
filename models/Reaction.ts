import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Comment from "./Commment";
import Post from "./Post";
import User from "./User";

@Entity()
export default class Reaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, reaction => Reaction, { nullable: false })
  @JoinColumn()
  user!: User;

  @ManyToOne(type => Post, reactions => Reaction)
  @JoinColumn()
  post!: Post;

  @ManyToOne(() => Comment, comment => comment.reactions)
  @JoinColumn()
  comment!: Comment;

  @Column({ 
    type: 'enum',
    enum: ['like', 'dislike'],
    nullable: false,
  })
  type!: 'like' | 'dislike';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}