
import { Post } from 'src/utils/database';
import { CreatePostParams } from 'src/utils/types';

export interface IPostsService {
  create(params: CreatePostParams, id:number): Promise<Post>;
}
