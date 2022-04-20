import dataSource from '../../config/dataSource';
import Post from '../Post';

export default dataSource.getRepository(Post);