import dataSource from '../../config/dataSource';
import User from '../User';

export const UserRepository = dataSource.getRepository(User);