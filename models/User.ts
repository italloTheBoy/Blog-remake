import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Post from './Post';
import Reaction from './Reaction';
import Comment from './Commment';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(type => Post, user => User)
  @JoinColumn()
  posts!: Post[];

  @OneToMany(type => Reaction, user => User)
  @JoinColumn()
  reactions!: Reaction[];

  @OneToMany(type => Comment, user => User)
  @JoinColumn()
  comments!: Comment[];

  @Column({ 
    nullable: false,
    length: 20,
  })
  username!: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({ 
    nullable: false,
    select: false,
  })
  password!: string;

  private async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @Column({ 
    type: 'enum',
    enum: ['user', 'dev', 'adm'],
    default: 'user',
  })
  role!: 'user' | 'dev' | 'adm';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async insert() {
    await this.hashPassword();
  }
}
