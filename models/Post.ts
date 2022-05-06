import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Comment from "./Commment";
import Reaction from "./Reaction";
import User from "./User";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @OneToMany(type => Reaction, post => Post, { 
    // onDelete: 'CASCADE',
  })
  @JoinColumn()
  reactions!: Reaction[];

  @ManyToOne(type => User, posts => Post, { nullable: false })
  @JoinColumn()
  user!: User;

  @OneToMany(type => Comment, post => Post, {
    // onDelete: "CASCADE",
  })
  @JoinColumn()
  comments!: Comment[];

  @Column({ nullable: false })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}