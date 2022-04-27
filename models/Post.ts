import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Like from "./Like";
import User from "./User";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ nullable: false })
  content!: string;

  @Column({ default: 0 })
  like!: number;

  @OneToMany(type => Like, post => Post)
  @JoinColumn()
  likes!: Like[];

  @ManyToOne(type => User, posts => Post, { nullable: false })
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}