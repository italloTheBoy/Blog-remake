import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Reaction from "./Reaction";
import User from "./User";

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, comments => Comment, { nullable: false })
  @JoinColumn()
  user!: User;

  @OneToMany(() => Reaction, reaction => reaction.comment)
  @JoinColumn()
  reactions!: Reaction[];

  @Column({ nullable: false })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
