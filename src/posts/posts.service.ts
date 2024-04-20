import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../utils/database';
import { InjectRepository } from '@nestjs/typeorm';
import { IPostsService } from './posts';
import { CreatePostParams } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/user/user';
import { UserNotFoundException } from 'src/common/exceptions/UserNotFound';

@Injectable()
export class PostsService implements IPostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}
  async create(params: CreatePostParams, userId: number): Promise<Post | any> {
    try {
      const user = await this.userService.findUser(userId);
      if (!user) {
        throw new UserNotFoundException();
      }
      const newPost = this.postRepository.create({
        ...params,
        user: user,
      });
      const post = await this.postRepository.save(newPost);
      return post;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async showPosts(): Promise<Post[]> {
  //   const post = await this.postRepository.find({
  //     relations: {
  //         user: true,
  //     },
  // })
  const post = await this.postRepository
  .createQueryBuilder('post')
  .leftJoinAndSelect('post.user', 'user')
  .select(['post', 'user.id']) // Select the user ID along with the post
  .getMany();

    if (!post) return null;
    return post;
  }
}
