import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
  BeforeUpdate, 
} from 'typeorm';
import bcrypt from 'bcrypt';
import Post from './Post';
import Like from './Like';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
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

  @OneToMany(type => Post, user => User)
  @JoinColumn()
  posts!: Post[];

  @OneToMany(type => Post, user => Like)
  @JoinColumn()
  likes!: Like[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async insert() {
    await this.hashPassword();
  }
}
