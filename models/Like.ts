import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
export default class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 'like' })
  type!: 'like' | 'dislike';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(type => User, like => Like)
  @JoinColumn()
  user!: User;

  @ManyToOne(type => Post, like => Like)
  @JoinColumn()
  post!: Post;

  // @ManyToOne(type => Comment, like => Like)
  // @JoinColumn()
  // comments!: Comment[];
}