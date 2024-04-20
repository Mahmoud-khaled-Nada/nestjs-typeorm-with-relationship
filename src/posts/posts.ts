import { Post } from 'src/utils/database';
import { CreatePostParams } from 'src/utils/types';

export interface IPostsService {
  create(params: CreatePostParams, userId: number): Promise<Post>;
  showPosts(): Promise<Post[]>;
}
