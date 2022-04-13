export default interface IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: 'commum' | 'dev' | 'admin';
}