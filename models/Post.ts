import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Reaction from "./Reaction";
import User from "./User";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @OneToMany(type => Reaction, post => Post)
  @JoinColumn()
  reactions!: Reaction[];

  @ManyToOne(type => User, posts => Post, { nullable: false })
  @JoinColumn()
  user!: User;

  @Column({ nullable: false })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}