import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ nullable: false })
  content!: string;

  @Column({ default: 0 })
  like!: number;

  @ManyToOne(type => User, posts => Post, { nullable: false})
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}