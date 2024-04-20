import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../utils/database';
import { InjectRepository } from '@nestjs/typeorm';
import { IPostsService } from './posts';
import { CreatePostParams } from 'src/utils/types';

@Injectable()
export class PostsService implements IPostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(params: CreatePostParams, userId: number): Promise<Post|any> {
    try {
      const newPost = this.postRepository.create({
       ...params,
        userId,
      });
      
  
      console.log(newPost)
      // const post = await this.postRepository.save(newPost);
      // return post;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
