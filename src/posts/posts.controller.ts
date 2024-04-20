import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { Services, Routes } from 'src/utils/constants';
import { IPostsService } from './posts';
import { AuthUser } from '../utils/user.decorator';
import { User } from 'src/utils/database';

@Controller(Routes.POSTS)
export class PostsController {
  constructor(
    @Inject(Services.POSTS)
    private readonly postsService: IPostsService,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @AuthUser() user: User) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Get()
  findAll() {
    return this.postsService.showPosts();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
