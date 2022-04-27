import dataSource from '../../config/dataSource';
import Like from '../Like';

export const LikeRepository = dataSource.getRepository(Like);